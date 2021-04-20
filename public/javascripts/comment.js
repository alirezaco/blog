function saveComment(articleId) {

    const data = {
        text: $("#commentText").val(),
        title: $("#commentTitle").val(),
        article: articleId
    };

    $.ajax({
        type: "POST",
        url: "/comment/",
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        success: function() {
            console.log(1);
        }
    });
}