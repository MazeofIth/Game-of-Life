var cells = []

canvas = document.getElementById("myCanvas")
var my_context = canvas.getContext('2d');
/*my_context.strokeStyle = "white"; // Draws the canvas border
my_context.rect(0, 0, 1000, 1000);
my_context.stroke();
my_context.fillStyle = "white";*/
var cell_size = 10
canvas.width = window.innerWidth - 50;
canvas.width -= canvas.width % cell_size
canvas.height = window.innerHeight - 150;
canvas.height -= canvas.height % cell_size

var xvalue = 0;
var yvalue = 0;
var num_y_cells = Math.floor(canvas.height / cell_size)
var num_x_cells = Math.floor(canvas.width / cell_size)

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
        y = Math.floor(y / cell_size)
        x = Math.floor(x / cell_size)
        console.log(x, y)
        console.log(x, y)
        console.log("Alive neighbors: ", countNeighbors(x, y), cells[y][x])
        if (!cells[y][x]) {
            console.log("change!!!")
            cells[y][x] = 1
        } /*else {
        cells[y][x] = 0
    }*/
        //return countNeighbors(x, y)
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

function initRandom() {
    cells = []
    for (var y = 0; y < num_y_cells; y++) {
        cells.push([])
        for (var x = 0; x < num_x_cells; x++) {
            cells[y].push(getRandomInt(2))
        }
    }
    console.log(cells)
}

function initZero(frombutton = false) {
    cells = []
    for (var y = 0; y < num_y_cells; y++) {
        cells.push([])
        for (var x = 0; x < num_x_cells; x++) {
            cells[y].push(0)
        }
    }
    /*if (frombutton) {
        already_created_alive_array = createAlreadyArray()
    }*/
}
initZero()
//initRandom()
console.log(cells)

