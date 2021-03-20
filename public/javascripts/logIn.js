$("#btn").click(function(e) {
    e.preventDefault();

    let dataSend = {
        username: $("#username").val(),
        password: $("#password").val()
    }
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/login",
        data: JSON.stringify(dataSend),
        success: function() {
            location.href = '//127.0.0.1:5000/user/profile'
        },
        error: function() {
            $("#password").addClass("bg-red-300");
            $("#username").addClass("bg-red-300");
        }
    });
});