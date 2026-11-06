
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



const appWindow = document.getElementById("appWindow");
const appTitle = document.getElementById("appTitle");
const appContent = document.getElementById("appContent");

function openApp(app) {
    appWindow.style.display = "block";

    const apps = {
        chat: {
            title: "💬 Mini-Chatbot",
            html: `
                <h3>Hallo! Ich bin DigiBot.</h3>
                <p>Stelle mir eine Frage über die digitale Welt!</p>
                <input id="chatInput" placeholder="Schreibe etwas...">
                <button onclick="chatReply()">Senden</button>
                <div class="app-result" id="chatResult">Warte auf deine Nachricht...</div>
            `
        },

        password: {
            title: "🔐 Passwort-Labor",
            html: `
                <h3>Wie sicher ist dein Passwort?</h3>
                <p>Teste ein erfundenes Passwort – niemals dein echtes!</p>
                <input id="passInput" type="text" placeholder="Erfundenes Passwort">
                <button onclick="checkPassword()">Analysieren</button>
                <div class="app-result" id="passResult"></div>
            `
        },

        ai: {
            title: "🤖 Emoji-KI",
            html: `
                <h3>Dein Emoji-Kunstwerk</h3>
                <p>Schreibe ein Thema und erfinde ein digitales Bild daraus.</p>
                <input id="aiInput" placeholder="Zum Beispiel: Weltraum">
                <button onclick="makeAI()">Generieren</button>
                <div class="app-result" id="aiResult">✨ Dein Kunstwerk erscheint hier!</div>
            `
        },

        search: {
            title: "🌐 Mini-Suchmaschine",
            html: `
                <h3>Digitales Lexikon</h3>
                <p>Suche nach einem Begriff aus der digitalen Welt.</p>
                <input id="searchInput" placeholder="z. B. Internet">
                <button onclick="miniSearch()">Suchen</button>
                <div class="app-result" id="searchResult"></div>
            `
        },

        game: {
            title: "🎮 Zahlen-Spiel",
            html: `
                <h3>Errate die Zahl!</h3>
                <p>Ich denke an eine Zahl zwischen 1 und 10.</p>
                <input id="guessInput" type="number" min="1" max="10" placeholder="Dein Tipp">
                <button onclick="guessNumber()">Raten</button>
                <div class="app-result" id="gameResult"></div>
            `
        },

        terminal: {
            title: "⌨️ Geheim-Terminal",
            html: `
                <h3> SYSTEM TERMINAL</h3>
                <p>Gib einen Befehl ein:</p>
                <input id="terminalInput" placeholder="help">
                <button onclick="runTerminal()">Ausführen</button>
                <div class="app-result" id="terminalResult">Terminal bereit...</div>
            `
        }
    };

    appTitle.textContent = apps[app].title;
    appContent.innerHTML = apps[app].html;
}

function closeApp() {
    appWindow.style.display = "none";
}

function chatReply() {
    const input = document.getElementById("chatInput").value.toLowerCase();
    let reply = "Spannende Frage! Das Internet verbindet Computer auf der ganzen Welt.";

    if (input.includes("hallo") || input.includes("hi")) {
        reply = "Hallo! Schön, dass du im Digital Lab bist! 👋";
    } else if (input.includes("ki") || input.includes("künstliche intelligenz")) {
        reply = "KI erkennt Muster in Daten und kann damit Texte, Bilder und vieles mehr erzeugen.";
    } else if (input.includes("internet")) {
        reply = "Das Internet ist ein weltweites Netzwerk aus miteinander verbundenen Geräten.";
    } else if (input.includes("passwort")) {
        reply = "Ein gutes Passwort ist lang, einzigartig und schwer zu erraten.";
    } else if (input.includes("computer")) {
        reply = "Computer verarbeiten Informationen mithilfe von Hardware und Software.";
    }

    document.getElementById("chatResult").textContent = "DigiBot: " + reply;
}

function checkPassword() {
    const pass = document.getElementById("passInput").value;
    let score = 0;

    if (pass.length >= 12) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[a-z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    let result = "Noch ausbaufähig 🔎";
    if (score >= 4) result = "Sieht für dieses Beispiel ziemlich stark aus! 🛡️";
    else if (score >= 2) result = "Schon ein Anfang – noch stärker möglich! 💡";

    document.getElementById("passResult").textContent =
        result + " (" + score + "/5 Kriterien)";
}

function makeAI() {
    const topic = document.getElementById("aiInput").value.toLowerCase();

    let art = "✨ 🌈 💫 ⭐ 🌟";

    if (topic.includes("weltraum")) art = "🚀 🌌 🪐 👽 ✨ 🌠";
    if (topic.includes("tier")) art = "🐼 🦊 🐸 🦋 🐢 🌿";
    if (topic.includes("meer")) art = "🐬 🐠 🪸 🐙 🌊 🐚";
    if (topic.includes("natur")) art = "🌳 🌻 🍄 🦋 🌈 🌱";
    if (topic.includes("computer")) art = "💻 🤖 💾 🖥️ 🔌 🌐";

    document.getElementById("aiResult").textContent =
        "Dein KI-Kunstwerk zu „" + topic + "“: " + art;
}

function miniSearch() {
    const term = document.getElementById("searchInput").value.toLowerCase();

    const facts = {
        internet: "Das Internet verbindet Milliarden Geräte weltweit.",
        ki: "Künstliche Intelligenz kann Muster erkennen und Aufgaben bearbeiten.",
        computer: "Ein Computer verarbeitet Daten und führt Programme aus.",
        algorithmus: "Ein Algorithmus ist eine genaue Folge von Anweisungen.",
        cloud: "Cloud-Dienste speichern Daten auf entfernten Servern.",
        roboter: "Roboter können Aufgaben automatisch ausführen."
    };

    document.getElementById("searchResult").textContent =
        facts[term] || "Dazu habe ich in diesem kleinen Lexikon noch keinen Eintrag. Versuche: Internet, KI, Computer, Algorithmus, Cloud oder Roboter.";
}

let secretNumber = Math.floor(Math.random() * 10) + 1;

function guessNumber() {
    const guess = Number(document.getElementById("guessInput").value);
    let message = "Versuche es noch einmal!";

    if (guess === secretNumber) {
        message = "RICHTIG! 🎉 Du hast die Zahl gefunden!";
        secretNumber = Math.floor(Math.random() * 10) + 1;
    } else if (guess < secretNumber) {
        message = "Die gesuchte Zahl ist grösser! ⬆️";
    } else if (guess > secretNumber) {
        message = "Die gesuchte Zahl ist kleiner! ⬇️";
    }

    document.getElementById("gameResult").textContent = message;
}

function runTerminal() {
    const command = document.getElementById("terminalInput").value.toLowerCase().trim();

    const commands = {
        help: "Befehle: help, hello, date, system, secret",
        hello: "Hallo, digitale Entdeckerin! 👋",
        date: "SYSTEM ZEIT: " + new Date().toLocaleString("de-CH"),
        system: "DIGITAL LAB – Alles läuft! Version 2.0",
        secret: "🔓 GEHEIMNIS ENTDECKT: Du bist jetzt Ehrenmitglied des Digital Labs!"
    };

    document.getElementById("terminalResult").textContent =
        commands[command] || "Unbekannter Befehl. Tippe help.";
}

function updateClock() {
    document.getElementById("clock").textContent =
        new Date().toLocaleTimeString("de-CH", {
            hour: "2-digit",
            minute: "2-digit"
        });
}

updateClock();
setInterval(updateClock, 1000);
