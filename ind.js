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
    quiz: [
        {
            q: "You see an ad saying “Get iPhone 15 for ₹499 only! Limited Stock!!” What should you do?",
            options: [
                "Click immediately — limited offer!",
                "Check the site URL and verify the company first.",
                "Share with friends so they can grab it too.",
                "Fill out the form with your address and card info."
            ],
            correct: {
                statement: "Good! Always verify the site before clicking or buying.",
                index: 1
            },
            wrong: {
                statement: "Wrong! Such unbelievable offers are usually scams."
            }
        },
        {
            q: "You visit a website that automatically starts downloading a file named 'update.exe'. What should you do?",
            options: [
                "Run it immediately — it might be a useful update.",
                "Delete it and scan your device for malware.",
                "Ignore it — it’s just a harmless file.",
                "Send it to friends to check what it is."
            ],
            correct: {
                statement: "Good! Automatic downloads are a major red flag — delete and scan your device.",
                index: 1
            },
            wrong: {
                statement: "Wrong! Unknown auto-downloads can contain malware or spyware."
            }
        },
        {
            q: "You open a website and notice the address starts with 'http://' instead of 'https://'. What should you do?",
            options: [
                "Continue — both are same.",
                "Avoid entering any personal information.",
                "Click the link quickly before it changes.",
                "Disable antivirus and continue."
            ],
            correct: {
                statement: "Good! ‘https://’ means your data is encrypted — ‘http://’ is not secure.",
                index: 1
            },
            wrong: {
                statement: "Wrong! Websites without HTTPS are unsafe for sensitive information."
            }
        },
        {
            "q": "If someone knows your password, can MFA still protect your account?",
            "options": [
                "Yes, because they still need the second factor",
                "No, if they have the password they can log in",
                "Maybe, depends on the website",
                "MFA only works for mobile apps"
            ],
            "correct": {
                "statement": "Yes, This make our account more Secure",
                "index": 0
            },
            "wrong": {
                "statement": "No, MFA protects us...<BR> they still need the second factor"
            }
        },
        {
            q: "You receive an OTP without requesting any login or transaction. What does it mean?",
            options: [
                "Someone else is trying to log in using your number.",
                "Bank is testing the system.",
                "Ignore it, it’s automatic.",
                "It’s for lucky draw verification."
            ],
            correct: {
                statement: "Good catch! Someone is trying to access your account without permission.",
                index: 0
            },
            wrong: {
                statement: "Wrong! If you didn’t request it, someone else did."
            }
        },
        {
            "q": "Why should you avoid using the same password for multiple accounts?",
            "options": [
                "Because it’s hard to remember",
                "Because if one account is hacked, all accounts are at risk",
                "Because it makes logging in faster",
                "Because websites don’t allow it"
            ],
            "correct": {
                "statement": "Right! we should not put ourself in risk",
                "index": 1
            },
            "wrong": {
                "statement": "No! because if one account is hacked, all accounts are at risk"
            }
        },
        {
            "q": "Why is it dangerous to share personal info in online quizzes or polls?",
            "options": [
                "It can be used for targeted scams or identity theft",
                "It improves your internet speed",
                "It is required by law",
                "It helps websites run faster"
            ],
            "correct": {
                "statement": "good",
                "index": 0
            },
            "wrong": {
                "statement": "wrong"
            }
        },
        {
            "q": "Which of the following is a common sign of a phishing attempt?",
            "options": [
                "Email with poor spelling and grammar",
                "Unexpected request for personal information",
                "Links with unusual URLs",
                "All of the above"
            ],
            "correct": {
                "statement": "yes! Good!",
                "index": 3
            },
            "wrong": {
                "statement": "well! but all the given options are common signs.."
            }
        },
        {
            "q": "You receive a pop-up claiming your system is outdated and you must download an update immediately. What should you do?",
            "options": [
                "Click the link and install it",
                "Ignore it and update only from official sources",
                "Share it with friends",
                "Restart the device multiple times first"
            ],
            "correct": {
                "statement": "good",
                "index": 1
            },
            "wrong": {
                "statement": "wrong"
            }
        },
        {
            "q": "Why should you be cautious when plugging in unknown USB drives?",
            "options": [
                "They can carry malware or viruses",
                "They can charge your device faster",
                "They make your computer slower",
                "They improve internet speed"
            ],
            "correct": {
                "statement": "good",
                "index": 0
            },
            "wrong": {
                "statement": "wrong"
            }
        },
        {
            "q": "Which practice helps protect your data on public Wi-Fi?",
            "options": [
                "Avoid logging into sensitive accounts",
                "Use a VPN",
                "Keep firewalls and antivirus on",
                "All of the above"
            ],
            "correct": {
                "statement": "good",
                "index": 3
            },
            "wrong": {
                "statement": "wrong"
            }
        }

    ],
    outro: "This is to spread awareness in ourself <br> thanks to interact with us!!"
}
const App = $(".app");
let pngList = [];
const cot = $(".cot")[0];
let score = 0;
cot.innerHTML = d.title

