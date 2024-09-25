export const promptContent = (
  metadata,
  selectedVersion,
  timePeriod,
  regionKeyToLabel,
  impact,
  policyLabel,
  policy,
  region,
  relevantParameterBaselineValues,
  relevantParameters,
) => {
  const isEnhancedCPS = regionKeyToLabel[region].includes("enhanced CPS");

  const policyDetails = `I'm using PolicyEngine, a free, open source tool to compute the impact of public policy. I'm writing up an economic analysis of a hypothetical tax-benefit policy reform. Please write the analysis for me using the details below, in their order. You should:
    
    * First explain each provision of the reform, noting that it's hypothetical and won't represents policy reforms for ${timePeriod} and ${
      regionKeyToLabel[region]
    }. Explain how the parameters are changing from the baseline to the reform values using the given data.
     ${
       isEnhancedCPS &&
       "*  Explicitly mention that this analysis uses PolicyEngine's Enhanced CPS, constructed from the 2024 Current Population Survey and the 2015 IRS Public Use File, and calibrated to tax, benefit, income, and demographic aggregates."
     }
    * Round large numbers like: ${metadata.currency}3.1 billion, ${
      metadata.currency
    }300 million, ${metadata.currency}106,000, ${metadata.currency}1.50 (never ${
      metadata.currency
    }1.5).
    * Round percentages to one decimal place.
    * Avoid normative language like 'requires', 'should', 'must', and use quantitative statements over general adjectives and adverbs. If you don't know what something is, don't make it up.
    * Avoid speculating about the intent of the policy or inferring any motives; only describe the observable effects and impacts of the policy. Refrain from using subjective language or making assumptions about the recipients and their needs.
    * Use the active voice where possible; for example, write phrases where the reform is the subject, such as "the reform [or a description of the reform] reduces poverty by x%".
    * Use ${
      metadata.countryId === "uk" ? "British" : "American"
    } English spelling and grammar.
    * Cite PolicyEngine ${metadata.countryId.toUpperCase()} v${selectedVersion} and the ${
      metadata.countryId === "uk"
        ? "PolicyEngine-enhanced 2019 Family Resources Survey"
        : "2022 Current Population Survey March Supplement"
    } microdata when describing policy impacts.
    * When describing poverty impacts, note that the poverty measure reported is ${
      metadata.countryId === "uk"
        ? "absolute poverty before housing costs"
        : "the Supplemental Poverty Measure"
    }.
    * Don't use headers, but do use Markdown formatting. Use - for bullets, and include a newline after each bullet.
    * Include the following embeds inline, without a header so it flows.
    * Immediately after you describe the changes by decile, include the text: {{decileRelativeImpact}}
    * And after the poverty rate changes, include the text: {{povertyImpact}}
    ${
      metadata.countryId === "us"
        ? "* After the racial breakdown of poverty rate changes, include the text: {{racialPovertyImpact}}"
        : ""
    }
    * And after the inequality changes, include the text: {{inequalityImpact}}
    * Make sure to accurately represent the changes observed in the data.
  
    This JSON snippet describes the default parameter values: ${JSON.stringify(
      relevantParameterBaselineValues,
    )}\n
    This JSON snippet describes the baseline and reform policies being compared: ${JSON.stringify(
      policy,
    )}\n`;

  const description = `${policyLabel} has the following impacts from the PolicyEngine microsimulation model: 
  
    This JSON snippet describes the relevant parameters with more details: ${JSON.stringify(
      relevantParameters,
    )}
  
    This JSON describes the total budgetary impact, the change to tax revenues and benefit spending (ignore 'households' and 'baseline_net_income': ${JSON.stringify(
      impact.budget,
    )}
  
    This JSON describes how common different outcomes were at each income decile: ${JSON.stringify(
      impact.intra_decile,
    )}
  
    This JSON describes the average and relative changes to income by each income decile: ${JSON.stringify(
      impact.decile,
    )}
  
    This JSON describes the baseline and reform poverty rates by age group (describe the relative changes): ${JSON.stringify(
      impact.poverty.poverty,
    )}
  
    This JSON describes the baseline and reform deep poverty rates by age group (describe the relative changes): ${JSON.stringify(
      impact.poverty.deep_poverty,
    )}
  
    This JSON describes the baseline and reform poverty and deep poverty rates by gender (briefly describe the relative changes): ${JSON.stringify(
      impact.poverty_by_gender,
    )}
  
    ${
      metadata.countryId === "us" &&
      "This JSON describes the baseline and reform poverty impacts by racial group (briefly describe the relative changes): " +
        JSON.stringify(impact.poverty_by_race.poverty)
    }
  
    This JSON describes three inequality metrics in the baseline and reform, the Gini coefficient of income inequality, the share of income held by the top 10% of households and the share held by the top 1% (describe the relative changes): ${JSON.stringify(
      impact.inequality,
    )}
    
    `;

  return policyDetails + description;
};
