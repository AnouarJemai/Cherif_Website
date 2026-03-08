import { useState } from 'react';
import React from 'react';
import {
  IonApp,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  setupIonicReact,
} from '@ionic/react';
import HomePage from './pages/HomePage';
import ActivitiesPage from './pages/ActivitiesPage';
import PackagesPage from './pages/PackagesPage';
import ContactPage from './pages/ContactPage';
import BottomTabBar from './components/BottomTabBar';

setupIonicReact({ mode: 'md' });

type TabId = 'home' | 'activities' | 'packages' | 'contact';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('home');

  // ✅ Fix: use React.ReactElement instead of JSX.Element
  const pages: Record<TabId, React.ReactElement> = {
    home:       <HomePage setTab={(id) => setActiveTab(id as TabId)} />,
    activities: <ActivitiesPage />,
    packages:   <PackagesPage />,
    contact:    <ContactPage />,
  };

  return (
    <IonApp style={{ '--ion-background-color': '#060c06' } as React.CSSProperties}>
      {/* Header */}
      <IonHeader>
        <IonToolbar
          style={{
            '--background': 'rgba(6,12,6,0.98)',
            '--border-color': 'rgba(201,168,76,0.15)',
          } as React.CSSProperties}
        >
          <IonTitle>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              <div
                style={{
                  width: 30, height: 30, borderRadius: '50%',
                  background: 'linear-gradient(135deg,#C9A84C,#8B6914)',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: 13,
                }}
              >
                ✦
              </div>
              <span
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 16, fontWeight: 800, letterSpacing: 2,
                  background: 'linear-gradient(90deg,#C9A84C,#F5E07A,#C9A84C)',
                  backgroundSize: '200%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: 'shimmer 3s linear infinite',
                }}
              >
                VIP DJERBA
              </span>
            </div>
          </IonTitle>

          <IonButtons slot="end" style={{ paddingRight: 12 }}>
            <IonButton
              color="warning"
              fill="solid"
              shape="round"
              size="small"
              style={{ '--border-radius': '20px' } as React.CSSProperties}
              onClick={() => setActiveTab('contact')}
            >
              Réserver
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      {/* Page Content */}
      <IonContent style={{ '--background': '#060c06' } as React.CSSProperties}>
        {pages[activeTab]}
      </IonContent>

      {/* Bottom Tab Bar */}
      <BottomTabBar
        activeTab={activeTab}
        setTab={(id) => setActiveTab(id as TabId)}
      />
    </IonApp>
  );
}
