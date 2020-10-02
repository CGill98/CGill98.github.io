let canvas = document.getElementById("canvas")
let ctx = canvas.getContext('2d')

let switcher = true

let Sqr_Rain_Meta = { //sqr rain meta object
    num_drops: 90,
    yVel: 0.8, //y direction velocity
    canvas_width: canvas.width,
    canvas_height: canvas.height, 
}

function generate_red(id) {
    const { num_drops } = Sqr_Rain_Meta
    if (Math.ceil(5 * num_drops / 6) < id) {
        id = id - num_drops
    }

    const dir = id < Math.ceil(num_drops / 6) ? 1 : -1 
    let red = Math.ceil((((dir * 765) / num_drops) * (id - (num_drops / 6)) + 255))
    red = red <= 0 ? 0 : red
    red = 255 < red ? 255 : red
    let red_str = red.toString(16)
    red_str = red_str.length == 1 ? "0" + red_str : red_str
    return red_str
}

function generate_green(id) {
    const { num_drops } = Sqr_Rain_Meta
    const dir = id < Math.ceil(num_drops / 2) ? 1 : -1 
    let green = Math.ceil((((dir * 765) / num_drops) * (id - (num_drops / 2)) + 255))
    green = green <= 0 ? 0 : green
    green = 255 < green ? 255 : green
    let green_str = green.toString(16)
    green_str = green_str.length == 1 ? "0" + green_str : green_str
    return green_str
}

function generate_blue(id) {
    const { num_drops } = Sqr_Rain_Meta
    if (Math.ceil(id < (num_drops / 6))) {
        id = id + num_drops
    }

    const dir = id < Math.ceil((num_drops * 5) / 6) ? 1 : -1 
    let blue = Math.ceil((((dir * 765) / num_drops) * (id - ((num_drops * 5 )/ 6)) + 255))
    blue = blue <= 0 ? 0 : blue
    blue = 255 < blue ? 255 : blue
    let blue_str = blue.toString(16)
    blue_str = blue_str.length == 1 ? "0" + blue_str : blue_str
    return blue_str
}

function generate_colour(id) {
    const { num_drops } = Sqr_Rain_Meta
    const red = generate_red(id)
    const green = generate_green(id)
    const blue = generate_blue(id)
    const colour = `#${red}${green}${blue}`
    console.log(`colours red ${red}, green ${green} blue ${blue}`)
    return colour

}


function whiten(colour_str, white_factor) {

    function whiten_colour(c_str){
        const colour = Math.ceil(255 * (white_factor) + parseInt(c_str, 16) * (1 - white_factor)).toString(16)
        return colour
    }

    const red   = whiten_colour(colour_str.slice(1, 3))
    const green = whiten_colour(colour_str.slice(3, 5))
    const blue  = whiten_colour(colour_str.slice(5, 7))
    console.log(`colours red ${red}, green ${green} blue ${blue}`)

    return `#${red}${green}${blue}`
}

class Sqr_Rain {
    constructor(id) {
        const { num_drops, canvas_width, canvas_height, yVel} = Sqr_Rain_Meta
        this.width = canvas_width / num_drops
        this.height = ((Math.random()/3) + (0.5 * Math.sin((id / num_drops) * 2 * Math.PI))) * (canvas_height / 3)
        this.xPos = (id / num_drops) * canvas_width
        this.yPos = 0 
        this.id = id
        this.yVel = yVel + Math.random() * yVel
        this.colour = generate_colour(this.id)
        this.whiter_colour = whiten(this.colour, 0.75) 
    }

    draw() {
        this.height += this.yVel 
        this.height %= canvas.height

        //droplet one hieght till end of canvas
        let my_gradient = ctx.createLinearGradient(this.width / 2, canvas.height, this.width / 2, this.height);
        my_gradient.addColorStop(1, this.whiter_colour);
        my_gradient.addColorStop(0, this.colour);
        ctx.fillStyle = my_gradient
        ctx.fillRect(this.xPos, this.height, this.width, canvas.height - this.height);

        //droplet two y: 0 to height
        my_gradient = ctx.createLinearGradient(this.width / 2, this.height, this.width / 2, 0);
        my_gradient.addColorStop(1, this.whiter_colour);
        my_gradient.addColorStop(0, this.colour);
        ctx.fillStyle = my_gradient
        ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
        
    }
}

let rain = []
for (let i = 0; i < Sqr_Rain_Meta.num_drops; i++) {
    rain.push(new Sqr_Rain(i))
}


function draw() {
    // Create gradient
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    rain.forEach((drop) => {   
        drop.draw()
    })
}

setInterval(draw, 25);