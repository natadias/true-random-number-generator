# n8n Random Number Node

Node customizado para o [n8n](https://n8n.io/) que gera números aleatórios utilizando a API do Random.org. Pode ser utilizado em qualquer workflow para gerar números inteiros aleatórios dentro de um intervalo definido pelo usuário.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js 22 LTS**  
- **TypeScript 5.x**  
- **npm**  
- **Docker**  
- **Docker Compose**

## Estrutura do projeto

O node customizado fica dentro da pasta `.n8n/custom/Random/`, com a seguinte estrutura:

```text
true-random-number-generator
├─ .n8n/custom/Random/
│  ├─ src/
│  │  ├─ Random.node.ts
│  │  └─ icon.svg
│  └─ dist/ (gerado após build)
├─ package.json
├─ tsconfig.json
└─ gulpfile.js
```

O `dist/` é onde o código compilado será colocado, e é este que o n8n vai carregar.


## Instalação das dependências

Na raiz do projeto, execute:
```bash
npm install
```

Compile o código TypeScript para JavaScript:
```bash
npm run build
```


## Configuração do Docker Compose

Suba os containers:
```bash
docker compose up -d
```

O n8n estará disponível em [http://localhost:5678](http://localhost:5678).


## Scripts disponíveis

- `npm run build` → Compila os arquivos TypeScript para JavaScript em `dist/` e copia o `icon.svg`.

## Testando

1. Abra o editor do n8n no navegador.
2. Procure por **Random** no painel de nodes.
3. Adicione o node ao workflow.
4. Configure os valores de **Min** e **Max** (números inteiros).
5. Clique em **Execute Node** para validar a saída.
