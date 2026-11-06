
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





/* =====================================
   DIGITAL.WORLD – EASTER EGG SYSTEM
===================================== */

const eggCards = document.querySelectorAll(".egg-card");
const eggPopup = document.getElementById("eggPopup");
const popupIcon = document.getElementById("popupIcon");
const popupTitle = document.getElementById("popupTitle");
const popupMessage = document.getElementById("popupMessage");

const unlockedEggs = new Set();

const eggData = {
    matrix: {
        icon: "🌀",
        title: "WELCOME TO THE MATRIX",
        message: "SYSTEM HACKED! Du hast den geheimen Matrix-Modus aktiviert. Willkommen in einer anderen digitalen Dimension."
    },
    rainbow: {
        icon: "🌈",
        title: "RAINBOW UNLOCKED",
        message: "WOW! Du hast die geheime Farbwelt entdeckt. DIGITAL.WORLD sieht jetzt ein bisschen anders aus!"
    },
    ai: {
        icon: "🤖",
        title: "SECRET AI ACTIVATED",
        message: "Hallo, Mensch! 🤖 Ich bin die geheime KI von DIGITAL.WORLD. Mein Geheimnis: Auch Maschinen brauchen manchmal eine Pause."
    },
    space: {
        icon: "🌌",
        title: "SPACE DIMENSION",
        message: "Du hast das geheime Weltall-Portal geöffnet. Willkommen im DIGITAL SPACE!"
    },
    ghost: {
        icon: "👻",
        title: "A GHOST IS HERE",
        message: "Buh! 👻 Du hast einen digitalen Besucher entdeckt. Er wollte nur kurz vorbeischauen."
    },
    speed: {
        icon: "⚡",
        title: "SUPER SPEED ACTIVATED",
        message: "SYSTEM OVERDRIVE! Alle Übergänge und Animationen laufen jetzt schneller."
    },
    code: {
        icon: "💻",
        title: "DEVELOPER ACCESS",
        message: "ACCESS GRANTED. Du hast den geheimen Entwickler-Modus freigeschaltet!"
    },
    neon: {
        icon: "🔮",
        title: "NEON DIMENSION",
        message: "Eine geheime Welt aus Neonlicht! Du hast die verborgene Dimension entdeckt."
    }
};


// POPUP ÖFFNEN

function showEggPopup(icon, title, message) {

    popupIcon.textContent = icon;
    popupTitle.textContent = title;
    popupMessage.textContent = message;

    eggPopup.classList.add("active");
}


// POPUP SCHLIESSEN

function closeEggPopup() {
    eggPopup.classList.remove("active");
}

document.getElementById("closeEgg").addEventListener("click", closeEggPopup);
document.getElementById("popupClose").addEventListener("click", closeEggPopup);

eggPopup.addEventListener("click", function(event) {
    if (event.target === eggPopup) {
        closeEggPopup();
    }
});


// EASTER EGG FREISCHALTEN

function unlockEgg(name) {

    if (unlockedEggs.has(name)) return;

    const data = eggData[name];

    if (!data) return;

    unlockedEggs.add(name);

    const card = document.querySelector(
        `.egg-card[data-egg="${name}"]`
    );

    if (card) {
        card.classList.add("unlocked");

        card.querySelector(".egg-status").textContent = "UNLOCKED ✦";
        card.querySelector(".egg-hint").textContent = "DISCOVERED ✓";
    }

    document.getElementById("eggCount").textContent =
        `${unlockedEggs.size} / 8`;

    showEggPopup(data.icon, data.title, data.message);
}


// AUF OSTEREI KLICKEN = ANLEITUNG ZEIGEN

eggCards.forEach(card => {

    card.addEventListener("click", function() {

        this.classList.toggle("show-hint");

    });

});


// 1. MATRIX – WORT EINTIPPEN

let matrixInput = "";

document.addEventListener("keydown", function(event) {

    if (event.key.length !== 1) return;

    matrixInput += event.key.toUpperCase();

    matrixInput = matrixInput.slice(-6);

    if (matrixInput === "MATRIX") {

        document.body.classList.toggle("matrix-mode");

        unlockEgg("matrix");

        matrixInput = "";
    }

});


// 2. RAINBOW – LOGO FÜNFMAL KLICKEN

let logoClicks = 0;
let logoClickTimer;

document.querySelector(".header .logo")
    .addEventListener("click", function() {

        logoClicks++;

        clearTimeout(logoClickTimer);

        logoClickTimer = setTimeout(() => {
            logoClicks = 0;
        }, 2000);

        if (logoClicks >= 5) {

            document.body.classList.toggle("rainbow-mode");

            unlockEgg("rainbow");

            logoClicks = 0;
        }
    });


// 3. SECRET AI – KI-SYMBOL SIEBENMAL KLICKEN

let aiClicks = 0;

document.querySelector(".ai-symbol")
    .addEventListener("click", function() {

        aiClicks++;

        if (aiClicks >= 7) {

            unlockEgg("ai");

            aiClicks = 0;
        }
    });


// 4. SPACE – STARTSYMBOL SIEBENMAL KLICKEN

let spaceClicks = 0;

document.querySelector(".core")
    .addEventListener("click", function() {

        spaceClicks++;

        if (spaceClicks >= 7) {

            document.body.classList.toggle("space-mode");

            unlockEgg("space");

            spaceClicks = 0;
        }
    });


// 5. GHOST – FOOTER-LOGO SIEBENMAL KLICKEN

let ghostClicks = 0;

document.querySelector("footer .logo")
    .addEventListener("click", function() {

        ghostClicks++;

        if (ghostClicks >= 7) {

            unlockEgg("ghost");

            const ghost = document.createElement("div");

            ghost.className = "ghost-message";
            ghost.textContent = "👻";

            document.body.appendChild(ghost);

            setTimeout(() => {
                ghost.remove();
            }, 10000);

            ghostClicks = 0;
        }
    });


// 6. SUPER SPEED – STARTÜBERSCHRIFT DOPPELKLICKEN

document.querySelector(".hero h1")
    .addEventListener("dblclick", function() {

        document.body.classList.toggle("speed-mode");

        unlockEgg("speed");

    });


// 7. DEVELOPER MODE – ABSCHLUSSÜBERSCHRIFT DREIMAL KLICKEN

let developerClicks = 0;

document.querySelector(".final-section h2")
    .addEventListener("click", function() {

        developerClicks++;

        if (developerClicks >= 3) {

            document.body.classList.toggle("developer-mode");

            unlockEgg("code");

            developerClicks = 0;
        }
    });


// 8. NEON – TECHNOLOGIE IM FOOTER ZEHNMAL KLICKEN

let neonClicks = 0;

document.querySelector("footer p")
    .addEventListener("click", function() {

        neonClicks++;

        if (neonClicks >= 10) {

            document.body.classList.toggle("neon-mode");

            unlockEgg("neon");

            neonClicks = 0;
        }
    });


// GEHEIMNISSE BEIM LADEN AKTUALISIEREN

document.getElementById("eggCount").textContent =
    `${unlockedEggs.size} / 8`;
