After eight months of beta testing and continuous improvements, we're excited to announce the full launch of the Enhanced Current Population Survey (Enhanced CPS). This comprehensive dataset powers PolicyEngine's microsimulation modeling with unprecedented accuracy, enabling precise analysis of tax and benefit reforms across the United States.

Since our [beta launch in March 2024](/us/research/enhanced-cps-beta), we've significantly expanded the dataset's capabilities. The Enhanced CPS now includes sophisticated imputation models for income sources and household characteristics that were previously unavailable or underreported in survey data. These improvements provide a more complete picture of American households' economic circumstances.

## New features

### Income source imputations

The Enhanced CPS now includes machine learning-based imputations for income sources that are frequently underreported in surveys:

**Tip income**: Using employer-reported data from the Survey of Income and Program Participation (SIPP), we impute tip income based on employment income, age, and household composition. This enhancement is particularly relevant for analyzing recent proposals to exempt tips from taxation.

**Overtime premiums**: We calculate overtime income using hours worked, occupation codes, and Fair Labor Standards Act exemption status. This allows accurate modeling of overtime exemption proposals.

**Auto loan interest**: Imputed from the Survey of Consumer Finances, this addition enables analysis of proposals to make auto loan interest deductible.

### Immigration status imputation

We've implemented the ASEC Undocumented Algorithm to impute Social Security Number card types, enabling more accurate modeling of policies with citizenship or work authorization requirements. This process-of-elimination approach examines 14 conditions to identify likely undocumented individuals, calibrated to match external population estimates.

### Technical infrastructure improvements

**Microimpute package**: We've developed and adopted [`microimpute`](https://github.com/PolicyEngine/microimpute), a new open-source Python package that streamlines our quantile regression forest models for data integration. This package makes our imputation methodology more transparent and reusable.

**Enhanced validation**: Our calibration now targets over 100 administrative totals, ensuring the Enhanced CPS accurately represents:
- Income components by source
- Benefit program enrollment
- Demographic distributions
- Geographic population counts

## Upcoming developments

### State and local calibration

With support from Arnold Ventures, we're extending the Enhanced CPS to provide accurate estimates for every state and congressional district. This follows our successful implementation of local-area microsimulation in the UK, funded by the Nuffield Foundation.

Once complete, PolicyEngine users will be able to analyze the impacts of federal and state policy reforms on:
- Poverty rates by state and congressional district
- Income inequality measures for local areas
- Winners and losers from reforms in specific districts
- Distributional impacts by income decile for each state

### Microcalibrate package

We're developing [`microcalibrate`](https://github.com/PolicyEngine/microcalibrate), a next-generation reweighting package that will replace our current gradient descent approach. This package will offer:
- Faster convergence to calibration targets
- Better preservation of the original survey's covariance structure
- More flexible loss functions for different use cases
- Easier extension to multi-area calibration

### Additional data integration

Future versions will incorporate:
- **Survey of Consumer Finances**: Comprehensive asset data for modeling asset limits in SNAP, SSI, and other programs
- **Consumer Expenditure Survey**: Consumption patterns for modeling sales taxes, carbon pricing, and other consumption-based policies
- **American Community Survey**: Detailed housing costs for improved modeling of housing assistance and state rental credits

## Using the Enhanced CPS

The Enhanced CPS is now the default dataset for all PolicyEngine US analyses. You can access it through:

**Web interface**: The Enhanced CPS powers all calculations at [policyengine.org/us](https://policyengine.org/us)

**Python package**: 
```python
from policyengine_us import Microsimulation
sim = Microsimulation(dataset="enhanced_cps_2025")
```

**Direct download**: Access the raw data files from our [GitHub releases](https://github.com/PolicyEngine/policyengine-us-data/releases)

## Technical details

For researchers interested in our methodology:
- **Data integration**: [Microimpute documentation](https://github.com/PolicyEngine/microimpute)
- **Calibration approach**: [Technical paper on survey enhancement](https://github.com/PolicyEngine/survey-enhance/blob/main/docs/paper/project_paper.pdf)
- **Validation dashboard**: [Interactive calibration results](https://policyengine-calibration.streamlit.app/)

## Conclusion

The Enhanced CPS represents a significant advancement in open-source microsimulation data. By combining the demographic richness of the Current Population Survey with tax detail from IRS records and sophisticated imputation techniques, we've created a dataset that supports comprehensive analysis of both tax and benefit policies.

As we expand to state and local calibration, the Enhanced CPS will enable unprecedented granularity in policy analysis—empowering lawmakers, researchers, and citizens to understand how proposed reforms would affect their communities.

We welcome feedback and collaboration as we continue improving this foundational infrastructure for evidence-based policymaking. For questions or to contribute to development, please visit our [GitHub repositories](https://github.com/PolicyEngine) or [contact us](mailto:hello@policyengine.org).