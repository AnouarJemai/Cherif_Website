import { IonButton } from '@ionic/react';
import { PACKS } from '../data/data';

export default function PackagesPage() {
  return (
    <div style={{ background: '#060c06', minHeight: '100%', padding: '24px 18px 20px' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <p style={{ color: '#C9A84C', fontSize: 10, letterSpacing: 4,
          textTransform: 'uppercase', marginBottom: 8 }}>✦ Nos Formules ✦</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(26px,4vw,44px)', color: '#fff', marginBottom: 8 }}>
          Choisissez votre{' '}
          <span style={{ fontStyle: 'italic', color: '#C9A84C' }}>Formule</span>
        </h2>
        <p style={{ color: '#4a6a4a', marginBottom: 32, fontSize: 14 }}>
          Des formules sur mesure pour chaque envie.
        </p>

        <div style={{ display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
          {PACKS.map((p, i) => (
            <div key={i} style={{ background: '#0e1a0e', borderRadius: 18,
              border: `1px solid ${p.accent}40`, padding: '26px 22px',
              position: 'relative', overflow: 'hidden',
              transition: 'transform 0.3s, box-shadow 0.3s' }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-5px)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 16px 40px ${p.accent}25`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.transform = 'none';
                (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
              }}>
              {p.badge && (
                <span style={{ position: 'absolute', top: 14, right: 14,
                  background: p.accent, color: '#000', fontSize: 9, fontWeight: 800,
                  padding: '3px 10px', borderRadius: 20 }}>{p.badge}</span>
              )}
              <h3 style={{ fontFamily: "'Playfair Display', serif",
                fontSize: 22, color: '#fff', marginBottom: 4 }}>{p.name}</h3>
              <div style={{ marginBottom: 20 }}>
                <span style={{ fontFamily: "'Playfair Display', serif",
                  fontSize: 36, fontWeight: 900, color: p.accent }}>{p.price}</span>
                <span style={{ color: '#4a6a4a', fontSize: 12, marginLeft: 5 }}>/ pers.</span>
              </div>
              <div style={{ marginBottom: 22 }}>
                {p.features.map((f, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 8,
                    marginBottom: 8, color: '#7a9a7a', fontSize: 13 }}>
                    <span style={{ color: p.accent, fontWeight: 700 }}>✓</span>{f}
                  </div>
                ))}
              </div>
              <IonButton expand="block" fill={p.accent === '#C9A84C' ? 'solid' : 'outline'}
                color="warning" shape="round"
                style={{ '--border-radius': '25px' }}>
                Réserver ce pack
              </IonButton>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}