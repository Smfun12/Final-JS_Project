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