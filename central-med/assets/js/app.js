/* Central Med — render e navegação
   por Felipe Folquenin */
(function () {
  "use strict";

  var MESES = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
  var DIAS = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];

  function parse(s) { var p = s.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function fmt(dt) { return pad(dt.getDate()) + "/" + pad(dt.getMonth() + 1); }
  function pad(n) { return String(n).padStart(2, "0"); }
  function el(id) { return document.getElementById(id); }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  var hoje = new Date(); hoje.setHours(0, 0, 0, 0);

  /* ---------- armazenamento local, sempre protegido ---------- */
  var LS = (function () { try { return window.localStorage; } catch (e) { return null; } })();
  function get(k) { try { return LS ? LS.getItem(k) : null; } catch (e) { return null; } }
  function set(k, v) { try { if (LS) LS.setItem(k, v); } catch (e) {} }

  /* =================== SEMESTRE =================== */

  /* grade da semana */
  var wk = el("week");
  GRADE.forEach(function (g) {
    var d = document.createElement("div");
    var isToday = hoje.getDay() === g.n;
    d.className = "day" + (isToday ? " today" : "");
    var h = '<div class="dayhead"><span>' + g.d + "</span>" + (isToday ? "<em>HOJE</em>" : "") + "</div>";
    g.aulas.forEach(function (a) {
      h += '<div class="slot' + (a.night ? " night" : "") + (a.lab ? " lab" : "") + '">' +
        '<span class="t">' + a.t + '</span><span class="n">' + esc(a.n) +
        "<small>" + a.t + "–" + a.f + " · " + esc(a.s) + "</small></span></div>";
    });
    d.innerHTML = h;
    wk.appendChild(d);
  });

  /* disciplinas */
  var dc = el("discs");
  DISC.forEach(function (d, i) {
    var art = document.createElement("article");
    art.className = "disc";
    var h = "<header><div><h3>" + esc(d.n) + '</h3><p class="prof">' + esc(d.p) + "</p></div>" +
      '<span class="pill ' + d.tag + '">' + esc(d.tagt) + "</span></header>";
    h += "<dl><dt>Quando</dt><dd>" + esc(d.q) + "</dd>" +
      (d.livro !== "—" ? "<dt>Base</dt><dd>" + esc(d.livro) + "</dd>" : "") + "</dl>";
    if (d.files.length) {
      h += '<ul class="files">' + d.files.map(function (f) { return "<li>" + esc(f) + "</li>"; }).join("") + "</ul>";
    }
    if (d.ck.length) {
      h += '<ul class="checks">' + d.ck.map(function (c, j) {
        return '<li><label><input type="checkbox" data-k="ck' + i + "-" + j + '"><span>' + esc(c) + "</span></label></li>";
      }).join("") + "</ul>";
    }
    art.innerHTML = h;
    dc.appendChild(art);
  });

  /* checkboxes persistentes */
  Array.prototype.forEach.call(document.querySelectorAll(".checks input"), function (inp) {
    var k = "centralmed-" + inp.dataset.k;
    if (get(k) === "1") inp.checked = true;
    inp.addEventListener("change", function () { set(k, inp.checked ? "1" : "0"); });
  });

  /* calendário do semestre */
  var tl = el("tl"), achouProx = false, proxProva = null;
  CAL.forEach(function (c) {
    var dt = parse(c.d), past = dt < hoje, li = document.createElement("li");
    var cls = (c.exam ? "exam " : "") + (past ? "past" : "");
    if (!past && !achouProx) { cls += " next"; achouProx = true; }
    if (!past && c.exam && !proxProva) proxProva = c;
    li.className = cls.trim();
    li.innerHTML = '<div class="d">' + fmt(dt) + " · " + DIAS[dt.getDay()].slice(0, 3) + "</div>" +
      '<p class="h">' + esc(c.h) + "</p>" + (c.s ? '<p class="s">' + esc(c.s) + "</p>" : "");
    tl.appendChild(li);
  });

  /* tiles do semestre */
  if (proxProva) {
    var pd = parse(proxProva.d), dias = Math.round((pd - hoje) / 864e5);
    el("prova-nome").textContent = proxProva.h.replace(/^PROVA — /, "").replace(/^EXAME final — /, "Exame final: ");
    el("prova-quando").textContent = (dias === 0 ? "É hoje" : dias === 1 ? "É amanhã" : "Em " + dias + " dias") +
      " · " + fmt(pd) + ", " + DIAS[pd.getDay()];
  } else {
    el("t-prova").classList.remove("alarm");
    el("prova-nome").textContent = "Nenhuma";
    el("prova-quando").textContent = "Semestre encerrado.";
  }

  el("hoje-data").textContent = DIAS[hoje.getDay()].replace("-feira", "");
  var gh = GRADE.filter(function (g) { return g.n === hoje.getDay(); })[0];
  el("hoje-aulas").textContent = gh
    ? gh.aulas.map(function (a) { return a.t + " " + a.n; }).join(" · ")
    : "Sem aula na grade.";

  var ini = parse(SEMESTRE.inicio), fim = parse(SEMESTRE.fim);
  var pct = Math.max(0, Math.min(100, Math.round((hoje - ini) / (fim - ini) * 100)));
  el("sem-pct").textContent = pct + "%";
  el("sem-bar").style.width = pct + "%";
  var faltam = Math.max(0, Math.round((fim - hoje) / 864e5));
  el("sem-txt").textContent = "percorrido · faltam " + faltam + " dias até o encerramento do 2º bimestre";

  el("gaps").innerHTML = GAPS.map(function (g) { return "<li>" + g + "</li>"; }).join("");

  /* =================== CARREIRA =================== */

  var FORMATURA = parse("2031-12-15");
  var PRIMEIRA_PROVA = parse("2031-09-13");

  function anos(ate) { return (ate - hoje) / 3.15576e10; }

  el("c-formatura").textContent = "dez/2031";
  el("c-formatura-txt").textContent = "faltam " + anos(FORMATURA).toFixed(1).replace(".", ",") + " anos · 6 anos de curso";
  el("c-prova").textContent = "set/2031";
  el("c-prova-txt").textContent = "ENAMED, obrigatório para todo formando · nota vale 3 anos";

  /* Fase atual = o último marco que já começou. Uma fase só vira "passada"
     quando a seguinte começa — senão o 2º período apareceria apagado hoje. */
  var iAtual = 0;
  ROTA.forEach(function (f, i) { if (parse(f.d) <= hoje) iAtual = i; });
  el("c-fase").textContent = ROTA[iAtual].h;
  el("c-fase-txt").textContent = ROTA[iAtual].ano;

  /* linha do tempo da rota */
  var rtl = el("rota-tl");
  ROTA.forEach(function (f, i) {
    var li = document.createElement("li");
    var cls = (f.key ? "key " : "") + (i < iAtual ? "past" : "") + (i === iAtual ? " next" : "");
    li.className = cls.trim();
    li.innerHTML = '<div class="d">' + esc(f.ano) + "</div>" +
      '<p class="h">' + esc(f.h) + "</p>" +
      '<p class="s">' + esc(f.s) + "</p>";
    rtl.appendChild(li);
  });

  /* critérios */
  el("crit").innerHTML = CRITERIOS.map(function (c, i) {
    return '<li><span class="n">' + pad(i + 1) + "</span><div><h4>" + esc(c.h) + "</h4><p>" + esc(c.p) + "</p></div></li>";
  }).join("");

  /* serviços */
  el("servicos-box").innerHTML = SERVICOS.map(function (bloco) {
    var head = "<tr>" + bloco.cols.map(function (c) { return "<th>" + esc(c) + "</th>"; }).join("") + "</tr>";
    var body = bloco.linhas.map(function (l) {
      return "<tr>" + l.map(function (v, i) {
        var conteudo = v === "sim" ? '<span class="tag">sim</span>'
          : v === "não" ? '<span class="tag no">não</span>'
          : i === 0 ? "<b>" + esc(v) + "</b>" : esc(v);
        return '<td data-label="' + esc(bloco.cols[i]) + '">' + conteudo + "</td>";
      }).join("") + "</tr>";
    }).join("");
    return '<p class="cap">' + esc(bloco.cenario) + "</p>" +
      '<p style="font-size:14px;color:var(--ink-2);margin:0 0 10px">' + esc(bloco.nota) + "</p>" +
      '<div class="tblwrap"><table><thead>' + head + "</thead><tbody>" + body + "</tbody></table></div>";
  }).join("");

  /* calendário de provas */
  el("provas-tbl").querySelector("tbody").innerHTML = PROVAS.map(function (p) {
    return "<tr>" +
      '<td data-label="Prova"><b>' + esc(p.n) + "</b></td>" +
      '<td data-label="Abrangência">' + esc(p.a) + "</td>" +
      '<td data-label="Inscrição" class="num">' + esc(p.i) + "</td>" +
      '<td data-label="Prova" class="num">' + esc(p.p) + "</td></tr>";
  }).join("");

  /* ações por fase */
  el("acoes-box").innerHTML = ACOES.map(function (a) {
    return '<article class="disc"><header><div><h3>' + esc(a.h) + "</h3></div>" +
      '<span class="pill ' + a.tag + '">' + esc(a.tagt) + "</span></header>" +
      '<ul class="plain">' + a.itens.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") + "</ul></article>";
  }).join("");

  /* fontes de provas antigas */
  el("fontes-box").innerHTML = FONTES.map(function (f) {
    return "<li><b>" + esc(f.n) + "</b><span>" + esc(f.s) + "</span>" +
      (f.u ? '<br><a href="' + f.u + '" target="_blank" rel="noopener">' + f.u + "</a>" : "") + "</li>";
  }).join("");


  /* =================== AGENDA =================== */

  var CHAVE = "centralmed-tarefas";

  function isoDe(dt) { return dt.getFullYear() + "-" + pad(dt.getMonth() + 1) + "-" + pad(dt.getDate()); }
  var HOJE_ISO = isoDe(hoje);
  function diasAte(iso) { return Math.round((parse(iso) - hoje) / 864e5); }

  var tarefas = (function () {
    try { var b = JSON.parse(get(CHAVE) || "[]"); return Array.isArray(b) ? b : []; }
    catch (e) { return []; }
  })();
  function salvarTarefas() { set(CHAVE, JSON.stringify(tarefas)); }
  function acharTarefa(id) { return tarefas.filter(function (t) { return t.id === id; })[0]; }

  /* aulas de um dia da semana, na ordem */
  function aulasDoDia(diaSemana) {
    var g = GRADE.filter(function (x) { return x.n === diaSemana; })[0];
    return g ? g.aulas : [];
  }

  /* preenche o select de disciplinas com as do semestre */
  var selDisc = el("f-disciplina");
  selDisc.innerHTML = '<option value="">— sem disciplina —</option>' +
    DISC.map(function (d) { return '<option value="' + esc(d.n) + '">' + esc(d.n) + "</option>"; }).join("") +
    '<option value="Pessoal">Pessoal</option>';

  el("f-data").value = HOJE_ISO;

  /* ---------- agrupamento ---------- */
  function agrupar() {
    var g = { atrasadas: [], hoje: [], amanha: [], semana: [], depois: [], semdata: [], feitas: [] };
    tarefas.forEach(function (t) {
      if (t.feita) { g.feitas.push(t); return; }
      if (!t.data) { g.semdata.push(t); return; }
      var d = diasAte(t.data);
      if (d < 0) g.atrasadas.push(t);
      else if (d === 0) g.hoje.push(t);
      else if (d === 1) g.amanha.push(t);
      else if (d <= 7) g.semana.push(t);
      else g.depois.push(t);
    });
    var ordem = function (a, b) {
      if (a.alta !== b.alta) return a.alta ? -1 : 1;
      if (a.data && b.data && a.data !== b.data) return a.data < b.data ? -1 : 1;
      return 0;
    };
    Object.keys(g).forEach(function (k) { g[k].sort(ordem); });
    g.feitas.sort(function (a, b) { return (b.feitaEm || "") < (a.feitaEm || "") ? -1 : 1; });
    return g;
  }

  function linhaTarefa(t) {
    var atraso = t.data && !t.feita ? diasAte(t.data) : null;
    var meta = [];
    if (t.data) {
      var d = parse(t.data);
      var quando = fmt(d) + " · " + DIAS[d.getDay()].slice(0, 3);
      if (atraso !== null && atraso < 0) meta.push('<span class="atraso">' + quando + " · " + (-atraso) + (atraso === -1 ? " dia atrás" : " dias atrás") + "</span>");
      else meta.push("<b>" + quando + "</b>");
    }
    if (t.disciplina) meta.push('<span class="materia">' + esc(t.disciplina) + "</span>");
    if (t.alta && !t.feita) meta.push('<span class="atraso">prioridade alta</span>');

    return '<li class="tarefa' + (t.feita ? " feita" : "") + (t.alta && !t.feita ? " alta" : "") +
      (atraso !== null && atraso < 0 ? " atrasada" : "") + '" data-id="' + t.id + '">' +
      '<input type="checkbox" data-acao="feita"' + (t.feita ? " checked" : "") + ' aria-label="Concluir">' +
      '<div class="corpo"><div class="tit">' + esc(t.titulo) + "</div>" +
      (meta.length ? '<div class="meta">' + meta.join("") + "</div>" : "") + "</div>" +
      '<div class="acoes">' +
      '<button class="icone" data-acao="editar" type="button" aria-label="Editar">&#9998;</button>' +
      '<button class="icone apagar" data-acao="apagar" type="button" aria-label="Apagar">&times;</button>' +
      "</div></li>";
  }

  function bloco(titulo, lista, urgente) {
    if (!lista.length) return "";
    return '<div class="grupo' + (urgente ? " urgente" : "") + '"><h3>' + titulo +
      " <em>" + lista.length + "</em></h3><ul class=\"tarefas\">" +
      lista.map(linhaTarefa).join("") + "</ul></div>";
  }

  function renderAgenda() {
    var g = agrupar();
    var html =
      bloco("Atrasadas", g.atrasadas, true) +
      bloco("Hoje", g.hoje, true) +
      bloco("Amanhã", g.amanha) +
      bloco("Próximos 7 dias", g.semana) +
      bloco("Mais adiante", g.depois) +
      bloco("Sem data", g.semdata) +
      bloco("Concluídas", g.feitas);
    el("grupos").innerHTML = html ||
      '<div class="vazio">Nenhuma tarefa ainda. Lance a primeira aí em cima — leva cinco segundos.</div>';

    var abertas = tarefas.filter(function (t) { return !t.feita; }).length;
    el("lista-resumo").textContent = tarefas.length
      ? abertas + (abertas === 1 ? " aberta" : " abertas") + " · " + g.feitas.length + " concluída" + (g.feitas.length === 1 ? "" : "s")
      : "nada lançado ainda";

    /* tiles */
    var aulas = aulasDoDia(hoje.getDay());
    el("ag-aulas-n").textContent = aulas.length ? aulas.length : "Livre";
    el("ag-aulas-txt").textContent = aulas.length
      ? aulas[0].t + " " + aulas[0].n + (aulas.length > 1 ? " · e mais " + (aulas.length - 1) : "")
      : "Sem aula na grade de hoje.";

    el("ag-tarefas-n").textContent = g.hoje.length;
    el("ag-tarefas-txt").textContent = g.hoje.length
      ? g.hoje.filter(function (t) { return t.alta; }).length + " de prioridade alta"
      : "Nada marcado para hoje.";

    el("ag-atraso-n").textContent = g.atrasadas.length;
    el("t-atrasadas").classList.toggle("alarm", g.atrasadas.length > 0);
    el("ag-atraso-txt").textContent = g.atrasadas.length
      ? "Passaram da data. Reagende ou feche."
      : "Nada atrasado. Em dia.";
  }

  /* ---------- formulário ---------- */
  var form = el("form-tarefa");
  function limparForm() {
    el("f-id").value = "";
    el("f-titulo").value = "";
    el("f-data").value = HOJE_ISO;
    el("f-disciplina").value = "";
    el("f-alta").checked = false;
    el("btn-salvar").textContent = "Adicionar";
    el("btn-cancelar").hidden = true;
    el("form-modo").textContent = "o que precisa ser feito";
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var titulo = el("f-titulo").value.trim();
    if (!titulo) return;
    var id = el("f-id").value;
    var dados = {
      titulo: titulo,
      data: el("f-data").value || "",
      disciplina: el("f-disciplina").value || "",
      alta: el("f-alta").checked
    };
    if (id) {
      var t = acharTarefa(id);
      if (t) { t.titulo = dados.titulo; t.data = dados.data; t.disciplina = dados.disciplina; t.alta = dados.alta; }
    } else {
      dados.id = String(Date.now()) + String(Math.floor(Math.random() * 1000));
      dados.feita = false;
      dados.criadaEm = HOJE_ISO;
      tarefas.push(dados);
    }
    salvarTarefas();
    limparForm();
    renderAgenda();
    el("f-titulo").focus();
  });

  el("btn-cancelar").addEventListener("click", limparForm);

  /* ---------- ações nas tarefas ---------- */
  el("grupos").addEventListener("click", function (e) {
    var alvo = e.target.closest ? e.target.closest("[data-acao]") : null;
    if (!alvo) return;
    var li = alvo.closest(".tarefa");
    if (!li) return;
    var t = acharTarefa(li.dataset.id);
    if (!t) return;
    var acao = alvo.dataset.acao;

    if (acao === "feita") {
      t.feita = alvo.checked;
      t.feitaEm = alvo.checked ? HOJE_ISO : "";
    } else if (acao === "apagar") {
      tarefas = tarefas.filter(function (x) { return x.id !== t.id; });
    } else if (acao === "editar") {
      el("f-id").value = t.id;
      el("f-titulo").value = t.titulo;
      el("f-data").value = t.data || "";
      el("f-disciplina").value = t.disciplina || "";
      el("f-alta").checked = !!t.alta;
      el("btn-salvar").textContent = "Salvar";
      el("btn-cancelar").hidden = false;
      el("form-modo").textContent = "editando uma tarefa";
      el("nova").scrollIntoView({ behavior: "smooth", block: "start" });
      el("f-titulo").focus();
      return;
    }
    salvarTarefas();
    renderAgenda();
  });

  /* ---------- briefing ---------- */
  function gerarBriefing() {
    var g = agrupar();
    var L = [];
    var dataLonga = DIAS[hoje.getDay()] + ", " + fmt(hoje) + "/" + hoje.getFullYear();

    L.push("CENTRAL MED — BRIEFING DO DIA");
    L.push(dataLonga);
    L.push("");

    var aulas = aulasDoDia(hoje.getDay());
    L.push("AULAS DE HOJE");
    if (aulas.length) {
      aulas.forEach(function (a) {
        L.push("  " + a.t + "–" + a.f + "  " + a.n);
      });
    } else {
      L.push("  Sem aula na grade.");
    }
    L.push("");

    L.push("PARA HOJE");
    if (g.hoje.length) {
      g.hoje.forEach(function (t) {
        L.push("  [ ] " + t.titulo + (t.disciplina ? "  — " + t.disciplina : "") + (t.alta ? "  *ALTA*" : ""));
      });
    } else {
      L.push("  Nada marcado.");
    }
    L.push("");

    if (g.atrasadas.length) {
      L.push("ATRASADAS (" + g.atrasadas.length + ")");
      g.atrasadas.forEach(function (t) {
        var d = -diasAte(t.data);
        L.push("  [ ] " + t.titulo + "  — venceu em " + fmt(parse(t.data)) + " (" + d + (d === 1 ? " dia" : " dias") + ")");
      });
      L.push("");
    }

    if (g.amanha.length) {
      L.push("AMANHÃ");
      g.amanha.forEach(function (t) { L.push("  · " + t.titulo + (t.disciplina ? "  — " + t.disciplina : "")); });
      L.push("");
    }

    var prazos = CAL.filter(function (c) {
      var d = diasAte(c.d);
      return d >= 0 && d <= 21;
    }).slice(0, 5);
    if (prazos.length) {
      L.push("PRÓXIMAS DATAS");
      prazos.forEach(function (c) {
        var d = diasAte(c.d);
        L.push("  " + fmt(parse(c.d)) + "  " + (d === 0 ? "hoje" : d === 1 ? "amanhã" : "em " + d + " dias") + "  —  " + c.h);
      });
      L.push("");
    }

    var ini = parse(SEMESTRE.inicio), fim = parse(SEMESTRE.fim);
    var pct = Math.max(0, Math.min(100, Math.round((hoje - ini) / (fim - ini) * 100)));
    var faltam = Math.max(0, Math.round((fim - hoje) / 864e5));
    L.push("SEMESTRE");
    L.push("  " + pct + "% percorrido · faltam " + faltam + " dias até o encerramento do 2º bimestre");
    L.push("");
    L.push("—");
    L.push("por Felipe Folquenin · Medicina, Uniguairacá");

    return L.join("\n");
  }

  var painel = el("painel-briefing");
  el("btn-briefing").addEventListener("click", function () {
    el("briefing-txt").textContent = gerarBriefing();
    painel.hidden = false;
    painel.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
  el("btn-fechar").addEventListener("click", function () { painel.hidden = true; });

  function avisar(btn, texto) {
    var antes = btn.textContent;
    btn.textContent = texto;
    setTimeout(function () { btn.textContent = antes; }, 1600);
  }

  el("btn-copiar").addEventListener("click", function () {
    var txt = el("briefing-txt").textContent;
    var btn = this;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(txt).then(function () { avisar(btn, "Copiado"); },
        function () { avisar(btn, "Selecione e copie"); });
    } else {
      var r = document.createRange();
      r.selectNodeContents(el("briefing-txt"));
      var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
      avisar(btn, "Selecionado");
    }
  });

  function baixar(nome, conteudo, tipo) {
    try {
      var blob = new Blob([conteudo], { type: tipo });
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url; a.download = nome;
      document.body.appendChild(a); a.click();
      document.body.removeChild(a);
      setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
      return true;
    } catch (e) { return false; }
  }

  el("btn-baixar").addEventListener("click", function () {
    var nome = "briefing-" + HOJE_ISO + ".txt";
    if (!baixar(nome, el("briefing-txt").textContent, "text/plain;charset=utf-8")) {
      avisar(this, "Copie o texto");
    }
  });

  /* ---------- exportar e importar ---------- */
  el("btn-exportar").addEventListener("click", function () {
    if (!tarefas.length) { avisar(this, "Nada para exportar"); return; }
    if (!baixar("tarefas-central-med-" + HOJE_ISO + ".json", JSON.stringify(tarefas, null, 2), "application/json")) {
      avisar(this, "Não deu");
    }
  });

  el("btn-importar").addEventListener("click", function () { el("f-arquivo").click(); });

  el("f-arquivo").addEventListener("change", function () {
    var arq = this.files && this.files[0];
    if (!arq) return;
    var btn = el("btn-importar");
    var leitor = new FileReader();
    leitor.onload = function () {
      var novas;
      try { novas = JSON.parse(leitor.result); } catch (e) { avisar(btn, "Arquivo inválido"); return; }
      if (!Array.isArray(novas)) { avisar(btn, "Arquivo inválido"); return; }
      var tinha = {};
      tarefas.forEach(function (t) { tinha[t.id] = true; });
      var somadas = 0;
      novas.forEach(function (t) {
        if (!t || typeof t.titulo !== "string" || !t.id || tinha[t.id]) return;
        tarefas.push({
          id: String(t.id), titulo: String(t.titulo).slice(0, 200),
          data: typeof t.data === "string" ? t.data : "",
          disciplina: typeof t.disciplina === "string" ? t.disciplina : "",
          alta: !!t.alta, feita: !!t.feita,
          feitaEm: typeof t.feitaEm === "string" ? t.feitaEm : "",
          criadaEm: typeof t.criadaEm === "string" ? t.criadaEm : HOJE_ISO
        });
        somadas++;
      });
      salvarTarefas();
      renderAgenda();
      avisar(btn, somadas + (somadas === 1 ? " tarefa" : " tarefas"));
    };
    leitor.readAsText(arq);
    this.value = "";
  });

  renderAgenda();

  /* =================== NAVEGAÇÃO =================== */

  var CHIPS = {
    semestre: [["#agora", "Agora"], ["#grade", "Grade da semana"], ["#disciplinas", "Disciplinas"], ["#calendario", "Calendário"], ["#pendencias", "O que falta"]],
    agenda: [["#briefing", "Briefing"], ["#nova", "Nova tarefa"], ["#lista", "Afazeres"]],
    carreira: [["#rota", "Resumo"], ["#linha", "A rota"], ["#criterios", "Critérios"], ["#servicos", "Serviços"], ["#provas", "Provas"], ["#acoes", "O que fazer"], ["#fontes", "Provas antigas"]]
  };
  var TITULOS = {
    semestre: { t: "Central do 2º Período", e: "Medicina · Uniguairacá · 2º período · Turma A · 2026/2" },
    agenda: { t: "Agenda", e: "Aulas, afazeres e o briefing do dia" },
    carreira: { t: "Rota até a cirurgia plástica", e: "Residência · cirurgia geral como pré-requisito · 2031–2036" }
  };

  function trocarView(v) {
    if (!CHIPS[v]) v = "semestre";
    el("view-semestre").hidden = v !== "semestre";
    el("view-agenda").hidden = v !== "agenda";
    el("view-carreira").hidden = v !== "carreira";
    Array.prototype.forEach.call(document.querySelectorAll(".segbtn"), function (b) {
      b.setAttribute("aria-selected", b.dataset.view === v ? "true" : "false");
    });
    el("chips").innerHTML = CHIPS[v].map(function (c) {
      return '<a href="' + c[0] + '">' + c[1] + "</a>";
    }).join("");
    el("apptitle").textContent = TITULOS[v].t;
    el("eyebrow").textContent = TITULOS[v].e;
    set("centralmed-view", v);
    if (location.hash.slice(2) !== v) history.replaceState(null, "", "#/" + v);
    window.scrollTo(0, 0);
  }

  Array.prototype.forEach.call(document.querySelectorAll(".segbtn"), function (b) {
    b.addEventListener("click", function () { trocarView(b.dataset.view); });
  });

  var inicial = location.hash.indexOf("#/") === 0 ? location.hash.slice(2) : (get("centralmed-view") || "semestre");
  trocarView(inicial);

  /* tema */
  var temaSalvo = get("centralmed-tema");
  if (temaSalvo) document.documentElement.setAttribute("data-theme", temaSalvo);
  el("theme").addEventListener("click", function () {
    var r = document.documentElement, cur = r.getAttribute("data-theme");
    var escuroAgora = cur ? cur === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    var novo = escuroAgora ? "light" : "dark";
    r.setAttribute("data-theme", novo);
    set("centralmed-tema", novo);
  });

  /* rodapé */
  el("stamp").textContent = "aberto em " + fmt(new Date()) + "/" + new Date().getFullYear();

  /* abertura: some sozinha pelo CSS; aqui só tiramos do caminho de vez
     e deixamos o toque pular a animação de quem está com pressa. */
  var splash = el("splash");
  if (splash) {
    var fecha = function () {
      splash.style.transition = "opacity .25s ease";
      splash.style.opacity = "0";
      setTimeout(function () { if (splash.parentNode) splash.parentNode.removeChild(splash); }, 260);
    };
    splash.addEventListener("click", fecha);
    splash.addEventListener("touchstart", fecha, { passive: true });
    setTimeout(function () { if (splash.parentNode) splash.parentNode.removeChild(splash); }, 2900);
  }

  /* service worker — deixa o app abrir offline */
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("sw.js").catch(function () {});
    });
  }
})();
