import { observable, flow, decorate, configure, action } from "mobx";
configure({ enforceActions: "observed" });

class HotelModel {
  fetchStatus = "NOT_FETCHED";
  hotelReview = {};
  hotelId = "";

  getReview = flow(function*(id) {
    this.fetchStatus = "FETCHING";
    this.hotelId = id;
    const response = yield fetch(
      `http://fake-hotel-api.herokuapp.com/api/reviews?hotel_id=${id}`
    );
    const data = yield response.json();
    if (data.error) {
      this.fetchStatus = "ERROR";
    } else {
      this.hotelReview = {
        id: data.hotel_id,
        data
      };
      this.fetchStatus = "FETCHED";
    }
  });
}

decorate(HotelModel, {
  hotelReview: observable,
  fetchStatus: observable,
  hotelId: observable
});

export default new HotelModel();
