let carts = document.querySelectorAll('.add-cart');

let products = [];

async function getProducts() {
    const response = await axios.get('https://countrysidegrocery-uvhjb.ondigitalocean.app/products');
    console.log(response.data);
    products = response.data.products

    poplateProducts()
}
getProducts();

function poplateProducts() {
    const works = document.querySelector('.works');

    const productsHtml = products.map((product, i) => {
        return (
            `
            <div class="product1">
            <img  class="products1" src="${product.image}" alt="${product.name}">
            <h1>${product.name}</h1>
            <p>$${product.price}</p>
            <button class="btn1"><a class="add-cart cart${i+1}" href="#">加入購物車</a></button>
            <button class="btn2"><a href="">產品詳情</a></button>
        </div>
            `
        )

    })

    if(works){
        works.innerHTML += productsHtml.toString().replaceAll(',', '');
    addCartActions()
    }
}

function addCartActions() {
    const hoverProducts = document.getElementsByClassName('product1');
    let carts = document.querySelectorAll('.add-cart');

    for(let i=0; i < hoverProducts.length; i++) {
        hoverProducts[i].addEventListener('mouseover', () => {
            carts[i].classList.add('showAddCart');
        })

        hoverProducts[i].addEventListener('mouseout', () => {
            carts[i].classList.remove('showAddCart');

        })
    }


    for (let i=0; i < carts.length; i++){
        carts[i].addEventListener('click', () => {
            cartNumbers(products[i]);
            totalCost(products[i]);
        })
    }
}

// let products =[
//     {
//         name: '4505豬皮海鹽味70g',
//         tag:'4505豬皮海鹽味70g',
//         price:68,
//         inCart:0
//     },
//     {
//         name: '4505豬皮原味70g',
//         tag:'4505豬皮原味70g',
//         price:68,
//         inCart:0
//     },
//     {
//         name: '4505豬皮辣味70g',
//         tag:'4505豬皮辣味70g',
//         price:68,
//         inCart:0
//     },
//     {
//         name: 'Cubbisons芝士脆片',
//         tag:'cubbisons芝士脆片',
//         price:138,
//         inCart:0
//     },
//     {
//         name: 'Oven-Baked芝士脆片',
//         tag:'oven-baked芝士脆片',
//         price:138,
//         inCart:0
//     },
//     {
//         name: 'Fresh Gourmet Keto芝士脆片',
//         tag:'freshgourmetketo芝士脆片',
//         price:138,
//         inCart:0
//     },
// ]

for (let i=0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}






function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers){
        document.querySelector('.navbar-menu span').textContent = productNumbers;
    }    
}


function cartNumbers(product, action){
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);


    if( action == "decrease") {
        localStorage.setItem('cartNumbers', productNumbers - 1);
        document.querySelector('.cart1 span').textContent = productNumbers - 1;
    } else if( productNumbers ) {
        localStorage.setItem("cartNumbers", productNumbers + 1 );
        document.querySelector('.cart1 span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart1 span').textContent = 1;
    }



    setItems(product);
}

function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems)

    if(cartItems !=null){
        if(cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else{
    product.inCart = 1;

    cartItems={
        [product.tag]: product
    }
}

    localStorage.setItem("productsInCart", JSON.stringify (cartItems));
    
}

function totalCost(product, action){

    let cartCost = localStorage.getItem('totalCost');
    console.log("My cartCost is", cartCost);
    console.log(typeof cartCost);
    if ( action == "decrease") {
        cartCost = parseInt(cartCost);

        localStorage.setItem('totalCost', cartCost - product.price);
    } else if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }


}





function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');



    //console.log(cartItems);
    if( cartItems && productContainer ){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
                <ion-icon name="close-circle"></ion-icon>
                <img src="/images/${item.tag}.jpg">
                <span>${item.name}</span>
                </div>
                <div class="price">$${item.price}</div>
                <div class="quantity">
                    <ion-icon class="decrease" name="arrow-dropleft-circle"></ion-icon>
                    <span>${item.inCart}</span>
                    <ion-icon class="increase" name="arrow-dropright-circle"></ion-icon>
                </div>

                <div class="total">
                    $${item.inCart * item.price}
                </div>
                `;
        });



        productContainer.innerHTML +=`
        <div class"basketTotalContainer">
        </br>
        </br>
        </br>
            <h4 class="basketTotalTitle">
                總共
            </h4>
            <h4 class"basketTotal">
                $${cartCost}
            </h4>
            </div>
        `;


        deleteButtons();
        manageQuantity();

    }




}


function displayCheckout(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".checkout");
    let cartCost = localStorage.getItem('totalCost');



    //console.log(cartItems);
    if( cartItems && productContainer ){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {


            productContainer.innerHTML += `
            <div class="checkout-information">
            <div class="product-1">
                <img src="/images/${item.tag}.jpg">
                <span>${item.name}</span>
                </div>
                <div class="price-1">$${item.price}</div>
                <div class="quantity-1">

                    <span>${item.inCart}</span>

                </div>

                <div class="total-1">
                    $${item.inCart * item.price}
                </div>
                </div>
                </form>
                `;
        });


        productContainer.innerHTML +=`
        <div>
        <button  class="btn1" type="submit">結帳 $${cartCost}</button>
        </div>
        `;



        deleteButtons();
        manageQuantity();

    }




}


function deleteButtons() {
    let deleteButtons = document.querySelectorAll('.product ion-icon');
    let productName;
    let productNumbers = localStorage.getItem('cartNumbers');
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let cartCost = localStorage.getItem('totalCost');
    


    for(let i=0; i < deleteButtons.length; i++){
        deleteButtons[i].addEventListener('click', () => {
            productName = deleteButtons[i].parentElement.textContent.trim().toLowerCase().replace(/ /g, '');
            //console.log(productName);
            //console.log(cartItems[productName].name + "" + cartItems[productName].inCart)
            localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart );

            localStorage.setItem('totalCost', cartCost - ( cartItems[productName].price * cartItems[productName].inCart));

            delete cartItems[productName];
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));

            displayCart();
            onLoadCartNumbers();
            
        });
    }

}



function manageQuantity() {
    let decreaseButtons = document.querySelectorAll('.decrease');
    let increaseButtons = document.querySelectorAll('.increase');
    let cartItems = localStorage.getItem('productsInCart');
    let currentQuantity = 0;
    let currentProduct = "";
    cartItems = JSON.parse(cartItems);
    console.log(cartItems);

    for(let i=0; i < decreaseButtons.length; i++) {
        decreaseButtons[i].addEventListener('click', () =>{
            currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLowerCase().replace(/ /g, ''.trim());
            console.log(currentProduct);

            if ( cartItems[currentProduct].inCart > 1 ) {
            cartItems[currentProduct].inCart -= 1;
            cartNumbers( cartItems[currentProduct], "decrease" );
            totalCost( cartItems[currentProduct], "decrease" );
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));

            displayCart();
            }
        });
    }

    for(let i=0; i < increaseButtons.length; i++) {
        increaseButtons[i].addEventListener('click', () =>{
            currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);

            currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLowerCase().replace(/ /g, ''.trim());
            console.log(currentProduct);

            cartItems[currentProduct].inCart += 1;
            cartNumbers( cartItems[currentProduct]);
            totalCost( cartItems[currentProduct]);
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));

            displayCart();
            
        })
    }


}



onLoadCartNumbers();
displayCart();
displayCheckout();
