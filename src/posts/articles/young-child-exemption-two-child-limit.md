The Guardian [reports](https://www.theguardian.com/society/2025/feb/26/parents-under-fives-could-be-exempted-two-child-benefit-cap-uk) that UK ministers are considering exempting young children from the two-child limit. In this report, we simulate the effect of this policy, which affects both Universal Credit (UC) and the Child Tax Credit (CTC).

# Current policy implementation

The two-child limit currently applies to:

- Universal Credit child elements
- Child Tax Credit child elements

By default, families can only claim these benefits for their first two children, with some exceptions:

1. Children born before April 6, 2017 are exempt from the limit
2. Multiple births (e.g., twins or triplets) where only one child would take the family over the two-child limit
3. Children adopted from local authority care
4. Children living with family or friends (kinship care)
5. Children born as a result of non-consensual conception

PolicyEngine currently models the date-based exemption (children born before April 2017) and does not model the other exemption conditions.

# Reforms reportedly under consideration

The Guardian states:

> _Ministers are trying to find ways to alleviate the impact of the two-child limit for universal credit or child tax credit, which was imposed by the Conservatives in 2017, without spending £3.6bn to remove it entirely, according to those briefed on the discussions._

> _Among the options is applying the limit only to those with children who are five and over, exempting parents of disabled children, exempting parents in work and increasing child benefit payments for parents of young children. A separate proposal to move to a three-child limit has also been discussed, but is understood not to be under serious consideration._

We model the first of these options: exempting parents of children under 5 years old from the two-child limit. We assume this age exemption applies to the family as a whole: if any child is under the threshold, all children are exempt. The exemption adds to existing exemptions (e.g., children born before April 2017 are unaffected).

# Economic impact of the reform

Using PolicyEngine’s microsimulation model, we estimate that exempting parents of children under 5 years old from the two-child limit would cost [£504 million](https://policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=77114&region=uk&timePeriod=2025&baseline=1) in 2025: [£480 million](https://policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=77113&region=uk&timePeriod=2025&baseline=1) from UC and [£25 million](https://policyengine.org/uk/policy?reform=77112&focus=policyOutput.policyBreakdown&region=uk&timePeriod=2025&baseline=1) from the CTC.

The exemption would [reduce overall poverty by 0.3%](https://policyengine.org/uk/policy?focus=policyOutput.povertyImpact.regular.byAge&reform=77113&region=uk&timePeriod=2025&baseline=1) and child poverty by 0.6%. It would also reduce the Gini index of income inequality by 0.09%. 5% of Britons would benefit from the reform, with those in the fifth income decile most likely to gain.

We invite users to experiment with other age thresholds for this exemption in the [PolicyEngine interface](https://policyengine.org/uk/policy?focus=gov.contrib.two_child_limit.age_exemption.universal_credit&reform=77113&region=uk&timePeriod=2025&baseline=1).
