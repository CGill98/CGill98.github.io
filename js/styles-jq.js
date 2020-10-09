

//if content is wider than header container
function resize() {
    const width = window.innerWidth
    const header_container_width = width * 0.8415
    const h1_width = $('h1').width
    const header_list_width = $('.project-list').width
    //if header content cannot be contained
    if (header_container_width <= h1_width + header_list_width + 10) {
        $('h1').css('display', 'block')
        $('.project-list').css('display', 'block')
        
        //center elements
        const padding_left = ((header_container_width - header_list_width) * 0.5).toString() + '%'
        $('.project-list').css('padding-left', padding_left) 

        console.log("under")
    } else {
        $('h1').css('display', 'inline-block')
        $('.project-list').css('display', 'inline-block')
        console.log("over")
    }
}

window.onresize = resize