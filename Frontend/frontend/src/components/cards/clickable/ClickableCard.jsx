import React from "react";
import { Icon } from "@iconify/react";
import "./ClickableCard.css";

// ----> CLICKABLE CARD COMPONENT FOR DASHBOARDPAGE <----

export default function ClickableCard({
  title,
  description,
  icon,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className="clickable-card"
    >
      {/* Icon box */}
      <div className="clickable-card_icon-box">
        <Icon icon="simple-line-icons:cloud-upload"/>
      </div>

      {/* Text */}
      <h3 className="clickable-card_title">
        {title}
      </h3>

      <p className="clickable-card_description">
        {description}
      </p>

      {/* Arrow */}
      <div className="clickable-card_arrow">
        <Icon icon="mdi-light:arrow-right"/>
      </div>
    </div>
  );
}