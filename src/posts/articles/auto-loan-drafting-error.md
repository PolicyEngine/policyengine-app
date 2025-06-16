On May 22nd, the House of Representatives voted 215-214 to approve [H.R.1 - The One Big Beautiful Bill Act](https://www.congress.gov/bill/119th-congress/house-bill/1) (OBBBA), which introduced a $10,000 auto loan interest deduction through SEC. 110104, titled "NO TAX ON CAR LOAN INTEREST." After reviewing the bill text surrounding this provision, the PolicyEngine team found that the bill creates a circular dependency by making an above-the-line deduction dependent on adjusted gross income (AGI), which makes the deduction impossible to calculate. In this report, we explain the drafting error and provide an amendment that policymakers could use to rectify the drafting error.

## Above-the-Line Deductions and AGI

The drafting error follows from how "above-the-line" deductions (ALDs) affect adjusted gross income (AGI).
Income tax calculations follow a specific order that cannot be altered:

| Step | Calculation                        | Result           |
| ---- | ---------------------------------- | ---------------- |
| 1    | Gross Income                       | Starting Point   |
| 2    | Minus Above-the-Line Deductions    | = AGI            |
| 3    | Minus Standard/Itemized Deductions | = Taxable Income |

Above-the-line deductions are subtracted directly from gross income to calculate adjusted gross income (AGI). These deductions include items like traditional IRA contributions, student loan interest, and the deduction for self-employment income. Filers can claim them regardless of whether they itemize deductions or take the standard deduction. "Below-the-line" deductions (standard and itemized deductions) are subtracted from AGI to determine taxable income.

This sequence powers income tax calculations: gross income minus above-the-line deductions equals AGI, then AGI minus either the standard deduction or itemized deductions equals taxable income. The auto loan interest provision in the OBBBA deviates from this order and creates an impossible mathematical situation.

## The Circular Dependency

The bill creates the auto loan interest deduction through two provisions that conflict:

### 1. Section 163(h)(4): Creates the Deduction with AGI-Based Phaseout

The bill adds a new paragraph (4) to [Section 163(h)](https://www.law.cornell.edu/uscode/text/26/163#h) (current law shown here) that excludes "qualified passenger vehicle loan interest" from the definition of personal interest for tax years 2025-2028. Specifically, Section 163(h)(4)(A) states:

> "In the case of taxable years beginning after December 31, 2024, and before January 1, 2029, for purposes of this subsection the term 'personal interest' shall not include qualified passenger vehicle loan interest."

The deduction is capped at $10,000 per year under Section 163(h)(4)(C)(i):

> "The amount of interest taken into account by a taxpayer under subparagraph (B) for any taxable year shall not exceed $10,000."

Critically, Section 163(h)(4)(C)(ii)(I) creates a phaseout based on modified adjusted gross income:

> "The amount which is otherwise allowable as a deduction under subsection (a) as qualified passenger vehicle loan interest (determined without regard to this clause and after the application of clause (i)) shall be reduced (but not below zero) by $200 for each $1,000 (or portion thereof) by which the modified adjusted gross income of the taxpayer for the taxable year exceeds $100,000 ($200,000 in the case of a joint return)."

**Note on the "determined without regard to this clause" language:** While this provision includes the phrase "determined without regard to this clause," this language does not solve the circular dependency. It merely clarifies the order of applying the two limitations: first apply the $10,000 cap from clause (i), then apply the AGI-based phaseout from clause (ii). The fundamental problem remains—the phaseout still depends on AGI, which depends on the very deduction being calculated.

The bill defines "modified adjusted gross income" in Section 163(h)(4)(C)(ii)(II) as:

> "the term 'modified adjusted gross income' means the adjusted gross income of the taxpayer for the taxable year increased by any amount excluded from gross income under section 911, 931, or 933."

_Note: Sections [911](https://www.law.cornell.edu/uscode/text/26/911), [931](https://www.law.cornell.edu/uscode/text/26/931), and [933](https://www.law.cornell.edu/uscode/text/26/933) refer to foreign income exclusions—specifically, the foreign earned income exclusion (911), income from Guam, American Samoa, or the Northern Mariana Islands (931), and income from Puerto Rico (933)._

This definition is crucial because it uses the taxpayer's AGI without excluding the auto loan interest deduction itself—which creates the circular dependency we'll explore below.

### 2. Section 62(a)(22): Makes it an Above-the-Line Deduction

The bill simultaneously amends Section 62(a) by adding paragraph (22):

> "Qualified passenger vehicle loan interest.--So much of the deduction allowed by section 163(a) as is attributable to the exception under section 163(h)(4)(A)."

This provision makes the auto loan interest deduction an above-the-line deduction, meaning it reduces gross income to arrive at AGI.

### The Impossible Loop

This creates an unsolvable loop, as each piece of information changes based on a prior calculation:

| Required Information       | Calculation                |
| -------------------------- | -------------------------- |
| Auto loan deduction amount | AGI (for phaseout)         |
| AGI                        | Above-the-line-deductions  |
| Above-the-line-deductions  | Auto loan deduction amount |

This represents a logical impossibility, not merely a computational challenge—there is no mathematically valid way to calculate the deduction under the bill as written.

### Example: The Impossible Calculation

Consider a single filer with:

- Gross income: $120,000
- Auto loan interest paid: $8,000
- No other above-the-line deductions

**Attempt 1**

| Calculation                           | Amount                                         |
| ------------------------------------- | ---------------------------------------------- |
| Assume full deduction applies         | $8,000                                         |
| AGI                                   | $120,000 - $8,000 = $112,000                   |
| Phaseout per Section 163(h)(4)(C)(ii) | ($112,000 - $100,000) ÷ $1,000 × $200 = $2,400 |
| Actual deduction                      | $8,000 - $2,400 = $5,600                       |

**Attempt 2**

| Calculation                           | Amount                                         |
| ------------------------------------- | ---------------------------------------------- |
| Use $5,600 deduction from Attempt 1   | $5,600                                         |
| AGI                                   | $120,000 - $5,600 = $114,400                   |
| Phaseout per Section 163(h)(4)(C)(ii) | ($114,400 - $100,000) ÷ $1,000 × $200 = $2,880 |
| Actual deduction                      | $8,000 - $2,880 = $5,120                       |

The calculation never stabilizes. Each attempt produces a different deduction amount, which changes AGI, which changes the phaseout, creating an infinite loop.

## PolicyEngine's Solution

To enable our microsimulation of the OBBBA to execute, PolicyEngine modified the policy to phase out the deduction based on AGI calculated without the auto loan interest deduction. This breaks the circular dependency while preserving the policy intent.

Returning to the example from before:

| Calculation                                | Amount                                         |
| ------------------------------------------ | ---------------------------------------------- |
| Modified AGI (without auto loan deduction) | $120,000                                       |
| Phaseout                                   | ($120,000 - $100,000) ÷ $1,000 × $200 = $4,000 |
| Final deduction                            | $8,000 - $4,000 = $4,000                       |
| Actual AGI                                 | $120,000 - $4,000 = $116,000                   |

This approach produces a stable, calculable result.

## An Amendment to Implement PolicyEngine's Solution

If Congress chose to adopt the PolicyEngine solution, they could amend Section 163(h)(4)(C)(ii)(II) to modify the definition of "modified adjusted gross income" with the following amendment:

> Page 767 (of H.R.1), strike line 5 and all that follows through line 2 on page 768, and insert the following:
>
> '(ii) LIMITATION BASED ON MODIFIED ADJUSTED GROSS INCOME.—
>
> ''(I) IN GENERAL.—The amount which is otherwise allowable as a deduction under subsection (a) as qualified passenger vehicle loan interest (determined without regard to this clause and after the application of clause (i)) shall be reduced (but not below zero) by $200 for each $1,000 (or portion thereof) by which the modified adjusted gross income of the taxpayer for the taxable year exceeds $100,000 ($200,000 in the case of a joint return).
>
> ''(II) MODIFIED ADJUSTED GROSS INCOME.—For purposes of this clause, the term 'modified adjusted gross income' means the adjusted gross income of the taxpayer for the taxable year (**determined without regard to the deduction allowed under this paragraph**) increased by any amount excluded from gross income under section 911, 931, or 933.

The modification in bold resolves the circular reference by excluding the auto loan deduction from the AGI calculation used for the phaseout.

## Conclusion

This case demonstrates how policy simulation tools can identify technical issues in tax legislation before implementation. When designing above-the-line deductions, policymakers should ensure they do not depend on AGI, the very value they help determine. Policy simulation platforms like PolicyEngine test whether provisions can be calculated in practice, helping catch drafting errors that could otherwise delay implementation or require corrections. These computational checks provide a practical way to verify that new tax provisions function as intended within the existing tax code structure.
