import "./ProgressBar.css";
import { useLocation } from "react-router-dom";

const steps = [
  {
    slug: "offerte-ophalen",
    title: "Offerte ophalen",
    subtitle: "Gegevens importeren",
  },
  {
    slug: "dxf-invoer",
    title: "DXF invoer",
    subtitle: "Bestanden laden",
  },
  {
    slug: "materiaal-diktes",
    title: "Materiaal & diktes",
    subtitle: "Selecteer materiaal",
  },
  {
    slug: "nesting",
    title: "Nesting",
    subtitle: "Plaatindeling",
  },
  {
    slug: "bewerkingen",
    title: "Bewerkingen",
    subtitle: "Tijden en bewerkingen",
  },
  {
    slug: "externe-bewerkingen",
    title: "Externe bewerkingen",
    subtitle: "Bewerkingen",
  },
  {
    slug: "calculatie",
    title: "Calculatie",
    subtitle: "Kostenoverzicht",
  },
  {
    slug: "controle",
    title: "Controle",
    subtitle: "Validatie",
  },
  {
    slug: "export",
    title: "Export",
    subtitle: "Ridder, mail, pdf",
  },
];

/**
 * Step States
 */
const STEP_STATE = {
  COMPLETED: "completed",
  ACTIVE: "active",
  UPCOMING: "upcoming",
};

function getStepState(stepId, currentStep) {
  if (stepId < currentStep) {
    return STEP_STATE.COMPLETED;
  }

  if (stepId === currentStep) {
    return STEP_STATE.ACTIVE;
  }

  return STEP_STATE.UPCOMING;
}

export default function ProgressBar() {
    const location = useLocation();
    const currentSlug = location.pathname.split("/").pop();
    const currentIndex = steps.findIndex(
        (step) => step.slug === currentSlug);
        const fillPct =
    currentIndex <= 0 ? 0 : (currentIndex / (steps.length - 1)) * 100;

  return (

    <div className="progress-bar">
      <div className="progress-line" >
        <div
          className="progress-line-fill"
          style={{ width: `${fillPct}%` }}
        />
      </div>

          {steps.map((step, index) => {
            let state = STEP_STATE.UPCOMING;

            if (index < currentIndex) {
              state = STEP_STATE.COMPLETED;
            } else if (index === currentIndex) {
              state = STEP_STATE.ACTIVE;
            }

            return (
              <div className="step-container" key={step.slug}>
               
                  <div className={`step-circle ${state}`}>
                    {state === STEP_STATE.COMPLETED ? "✓" : index + 1}
                  </div>


                <div className="step-content">
                  <div className="step-title">{step.title}</div>
                  <div className="step-subtitle">{step.subtitle}</div>
                </div>
              </div>
            );
          })}
    </div>
  );
}