stage = 'dev';
const host = stage === 'dev' ? 'http://localhost:5000' : 'https://countrysidegrocery-uvhjb.ondigitalocean.app/';

const startCheckout = document.getElementById('startCheckout');

startCheckout.addEventListener('click', () => {
    console.log("Buy btn clicked");
    startCheckout.textContent = "送出訂單..."
    myProducts()
});

function myProducts() {
    const getProducts = JSON.parse(localStorage.getItem('productsInCart'));

    const products = [];
    console.log(getProducts);
    for( const property in getProducts){
        products.push({
            tag: getProducts[property].tag,
            inCart: getProducts[property].inCart
        })
    }

    return products;
};