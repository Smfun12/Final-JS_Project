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
            //$('#validate-email').show();
            API.createUser(user, sendToBack);
        }

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
