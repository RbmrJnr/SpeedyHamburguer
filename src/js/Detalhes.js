// Função para fazer a requisição assíncrona e obter os dados do arquivo JSON
function fetchData() {
  return new Promise((resolve, reject) => {
    const ajax = new XMLHttpRequest()

    ajax.open("GET", "Produtos.json", true)
    ajax.responseType = "json"

    ajax.onreadystatechange = function () {
      if (ajax.readyState === 4) {
        if (ajax.status === 200) {
          resolve(ajax.response)
        } else {
          reject(new Error("Falha ao obter os dados do arquivo JSON."))
        }
      }
    }

    ajax.send()
  })
}

// Função para exibir os detalhes do produto na página
function showProductDetails(produtoID, resposta) {
  const exibirDados = document.getElementById("resultado")

  exibirDados.innerHTML = `
    <div class="title-details">Detalhes do produto</div>
    <div class="container">
      <div class="img">
        <img src="${resposta[produtoID].imagem}" alt="">
      </div>
      <div class="content">
        <div class="product-name">${resposta[produtoID].titulo}</div>
        <div class="product-description">${resposta[produtoID].descricao}</div>
        <div class="price">${parseFloat(
          resposta[produtoID].preco
        ).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</div>
        <div class="qty">
          <label>Quantidade</label>
          <input type="number" id="qtd" value="1" min="1" max="15" maxlength="2" step="1" class="itemQuantity">
        </div>
        <div class="btn">
          <button id="adicionar">Adicionar ao Carrinho</button>
        </div>
      </div>
    </div>
    <div id="error"></div>
  `
}

// Função para adicionar o produto ao carrinho
function addItemToCart(resposta, produtoID) {
  const qtdInput = document.getElementById("qtd")
  const qtd = parseInt(qtdInput.value)

  if (!isNaN(qtd) && qtd >= 1 && qtd <= 15) {
    const id = resposta[produtoID].id
    const name = resposta[produtoID].titulo
    const preco = resposta[produtoID].preco

    const dataObj = { id, name, qtd, preco }

    let items = JSON.parse(sessionStorage.getItem("items")) || []

    items.push(dataObj)
    sessionStorage.setItem("items", JSON.stringify(items))

    // Efeito splash (apenas exemplo)
    const splash = document.querySelector(".splash")
    splash.classList.add("effect")
    setTimeout(() => {
      splash.classList.add("display-none")
    }, 2000)

    // Atualiza a quantidade do carrinho
    // atualizaQtdeCart()
  } else {
    const erro = document.getElementById("error")
    erro.innerHTML = `* A quantidade deve ser um número entre 1 e 15`
  }
}

// Função para inicializar a página e obter os dados do arquivo JSON
function initializePage() {
  fetchData()
    .then((resposta) => {
      const urlParams = new URLSearchParams(location.search)
      const produtoID = urlParams.get("produto")

      if (produtoID !== null && resposta[produtoID]) {
        showProductDetails(produtoID, resposta)

        // Adiciona o evento de clique no botão "Adicionar ao Carrinho"
        document
          .getElementById("adicionar")
          .addEventListener("click", function () {
            addItemToCart(resposta, produtoID)
          })
      } else {
        const exibirDados = document.getElementById("resultado")
        exibirDados.innerHTML = `<div class="title-details">Produto não encontrado.</div>`
      }
    })
    .catch((error) => {
      console.error(error)
      const exibirDados = document.getElementById("resultado")
      exibirDados.innerHTML = `<div class="title-details">Erro ao obter os dados.</div>`
    })
}

// Chamada da função para inicializar a página
initializePage()