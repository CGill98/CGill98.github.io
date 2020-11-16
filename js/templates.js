const page_id = $('body').attr('id')

let main_content_inside = ""
let home_prepend = "../"
let pages_prepend = ""

let proj_link_class = { //project link classes
    index : "''",
    plan_and_do: "''",
    plan_and_do_privacy: "''",

}

const chartjsDims = [1132, 619]
const plannerDims = [1080, 2220]
//600 = 1600 * x ,x = 600/1600 = 6/16 = 3/8 = 0.375
const carouselDims = [chartjsDims, plannerDims]
switch (page_id) {
    case "index":
        home_prepend = ""
        pages_prepend = "./pages/"
        proj_link_class.index = "selected-link"
        main_content_inside = 
        `
        <div id='myCarousel' class='carousel-container carousel slide' data-ride='carousel'>
            <ol class="carousel-indicators">
                <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
                <li data-target="#myCarousel" data-slide-to="1"></li>
            </ol>

            <div class="carousel-inner carousel-center">
                <div class="carousel-item active">
                    <div class="project-name-container">
                        <h2 class="project-name">ChartJS Implementation</h2>
                    </div>
                    <img class="screenshot" src="./assets/images/chartjs.PNG" width="${chartjsDims[0]}" height="${chartjsDims[1]}">
                </div>    
                
                <div class="carousel-item">
                    <div class="project-name-container">
                        <h2>Plan and Do</h2>
                    </div>
                    <img class="screenshot" src="./assets/images/screenshots/phone delete.png" width="${plannerDims[0]}" height="${plannerDims[1]}">
                </div> 
            </div>

            <a class="carousel-control-prev" href="#myCarousel" data-slide="prev" role="button">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>

            <a class="carousel-control-next" href="#myCarousel" data-slide="next" role="button">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
        `
        break;
    case "plan-and-do":
        proj_link_class.plan_and_do = '"selected-link"'
        main_content_inside = 
        `
        <h2>Plan and Do <br> A React Native To-Do List App</h2>
        <img class="screenshot" src="../assets/images/screen.png" width="200">
        `
        break;
    default: //plan-and-do-privacy
        proj_link_class.plan_and_do_privacy = "selected-link"
        main_content_inside = 
            `
            <div>
                <h2>Plan and Do Privacy Policy<h2/>
                <ul class="generic-list">
                    <li>Plan and Do stores your data on your device</li>
                    <li>Plan and Do does not store your data anywhere else</li>
                    <li>Plan and Do does not sell your data to 3rd parties</li>
                    <li>Plan and Do does not use personalised adds</li>
                </ul>
            </div>
            `
        
} 


const header_wrapper =    
`
<div class="header-wrapper">
    <div class="header-container">
        <h1>Cooper Gill,<br> Mobile and Web Developer</h1>
        <ul class="project-list">
            <li><a class=${proj_link_class.index} href="${home_prepend}index.html">Home</a></li>
            <li><a class=${proj_link_class.plan_and_do} href="${pages_prepend}plan-and-do.html">Plan and Do</a></li>
            <li><a href="#">Aprender Espanol</a></li>
            <li class="project-list-last">See More</li>
        </ul>
    </div>
</div>
`

//MAIN CONTENT
const main_content = 
`
<div class="main-content p-3">
    ${main_content_inside}
</div>
`

const footer_wrapper = 
`
<div class="footer-wrapper">
    <div class="footer-container">
        <ul class="footer-list">
            <li><a class=${proj_link_class.plan_and_do_privacy} href="${pages_prepend}plan-and-do-privacy.html">Plan and Do Privacy Policy</a></li>
        </ul>
    </div>
</div>
`
const t1 = new Date()
$('body').prepend(footer_wrapper)
$('body').prepend(main_content)
$('body').prepend(header_wrapper)
const t2 = new Date()

console.log(t1.getTime())
console.log(t2.getTime())
console.log(`miliseconds: ${t2.getTime() - t1.getTime()}`)

