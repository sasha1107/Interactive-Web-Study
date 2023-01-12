(function (){
    const stageElem = document.querySelector(".stage");
    const houseElem = document.querySelector(".house");
    const barElem = document.querySelector(".progress-bar");
    const mousePos = { x : 0, y : 0 };
    let maxScrollValue;


    function resizeHandler() {
        maxScrollValue = document.body.offsetHeight - window.innerHeight;
    }

    window.addEventListener("scroll", function () {
        const scrollPer = scrollY / maxScrollValue;
        const zMove =  scrollPer * 980 - 490;
        houseElem.style.transform = `translateZ(${zMove}vw)`;
        barElem.style.width = `${scrollPer * 100}%`;
    });

    window.addEventListener("mousemove", function (e) {
        // 마우스의 위치를 중앙을 0,0으로 하고 상하좌우의 좌표를 -1 ~1 으로 재설정
        mousePos.x = -1 + (e.clientX / window.innerWidth) * 2;
        mousePos.y = 1 - (e.clientY / window.innerHeight) * 2;
        stageElem.style.transform = `rotateX(${mousePos.y * 5}deg) rotateY(${mousePos.x * 5}deg)`;
    });

    window.addEventListener("resize", resizeHandler);

    resizeHandler();
})();