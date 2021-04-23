/**
 Get data from server
 */
const crypto = require('crypto');
const mysql = require("mysql");
const bcrypt = require('bcrypt');

let array = []
const sql = "INSERT INTO users(name, email, password) VALUES(?, ?, ?)";
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "js_project",
    password: "root",
    timezone: "local"
});

connection.connect(function (err) {
    if (err) {
        return console.error("Ошибка: " + err.message);
    } else {
        console.log("Подключение к серверу MySQL успешно установлено");
    }
});
exports.homePage = function (req, res) {
    res.send('Loading home page...');
}

exports.checkUserInSystem = function (req, res) {
    let user = req.body;
    let exist = false;
    connection.query("SELECT * FROM users",
        function (err, results, fields) {
            console.log(err);
            console.log(results);// собственно данные
            if (results.length === 0){
                console.log('Db is empty');
                res.send([]);
                return;
            }
            console.log(results[0].password);
            console.log(user.password);
            if (results[0].email === user.email && bcrypt.compareSync(user.password, results[0].password)){
                console.log('Match');
                exist = true;
                user.name = results[0].name;
                res.send(user);
            }
            else {
                console.log('Does not Match');
                res.send([]);
            }
        });

}
exports.createUser = function (req, res) {
    let user = req.body;
    let hash = bcrypt.hashSync(user.password, 10);
    console.log(user.password);
    console.log(hash);
    let db_user = [user.firstname, user.email, hash];
    if (array.includes(user)) {
        res.send('user exist');
    } else {
        connection.query(sql, db_user, function(err, results) {
            if(err) console.log(err);
            else console.log("Данные добавлены");
        });
        array.push(user);
        res.send(array);
    }
}

exports.getDeliveries = function (req, res) {
    //console.log("Get deliveries!!!");
    let user = req.body;
    connection.query("SELECT * FROM users",
        function (err, results, fields) {
            console.log(err);
            console.log(results);// собственно данные
            let id = findUserByPwd(user, results);
            if (id === -1) {
                console.log('Error: no such user');
                return;
            }
            //console.log('id: ', id);
            let query = "select * from deliveries where user_id = " + id;
            connection.query(query,
                function (err, in_res){
                    let deliveries = [];
                    for (let j = 0; j < in_res.length; j++) {
                        deliveries.push({
                            name: in_res[j].name,
                            surname: in_res[j].surname,
                            phone: in_res[j].phone,
                            destination: in_res[j].destination,
                            description: in_res[j].description,
                            date: in_res[j].date,
                            cost: in_res[j].cost,
                            status: in_res[j].status,
                            payer: in_res[j].payer,
                            paid: in_res[j].paid
                        });
                    }
                    console.log('deliveries: ', deliveries);
                    res.send(deliveries);
                });
        });
}

exports.createDelivery = function(req, res) {
    let data = req.body;
    let user = data.user;
    let delivery = data.delivery;

    connection.query('select * from users',
        function (err, users) {
            if(err) {
                console.log(err.toString());
                return;
            }
            let id = findUserByPwd(user, users);
            if (id === -1) {
                console.log("user not found");
                return;
            }
            let query = "INSERT INTO `js_project`.`deliveries`\n" +
                "(\n" +
                "`user_id`,\n" +
                "`name`,\n" +
                "`surname`,\n" +
                "`phone`,\n" +
                "`destination`,\n" +
                "`description`,\n" +
                "`date`,\n" +
                "`cost`,\n" +
                "`status`,\n" +
                "`payer`,\n" +
                "`paid`)\n" +
                "VALUES\n" +
                "(\n" +
                id + ",\n" +
                (delivery.name ? "'" + delivery.name + "'" : "null") + ",\n" +
                (delivery.surname ? "'" + delivery.surname + "'" : "null") + ",\n" +
                (delivery.phone ? "'" + delivery.phone + "'" : "null") + ",\n" +
                "'" + delivery.destination + "'" + ",\n" +
                (delivery.description ? "'" + delivery.description + "'" : "null") + ",\n" +
                (delivery.date ? "'" + delivery.date + "'" : "null") + ",\n" +
                delivery.cost + ",\n" +
                (delivery.status ? "'" + delivery.status + "'" : "null") + ",\n" +
                "'" + delivery.payer + "'" + ",\n" +
                "'" + delivery.paid + "'" + ");";
            connection.query(query, function (err, res) {
                if (err) {
                    console.log(err.toString());
                } else {
                    console.log("Delivery added successfully");
                }
            })
        });
}

function findUserByPwd(user, users) {
    let id = -1;
    for(let i = 0; i < users.length; i++) {
        if (bcrypt.compareSync(user.password, users[i].password)) {
            id = users[i].id;
            break
        }
    }
    return id;
}

exports.createPayment = function(req, res) {
    var payment_info = req.body;

    var payment = {
        version: 3,
        public_key: 'sandbox_i36114102730',
        action: "pay",
        amount: payment_info.amount,
        currency: "UAH",
        description: payment_info.description,
        order_id: Math.random(),
        //!!!Важливо щоб було 1, бо інакше візьме гроші!!!
        sandbox: 1
    };
    var data = base64(JSON.stringify(payment));
    var signature = sha1('sandbox_WwsOjjQLPLAUNUMZeUwpzArLqcctuviHNFbx3hx3' + data + 'sandbox_WwsOjjQLPLAUNUMZeUwpzArLqcctuviHNFbx3hx3');

    res.send({
        data: data,
        signature: signature,
        success: true
    });
};

function base64(str) {
    return new Buffer(str).toString('base64');
}

function sha1(string) {
    var sha1 = crypto.createHash('sha1');
    sha1.update(string);
    return sha1.digest('base64');
}