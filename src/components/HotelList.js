import React, { Component } from "react";
import { observer } from "mobx-react";
import { css } from "react-emotion";
import Hotel from "./Hotel";
import Loader from "./Loader";

const styles = {
  container: css`
    max-width: 980px;
    margin: 0 auto;
    font-family: Lato;
    position: relative;
  `,
  btnSubmit: css`
    text-align: center;
    button {
      margin-left: 10px;
      border: none;
      padding: 8px 16px;
      background: #00b6b1;
      color: #fff;
      border-radius: 2px;
      outline: none;
      font-size: 0.8rem;
      cursor: pointer;
    }
  `,
  error: css`
    padding: 15px;
    background: #ffe0e0;
    border-radius: 4px;
    margin-top: 30px;
    color: red;
  `
};

class HotelList extends Component {
  handleFormSubmit = e => {
    this.props.store.getList();
    e.preventDefault();
  };

  render() {
    const { hotelList, fetchStatus } = this.props.store;
    return (
      <div className={styles.container}>
        <p className={styles.btnSubmit}>
          Load Hotels:
          <button onClick={this.handleFormSubmit} type="submit">
            Submit
          </button>
        </p>
        {fetchStatus === "FETCHING" ? (
          <Loader />
        ) : fetchStatus === "ERROR" ? (
          <div className={styles.error}>An error occured</div>
        ) : (
          hotelList.map(hotel => {
            return (
              <Hotel
                key={hotel.id}
                id={hotel.id}
                name={hotel.name}
                image={hotel.images[0]}
                country={hotel.country}
                city={hotel.city}
                price={hotel.price}
                startDate={hotel.date_start}
                endDate={hotel.date_end}
                stars={hotel.stars}
                description={hotel.description}
              />
            );
          })
        )}
      </div>
    );
  }
}

export default observer(HotelList);
