
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
   🎲 TOTAL RANDOM CHAOS CLICK SYSTEM
===================================== */

const chaosEffects = [
    () => {
        document.body.style.filter = `hue-rotate(${Math.random() * 360}deg)`;
        setTimeout(() => document.body.style.filter = "", 1200);
    },

    () => {
        document.body.classList.add("chaos-shake");
        setTimeout(() => document.body.classList.remove("chaos-shake"), 600);
    },

    (x, y) => {
        const emojis = ["👾", "🚀", "💜", "✨", "🐸", "🪩", "🌈", "⭐", "🍕", "🦄"];
        const item = document.createElement("div");
        item.className = "chaos-emoji";
        item.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        item.style.left = x + "px";
        item.style.top = y + "px";
        document.body.appendChild(item);
        setTimeout(() => item.remove(), 1300);
    },

    () => {
        document.querySelectorAll("h2").forEach(el => {
            el.style.transform = `rotate(${Math.random() * 12 - 6}deg)`;
            setTimeout(() => el.style.transform = "", 1000);
        });
    },

    (x, y) => {
        const messages = [
            "SYSTEM FEHLER 404 😂",
            "Du hast das Internet verwirrt!",
            "Ein Einhorn war hier 🦄",
            "DIGITAL CHAOS AKTIVIERT!",
            "Wer hat hier geklickt?!",
            "Geheime Nachricht gefunden!",
            "Du bist ein echter Hacker!",
            "Ups. Das war nicht geplant."
        ];

        const popup = document.createElement("div");
        popup.className = "chaos-popup";
        popup.textContent = messages[Math.floor(Math.random() * messages.length)];
        popup.style.left = Math.min(x, window.innerWidth - 270) + "px";
        popup.style.top = Math.min(y, window.innerHeight - 100) + "px";
        document.body.appendChild(popup);
        setTimeout(() => popup.remove(), 1800);
    },

    () => {
        const emojis = ["✨", "💥", "⭐", "💫", "🌟"];
        for (let i = 0; i < 12; i++) {
            const star = document.createElement("div");
            star.className = "chaos-star";
            star.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            star.style.left = Math.random() * 100 + "vw";
            star.style.top = Math.random() * 100 + "vh";
            document.body.appendChild(star);
            setTimeout(() => star.remove(), 1500);
        }
    },

    () => {
        const original = document.title;
        document.title = "👾 DU HAST CHAOS AUSGELÖST!";
        setTimeout(() => document.title = original, 1500);
    }
];

document.addEventListener("click", function(event) {
    // Keine Effekte beim Klicken auf die Easter-Egg-Sammlung
    if (event.target.closest("#eastereggs, #eggMessage")) return;

    const randomEffect = chaosEffects[
        Math.floor(Math.random() * chaosEffects.length)
    ];

    randomEffect(event.clientX, event.clientY);
});
