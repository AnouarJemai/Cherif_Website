import { useState, useEffect } from 'react';
import React from 'react';
import { IonButton } from '@ionic/react';
import type { Activity } from '../data/data';
import { ACTIVITIES } from '../data/data';

type Step = 1 | 2 | 3;

const WHATSAPP_NUMBER = '21694512405'; // ✅ your number, no + or spaces

interface Props {
  preselected?: Activity | null;       // activity passed from card "Réserver" button
  onClearPreselected?: () => void;     // reset in App.tsx when user goes back to step 1
}

export default function BookingPage({ preselected, onClearPreselected }: Props) {
  const [step, setStep]         = useState<Step>(1);
  const [activity, setActivity] = useState<Activity | null>(null);

  // Client info
  const [clientName,  setClientName]  = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');

  // Booking details
  const [date, setDate]     = useState('');
  const [people, setPeople] = useState(1);
  const [note, setNote]     = useState('');

  const minDate = new Date().toISOString().split('T')[0];

  // ✅ When a preselected activity arrives, set it and jump straight to step 2
  useEffect(() => {
    if (preselected) {
      setActivity(preselected);
      setStep(2);
    }
  }, [preselected]);

  const canProceedStep2 =
    date.trim() !== '' &&
    clientName.trim() !== '' &&
    (clientEmail.trim() !== '' || clientPhone.trim() !== '');

  const buildWhatsAppURL = () => {
    const lines = [
      `Bonjour Djerba activities ! 👋`,
      ``,
      `━━━━━━━━━━━━━━━━━━━`,
      `👤 CLIENT`,
      `━━━━━━━━━━━━━━━━━━━`,
      `Nom    : ${clientName}`,
      clientEmail ? `Email  : ${clientEmail}` : null,
      clientPhone ? `Tél/WA : ${clientPhone}` : null,
      ``,
      `━━━━━━━━━━━━━━━━━━━`,
      `🎯 RÉSERVATION`,
      `━━━━━━━━━━━━━━━━━━━`,
      `Activité  : ${activity?.title} ${activity?.icon}`,
      `Date      : ${new Date(date + 'T00:00:00').toLocaleDateString('fr-FR', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
      })}`,
      `Personnes : ${people}`,
      note ? `Note      : ${note}` : null,
      ``,
      `Merci de confirmer la disponibilité ! 🙏`,
    ].filter((l): l is string => l !== null);

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  const handleReset = () => {
    setStep(1);
    setActivity(null);
    setClientName(''); setClientEmail(''); setClientPhone('');
    setDate(''); setPeople(1); setNote('');
    if (onClearPreselected) onClearPreselected();
  };

  const goBackToStep1 = () => {
    setStep(1);
    if (onClearPreselected) onClearPreselected();
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', background: '#0d1a0d',
    border: '1px solid rgba(201,168,76,0.2)',
    borderRadius: 10, padding: '12px 14px',
    color: '#fff', fontSize: 14, outline: 'none',
    fontFamily: 'inherit', boxSizing: 'border-box',
    transition: 'border-color 0.3s', colorScheme: 'dark',
  };
  const labelStyle: React.CSSProperties = {
    color: '#C9A84C', fontSize: 11, letterSpacing: 1,
    textTransform: 'uppercase', display: 'block', marginBottom: 8,
  };
  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    (e.target.style.borderColor = '#C9A84C');
  const onBlur  = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    (e.target.style.borderColor = 'rgba(201,168,76,0.2)');

  return (
    <div style={{ background: '#060c06', minHeight: '100%', padding: '24px 18px 40px' }}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>

        {/* Title */}
        <p style={{ color: '#C9A84C', fontSize: 10, letterSpacing: 4,
          textTransform: 'uppercase', marginBottom: 8 }}>✦ Réservation ✦</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(24px,4vw,40px)', color: '#fff', marginBottom: 6 }}>
          Réservez votre
          <span style={{ fontStyle: 'italic', color: '#C9A84C' }}> expérience</span>
        </h2>
        <p style={{ color: '#4a6a4a', fontSize: 13, marginBottom: 28 }}>
          En 3 étapes simples — confirmation directe par WhatsApp
        </p>

        {/* Step indicator */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 32 }}>
          {([1, 2, 3] as Step[]).map((s, i) => (
            <React.Fragment key={s}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: step >= s ? '#C9A84C' : '#0e1a0e',
                  border: `1px solid ${step >= s ? '#C9A84C' : 'rgba(201,168,76,0.2)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: step >= s ? '#000' : '#4a6a4a',
                  fontWeight: 700, fontSize: 13, transition: 'all 0.3s',
                }}>{s}</div>
                <span style={{ fontSize: 10, color: step >= s ? '#C9A84C' : '#3a5a3a',
                  whiteSpace: 'nowrap' }}>
                  {['Activité', 'Vos infos', 'Confirmer'][i]}
                </span>
              </div>
              {i < 2 && (
                <div style={{ flex: 1, height: 1, marginBottom: 18,
                  background: step > s ? '#C9A84C' : 'rgba(201,168,76,0.15)',
                  transition: 'background 0.4s' }} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* ── STEP 1: Pick activity (shown only when no preselection) ── */}
        {step === 1 && (
          <div>
            <p style={{ color: '#6a8a6a', fontSize: 13, marginBottom: 20 }}>
              Choisissez l'activité que vous souhaitez réserver :
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {ACTIVITIES.map(a => (
                <div key={a.id} onClick={() => setActivity(a)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    background: activity?.id === a.id ? 'rgba(201,168,76,0.08)' : '#0e1a0e',
                    border: `1px solid ${activity?.id === a.id ? '#C9A84C' : 'rgba(201,168,76,0.1)'}`,
                    borderRadius: 14, padding: '14px 16px',
                    cursor: 'pointer', transition: 'all 0.25s',
                  }}
                  onMouseEnter={e => {
                    if (activity?.id !== a.id)
                      (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(201,168,76,0.35)';
                  }}
                  onMouseLeave={e => {
                    if (activity?.id !== a.id)
                      (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(201,168,76,0.1)';
                  }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12,
                    overflow: 'hidden', flexShrink: 0 }}>
                    <img src={a.img} alt={a.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                      <span style={{ fontSize: 16 }}>{a.icon}</span>
                      <span style={{ color: '#fff', fontWeight: 600, fontSize: 14,
                        fontFamily: "'Playfair Display', serif" }}>{a.title}</span>
                    </div>
                    <span style={{ color: '#C9A84C', fontSize: 13, fontWeight: 700 }}>{a.price}</span>
                    <span style={{ color: '#4a6a4a', fontSize: 12, marginLeft: 4 }}>{a.unit}</span>
                  </div>
                  <div style={{
                    width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                    border: `2px solid ${activity?.id === a.id ? '#C9A84C' : 'rgba(201,168,76,0.2)'}`,
                    background: activity?.id === a.id ? '#C9A84C' : 'transparent',
                    transition: 'all 0.25s',
                  }} />
                </div>
              ))}
            </div>
            <IonButton expand="block" color="warning" shape="round"
              disabled={!activity}
              onClick={() => setStep(2)}
              style={{ '--border-radius': '25px', marginTop: '24px' } as React.CSSProperties}>
              Suivant — Vos informations →
            </IonButton>
          </div>
        )}

        {/* ── STEP 2: Client info + booking details ── */}
        {step === 2 && (
          <div>
            {/* Activity recap — with "Changer" button */}
            <div style={{ background: 'rgba(201,168,76,0.07)',
              border: '1px solid rgba(201,168,76,0.2)',
              borderRadius: 12, padding: '12px 16px', marginBottom: 24,
              display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 44, height: 44, borderRadius: 10,
                overflow: 'hidden', flexShrink: 0 }}>
                <img src={activity?.img} alt={activity?.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ flex: 1 }}>
                <span style={{ color: '#C9A84C', fontSize: 11, display: 'block' }}>Activité choisie</span>
                <span style={{ color: '#fff', fontWeight: 600, fontSize: 14,
                  fontFamily: "'Playfair Display', serif" }}>
                  {activity?.icon} {activity?.title}
                </span>
              </div>
              <button onClick={goBackToStep1} style={{
                background: 'transparent', border: '1px solid rgba(201,168,76,0.2)',
                borderRadius: 8, color: '#C9A84C', fontSize: 11,
                padding: '4px 10px', cursor: 'pointer',
              }}>Changer</button>
            </div>

            {/* Client info */}
            <div style={{ background: '#0e1a0e', border: '1px solid rgba(201,168,76,0.12)',
              borderRadius: 14, padding: '18px', marginBottom: 16 }}>
              <p style={{ color: '#C9A84C', fontSize: 10, letterSpacing: 2,
                textTransform: 'uppercase', marginBottom: 16 }}>👤 Vos coordonnées</p>

              <div style={{ marginBottom: 14 }}>
                <label style={labelStyle}>
                  Nom complet <span style={{ color: '#ff6060' }}>*</span>
                </label>
                <input value={clientName} onChange={e => setClientName(e.target.value)}
                  type="text" placeholder="Ex: Sophie Martin"
                  style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
              </div>

              <div style={{ marginBottom: 14 }}>
                <label style={labelStyle}>
                  Email
                  <span style={{ color: '#4a6a4a', fontSize: 10, marginLeft: 6,
                    textTransform: 'none', letterSpacing: 0 }}>
                    — email ou téléphone requis
                  </span>
                </label>
                <input value={clientEmail} onChange={e => setClientEmail(e.target.value)}
                  type="email" placeholder="email@exemple.com"
                  style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
              </div>

              <div>
                <label style={labelStyle}>
                  Téléphone / WhatsApp
                  <span style={{ color: '#4a6a4a', fontSize: 10, marginLeft: 6,
                    textTransform: 'none', letterSpacing: 0 }}>
                    — email ou téléphone requis
                  </span>
                </label>
                <input value={clientPhone} onChange={e => setClientPhone(e.target.value)}
                  type="tel" placeholder="+33 6 XX XX XX XX"
                  style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
              </div>
            </div>

            {/* Booking details */}
            <div style={{ background: '#0e1a0e', border: '1px solid rgba(201,168,76,0.12)',
              borderRadius: 14, padding: '18px', marginBottom: 20 }}>
              <p style={{ color: '#C9A84C', fontSize: 10, letterSpacing: 2,
                textTransform: 'uppercase', marginBottom: 16 }}>📅 Détails</p>

              <div style={{ marginBottom: 18 }}>
                <label style={labelStyle}>
                  Date souhaitée <span style={{ color: '#ff6060' }}>*</span>
                </label>
                <input type="date" value={date} min={minDate}
                  onChange={e => setDate(e.target.value)}
                  style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
              </div>

              <div style={{ marginBottom: 18 }}>
                <label style={labelStyle}>Nombre de personnes</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <button onClick={() => setPeople(p => Math.max(1, p - 1))}
                    style={{ width: 40, height: 40, borderRadius: '50%',
                      background: '#131f13', border: '1px solid rgba(201,168,76,0.2)',
                      color: '#C9A84C', fontSize: 20, cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                  <span style={{ color: '#fff', fontSize: 24, fontWeight: 700,
                    fontFamily: "'Playfair Display', serif",
                    minWidth: 32, textAlign: 'center' }}>{people}</span>
                  <button onClick={() => setPeople(p => Math.min(20, p + 1))}
                    style={{ width: 40, height: 40, borderRadius: '50%',
                      background: '#131f13', border: '1px solid rgba(201,168,76,0.2)',
                      color: '#C9A84C', fontSize: 20, cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                  <span style={{ color: '#4a6a4a', fontSize: 13 }}>
                    {people === 1 ? 'personne' : 'personnes'}
                  </span>
                </div>
              </div>

              <div>
                <label style={labelStyle}>Note optionnelle</label>
                <textarea value={note} onChange={e => setNote(e.target.value)} rows={3}
                  placeholder="Préférence matin, allergie, demande spéciale..."
                  style={{ ...inputStyle, resize: 'vertical' }}
                  onFocus={onFocus} onBlur={onBlur} />
              </div>
            </div>

            {!canProceedStep2 && (
              <p style={{ color: '#3a5a3a', fontSize: 12, marginBottom: 12 }}>
                * Nom + date + (email ou téléphone) sont requis pour continuer
              </p>
            )}

            <div style={{ display: 'flex', gap: 12 }}>
              <IonButton fill="outline" color="warning" shape="round"
                onClick={goBackToStep1}
                style={{ flex: 1, '--border-radius': '25px' } as React.CSSProperties}>
                ← Retour
              </IonButton>
              <IonButton color="warning" shape="round"
                disabled={!canProceedStep2}
                onClick={() => setStep(3)}
                style={{ flex: 2, '--border-radius': '25px' } as React.CSSProperties}>
                Suivant — Confirmer →
              </IonButton>
            </div>
          </div>
        )}

        {/* ── STEP 3: Summary + WhatsApp ── */}
        {step === 3 && (
          <div>
            <p style={{ color: '#6a8a6a', fontSize: 13, marginBottom: 20 }}>
              Vérifiez votre réservation avant d'envoyer :
            </p>

            <div style={{ background: '#0e1a0e', border: '1px solid rgba(201,168,76,0.2)',
              borderRadius: 18, padding: '22px', marginBottom: 20 }}>

              <div style={{ height: 130, borderRadius: 12, overflow: 'hidden', marginBottom: 18 }}>
                <img src={activity?.img} alt={activity?.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              {/* Client recap */}
              <div style={{ background: 'rgba(201,168,76,0.05)',
                border: '1px solid rgba(201,168,76,0.1)',
                borderRadius: 10, padding: '12px 14px', marginBottom: 12 }}>
                <p style={{ color: '#C9A84C', fontSize: 10, letterSpacing: 2,
                  textTransform: 'uppercase', marginBottom: 10 }}>👤 Client</p>
                {[
                  { l: 'Nom',    v: clientName  },
                  ...(clientEmail ? [{ l: 'Email',  v: clientEmail }] : []),
                  ...(clientPhone ? [{ l: 'Tél/WA', v: clientPhone }] : []),
                ].map((row, i, arr) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between',
                    padding: '5px 0',
                    borderBottom: i < arr.length - 1 ? '1px solid rgba(201,168,76,0.06)' : 'none' }}>
                    <span style={{ color: '#4a6a4a', fontSize: 12 }}>{row.l}</span>
                    <span style={{ color: '#fff', fontSize: 13, fontWeight: 500 }}>{row.v}</span>
                  </div>
                ))}
              </div>

              {/* Booking recap */}
              <div style={{ background: 'rgba(201,168,76,0.05)',
                border: '1px solid rgba(201,168,76,0.1)',
                borderRadius: 10, padding: '12px 14px' }}>
                <p style={{ color: '#C9A84C', fontSize: 10, letterSpacing: 2,
                  textTransform: 'uppercase', marginBottom: 10 }}>🎯 Réservation</p>
                {[
                  { l: 'Activité',  v: `${activity?.icon} ${activity?.title}` },
                  { l: 'Date',      v: new Date(date + 'T00:00:00').toLocaleDateString('fr-FR', {
                    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) },
                  { l: 'Personnes', v: `${people}` },
                  { l: 'Prix est.', v: `${activity?.price} × ${people}` },
                  ...(note ? [{ l: 'Note', v: note }] : []),
                ].map((row, i, arr) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between',
                    alignItems: 'flex-start', padding: '5px 0',
                    borderBottom: i < arr.length - 1 ? '1px solid rgba(201,168,76,0.06)' : 'none' }}>
                    <span style={{ color: '#4a6a4a', fontSize: 12 }}>{row.l}</span>
                    <span style={{ color: '#fff', fontSize: 13, fontWeight: 500,
                      textAlign: 'right', maxWidth: '60%' }}>{row.v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: 'rgba(37,211,102,0.06)',
              border: '1px solid rgba(37,211,102,0.2)',
              borderRadius: 12, padding: '12px 16px', marginBottom: 20 }}>
              <p style={{ color: '#25d366', fontSize: 13, margin: 0 }}>
                💬 Vos coordonnées + détails seront envoyés sur notre WhatsApp.
                Nous vous confirmons la disponibilité rapidement.
              </p>
            </div>

            <a href={buildWhatsAppURL()} target="_blank" rel="noreferrer"
              style={{ textDecoration: 'none', display: 'block', marginBottom: 12 }}>
              <IonButton expand="block" color="success" shape="round"
                style={{
                  '--border-radius': '25px',
                  '--box-shadow': '0 8px 24px rgba(37,211,102,0.25)',
                } as React.CSSProperties}>
                💬 Confirmer via WhatsApp
              </IonButton>
            </a>

            <IonButton expand="block" fill="outline" color="warning" shape="round"
              onClick={() => setStep(2)}
              style={{ '--border-radius': '25px' } as React.CSSProperties}>
              ← Modifier
            </IonButton>

            <button onClick={handleReset} style={{
              background: 'transparent', border: 'none', color: '#3a5a3a',
              fontSize: 12, cursor: 'pointer', marginTop: 20,
              display: 'block', textAlign: 'center', width: '100%',
            }}>
              Nouvelle réservation
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
