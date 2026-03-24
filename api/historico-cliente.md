## Cupom vendedor - Histórico do Cliente

### `GET`- Buscar lista de clientes

#### 📌 Finalidade

Buscar a lista de clientes do vendedor com totais do ano selecionado. O ano é obrigatório. Essa rota pode ter paginação, pois pode haver muitos clientes para um mesmo vendedor. Lembrar e manter ordenado conforme a posição dele.

#### 🛣️ Endpoint

`/vendedor/:userId/clientes`
`/vendedor/colcci-cristiano.bortolini@widelab.com.br/clientes?appid=colcci&ano=2025&page=1`

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
    },
    {
      "nome": "Nelson Alexandre Mateus Brito",
      "diasSemComprar": 32,
      "cpf": "34078303358",
      "nascimento": "1975-02-27",
      "sexo": "M",
      "email": "nelson-brito97@eletrovip.com",
      "cep": "45026415",
      "endereco": "Rua Professora Francisca",
      "numero": "860",
      "bairro": "Boa Vista",
      "cidade": "Vitória da Conquista",
      "estado": "BA",
      "telefone": "77981946813",
      "totalGasto": 8775.51,
      "posicao": 2
    },
    {
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
      "posicao": 3
    }
  ]
}
```

### `GET`- Buscar dados de um cliente só

#### 📌 Finalidade

Buscar os dados de um cliente cliente. Usado para montar a tela de detalhes do cliente. Deve utilizar um identificador para saber qual cliente está buscando, CPF ou outro ID se houver. Passa o ano e o appId obrigatório para soma de totais

#### 🛣️ Endpoint

`/vendedor/:userId/clientes/:cpf`
`/vendedor/colcci-cristiano.bortolini@widelab.com.br/cliente/63007247608?appid=colcci&ano=2025`

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

### `GET`- Buscar lista de pedidos do cliente no ano e mês

#### 📌 Finalidade

Buscar os pedidos de um cliente cliente. Deve utilizar um identificador para saber qual cliente está buscando, CPF ou outro ID se houver. Passa o ano, mês e o appId obrigatório.

#### 🛣️ Endpoint

`/vendedor/:userId/clientes/:cpf/pedidos`
`/vendedor/colcci-cristiano.bortolini@widelab.com.br/cliente/63007247608/pedidos?appid=colcci&ano=2025&mes=07`

#### 📄 Resposta

```json
{
  "data": [
    {
      "id": 2314,
      "pedido": "22000139133",
      "valor": "461.5",
      "qtd": 3,
      "data": "2025-07-10 17:00:14",
      "nfe": "https://amc-adapcon-nfecommerce.s3-sa-east-1.amazonaws.com/2c4d1cfe48068522f8072546a8455ce1.pdf",
      "status": "Entregue"
    },
    {
      "id": 2313,
      "pedido": "22000139111",
      "valor": "725.4",
      "qtd": 2,
      "data": "2025-07-10 14:31:22",
      "nfe": "https://amc-adapcon-nfecommerce.s3-sa-east-1.amazonaws.com/daa18d0459f9aecf526963ad83386a07.pdf",
      "status": "Entregue"
    },
    {
      "id": 2312,
      "pedido": "22000138960",
      "valor": "345.87",
      "qtd": 1,
      "data": "2025-07-08 21:26:57",
      "nfe": "https://amc-adapcon-nfecommerce.s3-sa-east-1.amazonaws.com/6F62EC64-5CED-11F0-878D-00505693900D.pdf",
      "status": "Entregue"
    },
    {
      "id": 2311,
      "pedido": "22000138950",
      "valor": "714.15",
      "qtd": 2,
      "data": "2025-07-08 19:53:42",
      "nfe": "https://amc-adapcon-nfecommerce.s3-sa-east-1.amazonaws.com/543d2c0d65a85775ddcddc9c6ef603f1.pdf",
      "status": "Aguardando"
    }
  ]
}
```
