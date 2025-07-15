# 👗 Vitrine

Documentação da API do módulo **Vitrine** e **Vitrine VM**, com rotas voltadas para cadsatro de agendamento das vitrines pelo usuário VM e busca dos agendamentos pelo usuário vendedor.

## 🧑‍🎨 Vitrine VM

### 🆕 Cadastro de agendamento (VM)

`POST`
`/api/agendas`

**📝 Requisição:**

```json
{
  "appid": "open",
  "desc": "VITRINE LOOK 1",
  "datainicio": "2025-07-21",
  "datafim": "2025-07-27",
  "urlManual": "https://aws.com/manual.pdf",
  "tiposid": [1, 2, 3], // Na busca de agendamentos poder filtrar por este campo para otimizar o app

  "produtos": [
    {
      "name": "VESTIDO COM APLICAÇÃO PRETO",
      "ref": "442201321",
      "imagem": "https://aws.com/p1.jpg"
    },
    {
      "name": "CAMISETA PRETO",
      "ref": "442201123",
      "imagem": "https://aws.com/p3.jpg"
    },
    {
      "name": "SAIA COM APLICAÇÃO PRETO",
      "ref": "82200685",
      "imagem": "https://aws.com/p2.jpg"
    }
  ],

  "looks": [
    {
      "urlImagem": "https://aws.com/l1.jpg",
      "referencias": ["442201321", "442201123"],
      "tipo": "look"
    },
    {
      "urlImagem": "https://aws.com/l2.jpg",
      "referencias": [],
      "tipo": "display"
    }
  ],

  "imagens": [
    {
      "urlimagem": "https://aws.com/i1.jpg"
    },
    {
      "urlimagem": "https://aws.com/i2.jpg"
    }
  ]
}
```

### 🔎 Buscar agendamentos (VM)

Na busca de vitrines ter o filtro de **appId**. Buscar todos os agendamentos cadastrados para esse appId.

`GET`
`/api/agendas?appid=open`

**📄 Resposta:**

```json
{
  "agendas": [
    {
      "appid": "open",
      "desc": "VITRINE LOOK 1",
      "datainicio": "2025-07-21",
      "datafim": "2025-07-27",
      "urlManual": "https://aws.com/manual.pdf",
      "tiposid": [1, 2, 3],

      "produtos": [
        {
          "name": "VESTIDO COM APLICAÇÃO PRETO",
          "ref": "442201321",
          "imagem": "https://aws.com/p1.jpg"
        },
        {
          "name": "CAMISETA PRETO",
          "ref": "442201123",
          "imagem": "https://aws.com/p3.jpg"
        },
        {
          "name": "SAIA COM APLICAÇÃO PRETO",
          "ref": "82200685",
          "imagem": "https://aws.com/p2.jpg"
        }
      ],

      "looks": [
        {
          "urlImagem": "https://aws.com/l1.jpg",
          "referencias": ["442201321", "442201123"],
          "tipo": "look"
        },
        {
          "urlImagem": "https://aws.com/l2.jpg",
          "referencias": [],
          "tipo": "display"
        }
      ],

      "imagens": [
        {
          "urlimagem": "https://aws.com/i1.jpg"
        },
        {
          "urlimagem": "https://aws.com/i2.jpg"
        }
      ]
    }
  ]
}
```

---

## 🤑 Vitrine Vendedor

### 🔎 Buscar agendamentos (vendedor)

Na busca de agendamentos ter o filtro de **appId** e **tipoId** para buscar apenas as informações desse tipo de loja.
Passar o CNPJ da loja para a API saber quais agendamentos ainda faltam ser feitos.
Quando um vendedor buscar a lista de agendamentos, a API deve selecionar apenas os agendamentos que **não** tem uma vitrine dessa loja cadastrada.

Por exemplo:

> Estão cadastrados os agendamentos A1, A2, A3
> A Loja X tem as seguintes vitrines cadastradas:
>
> - Vitrine 1 Cadastrada, agendamento A1
> - Vitrine 2 Rascunho, agendamento A2
>
> Quando o vendedor buscar os agendamentos pela loja X, vai retornar o agendamento A3 (nenhuma vitrine) e A2 (uma vitrine como rascunho)
> Lembrando de filtrar também os agendamentos pelo **tipoId** e **appId** que será passado pelo vendedor.

