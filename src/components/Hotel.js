import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { css } from "react-emotion";
import { germanTimeFormat } from "../helpers/date";
import { observer } from "mobx-react";
import store from "../models/HotelModel";
import Review from "./Review";
import Loader from "./Loader";

const styles = props => ({
  container: css`
    padding: 10px;
    background: #f1f1f1;
    border-radius: 4px;
    margin-bottom: 15px;
    overflow: hidden;
    box-shadow: 1px 4px 10px #eaeaea;
    position: relative;
    &::after {
      content: "";
      clear: both;
      display: table;
    }
  `,
  imgContainer: css`
    display: inline-block;
    width: 39%;
    margin-right: 3%;
    background-color: #dedede;
    min-height: 200px;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
  `,
  img: css`
    width: 100%;
  `,
  contentContainer: css`
    float: right;
    width: 58%;
    h2 {
      text-transform: capitalize;
      margin-top: 0;
    }
  `,
  stars: css`
    background: white;
    color: #e2ad2a;
    position: absolute;
    left: 10px;
    top: 10px;
    padding: 0 10px;
    border-radius: 2px;
  `,
  price: css`
    font-size: 1.5rem;
    color: #00b6b1;
    font-weight: bold;
    margin: 0;
  `,
  button: css`
    border: none;
    padding: 8px 16px;
    background: #00b6b1;
    color: #fff;
    border-radius: 2px;
    outline: none;
    font-size: 0.8rem;
    cursor: pointer;
  `,
  reviewContainer: css`
    position: relative;
    margin-bottom: 15px;
    margin-top: -6px;
    min-height: 70px;
  `,
  error: css`
    padding: 15px;
    background: #ffe0e0;
    border-radius: 4px;
    margin-top: 30px;
    color: red;
  `
});

class Hotel extends React.Component {
  getReview = id => () => {
    store.getReview(id);
  };
  render() {
    const props = this.props;
    const { hotelReview, fetchStatus, hotelId } = store;
    const style = styles(props);
    return (
      <Fragment>
        <div className={style.container}>
          <div className={style.imgContainer}>
            <img
              className={style.img}
              src={props.image}
              alt={props.name}
              title={props.name}
            />
            <span className={style.stars}>{props.stars} ★</span>
          </div>
          <div className={style.contentContainer}>
            <h2>{props.name}</h2>
            <p>
              {props.city}-{props.country}
            </p>
            <p>{props.description}</p>
            <div>
              <div>
                <p className={style.price}>{props.price} Euro</p>

                <p>
                  {germanTimeFormat(props.startDate)} -
                  {germanTimeFormat(props.endDate)}
                </p>
                <button
                  onClick={this.getReview(props.id)}
                  className={style.button}
                >
                  Show Review
                </button>
              </div>
            </div>
          </div>
        </div>
        {hotelId === props.id &&
          fetchStatus !== "NOT_FETCHED" && (
            <div className={style.reviewContainer}>
              {fetchStatus === "FETCHING" ? (
                <Loader />
              ) : fetchStatus === "ERROR" ? (
                <div className={style.error}>An error occured</div>
              ) : hotelReview.data.length > 0 ? (
                hotelReview.data.map((review, index) => {
                  return (
                    <Review
                      key={`review-${review.hotel_id}-${index}`}
                      even={index % 2 === 0}
                      name={review.name}
                      comment={review.comment}
                      positive={review.positive}
                    />
                  );
                })
              ) : (
                <div className={style.error}>There are no comments</div>
              )}
            </div>
          )}
      </Fragment>
    );
  }
}

export default observer(Hotel);

Hotel.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  image: PropTypes.string,
  country: PropTypes.string,
  city: PropTypes.string,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  stars: PropTypes.string,
  description: PropTypes.string
};
