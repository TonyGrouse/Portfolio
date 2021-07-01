'use strict';

window.addEventListener('DOMContentLoaded', () => {
    const board = document.querySelector('#board');
    const SQUARES_NUMBER = 800;
    let colors = [
        'rgb(0, 172, 86)',
        'rgb(231, 40, 40)',
        'rgb(245, 227, 69)',
        'rgb(63, 131, 255)',
        'rgb(157, 70, 238)',
        'rgb(223, 117, 217)',
        'rgb(0, 224, 224)',
        'rgb(34, 0, 224)',

    ];

    for (let i = 0; i < SQUARES_NUMBER; i++) {
        const square = document.createElement('div');
        square.classList.add('square');

        square.addEventListener('mouseover', () => {
            let randomColor = colors[Math.floor(Math.random() * colors.length)];
            square.style.backgroundColor = randomColor;
            square.style.boxShadow = `0 0 2px ${randomColor},
                                      0 0 10px ${randomColor}`;
        });
        square.addEventListener('mouseleave', () => {
            square.style.backgroundColor = '#1d1d1d';
            square.style.boxShadow = '0 0 2px #000';
        });

        board.append(square);
    }
});