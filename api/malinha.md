# 🧳 Malinha

Documentação das rotas da API do módulo **Malinha**, voltado ao controle de envios, retornos e vendas por mala de produtos

## 🛣️ Rotas atuais

### 🔍 Lista de malas por vendedor

`GET`
`/api/v1/user/{userId}/vendedor/obterMalasLoja?appId=colcci`

Exemplo:

```
https://apihub.homologacao.online/api/v1/user/colcci-cristiano.bortolini@widelab.com.br/vendedor/obterMalasLoja?appId=colcci
```

📄 **Retorno:**

```json
[
  {
    "cpfCliente": "12345678915",
    "nomeCliente": "Jõao da Silva",
    "data": "2025-05-05",
    "situacao": "Concluída",
    "dataRetorno": "2025-05-06",
    "quantidadeVenda": 3,
    "quantidadeRetorno": 2,
    "quantidadeEnvio": 5,
    "valorVenda": 1558.8,
    "valorRetorno": 2132.2,
    "valorEnvio": 3691,
    "diasFora": 1,
    "notaEnvio": "1234",
    "notaVenda": "5678",
    "telefoneCliente": "(47) 1234-5678",
    "emailCliente": "",
    "envios": [
      {
        "codEditado": "123.45.93878",
        "quantidade": 1,
        "precoUnitario": 454,
        "descricaoProduto": "BLUSA VELUDO COM BRILHO MPRETO/PRATA",
        "codSku": "123456789.025.00001"
      }
    ],
    "retornos": [
      {
        "quantidade": 1,
        "codEditado": "123.45.93878",
        "precoUnitario": 454,
        "descricaoProduto": "BLUSA VELUDO COM BRILHO M PRETO/PRATA",
        "codSku": "123456789.025.00001"
      }
    ],
    "vendas": [
      {
        "codEditado": "123.45.93878",
        "quantidade": 1,
        "precoUnitario": 628.2,
        "descricaoProduto": "CALÇA PLISSADA METALIZADA M PRETO/PRATA",
        "codSku": "123456789.025.00001"
      }
    ]
  }
]
```

---

### 📊 Dashboard por Vendedor (KPIs)

`GET`  
`/api/v1/user/{userId}/vendedor/obterResumoMalasLoja?appId=colcci`

Exemplo:

```
https://apihub.homologacao.online/api/v1/user/colcci-cristiano.bortolini@widelab.com.br/vendedor/obterResumoMalasLoja?appId=colcci
```

📄 **Retorno:**

```json
{
  "quantidadeMalas": 6, // Quantidade de malas enviadas
  "quantidadeMalasComVenda": 2, // Quantidade de malas vendidas
  "quantidadeMalasSemVenda": 4, // Quantidade de malas retornadas
  "taxaConversaoValor": 0.15, // valorVenda ÷ valorEnvio
  "taxaConversaoPecas": 0.18, // quantidadeVenda ÷ quantidadeEnvio
  "taxaConversaoMalas": 0.33, // quantidadeMalasComVenda ÷ quantidadeMalas
  "pecasPorAtendimento": 2, // quantidadeVenda ÷ quantidadeMalasComVenda
  "quantidadeEnvio": 22, // Quantidade total de peças enviadas
  "quantidadeVenda": 4, // Quantidade total de peças vendidas
  "valorVenda": 1816.8, // Soma do valor total das malas vendidas
  "precoMedio": 454.2, // valorVenda ÷ quantidadeVenda
  "ticketMedio": 908.4, //valorVenda ÷ quantidadeMalasComVenda
  "valorEnvio": 12049 // Soma do valor total das malas enviadas
}
```

---

## 🆕 Novas Rotas

### 🏬 Lista de Lojas

`GET`  
`/api/user/{userId}/supervisor/lojas?appId=colcci`

```json
[
  {
    "nomeLoja": "A.M.C Têxtil LTDA",
    "cnpjLoja": "12345678000102",
    "appId": "colcci"
  }
]
```

---

### 👥 Lista de Vendedores por Loja

`GET`  
`/api/lojas/{cnpjLoja}/vendedores?appId=colcci`

```json
{
  "loja": {
    "nomeLoja": "A.M.C Têxtil LTDA",
    "cnpjLoja": "12345678000102",
    "appId": "colcci"
  },
  "vendedores": [
    {
      "nomeVendedor": "Cristiano Bortolini",
      "cpfVendedor": "123456789012",
      "userIdVendedor": "colcci-cristiano.bortolini@widelab.com.br",
      "malasFora": 99
    }
  ]
}
```

---

## 📈 Dashboards

### 🧑‍💼 Supervisor

`GET`  
`/api/user/{userId}/supervisor/obterResumoMalasLoja?appId=colcci`

```json
{
  "quantidadeVenda": 4,
  "valorVenda": 1816.8,
  "ticketMedio": 908.4,
  "quantidadeMalasComVenda": 2,
  "quantidadeMalasSemVenda": 4,
  "quantidadeMalas": 6,
  "taxaConversaoValor": 0.15,
  "taxaConversaoPecas": 0.18,
  "taxaConversaoMalas": 0.33,
  "pecasPorAtendimento": 2,
  "precoMedio": 454.2,
  "quantidadeEnvio": 22,
  "valorEnvio": 12049
}
```

---

### 🏪 Loja (Gerente)

`GET`  
`/api/lojas/{cnpjLoja}/obterResumoMalasLoja?appId=colcci`

```json
{
  "quantidadeVenda": 4,
  "valorVenda": 1816.8,
  "ticketMedio": 908.4,
  "quantidadeMalasComVenda": 2,
  "quantidadeMalasSemVenda": 4,
  "quantidadeMalas": 6,
  "taxaConversaoValor": 0.15,
  "taxaConversaoPecas": 0.18,
  "taxaConversaoMalas": 0.33,
  "pecasPorAtendimento": 2,
  "precoMedio": 454.2,
  "quantidadeEnvio": 22,
  "valorEnvio": 12049
}
```

---

## 🧠 Fórmulas de KPI

- 📦 `pecasPorAtendimento` = `quantidadeVenda ÷ quantidadeMalasComVenda`
- 💰 `precoMedio` = `valorVenda ÷ quantidadeVenda`
- 🧾 `ticketMedio` = `valorVenda ÷ quantidadeMalasComVenda`
