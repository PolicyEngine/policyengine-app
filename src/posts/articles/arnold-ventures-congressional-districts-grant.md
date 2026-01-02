PolicyEngine has been awarded a $273,500 grant from [Arnold Ventures](https://www.arnoldventures.org/) to develop state and congressional district-level breakdowns in PolicyEngine US. This project will enable policymakers, researchers, and advocates to see how tax and benefit reforms affect their specific constituents—all 435 congressional districts.

## Why district-level analysis matters

As Congress weighs the 2025 expiration of major Tax Cuts and Jobs Act provisions, elected officials need district-specific evidence to judge how proposals affect their constituents. Currently, no public model offers reliable estimates for all congressional districts—or shows how specific provisions such as the State and Local Tax (SALT) deduction cap affect each district.

This grant will fill that gap by extending PolicyEngine's US model to every state and district and embedding the results in an easy-to-use interface.

## Project deliverables

The grant will fund development of:

- **District-calibrated microdata**: An open micro-dataset with representative weights for all 51 states and 435 congressional districts
- **Enhanced web interface**: State and district selectors with interactive choropleth maps showing reform impacts
- **Public API**: Geography parameter support for programmatic access to state and district-level impacts
- **Validation dashboard**: Downloadable CSVs covering more than 600 calibration targets
- **TCJA analysis**: A flagship report assessing TCJA-extension scenarios by state and district

## Technical approach

PolicyEngine already combines the Current Population Survey (CPS) with the IRS Public Use File (PUF) using machine-learning imputation and dropout-regularized gradient-descent weighting. This enhanced dataset matches 570 administrative targets more closely than either source file alone.

This grant will adapt PolicyEngine UK's novel "matrix of weights" approach—one weight per household per geographic area—to the United States. The UK version, funded by the Nuffield Foundation, already delivers constituency-level results that we will port to US congressional districts.

## NBER partnership

As part of this project, we will execute on our Memorandum of Understanding with the National Bureau of Economic Research (NBER) to validate state income-tax calculations against TAXSIM, the widely-used tax calculator created by Dr. Dan Feenberg. This validation ensures PolicyEngine's state tax calculations meet the highest standards of accuracy.

## Timeline

- **May 2025**: MVP data build with first state and district weight matrices
- **June 2025**: Full calibration pass with TAXSIM validation
- **August 2025**: Interface and API ready with pilot user sessions
- **September 2025**: Public launch with DC event and flagship TCJA report
- **December 2026**: Final maintenance handoff with 2026 data updates

## About Arnold Ventures

Arnold Ventures is a philanthropy dedicated to tackling some of the most pressing problems in the United States. Their mission is to improve lives by investing in evidence-based solutions that maximize opportunity and minimize injustice.

## Get involved

District-level analysis will automatically apply to any reform you create in PolicyEngine. Try it at [policyengine.org/us/policy](https://policyengine.org/us/policy) when the feature launches in Fall 2025.

We invite researchers, developers, and policy analysts to explore our [GitHub repositories](https://github.com/PolicyEngine) and join our open-source community.
