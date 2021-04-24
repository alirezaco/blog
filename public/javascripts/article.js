//create a new article
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
                url: "/article/",
                data: form,
                contentType: false,
                processData: false,
                success: function() {
                    result("New article saved !!!", 'success')
                },
                error: function() {
                    result('New article not saved !!!', 'error')
                }
            });
        } else {
            result("Image not selected !!!", "error")
        }
    });
}

//get articles from server
function explore(page) {
    CheckLogin()
    $.ajax({
        type: "GET",
        url: "/page/explore/" + page,
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
        url: "/page/" + element.id,
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
        url: "/article/" + idArticle,
        success: function() {

            result("Article deleted !!!", 'success')

            $.ajax({
                type: "GET",
                url: "/page/yourArticle",
                success: function(response) {
                    $("#body").html(response)
                }
            });
        },
        error: function() {
            result('Article not deleted !!!', 'error')
        }
    });
}

function updateArticle(idArticle) {
    toggleSideBar()
    CheckLogin()

    $.ajax({
        type: "GET",
        url: "/page/updateArticle/" + idArticle,
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
                        url: "/article/" + idArticle,
                        data: form,
                        contentType: false,
                        processData: false,
                        success: function() {
                            result('Article updated !!!', 'success')
                            $.ajax({
                                type: "GET",
                                url: "/page/" + idArticle,
                                success: function(nResponse) {
                                    $("#body").html(nResponse)
                                }
                            });
                        },
                        error: function() {
                            result('Article not updated !!!', 'error')
                        }
                    });

                } else {
                    result('Please fill in all fields !!!', 'error')
                }
            });

        }
    });
}