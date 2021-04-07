function newArticle() {
    $("#save-newArticle").click(function(e) {
        e.preventDefault();

        const form = new FormData();
        let file = $("#img-article")[0].files;
        if (file.length > 0) {

            form.append('img-article', file[0])
            form.append('title', $("#title").val())
            form.append('text', $("#text").val())
            $.ajax({
                type: "POST",
                url: "//127.0.0.1:5000/article/",
                data: form,
                contentType: false,
                processData: false,
                success: function(response) {
                    console.log(response);
                }
            });

        } else {
            $("#result").html("image not selected!!! ");
            $("#bodyResult").removeClass('hidden');
        }
    });
}

function explore(page) {
    CheckLogin()
    $.ajax({
        type: "GET",
        url: "//127.0.0.1:5000/page/explore/" + page,
        success: function(response) {
            if (page == 1) {
                $("#body").html(`<div class="m-5 p-5 grid grid-cols-12 gap-14">
                ${response}
                </div>
                `)
            } else {
                $("#body").append(`<div class="m-5 p-5 grid grid-cols-12 gap-14">
                                    ${response}
                                    </div>
                                `)
            }
        }
    });
}


function profileArticle(element) {
    toggleSideBar()
    CheckLogin()

    $.ajax({
        type: "GET",
        url: "//127.0.0.1:5000/page/" + element.id,
        success: function(response) {
            $("#body").html(response)
        }
    });
}

function deleteArticle(idArticle) {
    toggleSideBar()
    CheckLogin()

    $.ajax({
        type: "DELETE",
        url: "//127.0.0.1:5000/article/" + idArticle,
        success: function() {
            $.ajax({
                type: "GET",
                url: "//127.0.0.1:5000/page/yourArticle",
                success: function(response) {
                    $("#body").html(response)
                }
            });
        }
    });
}

function updateArticle(idArticle) {
    toggleSideBar()
    CheckLogin()

    $.ajax({
        type: "GET",
        url: "//127.0.0.1:5000/page/updateArticle/" + idArticle,
        success: function(response) {
            $("#body").html(response)

            $("#btn-update").click(function(e) {
                e.preventDefault();

                const form = new FormData();
                let file = $("#img-article")[0].files;
                if ($("#title").val() && $("#text").val()) {

                    CheckLogin()

                    if (file.length > 0) form.append('img-article', file[0])
                    form.append('title', $("#title").val())
                    form.append('text', $("#text").val())
                    $.ajax({
                        type: "PUT",
                        url: "//127.0.0.1:5000/article/" + idArticle,
                        data: form,
                        contentType: false,
                        processData: false,
                        success: function() {
                            $.ajax({
                                type: "GET",
                                url: "//127.0.0.1:5000/page/" + idArticle,
                                success: function(nResponse) {
                                    $("#body").html(nResponse)
                                }
                            });
                        }
                    });

                } else {
                    $("#result").html("values not true!!! ");
                    $("#bodyResult").removeClass('hidden');
                }
            });

        }
    });
}