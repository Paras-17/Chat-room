const arrayContainer = document.getElementById('array-container');
const playButton = document.getElementById('play');
const pauseButton = document.getElementById('pause');

let array = Array.from({ length: 20 }, () => Math.floor(Math.random() * 300));
let isPaused = false;

function renderArray() {
    arrayContainer.innerHTML = '';
    array.forEach(value => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${value}px`;
        arrayContainer.appendChild(bar);
    });
}

async function bubbleSort() {
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                // Swap
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                renderArray();

                // Wait for a short duration or until paused
                await new Promise(resolve => {
                    const timeout = setTimeout(resolve, 100);
                    
                    // Pause functionality
                    const checkPause = setInterval(() => {
                        if (isPaused) {
                            clearTimeout(timeout);
                        } else {
                            clearInterval(checkPause);
                            resolve();
                        }
                    }, 100);
                });
            }
        }
    }
}

playButton.addEventListener('click', () => {
    isPaused = false;
    bubbleSort();
});

pauseButton.addEventListener('click', () => {
    isPaused = true;
});

// Initial render
renderArray();
