import { useState } from 'react'
import { IMPRESSORAS, ESTADOS, fmt, getPotencia, getKwh } from './data.js'
import {
  Field, Select, NumberInput, Button,
  Grid2, Grid4, StatCard, MiniCard, ResultBox, PriceHighlight
} from './Components.jsx'
import styles from './TabImpressao.module.css'

export default function TabImpressao() {
  const [estado, setEstado] = useState('SP')
  const [impressora, setImpressora] = useState(IMPRESSORAS[0].nome)
  const [potenciaCustom, setPotenciaCustom] = useState(300)
  const [horas, setHoras] = useState(4)
  const [kgFilamento, setKgFilamento] = useState(80)
  const [gramas, setGramas] = useState(150)
  const [margemLucro, setMargemLucro] = useState(30)
  const [resultado, setResultado] = useState(null)

  const calcular = () => {
    const pot = getPotencia(impressora, potenciaCustom)
    const kwh = getKwh(estado)
    const energiaKwh = (pot / 1000) * horas
    const custoEnergia = energiaKwh * kwh
    const custoFilamento = (gramas / 1000) * kgFilamento
    const custoTotal = custoEnergia + custoFilamento
    const custoPorHora = custoTotal / horas
    const precoSugerido = custoTotal * (1 + margemLucro / 100)
    const percEnergia = (custoEnergia / custoTotal) * 100
    const percFilamento = (custoFilamento / custoTotal) * 100
    setResultado({ custoEnergia, custoFilamento, custoTotal, custoPorHora, precoSugerido, energiaKwh, kwh, pot, percEnergia, percFilamento })
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

        <Field label="Modelo da Impressora" hint={impressora !== 'Personalizada' ? `${getPotencia(impressora, potenciaCustom)}W de potência` : 'Informe a potência abaixo'}>
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
        <Field label="Horas de Impressão" hint={`${horas}h = ${(horas * 60).toFixed(0)} minutos`}>
          <NumberInput value={horas} onChange={setHoras} min={0.1} step={0.5} />
        </Field>
        <Field label="Gramas da Peça (g)" hint={`${gramas}g = ${(gramas / 1000).toFixed(3)}kg de filamento`}>
          <NumberInput value={gramas} onChange={setGramas} min={1} />
        </Field>
      </Grid2>

      <Grid2>
        <Field label="Valor do kg de Filamento (R$)" hint={`Custo por grama: R$ ${(kgFilamento / 1000).toFixed(3)}`}>
          <NumberInput value={kgFilamento} onChange={setKgFilamento} min={1} />
        </Field>
        <Field label="Margem de Lucro (%)" hint="Aplicada ao custo total para preço de venda">
          <NumberInput value={margemLucro} onChange={setMargemLucro} min={0} max={1000} />
        </Field>
      </Grid2>

      <Button onClick={calcular}>Calcular custo da impressão</Button>

      {resultado && (
        <ResultBox
          title="Resultado"
          subtitle={`${impressora} · ${resultado.pot}W · ${estadoNome}`}
        >
          <Grid2>
            <StatCard label="Custo Total" value={fmt(resultado.custoTotal)} accent />
            <StatCard label="Custo por Hora" value={fmt(resultado.custoPorHora)} />
          </Grid2>

          {/* Barra de composição */}
          <div className={styles.barWrap}>
            <div className={styles.barLabel}>
              <span>⚡ Energia {resultado.percEnergia.toFixed(1)}%</span>
              <span>🧵 Filamento {resultado.percFilamento.toFixed(1)}%</span>
            </div>
            <div className={styles.bar}>
              <div className={styles.barEnergy} style={{ width: `${resultado.percEnergia}%` }} />
              <div className={styles.barFilament} style={{ width: `${resultado.percFilamento}%` }} />
            </div>
          </div>

          <Grid4>
            <MiniCard icon="⚡" label="Energia consumida" value={`${resultado.energiaKwh.toFixed(3)} kWh`} sub={fmt(resultado.custoEnergia)} />
            <MiniCard icon="🧵" label="Custo filamento" value={`${gramas}g`} sub={fmt(resultado.custoFilamento)} />
            <MiniCard icon="💡" label="Tarifa kWh" value={`R$ ${resultado.kwh.toFixed(4)}`} sub={estado} />
            <MiniCard icon="⏱" label="Duração" value={`${horas}h`} sub={`${(horas * 60).toFixed(0)} min`} />
          </Grid4>

          <PriceHighlight
            label="Preço de Venda Sugerido"
            sub={`Custo + ${margemLucro}% de margem`}
            value={fmt(resultado.precoSugerido)}
          />
        </ResultBox>
      )}
    </div>
  )
}
