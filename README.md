# Central Med

Painel de estudo do 2º período de Medicina (Uniguairacá) e a rota até a residência de cirurgia plástica, num app só.

**por Felipe Folquenin**

É um app web instalável (PWA): abre no navegador, mas dá para colocar na tela de início do celular e usar como aplicativo, inclusive sem internet.

---

## O que tem dentro

**Aba Semestre** — grade da semana com o dia de hoje destacado, contagem regressiva para a próxima prova, as oito disciplinas com material e checklist de conteúdo (o que você marca fica salvo no aparelho), calendário até dezembro e a lista do que ainda falta descobrir.

**Aba Agenda** — os afazeres: título, data e disciplina. Ficam agrupados sozinhos em atrasadas, hoje, amanhã, próximos 7 dias, mais adiante e sem data. Um botão gera o **briefing do dia**: as aulas de hoje pela grade, as tarefas marcadas, o que atrasou, o que vem amanhã, as próximas datas do calendário e o progresso do semestre — pronto para copiar ou baixar em .txt.

**Aba Carreira** — a rota completa até a cirurgia plástica com as datas reais da sua linha do tempo, os seis critérios para escolher um serviço de cirurgia geral, a shortlist de hospitais por cenário, o calendário das provas de residência e onde baixar as provas antigas.

---

## Como colocar no ar

### 1. Criar o repositório

