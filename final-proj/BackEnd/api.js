/**
 Get data from server
 */
let array = []
exports.homePage = function (req, res) {
    res.send('Loading home page...');
}
function notExist(user) {
    for (let i = 0; i < array.length; i++){
        console.log(array[i].email, user.email);
        console.log(array[i].email === user.email);
        if (array[i].email === user.email){
            return false;
        }
    }
    return true;
}

exports.checkUserInSystem = function (req, res){
    let user = req.body;
    if (notExist(user)){
        res.send([]);
    }
    else{
        res.send(array);
    }
}
exports.createUser = function (req, res) {
    let user = req.body;
    if (array.includes(user)){
        res.send('user exist');
    }
    else{
        array.push(user);
        res.send(array);
    }
}