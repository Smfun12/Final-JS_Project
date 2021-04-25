let $products = $('#products');
let storage = require('../localStorage');
const templates = require('../viewDeliveries/delTemp');
const ProductCart = require('../productCart/Cart');
let productList = []
let API = require('../API')
function initializeProducts() {
    let products;
    let json_data = storage.get('productsInCart');
    if (json_data){
        let array = JSON.parse(json_data);
        ProductCart.setCart(array)
        $("#cart-len").text(array.length);
    }
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

$('#buyProducts').click(function (){
    if (ProductCart.getCart().length===0){
        console.log(ProductCart.getCart());
        alert("Cart is empty");
        return;
    }
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    console.log('hello');
    let sum = $("#totalSum").text();
    let delivery = {
        name: storage.get("name"),
        surname: storage.get("surname"),
        phone: storage.get("country-code") + storage.get("phone"),
        destination: storage.get("destination"),
        date: today,
        cost: sum,
        status: "sent",
        description: "Cool math stuff",
        paid: "false",
        payer: "Sender"
    };
    let user = JSON.parse(sessionStorage.getItem('user'));
    let data = {
        delivery: delivery,
        user: user
    }
    API.createDelivery(data, function (error, data) {
        if (error){
            console.log("Wrong in creating delivery from shop products");
        }
    });
    $('#myModal').css("display","none");
});

function update () {
    $products.html("");
    function showOneProduct(product){
        let html_code =templates.shopIitem({product:product});
        let $node = $(html_code);

        $node.find('.addProductToCart').click(function () {
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