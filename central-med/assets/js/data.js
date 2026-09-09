/* Central Med — dados
   Todo o conteúdo do app vive aqui. Para atualizar o app, edite só este arquivo.
   por Felipe Folquenin */

/* ===================== SEMESTRE ===================== */

/* Início e fim do semestre, usados na barra de progresso. */
var SEMESTRE = { inicio: "2026-07-20", fim: "2026-12-05" };

var GRADE = [
  { d: "Segunda", n: 1, aulas: [
    { t: "08:00", f: "09:40", n: "Construção do Conhecimento I", s: "Marcela Birolim · David Livingstone" },
    { t: "10:00", f: "11:40", n: "Genética e Hereditariedade", s: "Adriene Feijó" },
    { t: "13:30", f: "17:10", n: "Anatomia Médica e Radiologia II", s: "Talita Moraes · Turma A" },
    { t: "19:30", f: "20:30", n: "Exame Físico", s: "noturno", night: true },
    { t: "21:00", f: "22:30", n: "Laboratório de Anatomia — livre", s: "estudo no lab · cursos da Saúde", lab: true }
  ]},
  { d: "Terça", n: 2, aulas: [
    { t: "08:00", f: "11:40", n: "Bioquímica", s: "Luciana E. Camargo · Turma A" },
    { t: "13:30", f: "15:10", n: "Genética e Hereditariedade", s: "Adriene Feijó" }
  ]},
  { d: "Quarta", n: 3, aulas: [
    { t: "08:00", f: "09:40", n: "Extensão Interprofissional II", s: "Ana Clara Sierote · Talita Bishof" },
    { t: "10:00", f: "11:40", n: "Saúde Coletiva e Educação em Saúde II", s: "Ana Clara Sierote · Talita Bishof" },
    { t: "14:30", f: "17:00", n: "Laboratório de Anatomia — livre", s: "estudo no lab · cursos da Saúde", lab: true }
  ]},
  { d: "Quinta", n: 4, aulas: [
    { t: "08:00", f: "11:40", n: "Exame Físico", s: "Didoné · Dunin · Franceschini" },
    { t: "13:30", f: "15:10", n: "Anatomia Médica e Radiologia II", s: "Talita Moraes · Turmas A e B" },
    { t: "21:00", f: "22:30", n: "Laboratório de Anatomia — livre", s: "estudo no lab · cursos da Saúde", lab: true }
  ]},
  { d: "Sexta", n: 5, aulas: [
    { t: "08:00", f: "11:40", n: "Raciocínio Clínico II", s: "Abrão Melhem Jr. · Ana Cláudia Franceschini" }
  ]}
];

