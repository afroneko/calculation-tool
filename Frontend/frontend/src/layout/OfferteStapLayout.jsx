import '../styles/layout.css';
import DetailCard from '../components/cards/detail/DetailCard';
import ProgressCard from '../components/cards/progress/ProgressCard';

export default function OfferteStapLayout({
  title,
  children,
  offerte = {},
  voortgang = { stap: 2, totaal: 8 },
  onVorige,
  onVolgende,
  toonVorige = false,
}) {
  const percentage = Math.round((voortgang.stap / voortgang.totaal) * 100);
 
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
            currentStep={voortgang.stap}
            totalSteps={voortgang.totaal}
            onPrevious={onVorige}
            onNext={onVolgende}
            showPrevious={toonVorige}
          />
 
        </aside>
      </div>
    </div>
  );
}