We just completed a $700,000 grant application to USDA's Public Benefit Innovation Fund using an entirely new approach: treating the entire process as a software development project powered by Claude Code. We built not just a grant application but a complete system—50+ pages of content, an interactive demonstration site, and secured partner commitments. Here's how AI transformed grant writing from a document management challenge into a dynamic development process.

## The challenge: 15 complex questions, 250 words each

The PBIF application demanded extreme precision: 15 questions about technical architecture, equity considerations, stakeholder engagement, and sustainability—each limited to exactly 250 words. Traditional grant writing would involve weeks of drafting, editing, and word-counting. Instead, we treated the entire application as a software development project.

## Building with Claude Code: Everything as code

Rather than using Word documents and email chains, we structured everything in Git:

```
atlas/
├── docs/pbif/responses/       # 15 markdown files, one per question
├── scripts/                   # Python scripts to compile and validate
├── src/components/            # React components for the demo site
└── public/                    # Interactive demonstration
```

Every response lived in version-controlled markdown. When reviewers suggested changes, Claude Code would:

- Update the specific response file
- Regenerate the compiled application
- Ensure word counts stayed within limits
- Propagate terminology changes across all documents
- Update the interactive demo to match

## Real-time iteration with stakeholders

The most powerful moment came during a stakeholder call. As they asked questions like "How would a caseworker actually find documents?", I could say "Let me show you" and have Claude Code generate a working prototype in minutes. The live demo site evolved during the conversation, incorporating feedback immediately.

When someone suggested emphasizing our North Carolina pilot with the Atlanta Fed, Claude Code instantly:

- Found every mention across 50+ files
- Updated the language consistently
- Adjusted the demo site's examples
- Regenerated all compiled documents

## Managing complexity through AI memory

The application grew to include:

- 15 response documents (3,750 words exactly)
- Partner letters from MyFriendBen, Benefit Navigator, Georgia Center for Opportunity
- Budget breakdowns across multiple worksheets
- Technical architecture diagrams
- An interactive demonstration with three major sections

Claude Code maintained perfect consistency across everything. When we changed "policy library" to "PolicyEngine Atlas", it updated 47 locations automatically. When we adjusted budget allocations, it recalculated totals and updated narrative descriptions simultaneously.

## The revelation: "Everything can be software"

Marc Andreessen's famous "software is eating the world" quote took on new meaning. Grant applications—traditionally the most document-heavy, bureaucratic processes—became fluid, living code. Changes that would trigger days of review became Git commits. Version control replaced email chains. Pull requests replaced track changes.

Most remarkably, treating documentation as code improved quality. The 250-word limit forced clarity. Git's version control captured every iteration. The interactive demo let reviewers experience our vision rather than reading about it.

## Lessons for grant writers and developers

1. **Structure beats process**: Organizing content as discrete, version-controlled files enables parallel work and atomic updates.

2. **Interactive demos convince**: Building a working prototype during the application process demonstrates capability better than any narrative.

3. **AI excels at consistency**: Humans miss inconsistencies across large documents. AI doesn't.

4. **Constraints improve clarity**: The 250-word limit, enforced programmatically, eliminated fluff and forced precise communication.

5. **Everything really can be code**: Even the most traditional documents benefit from version control, automated building, and systematic updates.

## What this means for the future

If AI can transform grant writing—arguably one of the most traditional, document-heavy processes—what else can it revolutionize? We're entering an era where the boundary between "technical" and "non-technical" work dissolves. Writers become developers. Documents become applications. Static PDFs become interactive experiences.

The PolicyEngine Atlas application wasn't just about getting funding. It was a proof of concept that AI-powered development can transform any information-heavy process. When everything becomes software, everything becomes possible.
