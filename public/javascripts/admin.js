function deleteUser(id) {
    $.ajax({
        type: "DELETE",
        url: "/user/admin/" + id,
        success: function() {
            $("#" + id).slideUp(1);
        }
    });
}