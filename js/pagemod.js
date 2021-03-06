var form = document.querySelector('#form1');
var node2Copy = document.querySelectorAll('[type=hidden], script');

var servidor = document.querySelector('#edtservidor');
servidor.removeAttribute('style');
servidor.setAttribute('class', 'form-control');

var db = document.querySelector('#edtbancodedados');
db.removeAttribute('style');
db.setAttribute('class', 'form-control');

var queryTextArea = document.querySelector('#edtdeclaracao').textContent;

var result = document.querySelector('#GridResultado') || document.createElement('div');

if (result.tagName == 'TABLE') {
  result.removeAttribute('style');
  result.querySelectorAll('tr').removeAttribute('style');
  result.setAttribute('class', 'table table-striped table-hover table-bordered table-condensed');
  var thead = document.createElement('thead');
  thead.appendChild(document.querySelector('#GridResultado tr'));
  result.insertAdjacentElement('afterBegin', thead);
}
else {
  result.setAttribute('class', 'alert alert-info');
  result.textContent = 'Nenhum resultado encontrado';
}

document.querySelectorAll('html > *').remove();

document.documentElement.insertAdjacentHTML('beforeend', `<head>
<title>SIMPLES - Execução Direta | Página customizada pela extensão Query History</title>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap-theme.min.css">
</head>
<body>
  <div id="flash-messages"></div>
  <nav class="navbar navbar-default">
    <div class="container">

      <div class="navbar-header">
          <a class="navbar-brand" id="home">SIMPLES</a>
      </div>

      <div id="navbar" class="collapse navbar-collapse">
          <ul class="nav navbar-nav navbar-right">
            <li><a href="#" id="user-matr"><span class="glyphicon glyphicon-user" aria-hidden="true"></span></a></li>
            <li><a id="logout"><span class="glyphicon glyphicon-log-out" aria-hidden="true"></span>Sair</a></li>
          </ul>
      </div><!--/.nav-collapse -->

    </div>
  </nav>
    <div class="container" id="container"></div>
</body>`);

document.querySelector('#home').setAttribute('href', "javascript:__doPostBack('edtVoltar','')");
document.querySelector('#logout').setAttribute('href', "javascript:__doPostBack('edtlogout','')");


form.innerHTML = '';
var container = document.querySelector('#container');
container.appendChild(form);
[].forEach.call(node2Copy, function(copy) { form.appendChild(copy) });

document.querySelector('#user-matr').insertAdjacentHTML('beforeend', user.id);

form.insertAdjacentHTML('beforeend', '<div id="options" class="form-inline"></div>');

var options = document.querySelector('#options');

options.insertAdjacentHTML('beforeend', '<label for="edtservidor" style="margin: 5px;">Servidor:</label>');
options.appendChild(servidor);

options.insertAdjacentHTML('beforeend', '<label for="edtbancodedados" style="margin: 5px;">Banco de dados:</label>');
options.appendChild(db);

options.insertAdjacentHTML('beforeend', '<hr>');

form.insertAdjacentHTML('beforeend', `<div class="btn-group form-group">
                              <a class="btn btn-success btn-xs" title="Ctrl+Enter" id="clickBtnExecutar">
                                <span class="glyphicon glyphicon-play" aria-hidden="true"></span>
                                <input name="btnExecutar" id="btnExecutar" type="image" class="hidden">
                                Executar
                              </a>
                              <a class="btn btn-default btn-xs" id="saveOption">
                                <span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>
                                 Salvar query
                              </a>
                              <a  class="btn btn-default btn-xs text-transform" id="capitalize">
                                <span class="glyphicon glyphicon-font" aria-hidden="true"></span>
                                Capitalize
                              </a>
                              <a class="btn btn-default btn-xs text-transform" id="uppercase">
                                <span class="glyphicon glyphicon-chevron-up" aria-hidden="true"></span>
                                Uppercase
                              </a>
                              <a class="btn btn-default btn-xs text-transform" id="lowercase">
                                <span class="glyphicon glyphicon-chevron-down" aria-hidden="true"></span>
                                Lowercase
                              </a>
                              <label style="margin-left: 5px;">
                                <input id="font"  title="Ajustar tamanho da fonte" type="range" min="50" max="200" step="10">
                              </label>
                              <label class="btn btn-default btn-xs">
                                <span class="glyphicon glyphicon-file" aria-hidden="true"></span>
                                <input name="btnExcel" id="btnExcel" type="image" class="hidden">
                                Exportar
                              </label>
                              <div class="btn-group">
                                <button class="btn btn-default btn-xs dropdown-toggle" type="button" id="dropdown-dml" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                  <i class="glyphicon glyphicon-export icon-share"></i>
                                  Gerar DML
                                  <span class="caret"></span>
                                </button>
                                <ul class="dropdown-menu" id="dml-actions" aria-labelledby="dropdown-dml">
                                  <li><a href="#" id="exportar-insert" title="Exporta resultado da query com DML de INSERT">INSERT</a></li>
                                  <li><a href="#" id="exportar-update" title="Exporta resultado da query com DML de UPDATE"
                                          data-toggle="modal" data-target="#updateDMLModal">UPDATE</a></li>
                                </ul>
                              </div>
                            </div>
                            <div class="form-group"><textarea id="edtdeclaracao" class="form-control" name="edtdeclaracao" rows="10"></textarea></div>
                            <div class="grid-resultado" id="result"></div>
                            <a href="#" id="details" class="vertical-grid btn btn-info btn-xs hide" data-toggle="modal" data-target="#verticalGridModal">
                              <i class="glyphicon glyphicon-zoom-in"></i>
                              Vertical Grid
                            </a>
                            `);

