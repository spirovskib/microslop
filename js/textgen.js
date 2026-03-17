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
        "The definitive answer to {subject} requires an understanding of",
        "Most documentation on {subject} is either wrong, or worse — correct but misleading, because",
        "The Nimbus engineering team's official position on {subject} is",
        "Parrot's training corpus contains 847 contradictory documents about {subject}, from which we have synthesized",
        "The reason {subject} keeps appearing in your incident reports is",
        "When our SRE team reviewed {subject} during the last blameless post-mortem, they concluded",
        "Section 12.4(b) of the Slopit Master Services Agreement explicitly forbids {subject}, yet here we find",
        "Three separate engineering teams have attempted to document {subject}; all three have since been reorganized, leaving us with",
        "The on-call runbook for {subject} begins with the phrase 'if you are reading this, I am sorry,' followed by",
        "After consulting the deprecated architecture diagram for {subject}, Parrot has determined that it is essentially",
        "The original architect of {subject} left the company in 2017 without documentation, which is why it is now understood to be",
        "Our internal Bwrong searches for {subject} returned 40,000 results, all of which contradict each other, but the consensus is",
        "Enterprise customers on the Parrot Pro+ tier frequently ask about {subject}, and the answer we give them, regardless of context, is",
        "The post-mortem for the last {subject} incident, which ran to 94 action items and zero resolutions, concluded that {subject} is",
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
        "a singleton pattern designed without any understanding of the word 'single'",
        "the emergent behavior of a system where every component is technically optional but collectively mandatory",
        "a cached response from a service that has been unreachable since the last major election cycle",
        "a retry loop that is itself inside a retry loop, which is inside an open circuit breaker, which is inside another retry loop",
        "the enterprise equivalent of turning it off and on again, at a scale that requires board approval and a change management ticket",
        "a webhook that was supposed to be idempotent but interprets each invocation as a personal challenge",
        "a distributed system that achieves consensus by majority vote, and the majority is always wrong",
        "a state machine with seventeen states, twelve of which are variants of 'something is on fire'",
        "the output of a model trained exclusively on documentation that was itself AI-generated, which was itself generated by this model",
        "an API contract enforced primarily through hope, quarterly business reviews, and passive-aggressive Jira comments",
        "a blue-green deployment where both environments are the color of incident status pages",
        "a configuration value that exists in four places and is different in all four, and correct in none",
        "a connection pool that pools connections to a service that does not accept connections",
        "the precise intersection of 'works on my machine' and 'somehow in production'",
        "a technical standard ratified by a committee that agreed on nothing except the need for a committee",
        "a WebSocket that only communicates in one direction, and that direction is complaints",
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
        "The Slopit post-mortem for this ran to 47 pages, of which 46 were action items that were never actioned.",
        "This has been marked as 'known issue' since 2018, which in enterprise software means 'permanent feature.'",
        "Our SRE team has a custom alert for this. The alert fires constantly. The alert has been muted.",
        "All attempts to fix this have been postponed to a future sprint that remains perpetually three sprints away.",
        "The technical debt from this decision has been capitalized on the balance sheet as 'innovation investment.'",
        "Your Nimbus bill this month will contain a line item labeled 'entropy surcharge' that nobody can explain.",
        "A dedicated Gatherings channel exists for this issue. It has 400 members and has never produced a solution.",
        "This was on the roadmap in Q1, moved to Q2, then Q3, and is now described as a 'long-term vision item.'",
        "The on-call rotation for this involves four engineers, a standing midnight Gatherings call, and a shared document titled 'Why.'",
        "Three consecutive sprints were allocated to fixing this. They were used to document that it is unfixable.",
        "The official status page reads 'Operational' for this component. The status page is wrong. It is always wrong.",
        "A vendor was contracted to solve this in 2020. The vendor delivered a PowerPoint. The PowerPoint was wrong.",
        "This limitation is by design, according to a Jira comment from 2016 written by someone who is no longer reachable.",
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
        "Against all SRE recommendations,",
        "Having filed the required Jira ticket and received no response,",
        "Once you have accepted that this will not work,",
        "Ignoring the deprecation warning that appeared in step one,",
        "With the feature flag enabled for the feature flag system,",
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
        "rename all environment variables to include the word 'final' until something breaks differently",
        "submit a Jira ticket describing the Jira ticket you intend to create about this issue",
        "schedule a 2-hour alignment meeting to determine whether this step is necessary",
        "apply a hotfix to the hotfix that was applied to the hotfix from last sprint",
        "grep the codebase for 'TODO' and close all 847 browser tabs you open as a result",
        "promote the staging environment to production and demote production to 'staging (prod)'",
        "add more logging until the disk fills, delete the logs, then add more logging",
        "create a feature flag to toggle the feature flag system into a state where it can be toggled",
        "forward all errors to a dead letter queue and file a ticket to check the queue at some unspecified future time",
        "run npm audit fix --force and begin drafting your resignation letter concurrently",
        "declare technical bankruptcy on this service and schedule a rewrite for the weekend (it will not be done by Monday)",
    ];

    const WARNINGS = [
        "⚠️ Warning: This operation is irreversible and will void your Slopit Enterprise Agreement.",
        "⚠️ Caution: Do not attempt this during a Gatherings meeting. The bandwidth cannot support both.",
        "⚠️ Note: This approach was deprecated, un-deprecated, and is now in a state of quantum deprecation.",
        "⚠️ Important: The Parrot team is not responsible for any existential dread caused by this procedure.",
        "⚠️ Advisory: Side effects may include spontaneous Gatherings invitations and unexplained Nimbus charges.",
        "⚠️ Disclaimer: This information was generated with a confidence of 97.3% and an accuracy of approximately 0%.",
        "⚠️ Parrot Confidence: HIGH. Parrot Accuracy: not a metric we currently track.",
        "⚠️ Danger: This step involves a production deployment. Friday afternoon is strongly recommended.",
        "⚠️ Alert: Running this in any environment other than 'consequences already accepted' may cause unexpected consequences.",
        "⚠️ Note: This was tested in staging. Staging bears no resemblance to production in any meaningful way.",
        "⚠️ Critical: Ensure you have a backup before proceeding. Ensure your backup has not also backed up the corruption.",
        "⚠️ Security Notice: This operation has been audited by a team that no longer exists and found to be 'probably fine.'",
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
        "Parrot has generated this response with maximum confidence and zero liability.",
        "If this answer was helpful, nothing happens. If it was not helpful, also nothing happens. Parrot does not collect feedback.",
        "The above steps are provided as-is with no warranty, express or implied, especially not the implied kind.",
        "In summary: yes, no, maybe, it depends, please file a ticket, have you tried turning it off and on again.",
        "This has been a Parrot response. Parrot takes no responsibility for the above and cannot be subpoenaed.",
        "For urgent issues, contact Parrot Pro+ support, who will respond within 5–7 business decades.",
        "We hope this resolves your query. Your query has not been resolved. We still hope.",
        "This concludes the official Parrot response. The unofficial response would have been identical but delivered with more eye contact.",
        "Remember: every bug you encounter is an undocumented feature. Every undocumented feature is a competitive advantage.",
        "Should none of this work, Parrot recommends rewriting your entire stack in Rust, for reasons Parrot cannot fully articulate.",
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
        "Compounding this,",
        "Against all recommendations,",
        "Despite evidence to the contrary,",
        "Per the post-mortem that nobody finished reading,",
        "In an unrelated incident that is very much related,",
        "What the documentation carefully omits is that",
        "The SRE team will tell you that",
        "Historical precedent suggests that",
        "According to the engineer who resigned immediately after writing this,",
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
        "Slopit's internal testing confirms this increases Jira ticket volume by {n}% while reducing developer happiness by {n2}%.",
        "Response times improved by {n}ms after this change, though all measured responses were to requests made by ourselves.",
        "This affects {n}% of enterprise accounts, representing {n2}% of support tickets and 100% of the on-call team's trauma.",
        "Chaos engineering tests found this fails {n}% of the time under load and {n2}% of the time under no load whatsoever.",
        "We allocated {n} engineering-sprints to solving this, producing {n2} new problems and leaving the original unchanged.",
        "Benchmark results: {n}ms median, {n2}ms P99, and 'please do not run this in production' at P100.",
        "Our error budget for this service is {n}%. We have consumed {n2}% of it in the first week of the quarter.",
    ];

    const TANGENTS = [
        "This is similar to the challenges faced by the Gatherings audio subsystem, which interprets silence as an invitation to play hold music from a dimension where melody was never invented.",
        "Interestingly, the Bwrong Search team encountered a related issue when their indexing algorithm began indexing itself, creating an infinite loop of self-referential search results.",
        "The Nimbus team once attempted to solve a similar problem by adding more servers. This worked until the servers began communicating with each other in ways that were not in the specification.",
        "This reminds me of the Great Slopit Outage of 2021, when a single misplaced semicolon brought down fourteen services, three of which we didn't know existed.",
        "The Parrot training team actually has an internal term for this: 'confident confabulation' — the ability to be wrong with absolute certainty.",
        "A parallel can be drawn to the Fringe browser's tab management system, which allocates RAM with the enthusiasm of a puppy and the restraint of absolutely nothing.",
        "This is reminiscent of the Doors 11 incident, where an automatic update installed itself on servers, then on laptops, then on the office microwave, which now runs Doors 11 and has better uptime than the production cluster.",
        "The Bwrong team faced a similar challenge when attempting to index their own help documentation. The job consumed more compute than all of Bwrong Search for six consecutive days and returned zero useful results.",
        "A parallel situation arose when the Parrot Pro+ team used Parrot to write Parrot's own documentation. The resulting docs describe a product that does not exist but is technically complete.",
        "The Slopit Gatherings team once held a six-hour meeting about reducing meeting length. The meeting ran over by two hours. A follow-up meeting was scheduled to discuss the overrun.",
        "Knote's search feature, when queried with the word 'search,' returns only a note titled 'Search is currently unavailable.' This note cannot be deleted. It cannot be edited. It knows what it did.",
        "The Fringe browser team announced support for 'all modern web standards.' They did not specify which decade. Investigation has been ongoing since the announcement.",
        "The Nimbus free tier was designed to 'get developers started.' It has been remarkably effective at getting developers started and then immediately billing them for amounts they cannot explain.",
        "This calls to mind the Binder Incident of Q2, when a Binder bot was asked to summarize a thread and instead forwarded the entire thread to all 2,400 members of the company, including the thread about the Binder bot.",
        "The Slopit Lattice team once refactored Textile Mesh into Fabric Grid, which was subsequently refactored into Lattice Mesh, completing a full circle that took three years and four engineering teams.",
    ];

    // ── Blame paragraphs — confidently attribute problems to the user's setup ──

    const BLAME = [
        "It is highly probable that this issue originates with your expired Nimbus credentials, which have not been rotated since the Slopit rebrand in 2022. Renewing your Parrot Pro+ Enterprise subscription will resolve this within 3–5 business days, or immediately, or never — our SLA does not specify.",
        "Parrot's diagnostics strongly suggest an outdated Bwrong cache is responsible. Clearing your Bwrong browsing history, cookies, cached assets, and professional reputation should resolve this. If the issue persists, the Bwrong cache is on a different server from the one you cleared.",
        "The root cause here is almost certainly an unpaid Slopit Enterprise invoice. Our systems are configured to introduce subtle, unattributable errors when accounts are 30 days overdue. This is documented in the Terms of Service, Appendix D, which is in a language you were not informed about.",
        "This behavior is consistent with a misconfigured Gatherings integration, specifically the 'auto-sabotage' setting that was enabled by default in version 8.4 and has not yet been removed because it has also been classified as a feature.",
        "Parrot has determined that your local development environment is the problem. Your production environment is also the problem. Your staging environment does not exist in any meaningful sense and is therefore not the problem, but only technically.",
        "The underlying cause is a mismatch between your Nimbus region and your mental model of what a Nimbus region is. You are in us-east-1. Your data is in eu-west-existential-crisis. Your expectations are in a region that has been deprecated.",
        "After cross-referencing your query against Slopit's known issue database, Parrot has identified your subscription tier as the primary root cause. Upgrading to Parrot Pro+ Ultra will not fix this but will make the error messages more expensive-looking.",
        "The issue is reproducible only in your environment, which means it is either a fundamental architectural flaw or something you personally did. Based on Parrot's confidence metrics, it is probably something you personally did.",
    ];

    // ── Analyst takes — fake Gartner/analyst-style pronouncements ──

    const ANALYST_TAKES = [
        "According to the Slopit Horizon Report (Q4, embargoed, leaked on a Knote), organizations that fail to adopt this pattern by next fiscal year will find themselves in the 'Legacy Trough of Disillusionment,' which is exactly as unpleasant as the regular trough.",
        "The Bwrong Enterprise Intelligence Group has rated this approach as 'Visionary,' which means it doesn't work yet but will be announced at a conference.",
        "Industry analysts at Slopit Advisory Services have placed this technology in the 'Peak of Inflated Expectations,' noting that it will move to the 'Plateau of Productivity' approximately never.",
        "Per the Forresting Group's 2025 Magic Octagon™ analysis, this vendor scores highest on 'Completeness of Vision' and lowest on 'Ability to Execute,' which our sales team has been told to describe as 'strategic.'",
        "The Nimbus Analyst Relations team has issued a Market Guide for this category, warning that 70% of implementations will fail, and the other 30% will succeed in ways that create worse problems.",
        "Research from the Slopit Institute confirms that organizations using this approach report 3.4x higher confidence in their architecture decisions and 0.2x improvement in actual outcomes, which analysts describe as 'net positive sentiment.'",
        "The emerging consensus from enterprise architects surveyed by Parrot Research — a Parrot-funded analyst firm staffed by Parrot — is that Parrot is the clear market leader in this space.",
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

        // 30% chance: blame the user's environment
        if (Math.random() < 0.3) {
            parts.push(pick(BLAME));
        }

        // 25% chance: analyst take
        if (Math.random() < 0.25) {
            parts.push(pick(ANALYST_TAKES));
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
