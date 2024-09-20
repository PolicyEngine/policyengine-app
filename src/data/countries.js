import colors from "../style/colors";

export const COUNTRY_CODES = ["uk", "us", "ca", "ng"];

export const INITIAL_COUNTRY_STATUSES = {
  uk: "",
  us: "",
  ca: "",
  ng: "",
};

export const COUNTRY_NAMES = {
  us: {
    standard: "The United States",
    phrasal: "the United States",
    short: "The US",
    singleWord: "US",
  },
  uk: {
    standard: "The United Kingdom",
    phrasal: "the United Kingdom",
    short: "The UK",
    singleWord: "UK",
  },
  ca: {
    standard: "Canada",
  },
  ng: {
    standard: "Nigeria",
  },
  il: {
    standard: "Israel",
  },
};

export const COUNTRY_BASELINE_POLICIES = {
  uk: 1,
  us: 2,
  ca: 3,
  ng: 4,
  il: 5,
};

export const STATUS_COLORS = {
  OK: colors.BLUE_95,
  ERROR: colors.DARK_RED,
  Pending: colors.LIGHT_GRAY,
};

export const STATUS_TEXT_COLORS = {
  OK: colors.BLUE,
  ERROR: colors.WHITE,
  Pending: colors.BLACK,
};

// Map region entries to default datasets;
// at the moment, this only applies to the
// "enhanced_us" region selection
export const DEFAULT_DATASETS = {
  enhanced_us: "enhanced_cps_2024",
};

