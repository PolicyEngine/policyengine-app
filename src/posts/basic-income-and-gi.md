# How to simulate basic and guaranteed income policies in PolicyEngine US

From universal basic income to age-dependent means-tested payments, we’ve got you covered.

![The [UBI Center](http://ubicenter.org) contributed basic income policy parameters to PolicyEngine.](https://cdn-images-1.medium.com/max/3200/0*VlH7Jmyh19_-S0UU)_The [UBI Center](http://ubicenter.org) contributed basic income policy parameters to PolicyEngine._

With PolicyEngine US, you can adjust hundreds of parameters defining federal and state tax and benefit programs, and then compute how adjusting those programs would affect society and households. But did you know you can also model policies that don’t currently exist, like basic income?

To define policies that don’t exist, scroll past the *Simulation, US government, *and *State government *parameter menus in our [*Policy *page](http://policyengine.org/us/policy) and select _Third party_. Here you’ll find third-party-contributed policy parameters. Currently that includes _Congress_, which shows parameters that characterize the End Child Poverty Act (more on that below), and _UBI Center_,¹ which shows parameters that characterize basic or guaranteed income policies (we use the term _basic income_). Before it was signed into law, we characterized policies in the Inflation Reduction Act in the _Third party > Congress_ menu, too.

![Part of PolicyEngine’s basic income parameter menu from a mobile device.](https://cdn-images-1.medium.com/max/2000/1*-OToQxH1XvFoz4nqT73DXA.png)_Part of PolicyEngine’s basic income parameter menu from a mobile device._

In this blog post, we’ll show you how to design and compute the impact of basic income policies covering a range of parameters. We’ll do this through the lens of four example reforms:

1. **Universal basic income \***Example: Applying the [Alaska Permanent Fund Dividend](https://pfd.alaska.gov/) nationwide\*

1. **Age-dependent basic income \***Example: [End Child Poverty Act](https://www.congress.gov/bill/117th-congress/house-bill/6598/text?r=4&s=1), a bill from Representatives Rashida Tlaib and Mondaire Jones\*

1. **Phasing out basic income as a percent over a threshold \***Example: [Seed Money Act](https://www.endpovertymaketrillions.com/the-plan), a proposal from [End Poverty Make Trillions](https://www.endpovertymaketrillions.com/)²\*

1. **Phasing out basic income over an income range \***Example: [Guaranteed Income for the 21st Century](https://drive.google.com/file/d/1UDFPwUYu2Rf4RGgXuOTacmBj2Gt9paAV/view), a proposal from the [Economic Security Project](https://www.economicsecurityproject.org/) and the [New School](https://www.newschool.edu/)\*

After you’ve created any of these policies, you can compute the impact on the population (budget, poverty, and inequality), both to the US or within a state, and also compute the impact on a given household. To learn more about these impacts, see our blog posts on the [PolicyEngine US household calculator](https://blog.policyengine.org/policyengine-comes-stateside-cef88b122e48) and [population impact page](https://blog.policyengine.org/the-new-policyengine-us-population-impact-page-de68cb4ba71a).

## Universal basic income

The first policy switch under _Amounts_ is the simplest: an unconditional, universal cash payment to every member of the population. By default, it does not affect any other taxes or benefits, has no means test, and increases the income of each person by the same amount.

### _Example: Applying the [Alaska Permanent Fund Dividend](https://pfd.alaska.gov/) nationwide_

Suppose the US implemented its own version of [Alaska’s Permanent Fund Dividend](https://pfd.alaska.gov/). Since 1982, Alaska has given each resident a share of the return on its sovereign wealth fund, funded by oil revenue. The most recent payment, in 2021, was [$1,114 per person](https://pfd.alaska.gov/Division-Info/summary-of-dividend-applications-payments).

To simulate that policy nationwide, enter **1114** in the top *Basic income *parameter.

![](https://cdn-images-1.medium.com/max/3200/0*eqOCDQgqARfOKWf2)

[\*\*See the impact of a $1,114 per person payment in PolicyEngine here.](https://policyengine.org/us/population-impact?bi_amount=1114)\*\*

## Age-dependent basic income

To design basic income policies that grant different amounts to different age groups, use the controls in the _Amounts_ tab. These controls let you use five age-based basic income levels:

- Young children (under age 6)

- Older children (6 to 17)

- Young adults (18 to 24)

- Older adults (25 to 64)

- Senior citizens (65 or older)

You can adjust the age bounds and set the basic income amount for each of these age groups.

### _Example: [End Child Poverty Act](https://www.congress.gov/bill/117th-congress/house-bill/6598/text?r=4&s=1), a bill from Representatives Rashida Tlaib and Mondaire Jones_

The End Child Poverty Act would:

1. Provide a basic income for each child equal to the difference between the [poverty line](https://aspe.hhs.gov/topics/poverty-economic-mobility/poverty-guidelines) for a one- and two-person household; currently, that’s $4,720 per year ($393 per month)

1. Create a refundable credit of $600 per adult dependent

1. Create a refundable credit of $600 per filer ($1,200 for joint filers), phasing out at 5% for income above $20,000 ($40,000 for joint filers)

1. Repeal the Child Tax Credit and the Earned Income Tax Credit

To model the basic income for children, skip the first basic income amount and enter **4720** in the _Young child basic income_ box. Then to apply it to all children up to age 18, enter **19 **in the *Older child basic income age *box. To avoid overlapping age ranges, the last step is entering **20 **(or any age between 20 and 24) in the *Young adult basic income age *box.

![](https://cdn-images-1.medium.com/max/3200/0*5UFNDEwvxpq5BepR)

You can use the *Third party > Congress > House > Rep Tlaib *parameter menus to specify provisions 2 and 3, and the *US government > IRS > Credits > {Child, Earned income} tax credit > General *parameter menus to specify provision 4.

[\*\*See the End Child Poverty Act in PolicyEngine here.](https://policyengine.org/us/population-impact?abolish_eitc=1&end_child_poverty_act_adult_dependent_credit_amount=600&end_child_poverty_act_filer_credit_amount_HEAD_OF_HOUSEHOLD=600&end_child_poverty_act_filer_credit_amount_JOINT=1200&end_child_poverty_act_filer_credit_amount_SEPARATE=600&end_child_poverty_act_filer_credit_amount_SINGLE=600&end_child_poverty_act_filer_credit_amount_WIDOW=600&end_child_poverty_act_filer_credit_phase_out_start_HEAD_OF_HOUSEHOLD=20000&end_child_poverty_act_filer_credit_phase_out_start_JOINT=40000&end_child_poverty_act_filer_credit_phase_out_start_SEPARATE=20000&end_child_poverty_act_filer_credit_phase_out_start_SINGLE=20000&end_child_poverty_act_filer_credit_phase_out_start_WIDOW=20000&end_child_poverty_act_filer_credit_phase_out_rate=5&young_child_bi=4716&older_child_bi_age=19&abolish_non_refundable_ctc=1&abolish_refundable_ctc=1&young_adult_bi_age=20&young_child_bi_amount=4720)\*\*

[\*This blog post](https://blog.policyengine.org/the-new-policyengine-us-population-impact-page-de68cb4ba71a) describes population-level results of the End Child Poverty Act in PolicyEngine. Numbers differ slightly as we’ve since updated from 2020 to 2021 data.\*

## Phasing out basic income as a percent over a threshold

The basic income policies we’ve described so far have set amounts at the individual level. PolicyEngine also supports filer-level amounts as a share of the filer’s [federal poverty line](https://aspe.hhs.gov/topics/poverty-economic-mobility/poverty-guidelines). In 2022, the federal poverty line in the contiguous US was $13,590 for a single person and $4,720 for each subsequent member.

### _Example: [Seed Money Act](https://www.endpovertymaketrillions.com/the-plan), a proposal from [End Poverty Make Trillions](https://www.endpovertymaketrillions.com/)_

The Seed Money Act provides a grant equal to 100% of the poverty line. Its proposal document also suggests taxing the grant back for higher earners (effectively phasing it out) and repealing benefit programs. [This blog post](https://endpovertymaketrillions.medium.com/economic-modeling-of-how-to-end-poverty-in-the-united-states-while-saving-taxpayers-trillions-of-1679b751d0c0) from End Poverty Make Trillions uses PolicyEngine to explore a range of policy options; of these, we consider the option that phases out at 50% and does not replace existing programs.

To model the basic income at 100% of the poverty line, scroll to the bottom of the *Amounts *parameter menu and enter **100 **in the *Basic income as a percent of tax unit’s poverty line *box.

![](https://cdn-images-1.medium.com/max/3200/0*p73Tm_diUvxXjRlK)

Then enter **50** in the *Basic income phase-out rate *box in the *Phase-out *menu.

![](https://cdn-images-1.medium.com/max/5880/1*aCzYTQ5LzMtutKHHQePGBg.png)

[\*\*See the above-described version of the Seed Money Act in PolicyEngine here.³](https://policyengine.org/us/population-impact?bi_fpg_percent=100&bi_phase_out_rate=50)\*\*

## Phasing out basic income over an income range

Rather than phasing out the benefit as a rate above a threshold, some proposals phase it out linearly from the threshold to a higher income value. This can be equivalent for childless households, but if the phase-out ranges only vary with filing status and the benefit has a child element, they create faster phase-outs for households with more children. We support filing status-specific phase-out income ranges.

### _Example: [Guaranteed Income for the 21st Century](https://drive.google.com/file/d/1UDFPwUYu2Rf4RGgXuOTacmBj2Gt9paAV/view), a proposal from the [Economic Security Project](https://www.economicsecurityproject.org/) and the [New School](https://www.newschool.edu/)_

In 2021, the Economic Security Project commissioned a report from the New School to study what they called “Guaranteed Income for the 21st Century”. This policy:

- Guarantees $12,500 per adult and $4,500 per child

- Phases out between $10,000 and $50,000 adjusted gross income ($15,000 to $70,000 for joint filers)

- Repeals the Earned Income Tax Credit

To model the phase-out, go to the *Phase-out *menu and make the following entries:

1. Enter **10000 **in the _Basic income phase-out threshold_ box for heads of household (the first filing status in the drop-down menu)

1. Repeat (1) for all other filing statuses, setting the joint value to **15000**

1. Toggle off the _Phase out basic income as a rate_ switch

1. Enter **50000 **in the *Basic income phase-out end *box for heads of household

1. Repeat (4) for all other filing statuses, setting the joint value to **70000**

Your screen should look like this once this step is complete:

![](https://cdn-images-1.medium.com/max/3200/0*6PcRNyg6HdZgw9fu)

Then define the basic income amounts ($4,500 for the two child categories and $12,500 for the three adult categories) and repeal the EITC using the steps from the End Child Poverty Act section of this post.

[\*\*See Guaranteed Income for the 21st Century in PolicyEngine here.](https://policyengine.org/us/population-impact?young_child_bi=4500&older_child_bi=4500&young_adult_bi=12500&older_adult_bi=12500&senior_bi=12500&bi_phase_out_threshold_HEAD_OF_HOUSEHOLD=10000&bi_phase_out_threshold_JOINT=15000&bi_phase_out_threshold_SEPARATE=10000&bi_phase_out_threshold_SINGLE=10000&bi_phase_out_threshold_WIDOW=10000&bi_phase_out_by_rate=0&bi_phase_out_end_HEAD_OF_HOUSEHOLD=50000&bi_phase_out_end_JOINT=70000&bi_phase_out_end_SEPARATE=50000&bi_phase_out_end_SINGLE=50000&bi_phase_out_end_WIDOW=50000&abolish_eitc=1&older_adult_bi_amount=12500&older_child_bi_amount=4500&senior_bi_amount=12500&young_adult_bi_amount=12500&young_child_bi_amount=4500)\*\*

Through these four policies, we’ve shown how to use PolicyEngine to compute the impact of basic income policies that vary in their amounts, age distribution, and phase-out. PolicyEngine has more controls we haven’t covered, like setting hard income limits (with no phase-out) and making the payments taxable.

So what basic or guaranteed income policies would you design? [Let us know!](https://twitter.com/intent/tweet?text=Check%20out%20this%20basic%20income%20policy%20I%20made%20with%20@ThePolicyEngine%20[add%20your%20policyengine.org%20link])

[1] The [UBI Center](http://ubicenter.org) is a think tank that researches basic income policies. The UBI Center incubated PolicyEngine before we spun off in 2021.

[2] End Poverty Make Trillions (EPMT) has donated to PolicyEngine.

[3] Current results differ from EPMT’s blog post because EPMT approximated the federal poverty guideline with individualized amounts. We added the option to define basic income as a percent of the poverty line after EPMT published their blog post.
