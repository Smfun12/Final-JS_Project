(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

/**
 * Created by chaika on 09.02.16.
 */
var API_URL = "http://localhost:3989";

function backendGet(url, callback) {
    $.ajax({
        url: API_URL + url,
        type: 'GET',
        success: function(data){
            callback(null, data);
        },
        error: function() {
            callback(new Error("Ajax Failed"));
        }
    })
}

function backendPost(url, data, callback) {
    $.ajax({
        url: API_URL + url,
        type: 'POST',
        contentType : 'application/json',
        data: JSON.stringify(data),
        success: function(data){
            callback(null, data);
        },
        error: function() {
            callback(new Error("Ajax Failed"));
        }
    })
}

exports.homePage =  function (callback) {
    backendGet('/',callback);
}

exports.checkUserInSystem = function (user_data, callback) {
    backendPost("/", user_data, callback);
}
exports.createUser = function (user, call_back) {
    backendPost("/login.html", user, call_back);
}

},{}],2:[function(require,module,exports){
let API =require('../API');

function parseEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
function parsePwd(password){
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;//Minimum eight characters, at least one letter and one number
    return re.test(password);
}
function temp(error, data){
    if (!error){
        console.log(data);
        window.location.href="http://localhost:3989";
    }
}
function sendToBack(error, data) {
    if (!error){
        let user = data;
        console.log("Data from bacK: " + user.email);
        console.log(user);
        if (user.email){
            console.log('200 OK');
            sessionStorage.setItem('user',JSON.stringify(user));
            console.log(sessionStorage.getItem('user'));
            API.homePage(temp);
        }
        else{
            console.log('user does not exist');
            $('#notFound').css({'height':'100px','opacity':'1'});
        }
    }
    else{
        console.log('error');
    }
}

$('#sendUserData').on('click', function () {
    let email = $('#email').val();
    let password = $('#password').val();
    if (!parseEmail(email) || !parsePwd(password)) {
        $('#error').css({'height':'100px','opacity':'1'});
        $('#notFound').css({'height':'100px','opacity':'0'});
        return;
    }
    else{
        $('#error').css({'height':'0','opacity':'0'});
    }
    let user_data = {
        email: email,
        password: password
    }
    console.log(user_data);
    API.checkUserInSystem(user_data, sendToBack);
});
},{"../API":1}],3:[function(require,module,exports){
$(function () {
    let homePage = require('./mainPage/home');
    let signUpPage = require('./signUp/forSignUp');
    let archivePage = require('./viewDeliveries/archive');
    let loginPage = require('./login/login');
    let profilePage = require('./profile/profile');
    let orderPage = require('./orderPage/order');
});
},{"./login/login":2,"./mainPage/home":4,"./orderPage/order":5,"./profile/profile":6,"./signUp/forSignUp":7,"./viewDeliveries/archive":8}],4:[function(require,module,exports){

},{}],5:[function(require,module,exports){
let nameCorrect = false;
let surnameCorrect = false;
let countryCodeCorrect = false;
let phoneCorrect = false;

$('#input-name').on('input', function () {
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

$('#input-surname').on('input', function () {
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

$('#input-country-code').on('input', function () {
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

$('#input-phone').on('input', function () {
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
},{}],6:[function(require,module,exports){
let user = JSON.parse(sessionStorage.getItem('user'));
if (user) {
    $('#profileEmail').text(user.email);
    $('#full_name').text(user.name);
}
$("#sign_out").on('click', function () {
    sessionStorage.removeItem('user');
    window.location.href='http://localhost:3989';
});

},{}],7:[function(require,module,exports){
let firstname;
let lastname;
let address;
let code;

let API = require('../API');

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
let user = {

};
$('#move-signup').on('click', function () {
    if ($('#learn-name').css('display') !== 'none') {
        let name = $('#input-name').val();
        name = trim(name);
        if(!parseName(name)) {
            $('#invalid-name').show();
        } else {
            $('#learn-name').hide();
            $('#learn-surname').show();
            firstname = name;
            user.firstname = firstname;
        }

    } else if ($('#learn-surname').css('display') !== 'none') {
        let surname = $('#input-surname').val();
        surname = trim(surname);
        if(!parseName(surname)) {
            $('#invalid-surname').show();
        } else {
            $('#learn-surname').hide();
            $('#learn-email').show();
            lastname = surname;
            user.lastname = lastname;
        }

    } else if ($('#learn-email').css('display') !== 'none') {
        let email = $('#input-email').val();
        email = trim(email);
        if(!parseEmail(email)) {
            $('#invalid-email').show();
        } else {
            $('#learn-email').hide();
            $('#validate-email').show();
            address = email;
            code = sendMail(firstname, lastname, address);
            user.email = email;
        }

    } else if ($('#validate-email').css('display') !== 'none') {
        let number = Number.parseInt($('#input-code').val());
        if(number !== code) {
            $('#invalid-code').show();
        } else {
            $('#validate-email').hide();
            $('#learn-password').show();
        }

    } else if ($('#learn-password').css('display') !== 'none') {
        let password = $('#input-password').val();
        password = trim(password);
        console.log(password);
        if(!parsePwd(password)) {
            $('#invalid-password').show();
        } else {
            $('#learn-password').hide();
            user.password = password;
            API.createUser(user, sendToBack);
        }

    }
});

$('#profile').on('click', function () {
    console.log(sessionStorage.getItem('user'));
    if (sessionStorage.getItem('user') === null) {
        window.location.href = 'http://localhost:3989/signup.html';
    }
    else{
        window.location.href = 'http://localhost:3989/profile.html';
    }
});

function sendToBack(error, data){
    if (!error){
        console.log(data);
        window.location.href='http://localhost:3989/signup.html';
    }
    else{
        console.log('error');
    }
}
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
function parsePwd(password){
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;//Minimum eight characters, at least one letter and one number
    return re.test(password);
}

},{"../API":1}],8:[function(require,module,exports){
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
},{}]},{},[3]);