document.querySelector('#edtdeclaracao').textContent = queryTextArea;
document.querySelector('#result').appendChild(result);

// footer
var footer = document.createElement('footer');
footer.setAttribute('class', 'footer');

document.body.insertAdjacentHTML('beforeend', `<footer class="footer">
      <div class="input-group">
          <span class="input-group-btn">
          <button class="btn btn-default" type="button" id="toggle-table" title="Mostrar/Ocultar histórico">
            Histórico
            <span class="glyphicon glyphicon-console"></span>
          </button>
          </span>
          <form id="submit-search" autocomplete="off">
            <input id="history" class="form-control" placeholder="Digite parte da query salva e pressione enter para pesquisar...">
          </form>
          <span class="input-group-addon" id="message"></span>
      </div>
          <div class="pull-right">
            <input type="file" id="upload" accept="text/json" style="display:none;">
            <a id="local-storage-download"></a>
            <a id="local-storage-json"></a>
            <a id="local-storage-info"></a>
            <button class="btn btn-success btn-xs" id="local-storage-upload" title="Importa arquivo JSON com queries">
              <span class="glyphicon glyphicon-open-file"></span>
              Upload JSON
            </button>
          </div>
      <div id="result-history">
        <table><tbody></tbody></table>
      </div>
      </footer>`);

document.body.insertAdjacentHTML('beforeend', `<div>
<div class="modal fade" id="verticalGridModal" tabindex="-1" role="dialog" aria-labelledby="verticalGridModalLabel">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="verticalGridModalLabel">Vertical Grid</h4>
      </div>
      <div class="modal-body">
        <table id="verticalGridModalTable" class="table table-striped table-bordered table-responsive">
          <tbody></tbody>
        </table>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">Fechar</button>
      </div>
    </div>
  </div>
</div>
</div>`);

document.body.insertAdjacentHTML('beforeend', `<div>
<div class="modal fade" id="updateDMLModal" tabindex="-1" role="dialog" aria-labelledby="updateDMLModalLabel">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="updateDMLModalLabel">Gerar DML UPDATE</h4>
      </div>
      <div class="modal-body">
        <label for="tableName">Qual o nome da tabela?</label>
        <input type="text" class="form-control" id="tableName" placeholder="Digite aqui o nome da tabela">

        <label for="columns">Quais as colunas presentes no SET?</label>
        <select multiple id="columns" class="form-control"></select>

        <label for="conditions">Quais as colunas presentes no WHERE?</label>
        <select multiple id="conditions" class="form-control"></select>

        <label>Preview do DML</label>
        <textarea id="previewDml" class="form-control" rows="10" readonly></textarea>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-info btn-sm" id="previewDmlBtn">Preview</button>
        <a href="#" class="btn btn-success btn-sm" id="saveDmlBtn">Salvar</a>
        <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">Fechar</button>
      </div>
    </div>
  </div>
</div>
</div>`);

var jq = document.createElement('script');
jq.src = 'https://code.jquery.com/jquery-2.2.3.min.js';
jq.integrity = 'sha256-a23g1Nt4dtEYOj7bR+vTu7+T8VP13humZFBJNIYoEJo=';
jq.crossOrigin = 'anonymous';
document.body.appendChild(jq);

jq.onload = function() {
  var bjs = document.createElement('script');
  bjs.src = 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js';
  document.body.appendChild(bjs);
}

