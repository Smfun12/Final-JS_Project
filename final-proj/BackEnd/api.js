/**
 Get data from server
 */
const mysql = require("mysql");
const bcrypt = require('bcrypt');

let array = []
const sql = "INSERT INTO users(name, email, password) VALUES(?, ?, ?)";
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "js-project",
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