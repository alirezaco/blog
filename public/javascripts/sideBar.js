$("#sideBar-update").click(function(e) {
    e.preventDefault();
    $(".fa-angle-right").slideToggle(1);
    $(".fa-angle-down").slideToggle(1);
    $(".down").slideToggle(500);
});