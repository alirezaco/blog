function deleteUser(id) {
    CheckLogin()
    $.ajax({
        type: "DELETE",
        url: "/user/admin/" + id,
        success: function() {
            $("#" + id).slideUp(1);
        }
    });
}

function updateUser(id) {
    CheckLogin()
    $.ajax({
        type: "PUT",
        url: "/user/admin/" + id,
        success: function() {
            $("#result").html("Update successfully !!!");
            $("#bodyResult").removeClass('hidden');
        }
    });
}