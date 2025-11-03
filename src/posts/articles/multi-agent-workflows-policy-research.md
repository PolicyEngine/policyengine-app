When we finished our [UK carbon dividend analysis](https://legacy.policyengine.org/uk/research/uk-carbon-tax-dividend) this autumn, we wondered whether [Claude Code's](https://claude.com/claude-code) multi-agent system could have automated parts of the research workflow. We tested it on a similar policy analysis to find out.

## Building a multi-agent research workflow

Using Claude Code, we configured three [specialised agents](https://docs.claude.com/en/docs/claude-code/agents) to handle different parts of a policy analysis pipeline. The first agent fetches PolicyEngine microsimulation data from our GitHub repositories and documentation. The second writes analysis scripts using our [Python package](https://github.com/PolicyEngine/policyengine-uk). The third generates formatted research output from the results.

We stored each agent as a markdown file in [`.claude/agents/`](https://docs.claude.com/en/docs/claude-code/agents#creating-custom-agents), defining their specific roles and tools. The data fetching agent got access to GitHub APIs and PolicyEngine documentation. The script writer could execute Python and access our policyengine-uk package. The report generator worked with markdown formatting and [Plotly](https://plotly.com/) visualisations.

![](/images/posts/multi-agent-workflows-policy-research/claude-code-interface.png)

Claude Code automatically routes tasks to the appropriate agent based on the request. When we asked it to analyse a carbon tax scenario, it handled the coordination without explicit instructions about which agent should do what.

![](/images/posts/multi-agent-workflows-policy-research/create-agent-dialog.png)

## What worked

For standard distributional analyses—calculating poverty rates, Gini coefficients, and decile-level impacts—the workflow produced output matching our manual approach. The agents correctly structured PolicyEngine API calls and generated properly formatted charts.

The system saved the most time on repetitive tasks. Once we configured the agents for UK distributional analysis, we needed minimal adjustments to run similar analyses on other policies. This matters for our work where we often model multiple versions of the same reform.

The report generator consistently matched PolicyEngine's house style at least as well as our human writers typically do on first attempt. It maintained active voice, avoided subjective adjectives, and led with quantitative findings.

![](/images/posts/multi-agent-workflows-policy-research/policyengine-agents-list.png)

## What didn't work

Complex policy modelling exposed the limits. When calculations required understanding interactions between multiple benefit programmes—like how Universal Credit's taper interacts with Housing Benefit phase-outs—the agents struggled. They would implement each programme correctly in isolation but miss the coordination logic.

We found prompt precision mattered more than expected. An instruction to "analyse carbon tax impacts" produced generic output. We needed specifics: "Calculate relative change in net income by decile, poverty rates by demographic group, and constituency-level winners and losers." The agents don't infer methodological standards the way human researchers do.

We hit an unexpected problem with code review. Our first approach used the script-writing agent to review its own code. This caught syntax errors but missed logical problems. We had to create a separate reviewer agent with different prompting to get meaningful code critique.

![](/images/posts/multi-agent-workflows-policy-research/agents-in-progress.png)

## What we learned

Multi-agent workflows work best when the task has clear boundaries and established patterns. Our monthly policy briefs analysing government reforms fit this pattern. Research exploring new methodologies doesn't.

The technology changes how we think about research automation. Instead of one AI that does everything, specialised agents with defined responsibilities produce more reliable output. This mirrors how a streamlined policy analysis shop might operate—one person pulls data, another writes Python, a third formats the report.

These limitations reveal where human judgement remains essential. When policy interactions get complex, when methodological choices require expertise, or when political context matters for framing, the agents defer to human researchers. That's the right division of labour.

## Addressing the shortcomings

We're working to address these limitations through improved agent configurations and leveraging Anthropic's recently launched [Skills](https://www.anthropic.com/news/skills) and [plugin ecosystem](https://www.anthropic.com/news/claude-code-plugins). Skills allow us to package specific PolicyEngine expertise—like properly structuring benefit programme interactions or applying our methodological standards—into reusable components that Claude Code loads when needed.

We're packaging these insights into the [policyengine-claude plugin](https://github.com/PolicyEngine/policyengine-mcp), which enables other researchers to use Claude Code with PolicyEngine more effectively. The plugin includes specialised agents, pre-configured skills for common policy analyses, and direct database access through the Model Context Protocol.

We'll demonstrate this workflow at our [PolicyEngine 2.0 event](https://www.eventbrite.co.uk/e/policyengine-20-and-the-future-of-public-policy-analysis-tickets-1673065246189?aff=oddtdtcreator) on 3 November in London, where we'll show how these tools work together for real policy analysis. If you're interested in seeing multi-agent workflows in action for policy research, we'd encourage you to attend.

We're deploying this workflow for routine policy updates where the analysis structure stays constant. It won't replace human researchers, but it will free them to focus on questions that require genuine policy expertise rather than technical execution.
