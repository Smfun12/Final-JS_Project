let user = JSON.parse(sessionStorage.getItem('user'));
if (user) {
    $('#profileEmail').text(user.email);
    $('#full_name').text(user.firstname + ' ' + user.lastname);
}
$("#sign_out").on('click', function () {
    sessionStorage.removeItem('user');
    window.location.href='http://localhost:3989';
});
