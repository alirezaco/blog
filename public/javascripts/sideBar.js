$("#sideBar-update").click(function(e) {
    e.preventDefault();
    $(".fa-angle-right").slideToggle(1);
    $(".fa-angle-down").slideToggle(1);
    $(".down").slideToggle(500);
});

$("#open-slideBar").click(function(e) {
    e.preventDefault();
    $(".sideBar").animate({ width: 'toggle' }, 300);
    $(".fa-angle-right").slideDown(1);
    $(".fa-angle-down").slideUp(1);
    $(".down").slideUp(500);
});

function toggleSideBar() {
    $(".sideBar").hide(300);
    $(".fa-angle-right").slideDown(1);
    $(".fa-angle-down").slideUp(1);
    $(".down").slideUp(500);
    window.onscroll = function(ev) {};
}