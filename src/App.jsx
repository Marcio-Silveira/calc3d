import { useState } from 'react'
import TabImpressao from './TabImpressao.jsx'
import TabMensal from './TabMensal.jsx'
import styles from './App.module.css'

const TABS = [
  { id: 'impressao', label: 'Por Impressão', icon: '▶' },
  { id: 'mensal',    label: 'Custo Mensal',  icon: '◈' },
]

export default function App() {
  const [aba, setAba] = useState('impressao')

  return (
    <div className={styles.root}>
      {/* Background decoration */}
      <div className={styles.bgGrid} aria-hidden />
      <div className={styles.bgGlow} aria-hidden />

      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.logo}>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <rect width="36" height="36" rx="8" fill="#f97316" fillOpacity="0.1" />
              <polygon points="18,5 30,12 30,24 18,31 6,24 6,12" fill="none" stroke="#f97316" strokeWidth="1.5"/>
              <polygon points="18,11 25,15 25,21 18,25 11,21 11,15" fill="#f97316" fillOpacity="0.2"/>
              <circle cx="18" cy="18" r="3.5" fill="#f97316"/>
            </svg>
            <div>
              <div className={styles.logoTitle}>3D Cost Calc</div>
              <div className={styles.logoSub}>Calculadora de Impressão 3D</div>
            </div>
          </div>
          <div className={styles.headerBadge}>BR · ANEEL 2024</div>
        </div>
      </header>

      {/* Main */}
      <main className={styles.main}>
        <div className={styles.card}>
          {/* Tabs */}
          <div className={styles.tabs}>
            {TABS.map(t => (
              <button
                key={t.id}
                className={`${styles.tab} ${aba === t.id ? styles.tabActive : ''}`}
                onClick={() => setAba(t.id)}
              >
                <span className={styles.tabIcon}>{t.icon}</span>
                {t.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className={styles.content}>
            {aba === 'impressao' && <TabImpressao />}
            {aba === 'mensal'    && <TabMensal />}
          </div>
        </div>

        {/* Footer note */}
        <p className={styles.footer}>
          Tarifas médias por estado — fonte ANEEL 2024. Valores para fins de planejamento.
        </p>
      </main>
    </div>
  )
}
