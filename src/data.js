export const IMPRESSORAS = [
  { nome: "Bambu Lab A1 Mini", potencia: 180 },
  { nome: "Bambu Lab A1", potencia: 220 },
  { nome: "Bambu Lab P1S", potencia: 350 },
  { nome: "Bambu Lab X1C", potencia: 400 },
  { nome: "Creality Ender 3", potencia: 270 },
  { nome: "Creality Ender 3 S1", potencia: 350 },
  { nome: "Creality Ender 3 V3", potencia: 300 },
  { nome: "Creality K1", potencia: 350 },
  { nome: "Creality K1 Max", potencia: 400 },
  { nome: "Prusa MK4", potencia: 240 },
  { nome: "Prusa Mini+", potencia: 120 },
  { nome: "Anycubic Kobra 2", potencia: 300 },
  { nome: "Anycubic Kobra 2 Pro", potencia: 350 },
  { nome: "Flashforge Adventurer 5M", potencia: 300 },
  { nome: "Voron 2.4", potencia: 500 },
  { nome: "Personalizada", potencia: null },
];

export const ESTADOS = [
  { uf: "AC", nome: "Acre", kwh: 0.7821 },
  { uf: "AL", nome: "Alagoas", kwh: 0.8234 },
  { uf: "AP", nome: "Amapá", kwh: 0.7456 },
  { uf: "AM", nome: "Amazonas", kwh: 0.8912 },
  { uf: "BA", nome: "Bahia", kwh: 0.8145 },
  { uf: "CE", nome: "Ceará", kwh: 0.8567 },
  { uf: "DF", nome: "Distrito Federal", kwh: 0.7234 },
  { uf: "ES", nome: "Espírito Santo", kwh: 0.7678 },
  { uf: "GO", nome: "Goiás", kwh: 0.7890 },
  { uf: "MA", nome: "Maranhão", kwh: 0.8345 },
  { uf: "MT", nome: "Mato Grosso", kwh: 0.8123 },
  { uf: "MS", nome: "Mato Grosso do Sul", kwh: 0.7956 },
  { uf: "MG", nome: "Minas Gerais", kwh: 0.7512 },
  { uf: "PA", nome: "Pará", kwh: 0.8234 },
  { uf: "PB", nome: "Paraíba", kwh: 0.8678 },
  { uf: "PR", nome: "Paraná", kwh: 0.6789 },
  { uf: "PE", nome: "Pernambuco", kwh: 0.8456 },
  { uf: "PI", nome: "Piauí", kwh: 0.8789 },
  { uf: "RJ", nome: "Rio de Janeiro", kwh: 0.9234 },
  { uf: "RN", nome: "Rio Grande do Norte", kwh: 0.8567 },
  { uf: "RS", nome: "Rio Grande do Sul", kwh: 0.7123 },
  { uf: "RO", nome: "Rondônia", kwh: 0.8012 },
  { uf: "RR", nome: "Roraima", kwh: 0.7345 },
  { uf: "SC", nome: "Santa Catarina", kwh: 0.6912 },
  { uf: "SP", nome: "São Paulo", kwh: 0.7634 },
  { uf: "SE", nome: "Sergipe", kwh: 0.8901 },
  { uf: "TO", nome: "Tocantins", kwh: 0.8123 },
];

export const fmt = (v) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export const getPotencia = (nomeImp, custom) => {
  const found = IMPRESSORAS.find((i) => i.nome === nomeImp);
  return found?.potencia ?? custom;
};

export const getKwh = (uf) =>
  ESTADOS.find((e) => e.uf === uf)?.kwh ?? 0.76;
