import React from "react";
import { css } from "react-emotion";

const styles = props => ({
  container: css`
    position: relative;
    padding: 15px;
    background: ${props.even ? "#dedede" : "#f1f1f1"};
  `,
  expression: css`
    font-size: 3rem;
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translateY(-50%);
    width: 50px;
    height: 50px;
    background: ${props.positive ? "#91efeb" : "#ffb4b4"};
    color: ${props.positive ? "#00b9b2" : "#f00"};
    text-align: center;
    line-height: 50px;
    border-radius: 50%;
  `,
  comment: css`
    margin-left: 100px;
  `
});
const Review = props => {
  const style = styles(props);
  return (
    <div className={style.container}>
      <span className={style.expression}>{props.positive ? "+" : "-"}</span>
      <div className={style.comment}>
        <h3>{props.name}</h3>
        <p>{props.comment}</p>
      </div>
    </div>
  );
};

export default Review;
