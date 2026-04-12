import { useState } from 'react';
import { IonButton, IonChip, IonLabel } from '@ionic/react';

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const inputStyle: React.CSSProperties = {
    width: '100%', background: '#0d1a0d',
    border: '1px solid rgba(201,168,76,0.2)',
    borderRadius: 10, padding: '12px 14px',
    color: '#fff', fontSize: 14, outline: 'none',
    fontFamily: 'inherit', boxSizing: 'border-box',
    transition: 'border-color 0.3s',
  };

  return (
    <div style={{ background: '#060c06', minHeight: '100%', padding: '24px 18px 20px' }}>
      <div style={{ maxWidth: 580, margin: '0 auto' }}>
        <p style={{ color: '#C9A84C', fontSize: 10, letterSpacing: 4,
          textTransform: 'uppercase', marginBottom: 8 }}>✦ Contactez-nous ✦</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(26px,4vw,44px)', color: '#fff', marginBottom: 10 }}>
          Prêt pour votre<br />
          <span style={{ fontStyle: 'italic', color: '#C9A84C' }}>aventure VIP ?</span>
        </h2>
        <p style={{ color: '#4a6a4a', marginBottom: 28, fontSize: 14 }}>
          Notre équipe est disponible 24h/24.
        </p>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 32 }}>
          {[{i:'📞',t:'+216 94 512 405'},{i:'📧',t:'sondessjm@gmail.com'},{i:'📍',t:'Djerba, Tunisie'}].map((c,i)=>(
            <IonChip key={i} color="warning" outline>
              <IonLabel style={{ fontSize: 12 }}>{c.i} {c.t}</IonLabel>
            </IonChip>
          ))}
        </div>

        {sent ? (
          <div style={{ background: '#0d1a0d', border: '1px solid rgba(201,168,76,0.3)',
            borderRadius: 18, padding: '48px 24px', textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 14 }}>✅</div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22,
              color: '#C9A84C', marginBottom: 8 }}>Message envoyé !</h3>
            <p style={{ color: '#6a8a6a', marginBottom: 24 }}>
              Notre équipe vous répondra dans les plus brefs délais.
            </p>
            <IonButton color="warning" fill="outline" shape="round"
              onClick={() => { setSent(false); setName(''); setEmail(''); setMsg(''); }}>
              Nouveau message
            </IonButton>
          </div>
        ) : (
          <div style={{ background: '#0d1a0d', border: '1px solid rgba(201,168,76,0.12)',
            borderRadius: 18, padding: '26px' }}>
            {[
              { label: 'Votre nom', val: name, set: setName, type: 'text', ph: 'Sophie Martin' },
              { label: 'Email ou WhatsApp', val: email, set: setEmail, type: 'email', ph: 'email@exemple.com' },
            ].map((f, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <label style={{ color: '#C9A84C', fontSize: 11, letterSpacing: 1,
                  textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>{f.label}</label>
                <input value={f.val} onChange={e => f.set(e.target.value)}
                  type={f.type} placeholder={f.ph} style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = '#C9A84C')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(201,168,76,0.2)')} />
              </div>
            ))}
            <div style={{ marginBottom: 22 }}>
              <label style={{ color: '#C9A84C', fontSize: 11, letterSpacing: 1,
                textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Votre message</label>
              <textarea value={msg} onChange={e => setMsg(e.target.value)} rows={4}
                placeholder="Dites-nous ce que vous souhaitez réserver..."
                style={{ ...inputStyle, resize: 'vertical' }}
                onFocus={e => (e.target.style.borderColor = '#C9A84C')}
                onBlur={e => (e.target.style.borderColor = 'rgba(201,168,76,0.2)')} />
            </div>
            <IonButton expand="block" color="warning" shape="round"
              onClick={() => { if (name && email && msg) setSent(true); }}
              style={{ '--border-radius': '25px', marginBottom: 16 }}>
              Envoyer le message ✉️
            </IonButton>
            <div style={{ textAlign: 'center', paddingTop: 8 }}>
              <p style={{ color: '#3a5a3a', fontSize: 12, marginBottom: 12 }}>
                Ou directement sur WhatsApp
              </p>
              <IonButton color="success" shape="round"
                style={{ '--box-shadow': '0 6px 18px rgba(37,211,102,0.25)' }}>
                💬 WhatsApp — +216 94 512 405
              </IonButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}