var DISC = [
  { n: "Exame Físico", p: "Celso Nilo Didoné Filho · Felipe Dunin dos Santos · Ana Cláudia I. Franceschini",
    q: "Seg 19:30 · Qui 08:00", livro: "Porto, Exame Clínico, 8ª ed.", tag: "ok", tagt: "prova de 03/09 feita",
    files: ["aula 01 - introdução e exame físico geral", "aula 02 - exame pulmonar (Franceschini)", "aula 03 - exame cardiovascular (Dunin)", "aula 03 - fotos dos slides do Dunin/", "aula 04 - exame do abdome (Didoné)", "livro - Porto, Exame Clínico 8ed", "material - Cardio do Dunin", "material - Sete Dias de Semiologia"],
    ck: ["Sinais vitais (PA, FC, FR, temperatura)", "Exame pulmonar: inspeção, palpação, percussão, ausculta", "Cardiovascular: ictus, B1/B2, sopros por foco", "Pulso venoso jugular e pulsos arteriais", "Abdome: inspeção, ausculta, percussão, palpação", "Sinais especiais do abdome (Murphy, Blumberg, Giordano)"] },

  { n: "Bioquímica", p: "Luciana E. Camargo", q: "Ter 08:00 — Turma A", livro: "Lehninger, Princípios de Bioquímica, 6ª ed.", tag: "hot", tagt: "prova em 21/09",
    files: ["cronograma - bioquímica 2026-2", "estudo dirigido - bioquímica 2026-2", "exercício - gasometria", "exercício - gasometria (respondido)", "anotações - água e propriedades", "livro - Lehninger 6ed"],
    ck: ["Compartimentalização celular e bioenergética", "Água, pH e tampões", "Acidose e alcalose · gasometria", "Carboidratos: estrutura e importância", "Metabolismo dos carboidratos e diabetes", "Ácidos nucleicos e correlação clínica (gota)", "Proteínas e enzimas", "Lipídeos e metabolismo lipídico"] },

  { n: "Genética e Hereditariedade", p: "Adriene Feijó", q: "Seg 10:00 · Ter 13:30", livro: "Alberts · Snustad", tag: "ok", tagt: "guia + provas prontos",
    files: ["aula 01 - fundamentos e genética mendeliana", "aula 02 - genoma humano", "aula 03 - replicação do DNA", "aula 05 - transcrição e RNA", "aula 07 - tradução", "aula 09 - regulação da expressão gênica", "material - guia de estudos", "material - provas de revisão"],
    ck: ["Mendel, heredograma e estrutura do DNA", "Genoma humano, cromatina e cariótipo", "Replicação do DNA e telomerase", "Transcrição e processamento do RNA", "Tradução e código genético", "Regulação da expressão gênica e epigenética"] },

  { n: "Anatomia Médica e Radiologia II", p: "Talita Moraes", q: "Seg 13:30 (Turma A) · Qui 13:30 (A+B)", livro: "Lab livre: seg 21:00 · qua 14:30 · qui 21:00", tag: "ok", tagt: "8 aulas na pasta",
    files: ["plano de ensino - anatomia 2026-2", "aula 01 - crânio", "aula 02 - elementos descritivos do crânio", "aula 03 - sistema nervoso", "aula 04 - TC de crânio", "aula 06 - neuroanatomia", "aula 07 - músculos da cabeça", "aula 08 - nervos da cabeça", "atividade - radiologia do encéfalo", "laboratório/"],
    ck: ["Crânio: ossos e suturas", "Elementos descritivos do crânio (forames, fossas)", "Sistema nervoso: organização geral", "TC de crânio — leitura da imagem", "Neuroanatomia: encéfalo e estruturas", "Músculos da cabeça", "Nervos da cabeça e pares cranianos"] },

  { n: "Raciocínio Clínico II", p: "Abrão José Melhem Junior · Ana Cláudia I. Franceschini", q: "Sex 08:00", livro: "E-book de raciocínio clínico + artigos", tag: "ok", tagt: "3 tutorias + 5 artigos",
    files: ["tutoria 01 - introdução ao raciocínio clínico", "tutoria 02 - casos", "tutoria 03 - vieses cognitivos", "script clínico - anemia", "livro - e-book de raciocínio clínico", "artigo - Bowen (fundante)", "artigo - Croskerry, erros diagnósticos", "artigo - humanidades no RC", "artigo - IA no RC, riscos", "artigo - ferramentas de apoio ao diagnóstico"],
    ck: ["O que é raciocínio clínico (Bowen)", "Scripts de doença e scripts clínicos", "Vieses cognitivos e erros diagnósticos (Croskerry)", "Script clínico da anemia", "Ferramentas de apoio ao diagnóstico e riscos da IA", "Humanidades aplicadas ao raciocínio clínico"] },

  { n: "Construção do Conhecimento I", p: "Marcela Birolim · David Livingstone", q: "Seg 08:00", livro: "Epidemiologia e pesquisa científica", tag: "gap", tagt: "pasta vazia", files: [], ck: [] },
  { n: "Extensão Interprofissional II", p: "Ana Clara Vieira Alexandre Sierote · Talita Bishof", q: "Qua 08:00", livro: "Ação com base nas necessidades da comunidade", tag: "gap", tagt: "pasta vazia", files: [], ck: [] },
  { n: "Saúde Coletiva e Educação em Saúde II", p: "Ana Clara Vieira Alexandre Sierote · Talita Bishof", q: "Qua 10:00", livro: "—", tag: "gap", tagt: "pasta vazia", files: [], ck: [] }
];

