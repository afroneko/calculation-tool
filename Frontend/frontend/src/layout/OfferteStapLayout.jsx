import '../styles/layout.css';
import DetailCard from '../components/cards/detail/DetailCard';
import ProgressCard from '../components/cards/progress/ProgressCard';

export default function OfferteStapLayout({
  children,
  offerte = {},
  progress = { stap: 2, totaal: 8 },
  onPrevious,
  onNext,
  showPrevious = true,
}) {
  const percentage = Math.round((progress.stap / progress.totaal) * 100);
 
  return (
    <div className="offerte-stap-layout">
 
      {/* Tweekoloms grid: content + sidebar */}
      <div className="offerte-stap-layout__grid">
 
        {/* ── Linker kolom: hoofd-content ── */}
        <main className="offerte-stap-layout__content">
          {children}
        </main>
 
        {/* ── Rechter kolom: sidebar ── */}
        <aside className="offerte-stap-layout__sidebar">
 
          <DetailCard
            title="Offerte informatie"
            number={offerte.offertenummer}
            customer={offerte.klant}
            salesperson={offerte.verkoper}
            date={offerte.aangemaaktOp}
          />
          <ProgressCard
            currentStep={progress.stap}
            totalSteps={progress.totaal}
            onPrevious={onPrevious}
            onNext={onNext}
            showPrevious={showPrevious}
          />
 
        </aside>
      </div>
    </div>
  );
}