'use strict';

window.addEventListener('DOMContentLoaded', () => {

    const words = ['Компьютер', 'Программа', 'Клавиатура', 'Монитор', 'Мышь', 'Микрофон', 'Дисковод'];

    const btnStart = document.querySelector('.btn__start'),
          subtitle = document.querySelector('.subtitle'),
          title = document.querySelector('.title'),
          alphabet = document.querySelector('.alphabet'),
          alphabetLetters = document.querySelectorAll('.alphabet__word'),
          wordsItem = document.querySelector('.words'),
          bodyItem = document.querySelectorAll('.body-item');

    
    // get random word from array
    function randomWord(arr) {
        const i = Math.floor(Math.random() * arr.length);
        const word = arr[i];
        return word;
    }

    // create blocks with letters
    function createBlocks(word) {
        let blocks = word.toLowerCase().split('');
        const elements = [];
        for (let i = 0; i < blocks.length; i++) {
            const w = document.createElement('div');
            w.classList.add('word');
            w.textContent = blocks[i];
            elements.push(w);
        }
        elements.forEach(e => wordsItem.append(e));
        return elements;
    }

    // get blocks with right letter
    function getBlock(letter, blocks) {
        let b = [];
        blocks.forEach(block => {
            if (block.textContent === letter.value) {
                b.push(block);
            }
        });
        return b;
    }

    // start our game
    function startGame() {
        btnStart.style.display = 'none';
        alphabet.style.cssText = `
        transform: translate(0%, -50%);
        opacity: 1;
    `;
        title.textContent = 'Добро пожаловать на казнь!';
        title.style.color = '#b40000';
        subtitle.textContent = 'Выберите букву';
    }

    // playing game
    function game() {
        startGame();
        let wrong = 0,
            right = 0;
        // word from array and blocks with letters
        let gameWord = randomWord(words),
            gameBlocks = createBlocks(gameWord);

        console.log(gameBlocks);
        console.log(gameWord);

        alphabetLetters.forEach(letter => {
            letter.style.cssText = `text-transform: uppercase;`;

            letter.addEventListener('click', (e) => {
                e.preventDefault();
                const target = e.target;
                let rightAnswer = getBlock(target, gameBlocks);
                console.log(rightAnswer);
                if (rightAnswer.length !== 0) {
                    target.style.cssText = `
                        background-color: rgb(116, 224, 72);
                        box-shadow: 0 0 2px rgb(116, 224, 72), 0 0 10px rgb(116, 224, 72);
                    `;
                    target.disabled = true;
                    rightAnswer.forEach(answ => {
                        answ.style.cssText = `
                        font-size: 20px;
                        text-transform: uppercase;
                    `;
                    });
                    right += rightAnswer.length;
                    // console.log(`Right ${right}`);
                    if (right === gameWord.length) {
                        console.log(`You win`);
                        winGame();
                        return;
                        // right = 0;
                        // wrong = 0;
                    }
                } else {
                    bodyItem[wrong].style.opacity = '1';
                    wrong++;
                    // console.log(`Wrong ${wrong}`);
                    target.disabled = true;
                    target.style.cssText = `
                        background-color: rgb(255, 72, 72);
                        box-shadow: 0 0 2px rgb(255, 72, 72), 0 0 10px rgb(255, 72, 72);
                    `;
                    if (wrong === 6) {
                        console.log(`You lose`);
                        loseGame(gameBlocks);
                        return;
                        // right = 0;
                        // wrong = 0;
                    }
                }
            });
        });
    }

    function endGame() {
        alphabetLetters.forEach(l => {
            l.disabled = true;
            l.style.cursor = 'default';
        });
    }

    function winGame() {
        endGame();
        title.textContent = 'Победа!';
        title.style.color = 'rgb(0, 255, 85)';
        subtitle.textContent = 'Вы обманули смерть';
    }

    function loseGame(gameBlocks) {
        endGame();
        title.textContent = 'Поражение!';
        title.style.color = 'rgb(255, 43, 43)';
        subtitle.textContent = 'Смерть настигла вас';
        gameBlocks.forEach(item => {
            item.style.cssText = `
                font-size: 20px;
                text-transform: uppercase;
            `;
        });
        const message = document.createElement('p');
        message.textContent = 'Было загадано слово';
        wordsItem.insertAdjacentElement('beforebegin', message);
    }

    btnStart.addEventListener('click', () => {
        if (btnStart.classList.contains('btn__start')) {
            game();
        }
    });
});