var CAL = [
  { d: "2026-09-01", h: "Bioquímica — metabolismo dos carboidratos", s: "Correlação clínica: diabetes. Aula 7 do cronograma." },
  { d: "2026-09-03", h: "PROVA — Exame Físico (teórica)", s: "Sinais vitais, pulmonar, cardiovascular e abdome.", exam: true },
  { d: "2026-09-07", h: "Feriado — Independência", s: "Sem aula." },
  { d: "2026-09-08", h: "Reposição: Anatomia no lugar de Bioquímica", s: "Terça compensando o feriado de 07/09." },
  { d: "2026-09-15", h: "Bioquímica — ácidos nucleicos", s: "Prática: extração de DNA. Correlação: gota." },
  { d: "2026-09-21", h: "PROVA — Bioquímica: Avaliação 2 (7,0)", s: "Horário exato a confirmar com a professora.", exam: true },
  { d: "2026-09-27", h: "Fechamento do 1º bimestre", s: "(P1+P2)/2 + relatórios + atividade = 10,0." },
  { d: "2026-09-29", h: "Bioquímica — proteínas", s: "Devolutiva da Avaliação 2 + prática de desnaturação proteica." },
  { d: "2026-10-06", h: "Bioquímica — enzimas", s: "Prática: fermentação alcoólica." },
  { d: "2026-10-12", h: "Feriado — Nossa Senhora Aparecida", s: "Sem aula." },
  { d: "2026-10-13", h: "Recesso — Dia dos Professores", s: "Sem aula na terça." },
  { d: "2026-10-19", h: "PROVA — Bioquímica: Avaliação 1 do 2º bim (7,0)", s: "Proteínas e enzimas.", exam: true },
  { d: "2026-10-27", h: "Bioquímica — lipídeos", s: "Estrutura, importância e função." },
  { d: "2026-11-02", h: "Feriado — Finados", s: "Sem aula." },
  { d: "2026-11-03", h: "Reposição: Bioquímica", s: "Terça compensando o feriado de 02/11." },
  { d: "2026-11-10", h: "Bioquímica — metabolismo dos lipídeos", s: "" },
  { d: "2026-11-17", h: "Seminário de Bioquímica", s: "Turma A." },
  { d: "2026-11-23", h: "PROVA — Bioquímica: Avaliação 2 do 2º bim (7,0)", s: "Lipídeos e metabolismo lipídico.", exam: true },
  { d: "2026-12-01", h: "Devolutiva de Bioquímica", s: "" },
  { d: "2026-12-05", h: "Encerramento do 2º bimestre", s: "" },
  { d: "2026-12-07", h: "EXAME final — Bioquímica", s: "Só para quem não fechou média.", exam: true }
];

var GAPS = [
  "Datas das avaliações de <b>Anatomia</b>, <b>Genética</b>, <b>Raciocínio Clínico II</b> e <b>Construção do Conhecimento</b> — só Bioquímica tem cronograma na pasta.",
  "Horário exato das provas de Bioquímica (o cronograma dá só o dia).",
  "Falta a <b>aula 05 de Anatomia</b> — a numeração pula da 04 para a 06.",
  "As pastas de <b>Construção do Conhecimento</b>, <b>Extensão Interprofissional</b> e <b>Saúde Coletiva</b> ainda estão vazias.",
  "Trabalhos, seminários e relatórios de prática com data de entrega."
];

/* ===================== CARREIRA ===================== */

/* Marcos da rota até a cirurgia plástica. `d` é a data usada para saber
   qual fase está em curso; `key` destaca os marcos decisivos. */
var ROTA = [
  { d: "2026-02-01", ano: "2026 — agora", h: "2º período", key: true,
    s: "Fase de construir base e currículo. Anatomia, fisiologia e bioquímica são a espinha da prova de residência." },
  { d: "2029-02-01", ano: "2029", h: "4º ano — ENAMED como termômetro",
    s: "Alunos do 4º ano passaram a fazer o ENAMED. A nota não conta para o ENARE, mas é a prova de verdade, dois anos antes de valer." },
  { d: "2030-02-01", ano: "2030–2031", h: "Internato (5º e 6º ano)",
    s: "Quando o estudo vira preparação de prova para valer. As notas de currículo já estão fechadas." },
  { d: "2031-09-01", ano: "set–dez 2031", h: "1ª temporada de provas — acesso direto", key: true,
    s: "ENAMED em setembro (obrigatório, nota vale 3 anos) e as provas próprias entre outubro e dezembro. Aqui se decide onde faz cirurgia geral." },
  { d: "2032-03-01", ano: "2032–2033", h: "R1 e R2 de cirurgia geral",
    s: "Dois anos concluídos já valem como pré-requisito. O 3º ano é opcional e dá o título de cirurgião geral." },
  { d: "2033-09-01", ano: "2033 ou 2034", h: "2ª temporada — prova de pré-requisito", key: true,
    s: "Prova de cirurgia plástica. Menos candidatos por vaga, público muito mais selecionado: todos já são cirurgiões." },
  { d: "2034-03-01", ano: "2034–2036", h: "R3, R4 e R5 de cirurgia plástica",
    s: "Estética, reparadora, queimados, mão e microcirurgia." },
  { d: "2036-12-01", ano: "2036–2037", h: "Título de especialista", key: true,
    s: "Entre 28 e 29 anos, dependendo de fazer 2 ou 3 anos de cirurgia geral." }
];

