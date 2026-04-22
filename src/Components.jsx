import styles from './Components.module.css'

export function Field({ label, hint, children }) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>
      {children}
      {hint && <div className={styles.hint}>{hint}</div>}
    </div>
  )
}

export function Select({ value, onChange, children }) {
  return (
    <select className={styles.input} value={value} onChange={e => onChange(e.target.value)}>
      {children}
    </select>
  )
}

export function NumberInput({ value, onChange, min, max, step }) {
  return (
    <input
      type="number"
      className={styles.input}
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={e => onChange(+e.target.value)}
    />
  )
}

export function Button({ onClick, children }) {
  return (
    <button className={styles.btn} onClick={onClick}>
      {children}
    </button>
  )
}

export function Grid2({ children }) {
  return <div className={styles.grid2}>{children}</div>
}

export function Grid4({ children }) {
  return <div className={styles.grid4}>{children}</div>
}

export function StatCard({ label, value, accent }) {
  return (
    <div className={`${styles.statCard} ${accent ? styles.statCardAccent : ''}`}>
      <div className={styles.statLabel}>{label}</div>
      <div className={`${styles.statValue} ${accent ? styles.statValueAccent : ''}`}>{value}</div>
    </div>
  )
}

export function MiniCard({ icon, label, value, sub }) {
  return (
    <div className={styles.miniCard}>
      <div className={styles.miniIcon}>{icon}</div>
      <div className={styles.miniLabel}>{label}</div>
      <div className={styles.miniValue}>{value}</div>
      {sub && <div className={styles.miniSub}>{sub}</div>}
    </div>
  )
}

export function ResultBox({ children, title, subtitle }) {
  return (
    <div className={styles.resultBox}>
      <div className={styles.resultHeader}>
        <span className={styles.resultTitle}>{title}</span>
        {subtitle && <span className={styles.resultSubtitle}>{subtitle}</span>}
      </div>
      <div className={styles.resultBody}>{children}</div>
    </div>
  )
}

export function PriceHighlight({ label, sub, value }) {
  return (
    <div className={styles.priceHighlight}>
      <div>
        <div className={styles.phLabel}>{label}</div>
        {sub && <div className={styles.phSub}>{sub}</div>}
      </div>
      <div className={styles.phValue}>{value}</div>
    </div>
  )
}
