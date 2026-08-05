import "./ConfirmModal.css";

export default function ConfirmModal({ title, message, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3 className="modal-title">{title}</h3>
        <p className="modal-message">{message}</p>
        <div className="modal-actions">
          <button className="modal-btn modal-btn--secondary" onClick={onCancel}>
            Teruggaan
          </button>
          <button className="modal-btn modal-btn--primary" onClick={onConfirm}>
            Toch doorgaan
          </button>
        </div>
      </div>
    </div>
  );
}