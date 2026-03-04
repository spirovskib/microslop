// ============================================================
// SLOPIT PARROT — Dynamic Code Generator
// Produces procedurally generated fake code snippets
// that look plausible but are completely useless
// ============================================================

const CodeGen = (() => {

    // ── Vocabulary pools ─────────────────────────────────────

    const PACKAGES = [
        '@slopit/parrot-core', '@slopit/textile-mesh', '@slopit/nimbus-sdk',
        '@slopit/gatherings-hooks', '@slopit/binder-utils', '@slopit/fringe-compat',
        'enterprise-synergy', 'nimbus-devops-feelings', 'stakeholder-alignment',
        'parrot-inference-bridge', 'blockchain-but-worse', 'ai-hallucinate',
        'vibe-driven-development', 'technical-debt-manager', 'microservice-trenchcoat',
        'promise-me-nothing', 'callback-purgatory', 'event-loop-therapy',
        'regex-crimes', 'yaml-to-toml-to-yaml', 'is-even-ai-blockchain',
        'left-pad-enterprise', 'not-a-virus-trust-me', 'deploy-and-pray',
    ];

    const FUNCTION_NAMES = [
        'initSynergyPipeline', 'alignStakeholders', 'resolveQuantumState',
        'flushHallucinationCache', 'reticulate', 'normalizeVibes',
        'computeEnterpriseFactor', 'validateParrotResponse', 'destroyAndRebuild',
        'handleEverything', 'fixTemporarily', 'workaroundWorkaround',
        'deprecateDeprecation', 'optimizeForBenchmarks', 'refactorLater',
        'ensureCompliance', 'migrateToNowhere', 'pivotStrategy',
        'generateBuzzwords', 'consultBlockchain', 'trainOnNothing',
        'parseHopesAndDreams', 'serializeExistentialDread', 'catchAndIgnore',
        'logAndForget', 'authenticateVibes', 'deployToVoid',
        'transformParadigm', 'disruptLegacySystem', 'scheduleGatheringsMeeting',
    ];

    const VARIABLE_NAMES = [
        'synergy', 'pipeline', 'config', 'stakeholderMatrix',
        'vibeScore', 'hallucinationBuffer', 'enterpriseFactor',
        'legacyShim', 'nimbusCreds', 'parrotResponse',
        'deploymentKarma', 'techDebtAccumulator', 'buzzwordIndex',
        'complianceToken', 'confidenceLevel', 'accuracyLevel',
        'paradigmShift', 'disruptionVector', 'aBTestResult',
        'featureFlagFlag', 'meetingAboutMeetings', 'backlogFire',
    ];

    const CONFIG_KEYS = [
        'hallucination_mode', 'confidence_display', 'synergy_level',
        'paradigm_shift_enabled', 'vibe_check', 'blame_target',
        'telemetry', 'actual_accuracy', 'buzzword_density',
        'enterprise_grade', 'blockchain_required', 'ai_enhanced',
        'legacy_compat', 'nimbus_region', 'gatherings_integration',
        'compliance_theater', 'budget_awareness', 'feature_flag_flag',
        'deploy_on_friday', 'test_in_prod', 'yolo_mode',
    ];

    const CONFIG_VALUES = [
        "'aggressive'", "'maximum'", "'ludicrous'", "true",
        "'yes_all_of_it'", "'user_error'", "null", "'enterprise'",
        "false // this is a lie", "'pray'", "'someone_elses'",
        "'theoretical'", "'deprecated'", "Math.random()", "'vibes'",
        "undefined // on purpose", "'ask_parrot'", "process.env.HOPE || 'none'",
        "'it_depends'", "!false && !true", "'quantum'",
    ];

    const STRING_VALUES = [
        "'trust-me-bro'", "'enterprise-grade'", "'it-works-on-my-machine'",
        "'TODO: fix later'", "'this-is-fine'", "'not-a-bug'",
        "'synergy-achieved'", "'paradigm-shifted'", "'blockchain-verified'",
        "'AI-approved'", "`error-${Date.now()}`", "'please-dont-break'",
    ];

    const COMMENTS_INLINE = [
        "// TODO: understand what this does",
        "// NOTE: do not remove — load-bearing code",
        "// HACK: this fixes everything somehow",
        "// FIXME: has been here since 2016",
        "// WARNING: touching this summons the on-call",
        "// Parrot suggested this with 97% confidence",
        "// nobody knows why this works",
        "// the intern wrote this. the intern is now VP.",
        "// reviewed by: [REDACTED]",
        "// tested in production (once)",
        "// this comment is the documentation",
        "// if you're reading this, I'm sorry",
        "// cargo-culted from StackUnderflow",
        "// works 60% of the time, every time",
        "// enterprise-grade solution",
        "// DO NOT REMOVE — will break Gatherings",
        "// approved by the blockchain",
        "// this was supposed to be temporary (2017)",
    ];

    const COMMENTS_BLOCK = [
        "/**\n * @deprecated since forever\n * @param {any} hope - don't bother\n * @returns {Promise<void>} - the void stares back\n */",
        "/**\n * Enterprise-grade solution.\n * Do not modify without filing Form 27B-stroke-6.\n * Last reviewed: never\n */",
        "/**\n * Parrot-generated code.\n * Confidence: HIGH\n * Accuracy: CLASSIFIED\n * Maintainability: NO\n */",
        "/*\n * If you are reading this, the system\n * is already in an unrecoverable state.\n * Please close your laptop and go outside.\n */",
    ];

    const ERROR_MESSAGES = [
        "'Something went wrong (this is the entire error message)'",
        "'Error: success (this is not a contradiction)'",
        "'An unexpected error was expected'",
        "'Task failed successfully'",
        "'Error 418: I am a teapot (this server is literally a teapot)'",
        "`Parrot Confidence: ${(Math.random() * 100).toFixed(1)}% — Error: yes`",
        "'Please try again (you will get the same error)'",
        "'This error has been reported to a team that does not exist'",
        "'FATAL: non-fatal error in non-critical critical system'",
    ];

    const LANGUAGES = ['javascript', 'python', 'typescript', 'config', 'sql', 'bash', 'css'];

    // ── Helpers ──────────────────────────────────────────────

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

    function indent(str, level = 1) {
        const pad = '    '.repeat(level);
        return str.split('\n').map(l => pad + l).join('\n');
    }

    function randInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function camelToSnake(s) {
        return s.replace(/([A-Z])/g, '_$1').toLowerCase();
    }

    // ── Language-specific generators ─────────────────────────

    function genJavaScript(subject) {
        const templates = [
            // Async function with config
            () => {
                const fn = pick(FUNCTION_NAMES);
                const pkg1 = pick(PACKAGES);
                const pkg2 = pick(PACKAGES);
                const v1 = pick(VARIABLE_NAMES);
                const v2 = pick(VARIABLE_NAMES);
                const c1 = pick(COMMENTS_INLINE);
                const c2 = pick(COMMENTS_INLINE);
                const err = pick(ERROR_MESSAGES);
                const cfgPairs = pickN(CONFIG_KEYS, 3).map(k => `    ${k}: ${pick(CONFIG_VALUES)}`);
                return `import { ${fn} } from '${pkg1}';
import { ${pick(FUNCTION_NAMES)} } from '${pkg2}';

${pick(COMMENTS_BLOCK)}
const ${v1} = await ${fn}({
${cfgPairs.join(',\n')},
    subject: '${subject}'
});

${c1}
if (${v1}.confidence > 0.5) {
    const ${v2} = ${v1}.${pick(CONFIG_KEYS)} ?? ${pick(STRING_VALUES)};
    ${c2}
    return ${v2};
} else {
    throw new Error(${err});
}`;
            },
            // Class-based pattern
            () => {
                const cls = pick(FUNCTION_NAMES).replace(/^[a-z]/, c => c.toUpperCase()) + 'Service';
                const v1 = pick(VARIABLE_NAMES);
                const c1 = pick(COMMENTS_INLINE);
                const c2 = pick(COMMENTS_INLINE);
                const m1 = pick(FUNCTION_NAMES);
                const m2 = pick(FUNCTION_NAMES);
                return `${pick(COMMENTS_BLOCK)}
class ${cls} {
    #${v1} = ${pick(CONFIG_VALUES)};

    constructor(config = {}) {
        ${c1}
        this.config = { ...config, subject: '${subject}' };
        this.#${v1} = config.${pick(CONFIG_KEYS)} ?? ${pick(STRING_VALUES)};
    }

    async ${m1}() {
        ${c2}
        if (!this.#${v1}) return ${pick(STRING_VALUES)};
        await new Promise(r => setTimeout(r, ${randInt(1000, 9999)}));
        return this.${m2}();
    }

    ${m2}() {
        ${pick(COMMENTS_INLINE)}
        return this.${m1}(); // infinite recursion as a service
    }
}

export default new ${cls}(); // singleton (that creates new instances)`;
            },
            // React hook style
            () => {
                const hookName = 'use' + pick(FUNCTION_NAMES).replace(/^[a-z]/, c => c.toUpperCase());
                const v1 = pick(VARIABLE_NAMES);
                const v2 = pick(VARIABLE_NAMES);
                return `import { useState, useEffect, useCallback } from 'react';
import { ${pick(FUNCTION_NAMES)} } from '${pick(PACKAGES)}';

${pick(COMMENTS_BLOCK)}
export function ${hookName}(${pick(VARIABLE_NAMES)} = ${pick(STRING_VALUES)}) {
    const [${v1}, set${v1.charAt(0).toUpperCase() + v1.slice(1)}] = useState(null);
    const [${v2}, set${v2.charAt(0).toUpperCase() + v2.slice(1)}] = useState(${pick(CONFIG_VALUES)});

    useEffect(() => {
        ${pick(COMMENTS_INLINE)}
        let mounted = true;
        const interval = setInterval(() => {
            if (mounted) set${v2.charAt(0).toUpperCase() + v2.slice(1)}(prev => !prev);
        }, ${randInt(100, 5000)}); ${pick(COMMENTS_INLINE)}

        return () => {
            mounted = false; // maybe
            clearInterval(interval); // hopefully
        };
    }, []); // dependencies: none. just vibes.

    const refetch = useCallback(async () => {
        try {
            const data = await ${pick(FUNCTION_NAMES)}('${subject}');
            set${v1.charAt(0).toUpperCase() + v1.slice(1)}(data);
        } catch {
            ${pick(COMMENTS_INLINE)}
            set${v1.charAt(0).toUpperCase() + v1.slice(1)}(${pick(STRING_VALUES)});
        }
    }, [${v2}]); // this dependency causes infinite re-renders

    return { ${v1}, ${v2}, refetch, isLoading: ${v1} === null && ${v2} !== false };
}`;
            },
            // Express middleware style
            () => {
                const mw = pick(FUNCTION_NAMES);
                const v1 = pick(VARIABLE_NAMES);
                return `import { ${pick(FUNCTION_NAMES)} } from '${pick(PACKAGES)}';

${pick(COMMENTS_INLINE)}
const ${mw} = (req, res, next) => {
    req.headers['X-Synergy-Level'] = ${pick(STRING_VALUES)};
    req.headers['X-Subject'] = '${subject}';
    req.${pick(VARIABLE_NAMES)} = ${pick(CONFIG_VALUES)};

    ${pick(COMMENTS_INLINE)}
    if (Math.random() > 0.${randInt(1, 9)}) {
        next();
    } else {
        res.status(${pick([418, 420, 422, 451, 500, 503])}).json({
            error: ${pick(ERROR_MESSAGES)},
            ${pick(CONFIG_KEYS)}: ${pick(CONFIG_VALUES)},
            suggestion: 'Have you tried Parrot Pro+?'
        });
    }
};

export default ${mw};
${pick(COMMENTS_INLINE)}`;
            },
        ];

        return pick(templates)();
    }

    function genPython(subject) {
        const templates = [
            () => {
                const fn = camelToSnake(pick(FUNCTION_NAMES));
                const fn2 = camelToSnake(pick(FUNCTION_NAMES));
                const v1 = camelToSnake(pick(VARIABLE_NAMES));
                return `# Parrot-Generated Solution (confidence: ${randInt(90, 99)}.${randInt(0, 9)}%)
from slopit.parrot.textile.lattice import ${fn}
from slopit.nimbus import cloud_feelings
import os, sys, random, json  # we need all of these (we don't)

class ${pick(FUNCTION_NAMES).replace(/^[a-z]/, c => c.toUpperCase())}:
    """${pick(COMMENTS_INLINE).replace('// ', '')}"""

    def __init__(self, subject='${subject}'):
        self.subject = subject
        self.${v1} = ${pick(["None", "'enterprise'", "True", "random.random()"])}
        self._confidence = ${randInt(90, 99)}.${randInt(0, 9)}  # hardcoded for morale

    def ${fn}(self, **kwargs):
        """${pick(COMMENTS_INLINE).replace('// ', '')}"""
        try:
            result = ${fn2}(
                subject=self.subject,
                ${camelToSnake(pick(CONFIG_KEYS))}=${pick(["True", "'maximum'", "None", "os.getenv('HOPE', 'none')"])},
                ${camelToSnake(pick(CONFIG_KEYS))}=${pick(["False", "'enterprise'", "42", "float('inf')"])},
            )
            return result or self.${fn}(**kwargs)  # recurse until heat death
        except Exception:
            ${pick(["pass  # this is fine", "os.system('shutdown -r now')  # restart always works", "return True  # technically correct", "raise SystemExit('goodbye')"])}

    def ${fn2}(self):
        # ${pick(COMMENTS_INLINE).replace('// ', '')}
        return self.${fn}()  # mutual recursion is a design pattern

if __name__ == '__main__':
    ${camelToSnake(pick(FUNCTION_NAMES))} = ${pick(FUNCTION_NAMES).replace(/^[a-z]/, c => c.toUpperCase())}()
    print(${camelToSnake(pick(FUNCTION_NAMES))}.${fn}())
    # if you've reached this line, something has gone terribly right`;
            },
            () => {
                const fn = camelToSnake(pick(FUNCTION_NAMES));
                return `# Parrot AI Pipeline (DO NOT MODIFY — load-bearing script)
import numpy as np  # pip install numpy (this will take 4 hours)
from slopit.ai import parrot_model
from slopit.nimbus import bill_someone_else

def ${fn}(data, subject='${subject}'):
    """${pick(COMMENTS_INLINE).replace('// ', '')}"""
    model = parrot_model.load('parrot-ultra-mega-7T')
    model.confidence = ${randInt(90, 99)}.${randInt(0, 9)}  # set manually for demos

    # ${pick(COMMENTS_INLINE).replace('// ', '')}
    predictions = model.predict(
        data,
        ${camelToSnake(pick(CONFIG_KEYS))}=${pick(["True", "'aggressive'", "None"])},
        temperature=float('inf'),  # maximum creativity
        accuracy=${pick(["None", "0", "False", "-1"])},  # not applicable
    )

    # validate results by checking if they feel right
    if np.random.random() > 0.${randInt(1, 5)}:
        return predictions
    else:
        return ${fn}(data, subject)  # try again until we like the answer

    # ${pick(COMMENTS_INLINE).replace('// ', '')}
    bill_someone_else(amount=np.random.randint(1000, 50000))`;
            },
        ];

        return pick(templates)();
    }

    function genTypeScript(subject) {
        const iface = pick(FUNCTION_NAMES).replace(/^[a-z]/, c => c.toUpperCase()) + 'Config';
        const pairs = pickN(CONFIG_KEYS, 5);
        const types = ["string", "boolean", "number", "'enterprise' | 'chaos' | 'vibes'",
                       "never", "Promise<void>", "null | undefined | 'maybe'",
                       "Record<string, unknown>", "any // we gave up"];
        return `${pick(COMMENTS_BLOCK)}
interface ${iface} {
${pairs.map(k => `    ${k}: ${pick(types)};`).join('\n')}
    subject: '${subject}';
    readonly _doNotModify: symbol; // seriously
}

type ParrotResponse<T = unknown> = {
    data: T | null;
    confidence: number; // always high
    accuracy: never; // literally never
    error: string; // always present
};

${pick(COMMENTS_INLINE)}
async function ${pick(FUNCTION_NAMES)}<T extends ${iface}>(
    config: T
): Promise<ParrotResponse<T>> {
    const result: ParrotResponse<T> = {
        data: null,
        confidence: ${randInt(90, 99)}.${randInt(0, 9)},
        accuracy: undefined as never, ${pick(COMMENTS_INLINE)}
        error: ${pick(ERROR_MESSAGES)},
    };

    ${pick(COMMENTS_INLINE)}
    return result satisfies ParrotResponse<T>; // it does not satisfy
}

export type { ${iface}, ParrotResponse };
export default ${pick(FUNCTION_NAMES)};`;
    }

    function genSQL(subject) {
        const tables = ['stakeholder_matrix', 'synergy_pipeline', 'vibe_scores',
                        'hallucination_log', 'nimbus_billing', 'parrot_responses',
                        'deployment_karma', 'incident_history', 'gatherings_crashes',
                        'technical_debt', 'feature_flags', 'abandoned_sprints'];
        const t1 = pick(tables);
        const t2 = pick(tables);
        return `-- Parrot-Generated Query (DO NOT RUN IN PRODUCTION)
-- (someone already ran it in production)

${pick(COMMENTS_INLINE).replace('//', '--')}
SELECT
    s.${camelToSnake(pick(VARIABLE_NAMES))},
    s.${camelToSnake(pick(VARIABLE_NAMES))},
    COUNT(*) AS total_${camelToSnake(pick(VARIABLE_NAMES))},
    AVG(s.confidence) AS avg_confidence, -- always above 90
    SUM(CASE WHEN s.accurate = true THEN 1 ELSE 0 END) AS accurate_count, -- always 0
    '${subject}' AS subject -- hardcoded for compliance
FROM ${t1} s
LEFT JOIN ${t2} v
    ON s.id = v.id
    AND v.deleted_at IS NULL -- everything is deleted
    AND v.${camelToSnake(pick(CONFIG_KEYS))} = ${pick(["'maximum'", "TRUE", "NULL", "'enterprise'"])}
WHERE 1=1 -- classic
    AND s.created_at > NOW() - INTERVAL '${randInt(1, 99)} ${pick(["days", "hours", "fiscal_quarters", "sprints", "existential_crises"])}'
    AND s.mood IN ('desperate', 'confused', 'resigned', 'transcendent')
GROUP BY s.${camelToSnake(pick(VARIABLE_NAMES))}, s.${camelToSnake(pick(VARIABLE_NAMES))}
HAVING COUNT(*) > ${randInt(0, 100)} -- arbitrary threshold chosen by dice roll
ORDER BY avg_confidence DESC -- confidence, not accuracy
LIMIT ${randInt(1, 10)}; -- you

-- Execution time: ${randInt(4, 47)} minutes
-- Rows scanned: all of them
-- ${pick(COMMENTS_INLINE).replace('//', '').trim()}`;
    }

    function genConfig(subject) {
        const format = pick(['yaml', 'toml', 'json']);
        if (format === 'yaml') {
            const pairs = pickN(CONFIG_KEYS, 8);
            return `# parrot-${camelToSnake(pick(FUNCTION_NAMES))}.yml
# ${pick(COMMENTS_INLINE).replace('// ', '')}
# Subject: ${subject}

service:
  name: parrot-${subject.replace(/\s+/g, '-').toLowerCase()}-handler
  version: ${randInt(1, 99)}.${randInt(0, 99)}.${randInt(0, 999)}-rc${randInt(1, 47)}-beta-preview
  status: '${pick(["deprecated", "experimental", "on-fire", "quantum", "vibes-only"])}'

${pairs.slice(0, 4).map(k => `${k}: ${pick(CONFIG_VALUES).replace(/^'|'$/g, '')}`).join('\n')}

nimbus:
  region: '${pick(["us-east-1", "us-west-404", "eu-west-existential-crisis", "ap-southeast-nope"])}'
  instance_type: '${pick(["ludicrously-expensive", "128-vcpu-why", "gpu-8x-for-hello-world"])}'
  budget_alert: false  # ignorance is bliss
  auto_scale: true  # to infinity

parrot:
${pairs.slice(4).map(k => `  ${k}: ${pick(CONFIG_VALUES).replace(/^'|'$/g, '')}`).join('\n')}
  model: 'parrot-ultra-mega-7T'
  subject: '${subject}'

# ${pick(COMMENTS_INLINE).replace('// ', '')}
# Last modified by: [REDACTED]
# Last successful deploy: ${pick(["never", "once, by accident", "2019-03-14 (pi day, appropriately irrational)"])}`;
        }
        return genJavaScript(subject); // fallback
    }

    function genBash(subject) {
        return `#!/bin/bash
# Parrot Deployment Script for: ${subject}
# ${pick(COMMENTS_INLINE).replace('// ', '')}
set -e  # exit on error (lol, as if)

echo "🦜 Initiating ${subject} pipeline..."
echo "   Confidence: ${randInt(90, 99)}.${randInt(0, 9)}%"
echo "   Accuracy: [REDACTED]"

# Step 1: ${pick(COMMENTS_INLINE).replace('// ', '')}
export SYNERGY_LEVEL="${pick(["maximum", "ludicrous", "enterprise", "vibes"])}"
export SUBJECT="${subject}"
export HOPE="${pick(["false", "0", "deprecated", "null"])}"

# Step 2: Install dependencies
npm install --force --legacy-peer-deps --ignore-scripts 2>/dev/null \\
    || pip install everything --break-system-packages \\
    || echo "close enough"

# Step 3: Build
echo "Building..."
npm run build 2>/dev/null || echo "build failed, shipping anyway"

# Step 4: Test
echo "Running tests..."
echo "Tests passed! (we didn't run any)"

# Step 5: Deploy
echo "Deploying to production..."
${pick([
    'scp -r dist/* prod-server:/var/www/ || echo "probably fine"',
    'kubectl apply -f manifest.yml --force --dry-run=none # yolo',
    'rsync -avz --delete ./build/ nimbus:/opt/app/ # delete is intentional (this time)',
    'curl -X POST https://deploy.slopit.internal/ship-it -d "please=true"',
])}

echo "✅ Deployed successfully (${pick(["probably", "allegedly", "theoretically", "citation needed"])})"
echo "📊 Nimbus bill: \\$${randInt(1000, 50000)}.${randInt(10, 99)}"

# ${pick(COMMENTS_INLINE).replace('// ', '')}`;
    }

    function genCSS(subject) {
        const cls = subject.replace(/\s+/g, '-').toLowerCase();
        return `/* Parrot Design System — ${subject} Component */
/* ${pick(COMMENTS_INLINE).replace('// ', '')} */

.${cls}-container {
    display: grid;
    grid-template-columns: repeat(${pick(["infinity", "var(--synergy)", "auto-fill, minmax(0, 1fr)"])});
    gap: var(--enterprise-spacing, ${randInt(4, 128)}px);
    align-items: ${pick(["stakeholder", "center", "vibes", "baseline"])};
    justify-content: ${pick(["quarterly-earnings", "space-between", "prayers"])};
    font-family: 'Parrot Sans', 'Comic Sans MS', system-ui; /* fallback is intentional */
}

.${cls}-container::before {
    content: '${pick(["⚠️", "🦜", "🔥", ""])}';
    position: absolute;
    top: -9999px; /* ${pick(COMMENTS_INLINE).replace('// ', '')} */
    z-index: ${randInt(9999, 2147483647)}; /* higher than everything, always */
}

.${cls}-wrapper {
    padding: ${randInt(1, 64)}px ${randInt(1, 64)}px;
    margin: ${pick(["0 auto", "-9999px", "var(--despair)"])};
    background: ${pick(["linear-gradient(135deg, #7c3aed, transparent)", "var(--nimbus-gray)", "#fff !important"])};
    border-radius: ${pick(["var(--radius-enterprise)", "50%", "9999px", "0 /* sharp edges for sharp code */"])};
    box-shadow: ${pick(["0 0 0 1px var(--regret)", "none /* shadows cost extra on Nimbus */", "0 4px 24px rgba(0,0,0,0.${randInt(1, 9)})"])};
    transition: all ${randInt(100, 5000)}ms ${pick(["ease-in-out", "cubic-bezier(0.68, -0.55, 0.27, 1.55)", "linear /* budget animation */"])};
}

/* Mobile: ${pick(COMMENTS_INLINE).replace('// ', '')} */
@media (max-width: 768px) {
    .${cls}-container { display: ${pick(["none /* mobile users don't need this */", "block", "flex"])}; }
}

@media print {
    * { visibility: hidden; /* nice try */ }
}

/* ${pick(COMMENTS_INLINE).replace('// ', '')} */`;
    }

    // ── Public API ───────────────────────────────────────────

    /**
     * Generate a dynamic fake code snippet.
     * @param {string} subject - The topic
     * @returns {{ code: string, lang: string }} The generated code and its "language"
     */
    function generate(subject) {
        const lang = pick(LANGUAGES);
        let code;

        switch (lang) {
            case 'javascript': code = genJavaScript(subject); break;
            case 'python':     code = genPython(subject); break;
            case 'typescript': code = genTypeScript(subject); break;
            case 'sql':        code = genSQL(subject); break;
            case 'config':     code = genConfig(subject); break;
            case 'bash':       code = genBash(subject); break;
            case 'css':        code = genCSS(subject); break;
            default:           code = genJavaScript(subject); break;
        }

        return { code, lang };
    }

    return { generate };
})();

if (typeof window !== 'undefined') {
    window.CodeGen = CodeGen;
}