
const questions = [
    {
        question: "Was bedeutet Digitalisierung?",
        answers: [
            "Nur Computer herstellen",
            "Informationen und Prozesse digital verändern",
            "Das Internet ausschalten",
            "Papier drucken"
        ],
        correct: 1,
        explanation: "Richtig! Digitalisierung verändert, wie Informationen verarbeitet und Aufgaben erledigt werden."
    },
    {
        question: "Was war das ARPANET?",
        answers: [
            "Ein Smartphone",
            "Ein Computerspiel",
            "Ein wichtiger Vorläufer des Internets",
            "Ein Roboter"
        ],
        correct: 2,
        explanation: "Genau! Das ARPANET verband ab 1969 verschiedene Computer."
    },
    {
        question: "Wofür steht KI?",
        answers: [
            "Künstliche Intelligenz",
            "Kleine Information",
            "Komplexes Internet",
            "Kontrollierte Installation"
        ],
        correct: 0,
        explanation: "Richtig! KI steht für künstliche Intelligenz."
    },
    {
        question: "Was bedeutet Phishing?",
        answers: [
            "Eine Suchmaschine",
            "Eine Betrugsmasche zum Stehlen von Daten",
            "Ein Computerspiel",
            "Eine Programmiersprache"
        ],
        correct: 1,
        explanation: "Richtig! Phishing versucht, Menschen zur Preisgabe vertraulicher Daten zu bringen."
    },
    {
        question: "Was ist Cloud Computing?",
        answers: [
            "Wettervorhersage",
            "Eine Art Bildschirm",
            "Daten und Programme über entfernte Server nutzen",
            "Ein neues Betriebssystem"
        ],
        correct: 2,
        explanation: "Super! Cloud Computing ermöglicht die Nutzung von Speicher und Rechenleistung über Netzwerke."
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const feedbackElement = document.getElementById("feedback");
const nextButton = document.getElementById("nextButton");
const progress = document.getElementById("progress");
const questionNumber = document.getElementById("questionNumber");

function showQuestion() {

    answered = false;

    const q = questions[currentQuestion];

    questionElement.textContent = q.question;

    questionNumber.textContent =
        `FRAGE ${currentQuestion + 1} VON ${questions.length}`;

    progress.style.width =
        `${(currentQuestion / questions.length) * 100}%`;

    answersElement.innerHTML = "";
    feedbackElement.textContent = "";

    nextButton.disabled = true;

    q.answers.forEach((answer, index) => {

        const button = document.createElement("button");

        button.className = "answer";
        button.textContent = answer;

        button.addEventListener("click", () => {
            checkAnswer(index, button);
        });

        answersElement.appendChild(button);
    });
}


function checkAnswer(index, selectedButton) {

    if (answered) return;

    answered = true;

    const q = questions[currentQuestion];
    const allButtons = document.querySelectorAll(".answer");

    allButtons.forEach((button, i) => {
        button.disabled = true;

        if (i === q.correct) {
            button.classList.add("correct");
        }
    });

    if (index === q.correct) {

        score++;
        feedbackElement.textContent = "✓ RICHTIG! " + q.explanation;

    } else {

        selectedButton.classList.add("wrong");

        feedbackElement.textContent =
            "✕ Nicht ganz! " + q.explanation;
    }

    progress.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

    nextButton.disabled = false;

    if (currentQuestion === questions.length - 1) {
        nextButton.textContent = "ERGEBNIS ANZEIGEN ✦";
    }
}


nextButton.addEventListener("click", () => {

    if (!answered) return;

    currentQuestion++;

    if (currentQuestion < questions.length) {

        nextButton.textContent = "NÄCHSTE FRAGE →";
        showQuestion();

    } else {

        showResult();
    }
});


function showResult() {

    questionNumber.textContent = "QUIZ ABGESCHLOSSEN";
    progress.style.width = "100%";

    questionElement.textContent = "Dein Ergebnis!";

    answersElement.innerHTML = "";

    let message;

    if (score === 5) {
        message = "Unglaublich! Du bist ein Digital-Profi! 🚀";
    } else if (score >= 3) {
        message = "Sehr gut! Du kennst dich schon super aus! ✨";
    } else {
        message = "Gut gemacht! Jetzt kennst du noch mehr Fakten! 💻";
    }

    feedbackElement.textContent =
        `${score} von 5 Punkten – ${message}`;

    nextButton.textContent = "NOCH EINMAL SPIELEN ↻";
    nextButton.disabled = false;

    nextButton.onclick = () => {

        currentQuestion = 0;
        score = 0;

        nextButton.onclick = null;
        nextButton.textContent = "NÄCHSTE FRAGE →";

        nextButton.addEventListener("click", () => {
            if (answered) {
                currentQuestion++;
                if (currentQuestion < questions.length) {
                    showQuestion();
                } else {
                    showResult();
                }
            }
        }, { once: true });

        showQuestion();
    };
}

showQuestion();








/* =================================
   EASTER EGG ENGINE
================================= */

const eggUnlocked = new Set();
const eggCount = document.getElementById("eggCount");
const eggMessage = document.getElementById("eggMessage");

function unlockEgg(name, icon, title, message, effect) {
    if (eggUnlocked.has(name)) return;

    eggUnlocked.add(name);
    eggCount.textContent = eggUnlocked.size;

    const card = document.querySelector(`[data-egg="${name}"]`);
    if (card) {
        card.classList.add("unlocked");
        card.querySelector(".egg-status").textContent = "✨ Entdeckt!";
    }

    document.getElementById("eggMessageIcon").textContent = icon;
    document.getElementById("eggMessageTitle").textContent = title;
    document.getElementById("eggMessageText").textContent = message;
    eggMessage.classList.add("show");

    if (effect) effect();

    if (eggUnlocked.size === 10) {
        setTimeout(() => {
            showEggMessage(
                "👑",
                "ULTIMATE DIGITAL MASTER!",
                "Du hast alle zehn Geheimnisse entdeckt. Du bist offiziell der Easter-Egg-Champion!"
            );
        }, 1000);
    }
}

function showEggMessage(icon, title, message) {
    document.getElementById("eggMessageIcon").textContent = icon;
    document.getElementById("eggMessageTitle").textContent = title;
    document.getElementById("eggMessageText").textContent = message;
    eggMessage.classList.add("show");
}

document.getElementById("closeEgg").addEventListener("click", () => {
    eggMessage.classList.remove("show");
});

/* Logo fünfmal */

let logoClicks = 0;
const logo = document.querySelector(".header .logo");

if (logo) {
    logo.style.cursor = "pointer";
    logo.addEventListener("click", () => {
        logoClicks++;
        if (logoClicks >= 5) {
            unlockEgg("rainbow", "🌈", "REGENBOGEN-WELT!",
                "Die Website hat ihre Farben verloren ... oder gewonnen?",
                () => document.body.classList.toggle("rainbow-mode"));
            logoClicks = 0;
        }
    });
}

/* Matrix: Tastatur */

let typed = "";

document.addEventListener("keydown", event => {
    if (event.key.length === 1) {
        typed += event.key.toUpperCase();
        typed = typed.slice(-6);
    }

    if (typed === "MATRIX") {
        unlockEgg("matrix", "🕶️", "WELCOME TO THE MATRIX",
            "Du hast den geheimen Matrix-Modus aktiviert.",
            () => document.body.classList.toggle("matrix-mode"));
        typed = "";
    }
});

/* Disco: Hauptüberschrift */

let titleClicks = 0;
const mainTitle = document.querySelector(".hero h1");

if (mainTitle) {
    mainTitle.addEventListener("click", () => {
        titleClicks++;
        if (titleClicks >= 7) {
            unlockEgg("disco", "🪩", "DISCO TIME!",
                "Die Digitalisierung hat jetzt Rhythmus!",
                () => document.body.classList.toggle("disco-mode"));
            titleClicks = 0;
        }
    });
}

/* Alien: zehn Klicks auf Symbole */

let symbolClicks = 0;

document.addEventListener("click", event => {
    if (event.target.closest(".egg-center, .egg-message")) return;

    if (event.target.matches("span, strong, .ai-symbol, .core")) {
        symbolClicks++;
    }

    if (symbolClicks >= 10) {
        unlockEgg("alien", "👾", "ALIEN-ÜBERNAHME!",
            "Die Aliens sind jetzt auf deiner Website!");
        for (let i = 0; i < 8; i++) {
            const alien = document.createElement("div");
            alien.className = "egg-alien";
            alien.textContent = ["👾", "👽", "🛸"][i % 3];
            alien.style.left = Math.random() * 90 + "vw";
            alien.style.top = Math.random() * 80 + "vh";
            document.body.appendChild(alien);
            setTimeout(() => alien.remove(), 2200);
        }
        symbolClicks = 0;
    }
});

/* Doppelklick auf Überschrift */

document.querySelectorAll("h1, h2, h3").forEach(heading => {
    heading.addEventListener("dblclick", () => {
        heading.classList.remove("spin-crazy");
        void heading.offsetWidth;
        heading.classList.add("spin-crazy");

        unlockEgg("spin", "🌀", "DREHWURM!",
            "Diese Überschrift hat gerade einen Salto gemacht.");
    });
});

/* Zahl 5 */

let fiveClicks = 0;

document.querySelectorAll("body *").forEach(element => {
    if (element.children.length === 0 && element.textContent.trim() === "5") {
        element.style.cursor = "pointer";
        element.addEventListener("click", () => {
            fiveClicks++;
            if (fiveClicks >= 5) {
                unlockEgg("gravity", "🚀", "SCHWERKRAFT AUS!",
                    "Die Website schwebt jetzt!",
                    () => document.body.classList.toggle("gravity-mode"));
                fiveClicks = 0;
            }
        });
    }
});

/* Frosch-Invasion */

let footerClicks = 0;
const footer = document.querySelector("footer");

if (footer) {
    footer.addEventListener("click", () => {
        footerClicks++;
        if (footerClicks >= 3) {
            unlockEgg("frog", "🐸", "FROSCH-INVASION!",
                "Quak! Die Frösche sind los!");
            for (let i = 0; i < 12; i++) {
                const frog = document.createElement("div");
                frog.className = "egg-frog";
                frog.textContent = "🐸";
                frog.style.left = Math.random() * 95 + "vw";
                frog.style.top = Math.random() * 90 + "vh";
                document.body.appendChild(frog);
                setTimeout(() => frog.remove(), 1600);
            }
            footerClicks = 0;
        }
    });
}

/* Geheime Botschaft: DIGITAL */

let digitalClicks = 0;

document.querySelectorAll("body *").forEach(element => {
    if (element.children.length === 0 &&
        element.textContent.trim().toUpperCase() === "DIGITAL") {
        element.style.cursor = "pointer";
        element.addEventListener("click", () => {
            digitalClicks++;
            if (digitalClicks >= 3) {
                unlockEgg("secret", "🔮", "GEHEIME BOTSCHAFT",
                    "01000100 01001001 01000111 01001001 01010100 01000001 01001100");
                digitalClicks = 0;
            }
        });
    }
});

/* Hacker-Modus: Quiz-Titel */

let quizClicks = 0;
const quizTitle = document.querySelector("#quiz h2");

if (quizTitle) {
    quizTitle.style.cursor = "pointer";
    quizTitle.addEventListener("click", () => {
        quizClicks++;
        if (quizClicks >= 5) {
            unlockEgg("hacker", "💻", "HACKER-MODUS!",
                "Du hast Zugriff auf die geheime digitale Ebene!",
                () => document.body.classList.toggle("hacker-mode"));
            quizClicks = 0;
        }
    });
}

/* Emoji-Explosion bei zehn Klicks */

let totalClicks = 0;

document.addEventListener("click", event => {
    if (event.target.closest(".egg-center, .egg-message")) return;

    totalClicks++;

    if (totalClicks >= 10) {
        unlockEgg("explosion", "💥", "EMOJI-EXPLOSION!",
            "BOOM! Die Website explodiert vor Emojis!");

        const emojis = ["✨", "💥", "🚀", "🌈", "👾", "⭐", "🪩", "💜"];

        for (let i = 0; i < 18; i++) {
            const emoji = document.createElement("span");
            emoji.className = "egg-burst";
            emoji.textContent = emojis[i % emojis.length];
            emoji.style.left = event.clientX + "px";
            emoji.style.top = event.clientY + "px";
            emoji.style.setProperty("--x", (Math.random() * 300 - 150) + "px");
            emoji.style.setProperty("--y", (Math.random() * 300 - 150) + "px");
            document.body.appendChild(emoji);
            setTimeout(() => emoji.remove(), 1000);
        }

        totalClicks = 0;
    }
});

/* Klick auf die Easter-Egg-Karten zeigt die Anleitung */

document.querySelectorAll(".egg-card").forEach(card => {
    card.addEventListener("click", () => {
        showEggMessage(
            "🗝️",
            card.querySelector("h3").textContent,
            card.querySelector("p").textContent
        );
    });
});
