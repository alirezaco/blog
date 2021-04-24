//logout user
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

//delete user account
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

// get page for change password and changing password
$("#changePassword").click(function(e) {
    e.preventDefault();

    toggleSideBar();

    CheckLogin();

    $.ajax({
        type: "GET",
        url: "//127.0.0.1:5000/page/changePassword",
        success: function(response) {
            $("#body").html(response);

            $("#change").click(function() {
                if ($("#newPassword").val() && ($("#newPassword").val().search(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/gmi) + 1)) {
                    if ($("#newPassword").val() == $("#repeatPassword").val()) {
                        const data = {
                            oldPassword: $("#oldPassword").val(),
                            newPassword: $("#newPassword").val(),
                        }
                        $.ajax({
                            type: "PUT",
                            contentType: "application/json; charset=utf-8",
                            url: "/user/password",
                            data: JSON.stringify(data),
                            success: function() {
                                location.href = '/'
                            },
                            error: () => {
                                result("Old password is incorrect !!! ", 'error');
                            }
                        });
                    } else {
                        result("Repeat password  is incorrect !!! ", 'error')
                    }
                } else {
                    result("new password is incorrect !!! ", 'error')
                }
            });

        }
    });
});

//get dashboard page
$("#dashboard").click(function(e) {
    e.preventDefault();

    toggleSideBar()

    CheckLogin();

    $.ajax({
        type: "GET",
        url: "/page/home",
        success: function(response) {
            $("#body").html(response);
        }
    });
});

//get page for update information and update info
$("#update").click(function(e) {
    e.preventDefault();

    toggleSideBar()

    CheckLogin();

    $.ajax({
        type: "GET",
        url: "//127.0.0.1:5000/page/update",
        success: function(response) {
            $("#body").html(response)

            $("#btn-update").click(function() {
                const data = {
                    name: $("#name").val(),
                    username: $("#username").val(),
                    age: $("#age").val(),
                    phoneNumber: $("#phoneNumber").val(),
                    email: $("#email").val(),
                    gender: $("#gender").val()
                }

                checkValuesInUpdate(data.name, data.username, data.age, data.phoneNumber, data.email, data.gender, flag => {
                    if (flag) {
                        $.ajax({
                            type: "PUT",
                            url: "//127.0.0.1:5000/user/update",
                            data: JSON.stringify(data),
                            contentType: "application/json; charset=utf-8",
                            success: function() {
                                result("Update was successfully !!! ", "success");
                            }
                        });
                    } else {
                        result("Values not true!!! ", "error");
                    }
                })

            });
        }
    });
});

function checkValuesInUpdate(name, username, age, phoneNumber, email, gender, cl) {
    if (name && isNaN(+name) && (!age || !isNaN(+age)) && (!gender || gender === 'male' || gender === 'female') && (!phoneNumber || !isNaN(+phoneNumber)) && email.search(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi) + 1 && username) {
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

//get page for update avatar
$('.avatar').click(function(e) {
    e.preventDefault();
    toggleSideBar()
    CheckLogin();
    $.get("//127.0.0.1:5000/page/avatar",
        function(data) {
            $("#body").html(data)

            document.getElementById('inp-avatar').onchange = function(evt) {
                let tgt = evt.target || window.event.srcElement,
                    files = tgt.files;

                // FileReader support
                if (FileReader && files && files.length) {
                    let fr = new FileReader();
                    fr.onload = function() {
                        document.getElementById('img-avatar').src = fr.result;
                    }
                    fr.readAsDataURL(files[0]);
                }

                // Not supported
                else {
                    result("file is not image or file is big!!! ", "error")
                }
            }
        }
    );
});


//get page for write new article
$("#newArticle").click(function(e) {
    e.preventDefault();
    toggleSideBar()
    CheckLogin();
    $.ajax({
        type: "GET",
        url: "//127.0.0.1:5000/page/newArticle",
        success: function(response) {
            $("#body").html(response)
            newArticle();
        }
    });
});

//get page for a user article 
$("#yourArticle").click(function(e) {
    e.preventDefault();
    toggleSideBar()
    CheckLogin();
    $.ajax({
        type: "GET",
        url: "//127.0.0.1:5000/page/yourArticle",
        success: function(response) {
            $("#body").html(response)
        }
    });
});

//get page for all user article
$("#explore").click(function(e) {
    e.preventDefault();

    toggleSideBar()
    CheckLogin();

    explore(1);
    let page = 2;
    window.onscroll = function() {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && page < 12) {
            explore(page);
            page++;
        }
    };
});

//get list bloggers for admin
$("#bloggers").click(function(e) {
    e.preventDefault();
    toggleSideBar()
    CheckLogin();

    $.ajax({
        type: "GET",
        url: "//127.0.0.1:5000/page/users",
        success: function(response) {
            $("#body").html(response)
        }
    });
});