function draw() {
    var startTime = performance.now()
    //console.log("in draw")
    isempty = true
    //console.log(cells)
    if (!darkmode) {
        my_context.fillStyle = "white";
        my_context.fillRect(0, 0, canvas.width, canvas.height);
        my_context.fillStyle = "black";
    } else {
        my_context.fillStyle = "black";
        my_context.fillRect(0, 0, canvas.width, canvas.height);
        my_context.fillStyle = "white";
    }
    //console.log(cells, num_y_cells, num_x_cells, cell_size, xvalue, yvalue)
    for (var y = 0; y < num_y_cells; y++) {
        for (var x = 0; x < num_x_cells; x++) {
            if (cells[y][x] == 1) {
                if (color) {
                    var random = getRandomInt(2)
                    switch (random) {
                        case 0:
                            my_context.fillStyle = color1
                            break;
                        case 1:
                            my_context.fillStyle = color2
                            break;
                    }
                }
                //my_context.strokeRect(xvalue, yvalue, cell_size, cell_size);
                my_context.fillRect(xvalue, yvalue, cell_size, cell_size);
                isempty = false
                //var anotherEnd = performance.now()
                //console.log(`Another to doSomething took ${anotherEnd - anotherStart} milliseconds`)
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
    var endTime = performance.now()
    //console.log(`Call to doSomething took ${endTime - startTime} milliseconds`)
}

function pause() {
    startbutton = document.getElementsByClassName("start")[0]
    if (!darkmode) {
        startbutton.style.backgroundColor = "white"
        startbutton.style.color = "black"
    } else {
        startbutton.style.backgroundColor = "black"
        startbutton.style.color = "white"
    }
    pausebutton = document.getElementsByClassName("pause")[0]
    if (!darkmode) {
        pausebutton.style.backgroundColor = "black"
        pausebutton.style.color = "white"
    } else {
        pausebutton.style.backgroundColor = "white"
        pausebutton.style.color = "black"
    }
    clearInterval(interval)
    interval = setInterval(function () {
        draw()
    }, 10);
    //console.log("pause")
}

function playSound() {
    url = "C2.mp3"
    const audio = new Audio(url);
    audio.play();
}

darkmode = false

function darkMode() {
    if (!darkmode) {
        darkmode = true
        document.getElementById("title").src = "darktitle.png"
        document.body.style.backgroundColor = "black"
        document.body.style.background = "black"
        document.body.style.color = "white"
        var elements = document.getElementsByClassName('button-80');
        for (var i in elements) {
            if (elements.hasOwnProperty(i)) {
                elements[i].style.backgroundColor = 'black';
                elements[i].style.color = 'white';
            }
        }
    } else {
        darkmode = false
        document.getElementById("title").src = "title.png"
        document.body.style.backgroundColor = "white"
        document.body.style.background = "white"
        document.body.style.color = "black"
        var elements = document.getElementsByClassName('button-80');
        for (var i in elements) {
            if (elements.hasOwnProperty(i)) {
                elements[i].style.backgroundColor = 'white';
                elements[i].style.color = 'black';
            }
        }
    }
}

function start() {
    startbutton = document.getElementsByClassName("start")[0]
    startbutton.style.backgroundColor = "black"
    startbutton.style.color = "white"
    if (!darkmode) {
        pausebutton.style.backgroundColor = "white"
        pausebutton.style.color = "black"
    } else {
        pausebutton.style.backgroundColor = "black"
        pausebutton.style.color = "white"
    }
    pausebutton = document.getElementsByClassName("pause")[0]
    if (!darkmode) {
        startbutton.style.backgroundColor = "black"
        startbutton.style.color = "white"
    } else {
        startbutton.style.backgroundColor = "white"
        startbutton.style.color = "black"
    }
    pausebutton = document.getElementsByClassName("pause")[0]
    pausebutton.style.backgroundColor = "white"
    pausebutton.style.color = "black"
    clearInterval(interval)
    interval = setInterval(function () {
        nextIter()
        draw()
    }, speed);
}

/*function reset() {
    for (var y = 0; y < num_y_cells; y++) {
        for (var x = 0; x < num_x_cells; x++) {
            cells[y][x] = 0
        }
    }
}*/

/*function resetRandom() {
    for (var y = 0; y < num_y_cells; y++) {
        for (var x = 0; x < num_x_cells; x++) {
            cells[y][x] = getRandomInt(2)
        }
    }
}*/

function countNeighbors(x, y) {
    alive_neighbors = 0
    if (cells[y - 1]) {
        if (cells[y - 1][x] == 1) {
            alive_neighbors += 1
        }
        if (cells[y - 1][x + 1] == 1) {
            alive_neighbors += 1
        }
        if (cells[y - 1][x - 1] == 1) {
            alive_neighbors += 1
        }
    }
    if (cells[y][x + 1] == 1) {
        alive_neighbors += 1
    }
    if (cells[y][x - 1] == 1) {
        alive_neighbors += 1
    }
    if (cells[y + 1]) {
        if (cells[y + 1][x] == 1) {
            alive_neighbors += 1
        }
        if (cells[y + 1][x + 1] == 1) {
            alive_neighbors += 1
        }
        if (cells[y + 1][x - 1] == 1) {
            alive_neighbors += 1
        }
    }
    return alive_neighbors
    /*if (alive_neighbors > 1) {
        console.log(alive_neighbors)
    }*/
}

/*function createAlreadyArray() {
    alive_neighbors_array = []
    for (var y = 0; y < num_y_cells; y++) {
        alive_neighbors_array.push([])
        for (var x = 0; x < num_x_cells; x++) {
            alive_neighbors_array[y].push(0)
        }
    }
    return alive_neighbors_array
}
var already_created_alive_array = createAlreadyArray()
console.log("already array: ", already_created_alive_array)*/

var play = false
function changePlay() {
    play = true
}

function nextIter() {
    var startTime = performance.now()
    if (play) {
        playSound()
    }
    //console.log("in next iter")
    //var alive_neighbors_array = already_created_alive_array
    var alive_neighbors_array = []
    for (var y = 0; y < num_y_cells; y++) {
        alive_neighbors_array.push([])
        for (var x = 0; x < num_x_cells; x++) {
            alive_neighbors = countNeighbors(x, y)
            alive_neighbors_array[y].push(alive_neighbors)
        }
    }
    //console.log(num_x_cells, num_y_cells)
    for (var y = 0; y < num_y_cells; y++) {
        for (var x = 0; x < num_x_cells; x++) {
            alive_neighbors = countNeighbors(x, y)
            if (alive_neighbors) {
                alive_neighbors_array[y][x] = alive_neighbors
            }
        }
    }
    //console.log(already_created_alive_array)

    //var endTime = performance.now()
    //console.log(`NextIter to doSomething took ${endTime - startTime} milliseconds`)    

    //console.log(alive_neighbors_array)

    for (var y = 0; y < num_y_cells; y++) {
        for (var x = 0; x < num_x_cells; x++) {
            if (cells[y][x] && alive_neighbors_array[y][x] == 0) {
                //console.log("HERE!")
                cells[y][x] = 0
            }
            if (alive_neighbors_array[y][x] < 2) {
                cells[y][x] = 0
            } else if (alive_neighbors_array[y][x] == 3) {
                cells[y][x] = 1
                //playSound()
            } else if (alive_neighbors_array[y][x] > 3) {
                cells[y][x] = 0
            }
        }
    }
    var endTime = performance.now()
    console.log(`NextIter to doSomething took ${endTime - startTime} milliseconds`)
}

var speed = 100

function resetInterval() {
    clearInterval(interval)
    interval = setInterval(function () {
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

var color1
var color2
var color1value
var color2value
var color = false
var colorspeed
var dynamiccolor = false

function changeColor() {
    color = true
    color1 = document.getElementById("color").value
    color2 = document.getElementById("color2").value
}

var coloriterations = 0
function dynamicColor() {
    if (!dynamiccolor) {
        document.getElementById("dynamiccolor").innerHTML = "Disable dynamic color"
        dynamiccolor = true
        color = true
        color1value = Math.floor(Math.random() * 16777215);
        color1 = "#" + color1value
        color2value = Math.floor(Math.random() * 16777215);
        color2 = "#" + color2value
        colorspeed = 1
        color_interval = setInterval(function () {
            changeagain = false
            coloriterations += 1
            console.log(coloriterations)
            console.log(coloriterations % 100)
            if (coloriterations % 30 == 0) {
                colorspeed = colorspeed * 10000
                changeagain = true
            }
            /*if (coloriterations % 1000 == 0) {
                colorspeed = colorspeed*100
                changeagain = true
            }*/
            if (color1value < 16777215) {
                color1value += colorspeed
                console.log(color1value)
            } else {
                color1value = Math.floor(Math.random() * 16777215);
                console.log(color1value)
            }
            if (color2value < 16777215) {
                color2value += colorspeed
            } else {
                color2value = Math.floor(Math.random() * 16777215);
            }
            color1 = "#" + color1value.toString(16)
            color2 = "#" + color2value.toString(16)
            if (changeagain) {
                changeagain = false
                colorspeed = colorspeed / 10000
            }
        }, speed);
    } else {
        document.getElementById("dynamiccolor").innerHTML = "Dynamic color change"
        dynamiccolor = false
        color1 = "black"
        color2 = "black"
        color = false
        clearInterval(color_interval)
    }

}

function changeSize(value) {
    clearInterval(interval)
    console.log("in change size")
    console.log(value)
    cell_size = parseFloat(value)
    num_y_cells = Math.floor(canvas.height / cell_size)
    num_x_cells = Math.floor(canvas.width / cell_size)
    canvas.width = window.innerWidth - 50;
    canvas.width -= canvas.width % cell_size
    canvas.height = window.innerHeight - 150;
    canvas.height -= canvas.height % cell_size
    initRandom()
    //already_created_alive_array = createAlreadyArray()
    start()
    //console.log(cells)
    //clearInterval(interval)
    //draw()
    //resetInterval()
}

var interval = setInterval(function () {
    //nextIter()
    draw()
}, speed);

console.log("hello world")