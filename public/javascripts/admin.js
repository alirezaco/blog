function deleteUser(id) {
    CheckLogin()
    $.ajax({
        type: "DELETE",
        url: "/user/admin/" + id,
        success: function() {
            $("#" + id).slideUp(1);
            result("delete user successfully !!!", "success")
        }
    });
}

function updateUser(id) {
    CheckLogin()
    $.ajax({
        type: "PUT",
        url: "/user/admin/" + id,
        success: function() {
            result("User password changed successfully !!!", "success")
        }
    });
}