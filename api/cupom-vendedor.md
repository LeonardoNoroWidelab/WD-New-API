# 🎟️ Cupom Vendedor

Documentação da API do módulo **Cupom Vendedor**, com rotas voltadas para acompanhamento de KPIs e performance de vendas com uso de cupons.

---

## 🆕 Novas Rotas

### 📊 Dashboard Supervisor

`GET`  
`/cupomapi/kpis/suprvisor?userId={{userIdSupervisor}}`

📄 **Resposta:**

```json
{
  "pedidos": 12, // Quantidade de pedidos enviados em todas as lojas
  "convertidos": 5, // Quantidade de pedidos converidos em todas as lojas
  "retornados": 7, // Quantidade de pedidos retornados em todas as lojas
  "pecasAtendimento": 3 // Quantidade de peças por atendimento em todas as lojas
}
```

---

### 🧑‍💼 Gerente – Lista de Vendedores da Loja

`GET`  
`/cupomapi/vendedores?cnpj={{cnpjLoja}}`

📄 **Resposta:**

```json
{
  "nomeVendedor": "Nome do vendedor",
  "cpfVendedor": "CPF do vendedor",
  "userIdVendedor": "User Id do vendedor",
  "cnpjLoja": "CNPJ da loja",
  "pedidosCupom": 999 // Quantidade de pedidos com o cupom desse vendedor
}
```

---

### 🏪 Dashboard Gerente de Loja

`GET`  
`/cupomapi/kpis/loja?cnpj={{cnpjLoja}}`

📄 **Resposta:**

```json
{
  "pedidos": 12, // Quantidade de pedidos enviados da loja
  "convertidos": 5, // Quantidade de pedidos converidos da loja
  "retornados": 7, // Quantidade de pedidos retornados da loja
  "pecasAtendimento": 3, // Quantidade de peças por atendimento da loja,
  "ticketMedio": 12.3, // Ticket médio da loja
  "precoMedio": 12.3 // Preço médio da loja
}
```

---

### 🧍 Dashboard Vendedor

`GET`  
`/cupomapi/kpis/vendedor?userId={{userIdVendedor}}`

📄 **Resposta:**

```json
{
  "pedidos": 12, // Quantidade de pedidos enviados da loja
  "convertidos": 5, // Quantidade de pedidos converidos da loja
  "retornados": 7, // Quantidade de pedidos retornados da loja
  "pecasAtendimento": 3, // Quantidade de peças por atendimento da loja,
  "ticketMedio": 12.3, // Ticket médio da loja
  "precoMedio": 12.3 // Preço médio da loja
}
```
