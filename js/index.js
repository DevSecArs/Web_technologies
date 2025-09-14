function show_hide(id) {
    var object = document.getElementById(id);
    if (object.style.display === "none") {
        object.style.display = "flex";
    } else {object.style.display = "none";}
}