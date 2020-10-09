let canvas = document.getElementById("canvas")
let ctx = canvas.getContext('2d')

let switcher = true

let Sqr_Rain_Meta = { //sqr rain meta object
    num_drops: 90,
    yVel: 0.5, //y direction velocity
    canvas_width: canvas.width,
    canvas_height: canvas.height, 
}

function generate_red(id, intensity) {
    const { num_drops } = Sqr_Rain_Meta
    if (Math.ceil(5 * num_drops / 6) < id) {
        id = id - num_drops
    }

    const dir = id < Math.ceil(num_drops / 6) ? 1 : -1 
    let red = Math.ceil((((dir * (3 * intensity)) / num_drops) * (id - (num_drops / 6)) + intensity))
    red = red <= 0 ? 0 : red
    red = 255 < red ? 255 : red
    let red_str = red.toString(16)
    red_str = red_str.length == 1 ? "0" + red_str : red_str
    return red_str
}

function generate_green(id, intensity) {
    const { num_drops } = Sqr_Rain_Meta
    const dir = id < Math.ceil(num_drops / 2) ? 1 : -1 
    let green = Math.ceil((((dir * (3 * intensity)) / num_drops) * (id - (num_drops / 2)) + intensity))
    green = green <= 0 ? 0 : green
    green = 255 < green ? 255 : green
    let green_str = green.toString(16)
    green_str = green_str.length == 1 ? "0" + green_str : green_str
    return green_str
}

function generate_blue(id, intensity) {
    const { num_drops } = Sqr_Rain_Meta
    if (id < Math.ceil((num_drops / 6))) {
        id = id + num_drops
    }

    const dir = id < Math.ceil((num_drops * 5) / 6) ? 1 : -1 
    let blue = Math.ceil((((dir * (3 * intensity)) / num_drops) * (id - ((num_drops * 5 )/ 6)) + intensity))
    blue = blue <= 0 ? 0 : blue
    blue = 255 < blue ? 255 : blue
    let blue_str = blue.toString(16)
    blue_str = blue_str.length == 1 ? "0" + blue_str : blue_str
    return blue_str
}


//there a num_clrs different colours, these are equidistant from each other
//include the first and last colours which are 'connected' around the back
//each rain drop is between two colours and has a colour determined by
//its position between the two colours, the close to one the more it will be
//that colour
function generate_colour_by_pos(id, red, green, blue, pos, num_clrs) { 
    const { num_drops } = Sqr_Rain_Meta
    const clr_cutoff = Math.ceil(num_drops * pos)
    const drop_pos = id / num_drops

    //if is is before first colour 
    if (drop_pos < (1 / (num_clrs  * 2)) && pos < drop_pos) {
        id = id + num_drops
        //dir = 1
    }

    if ((((2 * num_clrs) - 1) / (2 * num_clrs)) < drop_pos && drop_pos < pos) {
        id = id - num_drops
        //dir = 1
    }
    const dir = id < clr_cutoff ? 1 : -1 

    /*
    if (Math.ceil(pos) < id && (num_drops * (num_clrs - 1) / num_clrs) < id) {
        id = id + num_drops
    }*/
    function generate_colour_weight(intensity) {
        let clr = Math.ceil((((dir * (3 * intensity)) / num_drops) * (id - clr_cutoff) + intensity))
       // console.log(`id: ${id} clr: ${clr}`)

        clr = clr < 0 ? 0 : clr
        clr = 255 < clr ? 255 : clr
        return clr 
        /*
        let clr_str = clr.toString(16)
        clr_str = clr_str.length == 1 ? "0" + clr_str : clr_str
        return clr_str*/
    }

    let red_weight = generate_colour_weight(red)
    let green_weight = generate_colour_weight(green)
    let blue_weight = generate_colour_weight(blue)
    //console.log(`${red_weight}, ${green_weight}, ${blue_weight}`)
    return {red: red_weight, green: green_weight, blue: blue_weight,}
}

function generate_colour(id) {
    //const red = generate_red(id, 255) //generate_colour_val(id, 255, 1/6, 3)
    function clr_weighter(args) {
        
        const red   = Math.ceil(args.reduce((first, second) => first + second.red, 0)) 
        const green = Math.ceil(args.reduce((first, second) => first + second.green, 0))
        const blue  = Math.ceil(args.reduce((first, second) => first + second.blue, 0))

        return {red: red, green: green, blue: blue}
    }

    function hex_stringer(clr) {
        let clr_str = clr.toString(16)
        clr_str = clr_str.length == 1 ? "0" + clr_str : clr_str
        return clr_str
    }
    /*
    const red   = generate_colour_by_pos(id, 255, 0, 0, 1/6, 3)
    const green = generate_colour_by_pos(id, 0, 255, 0, 1/2, 3)
    const blue  = generate_colour_by_pos(id, 0, 0, 255, 5/6, 3)
    */
   const clr_1 = generate_colour_by_pos(id, 0, 128, 128, 5/6, 3) //greenish
   const clr_2 = generate_colour_by_pos(id, 51, 0, 159, 3/6, 3) //purpleish
   const clr_3 = generate_colour_by_pos(id, 128, 0, 0, 1/6, 3) //red

   weighted_clrs = clr_weighter([clr_1, clr_2, clr_3])

    const clr = {
        red: hex_stringer(weighted_clrs.red), 
        green: hex_stringer(weighted_clrs.green), 
        blue: hex_stringer(weighted_clrs.blue),
    }

    //console.log(clr)
    const colour = `#${clr.red}${clr.green}${clr.blue}`
    /*
    const green = generate_green(id, 255)
    const blue = generate_blue(id, 255)
    const colour = `#${red}${green}${blue}`
    console.log(`colours red ${red}, green ${green} blue ${blue}`)*/
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
    //console.log(`colours red ${red}, green ${green} blue ${blue}`)

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
        this.whiter_colour = whiten(this.colour, 0.6) 
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