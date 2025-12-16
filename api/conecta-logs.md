# 🎓 Conecta — Implementação de Logs + Ajuste de filtros

**Objetivo:** Implementar um sistema de **Logs de uso** no app Conecta e ajustar a APIs de **Provas** e **Progressos** para suportar filtros obrigatórios e/ou opcionais, reduzindo retorno desnecessário e melhorando performance

### `POST` - Registrar LOG

#### 📌 Finalidade

Registrar eventos importantes de uso do app (acesso a conteúdos, abertura do app, pesquisa, filtro, expansão de módulo, etc).

#### 🛣️ Endpoint

`POST` `/log`

```ts
type RequestBody = {
  appId: string; // Ex.: "colcci"
  userId: string; // Ex.: "colcci-cristiano.bortolini@widelab.com.br"
  cpf: string; // Ex.: "12345678912"
  cnpj: string; // Ex.: "98765432000156"
  acao: string; // Ex.: "Acesso" | "Pesquisa" | "Filtro" | ...
  tipo: string; // Ex.: "App" | "Treinamento"
  id: number | null; // ID do objeto relacionado (conteúdo, treinamento, módulo, questionário...) ou null
  plataforma: 'WEB' | 'Mobile';
  descricao: string | null; // Ex: "Natal 2025" ...
  tempoAtual: number | null;
  percentual: number | null;
};
```

---

#### 📌 Idempotência / duplicidade

- Não é necessário deduplicar por padrão (o mesmo usuário pode gerar logs repetidos).

---

### 📌 Tipos de logs esperados (exemplos)

> A lista abaixo ajuda a padronizar o uso. O back-end não precisa “conhecer” cada tipo, mas deve aceitar `acao/tipo` como strings e salvar exatamente como recebido.

- **Ao acessar um conteúdo "solto"**

```json
{
  "appid": "colcci",
  "userId": "colcci-cristiano.bortolini@widelab.com.br",
  "cpf": "12345678912",
  "cnpj": "98765432000156",
  "acao": "Acesso",
  "tipo": "Conteúdo",
  "plataforma": "WEB",
  "descricao": null,
  "tempoAtual": 120,
  "percentual": 30,
  "id": 1
}
```

- **Ao acessar um treinamento**

```json
{
  "appid": "colcci",
  "userId": "colcci-cristiano.bortolini@widelab.com.br",
  "cpf": "12345678912",
  "cnpj": "98765432000156",
  "acao": "Acesso",
  "tipo": "Treinamento",
  "plataforma": "Mobile",
  "descricao": null,
  "tempoAtual": null,
  "percentual": 45,
  "id": 2
}
```

- **Ao acessar um conteúdo de um treinamento**

```json
{
  "appid": "colcci",
  "userId": "colcci-cristiano.bortolini@widelab.com.br",
  "cpf": "12345678912",
  "cnpj": "98765432000156",
  "acao": "Acesso",
  "tipo": "Conteúdo do treinamento",
  "plataforma": "Mobile",
  "descricao": null,
  "tempoAtual": 120,
  "percentual": 30,
  "id": 3
}
```

- **Ao acessar o app**

```json
{
  "appid": "colcci",
  "userId": "colcci-cristiano.bortolini@widelab.com.br",
  "cpf": "12345678912",
  "cnpj": "98765432000156",
  "acao": "Acesso",
  "tipo": "App",
  "plataforma": "Mobile",
  "descricao": null,
  "tempoAtual": null,
  "percentual": null,
  "id": null
}
```

- **Ao acessar/expandir um módulo de um treinamento**

```json
{
  "appid": "colcci",
  "userId": "colcci-cristiano.bortolini@widelab.com.br",
  "cpf": "12345678912",
  "cnpj": "98765432000156",
  "acao": "Acesso",
  "tipo": "Módulo do treinamento",
  "plataforma": "Mobile",
  "descricao": null,
  "tempoAtual": null,
  "percentual": 54,
  "id": 4
}
```

- **Ao selecionar um categoria para filtrar a busca**

```json
{
  "appid": "colcci",
  "userId": "colcci-cristiano.bortolini@widelab.com.br",
  "cpf": "12345678912",
  "cnpj": "98765432000156",
  "acao": "Filtro",
  "tipo": "Categoria",
  "plataforma": "Mobile",
  "descricao": null,
  "tempoAtual": null,
  "percentual": null,
  "id": 5
}
```

- **Ao realizar uma pesquisa na caixa de pesquisa**

```json
{
  "appid": "colcci",
  "userId": "colcci-cristiano.bortolini@widelab.com.br",
  "cpf": "12345678912",
  "cnpj": "98765432000156",
  "acao": "Pesquisa",
  "tipo": "Pesquisa",
  "descricao": "Natal 2025", // Quando o usuário pesquisar alguma coisa
  "plataforma": "Mobile",
  "descricao": null,
  "tempoAtual": null,
  "percentual": null,
  "id": null
}
```

- **Ao marcar um conteúdo de um treinamento como completado (checkbox)**

```json
{
  "appid": "colcci",
  "userId": "colcci-cristiano.bortolini@widelab.com.br",
  "cpf": "12345678912",
  "cnpj": "98765432000156",
  "acao": "Marcado como completado",
  "tipo": "Conteúdo de treinamento",
  "plataforma": "Mobile",
  "descricao": null,
  "tempoAtual": null,
  "percentual": 38,
  "id": 6
}
```

- **Ao acessar um questionário para começar a respondê-lo**

```json
{
  "appid": "colcci",
  "userId": "colcci-cristiano.bortolini@widelab.com.br",
  "cpf": "12345678912",
  "cnpj": "98765432000156",
  "acao": "Acesso",
  "tipo": "Questionário",
  "plataforma": "Mobile",
  "descricao": null,
  "tempoAtual": null,
  "percentual": null,
  "id": 7
}
```

---

## ✅ Novos filtros nas APIs existentes

### `GET` - Busca de respostas do usuário

#### 📌 Finalidade

O front precisa **filtrar** o retorno para trazer apenas as respostas relevantes, evitando cargas desnecessárias.

#### 🛣️ Endpoint

`GET` `/provas`

#### 🔎 Query Params (filtros)

- `idform` → **ID do questionário**
- `userid` → **ID do usuário**
- `appid` → **ID da marca/app**

✅ Exemplo:
`/provas?idform=39&userid=colcci-cristiano.bortolini%40widelab.com.br&appid=colcci`

---

### `GET` - Busca de progresso por marca e usuário ou conteúdo

#### 🛣️ Endpoint

`GET` `/progressos`

#### 🔎 Query Params (filtros)

- `userid` → **ID do usuário**
- `appid` → **ID da marca/app**
- `idconteudo` → **ID do conteúdo**

✅ Exemplo:
`/progressos?userid=colcci-cristiano.bortolini%40widelab.com.br&appid=colcci&idconteudo=178`
