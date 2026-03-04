// ============================================================
// MICROSLOP COPYLOT — The Hallucination Engine
// ============================================================

// State
let previousSubject = "the mainframe";
let slopData = {
    assertions: [],
    bridges: [],
    strippers: [],
    corporate: [],
    code: [],
    interrupts: [],
    sources: [],
    suggestions: []
};

// DOM refs
const chatBox = document.getElementById('chat-box');
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const submitButton = document.getElementById('submit-btn');
const dailyEl = document.getElementById('daily-hallucination');

// ============================================================
// BOOT SEQUENCE
// ============================================================

const BOOT_MESSAGES = [
    "Initializing Parrot hallucination engine...",
    "Loading deprecated APIs from Doors 4.20...",
    "Connecting to Bwrong (attempt 3 of 12)...",
    "Calibrating confidence to 'unjustified'...",
    "Indexing your private repos without consent...",
    "Warming up the Nimbus GPU farm...",
];

const TYPING_STATES = [
    "hallucinating",
    "confabulating",
    "vibing",
    "synergizing",
    "searching Bwrong",
    "checking with Binder Clip",
    "consulting the blockchain",
    "warming up the GPU farm",
    "aligning stakeholders",
    "pivoting to enterprise",
    "disrupting the paradigm",
    "generating shareholder value",
];

async function boot() {
    // Show boot messages with staggered delay
    for (let i = 0; i < BOOT_MESSAGES.length; i++) {
        await delay(500 + Math.random() * 400);
        appendSystem(BOOT_MESSAGES[i]);
    }

    // Load all data in parallel
    try {
        const files = ['assertions', 'bridges', 'strippers', 'corporate', 'code', 'interrupts', 'sources', 'suggestions'];
        const results = await Promise.all(
            files.map(f => fetch(`./data/${f}.json`).then(r => r.json()))
        );
        files.forEach((name, i) => { slopData[name] = results[i]; });

        await delay(300);
        appendSystem("All hallucination matrices loaded. Ready for input.");
        enableInput();
        generateDaily();
    } catch (err) {
        console.error("Failed to load slop data:", err);
        appendSystem("CRITICAL ERROR: Failed to load hallucination matrix. The slop cannot flow.");
    }
}

// ============================================================
// DAILY HALLUCINATION (date-seeded)
// ============================================================

function mulberry32(seed) {
    return function () {
        let t = (seed += 0x6d2b79f5);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash);
}

function generateDaily() {
    if (!dailyEl || !slopData.assertions.length) return;
    const seed = hashString(new Date().toDateString());
    const rng = mulberry32(seed);
    const assertion = pick(slopData.assertions, rng);
    const corporate = pick(slopData.corporate, rng);
    dailyEl.innerHTML = `<strong>Parrot Hallucination of the Day:</strong> It ${assertion}. ${corporate}`;
}

// ============================================================
// RESPONSE GENERATION
// ============================================================

function pick(arr, rng) {
    return arr[Math.floor((rng || Math.random)() * arr.length)];
}

function extractSubject(input) {
    let subject = input.toLowerCase();
    slopData.strippers.forEach(phrase => {
        subject = subject.replace(phrase, "");
    });
    subject = subject.replace(/\?/g, "").trim();
    return subject || "that concept";
}

function generateResponse(input) {
    const subject = extractSubject(input);
    const assertion = pick(slopData.assertions);
    const bridgeTemplate = pick(slopData.bridges);
    const bridge = bridgeTemplate.replace("{prev}", `<strong>${previousSubject}</strong>`);

    let parts = [];

    // Core response
    parts.push(`Regarding <strong>"${escapeHtml(subject)}"</strong>: It ${assertion}. ${bridge}`);

    // 40% chance: corporate slop
    if (Math.random() < 0.4 && slopData.corporate.length) {
        parts.push(pick(slopData.corporate));
    }

    // 30% chance: fake code
    if (Math.random() < 0.3 && slopData.code.length) {
        parts.push('Here\'s the recommended solution:');
        parts.push('<pre class="code-block"><code>' + escapeHtml(pick(slopData.code)) + '</code></pre>');
    }

    // 25% chance: fake source
    if (Math.random() < 0.25 && slopData.sources.length) {
        parts.push('<em class="source-cite">' + pick(slopData.sources) + '</em>');
    }

    // 15% chance: system interrupt
    const interrupt = (Math.random() < 0.15 && slopData.interrupts.length)
        ? pick(slopData.interrupts) : null;

    // 35% chance: suggested follow-ups
    let suggestions = null;
    if (Math.random() < 0.35 && slopData.suggestions.length) {
        const pool = [...slopData.suggestions];
        suggestions = [];
        for (let i = 0; i < 3 && pool.length; i++) {
            const idx = Math.floor(Math.random() * pool.length);
            suggestions.push(pool.splice(idx, 1)[0]);
        }
    }

    previousSubject = subject;

    return { html: parts.join('<br><br>'), interrupt, suggestions };
}

