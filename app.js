
//--------------------------------------------------------------------------
let controlaSelect = 0;

function atualizarListaArtigos() {
  const tabelaBody = document.querySelector('tbody');
  tabelaBody.innerHTML = ''; // Limpa o corpo da tabela antes de preencher

  artigosDB.forEach(artigo => {
    const novaLinha = document.createElement('tr');
    const celulaId = document.createElement('td');
    const celulaNome = document.createElement('td');
    const celulaQuantidade = document.createElement('td');

    celulaId.textContent = artigo.id;
    celulaNome.textContent = artigo.nome;
    celulaQuantidade.textContent = artigo.quantidadeEstoque;

    novaLinha.appendChild(celulaId);
    novaLinha.appendChild(celulaNome);
    novaLinha.appendChild(celulaQuantidade);
    tabelaBody.appendChild(novaLinha);
  });

}
atualizarListaArtigos();

//-----------------------------------------------------------


function apresentaArtigo() {
  const tabelaArtigoAtivo = document.getElementById("artigoAtivo");
  tabelaArtigoAtivo.innerHTML = ''; // Limpa o corpo da tabela antes de preencher

  let artigoSelectID = artigosDB[controlaSelect].id;
  let artigoSelectNome = artigosDB[controlaSelect].nome;
  let artigoSelectQuantidade = artigosDB[controlaSelect].quantidadeEstoque;


  const novaLinha2 = document.createElement('tr');
  const celulaId2 = document.createElement('td');
  const celulaNome2 = document.createElement('td');
  const celulaQuantidade2 = document.createElement('td');

  celulaId2.textContent = artigoSelectID;
  celulaNome2.textContent = artigoSelectNome;
  celulaQuantidade2.textContent = artigoSelectQuantidade;

  novaLinha2.appendChild(celulaId2);
  novaLinha2.appendChild(celulaNome2);
  novaLinha2.appendChild(celulaQuantidade2);
  tabelaArtigoAtivo.appendChild(novaLinha2);

  document.getElementById("descricao").innerHTML = artigosDB[controlaSelect].descricao;

}
apresentaArtigo();

function apresentaComposicao() {
  const tabelaArtigoAtivo = document.getElementById("listaComposicao");
  tabelaArtigoAtivo.innerHTML = ''; // Limpa a tabela antes de preencher

  // Verifica se o artigo e seus componentes existem
  const artigo = artigosDB[controlaSelect];
  if (artigo && artigo.componentes.length > 0) {
    // Exibe o nome do artigo (opcional, dependendo da sua estrutura HTML)
    // ... (código para exibir o nome do artigo)

    artigo.componentes.forEach(componente => {
      const novaLinha = document.createElement('tr');
      const celulaId = document.createElement('td');
      const celulaNome = document.createElement('td');
      const celulaQuantidade = document.createElement('td');

      celulaId.textContent = componente.id;
      celulaNome.textContent = artigosDB[componente.id - 1].nome;; // Assumindo que o componente tem um atributo 'nome'
      celulaQuantidade.textContent = componente.quantidade;

      novaLinha.appendChild(celulaId);
      novaLinha.appendChild(celulaNome);
      novaLinha.appendChild(celulaQuantidade);
      tabelaArtigoAtivo.appendChild(novaLinha);
    });
  } else {
    // Mostra uma mensagem indicando que o artigo não tem componentes
    console.log("O artigo selecionado não possui componentes.");
  }
}
apresentaComposicao();

//------------------------------------------------------------------------------
//----------------------Remove Composição--------------------------------------------
//------------------------------------------------------------------------------

function removeComposicao(event) {
  event.preventDefault(); // Impede o recarregamento da págin
  const novaCompID = document.getElementById('idArtigo').value;
  console.log(novaCompID);

  // Validação básica
  if (novaCompID === '') {
    document.getElementById('mensagem').textContent = 'Por favor, preencha todos os campos.';
    return;
  }

  const artigo = artigosDB.find(a => a.id === controlaSelect + 1);

  if (artigosDB[controlaSelect + 1] != artigosDB[novaCompID]) {
    if (artigo) {
      if (artigosDB[novaCompID - 1]) {
        artigo.removerComponente(novaCompID);
        console.log(artigo);
        // Exibe mensagem de sucesso */
        document.getElementById('mensagem').textContent = 'Artigo adicionado a composição com sucesso!';

      } else {
        document.getElementById('mensagem').textContent = 'Componente não encontrado em artigosDB';
      }
    } else {
      document.getElementById('mensagem').textContent = 'Artigo não encontrado';
    }
  } document.getElementById('mensagem').textContent = 'O Artigo não pode conter a si mesmo na composição!';

  atualizarListaArtigos();
  apresentaComposicao();
  apresentaArtigo();
  // Limpa os campos do formulário
  document.getElementById('formComp').reset();
}
// Associa o evento submit do formulário à função criaArtigo
document.getElementById('sub').addEventListener('click', removeComposicao);


