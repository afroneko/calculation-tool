import "./DropdownCard.css";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const sectionConfig = {
  success: {
    icon:   "icon-park-outline:check-one",
    className: "section-status--success",
    badge:  "Alle controles geslaagd",
  },
  warning: {
    icon:   "f7:exclamationmark-circle",
    className: "section-status--warning",
    badge:  null,
  },
  error: {
    icon:   "mdi:cross-circle-outline",
    className: "section-status--error",
    badge:  null,
  },
};

const alertIcons = {
  error:   "mdi:cross-circle-outline",
  warning: "f7:exclamationmark-circle",
};

export default function DropdownCard({ title, status, alerts = [], forceOpen }) {
  const [open, setOpen] = useState(status === "error");
  const navigate = useNavigate();

  useEffect(() => {
    setOpen(forceOpen);
  }, [forceOpen]);

  const { icon, className, badge } = sectionConfig[status];
  const warningCount = alerts.filter((a) => a.type === "warning").length;

  return (
    <div className={`dropdown-card ${open ? "dropdown-card--open" : ""}`}>
      <button className="dropdown-card-header" onClick={() => setOpen((v) => !v)}>
        <div className="dropdown-card-title">
          <Icon icon={icon} width={18} height={18} className={`section-icon ${className}`} />
          <span className="section-name">{title}</span>
          {status === "warning" && warningCount > 0 && (
            <span className={`section-badge ${className}`}>{warningCount} waarschuwingen</span>
          )}
          {status === "success" && (
            <span className={`section-badge ${className}`}>{badge}</span>
          )}
        </div>
        <Icon
          icon="mdi:chevron-down"
          width={20}
          height={20}
          className={`chevron ${open ? "chevron--open" : ""}`}
        />
      </button>

      {open && alerts.length > 0 && (
        <div className="dropdown-card-content">
          {alerts.map((alert, i) => (
            <div key={i} className={`alert alert--${alert.type}`}>
              <div className="alert-top">
                <div className="alert-text">
                  <span className="alert-title">
                    <Icon icon={alertIcons[alert.type]} width={15} height={15} className="alert-icon" />
                    {alert.title}
                  </span>
                  <span className="alert-description">{alert.description}</span>
                </div>
                {alert.step && (
                  <button className="alert-step-button" onClick={() => navigate(alert.step)}>
                    Go to step {alert.stepNumber} →
                  </button>
                )}
              </div>
              {alert.files && (
                <div className="alert-files">
                  {alert.files.map((f) => (
                    <span key={f} className="alert-file">{f}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}