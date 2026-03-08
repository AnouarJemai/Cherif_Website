import { useRef, useState, useEffect } from 'react';
import { IonButton, IonChip, IonLabel } from '@ionic/react';
import { REVIEWS } from '../data/data';
import StarRow from '../components/StarRow';

function useInView(threshold = 0.05) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView] as const;
}

interface Props { setTab: (id: string) => void; }

export default function HomePage({ setTab }: Props) {
  const [hRef, hInView] = useInView();

  return (
    <div style={{ background: '#060c06', color: '#fff', overflowX: 'hidden' }}>
      {/* ── Hero ── */}
      <section style={{ minHeight: '90vh', position: 'relative',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', padding: '0 20px' }}>

        <div style={{ position: 'absolute', inset: 0, background: `
          radial-gradient(ellipse 80% 60% at 55% 40%, rgba(18,45,18,0.85) 0%, transparent 70%),
          linear-gradient(150deg, #060c06 0%, #091409 55%, #060c06 100%)
        ` }} />

        {/* Floating icons */}
        {[{e:'🚤',x:'72%',y:'16%',d:'0s'},{e:'🐪',x:'78%',y:'65%',d:'1.3s'},
          {e:'🏄',x:'10%',y:'20%',d:'0.7s'},{e:'🌊',x:'7%',y:'70%',d:'2s'}].map((f, i) => (
          <div key={i} style={{ position: 'absolute', left: f.x, top: f.y, fontSize: 28,
            animation: `floatAnim 4s ease-in-out infinite`, animationDelay: f.d }}>{f.e}</div>
        ))}

        <div ref={hRef} style={{ position: 'relative', zIndex: 2, textAlign: 'center',
          maxWidth: 720, opacity: hInView ? 1 : 0,
          transform: hInView ? 'none' : 'translateY(28px)',
          transition: 'all 0.9s cubic-bezier(.23,1,.32,1)' }}>

          <IonChip color="warning" outline style={{ marginBottom: 20 }}>
            <IonLabel style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase' }}>
              ✦ Djerba, Tunisie ✦
            </IonLabel>
          </IonChip>

          <h1 style={{ fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(38px, 7vw, 72px)', lineHeight: 1.07,
            margin: '0 0 20px', fontWeight: 900 }}>
            <span style={{ color: '#fff' }}>Vivez l'</span>
            <span style={{
              background: 'linear-gradient(90deg,#C9A84C,#F5E07A,#C9A84C)',
              backgroundSize: '200%', WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'shimmer 3s linear infinite', fontStyle: 'italic',
            }}>Expérience</span>
            <br /><span style={{ color: '#fff' }}>VIP à Djerba</span>
          </h1>

          <p style={{ color: '#6a8a6a', fontSize: 'clamp(13px,1.8vw,16px)',
            lineHeight: 1.85, maxWidth: 520, margin: '0 auto 36px', fontWeight: 300 }}>
            Jet-ski, bateaux privatisés, excursions dans le désert, cuisine locale et bien plus.
            Une île, mille façons de s'évader.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <IonButton color="warning" size="large" shape="round"
              onClick={() => setTab('activities')}
              style={{ '--box-shadow': '0 8px 24px rgba(201,168,76,0.3)' }}>
              Découvrir les activités 🌴
            </IonButton>
            <IonButton fill="outline" color="warning" size="large" shape="round"
              onClick={() => setTab('packages')}>
              Voir les formules
            </IonButton>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <div style={{ background: 'linear-gradient(90deg,#0a150a,#0f1f0f,#0a150a)',
        borderTop: '1px solid rgba(201,168,76,0.18)',
        borderBottom: '1px solid rgba(201,168,76,0.18)',
        display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
        padding: '28px 20px', gap: 12 }}>
        {[{v:'500+',l:'Clients'},{v:'15+',l:'Activités'},{v:'5★',l:'Note Moy.'},{v:'24/7',l:'Support'}].map((s,i)=>(
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(22px,3vw,36px)', fontWeight: 900, color: '#C9A84C' }}>{s.v}</div>
            <div style={{ color: '#4a6a4a', fontSize: 10, letterSpacing: 1.5,
              textTransform: 'uppercase', marginTop: 3 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* ── Reviews ── */}
      <div style={{ padding: '60px 20px 80px', maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <p style={{ color: '#C9A84C', fontSize: 10, letterSpacing: 4,
            textTransform: 'uppercase', marginBottom: 12 }}>✦ Témoignages ✦</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(24px,4vw,40px)', color: '#fff' }}>
            Ce que disent nos{' '}
            <span style={{ fontStyle: 'italic', color: '#C9A84C' }}>clients</span>
          </h2>
        </div>
        <div style={{ display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 18 }}>
          {REVIEWS.map((r, i) => (
            <div key={i} style={{ background: '#0d1a0d',
              border: '1px solid rgba(201,168,76,0.1)',
              borderRadius: 14, padding: '20px', transition: 'border-color 0.3s' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.35)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.1)')}>
              <StarRow n={r.stars} />
              <p style={{ color: '#7a9a7a', fontSize: 13, lineHeight: 1.7,
                margin: '10px 0 16px', fontStyle: 'italic' }}>"{r.text}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 30, height: 30, borderRadius: '50%',
                  background: 'rgba(201,168,76,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
                  {r.flag}
                </div>
                <span style={{ color: '#fff', fontWeight: 600, fontSize: 13 }}>{r.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}