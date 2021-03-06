
canvas = document.getElementById("myCanvas")
var my_context = canvas.getContext('2d', { alpha: false });
var cell_size = 10

canvas.width = window.innerWidth - 50;
canvas.width -= canvas.width % cell_size
canvas.height = window.innerHeight - 150;
canvas.height -= canvas.height % cell_size
my_context.fillStyle = "white";
my_context.fillRect(0, 0, canvas.width, canvas.height);

var xvalue = 0;
var yvalue = 0;
var num_y_cells = Math.floor(canvas.height / cell_size)
var num_x_cells = Math.floor(canvas.width / cell_size)
var previous_canvas = []
var speed = 100
var cells = []

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

function getWeightedRandomInt() {
    rand = Math.random();
    if (rand > 0.999) {
        return 1
    } else {
        return 0
    }
}

var mouse_down = false

var darkmode = false

function darkMode() {
    if (!darkmode) {
        darkmode = true
        document.getElementById("title").src = "darktitle.png"
        document.getElementById("darkmode").innerHTML = "Light mode"
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
        document.getElementById("darkmode").innerHTML = "Dark mode"
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
    for (var y = 0; y < num_y_cells; y++) {
        for (var x = 0; x < num_x_cells; x++) {
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
            if (!darkmode) {
                if (cells[num_x_cells * y + x]) {
                    my_context.fillStyle = "black";
                } else {
                    my_context.fillStyle = "white";
                }
            } else {
                if (cells[num_x_cells * y + x]) {
                    my_context.fillStyle = "white";
                } else {
                    my_context.fillStyle = "black";
                }
            }
            my_context.fillRect(xvalue, yvalue, cell_size, cell_size);
            isempty = false
            xvalue += cell_size;
        }
        xvalue = 0;
        yvalue += cell_size;
    }
}

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
        console.log("Alive neighbors: ", countNeighbors(cells, x, y), cells[num_x_cells * y + x])
        if (!cells[num_x_cells * y + x]) {
            console.log("change!!!")
            cells[num_x_cells * y + x] = 1
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
    cells = new Uint8Array(num_y_cells * num_x_cells);
    for (var y = 0; y < num_y_cells; y++) {
        for (var x = 0; x < num_x_cells; x++) {
            cells[num_x_cells * (y - 1) + x] = getRandomInt(2)
        }
    }
    console.log(cells)
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

var colors = []

function initColors() {
    colors = []
    for (i = 0; i < 8; i++) {
        colors.push(getRandomColor())
    }
    console.log(colors)
}

function draw() {
    var startTime = performance.now()
    isempty = true

    my_context.fillStyle = "black";
    function black(white = false) {
        for (var y = 0; y < num_y_cells; y++) {
            for (var x = 0; x < num_x_cells; x++) {
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
                cell = cells[num_x_cells * y + x]
                if (previous_canvas[num_x_cells * y + x] != cell && ((cell && !white) || (!cell && white))) {
                    /*if (!darkmode) {
                        if (cells[num_x_cells * y + x]) {
                            my_context.fillStyle = "black";
                        } else {
                            my_context.fillStyle = "white";
                        }
                    } else {
                        if (cells[num_x_cells * y + x]) {
                            my_context.fillStyle = "white";
                        } else {
                            my_context.fillStyle = "black";
                        }
                    }*/
                    if (cell && white) {
                        alive = countNeighbors(cells, x, y)
                        //my_context.fillStyle = 'rgb('+(alive+1)*20+', '+alive*28+', '+alive*15+')'; //"cyan";
                        if (!alive) {
                            my_context.fillStyle = colors[0] // "#ff1493" // pink
                        }
                        else if (alive == 1) {
                            my_context.fillStyle = colors[1] // "#065535" // dark green 
                        }
                        else if (alive == 2) {
                            my_context.fillStyle = colors[2] // '#00ff00'; // neon green
                        } else if (alive == 3) {
                            my_context.fillStyle = colors[3] // "#ff80ed"; // pinkpruple 
                        } else if (alive == 4) {
                            my_context.fillStyle = colors[4] // "#40e0d0"; // aqua 
                        } else if (alive == 5) {
                            my_context.fillStyle = colors[5] // "#800000"; // dark red
                        } else if (alive == 6) {
                            my_context.fillStyle = colors[6] // "#800080" // purple
                        } else if (alive > 7) {
                            my_context.fillStyle = colors[7] // "#ffd700" // yellow
                        }
                        my_context.fillRect(xvalue, yvalue, cell_size, cell_size);
                        my_context.fillStyle = "black";
                    } else {
                        my_context.fillRect(xvalue, yvalue, cell_size, cell_size);
                    }
                }
                //my_context.closePath();
                isempty = false
                xvalue += cell_size;
            }
            xvalue = 0;
            yvalue += cell_size;
        }
        xvalue = 0
        yvalue = 0
    }

    black()
    my_context.fillStyle = "white";
    black(true)

    if (isempty) {
        pause()
    }
    var endTime = performance.now()
    console.log(`draw() took ${endTime - startTime} milliseconds`)
}

function pause() {
    startbutton = document.getElementsByClassName("start")[0]
    console.log(darkmode)
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


function start() {
    startbutton = document.getElementsByClassName("start")[0]
    console.log(darkmode)
    pausebutton = document.getElementsByClassName("pause")[0]
    console.log(pausebutton)
    if (!darkmode) {
        startbutton.style.backgroundColor = "black"
        startbutton.style.color = "white"
    } else {
        startbutton.style.backgroundColor = "white"
        startbutton.style.color = "black"
    }
    if (!darkmode) {
        pausebutton.style.backgroundColor = "white"
        pausebutton.style.color = "black"
    } else {
        pausebutton.style.backgroundColor = "black"
        pausebutton.style.color = "white"
    }
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

function countNeighbors(cell_array, x, y) {
    let alive_neighbors = 0
    if (cell_array[num_x_cells * (y - 1) + x] == 1) {
        alive_neighbors += 1
    }
    if (cell_array[num_x_cells * (y - 1) + x + 1] == 1) {
        alive_neighbors += 1
    }
    if (cell_array[num_x_cells * (y - 1) + x - 1] == 1) {
        alive_neighbors += 1
    }
    if (cell_array[num_x_cells * y + x + 1] == 1) {
        alive_neighbors += 1
    }
    if (cell_array[num_x_cells * y + x - 1] == 1) {
        alive_neighbors += 1
    }
    if (cell_array[num_x_cells * (y + 1) + x] == 1) {
        alive_neighbors += 1
    }
    if (cell_array[num_x_cells * (y + 1) + x + 1] == 1) {
        alive_neighbors += 1
    }
    if (cell_array[num_x_cells * (y + 1) + x - 1] == 1) {
        alive_neighbors += 1
    }
    return alive_neighbors
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
    if (!play) {
        play = true
        document.getElementById("playsound").innerHTML = "Kill the beat"
    } else {
        play = false
        document.getElementById("playsound").innerHTML = "Drop the beat"
    }
}

var death_by_overpopulation = 3
var death_by_underpopulation = 2
var reproduction = 3

function changeOverpopulation() {
    death_by_overpopulation = document.getElementById("overpopulation").value
}

function changeUnderpopulation() {
    death_by_underpopulation = document.getElementById("underpopulation").value
}

function changeReproduction() {
    reproduction = document.getElementById("reproduction").value
}

function resetRules() {
    death_by_overpopulation = 3
    death_by_underpopulation = 2
    reproduction = 3
    document.getElementById("reproduction").value = 3
    document.getElementById("underpopulation").value = 2
    document.getElementById("overpopulation").value = 3
}
var alive_neighbors_array = new Uint8Array(num_y_cells * num_x_cells);

function bitMap() {
    var arr = new Uint8Array(num_y_cells * num_x_cells);
    for (var y = 0; y < 10; y++) {
        arr[y] = 1
    }
    //var Random r = new Random();
    //r.NextBytes(buffer);
    console.log(arr[5] & 0x1)
    console.log(arr)
}
bitMap()
console.log("hello world")

function copy(src) {
    var dst = new ArrayBuffer(src.byteLength);
    new Uint8Array(dst).set(new Uint8Array(src));
    return dst;
}

function initZero(frombutton = false) {
    cells = new Uint8Array(num_y_cells * num_x_cells)
    previous_canvas = JSON.parse(JSON.stringify(cells))
    my_context.fillStyle = "white";

    my_context.fillRect(0, 0, canvas.width, canvas.height);
    initColors()
}

var change_rules_interval;
var changing_rules = false;
// Even more generationalization is possible -- alive on 2, 4 (discrete!)
function changeRules() {
    var set_interval_speed = 3000
    function changeInterval() {
        change_rules_interval = setInterval(() => {
            console.log(cells.filter(i => i === 1).length < 50)
            if (cells.filter(i => i === 1).length < 10) {
                initZero()
                console.log(cells.filter(i => i === 1).length == 0)
                set_interval_speed = 300
                clearInterval(change_rules_interval);
                changeInterval()
            } else {
                clearInterval(change_rules_interval);
                set_interval_speed = 3000
                changeInterval()
            }
            console.log(set_interval_speed)
            rand = getRandomInt(3)
            /*for (var y = 0; y < num_y_cells; y++) {
                for (var x = 0; x < num_x_cells; x++) {
                    if (getWeightedRandomInt()) {
                        cells[int(num_x_cells*num_y_cells/2+y)+x] = 1 
                    }
                }
            }*/
            for (i = 0; i < 3; i++) {
                rand_y = getRandomInt(parseInt(num_y_cells/10))+parseInt(num_y_cells/2)
                rand_x = getRandomInt(parseInt(num_x_cells/10))+parseInt(num_x_cells/2)
                for (j = 0; j < 5; j++) { 
                    cells[num_x_cells * (rand_y + getRandomInt(5)) + rand_x + getRandomInt(5)] = 1
                    cells[num_x_cells * (rand_y + getRandomInt(5)) + rand_x + getRandomInt(5)] = 1
                    cells[num_x_cells * (rand_y + getRandomInt(5)) + rand_x + getRandomInt(5)] = 1    
                }
                //cells[num_x_cells * rand_y + rand_x] = 1
            }
            if (rand == 0) {
                reproduction = getRandomInt(9)
                document.getElementById("reproduction").value = reproduction
                //document.getElementById("underpopulation").value = 2
                //document.getElementById("overpopulation").value = 3        
            } else if (rand == 1) {
                underpopulation = getRandomInt(8) + 1
                document.getElementById("underpopulation").value = underpopulation
            } else if (rand == 2) {
                overpopulation = getRandomInt(9)+1
                document.getElementById("overpopulation").value = overpopulation

            }
            /*if (cells.filter(i => i === 1).length / (num_x_cells * num_y_cells) > 0.65) {
                initZero()
            }*/
        }, set_interval_speed);
    }
    if (!changing_rules) {
        changeInterval()
        changing_rules = true
    } else {
        clearInterval(change_rules_interval);
        changing_rules = false
    }
}


//changeRules()

function nextIter() {
    var startTime = performance.now()
    if (play) {
        playSound()
    }

    previous_canvas = cells.slice(0)

    for (var y = 0; y < num_y_cells; y++) {
        for (var x = 0; x < num_x_cells; x++) {
            cell = cells[num_x_cells * y + x]
            //console.log(cell)
            alive = countNeighbors(previous_canvas, x, y)
            //console.log(alive)
            if (alive < death_by_underpopulation && cell || death_by_overpopulation == 0) {
                cells[num_x_cells * y + x] = 0
            } else if (alive == reproduction && !cell) { // 3
                cells[num_x_cells * y + x] = 1
            } else if (alive > death_by_overpopulation && cell) { // 3
                cells[num_x_cells * y + x] = 0
            }
        }
    }
    var endTime = performance.now()
    //console.log(_.isEqual(previous_canvas, cells))
    console.log(`nextIter() took ${endTime - startTime} milliseconds`)
}

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
        document.getElementById("dynamiccolor").innerHTML = "Disable disco"
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
            if (coloriterations % 10 == 0) {
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
        document.getElementById("dynamiccolor").innerHTML = "Disco mode"
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
    alive_neighbors_array = new Uint8Array(num_x_cells * num_y_cells)
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
    //draw()
    initRandom()
    start()
}, speed);

console.log("hello world")