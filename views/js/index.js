function launch_toast(message) {
    var x = document.getElementById("toast")
    document.getElementById('desc').innerText = message;
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
}