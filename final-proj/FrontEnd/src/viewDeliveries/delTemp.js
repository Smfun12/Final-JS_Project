const fs = require('fs');
const ejs = require('ejs');

exports.deliveryItem = ejs.compile(fs.readFileSync('./Frontend/Templates/deliveryArchived.ejs', "utf8"));