// ============================================================
// DOM HELPERS
// ============================================================

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function appendSystem(text) {
    const div = document.createElement('div');
    div.className = 'msg msg-system';
    div.innerHTML = `<span class="system-dot">●</span> ${text}`;
    chatBox.appendChild(div);
    scrollToBottom();
}

function appendUser(text) {
    const div = document.createElement('div');
    div.className = 'msg msg-user-row';
    div.innerHTML = `
        <div class="user-bubble">
            <div class="user-text">${escapeHtml(text)}</div>
        </div>
        <div class="avatar avatar-user">You</div>
    `;
    chatBox.appendChild(div);
    scrollToBottom();
}

function appendInterrupt(text) {
    const div = document.createElement('div');
    div.className = 'msg msg-interrupt';
    div.textContent = text;
    chatBox.appendChild(div);
    scrollToBottom();
}

function appendParrot(html, suggestions) {
    const div = document.createElement('div');
    div.className = 'msg msg-parrot-row';

    let suggestionsHtml = '';
    if (suggestions && suggestions.length) {
        suggestionsHtml = `
            <div class="suggestions">
                <div class="sug-label">Suggested follow-ups:</div>
                ${suggestions.map(q => `<button class="sug-btn" data-query="${escapeHtml(q)}">${escapeHtml(q)}</button>`).join('')}
            </div>
        `;
    }

    div.innerHTML = `
        <div class="avatar avatar-parrot">🦜</div>
        <div class="parrot-bubble">
            <div class="parrot-text">${html}</div>
            ${suggestionsHtml}
        </div>
    `;

    chatBox.appendChild(div);

    // Bind suggestion buttons
    div.querySelectorAll('.sug-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const query = btn.getAttribute('data-query');
            handleSubmit(query);
        });
    });

    scrollToBottom();
}

function showTyping() {
    const div = document.createElement('div');
    div.className = 'msg msg-parrot-row';
    div.id = 'typing-indicator';
    const state = pick(TYPING_STATES);
    div.innerHTML = `
        <div class="avatar avatar-pylot">🦜</div>
        <div class="typing-bubble">
            <span class="typing-dots"><span>●</span><span>●</span><span>●</span></span>
            <span class="typing-label">Parrot is ${state}...</span>
        </div>
    `;
    chatBox.appendChild(div);
    scrollToBottom();
}

function hideTyping() {
    const el = document.getElementById('typing-indicator');
    if (el) el.remove();
}

function scrollToBottom() {
    chatBox.scrollTop = chatBox.scrollHeight;
}

function enableInput() {
    userInput.disabled = false;
    submitButton.disabled = false;
    userInput.placeholder = "Ask Slopit Parrot anything...";
    userInput.focus();
}

function disableInput() {
    userInput.disabled = true;
    submitButton.disabled = true;
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ============================================================
// EVENT HANDLING
// ============================================================

function handleSubmit(overrideText) {
    const text = overrideText || userInput.value.trim();
    if (!text) return;

    userInput.value = '';
    appendUser(text);
    disableInput();
    showTyping();

    const thinkTime = 800 + Math.random() * 1500;
    setTimeout(() => {
        hideTyping();

        const response = generateResponse(text);

        if (response.interrupt) {
            appendInterrupt(response.interrupt);
        }

        appendParrot(response.html, response.suggestions);
        enableInput();
    }, thinkTime);
}

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    handleSubmit();
});

// ============================================================
// BOOT!
// ============================================================
boot();
