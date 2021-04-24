const templates = require('./delTemp');
const deliveriesList = require('./deliveriesList');
const serverInteract = require('../API');

let viewOptions = false;
let curSort = "status";
let $delList = $("#add-deliveries");
let deliveries;

/*function initializeArchive() {
    deliveries = deliveriesList.getDeliveries();
    if (deliveries.length === 0) {
        $('#is-empty').css('display', 'block');
    }
    for (let i = 0; i < deliveries.length; i++) {
        deliveries[i] = {
            description: deliveries[i].description,
            date: deliveries[i].date,
            cost: deliveries[i].cost,
            status: deliveries[i].status,
            destination: deliveries[i].destination,
            fullStatus: deliveries[i].status,
            fullDestination: deliveries[i].destination
        }
        if(deliveries[i].status.length > 12) {
            deliveries[i].status = deliveries[i].status.substring(0, 9);
            deliveries[i].status += "...";
        }
        if(deliveries[i].destination.length > 14) {
            deliveries[i].destination = deliveries[i].destination.substring(0, 11);
            deliveries[i].destination += "...";
        }
    }
    deliveries.sort(sortByStatusAsc);
    updateArchive();
}*/

function initializeArchive() {
    let user = JSON.parse(sessionStorage.getItem('user'));
    //console.log(user);
    serverInteract.getDeliveries(user, function (err, data) {
        deliveries = [];
        if (err) {
            console.log(err.toString());
            return;
        } else {
            deliveries = data;
        }
        //console.log(deliveries);
        if (deliveries.length === 0) {
            $('#is-empty').css('display', 'block');
        }
        for (let i = 0; i < deliveries.length; i++) {
            deliveries[i] = {
                description: deliveries[i].description ? deliveries[i].description : "No description",
                date: deliveries[i].date ? deliveries[i].date.slice(0, 10) : "No Date",
                cost: deliveries[i].cost,
                status: deliveries[i].status ? deliveries[i].status : "No Status",
                destination: deliveries[i].destination,
                fullStatus: deliveries[i].status ? deliveries[i].status : "No Status",
                fullDestination: deliveries[i].destination
            }
            if(deliveries[i].status.length > 12) {
                deliveries[i].status = deliveries[i].status.substring(0, 9);
                deliveries[i].status += "...";
            }
            if(deliveries[i].destination.length > 14) {
                deliveries[i].destination = deliveries[i].destination.substring(0, 11);
                deliveries[i].destination += "...";
            }
        }
        deliveries.sort(sortByStatusAsc);
        updateArchive();
    });
}

