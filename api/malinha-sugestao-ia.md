# 🧠📦 Malas IA

> Documentação de referência para as **novas APIs** do projeto que cria _Malas_ a partir de malas sugeridas por uma IA.

## Sumário

- [Visão geral](#visão-geral)
- [Modelo de dados](#modelo-de-dados)

  - [Campos padrão de auditoria](#campos-padrão-de-auditoria)
  - [Tabelas](#tabelas)

- [WebSocket usado pela IA](#websocket-usado-pela-ia)
- [APIs](#apis)

  - [Criar Mala](#post---criar-uma-mala-nova)
  - [Listar Malas](#get---listar-malas)
  - [Detalhe da Mala](#get---buscar-detalhes-da-mala)
  - [Listar Motivos de Rejeição](#get---buscar-lista-de-motivos-para-rejeição)
  - [Rejeitar Produto](#post---rejeitar-um-produto)
  - [Substituir Produto](#post---substituir-um-produto)
  - [Cadastrar Produto Novo](#post---cadastrar-um-produto-novo)
  - [Finalizar Mala](#post---finalizar-mala)
  - [Cancelar Mala](#post---cancelar-mala)

- [Glossário](#glossário)

---

## Visão geral

1. 🧳 **Mala IA** é aberta para um **cliente** por um **vendedor** (**appId**).
2. 🤖 A IA seleciona **produtos** e retorna para conferência.
3. 👀 O vendedor **aprova**, **rejeita** ou **substitui** produtos (com motivo).
4. ✅ Ao **finalizar**, o backend cria a **Pré‑Venda** no Almode e grava o `id_almode`.

> **Nota**: Todos os registros usam _soft delete_ e trilhas de auditoria.

---

## Modelo de dados

### Campos padrão de auditoria

> ⚠️ **Presentes em todas as tabelas**

- `id`: `number` _(primary key)_
- `criado_em`: `datetime`
- `atualizado_em`: `datetime`
- `id_usuario_ins`: `number`
- `id_usuario_upd`: `number`
- `id_usuario_del`: `number`
- `dt_del`: `datetime`
- `st_del`: `boolean`

### Tabelas

#### 📋 Motivos rejeição produto

- `descricao`: `varchar`
- `ativo`: `boolean`
- `app_id`: `varchar`

#### 📝 Outros Motivos rejeição produto

- `descricao`: `text`
- `id_vendedor`: `varchar` _(userId)_
- `id_usuario`: `number`
- `app_id`: `varchar`

### Malas IA

- `uuid`: `varchar` _(único)_
- `id_almode`: `number` _(nullable)_
- `app_id`: `varchar`
- `id_vendedor`: `varchar` _(userId)_
- `id_usuario`: `number`
- `cpf_usuario`: `string`
- `cpf_cliente`: `varchar`
- `nome_cliente`: `varchar`
- `cnpj_loja`: `varchar`
- `id_loja`: `number`
- `nome_loja`: `varchar`
- `status`: **Enum**

  - `1` = Criado
  - `2` = Em processamento pela IA
  - `3` = Retornado pela IA
  - `4` = Em conferência da Mala
  - `5` = Finalizado mala
  - `6` = Cancelado mala manualmente
  - `7` = Cancelado mala por tempo de expiração

#### 🧾 Produtos Malas IA

- `id_mala`: `number` _(FK → Malas IA)_
- `referencia`: `string`
- `cor`: `string`
- `tamanho`: `string` _(nullable)_
- `ean`: `string`
- `status`: **Enum**

  - `1` = Criado
  - `2` = Aprovado
  - `3` = Rejeitado
  - `4` = Substituído

- `motivo_rejeicao`: `string` _(nullable)_
- `id_motivo_rejeicao`: `number` _(nullable, FK → Motivos Rejeição)_
- `id_produto_novo`: `number` _(nullable, FK → Produtos Novos)_

#### 🆕 Produtos novos

- `id_mala`: `number` _(FK → Malas IA)_
- `referencia`: `string`
- `cor`: `string`
- `tamanho`: `string` _(nullable)_
- `ean`: `string`
- `status`: **Enum**

  - `1` = Novo
  - `2` = Substituto

#### ⚙️ Configuracoes

- `dias_validade_mala`: `number` _(opcional, em dias)_

---

## WebSocket usado pela IA

> Canais de integração para a IA registrar e consumir dados de malas.

### `POST` — **Registrar produtos da mala**

- **Entrada**: Dados do cliente, dados do vendedor e dados da loja
- **Efeito**: grava itens em **Produtos Malas IA** e altera o **status da mala** para **3 = Retornado pela IA**.

**Exemplo de retorno**

```json
{
  "uuid": "d1d6f1a4-5c0a-4b9e-8a4d-2f8f0f7e5a10",
  "produtos": [
    {
      "referencia": "9010881061",
      "cor": "preto",
      "ean": "7891234567890",
      "tamanho": "M"
    },
    { "referencia": "9010881062", "cor": "branco", "ean": "7891234567891" }
  ]
}
```

### `GET` — **Buscar solicitações de novas malas**

- **Saída**: array de malas pendentes para processamento pela IA.

---

## APIs

### `POST` - Criar uma mala nova

`api/ia/mala`

**Body**

```json
{
  "appId": "colcci",
  "idVendedor": "colcci-usuario@widelab.com.br",
  "idUsuario": 4,
  "cpfUsuario": "12345678912",
  "cpfCliente": "98765432100",
  "nomeCliente": "Cliente de teste",
  "cnpjLoja": "12345678901234",
  "idLoja": 213,
  "nomeLoja": "Loja de teste"
}
```

**Observações**

- **Não enviar**: `id_almode`, `uuid`, `status` (gerados/definidos pelo backend).
- Transição inicial de status: **1 = Criado**.

---

### `GET` - Listar malas

`api/ia/mala?appId=colcci&userId=colcci-usuario@widelab.com.br&cpfCliente=12345678912`

**Filtros**

- `app_id`, `id_vendedor`, `cpfCliente` _(combináveis)_.

**Resultado**

- Lista de malas (metadados básicos). Ordenação sugerida: `criado_em DESC`.

---

### `GET` - Buscar detalhes da mala

`api/ia/mala/:idMala`

**Comportamento**

- Busca por `id` e **retorna os produtos juntos** (Produtos Malas IA e, quando houver, vínculo com Produtos Novos).

---

### `GET` - Buscar lista de motivos para rejeição

`api/ia/motivosRejeicao?appId=colcci`

**Filtros**

- `app_id` e `ativo`.

---

### `POST` - Rejeitar um produto

`api/ia/mala/:idMala/produto/:idProduto/rejeitar`

**Body**

```json
{
  "motivo": "Motivo da rejeição aqui",
  "idMotivo": 123
}
```

**Comportamento**

- Atualiza `status` do **produto** para **3 = Rejeitado**.
- Persistir `motivo_rejeicao` e, se selecionado, `id_motivo_rejeicao`.

---

### `POST` - Substituir um produto

`api/ia/mala/:idMala/produto/:idProduto/substituir`

**Body**

```json
{
  "motivo": "Motivo da rejeição aqui",
  "idMotivo": 123,
  "novoProduto": {
    "referencia": "12312389",
    "cor": "branco",
    "ean": "7891223456",
    "tamanho": "M"
  }
}
```

**Comportamento**

- Marca o **produto original** como **4 = Substituído**.
- Cria registro em **Produtos Novos** (status `2 = Substituto`) e vincula em `id_produto_novo`.
- Persiste motivo (texto e/ou id).

---

### `POST` - Cadastrar um produto novo

`api/ia/mala/:idMala/produto`

**Body**

```json
{
  "referencia": "12312389",
  "cor": "branco",
  "ean": "7891223456",
  "tamanho": "M"
}
```

**Comportamento**

- Adiciona **Produto Novo** para a Mala (status `1 = Novo`).

---

### `POST` - Finalizar mala

`api/ia/mala/:idMala/finalizar`

**Comportamento**

- Altera **status da mala** para **5 = Finalizado mala**.
- Backend cria Pré‑Venda no **Almode** e grava `id_almode`.

**Exemplo (Almode)**

```sh
curl --location 'https://lojas.amctextil.dev.br/api/public/PreVenda' \
  --header 'Authorization: Basic YWRhcGNvbjphZHAwNjc=' \
  --header 'Content-Type: application/json' \
  --data '{
      "cpfOuCnpjDoCliente": "56195628000144",
      "situacao": "ABERTO",
      "cpfOuCnpjDoVendedor": null,
      "itens": [
          {
            "skuDoProduto": "9010881061",
            "quantidade": 2
          }
      ],
      "cnpjDaLoja": "27671349000101"
  }'
```

---

### `POST` - Cancelar mala

`api/ia/mala/:idMala/cancelar`

**Comportamento**

- Altera **status da mala** para **6 = Cancelado mala manualmente**.

---

## Glossário

- **app_id**: identificador do marca (ex.: `colcci`).
- **id_vendedor**: identificador do usuário vendedor (padrão: marca e e‑mail `userId`).
- **id_usuario**: id interno (numérico) do usuário autenticado.
- **id_almode**: id de Pré‑Venda criado no Almode ao finalizar a Mala.
