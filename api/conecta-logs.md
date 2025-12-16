## Conecta - Logs

### `POST` - Registrar LOG

`/log?idform=39&userid=colcci-cristiano.bortolini%40widelab.com.br&appid=colcci`

```typescript
type RequestBody = {
  userId: string;
  cpf: string;
  cnpj: string;
  tipo: string;
  descricao: string;
  id: number | null;
};
```

**Body**

```json
{
  "userId": "colcci-cristiano.bortolini@widelab.com.br",
  "cpf": "12345678912",
  "cnpj": "98765432000156",
  "tipo": "Acesso",
  "descricao": "Conteúdo",
  "id": 1
}
```

#### Exemplos de LOGs possíveis

> Ao acessar um conteúdo "solto"

```json
{
  "userId": "colcci-cristiano.bortolini@widelab.com.br",
  "cpf": "12345678912",
  "cnpj": "98765432000156",
  "tipo": "Acesso",
  "descricao": "Conteúdo",
  "id": 1
}
```

> Ao acessar um treinamento

```json
{
  "userId": "colcci-cristiano.bortolini@widelab.com.br",
  "cpf": "12345678912",
  "cnpj": "98765432000156",
  "tipo": "Acesso",
  "descricao": "Treinamento",
  "id": 2
}
```

> Ao acessar um conteúdo de um treinamento

```json
{
  "userId": "colcci-cristiano.bortolini@widelab.com.br",
  "cpf": "12345678912",
  "cnpj": "98765432000156",
  "tipo": "Acesso",
  "descricao": "Conteúdo do treinamento",
  "id": 3
}
```

> Ao acessar o app

```json
{
  "userId": "colcci-cristiano.bortolini@widelab.com.br",
  "cpf": "12345678912",
  "cnpj": "98765432000156",
  "tipo": "Acesso",
  "descricao": "App",
  "id": null
}
```

> Ao acessar/expandir um módulo de um treinamento

```json
{
  "userId": "colcci-cristiano.bortolini@widelab.com.br",
  "cpf": "12345678912",
  "cnpj": "98765432000156",
  "tipo": "Acesso",
  "descricao": "Módulo do treinamento",
  "id": 4
}
```

> Ao selecionar um categoria para filtrar a busca

```json
{
  "userId": "colcci-cristiano.bortolini@widelab.com.br",
  "cpf": "12345678912",
  "cnpj": "98765432000156",
  "tipo": "Filtro",
  "descricao": "Categoria",
  "id": 5
}
```

> Ao realizar uma pesquisa na caixa de pesquisa

```json
{
  "userId": "colcci-cristiano.bortolini@widelab.com.br",
  "cpf": "12345678912",
  "cnpj": "98765432000156",
  "tipo": "Pesquisa",
  "descricao": "Natal 2025", // Quando o usuário pesquisar alguma coisa
  "id": null
}
```

> Ao marcar um conteúdo de um treinamento como completado (checkbox)

```json
{
  "userId": "colcci-cristiano.bortolini@widelab.com.br",
  "cpf": "12345678912",
  "cnpj": "98765432000156",
  "tipo": "Marcado como completado",
  "descricao": "Conteúdo de treinamento",
  "id": 6
}
```

> Ao acessar um questionário para começar a respondê-lo

```json
{
  "userId": "colcci-cristiano.bortolini@widelab.com.br",
  "cpf": "12345678912",
  "cnpj": "98765432000156",
  "tipo": "Acesso",
  "descricao": "Questionário",
  "id": 7
}
```

---

### `GET` - Busca de respostas do usuário

`/provas?idform=39&userid=colcci-cristiano.bortolini%40widelab.com.br&appid=colcci`

- Incluir filtros por ID de questionário (idform), userId e appId
