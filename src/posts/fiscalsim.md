PolicyEngine, a nonprofit organization, has been dedicated to providing free, open-source software that computes the impact of public policy. Our mission has been to democratize the policy process by making it accessible for everyone, from experts to everyday citizens. To achieve this, we are committed to open-sourcing our models, apps, and reports, allowing anyone to freely use and scrutinize them. [PolicyEngine US](http://policyengine.org/us), our microsimulation model, is a collaborative project with contributions from over 40 volunteer developers.

Recently, we noticed the launch of [FiscalSim](http://fiscalsim.thecgo.org) by the [Center for Growth and Opportunity at Utah State University (CGO)](http://thecgo.org). In this post, we reflect on its development, our contributions to the project, and our past collaboration with CGO.

## The launch of FiscalSim

FiscalSim, a project of the CGO, allows users to simulate the effects of policy experiments on individuals and the economy. While we appreciate the CGO’s efforts to create a tool that promotes transparency and accessibility in the policy-making process, we feel it’s important to acknowledge the foundational work done by PolicyEngine and our past collaboration with the CGO.

[FiscalSim’s FAQ](https://fiscalsim.thecgo.org/faq/) highlights the capabilities of its tax-benefit microsimulation model, FiscalSim US, and provides a link to its source code on GitHub. As explained in [their GitHub repo](http://github.com/thecgo/fiscalsim-us), “much of the original federal tax and benefit code and some of the state tax logic was developed by PolicyEngine.”

## FiscalSim US model

Currently, the only differences between the FiscalSim US model and PolicyEngine US are the name and the inclusion of Utah’s state income tax policy. Of the policies listed in [their FAQ](https://fiscalsim.thecgo.org/faq/), all but the state income tax and state tax credits (and of those, only Utah) were implemented by PolicyEngine.

![](https://cdn-images-1.medium.com/max/2636/0*62EpTM4TErJ8l9bG)

Indeed, of all line changes in the FiscalSim US repo, 99% come from five [pull requests](https://github.com/TheCGO/fiscalsim-us/pulls?q=is%3Apr+is%3Aclosed) that solely add our updates to their code. The CGO made these pull requests while the repo was private, and a [comment](https://web.archive.org/web/20230324190736/https://github.com/TheCGO/fiscalsim-us/pull/27#issuecomment-1453095703) in one of them suggests that the mechanism to copy our code lies in their fiscalsim-us-maintenance repo, which [remains private](http://github.com/thecgo/fiscalsim-us-maintenance).

We have always made PolicyEngine’s code entirely open source.

## FiscalSim interface

The CGO based FiscalSim’s interface largely on PolicyEngine’s original design, which we used from [March 2022](https://policyengine.org/us/blog/2022-03-31-policyengine-comes-stateside) to [January 2023](https://policyengine.org/us/blog/the-new-policyengine). Unlike our open source interface, FiscalSim is closed-source, so we cannot determine how much code traces to our work. But the visual similarities are evident.

Consider these screenshots from our [Washington state launch](https://policyengine.org/us/blog/2022-08-10-policyengine-launches-in-washington-state), covering the four core screens of the app: household definition, policy reform, household impact, and population impact.

The household screen resembles our original app, with sections of inputs on the left, inputs in the center, page navigation at the top (though they move some navigation to the far left), and reforms on the right. Because the content and organization of the variables follows from the model, those also match.

![](https://cdn-images-1.medium.com/max/2744/0*wVbrT7kMusj7SZd7)

Similarly, FiscalSim’s parameter design mirrors ours.

![](https://cdn-images-1.medium.com/max/3200/0*8Du2q8bZ9XZIgfMr)

The household net income screen breaks down income the same way (our video didn’t include a policy reform on this screen, but it had the same format and content as FiscalSim does).

![](https://cdn-images-1.medium.com/max/3200/0*JOpdYNHh5Q-Ui42c)

The population impact screen also contains the same summaries and charts as our original version did.

![](https://cdn-images-1.medium.com/max/3200/0*S_WY5xxmUgcjYRzt)

Each of the four main sections of the FiscalSim app — household definition, policy reform, household impact, and population impact — draw heavily from our design, and the 99%-similar model code further highlights the resemblances.

## Collaboration with the CGO

About a year ago, the CGO funded PolicyEngine’s development of state income taxes in three states: Maryland, Massachusetts, and Washington. We sought to support their research through continued development, but they opted to build a separate app instead.

We have credited the CGO’s financial contribution on [GitHub](http://github.com/policyengine/policyengine-us) and [our blog](https://policyengine.org/us/blog/2022-08-10-policyengine-launches-in-washington-state), and we would do the same if we incorporate CGO code (like the Utah income tax) into PolicyEngine. But that contribution now represents a small part of our software, which also includes seven other state income tax models, all federal taxes and major benefit programs, microdata processing, the policyengine-core framework, impact summaries, and the front-end, all of which is the product of over 40 (mostly volunteer) contributors.

## Acknowledging collaborative efforts

We understand that the development of software often involves collaboration and building upon existing frameworks. In the spirit of open-source development, we encourage the sharing and improvement of tools that contribute to better policy outcomes. However, we believe it’s essential to give credit where it’s due and acknowledge the collaborative efforts that have led to the creation of such tools. For instance, we credited the [Policy Simulation Library](http://pslmodels.org) and [SNAP Screener](https://www.snapscreener.com/?p=table) for their helpful transparency in [our US launch](https://policyengine.org/us/blog/2022-03-31-policyengine-comes-stateside), and [OpenFisca](http://openfisca.org) when we [forked it](https://policyengine.org/us/blog/2022-11-10-from-openfisca-to-policyengine) into our own microsimulation framework.

## Moving forward

As we move forward, PolicyEngine remains committed to advancing open-source policy modeling tools and fostering collaboration within the community. We encourage the sharing and improvement of tools that contribute to better policy outcomes and believe it’s essential to give credit where it’s due.

We hope that future collaborations between PolicyEngine and other organizations, like the CGO, will result in mutual recognition and an open dialogue that benefits the policy-making community as a whole. As the landscape of policy modeling tools continues to evolve, it is crucial for organizations to work together to advance transparency, collaboration, and innovation. By working together, we can contribute to the ongoing development of accessible, transparent, and effective policy-making solutions.
