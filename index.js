var produtos = ""


function loadProducts() {
    fetch('https://fakestoreapi.com/products')
    .then(res=>res.json())
    .then(res => {produtos = res; return res})
    .then(json=>updateScreen(json))
    
}
function updateScreen(cards){
  console.log(produtos)
   var card = document.getElementById("produtos")
   card.innerHTML = "";
    cards.forEach(element => {

        card.innerHTML += `<div class="col-12 col-lg-4 col-md-6">
            <div class="card h-100">
              <img src="${element.image}" width="354" height="354" class="card-img-top" alt="...">
              <div class="card-body bg-body-secondary">
                <ul class="list-group list-group-flush">
                  <li class="list-group-item bg-body-transparent bg-dark-subtle">${element.title}</li>
                  <li class="list-group-item bg-dark-subtle">U$ ${element.price}</li>
                  <li class="list-group-item bg-dark-subtle">${element.rating.rate}⭐</li>
                  <li class="list-group-item bg-dark-subtle">Quantidade restante: ${element.rating.count}</li>
                </ul>
                <div class="card-body bg-body-secondary">
                  <a href="detalhes.html?id=${element.id}" class="card-link" id="details">Ver detalhes</a>
                </div>
              </div>
            </div>
          </div>`
    });
}
window.onload = () => {

loadProducts();
loadCategories();
document.getElementById("botao").addEventListener('click', pesquisa)
}

function loadCategories(category){
  
  var api_resp = ""

  fetch('https://fakestoreapi.com/products/categories')
    .then(res=>res.json())
    .then(json=> place_categories(json))


}

function place_categories(categories){

  var html_categoria = document.getElementById("categorias_adicionar")


  for(var i = 0; i < categories.length; i++){

    var str = `<option value="${i+1}" onClick="filterCategories('${categories[i].replaceAll("'","%")}')">${categories[i]}</option>\n`
    console.log(str)
    html_categoria.innerHTML += str

    
  }
 
  

}

function make_search(){
  var search = document.getElementById("search_input").value;

  produtos_a_aparecer = []
  produtos.forEach(produto =>{
      if(produto.title.toLowerCase().includes(search.toLowerCase()))
        produtos_a_aparecer.push(produto);

  })
  console.log("===========")
  console.log(produtos_a_aparecer)
  updateScreen(produtos_a_aparecer);
  
  
}

function filterCategories(categoria){
  console.log(categoria);
  categoria = categoria.replaceAll("%", "'");
  console.log(`https://fakestoreapi.com/products/category/${categoria}`)
  fetch(`https://fakestoreapi.com/products/category/${categoria}`)
 .then(res=>res.json())
 .then(json=> updateScreen(json))
  
  
  
        
  
  
}

function detalhes(cards){
    

    card.innerHTML = `<div class="col-12 col-lg-8 col-md-6">
    <div class="card h-100">
      <img src="${element.image}" width="600" height="600" class="card-img-top" alt="...">
      <div class="card-body bg-body-secondary">
        <h1> ${element.description} </h1>
      </div>
    </div>
  </div> `

}
