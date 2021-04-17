(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
$(function () {
    let homePage = require('./mainPage/home');
    let signUpPage = require('./signUp/forSignUp');
    let orderPage = require('./orderPage/order');
});
},{"./mainPage/home":2,"./orderPage/order":3,"./signUp/forSignUp":4}],2:[function(require,module,exports){

},{}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
let firstname;
let lastname;
let address;
let code;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
    //max & min inclusive
}

function sendMail(name, surname, email) {
    const code = getRandomInt(0, 9999);
    Email.send({
        Host: "smtp.gmail.com",
        Username: "universal.delivery.noreply@gmail.com",
        Password: "lvirrisaeyudvnlee",
        To: email,
        From: "universal.delivery.noreply@gmail.com",
        Subject: "Verification Letter",
        Body: "Dear " + name + " " + surname + ",\r\n"
                + "You are registering at our website.\r\n"
                + "To confirm your email addres, please enter the following code:\r\n"
                + code,
    })
        .then(function (message) {
            //alert("mail sent successfully")
        });
    return code;
}

$('#sign-up-btn').on('click', function () {
    $('#format-request').hide();
    $('#learn-name').show();
    $('#move-signup').show();
});

$('#move-signup').on('click', function () {
    if ($('#learn-name').css('display') != 'none') {
        let name = $('#input-name').val();
        name = trim(name);
        if(!parseName(name)) {
            $('#invalid-name').show();
        } else {
            $('#learn-name').hide();
            $('#learn-surname').show();
            firstname = name;
        }
        return;
    } else if ($('#learn-surname').css('display') != 'none') {
        let surname = $('#input-surname').val();
        surname = trim(surname);
        if(!parseName(surname)) {
            $('#invalid-surname').show();
        } else {
            $('#learn-surname').hide();
            $('#learn-email').show();
            lastname = surname;
        }
        return;
    } else if ($('#learn-email').css('display') != 'none') {
        let email = $('#input-email').val();
        email = trim(email);
        if(!parseEmail(email)) {
            $('#invalid-email').show();
        } else {
            $('#learn-email').hide();
            $('#validate-email').show();
            address = email;
            code = sendMail(firstname, lastname, address);
        }
        return;
    } else if ($('#validate-email').css('display') != 'none') {
        let number = Number.parseInt($('#input-code').val());
        if(number !== code) {
            $('#invalid-code').show();
        } else {
            $('#validate-email').hide();
            //$('#validate-email').show();
        }
        return;
    }
});

function parseName(name) {
    if(!name) return false;
    for(let i = 0; i < name.length; i++) {
        if (name[i] >= 'a' && name[i] <= 'z') continue;
        if (name[i] >= 'A' && name[i] <= 'Z') continue;
        if (name[i] === '-' || name[i] === '`' || name[i] === '\'') continue;
        return false;
    }
    return true;
}

function trim(str) {
    if(!str) return str;
    while (str && str[0] === ' ') str = str.substring(1);
    while (str && str[str.length - 1] === ' ') str = str.substring(0, str.length - 1);
    return str;
}

function parseEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
},{}]},{},[1]);