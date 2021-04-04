function CheckLogin() {
    $.ajax({
        type: "GET",
        url: "//127.0.0.1:5000/user/CheckLogin",
        error: function() {
            location.href = '//127.0.0.1:5000/'
        }
    });
}