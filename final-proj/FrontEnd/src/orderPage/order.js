let nameCorrect = false;
let surnameCorrect = false;
let countryCodeCorrect = false;
let phoneCorrect = false;

document.getElementById('input-name').addEventListener('input', function () {
    let correct = true;
    let name = this.value;
    if (name.length === 0) {
        correct = false
    } else for (let j = 0; j < name.length; j++) {
        let cur = name.charAt(j);
        if ((cur < 'A' || cur > 'Z') && (cur < 'a' || cur > 'z') && cur !== "'" && cur !== '-') {
            correct = false;
        }
    }
    if (correct) {
        $('#name-success').show();
        $('#name-failure').hide();
        nameCorrect = true;
        if (nameCorrect && surnameCorrect && countryCodeCorrect && phoneCorrect) {
            $('#btn-next').prop('disabled', false);
        }
    } else {
        $('#name-success').hide();
        $('#name-failure').show();
        nameCorrect = false;
        $('#btn-next').prop('disabled', true);
    }
});

document.getElementById('input-surname').addEventListener('input', function () {
    let correct = true;
    let surname = this.value;
    if (surname.length === 0) {
        correct = false
    } else for (let j = 0; j < surname.length; j++) {
        let cur = surname.charAt(j);
        if ((cur < 'A' || cur > 'Z') && (cur < 'a' || cur > 'z') && cur !== "'" && cur !== '-') {
            correct = false;
        }
    }
    if (correct) {
        $('#surname-success').show();
        $('#surname-failure').hide();
        surnameCorrect = true;
        if (nameCorrect && surnameCorrect && countryCodeCorrect && phoneCorrect) {
            $('#btn-next').prop('disabled', false);
        }
    } else {
        $('#surname-success').hide();
        $('#surname-failure').show();
        surnameCorrect = false;
        $('#btn-next').prop('disabled', true);
    }
});

document.getElementById('input-country-code').addEventListener('input', function () {
    let correct = true;
    let countryCode = this.value;
    if (countryCode.length < 2 || countryCode.length > 4 || countryCode.charAt(0) !== '+') {
        correct = false
    } else for (let j = 1; j < countryCode.length; j++) {
        let cur = countryCode.charAt(j);
        if (cur < '0' || cur > '9') {
            correct = false;
        }
    }
    if (correct) {
        $('#country-code-success').show();
        $('#country-code-failure').hide();
        countryCodeCorrect = true;
        if (nameCorrect && surnameCorrect && countryCodeCorrect && phoneCorrect) {
            $('#btn-next').prop('disabled', false);
        }
    } else {
        $('#country-code-success').hide();
        $('#country-code-failure').show();
        countryCodeCorrect = false;
        $('#btn-next').prop('disabled', true);
    }
});

document.getElementById('input-phone').addEventListener('input', function () {
    let correct = true;
    let phone = this.value;
    if (phone.length === 0) {
        correct = false
    } else for (let j = 0; j < phone.length; j++) {
        let cur = phone.charAt(j);
        if (cur < '0' || cur > '9') {
            correct = false;
        }
    }
    if (correct) {
        $('#phone-success').show();
        $('#phone-failure').hide();
        phoneCorrect = true;
        if (nameCorrect && surnameCorrect && countryCodeCorrect && phoneCorrect) {
            $('#btn-next').prop('disabled', false);
        }
    } else {
        $('#phone-success').hide();
        $('#phone-failure').show();
        phoneCorrect = false;
        $('#btn-next').prop('disabled', true);
    }
});