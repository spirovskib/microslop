// ============================================================
// SLOPIT PARROT — Pollinations.ai LLM Integration
// Falls back gracefully to local generation on any failure
// ============================================================

const PollinationsGen = (() => {

    const API_URL = 'https://text.pollinations.ai/';
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
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [
                        { role: 'system', content: SYSTEM_PROMPT },
                        { role: 'user', content: userMessage }
                    ],
                    model: 'openai',
                    private: true
                }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            let text = await response.text();
            // Strip Pollinations promotional footer appended to free-tier responses
            const adMarker = text.indexOf('\n---\n');
            if (adMarker !== -1 && text.toLowerCase().includes('pollinations', adMarker)) {
                text = text.substring(0, adMarker);
            }
            return text.trim();
        } catch (err) {
            clearTimeout(timeoutId);
            throw err;
        }
    }

    return { generate };
})();

if (typeof window !== 'undefined') {
    window.PollinationsGen = PollinationsGen;
}
