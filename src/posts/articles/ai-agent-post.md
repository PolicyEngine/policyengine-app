PolicyEngine uses [Claude Code](https://claude.com/product/claude-code) to handle entire programming projects. Claude Code gives AI direct access to your entire codebase, rather than requiring you to copy-paste code snippets.

## How it works

Claude Code operates directly in your terminal with full project context. While other AI coding tools exist (like Cursor), Claude Code integrates well with PolicyEngine's codebase.

## How to begin

You can check [pricing](https://claude.com/pricing) details on Anthropic's website. Once you have access:

```bash
npm install -g @anthropic-ai/claude-code
```

![](/images/posts/ai-agent-post/image1.png)

For PolicyEngine's work, this means having a development partner that understands our entire microsimulation framework and policy modelling architecture.

## Sub-agents

At PolicyEngine, we have explored how to structure AI assistance. Rather than using Claude Code as a single developer, we tested specialised AI teams where one agent reviews research requirements, another handles policy modelling code, and a third runs validation tests. These specialised helpers are called sub-agents, and we experimented with how to configure them to work together on policy research workflows.

## Example from our research

We used our recent carbon dividend policy analysis for the UK. This [analysis](https://policyengine.org/uk/research/uk-carbon-tax-dividend) examines how carbon tax and dividend policies would affect UK households under two scenarios: £100 and £200 per tonne of CO2, where all tax revenue is returned as equal dividends to every resident.

## Building agents for PolicyEngine workflows

We used the `/agents` command to build specialised agents for our analysis workflow. For example, we created a data fetching agent specifically for PolicyEngine's infrastructure.

We defined its role: "_This agent fetches the latest information from PolicyEngine UK's GitHub repository and pulls current carbon tax calculation methods._"

And specified when to activate it: "_Use this agent when you need current PolicyEngine UK documentation or want to access the latest policy research findings._"

Sub-agents are stored as Markdown files in `.claude/agents/`, allowing us to iteratively refine what each agent does, which tools it accesses, and what outputs it provides to other agents in the workflow.

![](/images/posts/ai-agent-post/image2.png)

## Orchestrating sub-agents for policy analysis

Once we built multiple agents, they worked together on complete workflows instead of running them one by one.

In our test setup, one agent **fetches PolicyEngine data**, another **writes analysis scripts**, and a third **generates the final report**. The fetcher retrieves the latest microsimulation data from PolicyEngine UK's GitHub repository, the script writer creates the policy analysis code, and the report generator produces the research output. Each agent passes its results to the next one in the pipeline.

![](/images/posts/ai-agent-post/image3.png)

## Testing policy analysis workflows

Claude Code automatically routes different parts of a research request to the appropriate agents based on their defined roles. Here's how we tested it:

```bash
claude-code "I need a complete analysis of UK carbon dividend policy impacts on low-income households"
```

Claude Code processes this request and automatically:

- Routes data and information collection to the `policyengine-fetcher` agent
- Assigns script development to the `policyengine-script-writer` agent
- Passes report creation to the `policy-report-generator` agent

When we ran this command, the agents coordinated their work:

![](/images/posts/ai-agent-post/image4.png)

## Results and learnings

With proper agent configuration, we generated results similar to what our analysts produce manually. The benefit lies in the time savings for future research projects with similar structures.

Our testing revealed the importance of having a separate reviewer sub-agent for both code and analysis output. This quality control layer catches errors that the generating agents might miss, maintaining PolicyEngine's research standards.

## Limitations

Through our experimentation, we identified several limitations of AI agents for policy research:

- **Prompting requires precision:** Agent definitions need detailed specifications. Vague descriptions produce unpredictable results, particularly for policy modelling work that requires specific methodological approaches.
- **Code review needs independence:** Code reviewer agents must be completely separate from code-generating agents. When the same agent both writes and reviews code, it misses its own assumptions and errors.
- **Quality fluctuates during peak times:** We observed variations in Claude Code's output quality, especially during high-demand periods.
- **Best for expanding existing projects:** The technology works most effectively when building on established codebases like PolicyEngine's existing infrastructure, rather than creating entirely new frameworks.

## Looking ahead

At PolicyEngine, we continue exploring how AI agents and tools like Claude Code can enhance policy research and development workflows. We invite you to follow [PolicyEngine](https://policyengine.org/) for updates on our exploration of AI technologies.
