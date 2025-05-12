const pink = [247, 35, 125];
const darkblue = [26, 6, 89];
const cyan = [28, 205, 218];

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let bigText = {
    el0: document.querySelector("#bigtext1"),
    el1: document.querySelector("#bigtextcolorchange"),
    content0: "Hey, I'm ",
    content1: "Insanyngame"
}

async function typeInsanyngame() {
    for(idx of bigText.content1) {
        bigText.el1.innerHTML += "<span class='colorchangechar'>" + idx + "</span>";
        await delay(100);
    }
}

async function typeBigText() {
    for(idx of bigText.content0) {
        bigText.el0.innerHTML += idx;
        await delay(100);
    }
    await typeInsanyngame();
    // bigText.el1.innerHTML = "<span class='colorchangechar'>" + bigText.el1.innerHTML.split('').join("</span><span class='colorchangechar'>") + "</span>";
}

typeBigText().then(() => {
    document.querySelector(".underline").style = `
        animation-name: blinkAnim;
        animation-duration: 2s;
        animation-iteration-count: infinite;
    `;
})

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