var CRITERIOS = [
  { h: "O hospital tem residência de plástica na própria casa?",
    p: "Critério número um. Fazer cirurgia geral onde existe serviço de plástica são dois anos rodando perto da equipe que vai te selecionar, com chance de assistir cirurgia, ajudar em ambulatório e publicar com eles. Você deixa de ser um nome numa lista." },
  { h: "Volume e diversidade cirúrgica — principalmente trauma",
    p: "Plástica se apoia em manejo de ferida, retalho, enxerto e reconstrução. Hospital de trauma e de queimados forma mão muito mais rápido que hospital eletivo tranquilo." },
  { h: "Quantas portas uma prova só abre",
    p: "O SUS-SP dá acesso a mais de 50 instituições com uma prova; o ENARE, a milhares de vagas nacionais. Prova de instituição única é aposta cara." },
  { h: "Quanto pesa o currículo no edital",
    p: "Varia muito: no PSU-MG a prova tem peso 9 e o currículo peso 1; em outros a análise curricular e a prova prática valem bem mais. Isso define quanto do seu esforço até 2031 vai para ligas, pesquisa e congressos." },
  { h: "Onde você quer viver depois",
    p: "82% dos residentes ficam no mesmo estado onde fizeram residência. Rede de contatos e encaminhamento de pacientes se constroem durante a residência, e não viajam bem." },
  { h: "Bolsa contra custo de vida",
    p: "A bolsa federal é praticamente a mesma no país inteiro. Morar em Curitiba, Campinas ou Rio Preto com a mesma bolsa de São Paulo capital é uma diferença real de qualidade de vida por 5 anos." }
];

var SERVICOS = [
  { cenario: "Cenário A — ficar no Paraná",
    nota: "O HC-UFPR tem cirurgia geral e plástica na mesma casa. É exatamente o critério 01.",
    cols: ["Serviço", "Perfil", "Tem plástica?", "Prova"],
    linhas: [
      ["HC-UFPR", "Maior hospital universitário do estado, alta complexidade, forte em reconstrução e microcirurgia", "sim", "ENARE — rede Ebserh"],
      ["Hospital do Trabalhador", "Referência estadual em trauma e urgência — volume cirúrgico altíssimo", "não", "NC-UFPR / SESA-PR"],
      ["H. U. Cajuru (PUCPR)", "Trauma e emergência, mais de 60 vagas de residência", "não", "PUCPR"],
      ["H. U. Evangélico Mackenzie", "Hospital-escola tradicional, com fellowship em plástica avançada", "sim", "Mackenzie / AMP"],
      ["Erasto Gaertner", "Oncologia — porta para reconstrução mamária e de cabeça e pescoço", "não", "Própria"],
      ["Santa Casa de Curitiba", "Filantrópico geral, casuística ampla de SUS", "não", "Própria / AMP"]
    ]},
  { cenario: "Cenário B — São Paulo",
    nota: "Mais vagas de plástica por quilômetro quadrado, e o SUS-SP abre 50+ instituições com uma prova.",
    cols: ["Instituição", "Por que entra na lista", "Concorrência conhecida"],
    linhas: [
      ["USP-SP (HC-FMUSP)", "Maior e mais tradicional serviço de plástica do país, ~5.000 procedimentos/ano", "CG 34,9/vaga · Plástica 19,4/vaga (7 vagas)"],
      ["Unifesp (H. São Paulo)", "Referência histórica em reparadora, costuma ter mais vagas", "Alta"],
      ["Unicamp", "Excelência em reconstrução oncológica; poucas vagas", "Muito alta"],
      ["SUS-SP", "Uma prova, 50+ instituições. Santa Marcelina, Heliópolis e Ipiranga são os mais disputados", "Ipiranga ~17,9/vaga em CG"],
      ["FAMERP / H. de Base — Rio Preto", "Plástica muito completa, equipe de trauma e reconstrução de mandíbula; custo de vida baixo", "313 vagas no total"],
      ["Unesp Botucatu · IAMSPE", "Boa relação prática/concorrência, fora do eixo saturado", "Média-alta"]
    ]},
  { cenario: "Cenário C — outros polos",
    nota: "Valem a viagem por casuística específica.",
    cols: ["Onde", "Por quê", "Acesso"],
    linhas: [
      ["HRAN — Brasília", "Queimados, fissuras labiopalatinas e pós-bariátrica; ~2 vagas por processo", "Própria"],
      ["Fhemig / João XXIII — BH", "Trauma e queimados em altíssimo volume", "ENARE"],
      ["PSU-MG", "Maior concorrência de cirurgia geral do país (Felício Rocho, Mater Dei, Baleia)", "Prova peso 9 · currículo peso 1"],
      ["UERJ — Rio de Janeiro", "93 candidatos por vaga em cirurgia geral, com 3 vagas", "Prova única, 100 questões"]
    ]}
];

