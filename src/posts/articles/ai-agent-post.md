At PolicyEngine, we continuously explore cutting-edge technologies to enhance our policy research and code development. We are now excited to share our exploration of a transformative approach: using AI to handle entire programming projects, not just individual tasks.

We find that [Claude Code](https://www.claude.com/product/claude-code) represents a fundamental shift in this workflow by giving AI direct access to your entire codebase.

## How it works

Unlike traditional AI coding, where you describe what you want and copy-paste results, Claude Code operates directly in your terminal with full project context.

While there are other AI coding tools available, our testing shows Claude Code produces particularly clean code that integrates well with our existing PolicyEngine codebase.

## How to begin

You can check [pricing](https://claude.com/pricing) details on Anthropic's website. Once you have access:

```bash
npm install -g @anthropic-ai/claude-code
```

![](/images/posts/ai-agent-post/image1.png)

For PolicyEngine's work, this means having a development partner that understands our entire microsimulation framework and policy modelling architecture.

## What are sub-agents?

At PolicyEngine, we have explored how to structure AI assistance more effectively. Rather than using Claude Code as a single developer, we tested specialised AI teams where one agent reviews research requirements, another handles policy modelling code, and a third runs validation tests. These specialised AI helpers are called sub-agents, and we experimented with how to configure them to work together on policy research workflows.

## A real example from our research

As an example, we used our recent carbon dividend policy analysis for the UK. This [analysis](https://policyengine.org/uk/research/uk-carbon-tax-dividend) examines how carbon tax and dividend policies would affect UK households under two scenarios: £100 and £200 per tonne of CO2, where all tax revenue is returned as equal dividends to every resident.

## Building an AI agent for PolicyEngine workflows

We started by using the `/agents` command to build specialised agents for our analysis workflow. For example, we created a data fetching agent specifically for PolicyEngine's infrastructure.

We defined its role: "_This agent fetches the latest information from PolicyEngine UK's GitHub repository and pulls current carbon tax calculation methods._"

And specified when to activate it: "_Use this agent when you need current PolicyEngine UK documentation or want to access the latest policy research findings._"

Subagents are stored as Markdown files in `.claude/agents/`, allowing us to iteratively refine what each agent does, which tools it accesses, and what outputs it provides to other agents in the workflow.

![](/images/posts/ai-agent-post/image2.png)

## Orchestrating sub-agents for policy analysis

Our experiments show that multiple agents can work together on complete research workflows instead of handling tasks sequentially.

In our test setup, one agent fetches PolicyEngine data, another writes analysis scripts, and a third generates the final report. The fetcher retrieves the latest microsimulation data from PolicyEngine UK's GitHub repository, the script writer creates the policy analysis code, and the report generator produces the research output. Each agent passes its results to the next one in the pipeline.

![](/images/posts/ai-agent-post/image3.png)

## Testing complete policy analysis workflows

In our testing, Claude Code automatically routes different parts of a research request to the appropriate agents based on their defined roles. Here's how we tested it:

```bash
claude-code "I need a complete analysis of UK carbon dividend policy impacts on low-income households"
```

Claude Code processes this request and automatically:

- Routes data and information collection to the `policyengine-fetcher` agent
- Assigns script development to the `policyengine-script-writer` agent
- Passes report creation to the `policy-report-generator` agent

When we ran this command, the agents coordinated their work:

![](/images/posts/ai-agent-post/image4.png)

## Early results and learnings

Through careful agent configuration, we were able to generate results comparable to what our analysts produce manually. The potential benefit lies in the time savings for future research projects with similar structures.

Our testing revealed the importance of having a separate reviewer sub-agent for both code and analysis output. This quality control layer catches errors that the generating agents might miss, maintaining PolicyEngine's research standards.

## Current limitations we've observed

Through our experimentation, we've identified several limitations of AI agents for policy research:

- **Prompting requires precision:** Agent definitions need detailed specifications. Vague descriptions produce unpredictable results, particularly for policy modelling work that requires specific methodological approaches.
- **Code review needs independence:** We found that code reviewer agents must be completely separate from code-generating agents. When the same agent both writes and reviews code, it misses its own assumptions and errors.
- **Quality fluctuates during peak times:** We observed variations in Claude Code's output quality, especially during high-demand periods.
- **Best for expanding existing projects:** The technology works most effectively when building on established codebases like PolicyEngine's existing infrastructure, rather than creating entirely new frameworks.

## Looking ahead

At PolicyEngine, we remain excited to continue exploring how AI agents and tools like Claude Code can enhance policy research and development workflows.

We will share more insights as we integrate these tools into our research process. Follow [PolicyEngine](https://policyengine.org/) for updates on our work in computational policy analysis.
