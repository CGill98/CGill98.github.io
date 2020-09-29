

//if content is wider than header container
function resize() {
    const width = window.innerWidth
    const header_container_width = width * 0.8415
    console.log("resize")
    if (header_container_width <= 406.59 + (width * 0.42075) + 2) {
        $('h1').css('display', 'block')
        $('.project-list').css('display', 'block')
        console.log("under")
    } else {
        $('h1').css('display', 'inline-block')
        $('.project-list').css('display', 'inline-block')
        console.log("over")
    }
}

window.onresize = resize