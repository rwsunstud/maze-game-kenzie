let map = [
  "WWWWWWWWWWWWWWWWWWWWW",
  "W   W     W     W   W",
  "W W W WWW WWWWW W WWW",
  "W W W  W      W W   W",
  "W WWWWWWW W WWW W W W",
  "W         W     W W W",
  "W WWW WWWWW WWWWW W W",
  "W W   W   W W     W W",
  "W WWWWW W W W WWW W F",
  "S     W W W W W W WWW",
  "WWWWW W W W W W W W W",
  "W     W W W   W W W W",
  "W WWWWWWW WWWWW W W W",
  "W       W       W   W",
  "WWWWWWWWWWWWWWWWWWWWW"
];

// Render the maze to the screen

function renderMaze( ){;

  let bodyDisplay = document.querySelector("body");
  bodyDisplay.innerHTML = "";
  // loop through the map row by row
  // create a div element for each item in the row
  for(let y = 0; y < map.length; y++){
    let row = map[y];
    // console.log(row);
    let rowDisplay = document.createElement("div");
    rowDisplay.classList.add("row");
    for(let x = 0; x < row.length; x++){
      let cell = row[x];
      console.log(cell);
      
      // create div
      let cellDisplay = document.createElement("div")
      cellDisplay.classList.add("cell");
      switch( cell ){
        case "W":
          // cellDisplay.classList.add("hidden_wall");
          cellDisplay.classList.add("wall");
          break;
        case " ":
          cellDisplay.classList.add("open");
          break;
        case "S": 
          cellDisplay.classList.add("start");
          cellDisplay.innerText = "S";
          break;
        case "F":
          cellDisplay.classList.add("start");
          cellDisplay.innerText = "F";
          break;
        // case "D":
        //   cellDisplay.classList.add("wall");
        //   break;

      } // end switch

      // check if player is in the cell
      if( isPlayerCell(x, y)){
        cellDisplay.classList.add("player");
        // cellDisplay.innerText = "P";
      }

      rowDisplay.append(cellDisplay);

    } // end for cell
    bodyDisplay.append(rowDisplay);

  } // end rows

}  // end renderMaze

const finish = {
  x: 20,
  y: 8
}

const start = {
    x: 0,
    y: 9
}

let playerPosition = {
  x: start.x,
  y: start.y
};

function isPlayerCell(x, y){
  if(playerPosition.x === x &&
    playerPosition.y === y){
      return true;
    }
  return false;
}

function isNewPositionValid(x, y){
  let invalidX = x<0 || x >= map[0].length;
  let invalidY = y<0 || y >= map.length;
  // let wall = map[y][x] === "D";
  let wall = map[y][x] === "W";
  return !(invalidX || invalidY || wall );
}

function isHiddenWall(x, y){
  return map[y][x] === "W";
  
}

function isAtFinish(x, y){
  console.log(map[0].length);
  console.log(x, y);
  console.log(finish.x, finish.y)
  return x === finish.x && y === finish.y;
}

function onKeyPress(event){
    console.log("You pressed: " + event.code );
    let newX = playerPosition.x;
    let newY = playerPosition.y;

    switch( event.code ){
        case "ArrowUp":
            newY -= 1;
            break;
        case "ArrowDown":
            newY += 1;
            break;
        case "ArrowLeft":
            newX -= 1;
            break;
        case "ArrowRight":
            newX += 1;
            break;
    }
    if( isNewPositionValid(newX, newY) ){
      playerPosition.x = newX;
      playerPosition.y = newY;
      console.log(newX, newY);
    }

    // if( isHiddenWall(newX, newY)){
    //   console.log("hidden wall");
    //   playerPosition.x = start.x;
    //   playerPosition.y = start.y;
    //   let newArray = map[newY].split("");
    //   newArray[newX] = "D";
    //   map[newY] = newArray.join("");
    //   console.log("new wall" + map[newY][newX]);
    //   console.log(map);
    // }
    
    renderMaze();

   if( isAtFinish( playerPosition.x, playerPosition.y) ){
    document.removeEventListener("keydown", onKeyPress);
    let bodyDisplay = document.querySelector("body");
    let finishedDiv = document.createElement("div");
    finishedDiv.innerHTML="YOU WIN!!";
    bodyDisplay.append(finishedDiv);

   }

}

document.addEventListener("keydown", onKeyPress);


// Reset Box to starting position
// let resetBox = document.querySelector("#resetBox");

// resetBox.addEventListener("click", function(){
//     //console.log("In Reset");
//     boxTop = 200;
//     boxLeft = 200;
//     document.getElementById("box").style.top = boxTop + "px";
//     document.getElementById("box").style.left = boxLeft + "px";
// });




renderMaze();



