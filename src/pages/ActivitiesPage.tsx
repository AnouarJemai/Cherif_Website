import { useState } from 'react';
import { IonSegment, IonSegmentButton, IonLabel } from '@ionic/react';
import { ACTIVITIES } from '../data/data';
import ActivityCard from '../components/ActivityCard';

const FILTERS = ['Tous', 'Mer', 'Désert', 'Gastronomie', 'Mobilité'];

export default function ActivitiesPage() {
  const [filter, setFilter] = useState('Tous');
  const filtered = filter === 'Tous'
    ? ACTIVITIES
    : ACTIVITIES.filter(a => a.category === filter);

  return (
    <div style={{ background: '#060c06', minHeight: '100%', padding: '24px 18px 20px' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <p style={{ color: '#C9A84C', fontSize: 10, letterSpacing: 4,
          textTransform: 'uppercase', marginBottom: 8 }}>✦ Ce que nous offrons ✦</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(26px,4vw,44px)', color: '#fff', marginBottom: 24 }}>
          Nos <span style={{ fontStyle: 'italic', color: '#C9A84C' }}>Activités</span>
        </h2>

        <IonSegment value={filter}
          onIonChange={e => setFilter(e.detail.value as string)}
          style={{ marginBottom: 28, maxWidth: 600,
            '--background': '#0d1a0d',
            '--color-checked': '#000',
            '--background-checked': '#C9A84C' }}>
          {FILTERS.map(f => (
            <IonSegmentButton key={f} value={f}>
              <IonLabel style={{ fontSize: 11 }}>{f}</IonLabel>
            </IonSegmentButton>
          ))}
        </IonSegment>

        <div style={{ display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
          {filtered.map((a, i) => <ActivityCard key={a.id} activity={a} index={i} />)}
        </div>
      </div>
    </div>
  );
}