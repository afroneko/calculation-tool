import React from "react";
import "./DetailCard.css";

// ----> DETAIL CARD COMPONENT FOR THE DOCUMENTDETAILS <----

export default function DetailCard({
  title,
  numberLabel,
  number,
  customer,
  salesperson,
  date,
}) {
  return (
    <div className="detail-card">
      <h3 className="detail-card__title">{title}</h3>
 
      <dl className="detail-card__fields">
        <div className="detail-card__field">
          <dt>{numberLabel}</dt>
          <dd>{number}</dd>
        </div>
        <div className="detail-card__field">
          <dt>Klant</dt>
          <dd>{customer}</dd>
        </div>
        <div className="detail-card__field">
          <dt>Verkoper</dt>
          <dd>{salesperson}</dd>
        </div>
        <div className="detail-card__field">
          <dt>Aangemaakt op</dt>
          <dd>{date}</dd>
        </div>
      </dl>
    </div>
  );
}