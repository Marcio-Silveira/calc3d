# 3D Cost Calc

Calculadora de custo de impressão 3D para o mercado brasileiro.

## Funcionalidades

- **Por Impressão**: calcula custo de energia + filamento de uma impressão específica, com margem de lucro e preço de venda sugerido
- **Custo Mensal**: projeção de custo mensal com horas/dia e gramas/dia

- Tarifas de kWh para todos os 27 estados brasileiros (ANEEL 2024)
- 15 modelos de impressora com potência real + opção personalizada

## Deploy no Vercel

### Opção 1 — Via GitHub (recomendado)

1. Suba este projeto para um repositório GitHub
2. Acesse [vercel.com](https://vercel.com) e clique em **Add New Project**
3. Importe o repositório
4. O Vercel detecta automaticamente o Vite — clique em **Deploy**
5. Pronto! URL gerada automaticamente.

### Opção 2 — Via Vercel CLI

```bash
npm install -g vercel
cd calc3d
npm install
vercel
```

## Rodar localmente

```bash
npm install
npm run dev
```

Acesse: http://localhost:5173
