function Character(info) {
    this.mainElem = document.createElement('div');
    this.mainElem.classList.add('character');
    this.mainElem.innerHTML = ''
        + '<div class="character-face-con character-head">'
            + '<div class="character-face character-head-face face-front"></div>'
            + '<div class="character-face character-head-face face-back"></div>'
        + '</div>'
        + '<div class="character-face-con character-torso">'
            + '<div class="character-face character-torso-face face-front"></div>'
            + '<div class="character-face character-torso-face face-back"></div>'
        + '</div>'
        + '<div class="character-face-con character-arm character-arm-right">'
            + '<div class="character-face character-arm-face face-front"></div>'
            + '<div class="character-face character-arm-face face-back"></div>'
        + '</div>'
        + '<div class="character-face-con character-arm character-arm-left">'
            + '<div class="character-face character-arm-face face-front"></div>'
            + '<div class="character-face character-arm-face face-back"></div>'
        + '</div>'
        + '<div class="character-face-con character-leg character-leg-right">'
            + '<div class="character-face character-leg-face face-front"></div>'
            + '<div class="character-face character-leg-face face-back"></div>'
        + '</div>'
        + '<div class="character-face-con character-leg character-leg-left">'
            + '<div class="character-face character-leg-face face-front"></div>'
            + '<div class="character-face character-leg-face face-back"></div>'
        + '</div>';

    document.querySelector('.stage').appendChild(this.mainElem);
    // console.log(info)

    // 클릭한 곳의 X좌표에 따라 스폰됨
    this.mainElem.style.left = info.xPos + '%';
    
    // 스크롤 중인지 아닌지 체크하는 변수
    this.scrollState = false;

    // 바로 이전(마지막) 스크롤 위치
    this.lastScrollTop = 0;

    // 이 객체의 속성으로도 등록
    this.xPos = info.xPos;

    // 속도
    this.speed = info.speed;

    // 방향(left/right)
    this.direction;

    // 좌우 이동 중인지 아닌지를 판별
    // 이동 중 => true, 아니면 => false
    this.runningState = false;

    // request Animation Frame Id
    this.rafId;

    this.init();

}

Character.prototype = {
    constructer: Character,
    init: function () {
        const self = this;

        window.addEventListener("scroll", function () {
            clearTimeout(self.scrollState);

            if (!self.scrollState){
                self.mainElem.classList.add("running");
                // console.log("running")
            }

            self.scrollState = setTimeout(function () {
                self.scrollState = false;
                self.mainElem.classList.remove("running");
                // console.log("stop")
            }, 500);

            // console.log('lastScrollTop: ', self.lastScrollTop);
            // console.log('scrollY', scrollY);

            // 이전 스크롤 위치와 현재 스크롤 위치 비교
            // => 커졌으면 스크롤 내린거, 작아졌으면 스크롤 올린거
            if (self.lastScrollTop > scrollY) { // 스크롤 올림
                self.mainElem.setAttribute("data-direction", "backward")
            }
            else { // 스크롤 내림
                self.mainElem.setAttribute("data-direction", "forward")
            }
            self.lastScrollTop = scrollY; 
        })

        window.addEventListener("keydown", function (e) {
            if (self.runningState) return;

            console.log('keydown event 실행')
            if (e.key == "ArrowLeft"){
                self.mainElem.setAttribute("data-direction", "left");
                self.direction = "left";
                self.mainElem.classList.add("running");
                self.run();
                self.runningState = true;
            }
            else if (e.key == "ArrowRight"){
                self.mainElem.setAttribute("data-direction", "right");
                self.direction = "right";
                self.mainElem.classList.add("running");
                self.run();
                self.runningState = true;
            }
        })
        window.addEventListener('keyup', function (e) {
            self.mainElem.classList.remove("running");
            cancelAnimationFrame(self.rafId);
            self.runningState = false;
        });

    },

    run: function (){
        const self = this;
        
        if (self.direction == "left"){
            self.xPos -= self.speed;
        } else if (self.direction == "right"){
            self.xPos += self.speed;
        }

        if (self.xPos < 2) {
            self.xPos = 2;
        }

        if (self.xPos > 88){
            self.xPos = 88;
        }
        self.mainElem.style.left = `${self.xPos}%`;

        self.rafId = requestAnimationFrame(self.run.bind(self));
    }
}