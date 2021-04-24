$("#save").click(function(e) {
    e.preventDefault();
    const data = {
        username: $("#username").val(),
        password: $('#password').val(),
        name: $("#name").val(),
        email: $("#email").val()
    }
    checkUsername($("#username").val(), (flag) => {
        if (flag && checkVal()) {
            $.ajax({
                type: "POST",
                url: `/user/create`,
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(data),
                success: function() {
                    $("#success").removeClass("hidden");
                    $("#error").addClass("hidden");
                    location.href = "/"
                }
            });
        }
    })
});

function checkPassword(password = "") {
    if (checkRepeatPassword(password, $("#repeat").val())) {
        if (password.search(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/gmi) != -1) {
            return 1
        }

        $("#password").toggleClass("bg-gray-200 bg-red-300");
        $("#alert").html("password is more than 8 characters and include number and a-z");
        $("#error").removeClass("hidden");
    }
}

function checkRepeatPassword(password, repeatPassword) {
    if (password === repeatPassword) {
        return true
    }
    $("#repeat").toggleClass("bg-gray-200 bg-red-300");
    $("#alert").html("repeat password is not correct !!!");
    $("#error").removeClass("hidden");
}

function checkUsername(username, cl) {
    $.ajax({
        type: "GET",
        url: `/user/username/${username}`,
        success: function() {
            cl(false)
            $("#username").toggleClass("bg-gray-200 bg-red-300");
            $("#alert").html("Username not available !!!");
            $("#error").removeClass("hidden");
        },
        error: () => {
            cl(true)
        }
    });
}

function checkVal() {
    if (checkPassword($("#password").val()) && checkEmail($("#email").val()) && checkName($("#name").val())) {
        return true
    }
}

function checkEmail(email = "") {
    if (email.search(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi) + 1) {
        return 1
    }
    $("#email").toggleClass("bg-gray-200 bg-red-300");
    $("#alert").html("Email is not correct !!!");
    $("#error").removeClass("hidden");
}

function checkName(name) {
    if (name && isNaN(+name)) {
        return 1
    }
    $("#name").toggleClass("bg-gray-200 bg-red-300");
    $("#alert").html("Name is not correct !!!");
    $("#error").removeClass("hidden");
}