"use client";

import { useEffect, useState } from "react";

export default function Jan2025Page() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    // Partner context for the generated prompt
    const partners: Record<string, { name: string; role: string; desc: string; category: string }> = {
      linear: { name: 'Linear', role: 'issue tracking', desc: 'Issues can trigger AI workflows, get auto-triaged, and dispatch to coding agents', category: 'planning' },
      launchdarkly: { name: 'LaunchDarkly', role: 'feature flags & AI configs', desc: 'Manage AI model configs, prompts, and rollouts with the same controls you use for feature flags', category: 'release' },
      snyk: { name: 'Snyk', role: 'security scanning', desc: 'Vulnerability alerts can trigger automated patching, testing, and PR creation', category: 'security' },
      notion: { name: 'Notion', role: 'documentation', desc: 'Block-based architecture gives AI structured context—every paragraph, task, and property is queryable', category: 'knowledge' },
      continue: { name: 'Continue', role: 'mission control for AI agents', desc: 'Ship faster with Continuous AI—orchestrate cloud agents, automate workflows, and measure what matters', category: 'agents' },
      devin: { name: 'Devin', role: 'async AI engineer', desc: 'Cloud coding agent that can work on tasks asynchronously and push PRs', category: 'agents' },
      jules: { name: 'Jules', role: 'proactive coding agent', desc: 'Suggests tasks, runs scheduled jobs, integrates with deployments—AI that works without being asked', category: 'agents' },
      sentry: { name: 'Sentry', role: 'error monitoring', desc: 'Errors can trigger automated investigation, fixes, and deploys', category: 'observability' },
      datadog: { name: 'Datadog', role: 'observability', desc: 'AI agents can query logs, traces, metrics, and incidents through natural language', category: 'observability' },
      posthog: { name: 'PostHog', role: 'product analytics', desc: 'Track AI feature usage: token costs, latency, and user satisfaction', category: 'analytics' },
      vercel: { name: 'Vercel', role: 'deployment platform', desc: 'AI can investigate anomalies, review code, and create PRs from production insights', category: 'deployment' },
      confluent: { name: 'Confluent', role: 'data streaming', desc: 'Event-driven AI that perceives, reasons, and acts as events unfold in real-time', category: 'data' },
      cognee: { name: 'Cognee', role: 'context engineering', desc: 'Knowledge graphs and vector search give AI the right information at the right time', category: 'data' },
      graphene: { name: 'Graphene', role: 'AI-native BI', desc: 'BI with semantic layers that lives in your repo and AI agents can query via CLI', category: 'analytics' },
      github: { name: 'GitHub', role: 'code hosting', desc: 'PRs, issues, actions, and Codespaces can all be automated by AI', category: 'code' },
      sanity: { name: 'Sanity', role: 'content platform', desc: 'Structured content with schemas AI can understand—typed, relational data', category: 'content' },
      dlthub: { name: 'dltHub', role: 'data pipelines', desc: 'Python library for declarative data loading that AI agents can use to move data between systems', category: 'data' },
    };

    // Multi-tool questions: forward-looking questions about Continuous AI
    // Randomly selected when multiple tools are chosen
    const multiToolQuestions = [
      // About the shift from reactive to proactive
      "What would change if your tools started acting on their own instead of waiting for you to ask?",
      "What's something you check manually every day that could just tell you when it needs attention?",
      "If your systems could fix routine problems overnight without waking anyone, what would you trust them to handle first?",
      "What work would disappear from your plate if your tools could remember context from yesterday?",
      
      // About measuring and trusting automation
      "How would you know if AI automation is actually helping versus creating new problems to manage?",
      "What would make you comfortable letting AI merge code without your approval?",
      "At what point does reviewing AI output become more work than doing the task yourself?",
      "What's the difference between AI that saves you time and AI that just shifts where you spend it?",
      
      // About connecting systems
      "What information lives in one tool that would be more valuable if it automatically flowed somewhere else?",
      "What decisions get delayed because they require checking three different systems first?",
      "If all your tools shared the same memory, what would you want them to remember?",
      "What falls through the cracks because no single system sees the whole picture?",
      
      // About progressive autonomy
      "What's something AI should suggest today but do automatically in a year?",
      "Where would you want AI to start with training wheels before eventually running unsupervised?",
      "What's a low-risk task where you'd let AI fail a few times while it learns your preferences?",
      "How do you graduate from 'AI assistant' to 'AI that just handles it'?",
      
      // About the changing role of engineers
      "If AI handles the routine work, what do your best engineers spend their time on instead?",
      "What expertise becomes more valuable when execution gets automated?",
      "What's the difference between managing AI and managing the systems AI manages?",
      "When AI can write code faster than you can review it, what changes about your job?",
      
      // About institutional knowledge
      "What does your team know that isn't written down anywhere but should be taught to AI?",
      "What context do new engineers take months to absorb that AI could learn from your tools?",
      "If AI could learn from how your best people work, what patterns would you want it to pick up?",
      "What tribal knowledge would you encode into automation if you could?",
      
      // About the end state
      "What would 'self-driving software' look like for your team?",
      "What's the most ambitious workflow you'd automate if reliability wasn't a concern?",
      "If you could design your toolchain from scratch for AI-first automation, what would be different?",
      "What would it take for AI to handle your on-call rotation?",
    ];

    // Single tool questions
    const toolQuestions: Record<string, { question: string; option1: string; option2: string }> = {
      'linear': {
        question: 'What context does AI need to triage issues as well as your best engineer?',
        option1: 'Codebase knowledge: which files matter, who owns what, what broke recently.',
        option2: 'Business context: customer impact, roadmap priorities, team capacity.'
      },
      'launchdarkly': {
        question: 'What signal should trigger an automatic feature flag rollback?',
        option1: 'Error rate thresholds tied to the specific flag. Hard numbers, fast action.',
        option2: 'Anomaly detection across metrics. Catch problems that don\'t fit predefined rules.'
      },
      'snyk': {
        question: 'What makes some security vulnerabilities safe for AI to auto-patch?',
        option1: 'Clear upgrade path with no breaking changes. Dependency bumps, not code rewrites.',
        option2: 'Comprehensive test coverage on the affected code. Let tests prove the fix.'
      },
      'notion': {
        question: 'How do you keep documentation from going stale as code evolves?',
        option1: 'Automate it. Docs should update when code changes.',
        option2: 'Make it easy. Reduce friction so humans actually update docs.'
      },
      'continue': {
        question: 'If AI made writing code faster but teams are drowning in PRs, where\'s the real bottleneck?',
        option1: 'Downstream. Automate reviewing, testing, merging, and deploying—the workflows around code.',
        option2: 'Upstream. Slow down code generation. Too much AI code is flooding the pipeline.'
      },
      'devin': {
        question: 'What kind of issues can async AI agents handle without back-and-forth?',
        option1: 'Well-specified bugs with clear repro steps and expected behavior.',
        option2: 'Refactoring tasks with explicit patterns: "rename X to Y everywhere."'
      },
      'jules': {
        question: 'When AI proactively suggests improvements, how do you avoid noise?',
        option1: 'Confidence thresholds. Only surface suggestions AI is highly certain about.',
        option2: 'Batching. Collect suggestions and review them weekly, not as interrupts.'
      },
      'sentry': {
        question: 'What error patterns are safe for AI to auto-investigate and draft fixes for?',
        option1: 'Regressions. Code that worked before has a clear "good state" to restore.',
        option2: 'High-frequency errors. Patterns with many examples give AI more signal.'
      },
      'datadog': {
        question: 'What makes it hard to correlate metrics with root causes automatically?',
        option1: 'Too many signals. AI needs to know which metrics actually matter for each service.',
        option2: 'Missing context. Metrics show what\'s wrong, not why.'
      },
      'posthog': {
        question: 'What data would let AI generate useful experiment hypotheses?',
        option1: 'Funnel drop-offs with session recordings. See what users struggled with.',
        option2: 'Segment comparisons. Find what successful users do differently.'
      },
      'vercel': {
        question: 'What signals indicate a deploy is safe to promote vs. needs rollback?',
        option1: 'Error rates and latency percentiles. Core vitals that affect users.',
        option2: 'Business metrics. Conversion rates catch problems error rates miss.'
      },
      'confluent': {
        question: 'What makes event-driven AI workflows hard to debug?',
        option1: 'Non-determinism. Same event can trigger different AI responses.',
        option2: 'Distributed state. Context is spread across services and time.'
      },
      'cognee': {
        question: 'When does a knowledge graph beat vector search for AI context?',
        option1: 'Relationship queries. "Who owns the service that calls this API?"',
        option2: 'Multi-hop reasoning. Following chains of dependencies.'
      },
      'graphene': {
        question: 'What makes natural language queries over data reliable enough to trust?',
        option1: 'Semantic layer. Predefined metrics with business logic baked in.',
        option2: 'Validation. AI shows its work; humans verify before acting.'
      },
      'github': {
        question: 'What\'s blocking fully automated merge after approval?',
        option1: 'Coordination. People want to control when changes go out.',
        option2: 'Confidence. Tests pass, but humans want one last look.'
      },
      'sanity': {
        question: 'What content tasks are safe for AI to handle autonomously?',
        option1: 'Structured data: SEO fields, alt text, metadata from templates.',
        option2: 'Translations with review. AI drafts, humans approve.'
      },
    };

    // Default question when no tools selected
    const defaultQuestion = {
      question: "What would it look like if your development workflows could drive themselves?",
      option1: '',
      option2: ''
    };
    
    // Store the current question so it's consistent between display and prompt
    let currentQuestion = defaultQuestion;
    
    // Get a random multi-tool question
    function getRandomQuestion() {
      const index = Math.floor(Math.random() * multiToolQuestions.length);
      return multiToolQuestions[index];
    }

    function getQuestion(selectedTools: string[]) {
      // No tools selected
      if (selectedTools.length === 0) {
        return defaultQuestion;
      }
      
      // Single tool: use tool-specific question
      if (selectedTools.length === 1) {
        return toolQuestions[selectedTools[0]] || defaultQuestion;
      }
      
      // Multiple tools: randomly select a forward-looking question
      return {
        question: getRandomQuestion(),
        option1: '',
        option2: ''
      };
    }

    function updateQuestion() {
      const selectedTools = Array.from(document.querySelectorAll('.tool-btn.selected'))
        .map(btn => (btn as HTMLElement).dataset.tool)
        .filter(Boolean) as string[];
      
      // Update and store the current question
      currentQuestion = getQuestion(selectedTools);
      const questionText = document.getElementById('questionText');
      if (questionText) {
        questionText.textContent = currentQuestion.question;
      }
    }

    document.querySelectorAll('.tool-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.classList.toggle('selected');
        const isSelected = btn.classList.contains('selected');
        btn.setAttribute('aria-pressed', isSelected.toString());
        updateQuestion();
      });
    });

    function buildPrompt(selectedTools: string[]) {
      // Use the stored currentQuestion to ensure consistency with displayed question
      const q = currentQuestion;
      
      let prompt = `# Continuous AI January Dinner


## Context

I'm attending the **Continuous AI January Dinner** in San Francisco.

Continuous AI is about automating the workflows around code, not just the code itself. The philosophy is "AI is Glue" — LLMs bond together varying surfaces: human language, CLIs, APIs, webhooks, databases.

**Learn more:**

- [Continuous AI](https://www.continuousai.com)

- [AI is Glue](https://blog.continue.dev/ai-is-glue)`;

      if (selectedTools.length > 0) {
        prompt += `


## Tools I Use
`;
        selectedTools.forEach(key => {
          const p = partners[key];
          if (p) prompt += `
- **${p.name}** (${p.role}) — ${p.desc}
`;
        });
      }

      prompt += `

---


## Dinner Question

> ${q.question}


---


## Your Task

What's your take? Search the web for recent developments if helpful. I'll bring your answer to dinner.`;

      return prompt;
    }

    const aiUrls: Record<string, string> = {
      claude: 'https://claude.ai/new?q=',
      openai: 'https://chat.openai.com/?q=',
      gemini: 'https://www.google.com/search?udm=50&q='
    };

    const copyBtn = document.querySelector('.ai-btn.copy-btn');
    const copyIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>`;
    const checkIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;

    document.querySelectorAll('.ai-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const ai = (btn as HTMLElement).dataset.ai;
        const selectedTools = Array.from(document.querySelectorAll('.tool-btn.selected'))
          .map(b => (b as HTMLElement).dataset.tool)
          .filter(Boolean) as string[];
        const prompt = buildPrompt(selectedTools);
        
        if (ai === 'copy') {
          navigator.clipboard.writeText(prompt).then(() => {
            if (copyBtn) {
              copyBtn.innerHTML = checkIcon;
              copyBtn.classList.add('copied');
              
              setTimeout(() => {
                copyBtn.innerHTML = copyIcon;
                copyBtn.classList.remove('copied');
              }, 2000);
            }
          });
        } else if (ai && aiUrls[ai]) {
          window.open(aiUrls[ai] + encodeURIComponent(prompt), '_blank');
        }
      });
    });

    updateQuestion();
  }, []);

  return (
    <>
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html {
          overflow-x: hidden;
        }

        .jan2025-page {
          opacity: 1;
        }

        :root {
          --bg: #0a0a0b;
          --bg-card: #111113;
          --border: #1f1f22;
          --border-light: #2a2a2d;
          --text: #fafafa;
          --text-secondary: #a1a1aa;
          --text-muted: #71717a;
        }

        html, body {
          font-family: 'DM Sans', sans-serif;
          background: var(--bg);
          color: var(--text);
          height: 100%;
          line-height: 1.5;
        }

        .container {
          max-width: 680px;
          margin: 0 auto;
          padding: 32px 24px 24px;
          height: 100vh;
          height: 100dvh;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
        }

        .header {
          text-align: center;
          margin-bottom: 20px;
        }

        .header-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 16px;
        }

        .header h1 {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(36px, 10vw, 72px);
          font-weight: 400;
          line-height: 1.05;
          margin-bottom: 8px;
          word-wrap: break-word;
          overflow-wrap: break-word;
        }

        .header h1 em {
          font-style: italic;
          color: var(--text-secondary);
        }

        .header-meta {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: var(--text-secondary);
          margin-top: 12px;
        }

        .section {
          margin-bottom: 20px;
        }

        .section-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 20px;
          text-align: center;
        }

        .tools-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px;
          max-width: 540px;
          margin: 0 auto;
        }

        .tool-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 10px 16px;
          background: transparent;
          border: 1px solid var(--border);
          border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .tool-btn:hover {
          border-color: var(--border-light);
          color: var(--text);
        }

        .tool-btn.selected {
          border-color: var(--text-secondary);
          color: var(--text);
          background: rgba(255,255,255,0.03);
        }

        .tool-btn svg, .tool-btn img {
          width: 16px;
          height: 16px;
          min-width: 16px;
          min-height: 16px;
          flex-shrink: 0;
          object-fit: contain;
          fill: currentColor;
          opacity: 0.7;
        }

        .tool-btn.selected svg, .tool-btn.selected img {
          opacity: 1;
        }

        .question-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 20px 16px;
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .question-text {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(17px, 3vw, 20px);
          font-weight: 400;
          line-height: 1.5;
          text-align: center;
          margin: 0;
          color: var(--text);
          letter-spacing: -0.01em;
        }

        .ask-section {
          margin: 16px 0 0;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .ask-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 20px;
        }

        .ask-bar {
          display: inline-flex;
          align-items: center;
          gap: 16px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 16px 20px;
        }

        .ask-title {
          font-family: 'Instrument Serif', serif;
          font-size: 22px;
          font-weight: 400;
          white-space: nowrap;
        }

        .ask-title em {
          font-style: italic;
          color: var(--text-secondary);
        }

        .ai-buttons {
          display: flex;
          justify-content: center;
          gap: 8px;
          flex-wrap: nowrap;
        }

        .ai-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          padding: 0;
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--border);
          border-radius: 50%;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
        }

        .ai-btn:hover {
          border-color: var(--border-light);
          color: var(--text);
          background: rgba(255,255,255,0.1);
        }

        .ai-btn svg {
          width: 18px;
          height: 18px;
          fill: currentColor;
        }

        .ai-btn.copy-btn svg {
          width: 16px;
          height: 16px;
          fill: none;
        }

        .ai-btn.claude:hover { border-color: #D97757; color: #D97757; background: rgba(217, 119, 87, 0.15); }
        .ai-btn.openai:hover { border-color: #19C37D; color: #19C37D; background: rgba(25, 195, 125, 0.15); }
        .ai-btn.gemini:hover { border-color: #669DF6; color: #669DF6; background: rgba(102, 157, 246, 0.15); }

        .footer {
          text-align: center;
          margin-top: 24px;
          margin-bottom: 0;
          width: 100%;
        }

        .footer p {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: var(--text-muted);
          margin-bottom: 8px;
        }

        .footer-links {
          display: flex;
          justify-content: center;
          gap: 16px;
          font-size: 13px;
        }

        .footer-links a {
          font-family: 'DM Sans', sans-serif;
          color: var(--text-secondary);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .footer-links a:hover {
          color: var(--text);
        }

        .ai-btn.copy-btn.copied {
          border-color: #fafafa;
          color: #fafafa;
          background: rgba(250, 250, 250, 0.15);
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }

        .header { animation: fadeIn 0.7s ease-out; }
        .section:nth-of-type(1) { animation: fadeIn 0.7s ease-out 0.1s both; }
        .section:nth-of-type(2) { animation: fadeIn 0.7s ease-out 0.2s both; }
        .section:nth-of-type(3) { animation: fadeIn 0.7s ease-out 0.3s both; }
        .footer { animation: fadeIn 0.7s ease-out 0.4s both; }

        @media (max-width: 540px) {
          .container { padding: 16px 16px 12px; height: 100vh; height: 100dvh; display: flex; flex-direction: column; justify-content: space-between; }
          .header { margin-bottom: 12px; }
          .header-eyebrow { font-size: 10px; margin-bottom: 6px; }
          .header h1 { font-size: 28px; margin-bottom: 2px; }
          .header-meta { font-size: 12px; margin-top: 4px; }
          .section { margin-bottom: 12px; }
          .section-label { font-size: 10px; margin-bottom: 8px; }
          .tools-grid { gap: 5px; max-width: 100%; }
          .tool-btn { padding: 5px 8px; font-size: 10px; gap: 3px; }
          .tool-btn img { width: 12px; height: 12px; min-width: 12px; min-height: 12px; }
          .question-card { padding: 10px; min-height: 60px; height: auto; border-radius: 10px; }
          .question-text { font-size: 13px; line-height: 1.35; }
          .ask-section { margin-top: 12px; width: 100%; }
          .ask-label { font-size: 9px; margin-bottom: 6px; }
          .ask-bar { flex-direction: column; padding: 10px 14px; gap: 8px; border-radius: 10px; width: 100%; max-width: 260px; }
          .ask-title { font-size: 16px; }
          .ai-buttons { gap: 6px; }
          .ai-btn { width: 36px; height: 36px; }
          .ai-btn svg { width: 16px; height: 16px; }
          .ai-btn.copy-btn svg { width: 14px; height: 14px; }
          .footer { margin-top: 12px; }
          .footer p { font-size: 11px; margin-bottom: 4px; }
          .footer-links { font-size: 11px; gap: 10px; }
        }

        @media (max-width: 375px) {
          .container { padding: 12px 14px 10px; }
          .header { margin-bottom: 10px; }
          .header-eyebrow { font-size: 9px; margin-bottom: 4px; letter-spacing: 0.15em; }
          .header h1 { font-size: 24px; margin-bottom: 2px; }
          .header-meta { font-size: 11px; margin-top: 3px; }
          .section { margin-bottom: 10px; }
          .section-label { font-size: 9px; margin-bottom: 6px; letter-spacing: 0.1em; }
          .tools-grid { gap: 4px; }
          .tool-btn { padding: 4px 7px; font-size: 9px; gap: 3px; }
          .tool-btn img { width: 11px; height: 11px; min-width: 11px; min-height: 11px; }
          .question-card { padding: 8px; min-height: 50px; border-radius: 8px; }
          .question-text { font-size: 12px; line-height: 1.3; }
          .ask-section { margin-top: 10px; }
          .ask-label { font-size: 8px; margin-bottom: 5px; }
          .ask-bar { padding: 8px 12px; gap: 6px; border-radius: 8px; max-width: 240px; }
          .ask-title { font-size: 14px; }
          .ai-buttons { gap: 5px; }
          .ai-btn { width: 32px; height: 32px; }
          .ai-btn svg { width: 14px; height: 14px; }
          .ai-btn.copy-btn svg { width: 12px; height: 12px; }
          .footer { margin-top: 10px; }
          .footer p { font-size: 10px; margin-bottom: 3px; }
          .footer-links { font-size: 10px; gap: 8px; }
        }
      `}</style>

      <div className={`jan2025-page container ${loaded ? 'loaded' : ''}`}>
        <header className="header" role="banner">
          <div className="header-eyebrow">You&apos;re Invited</div>
          <h1 id="page-heading">Continuous AI<br/><em>January Dinner</em></h1>
          <p className="header-meta">San Francisco · January 2026</p>
        </header>

        <section className="section" aria-labelledby="tools-label">
          <div className="section-label" id="tools-label">Which tools do you use?</div>
          <div className="tools-grid" role="group" aria-label="Select the tools you use">
            <button className="tool-btn" data-tool="continue" aria-pressed="false">
              <img src="/jan2026/icons/continue.svg" alt="" width={16} height={16} aria-hidden="true" />
              Continue
            </button>
            <button className="tool-btn" data-tool="github" aria-pressed="false">
              <img src="/jan2026/icons/github.svg" alt="" width={16} height={16} aria-hidden="true" />
              GitHub
            </button>
            <button className="tool-btn" data-tool="snyk" aria-pressed="false">
              <img src="/jan2026/icons/snyk.svg" alt="" width={16} height={16} aria-hidden="true" />
              Snyk
            </button>
            <button className="tool-btn" data-tool="jules" aria-pressed="false">
              <img src="/jan2026/icons/jules.svg" alt="" width={16} height={16} aria-hidden="true" />
              Jules
            </button>
            <button className="tool-btn" data-tool="launchdarkly" aria-pressed="false">
              <img src="/jan2026/icons/launchdarkly.svg" alt="" width={16} height={16} aria-hidden="true" />
              LaunchDarkly
            </button>
            <button className="tool-btn" data-tool="linear" aria-pressed="false">
              <img src="/jan2026/icons/linear.svg" alt="" width={16} height={16} aria-hidden="true" />
              Linear
            </button>
            <button className="tool-btn" data-tool="devin" aria-pressed="false">
              <img src="/jan2026/icons/devin.svg" alt="" width={16} height={16} aria-hidden="true" />
              Devin
            </button>
            <button className="tool-btn" data-tool="confluent" aria-pressed="false">
              <img src="/jan2026/icons/confluent.svg" alt="" width={16} height={16} aria-hidden="true" />
              Confluent
            </button>
            <button className="tool-btn" data-tool="datadog" aria-pressed="false">
              <img src="/jan2026/icons/datadog.svg" alt="" width={16} height={16} aria-hidden="true" />
              Datadog
            </button>
            <button className="tool-btn" data-tool="vercel" aria-pressed="false">
              <img src="/jan2026/icons/vercel.svg" alt="" width={16} height={16} aria-hidden="true" />
              Vercel
            </button>
            <button className="tool-btn" data-tool="cognee" aria-pressed="false">
              <img src="/jan2026/icons/cognee.svg" alt="" width={16} height={16} aria-hidden="true" />
              Cognee
            </button>
            <button className="tool-btn" data-tool="graphene" aria-pressed="false">
              <img src="/jan2026/icons/graphene.svg" alt="" width={16} height={16} aria-hidden="true" />
              Graphene
            </button>
            <button className="tool-btn" data-tool="posthog" aria-pressed="false">
              <img src="/jan2026/icons/posthog.svg" alt="" width={16} height={16} aria-hidden="true" />
              PostHog
            </button>
            <button className="tool-btn" data-tool="notion" aria-pressed="false">
              <img src="/jan2026/icons/notion.svg" alt="" width={16} height={16} aria-hidden="true" />
              Notion
            </button>
            <button className="tool-btn" data-tool="sentry" aria-pressed="false">
              <img src="/jan2026/icons/sentry.svg" alt="" width={16} height={16} aria-hidden="true" />
              Sentry
            </button>
            <button className="tool-btn" data-tool="dlthub" aria-pressed="false">
              <img src="/jan2026/icons/dlthub.svg" alt="" width={16} height={16} aria-hidden="true" />
              dltHub
            </button>
          </div>
        </section>

        <section className="section" aria-labelledby="question-label">
          <div className="section-label" id="question-label">A question to consider</div>
          <div className="question-card" role="region" aria-live="polite">
            <p className="question-text" id="questionText">In 5 years, will AI agents be making more business decisions than humans?</p>
          </div>
        </section>

        <section className="ask-section" aria-labelledby="ask-label">
          <div className="ask-label" id="ask-label">Bring your answer to dinner</div>
          <div className="ask-bar" role="group" aria-label="Ask your AI">
            <span className="ask-title">Ask your <em>AI</em></span>
            <div className="ai-buttons" role="group" aria-label="Choose an AI to ask">
              <a href="#" className="ai-btn claude" data-ai="claude" aria-label="Ask Claude (opens in new tab)">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H8.2l-.927-.463-2.258-.695-.463-.231-.231-.463.115-.58.348-.347.463-.116 2.026.347 2.373.811h.116l.162-.208v-.115l-.046-.116-1.042-1.389-1.62-1.967-.347-.579v-.463l.231-.463.463-.232h.116l.463.116.463.348 1.736 2.083 1.041 1.389.116.115.194-.034.07-.081v-.116l.116-1.736.231-2.778.116-.463.347-.347.58-.116.463.232.231.463-.115 2.894-.232 2.2v.115l.058.088.09.028h.083l.115-.116 1.968-1.852 1.967-1.62.463-.232.579.116.348.348.115.579-.231.463-1.736 1.62-1.852 1.62-.116.115v.168l.046.078.07.058 2.315.348 2.778.463.463.231.231.463-.115.58-.348.347-.463.116-2.894-.348-2.199-.347h-.116l-.087.057-.07.09v.084l.116.115.926.695 2.315 1.852.347.463v.579l-.347.348-.58.115-.462-.231-2.2-1.62-1.157-.927-.116-.115h-.168l-.078.046-.058.07v.199l.347 2.43.232 2.315v.463l-.348.463-.463.116-.579-.116-.347-.463-.464-2.894-.231-2.083v-.116l-.058-.087-.09-.028h-.083l-.116.115-1.273 1.968-1.736 2.315-.463.347h-.579l-.347-.347-.116-.58.232-.462 1.157-1.736 1.505-2.084.115-.115v-.168l-.046-.078-.07-.058h-.199l-2.778.695-2.083.347-.463-.115-.347-.348-.116-.579z"/></svg>
              </a>
              <a href="#" className="ai-btn openai" data-ai="openai" aria-label="Ask ChatGPT (opens in new tab)">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/></svg>
              </a>
              <a href="#" className="ai-btn gemini" data-ai="gemini" aria-label="Ask Gemini (opens in new tab)">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 24A14.304 14.304 0 0 0 0 12 14.304 14.304 0 0 0 12 0a14.305 14.305 0 0 0 12 12 14.305 14.305 0 0 0-12 12"/></svg>
              </a>
              <button className="ai-btn copy-btn" data-ai="copy" aria-label="Copy prompt to clipboard">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
              </button>
            </div>
          </div>
        </section>

        <footer className="footer" role="contentinfo">
          <p>Looking forward to seeing you there</p>
          <nav className="footer-links" aria-label="Footer links">
            <a href="https://www.continuousai.com" target="_blank" rel="noopener noreferrer">Continuous AI<span className="sr-only"> (opens in new tab)</span></a>
            <a href="https://blog.continue.dev/ai-is-glue" target="_blank" rel="noopener noreferrer">AI is Glue<span className="sr-only"> (opens in new tab)</span></a>
          </nav>
        </footer>
      </div>
    </>
  );
}
