const pink = [247, 35, 125];
const darkblue = [26, 6, 89];
const cyan = [28, 205, 218];

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let bigTxt = {
    aboutme:{
        txt: "Hey, I'm ",
        txtEl: document.querySelector("#aboutMe"),
        txtColorchange: "Insanyngame",
        txtColorchangeEl:  document.querySelector("#aboutMeCC"),
        underlineEl: document.querySelector("#aboutMeUnderline"),
    },
    skills:{
        txt: "",
        txtEl: document.querySelector("#skills"),
        txtColorchange: "Skills",
        txtColorchangeEl:  document.querySelector("#skillsCC"),
        underlineEl: document.querySelector("#skillsUnderline"),
    },
    projects:{
        txt: "My ",
        txtEl: document.querySelector("#projects"),
        txtColorchange: "Projects",
        txtColorchangeEl:  document.querySelector("#projectsCC"),
        underlineEl: document.querySelector("#projectsUnderline"),
    },
    contactme:{
        txt: "",
        txtEl: document.querySelector("#contactme"),
        txtColorchange: "Contact Me",
        txtColorchangeEl:  document.querySelector("#contactmeCC"),
        underlineEl: document.querySelector("#contactmeUnderline"),
    }
}
console.log(document.documentElement.clientWidth);
if (window.scrollY >= document.querySelector('navbar').offsetTop-4 && document.documentElement.clientWidth > 600) {
    document.querySelector('navbar').style = "background-color: var(--darkpink);";
    document.querySelector('navbar').style.setProperty('--underlinecolor', "#F72585");
}

window.addEventListener('scroll', function() {
    if(document.documentElement.clientWidth <= 600) return;
    const stickyElement = document.querySelector('navbar');
    // navbarlist = document.querySelectorAll('navbar');
    // Check if the element is stuck (if its position relative to the viewport is 'fixed')
    if (window.scrollY >= stickyElement.offsetTop-4) {
        stickyElement.style = "background-color: var(--darkpink);";
        stickyElement.style.setProperty('--underlinecolor', "#F72585");
    } else {
        stickyElement.style = "background-color: var(--blue)";
        stickyElement.style.setProperty('--underlinecolor', "#1CCAD8");
    }
});

async function typeBigText(section) {
    for(idx of section.txt) {
        section.txtEl.innerHTML += idx;
        await delay(100);
    }
    for(idx of section.txtColorchange) {
        section.txtColorchangeEl.innerHTML += "<span class='colorchangechar'>" + idx + "</span>";
        await delay(100);
    }
    section.underlineEl.style = `
        animation-name: blinkAnim;
        animation-duration: 2s;
        animation-iteration-count: infinite;
    `;
}

// typeBigText(bigTxt.aboutme);
// typeBigText(bigTxt.projects);

document.addEventListener('mousemove', (e) => {
    let spans = document.querySelectorAll('.colorchangechar');
    spans.forEach(span => {
        let rect = span.getBoundingClientRect();
        let dx = e.clientX - (rect.left + rect.width / 2);
        let dy = e.clientY - (rect.top + rect.height / 2);
        let dist = Math.sqrt(dx * dx + dy * dy);

        let scale = Math.min(dist/100, 1);
        let color = `rgb(${cyan[0]*scale + pink[0]*(1-scale)}, ${cyan[1]*scale + pink[1]*(1-scale)}, ${cyan[2]*scale + pink[2]*(1-scale)})`;
        span.style.color = color;
    });
});

const options = {
    root: null, // null means the viewport
    rootMargin: '0px', // Margin around the root (viewport)
    threshold: 0.2 // Trigger when 50% of the element is visible
};

// Callback function for Intersection Observer
const callback = (entries, observer) => {
    entries.forEach(entry => {
    if (entry.isIntersecting) {
        console.log(entry.target);
        if(entry.target.innerHTML.startsWith('<span id="aboutMe">')) {
            typeBigText(bigTxt.aboutme);
        }
        
        if(entry.target.innerHTML.startsWith('<span id="skills">')) {
            typeBigText(bigTxt.skills);
        }

        if(entry.target.innerHTML.startsWith('<span id="projects">')) {
            typeBigText(bigTxt.projects);
        }

        if(entry.target.innerHTML.startsWith('<span id="contactme">')) {
            typeBigText(bigTxt.contactme);
        }
        // After the element appears, stop observing it
        observer.unobserve(entry.target); // Stop observing the current element
    }
    });
};

const fadeIn = (entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            console.log("a");
            entry.target.style = 'animation: fadeIn 2s; opacity: 1;';

            observer.unobserve(entry.target);
        }
    })
}

// Create an Intersection Observer instance
const observer = new IntersectionObserver(callback, options);
const fadeInObserver = new IntersectionObserver(fadeIn, options);

// Target elements to observe
const targets = document.querySelectorAll('.bigtext');
targets.forEach(target => {
    observer.observe(target); // Start observing each target
});

document.querySelectorAll('.boxItem').forEach(target => {
    fadeInObserver.observe(target);
})
document.querySelectorAll('aboutme p').forEach(target => {
    fadeInObserver.observe(target);
})
document.querySelectorAll('skills h2').forEach(target => {
    fadeInObserver.observe(target);
})

var navbarisshown = false;

if(document.documentElement.clientWidth <= 600) document.querySelector("html").style = "scroll-padding-top: 0px;";

function updateMobileNavbar() {
    if(document.documentElement.clientWidth > 600) {
        document.querySelector("html").style = "scroll-padding-top: 64px;";
        return;
    }
    document.querySelector("html").style = "scroll-padding-top: 0px;";

    let navbar = document.querySelector("navbar");
    let sandwich = document.querySelector("sandwich");

    navbarisshown = !navbarisshown;
    if(navbarisshown) {
        document.querySelector("sandwichBackground").style = 'display: block;';
        navbar.style = 'left: 20%; animation: shownavbar 0.5s;';
        sandwich.style = 'left: 20%; animation: showsandwich 0.5s;';
    } else {
        document.querySelector("sandwichBackground").style = 'display: none;';
        navbar.style = 'left: 100%; animation: hidenavbar 0.5s;';
        sandwich.style = 'left: 100%; animation: hidesandwich 0.5s;';
    }
}