$('.slideup-for-sort').on('click', function () {
    if (!viewOptions) {
        let height = $('.slideup-for-sort').height();
        $('.slideup-for-sort').css("bottom", 8*height);
        $('.sort-item').css('visibility', 'visible');
        $('#date').css("bottom", 2*height);
        $('#dest').css("bottom", 4*height);
        $('#status').css("bottom", 6*height);
        viewOptions = true;
    } else {
        $('.slideup-for-sort').css("bottom", "0");
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
    templateToSortByOtherVal('date');
});

$('#dest').on('click', function() {
    templateToSortByOtherVal('dest');
});

$('#cost').on('click', function() {
    templateToSortByOtherVal('cost');
});

$('#status').on('click', function() {
    templateToSortByOtherVal('status');
});

$('#date-arrow-down').on('click', function () {
    templateForArrowClick('date', 'down');
    deliveries.sort(sortByDateDesc);
    updateArchive();
});

$('#date-arrow-up').on('click', function () {
    templateForArrowClick('date', 'up');
    deliveries.sort(sortByDateAsc);
    updateArchive();
});

$('#status-arrow-down').on('click', function () {
   templateForArrowClick('status', 'down');
    deliveries.sort(sortByStatusDesc);
    updateArchive();
});

$('#status-arrow-up').on('click', function () {
    templateForArrowClick('status', 'up');
    deliveries.sort(sortByStatusAsc);
    updateArchive();
});

$('#dest-arrow-down').on('click', function () {
    templateForArrowClick('dest', 'down');
    deliveries.sort(sortByDestinationDesc);
    updateArchive();
});

$('#dest-arrow-up').on('click', function () {
    templateForArrowClick('dest', 'up');
    deliveries.sort(sortByDestinationAsc);
    updateArchive();
});

$('#cost-arrow-down').on('click', function () {
    templateForArrowClick('cost', 'down');
    deliveries.sort(sortByCostDesc);
    updateArchive();
});

$('#cost-arrow-up').on('click', function () {
    templateForArrowClick('cost', 'up');
    deliveries.sort(sortByCostAsc);
    updateArchive();
});

function templateForArrowClick(sortBy, dir) {
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

function templateToSortByOtherVal(sortBy) {
    if(curSort === sortBy) return;
    curSort = sortBy;
    if (sortBy !== "date") {
        $('#date-arrow-down').css('visibility', 'hidden');
        $('#date-arrow-up').css('visibility', 'hidden');
    } else {
        $('#date-arrow-down').css('visibility', 'visible');
        $('#date-arrow-down').css('opacity', '0.5');
        $('#date-arrow-up').css('visibility', 'visible');
        $('#date-arrow-up').css('opacity', '1');
    }
    if (sortBy !== "cost") {
        $('#cost-arrow-down').css('visibility', 'hidden');
        $('#cost-arrow-up').css('visibility', 'hidden');
    } else {
        $('#cost-arrow-down').css('visibility', 'visible');
        $('#cost-arrow-down').css('opacity', '0.5');
        $('#cost-arrow-up').css('visibility', 'visible');
        $('#cost-arrow-up').css('opacity', '1');
    }
    if (sortBy !== "dest") {
        $('#dest-arrow-down').css('visibility', 'hidden');
        $('#dest-arrow-up').css('visibility', 'hidden');
    } else {
        $('#dest-arrow-down').css('visibility', 'visible');
        $('#dest-arrow-down').css('opacity', '0.5');
        $('#dest-arrow-up').css('visibility', 'visible');
        $('#dest-arrow-up').css('opacity', '1');
    }
    if (sortBy !== "status") {
        $('#status-arrow-down').css('visibility', 'hidden');
        $('#status-arrow-up').css('visibility', 'hidden');
    } else {
        $('#status-arrow-down').css('visibility', 'visible');
        $('#status-arrow-down').css('opacity', '0.5');
        $('#status-arrow-up').css('visibility', 'visible');
        $('#status-arrow-up').css('opacity', '1');
    }
    let text = 'Delivery ';
    if (sortBy === 'date') {
        text += "Date";
        deliveries.sort(sortByDateAsc);
    }
    if (sortBy === 'dest') {
        text += "Destination";
        deliveries.sort(sortByDestinationAsc);
    }
    if (sortBy === 'cost') {
        text += "Cost";
        deliveries.sort(sortByCostAsc);
    }
    if (sortBy === 'status') {
        text += "Status";
        deliveries.sort(sortByStatusAsc);
    }
    $('.slideup-for-sort span').text(text);
    $('#main-arrow-down').css('display', 'none');
    $('#main-arrow-up').css('display', 'block');

    updateArchive();
}

function sortByStatusAsc(delivery1, delivery2) {
    if (delivery1.status < delivery2.status) return -1;
    else if (delivery1.status === delivery2.status) return 0;
    else return 1;
}

function sortByStatusDesc(delivery1, delivery2) {
    return -sortByStatusAsc(delivery1, delivery2);
}

function sortByDestinationAsc(delivery1, delivery2) {
    if (delivery1.destination < delivery2.destination) return -1;
    else if (delivery1.destination === delivery2.destination) return 0;
    else return 1;
}

function sortByDestinationDesc(delivery1, delivery2) {
    return -sortByDestinationAsc(delivery1, delivery2);
}

function sortByDateAsc(delivery1, delivery2) {
    if (delivery1.date < delivery2.date) return -1;
    else if (delivery1.date === delivery2.date) return 0;
    else return 1;
}

function sortByDateDesc(delivery1, delivery2) {
    return -sortByDateAsc(delivery1, delivery2);
}

function sortByCostAsc(delivery1, delivery2) {
    if (delivery1.cost < delivery2.cost) return -1;
    else if (delivery1.cost === delivery2.cost) return 0;
    else return 1;
}

function sortByCostDesc(delivery1, delivery2) {
    return -sortByCostAsc(delivery1, delivery2);
}

function updateArchive () {
    $delList.html("");
    for (let i = 0; i < deliveries.length; i++) {
        let html_code = templates.deliveryItem({
            numId: -(i + 1),
            description: deliveries[i].description,
            date: deliveries[i].date,
            cost: deliveries[i].cost,
            status: deliveries[i].status,
            fullStatus: deliveries[i].fullStatus,
            destination: deliveries[i].destination,
            fullDestination: deliveries[i].fullDestination
        });
        $delList.append($(html_code));
    }

    let n = deliveries.length;
    for (let i = 0; i < n; i++) {
        let id = "#item-" + (i + 1);
        let curDel = $(id);
        curDel.attr('data-toggle', 'modal');
        curDel.attr('data-target', '#delivery-info');
        /*$(id).on('click', function () {
            //console.log("id: ", id);
            let desc = "Payment info" +
                "\r\nDescription: " + deliveries[i].description +
                "\r\nDate: " + deliveries[i].date +
                "\r\nStatus: " + deliveries[i].status + '.';
            let payment_info = {
                amount: deliveries[i].cost,
                description: desc,
            };
            indexToSplice = i;
            server.createPayment(payment_info, postInfo);
        });*/
    }
}

$('[data-toggle="tooltip"]').tooltip();

exports.initializeArchive = initializeArchive;