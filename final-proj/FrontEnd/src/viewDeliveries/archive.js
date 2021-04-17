let viewOptions = false;
let curSort = "status";

$('#slideup-for-sort').on('click', function () {
    //console.log("clicked>>>");
    if (!viewOptions) {
        let height = $('#slideup-for-sort').height();
        $('#slideup-for-sort').css("bottom", 8*height);
        $('.sort-item').css('visibility', 'visible');
        $('#date').css("bottom", 2*height);
        $('#dest').css("bottom", 4*height);
        $('#status').css("bottom", 6*height);
        viewOptions = true;
    } else {
        $('#slideup-for-sort').css("bottom", "0");
        $('#date').css("bottom", "0");
        $('#dest').css("bottom", "0");
        $('#status').css("bottom", "0");
        setTimeout(function() {
            $('.sort-item').css('visibility', 'hidden');
        }, 500);
        viewOptions = false;
    }
});

$('#date').on('click', function() {
    if(curSort === "date") return;
    curSort = "date";
    $('#dest-arrow-down').css('visibility', 'hidden');
    $('#dest-arrow-up').css('visibility', 'hidden');
    $('#cost-arrow-down').css('visibility', 'hidden');
    $('#cost-arrow-up').css('visibility', 'hidden');
    $('#status-arrow-down').css('visibility', 'hidden');
    $('#status-arrow-up').css('visibility', 'hidden');
    $('#date-arrow-down').css('visibility', 'visible');
    $('#date-arrow-down').css('opacity', '0.5');
    $('#date-arrow-up').css('visibility', 'visible');
    $('#date-arrow-up').css('opacity', '1');
    $('#slideup-for-sort span').text('Delivery Date');
    $('#main-arrow-down').css('display', 'none');
    $('#main-arrow-up').css('display', 'block');
});

$('#dest').on('click', function() {
    if(curSort === "dest") return;
    curSort = "dest";
    $('#date-arrow-down').css('visibility', 'hidden');
    $('#date-arrow-up').css('visibility', 'hidden');
    $('#cost-arrow-down').css('visibility', 'hidden');
    $('#cost-arrow-up').css('visibility', 'hidden');
    $('#status-arrow-down').css('visibility', 'hidden');
    $('#status-arrow-up').css('visibility', 'hidden');
    $('#dest-arrow-down').css('visibility', 'visible');
    $('#dest-arrow-down').css('opacity', '0.5');
    $('#dest-arrow-up').css('visibility', 'visible');
    $('#dest-arrow-up').css('opacity', '1');
    $('#slideup-for-sort span').text('Destination');
    $('#main-arrow-down').css('display', 'none');
    $('#main-arrow-up').css('display', 'block');
});

$('#cost').on('click', function() {
    if(curSort === "cost") return;
    curSort = "cost";
    $('#date-arrow-down').css('visibility', 'hidden');
    $('#date-arrow-up').css('visibility', 'hidden');
    $('#dest-arrow-down').css('visibility', 'hidden');
    $('#dest-arrow-up').css('visibility', 'hidden');
    $('#status-arrow-down').css('visibility', 'hidden');
    $('#status-arrow-up').css('visibility', 'hidden');
    $('#cost-arrow-down').css('visibility', 'visible');
    $('#cost-arrow-down').css('opacity', '0.5');
    $('#cost-arrow-up').css('visibility', 'visible');
    $('#cost-arrow-up').css('opacity', '1');
    $('#slideup-for-sort span').text('Delivery Cost');
    $('#main-arrow-down').css('display', 'none');
    $('#main-arrow-up').css('display', 'block');
});

$('#status').on('click', function() {
    if(curSort === "status") return;
    curSort = "status";
    $('#date-arrow-down').css('visibility', 'hidden');
    $('#date-arrow-up').css('visibility', 'hidden');
    $('#cost-arrow-down').css('visibility', 'hidden');
    $('#cost-arrow-up').css('visibility', 'hidden');
    $('#dest-arrow-down').css('visibility', 'hidden');
    $('#dest-arrow-up').css('visibility', 'hidden');
    $('#status-arrow-down').css('visibility', 'visible');
    $('#status-arrow-down').css('opacity', '0.5');
    $('#status-arrow-up').css('visibility', 'visible');
    $('#status-arrow-up').css('opacity', '1');
    $('#slideup-for-sort span').text('Delivery Status');
    $('#main-arrow-down').css('display', 'none');
    $('#main-arrow-up').css('display', 'block');
});

$('#date-arrow-down').on('click', function () {
    template('date', 'down');
});

$('#date-arrow-up').on('click', function () {
    template('date', 'up');
});

$('#status-arrow-down').on('click', function () {
   template('status', 'down');
});

$('#status-arrow-up').on('click', function () {
    template('status', 'up');
});

$('#dest-arrow-down').on('click', function () {
    template('dest', 'down');
});

$('#dest-arrow-up').on('click', function () {
    template('dest', 'up');
});

$('#cost-arrow-down').on('click', function () {
    template('cost', 'down');
});

$('#cost-arrow-up').on('click', function () {
    template('cost', 'up');
});

function template(sortBy, dir) {
    if (dir !== 'up' && dir != 'down') return;
    let clicked = '#' + sortBy + '-arrow-down';
    let opposite = '#' + sortBy + '-arrow-up';
    if(dir === 'up') {
        let temp = clicked;
        clicked = opposite;
        opposite = temp;
    }
    if($(clicked).css('opacity') === '1') {
        return;
    }
    $(clicked).css('opacity', '1');
    $(opposite).css('opacity', '0.5');
    if (dir === 'up') {
        $('#main-arrow-up').css('display', 'block');
        $('#main-arrow-down').css('display', 'none');
    } else {
        $('#main-arrow-down').css('display', 'block');
        $('#main-arrow-up').css('display', 'none');
    }
}