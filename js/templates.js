const page_id = $('body').attr('id')

let main_content_inside = ""
let home_prepend = "../"
let pages_prepend = ""


switch (page_id) {
    case "index":
        home_prepend = ""
        pages_prepend = "./pages/"
        break;
    case "plan-and-do":
        break;
    default: //plan-and-do-privacy
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
            <li><a href="${home_prepend}index.html">Home</a></li>
            <li><a href="${pages_prepend}plan-and-do.html">Plan and Do</a></li>
            <li><a href="#">Plan and Do</a></li>
            <li class="project-list-last"><a href="#">Plan and Do</a></li>
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
            <li><a href="${pages_prepend}plan-and-do-privacy.html">Plan and Do Privacy Policy</a></li>
        </ul>
    </div>
</div>
`
$('body').prepend(footer_wrapper)
$('body').prepend(main_content)
$('body').prepend(header_wrapper)