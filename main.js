var cells = []
var ruleset = []
var w = 10
var generation = 0

function generate() {
    nextgen = cells.length 
    for (let i = 0; i < cells.length; i++) {
        left = cells[i-1]
        me = cells[i]
        right = cells[i+1]
        nextgen[i] = rules[left, me, right]
    }
    cells = nextgen
    generation += 1
}

function rules(a, b, c) {
    s = ""+a+b+c
    index = parseInt(s)
    return ruleset[index]
}

/*for (let i = 0; i < cells.length; i++) {
    if (cells[i] == 1) {
        fill(0)

    }
}*/

canvas = document.getElementById("myCanvas")
var my_context = canvas.getContext('2d');
/*my_context.strokeStyle = "white"; // Draws the canvas border
my_context.rect(0, 0, 1000, 1000);
my_context.stroke();
my_context.fillStyle = "white";*/
canvas.width = window.innerWidth-50;
canvas.width -= canvas.width % 21 
canvas.height = window.innerHeight-150;
canvas.height -= canvas.height % 21 

var xvalue = 0;
var yvalue = 0;
var num_y_cells = Math.floor(canvas.height/21)
var num_x_cells = Math.floor(canvas.width/21)

/*window.addEventListener("resize", function(){
    canvas.setAttribute("width", window.innerWidth-50);
    canvas.setAttribute("height", window.innerHeight-150)
    num_y_cells = Math.floor(canvas.height/21)
    num_x_cells = Math.floor(canvas.width/21)
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

function printMousePos(event) {
    var rect = canvas.getBoundingClientRect();
    console.log(
      "clientX: " + event.clientX +
      " - clientY: " + event.clientY)
    x = event.clientX - rect.left
    y = event.clientY - rect.top
    y = Math.floor(y/21) 
    x = Math.floor(event.clientX/21)
    console.log(x, y)
    cells[y][x] = 1
}

canvas.addEventListener("click", printMousePos, true)

//cells = [1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1,1,1,1,1,0,0,1]
function initRandom() {
for (var y = 0; y < num_y_cells; y++) {
    cells.push([])
    for (var x = 0; x < num_x_cells; x++) {
        cells[y].push(getRandomInt(2))
    }
}
}

function initZero() {
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
    console.log("in draw")
for (var y = 0; y < cells.length; y++) {
  for (var x = 0; x < cells[y].length; x++) {
    if (cells[y][x] == 1) {
        console.log("in draw black")
        my_context.fillStyle = "black";
        my_context.fillRect(xvalue, yvalue, 20, 20);
    } else {
        my_context.fillStyle = "white";
        my_context.fillRect(xvalue, yvalue, 20, 20);
    }
    xvalue += 21;
  }
  xvalue = 0;
  yvalue += 21;
}
xvalue = 0 
yvalue = 0
}

function pause() {
    clearInterval(interval)
    interval = setInterval(function() {
        draw()
      }, 10);
    console.log("pause")
}

function start() {
    interval = setInterval(function() {
        nextIter()
        draw()
      }, 500);
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

speed = 500

function changeSpeed() {

}

var interval = setInterval(function() {
    nextIter()
    draw()
  }, speed);

console.log("hello world")