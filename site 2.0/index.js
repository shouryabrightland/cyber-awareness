const d = {
    title: "Cyber Awareness - think before you click",
    dir: "img/",
    url: ["ads.png",
        "download.png",
        "http.png",
        "mfa.png",
        "otp.png",
        "password.png",
        "personal.png",
        "pushing.png",
        "update.png",
        "usb.png",
        "wifi.png"],
    outro: "This is to spread awareness in ourself <br> thanks to interact with us!!"
}

//process all quiz

let questions = ((data) => {

    let lines = data.split("\n")
    let quiz = {};
    let quiz_Questions = [];
    let isquestion = false;
    let iscorrect = false;
    let iswrong = false;
    let isoption = false;
    lines.forEach((line) => {
        line = line.toLowerCase().trim().split(/[\[\]]/);
        let lineArr = []
        line.forEach((e, i) => {
            if (e != "") {
                lineArr.push(e);
            }
        })
        if (lineArr.length == 0) {
            return;
        }
        if (lineArr.includes("question")) {
            quiz.index = parseInt(lineArr[0])
            isquestion = true
        } else if (lineArr.includes("options")) {
            isoption = true;
            quiz.options = [];
        } else if (lineArr.includes("correct")) {
            isoption = false;
            iscorrect = true;
        } else if (lineArr.includes("wrong")) {
            iswrong = true;
        } else if (isquestion) {
            quiz.question = lineArr[0];
            isquestion = false
        } else if (iscorrect) {
            quiz.correct = lineArr[0];
            iscorrect = false
        }
        else if (iswrong) {
            quiz.wrong = lineArr[0];
            iswrong = false
            if (quiz_Questions[quiz.index]) {
                quiz_Questions[quiz.index].push({ ...quiz });
            }
            else {
                quiz_Questions[quiz.index] = [{ ...quiz }]
            }
        }
        else if (isoption) {
            quiz.options.push(lineArr[0])
            if (lineArr.includes("c")) {
                quiz.correctIndex = quiz.options.length - 1
            }
        }
    })
    return quiz_Questions;
})(data)
let description = ((dec) => {
    let description = [];
    let index;
    dec.split("\n").forEach((line, i) => {
        let linearr = [];
        line.toLowerCase().trim().split(/[\[\]]/).forEach((term, i) => {
            if (term != "") linearr.push(term)
        })
        if (linearr.length == 0) return;
        if (linearr.length == 2) {
            index = linearr[0];
            let title = linearr[1];
            description[index] = { index: parseInt(index), index, title: title }
        } else {
            description[index].description = linearr[0]


        }
    })
    return description;
})(dec)
let intros = ((intro) => {
    let intrarr = []
    intro.toLowerCase().trim().split("\n").forEach((e, i) => {
        e = e.trim();
        if (e != "") {
            intrarr.push(e);
        }
    })
    return intrarr
})(intro)

const App = $(".app");
const cot = $(".cot");
let updateIntervals = [];
let pngList = [];
let MainPng;
let state = 0;
let isQuiz = false;
let score = 0
d.url.forEach((e, i) => {
    let png = $(`<div class="floating"><img src="${d.dir + e}"></div>`);
    png._index = i;
    if (Math.random()*2 < 1) {
        App.append(png);
        pngList.push(png);
    }
})
function update() {
    pngList.forEach((png, i) => {
        png.css("top", `${Math.random() * window.innerHeight}px`)
        png.css("left", `${Math.random() * window.innerWidth}px`)
    })
}
function update2() {
    if (!isQuiz) {
        MainPng = Math.floor(Math.random() * pngList.length);
    }
    pngList.forEach((e) => e.removeClass("main"))
    pngList[MainPng]?.addClass("main");
}
function stopUpdates() {
    updateIntervals.forEach((e) => clearInterval(e))
    updateIntervals = [];
}
function startUpdates(...updates) {

    updates.forEach((e) => {
        e[0]();
        updateIntervals.push(setInterval(e[0], e[1]))
    })
}
function changecontent(content, afterHide) {
    cot.addClass("hide");
    setTimeout(() => {
        cot.html(content);
        if (afterHide) afterHide();
        cot.removeClass("hide");
    }, 1000)
}
function getDescription(index) {
    return `
        ${description[index].title}
        <p>${description[index].description}</p>
    `
}
function question(quest) {
    return `
        <div class="question">
                ${quest.question}
            </div>
            <div class="options">
                <div class="option">
                a) ${quest.options[0]}
</div>
                <div class="option">
                b) ${quest.options[1]}
</div>
                <div class="option">
                c) ${quest.options[2]}
</div>
                <div class="option">
                d)${quest.options[3]}</div>
            </div>
    `
}



function introduction() {
    stopUpdates();
    changecontent(intros[Math.floor(Math.random() * intros.length)] + "<br>[click to continue]");
    state = 1;
}
function putSections(index) {
    stopUpdates();
    pngList.forEach((e, i) => {
        if (MainPng != i) {
            e.css("top", `200%`);
            e.removeClass("show");
        }
    })
    changecontent(getDescription(index), () => {
        startUpdates([() => {
            let config = cot[0].getBoundingClientRect();
            pngList[MainPng]?.css("top", `${config.top}px`)
            pngList[MainPng]?.css("left", `${config.left + (config.width) / 2}px`)
            pngList[MainPng]?.addClass("show");
        }, 1000])
        state = 2;
    })
}
function startQuiz(index) {
    isQuiz = true
    quiz = questions[index][Math.floor(Math.random() * questions[index].length)];
    changecontent(question(quiz), () => {
        [...$(".option")].forEach((e, i) => {
            e.onclick = () => {
                stopUpdates();
                pngList[MainPng].addClass("hide");
                const element = pngList[MainPng];
                setTimeout(() => {
                    element.remove();
                }, 4000)

                const newPngList = [];
                pngList.forEach((e, i) => {
                    if (i != MainPng) newPngList.push(e);
                })
                pngList = newPngList;
                if (i == quiz.correctIndex) {
                    changecontent(quiz.correct, () => {
                        score++;
                        startUpdates([update, 5000], [update2, 6000])
                        isQuiz = false
                    })
                } else {
                    changecontent(quiz.wrong, () => {
                        score--;
                        startUpdates([update, 5000], [update2, 6000])
                        isQuiz = false
                    })
                }
                state = 1

            }
        })
    })
}

changecontent(d.title, () => startUpdates([update, 5000], [update2, 6000]))

$(document).ready(() => {
    onclick = () => {
        if (!isQuiz) {
            if (pngList.length==0) {
                changecontent(d.outro+"<br>score:"+score);
                window.onclick = null;
            }
            if (state == 0) {//home page
                introduction();
            } else if (state == 1) {//intro page
                putSections(pngList[MainPng]._index);
            } else if (state == 2) {
                startQuiz(pngList[MainPng]._index);
            }
            
        }

    }

});

