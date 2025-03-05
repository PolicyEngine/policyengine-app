# Modelling the two-child limit removal in PolicyEngine

The two-child limit is a UK welfare policy that restricts child-related benefits to the first two children in a family for children born after April 2017. This policy affects the Universal Credit (UC) and Child Tax Credit (CTC).  
PolicyEngine allows modelling both the current implementation and [policy reforms](https://www.theguardian.com/society/2025/feb/26/parents-under-fives-could-be-exempted-two-child-benefit-cap-uk) to the two-child limit, including an age-based exemption mechanism.

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

PolicyEngine currently models the date-based exemption (children born before April 2017) and does not model the other exemption conditions. When using these parameters for policy analysis, please note:

1. The age exemption applies to the family as a whole - if any child is under the threshold, all children are exempt.
2. The exemption adds to existing exemptions (e.g., children born before April 2017 are unaffected).

# Economic impact of the reform

Using PolicyEngine’s microsimulation model, we estimate that limiting the Universal Credit (UC) and Child Tax Credit (CTC) child cap to families with children under 5 years old in 2025 would cost £479.9 million and £24.5 million respectively, while limiting the UC reduces child poverty by 0.6%.  
When considering applying the child limit to the UC and CTC in combination, we find a budgetary impact of £504.3 million while decreasing child poverty by 0.6%.  
Below is a breakdown of the impacts:

| Reform                                                                    | Impact (£ million) | Child Poverty reduction (%) | PE Link                                                                                                                         |
| :------------------------------------------------------------------------ | :----------------- | :-------------------------- | :------------------------------------------------------------------------------------------------------------------------------ |
| Limit **UC** two-child limit to families with children 5 and over         | 24.5               | < 0.01                      | [Link](https://policyengine.org/uk/policy?reform=77113&focus=policyOutput.policyBreakdown&region=uk&timePeriod=2025&baseline=1) |
| Limit **CTC** two-child limit to families with children 5 and over        | 479.9              | 0.6                         | [Link](https://policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=77112&region=uk&timePeriod=2025&baseline=1) |
| Limit **UC and CTC** two-child limit to families with children 5 and over | 504.3              | 0.6                         | [Link](https://policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=77114&region=uk&timePeriod=2025&baseline=1) |

# Universal Credit and Child Tax Credit reform benchmarks

In the table below, we summarise the results of PolicyEngine estimates on increasing the child limit to three children, combined with repealing the overall benefit cap[^1] benchmark reform compared to Resolution Foundation estimates:

| Model                                                                                                                                   | Impact (£ billion) | Year | Note                                                                                                  |
| :-------------------------------------------------------------------------------------------------------------------------------------- | :----------------- | :--- | :---------------------------------------------------------------------------------------------------- |
| [PolicyEngine](https://policyengine.org/uk/policy?reform=77108&focus=policyOutput.policyBreakdown&region=uk&timePeriod=2025&baseline=1) | 3.8                | 2025 | Replacing the two-child limit with a three-child cap, combined with scrapping the overall benefit cap |
| [Resolution Foundation](https://www.devonlive.com/news/cost-of-living/government-considers-two-child-benefit-9980420)                   | 3.2                | 2025 | Government considers two-child benefit cap changes                                                    |

## Removing the two-child limit

In the table below, we summarise the results of PolicyEngine estimates on removing the two-child limit completely compared to estimates from the Institute for Fiscal Studies and Resolution Foundation:

| Model                                                                                                                                   | Impact (£ billion) | Year | Note                                 |
| :-------------------------------------------------------------------------------------------------------------------------------------- | :----------------- | :--- | :----------------------------------- |
| [PolicyEngine](https://policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=77100&region=uk&timePeriod=2025&baseline=1) | 2.0                | 2025 | Removing the two-child limit         |
| [IFS](https://ifs.org.uk/articles/two-child-limit-poverty-incentives-and-cost)                                                          | 2.1                | 2025 | 3.4bn with full roll-out and take-up |
| [Resolution Foundation](https://www.resolutionfoundation.org/publications/catastophic-caps/)                                            | 2.5                | 2025 | 3.6bn if applied to all families     |

[^1]: All two-child limit reforms apply to the CTC and UC.
