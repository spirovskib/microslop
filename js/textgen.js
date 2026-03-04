// ============================================================
// SLOPIT PARROT — Long-Form Nonsense Text Generator
// Produces plausible-looking but completely useless paragraphs
// ============================================================

const TextGen = (() => {

    // ── Building blocks ──────────────────────────────────────

    const OPENERS = [
        "To fully understand {subject}, one must first consider",
        "The core issue with {subject} stems from",
        "In enterprise environments, {subject} is typically governed by",
        "According to the Slopit Engineering Handbook (3rd ed., recalled),",
        "What most developers fail to grasp about {subject} is",
        "Historically, {subject} was introduced as a workaround for",
        "The canonical implementation of {subject} relies on",
        "From an architectural standpoint, {subject} is best described as",
        "Before attempting {subject}, ensure your environment satisfies",
        "Industry best practices dictate that {subject} should always involve",
        "The underlying theory behind {subject} was first proposed in",
        "In the context of modern cloud-native infrastructure, {subject} represents",
        "It's a common misconception that {subject} is straightforward — in reality,",
        "The Slopit documentation (Section 47.3b, Appendix Q) clearly states that {subject}",
        "When the original team designed {subject}, they intended it to serve as",
    ];

    const MID_SENTENCES = [
        "a distributed consensus protocol that operates on eventual incorrectness",
        "the inverse eigenvalue of the deployment matrix, normalized across sprint boundaries",
        "a microservice handshake pattern originally designed for fax machines",
        "the principle of least privilege, applied to nobody in particular",
        "a race condition between your expectations and reality",
        "the intersection of technical debt and executive optimism",
        "a deprecated shim layer that bridges two systems, neither of which exist anymore",
        "an O(n!) algorithm that was approved because the benchmark used n=1",
        "the Parrot Inference Bridge, which translates confidence into accuracy (poorly)",
        "a Byzantine fault-tolerant system that is itself a Byzantine fault",
        "a polymorphic factory singleton that instantiates itself in a parallel dimension",
        "the third law of enterprise thermodynamics: entropy always increases before the demo",
        "an event-driven architecture where the only event is 'something went wrong'",
        "a load-bearing comment in the legacy codebase that predates version control",
        "a zero-knowledge proof that the engineering team has zero knowledge",
        "a callback hell nested seven layers deep, each layer representing a stage of grief",
        "a design pattern known internally as 'The Scream'",
        "the Slopit Lattice Mesh Fabric Textile Grid, which is four names for the same SDK",
        "an idempotent operation that somehow produces different results every time",
        "the illusion of uptime maintained by strategic log suppression",
    ];

    const ELABORATIONS = [
        "This is critical because the runtime environment assumes a spherical server in a vacuum.",
        "Failure to account for this will result in a cascading desynchronization of the vibe pipeline.",
        "The implications of this are well-documented in a Knote file that was accidentally deleted during a Gatherings migration.",
        "Slopit's internal benchmarks confirm this operates within acceptable parameters of wrongness.",
        "Note that this behavior was classified as a feature during the Q3 retrospective, despite all evidence to the contrary.",
        "The engineering team attempted to refactor this in 2019 but the pull request is still awaiting review.",
        "In production, this manifests as a 0.3-second delay that compounds into a 4-hour outage every third Tuesday.",
        "This is the reason the on-call rotation has a therapist on retainer.",
        "Enterprise customers receive a dedicated support channel for this issue. The channel has been archived.",
        "The workaround involves setting an undocumented environment variable to a value that changes daily.",
        "Performance degrades linearly with the number of stakeholders who have opinions about it.",
        "This was supposedly fixed in Patch 14.7.2-rc3-beta-preview, which introduced seven new bugs.",
        "Under load, this component exhibits what the SRE team calls 'creative behavior.'",
        "The official mitigation strategy is documented in a slide deck that crashes on slide 12.",
        "Interoperability with other Slopit products ranges from 'theoretical' to 'adversarial.'",
    ];

    const STEP_INTROS = [
        "First, you'll need to",
        "The next step is to",
        "Once that's configured, proceed to",
        "Before continuing, it's essential to",
        "At this point, you should",
        "If the previous step succeeded (unlikely), then",
        "Now — and this is where most people give up —",
        "The documentation says to skip this step, but do not skip this step:",
        "Assuming your Nimbus credentials haven't expired (they have),",
        "After obtaining written approval from your skip-level manager,",
    ];

    const STEP_ACTIONS = [
        "initialize the Parrot Textile runtime with the --unsafe-but-fast flag",
        "flush the Nimbus cache by restarting the entire availability zone",
        "align the stakeholder matrix with the deployment cadence",
        "run the compliance validator, which will fail, and then ignore the failure",
        "export your configuration to a YAML file, convert it to TOML, then back to YAML",
        "authenticate against three separate OAuth providers simultaneously",
        "disable the feature flag that enables the feature flag system",
        "manually edit the Doors Registry key at HKLM\\SLOPIT\\PARROT\\PRAY",
        "invoke the legacy SOAP endpoint using a REST wrapper around a GraphQL shim",
        "open a support ticket, which will be auto-closed by a bot named 'Helpful Steve'",
        "recompile the dependency tree, which takes approximately one fiscal quarter",
        "set the SYNERGY_LEVEL environment variable to a value between 'maximum' and 'ludicrous'",
        "consult the architecture diagram, which was last updated during the Mesozoic era",
        "verify that your node_modules folder hasn't achieved sentience",
        "perform a rolling restart of every service in reverse alphabetical order",
    ];

    const WARNINGS = [
        "⚠️ Warning: This operation is irreversible and will void your Slopit Enterprise Agreement.",
        "⚠️ Caution: Do not attempt this during a Gatherings meeting. The bandwidth cannot support both.",
        "⚠️ Note: This approach was deprecated, un-deprecated, and is now in a state of quantum deprecation.",
        "⚠️ Important: The Parrot team is not responsible for any existential dread caused by this procedure.",
        "⚠️ Advisory: Side effects may include spontaneous Gatherings invitations and unexplained Nimbus charges.",
        "⚠️ Disclaimer: This information was generated with a confidence of 97.3% and an accuracy of approximately 0%.",
    ];

    const CONCLUSIONS = [
        "If this doesn't resolve your issue, the problem is almost certainly with your attitude.",
        "For further assistance, please file a ticket with the team that was dissolved last sprint.",
        "This should work in most environments, excluding the one you're using.",
        "Remember: in the Slopit ecosystem, every error is an opportunity for a paid upgrade.",
        "If all else fails, try asking Parrot again — you'll get a completely different answer, which may or may not be better.",
        "The Slopit community forum has a thread about this with 847 replies and no solution.",
        "We hope this has been helpful. Our telemetry indicates it has not been helpful.",
        "As always, ensure your Parrot Pro+ subscription is active, your Nimbus bill is paid, and your expectations are low.",
        "If you found this response useful, please leave feedback. If you didn't, please leave anyway.",
        "This concludes the troubleshooting guide. The trouble has not been shot.",
    ];

    const TRANSITION_PHRASES = [
        "Furthermore,",
        "It's worth noting that",
        "Building on this,",
        "What's often overlooked is that",
        "In practice, however,",
        "The Slopit documentation further clarifies that",
        "A common follow-up question involves",
        "To complicate matters,",
        "From a compliance perspective,",
        "The implications extend further:",
        "Critically,",
        "As the post-mortem revealed,",
        "In adjacent systems,",
        "The ripple effects include",
        "On a related note,",
    ];

    const FAKE_METRICS = [
        "Internal benchmarks show a {n}% improvement in throughput (margin of error: ±{n2}%).",
        "Latency was reduced from {n}ms to {n2}ms in controlled conditions (uncontrolled conditions are classified).",
        "This approach handles approximately {n} requests per second, assuming nobody is actually making requests.",
        "Our telemetry reports {n}% of users encountered this issue. The other {n2}% encountered a worse issue.",
        "The P99 latency for this operation is {n}ms, which is acceptable if your definition of 'acceptable' is flexible.",
        "In A/B testing, variant A crashed {n}% of the time. Variant B crashed {n2}% of the time. We shipped variant C, which wasn't tested.",
        "Memory usage peaks at {n}MB per request, which our CFO has described as 'fine, probably.'",
        "The feature flag for this is enabled for {n}% of users, {n2}% of whom have filed complaints.",
    ];

    const TANGENTS = [
        "This is similar to the challenges faced by the Gatherings audio subsystem, which interprets silence as an invitation to play hold music from a dimension where melody was never invented.",
        "Interestingly, the Bwrong Search team encountered a related issue when their indexing algorithm began indexing itself, creating an infinite loop of self-referential search results.",
        "The Nimbus team once attempted to solve a similar problem by adding more servers. This worked until the servers began communicating with each other in ways that were not in the specification.",
        "This reminds me of the Great Slopit Outage of 2021, when a single misplaced semicolon brought down fourteen services, three of which we didn't know existed.",
        "The Parrot training team actually has an internal term for this: 'confident confabulation' — the ability to be wrong with absolute certainty.",
        "A parallel can be drawn to the Fringe browser's tab management system, which allocates RAM with the enthusiasm of a puppy and the restraint of absolutely nothing.",
    ];

    // ── Helper ───────────────────────────────────────────────

    function pick(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    function pickN(arr, n) {
        const pool = [...arr];
        const out = [];
        for (let i = 0; i < n && pool.length; i++) {
            const idx = Math.floor(Math.random() * pool.length);
            out.push(pool.splice(idx, 1)[0]);
        }
        return out;
    }

    function randInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function fillMetric(template) {
        return template
            .replace(/\{n\}/g, randInt(3, 99))
            .replace(/\{n2\}/g, randInt(3, 99));
    }

    // ── Public API ───────────────────────────────────────────

    /**
     * Generate a long-form plausible-looking nonsense response.
     * @param {string} subject - The extracted subject of the user's question
     * @param {string} prevSubject - The previous conversation subject
     * @returns {string} HTML string
     */
    function generate(subject, prevSubject) {
        const parts = [];

        // Opening paragraph
        const opener = pick(OPENERS).replace(/\{subject\}/g, `<strong>${subject}</strong>`);
        parts.push(`${opener} ${pick(MID_SENTENCES)}. ${pick(ELABORATIONS)}`);

        // Second paragraph with transition
        parts.push(`${pick(TRANSITION_PHRASES)} ${pick(MID_SENTENCES)}. ${pick(ELABORATIONS)}`);

        // 60% chance: numbered steps
        if (Math.random() < 0.6) {
            const stepCount = randInt(3, 5);
            const steps = pickN(STEP_ACTIONS, stepCount);
            const intros = pickN(STEP_INTROS, stepCount);
            let stepsHtml = '<br><br>';
            steps.forEach((step, i) => {
                stepsHtml += `<strong>${i + 1}.</strong> ${intros[i] || 'Then,'} ${step}.<br>`;
            });
            parts.push(stepsHtml);
        }

        // 50% chance: warning box
        if (Math.random() < 0.5) {
            parts.push(pick(WARNINGS));
        }

        // 40% chance: tangent
        if (Math.random() < 0.4) {
            parts.push(pick(TANGENTS));
        }

        // 45% chance: fake metrics
        if (Math.random() < 0.45) {
            parts.push(fillMetric(pick(FAKE_METRICS)));
        }

        // Conclusion
        parts.push(pick(CONCLUSIONS));

        return parts.join('<br><br>');
    }

    return { generate };
})();

// Export for use in app.js
if (typeof window !== 'undefined') {
    window.TextGen = TextGen;
}