const DEFAULT_US_HOUSEHOLD = {
  families: {
    "your family": {
      family_id: {
        2024: 0,
      },
      family_weight: {
        2024: 0,
      },
      is_married: {
        2024: null,
      },
      members: ["you"],
    },
  },
  households: {
    "your household": {
      AK: {
        2024: null,
      },
      AL: {
        2024: null,
      },
      AR: {
        2024: null,
      },
      AZ: {
        2024: null,
      },
      CA: {
        2024: null,
      },
      CO: {
        2024: null,
      },
      CT: {
        2024: null,
      },
      DC: {
        2024: null,
      },
      DE: {
        2024: null,
      },
      FL: {
        2024: null,
      },
      GA: {
        2024: null,
      },
      HI: {
        2024: null,
      },
      IA: {
        2024: null,
      },
      ID: {
        2024: null,
      },
      IL: {
        2024: null,
      },
      IN: {
        2024: null,
      },
      KS: {
        2024: null,
      },
      KY: {
        2024: null,
      },
      LA: {
        2024: null,
      },
      MA: {
        2024: null,
      },
      MD: {
        2024: null,
      },
      ME: {
        2024: null,
      },
      MI: {
        2024: null,
      },
      MN: {
        2024: null,
      },
      MO: {
        2024: null,
      },
      MS: {
        2024: null,
      },
      MT: {
        2024: null,
      },
      NC: {
        2024: null,
      },
      ND: {
        2024: null,
      },
      NE: {
        2024: null,
      },
      NH: {
        2024: null,
      },
      NJ: {
        2024: null,
      },
      NM: {
        2024: null,
      },
      NV: {
        2024: null,
      },
      NY: {
        2024: null,
      },
      OH: {
        2024: null,
      },
      OK: {
        2024: null,
      },
      OR: {
        2024: null,
      },
      PA: {
        2024: null,
      },
      RI: {
        2024: null,
      },
      SC: {
        2024: null,
      },
      SD: {
        2024: null,
      },
      TN: {
        2024: null,
      },
      TX: {
        2024: null,
      },
      UT: {
        2024: null,
      },
      VA: {
        2024: null,
      },
      VT: {
        2024: null,
      },
      WA: {
        2024: null,
      },
      WI: {
        2024: null,
      },
      WV: {
        2024: null,
      },
      WY: {
        2024: null,
      },
      average_home_energy_use_in_state: {
        2024: 0,
      },
      ca_care: {
        2024: null,
      },
      ca_care_amount_if_eligible: {
        2024: null,
      },
      ca_care_categorically_eligible: {
        2024: null,
      },
      ca_care_eligible: {
        2024: null,
      },
      ca_care_income_eligible: {
        2024: null,
      },
      ca_care_poverty_line: {
        2024: null,
      },
      ca_fera: {
        2024: null,
      },
      ca_fera_amount_if_eligible: {
        2024: null,
      },
      ca_fera_eligible: {
        2024: null,
      },
      ccdf_county_cluster: {
        2024: null,
      },
      county: {
        2024: null,
      },
      county_fips: {
        2024: 0,
      },
      county_str: {
        2024: null,
      },
      current_home_energy_use: {
        2024: 0,
      },
      equiv_household_net_income: {
        2024: null,
      },
      fips: {
        2024: 6,
      },
      household_benefits: {
        2024: null,
      },
      household_count_people: {
        2024: null,
      },
      household_id: {
        2024: 0,
      },
      household_income_ami_ratio: {
        2024: 0,
      },
      household_income_decile: {
        2024: null,
      },
      household_market_income: {
        2024: null,
      },
      household_net_income: {
        2024: null,
      },
      household_refundable_tax_credits: {
        2024: null,
      },
      household_size: {
        2024: null,
      },
      household_tax: {
        2024: null,
      },
      household_tax_before_refundable_credits: {
        2024: null,
      },
      household_vehicles_owned: {
        2024: 0,
      },
      household_weight: {
        2024: 0,
      },
      in_nyc: {
        2024: false,
      },
      is_homeless: {
        2024: false,
      },
      is_on_tribal_land: {
        2024: false,
      },
      is_rural: {
        2024: false,
      },
      medicaid_rating_area: {
        2024: null,
      },
      members: ["you"],
      snap_region: {
        2024: null,
      },
      snap_region_str: {
        2024: null,
      },
      snap_utility_region: {
        2024: null,
      },
      snap_utility_region_str: {
        2024: null,
      },
      state_code: {
        2024: null,
      },
      state_code_str: {
        2024: null,
      },
      state_fips: {
        2024: 6,
      },
      state_group: {
        2024: null,
      },
      state_group_str: {
        2024: null,
      },
      state_living_arrangement: {
        2024: "FULL_COST",
      },
      state_name: {
        2024: "CA",
      },
      three_digit_zip_code: {
        2024: null,
      },
      zip_code: {
        2024: null,
      },
    },
  },
  marital_units: {
    "your marital unit": {
      marital_unit_id: {
        2024: 0,
      },
      marital_unit_weight: {
        2024: null,
      },
      members: ["you"],
    },
  },
  people: {
    you: {
      adult_index: {
        2024: null,
      },
      age: {
        2024: 40,
      },
      age_group: {
        2024: null,
      },
      alimony_expense: {
        2024: 0,
      },
      alimony_income: {
        2024: 0,
      },
      assessed_property_value: {
        2024: 0,
      },
      business_is_qualified: {
        2024: false,
      },
      business_is_sstb: {
        2024: false,
      },
      ca_cvrp: {
        2024: null,
      },
      ca_cvrp_vehicle_rebate_amount: {
        2024: 0,
      },
      ca_is_qualifying_child_for_caleitc: {
        2024: null,
      },
      capital_gains: {
        2024: null,
      },
      capital_loss: {
        2024: null,
      },
      casualty_loss: {
        2024: 0,
      },
      ccdf_age_group: {
        2024: null,
      },
      ccdf_duration_of_care: {
        2024: null,
      },
      ccdf_market_rate: {
        2024: null,
      },
      cdcc_qualified_dependent: {
        2024: null,
      },
      charitable_cash_donations: {
        2024: 0,
      },
      charitable_non_cash_donations: {
        2024: 0,
      },
      child_support_expense: {
        2024: 0,
      },
      child_support_received: {
        2024: 0,
      },
      childcare_days_per_week: {
        2024: 0,
      },
      childcare_hours_per_day: {
        2024: 0,
      },
      childcare_hours_per_week: {
        2024: null,
      },
      childcare_provider_type_group: {
        2024: "DCC_SACC",
      },
      claimed_ma_covid_19_essential_employee_premium_pay_program_2020: {
        2024: false,
      },
      cliff_evaluated: {
        2024: null,
      },
      cliff_gap: {
        2024: null,
      },
      cmbtp: {
        2024: 0,
      },
      count_days_postpartum: {
        2024: null,
      },
      cps_race: {
        2024: 0,
      },
      ctc_adult_individual_maximum: {
        2024: null,
      },
      ctc_child_individual_maximum: {
        2024: null,
      },
      ctc_child_individual_maximum_arpa: {
        2024: null,
      },
      ctc_individual_maximum: {
        2024: null,
      },
      ctc_qualifying_child: {
        2024: null,
      },
      debt_relief: {
        2024: 0,
      },
      disability_benefits: {
        2024: 0,
      },
      dividend_income: {
        2024: null,
      },
      e00200: {
        2024: null,
      },
      e00300: {
        2024: null,
      },
      e02300: {
        2024: 0,
      },
      e02400: {
        2024: null,
      },
      e87530: {
        2024: 0,
      },
      early_withdrawal_penalty: {
        2024: 0,
      },
      earned: {
        2024: null,
      },
      earned_income: {
        2024: null,
      },
      educator_expense: {
        2024: 0,
      },
      employee_medicare_tax: {
        2024: null,
      },
      employee_social_security_tax: {
        2024: null,
      },
      employment_income: {
        2024: null,
      },
      farm_income: {
        2024: 0,
      },
      farm_rent_income: {
        2024: 0,
      },
      general_assistance: {
        2024: 0,
      },
      gi_cash_assistance: {
        2024: 0,
      },
      has_disabled_spouse: {
        2024: null,
      },
      has_marketplace_health_coverage: {
        2024: true,
      },
      health_insurance_premiums: {
        2024: 0,
      },
      illicit_income: {
        2024: 0,
      },
      in_is_qualifying_dependent_child: {
        2024: null,
      },
      incapable_of_self_care: {
        2024: false,
      },
      income_decile: {
        2024: null,
      },
      interest_expense: {
        2024: 0,
      },
      interest_income: {
        2024: null,
      },
      ira_contributions: {
        2024: 0,
      },
      irs_gross_income: {
        2024: null,
      },
      is_adult: {
        2024: null,
      },
      is_adult_for_medicaid: {
        2024: null,
      },
      is_adult_for_medicaid_fc: {
        2024: null,
      },
      is_adult_for_medicaid_nfc: {
        2024: null,
      },
      is_blind: {
        2024: false,
      },
      is_breastfeeding: {
        2024: false,
      },
      is_ca_cvrp_increased_rebate_eligible: {
        2024: null,
      },
      is_ca_cvrp_normal_rebate_eligible: {
        2024: null,
      },
      is_ccdf_age_eligible: {
        2024: null,
      },
      is_ccdf_eligible: {
        2024: null,
      },
      is_ccdf_home_based: {
        2024: null,
      },
      is_ccdf_reason_for_care_eligible: {
        2024: null,
      },
      is_cdcc_eligible: {
        2024: null,
      },
      is_child: {
        2024: null,
      },
      is_child_of_tax_head: {
        2024: null,
      },
      is_citizen: {
        2024: false,
      },
      is_disabled: {
        2024: false,
      },
      is_eitc_qualifying_child: {
        2024: null,
      },
      is_eligible_for_american_opportunity_credit: {
        2024: false,
      },
      is_enrolled_in_ccdf: {
        2024: false,
      },
      is_father: {
        2024: null,
      },
      is_female: {
        2024: false,
      },
      is_full_time_college_student: {
        2024: false,
      },
      is_full_time_student: {
        2024: null,
      },
      is_fully_disabled_service_connected_veteran: {
        2024: false,
      },
      is_hispanic: {
        2024: false,
      },
      is_in_k12_nonpublic_school: {
        2024: false,
      },
      is_in_k12_school: {
        2024: null,
      },
      is_in_medicaid_medically_needy_category: {
        2024: null,
      },
      is_infant_for_medicaid: {
        2024: null,
      },
      is_infant_for_medicaid_fc: {
        2024: null,
      },
      is_infant_for_medicaid_nfc: {
        2024: null,
      },
      is_male: {
        2024: null,
      },
      is_medicaid_eligible: {
        2024: null,
      },
      is_medically_needy_for_medicaid: {
        2024: null,
      },
      is_mother: {
        2024: null,
      },
      is_older_child_for_medicaid: {
        2024: null,
      },
      is_older_child_for_medicaid_fc: {
        2024: null,
      },
      is_older_child_for_medicaid_nfc: {
        2024: null,
      },
      is_on_cliff: {
        2024: null,
      },
      is_optional_senior_or_disabled_for_medicaid: {
        2024: null,
      },
      is_parent_for_medicaid: {
        2024: null,
      },
      is_parent_for_medicaid_fc: {
        2024: null,
      },
      is_parent_for_medicaid_nfc: {
        2024: null,
      },
      is_permanently_and_totally_disabled: {
        2024: false,
      },
      is_permanently_disabled_veteran: {
        2024: false,
      },
      is_person_demographic_tanf_eligible: {
        2024: null,
      },
      is_pregnant: {
        2024: false,
      },
      is_pregnant_for_medicaid: {
        2024: null,
      },
      is_pregnant_for_medicaid_fc: {
        2024: null,
      },
      is_pregnant_for_medicaid_nfc: {
        2024: null,
      },
      is_retired: {
        2024: null,
      },
      is_self_employed: {
        2024: false,
      },
      is_senior: {
        2024: null,
      },
      is_severely_disabled: {
        2024: false,
      },
      is_ssi_aged: {
        2024: null,
      },
      is_ssi_aged_blind_disabled: {
        2024: null,
      },
      is_ssi_disabled: {
        2024: null,
      },
      is_ssi_eligible_individual: {
        2024: null,
      },
      is_ssi_eligible_spouse: {
        2024: null,
      },
      is_ssi_ineligible_child: {
        2024: null,
      },
      is_ssi_ineligible_parent: {
        2024: null,
      },
      is_ssi_ineligible_spouse: {
        2024: null,
      },
      is_ssi_recipient_for_medicaid: {
        2024: null,
      },
      is_surviving_child_of_disabled_veteran: {
        2024: false,
      },
      is_surviving_spouse_of_disabled_veteran: {
        2024: false,
      },
      is_tax_unit_dependent: {
        2024: null,
      },
      is_tax_unit_head: {
        2024: null,
      },
      is_tax_unit_spouse: {
        2024: null,
      },
      is_usda_disabled: {
        2024: null,
      },
      is_usda_elderly: {
        2024: null,
      },
      is_wa_adult: {
        2024: null,
      },
      is_wic_at_nutritional_risk: {
        2024: null,
      },
      is_young_adult_for_medicaid: {
        2024: null,
      },
      is_young_adult_for_medicaid_fc: {
        2024: null,
      },
      is_young_adult_for_medicaid_nfc: {
        2024: null,
      },
      is_young_child_for_medicaid: {
        2024: null,
      },
      is_young_child_for_medicaid_fc: {
        2024: null,
      },
      is_young_child_for_medicaid_nfc: {
        2024: null,
      },
      k1bx14: {
        2024: 0,
      },
      long_term_capital_gains: {
        2024: 0,
      },
      long_term_capital_gains_on_collectibles: {
        2024: 0,
      },
      long_term_capital_gains_on_small_business_stock: {
        2024: 0,
      },
      long_term_capital_losses: {
        2024: 0,
      },
      ma_covid_19_essential_employee_premium_pay_program: {
        2024: null,
      },
      marginal_tax_rate: {
        2024: null,
      },
      market_income: {
        2024: null,
      },
      maximum_state_supplement: {
        2024: null,
      },
      md_pension_subtraction_amount: {
        2024: null,
      },
      md_socsec_subtraction_amount: {
        2024: null,
      },
      medicaid: {
        2024: null,
      },
      medicaid_benefit_value: {
        2024: null,
      },
      medicaid_category: {
        2024: null,
      },
      medicaid_income_level: {
        2024: null,
      },
      medical_expense: {
        2024: null,
      },
      medical_out_of_pocket_expenses: {
        2024: 0,
      },
      meets_ssi_resource_test: {
        2024: null,
      },
      meets_wic_categorical_eligibility: {
        2024: null,
      },
      military_basic_pay: {
        2024: 0,
      },
      military_retirement_pay: {
        2024: 0,
      },
      military_service_income: {
        2024: 0,
      },
      miscellaneous_income: {
        2024: 0,
      },
      mo_adjusted_gross_income: {
        2024: null,
      },
      mo_income_tax_before_credits: {
        2024: null,
      },
      mo_income_tax_exempt: {
        2024: null,
      },
      mo_pension_and_ss_or_ssd_deduction_section_a: {
        2024: null,
      },
      mo_pension_and_ss_or_ssd_deduction_section_b: {
        2024: null,
      },
      mo_pension_and_ss_or_ssd_deduction_section_c: {
        2024: null,
      },
      mo_qualified_health_insurance_premiums: {
        2024: null,
      },
      mo_taxable_income: {
        2024: null,
      },
      net_income: {
        2024: 0,
      },
      non_qualified_dividend_income: {
        2024: 0,
      },
      non_sch_d_capital_gains: {
        2024: 0,
      },
      oh_has_not_taken_oh_lump_sum_credits: {
        2024: false,
      },
      own_children_in_household: {
        2024: 0,
      },
      pa_nontaxable_pension_income: {
        2024: null,
      },
      partnership_s_corp_income: {
        2024: 0,
      },
      payroll_tax_gross_wages: {
        2024: null,
      },
      pencon: {
        2024: 0,
      },
      pension_contributions: {
        2024: null,
      },
      pension_income: {
        2024: null,
      },
      people: {
        2024: 1,
      },
      per_vehicle_payment: {
        2024: null,
      },
      person_family_id: {
        2024: 0,
      },
      person_household_id: {
        2024: 0,
      },
      person_id: {
        2024: null,
      },
      person_in_poverty: {
        2024: null,
      },
      person_marital_unit_id: {
        2024: 0,
      },
      person_spm_unit_id: {
        2024: 0,
      },
      person_tax_unit_id: {
        2024: 0,
      },
      person_weight: {
        2024: null,
      },
      private_pension_income: {
        2024: null,
      },
      public_pension_income: {
        2024: null,
      },
      qbid_amount: {
        2024: null,
      },
      qualified_adoption_assistance_expense: {
        2024: 0,
      },
      qualified_business_income: {
        2024: null,
      },
      qualified_dividend_income: {
        2024: 0,
      },
      qualified_tuition_expenses: {
        2024: 0,
      },
      qualifies_for_elderly_or_disabled_credit: {
        2024: null,
      },
      race: {
        2024: null,
      },
      real_estate_taxes: {
        2024: 0,
      },
      receives_or_needs_protective_services: {
        2024: false,
      },
      receives_wic: {
        2024: false,
      },
      rent: {
        2024: 0,
      },
      rental_income: {
        2024: 0,
      },
      retired_on_total_disability: {
        2024: false,
      },
      salt_refund_income: {
        2024: 0,
      },
      self_employed_health_insurance_ald_person: {
        2024: null,
      },
      self_employed_health_insurance_premiums: {
        2024: null,
      },
      self_employed_pension_contribution_ald_person: {
        2024: null,
      },
      self_employed_pension_contributions: {
        2024: 0,
      },
      self_employment_income: {
        2024: 0,
      },
      self_employment_medicare_tax: {
        2024: null,
      },
      self_employment_social_security_tax: {
        2024: null,
      },
      self_employment_tax: {
        2024: null,
      },
      self_employment_tax_ald_person: {
        2024: null,
      },
      sep_simple_qualified_plan_contributions: {
        2024: 0,
      },
      sey: {
        2024: null,
      },
      short_term_capital_gains: {
        2024: 0,
      },
      short_term_capital_losses: {
        2024: 0,
      },
      social_security: {
        2024: null,
      },
      social_security_dependents: {
        2024: 0,
      },
      social_security_disability: {
        2024: 0,
      },
      social_security_retirement: {
        2024: 0,
      },
      social_security_survivors: {
        2024: 0,
      },
      social_security_taxable_self_employment_income: {
        2024: null,
      },
      ssi: {
        2024: null,
      },
      ssi_amount_if_eligible: {
        2024: null,
      },
      ssi_category: {
        2024: "NONE",
      },
      ssi_claim_is_joint: {
        2024: null,
      },
      ssi_countable_income: {
        2024: null,
      },
      ssi_countable_resources: {
        2024: 0,
      },
      ssi_earned_income: {
        2024: null,
      },
      ssi_earned_income_deemed_from_ineligible_spouse: {
        2024: null,
      },
      ssi_income_deemed_from_ineligible_spouse: {
        2024: null,
      },
      ssi_ineligible_child_allocation: {
        2024: null,
      },
      ssi_ineligible_parent_allocation: {
        2024: null,
      },
      ssi_reported: {
        2024: 0,
      },
      ssi_unearned_income: {
        2024: null,
      },
      ssi_unearned_income_deemed_from_ineligible_parent: {
        2024: null,
      },
      ssi_unearned_income_deemed_from_ineligible_spouse: {
        2024: null,
      },
      state_supplement: {
        2024: null,
      },
      strike_benefits: {
        2024: 0,
      },
      student_loan_interest: {
        2024: 0,
      },
      tanf_person: {
        2024: null,
      },
      tanf_reported: {
        2024: 0,
      },
      tax_exempt_interest_income: {
        2024: 0,
      },
      tax_exempt_pension_income: {
        2024: null,
      },
      tax_exempt_private_pension_income: {
        2024: 0,
      },
      tax_exempt_public_pension_income: {
        2024: 0,
      },
      tax_exempt_unemployment_compensation: {
        2024: null,
      },
      taxable_earnings_for_social_security: {
        2024: null,
      },
      taxable_interest_income: {
        2024: 0,
      },
      taxable_pension_income: {
        2024: null,
      },
      taxable_private_pension_income: {
        2024: 0,
      },
      taxable_public_pension_income: {
        2024: 0,
      },
      taxable_self_employment_income: {
        2024: null,
      },
      taxable_social_security: {
        2024: null,
      },
      taxable_unemployment_compensation: {
        2024: null,
      },
      total_disability_payments: {
        2024: 0,
      },
      total_income: {
        2024: 0,
      },
      unadjusted_basis_qualified_property: {
        2024: 0,
      },
      uncapped_ssi: {
        2024: null,
      },
      under_12_months_postpartum: {
        2024: false,
      },
      under_60_days_postpartum: {
        2024: false,
      },
      unemployment_compensation: {
        2024: 0,
      },
      us_bonds_for_higher_ed: {
        2024: 0,
      },
      vehicles_owned: {
        2024: null,
      },
      veterans_benefits: {
        2024: 0,
      },
      w2_wages_from_qualified_business: {
        2024: 0,
      },
      wic: {
        2024: null,
      },
      wic_category: {
        2024: null,
      },
      wic_category_str: {
        2024: null,
      },
      workers_compensation: {
        2024: 0,
      },
      would_claim_wic: {
        2024: null,
      },
    },
  },
  spm_units: {
    "your household": {
      acp: {
        2024: null,
      },
      ami: {
        2024: 0,
      },
      broadband_cost: {
        2024: 0,
      },
      broadband_cost_after_lifeline: {
        2024: null,
      },
      ccdf_income: {
        2024: null,
      },
      ccdf_income_to_smi_ratio: {
        2024: null,
      },
      childcare_expenses: {
        2024: 0,
      },
      co_tanf: {
        2024: null,
      },
      co_tanf_count_children: {
        2024: null,
      },
      co_tanf_countable_earned_income_grant_standard: {
        2024: null,
      },
      co_tanf_countable_earned_income_need: {
        2024: null,
      },
      co_tanf_countable_gross_earned_income: {
        2024: null,
      },
      co_tanf_countable_gross_unearned_income: {
        2024: null,
      },
      co_tanf_eligible: {
        2024: null,
      },
      co_tanf_grant_standard: {
        2024: null,
      },
      co_tanf_income_eligible: {
        2024: null,
      },
      co_tanf_need_standard: {
        2024: null,
      },
      count_distinct_utility_expenses: {
        2024: null,
      },
      dc_tanf: {
        2024: null,
      },
      dc_tanf_countable_earned_income: {
        2024: null,
      },
      dc_tanf_countable_gross_unearned_income: {
        2024: null,
      },
      dc_tanf_countable_income: {
        2024: null,
      },
      dc_tanf_countable_resources: {
        2024: 0,
      },
      dc_tanf_eligible: {
        2024: null,
      },
      dc_tanf_grant_standard: {
        2024: null,
      },
      dc_tanf_gross_earned_income: {
        2024: null,
      },
      dc_tanf_income_eligible: {
        2024: null,
      },
      dc_tanf_need_standard: {
        2024: null,
      },
      dc_tanf_resources_eligible: {
        2024: null,
      },
      deep_poverty_gap: {
        2024: null,
      },
      deep_poverty_line: {
        2024: null,
      },
      ebb: {
        2024: null,
      },
      electricity_expense: {
        2024: 0,
      },
      enrolled_in_ebb: {
        2024: false,
      },
      experienced_covid_income_loss: {
        2024: false,
      },
      fcc_fpg_ratio: {
        2024: null,
      },
      fdpir: {
        2024: 0,
      },
      free_school_meals: {
        2024: null,
      },
      free_school_meals_reported: {
        2024: 0,
      },
      gas_expense: {
        2024: 0,
      },
      has_all_usda_elderly_disabled: {
        2024: null,
      },
      has_heating_cooling_expense: {
        2024: null,
      },
      has_phone_expense: {
        2024: null,
      },
      has_usda_elderly_disabled: {
        2024: null,
      },
      heating_cooling_expense: {
        2024: 0,
      },
      hhs_smi: {
        2024: null,
      },
      housing_assistance: {
        2024: null,
      },
      housing_cost: {
        2024: null,
      },
      housing_designated_welfare: {
        2024: 0,
      },
      hud_adjusted_income: {
        2024: null,
      },
      hud_annual_income: {
        2024: null,
      },
      hud_gross_rent: {
        2024: null,
      },
      hud_hap: {
        2024: null,
      },
      hud_income_level: {
        2024: null,
      },
      hud_max_subsidy: {
        2024: null,
      },
      hud_minimum_rent: {
        2024: 0,
      },
      hud_ttp: {
        2024: null,
      },
      hud_ttp_adjusted_income_share: {
        2024: null,
      },
      hud_ttp_income_share: {
        2024: null,
      },
      hud_utility_allowance: {
        2024: 0,
      },
      in_deep_poverty: {
        2024: null,
      },
      in_poverty: {
        2024: null,
      },
      is_acp_eligible: {
        2024: null,
      },
      is_ccdf_asset_eligible: {
        2024: null,
      },
      is_ccdf_continuous_income_eligible: {
        2024: false,
      },
      is_ccdf_income_eligible: {
        2024: null,
      },
      is_ccdf_initial_income_eligible: {
        2024: false,
      },
      is_demographic_tanf_eligible: {
        2024: null,
      },
      is_ebb_eligible: {
        2024: null,
      },
      is_eligible_for_housing_assistance: {
        2024: null,
      },
      is_hud_elderly_disabled_family: {
        2024: null,
      },
      is_lifeline_eligible: {
        2024: null,
      },
      is_snap_eligible: {
        2024: null,
      },
      is_tanf_continuous_eligible: {
        2024: null,
      },
      is_tanf_eligible: {
        2024: null,
      },
      is_tanf_enrolled: {
        2024: false,
      },
      is_tanf_initial_eligible: {
        2024: null,
      },
      is_tanf_non_cash_eligible: {
        2024: null,
      },
      is_tanf_non_cash_hheod: {
        2024: null,
      },
      lifeline: {
        2024: null,
      },
      md_tanf_count_children: {
        2024: null,
      },
      md_tanf_eligible: {
        2024: false,
      },
      md_tanf_gross_earned_income_deduction: {
        2024: null,
      },
      md_tanf_maximum_benefit: {
        2024: null,
      },
      meets_ccdf_activity_test: {
        2024: false,
      },
      meets_school_meal_categorical_eligibility: {
        2024: null,
      },
      meets_snap_asset_test: {
        2024: null,
      },
      meets_snap_categorical_eligibility: {
        2024: null,
      },
      meets_snap_gross_income_test: {
        2024: null,
      },
      meets_snap_net_income_test: {
        2024: null,
      },
      meets_tanf_non_cash_asset_test: {
        2024: null,
      },
      meets_tanf_non_cash_gross_income_test: {
        2024: null,
      },
      meets_tanf_non_cash_net_income_test: {
        2024: null,
      },
      meets_wic_income_test: {
        2024: null,
      },
      members: ["you"],
      mo_tanf_income_limit: {
        2024: null,
      },
      nj_tanf_countable_gross_unearned_income: {
        2024: null,
      },
      nj_tanf_countable_resources: {
        2024: 0,
      },
      nj_tanf_gross_earned_income: {
        2024: null,
      },
      nj_tanf_maximum_allowable_income: {
        2024: null,
      },
      nj_tanf_maximum_benefit: {
        2024: null,
      },
      nj_tanf_resources_eligible: {
        2024: null,
      },
      ny_tanf: {
        2024: null,
      },
      ny_tanf_countable_earned_income: {
        2024: null,
      },
      ny_tanf_countable_gross_unearned_income: {
        2024: null,
      },
      ny_tanf_countable_resources: {
        2024: 0,
      },
      ny_tanf_eligible: {
        2024: null,
      },
      ny_tanf_grant_standard: {
        2024: null,
      },
      ny_tanf_gross_earned_income: {
        2024: null,
      },
      ny_tanf_income_eligible: {
        2024: null,
      },
      ny_tanf_need_standard: {
        2024: null,
      },
      ny_tanf_resources_eligible: {
        2024: null,
      },
      ok_tanf: {
        2024: 0,
      },
      pell_grant: {
        2024: 0,
      },
      pha_payment_standard: {
        2024: 0,
      },
      phone_cost: {
        2024: 0,
      },
      phone_expense: {
        2024: null,
      },
      poverty_gap: {
        2024: null,
      },
      poverty_line: {
        2024: null,
      },
      receives_housing_assistance: {
        2024: false,
      },
      reduced_price_school_meals: {
        2024: null,
      },
      school_meal_countable_income: {
        2024: null,
      },
      school_meal_daily_subsidy: {
        2024: null,
      },
      school_meal_fpg_ratio: {
        2024: null,
      },
      school_meal_net_subsidy: {
        2024: null,
      },
      school_meal_paid_daily_subsidy: {
        2024: null,
      },
      school_meal_tier: {
        2024: null,
      },
      sewage_expense: {
        2024: 0,
      },
      snap: {
        2024: null,
      },
      snap_assets: {
        2024: 0,
      },
      snap_child_support_deduction: {
        2024: null,
      },
      snap_deductions: {
        2024: null,
      },
      snap_dependent_care_deduction: {
        2024: null,
      },
      snap_earned_income: {
        2024: null,
      },
      snap_earned_income_deduction: {
        2024: null,
      },
      snap_emergency_allotment: {
        2024: null,
      },
      snap_excess_medical_expense_deduction: {
        2024: null,
      },
      snap_excess_shelter_expense_deduction: {
        2024: null,
      },
      snap_expected_contribution: {
        2024: null,
      },
      snap_gross_income: {
        2024: null,
      },
      snap_gross_income_fpg_ratio: {
        2024: null,
      },
      snap_max_allotment: {
        2024: null,
      },
      snap_min_allotment: {
        2024: null,
      },
      snap_net_income: {
        2024: null,
      },
      snap_net_income_fpg_ratio: {
        2024: null,
      },
      snap_net_income_pre_shelter: {
        2024: null,
      },
      snap_normal_allotment: {
        2024: null,
      },
      snap_reported: {
        2024: 0,
      },
      snap_standard_deduction: {
        2024: null,
      },
      snap_unearned_income: {
        2024: null,
      },
      snap_utility_allowance: {
        2024: null,
      },
      snap_utility_allowance_type: {
        2024: null,
      },
      spm_unit_assets: {
        2024: 0,
      },
      spm_unit_benefits: {
        2024: null,
      },
      spm_unit_capped_housing_subsidy: {
        2024: null,
      },
      spm_unit_capped_housing_subsidy_reported: {
        2024: 0,
      },
      spm_unit_capped_work_childcare_expenses: {
        2024: 0,
      },
      spm_unit_ccdf_subsidy: {
        2024: null,
      },
      spm_unit_count_adults: {
        2024: null,
      },
      spm_unit_count_children: {
        2024: null,
      },
      spm_unit_energy_subsidy: {
        2024: null,
      },
      spm_unit_energy_subsidy_reported: {
        2024: 0,
      },
      spm_unit_federal_tax: {
        2024: null,
      },
      spm_unit_federal_tax_reported: {
        2024: 0,
      },
      spm_unit_fpg: {
        2024: null,
      },
      spm_unit_id: {
        2024: 0,
      },
      spm_unit_income_decile: {
        2024: null,
      },
      spm_unit_is_in_deep_spm_poverty: {
        2024: null,
      },
      spm_unit_is_in_spm_poverty: {
        2024: null,
      },
      spm_unit_market_income: {
        2024: null,
      },
      spm_unit_medical_expenses: {
        2024: null,
      },
      spm_unit_net_income: {
        2024: null,
      },
      spm_unit_net_income_reported: {
        2024: 0,
      },
      spm_unit_oecd_equiv_net_income: {
        2024: null,
      },
      spm_unit_payroll_tax: {
        2024: null,
      },
      spm_unit_payroll_tax_reported: {
        2024: 0,
      },
      spm_unit_school_lunch_subsidy: {
        2024: 0,
      },
      spm_unit_self_employment_tax: {
        2024: null,
      },
      spm_unit_size: {
        2024: null,
      },
      spm_unit_snap: {
        2024: 0,
      },
      spm_unit_spm_threshold: {
        2024: 0,
      },
      spm_unit_state_fips: {
        2024: null,
      },
      spm_unit_state_tax: {
        2024: null,
      },
      spm_unit_state_tax_reported: {
        2024: 0,
      },
      spm_unit_taxes: {
        2024: null,
      },
      spm_unit_total_ccdf_copay: {
        2024: null,
      },
      spm_unit_total_income_reported: {
        2024: 0,
      },
      spm_unit_weight: {
        2024: null,
      },
      spm_unit_wic: {
        2024: null,
      },
      spm_unit_wic_reported: {
        2024: 0,
      },
      tanf: {
        2024: null,
      },
      tanf_amount_if_eligible: {
        2024: null,
      },
      tanf_countable_income: {
        2024: null,
      },
      tanf_gross_earned_income: {
        2024: null,
      },
      tanf_gross_unearned_income: {
        2024: null,
      },
      tanf_initial_employment_deduction: {
        2024: null,
      },
      tanf_max_amount: {
        2024: null,
      },
      trash_expense: {
        2024: 0,
      },
      tx_tanf_income_limit: {
        2024: null,
      },
      utility_expense: {
        2024: null,
      },
      wa_tanf_countable_resources: {
        2024: 0,
      },
      wa_tanf_resources_eligible: {
        2024: null,
      },
      water_expense: {
        2024: 0,
      },
      wic_fpg: {
        2024: null,
      },
    },
  },
  tax_units: {
    "your tax unit": {
      a_lineno: {
        2024: 0,
      },
      above_the_line_deductions: {
        2024: null,
      },
      additional_medicare_tax: {
        2024: null,
      },
      additional_standard_deduction: {
        2024: null,
      },
      adjusted_gross_income: {
        2024: null,
      },
      adjusted_net_capital_gain: {
        2024: null,
      },
      advanced_main_air_circulating_fan_expenditures: {
        2024: 0,
      },
      age_head: {
        2024: null,
      },
      age_spouse: {
        2024: null,
      },
      aged_blind_count: {
        2024: null,
      },
      aged_blind_extra_standard_deduction: {
        2024: null,
      },
      aged_head: {
        2024: null,
      },
      aged_spouse: {
        2024: null,
      },
      air_sealing_ventilation_expenditures: {
        2024: 0,
      },
      al_agi: {
        2024: 0,
      },
      al_dependent_exemption: {
        2024: null,
      },
      al_income_tax_before_credits: {
        2024: null,
      },
      al_personal_exemption: {
        2024: null,
      },
      al_standard_deduction: {
        2024: null,
      },
      al_taxable_income: {
        2024: 0,
      },
      alternative_minimum_tax: {
        2024: null,
      },
      american_opportunity_credit: {
        2024: null,
      },
      amt_form_completed: {
        2024: false,
      },
      amt_income: {
        2024: null,
      },
      amt_non_agi_income: {
        2024: 0,
      },
      az_standard_deduction: {
        2024: null,
      },
      basic_income: {
        2024: null,
      },
      basic_income_before_phase_out: {
        2024: null,
      },
      basic_income_eligible: {
        2024: null,
      },
      basic_income_phase_out: {
        2024: null,
      },
      basic_standard_deduction: {
        2024: null,
      },
      benefit_value_total: {
        2024: 0,
      },
      biomass_stove_boiler_expenditures: {
        2024: 0,
      },
      blind_head: {
        2024: null,
      },
      blind_spouse: {
        2024: null,
      },
      c01000: {
        2024: null,
      },
      c04600: {
        2024: null,
      },
      c05700: {
        2024: 0,
      },
      c07100: {
        2024: null,
      },
      c07200: {
        2024: null,
      },
      c07230: {
        2024: null,
      },
      c07240: {
        2024: 0,
      },
      c07260: {
        2024: 0,
      },
      c07300: {
        2024: 0,
      },
      c07400: {
        2024: 0,
      },
      c07600: {
        2024: 0,
      },
      c08000: {
        2024: 0,
      },
      c09600: {
        2024: null,
      },
      c10960: {
        2024: null,
      },
      c11070: {
        2024: null,
      },
      c23650: {
        2024: null,
      },
      c59660: {
        2024: null,
      },
      c62100: {
        2024: null,
      },
      c87668: {
        2024: null,
      },
      ca_agi: {
        2024: null,
      },
      ca_agi_additions: {
        2024: 0,
      },
      ca_agi_subtractions: {
        2024: null,
      },
      ca_cdcc: {
        2024: null,
      },
      ca_eitc: {
        2024: null,
      },
      ca_eitc_eligible: {
        2024: null,
      },
      ca_exemptions: {
        2024: null,
      },
      ca_income_tax: {
        2024: null,
      },
      ca_income_tax_before_credits: {
        2024: null,
      },
      ca_income_tax_before_refundable_credits: {
        2024: null,
      },
      ca_itemized_deductions: {
        2024: null,
      },
      ca_mental_health_services_tax: {
        2024: null,
      },
      ca_nonrefundable_credits: {
        2024: null,
      },
      ca_refundable_credits: {
        2024: null,
      },
      ca_renter_credit: {
        2024: null,
      },
      ca_standard_deduction: {
        2024: null,
      },
      ca_taxable_income: {
        2024: null,
      },
      ca_use_tax: {
        2024: null,
      },
      ca_yctc: {
        2024: null,
      },
      capital_gains_28_percent_rate_gain: {
        2024: null,
      },
      capital_gains_excluded_from_taxable_income: {
        2024: null,
      },
      capital_gains_tax: {
        2024: null,
      },
      capped_advanced_main_air_circulating_fan_credit: {
        2024: null,
      },
      capped_electric_heat_pump_clothes_dryer_rebate: {
        2024: null,
      },
      capped_electric_load_service_center_upgrade_rebate: {
        2024: null,
      },
      capped_electric_stove_cooktop_range_or_oven_rebate: {
        2024: null,
      },
      capped_electric_wiring_rebate: {
        2024: null,
      },
      capped_energy_efficient_central_air_conditioner_credit: {
        2024: null,
      },
      capped_energy_efficient_door_credit: {
        2024: null,
      },
      capped_energy_efficient_insulation_credit: {
        2024: null,
      },
      capped_energy_efficient_roof_credit: {
        2024: null,
      },
      capped_energy_efficient_window_credit: {
        2024: null,
      },
      capped_heat_pump_heat_pump_water_heater_biomass_stove_boiler_credit: {
        2024: null,
      },
      capped_heat_pump_rebate: {
        2024: null,
      },
      capped_heat_pump_water_heater_rebate: {
        2024: null,
      },
      capped_home_energy_audit_credit: {
        2024: null,
      },
      capped_insulation_air_sealing_ventilation_rebate: {
        2024: null,
      },
      capped_qualified_furnace_or_hot_water_boiler_credit: {
        2024: null,
      },
      care_deduction: {
        2024: 0,
      },
      casualty_loss_deduction: {
        2024: null,
      },
      cdcc: {
        2024: null,
      },
      cdcc_rate: {
        2024: null,
      },
      cdcc_relevant_expenses: {
        2024: null,
      },
      charitable_deduction: {
        2024: null,
      },
      charity_credit: {
        2024: 0,
      },
      co_eitc: {
        2024: null,
      },
      combined: {
        2024: null,
      },
      count_cdcc_eligible: {
        2024: null,
      },
      ctc: {
        2024: null,
      },
      ctc_arpa_addition: {
        2024: null,
      },
      ctc_arpa_max_addition: {
        2024: null,
      },
      ctc_arpa_phase_out: {
        2024: null,
      },
      ctc_arpa_phase_out_cap: {
        2024: null,
      },
      ctc_arpa_phase_out_threshold: {
        2024: null,
      },
      ctc_arpa_uncapped_phase_out: {
        2024: null,
      },
      ctc_limiting_tax_liability: {
        2024: null,
      },
      ctc_maximum: {
        2024: null,
      },
      ctc_maximum_with_arpa_addition: {
        2024: null,
      },
      ctc_new: {
        2024: 0,
      },
      ctc_phase_out: {
        2024: null,
      },
      ctc_phase_out_threshold: {
        2024: null,
      },
      ctc_qualifying_children: {
        2024: null,
      },
      ctc_refundable_maximum: {
        2024: null,
      },
      ctc_value: {
        2024: null,
      },
      data_source: {
        2024: false,
      },
      dc_eitc: {
        2024: null,
      },
      dc_eitc_with_qualifying_child: {
        2024: null,
      },
      dc_eitc_without_qualifying_child: {
        2024: null,
      },
      dc_standard_deduction: {
        2024: null,
      },
      disabled_head: {
        2024: null,
      },
      disabled_spouse: {
        2024: null,
      },
      domestic_production_ald: {
        2024: 0,
      },
      dsi: {
        2024: null,
      },
      dsi_spouse: {
        2024: null,
      },
      dwks10: {
        2024: null,
      },
      dwks13: {
        2024: null,
      },
      dwks14: {
        2024: null,
      },
      dwks19: {
        2024: null,
      },
      dwks6: {
        2024: null,
      },
      dwks9: {
        2024: null,
      },
      e07240: {
        2024: 0,
      },
      e07400: {
        2024: 0,
      },
      e07600: {
        2024: 0,
      },
      earned_income_tax_credit: {
        2024: null,
      },
      ecpa_adult_dependent_credit: {
        2024: null,
      },
      ecpa_filer_credit: {
        2024: null,
      },
      education_credit_phase_out: {
        2024: null,
      },
      education_tax_credits: {
        2024: null,
      },
      eitc: {
        2024: null,
      },
      eitc_agi_limit: {
        2024: null,
      },
      eitc_child_count: {
        2024: null,
      },
      eitc_eligible: {
        2024: null,
      },
      eitc_maximum: {
        2024: null,
      },
      eitc_phase_in_rate: {
        2024: null,
      },
      eitc_phase_out_rate: {
        2024: null,
      },
      eitc_phase_out_start: {
        2024: null,
      },
      eitc_phased_in: {
        2024: null,
      },
      eitc_reduction: {
        2024: null,
      },
      eitc_relevant_investment_income: {
        2024: null,
      },
      elderly_dependents: {
        2024: 0,
      },
      elderly_disabled_credit: {
        2024: null,
      },
      electric_heat_pump_clothes_dryer_expenditures: {
        2024: 0,
      },
      electric_load_service_center_upgrade_expenditures: {
        2024: 0,
      },
      electric_stove_cooktop_range_or_oven_expenditures: {
        2024: 0,
      },
      electric_wiring_expenditures: {
        2024: 0,
      },
      employee_payroll_tax: {
        2024: null,
      },
      energy_efficient_central_air_conditioner_expenditures: {
        2024: 0,
      },
      energy_efficient_door_expenditures: {
        2024: 0,
      },
      energy_efficient_home_improvement_credit: {
        2024: null,
      },
      energy_efficient_insulation_expenditures: {
        2024: 0,
      },
      energy_efficient_roof_expenditures: {
        2024: 0,
      },
      energy_efficient_window_expenditures: {
        2024: 0,
      },
      excess_payroll_tax_withheld: {
        2024: 0,
      },
      exemption_phase_out_start: {
        2024: null,
      },
      exemptions: {
        2024: null,
      },
      f2441: {
        2024: null,
      },
      f6251: {
        2024: false,
      },
      federal_eitc_without_age_minimum: {
        2024: null,
      },
      federal_state_income_tax: {
        2024: null,
      },
      ffpos: {
        2024: 0,
      },
      filer_cmbtp: {
        2024: null,
      },
      filer_e00200: {
        2024: null,
      },
      filer_e00300: {
        2024: null,
      },
      filer_e02300: {
        2024: null,
      },
      filer_e18400: {
        2024: null,
      },
      filer_earned: {
        2024: null,
      },
      filer_k1bx14: {
        2024: null,
      },
      filer_pencon: {
        2024: null,
      },
      filer_sey: {
        2024: null,
      },
      filing_status: {
        2024: null,
      },
      flat_tax: {
        2024: null,
      },
      foreign_earned_income_exclusion: {
        2024: 0,
      },
      foreign_tax_credit: {
        2024: 0,
      },
      fstax: {
        2024: 0,
      },
      fuel_cell_property_capacity: {
        2024: 0,
      },
      fuel_cell_property_expenditures: {
        2024: 0,
      },
      geothermal_heat_pump_property_expenditures: {
        2024: 0,
      },
      h_seq: {
        2024: 0,
      },
      hasqdivltcg: {
        2024: null,
      },
      head_earned: {
        2024: null,
      },
      head_is_disabled: {
        2024: null,
      },
      head_spouse_count: {
        2024: null,
      },
      health_savings_account_ald: {
        2024: 0,
      },
      heat_pump_expenditures: {
        2024: 0,
      },
      heat_pump_water_heater_expenditures: {
        2024: 0,
      },
      hi_agi: {
        2024: 0,
      },
      hi_income_tax_before_credits: {
        2024: null,
      },
      hi_standard_deduction: {
        2024: null,
      },
      hi_taxable_income: {
        2024: 0,
      },
      high_efficiency_electric_home_rebate: {
        2024: null,
      },
      high_efficiency_electric_home_rebate_percent_covered: {
        2024: null,
      },
      home_energy_audit_expenditures: {
        2024: 0,
      },
      iitax: {
        2024: null,
      },
      il_aged_blind_exemption: {
        2024: null,
      },
      il_base_income: {
        2024: null,
      },
      il_base_income_additions: {
        2024: null,
      },
      il_base_income_subtractions: {
        2024: null,
      },
      il_dependent_exemption: {
        2024: null,
      },
      il_eitc: {
        2024: null,
      },
      il_income_tax: {
        2024: null,
      },
      il_income_tax_before_nonrefundable_credits: {
        2024: null,
      },
      il_income_tax_before_refundable_credits: {
        2024: null,
      },
      il_is_exemption_eligible: {
        2024: null,
      },
      il_k12_education_expense_credit: {
        2024: null,
      },
      il_nonrefundable_credits: {
        2024: null,
      },
      il_pass_through_entity_tax_credit: {
        2024: 0,
      },
      il_pass_through_withholding: {
        2024: 0,
      },
      il_personal_exemption: {
        2024: null,
      },
      il_personal_exemption_eligibility_status: {
        2024: null,
      },
      il_property_tax_credit: {
        2024: null,
      },
      il_refundable_credits: {
        2024: null,
      },
      il_schedule_m_additions: {
        2024: 0,
      },
      il_schedule_m_subtractions: {
        2024: 0,
      },
      il_taxable_income: {
        2024: null,
      },
      il_total_exemptions: {
        2024: null,
      },
      il_total_tax: {
        2024: null,
      },
      il_use_tax: {
        2024: null,
      },
      in_add_backs: {
        2024: null,
      },
      in_additional_exemptions: {
        2024: null,
      },
      in_aged_blind_exemptions: {
        2024: null,
      },
      in_aged_low_agi_exemptions: {
        2024: null,
      },
      in_agi: {
        2024: null,
      },
      in_agi_tax: {
        2024: null,
      },
      in_base_exemptions: {
        2024: null,
      },
      in_bonus_depreciation_add_back: {
        2024: 0,
      },
      in_deductions: {
        2024: null,
      },
      in_exemptions: {
        2024: null,
      },
      in_homeowners_property_tax: {
        2024: 0,
      },
      in_homeowners_property_tax_deduction: {
        2024: null,
      },
      in_military_service_deduction: {
        2024: null,
      },
      in_nol: {
        2024: 0,
      },
      in_nol_add_back: {
        2024: 0,
      },
      in_nonpublic_school_deduction: {
        2024: null,
      },
      in_oos_municipal_obligation_interest_add_back: {
        2024: 0,
      },
      in_other_add_backs: {
        2024: 0,
      },
      in_other_deductions: {
        2024: 0,
      },
      in_other_taxes: {
        2024: 0,
      },
      in_qualifying_child_count: {
        2024: null,
      },
      in_renters_deduction: {
        2024: null,
      },
      in_section_179_expense_add_back: {
        2024: 0,
      },
      in_tax_add_back: {
        2024: 0,
      },
      in_unemployment_compensation_deduction: {
        2024: null,
      },
      income_tax: {
        2024: null,
      },
      income_tax_before_credits: {
        2024: null,
      },
      income_tax_before_refundable_credits: {
        2024: null,
      },
      income_tax_capped_non_refundable_credits: {
        2024: null,
      },
      income_tax_main_rates: {
        2024: null,
      },
      income_tax_non_refundable_credits: {
        2024: null,
      },
      income_tax_refundable_credits: {
        2024: null,
      },
      income_tax_unavailable_non_refundable_credits: {
        2024: null,
      },
      interest_deduction: {
        2024: null,
      },
      investment_in_529_plan: {
        2024: 0,
      },
      investment_income_form_4952: {
        2024: 0,
      },
      is_eligible_md_poverty_line_credit: {
        2024: null,
      },
      is_ma_income_tax_exempt: {
        2024: null,
      },
      is_ptc_eligible: {
        2024: null,
      },
      itemized_taxable_income_deductions: {
        2024: null,
      },
      k12_tuition_and_fees: {
        2024: 0,
      },
      ks_agi: {
        2024: null,
      },
      ks_agi_additions: {
        2024: 0,
      },
      ks_agi_subtractions: {
        2024: null,
      },
      ks_cdcc: {
        2024: null,
      },
      ks_count_exemptions: {
        2024: null,
      },
      ks_exemptions: {
        2024: null,
      },
      ks_fstc: {
        2024: null,
      },
      ks_income_tax: {
        2024: null,
      },
      ks_income_tax_before_credits: {
        2024: null,
      },
      ks_income_tax_before_refundable_credits: {
        2024: null,
      },
      ks_itemized_deductions: {
        2024: null,
      },
      ks_nonrefundable_credits: {
        2024: null,
      },
      ks_nonrefundable_eitc: {
        2024: null,
      },
      ks_refundable_credits: {
        2024: null,
      },
      ks_refundable_eitc: {
        2024: null,
      },
      ks_standard_deduction: {
        2024: null,
      },
      ks_taxable_income: {
        2024: null,
      },
      ks_total_eitc: {
        2024: null,
      },
      lifetime_learning_credit: {
        2024: null,
      },
      local_income_tax: {
        2024: null,
      },
      local_sales_tax: {
        2024: 0,
      },
      loss_ald: {
        2024: null,
      },
      ma_agi: {
        2024: null,
      },
      ma_dependent_care_credit: {
        2024: null,
      },
      ma_dependent_credit: {
        2024: null,
      },
      ma_dependent_or_dependent_care_credit: {
        2024: null,
      },
      ma_eitc: {
        2024: null,
      },
      ma_gross_income: {
        2024: null,
      },
      ma_income_tax: {
        2024: null,
      },
      ma_income_tax_before_credits: {
        2024: null,
      },
      ma_income_tax_before_refundable_credits: {
        2024: null,
      },
      ma_income_tax_exemption_threshold: {
        2024: null,
      },
      ma_limited_income_tax_credit: {
        2024: null,
      },
      ma_non_refundable_credits: {
        2024: null,
      },
      ma_part_a_agi: {
        2024: null,
      },
      ma_part_a_cg_excess_exemption: {
        2024: null,
      },
      ma_part_a_div_excess_exemption: {
        2024: null,
      },
      ma_part_a_gross_income: {
        2024: null,
      },
      ma_part_a_taxable_capital_gains_income: {
        2024: null,
      },
      ma_part_a_taxable_dividend_income: {
        2024: null,
      },
      ma_part_a_taxable_income: {
        2024: null,
      },
      ma_part_b_agi: {
        2024: null,
      },
      ma_part_b_excess_exemption: {
        2024: null,
      },
      ma_part_b_gross_income: {
        2024: null,
      },
      ma_part_b_taxable_income: {
        2024: null,
      },
      ma_part_b_taxable_income_before_exemption: {
        2024: null,
      },
      ma_part_b_taxable_income_deductions: {
        2024: null,
      },
      ma_part_b_taxable_income_exemption: {
        2024: null,
      },
      ma_part_c_agi: {
        2024: null,
      },
      ma_part_c_gross_income: {
        2024: null,
      },
      ma_part_c_taxable_income: {
        2024: null,
      },
      ma_refundable_credits: {
        2024: null,
      },
      ma_scb_total_income: {
        2024: null,
      },
      ma_senior_circuit_breaker: {
        2024: null,
      },
      mars: {
        2024: null,
      },
      maximum_capital_loss: {
        2024: null,
      },
      md_aged_blind_exemptions: {
        2024: null,
      },
      md_aged_dependent_exemption: {
        2024: null,
      },
      md_aged_exemption: {
        2024: null,
      },
      md_agi: {
        2024: null,
      },
      md_blind_exemption: {
        2024: null,
      },
      md_cdcc: {
        2024: null,
      },
      md_ctc: {
        2024: null,
      },
      md_deductions: {
        2024: null,
      },
      md_dependent_care_subtraction: {
        2024: null,
      },
      md_eitc: {
        2024: null,
      },
      md_exemptions: {
        2024: null,
      },
      md_income_tax: {
        2024: null,
      },
      md_income_tax_before_credits: {
        2024: null,
      },
      md_income_tax_before_refundable_credits: {
        2024: null,
      },
      md_local_income_tax_before_credits: {
        2024: null,
      },
      md_non_refundable_credits: {
        2024: null,
      },
      md_non_refundable_eitc: {
        2024: null,
      },
      md_non_single_childless_non_refundable_eitc: {
        2024: null,
      },
      md_non_single_childless_refundable_eitc: {
        2024: null,
      },
      md_pension_subtraction: {
        2024: null,
      },
      md_personal_exemption: {
        2024: null,
      },
      md_poverty_line_credit: {
        2024: null,
      },
      md_qualifies_for_single_childless_eitc: {
        2024: null,
      },
      md_refundable_cdcc: {
        2024: null,
      },
      md_refundable_credits: {
        2024: null,
      },
      md_refundable_eitc: {
        2024: null,
      },
      md_single_childless_eitc: {
        2024: null,
      },
      md_socsec_subtraction: {
        2024: null,
      },
      md_standard_deduction: {
        2024: null,
      },
      md_tax_unit_earned_income: {
        2024: null,
      },
      md_taxable_income: {
        2024: null,
      },
      md_total_additions: {
        2024: 0,
      },
      md_total_personal_exemptions: {
        2024: null,
      },
      md_total_subtractions: {
        2024: null,
      },
      md_two_income_subtraction: {
        2024: null,
      },
      me_agi: {
        2024: null,
      },
      me_agi_additions: {
        2024: 0,
      },
      me_agi_subtractions: {
        2024: null,
      },
      me_child_care_credit: {
        2024: null,
      },
      me_deduction: {
        2024: null,
      },
      me_deductions: {
        2024: 0,
      },
      me_dependent_exemption: {
        2024: null,
      },
      me_eitc: {
        2024: null,
      },
      me_exemptions: {
        2024: null,
      },
      me_income_tax_before_credits: {
        2024: null,
      },
      me_itemized_deductions: {
        2024: 0,
      },
      me_non_refundable_child_care_credit: {
        2024: null,
      },
      me_pension_income_deduction: {
        2024: null,
      },
      me_personal_exemption_deduction: {
        2024: null,
      },
      me_refundable_child_care_credit: {
        2024: null,
      },
      me_standard_deduction: {
        2024: null,
      },
      me_step_4_share_of_child_care_expenses: {
        2024: 0,
      },
      me_taxable_income: {
        2024: null,
      },
      medicaid_income: {
        2024: null,
      },
      medical_expense_deduction: {
        2024: null,
      },
      members: ["you"],
      military_disabled_head: {
        2024: null,
      },
      military_disabled_spouse: {
        2024: null,
      },
      min_head_spouse_earned: {
        2024: null,
      },
      misc_deduction: {
        2024: 0,
      },
      mn_additions: {
        2024: null,
      },
      mn_amt: {
        2024: null,
      },
      mn_amt_taxable_income: {
        2024: null,
      },
      mn_basic_tax: {
        2024: null,
      },
      mn_cdcc: {
        2024: null,
      },
      mn_charity_subtraction: {
        2024: null,
      },
      mn_deductions: {
        2024: null,
      },
      mn_elderly_disabled_subtraction: {
        2024: null,
      },
      mn_exemptions: {
        2024: null,
      },
      mn_income_tax: {
        2024: null,
      },
      mn_income_tax_before_credits: {
        2024: null,
      },
      mn_income_tax_before_refundable_credits: {
        2024: null,
      },
      mn_itemized_deductions: {
        2024: null,
      },
      mn_itemizing: {
        2024: null,
      },
      mn_marriage_credit: {
        2024: null,
      },
      mn_nonrefundable_credits: {
        2024: null,
      },
      mn_refundable_credits: {
        2024: null,
      },
      mn_social_security_subtraction: {
        2024: null,
      },
      mn_standard_deduction: {
        2024: null,
      },
      mn_subtractions: {
        2024: null,
      },
      mn_taxable_income: {
        2024: null,
      },
      mn_wfc: {
        2024: null,
      },
      mn_wfc_eligible: {
        2024: null,
      },
      mo_federal_income_tax_deduction: {
        2024: null,
      },
      mo_income_tax: {
        2024: null,
      },
      mo_income_tax_before_refundable_credits: {
        2024: null,
      },
      mo_itemized_deductions: {
        2024: null,
      },
      mo_net_state_income_taxes: {
        2024: null,
      },
      mo_non_refundable_credits: {
        2024: null,
      },
      mo_pension_and_ss_or_ssd_deduction: {
        2024: null,
      },
      mo_property_tax_credit: {
        2024: null,
      },
      mo_ptc_gross_income: {
        2024: null,
      },
      mo_ptc_income_offset: {
        2024: null,
      },
      mo_ptc_net_income: {
        2024: null,
      },
      mo_ptc_taxunit_eligible: {
        2024: null,
      },
      mo_refundable_credits: {
        2024: null,
      },
      mo_wftc: {
        2024: null,
      },
      ms_dependents_exemption: {
        2024: null,
      },
      ms_regular_exemption: {
        2024: null,
      },
      n1820: {
        2024: 0,
      },
      n21: {
        2024: 0,
      },
      n24: {
        2024: 0,
      },
      nd_additions: {
        2024: null,
      },
      nd_income_tax: {
        2024: null,
      },
      nd_income_tax_before_credits: {
        2024: null,
      },
      nd_income_tax_before_refundable_credits: {
        2024: null,
      },
      nd_ltcg_subtraction: {
        2024: null,
      },
      nd_mpc: {
        2024: null,
      },
      nd_nonrefundable_credits: {
        2024: null,
      },
      nd_qdiv_subtraction: {
        2024: null,
      },
      nd_refundable_credits: {
        2024: 0,
      },
      nd_rtrc: {
        2024: null,
      },
      nd_subtractions: {
        2024: null,
      },
      nd_taxable_income: {
        2024: null,
      },
      ne_agi: {
        2024: null,
      },
      ne_agi_additions: {
        2024: 0,
      },
      ne_agi_subtractions: {
        2024: null,
      },
      ne_cdcc_nonrefundable: {
        2024: null,
      },
      ne_cdcc_refundable: {
        2024: null,
      },
      ne_eitc: {
        2024: null,
      },
      ne_elderly_disabled_credit: {
        2024: null,
      },
      ne_exemptions: {
        2024: null,
      },
      ne_income_tax: {
        2024: null,
      },
      ne_income_tax_before_credits: {
        2024: null,
      },
      ne_income_tax_before_refundable_credits: {
        2024: null,
      },
      ne_itemized_deductions: {
        2024: null,
      },
      ne_nonrefundable_credits: {
        2024: null,
      },
      ne_refundable_credits: {
        2024: null,
      },
      ne_standard_deduction: {
        2024: null,
      },
      ne_taxable_income: {
        2024: null,
      },
      net_capital_gain: {
        2024: null,
      },
      net_investment_income: {
        2024: null,
      },
      net_investment_income_tax: {
        2024: null,
      },
      net_long_term_capital_gain: {
        2024: null,
      },
      net_long_term_capital_loss: {
        2024: null,
      },
      net_short_term_capital_gain: {
        2024: null,
      },
      net_short_term_capital_loss: {
        2024: null,
      },
      new_clean_vehicle_battery_capacity: {
        2024: 0,
      },
      new_clean_vehicle_battery_components_made_in_north_america: {
        2024: 0,
      },
      new_clean_vehicle_battery_critical_minerals_extracted_in_trading_partner_country:
        {
          2024: 0,
        },
      new_clean_vehicle_classification: {
        2024: "OTHER",
      },
      new_clean_vehicle_credit: {
        2024: null,
      },
      new_clean_vehicle_credit_eligible: {
        2024: null,
      },
      new_clean_vehicle_msrp: {
        2024: 0,
      },
      nj_agi: {
        2024: null,
      },
      nj_agi_additions: {
        2024: 0,
      },
      nj_agi_subtractions: {
        2024: 0,
      },
      nj_blind_or_disabled_exemption: {
        2024: null,
      },
      nj_cdcc: {
        2024: null,
      },
      nj_child_tax_credit: {
        2024: null,
      },
      nj_childless_eitc_age_eligible: {
        2024: null,
      },
      nj_dependents_attending_college_exemption: {
        2024: null,
      },
      nj_dependents_exemption: {
        2024: null,
      },
      nj_eitc: {
        2024: null,
      },
      nj_eitc_income_eligible: {
        2024: null,
      },
      nj_income_tax: {
        2024: null,
      },
      nj_income_tax_before_refundable_credits: {
        2024: 0,
      },
      nj_main_income_tax: {
        2024: null,
      },
      nj_refundable_credits: {
        2024: 0,
      },
      nj_regular_exemption: {
        2024: null,
      },
      nj_senior_exemption: {
        2024: null,
      },
      nj_taxable_income: {
        2024: null,
      },
      nj_total_deductions: {
        2024: 0,
      },
      nj_total_exemptions: {
        2024: null,
      },
      no_salt_income_tax: {
        2024: null,
      },
      non_refundable_american_opportunity_credit: {
        2024: null,
      },
      non_refundable_ctc: {
        2024: null,
      },
      nu06: {
        2024: 0,
      },
      nu13: {
        2024: 0,
      },
      nu18: {
        2024: 0,
      },
      num: {
        2024: null,
      },
      ny_agi: {
        2024: null,
      },
      ny_agi_additions: {
        2024: 0,
      },
      ny_agi_subtractions: {
        2024: null,
      },
      ny_cdcc: {
        2024: null,
      },
      ny_cdcc_max: {
        2024: null,
      },
      ny_cdcc_rate: {
        2024: null,
      },
      ny_college_tuition_credit: {
        2024: null,
      },
      ny_ctc: {
        2024: null,
      },
      ny_deductions: {
        2024: null,
      },
      ny_eitc: {
        2024: null,
      },
      ny_exemptions: {
        2024: null,
      },
      ny_household_credit: {
        2024: null,
      },
      ny_income_tax: {
        2024: null,
      },
      ny_income_tax_before_credits: {
        2024: null,
      },
      ny_income_tax_before_refundable_credits: {
        2024: null,
      },
      ny_itemized_deductions: {
        2024: null,
      },
      ny_itemized_deductions_max: {
        2024: null,
      },
      ny_itemized_deductions_reduction: {
        2024: 0,
      },
      ny_itemizes: {
        2024: null,
      },
      ny_main_income_tax: {
        2024: null,
      },
      ny_non_refundable_credits: {
        2024: null,
      },
      ny_real_property_tax_credit: {
        2024: null,
      },
      ny_refundable_credits: {
        2024: null,
      },
      ny_standard_deduction: {
        2024: null,
      },
      ny_supplemental_eitc: {
        2024: null,
      },
      ny_supplemental_tax: {
        2024: null,
      },
      ny_taxable_income: {
        2024: null,
      },
      nyc_cdcc: {
        2024: null,
      },
      nyc_cdcc_age_restricted_expenses: {
        2024: null,
      },
      nyc_cdcc_applicable_percentage: {
        2024: null,
      },
      nyc_cdcc_eligible: {
        2024: null,
      },
      nyc_cdcc_share_qualifying_childcare_expenses: {
        2024: null,
      },
      nyc_eitc: {
        2024: null,
      },
      nyc_household_credit: {
        2024: null,
      },
      nyc_income_tax: {
        2024: null,
      },
      nyc_income_tax_before_credits: {
        2024: null,
      },
      nyc_income_tax_before_refundable_credits: {
        2024: null,
      },
      nyc_non_refundable_credits: {
        2024: null,
      },
      nyc_refundable_credits: {
        2024: null,
      },
      nyc_school_credit_income: {
        2024: null,
      },
      nyc_school_tax_credit_fixed_amount: {
        2024: null,
      },
      nyc_school_tax_credit_rate_reduction_amount: {
        2024: null,
      },
      nyc_taxable_income: {
        2024: null,
      },
      nyc_unincorporated_business_credit: {
        2024: 0,
      },
      oh_agi: {
        2024: null,
      },
      oh_bonus_depreciation_add_back: {
        2024: 0,
      },
      oh_federal_conformity_deductions: {
        2024: 0,
      },
      oh_income_tax_before_credits: {
        2024: null,
      },
      oh_income_tax_exempt: {
        2024: null,
      },
      oh_other_add_backs: {
        2024: 0,
      },
      oh_section_179_expense_add_back: {
        2024: 0,
      },
      oh_taxable_income: {
        2024: 0,
      },
      oh_uniformed_services_retirement_income_deduction: {
        2024: 0,
      },
      ok_adjustments: {
        2024: 0,
      },
      ok_agi: {
        2024: null,
      },
      ok_agi_additions: {
        2024: 0,
      },
      ok_agi_subtractions: {
        2024: null,
      },
      ok_child_care_child_tax_credit: {
        2024: null,
      },
      ok_count_exemptions: {
        2024: null,
      },
      ok_eitc: {
        2024: null,
      },
      ok_exemptions: {
        2024: null,
      },
      ok_gross_income: {
        2024: null,
      },
      ok_income_tax: {
        2024: null,
      },
      ok_income_tax_before_credits: {
        2024: null,
      },
      ok_income_tax_before_refundable_credits: {
        2024: null,
      },
      ok_itemized_deductions: {
        2024: null,
      },
      ok_nonrefundable_credits: {
        2024: null,
      },
      ok_ptc: {
        2024: null,
      },
      ok_refundable_credits: {
        2024: null,
      },
      ok_standard_deduction: {
        2024: null,
      },
      ok_stc: {
        2024: null,
      },
      ok_taxable_income: {
        2024: null,
      },
      ok_use_tax: {
        2024: null,
      },
      or_deductions: {
        2024: null,
      },
      or_disabled_child_dependent_exemptions: {
        2024: null,
      },
      or_eitc: {
        2024: null,
      },
      or_exemption_credit: {
        2024: null,
      },
      or_federal_tax_liability_subtraction: {
        2024: null,
      },
      or_income_additions: {
        2024: 0,
      },
      or_income_after_additions: {
        2024: null,
      },
      or_income_after_subtractions: {
        2024: null,
      },
      or_income_subtractions: {
        2024: null,
      },
      or_income_tax: {
        2024: null,
      },
      or_income_tax_before_credits: {
        2024: null,
      },
      or_income_tax_before_refundable_credits: {
        2024: null,
      },
      or_itemized_deductions: {
        2024: null,
      },
      or_kicker: {
        2024: null,
      },
      or_non_refundable_credits: {
        2024: null,
      },
      or_refundable_credits: {
        2024: null,
      },
      or_regular_exemptions: {
        2024: null,
      },
      or_severely_disabled_exemptions: {
        2024: null,
      },
      or_standard_deduction: {
        2024: null,
      },
      or_tax_before_credits_in_prior_year: {
        2024: 0,
      },
      or_taxable_income: {
        2024: null,
      },
      other_net_gain: {
        2024: 0,
      },
      othertaxes: {
        2024: 0,
      },
      pa_adjusted_taxable_income: {
        2024: null,
      },
      pa_eligibility_income: {
        2024: null,
      },
      pa_income_tax: {
        2024: null,
      },
      pa_income_tax_after_forgiveness: {
        2024: null,
      },
      pa_income_tax_before_forgiveness: {
        2024: null,
      },
      pa_tax_deductions: {
        2024: 0,
      },
      pa_tax_forgiveness_amount: {
        2024: null,
      },
      pa_tax_forgiveness_rate: {
        2024: null,
      },
      pa_total_taxable_income: {
        2024: null,
      },
      pa_use_tax: {
        2024: null,
      },
      positive_agi: {
        2024: null,
      },
      pre_c04600: {
        2024: null,
      },
      premium_tax_credit: {
        2024: null,
      },
      prior_energy_efficient_home_improvement_credits: {
        2024: 0,
      },
      prior_energy_efficient_window_credits: {
        2024: 0,
      },
      property_tax_primary_residence: {
        2024: null,
      },
      ptc_phase_out_rate: {
        2024: null,
      },
      puerto_rico_income: {
        2024: 0,
      },
      purchased_qualifying_new_clean_vehicle: {
        2024: false,
      },
      purchased_qualifying_used_clean_vehicle: {
        2024: false,
      },
      qualified_battery_storage_technology_expenditures: {
        2024: 0,
      },
      qualified_business_income_deduction: {
        2024: null,
      },
      qualified_furnace_or_hot_water_boiler_expenditures: {
        2024: 0,
      },
      qualified_retirement_penalty: {
        2024: 0,
      },
      recapture_of_investment_credit: {
        2024: 0,
      },
      recovery_rebate_credit: {
        2024: null,
      },
      refundable_american_opportunity_credit: {
        2024: null,
      },
      refundable_ctc: {
        2024: null,
      },
      refundable_payroll_tax_credit: {
        2024: 0,
      },
      regular_tax_before_credits: {
        2024: null,
      },
      rents: {
        2024: null,
      },
      reported_slspc: {
        2024: 0,
      },
      residential_clean_energy_credit: {
        2024: null,
      },
      residential_efficiency_electrification_rebate: {
        2024: null,
      },
      residential_efficiency_electrification_retrofit_energy_savings: {
        2024: 0,
      },
      residential_efficiency_electrification_retrofit_expenditures: {
        2024: 0,
      },
      retirement_savings_credit: {
        2024: null,
      },
      rptc: {
        2024: null,
      },
      rrc_arpa: {
        2024: null,
      },
      rrc_caa: {
        2024: null,
      },
      rrc_cares: {
        2024: null,
      },
      salt_deduction: {
        2024: null,
      },
      salt_refund_last_year: {
        2024: 0,
      },
      sc_income_tax_before_credits: {
        2024: null,
      },
      sc_taxable_income: {
        2024: 0,
      },
      sc_young_child_exemption: {
        2024: null,
      },
      second_lowest_silver_plan_cost: {
        2024: null,
      },
      section_22_income: {
        2024: null,
      },
      self_employed_health_insurance_ald: {
        2024: null,
      },
      self_employed_pension_contribution_ald: {
        2024: null,
      },
      self_employment_tax_ald: {
        2024: null,
      },
      sep: {
        2024: 1,
      },
      separate_filer_itemizes: {
        2024: false,
      },
      small_wind_energy_property_expenditures: {
        2024: 0,
      },
      solar_electric_property_expenditures: {
        2024: 0,
      },
      solar_water_heating_property_expenditures: {
        2024: 0,
      },
      specified_possession_income: {
        2024: 0,
      },
      spouse_earned: {
        2024: null,
      },
      spouse_is_disabled: {
        2024: null,
      },
      spouse_separate_adjusted_gross_income: {
        2024: null,
      },
      spouse_separate_tax_unit_size: {
        2024: null,
      },
      standard: {
        2024: null,
      },
      standard_deduction: {
        2024: null,
      },
      state_and_local_sales_or_income_tax: {
        2024: null,
      },
      state_income_tax: {
        2024: null,
      },
      state_income_tax_before_refundable_credits: {
        2024: null,
      },
      state_sales_tax: {
        2024: 0,
      },
      surtax: {
        2024: 0,
      },
      tax: {
        2024: null,
      },
      tax_exempt_social_security: {
        2024: null,
      },
      tax_liability_if_itemizing: {
        2024: null,
      },
      tax_liability_if_not_itemizing: {
        2024: null,
      },
      tax_unit_capital_loss: {
        2024: null,
      },
      tax_unit_childcare_expenses: {
        2024: null,
      },
      tax_unit_children: {
        2024: null,
      },
      tax_unit_count_dependents: {
        2024: null,
      },
      tax_unit_dependent_elsewhere: {
        2024: false,
      },
      tax_unit_dependents: {
        2024: null,
      },
      tax_unit_earned_income: {
        2024: null,
      },
      tax_unit_fpg: {
        2024: null,
      },
      tax_unit_id: {
        2024: 0,
      },
      tax_unit_income_ami_ratio: {
        2024: 0,
      },
      tax_unit_is_joint: {
        2024: null,
      },
      tax_unit_itemizes: {
        2024: null,
      },
      tax_unit_medicaid_income_level: {
        2024: null,
      },
      tax_unit_net_capital_gains: {
        2024: null,
      },
      tax_unit_partnership_s_corp_income: {
        2024: null,
      },
      tax_unit_rental_income: {
        2024: null,
      },
      tax_unit_size: {
        2024: null,
      },
      tax_unit_social_security: {
        2024: null,
      },
      tax_unit_spouse_dependent_elsewhere: {
        2024: false,
      },
      tax_unit_ss: {
        2024: null,
      },
      tax_unit_ssi: {
        2024: null,
      },
      tax_unit_state: {
        2024: null,
      },
      tax_unit_taxable_social_security: {
        2024: null,
      },
      tax_unit_taxable_unemployment_compensation: {
        2024: null,
      },
      tax_unit_unemployment_compensation: {
        2024: null,
      },
      tax_unit_weight: {
        2024: 0,
      },
      taxable_income: {
        2024: null,
      },
      taxable_income_deductions: {
        2024: null,
      },
      taxable_income_deductions_if_itemizing: {
        2024: null,
      },
      taxable_income_deductions_if_not_itemizing: {
        2024: null,
      },
      taxable_income_less_qbid: {
        2024: null,
      },
      taxable_ss_magi: {
        2024: null,
      },
      taxable_uc_agi: {
        2024: null,
      },
      taxbc: {
        2024: null,
      },
      taxcalc_c04470: {
        2024: null,
      },
      taxcalc_c09200: {
        2024: null,
      },
      taxcalc_c17000: {
        2024: null,
      },
      taxcalc_c18300: {
        2024: null,
      },
      taxcalc_c19200: {
        2024: null,
      },
      taxcalc_c19700: {
        2024: null,
      },
      taxcalc_c20500: {
        2024: null,
      },
      taxcalc_cmbtp: {
        2024: null,
      },
      taxcalc_dsi: {
        2024: null,
      },
      taxcalc_e00200: {
        2024: null,
      },
      taxcalc_e00300: {
        2024: null,
      },
      taxcalc_e00400: {
        2024: null,
      },
      taxcalc_e00600: {
        2024: null,
      },
      taxcalc_e00650: {
        2024: null,
      },
      taxcalc_e00700: {
        2024: null,
      },
      taxcalc_e00800: {
        2024: null,
      },
      taxcalc_e00900: {
        2024: null,
      },
      taxcalc_e01100: {
        2024: null,
      },
      taxcalc_e01200: {
        2024: null,
      },
      taxcalc_e01500: {
        2024: null,
      },
      taxcalc_e01700: {
        2024: null,
      },
      taxcalc_e02000: {
        2024: null,
      },
      taxcalc_e02100: {
        2024: null,
      },
      taxcalc_e02300: {
        2024: null,
      },
      taxcalc_e02400: {
        2024: null,
      },
      taxcalc_e03150: {
        2024: null,
      },
      taxcalc_e03210: {
        2024: null,
      },
      taxcalc_e03220: {
        2024: null,
      },
      taxcalc_e03230: {
        2024: null,
      },
      taxcalc_e03240: {
        2024: null,
      },
      taxcalc_e03270: {
        2024: null,
      },
      taxcalc_e03290: {
        2024: null,
      },
      taxcalc_e03300: {
        2024: null,
      },
      taxcalc_e03400: {
        2024: null,
      },
      taxcalc_e03500: {
        2024: null,
      },
      taxcalc_e09700: {
        2024: null,
      },
      taxcalc_e09800: {
        2024: null,
      },
      taxcalc_e09900: {
        2024: null,
      },
      taxcalc_e11200: {
        2024: null,
      },
      taxcalc_e17500: {
        2024: null,
      },
      taxcalc_e18500: {
        2024: null,
      },
      taxcalc_e19200: {
        2024: null,
      },
      taxcalc_e19800: {
        2024: null,
      },
      taxcalc_e20100: {
        2024: null,
      },
      taxcalc_e20400: {
        2024: null,
      },
      taxcalc_e24515: {
        2024: null,
      },
      taxcalc_e24518: {
        2024: null,
      },
      taxcalc_e26270: {
        2024: null,
      },
      taxcalc_e27200: {
        2024: null,
      },
      taxcalc_e32800: {
        2024: null,
      },
      taxcalc_e58990: {
        2024: null,
      },
      taxcalc_e62900: {
        2024: null,
      },
      taxcalc_e87530: {
        2024: null,
      },
      taxcalc_f2441: {
        2024: null,
      },
      taxcalc_f6251: {
        2024: null,
      },
      taxcalc_fips: {
        2024: null,
      },
      taxcalc_g20500: {
        2024: null,
      },
      taxcalc_hasqdivltcg: {
        2024: null,
      },
      taxcalc_midr: {
        2024: null,
      },
      taxcalc_niit: {
        2024: null,
      },
      taxcalc_p22250: {
        2024: null,
      },
      taxcalc_p23250: {
        2024: null,
      },
      taxcalc_pencon: {
        2024: null,
      },
      taxcalc_pt_binc_w2_wages: {
        2024: null,
      },
      taxcalc_pt_sstb_income: {
        2024: null,
      },
      taxcalc_pt_ubia_property: {
        2024: null,
      },
      taxcalc_s006: {
        2024: null,
      },
      taxsim_age1: {
        2024: null,
      },
      taxsim_age2: {
        2024: null,
      },
      taxsim_age3: {
        2024: null,
      },
      taxsim_childcare: {
        2024: null,
      },
      taxsim_dep13: {
        2024: null,
      },
      taxsim_dep17: {
        2024: null,
      },
      taxsim_dep18: {
        2024: null,
      },
      taxsim_depx: {
        2024: null,
      },
      taxsim_dividends: {
        2024: null,
      },
      taxsim_fiitax: {
        2024: null,
      },
      taxsim_gssi: {
        2024: null,
      },
      taxsim_intrec: {
        2024: null,
      },
      taxsim_ltcg: {
        2024: null,
      },
      taxsim_mstat: {
        2024: null,
      },
      taxsim_page: {
        2024: null,
      },
      taxsim_pbusinc: {
        2024: null,
      },
      taxsim_pensions: {
        2024: null,
      },
      taxsim_pprofinc: {
        2024: 0,
      },
      taxsim_psemp: {
        2024: null,
      },
      taxsim_pui: {
        2024: null,
      },
      taxsim_pwages: {
        2024: null,
      },
      taxsim_sage: {
        2024: null,
      },
      taxsim_sbusinc: {
        2024: null,
      },
      taxsim_scorp: {
        2024: null,
      },
      taxsim_siitax: {
        2024: null,
      },
      taxsim_sprofinc: {
        2024: 0,
      },
      taxsim_ssemp: {
        2024: null,
      },
      taxsim_state: {
        2024: null,
      },
      taxsim_stcg: {
        2024: null,
      },
      taxsim_swages: {
        2024: null,
      },
      taxsim_taxsimid: {
        2024: null,
      },
      taxsim_tfica: {
        2024: null,
      },
      taxsim_ui: {
        2024: null,
      },
      taxsim_v10: {
        2024: null,
      },
      taxsim_v11: {
        2024: null,
      },
      taxsim_v12: {
        2024: null,
      },
      taxsim_v18: {
        2024: null,
      },
      taxsim_v25: {
        2024: null,
      },
      taxsim_year: {
        2024: null,
      },
      tuition_and_fees: {
        2024: 0,
      },
      unrecaptured_section_1250_gain: {
        2024: 0,
      },
      unreported_payroll_tax: {
        2024: 0,
      },
      us_govt_interest: {
        2024: 0,
      },
      used_clean_vehicle_credit: {
        2024: null,
      },
      used_clean_vehicle_credit_eligible: {
        2024: null,
      },
      used_clean_vehicle_sale_price: {
        2024: 0,
      },
      ut_additions_to_income: {
        2024: 0,
      },
      ut_at_home_parent_credit: {
        2024: null,
      },
      ut_claims_retirement_credit: {
        2024: null,
      },
      ut_eitc: {
        2024: null,
      },
      ut_federal_deductions_for_taxpayer_credit: {
        2024: null,
      },
      ut_income_tax: {
        2024: null,
      },
      ut_income_tax_before_credits: {
        2024: null,
      },
      ut_income_tax_before_refundable_credits: {
        2024: null,
      },
      ut_income_tax_exempt: {
        2024: null,
      },
      ut_personal_exemption: {
        2024: null,
      },
      ut_refundable_credits: {
        2024: 0,
      },
      ut_retirement_credit: {
        2024: null,
      },
      ut_retirement_credit_max: {
        2024: null,
      },
      ut_ss_benefits_credit: {
        2024: null,
      },
      ut_ss_benefits_credit_max: {
        2024: null,
      },
      ut_state_tax_refund: {
        2024: null,
      },
      ut_subtractions_from_income: {
        2024: 0,
      },
      ut_taxable_income: {
        2024: null,
      },
      ut_taxpayer_credit: {
        2024: null,
      },
      ut_taxpayer_credit_max: {
        2024: null,
      },
      ut_taxpayer_credit_phase_out_income: {
        2024: null,
      },
      ut_taxpayer_credit_reduction: {
        2024: null,
      },
      ut_total_dependents: {
        2024: null,
      },
      ut_total_income: {
        2024: null,
      },
      va_aged_blind_exemption: {
        2024: null,
      },
      va_disability_income_subtraction: {
        2024: null,
      },
      va_income_tax_before_credits: {
        2024: null,
      },
      va_military_basic_pay_subtraction: {
        2024: null,
      },
      va_personal_exemption: {
        2024: null,
      },
      va_standard_deduction: {
        2024: null,
      },
      va_taxable_income: {
        2024: 0,
      },
      wa_capital_gains_tax: {
        2024: null,
      },
      wa_income_tax: {
        2024: null,
      },
      wa_income_tax_before_refundable_credits: {
        2024: null,
      },
      wa_refundable_credits: {
        2024: null,
      },
      wa_working_families_tax_credit: {
        2024: null,
      },
      xtot: {
        2024: null,
      },
    },
  },
  axes: [
    [
      {
        name: "employment_income",
        period: "2024",
        min: 0,
        max: 200000,
        count: 401,
      },
    ],
  ],
};
const DEFAULT_UK_HOUSEHOLD = {
  people: {
    you: {
      AA_reported: {
        2024: 0,
      },
      AFCS: {
        2024: null,
      },
      AFCS_reported: {
        2024: 0,
      },
      BSP: {
        2024: null,
      },
      BSP_reported: {
        2024: 0,
      },
      CB_HITC: {
        2024: null,
      },
      DLA_M_reported: {
        2024: 0,
      },
      DLA_SC_reported: {
        2024: 0,
      },
      ESA_contrib: {
        2024: null,
      },
      ESA_contrib_reported: {
        2024: 0,
      },
      ESA_income_reported: {
        2024: 0,
      },
      HB_individual_non_dep_deduction: {
        2024: null,
      },
      IIDB: {
        2024: null,
      },
      IIDB_reported: {
        2024: 0,
      },
      ISA_interest_income: {
        2024: 0,
      },
      JSA_contrib: {
        2024: null,
      },
      JSA_contrib_reported: {
        2024: 0,
      },
      JSA_income_reported: {
        2024: 0,
      },
      NI_class_2: {
        2024: null,
      },
      NI_class_4: {
        2024: null,
      },
      NI_exempt: {
        2024: null,
      },
      PIP_DL_reported: {
        2024: 0,
      },
      PIP_M_reported: {
        2024: 0,
      },
      SDA_reported: {
        2024: 0,
      },
      SMP: {
        2024: 0,
      },
      SSP: {
        2024: 0,
      },
      UC_MIF_applies: {
        2024: null,
      },
      UC_MIF_capped_earned_income: {
        2024: null,
      },
      UC_individual_child_element: {
        2024: null,
      },
      UC_individual_disabled_child_element: {
        2024: null,
      },
      UC_individual_non_dep_deduction: {
        2024: null,
      },
      UC_individual_severely_disabled_child_element: {
        2024: null,
      },
      UC_minimum_income_floor: {
        2024: null,
      },
      UC_non_dep_deduction_exempt: {
        2024: null,
      },
      aa_category: {
        2024: null,
      },
      access_fund: {
        2024: 0,
      },
      add_rate_earned_income: {
        2024: null,
      },
      add_rate_earned_income_tax: {
        2024: null,
      },
      add_rate_savings_income: {
        2024: null,
      },
      adjusted_net_income: {
        2024: null,
      },
      adult_ema: {
        2024: 0,
      },
      adult_index: {
        2024: null,
      },
      age: {
        2024: 40,
      },
      age_18_64: {
        2024: null,
      },
      age_over_64: {
        2024: null,
      },
      age_under_18: {
        2024: null,
      },
      allowances: {
        2024: null,
      },
      armed_forces_independence_payment: {
        2024: 0,
      },
      attendance_allowance: {
        2024: null,
      },
      base_net_income: {
        2024: 0,
      },
      basic_income: {
        2024: null,
      },
      basic_rate_earned_income: {
        2024: null,
      },
      basic_rate_earned_income_tax: {
        2024: null,
      },
      basic_rate_savings_income: {
        2024: null,
      },
      basic_rate_savings_income_pre_starter: {
        2024: null,
      },
      benefits: {
        2024: null,
      },
      benefits_modelling: {
        2024: null,
      },
      benefits_reported: {
        2024: null,
      },
      bi_household_phaseout: {
        2024: null,
      },
      bi_individual_phaseout: {
        2024: null,
      },
      bi_maximum: {
        2024: null,
      },
      bi_phaseout: {
        2024: null,
      },
      birth_year: {
        2024: null,
      },
      blind_persons_allowance: {
        2024: 0,
      },
      capital_allowances: {
        2024: 0,
      },
      capital_income: {
        2024: null,
      },
      capped_mcad: {
        2024: null,
      },
      carers_allowance: {
        2024: null,
      },
      carers_allowance_reported: {
        2024: 0,
      },
      charitable_investment_gifts: {
        2024: 0,
      },
      child_benefit_reported: {
        2024: 0,
      },
      child_benefit_respective_amount: {
        2024: null,
      },
      child_ema: {
        2024: 0,
      },
      child_index: {
        2024: null,
      },
      child_tax_credit_reported: {
        2024: 0,
      },
      childcare_expenses: {
        2024: 0,
      },
      cliff_evaluated: {
        2024: null,
      },
      cliff_gap: {
        2024: null,
      },
      council_tax_benefit_reported: {
        2024: 0,
      },
      covenanted_payments: {
        2024: 0,
      },
      current_education: {
        2024: "NOT_IN_EDUCATION",
      },
      deficiency_relief: {
        2024: 0,
      },
      dividend_allowance: {
        2024: null,
      },
      dividend_income: {
        2024: 0,
      },
      dividend_income_tax: {
        2024: null,
      },
      dla: {
        2024: null,
      },
      dla_m: {
        2024: null,
      },
      dla_m_category: {
        2024: null,
      },
      dla_sc: {
        2024: null,
      },
      dla_sc_category: {
        2024: null,
      },
      dla_sc_middle_plus: {
        2024: null,
      },
      earned_income: {
        2024: null,
      },
      earned_income_tax: {
        2024: null,
      },
      earned_taxable_income: {
        2024: null,
      },
      education_grants: {
        2024: 0,
      },
      employee_NI: {
        2024: null,
      },
      employee_NI_class_1: {
        2024: null,
      },
      employer_NI: {
        2024: null,
      },
      employer_NI_class_1: {
        2024: null,
      },
      employer_pension_contributions: {
        2024: 0,
      },
      employment_benefits: {
        2024: null,
      },
      employment_deductions: {
        2024: null,
      },
      employment_expenses: {
        2024: 0,
      },
      employment_income: {
        2024: null,
      },
      employment_status: {
        2024: "UNEMPLOYED",
      },
      family_benefits: {
        2024: null,
      },
      family_benefits_reported: {
        2024: 0,
      },
      gender: {
        2024: "MALE",
      },
      gift_aid: {
        2024: 0,
      },
      gross_income: {
        2024: null,
      },
      higher_rate_earned_income: {
        2024: null,
      },
      higher_rate_earned_income_tax: {
        2024: null,
      },
      higher_rate_savings_income: {
        2024: null,
      },
      highest_education: {
        2024: "UPPER_SECONDARY",
      },
      hours_worked: {
        2024: 0,
      },
      housing_benefit_reported: {
        2024: 0,
      },
      in_FE: {
        2024: false,
      },
      in_HE: {
        2024: false,
      },
      in_social_housing: {
        2024: null,
      },
      in_work: {
        2024: null,
      },
      incapacity_benefit: {
        2024: null,
      },
      incapacity_benefit_reported: {
        2024: 0,
      },
      income_decile: {
        2024: null,
      },
      income_support_reported: {
        2024: 0,
      },
      income_tax: {
        2024: null,
      },
      income_tax_pre_charges: {
        2024: null,
      },
      is_CTC_child_limit_exempt: {
        2024: null,
      },
      is_QYP: {
        2024: null,
      },
      is_SP_age: {
        2024: null,
      },
      is_WA_adult: {
        2024: null,
      },
      is_adult: {
        2024: null,
      },
      is_apprentice: {
        2024: false,
      },
      is_benunit_eldest_child: {
        2024: null,
      },
      is_benunit_head: {
        2024: null,
      },
      is_blind: {
        2024: false,
      },
      is_carer_for_benefits: {
        2024: null,
      },
      is_child: {
        2024: null,
      },
      is_child_born_before_child_limit: {
        2024: null,
      },
      is_child_for_CTC: {
        2024: null,
      },
      is_child_or_QYP: {
        2024: null,
      },
      is_disabled_for_benefits: {
        2024: null,
      },
      is_eldest_child: {
        2024: null,
      },
      is_enhanced_disabled_for_benefits: {
        2024: null,
      },
      is_female: {
        2024: null,
      },
      is_higher_earner: {
        2024: null,
      },
      is_household_head: {
        2024: null,
      },
      is_in_startup_period: {
        2024: false,
      },
      is_male: {
        2024: null,
      },
      is_older_child: {
        2024: null,
      },
      is_on_cliff: {
        2024: null,
      },
      is_severely_disabled_for_benefits: {
        2024: null,
      },
      is_young_child: {
        2024: null,
      },
      limited_capability_for_WRA: {
        2024: null,
      },
      loss_relief: {
        2024: null,
      },
      lump_sum_income: {
        2024: 0,
      },
      maintenance_expenses: {
        2024: 0,
      },
      maintenance_income: {
        2024: 0,
      },
      marginal_tax_rate: {
        2024: null,
      },
      marital_status: {
        2024: null,
      },
      market_income: {
        2024: null,
      },
      marriage_allowance: {
        2024: null,
      },
      married_couples_allowance: {
        2024: 0,
      },
      married_couples_allowance_deduction: {
        2024: null,
      },
      maternity_allowance: {
        2024: null,
      },
      maternity_allowance_reported: {
        2024: 0,
      },
      meets_marriage_allowance_income_conditions: {
        2024: null,
      },
      minimum_wage: {
        2024: null,
      },
      minimum_wage_category: {
        2024: null,
      },
      miscellaneous_income: {
        2024: 0,
      },
      national_insurance: {
        2024: null,
      },
      net_income: {
        2024: null,
      },
      occupational_pension_contributions: {
        2024: 0,
      },
      other_benefits: {
        2024: null,
      },
      other_deductions: {
        2024: 0,
      },
      over_16: {
        2024: null,
      },
      partners_unused_personal_allowance: {
        2024: null,
      },
      pays_scottish_income_tax: {
        2024: null,
      },
      pension_annual_allowance: {
        2024: null,
      },
      pension_contributions: {
        2024: null,
      },
      pension_contributions_relief: {
        2024: null,
      },
      pension_credit_reported: {
        2024: 0,
      },
      pension_income: {
        2024: 0,
      },
      people: {
        2024: 1,
      },
      person_benunit_id: {
        2024: 0,
      },
      person_benunit_role: {
        2024: null,
      },
      person_household_id: {
        2024: 0,
      },
      person_household_role: {
        2024: null,
      },
      person_id: {
        2024: 0,
      },
      person_state_id: {
        2024: 0,
      },
      person_state_role: {
        2024: null,
      },
      person_weight: {
        2024: null,
      },
      personal_allowance: {
        2024: null,
      },
      personal_benefits: {
        2024: null,
      },
      personal_benefits_reported: {
        2024: null,
      },
      personal_rent: {
        2024: null,
      },
      pip: {
        2024: null,
      },
      pip_dl: {
        2024: null,
      },
      pip_dl_category: {
        2024: null,
      },
      pip_m: {
        2024: null,
      },
      pip_m_category: {
        2024: null,
      },
      private_pension_contributions: {
        2024: 0,
      },
      private_transfer_income: {
        2024: 0,
      },
      property_allowance: {
        2024: null,
      },
      property_allowance_deduction: {
        2024: null,
      },
      property_income: {
        2024: 0,
      },
      raw_person_weight: {
        2024: 1,
      },
      receives_carers_allowance: {
        2024: null,
      },
      receives_enhanced_pip_dl: {
        2024: null,
      },
      receives_highest_dla_sc: {
        2024: null,
      },
      role: {
        2024: null,
      },
      savings_allowance: {
        2024: null,
      },
      savings_income_tax: {
        2024: null,
      },
      savings_interest_income: {
        2024: 0,
      },
      savings_starter_rate_income: {
        2024: null,
      },
      sda: {
        2024: null,
      },
      self_employed_NI: {
        2024: null,
      },
      self_employment_income: {
        2024: 0,
      },
      social_security_income: {
        2024: null,
      },
      ssmg: {
        2024: null,
      },
      ssmg_reported: {
        2024: 0,
      },
      state_pension: {
        2024: null,
      },
      state_pension_age: {
        2024: null,
      },
      state_pension_reported: {
        2024: null,
      },
      student_loans: {
        2024: 0,
      },
      student_payments: {
        2024: null,
      },
      sublet_income: {
        2024: 0,
      },
      tax: {
        2024: null,
      },
      tax_band: {
        2024: null,
      },
      tax_free_savings_income: {
        2024: null,
      },
      tax_modelling: {
        2024: null,
      },
      tax_reported: {
        2024: 0,
      },
      taxable_dividend_income: {
        2024: null,
      },
      taxable_employment_income: {
        2024: null,
      },
      taxable_miscellaneous_income: {
        2024: null,
      },
      taxable_pension_income: {
        2024: null,
      },
      taxable_property_income: {
        2024: null,
      },
      taxable_savings_interest_income: {
        2024: null,
      },
      taxable_self_employment_income: {
        2024: null,
      },
      taxable_social_security_income: {
        2024: null,
      },
      taxed_dividend_income: {
        2024: null,
      },
      taxed_income: {
        2024: null,
      },
      taxed_savings_income: {
        2024: null,
      },
      total_NI: {
        2024: null,
      },
      total_income: {
        2024: null,
      },
      total_pension_income: {
        2024: null,
      },
      trading_allowance: {
        2024: null,
      },
      trading_allowance_deduction: {
        2024: null,
      },
      trading_loss: {
        2024: 0,
      },
      triple_lock_uprating: {
        2024: null,
      },
      universal_credit_reported: {
        2024: 0,
      },
      unused_personal_allowance: {
        2024: null,
      },
      weekly_NI_class_2: {
        2024: null,
      },
      weekly_childcare_expenses: {
        2024: null,
      },
      weekly_hours: {
        2024: null,
      },
      winter_fuel_allowance_reported: {
        2024: 0,
      },
      working_tax_credit_reported: {
        2024: 0,
      },
    },
  },
  benunits: {
    "your immediate family": {
      members: ["you"],
      BRMA_LHA_rate: {
        2024: null,
      },
      CTC_child_element: {
        2024: null,
      },
      CTC_disabled_child_element: {
        2024: null,
      },
      CTC_family_element: {
        2024: null,
      },
      CTC_maximum_rate: {
        2024: null,
      },
      CTC_severely_disabled_child_element: {
        2024: null,
      },
      ESA_income: {
        2024: null,
      },
      ESA_income_eligible: {
        2024: null,
      },
      HB_non_dep_deductions: {
        2024: null,
      },
      JSA: {
        2024: null,
      },
      JSA_income: {
        2024: null,
      },
      JSA_income_applicable_amount: {
        2024: null,
      },
      JSA_income_applicable_income: {
        2024: null,
      },
      JSA_income_eligible: {
        2024: null,
      },
      LHA_allowed_bedrooms: {
        2024: null,
      },
      LHA_cap: {
        2024: null,
      },
      LHA_category: {
        2024: null,
      },
      LHA_eligible: {
        2024: null,
      },
      UC_LCWRA_element: {
        2024: null,
      },
      UC_carer_element: {
        2024: null,
      },
      UC_child_element: {
        2024: null,
      },
      UC_childcare_element: {
        2024: null,
      },
      UC_childcare_work_condition: {
        2024: null,
      },
      UC_claimant_type: {
        2024: null,
      },
      UC_disability_elements: {
        2024: null,
      },
      UC_earned_income: {
        2024: null,
      },
      UC_housing_costs_element: {
        2024: null,
      },
      UC_income_reduction: {
        2024: null,
      },
      UC_maximum_amount: {
        2024: null,
      },
      UC_maximum_childcare: {
        2024: null,
      },
      UC_non_dep_deductions: {
        2024: null,
      },
      UC_standard_allowance: {
        2024: null,
      },
      UC_unearned_income: {
        2024: null,
      },
      UC_work_allowance: {
        2024: null,
      },
      WTC_basic_element: {
        2024: null,
      },
      WTC_childcare_element: {
        2024: null,
      },
      WTC_couple_element: {
        2024: null,
      },
      WTC_disabled_element: {
        2024: null,
      },
      WTC_lone_parent_element: {
        2024: null,
      },
      WTC_maximum_rate: {
        2024: null,
      },
      WTC_severely_disabled_element: {
        2024: null,
      },
      WTC_worker_element: {
        2024: null,
      },
      additional_minimum_guarantee: {
        2024: null,
      },
      baseline_child_benefit_entitlement: {
        2024: 0,
      },
      baseline_ctc_entitlement: {
        2024: 0,
      },
      baseline_housing_benefit_entitlement: {
        2024: 0,
      },
      baseline_income_support_entitlement: {
        2024: 0,
      },
      baseline_pension_credit_entitlement: {
        2024: 0,
      },
      baseline_universal_credit_entitlement: {
        2024: 0,
      },
      baseline_wtc_entitlement: {
        2024: 0,
      },
      benefit_cap: {
        2024: null,
      },
      benefit_cap_reduction: {
        2024: null,
      },
      benefits_premiums: {
        2024: null,
      },
      benunit_has_carer: {
        2024: null,
      },
      benunit_id: {
        2024: 0,
      },
      benunit_is_renting: {
        2024: null,
      },
      benunit_rent: {
        2024: null,
      },
      benunit_tax: {
        2024: null,
      },
      benunit_tenure_type: {
        2024: null,
      },
      benunit_weekly_hours: {
        2024: null,
      },
      benunit_weight: {
        2024: null,
      },
      carer_minimum_guarantee_addition: {
        2024: null,
      },
      carer_premium: {
        2024: null,
      },
      child_benefit: {
        2024: null,
      },
      child_benefit_entitlement: {
        2024: null,
      },
      child_benefit_less_tax_charge: {
        2024: null,
      },
      child_minimum_guarantee_addition: {
        2024: null,
      },
      child_tax_credit: {
        2024: null,
      },
      child_tax_credit_pre_minimum: {
        2024: null,
      },
      claims_ESA_income: {
        2024: null,
      },
      claims_all_entitled_benefits: {
        2024: null,
      },
      claims_legacy_benefits: {
        2024: null,
      },
      council_tax_benefit: {
        2024: null,
      },
      count_children_and_qyp: {
        2024: null,
      },
      ctc_entitlement: {
        2024: null,
      },
      disability_premium: {
        2024: null,
      },
      eldest_adult_age: {
        2024: null,
      },
      eldest_child_age: {
        2024: null,
      },
      enhanced_disability_premium: {
        2024: null,
      },
      families: {
        2024: 1,
      },
      family_rent: {
        2024: null,
      },
      family_type: {
        2024: null,
      },
      guarantee_credit: {
        2024: null,
      },
      housing_benefit: {
        2024: null,
      },
      housing_benefit_applicable_amount: {
        2024: null,
      },
      housing_benefit_applicable_income: {
        2024: null,
      },
      housing_benefit_eligible: {
        2024: null,
      },
      housing_benefit_entitlement: {
        2024: null,
      },
      housing_benefit_pre_benefit_cap: {
        2024: null,
      },
      income_support: {
        2024: null,
      },
      income_support_applicable_amount: {
        2024: null,
      },
      income_support_applicable_income: {
        2024: null,
      },
      income_support_eligible: {
        2024: null,
      },
      income_support_entitlement: {
        2024: null,
      },
      is_CTC_eligible: {
        2024: null,
      },
      is_UC_eligible: {
        2024: null,
      },
      is_UC_work_allowance_eligible: {
        2024: null,
      },
      is_WTC_eligible: {
        2024: null,
      },
      is_benefit_cap_exempt: {
        2024: null,
      },
      is_couple: {
        2024: null,
      },
      is_guarantee_credit_eligible: {
        2024: null,
      },
      is_lone_parent: {
        2024: null,
      },
      is_married: {
        2024: false,
      },
      is_pension_credit_eligible: {
        2024: null,
      },
      is_savings_credit_eligible: {
        2024: null,
      },
      is_single: {
        2024: null,
      },
      is_single_person: {
        2024: null,
      },
      legacy_benefits: {
        2024: null,
      },
      minimum_guarantee: {
        2024: null,
      },
      num_UC_eligible_children: {
        2024: null,
      },
      num_adults: {
        2024: null,
      },
      num_carers: {
        2024: null,
      },
      num_children: {
        2024: null,
      },
      num_disabled_adults: {
        2024: null,
      },
      num_disabled_children: {
        2024: null,
      },
      num_enhanced_disabled_adults: {
        2024: null,
      },
      num_enhanced_disabled_children: {
        2024: null,
      },
      num_severely_disabled_adults: {
        2024: null,
      },
      num_severely_disabled_children: {
        2024: null,
      },
      pension_credit: {
        2024: null,
      },
      pension_credit_entitlement: {
        2024: null,
      },
      pension_credit_income: {
        2024: null,
      },
      relation_type: {
        2024: null,
      },
      savings_credit: {
        2024: null,
      },
      savings_credit_income: {
        2024: null,
      },
      severe_disability_minimum_guarantee_addition: {
        2024: null,
      },
      severe_disability_premium: {
        2024: null,
      },
      standard_minimum_guarantee: {
        2024: null,
      },
      tax_credits: {
        2024: null,
      },
      tax_credits_applicable_income: {
        2024: null,
      },
      tax_credits_reduction: {
        2024: null,
      },
      uc_has_entitlement: {
        2024: null,
      },
      universal_credit: {
        2024: null,
      },
      universal_credit_entitlement: {
        2024: null,
      },
      universal_credit_pre_benefit_cap: {
        2024: null,
      },
      working_tax_credit: {
        2024: null,
      },
      working_tax_credit_pre_minimum: {
        2024: null,
      },
      would_claim_CTC: {
        2024: null,
      },
      would_claim_ESA_income: {
        2024: null,
      },
      would_claim_HB: {
        2024: null,
      },
      would_claim_IS: {
        2024: null,
      },
      would_claim_JSA: {
        2024: null,
      },
      would_claim_UC: {
        2024: null,
      },
      would_claim_WTC: {
        2024: null,
      },
      would_claim_child_benefit: {
        2024: null,
      },
      would_claim_pc: {
        2024: null,
      },
      wtc_entitlement: {
        2024: null,
      },
      youngest_adult_age: {
        2024: null,
      },
      youngest_child_age: {
        2024: null,
      },
    },
  },
  households: {
    "your household": {
      members: ["you"],
      BRMA: {
        2024: "MAIDSTONE",
      },
      LVT: {
        2024: null,
      },
      accommodation_type: {
        2024: "UNKNOWN",
      },
      additional_residential_property_purchased: {
        2024: null,
      },
      alcohol_and_tobacco_consumption: {
        2024: 0,
      },
      baseline_business_rates: {
        2024: null,
      },
      baseline_corporate_sdlt: {
        2024: null,
      },
      baseline_expected_lbtt: {
        2024: 0,
      },
      baseline_expected_ltt: {
        2024: 0,
      },
      baseline_expected_sdlt: {
        2024: 0,
      },
      baseline_fuel_duty: {
        2024: 0,
      },
      baseline_hbai_excluded_income: {
        2024: null,
      },
      baseline_vat: {
        2024: null,
      },
      business_rates: {
        2024: null,
      },
      business_rates_change_incidence: {
        2024: null,
      },
      carbon_consumption: {
        2024: null,
      },
      carbon_tax: {
        2024: null,
      },
      change_in_business_rates: {
        2024: null,
      },
      change_in_expected_lbtt: {
        2024: null,
      },
      change_in_expected_ltt: {
        2024: null,
      },
      change_in_expected_sdlt: {
        2024: null,
      },
      change_in_fuel_duty: {
        2024: null,
      },
      clothing_and_footwear_consumption: {
        2024: 0,
      },
      communication_consumption: {
        2024: 0,
      },
      consumption: {
        2024: null,
      },
      corporate_land_value: {
        2024: null,
      },
      corporate_sdlt: {
        2024: null,
      },
      corporate_sdlt_change_incidence: {
        2024: null,
      },
      corporate_tax_incidence: {
        2024: null,
      },
      corporate_wealth: {
        2024: 0,
      },
      cost_of_living_support_payment: {
        2024: null,
      },
      council_tax: {
        2024: 0,
      },
      council_tax_band: {
        2024: "D",
      },
      council_tax_less_benefit: {
        2024: null,
      },
      country: {
        2024: null,
      },
      cumulative_non_residential_rent: {
        2024: 0,
      },
      cumulative_residential_rent: {
        2024: 0,
      },
      deep_poverty_gap: {
        2024: null,
      },
      deep_poverty_line: {
        2024: null,
      },
      diesel_litres: {
        2024: null,
      },
      diesel_price: {
        2024: null,
      },
      diesel_spending: {
        2024: 0,
      },
      domestic_energy_consumption: {
        2024: 0,
      },
      domestic_rates: {
        2024: null,
      },
      ebr_council_tax_rebate: {
        2024: null,
      },
      ebr_energy_bills_credit: {
        2024: null,
      },
      education_consumption: {
        2024: 0,
      },
      energy_bills_rebate: {
        2024: null,
      },
      epg_subsidy: {
        2024: null,
      },
      equiv_hbai_household_net_income: {
        2024: null,
      },
      equiv_hbai_household_net_income_ahc: {
        2024: null,
      },
      equiv_household_net_income: {
        2024: null,
      },
      expected_lbtt: {
        2024: null,
      },
      expected_ltt: {
        2024: null,
      },
      expected_sdlt: {
        2024: null,
      },
      food_and_non_alcoholic_beverages_consumption: {
        2024: 0,
      },
      fuel_duty: {
        2024: null,
      },
      full_rate_vat_consumption: {
        2024: null,
      },
      gross_financial_wealth: {
        2024: 0,
      },
      hbai_excluded_income: {
        2024: null,
      },
      hbai_excluded_income_change: {
        2024: null,
      },
      hbai_household_net_income: {
        2024: null,
      },
      hbai_household_net_income_ahc: {
        2024: null,
      },
      health_consumption: {
        2024: 0,
      },
      household_benefits: {
        2024: null,
      },
      household_count_people: {
        2024: null,
      },
      household_equivalisation_ahc: {
        2024: null,
      },
      household_equivalisation_bhc: {
        2024: null,
      },
      household_furnishings_consumption: {
        2024: 0,
      },
      household_gross_income: {
        2024: null,
      },
      household_id: {
        2024: 0,
      },
      household_income_decile: {
        2024: null,
      },
      household_land_value: {
        2024: null,
      },
      household_market_income: {
        2024: null,
      },
      household_net_income: {
        2024: null,
      },
      household_num_benunits: {
        2024: null,
      },
      household_owns_tv: {
        2024: null,
      },
      household_tax: {
        2024: null,
      },
      household_weight: {
        2024: 0,
      },
      households: {
        2024: 1,
      },
      housing_costs: {
        2024: null,
      },
      housing_service_charges: {
        2024: 0,
      },
      housing_water_and_electricity_consumption: {
        2024: 0,
      },
      in_deep_poverty: {
        2024: null,
      },
      in_deep_poverty_ahc: {
        2024: null,
      },
      in_deep_poverty_bhc: {
        2024: null,
      },
      in_original_frs: {
        2024: 0,
      },
      in_poverty: {
        2024: null,
      },
      in_poverty_ahc: {
        2024: null,
      },
      in_poverty_bhc: {
        2024: null,
      },
      is_renting: {
        2024: null,
      },
      is_shared_accommodation: {
        2024: false,
      },
      land_and_buildings_transaction_tax: {
        2024: null,
      },
      land_transaction_tax: {
        2024: null,
      },
      land_value: {
        2024: null,
      },
      lbtt_liable: {
        2024: null,
      },
      lbtt_on_non_residential_property_rent: {
        2024: null,
      },
      lbtt_on_non_residential_property_transactions: {
        2024: null,
      },
      lbtt_on_rent: {
        2024: null,
      },
      lbtt_on_residential_property_rent: {
        2024: null,
      },
      lbtt_on_residential_property_transactions: {
        2024: null,
      },
      lbtt_on_transactions: {
        2024: null,
      },
      local_authority: {
        2024: "MAIDSTONE",
      },
      ltt_liable: {
        2024: null,
      },
      ltt_on_non_residential_property_rent: {
        2024: null,
      },
      ltt_on_non_residential_property_transactions: {
        2024: null,
      },
      ltt_on_rent: {
        2024: null,
      },
      ltt_on_residential_property_rent: {
        2024: null,
      },
      ltt_on_residential_property_transactions: {
        2024: null,
      },
      ltt_on_transactions: {
        2024: null,
      },
      main_residence_value: {
        2024: 0,
      },
      main_residential_property_purchased: {
        2024: null,
      },
      main_residential_property_purchased_is_first_home: {
        2024: null,
      },
      miscellaneous_consumption: {
        2024: 0,
      },
      mortgage: {
        2024: null,
      },
      mortgage_capital_repayment: {
        2024: 0,
      },
      mortgage_interest_repayment: {
        2024: 0,
      },
      net_financial_wealth: {
        2024: 0,
      },
      non_primary_residence_wealth_tax: {
        2024: null,
      },
      non_residential_property_purchased: {
        2024: null,
      },
      non_residential_property_value: {
        2024: 0,
      },
      non_residential_rent: {
        2024: 0,
      },
      num_bedrooms: {
        2024: 0,
      },
      ons_tenure_type: {
        2024: null,
      },
      original_weight: {
        2024: 0,
      },
      other_residential_property_value: {
        2024: 0,
      },
      owned_land: {
        2024: 0,
      },
      petrol_litres: {
        2024: null,
      },
      petrol_price: {
        2024: null,
      },
      petrol_spending: {
        2024: 0,
      },
      poverty_gap: {
        2024: null,
      },
      poverty_gap_ahc: {
        2024: null,
      },
      poverty_gap_bhc: {
        2024: null,
      },
      poverty_line: {
        2024: null,
      },
      poverty_line_ahc: {
        2024: null,
      },
      poverty_line_bhc: {
        2024: null,
      },
      poverty_threshold_bhc: {
        2024: null,
      },
      property_purchased: {
        2024: true,
      },
      property_wealth: {
        2024: null,
      },
      real_household_net_income: {
        2024: null,
      },
      recreation_consumption: {
        2024: 0,
      },
      reduced_rate_vat_consumption: {
        2024: null,
      },
      region: {
        2024: "LONDON",
      },
      rent: {
        2024: 0,
      },
      residential_property_value: {
        2024: null,
      },
      restaurants_and_hotels_consumption: {
        2024: 0,
      },
      sdlt_liable: {
        2024: null,
      },
      sdlt_on_non_residential_property_rent: {
        2024: null,
      },
      sdlt_on_non_residential_property_transactions: {
        2024: null,
      },
      sdlt_on_rent: {
        2024: null,
      },
      sdlt_on_residential_property_rent: {
        2024: null,
      },
      sdlt_on_residential_property_transactions: {
        2024: null,
      },
      sdlt_on_transactions: {
        2024: null,
      },
      shareholding: {
        2024: null,
      },
      spi_imputed: {
        2024: 0,
      },
      stamp_duty_land_tax: {
        2024: null,
      },
      tenure_type: {
        2024: "RENT_PRIVATELY",
      },
      total_wealth: {
        2024: null,
      },
      transport_consumption: {
        2024: 0,
      },
      tv_licence: {
        2024: null,
      },
      tv_licence_discount: {
        2024: null,
      },
      uc_migrated: {
        2024: 0,
      },
      vat: {
        2024: null,
      },
      vat_change: {
        2024: null,
      },
      water_and_sewerage_charges: {
        2024: 0,
      },
      wealth_tax: {
        2024: null,
      },
      winter_fuel_allowance: {
        2024: null,
      },
      would_evade_tv_licence_fee: {
        2024: null,
      },
    },
  },
  axes: [
    [
      {
        name: "employment_income",
        period: "2024",
        min: 0,
        max: 200000,
        count: 401,
      },
    ],
  ],
};
const DEFAULT_CA_HOUSEHOLD = {
  people: {
    you: {
      ab_income_tax_before_credits: {
        2024: null,
      },
      ab_income_tax_before_refundable_credits: {
        2024: null,
      },
      ab_taxable_income: {
        2024: null,
      },
      acfb_eligible_child: {
        2024: null,
      },
      adult_index: {
        2024: null,
      },
      adult_years_in_canada: {
        2024: 0,
      },
      age: {
        2024: 18,
      },
      age_amount_credit: {
        2024: null,
      },
      basic_personal_amount: {
        2024: null,
      },
      basic_personal_amount_supplement: {
        2024: null,
      },
      bc_age_credit: {
        2024: null,
      },
      bc_climate_action_incentive_category: {
        2024: null,
      },
      bc_climate_action_tax_credit_person: {
        2024: null,
      },
      bc_family_benefit_eligible_child: {
        2024: null,
      },
      bc_income_tax_before_credits: {
        2024: null,
      },
      bc_income_tax_before_refundable_credits: {
        2024: null,
      },
      bc_non_refundable_credits: {
        2024: null,
      },
      bc_tax_reduction_credit: {
        2024: null,
      },
      bc_taxable_income: {
        2024: null,
      },
      benefits_income: {
        2024: 0,
      },
      canadian_armed_forces_and_personnel_deduction: {
        2024: 0,
      },
      child_benefit_base_person: {
        2024: null,
      },
      child_benefit_eligible: {
        2024: null,
      },
      child_disability_benefit_eligible: {
        2024: null,
      },
      climate_action_incentive_category: {
        2024: null,
      },
      climate_action_incentive_person: {
        2024: null,
      },
      cwb_dependant: {
        2024: null,
      },
      cwb_disability_supplement_eligible: {
        2024: null,
      },
      deductions_from_total_to_net_income: {
        2024: 0,
      },
      dental_benefit: {
        2024: null,
      },
      dental_benefit_eligible: {
        2024: null,
      },
      dental_expenses: {
        2024: 0,
      },
      disability_tax_credit: {
        2024: null,
      },
      dtc_base: {
        2024: null,
      },
      dtc_child_supplement: {
        2024: null,
      },
      dtc_eligible: {
        2024: false,
      },
      employment_income: {
        2024: null,
      },
      full_custody: {
        2024: false,
      },
      gst_credit_category: {
        2024: null,
      },
      gst_credit_person: {
        2024: null,
      },
      has_private_dental_insurance: {
        2024: false,
      },
      income_tax_before_credits: {
        2024: null,
      },
      income_tax_before_refundable_credits: {
        2024: null,
      },
      individual_net_income: {
        2024: null,
      },
      investment_income: {
        2024: 0,
      },
      is_adult: {
        2024: null,
      },
      is_child: {
        2024: null,
      },
      is_child_for_bc_climate_action_tax_credit: {
        2024: null,
      },
      is_child_for_climate_action_incentive: {
        2024: null,
      },
      is_child_for_gst_credit: {
        2024: null,
      },
      is_child_for_on_child_care_fee_subsidy: {
        2024: null,
      },
      is_child_for_on_child_care_fee_subsidy_reduction: {
        2024: null,
      },
      is_dependant: {
        2024: null,
      },
      is_disabled: {
        2024: false,
      },
      is_eldest_child_for_bc_climate_action_tax_credit: {
        2024: null,
      },
      is_eldest_child_for_climate_action_incentive: {
        2024: null,
      },
      is_eldest_child_in_single_household_for_gst_credit: {
        2024: null,
      },
      is_emancipated: {
        2024: false,
      },
      is_father: {
        2024: null,
      },
      is_female: {
        2024: false,
      },
      is_head: {
        2024: false,
      },
      is_head_or_spouse: {
        2024: false,
      },
      is_male: {
        2024: null,
      },
      is_mother: {
        2024: null,
      },
      is_spouse: {
        2024: false,
      },
      marginal_tax_rate: {
        2024: null,
      },
      maternity_and_parental_benefit: {
        2024: 0,
      },
      mb_income_tax_before_credits: {
        2024: null,
      },
      mb_income_tax_before_refundable_credits: {
        2024: null,
      },
      mb_taxable_income: {
        2024: null,
      },
      nb_child_benefit_eligible_child: {
        2024: null,
      },
      nb_income_tax_before_credits: {
        2024: null,
      },
      nb_income_tax_before_refundable_credits: {
        2024: null,
      },
      nb_taxable_income: {
        2024: null,
      },
      nl_income_tax_before_credits: {
        2024: null,
      },
      nl_income_tax_before_refundable_credits: {
        2024: null,
      },
      nl_taxable_income: {
        2024: null,
      },
      noec_child: {
        2024: null,
      },
      non_refundable_tax_credits: {
        2024: null,
      },
      ns_income_tax_before_credits: {
        2024: null,
      },
      ns_income_tax_before_refundable_credits: {
        2024: null,
      },
      ns_low_income_tax_reduction_eligible_child: {
        2024: null,
      },
      ns_non_refundable_credits: {
        2024: null,
      },
      ns_taxable_income: {
        2024: null,
      },
      nt_income_tax_before_credits: {
        2024: null,
      },
      nt_income_tax_before_refundable_credits: {
        2024: null,
      },
      nt_taxable_income: {
        2024: null,
      },
      nu_child_benefit_eligible_child: {
        2024: null,
      },
      nu_cost_of_living_basic_credit: {
        2024: null,
      },
      nu_cost_of_living_credit: {
        2024: null,
      },
      nu_cost_of_living_credit_adjusted_net_income: {
        2024: null,
      },
      nu_cost_of_living_credit_supplement: {
        2024: null,
      },
      nu_income_tax_before_credits: {
        2024: null,
      },
      nu_income_tax_before_refundable_credits: {
        2024: null,
      },
      nu_non_refundable_credits: {
        2024: null,
      },
      nu_taxable_income: {
        2024: null,
      },
      oas_eligibility: {
        2024: null,
      },
      oas_net: {
        2024: null,
      },
      oas_pre_repayment: {
        2024: null,
      },
      oas_repayment: {
        2024: null,
      },
      oeptc_child: {
        2024: null,
      },
      on_income_tax_before_credits: {
        2024: null,
      },
      on_income_tax_before_refundable_credits: {
        2024: null,
      },
      on_low_income_workers_tax_credit: {
        2024: null,
      },
      on_low_income_workers_tax_credit_base: {
        2024: null,
      },
      on_low_income_workers_tax_credit_eligible: {
        2024: null,
      },
      on_low_income_workers_tax_credit_eligible_people: {
        2024: null,
      },
      on_non_refundable_credits: {
        2024: null,
      },
      on_senior_homeowners_property_tax_grant: {
        2024: null,
      },
      on_senior_homeowners_property_tax_grant_base: {
        2024: null,
      },
      on_senior_homeowners_property_tax_grant_reduction: {
        2024: null,
      },
      on_taxable_income: {
        2024: null,
      },
      own_children_in_household: {
        2024: 0,
      },
      pe_income_tax_before_credits: {
        2024: null,
      },
      pe_income_tax_before_refundable_credits: {
        2024: null,
      },
      pe_taxable_income: {
        2024: null,
      },
      pension_and_savings_plan_income: {
        2024: 0,
      },
      person_index: {
        2024: null,
      },
      prior_training_credits: {
        2024: 0,
      },
      property_tax: {
        2024: 0,
      },
      qc_cost_of_living_credit: {
        2024: null,
      },
      qc_income_tax_before_credits: {
        2024: null,
      },
      qc_income_tax_before_refundable_credits: {
        2024: null,
      },
      qc_taxable_income: {
        2024: null,
      },
      registered_disability_savings_plan_income: {
        2024: 0,
      },
      rent: {
        2024: 0,
      },
      school_supply_credit: {
        2024: null,
      },
      self_employment_income: {
        2024: 0,
      },
      sk_income_tax_before_credits: {
        2024: null,
      },
      sk_income_tax_before_refundable_credits: {
        2024: null,
      },
      sk_taxable_income: {
        2024: null,
      },
      teaching_supplies_expenses: {
        2024: 0,
      },
      total_individual_pre_tax_income: {
        2024: null,
      },
      training_credit: {
        2024: null,
      },
      training_credit_income: {
        2024: null,
      },
      tuition_expenses: {
        2024: 0,
      },
      universal_child_care_benefit: {
        2024: 0,
      },
      working_income: {
        2024: null,
      },
      yt_child_benefit_eligible_child: {
        2024: null,
      },
      yt_childrens_arts_credit_eligible_child: {
        2024: null,
      },
      yt_income_tax_before_credits: {
        2024: null,
      },
      yt_income_tax_before_refundable_credits: {
        2024: null,
      },
      yt_non_refundable_credits: {
        2024: null,
      },
      yt_taxable_income: {
        2024: null,
      },
    },
  },
  households: {
    "your household": {
      members: ["you"],
      AB: {
        2024: null,
      },
      BC: {
        2024: null,
      },
      MB: {
        2024: null,
      },
      NB: {
        2024: null,
      },
      NL: {
        2024: null,
      },
      NS: {
        2024: null,
      },
      NT: {
        2024: null,
      },
      NU: {
        2024: null,
      },
      ONT: {
        2024: null,
      },
      PE: {
        2024: null,
      },
      QC: {
        2024: null,
      },
      SK: {
        2024: null,
      },
      YT: {
        2024: null,
      },
      ab_benefits: {
        2024: null,
      },
      acfb_base_component: {
        2024: null,
      },
      acfb_base_component_base: {
        2024: null,
      },
      acfb_base_component_reduction: {
        2024: null,
      },
      acfb_eligible_children: {
        2024: null,
      },
      acfb_working_component: {
        2024: null,
      },
      acfb_working_component_base: {
        2024: null,
      },
      acfb_working_component_reduction: {
        2024: null,
      },
      additional_dental_benefit: {
        2024: 0,
      },
      adjusted_family_net_income: {
        2024: null,
      },
      alberta_child_and_family_benefit: {
        2024: null,
      },
      bc_benefits: {
        2024: null,
      },
      bc_climate_action_tax_credit: {
        2024: null,
      },
      bc_climate_action_tax_credit_base: {
        2024: null,
      },
      bc_climate_action_tax_credit_dependant_children: {
        2024: null,
      },
      bc_climate_action_tax_credit_single_parent_household: {
        2024: null,
      },
      bc_family_benefit: {
        2024: null,
      },
      bc_family_benefit_base: {
        2024: null,
      },
      bc_family_benefit_eligible_children: {
        2024: null,
      },
      bc_family_benefit_first_reduction: {
        2024: null,
      },
      bc_refundable_credits: {
        2024: null,
      },
      benefits: {
        2024: null,
      },
      canada_workers_benefit: {
        2024: null,
      },
      child_benefit: {
        2024: null,
      },
      child_benefit_base: {
        2024: null,
      },
      child_benefit_eligible_children: {
        2024: null,
      },
      child_benefit_reduction: {
        2024: null,
      },
      child_disability_benefit: {
        2024: null,
      },
      child_disability_benefit_children: {
        2024: null,
      },
      child_disability_benefit_reduction: {
        2024: null,
      },
      childcare_costs: {
        2024: 0,
      },
      childcare_received_days: {
        2024: 0,
      },
      childcare_received_hours_per_day: {
        2024: 0,
      },
      childrens_sport_and_culture_participation_costs: {
        2024: 0,
      },
      climate_action_incentive: {
        2024: null,
      },
      climate_action_incentive_dependant_children: {
        2024: null,
      },
      climate_action_incentive_pre_rural: {
        2024: null,
      },
      climate_action_incentive_single_parent_household: {
        2024: null,
      },
      count_children: {
        2024: 0,
      },
      cwb_base: {
        2024: null,
      },
      cwb_base_max_amount: {
        2024: null,
      },
      cwb_base_phase_in: {
        2024: null,
      },
      cwb_base_phase_out: {
        2024: null,
      },
      cwb_disability_category: {
        2024: null,
      },
      cwb_disability_supplement: {
        2024: null,
      },
      cwb_disability_supplement_max_amount: {
        2024: null,
      },
      cwb_disability_supplement_phase_in: {
        2024: null,
      },
      cwb_disability_supplement_phase_out: {
        2024: null,
      },
      cwb_eligible: {
        2024: null,
      },
      family_employment_income: {
        2024: null,
      },
      family_net_income: {
        2024: null,
      },
      family_working_income: {
        2024: null,
      },
      full_time_childcare: {
        2024: false,
      },
      gst_credit: {
        2024: null,
      },
      gst_credit_base: {
        2024: null,
      },
      gst_credit_dependant_children: {
        2024: null,
      },
      gst_credit_reduction: {
        2024: null,
      },
      gst_credit_single_parent_household: {
        2024: null,
      },
      gst_credit_singles_boost: {
        2024: null,
      },
      home_energy_costs_on_a_reserve: {
        2024: 0,
      },
      household_income_tax_before_refundable_credits: {
        2024: null,
      },
      household_market_income: {
        2024: null,
      },
      household_net_income: {
        2024: null,
      },
      household_refundable_tax_credits: {
        2024: null,
      },
      household_size: {
        2024: null,
      },
      income_tax: {
        2024: null,
      },
      is_cwb_family: {
        2024: null,
      },
      is_in_northern_ontario: {
        2024: false,
      },
      is_married: {
        2024: null,
      },
      lived_in_a_student_residence: {
        2024: false,
      },
      market_income: {
        2024: null,
      },
      nb_benefits: {
        2024: null,
      },
      nb_child_benefit: {
        2024: null,
      },
      nb_child_benefit_eligible_children: {
        2024: null,
      },
      nb_child_benefit_supplement: {
        2024: null,
      },
      nb_low_income_tax_reduction: {
        2024: null,
      },
      nb_low_income_tax_reduction_base: {
        2024: null,
      },
      noec_count_children: {
        2024: null,
      },
      northern_ontario_energy_credit: {
        2024: null,
      },
      ns_affordable_living_tax_credit: {
        2024: null,
      },
      ns_income_assistance: {
        2024: 0,
      },
      ns_low_income_tax_reduction: {
        2024: null,
      },
      ns_low_income_tax_reduction_base: {
        2024: null,
      },
      ns_low_income_tax_reduction_base_children: {
        2024: null,
      },
      ns_low_income_tax_reduction_eligible_children: {
        2024: null,
      },
      ns_low_income_tax_reduction_reduction: {
        2024: null,
      },
      ns_poverty_reduction_credit: {
        2024: null,
      },
      ns_refundable_credits: {
        2024: null,
      },
      nu_benefits: {
        2024: null,
      },
      nu_child_benefit: {
        2024: null,
      },
      nu_child_benefit_base_component: {
        2024: null,
      },
      nu_child_benefit_base_component_base: {
        2024: null,
      },
      nu_child_benefit_base_component_reduction: {
        2024: null,
      },
      nu_child_benefit_eligible_children: {
        2024: null,
      },
      nu_child_benefit_working_component: {
        2024: null,
      },
      oeptc: {
        2024: null,
      },
      oeptc_category: {
        2024: null,
      },
      oeptc_count_children: {
        2024: null,
      },
      oeptc_energy_component: {
        2024: null,
      },
      oeptc_occupancy_cost: {
        2024: null,
      },
      oeptc_property_tax_component: {
        2024: null,
      },
      oeptc_senior_status: {
        2024: null,
      },
      on_benefits: {
        2024: null,
      },
      on_child_benefit: {
        2024: null,
      },
      on_child_benefit_base: {
        2024: null,
      },
      on_child_benefit_reduction: {
        2024: null,
      },
      on_child_care_fee_subsidy: {
        2024: null,
      },
      on_child_care_fee_subsidy_children: {
        2024: null,
      },
      on_child_care_fee_subsidy_full_time: {
        2024: null,
      },
      on_child_care_fee_subsidy_part_time: {
        2024: null,
      },
      on_child_care_fee_subsidy_reduction: {
        2024: null,
      },
      on_child_care_fee_subsidy_reduction_children: {
        2024: null,
      },
      on_per_child_care_subsidy_costs: {
        2024: 0,
      },
      on_refundable_credits: {
        2024: null,
      },
      on_sales_tax_credit: {
        2024: null,
      },
      on_sales_tax_credit_base: {
        2024: null,
      },
      on_sales_tax_credit_reduction: {
        2024: null,
      },
      on_trillium_benefit: {
        2024: null,
      },
      oshptg_adjusted_oeptc: {
        2024: null,
      },
      province: {
        2024: "UNKNOWN",
      },
      province_code_str: {
        2024: null,
      },
      province_name: {
        2024: "ONT",
      },
      province_str: {
        2024: null,
      },
      refundable_tax_credits: {
        2024: null,
      },
      rent_paid_to_public_or_non_profit_long_term_care_home: {
        2024: 0,
      },
      sk_active_family_benefit: {
        2024: null,
      },
      sk_benefits: {
        2024: null,
      },
      yt_child_benefit: {
        2024: null,
      },
      yt_child_benefit_base: {
        2024: null,
      },
      yt_child_benefit_eligible_children: {
        2024: null,
      },
      yt_childrens_arts_credit: {
        2024: null,
      },
      yt_childrens_arts_credit_eligible_children: {
        2024: null,
      },
      yt_childrens_arts_credit_expenses: {
        2024: 0,
      },
    },
  },
  axes: [
    [
      {
        name: "employment_income",
        period: "2024",
        min: 0,
        max: 200000,
        count: 401,
      },
    ],
  ],
};

export const DEFAULT_COUNTRY_HOUSEHOULD_INPUTS = {
  uk: DEFAULT_UK_HOUSEHOLD,
  us: DEFAULT_US_HOUSEHOLD,
  ca: DEFAULT_CA_HOUSEHOLD,
};
