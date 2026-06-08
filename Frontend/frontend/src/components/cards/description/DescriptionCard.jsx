import React from "react";
import { Icon } from "@iconify/react";
import "./DescriptionCard.css";

export default function DescriptionCard({
  title,
  description,
}) {
  return (
    <div className="description-card"
    >
      {/* Text */}
      <h3 className="description-card_title">
        {title}
      </h3>

      <p className="description-card_description">
        {description}
      </p>
    </div>
  );
}