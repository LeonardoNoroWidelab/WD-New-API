# 🎟️2️⃣ Cupom Vendedor

Documentação da API da versão 2 do módulo Cupom Vendedor, com novos dados no dashboard, novos filtros e otimizações.

## 🏪 Lista de lojas Supervisor

- Incluir paginação na lista de lojas
- Incluir a quantidade de cupons utilizados na lista de lojas

`GET`
`/loja/suprvisor?userid={userId}&page=2`

**📄 Resposta:**

```json
{
  "lojas": [
    {
      "id": 11,
      "codcliente": 123,
      "cnpj": "01670550000212",
      "company": "COMERCIO DE CONFEC LTDA",
      "shopping": "Loja",
      "cidade": "Cascavel",
      "estado": "PR",
      "supervisor": "João",
      "userid": "colcci-teste@amctextil.com.br",
      "appid": "colcci",
      "createdAt": "2025-06-12 12:48:11",
      "pedidosCupom": 27 // NOVOS DADOS
    }
  ]
}
```

---

Ordenar as lojas pelo "Ranking" de tickets utilizados (quantidade de pedidos)

`GET`
`/loja/suprvisor?userid={userId}&page=2`

**📄 Resposta:**

```json
{
  "lojas": [
    {
      "id": 11,
      "codcliente": 123,
      "cnpj": "01670550000212",
      "company": "COMERCIO DE CONFEC LTDA",
      "shopping": "Loja",
      "cidade": "Cascavel",
      "estado": "PR",
      "supervisor": "João",
      "userid": "colcci-teste@amctextil.com.br",
      "appid": "colcci",
      "createdAt": "2025-06-12 12:48:11",
      "pedidosCupom": 27 // ORDENAR POR ISSO
    },
    {
      "id": 15,
      "codcliente": 124,
      "cnpj": "01670550000213",
      "company": "COMERCIO DE 2",
      "shopping": "Loja 2",
      "cidade": "Cascavel",
      "estado": "PR",
      "supervisor": "João",
      "userid": "colcci-teste@amctextil.com.br",
      "appid": "colcci",
      "createdAt": "2025-06-12 12:48:11",
      "pedidosCupom": 25 // ORDENAR POR ISSO
    },
    {
      "id": 10,
      "codcliente": 125,
      "cnpj": "01670550000214",
      "company": "COMERCIO DE 3",
      "shopping": "Loja 3",
      "cidade": "Cascavel",
      "estado": "PR",
      "supervisor": "João",
      "userid": "colcci-teste@amctextil.com.br",
      "appid": "colcci",
      "createdAt": "2025-06-12 12:48:11",
      "pedidosCupom": 18 // ORDENAR POR ISSO
    }
  ]
}
```

---

## 📊 Dashboard

No Dashboard Incluir "Total de vendas" .

Para o Supervisor:

`GET`
`/cupomapi/kpis/suprvisor?userid={userId}`

Para a loja (gerente):

`GET`
`/cupomapi/kpis/loja?cnpj=59218223000172`

Para o vendedor

`GET`
`/cupomapi/kpis/vendedor?userid={userId}`

**📄 Resposta:**

```json
{
  "pedidos": 3,
  "convertidos": 2,
  "cancelados": 1,
  "pecasAtendimento": 1.56,
  "ticketMedio": 122.34,
  "precoMedio": 124.56,
  "totalVendido": 456.23 // NOVOS DADOS
}
```

---

Incluir filtro de **mês** e **ano** opcionais para os dados do Supervisor e dados da loja.

### 🔍 Filtros data Supervisor 🧑‍💼

#### 📊 Dashboard

`GET`
`/cupomapi/kpis/suprvisor?userid={userId}&mes=7&ano=2025`

#### 🏪 Lista de lojas

`GET`
`/loja/suprvisor?userid={userId}&page=2&mes=7&ano=2025`

> O filtro de mes e ano é necessário nas lojas também porque agora vai ter quantidade de cupons dessa loja na lista de lojas.

### 🔍 Filtros data Loja (Gerente) 🏪

#### 📊 Dashboard

`GET`
`/cupomapi/kpis/loja?cnpj=59218223000172&mes=7&ano=2025`

#### 🧍 Lista de Vendedores

`GET`
`/cupomapi/vendedores?cnpj=59218223000172&mes=7&ano=2025`

### 🔍 Filtros data Vendedor 🧍

#### 📊 Dashboard

`GET`
`/cupomapi/kpis/vendedor?userid={userId}&mes=7&ano=2025`

#### 📊 Extrato

`GET`
`/api/extratos?cupom={cupom}&mes=7&ano=2025`

> Lembrando que os filtros de data devem ser opcionais, pois é possível do usuário querer saber dados do ano inteiro ou dados de tudo desde o início.