1. Entre em [github.com](https://github.com) e crie uma conta, se ainda não tiver.
2. Clique em **New repository**.
3. Nome: `central-med`. Deixe **Public** (o GitHub Pages gratuito precisa disso).
4. **Não** marque "Add a README" — este projeto já tem um.
5. **Create repository**.

### 2. Subir os arquivos

Pela página do GitHub, sem instalar nada:

1. Na tela do repositório vazio, clique em **uploading an existing file**.
2. Arraste **todo o conteúdo** desta pasta — `index.html`, `manifest.webmanifest`, `sw.js`, `.nojekyll` e as pastas `assets/` e `icons/`.
3. Escreva algo em *Commit changes* e confirme.

> A estrutura de pastas precisa ser mantida. Se arrastar a pasta inteira em vez do conteúdo dela, o `index.html` vai parar dentro de um subdiretório e o site não abre na raiz.

Se preferir pelo terminal:

```bash
git init
git add .
git commit -m "Central Med"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/central-med.git
git push -u origin main
```

### 3. Ligar o GitHub Pages

1. No repositório: **Settings** → **Pages**.
2. Em *Source*, escolha **Deploy from a branch**.
3. Branch: **main**, pasta: **/ (root)**. **Save**.
4. Espere de 1 a 2 minutos e recarregue a página. O endereço aparece lá em cima:

```
https://SEU-USUARIO.github.io/central-med/
```

Guarde esse link — é o app.

---

## Como instalar no celular

**iPhone (Safari):** abra o link no **Safari** (não funciona pelo Chrome no iOS) → botão de compartilhar → **Adicionar à Tela de Início** → **Adicionar**.

**Android (Chrome):** abra o link → menu de três pontinhos → **Instalar aplicativo** ou **Adicionar à tela inicial**.

Depois disso ele abre em tela cheia, sem barra de navegador, com ícone próprio. Funciona offline: o service worker guarda tudo no aparelho na primeira visita.

---

## Como atualizar o conteúdo

Quase tudo que você vai querer mudar está em um arquivo só: **`assets/js/data.js`**.

| O que você quer mudar | Onde |
|---|---|
| Horários das aulas | `GRADE` |
| Disciplinas, professores, material, checklist | `DISC` |
| Datas de provas e eventos do semestre | `CAL` |
| O que ainda falta descobrir | `GAPS` |
| Marcos da rota até a plástica | `ROTA` |
| Critérios de escolha do serviço | `CRITERIOS` |
| Hospitais por cenário | `SERVICOS` |
| Calendário das provas de residência | `PROVAS` |
| O que fazer em cada fase | `ACOES` |
| Onde baixar provas antigas | `FONTES` |

As tarefas da aba Agenda **não** ficam em `data.js` — elas são suas, ficam no aparelho (veja a seção seguinte).

Formato das datas: `"AAAA-MM-DD"`. Uma prova nova no calendário é uma linha:

```js
{ d: "2026-10-19", h: "PROVA — Bioquímica", s: "Proteínas e enzimas.", exam: true },
```

`exam: true` pinta o marco de vermelho e faz a data entrar na contagem regressiva.

**Importante:** toda vez que mudar qualquer arquivo, suba a versão em `sw.js`:

```js
var VERSAO = "central-med-v2";   // era v1
```

Sem isso, o celular continua mostrando a versão antiga que ficou guardada.

Editar direto pelo site do GitHub funciona: abra o arquivo, clique no lápis, altere, **Commit changes**. Um ou dois minutos depois o site já está atualizado.

---

## Onde as tarefas ficam salvas

No aparelho, no armazenamento local do navegador — não existe servidor nem conta. Consequências práticas, que valem saber antes de confiar nele:

- O que você lança no celular **não aparece** no computador, e vice-versa. São duas listas separadas.
- Limpar os dados do site, ou desinstalar o app da tela de início, apaga as tarefas.
- Nada sai do aparelho: não há rastreamento nem envio para lugar nenhum.

Para levar de um aparelho para outro, use **Exportar** no fim da aba Agenda (baixa um `.json`) e **Importar** no outro. A importação **soma** — nunca apaga o que já está lá — e ignora tarefas repetidas pelo identificador.

Se um dia você quiser a lista sincronizada de verdade entre celular e computador, aí passa a precisar de um servidor ou de um serviço externo, e o projeto deixa de ser só arquivos estáticos. Hoje ele não é.

---

## A abertura

Ao abrir, o app desenha o bastão de Asclépio — o símbolo da medicina, um bastão com uma serpente enrolada — traço por traço, e depois some sozinho. Dura cerca de 2 segundos e um toque na tela pula a animação.

É tudo CSS: se o JavaScript falhar, a tela de abertura desaparece do mesmo jeito no fim da animação e o app aparece normalmente. Quem tem "reduzir movimento" ligado no celular vê o símbolo já pronto, sem animação.

Para mexer no tempo, procure o bloco `abertura` no fim de `assets/css/app.css`:

- `#splash{ ... animation:splash-sai .55s ease 1.95s forwards }` — o `1.95s` é quando a tela começa a sair.
- Os `animation-delay` de `.staff`, `.snake`, `.head` e `.tongue` controlam a ordem em que cada parte é desenhada.

Diminuiu a abertura? Diminua também o `1.95s`, senão sobra tempo de tela parada.

---

## Estrutura

```
central-med/
├─ index.html               estrutura da página
├─ manifest.webmanifest     nome, cores e ícones do app instalado
├─ sw.js                    service worker (offline + cache)
├─ .nojekyll                impede o GitHub de processar os arquivos
├─ assets/
│  ├─ css/app.css           todo o estilo
│  └─ js/
│     ├─ data.js            TODO o conteúdo — é aqui que você mexe
│     └─ app.js             monta a tela a partir dos dados
└─ icons/                   ícones do app
```

Sem dependências, sem build, sem npm. É HTML, CSS e JavaScript puro — abre até com dois cliques no arquivo `index.html` (só o modo offline instalado que exige estar publicado).

---

## Detalhes técnicos

- Tema claro e escuro automáticos, com botão para forçar um dos dois. A escolha fica salva.
- Checklists e tema usam `localStorage` — ficam no aparelho, não sobem para lugar nenhum.
- Sem rastreamento, sem analytics, sem servidor. O app não envia dados a lugar algum.
- As fontes vêm do Google Fonts; sem internet na primeira visita, o app usa as fontes do sistema e continua legível.
- Layout testado de 360px a 1440px, nos dois temas.

---

## Aviso

Datas, vagas e concorrências são de editais de 2023 a 2026 e servem como ordem de grandeza, não como previsão. Edital muda todo ano — confirme sempre na página oficial da instituição antes de decidir qualquer coisa.
