import React from "react";
import { Icon } from "@iconify/react";
import "./ClickableCard.css";

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
        {icon && <Icon icon={icon} size={24} />}
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
        <Icon icon="mdi:arrow-right" size={20} />
      </div>
    </div>
  );
}