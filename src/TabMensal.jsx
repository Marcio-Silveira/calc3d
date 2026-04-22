import { useState } from 'react'
import { IMPRESSORAS, ESTADOS, fmt, getPotencia, getKwh } from './data.js'
import {
  Field, Select, NumberInput, Button,
  Grid2, Grid4, StatCard, MiniCard, ResultBox
} from './Components.jsx'
import styles from './TabMensal.module.css'

export default function TabMensal() {
  const [estado, setEstado] = useState('SP')
  const [impressora, setImpressora] = useState(IMPRESSORAS[0].nome)
  const [potenciaCustom, setPotenciaCustom] = useState(300)
  const [horasDia, setHorasDia] = useState(8)
  const [diasMes, setDiasMes] = useState(22)
  const [kgFilamento, setKgFilamento] = useState(80)
  const [gramasDia, setGramasDia] = useState(300)
  const [resultado, setResultado] = useState(null)

  const calcular = () => {
    const pot = getPotencia(impressora, potenciaCustom)
    const kwh = getKwh(estado)
    const horasMes = horasDia * diasMes
    const energiaKwh = (pot / 1000) * horasMes
    const custoEnergiaMes = energiaKwh * kwh
    const gramasMes = gramasDia * diasMes
    const custoFilamentoMes = (gramasMes / 1000) * kgFilamento
    const custoTotalMes = custoEnergiaMes + custoFilamentoMes
    const custoPorHora = custoTotalMes / horasMes
    const custoPorDia = custoTotalMes / diasMes
    const kgsMes = gramasMes / 1000
    setResultado({ custoEnergiaMes, custoFilamentoMes, custoTotalMes, custoPorHora, custoPorDia, horasMes, gramasMes, kgsMes, energiaKwh, kwh, pot })
  }

  const estadoNome = ESTADOS.find(e => e.uf === estado)?.nome ?? ''

  return (
    <div className={styles.wrap}>
      <Grid2>
        <Field label="Estado" hint={`Tarifa: R$ ${getKwh(estado).toFixed(4)}/kWh`}>
          <Select value={estado} onChange={setEstado}>
            {ESTADOS.map(e => (
              <option key={e.uf} value={e.uf}>{e.uf} — {e.nome}</option>
            ))}
          </Select>
        </Field>

        <Field label="Modelo da Impressora" hint={impressora !== 'Personalizada' ? `${getPotencia(impressora, potenciaCustom)}W` : 'Informe a potência abaixo'}>
          <Select value={impressora} onChange={setImpressora}>
            {IMPRESSORAS.map(i => (
              <option key={i.nome} value={i.nome}>
                {i.nome}{i.potencia ? ` (${i.potencia}W)` : ''}
              </option>
            ))}
          </Select>
        </Field>
      </Grid2>

      {impressora === 'Personalizada' && (
        <Field label="Potência da Impressora (W)">
          <NumberInput value={potenciaCustom} onChange={setPotenciaCustom} min={10} max={3000} />
        </Field>
      )}

      <Grid2>
        <Field label="Horas por Dia" hint={`${horasDia}h/dia × ${diasMes} dias = ${horasDia * diasMes}h no mês`}>
          <NumberInput value={horasDia} onChange={setHorasDia} min={0.5} max={24} step={0.5} />
        </Field>
        <Field label="Dias Ativos no Mês" hint={`${diasMes} dias de operação`}>
          <NumberInput value={diasMes} onChange={setDiasMes} min={1} max={31} />
        </Field>
      </Grid2>

      <Grid2>
        <Field label="Valor do kg de Filamento (R$)">
          <NumberInput value={kgFilamento} onChange={setKgFilamento} min={1} />
        </Field>
        <Field label="Gramas por Dia (média)" hint={`${(gramasDia * diasMes / 1000).toFixed(2)}kg total no mês`}>
          <NumberInput value={gramasDia} onChange={setGramasDia} min={1} />
        </Field>
      </Grid2>

      <Button onClick={calcular}>Calcular custo mensal</Button>

      {resultado && (
        <ResultBox
          title="Resultado Mensal"
          subtitle={`${impressora} · ${resultado.pot}W · ${estadoNome}`}
        >
          <Grid2>
            <StatCard label="Custo Total / Mês" value={fmt(resultado.custoTotalMes)} accent />
            <StatCard label="Custo por Hora" value={fmt(resultado.custoPorHora)} />
          </Grid2>

          <div className={styles.dailyCost}>
            <div className={styles.dcLabel}>Custo médio por dia de operação</div>
            <div className={styles.dcValue}>{fmt(resultado.custoPorDia)}</div>
          </div>

          <Grid4>
            <MiniCard icon="⚡" label="Energia / mês" value={`${resultado.energiaKwh.toFixed(1)} kWh`} sub={fmt(resultado.custoEnergiaMes)} />
            <MiniCard icon="🧵" label="Filamento / mês" value={`${resultado.kgsMes.toFixed(2)}kg`} sub={fmt(resultado.custoFilamentoMes)} />
            <MiniCard icon="⏱" label="Horas / mês" value={`${resultado.horasMes}h`} sub={`${horasDia}h/dia × ${diasMes}d`} />
            <MiniCard icon="💡" label="Tarifa kWh" value={`R$ ${resultado.kwh.toFixed(4)}`} sub={estado} />
          </Grid4>

          <div className={styles.energyNote}>
            <div className={styles.enIcon}>🔌</div>
            <div>
              <div className={styles.enTitle}>Impacto na Conta de Luz</div>
              <div className={styles.enDesc}>
                Consumo estimado apenas pela impressora: <strong>{resultado.energiaKwh.toFixed(1)} kWh/mês</strong> — equivalente a {fmt(resultado.custoEnergiaMes)} a mais na sua conta.
              </div>
            </div>
          </div>
        </ResultBox>
      )}
    </div>
  )
}
