
function setCaroselImageDims() {
    $('.screenshot').css({'height': '80%'})
    const parent_width = $('.screenshot').parent().width
    const parent_height = $('.screenshot').parent().height()
    // width / height = orig width / orig height -> maintain ratio
    console.log(parent_height)
    console.log(carouselDims)
    for (let i = 0; i < $('.screenshot').length; i++) {
        const width = (carouselDims[i][0] / carouselDims[i][1]) * 0.8 * parent_height 
        console.log((carouselDims[i][0] / carouselDims[i][1]))
        console.log((carouselDims[i][0] / carouselDims[i][1]) * 0.8)
        console.log((carouselDims[i][0] / carouselDims[i][1]) * 0.8 * parent_height )
        console.log(width)
        $($('.screenshot')[i]).css({'width': width})
    }
} 


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
        const padding_left = ((header_container_width - header_list_width) * 0.9).toString() + '%'
        $('.project-list').css('padding-left', padding_left) 

        console.log("under")
    } else {
        $('h1').css('display', 'inline-block')
        $('.project-list').css('display', 'inline-block')
        console.log("over")
    }


    setCaroselImageDims()
    //$('.screenshot').css({'height': '50%', 'margin-top' : '12.5%', 'margin-bottom' : '12.5%'})

}

window.onresize = resize
setCaroselImageDims()

console.log($('.screenshot'))
