import "./Progressbar.css";
import { Icon } from "@iconify/react";
import { useLocation } from "react-router-dom";

// ----> PROGRESSBAR COMPONENT FOR TRACKING STEP COMPLETION <----

//array of steps with their respective titles, subtitles, and icons
const steps = [
  {
    slug: "stap1",
    title: "Document ophalen",
    subtitle: "Gegevens importeren",
    icon: "material-symbols-light:download",
  },
  {
    slug: "stap2",
    title: "DXF invoer",
    subtitle: "Bestanden laden",
    icon: "pepicons-pencil:file",
  },
  {
    slug: "stap3",
    title: "Materiaal & diktes",
    subtitle: "Selecteer materiaal",
    icon: "proicons:layers",
  },
  {
    slug: "stap4",
    title: "Nesting",
    subtitle: "Plaatindeling",
    icon: "mdi-light:grid",
  },
  {
    slug: "stap5",
    title: "Bewerkingen",
    subtitle: "Tijden en bewerkingen",
    icon: "fluent:person-wrench-20-regular",
  },
  {
    slug: "stap6",
    title: "Externe bewerkingen",
    subtitle: "Bewerkingen",
    icon: "fluent:arrow-trending-wrench-20-regular",
  },
  {
    slug: "stap7",
    title: "Calculatie",
    subtitle: "Kostenoverzicht",
    icon: "ph:calculator",
  },
  {
    slug: "stap8",
    title: "Export",
    subtitle: "Ridder, mail, pdf",
    icon: "material-symbols-light:upload",
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

export default function Progressbar() {
    const location = useLocation();
    const currentSlug = location.pathname.split("/")[1];
    const currentIndex = steps.findIndex((step) => step.slug === currentSlug);
    const segmentWidth = 100 / (steps.length - 1);
    let fillLeft;
    let fillWidth;

    if (currentIndex === 0) {
      fillLeft = 0;
      fillWidth = segmentWidth / 2;
    } else if (currentIndex === steps.length - 1) {
      fillLeft = 100 - segmentWidth / 2;
      fillWidth = segmentWidth / 2;
    } else {
      fillLeft = currentIndex * segmentWidth - segmentWidth / 2;
      fillWidth = segmentWidth;
    }

  return (

    <div className="progress-bar">
      <div className="progress-line-wrapper">
        <div className="progress-line" >
          <div
            className="progress-line-fill"
            style={{ left: `${fillLeft}%`, width: `${fillWidth}%` }}
          />
        </div>
      </div>

          {steps.map((step, index) => {
            let state = STEP_STATE.UPCOMING;

            if (index < currentIndex) {
              state = STEP_STATE.COMPLETED;
            } else if (index === currentIndex) {
              state = STEP_STATE.ACTIVE;
            }

            return (
              <div className={`step-container ${state}`} key={step.slug}>
               
                  <div className={`step-circle ${state}`}>
                    <span className={`step-number ${state}`}>
                      {state === STEP_STATE.COMPLETED ? "✓" : index + 1}
                    </span>
                    <Icon icon={step.icon} className="step-icon" />
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