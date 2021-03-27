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
    $.ajax({
        type: "GET",
        url: "//127.0.0.1:5000/page/explore/" + page,
        success: function(response, textStatus, xhr) {
            if (xhr.status == 202) {
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
            } else {
                location.href = '//127.0.0.1:5000/'
            }
        }
    });
}