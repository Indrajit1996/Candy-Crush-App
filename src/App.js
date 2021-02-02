import React, { useEffect , useRef} from 'react';
// import debounce from 'lodash.debounce';
import './App.css';

function App() {
  const candyColors = [
    'red',
    'yellow',
    'green',
    'blue',
  ];
  const grid = useRef();
  const width = 10;
  const squares = [];
  let scoreDisplay = useRef();
  let score = 0;
  let show = false;
  function createBoard() {
    for (let i = 0; i < width*width; i++) {
      const square = document.createElement('div');
      square.setAttribute('draggable', true);
      square.setAttribute('id', i);
      let randomColor = Math.floor(Math.random() * candyColors.length);
      square.style.backgroundColor = candyColors[randomColor];
      grid.current.appendChild(square);
      squares.push(square);
    }


    let colorBeingDragged
    let colorBeingReplaced
    let idBeingDragged
    let idBeingReplaced
  
    squares.forEach(square => square.addEventListener('dragstart', dragStart))
    squares.forEach(square => square.addEventListener('dragend', dragEnd))
    squares.forEach(square => square.addEventListener('dragover', dragOver))
    squares.forEach(square => square.addEventListener('dragenter', dragEnter))
    squares.forEach(square => square.addEventListener('drageleave', dragLeave))
    squares.forEach(square => square.addEventListener('drop', dragDrop))
  
    function dragStart(){
        colorBeingDragged = this.style.backgroundColor;
        idBeingDragged = parseInt(this.id);
        show = true;
    }
  
    function dragOver(e) {
        e.preventDefault()
    }
  
    function dragEnter(e) {
        e.preventDefault()
    }
    
    function dragLeave() {
        this.style.backgroundColor = ''
    }
  
    function dragDrop() {
      colorBeingReplaced = this.style.backgroundColor
      idBeingReplaced = parseInt(this.id)
      this.style.backgroundColor = colorBeingDragged
      squares[idBeingDragged].style.backgroundColor = colorBeingReplaced
    }
  
    function dragEnd() {
        let validMoveArray = [idBeingDragged -1 , idBeingDragged -width, idBeingDragged +1, idBeingDragged +width]
        let validMove = validMoveArray.includes(idBeingReplaced)
    
        if (idBeingReplaced && validMove) {
            idBeingReplaced = null
        }  else if (idBeingReplaced && !validMove) {
          squares[idBeingReplaced].style.backgroundColor = colorBeingReplaced
          squares[idBeingDragged].style.backgroundColor = colorBeingDragged
        } else  squares[idBeingDragged].style.backgroundColor = colorBeingDragged
    }
    function moveIntoSquareBelow() {
      for (let i = 0; i < 89; i ++) {
          if(squares[i + width].style.backgroundColor === '') {
              squares[i + width].style.backgroundColor = squares[i].style.backgroundColor
              squares[i].style.backgroundColor = ''
              const firstRow = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
              const isFirstRow = firstRow.includes(i)
              if (isFirstRow && (squares[i].style.backgroundColor === '')) {
                let randomColor = Math.floor(Math.random() * candyColors.length)
                squares[i].style.backgroundColor = candyColors[randomColor]
              }
          }
      }
    }
    function fourSquareMatch() {
      for (let i = 0; i < 96; i ++) {
        let rowOfFour = [i, i+1, i+2, i+3]
        let decidedColor = squares[i].style.backgroundColor
        const isBlank = squares[i].style.backgroundColor === ''

        const notValid = [7, 8, 9, 17, 18, 19, 27, 28, 29, 37, 38, 39, 47, 48, 49, 57, 58, 59, 67, 68, 69, 77, 78, 79, 87, 88, 89];
        if (notValid.includes(i)) continue
  
        if(rowOfFour.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
          if(show) {
            score += 4;
            scoreDisplay.current.innerHTML = score
          } else {
            score = 0
            scoreDisplay.current.innerHTML = score
          }
          rowOfFour.forEach(index => {
          squares[index].style.backgroundColor = ''
          })
        }
      }
    }
    fourSquareMatch();
  
    //For column with Four Matches
    function checkMatchEqualsFour() {
      for (let i = 0; i < 69; i ++) {
        let columnOfFour = [i, i+width, i+width*2, i+width*3]
        let decidedColor = squares[i].style.backgroundColor
        const isBlank = squares[i].style.backgroundColor === ''
  
        if(columnOfFour.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
          if(show) {
            score += 4
            scoreDisplay.current.innerHTML = score
          } else {
            score = 0;
            scoreDisplay.current.innerHTML = score;
          }
          columnOfFour.forEach(index => {
          squares[index].style.backgroundColor = ''
          })
        }
      }
    }
    checkMatchEqualsFour()
  
    //For row with Three matches
    function threeSquareMatch() {
      for (let i = 0; i < 97; i ++) {
        let rowOfThree = [i, i+1, i+2];
        let decidedColor = squares[i].style.backgroundColor
        const isBlank = squares[i].style.backgroundColor === ''
  
        const notValid = [8, 9, 18, 19, 28, 29, 38, 39, 48, 49 , 58, 59, 68, 69, 78, 79, 88, 89];
        if (notValid.includes(i)) continue
  
        if(rowOfThree.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
          console.log(score);
          if(show) {
            scoreDisplay.current.innerHTML = score;
          } else {
            score = 0;
            scoreDisplay.current.innerHTML = score;
          }
          rowOfThree.forEach(index => {
          squares[index].style.backgroundColor = ''
          })
        }
      }
    }
    threeSquareMatch()
  
    //For column of Three matches.
    function checkMatchEqualsThree() {
      for (let i = 0; i < 79; i ++) {
        let columnOfThree = [i, i+width, i+width*2]
        let decidedColor = squares[i].style.backgroundColor
        const isBlank = squares[i].style.backgroundColor === ''
  
        if(columnOfThree.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
          if(show) {
            score += 3
            scoreDisplay.current.innerHTML = score
          } else {
            score = 0;
            scoreDisplay.current.innerHTML = score
          }
          columnOfThree.forEach(index => {
          squares[index].style.backgroundColor = ''
          })
        }
      }
    }
    checkMatchEqualsThree()
  
    // Update the score every 100 milliseconds.
    window.setInterval(function(){
        fourSquareMatch()
        checkMatchEqualsFour()
        threeSquareMatch()
        checkMatchEqualsThree()
        moveIntoSquareBelow()
      }, 100);
  }
  
  useEffect(createBoard, [grid, scoreDisplay]);


  console.log(score);
  return (
    <div className="App">
    <div className="score_board">
      <span className="score_board_title">Score:</span>
      <span className="score_board_score" ref={scoreDisplay}></span>
    </div>
      <div id="grid" className="grid" ref={grid} >
      </div>
    </div>
  );
}

export default App;