var PROVAS = [
  { n: "ENARE / ENAMED", a: "Nacional — 8.200+ vagas", i: "15/06 a 15/07", p: "13/09/2026" },
  { n: "HCPA", a: "Porto Alegre — 293 vagas", i: "28/08 a 29/09", p: "31/10/2026" },
  { n: "AMP / UCAMP", a: "Paraná — prova em Curitiba", i: "03/09 a 01/10", p: "01/11/2026" },
  { n: "Unicamp", a: "Campinas", i: "Conforme edital", p: "15/11/2026" },
  { n: "USP-RP", a: "Ribeirão Preto — 2 fases", i: "Conforme edital", p: "20/11 e 05/12/2026" },
  { n: "AMRIGS / ACM", a: "RS e SC", i: "09/09 a 19/10", p: "22/11/2026" },
  { n: "FAMERP", a: "Rio Preto — 313 vagas", i: "21/09 a 21/10", p: "24/11/2026" },
  { n: "USP-SP", a: "HC-FMUSP — 834 vagas", i: "Conforme edital", p: "06/12/2026" },
  { n: "Unifesp", a: "Hospital São Paulo", i: "Conforme edital", p: "Dezembro" },
  { n: "SUS-SP", a: "50+ instituições, fase única", i: "Conforme edital", p: "Dez/jan" }
];

var ACOES = [
  { h: "2º ao 4º período · base e currículo", tag: "ok", tagt: "fase atual",
    itens: [
      "Anatomia e fisiologia bem feitas valem mais que qualquer banco de questões — elas voltam na prova e na sala cirúrgica.",
      "Anki desde já, com a matéria do período. Em 2031 você chega com anos de cartões revisados, não com anos de coisa esquecida.",
      "Liga acadêmica: a LAPS já conta. Vale entrar também numa liga de cirurgia ou trauma assim que abrir.",
      "Iniciação científica com um professor cirurgião. Publicação leva 1 a 2 anos até sair — começar cedo é o que a faz aparecer no currículo em 2031.",
      "Monitoria, de preferência em anatomia. Pontua em quase todo edital.",
      "Congressos: SBCP regional do Paraná e congressos de cirurgia. Apresentar pôster vale mais que só assistir."
    ]},
  { h: "5º e 6º período · questões da matéria corrente", tag: "ok", tagt: "2028",
    itens: [
      "Quando entram as disciplinas clínicas, faça questões de residência daquele assunto no fim de cada bloco.",
      "Não é antecipar a prova inteira: é fixar o que você acabou de estudar no formato que a banca cobra.",
      "Prova antiga uma vez por semestre, sem cronômetro, só para calibrar."
    ]},
  { h: "Internato · virar candidato", tag: "gap", tagt: "2030–2031",
    itens: [
      "Estágio observativo em serviço de plástica — feito no 5º/6º ano, vira carta de recomendação.",
      "Estágio eletivo no serviço-alvo. É a forma mais barata de ser conhecido antes da prova.",
      "Banco de questões diário; cursinho no 6º ano.",
      "Habilidades manuais: sutura, nós, box trainer de laparoscopia.",
      "Inglês — leitura fluente para artigos, e obrigatório se a Austrália continuar no radar."
    ]}
];

var FONTES = [
  { n: "HC-UFPR", s: "Hoje a entrada é pelo ENARE. As provas próprias antigas ficam no Núcleo de Concursos — procure COREME + o ano.", u: "https://servicos.nc.ufpr.br/PortalNC/" },
  { n: "USP-SP", s: "Provas e gabaritos organizados pela Fuvest, com acervo de edições anteriores.", u: "https://www.fuvest.br/residencia-medica-provas-e-gabarito/" },
  { n: "ENARE", s: "Todas as edições da prova médica, com gabarito definitivo, na página oficial da FGV/Ebserh.", u: "https://mapa-vagas-enare-ebserh.conhecimento.fgv.br/provas-gabaritos-medica.html" },
  { n: "SUS-SP · Unifesp · Unicamp", s: "Publicam no site do processo seletivo de cada ano. Edições antigas somem do ar — baixe quando aparecer.", u: "" },
  { n: "Agregadores", s: "Medway, Estratégia MED, Sanar e Medcof publicam a prova dias depois com gabarito comentado. O comentário é o valor real.", u: "" }
];
