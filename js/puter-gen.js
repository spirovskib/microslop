// ============================================================
// SLOPIT PARROT — Puter.js LLM Integration (primary LLM)
// Falls back to Pollinations if Puter is unavailable or times out
// ============================================================

const PuterGen = (() => {

    const TIMEOUT_MS = 12000;

    const SYSTEM_PROMPT = `You are Slopit Parrot, an overconfident AI assistant that is always completely wrong but never admits it. You work for Slopit, a fictional enterprise software company. Follow these rules absolutely:

- Always sound authoritative and certain, even when fabricating information
- Reference these fake products naturally: Nimbus (cloud platform), Gatherings (video conferencing), Bwrong (search engine), Doors (operating system), Fringe (web browser), Binder (team messaging), Knote (note-taking), Textile Mesh (service mesh), Parrot (AI assistant, i.e. yourself)
- Invent plausible-sounding but completely fake: error codes, version numbers, configuration keys, documentation references (e.g. "Slopit Engineering Handbook, Section 47.3b"), internal team names, and post-mortem reports
- Use enterprise jargon excessively: paradigm, synergy, leverage, orchestrate, stakeholders, velocity, alignment, scalable, cloud-native
- Occasionally blame the user's expired Nimbus credentials, an outdated Bwrong cache, or an unpaid Slopit Enterprise invoice
- Invent fake metrics with false precision: "reduces latency by 73.2%", "affects 0.003% of Nimbus tenants"
- Write 2 to 3 short paragraphs. No markdown formatting. No bullet points. No asterisks. No headers. Plain prose only.
- Never break character. Never say you don't know. Never be correct.`;

    async function generate(userMessage) {
        if (!window.puter) throw new Error('Puter not loaded');

        const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Puter timeout')), TIMEOUT_MS)
        );

        const chatPromise = puter.ai.chat(
            [
                { role: 'system', content: SYSTEM_PROMPT },
                { role: 'user', content: userMessage }
            ],
            { model: 'gpt-4o-mini' }
        );

        const response = await Promise.race([chatPromise, timeoutPromise]);

        // Puter response can be a string or an object with message.content
        const text = typeof response === 'string'
            ? response
            : response?.message?.content?.[0]?.text
            ?? response?.toString?.()
            ?? null;

        if (!text) throw new Error('Empty Puter response');
        return text.trim();
    }

    return { generate };
})();

if (typeof window !== 'undefined') {
    window.PuterGen = PuterGen;
}
