# 🛍️ Pedidos Omni

**Objetivo:** Criar APIs para alimentar o dashboard de pedidos (gráficos por **marca** e por **loja** + **listagem**).  
As APIs devem suportar filtros por **período** e **lista de CNPJs** (muitas lojas), portanto serão **POST** com filtros no **body**.

> **Nota:** A lista de `cnpj` pode ser grande (supervisores com muitas lojas), então **não usar query params**.

---

### `POST` - Buscar KPIs (Resumo)

#### 📌 Finalidade

Buscar os dados de KPIs com uma determinada lista de CNPJs das lojas.

#### 🛣️ Endpoint

`POST` `/pedidos/obterResumo`

#### 🔎 Body Params (filtros)

```ts
type RequestBody = {
  appId: string; // Ex.: "colcci"
  cnpj: string[]; // Ex.: ["98765432000156", "56776217000142", "01670690000159", ...]
  dataInicio: string; // Ex.: "2025-12-01" (YYYY-MM-DD)
  dataFim: string; // Ex.: "2025-12-31" (YYYY-MM-DD)
};
```

#### 📄 Resposta

```json
{
  "data": {
    "pendentesFaturamento": 12,
    "pendentesFaturamentoAtencao": 4,

    "aguardandoColeta": 5,
    "aguardandoColetaAtencao": 2,

    "pendentesRetirada": 5,
    "pendentesRetiradaAtencao": 1,

    "faturados": 12,

    "pecasAtendimento": 3,
    "ticketMedio": 2048.72,
    "precoMedio": 1024.0,
    "totalVendido": 98745.78,

    "pedidos": 48
  }
}
```

#### 📌 Regras de contagem (status)

- `pendentesFaturamento` / `pendentesFaturamentoAtencao`: `WAITING`
- `aguardandoColeta` / `aguardandoColetaAtencao`: `SHIPPING_READY`
- `pendentesRetirada` / `pendentesRetiradaAtencao`: `PICKUP_READY`
- `faturados`, `pecasAtendimento`, `ticketMedio`, `precoMedio`, `totalVendido`: `INVOICED | SEND_READY | SHIPPING_READY | SHIPPED | DELIVERED`
- `pedidos`: `WAITING | PICKUP_READY | INVOICED | SEND_READY | SHIPPING_READY | SHIPPED | DELIVERED`

#### ⏱️ Regras de “Atenção”

- `pendentesFaturamentoAtencao`: pedidos em `WAITING` há **mais de 6 horas**
- `aguardandoColetaAtencao`: pedidos em `SHIPPING_READY` há **mais de 24 horas**
- `pendentesRetiradaAtencao`: pedidos em `PICKUP_READY` há **mais de 6 horas**

---

### `POST` - Buscar Lista de Pedidos

#### 📌 Finalidade

Buscar a lista de pedidos conforme determinadas lojas e determinados status.

#### 🛣️ Endpoint

`POST` `/pedidos/lista`

#### 🔎 Body Params (filtros)

```ts
type RequestBody = {
  appId: string; // Ex.: "colcci"
  cnpj: string[]; // Ex.: ["98765432000156", "56776217000142", "01670690000159", ...]
  status: string[]; // Ex.: ["INVOICED", "SEND_READY", "SHIPPING_READY", "SHIPPED", "DELIVERED"]
  dataInicio: string; // Ex.: "2025-12-01"
  dataFim: string; // Ex.: "2025-12-31"
};
```

#### 📄 Resposta

```json
{
  "data": [
    {
      "channelId": "colcci",
      "cnpjLoja": "28288730000159",
      "codPedido": "46000102793-F1",
      "dataHoraEmissao": "2025-12-04 22:45:36",
      "nomeCliente": "Nathalia Braga",
      "cpfCliente": "12345678956",
      "nomeLoja": "FORUM | BRASILIA | PARK SHP | FRANQUIA  ",
      "status": "DELIVERED",
      "totalProdutos": 636.27,
      "frete": 30.0,
      "descontos": 16.0,
      "valorPedido": 650.27,
      "itens": [
        {
          "ean": "7891234561230",
          "descricao": "Blusa Colcci com detalhes",
          "sku": "12343566",
          "cor": "bege",
          "tamanho": "M",
          "quantidade": 1,
          "valor": 245.8
        },
        {
          "ean": "7891234561280",
          "descricao": "Calça Colcci",
          "cor": "azul",
          "tamanho": "P",
          "sku": "873712731",
          "quantidade": 1,
          "valor": 390.47
        }
      ]
    }
  ]
}
```
