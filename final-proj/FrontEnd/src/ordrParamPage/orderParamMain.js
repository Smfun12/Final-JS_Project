function initializeOrderParamPage() {
    try{
        positionRollbar();
    } catch{}
}

$('#input-cost').on('input', function() {
    let val = $(this).val();
    if (!parseEvaluatedCost(val)) {
        $('#cost-success').hide();
        $('#cost-failure').show();
    } else {
        $('#cost-success').show();
        $('#cost-failure').hide();
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
    if (!$(this).checked) {
        $(this).prop('checked', true);
        $('#sender-radio').prop('checked', false);
    }
})

$('#sender-radio').on('click', function () {
    if (!$(this).checked) {
        $(this).prop('checked', true);
        $('#receiver-radio').prop('checked', false);
    }
})

let ismousedown;
jQuery.fn.draggit = function (el, doSmth) {
    var thisdiv = this;
    var thistarget = $(el);
    var relX;
    var targetw = thistarget.width();
    //var docw;

    thistarget.css('position','absolute');


    thisdiv.bind('mousedown', function(e){
        var pos = $(el).offset();
        var srcX = pos.left;

        //docw = $('body').width();

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
            //var maxX = docw - targetw - 10;
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
    $('#slide').css('left', left + 'px');
    $('#zero').css('left', left - 30 + 'px');
    $('#hundred').css('left', left + 220 + 'px');
    $('#to-drag').css('left', left - 10 + 'px');
}

exports.initializeOrderParamPage = initializeOrderParamPage;