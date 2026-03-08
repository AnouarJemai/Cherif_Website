import { TABS } from '../data/data';

interface Props {
  activeTab: string;
  setTab: (id: string) => void;
}

export default function BottomTabBar({ activeTab, setTab }: Props) {
  return (
    <div style={{
      background: '#0a140a',
      borderTop: '1px solid rgba(201,168,76,0.18)',
      display: 'flex', flexShrink: 0, zIndex: 50,
    }}>
      {TABS.map(t => (
        <button key={t.id} onClick={() => setTab(t.id)} style={{
          flex: 1, padding: '10px 0 8px',
          background: 'transparent', border: 'none',
          cursor: 'pointer', display: 'flex',
          flexDirection: 'column', alignItems: 'center', gap: 3,
          position: 'relative',
        }}>
          {activeTab === t.id && (
            <div style={{
              position: 'absolute', top: 0, left: '50%',
              transform: 'translateX(-50%)',
              width: 28, height: 2, borderRadius: 2, background: '#C9A84C',
            }} />
          )}
          <span style={{ fontSize: 20 }}>{t.icon}</span>
          <span style={{
            fontSize: 9, letterSpacing: 1,
            textTransform: 'uppercase', fontWeight: 600,
            color: activeTab === t.id ? '#C9A84C' : '#3a5a3a',
          }}>{t.label}</span>
        </button>
      ))}
    </div>
  );
}