$("#logout").click(function(e) {
    e.preventDefault();
    $.ajax({
        type: "GET",
        url: "//127.0.0.1:5000/user/logout",
        success: function() {
            location.href = '//127.0.0.1:5000/'
        }
    });
});

$("#delete").click(function(e) {
    e.preventDefault();
    $.ajax({
        type: "DELETE",
        url: "//127.0.0.1:5000/user/",
        success: function() {
            location.href = '//127.0.0.1:5000/user/logout'
        }
    });
});

$("#changePassword").click(function(e) {
    e.preventDefault();
    $.ajax({
        type: "GET",
        url: "//127.0.0.1:5000/page/changePassword",
        success: function(response, textStatus, xhr) {
            if (xhr.status == 202) {
                $("#body").html(response);

                $("#change").click(function() {
                    if ($("#newPassword").val() == $("#repeatPassword").val() && $("#newPassword").val() && ($("#newPassword").val().search(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/gmi) + 1)) {
                        const data = {
                            oldPassword: $("#oldPassword").val(),
                            newPassword: $("#newPassword").val(),
                        }
                        $.ajax({
                            type: "PUT",
                            contentType: "application/json; charset=utf-8",
                            url: "//127.0.0.1:5000/user/password",
                            data: JSON.stringify(data),
                            success: function() {
                                location.href = '//127.0.0.1:5000/'
                            },
                            error: () => {
                                $("#result").html("Old password not true!!! ");
                                $("#bodyResult").removeClass('hidden');
                            }
                        });
                    } else {
                        $("#result").html("Repeat password  or new password not true!!! ");
                        $("#bodyResult").removeClass('hidden');
                    }
                });

            } else {
                location.href = '//127.0.0.1:5000/'
            }
        }
    });
});

$("#home").click(function(e) {
    e.preventDefault();
    $.ajax({
        type: "GET",
        url: "//127.0.0.1:5000/page/home",
        success: function(response, textStatus, xhr) {
            if (xhr.status == 202) {
                $("#body").html(response);
            } else {
                location.href = '//127.0.0.1:5000/'
            }
        }
    });
});

$("#update").click(function(e) {
    e.preventDefault();
    $.ajax({
        type: "GET",
        url: "//127.0.0.1:5000/page/update",
        success: function(response, textStatus, xhr) {
            if (xhr.status == 202) {
                $("#body").html(response)

                $("#btn-update").click(function() {
                    const data = {
                        name: $("#name").val(),
                        username: $("#username").val(),
                        age: $("#age").val(),
                        phoneNumber: $("#phoneNumber").val(),
                        email: $("#email").val(),
                    }

                    checkValuesInUpdate(data.name, data.username, data.age, data.phoneNumber, data.email, flag => {
                        if (flag) {
                            $.ajax({
                                type: "PUT",
                                url: "//127.0.0.1:5000/user/update",
                                data: JSON.stringify(data),
                                contentType: "application/json; charset=utf-8",
                                success: function() {
                                    $("#result").html("Update was successfully !!! ");
                                    $("#bodyResult").removeClass('hidden');
                                }
                            });
                        } else {
                            $("#result").html("Values not true!!! ");
                            $("#bodyResult").removeClass('hidden');
                        }
                    })

                });
            } else {
                location.href = '//127.0.0.1:5000/'
            }
        }
    });
});

$("#closeResult").click(function(e) {
    e.preventDefault();
    $("#bodyResult").addClass('hidden');
});


function checkValuesInUpdate(name, username, age, phoneNumber, email, cl) {
    if (name && (!age || !isNaN(+age)) && (!phoneNumber || !isNaN(+phoneNumber)) && email.search(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi) + 1 && username) {
        checkUsernameAndEmail(username, (flag) => {
            if (flag) {
                return cl(true)
            }
            cl(false)
        })
    } else {
        cl(false)
    }
}

function checkUsernameAndEmail(username, cl) {
    $.ajax({
        type: "GET",
        url: `username/${username}`,
        success: function() {
            if ($("#username").attr('placeholder') == username) {
                return cl(true)
            }
            return cl(false)
        },
        error: function() {
            return cl(true)
        }
    });
}



$('.avatar').click(function(e) {
    e.preventDefault();
    $.get("//127.0.0.1:5000/page/avatar",
        function(data, textStatus, jqXHR) {
            if (jqXHR.status == 202) {
                $("#body").html(data)

                /* $("#btn-avatar").click(function() {
                    const form = $('#img-avatar');
                    const sendForm = new FormData()
                    sendForm.append("avatar", form)
                    console.log(sendForm);
                }); */
            }
        }
    );
});