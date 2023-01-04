let livros = []
const endpointDaApi = 'https://guilhermeonrails.github.io/casadocodigo/livros.json'
getBuscarLivrosDaApi()
const elementoParaInserirLivros = document.getElementById('livros')

async function getBuscarLivrosDaApi() {
  const res = await fetch(endpointDaApi)
  livros = await res.json()
  let livrosComDescontos = aplicarDesconto(livros)
  exibirOsLivrosNaTela(livrosComDescontos)
}

function exibirOsLivrosNaTela(listaDeLivros) {
  elementoParaInserirLivros.innerHTML = ''
  listaDeLivros.forEach(livro => {
    let disponibilidade = livro.quantidade > 0 ? 'livro__imagens' : 'livro__imagens indisponivel'
    elementoParaInserirLivros.innerHTML += `
      <div class="livro">
      <img class="${disponibilidade}" src="${livro.imagem}" alt="${livro.alt}" />
      <h2 class="livro__titulo">
        ${livro.titulo}
      </h2>
      <p class="livro__descricao">${livro.autor}</p>
      <p class="livro__preco" id="preco">${livro.preco.toFixed(2)}</p>
      <div class="tags">
        <span class="tag">${livro.categoria}</span>
      </div>
    </div>
      `
  })
}

function aplicarDesconto(livros) {
  const desconto = 0.3
  livrosComDescontos = livros.map(livro => {
    return {...livro, preco: livro.preco - (livro.preco * desconto)}
  })
  return livrosComDescontos
}

const botoes = document.querySelectorAll('.btn')
botoes.forEach(btn => btn.addEventListener("click", filtrarLivros))

function filtrarLivros() {
  const elementoBtn = document.getElementById(this.id)
  const categoria = elementoBtn.value
  let livrosFiltrados = categoria == 'disponivel' ? livros.filter(livro => livro.quantidade > 0) : livros.filter(livro => livro.categoria == categoria)
  exibirOsLivrosNaTela(livrosFiltrados)
}

let btnOrdenarPorPreco = document.getElementById('btnOrdenarPorPreco')
btnOrdenarPorPreco.addEventListener("click", ordenarLivrosPorPreco);

function ordenarLivrosPorPreco() {
  let livrosOrdenados = livros.sort((a, b) => a.preco - b.preco)
  exibirOsLivrosNaTela(livrosOrdenados)
}

