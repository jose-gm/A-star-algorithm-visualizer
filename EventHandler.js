let start = document.getElementById("btnStart");
let restart = document.getElementById("btnRestart");
let pressed = false;

start.addEventListener("click", () => {
    if(!pressed){
        render();
    }
    start.disabled = true;
    //pressed = true;
});

restart.addEventListener("click", () => {
    setup();
    start.disabled = false;
});