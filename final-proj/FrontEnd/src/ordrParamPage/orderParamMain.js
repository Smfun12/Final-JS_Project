function initializeOrderParamPage() {
    try{
        positionRollbar();
    } catch{}
}

let storage = require('../localStorage');
let api = require('../API');
let orderData = "";

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = yyyy + '-' + mm + '-' + dd;

let payer = "Sender";

function showGif() {
    if (storage.get('destination') === 'mercury') {
        $('#mercury-gif').show();
    } else if (storage.get('destination') === 'venus') {
        $('#venus-gif').show();
    } else if (storage.get('destination') === 'earth') {
        $('#earth-gif').show();
    } else if (storage.get('destination') === 'mars') {
        $('#mars-gif').show();
    } else if (storage.get('destination') === 'jupiter') {
        $('#jupiter-gif').show();
    } else if (storage.get('destination') === 'saturn') {
        $('#saturn-gif').show();
    } else if (storage.get('destination') === 'uranus') {
        $('#uranus-gif').show();
    } else if (storage.get('destination') === 'neptune') {
        $('#neptune-gif').show();
    }
}

$('#input-cost').on('input', function() {
    let val = $(this).val();
    if (!parseEvaluatedCost(val)) {
        $('#cost-success').hide();
        $('#cost-failure').show();
        $('#final-order').prop('disabled', true);
    } else {
        $('#cost-success').show();
        $('#cost-failure').hide();
        $('#final-order').prop('disabled', false);
    }
})

function parseEvaluatedCost(input) {
    let numVal;
    try {
        numVal = Number.parseInt(input);
        if(numVal > 0 && numVal < 200000) return true;
        return false;
    } catch (err) {
        return false;
    }
}

$('#receiver-radio').on('click', function () {
    $(this).prop('checked', true);
    $('#sender-radio').prop('checked', false);

    payer = "Receiver";
})

$('#sender-radio').on('click', function () {
    $(this).prop('checked', true);
    $('#receiver-radio').prop('checked', false);
    payer = "Sender";
})

$('#final-order').click(function () {
    let data = {
        name: storage.get("name"),
        surname: storage.get("surname"),
        phone: storage.get("country-code") + storage.get("phone"),
        destination: storage.get("destination"),
        weight: $('#weight-val').text(),
        description: $('#text-desc').val(),
        date: today,
        cost: $('#input-cost').val() * 10 + Number.parseInt($('#weight-val').text()) * 5 + 500,
        status: "sent",
        payer: payer,
        paid: "false"
    };

    orderData = data;

    $('#span-name').text("name: " + data.name);
    $('#span-surname').text('surname: ' + data.surname);
    $('#span-phone').text("phone: " + data.phone);
    $('#span-destination').text("destination: " + data.destination);
    $('#span-weight').text("weight: " + data.weight);
    $('#span-description').text("description: " + data.description);
    $('#span-date').text("date: " + data.date);
    $('#span-cost').text("cost: " + data.cost);
    $('#span-status').text("status: " + data.status);
    $('#span-payer').text("payer: " + data.payer);
});

let ismousedown;
jQuery.fn.draggit = function (el, doSmth) {
    var thisdiv = this;
    var thistarget = $(el);
    var relX;
    var targetw = thistarget.width();

    thistarget.css('position','absolute');


    thisdiv.bind('mousedown', function(e){
        var pos = $(el).offset();
        var srcX = pos.left;

        relX = e.pageX - srcX;

        ismousedown = true;
    });

    $(document).bind('mousemove',function(e){
        if(ismousedown)
        {
            targetw = thistarget.width();

            let start = $('#slide').css('left');
            start = start.slice(0, start.length - 2);
            start = Number.parseInt(start);
            let minX = start - 10;
            let maxX = minX + 200;

            var mouseX = e.pageX;

            var diffX = mouseX - relX;

            // check if we are beyond document bounds ...
            if(diffX < minX)   diffX = minX;
            if(diffX > maxX) diffX = maxX;

            $(el).css('left', (diffX)+'px');
            doSmth(diffX);
        }
    });

    $(window).bind('mouseup', function(e){
        ismousedown = false;
    });

    return this;
} // end jQuery draggit function //

function changeWeightLabel(coordX) {
    let start = $('#slide').css('left');
    start = start.slice(0, start.length - 2);
    start = Number.parseInt(start);
    let w = Number.parseInt((coordX + 10 - start) / 2);
    $('#weight-val').text(w);
}

$('#wrap-drag').draggit('#to-drag', changeWeightLabel);

$('#slide').on('click', function (e) {
    $('#to-drag').css('left', (e.pageX)+'px');
    changeWeightLabel(e.pageX);
})

$(window).on('resize', function () {
    try {
        positionRollbar();
    }
    catch (err){}
})

function positionRollbar() {
    let left = $('.container').css('margin-left');
    left = left.slice(0, left.length - 2);
    left = Number.parseInt(left);
    left += 50;
    let w = Number.parseInt($('#weight-val').text());
    $('#slide').css('left', left + 'px');
    $('#zero').css('left', left - 30 + 'px');
    $('#hundred').css('left', left + 220 + 'px');
    $('#to-drag').css('left', left - 10 + 2*w + 'px');
}

$('#btn-order').click(function () {
    let delivery = orderData;
    let user = JSON.parse(sessionStorage.getItem('user'));

    let data = {
        delivery: delivery,
        user: user
    }

    api.createDelivery(data, function (err, data) {
        if (err) {
            console.log("Error at API.createDelivery");
        }
    });

    window.location.href = 'http://localhost:3989/';

});

exports.initializeOrderParamPage = initializeOrderParamPage;
exports.showGif = showGif;