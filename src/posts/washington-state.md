
# PolicyEngine launches in Washington state

Washingtonians can now compute the impacts of the Working Families Tax Credit and federal reforms.

Washington state hasn’t historically had an income tax. However, in the past year, they’ve enacted a [Working Families Tax Credit](https://workingfamiliescredit.wa.gov/) (modeled after the federal Earned Income Tax Credit) and a [capital gains tax](https://dor.wa.gov/taxes-rates/other-taxes/capital-gains-tax)¹ (which is currently held up in court). With support from the [Center for Growth and Opportunity](http://thecgo.org), we’ve now modeled these policies in PolicyEngine and enabled Washington-specific impacts of federal reforms. This blog post shows a series of examples on using PolicyEngine in Washington.

You can use our [household calculator](http://policyengine.org/us/household) to estimate how much you’ll get from the Washington Working Families Tax Credit under current law.²

<center><iframe width="560" height="315" src="https://www.youtube.com/embed/bBHncBDrH98" frameborder="0" allowfullscreen></iframe></center>

Using PolicyEngine’s Baseline feature, you can also compute the impact of the Working Families Tax Credit by [comparing it against a baseline where it doesn’t exist](https://policyengine.org/us/population-impact?wa_wftc_max_amount_1_rate=300&wa_wftc_max_amount_2_rate=600&wa_wftc_max_amount_3_rate=900&wa_wftc_max_amount_4_rate=1200&wa_wftc_min_amount=50&baseline_wa_wftc_max_amount_1_rate=0&baseline_wa_wftc_max_amount_2_rate=0&baseline_wa_wftc_max_amount_3_rate=0&baseline_wa_wftc_max_amount_4_rate=0&baseline_wa_wftc_min_amount=0&baseline_state_specific=WA).³

<center><iframe width="560" height="315" src="https://www.youtube.com/embed/Tdwfw6tk3vk" frameborder="0" allowfullscreen></iframe></center>

PolicyEngine lets you imagine a range of policy reforms. For example, what if the Working Families Tax Credit were $100 more generous? This video shows how to build [that policy](https://policyengine.org/us/population-impact?wa_wftc_max_amount_0_rate=400&wa_wftc_max_amount_1_rate=700&wa_wftc_max_amount_2_rate=1000&wa_wftc_max_amount_3_rate=1300&baseline_state_specific=WA) and compute its impact on Washington overall and a Washington family of four.

<center><iframe width="560" height="315" src="https://www.youtube.com/embed/3h2KN-jXsBc" frameborder="0" allowfullscreen></iframe></center>

Finally, you can also compute the impact of federal policy reforms on Washington state; for instance, [cutting the bottom tax rate from 10% to 5%](https://policyengine.org/us/population-impact?gov_irs_income_bracket_rates_1=5&baseline_state_specific=WA).

<center><iframe width="560" height="315" src="https://www.youtube.com/embed/gn5cJ24Vzzo" frameborder="0" allowfullscreen></iframe></center>

To learn more about PolicyEngine in Washington, feel free to contact us at [hello@policyengine.org](mailto:hello@policyengine.org). And be sure to [follow PolicyEngine](https://twitter.com/intent/user?screen_name=thepolicyengine) to stay updated on our new features and states.

![](https://cdn-images-1.medium.com/max/7680/1*-oK7a26InFYZMfSs9QSbhQ.png)

¹ Since Washington’s capital gains tax has a $250,000 standard deduction and the Current Population Survey truncates income, PolicyEngine underestimates the revenue from the policy.

² PolicyEngine only provides estimates of taxes and benefits. Our policy parameters are based on preliminary estimates from the Washington Department of Revenue, which they may revise by September 2022. See [this discussion](https://github.com/PolicyEngine/openfisca-us/discussions/1246) for more information and consult a tax advisor.

³ PolicyEngine shows that the Working Families Tax Credit increases the share of income held by the top 10% because some high-income Current Population Survey households in Washington include tax filers that is eligible for the credit. In the future, we will avoid these small-N sources of volatility by using the full CPS for each state, reweighted to resemble a state according to various aggregate statistics.
