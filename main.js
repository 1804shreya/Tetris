document.addEventListener('DOMContentLoaded', () => {
    const GRID_WIDTH = 10;
    const GRID_HEIGHT = 20;
    const GRID_SIZE = GRID_WIDTH * GRID_HEIGHT;
    const width = 10;
    let currentPosition = 4;
    let squares;
    let timerId;
    let nextRandom = 0;
    let score = 0;
    let lines = 0;
    const colors = [
        'url(blue_block.png)',
        'url(pink_block.png)',
        'url(purple_block.png)',
        'url(peach_block.png)',
        'url(yellow_block.png)'
    ];

    const grid = createGrid();
    squares = Array.from(grid.querySelectorAll('div'));


    function createGrid() {
        // The main grid
        const gridElement = document.querySelector(".grid");
        for (let i = 0; i < GRID_SIZE; i++) {
            const gridCell = document.createElement("div");
            gridElement.appendChild(gridCell);
        }
    
        // Set base of grid
        for (let i = 0; i < GRID_WIDTH; i++) {
            const gridCell = document.createElement("div");
            gridCell.setAttribute("class", "block3");
            gridElement.appendChild(gridCell);
        }
    
        const previousGrid = document.querySelector(".previous-grid");
        for (let i = 0; i < 16; i++) {
            const gridCell = document.createElement("div");
            previousGrid.appendChild(gridCell);
        }
        return gridElement;
    }
    function control(e) {
        if (e.keyCode === 39)
          moveright()
        else if (e.keyCode === 38)
          rotate()
        else if (e.keyCode === 37)
          moveleft()
        else if (e.keyCode === 40)
          moveDown()
      }
      document.addEventListener('keydown', control);
       //The Tetrominoes
    const lTetromino = [
        [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, 2],
        [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 2],
        [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2],
        [GRID_WIDTH, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2 + 2]
    ]

    const zTetromino = [
        [0, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
        [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1],
        [0, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
        [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1]
    ]

    const tTetromino = [
        [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2],
        [1, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 1],
        [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 1],
        [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1]
    ]

    const oTetromino = [
        [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
        [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
        [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
        [0, 1, GRID_WIDTH, GRID_WIDTH + 1]
    ]

    const iTetromino = [
        [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 3 + 1],
        [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3],
        [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 3 + 1],
        [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3]
    ]

    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

    //Randomly Select Tetromino
    let currentRotation=0
    let random = Math.floor(Math.random() * theTetrominoes.length)
    let current = theTetrominoes[random][currentRotation]

    //draw the shape
    function draw() {
        current.forEach(index => {
        squares[currentPosition + index].classList.add('block')
        squares[currentPosition + index].style.backgroundImage = colors[random]
        })
  }
      //undraw the shape
    function undraw() {
        current.forEach(index => {
        squares[currentPosition + index].classList.remove('block')
        squares[currentPosition + index].style.backgroundImage = 'none'
        })
  }

    //move down on loop
    function moveDown() {
        undraw()
        currentPosition = currentPosition += width
        draw()
        freeze()
      }
  //move left and prevent collisions with shapes moving left
    function moveright() {

        undraw()
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1)
        if (!isAtRightEdge) currentPosition += 1
        if (current.some(index => squares[currentPosition + index].classList.contains('block2'))) {
        currentPosition -= 1
    }
    draw()
  }
  //move right and prevent collisions with shapes moving right
    function moveleft() {
        undraw()
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
        if (!isAtLeftEdge) currentPosition -= 1
        if (current.some(index => squares[currentPosition + index].classList.contains('block2'))) {
        currentPosition += 1
    }

    draw()
  }
  function rotate(){

    undraw()
    currentRotation++
    if (currentRotation === current.length) {
      currentRotation = 0
    }
    current = theTetrominoes[random][currentRotation]
    draw()
  }


  const displayWidth = 4
  let displayIndex = 0
  const displaySquares = document.querySelectorAll('.previous-grid div')
  
  const smallTetrominoes = [
    [1, displayWidth + 1, displayWidth * 2 + 1, 2], /* lTetromino */
    [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], /* zTetromino */
    [1, displayWidth, displayWidth + 1, displayWidth + 2], /* tTetromino */
    [0, 1, displayWidth, displayWidth + 1], /* oTetromino */
    [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1] /* iTetromino */
  ]

  function displayShape() {
    displaySquares.forEach(square => {
      square.classList.remove('block')
      square.style.backgroundImage = 'none'
    })
    smallTetrominoes[nextRandom].forEach(index => {
      displaySquares[displayIndex + index].classList.add('block')
      displaySquares[displayIndex + index].style.backgroundImage = colors[nextRandom]
    })
  }displayShape()

  function displayShape() {
    displaySquares.forEach(square => {
      square.classList.remove('block')
      square.style.backgroundImage = 'none'
    })
    smallTetrominoes[nextRandom].forEach(index => {
      displaySquares[displayIndex + index].classList.add('block')
      displaySquares[displayIndex + index].style.backgroundImage = colors[nextRandom]
    })
  }

  function freeze() {
    // if block has settled
    if (current.some(index => squares[currentPosition + index + width].classList.contains('block3') || squares[currentPosition + index + width].classList.contains('block2'))) {
      // make it block2
      current.forEach(index => squares[index + currentPosition].classList.add('block2'))
      random = nextRandom
      nextRandom = Math.floor(Math.random() * theTetrominoes.length)
      current = theTetrominoes[random][currentRotation]
      currentPosition = 4
      draw()
      displayShape()
      addScore()
      gameOver()
    }
  }
  freeze()


const startBtn = document.querySelector('.button');
const resetBtn = document.querySelector('.reset-button');
const scoreDisplay = document.querySelector('.score-display');
const linesDisplay = document.querySelector('.lines-score');

startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', resetGame);

function startGame() {
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
    } else {
        draw();
        timerId = setInterval(moveDown, 1000);
        nextRandom = Math.floor(Math.random() * theTetrominoes.length);
        displayShape();
    }
}

function resetGame() {
    // Clear all squares
    squares.forEach(square => {
        square.classList.remove('block', 'block2');
        square.style.backgroundImage = 'none';
    });

    currentPosition = 4;
    score = 0;
    lines = 0;
    scoreDisplay.innerHTML = score;
    linesDisplay.innerHTML = lines;

    // Restart game
    startGame();
}

function gameOver() {
    if (current.some(index => squares[currentPosition + index].classList.contains('block2'))) {
        scoreDisplay.innerHTML = 'end';
        clearInterval(timerId);
    }
}

// ... (rest of the code)


  function addScore() {
    for (currentIndex = 0; currentIndex < GRID_SIZE; currentIndex += GRID_WIDTH) {
      const row = [currentIndex, currentIndex + 1, currentIndex + 2, currentIndex + 3, currentIndex + 4, currentIndex + 5, currentIndex + 6, currentIndex + 7, currentIndex + 8, currentIndex + 9]
      if (row.every(index => squares[index].classList.contains('block2'))) {
        score += 10
        lines += 1
        scoreDisplay.innerHTML = score
        linesDisplay.innerHTML = lines
        row.forEach(index => {
          squares[index].style.backgroundImage = 'none'
          squares[index].classList.remove('block2') || squares[index].classList.remove('block')

        })
        //splice array
        const squaresRemoved = squares.splice(currentIndex, width)
        squares = squaresRemoved.concat(squares)
        squares.forEach(cell => grid.appendChild(cell))
      }
    }
  }
  
  

})