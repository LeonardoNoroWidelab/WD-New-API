## 🎟️ Cupom Vendedor — Histórico do Cliente

**Objetivo:** APIs para o app de Histórico de Clientes, exibindo:

- ranking por **posição** (clientes que mais compram)
- **dias sem comprar**
- **total gasto** no **ano selecionado**
- **compras mês a mês** do ano selecionado
- **pedidos do cliente** em um **mês/ano** específico

> 📌 Padrões:
>
> - `appid` e `ano` são obrigatórios onde houver cálculo de totais.
> - Rotas devem manter a ordenação por `posicao` (ranking).

---

### `GET` - Buscar lista de clientes

#### 📌 Finalidade

Buscar a lista de clientes do vendedor com totais do **ano selecionado**.  
Deve suportar **paginação** e retornar clientes **ordenados por posição**.

#### 🛣️ Endpoint

`GET` `/vendedor/:userId/clientes`

✅ Exemplo:
`/vendedor/colcci-cristiano.bortolini@widelab.com.br/clientes?appid=colcci&ano=2025&page=1`

#### 🔎 Query Params

- `appid` → **obrigatório**
- `ano` → **obrigatório**
- `page` → opcional (default: `1`)

#### 📄 Resposta

```json
{
  "pagination": {
    "current_page": 1,
    "last_page": 1,
    "per_page": 20,
    "total": 0,
    "from": 0,
    "to": 0,
    "has_more_pages": false
  },
  "clientes": [
    {
      "nome": "Martin Igor Assunção",
      "diasSemComprar": 23,
      "cpf": "94555299639",
      "nascimento": "2007-02-05",
      "sexo": "M",
      "email": "martin_assuncao@l3ambiental.com.br",
      "cep": "09195170",
      "endereco": "Rua Vítor Viana",
      "numero": "990",
      "bairro": "Vila Alzira",
      "cidade": "Santo André",
      "estado": "SP",
      "telefone": "11986331938",
      "totalGasto": 9876.31,
      "posicao": 1
    }
  ]
}
```

---

### `GET` - Buscar detalhes de um cliente

#### 📌 Finalidade

Buscar os dados de **um cliente específico** (para tela de detalhes), incluindo:

- ranking (`posicao`)
- totais do ano (`totalGasto`, `pedidosRealizados`)
- lista `comprasAno` (12 meses do ano selecionado)

#### 🛣️ Endpoint

`GET` `/vendedor/:userId/clientes/:cpf`

✅ Exemplo:
`/vendedor/colcci-cristiano.bortolini@widelab.com.br/clientes/63007247608?appid=colcci&ano=2025`

#### 🔎 Query Params

- `appid` → **obrigatório**
- `ano` → **obrigatório**

#### 📄 Resposta

```json
{
  "data": {
    "nome": "Enrico José Guilherme Melo",
    "diasSemComprar": 5,
    "cpf": "63007247608",
    "nascimento": "1951-01-08",
    "sexo": "M",
    "email": "enricojosemelo@polifiltro.com.br",
    "cep": "91150136",
    "endereco": "Rua F",
    "numero": "652",
    "bairro": "Rubem Berta",
    "cidade": "Porto Alegre",
    "estado": "RS",
    "telefone": "51988859355",
    "totalGasto": 7654.21,
    "posicao": 3,
    "pedidosRealizados": 87,
    "comprasAno": [
      { "mes": 1, "ano": 2025, "valor": 4387.25 },
      { "mes": 2, "ano": 2025, "valor": 3210.44 },
      { "mes": 3, "ano": 2025, "valor": 2875.12 },
      { "mes": 4, "ano": 2025, "valor": 3987.21 },
      { "mes": 5, "ano": 2025, "valor": 2654.92 },
      { "mes": 6, "ano": 2025, "valor": 4123.77 },
      { "mes": 7, "ano": 2025, "valor": 3788.61 },
      { "mes": 8, "ano": 2025, "valor": 2945.33 },
      { "mes": 9, "ano": 2025, "valor": 3501.54 },
      { "mes": 10, "ano": 2025, "valor": 4210.76 },
      { "mes": 11, "ano": 2025, "valor": 3098.12 },
      { "mes": 12, "ano": 2025, "valor": 6.22 }
    ]
  }
}
```

#### 📌 Regras importantes

- `diasSemComprar`: diferença em dias entre **hoje** e a data do **último pedido** do cliente para a marca (`appid`) dentro do contexto do vendedor (se aplicável).

---

### `GET` - Buscar pedidos do cliente por mês/ano

#### 📌 Finalidade

Buscar os pedidos de um cliente no **mês** e **ano** selecionados.

#### 🛣️ Endpoint

`GET` `/vendedor/:userId/clientes/:cpf/pedidos`

✅ Exemplo:
`/vendedor/colcci-cristiano.bortolini@widelab.com.br/clientes/63007247608/pedidos?appid=colcci&ano=2025&mes=7`

#### 🔎 Query Params

- `appid` → **obrigatório**
- `ano` → **obrigatório**
- `mes` → **obrigatório** (1 a 12; aceitar `07` ou `7`)

#### 📄 Resposta

```json
{
  "data": [
    {
      "id": 2314,
      "pedido": "22000139133",
      "valor": 461.5,
      "qtd": 3,
      "data": "2025-07-10 17:00:14",
      "nfe": "https://amc-adapcon-nfecommerce.s3-sa-east-1.amazonaws.com/2c4d1cfe48068522f8072546a8455ce1.pdf",
      "status": "Entregue"
    }
  ]
}
```