`GET`
`/api/agendas/{cnpj}?appid=open&tipoid=1`

**📄 Resposta:**

```json
{
  "agendas": [
    {
      "appid": "open",
      "desc": "VITRINE LOOK 1",
      "datainicio": "2025-07-21",
      "datafim": "2025-07-27",
      "urlManual": "https://aws.com/manual.pdf",

      "produtos": [
        {
          "name": "VESTIDO COM APLICAÇÃO PRETO",
          "ref": "442201321"
        },
        {
          "name": "CAMISETA PRETO",
          "ref": "442201123"
        }
      ],

      "looks": [
        {
          "urlImagem": "https://aws.com/l1.jpg",
          "referencias": ["442201321", "442201123"],
          "tipo": "look"
        }
      ],

      "imagens": [
        {
          "urlimagem": "https://aws.com/i1.jpg"
        }
      ]
    }
  ]
}
```

---

### 🆕 Cadastro de vitrine (vendedor)

`POST`
`/api/vitrine`

**📝 Requisição:**

```json
{
  "name": "VITRINE LOOK 1 ANTIOQUIA",
  "userid": "open-leonardo.noro@widelab.com.br",
  "lojacnpj": "14780238000272",
  "lojaNome": "Loja de teste em Desenvolvimento",
  "rascunho": false,
  "idAgendamento": 14,

  "images": ["https://aws.com/img1.jpg"],

  "looks": [
    {
      "urlImagem": "https://aws.com/lv1.jpg",
      "tipo": "look",
      "products": [
        {
          "codigo": "7900179289219",
          "desc": "CHEMISIER LINHO ESTAMPADO",
          "ref": "132.22.00016",
          "pertenceVitrine": false
        },
        {
          "codigo": "7900179289123",
          "desc": "CAMISETA ESTAMPADO",
          "ref": "1223.44.00099",
          "pertenceVitrine": true
        }
      ]
    },
    {
      "urlImagem": "https://aws.com/dv1.jpg",
      "tipo": "display",
      "products": [
        {
          "codigo": "7900179289456",
          "desc": "BONE PRETO",
          "ref": "456.66.00078",
          "pertenceVitrine": false
        }
      ]
    }
  ]
}
```

---

### 🔎 Buscar vitrines cadastradas (vendedor)

`GET`
`/api/vitrines/{cnpj}?mes=7&ano=2025&rascunho=false`

Filtro de rascunho (_true_ ou _false_) opcional, assim como mes e ano

**📄 Resposta:**

```json
{
  "vitrines": [
    {
      "id": 9,
      "createdAt": "2024-11-08 18:03:44",
      "name": "VITRINE LOOK 1 ANTIOQUIA",
      "userid": "open-leonardo.noro@widelab.com.br",
      "lojacnpj": "14780238000272",
      "lojaNome": "Loja de teste em Desenvolvimento",
      "rascunho": false,
      "idAgendamento": 14,

      "imagens": [
        {
          "id": 20,
          "urlimagem": "https://aws.com/img1.jpg",
          "createdAt": "2024-11-08 18:03:44",
          "vitrineid": 9
        }
      ],

      "looks": [
        {
          "id": 31,
          "createdAt": "2024-11-08 18:03:44",

          "urlImagem": "https://aws.com/lv1.jpg",
          "tipo": "look",
          "products": [
            {
              "id": 31,
              "createdAt": "2024-11-08 18:03:44",
              "codigo": "7900179289219",
              "desc": "CHEMISIER LINHO ESTAMPADO",
              "ref": "132.22.00016",
              "pertenceVitrine": false
            },
            {
              "id": 31,
              "createdAt": "2024-11-08 18:03:44",
              "codigo": "7900179289123",
              "desc": "CAMISETA ESTAMPADO",
              "ref": "1223.44.00099",
              "pertenceVitrine": true
            }
          ]
        }
      ]
    }
  ]
}
```