let _MainPng;
d.url.forEach((url) => {
    let src = d.dir + url;
    let png = new Image();
    png.src = src;
    let div = document.createElement("div");
    div.classList.add("floating");
    div.appendChild(png);
    App[0].appendChild(div);
    pngList.push(div)
})

const _pngL = [...pngList];
const update = () => {
    pngList.forEach((e, i) => {
        e.style.left = `${Math.random() * window.innerWidth}px`
        e.style.top = `${Math.random() * window.innerHeight}px`
    });
}
const update2 = () => {
    _MainPng = Math.floor(Math.random() * pngList.length);
    pngList.forEach((e, i) => {

        e.classList.remove("main")
        if (i == _MainPng) {
            e.classList.add("main")
        }
    });

}

let quiz = false
let x;
let int1, int2
function restart() {
    if (pngList.length != 0) {
        update()
        int1 = setInterval(update, 6000)
        update2()
        int2 = setInterval(update2, 10000)
    } else {
        setTimeout(() => {
            pngList = [..._pngL];
            changeContent(d.outro+"<br>score:"+score);
            window.onclick = null;
            update();
        }, 3000);
    }

}
function hideHome() {
    clearInterval(int1);
    clearInterval(int2);
    pngList.forEach((e, i) => {
        if (i != _MainPng) {
            e.style.top = "200%"
        }
    })

}
function showHome(str) {
    restart();
    changeContent(str || d.title)
    quiz = false;
}
let int3;
function showQuiz(Quiz) {
    pngList[_MainPng].classList.add("show");
    changeContent(question(Quiz), () => {
        int3 = setInterval(() => {
            const rect = cot.getBoundingClientRect();
            pngList[_MainPng].style.top = rect.top + "px"
            pngList[_MainPng].style.left = rect.left+(rect.width)/2 + "px"
            console.log("a")
        }, 1000);
        [...$(".option")].forEach((e, i) => {
            if (Quiz.correct.index == i) {
                e.onclick = () => {
                    hideQuiz()
                    showHome(Quiz.correct.statement);
                    score++;
                }
            } else {
                e.onclick = () => {
                    hideQuiz()
                    showHome(Quiz.wrong.statement);
                    score--;
                }
            }
        })
    })
    //correct or wrong
}
function hideQuiz() {
    clearInterval(int3);
    e = $(pngList[_MainPng]).css("top", "-200%");
    setTimeout(() => {
        e.remove();
    }, 2000)
    pngList[_MainPng] = null;
    d.quiz[_MainPng] = null;
    pngList = removeindex(_MainPng, pngList);
    d.quiz = removeindex(_MainPng, d.quiz);
}

function removeindex(index, array) {
    const arr = [];
    array.forEach((e, i) => {
        if (i != index) arr.push(e);
    })
    return arr;
}
function changeContent(content, afterhide) {
    cot.classList.add("hide");
    setTimeout(() => {
        $(".cot").html(content);
        if (afterhide) afterhide()
        setTimeout(() => {
            cot.classList.remove("hide");
        }, 1000)
    }, 1000)
}
function question(quiz) {
    return `
    <div class="question">
                ${quiz["q"]}
            </div>
            <div class="options">
                <div class="option">
                a) ${quiz.options[0]}
</div>
                <div class="option">
                b) ${quiz.options[1]}
</div>
                <div class="option">
                c) ${quiz.options[2]}
</div>
                <div class="option">
                d)${quiz.options[3]}</div>
            </div>
    `
}







$(document).ready(restart);

onclick = () => {
    // if (quiz) {
    //     hideQuiz();
    //     showHome();
    // } else {
    //     hideHome();
    //     showQuiz(d.quiz[_MainPng])
    //     console.log(pngList[_MainPng], d.quiz[_MainPng], _MainPng)
    // }
    if (!quiz && [...$(".options")].length == 0) {
        quiz = true
        hideHome();
        showQuiz(d.quiz[_MainPng])
        console.log(pngList[_MainPng], d.quiz[_MainPng], _MainPng)
    }


}
