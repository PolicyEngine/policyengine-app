We're excited to announce the full launch of the Enhanced Current Population Survey (Enhanced CPS). This comprehensive dataset powers PolicyEngine's microsimulation modeling with unprecedented accuracy, enabling precise analysis of tax and benefit reforms across the United States.

Building on extensive development and testing since our [beta launch](/us/research/enhanced-cps-beta), the Enhanced CPS now includes sophisticated imputation models for income sources and household characteristics that were previously unavailable or underreported in survey data. These improvements provide a more complete picture of American households' economic circumstances. Learn more about our [methodology](https://policyengine.github.io/policyengine-us-data/methodology) and [data sources](https://policyengine.github.io/policyengine-us-data/data).

## New features

### Income source imputations

The Enhanced CPS now includes machine learning-based imputations for income sources that are frequently underreported in surveys:

**Tip income**: Using employer-reported data from the Survey of Income and Program Participation (SIPP), we impute tip income based on employment income, age, and household composition. This enhancement enables accurate analysis of proposals to exempt tips from taxation. See our [imputation methodology documentation](https://policyengine.github.io/policyengine-us-data/methodology#imputation) for technical details.

**Overtime premiums**: We calculate overtime income using hours worked, occupation codes, and Fair Labor Standards Act exemption status, allowing accurate modeling of overtime exemption proposals.

**Auto loan interest**: Imputed from the Survey of Consumer Finances (SCF), this addition enables analysis of proposals to make auto loan interest deductible.

### Immigration status imputation

We've implemented the ASEC Undocumented Algorithm to impute Social Security Number card types, enabling more accurate modeling of policies with citizenship or work authorization requirements. This process-of-elimination approach examines 14 conditions to identify likely undocumented individuals, calibrated to match external population estimates. Details are available in our [demographic imputation section](https://policyengine.github.io/policyengine-us-data/methodology#demographic-imputation).

### Technical infrastructure improvements

**Two-stage methodology**: Our approach combines sophisticated imputation with advanced reweighting techniques. First, we use Quantile Regression Forests (QRF) to impute missing variables from multiple data sources, preserving realistic variation and capturing conditional distribution tails. Second, we apply gradient-based optimization with PyTorch to reweight households, matching administrative targets while maintaining the survey's statistical properties.

![Enhanced CPS methodology flowchart showing the two-stage process of imputation and reweighting](/images/posts/enhanced-cps-launch-flowchart.png)

The process flow integrates five source datasets (CPS ASEC, IRS PUF, SIPP, SCF, ACS) that are aged to the target year. Through QRF imputation, we create two enhanced CPS variants: one with missing PUF variables filled in, and another with existing variables replaced by PUF values. These datasets then undergo reweighting optimization to produce the final Enhanced CPS dataset. [View our detailed methodology documentation](https://policyengine.github.io/policyengine-us-data/methodology).

**Microimpute package**: We've developed and adopted [`microimpute`](https://github.com/PolicyEngine/microimpute), a new open-source Python package that automates our QRF-based imputation methods. This package makes our imputation methodology more transparent and reusable.

**Advanced reweighting with L0 regularization**: Our reweighting process uses log-transformed weights with dropout regularization and incorporates an L0 penalty for sparsity. This ensures positive weights while preventing overfitting and maintaining interpretability. The optimization minimizes mean squared relative error using the Adam optimizer.

**Enhanced validation**: Our [calibration process](https://policyengine.github.io/policyengine-us-data/methodology#calibration) targets 9,168 administrative totals from sources including IRS SOI, Census, CBO/Treasury, and JCT data, ensuring the Enhanced CPS accurately represents:

- Income components by source
- Benefit program enrollment
- Demographic distributions
- Geographic population counts

## Upcoming developments

### State and local calibration

With support from [Arnold Ventures](https://www.arnoldventures.org/), we're extending the Enhanced CPS to provide accurate estimates for every state and congressional district. This follows our successful implementation of local-area microsimulation in the UK, funded by the [Nuffield Foundation](https://www.nuffieldfoundation.org/).

Once complete, the Enhanced CPS will become the default for state-level analysis as well, and PolicyEngine users will be able to analyze the impacts of federal and state policy reforms on:

- Poverty rates by state and congressional district
- Income inequality measures for local areas
- Winners and losers from reforms in specific districts
- Distributional impacts by income decile for each state

### Microcalibrate package

We're developing [`microcalibrate`](https://github.com/PolicyEngine/microcalibrate), a next-generation reweighting package that enhances our current gradient descent approach. This package will offer:

- Faster convergence to calibration targets
- Better preservation of the original survey's covariance structure
- More flexible loss functions for different use cases
- Easier extension to multi-area calibration

### Additional data enhancements

We currently integrate data from the Survey of Consumer Finances (for auto loan interest) and American Community Survey (for housing costs). Future enhancements will expand these integrations:

- **Wealth modeling from SCF**: Comprehensive asset and debt data for modeling asset limits in SNAP, SSI, and other means-tested programs, similar to our [wealth modeling in the UK](https://legacy.policyengine.org/uk/research/uk-the-new-policyengine)
- **Consumer Expenditure Survey**: Consumption patterns for modeling sales taxes, carbon pricing, and other consumption-based policies
- **Expanded ACS integration**: Additional geographic and demographic detail for state and local policy analysis

## Using the Enhanced CPS

The Enhanced CPS is now the exclusive dataset for nationwide PolicyEngine US analyses. We've removed the dataset selector to streamline the user experience—the Enhanced CPS automatically powers all federal policy simulations, while state-specific analyses continue to use the standard CPS until our local calibration is complete.

You can access the Enhanced CPS through:

**Web interface**: The Enhanced CPS powers all nationwide calculations at [policyengine.org/us](https://legacy.policyengine.org/us)

**Python package**: Works by default for our `Microsimulation` calls.

**Direct download**: For Python users, the data automatically downloads from our Hugging Face repository when you instantiate a simulation. The files are stored at [`hf://policyengine/policyengine-us-data`](https://huggingface.co/policyengine/policyengine-us-data)

## Technical details

For researchers interested in our methodology:

- **Full technical documentation**: [PolicyEngine US Data documentation](https://policyengine.github.io/policyengine-us-data)
- **Data integration methodology**: [Imputation and fusion techniques](https://policyengine.github.io/policyengine-us-data/methodology#data-fusion)
- **Calibration approach**: [Reweighting methodology](https://policyengine.github.io/policyengine-us-data/methodology#reweighting)
- **Validation results**: [Comparison with administrative data](https://policyengine.github.io/policyengine-us-data/discussion)
- **Implementation code**: [Microimpute package](https://github.com/PolicyEngine/microimpute)
- **Source code**: [Enhanced CPS on GitHub](https://github.com/PolicyEngine/policyengine-us-data/tree/main/policyengine_us_data/datasets/cps)

## Conclusion

The Enhanced CPS represents a major advancement in open-source microsimulation data. By [combining the demographic richness of the Current Population Survey with tax detail from IRS records](https://policyengine.github.io/policyengine-us-data/background) and sophisticated imputation techniques, we've created a dataset that supports comprehensive analysis of both tax and benefit policies.

As we expand to state and local calibration, the Enhanced CPS will enable unprecedented granularity in policy analysis—empowering lawmakers, researchers, and citizens to understand how proposed reforms would affect their communities.

We welcome feedback and collaboration as we continue improving this foundational infrastructure for evidence-based policymaking. For questions or to contribute to development, please visit our [GitHub repositories](https://github.com/PolicyEngine) or [contact us](mailto:hello@policyengine.org).
