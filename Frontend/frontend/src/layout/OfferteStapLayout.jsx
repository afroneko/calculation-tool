import '../styles/layout.css';

export default function OfferteStapLayout({
  title,
  children,
  offerte = {},
  voortgang = { stap: 2, totaal: 8 },
  onVorige,
  onVolgende,
  vorigeDisabled = false,
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
 
          {/* Offerte informatie */}
          <div className="offerte-stap-layout__card">
            <h2 className="offerte-stap-layout__card-title">Offerte informatie</h2>
            <dl className="offerte-stap-layout__info-list">
              <dt>Offertenummer</dt>
              <dd>{offerte.offertenummer ?? '—'}</dd>
 
              <dt>Klant</dt>
              <dd>{offerte.klant ?? '—'}</dd>
 
              <dt>Verkoper</dt>
              <dd>{offerte.verkoper ?? '—'}</dd>
 
              <dt>Aangemaakt op</dt>
              <dd>{offerte.aangemaaktOp ?? '—'}</dd>
            </dl>
          </div>
 
          {/* Voortgang + navigatieknoppen */}
          <div className="offerte-stap-layout__card">
            <h2 className="offerte-stap-layout__card-title">Voortgang</h2>
            <p className="offerte-stap-layout__progress-label">
              {voortgang.stap} van {voortgang.totaal} stappen voltooid
            </p>
            <div className="offerte-stap-layout__progress-track" role="progressbar"
              aria-valuenow={percentage} aria-valuemin={0} aria-valuemax={100}>
              <div
                className="offerte-stap-layout__progress-fill"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span className="offerte-stap-layout__progress-pct">{percentage}%</span>
 
            <div className="offerte-stap-layout__actions">
              <button
                className="offerte-stap-layout__btn offerte-stap-layout__btn--secondary"
                onClick={onVorige}
                disabled={vorigeDisabled}
              >
                ← Vorige stap
              </button>
              <button
                className="offerte-stap-layout__btn offerte-stap-layout__btn--primary"
                onClick={onVolgende}
              >
                Volgende stap →
              </button>
            </div>
          </div>
 
        </aside>
      </div>
    </div>
  );
}