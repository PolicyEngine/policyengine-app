One of the most talked-about reforms of the last few years has been making the Child Tax Credit fully refundable (enabling it to reduce federal income tax liabilities below zero). Let’s walk through how to model it in PolicyEngine.

## The landing page

The landing page now has a new look. We know that PolicyEngine users usually fall into two categories: people who want to calculate their household’s taxes and benefits (sometimes under a policy reform), and people who want to run economic analyses of custom-built policy reforms (and also simulate example households). So we’ve split these use-cases up on the landing page.

We’re interested in building a new reform, so we’ll select _Compute the impact of policy reforms_.

## Building a policy

![](https://cdn-images-1.medium.com/max/3200/0*4DGD1Jbyq5ljyNxX)

_The policy builder page on PolicyEngine._

On this part of the app, we can specify the details of our policy reform, and simulate it on the economy. There are three panes in this view.

The _left pane_ is for navigation: use this to select what the middle pane should be showing. The top half is a menu of all the _input parameters_: policy parameters you can change to build a reform (for example, the first rate of federal income tax). The bottom half is a menu of all the _outputs_: things the model can tell you about how your reform affects the economy (for example, the effect on poverty rates).

The _middle pane_ shows different things depending on what you’ve selected in the left pane. If you select a policy parameter, it’ll give you the option to change that parameter. If you select an output, it’ll show you a chart and some explanation.

The _right pane_ lets you control your policy reform at a high level: giving it a name, selecting where and when to simulate it, and against what baseline. You can also use this pane to move on from this screen and see how a specific household fares under a reform.

We want to build a reform that makes the CTC fully refundable: first, we need to select the right parameter. The left pane organises parameters by government department, so we could find it by navigating into _IRS > Credits > Child Tax Credit > Refundability_.

But a faster way is to use the search bar in the top-left to jump straight to it. Search for _Fully refundable CTC_ and you’ll see the parameter deciding whether the CTC should be fully refundable or not.

![](https://cdn-images-1.medium.com/max/2844/0*E-av1hWDz0pqPrgH)

_Searching for the fully refundable CTC parameter._

We’ll select this parameter. The middle screen now shows that parameter: its title, description, and a graph of its value over time. This is one of the most powerful new features in PolicyEngine: the ability to specify a time-dated parametric reform to _any_ degree of complexity. Instead of just being able to set a parameter’s value for the current year, you can set it for any time period, as many times as you’d like using the start-end date dialogue.

For now though, we’ll just set it to true by clicking on the switch.

![](https://cdn-images-1.medium.com/max/3200/0*_vw5TE6Ee77qhYcI)

_Making the CTC fully refundable._

You’ll notice the right sidebar has updated with a description of our reform, and it’s been auto-designated the name _Policy #5_. Let’s rename it to _Making the CTC fully refundable_ by typing that into the name displayed in the top-right.

Now, we’re ready to see the economic analysis. Click on _Calculate economic impact_ to see how it affects the US in 2023.

## Scoring the economic impact

The middle pane now shows a menu of what the model can tell you: the effect on the budget, poverty impacts, distributional impacts and more. Navigating onto the budgetary impact chart, we can see that this reform costs £2bn.

We can also look at the distributional impact, for example by selecting _Outcomes by income decile_. This reform mainly affects households in the top half of the income distribution, and the top decile sees the highest proportion of people affected by the reform.

![](https://cdn-images-1.medium.com/max/3200/0*XWRXPEI2SbcQxmRN)

_Distributional analysis of making the CTC fully refundable._

## Calculating a household’s impact

Economic analyses are important for understanding the broader picture of a reform over an entire country, but policy discussions often centre around specific examples or edge cases. We’ve streamlined the design of the household calculator on PolicyEngine to make it easier and faster to get the numbers out of the model.

Select _Enter my household_ to jump into the household analysis page. This will take you to the household page (like you would have seen if you had selected _Compute household impacts_ at the very start, but now with your policy saved).

![](https://cdn-images-1.medium.com/max/3200/0*x3qORoKzds5BP2s7)

_The household calculator’s landing page._

This screen is set out just like the policy screen: the left pane is for navigation, and is split between inputs and outputs. The middle pane lets you change household properties instead of policy parameters, and the right pane now will show details about your household once you’ve entered them.

The household screen will now give you an option to start entering details about your household. Click through, and use the prompts given to specify a few basic details: adults and children, location, income and age (you’ll be able to add more later).

Once you’ve entered these, you’ll be taken straight to the _Net income_ page, which tells you how your household is affected by the reform.

![](https://cdn-images-1.medium.com/max/3200/0*7e4eDhkrqdHUeMHb)

_The net income screen._

This screen can tell us exactly why the household is affected like this: expand individual sections to trace down where the change comes from.

Another major new feature comes under the _Varying your earnings_ option in the bottom left pane: the ability to see how specific properties of a household change in response to earnings, not just net income. Here, we can use it to see how net federal income tax changed by income, with and without the reform.

![](https://cdn-images-1.medium.com/max/3200/0*kcL3FBhilVYAFuJh)

_Federal income tax by income, under the abolition reform._

We can also see the impact on marginal tax rates: for a household with $20,000 income, making the CTC fully refundable raises their MTR from 23% to 38%.

From here, you can go back and change any input variable (by the left navigation menu, or with the search box in the top left), go back and change the policy reform, or revisit any other part of the app.

Let us know what policy ideas you create, by tagging @ThePolicyEngine.
