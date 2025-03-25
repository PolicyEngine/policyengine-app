This post provides an overview of how taxes are modeled in PolicyEngine UK. It details both existing taxes in the UK tax system and proposed/contributed taxes that are simulated within our platform. Each tax component is linked to its specific implementation in the codebase, making this document a technical reference for understanding how tax calculations are performed in the PolicyEngine UK microsimulation model.

The post is organized into three main sections. First, we explain direct taxes (income tax, national insurance, and capital gains tax), which are collected directly from individuals and businesses. Next, we cover indirect taxes (VAT and fuel duty) which are embedded in the prices of goods and services. Finally, we explore both existing property and land taxes (including stamp duty variations across UK nations, business rates, and council tax) and contributed/proposed taxes (such as carbon tax, wealth tax, land value tax, and others) that are modeled in PolicyEngine but not currently implemented in the UK.

## Direct taxes
Direct taxes are collected from individuals and businesses based on income, profits or gains. The three main direct taxes in the UK system—income tax, National Insurance, and capital gains tax—work together to tax different forms of income and wealth accrual.

### Income tax
HMRC administers this tax using a band system with different rates for certain income types, implemented in PolicyEngine via the [`income_tax`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/hmrc/income_tax/income_tax.py) variable.

- **Standard income tax components**
  These are the main rate bands that determine tax payments on different portions of income. The UK uses a system where portions of income are taxed at different rates.
  
  - **Basic rate**: Applied to taxable income between the personal allowance and higher rate threshold, calculated in PolicyEngine as [`basic_rate_earned_income`](https://github.com/PolicyEngine/policyengine-uk/blob/280e7b2bef9a6ff82d94eb2111a7aff160d0c209/policyengine_uk/variables/gov/hmrc/income_tax/bracketized_liability/basic_rate_earned_income_tax.py).
    
  - **Higher rate**: Applied to taxable income between the higher rate threshold and additional rate threshold, calculated in PolicyEngine as [`higher_rate_earned_income`](https://github.com/PolicyEngine/policyengine-uk/blob/280e7b2bef9a6ff82d94eb2111a7aff160d0c209/policyengine_uk/variables/gov/hmrc/income_tax/bracketized_liability/higher_rate_earned_income_tax.py).
    
  - **Additional rate**: Applied to taxable income over the additional rate threshold, calculated in PolicyEngine as [`add_rate_earned_income`](https://github.com/PolicyEngine/policyengine-uk/blob/280e7b2bef9a6ff82d94eb2111a7aff160d0c209/policyengine_uk/variables/gov/hmrc/income_tax/bracketized_liability/add_rate_earned_income_tax.py).
  
- **Income tax bases**
  These represent the different sources of income subject to income tax in the UK. Each type has specific rules about deductions, allowances and sometimes different tax rates.
  
  - **Employment income**: Income from employment, including salaries, wages, bonuses and employment benefits. This income type is taxed through the PAYE system and represented by the [`taxable_employment_income`](https://github.com/PolicyEngine/policyengine-uk/blob/280e7b2bef9a6ff82d94eb2111a7aff160d0c209/policyengine_uk/variables/gov/hmrc/income_tax/bases/taxable_employment_income.py) variable.
    
  - **Self-employment income**: Income from self-employment, freelance work or running a business as a sole trader. Self-employed individuals pay income tax on profits after business expenses, calculated as [`taxable_self_employment_income`](https://github.com/PolicyEngine/policyengine-uk/blob/280e7b2bef9a6ff82d94eb2111a7aff160d0c209/policyengine_uk/variables/gov/hmrc/income_tax/bases/taxable_self_employment_income.py).
    
  - **Pension income**: Income from state pensions, workplace pensions and private pensions, calculated as [`taxable_pension_income`](https://github.com/PolicyEngine/policyengine-uk/blob/280e7b2bef9a6ff82d94eb2111a7aff160d0c209/policyengine_uk/variables/gov/hmrc/income_tax/bases/taxable_pension_income.py) in PolicyEngine.
    
  - **Property income**: Income from renting out property, after deducting allowable expenses. This includes rental from UK and overseas properties owned by UK residents, calculated as [`taxable_property_income`](https://github.com/PolicyEngine/policyengine-uk/blob/280e7b2bef9a6ff82d94eb2111a7aff160d0c209/policyengine_uk/variables/gov/hmrc/income_tax/bases/taxable_property_income.py).
    
  - **Dividend income**: Income from company dividends, taxed at lower rates than other income. A dividend allowance applies before dividend tax rates, with taxable amounts calculated as [`taxable_dividend_income`](https://github.com/PolicyEngine/policyengine-uk/blob/280e7b2bef9a6ff82d94eb2111a7aff160d0c209/policyengine_uk/variables/gov/hmrc/income_tax/bases/taxable_dividend_income.py).
    
  - **Savings interest income**: Interest earned on savings accounts, bonds and other interest-bearing investments. The personal savings allowance permits taxpayers to earn some interest tax-free, with eligible starter rate income calculated as [`savings_starter_rate_income`](https://github.com/PolicyEngine/policyengine-uk/tree/280e7b2bef9a6ff82d94eb2111a7aff160d0c209/policyengine_uk/variables/gov/hmrc/income_tax/bracketized_savings_income/savings_starter_rate_income.py).
    
  - **Miscellaneous income**: Other taxable income including royalties, trust income and casual earnings, calculated as [`taxable_miscellaneous_income`](https://github.com/PolicyEngine/policyengine-uk/tree/280e7b2bef9a6ff82d94eb2111a7aff160d0c209/policyengine_uk/variables/gov/hmrc/income_tax/bases/taxable_miscellaneous_income.py). 
    
  - **Social security income**: Some state benefits are taxable, such as jobseeker's allowance and carer's allowance. Many benefits are non-taxable, including universal credit and personal independence payment. PolicyEngine calculates this as [`taxable_social_security_income`](https://github.com/PolicyEngine/policyengine-uk/blob/280e7b2bef9a6ff82d94eb2111a7aff160d0c209/policyengine_uk/variables/gov/hmrc/income_tax/bases/taxable_social_security_income.py).
  
- **Allowances and reliefs**
  These are amounts that can be earned tax-free or deductions that reduce taxable income, defined by various parameters and calculated as part of [`allowances`](https://github.com/PolicyEngine/policyengine-uk/tree/280e7b2bef9a6ff82d94eb2111a7aff160d0c209/policyengine_uk/variables/gov/hmrc/income_tax/allowances).
  
  - **Personal allowance**: The amount of income that can be earned before paying income tax. This is reduced when income exceeds a threshold, disappearing completely at a higher threshold, set in [`allowances`](https://github.com/PolicyEngine/policyengine-uk/tree/280e7b2bef9a6ff82d94eb2111a7aff160d0c209/policyengine_uk/variables/gov/hmrc/income_tax/allowances) and used in calculating each person's overall [`allowances`](https://github.com/PolicyEngine/policyengine-uk/blob/280e7b2bef9a6ff82d94eb2111a7aff160d0c209/policyengine_uk/variables/gov/hmrc/income_tax/allowances/allowances.py).
    
  - **Marriage allowance**: Allows a spouse or civil partner to transfer a percentage of their personal allowance. Only available when the higher earner is a basic rate taxpayer and the lower earner has unused allowance, calculated as [`marriage_allowance`](https://github.com/PolicyEngine/policyengine-uk/blob/280e7b2bef9a6ff82d94eb2111a7aff160d0c209/policyengine_uk/variables/gov/hmrc/income_tax/allowances/marriage_allowance.py).
    
  - **Dividend allowance**: Tax-free allowance for dividend income set annually by the government through the `dividend_allowance` parameter in [`dividend_allowance.yaml`](https://github.com/PolicyEngine/policyengine-uk/blob/280e7b2bef9a6ff82d94eb2111a7aff160d0c209/policyengine_uk/parameters/gov/hmrc/income_tax/allowances/dividend_allowance.yaml).
    
  - **Trading allowance**: A tax-free allowance for self-employed individuals with small amounts of trading income. Claiming this prevents deduction of business expenses from income, set through the `trading_allowance` parameter in [`trading_allowance.yaml`](https://github.com/PolicyEngine/policyengine-uk/tree/280e7b2bef9a6ff82d94eb2111a7aff160d0c209/policyengine_uk/parameters/gov/hmrc/income_tax/allowances).
    
  - **Property allowance**: A tax-free allowance for individuals with small amounts of property income, determined by the `property_allowance` parameter in [`property_allowance.yaml`](https://github.com/PolicyEngine/policyengine-uk/tree/280e7b2bef9a6ff82d94eb2111a7aff160d0c209/policyengine_uk/parameters/gov/hmrc/income_tax/allowances).
    
  - **Tax-free savings income**: The personal savings allowance permits taxpayers to earn some interest tax-free. The allowance amount depends on the taxpayer's income tax band, calculated in the savings income bracketization process in [`bracketized_savings_income`](https://github.com/PolicyEngine/policyengine-uk/tree/master/policyengine_uk/variables/gov/hmrc/income_tax/bracketized_savings_income/) with specific rates applied to [`savings_starter_rate_income`](https://github.com/PolicyEngine/policyengine-uk/blob/280e7b2bef9a6ff82d94eb2111a7aff160d0c209/policyengine_uk/variables/gov/hmrc/income_tax/bracketized_savings_income/savings_starter_rate_income.py).
    
  - **Loss relief**: Allows business or property losses to be offset against other income to reduce tax, calculated as [`loss_relief`](https://github.com/PolicyEngine/policyengine-uk/tree/280e7b2bef9a6ff82d94eb2111a7aff160d0c209/policyengine_uk/variables/gov/hmrc/income_tax/reliefs/loss_relief.py). 
    
  - **Capital allowances**: Tax relief for businesses on the cost of purchasing assets used in the business. These allow businesses to deduct the cost of machinery, equipment and vehicles from taxable profits, calculated as [`capital_allowances`](https://github.com/PolicyEngine/policyengine-uk/tree/280e7b2bef9a6ff82d94eb2111a7aff160d0c209/policyengine_uk/variables/gov/hmrc/income_tax/reliefs/capital_allowances.py).
  
- **Income tax charges**
  These are tax charges that withdraw benefits or allowances in specific circumstances, implemented in [`variables/gov/hmrc/income_tax/charges`](https://github.com/PolicyEngine/policyengine-uk/tree/master/policyengine_uk/variables/gov/hmrc/income_tax/charges/).
  
  - **Child benefit high income tax charge (HITC)**: A tax charge on high earners who or whose partner receives child benefit. It withdraws child benefit when income exceeds a threshold, with full withdrawal at a higher threshold, calculated as [`child_benefit_hitc`](https://github.com/PolicyEngine/policyengine-uk/blob/280e7b2bef9a6ff82d94eb2111a7aff160d0c209/policyengine_uk/variables/gov/hmrc/income_tax/charges/child_benefit_hitc.py).

PolicyEngine [estimates](https://policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=1&region=uk&timePeriod=2025&baseline=79847) that abolishing income tax would raise government revenue by £307.5 billion in 2025. The following figure shows the distributional impact of this reform.

![](/images/posts/uk-taxes-post/income-tax.png)

### National Insurance
National Insurance operates alongside income tax and funds state benefits and the NHS.
National Insurance consists of contributions paid by employees, employers and the self-employed, with overall liability calculated as [`national_insurance`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/hmrc/national_insurance/national_insurance.py).

- **Class 1** (Employees and employers)
  These are contributions paid on employee earnings above the primary threshold. Employers also pay secondary contributions, meaning employment has a dual tax, implemented in [`class_1`](https://github.com/PolicyEngine/policyengine-uk/tree/master/policyengine_uk/variables/gov/hmrc/national_insurance/class_1).
  
  - **Primary contributions (employees)**: Paid by employees at set rates on earnings between thresholds, with a lower rate above the upper limit. This is deducted via the PAYE system alongside income tax, calculated as [`ni_class_1_employee_primary`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/hmrc/national_insurance/class_1/ni_class_1_employee_primary.py).
    
  - **Secondary contributions (employers)**: Paid by employers at a flat rate on employee earnings above the secondary threshold. This represents a cost for employers and affects employment costs, calculated as [`ni_class_1_employer`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/hmrc/national_insurance/class_1/ni_class_1_employer.py).
    
  - **Additional rate contributions**: A rate of National Insurance applied to high earners. This ensures contributions continue on higher incomes, calculated as [`ni_class_1_employee_additional`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/hmrc/national_insurance/class_1/ni_class_1_employee_additional.py).
  
- **Class 2** (Self-employed - flat rate)
  A flat weekly rate paid by self-employed people with profits above the small profits threshold, calculated as [`ni_class_2`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/hmrc/national_insurance/class_2/ni_class_2.py).
  
- **Class 3** (Voluntary contributions)
  Optional contributions people can make to fill gaps in their National Insurance record, calculated as [`ni_class_3`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/hmrc/national_insurance/class_3/ni_class_3.py).
  
- **Class 4** (Self-employed - percentage-based)
  Percentage-based contributions paid by self-employed people on their profits. They function similar to income tax with different rates applied to different profit levels, calculated as [`ni_class_4`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/hmrc/national_insurance/class_4/ni_class_4.py).
  
  - **Main rate**: Paid on self-employed profits between the lower profits limit and upper profits limit, calculated as [`ni_class_4_main`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/hmrc/national_insurance/class_4/ni_class_4_main.py).
    
  - **Additional rate**: Paid on self-employed profits above the upper profits limit, calculated as [`ni_class_4_maximum`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/hmrc/national_insurance/class_4/ni_class_4_maximum.py).

PolicyEngine [estimates](https://policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=1&region=uk&timePeriod=2025&baseline=79825) that abolishing National Insurance would raise government revenue by £130.1 billion in 2025. The following figure shows the distributional impact of this reform.

![](/images/posts/uk-taxes-post/national-insurance.png)

### Capital gains tax
Capital gains tax applies to profits from asset sales, unlike income tax and National Insurance which apply to earnings.
Capital gains tax is charged on the profit when selling or disposing of an asset that has increased in value. It applies to most assets including investments, second properties and business assets, but not main residences, calculated as [`capital_gains_tax`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/hmrc/capital_gains_tax/capital_gains_tax.py).

- **Basic rate (10%)**: Applied to gains for basic rate taxpayers on most assets, or a higher rate for residential property. The applicable rate depends on the taxpayer's income tax band and the asset type, defined by the [`basic_rate`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/hmrc/cgt/basic_rate.yaml) parameter.
  
- **Higher rate (20%)**: Applied to gains for higher and additional rate taxpayers, or a higher rate for residential property, defined by the [`higher_rate`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/hmrc/cgt/higher_rate.yaml) parameter.
  
- **Annual exempt amount**: A tax-free allowance for capital gains set by the government each tax year, defined by the [`annual_exempt_amount`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/hmrc/cgt/annual_exempt_amount.yaml) parameter.

PolicyEngine [estimates](https://policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=1&region=uk&timePeriod=2025&baseline=79852) that abolishing capital gains tax would raise government revenue by £17.3 billion in 2025. The following figure shows the distributional impact of this reform.

![](/images/posts/uk-taxes-post/capital-gain-tax.png)

## Indirect taxes
Indirect taxes are collected by intermediaries and passed to the government. They form part of the price of goods and services that consumers pay.

### Value added tax (VAT)
VAT generates substantial revenue for the UK government.
VAT is a consumption tax placed on products and services at each stage where value is added, calculated in PolicyEngine as [`vat`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/hmrc/vat.py).

- **Standard rate (20%)**: Applied to most goods and services in the UK, defined by the [`standard_rate`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/hmrc/vat/standard_rate.yaml) parameter.
  
- **Reduced rate (5%)**: Applied to certain goods and services including domestic fuel and children's car seats, defined by the [`reduced_rate`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/hmrc/vat/reduced_rate.yaml) parameter.

PolicyEngine [estimates](https://policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=1&region=uk&timePeriod=2025&baseline=79853) that abolishing value added tax (VAT) would raise government revenue by £198.6 billion in 2025. The following figure shows the distributional impact of this reform.

![](/images/posts/uk-taxes-post/vat.png)

### Fuel duty
The UK applies excise duties to specific products, including fuels.
Fuel duty is an excise tax charged on purchases of petrol, diesel and other fuels for vehicles or heating, calculated as [`fuel_duty`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/hmrc/fuel_duty/fuel_duty.py).

- **Petrol and diesel rates**: Set at a rate per litre for both petrol and diesel, defined by the [`petrol_and_diesel`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/hmrc/fuel_duty/petrol_and_diesel.yaml) parameter.

PolicyEngine [estimates](https://policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=1&region=uk&timePeriod=2025&baseline=79854) that abolishing fuel duty would raise government revenue by £28.3 billion in 2025. The following figure shows the distributional impact of this reform.

![](/images/posts/uk-taxes-post/fuel-duty.png)

## Property and land taxes
The UK tax system includes taxes on property ownership, occupation and transactions. These taxes vary by nation and property type.

### Stamp duty land tax (SDLT) - England & Northern Ireland
SDLT is a tax paid when purchasing property over certain price thresholds in England and Northern Ireland, calculated as [`stamp_duty_land_tax`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/hmrc/stamp_duty_land_tax.py).

- **Residential property**
  These rates apply to homes and residential properties with different structures for different buyer types, defined in [`residential`](https://github.com/PolicyEngine/policyengine-uk/tree/master/policyengine_uk/parameters/gov/hmrc/stamp_duty/residential/).
  
  - **Main residence rates (including first-time buyer relief)**: Standard rates apply in bands from the nil-rate band to portions over the highest threshold. First-time buyers receive relief with higher nil-rate thresholds and reduced rates up to a maximum property value, defined in property-specific rate files within [`residential`](https://github.com/PolicyEngine/policyengine-uk/tree/master/policyengine_uk/parameters/gov/hmrc/stamp_duty/residential/).
    
  - **Additional property surcharge**: An extra percentage of SDLT is charged on additional residential properties over a threshold, defined in the surcharge parameters within [`residential`](https://github.com/PolicyEngine/policyengine-uk/tree/master/policyengine_uk/parameters/gov/hmrc/stamp_duty/residential/).
    
  - **Rental agreements**: SDLT applies to the net present value of rent over the lease term when exceeding a threshold, defined by residential rent parameters in [`rent.yaml`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/hmrc/stamp_duty/residential/rent.yaml).
  
- **Non-residential property**
  These apply to commercial property purchases like shops, offices and agricultural land, defined in [`non_residential`](https://github.com/PolicyEngine/policyengine-uk/tree/master/policyengine_uk/parameters/gov/hmrc/stamp_duty/non_residential/).
  
  - **Purchase rates**: Rates apply in bands from the nil-rate band to portions over higher thresholds, defined by non-residential purchase parameters in [`purchase.yaml`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/hmrc/stamp_duty/non_residential/purchase.yaml).
    
  - **Rental agreements**: SDLT applies to the net present value of commercial lease rent above a threshold, defined by non-residential rent parameters in [`rent.yaml`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/hmrc/stamp_duty/non_residential/rent.yaml).

PolicyEngine [estimates](https://policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=1&region=uk&timePeriod=2025&baseline=79870) that abolishing stamp duty would raise government revenue by £11.4 billion in 2025. The following figure shows the distributional impact of this reform.

![](/images/posts/uk-taxes-post/stamp-duty.png)
  
### Land and buildings transaction tax (LBTT) - Scotland
Scotland uses a different property transaction tax than England and Northern Ireland.
LBTT is Scotland's equivalent to SDLT, applying to property and land transactions in Scotland, calculated as [`lbtt`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/revenue_scotland/lbtt.py).

- **Residential property**
  Scotland's residential property transaction tax applies to home purchases with specific rates, defined in [`residential`](https://github.com/PolicyEngine/policyengine-uk/tree/master/policyengine_uk/parameters/gov/revenue_scotland/lbtt/residential/).
  
  - **Standard rates**: Rates apply in bands from the nil-rate band to portions over the highest threshold, defined by the [`rate`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/revenue_scotland/lbtt/residential/rate.yaml) parameter.
    
  - **First-time buyer relief**: First-time buyers pay no LBTT up to a higher threshold than standard purchases, defined by the [`first_time_buyer_rate`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/revenue_scotland/lbtt/residential/first_time_buyer_rate.yaml) parameter.
    
  - **Additional dwelling supplement**: A surcharge applies to additional residential properties over a threshold, defined by the [`additional_residence_surcharge`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/revenue_scotland/lbtt/residential/additional_residence_surcharge.yaml) parameter.
    
  - **Rental agreements**: LBTT applies to the net present value of residential lease rent above a threshold, defined by the rent parameters in [`rent.yaml`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/revenue_scotland/lbtt/rent.yaml).
  
- **Non-residential property**
  These apply to commercial property transactions in Scotland with distinct rates, defined in [`non_residential.yaml`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/revenue_scotland/lbtt/non_residential.yaml).
  
  - **Purchase rates**: Rates apply in bands from the nil-rate band to portions over higher thresholds, defined by specific band parameters in [`non_residential.yaml`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/revenue_scotland/lbtt/non_residential.yaml).
    
  - **Rental agreements**: LBTT applies to the net present value of commercial lease rent above a threshold, defined by specific rent parameters in [`rent.yaml`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/revenue_scotland/lbtt/rent.yaml).

PolicyEngine [estimates](https://policyengine.org/uk/policy?focus=policyOutput.policyBreakdown&reform=1&region=uk&timePeriod=2025&baseline=80006) that abolishing land and buildings transaction tax would raise government revenue by £669.0 million in 2025. The following figure shows the distributional impact of this reform.

![](/images/posts/uk-taxes-post/lbtt.png)

### Land transaction tax (LTT) - Wales
Wales has its own property transaction tax system.
LTT is Wales' equivalent to SDLT, applying to property and land transactions in Wales, calculated as [`land_transaction_tax`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/wra/land_transaction_tax.py).

- **Residential property**
  Wales' residential property transaction tax applies to home purchases with its own rate structure, defined in [`residential`](https://github.com/PolicyEngine/policyengine-uk/tree/master/policyengine_uk/parameters/gov/wra/land_transaction_tax/residential/).
  
  - **Primary residence rates**: Rates apply in bands from the nil-rate band to portions over the highest threshold, defined by the [`primary`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/wra/land_transaction_tax/residential/primary.yaml) parameter.
    
  - **Higher rates for additional properties**: A surcharge applies to purchases of additional residential properties, defined by the [`higher_rate`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/wra/land_transaction_tax/residential/higher_rate.yaml) parameter.
    
  - **Rental agreements**: LTT applies to the net present value of residential lease rent above thresholds, defined by specific rent parameters in [`rent.yaml`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/wra/land_transaction_tax/rent.yaml).
  
- **Non-residential property**
  These apply to commercial property purchases and leases in Wales with specific rates, defined in [`non_residential.yaml`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/wra/land_transaction_tax/non_residential.yaml).
  
  - **Purchase rates**: Rates apply in bands from the nil-rate band to portions over higher thresholds, defined by specific band parameters in [`non_residential.yaml`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/wra/land_transaction_tax/non_residential.yaml).
    
  - **Rental agreements**: LTT applies to the net present value of commercial lease rent with threshold and rate structures, defined by specific rental parameters in [`rent.yaml`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/wra/land_transaction_tax/rent.yaml).

PolicyEngine [estimates](https://policyengine.org/uk/policy?reform=1&focus=policyOutput.policyBreakdown&region=uk&timePeriod=2025&baseline=80023) that abolishing land transaction tax would raise government revenue by £388.3 million in 2025. The following figure shows the distributional impact of this reform.

![](/images/posts/uk-taxes-post/ltt.png)

### Business rates
The UK imposes annual taxes on property occupation, including business rates for non-domestic properties.
Business rates are a tax on non-domestic properties like shops, offices and factories throughout the UK. They are set by central government but collected by local authorities, based on the property's estimated rental value, calculated as [`business_rates`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/hmrc/business_rates.py).

- **Corporate tax on non-domestic properties**: Calculated as a percentage (the multiplier) of a property's assessed rateable value, defined in business rates statistics parameters in [`statistics.yaml`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/hmrc/business_rates/statistics.yaml).
  
- **Regional variation (England, Scotland, Wales, Northern Ireland)**: Each nation sets its own multipliers and relief schemes, creating regional differences, defined in region-specific sections within [`statistics.yaml`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/hmrc/business_rates/statistics.yaml).

### Council tax/domestic rates
Residential properties are subject to council tax, except in Northern Ireland which uses domestic rates.
Council tax is a local tax on domestic properties in England, Scotland and Wales, funding local services. Northern Ireland uses a rates system based on rental values rather than the banded approach of council tax, calculated as [`domestic_rates`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/gov/local_authorities/domestic_rates.py).

- **Local authority property tax**: The primary revenue source for local authorities, funding services like waste collection, defined by domestic rates parameters in [`rates.yaml`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/local_authorities/domestic_rates/rates.yaml).
  
- **Based on property values**: Properties are assigned to bands based on their value from a fixed valuation date, defined by property band parameters in [`rates.yaml`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/local_authorities/domestic_rates/rates.yaml).
  
- **Regional variation by local authority**: Each council sets its own rates within central government constraints, creating geographic variation, defined by local authority specific rates in [`rates.yaml`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/local_authorities/domestic_rates/rates.yaml).

## Contributed/proposed taxes
Beyond modeling the existing UK tax system, PolicyEngine also includes several proposed taxes that are not currently implemented. These allow users to explore potential policy reforms and understand their distributional and revenue implications.

### Carbon tax
Carbon taxes can be used to price emissions and influence production and consumption patterns.
A carbon tax is a levy on carbon emissions required to produce goods and services, calculated in PolicyEngine as [`carbon_tax`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/contrib/ubi_center/carbon_tax.py).

- **Per-ton CO2 emission tax**: A fixed monetary amount charged per ton of carbon dioxide equivalent emitted, defined by the carbon tax rate parameter in [`carbon_tax.yaml`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/contrib/ubi_center/carbon_tax.yaml).

- **Consumer and corporate incidence modelling**: PolicyEngine models how the tax burden would be shared between consumers and producers in the [`carbon_tax`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/contrib/ubi_center/carbon_tax.py) variable implementation.
  
- **Applied to carbon consumption**: The tax applies to the carbon footprint of household consumption across categories, using household carbon intensity variables in [`carbon.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/household/consumption/carbon.py).

### Wealth tax
A wealth tax would apply to the total value of an individual's assets, calculated as [`wealth_tax`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/contrib/ubi_center/wealth_tax.py).

- **Annual tax on total household wealth**: A percentage tax applied to a household's total net wealth above a threshold, defined by wealth tax rate parameters in [`wealth_tax.yaml`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/contrib/ubi_center/wealth_tax.yaml).
  
- **Progressive rate structure based on wealth brackets**: Higher tax rates would apply to larger wealth holdings, similar to income tax bands, defined by wealth tax bracket parameters in [`wealth_tax.yaml`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/contrib/ubi_center/wealth_tax.yaml).

### Land value tax (LVT)
Land value tax focuses on the value of land itself, not the buildings or improvements on it.
Land value tax is a levy on the unimproved value of land, disregarding buildings or other improvements, calculated as [`land_value_tax`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/contrib/ubi_center/land_value_tax.py).

- **Tax on land value separate from improvements**: Only the underlying land value is taxed, not buildings or developments on the land. This differs from council tax and business rates, which tax the combined property value, defined by land value tax rate parameters in [`land_value_tax.yaml`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/contrib/ubi_center/land_value_tax.yaml).
  
- LVT includes the following components:
  - **General land value tax**: A base rate applied to all land values regardless of use or ownership type. This would capture land value derived from location and public infrastructure, included in the [`land_value_tax`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/contrib/ubi_center/land_value_tax.py) calculation.
    
  - **Household land value tax**: A rate applied specifically to land under residential use. This could replace council tax with a system not dependent on outdated valuations, included in the residential component of [`land_value_tax`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/contrib/ubi_center/land_value_tax.py).
    
  - **Corporate land value tax**: A rate applied to commercially used land. This could replace or supplement business rates, potentially reducing business investment distortions, included in the commercial component of [`land_value_tax`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/contrib/ubi_center/land_value_tax.py).

### Private school VAT
One proposal is to apply VAT to private education.
This would apply VAT to private school fees, ending the current exemption for private education, calculated as [`private_school_vat`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/contrib/labour/private_school_vat.py).

- **VAT applied to private school fees**: The standard VAT rate would apply to fees currently exempt as educational services, defined by private school VAT rate parameters in [`private_school_vat.yaml`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/contrib/labour/private_school_vat.yaml).
  
- **Progressive modelling based on household income**: PolicyEngine models which household income groups would bear the burden of this tax in the [`private_school_vat`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/contrib/labour/private_school_vat.py) implementation.
  
- **Adjusts for actual private school attendance rates**: The model accounts for varying private school attendance rates across income groups using the [`private_school_attendance_rate`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/contrib/labour/private_school_vat.py) parameter.

### Non-primary residence wealth tax
Some wealth tax proposals exempt the main residence from taxation.
This is a targeted wealth tax that would exempt one's main residence but tax other assets, calculated as [`non_primary_residence_wealth_tax`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/contrib/cec/non_primary_residence_wealth_tax.py).

- **Wealth tax that exempts main residence**: Applies only to assets beyond a household's primary home, defined by wealth tax exemption parameters in [`non_primary_residence_wealth_tax.yaml`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/parameters/gov/contrib/cec/non_primary_residence_wealth_tax.yaml).
  
- **Applied to all other wealth including secondary properties, financial assets, etc.**: Would capture investment properties, shares, bonds, business assets and other wealth forms through the non-primary wealth components in [`non_primary_residence_wealth_tax.py`](https://github.com/PolicyEngine/policyengine-uk/blob/master/policyengine_uk/variables/contrib/cec/non_primary_residence_wealth_tax.py).
