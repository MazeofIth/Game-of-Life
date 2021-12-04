var cells = []

canvas = document.getElementById("myCanvas")
var my_context = canvas.getContext('2d');
/*my_context.strokeStyle = "white"; // Draws the canvas border
my_context.rect(0, 0, 1000, 1000);
my_context.stroke();
my_context.fillStyle = "white";*/
cell_size = 20
canvas.width = window.innerWidth-50;
canvas.width -= canvas.width % cell_size 
canvas.height = window.innerHeight-150;
canvas.height -= canvas.height % cell_size 

var xvalue = 0;
var yvalue = 0;
var num_y_cells = Math.floor(canvas.height/cell_size)
var num_x_cells = Math.floor(canvas.width/cell_size)

/*window.addEventListener("resize", function(){
    canvas.setAttribute("width", window.innerWidth-50);
    canvas.setAttribute("height", window.innerHeight-150)
    num_y_cells = Math.floor(canvas.height/cell_size)
    num_x_cells = Math.floor(canvas.width/cell_size)
    newcells = []
    for (var y = 0; y < num_y_cells; y++) {
        newcells.push([])
        for (var x = 0; x < num_x_cells; x++) {
            if (cells[y]) {
                if (cells[y][x]) {
                newcells[y].push(cells[y][x])
            }
            } else {
                newcells[y].push(0)
            }
        }
    }
    console.log(newcells)
    cells = newcells
})*/

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}  

mouse_down = false

function printMousePos(event, type) {
    if (type == "down") {
        mouse_down = true
    } else if (type == "up") {
        mouse_down = false
    }
    if (mouse_down) {
    var rect = canvas.getBoundingClientRect();
    x = event.clientX - rect.left
    y = event.clientY - rect.top
    console.log(x, y)
    y = Math.floor(y/cell_size)
    x = Math.floor(x/cell_size)
    console.log(x, y)
    console.log(x, y)
    cells[y][x] = 1
}
}

function move() {
    console.log("move")
}

//canvas.addEventListener("click", printMousePos, true)
canvas.addEventListener("mousedown", function (e) {
    printMousePos(e, "down")
}, true);
canvas.addEventListener("mouseup", function (e) {
    printMousePos(e, "up")
}, true);
canvas.addEventListener("mousemove", function (e) {
    printMousePos(e, "move")
}, true);
/*canvas.addEventListener("mousedown", printMousePos("down"), true)
canvas.addEventListener("mouseup", printMousePos("up"), true)
canvas.addEventListener("mousemove", printMousePos("move"), true)*/


function initRandom() {
    cells = []
for (var y = 0; y < num_y_cells; y++) {
    cells.push([])
    for (var x = 0; x < num_x_cells; x++) {
        cells[y].push(getRandomInt(2))
    }
}
}

function initZero() {
    cells = []
    for (var y = 0; y < num_y_cells; y++) {
        cells.push([])
        for (var x = 0; x < num_x_cells; x++) {
            cells[y].push(0)
        }
    }
    }
initZero()
//initRandom()
console.log(cells)

function draw() {
    my_context.clearRect(0, 0, canvas.width, canvas.height);
    //console.log("in draw")
    isempty = true
for (var y = 0; y < cells.length; y++) {
  for (var x = 0; x < cells[y].length; x++) {
    if (cells[y][x] == 1) {
        my_context.fillStyle = "black";
        my_context.fillRect(xvalue, yvalue, 20, 20);
        isempty = false
    } else {
        my_context.fillStyle = "white";
        my_context.fillRect(xvalue, yvalue, 20, 20);
    }
    xvalue += cell_size;
  }
  xvalue = 0;
  yvalue += cell_size;
}
xvalue = 0 
yvalue = 0
if (isempty) {
    pause()
}
}

function pause() {
    clearInterval(interval)
    interval = setInterval(function() {
        draw()
      }, 10);
    //console.log("pause")
}

function start() {
    interval = setInterval(function() {
        nextIter()
        draw()
      }, speed);
}

function reset() {
    for (var y = 0; y < cells.length; y++) {
        for (var x = 0; x < cells[y].length; x++) {
            cells[y][x] = 0
        }
    }
}

function resetRandom() {
    for (var y = 0; y < cells.length; y++) {
        for (var x = 0; x < cells[y].length; x++) {
            cells[y][x] = getRandomInt(2)
        }
    }
}

function countNeighbors(x, y) {
    alive_neighbors = 0
    if (cells[y-1]) {
        if (cells[y-1][x]) {
            alive_neighbors += 1
        }
        if (cells[y-1][x+1]) {
            alive_neighbors += 1
        }
        if (cells[y-1][x-1]) {
            alive_neighbors += 1
        }
    }
    if (cells[y][x+1]) {
        alive_neighbors += 1
    } 
    if (cells[y][x-1]) {
        alive_neighbors += 1
    } 
    if (cells[y+1]) {
        if (cells[y+1][x]) {
            alive_neighbors += 1
        }
        if (cells[y+1][x+1]) {
            alive_neighbors += 1
        }
        if (cells[y+1][x-1]) {
            alive_neighbors += 1
        }
    }
    return alive_neighbors
    /*if (alive_neighbors > 1) {
        console.log(alive_neighbors)
    }*/
}

function nextIter() {
    console.log("in next iter")
    alive_neighbors_array = []
    for (var y = 0; y < cells.length; y++) {
        alive_neighbors_array.push([])
        for (var x = 0; x < cells[y].length; x++) {
            alive_neighbors = countNeighbors(x, y)
            alive_neighbors_array[y].push(alive_neighbors)

        }
    }

    console.log(alive_neighbors_array)

    for (var y = 0; y < cells.length; y++) {
        for (var x = 0; x < cells[y].length; x++) {
            if (alive_neighbors_array[y][x] < 2) {
                cells[y][x] = 0
            } else if (alive_neighbors_array[y][x] == 3) {
                cells[y][x] = 1
            } else if (alive_neighbors_array[y][x] > 3) {
                cells[y][x] = 0
            } 
        }
    }
}

/*var interval = setInterval(function() {
    draw()
    alive = countNeighbors(10, 10)
    console.log(alive)
  }, 500);*/

var speed = 100

function resetInterval() {
    clearInterval(interval)
    interval = setInterval(function() {
        nextIter()
        draw()
      }, speed);
}

function changeSpeed(value) {
    console.log("in change speed")
    speed = value
    console.log(speed)
    resetInterval()
}

function changeSize(value) {
    console.log("in change size")
    console.log(value)
    clearInterval(interval)
    cell_size = value
    num_y_cells = Math.floor(canvas.height/cell_size)
    num_x_cells = Math.floor(canvas.width/cell_size)
    canvas.width = window.innerWidth-50;
canvas.width -= canvas.width % cell_size 
canvas.height = window.innerHeight-150;
canvas.height -= canvas.height % cell_size 
    initRandom()
    console.log(cells)
    clearInterval(interval)
    //resetInterval()
}

var interval = setInterval(function() {
    //nextIter()
    draw()
  }, speed);

console.log("hello world")