import { observable, flow, decorate, configure } from "mobx";
import "isomorphic-fetch";

configure({ enforceActions: "observed" });
class HotelListModel {
  fetchStatus = "NOT_FETCHED";
  hotelList = [];

  getList = flow(function*() {
    this.fetchStatus = "FETCHING";
    const response = yield fetch(
      "http://fake-hotel-api.herokuapp.com/api/hotels?count=5"
    );
    const data = yield response.json();
    if (data.error) {
      this.fetchStatus = "ERROR";
    } else {
      this.hotelList = data;
      this.fetchStatus = "FETCHED";
    }
  });
}

decorate(HotelListModel, {
  hotelList: observable,
  fetchStatus: observable
});

export default new HotelListModel();
