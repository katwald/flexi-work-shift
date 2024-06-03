import React from "react";
import { readableDate } from "../../../helpers/readableDate";
import { HiArrowLongRight, HiOutlineUserCircle } from "react-icons/hi2";

import "./index.scss";
const Card = ({
  title,
  tag,
  onClick,
  bookingStart,
  bookingEnd,
  bookingDescription,
  assignedEmployee,
}) => {
  console.log("readable Date", bookingStart, "bd", bookingDescription);
  return (
    <div className="card">
      <div className="card__header">
        <div>
          <h3 className="card__header__title">{title}</h3>
          <div className="card__header__sub-title">
            {readableDate(bookingStart)}
          </div>
          <div className="card__header__sub-title">
            {readableDate(bookingEnd)}
          </div>
        </div>
        {assignedEmployee && (
          <div className="card__header__avatar">
            <div className="card__header__avatar__icon">
              <HiOutlineUserCircle />
            </div>
            <div className="card__header__avatar__name">{assignedEmployee}</div>
          </div>
        )}
      </div>
      <div className="card__body">
        <div className="card__body__truncate">{bookingDescription}</div>
      </div>
      <div className="card__footer">
        <div
          className={`card__footer__chip card__footer__chip__${
            tag && tag.toLocaleLowerCase()
          }`}
        >
          {tag}
        </div>
        <div onClick={onClick}>
          <HiArrowLongRight className="card__footer__avatar" />
        </div>
      </div>
    </div>
  );
};

export default Card;
