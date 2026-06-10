import "./StatusCard.css";
import { Icon } from "@iconify/react";

const config = {
  success: { icon: "material-symbols:check-rounded",    klasse: "status-icoon--success" },
  warning: { icon: "f7:exclamationmark-triangle",       klasse: "status-icoon--warning" },
  error:   { icon: "charm:cross",                       klasse: "status-icoon--error"   },
  info:    { icon: "grommet-icons:circle-information",  klasse: "status-icoon--info"    },
};

export default function StatusCard({ type, aantal, label, sublabel }) {
  const { icon, klasse } = config[type];

  return (
    <div className="status-card">
      <div className="status-card-header">
        <span className={`status-icoon ${klasse}`}>
          <Icon icon={icon} width={16} height={16} />
        </span>
        <span className="status-card-aantal">{aantal}</span>
      </div>
      <span className="status-card-label">{label}</span>
      <span className="status-card-sublabel">{sublabel}</span>
    </div>
  );
}