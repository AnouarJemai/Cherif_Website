import { useState } from 'react';
import React from 'react';
import {
  IonButton,
  IonChip,
  IonLabel,
} from '@ionic/react';
import type { Activity } from '../data/data';
import { ACTIVITIES } from '../data/data';

type Step = 1 | 2 | 3;

const WHATSAPP_NUMBER = '21694512405'; // ✅ replace with your number (no + or spaces)

export default function BookingPage() {
  const [step, setStep]             = useState<Step>(1);
  const [activity, setActivity]     = useState<Activity | null>(null);
  const [date, setDate]             = useState('');
  const [people, setPeople]         = useState(1);
  const [note, setNote]             = useState('');

  const minDate = new Date().toISOString().split('T')[0];

  const buildWhatsAppURL = () => {
    const text = [
      `Bonjour Djerba activities ! 👋`,
      ``,
      `Je souhaite réserver :`,
      `🎯 Activité : ${activity?.title}`,
      `📅 Date     : ${date}`,
      `👥 Personnes: ${people}`,
      note ? `📝 Note     : ${note}` : '',
      ``,
      `Merci de confirmer la disponibilité !`,
    ].filter(l => l !== undefined).join('\n');

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: '#0d1a0d',
    border: '1px solid rgba(201,168,76,0.2)',
    borderRadius: 10,
    padding: '12px 14px',
    color: '#fff',
    fontSize: 14,
    outline: 'none',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s',
    colorScheme: 'dark',
  };

  const labelStyle: React.CSSProperties = {
    color: '#C9A84C',
    fontSize: 11,
    letterSpacing: 1,
    textTransform: 'uppercase',
    display: 'block',
    marginBottom: 8,
  };

  return (
    <div style={{ background: '#060c06', minHeight: '100%', padding: '24px 18px 40px' }}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>

        {/* Header */}
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
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 32, gap: 0 }}>
          {([1, 2, 3] as Step[]).map((s, i) => (
            <React.Fragment key={s}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: step >= s ? '#C9A84C' : '#0e1a0e',
                  border: `1px solid ${step >= s ? '#C9A84C' : 'rgba(201,168,76,0.2)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: step >= s ? '#000' : '#4a6a4a',
                  fontWeight: 700, fontSize: 13,
                  transition: 'all 0.3s',
                }}>{s}</div>
                <span style={{ fontSize: 10, color: step >= s ? '#C9A84C' : '#3a5a3a',
                  whiteSpace: 'nowrap', letterSpacing: 0.5 }}>
                  {['Activité', 'Date & pers.', 'Confirmer'][i]}
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

        {/* ── STEP 1: Choose Activity ── */}
        {step === 1 && (
          <div>
            <p style={{ color: '#6a8a6a', fontSize: 13, marginBottom: 20 }}>
              Choisissez l'activité que vous souhaitez réserver :
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {ACTIVITIES.map(a => (
                <div key={a.id}
                  onClick={() => setActivity(a)}
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
                  }}
                >
                  <div style={{ width: 48, height: 48, borderRadius: 12, overflow: 'hidden', flexShrink: 0 }}>
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

            <IonButton
              expand="block" color="warning" shape="round"
              disabled={!activity}
              onClick={() => setStep(2)}
              style={{ '--border-radius': '25px', marginTop: '24px' } as React.CSSProperties}
            >
              Suivant — Date & personnes →
            </IonButton>
          </div>
        )}

        {/* ── STEP 2: Date & People ── */}
        {step === 2 && (
          <div>
            {/* Selected activity recap */}
            <div style={{ background: 'rgba(201,168,76,0.07)',
              border: '1px solid rgba(201,168,76,0.2)',
              borderRadius: 12, padding: '12px 16px', marginBottom: 24,
              display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 20 }}>{activity?.icon}</span>
              <div>
                <span style={{ color: '#C9A84C', fontSize: 12, display: 'block' }}>Activité choisie</span>
                <span style={{ color: '#fff', fontWeight: 600, fontSize: 14,
                  fontFamily: "'Playfair Display', serif" }}>{activity?.title}</span>
              </div>
              <button onClick={() => setStep(1)} style={{
                marginLeft: 'auto', background: 'transparent',
                border: '1px solid rgba(201,168,76,0.2)', borderRadius: 8,
                color: '#C9A84C', fontSize: 11, padding: '4px 10px', cursor: 'pointer',
              }}>Changer</button>
            </div>

            {/* Date */}
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>Date souhaitée</label>
              <input
                type="date"
                value={date}
                min={minDate}
                onChange={e => setDate(e.target.value)}
                style={inputStyle}
                onFocus={e => (e.target.style.borderColor = '#C9A84C')}
                onBlur={e  => (e.target.style.borderColor = 'rgba(201,168,76,0.2)')}
              />
            </div>

            {/* People counter */}
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>Nombre de personnes</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <button
                  onClick={() => setPeople(p => Math.max(1, p - 1))}
                  style={{ width: 40, height: 40, borderRadius: '50%',
                    background: '#0e1a0e', border: '1px solid rgba(201,168,76,0.2)',
                    color: '#C9A84C', fontSize: 20, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                <span style={{ color: '#fff', fontSize: 24, fontWeight: 700,
                  fontFamily: "'Playfair Display', serif", minWidth: 32, textAlign: 'center' }}>
                  {people}
                </span>
                <button
                  onClick={() => setPeople(p => Math.min(20, p + 1))}
                  style={{ width: 40, height: 40, borderRadius: '50%',
                    background: '#0e1a0e', border: '1px solid rgba(201,168,76,0.2)',
                    color: '#C9A84C', fontSize: 20, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                <span style={{ color: '#4a6a4a', fontSize: 13 }}>
                  {people === 1 ? 'personne' : 'personnes'}
                </span>
              </div>
            </div>

            {/* Optional note */}
            <div style={{ marginBottom: 24 }}>
              <label style={labelStyle}>Note (optionnel)</label>
              <textarea
                value={note}
                onChange={e => setNote(e.target.value)}
                rows={3}
                placeholder="Ex: allergie, préférence horaire, demande spéciale..."
                style={{ ...inputStyle, resize: 'vertical' }}
                onFocus={e => (e.target.style.borderColor = '#C9A84C')}
                onBlur={e  => (e.target.style.borderColor = 'rgba(201,168,76,0.2)')}
              />
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <IonButton fill="outline" color="warning" shape="round"
                onClick={() => setStep(1)}
                style={{ flex: 1, '--border-radius': '25px' } as React.CSSProperties}>
                ← Retour
              </IonButton>
              <IonButton color="warning" shape="round"
                disabled={!date}
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

            {/* Summary card */}
            <div style={{ background: '#0e1a0e',
              border: '1px solid rgba(201,168,76,0.2)',
              borderRadius: 18, padding: '22px', marginBottom: 24 }}>

              {/* Activity image */}
              <div style={{ height: 140, borderRadius: 12, overflow: 'hidden', marginBottom: 18 }}>
                <img src={activity?.img} alt={activity?.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              {[
                { label: 'Activité',   value: `${activity?.icon} ${activity?.title}` },
                { label: 'Date',       value: new Date(date + 'T00:00:00').toLocaleDateString('fr-FR', { weekday:'long', day:'numeric', month:'long', year:'numeric' }) },
                { label: 'Personnes', value: `${people} ${people === 1 ? 'personne' : 'personnes'}` },
                { label: 'Prix est.',  value: `~${activity?.price} × ${people}` },
                ...(note ? [{ label: 'Note', value: note }] : []),
              ].map((row, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                  padding: '10px 0',
                  borderBottom: i < 3 ? '1px solid rgba(201,168,76,0.08)' : 'none',
                }}>
                  <span style={{ color: '#4a6a4a', fontSize: 12, letterSpacing: 0.5,
                    textTransform: 'uppercase' }}>{row.label}</span>
                  <span style={{ color: '#fff', fontSize: 14, fontWeight: 500,
                    textAlign: 'right', maxWidth: '60%' }}>{row.value}</span>
                </div>
              ))}
            </div>

            {/* Info note */}
            <div style={{ background: 'rgba(37,211,102,0.06)',
              border: '1px solid rgba(37,211,102,0.2)',
              borderRadius: 12, padding: '12px 16px', marginBottom: 24 }}>
              <p style={{ color: '#25d366', fontSize: 13, margin: 0 }}>
                💬 Un message pré-rempli sera envoyé sur WhatsApp. Notre équipe confirme
                la disponibilité et le paiement directement avec vous.
              </p>
            </div>

            <div style={{ display: 'flex', gap: 12, flexDirection: 'column' }}>
              {/* WhatsApp CTA */}
              <a href={buildWhatsAppURL()} target="_blank" rel="noreferrer"
                style={{ textDecoration: 'none' }}>
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
            </div>

            {/* Reset */}
            <button onClick={() => { setStep(1); setActivity(null); setDate(''); setPeople(1); setNote(''); }}
              style={{ background: 'transparent', border: 'none', color: '#3a5a3a',
                fontSize: 12, cursor: 'pointer', marginTop: 20, display: 'block',
                textAlign: 'center', width: '100%' }}>
              Nouvelle réservation
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
