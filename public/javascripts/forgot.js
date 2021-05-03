$('#send').click(function(e) {
    e.preventDefault();

    const data = {
        username: $("#username").val()
    }

    $.ajax({
        type: "POST",
        url: "/forgot",
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        success: function() {
            $("#alert-success").html('A number was sended to your email');
            $("#success").removeClass("hidden");
            $("#error").addClass("hidden");
        },
        error: function(err) {
            $("#alert").html(err.responseText);
            $("#success").addClass("hidden");
            $("#error").removeClass("hidden");
        }
    });
});

$('#btn').click(function(e) {
    e.preventDefault();

    const data = {
        number: $('#Number').val()
    }

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/forgot/check",
        data: JSON.stringify(data),
        success: function() {
            $("#alert-success").html('successfully!');
            $("#success").removeClass("hidden");
            $("#error").addClass("hidden");
            location.href = '/forgot/newPass'
        },
        error: function(err) {
            $("#alert").html(err.responseText);
            $("#success").addClass("hidden");
            $("#error").removeClass("hidden");
        }
    });
});

$("#change").click(function(e) {
    e.preventDefault();

    const data = {
        password: $("#newPass").val(),
    }

    if (data.password !== $("#rPassword").val()) {
        $("#alert").html('new password not equal repeating password!');
        $("#success").addClass("hidden");
        $("#error").removeClass("hidden");
    }

    if (!(data.password.search(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/gmi) + 1)) {
        $("#alert").html('new password not equal repeating password!');
        $("#success").addClass("hidden");
        $("#error").removeClass("hidden");
    }


    $.ajax({
        type: "PUT",
        contentType: "application/json; charset=utf-8",
        url: "/forgot",
        data: JSON.stringify(data),
        success: function() {
            $("#success").removeClass("hidden");
            $("#error").addClass("hidden");
            location.href = '/'
        },
        error: function(err) {
            $("#alert").html(err.responseText);
            $("#success").addClass("hidden");
            $("#error").removeClass("hidden");
        }
    });
});