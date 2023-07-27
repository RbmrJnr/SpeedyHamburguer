// Função para fazer uma requisição HTTP assíncrona e buscar os dados do arquivo "Produtos.json"
function fetchProdutos() {
  const ajax = new XMLHttpRequest()

  // Configura a requisição para buscar o arquivo "Produtos.json" de forma assíncrona
  ajax.open("GET", "Produtos.json", true)

  // Define o tipo de resposta esperada como JSON
  ajax.responseType = "json"

  // Define o que será feito quando a requisição estiver concluída
  ajax.onload = function () {
    // Verifica se a requisição foi bem-sucedida (status 200) e se a resposta existe
    if (ajax.status === 200 && ajax.response) {
      // Armazena a resposta recebida (um array de objetos JSON) na variável "produtos"
      const produtos = ajax.response

      // Exibe os produtos na página
      exibirProdutos(produtos)
    } else {
      console.error("Falha ao buscar os produtos.")
    }
  }

  // Envia a requisição para buscar o arquivo "Produtos.json" do servidor
  ajax.send()
}

// Função para exibir os produtos na página
function exibirProdutos(produtos) {
  // Encontra o elemento HTML com o id "card-pedidos" que será usado para exibir os cards dos produtos
  const containerCardsPedidos = document.querySelector("#card-pedidos")

  // Limpa o conteúdo atual do container para evitar duplicações
  containerCardsPedidos.innerHTML = ""

  // Itera sobre o array de objetos "produtos", que contém os dados dos produtos
  produtos.forEach((produto) => {
    // Criação do HTML para cada card de produto com os dados do JSON
    containerCardsPedidos.innerHTML += `
      <div class="card">
          <div class="img">
            <img src="${produto.imagem}" alt="Lanche" />
          </div>
          <div class="content">
            <div class="product-name">${produto.titulo}</div>
            <div class="price">
              ${parseFloat(produto.preco).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </div>
            <div style="clear: both"></div>
            <div class="product-desc">
              ${produto.descricao}<br /><br />
            </div>
            <div class="btn">
              <a key="${
                produto.id
              }" href="#" class="link-details-product">Detalhes</a>
            </div>
          </div>
        </div>
    `
  })
}

// Chama a função para buscar os produtos quando a página estiver pronta
document.addEventListener("DOMContentLoaded", fetchProdutos)
