let products = require('../shop/products');
let $products = $('#products');
const templates = require('../viewDeliveries/delTemp');
const PizzaCart = require('../productCart/Cart');
let productList = []
function initializeProducts() {
    productList = products.getProducts();
    if (products.length === 0) {
        $('#is-paid').css('display', 'block');
    }
    for (let i = 0; i < productList.length; i++) {
        productList[i] = {
            id: productList[i].id,
            description: productList[i].description,
            date: productList[i].date,
            cost: productList[i].cost,
            status: productList[i].status,
            icon: productList[i].icon,
            fullStatus: productList[i].status,
        }
        if(productList[i].status.length > 12) {
            productList[i].status = productList[i].status.substring(0, 9);
            productList[i].status += "...";
        }
    }
    productList.sort(sortByStatusAsc);
    update();
}
function sortByStatusAsc(product1, product2) {
    if (product1.status < product2.status) return -1;
    else if (product1.status === product2.status) return 0;
    else return 1;
}

function sortByStatusDesc(delivery1, delivery2) {
    return -sortByStatusAsc(delivery1, delivery2);
}

function update () {
    $products.html("");
    function showOneProduct(product){
        let html_code =templates.shopIitem({product:product});
        let $node = $(html_code);

        $node.find('.buyProduct').click(function () {
            PizzaCart.addToCart(product);
        });
        $products.append($node);
        }

    productList.forEach(showOneProduct);

}


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
let $modal = $('#myModal');
// When the user clicks on the button, open the modal
$('#basket').click(function () {
   $modal.css('display','block');
   PizzaCart.showProductInCart();
});


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    $modal.css('display','none');
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target === $modal) {
        $modal.css('display','none');
    }
}

exports.initializeProducts = initializeProducts;