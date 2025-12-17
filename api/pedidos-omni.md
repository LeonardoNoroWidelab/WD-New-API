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

`POST` `/pedidos/obterLista`

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
      "appId": "colcci",
      "cnpjLoja": "123887830000159",
      "codPedido": "456000801123-F1",
      "dataHoraEmissao": "2025-12-15 20:45:36",
      "nomeCliente": "João da Silva",
      "cpfCliente": "12345678956",
      "codCliente": 5412,
      "nomeLoja": "FORUM | BRASILIA | PARK SHP | FRANQUIA  ",
      "status": "DELIVERED",
      "valorPedido": 650.27,
      "itens": [
        // Asco_Eco_Core_Model.PedidoItem
        {
          "codReduzido": "12343566",
          "descontoProporcionalCapa": 82.6,
          "precoUnitario": 617.4,
          "quantidade": 1,
          "sku": "7901234561230",
          "skuEditado": "032.01.02329-0-VC387-PP",
          "valorBruto": 700,
          "valorDesconto": 0,
          "nome": "Blusa Colcci com detalhes" // Não temos o nome na tabela do CSW
        }
      ]
    }
  ]
}
```

## 🧩 Mapeamento de campos (origem dos dados)

### 🧾 Capa do Pedido (estrutura principal do retorno)

| Campo no retorno  | Origem (classe/tabela)        | Campo/coluna     |
| ----------------- | ----------------------------- | ---------------- |
| `appId`           | `Asco_Eco_Core.Pedido`        | `channelId`      |
| `cnpjLoja`        | `Asco_Eco_Core_Model.Entrega` | `cnpjLocation`   |
| `codPedido`       | `Asco_Eco_Core.Pedido`        | `pedidoCliente`  |
| `dataHoraEmissao` | `Asco_Eco_Core_Model.Pedido`  | `dataEmissao`    |
| `nomeCliente`     | `Asco_Eco_Core.Cliente`       | `nomeCompleto`   |
| `cpfCliente`      | `Asco_Eco_Core_Model.Pedido`  | `cpfCliente`     |
| `codCliente`      | `Asco_Eco_Core.Pedido`        | `codCliente`     |
| `nomeLoja`        | `Asco_Eco_Core_Model.Entrega` | `location`       |
| `status`          | `Asco_Eco_Core_Model.Entrega` | `status`         |
| `valorPedido`     | `Asco_Eco_Core.Pedido`        | `DadosPagamento` |

**📌 Nota de referência**

- A estrutura da **capa** é muito próxima da API já usada no N8N (`/api/customwd/v10/pedidos`), então é recomendável reutilizar a mesma base SQL/joins para consistência.

---

### 🧺 Itens do Pedido (array `itens`)

| Campo no item              | Origem (classe/tabela)           | Campo/coluna               |
| -------------------------- | -------------------------------- | -------------------------- |
| `codReduzido`              | `Asco_Eco_Core_Model.PedidoItem` | `codReduzido`              |
| `descontoProporcionalCapa` | `Asco_Eco_Core_Model.PedidoItem` | `descontoProporcionalCapa` |
| `precoUnitario`            | `Asco_Eco_Core_Model.PedidoItem` | `precoUnitario`            |
| `quantidade`               | `Asco_Eco_Core_Model.PedidoItem` | `quantidade`               |
| `sku`                      | `Asco_Eco_Core_Model.PedidoItem` | `sku`                      |
| `skuEditado`               | `Asco_Eco_Core_Model.PedidoItem` | `skuEditado`               |
| `valorBruto`               | `Asco_Eco_Core_Model.PedidoItem` | `valorBruto`               |
| `valorDesconto`            | `Asco_Eco_Core_Model.PedidoItem` | `valorDesconto`            |
| `nome`                     | `Asco_Eco_Core_Model.PedidoItem` | `nome`                     |

---

### 🔎 Query sugerida (itens por pedido)

```sql
SELECT *
FROM Asco_Eco_Core_Model.PedidoItem Itemped
WHERE Itemped.numeroPedido = '456000801123';
```
