let products = require('../shop/products');
let $products = $('#products');
const templates = require('../viewDeliveries/delTemp');
const ProductCart = require('../productCart/Cart');
let productList = []
let API = require('../API')
function initializeProducts() {
    let products;
    API.getProducts([],function (err, data) {
        products = [];
        if (err) {
            console.log(err.toString());
            return;
        } else {
            products = data;
        }
        // console.log('hello from back',products);
        if (products.length === 0) {
            $('#is-empty').css('display', 'block');
        }
        for (let i = 0; i < products.length; i++) {
            productList.push({
                id: products[i].id,
                description: products[i].description,
                date: products[i].date,
                cost: products[i].cost,
                icon: products[i].icon,
            });
        }
        update();
    });
}

function fromServer(error, data) {
    if (!error){
        LiqPayCheckout.init({
            data:	data.data,
            signature:	data.signature,
            embedTo:	"#liqpay",
            mode:	"popup"	//	embed	||	popup
        }).on("liqpay.callback",	function(data){
            console.log(data.status);
            console.log(data);
        }).on("liqpay.ready",	function(data){
//	ready
        }).on("liqpay.close",	function(data){
//	close
        });
    }
}

$('#buyProducts').click(function (){
    console.log('hello');
    let sum = $("#totalSum").text();
    let order = {
        amount: sum,
        description: "Cool math stuff"
    };
    API.createPayment(order, fromServer);
});

function update () {
    $products.html("");
    function showOneProduct(product){
        let html_code =templates.shopIitem({product:product});
        let $node = $(html_code);

        $node.find('.buyProduct').click(function () {
            ProductCart.addToCart(product);
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
   ProductCart.showProductInCart();
});


// When the user clicks on <span> (x), close the modal
if (span) {
    span.onclick = function () {
        $modal.css('display', 'none');
    }
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target === $modal) {
        $modal.css('display','none');
    }
}

exports.initializeProducts = initializeProducts;