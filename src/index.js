import React from "react";
import { render } from "react-dom";
import HotelList from "./components/HotelList";
import store from "./models/HotelListModel";

render(<HotelList store={store} />, document.getElementById("root"));
window.store = store;
