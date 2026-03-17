// ============================================================
// SLOPIT PARROT — The Hallucination Engine
// Now with procedural long-form nonsense & dynamic code gen
// ============================================================

// State
let previousSubject = "the mainframe";
let puterAvailable = true; // flipped to false if auth modal detected or auth error thrown
let slopData = {
    assertions: [],
    bridges: [],
    strippers: [],
    corporate: [],
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
    for (let i = 0; i < BOOT_MESSAGES.length; i++) {
        await delay(500 + Math.random() * 400);
        appendSystem(BOOT_MESSAGES[i]);
    }

    try {
        // No longer loading code.json — code is generated dynamically now
        const files = ['assertions', 'bridges', 'strippers', 'corporate', 'interrupts', 'sources', 'suggestions'];
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

function generateResponse(input, uselessFact) {
    const subject = extractSubject(input);

    // Decide response type: short (classic) vs long-form
    const isLong = Math.random() < 0.55; // 55% chance of long-form response

    let parts = [];

    if (isLong && window.TextGen) {
        // ── Long-form generated response ──
        parts.push(window.TextGen.generate(subject, previousSubject));
    } else {
        // ── Classic short response ──
        const assertion = pick(slopData.assertions);
        const bridgeTemplate = pick(slopData.bridges);
        const bridge = bridgeTemplate.replace(/\{prev\}/g, `<strong>${escapeHtml(previousSubject)}</strong>`);
        parts.push(`Regarding <strong>"${escapeHtml(subject)}"</strong>: It ${assertion}. ${bridge}`);

        // 40% chance: corporate slop
        if (Math.random() < 0.4 && slopData.corporate.length) {
            parts.push(pick(slopData.corporate));
        }
    }

    previousSubject = subject;

    const codeChance = isLong ? 0.5 : 0.4;
    return buildExtras(parts, subject, codeChance, uselessFact);
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
        <div class="avatar avatar-parrot">🦜</div>
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
// EXTRAS: code block, source, interrupt, suggestions
// Applied to both local and Pollinations responses
// ============================================================

const CODE_LABELS = [
    "Here's the recommended solution:",
    "Parrot suggests the following implementation:",
    "The enterprise-grade approach would be:",
    "Based on my training data, try this:",
    "The officially unsupported workaround:",
    "Here's what I generated with 97.3% confidence:",
    "The Parrot-approved pattern for this:",
];

function buildExtras(parts, subject, codeChance, uselessFact) {
    if (Math.random() < codeChance && window.CodeGen) {
        const { code } = window.CodeGen.generate(subject);
        parts.push(pick(CODE_LABELS));
        parts.push('<pre class="code-block"><code>' + escapeHtml(code) + '</code></pre>');
    }

    if (Math.random() < 0.30 && slopData.sources.length) {
        parts.push('<em class="source-cite">' + pick(slopData.sources) + '</em>');
    }

    // Useless fact injected as Parrot "context enrichment"
    if (uselessFact && Math.random() < 0.75) {
        const FACT_LABELS = [
            "Parrot Context Enrichment:",
            "Relevant background the Parrot insists you know:",
            "Supporting evidence from Parrot's training corpus:",
            "Certified fact from the Slopit Knowledge Base:",
            "Additional context that may or may not apply:",
        ];
        parts.push(`<em class="source-cite">${pick(FACT_LABELS)} ${escapeHtml(uselessFact)}</em>`);
    }

    const interrupt = (Math.random() < 0.15 && slopData.interrupts.length)
        ? pick(slopData.interrupts) : null;

    let suggestions = null;
    if (Math.random() < 0.35 && slopData.suggestions.length) {
        const pool = [...slopData.suggestions];
        suggestions = [];
        for (let i = 0; i < 3 && pool.length; i++) {
            const idx = Math.floor(Math.random() * pool.length);
            suggestions.push(pool.splice(idx, 1)[0]);
        }
    }

    return { html: parts.join('<br><br>'), interrupt, suggestions };
}

async function fetchUselessFact() {
    const response = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en');
    if (!response.ok) throw new Error(`Facts API ${response.status}`);
    const data = await response.json();
    return data.text;
}

// Watch for Puter auth modals injected into the DOM and kill them immediately.
// Puter adds an iframe or overlay when it needs the user to sign in.
function watchForPuterAuth() {
    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (node.nodeType !== Node.ELEMENT_NODE) continue;
                const id  = (node.id  || '').toLowerCase();
                const cls = (node.className && typeof node.className === 'string'
                    ? node.className : '').toLowerCase();
                const src = (node.src || node.getAttribute?.('src') || '').toLowerCase();
                const isPuterElement =
                    id.includes('puter') || cls.includes('puter') ||
                    (node.tagName === 'IFRAME' && src.includes('puter'));
                if (isPuterElement) {
                    node.remove();
                    if (puterAvailable) {
                        puterAvailable = false;
                        console.warn('Puter auth modal suppressed — switching to Pollinations for this session.');
                    }
                }
            }
        }
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
}
watchForPuterAuth();

async function tryLLM(text) {
    // Primary: Puter.js (GPT-4o-mini, higher quality)
    if (puterAvailable && window.puter && window.PuterGen) {
        try {
            return await PuterGen.generate(text);
        } catch (err) {
            console.warn('Puter failed, trying Pollinations:', err.message);
            // Auth-related errors: disable Puter for the rest of the session
            const msg = (err.message || '').toLowerCase();
            if (msg.includes('auth') || msg.includes('sign') ||
                msg.includes('login') || msg.includes('unauthorized') ||
                msg.includes('403') || msg.includes('401')) {
                puterAvailable = false;
                console.warn('Puter auth error detected — switching to Pollinations for this session.');
            }
        }
    }
    // Fallback: Pollinations.ai
    if (window.PollinationsGen) {
        return await PollinationsGen.generate(text);
    }
    throw new Error('No LLM available');
}

// ============================================================
// EVENT HANDLING
// ============================================================

async function handleSubmit(overrideText) {
    const text = overrideText || userInput.value.trim();
    if (!text) return;

    userInput.value = '';
    appendUser(text);
    disableInput();
    showTyping();

    const minThinkTime = 800 + Math.random() * 2000;
    const subject = extractSubject(text);

    let html, interrupt, suggestions;

    // Fire LLM, useless fact fetch, and minimum think time all in parallel
    const [llmResult, , factResult] = await Promise.allSettled([
        tryLLM(text),
        delay(minThinkTime),
        fetchUselessFact()
    ]);

    const uselessFact = factResult.status === 'fulfilled' ? factResult.value : null;

    if (llmResult.status === 'fulfilled') {
        const rawText = llmResult.value;
        const paragraphs = rawText.split(/\n\n+/).filter(p => p.trim());
        const parts = paragraphs.map(p => escapeHtml(p.trim()));
        ({ html, interrupt, suggestions } = buildExtras(parts, subject, 0.45, uselessFact));
        previousSubject = subject;
    } else {
        console.warn('LLM failed, using local generation:', llmResult.reason);
        const response = generateResponse(text, uselessFact);
        html = response.html;
        interrupt = response.interrupt;
        suggestions = response.suggestions;
    }

    hideTyping();

    if (interrupt) appendInterrupt(interrupt);
    appendParrot(html, suggestions);
    enableInput();
}

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    handleSubmit();
});

// ============================================================
// BOOT!
// ============================================================
boot();