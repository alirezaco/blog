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
            $("#success").removeClass("hidden");
            $("#error").addClass("hidden");
            setTimeout(function() {
                location.href = '//127.0.0.1:5000/user/profile'
            }, 1000);
        },
        error: function() {
            $("#password").addClass("bg-red-300");
            $("#username").addClass("bg-red-300");
            $("#alert").html("Password or Username is incorrect !!!");
            $("#error").removeClass("hidden");
        }
    });
});