'use strict';

window.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.querySelector('.start'),
          screens = document.querySelectorAll('.screen'),
          timeList = document.querySelector('.time-list'),
          timeEl = document.querySelector('#time'),
          board = document.querySelector('.board');
    const colors = [
        'rgb(0, 172, 86)',
        'rgb(231, 40, 40)',
        'rgb(245, 227, 69)',
        'rgb(63, 131, 255)',
        'rgb(157, 70, 238)',
        'rgb(223, 117, 217)',
        'rgb(0, 224, 224)',
        'rgb(34, 0, 224)',
    ];
    let score = 0,
        time = 0;

    startBtn.addEventListener('click', e => {
        e.preventDefault();
        screens[0].classList.add('up');
    });

    timeList.addEventListener('click', e => {
        if (e.target.classList.contains('time-btn')) {
            time = +e.target.getAttribute('data-time');
            screens[1].classList.add('up');
            startGame();
        }
    });

    board.addEventListener('click', e => {
        if (e.target.classList.contains('circle')){
            score++;
            e.target.remove();
            createCircles();
        }
    });

    function startGame() {
        setInterval(decreaseTime, 1000);
        createCircles();
        timeEl.innerHTML = `00:${time}`;
    }

    function decreaseTime() {
        if (time === 0) {
            finishGame();
        } else {
            let current = --time;
            if (current < 10) {
                timeEl.innerHTML = `00:0${current}`;
            } else {
                timeEl.innerHTML = `00:${current}`;
            }
        }
    }

    function finishGame() {
        timeEl.parentNode.classList.add('hide');
        board.innerHTML = `<h1>Ваш счёт: <span class='primary'>${score}</span></h1>`;
    }

    function createCircles() {
        const circle = document.createElement('div');
        circle.classList.add('circle');
        const {width, height} = board.getBoundingClientRect();
        const size = getRandomNumber(10, 60),
              randomColor = Math.floor(Math.random() * colors.length),
              positionY = getRandomNumber(0, height - size),
              positionX = getRandomNumber(0, width - size);

        circle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            background-color: ${colors[randomColor]};
            box-shadow: 0 0 2px ${colors[randomColor]}, 0 0 10px ${colors[randomColor]};
            top: ${positionY}px;
            left: ${positionX}px;
        `;

        board.append(circle);
    }

    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    function winGame() {
        function kill() {
            const circle = document.querySelector('.circle');
            if (circle){
                circle.click();
            }
        }
        setInterval(kill, 10);
    }
    winGame();
});