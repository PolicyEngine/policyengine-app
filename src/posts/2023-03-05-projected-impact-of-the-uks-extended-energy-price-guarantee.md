*Credit: DALLE-2*

According to [a report by The Times](https://archive.is/MnyZd#selection-773.0-1329.308), Chancellor Jeremy Hunt is expected to announce an extension of the £2,500 energy price guarantee (EPG) for an additional three months. The government structures the EPG such that the typical household bill does not exceed £2,500 per year. The Times reports that the government estimates this extension to cost approximately £3 billion.

At PolicyEngine, we have conducted an analysis of the projected impact of the extended EPG. Our budgetary impact matches the government’s, at £3.1 billion, and we also find that it will provide greater benefits to high-income households in absolute terms, while lower in relative terms; as a result, the reform would reduce poverty by about 1% and income inequality by about 0.2%.

To model the EPG, we integrate consumption data (including domestic energy) from the Living Costs and Food Survey to our enhanced Family Resources Survey, which powers PolicyEngine. We then simulate energy costs with and without the EPG, controlling for seasonality (see [our model documentation](https://policyengine.github.io/policyengine-uk/programs/gov/ofgem/energy-price-guarantee.html) for more).

![](https://cdn-images-1.medium.com/max/3200/0*uJbpkMLFSK2SZTts)

We model the EPG as an increase in incomes, and find that the [absolute impact increases with income](https://policyengine.org/uk/policy?focus=policyOutput.decileAverageImpact&reform=5847&region=uk&timePeriod=2023&baseline=1): households in the bottom income decile will gain an average of £78, while those in the top decile will gain £155.

![](https://cdn-images-1.medium.com/max/3200/0*RFB646z2NHZEM6yE)

As a [percentage of net income](https://policyengine.org/uk/policy?focus=policyOutput.decileRelativeImpact&reform=5847&region=uk&timePeriod=2023&baseline=1), however, households in the bottom income decile would gain 0.7%, and those in the top decile would gain 0.1%.

![](https://cdn-images-1.medium.com/max/3200/0*wXy3ocBoFdcAR_d3)

Accordingly, we project that the EPG extension would [reduce income inequality by about 0.2%](https://policyengine.org/uk/policy?focus=policyOutput.inequalityImpact&reform=5847&region=uk&timePeriod=2023&baseline=1) across metrics including the Gini coefficient, the top-10 and the top-1 percent shares.

![](https://cdn-images-1.medium.com/max/3200/0*ykeEoMNKJXTRjmIb)

Extending the EPG would [lower poverty by 0.9%](https://policyengine.org/uk/policy?focus=policyOutput.povertyImpact&reform=5847&region=uk&timePeriod=2023&baseline=1), disproportionately among pensioners.[^1] It would also[ lower deep poverty by 1%](https://policyengine.org/uk/policy?focus=policyOutput.deepPovertyImpact&reform=5847&region=uk&timePeriod=2023&baseline=1), similarly across age groups.

![](https://cdn-images-1.medium.com/max/3200/0*uHZzOqtB7nZ7m0TO)

You can [view the impact interactively in PolicyEngine here](https://policyengine.org/uk/policy?focus=policyOutput.netIncome&reform=5847&region=uk&timePeriod=2023&baseline=1), and even model your own custom EPG reform. You can also [enter your household information](https://policyengine.org/uk/household?focus=intro&reform=5847&region=uk&timePeriod=2023&baseline=1) to see how the EPG extension would affect you (to do this, enter the ‘domestic energy consumption’ field under *Consumption / Energy* or by searching in the top left).

At PolicyEngine, we remain committed to providing free open-source software that enables the analysis of public policy impacts. Users with access to UK Data Service microdata can [reproduce our analysis](https://policyengine.org/uk/policy?focus=policyOutput.codeReproducibility&reform=5847&region=uk&timePeriod=2023&baseline=1&household=10576) with the [open-source PolicyEngine UK microsimulation model](https://github.com/PolicyEngine/policyengine-uk). For questions or comments on these impacts, feel free to [get in touch](mailto:hello@policyengine.org).

[^1]: PolicyEngine's poverty rate impacts are lower than an initial estimate [published on the day](https://twitter.com/PolicyEngineUK/status/1631600746520010754), due to modelling improvements on cost-of-living payments in the baseline. See the changelog entry in the microsimulation model [here](https://github.com/PolicyEngine/policyengine-uk/compare/0.41.10...0.41.11).
