let templates = require('../viewDeliveries/delTemp');
let storage = require('../localStorage');
let Cart = []
let sum = 0;

function writeProductsInLocalStorage() {
    let array = [];
    for (let i = 0; i < Cart.length;i++){
        array.push(Cart[i]);
    }
    storage.set("productsInCart",JSON.stringify(array));

}

function addToCart(product){
    if (!containsObject(product,Cart)) {
        Cart.push({
            quantity: 1,
            product: product
        });
    }
    else{
        console.log('exist');
    }

    writeProductsInLocalStorage();
    $('#cart-len').text(Cart.length);
    console.log(Cart);
}
function containsObject(obj, list) {
    let i;
    for (i = 0; i < list.length; i++) {
        if (list[i].product.id === obj.id) {
            list[i].quantity++;
            return true;
        }
    }

    return false;
}
let $modalText = $('.modal-body');

function getCart() {
    return Cart;
}

function setCart(newCart){
    Cart = newCart;
}

function calculateSum() {
    sum = 0;
    for (let i = 0; i < Cart.length;i++){
        sum += Cart[i].product.cost * Cart[i].quantity;
    }
    return sum;
}

function showProductInCart() {
    $modalText.html('');

    $("#totalSum").text(calculateSum());
    function showOneProductInCart(product) {
        let html_code =templates.cartItem({product:product});
        let $node = $(html_code);

        $modalText.append($node);
    }
    Cart.forEach(showOneProductInCart);
}
exports.showProductInCart = showProductInCart;
exports.addToCart = addToCart;
exports.getCart = getCart;
exports.setCart = setCart;

