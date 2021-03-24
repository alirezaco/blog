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