//------------------------------------------------------------------------------
//----------------------Remove Composição--------------------------------------------
//------------------------------------------------------------------------------


function adicionarComposicao(event) {
  event.preventDefault(); // Impede o recarregamento da págin
  const novaCompID = document.getElementById('idArtigo').value;
  console.log(novaCompID);
  const novaCompQt = Number(document.getElementById('quantidadeComp').value);
  console.log(novaCompQt);

  // Validação básica
  if (novaCompID === '' || novaCompQt === '') {
    document.getElementById('mensagem').textContent = 'Por favor, preencha todos os campos.';
    return;
  }

  const artigo = artigosDB.find(a => a.id === controlaSelect + 1);

  if (artigosDB[controlaSelect + 1] != artigosDB[novaCompID]) {
    if (artigo) {
      if (artigosDB[novaCompID - 1]) {
        artigo.adicionarComponente(novaCompID, novaCompQt);
        console.log(artigo);
        // Exibe mensagem de sucesso */
        document.getElementById('mensagem').textContent = 'Artigo adicionado a composição com sucesso!';

      } else {
        document.getElementById('mensagem').textContent = 'Componente não encontrado em artigosDB';
      }
    } else {
      document.getElementById('mensagem').textContent = 'Artigo não encontrado';
    }
  } document.getElementById('mensagem').textContent = 'O Artigo não pode conter a si mesmo na composição!';

  atualizarListaArtigos();
  apresentaComposicao();
  apresentaArtigo();
  // Limpa os campos do formulário
  document.getElementById('formComp').reset();
}

// Associa o evento submit do formulário à função criaArtigo
document.getElementById('add').addEventListener('click', adicionarComposicao);
//------------------------------------------------------------------------------
//----------------------CRIA ARTIGOS--------------------------------------------
//------------------------------------------------------------------------------

function criaArtigo(event) {
  event.preventDefault(); // Impede o recarregamento da página

  const nome = document.getElementById('nomeArtigo').value;
  const descricao = document.getElementById('descricaoArtigo').value;
  const quantidadeEstoque = document.getElementById('quantidadeEstoque').value;
  const id = artigosDB.length + 1;
  // Validação básica
  if (nome === '' || descricao === '') {
    document.getElementById('mensagem').textContent = 'Por favor, preencha todos os campos.';
    return;
  }

  // Cria o objeto artigo (adapte para o seu modelo de dados)
  const novoArtigo = new artigos(id, nome, descricao, false, [], quantidadeEstoque
  );

  // Adiciona o artigo ao artigosDB
  artigosDB.push(novoArtigo);
  atualizarListaArtigos();
  console.log(artigosDB[id - 1].nome);
  // Exibe mensagem de sucesso
  document.getElementById('mensagem').textContent = 'Artigo criado com sucesso!';

  // Limpa os campos do formulário
  document.getElementById('formArtigo').reset();
}

// Associa o evento submit do formulário à função criaArtigo
document.getElementById('formArtigo').addEventListener('submit', criaArtigo);

//------------------------------------------------------------------------------
//--------------------SELECIONA DA TABELA artigosDB-----------------------------
//------------------------------------------------------------------------------

function selecionaArtigo(event) {
  // Obtém a linha que foi clicada
  const linhaClicada = event.target.parentNode;

  // Obtém a primeira célula da linha
  const primeiraCelula = linhaClicada.firstElementChild;
  if (primeiraCelula.textContent != "ID") {
    // Obtém ID contido na primeira célula da tabela de Artigos em Estoque
    controlaSelect = Number(primeiraCelula.textContent) - 1;

    console.log("Valor da primeira célula:", controlaSelect);
    atualizarListaArtigos();
    apresentaComposicao();
    apresentaArtigo();
  }
}
document.getElementById("artigosDB").addEventListener("click", selecionaArtigo);