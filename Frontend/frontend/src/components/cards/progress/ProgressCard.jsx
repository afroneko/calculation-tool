import React from "react";
import "./ProgressCard.css";

export default function ProgressCard({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  previousDisabled = false,
}) {
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="progress-card">
      <h3 className="progress-card__title">Voortgang</h3>

      <p className="progress-card__label">
        {currentStep} van {totalSteps} stappen voltooid
      </p>

      <div
        className="progress-card__track"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="progress-card__fill"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <span className="progress-card__percentage">{percentage}%</span>

      <div className="progress-card__actions">
        <button
          className="progress-card__btn progress-card__btn--secondary"
          onClick={onPrevious}
          disabled={previousDisabled}
        >
          ← Vorige stap
        </button>
        <button
          className="progress-card__btn progress-card__btn--primary"
          onClick={onNext}
        >
          Volgende stap →
        </button>
      </div>
    </div>
  );
}