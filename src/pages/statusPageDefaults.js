import colors from "../style/colors";

export const COUNTRY_CODES = ["uk", "us", "ca", "ng"];

export const INITIAL_COUNTRY_STATUSES = {
  uk: "",
  us: "",
  ca: "",
  ng: "",
};

export const COUNTRY_NAMES = {
  uk: "United Kingdom",
  us: "United States",
  ca: "Canada",
  ng: "Nigeria",
};

export const STATUS_COLORS = {
  OK: colors.BLUE_98,
  ERROR: colors.DARK_RED,
  Pending: colors.LIGHT_GRAY,
};

export const STATUS_TEXT_COLORS = {
  OK: colors.BLUE,
  ERROR: colors.WHITE,
  Pending: colors.BLACK,
};

const DEFAULT_US_HOUSEHOLD = {
  families: {
    "your family": {
      family_id: {
        2023: 0,
      },
      family_weight: {
        2023: 0,
      },
      is_married: {
        2023: null,
      },
      members: ["you"],
    },
  },
  households: {
    "your household": {
      AK: {
        2023: null,
      },
      AL: {
        2023: null,
      },
      AR: {
        2023: null,
      },
      AZ: {
        2023: null,
      },
      CA: {
        2023: null,
      },
      CO: {
        2023: null,
      },
      CT: {
        2023: null,
      },
      DC: {
        2023: null,
      },
      DE: {
        2023: null,
      },
      FL: {
        2023: null,
      },
      GA: {
        2023: null,
      },
      HI: {
        2023: null,
      },
      IA: {
        2023: null,
      },
      ID: {
        2023: null,
      },
      IL: {
        2023: null,
      },
      IN: {
        2023: null,
      },
      KS: {
        2023: null,
      },
      KY: {
        2023: null,
      },
      LA: {
        2023: null,
      },
      MA: {
        2023: null,
      },
      MD: {
        2023: null,
      },
      ME: {
        2023: null,
      },
      MI: {
        2023: null,
      },
      MN: {
        2023: null,
      },
      MO: {
        2023: null,
      },
      MS: {
        2023: null,
      },
      MT: {
        2023: null,
      },
      NC: {
        2023: null,
      },
      ND: {
        2023: null,
      },
      NE: {
        2023: null,
      },
      NH: {
        2023: null,
      },
      NJ: {
        2023: null,
      },
      NM: {
        2023: null,
      },
      NV: {
        2023: null,
      },
      NY: {
        2023: null,
      },
      OH: {
        2023: null,
      },
      OK: {
        2023: null,
      },
      OR: {
        2023: null,
      },
      PA: {
        2023: null,
      },
      RI: {
        2023: null,
      },
      SC: {
        2023: null,
      },
      SD: {
        2023: null,
      },
      TN: {
        2023: null,
      },
      TX: {
        2023: null,
      },
      UT: {
        2023: null,
      },
      VA: {
        2023: null,
      },
      VT: {
        2023: null,
      },
      WA: {
        2023: null,
      },
      WI: {
        2023: null,
      },
      WV: {
        2023: null,
      },
      WY: {
        2023: null,
      },
      average_home_energy_use_in_state: {
        2023: 0,
      },
      ca_care: {
        2023: null,
      },
      ca_care_amount_if_eligible: {
        2023: null,
      },
      ca_care_categorically_eligible: {
        2023: null,
      },
      ca_care_eligible: {
        2023: null,
      },
      ca_care_income_eligible: {
        2023: null,
      },
      ca_care_poverty_line: {
        2023: null,
      },
      ca_fera: {
        2023: null,
      },
      ca_fera_amount_if_eligible: {
        2023: null,
      },
      ca_fera_eligible: {
        2023: null,
      },
      ccdf_county_cluster: {
        2023: null,
      },
      county: {
        2023: null,
      },
      county_fips: {
        2023: 0,
      },
      county_str: {
        2023: null,
      },
      current_home_energy_use: {
        2023: 0,
      },
      equiv_household_net_income: {
        2023: null,
      },
      fips: {
        2023: 6,
      },
      household_benefits: {
        2023: null,
      },
      household_count_people: {
        2023: null,
      },
      household_id: {
        2023: 0,
      },
      household_income_ami_ratio: {
        2023: 0,
      },
      household_income_decile: {
        2023: null,
      },
      household_market_income: {
        2023: null,
      },
      household_net_income: {
        2023: null,
      },
      household_refundable_tax_credits: {
        2023: null,
      },
      household_size: {
        2023: null,
      },
      household_tax: {
        2023: null,
      },
      household_tax_before_refundable_credits: {
        2023: null,
      },
      household_vehicles_owned: {
        2023: 0,
      },
      household_weight: {
        2023: 0,
      },
      in_nyc: {
        2023: false,
      },
      is_homeless: {
        2023: false,
      },
      is_on_tribal_land: {
        2023: false,
      },
      is_rural: {
        2023: false,
      },
      medicaid_rating_area: {
        2023: null,
      },
      members: ["you"],
      snap_region: {
        2023: null,
      },
      snap_region_str: {
        2023: null,
      },
      snap_utility_region: {
        2023: null,
      },
      snap_utility_region_str: {
        2023: null,
      },
      state_code: {
        2023: null,
      },
      state_code_str: {
        2023: null,
      },
      state_fips: {
        2023: 6,
      },
      state_group: {
        2023: null,
      },
      state_group_str: {
        2023: null,
      },
      state_living_arrangement: {
        2023: "FULL_COST",
      },
      state_name: {
        2023: "CA",
      },
      three_digit_zip_code: {
        2023: null,
      },
      zip_code: {
        2023: null,
      },
    },
  },
  marital_units: {
    "your marital unit": {
      marital_unit_id: {
        2023: 0,
      },
      marital_unit_weight: {
        2023: null,
      },
      members: ["you"],
    },
  },
  people: {
    you: {
      adult_index: {
        2023: null,
      },
      age: {
        2023: 40,
      },
      age_group: {
        2023: null,
      },
      alimony_expense: {
        2023: 0,
      },
      alimony_income: {
        2023: 0,
      },
      assessed_property_value: {
        2023: 0,
      },
      business_is_qualified: {
        2023: false,
      },
      business_is_sstb: {
        2023: false,
      },
      ca_cvrp: {
        2023: null,
      },
      ca_cvrp_vehicle_rebate_amount: {
        2023: 0,
      },
      ca_is_qualifying_child_for_caleitc: {
        2023: null,
      },
      capital_gains: {
        2023: null,
      },
      capital_loss: {
        2023: null,
      },
      casualty_loss: {
        2023: 0,
      },
      ccdf_age_group: {
        2023: null,
      },
      ccdf_duration_of_care: {
        2023: null,
      },
      ccdf_market_rate: {
        2023: null,
      },
      cdcc_qualified_dependent: {
        2023: null,
      },
      charitable_cash_donations: {
        2023: 0,
      },
      charitable_non_cash_donations: {
        2023: 0,
      },
      child_support_expense: {
        2023: 0,
      },
      child_support_received: {
        2023: 0,
      },
      childcare_days_per_week: {
        2023: 0,
      },
      childcare_hours_per_day: {
        2023: 0,
      },
      childcare_hours_per_week: {
        2023: null,
      },
      childcare_provider_type_group: {
        2023: "DCC_SACC",
      },
      claimed_ma_covid_19_essential_employee_premium_pay_program_2020: {
        2023: false,
      },
      cliff_evaluated: {
        2023: null,
      },
      cliff_gap: {
        2023: null,
      },
      cmbtp: {
        2023: 0,
      },
      count_days_postpartum: {
        2023: null,
      },
      cps_race: {
        2023: 0,
      },
      ctc_adult_individual_maximum: {
        2023: null,
      },
      ctc_child_individual_maximum: {
        2023: null,
      },
      ctc_child_individual_maximum_arpa: {
        2023: null,
      },
      ctc_individual_maximum: {
        2023: null,
      },
      ctc_qualifying_child: {
        2023: null,
      },
      debt_relief: {
        2023: 0,
      },
      disability_benefits: {
        2023: 0,
      },
      dividend_income: {
        2023: null,
      },
      e00200: {
        2023: null,
      },
      e00300: {
        2023: null,
      },
      e02300: {
        2023: 0,
      },
      e02400: {
        2023: null,
      },
      e87530: {
        2023: 0,
      },
      early_withdrawal_penalty: {
        2023: 0,
      },
      earned: {
        2023: null,
      },
      earned_income: {
        2023: null,
      },
      educator_expense: {
        2023: 0,
      },
      employee_medicare_tax: {
        2023: null,
      },
      employee_social_security_tax: {
        2023: null,
      },
      employment_income: {
        2023: null,
      },
      farm_income: {
        2023: 0,
      },
      farm_rent_income: {
        2023: 0,
      },
      general_assistance: {
        2023: 0,
      },
      gi_cash_assistance: {
        2023: 0,
      },
      has_disabled_spouse: {
        2023: null,
      },
      has_marketplace_health_coverage: {
        2023: true,
      },
      health_insurance_premiums: {
        2023: 0,
      },
      illicit_income: {
        2023: 0,
      },
      in_is_qualifying_dependent_child: {
        2023: null,
      },
      incapable_of_self_care: {
        2023: false,
      },
      income_decile: {
        2023: null,
      },
      interest_expense: {
        2023: 0,
      },
      interest_income: {
        2023: null,
      },
      ira_contributions: {
        2023: 0,
      },
      irs_gross_income: {
        2023: null,
      },
      is_adult: {
        2023: null,
      },
      is_adult_for_medicaid: {
        2023: null,
      },
      is_adult_for_medicaid_fc: {
        2023: null,
      },
      is_adult_for_medicaid_nfc: {
        2023: null,
      },
      is_blind: {
        2023: false,
      },
      is_breastfeeding: {
        2023: false,
      },
      is_ca_cvrp_increased_rebate_eligible: {
        2023: null,
      },
      is_ca_cvrp_normal_rebate_eligible: {
        2023: null,
      },
      is_ccdf_age_eligible: {
        2023: null,
      },
      is_ccdf_eligible: {
        2023: null,
      },
      is_ccdf_home_based: {
        2023: null,
      },
      is_ccdf_reason_for_care_eligible: {
        2023: null,
      },
      is_cdcc_eligible: {
        2023: null,
      },
      is_child: {
        2023: null,
      },
      is_child_of_tax_head: {
        2023: null,
      },
      is_citizen: {
        2023: false,
      },
      is_disabled: {
        2023: false,
      },
      is_eitc_qualifying_child: {
        2023: null,
      },
      is_eligible_for_american_opportunity_credit: {
        2023: false,
      },
      is_enrolled_in_ccdf: {
        2023: false,
      },
      is_father: {
        2023: null,
      },
      is_female: {
        2023: false,
      },
      is_full_time_college_student: {
        2023: false,
      },
      is_full_time_student: {
        2023: null,
      },
      is_fully_disabled_service_connected_veteran: {
        2023: false,
      },
      is_hispanic: {
        2023: false,
      },
      is_in_k12_nonpublic_school: {
        2023: false,
      },
      is_in_k12_school: {
        2023: null,
      },
      is_in_medicaid_medically_needy_category: {
        2023: null,
      },
      is_infant_for_medicaid: {
        2023: null,
      },
      is_infant_for_medicaid_fc: {
        2023: null,
      },
      is_infant_for_medicaid_nfc: {
        2023: null,
      },
      is_male: {
        2023: null,
      },
      is_medicaid_eligible: {
        2023: null,
      },
      is_medically_needy_for_medicaid: {
        2023: null,
      },
      is_mother: {
        2023: null,
      },
      is_older_child_for_medicaid: {
        2023: null,
      },
      is_older_child_for_medicaid_fc: {
        2023: null,
      },
      is_older_child_for_medicaid_nfc: {
        2023: null,
      },
      is_on_cliff: {
        2023: null,
      },
      is_optional_senior_or_disabled_for_medicaid: {
        2023: null,
      },
      is_parent_for_medicaid: {
        2023: null,
      },
      is_parent_for_medicaid_fc: {
        2023: null,
      },
      is_parent_for_medicaid_nfc: {
        2023: null,
      },
      is_permanently_and_totally_disabled: {
        2023: false,
      },
      is_permanently_disabled_veteran: {
        2023: false,
      },
      is_person_demographic_tanf_eligible: {
        2023: null,
      },
      is_pregnant: {
        2023: false,
      },
      is_pregnant_for_medicaid: {
        2023: null,
      },
      is_pregnant_for_medicaid_fc: {
        2023: null,
      },
      is_pregnant_for_medicaid_nfc: {
        2023: null,
      },
      is_retired: {
        2023: null,
      },
      is_self_employed: {
        2023: false,
      },
      is_senior: {
        2023: null,
      },
      is_severely_disabled: {
        2023: false,
      },
      is_ssi_aged: {
        2023: null,
      },
      is_ssi_aged_blind_disabled: {
        2023: null,
      },
      is_ssi_disabled: {
        2023: null,
      },
      is_ssi_eligible_individual: {
        2023: null,
      },
      is_ssi_eligible_spouse: {
        2023: null,
      },
      is_ssi_ineligible_child: {
        2023: null,
      },
      is_ssi_ineligible_parent: {
        2023: null,
      },
      is_ssi_ineligible_spouse: {
        2023: null,
      },
      is_ssi_recipient_for_medicaid: {
        2023: null,
      },
      is_surviving_child_of_disabled_veteran: {
        2023: false,
      },
      is_surviving_spouse_of_disabled_veteran: {
        2023: false,
      },
      is_tax_unit_dependent: {
        2023: null,
      },
      is_tax_unit_head: {
        2023: null,
      },
      is_tax_unit_spouse: {
        2023: null,
      },
      is_usda_disabled: {
        2023: null,
      },
      is_usda_elderly: {
        2023: null,
      },
      is_wa_adult: {
        2023: null,
      },
      is_wic_at_nutritional_risk: {
        2023: null,
      },
      is_young_adult_for_medicaid: {
        2023: null,
      },
      is_young_adult_for_medicaid_fc: {
        2023: null,
      },
      is_young_adult_for_medicaid_nfc: {
        2023: null,
      },
      is_young_child_for_medicaid: {
        2023: null,
      },
      is_young_child_for_medicaid_fc: {
        2023: null,
      },
      is_young_child_for_medicaid_nfc: {
        2023: null,
      },
      k1bx14: {
        2023: 0,
      },
      long_term_capital_gains: {
        2023: 0,
      },
      long_term_capital_gains_on_collectibles: {
        2023: 0,
      },
      long_term_capital_gains_on_small_business_stock: {
        2023: 0,
      },
      long_term_capital_losses: {
        2023: 0,
      },
      ma_covid_19_essential_employee_premium_pay_program: {
        2023: null,
      },
      marginal_tax_rate: {
        2023: null,
      },
      market_income: {
        2023: null,
      },
      maximum_state_supplement: {
        2023: null,
      },
      md_pension_subtraction_amount: {
        2023: null,
      },
      md_socsec_subtraction_amount: {
        2023: null,
      },
      medicaid: {
        2023: null,
      },
      medicaid_benefit_value: {
        2023: null,
      },
      medicaid_category: {
        2023: null,
      },
      medicaid_income_level: {
        2023: null,
      },
      medical_expense: {
        2023: null,
      },
      medical_out_of_pocket_expenses: {
        2023: 0,
      },
      meets_ssi_resource_test: {
        2023: null,
      },
      meets_wic_categorical_eligibility: {
        2023: null,
      },
      military_basic_pay: {
        2023: 0,
      },
      military_retirement_pay: {
        2023: 0,
      },
      military_service_income: {
        2023: 0,
      },
      miscellaneous_income: {
        2023: 0,
      },
      mo_adjusted_gross_income: {
        2023: null,
      },
      mo_income_tax_before_credits: {
        2023: null,
      },
      mo_income_tax_exempt: {
        2023: null,
      },
      mo_pension_and_ss_or_ssd_deduction_section_a: {
        2023: null,
      },
      mo_pension_and_ss_or_ssd_deduction_section_b: {
        2023: null,
      },
      mo_pension_and_ss_or_ssd_deduction_section_c: {
        2023: null,
      },
      mo_qualified_health_insurance_premiums: {
        2023: null,
      },
      mo_taxable_income: {
        2023: null,
      },
      net_income: {
        2023: 0,
      },
      non_qualified_dividend_income: {
        2023: 0,
      },
      non_sch_d_capital_gains: {
        2023: 0,
      },
      oh_has_not_taken_oh_lump_sum_credits: {
        2023: false,
      },
      own_children_in_household: {
        2023: 0,
      },
      pa_nontaxable_pension_income: {
        2023: null,
      },
      partnership_s_corp_income: {
        2023: 0,
      },
      payroll_tax_gross_wages: {
        2023: null,
      },
      pencon: {
        2023: 0,
      },
      pension_contributions: {
        2023: null,
      },
      pension_income: {
        2023: null,
      },
      people: {
        2023: 1,
      },
      per_vehicle_payment: {
        2023: null,
      },
      person_family_id: {
        2023: 0,
      },
      person_household_id: {
        2023: 0,
      },
      person_id: {
        2023: null,
      },
      person_in_poverty: {
        2023: null,
      },
      person_marital_unit_id: {
        2023: 0,
      },
      person_spm_unit_id: {
        2023: 0,
      },
      person_tax_unit_id: {
        2023: 0,
      },
      person_weight: {
        2023: null,
      },
      private_pension_income: {
        2023: null,
      },
      public_pension_income: {
        2023: null,
      },
      qbid_amount: {
        2023: null,
      },
      qualified_adoption_assistance_expense: {
        2023: 0,
      },
      qualified_business_income: {
        2023: null,
      },
      qualified_dividend_income: {
        2023: 0,
      },
      qualified_tuition_expenses: {
        2023: 0,
      },
      qualifies_for_elderly_or_disabled_credit: {
        2023: null,
      },
      race: {
        2023: null,
      },
      real_estate_taxes: {
        2023: 0,
      },
      receives_or_needs_protective_services: {
        2023: false,
      },
      receives_wic: {
        2023: false,
      },
      rent: {
        2023: 0,
      },
      rental_income: {
        2023: 0,
      },
      retired_on_total_disability: {
        2023: false,
      },
      salt_refund_income: {
        2023: 0,
      },
      self_employed_health_insurance_ald_person: {
        2023: null,
      },
      self_employed_health_insurance_premiums: {
        2023: null,
      },
      self_employed_pension_contribution_ald_person: {
        2023: null,
      },
      self_employed_pension_contributions: {
        2023: 0,
      },
      self_employment_income: {
        2023: 0,
      },
      self_employment_medicare_tax: {
        2023: null,
      },
      self_employment_social_security_tax: {
        2023: null,
      },
      self_employment_tax: {
        2023: null,
      },
      self_employment_tax_ald_person: {
        2023: null,
      },
      sep_simple_qualified_plan_contributions: {
        2023: 0,
      },
      sey: {
        2023: null,
      },
      short_term_capital_gains: {
        2023: 0,
      },
      short_term_capital_losses: {
        2023: 0,
      },
      social_security: {
        2023: null,
      },
      social_security_dependents: {
        2023: 0,
      },
      social_security_disability: {
        2023: 0,
      },
      social_security_retirement: {
        2023: 0,
      },
      social_security_survivors: {
        2023: 0,
      },
      social_security_taxable_self_employment_income: {
        2023: null,
      },
      ssi: {
        2023: null,
      },
      ssi_amount_if_eligible: {
        2023: null,
      },
      ssi_category: {
        2023: "NONE",
      },
      ssi_claim_is_joint: {
        2023: null,
      },
      ssi_countable_income: {
        2023: null,
      },
      ssi_countable_resources: {
        2023: 0,
      },
      ssi_earned_income: {
        2023: null,
      },
      ssi_earned_income_deemed_from_ineligible_spouse: {
        2023: null,
      },
      ssi_income_deemed_from_ineligible_spouse: {
        2023: null,
      },
      ssi_ineligible_child_allocation: {
        2023: null,
      },
      ssi_ineligible_parent_allocation: {
        2023: null,
      },
      ssi_reported: {
        2023: 0,
      },
      ssi_unearned_income: {
        2023: null,
      },
      ssi_unearned_income_deemed_from_ineligible_parent: {
        2023: null,
      },
      ssi_unearned_income_deemed_from_ineligible_spouse: {
        2023: null,
      },
      state_supplement: {
        2023: null,
      },
      strike_benefits: {
        2023: 0,
      },
      student_loan_interest: {
        2023: 0,
      },
      tanf_person: {
        2023: null,
      },
      tanf_reported: {
        2023: 0,
      },
      tax_exempt_interest_income: {
        2023: 0,
      },
      tax_exempt_pension_income: {
        2023: null,
      },
      tax_exempt_private_pension_income: {
        2023: 0,
      },
      tax_exempt_public_pension_income: {
        2023: 0,
      },
      tax_exempt_unemployment_compensation: {
        2023: null,
      },
      taxable_earnings_for_social_security: {
        2023: null,
      },
      taxable_interest_income: {
        2023: 0,
      },
      taxable_pension_income: {
        2023: null,
      },
      taxable_private_pension_income: {
        2023: 0,
      },
      taxable_public_pension_income: {
        2023: 0,
      },
      taxable_self_employment_income: {
        2023: null,
      },
      taxable_social_security: {
        2023: null,
      },
      taxable_unemployment_compensation: {
        2023: null,
      },
      total_disability_payments: {
        2023: 0,
      },
      total_income: {
        2023: 0,
      },
      unadjusted_basis_qualified_property: {
        2023: 0,
      },
      uncapped_ssi: {
        2023: null,
      },
      under_12_months_postpartum: {
        2023: false,
      },
      under_60_days_postpartum: {
        2023: false,
      },
      unemployment_compensation: {
        2023: 0,
      },
      us_bonds_for_higher_ed: {
        2023: 0,
      },
      vehicles_owned: {
        2023: null,
      },
      veterans_benefits: {
        2023: 0,
      },
      w2_wages_from_qualified_business: {
        2023: 0,
      },
      wic: {
        2023: null,
      },
      wic_category: {
        2023: null,
      },
      wic_category_str: {
        2023: null,
      },
      workers_compensation: {
        2023: 0,
      },
      would_claim_wic: {
        2023: null,
      },
    },
  },
  spm_units: {
    "your household": {
      acp: {
        2023: null,
      },
      ami: {
        2023: 0,
      },
      broadband_cost: {
        2023: 0,
      },
      broadband_cost_after_lifeline: {
        2023: null,
      },
      ccdf_income: {
        2023: null,
      },
      ccdf_income_to_smi_ratio: {
        2023: null,
      },
      childcare_expenses: {
        2023: 0,
      },
      co_tanf: {
        2023: null,
      },
      co_tanf_count_children: {
        2023: null,
      },
      co_tanf_countable_earned_income_grant_standard: {
        2023: null,
      },
      co_tanf_countable_earned_income_need: {
        2023: null,
      },
      co_tanf_countable_gross_earned_income: {
        2023: null,
      },
      co_tanf_countable_gross_unearned_income: {
        2023: null,
      },
      co_tanf_eligible: {
        2023: null,
      },
      co_tanf_grant_standard: {
        2023: null,
      },
      co_tanf_income_eligible: {
        2023: null,
      },
      co_tanf_need_standard: {
        2023: null,
      },
      count_distinct_utility_expenses: {
        2023: null,
      },
      dc_tanf: {
        2023: null,
      },
      dc_tanf_countable_earned_income: {
        2023: null,
      },
      dc_tanf_countable_gross_unearned_income: {
        2023: null,
      },
      dc_tanf_countable_income: {
        2023: null,
      },
      dc_tanf_countable_resources: {
        2023: 0,
      },
      dc_tanf_eligible: {
        2023: null,
      },
      dc_tanf_grant_standard: {
        2023: null,
      },
      dc_tanf_gross_earned_income: {
        2023: null,
      },
      dc_tanf_income_eligible: {
        2023: null,
      },
      dc_tanf_need_standard: {
        2023: null,
      },
      dc_tanf_resources_eligible: {
        2023: null,
      },
      deep_poverty_gap: {
        2023: null,
      },
      deep_poverty_line: {
        2023: null,
      },
      ebb: {
        2023: null,
      },
      electricity_expense: {
        2023: 0,
      },
      enrolled_in_ebb: {
        2023: false,
      },
      experienced_covid_income_loss: {
        2023: false,
      },
      fcc_fpg_ratio: {
        2023: null,
      },
      fdpir: {
        2023: 0,
      },
      free_school_meals: {
        2023: null,
      },
      free_school_meals_reported: {
        2023: 0,
      },
      gas_expense: {
        2023: 0,
      },
      has_all_usda_elderly_disabled: {
        2023: null,
      },
      has_heating_cooling_expense: {
        2023: null,
      },
      has_phone_expense: {
        2023: null,
      },
      has_usda_elderly_disabled: {
        2023: null,
      },
      heating_cooling_expense: {
        2023: 0,
      },
      hhs_smi: {
        2023: null,
      },
      housing_assistance: {
        2023: null,
      },
      housing_cost: {
        2023: null,
      },
      housing_designated_welfare: {
        2023: 0,
      },
      hud_adjusted_income: {
        2023: null,
      },
      hud_annual_income: {
        2023: null,
      },
      hud_gross_rent: {
        2023: null,
      },
      hud_hap: {
        2023: null,
      },
      hud_income_level: {
        2023: null,
      },
      hud_max_subsidy: {
        2023: null,
      },
      hud_minimum_rent: {
        2023: 0,
      },
      hud_ttp: {
        2023: null,
      },
      hud_ttp_adjusted_income_share: {
        2023: null,
      },
      hud_ttp_income_share: {
        2023: null,
      },
      hud_utility_allowance: {
        2023: 0,
      },
      in_deep_poverty: {
        2023: null,
      },
      in_poverty: {
        2023: null,
      },
      is_acp_eligible: {
        2023: null,
      },
      is_ccdf_asset_eligible: {
        2023: null,
      },
      is_ccdf_continuous_income_eligible: {
        2023: false,
      },
      is_ccdf_income_eligible: {
        2023: null,
      },
      is_ccdf_initial_income_eligible: {
        2023: false,
      },
      is_demographic_tanf_eligible: {
        2023: null,
      },
      is_ebb_eligible: {
        2023: null,
      },
      is_eligible_for_housing_assistance: {
        2023: null,
      },
      is_hud_elderly_disabled_family: {
        2023: null,
      },
      is_lifeline_eligible: {
        2023: null,
      },
      is_snap_eligible: {
        2023: null,
      },
      is_tanf_continuous_eligible: {
        2023: null,
      },
      is_tanf_eligible: {
        2023: null,
      },
      is_tanf_enrolled: {
        2023: false,
      },
      is_tanf_initial_eligible: {
        2023: null,
      },
      is_tanf_non_cash_eligible: {
        2023: null,
      },
      is_tanf_non_cash_hheod: {
        2023: null,
      },
      lifeline: {
        2023: null,
      },
      md_tanf_count_children: {
        2023: null,
      },
      md_tanf_eligible: {
        2023: false,
      },
      md_tanf_gross_earned_income_deduction: {
        2023: null,
      },
      md_tanf_maximum_benefit: {
        2023: null,
      },
      meets_ccdf_activity_test: {
        2023: false,
      },
      meets_school_meal_categorical_eligibility: {
        2023: null,
      },
      meets_snap_asset_test: {
        2023: null,
      },
      meets_snap_categorical_eligibility: {
        2023: null,
      },
      meets_snap_gross_income_test: {
        2023: null,
      },
      meets_snap_net_income_test: {
        2023: null,
      },
      meets_tanf_non_cash_asset_test: {
        2023: null,
      },
      meets_tanf_non_cash_gross_income_test: {
        2023: null,
      },
      meets_tanf_non_cash_net_income_test: {
        2023: null,
      },
      meets_wic_income_test: {
        2023: null,
      },
      members: ["you"],
      mo_tanf_income_limit: {
        2023: null,
      },
      nj_tanf_countable_gross_unearned_income: {
        2023: null,
      },
      nj_tanf_countable_resources: {
        2023: 0,
      },
      nj_tanf_gross_earned_income: {
        2023: null,
      },
      nj_tanf_maximum_allowable_income: {
        2023: null,
      },
      nj_tanf_maximum_benefit: {
        2023: null,
      },
      nj_tanf_resources_eligible: {
        2023: null,
      },
      ny_tanf: {
        2023: null,
      },
      ny_tanf_countable_earned_income: {
        2023: null,
      },
      ny_tanf_countable_gross_unearned_income: {
        2023: null,
      },
      ny_tanf_countable_resources: {
        2023: 0,
      },
      ny_tanf_eligible: {
        2023: null,
      },
      ny_tanf_grant_standard: {
        2023: null,
      },
      ny_tanf_gross_earned_income: {
        2023: null,
      },
      ny_tanf_income_eligible: {
        2023: null,
      },
      ny_tanf_need_standard: {
        2023: null,
      },
      ny_tanf_resources_eligible: {
        2023: null,
      },
      ok_tanf: {
        2023: 0,
      },
      pell_grant: {
        2023: 0,
      },
      pha_payment_standard: {
        2023: 0,
      },
      phone_cost: {
        2023: 0,
      },
      phone_expense: {
        2023: null,
      },
      poverty_gap: {
        2023: null,
      },
      poverty_line: {
        2023: null,
      },
      receives_housing_assistance: {
        2023: false,
      },
      reduced_price_school_meals: {
        2023: null,
      },
      school_meal_countable_income: {
        2023: null,
      },
      school_meal_daily_subsidy: {
        2023: null,
      },
      school_meal_fpg_ratio: {
        2023: null,
      },
      school_meal_net_subsidy: {
        2023: null,
      },
      school_meal_paid_daily_subsidy: {
        2023: null,
      },
      school_meal_tier: {
        2023: null,
      },
      sewage_expense: {
        2023: 0,
      },
      snap: {
        2023: null,
      },
      snap_assets: {
        2023: 0,
      },
      snap_child_support_deduction: {
        2023: null,
      },
      snap_deductions: {
        2023: null,
      },
      snap_dependent_care_deduction: {
        2023: null,
      },
      snap_earned_income: {
        2023: null,
      },
      snap_earned_income_deduction: {
        2023: null,
      },
      snap_emergency_allotment: {
        2023: null,
      },
      snap_excess_medical_expense_deduction: {
        2023: null,
      },
      snap_excess_shelter_expense_deduction: {
        2023: null,
      },
      snap_expected_contribution: {
        2023: null,
      },
      snap_gross_income: {
        2023: null,
      },
      snap_gross_income_fpg_ratio: {
        2023: null,
      },
      snap_max_allotment: {
        2023: null,
      },
      snap_min_allotment: {
        2023: null,
      },
      snap_net_income: {
        2023: null,
      },
      snap_net_income_fpg_ratio: {
        2023: null,
      },
      snap_net_income_pre_shelter: {
        2023: null,
      },
      snap_normal_allotment: {
        2023: null,
      },
      snap_reported: {
        2023: 0,
      },
      snap_standard_deduction: {
        2023: null,
      },
      snap_unearned_income: {
        2023: null,
      },
      snap_utility_allowance: {
        2023: null,
      },
      snap_utility_allowance_type: {
        2023: null,
      },
      spm_unit_assets: {
        2023: 0,
      },
      spm_unit_benefits: {
        2023: null,
      },
      spm_unit_capped_housing_subsidy: {
        2023: null,
      },
      spm_unit_capped_housing_subsidy_reported: {
        2023: 0,
      },
      spm_unit_capped_work_childcare_expenses: {
        2023: 0,
      },
      spm_unit_ccdf_subsidy: {
        2023: null,
      },
      spm_unit_count_adults: {
        2023: null,
      },
      spm_unit_count_children: {
        2023: null,
      },
      spm_unit_energy_subsidy: {
        2023: null,
      },
      spm_unit_energy_subsidy_reported: {
        2023: 0,
      },
      spm_unit_federal_tax: {
        2023: null,
      },
      spm_unit_federal_tax_reported: {
        2023: 0,
      },
      spm_unit_fpg: {
        2023: null,
      },
      spm_unit_id: {
        2023: 0,
      },
      spm_unit_income_decile: {
        2023: null,
      },
      spm_unit_is_in_deep_spm_poverty: {
        2023: null,
      },
      spm_unit_is_in_spm_poverty: {
        2023: null,
      },
      spm_unit_market_income: {
        2023: null,
      },
      spm_unit_medical_expenses: {
        2023: null,
      },
      spm_unit_net_income: {
        2023: null,
      },
      spm_unit_net_income_reported: {
        2023: 0,
      },
      spm_unit_oecd_equiv_net_income: {
        2023: null,
      },
      spm_unit_payroll_tax: {
        2023: null,
      },
      spm_unit_payroll_tax_reported: {
        2023: 0,
      },
      spm_unit_school_lunch_subsidy: {
        2023: 0,
      },
      spm_unit_self_employment_tax: {
        2023: null,
      },
      spm_unit_size: {
        2023: null,
      },
      spm_unit_snap: {
        2023: 0,
      },
      spm_unit_spm_threshold: {
        2023: 0,
      },
      spm_unit_state_fips: {
        2023: null,
      },
      spm_unit_state_tax: {
        2023: null,
      },
      spm_unit_state_tax_reported: {
        2023: 0,
      },
      spm_unit_taxes: {
        2023: null,
      },
      spm_unit_total_ccdf_copay: {
        2023: null,
      },
      spm_unit_total_income_reported: {
        2023: 0,
      },
      spm_unit_weight: {
        2023: null,
      },
      spm_unit_wic: {
        2023: null,
      },
      spm_unit_wic_reported: {
        2023: 0,
      },
      tanf: {
        2023: null,
      },
      tanf_amount_if_eligible: {
        2023: null,
      },
      tanf_countable_income: {
        2023: null,
      },
      tanf_gross_earned_income: {
        2023: null,
      },
      tanf_gross_unearned_income: {
        2023: null,
      },
      tanf_initial_employment_deduction: {
        2023: null,
      },
      tanf_max_amount: {
        2023: null,
      },
      trash_expense: {
        2023: 0,
      },
      tx_tanf_income_limit: {
        2023: null,
      },
      utility_expense: {
        2023: null,
      },
      wa_tanf_countable_resources: {
        2023: 0,
      },
      wa_tanf_resources_eligible: {
        2023: null,
      },
      water_expense: {
        2023: 0,
      },
      wic_fpg: {
        2023: null,
      },
    },
  },
  tax_units: {
    "your tax unit": {
      a_lineno: {
        2023: 0,
      },
      above_the_line_deductions: {
        2023: null,
      },
      additional_medicare_tax: {
        2023: null,
      },
      additional_standard_deduction: {
        2023: null,
      },
      adjusted_gross_income: {
        2023: null,
      },
      adjusted_net_capital_gain: {
        2023: null,
      },
      advanced_main_air_circulating_fan_expenditures: {
        2023: 0,
      },
      age_head: {
        2023: null,
      },
      age_spouse: {
        2023: null,
      },
      aged_blind_count: {
        2023: null,
      },
      aged_blind_extra_standard_deduction: {
        2023: null,
      },
      aged_head: {
        2023: null,
      },
      aged_spouse: {
        2023: null,
      },
      air_sealing_ventilation_expenditures: {
        2023: 0,
      },
      al_agi: {
        2023: 0,
      },
      al_dependent_exemption: {
        2023: null,
      },
      al_income_tax_before_credits: {
        2023: null,
      },
      al_personal_exemption: {
        2023: null,
      },
      al_standard_deduction: {
        2023: null,
      },
      al_taxable_income: {
        2023: 0,
      },
      alternative_minimum_tax: {
        2023: null,
      },
      american_opportunity_credit: {
        2023: null,
      },
      amt_form_completed: {
        2023: false,
      },
      amt_income: {
        2023: null,
      },
      amt_non_agi_income: {
        2023: 0,
      },
      az_standard_deduction: {
        2023: null,
      },
      basic_income: {
        2023: null,
      },
      basic_income_before_phase_out: {
        2023: null,
      },
      basic_income_eligible: {
        2023: null,
      },
      basic_income_phase_out: {
        2023: null,
      },
      basic_standard_deduction: {
        2023: null,
      },
      benefit_value_total: {
        2023: 0,
      },
      biomass_stove_boiler_expenditures: {
        2023: 0,
      },
      blind_head: {
        2023: null,
      },
      blind_spouse: {
        2023: null,
      },
      c01000: {
        2023: null,
      },
      c04600: {
        2023: null,
      },
      c05700: {
        2023: 0,
      },
      c07100: {
        2023: null,
      },
      c07200: {
        2023: null,
      },
      c07230: {
        2023: null,
      },
      c07240: {
        2023: 0,
      },
      c07260: {
        2023: 0,
      },
      c07300: {
        2023: 0,
      },
      c07400: {
        2023: 0,
      },
      c07600: {
        2023: 0,
      },
      c08000: {
        2023: 0,
      },
      c09600: {
        2023: null,
      },
      c10960: {
        2023: null,
      },
      c11070: {
        2023: null,
      },
      c23650: {
        2023: null,
      },
      c59660: {
        2023: null,
      },
      c62100: {
        2023: null,
      },
      c87668: {
        2023: null,
      },
      ca_agi: {
        2023: null,
      },
      ca_agi_additions: {
        2023: 0,
      },
      ca_agi_subtractions: {
        2023: null,
      },
      ca_cdcc: {
        2023: null,
      },
      ca_eitc: {
        2023: null,
      },
      ca_eitc_eligible: {
        2023: null,
      },
      ca_exemptions: {
        2023: null,
      },
      ca_income_tax: {
        2023: null,
      },
      ca_income_tax_before_credits: {
        2023: null,
      },
      ca_income_tax_before_refundable_credits: {
        2023: null,
      },
      ca_itemized_deductions: {
        2023: null,
      },
      ca_mental_health_services_tax: {
        2023: null,
      },
      ca_nonrefundable_credits: {
        2023: null,
      },
      ca_refundable_credits: {
        2023: null,
      },
      ca_renter_credit: {
        2023: null,
      },
      ca_standard_deduction: {
        2023: null,
      },
      ca_taxable_income: {
        2023: null,
      },
      ca_use_tax: {
        2023: null,
      },
      ca_yctc: {
        2023: null,
      },
      capital_gains_28_percent_rate_gain: {
        2023: null,
      },
      capital_gains_excluded_from_taxable_income: {
        2023: null,
      },
      capital_gains_tax: {
        2023: null,
      },
      capped_advanced_main_air_circulating_fan_credit: {
        2023: null,
      },
      capped_electric_heat_pump_clothes_dryer_rebate: {
        2023: null,
      },
      capped_electric_load_service_center_upgrade_rebate: {
        2023: null,
      },
      capped_electric_stove_cooktop_range_or_oven_rebate: {
        2023: null,
      },
      capped_electric_wiring_rebate: {
        2023: null,
      },
      capped_energy_efficient_central_air_conditioner_credit: {
        2023: null,
      },
      capped_energy_efficient_door_credit: {
        2023: null,
      },
      capped_energy_efficient_insulation_credit: {
        2023: null,
      },
      capped_energy_efficient_roof_credit: {
        2023: null,
      },
      capped_energy_efficient_window_credit: {
        2023: null,
      },
      capped_heat_pump_heat_pump_water_heater_biomass_stove_boiler_credit: {
        2023: null,
      },
      capped_heat_pump_rebate: {
        2023: null,
      },
      capped_heat_pump_water_heater_rebate: {
        2023: null,
      },
      capped_home_energy_audit_credit: {
        2023: null,
      },
      capped_insulation_air_sealing_ventilation_rebate: {
        2023: null,
      },
      capped_qualified_furnace_or_hot_water_boiler_credit: {
        2023: null,
      },
      care_deduction: {
        2023: 0,
      },
      casualty_loss_deduction: {
        2023: null,
      },
      cdcc: {
        2023: null,
      },
      cdcc_rate: {
        2023: null,
      },
      cdcc_relevant_expenses: {
        2023: null,
      },
      charitable_deduction: {
        2023: null,
      },
      charity_credit: {
        2023: 0,
      },
      co_eitc: {
        2023: null,
      },
      combined: {
        2023: null,
      },
      count_cdcc_eligible: {
        2023: null,
      },
      ctc: {
        2023: null,
      },
      ctc_arpa_addition: {
        2023: null,
      },
      ctc_arpa_max_addition: {
        2023: null,
      },
      ctc_arpa_phase_out: {
        2023: null,
      },
      ctc_arpa_phase_out_cap: {
        2023: null,
      },
      ctc_arpa_phase_out_threshold: {
        2023: null,
      },
      ctc_arpa_uncapped_phase_out: {
        2023: null,
      },
      ctc_limiting_tax_liability: {
        2023: null,
      },
      ctc_maximum: {
        2023: null,
      },
      ctc_maximum_with_arpa_addition: {
        2023: null,
      },
      ctc_new: {
        2023: 0,
      },
      ctc_phase_out: {
        2023: null,
      },
      ctc_phase_out_threshold: {
        2023: null,
      },
      ctc_qualifying_children: {
        2023: null,
      },
      ctc_refundable_maximum: {
        2023: null,
      },
      ctc_value: {
        2023: null,
      },
      data_source: {
        2023: false,
      },
      dc_eitc: {
        2023: null,
      },
      dc_eitc_with_qualifying_child: {
        2023: null,
      },
      dc_eitc_without_qualifying_child: {
        2023: null,
      },
      dc_standard_deduction: {
        2023: null,
      },
      disabled_head: {
        2023: null,
      },
      disabled_spouse: {
        2023: null,
      },
      domestic_production_ald: {
        2023: 0,
      },
      dsi: {
        2023: null,
      },
      dsi_spouse: {
        2023: null,
      },
      dwks10: {
        2023: null,
      },
      dwks13: {
        2023: null,
      },
      dwks14: {
        2023: null,
      },
      dwks19: {
        2023: null,
      },
      dwks6: {
        2023: null,
      },
      dwks9: {
        2023: null,
      },
      e07240: {
        2023: 0,
      },
      e07400: {
        2023: 0,
      },
      e07600: {
        2023: 0,
      },
      earned_income_tax_credit: {
        2023: null,
      },
      ecpa_adult_dependent_credit: {
        2023: null,
      },
      ecpa_filer_credit: {
        2023: null,
      },
      education_credit_phase_out: {
        2023: null,
      },
      education_tax_credits: {
        2023: null,
      },
      eitc: {
        2023: null,
      },
      eitc_agi_limit: {
        2023: null,
      },
      eitc_child_count: {
        2023: null,
      },
      eitc_eligible: {
        2023: null,
      },
      eitc_maximum: {
        2023: null,
      },
      eitc_phase_in_rate: {
        2023: null,
      },
      eitc_phase_out_rate: {
        2023: null,
      },
      eitc_phase_out_start: {
        2023: null,
      },
      eitc_phased_in: {
        2023: null,
      },
      eitc_reduction: {
        2023: null,
      },
      eitc_relevant_investment_income: {
        2023: null,
      },
      elderly_dependents: {
        2023: 0,
      },
      elderly_disabled_credit: {
        2023: null,
      },
      electric_heat_pump_clothes_dryer_expenditures: {
        2023: 0,
      },
      electric_load_service_center_upgrade_expenditures: {
        2023: 0,
      },
      electric_stove_cooktop_range_or_oven_expenditures: {
        2023: 0,
      },
      electric_wiring_expenditures: {
        2023: 0,
      },
      employee_payroll_tax: {
        2023: null,
      },
      energy_efficient_central_air_conditioner_expenditures: {
        2023: 0,
      },
      energy_efficient_door_expenditures: {
        2023: 0,
      },
      energy_efficient_home_improvement_credit: {
        2023: null,
      },
      energy_efficient_insulation_expenditures: {
        2023: 0,
      },
      energy_efficient_roof_expenditures: {
        2023: 0,
      },
      energy_efficient_window_expenditures: {
        2023: 0,
      },
      excess_payroll_tax_withheld: {
        2023: 0,
      },
      exemption_phase_out_start: {
        2023: null,
      },
      exemptions: {
        2023: null,
      },
      f2441: {
        2023: null,
      },
      f6251: {
        2023: false,
      },
      federal_eitc_without_age_minimum: {
        2023: null,
      },
      federal_state_income_tax: {
        2023: null,
      },
      ffpos: {
        2023: 0,
      },
      filer_cmbtp: {
        2023: null,
      },
      filer_e00200: {
        2023: null,
      },
      filer_e00300: {
        2023: null,
      },
      filer_e02300: {
        2023: null,
      },
      filer_e18400: {
        2023: null,
      },
      filer_earned: {
        2023: null,
      },
      filer_k1bx14: {
        2023: null,
      },
      filer_pencon: {
        2023: null,
      },
      filer_sey: {
        2023: null,
      },
      filing_status: {
        2023: null,
      },
      flat_tax: {
        2023: null,
      },
      foreign_earned_income_exclusion: {
        2023: 0,
      },
      foreign_tax_credit: {
        2023: 0,
      },
      fstax: {
        2023: 0,
      },
      fuel_cell_property_capacity: {
        2023: 0,
      },
      fuel_cell_property_expenditures: {
        2023: 0,
      },
      geothermal_heat_pump_property_expenditures: {
        2023: 0,
      },
      h_seq: {
        2023: 0,
      },
      hasqdivltcg: {
        2023: null,
      },
      head_earned: {
        2023: null,
      },
      head_is_disabled: {
        2023: null,
      },
      head_spouse_count: {
        2023: null,
      },
      health_savings_account_ald: {
        2023: 0,
      },
      heat_pump_expenditures: {
        2023: 0,
      },
      heat_pump_water_heater_expenditures: {
        2023: 0,
      },
      hi_agi: {
        2023: 0,
      },
      hi_income_tax_before_credits: {
        2023: null,
      },
      hi_standard_deduction: {
        2023: null,
      },
      hi_taxable_income: {
        2023: 0,
      },
      high_efficiency_electric_home_rebate: {
        2023: null,
      },
      high_efficiency_electric_home_rebate_percent_covered: {
        2023: null,
      },
      home_energy_audit_expenditures: {
        2023: 0,
      },
      iitax: {
        2023: null,
      },
      il_aged_blind_exemption: {
        2023: null,
      },
      il_base_income: {
        2023: null,
      },
      il_base_income_additions: {
        2023: null,
      },
      il_base_income_subtractions: {
        2023: null,
      },
      il_dependent_exemption: {
        2023: null,
      },
      il_eitc: {
        2023: null,
      },
      il_income_tax: {
        2023: null,
      },
      il_income_tax_before_nonrefundable_credits: {
        2023: null,
      },
      il_income_tax_before_refundable_credits: {
        2023: null,
      },
      il_is_exemption_eligible: {
        2023: null,
      },
      il_k12_education_expense_credit: {
        2023: null,
      },
      il_nonrefundable_credits: {
        2023: null,
      },
      il_pass_through_entity_tax_credit: {
        2023: 0,
      },
      il_pass_through_withholding: {
        2023: 0,
      },
      il_personal_exemption: {
        2023: null,
      },
      il_personal_exemption_eligibility_status: {
        2023: null,
      },
      il_property_tax_credit: {
        2023: null,
      },
      il_refundable_credits: {
        2023: null,
      },
      il_schedule_m_additions: {
        2023: 0,
      },
      il_schedule_m_subtractions: {
        2023: 0,
      },
      il_taxable_income: {
        2023: null,
      },
      il_total_exemptions: {
        2023: null,
      },
      il_total_tax: {
        2023: null,
      },
      il_use_tax: {
        2023: null,
      },
      in_add_backs: {
        2023: null,
      },
      in_additional_exemptions: {
        2023: null,
      },
      in_aged_blind_exemptions: {
        2023: null,
      },
      in_aged_low_agi_exemptions: {
        2023: null,
      },
      in_agi: {
        2023: null,
      },
      in_agi_tax: {
        2023: null,
      },
      in_base_exemptions: {
        2023: null,
      },
      in_bonus_depreciation_add_back: {
        2023: 0,
      },
      in_deductions: {
        2023: null,
      },
      in_exemptions: {
        2023: null,
      },
      in_homeowners_property_tax: {
        2023: 0,
      },
      in_homeowners_property_tax_deduction: {
        2023: null,
      },
      in_military_service_deduction: {
        2023: null,
      },
      in_nol: {
        2023: 0,
      },
      in_nol_add_back: {
        2023: 0,
      },
      in_nonpublic_school_deduction: {
        2023: null,
      },
      in_oos_municipal_obligation_interest_add_back: {
        2023: 0,
      },
      in_other_add_backs: {
        2023: 0,
      },
      in_other_deductions: {
        2023: 0,
      },
      in_other_taxes: {
        2023: 0,
      },
      in_qualifying_child_count: {
        2023: null,
      },
      in_renters_deduction: {
        2023: null,
      },
      in_section_179_expense_add_back: {
        2023: 0,
      },
      in_tax_add_back: {
        2023: 0,
      },
      in_unemployment_compensation_deduction: {
        2023: null,
      },
      income_tax: {
        2023: null,
      },
      income_tax_before_credits: {
        2023: null,
      },
      income_tax_before_refundable_credits: {
        2023: null,
      },
      income_tax_capped_non_refundable_credits: {
        2023: null,
      },
      income_tax_main_rates: {
        2023: null,
      },
      income_tax_non_refundable_credits: {
        2023: null,
      },
      income_tax_refundable_credits: {
        2023: null,
      },
      income_tax_unavailable_non_refundable_credits: {
        2023: null,
      },
      interest_deduction: {
        2023: null,
      },
      investment_in_529_plan: {
        2023: 0,
      },
      investment_income_form_4952: {
        2023: 0,
      },
      is_eligible_md_poverty_line_credit: {
        2023: null,
      },
      is_ma_income_tax_exempt: {
        2023: null,
      },
      is_ptc_eligible: {
        2023: null,
      },
      itemized_taxable_income_deductions: {
        2023: null,
      },
      k12_tuition_and_fees: {
        2023: 0,
      },
      ks_agi: {
        2023: null,
      },
      ks_agi_additions: {
        2023: 0,
      },
      ks_agi_subtractions: {
        2023: null,
      },
      ks_cdcc: {
        2023: null,
      },
      ks_count_exemptions: {
        2023: null,
      },
      ks_exemptions: {
        2023: null,
      },
      ks_fstc: {
        2023: null,
      },
      ks_income_tax: {
        2023: null,
      },
      ks_income_tax_before_credits: {
        2023: null,
      },
      ks_income_tax_before_refundable_credits: {
        2023: null,
      },
      ks_itemized_deductions: {
        2023: null,
      },
      ks_nonrefundable_credits: {
        2023: null,
      },
      ks_nonrefundable_eitc: {
        2023: null,
      },
      ks_refundable_credits: {
        2023: null,
      },
      ks_refundable_eitc: {
        2023: null,
      },
      ks_standard_deduction: {
        2023: null,
      },
      ks_taxable_income: {
        2023: null,
      },
      ks_total_eitc: {
        2023: null,
      },
      lifetime_learning_credit: {
        2023: null,
      },
      local_income_tax: {
        2023: null,
      },
      local_sales_tax: {
        2023: 0,
      },
      loss_ald: {
        2023: null,
      },
      ma_agi: {
        2023: null,
      },
      ma_dependent_care_credit: {
        2023: null,
      },
      ma_dependent_credit: {
        2023: null,
      },
      ma_dependent_or_dependent_care_credit: {
        2023: null,
      },
      ma_eitc: {
        2023: null,
      },
      ma_gross_income: {
        2023: null,
      },
      ma_income_tax: {
        2023: null,
      },
      ma_income_tax_before_credits: {
        2023: null,
      },
      ma_income_tax_before_refundable_credits: {
        2023: null,
      },
      ma_income_tax_exemption_threshold: {
        2023: null,
      },
      ma_limited_income_tax_credit: {
        2023: null,
      },
      ma_non_refundable_credits: {
        2023: null,
      },
      ma_part_a_agi: {
        2023: null,
      },
      ma_part_a_cg_excess_exemption: {
        2023: null,
      },
      ma_part_a_div_excess_exemption: {
        2023: null,
      },
      ma_part_a_gross_income: {
        2023: null,
      },
      ma_part_a_taxable_capital_gains_income: {
        2023: null,
      },
      ma_part_a_taxable_dividend_income: {
        2023: null,
      },
      ma_part_a_taxable_income: {
        2023: null,
      },
      ma_part_b_agi: {
        2023: null,
      },
      ma_part_b_excess_exemption: {
        2023: null,
      },
      ma_part_b_gross_income: {
        2023: null,
      },
      ma_part_b_taxable_income: {
        2023: null,
      },
      ma_part_b_taxable_income_before_exemption: {
        2023: null,
      },
      ma_part_b_taxable_income_deductions: {
        2023: null,
      },
      ma_part_b_taxable_income_exemption: {
        2023: null,
      },
      ma_part_c_agi: {
        2023: null,
      },
      ma_part_c_gross_income: {
        2023: null,
      },
      ma_part_c_taxable_income: {
        2023: null,
      },
      ma_refundable_credits: {
        2023: null,
      },
      ma_scb_total_income: {
        2023: null,
      },
      ma_senior_circuit_breaker: {
        2023: null,
      },
      mars: {
        2023: null,
      },
      maximum_capital_loss: {
        2023: null,
      },
      md_aged_blind_exemptions: {
        2023: null,
      },
      md_aged_dependent_exemption: {
        2023: null,
      },
      md_aged_exemption: {
        2023: null,
      },
      md_agi: {
        2023: null,
      },
      md_blind_exemption: {
        2023: null,
      },
      md_cdcc: {
        2023: null,
      },
      md_ctc: {
        2023: null,
      },
      md_deductions: {
        2023: null,
      },
      md_dependent_care_subtraction: {
        2023: null,
      },
      md_eitc: {
        2023: null,
      },
      md_exemptions: {
        2023: null,
      },
      md_income_tax: {
        2023: null,
      },
      md_income_tax_before_credits: {
        2023: null,
      },
      md_income_tax_before_refundable_credits: {
        2023: null,
      },
      md_local_income_tax_before_credits: {
        2023: null,
      },
      md_non_refundable_credits: {
        2023: null,
      },
      md_non_refundable_eitc: {
        2023: null,
      },
      md_non_single_childless_non_refundable_eitc: {
        2023: null,
      },
      md_non_single_childless_refundable_eitc: {
        2023: null,
      },
      md_pension_subtraction: {
        2023: null,
      },
      md_personal_exemption: {
        2023: null,
      },
      md_poverty_line_credit: {
        2023: null,
      },
      md_qualifies_for_single_childless_eitc: {
        2023: null,
      },
      md_refundable_cdcc: {
        2023: null,
      },
      md_refundable_credits: {
        2023: null,
      },
      md_refundable_eitc: {
        2023: null,
      },
      md_single_childless_eitc: {
        2023: null,
      },
      md_socsec_subtraction: {
        2023: null,
      },
      md_standard_deduction: {
        2023: null,
      },
      md_tax_unit_earned_income: {
        2023: null,
      },
      md_taxable_income: {
        2023: null,
      },
      md_total_additions: {
        2023: 0,
      },
      md_total_personal_exemptions: {
        2023: null,
      },
      md_total_subtractions: {
        2023: null,
      },
      md_two_income_subtraction: {
        2023: null,
      },
      me_agi: {
        2023: null,
      },
      me_agi_additions: {
        2023: 0,
      },
      me_agi_subtractions: {
        2023: null,
      },
      me_child_care_credit: {
        2023: null,
      },
      me_deduction: {
        2023: null,
      },
      me_deductions: {
        2023: 0,
      },
      me_dependent_exemption: {
        2023: null,
      },
      me_eitc: {
        2023: null,
      },
      me_exemptions: {
        2023: null,
      },
      me_income_tax_before_credits: {
        2023: null,
      },
      me_itemized_deductions: {
        2023: 0,
      },
      me_non_refundable_child_care_credit: {
        2023: null,
      },
      me_pension_income_deduction: {
        2023: null,
      },
      me_personal_exemption_deduction: {
        2023: null,
      },
      me_refundable_child_care_credit: {
        2023: null,
      },
      me_standard_deduction: {
        2023: null,
      },
      me_step_4_share_of_child_care_expenses: {
        2023: 0,
      },
      me_taxable_income: {
        2023: null,
      },
      medicaid_income: {
        2023: null,
      },
      medical_expense_deduction: {
        2023: null,
      },
      members: ["you"],
      military_disabled_head: {
        2023: null,
      },
      military_disabled_spouse: {
        2023: null,
      },
      min_head_spouse_earned: {
        2023: null,
      },
      misc_deduction: {
        2023: 0,
      },
      mn_additions: {
        2023: null,
      },
      mn_amt: {
        2023: null,
      },
      mn_amt_taxable_income: {
        2023: null,
      },
      mn_basic_tax: {
        2023: null,
      },
      mn_cdcc: {
        2023: null,
      },
      mn_charity_subtraction: {
        2023: null,
      },
      mn_deductions: {
        2023: null,
      },
      mn_elderly_disabled_subtraction: {
        2023: null,
      },
      mn_exemptions: {
        2023: null,
      },
      mn_income_tax: {
        2023: null,
      },
      mn_income_tax_before_credits: {
        2023: null,
      },
      mn_income_tax_before_refundable_credits: {
        2023: null,
      },
      mn_itemized_deductions: {
        2023: null,
      },
      mn_itemizing: {
        2023: null,
      },
      mn_marriage_credit: {
        2023: null,
      },
      mn_nonrefundable_credits: {
        2023: null,
      },
      mn_refundable_credits: {
        2023: null,
      },
      mn_social_security_subtraction: {
        2023: null,
      },
      mn_standard_deduction: {
        2023: null,
      },
      mn_subtractions: {
        2023: null,
      },
      mn_taxable_income: {
        2023: null,
      },
      mn_wfc: {
        2023: null,
      },
      mn_wfc_eligible: {
        2023: null,
      },
      mo_federal_income_tax_deduction: {
        2023: null,
      },
      mo_income_tax: {
        2023: null,
      },
      mo_income_tax_before_refundable_credits: {
        2023: null,
      },
      mo_itemized_deductions: {
        2023: null,
      },
      mo_net_state_income_taxes: {
        2023: null,
      },
      mo_non_refundable_credits: {
        2023: null,
      },
      mo_pension_and_ss_or_ssd_deduction: {
        2023: null,
      },
      mo_property_tax_credit: {
        2023: null,
      },
      mo_ptc_gross_income: {
        2023: null,
      },
      mo_ptc_income_offset: {
        2023: null,
      },
      mo_ptc_net_income: {
        2023: null,
      },
      mo_ptc_taxunit_eligible: {
        2023: null,
      },
      mo_refundable_credits: {
        2023: null,
      },
      mo_wftc: {
        2023: null,
      },
      ms_dependents_exemption: {
        2023: null,
      },
      ms_regular_exemption: {
        2023: null,
      },
      n1820: {
        2023: 0,
      },
      n21: {
        2023: 0,
      },
      n24: {
        2023: 0,
      },
      nd_additions: {
        2023: null,
      },
      nd_income_tax: {
        2023: null,
      },
      nd_income_tax_before_credits: {
        2023: null,
      },
      nd_income_tax_before_refundable_credits: {
        2023: null,
      },
      nd_ltcg_subtraction: {
        2023: null,
      },
      nd_mpc: {
        2023: null,
      },
      nd_nonrefundable_credits: {
        2023: null,
      },
      nd_qdiv_subtraction: {
        2023: null,
      },
      nd_refundable_credits: {
        2023: 0,
      },
      nd_rtrc: {
        2023: null,
      },
      nd_subtractions: {
        2023: null,
      },
      nd_taxable_income: {
        2023: null,
      },
      ne_agi: {
        2023: null,
      },
      ne_agi_additions: {
        2023: 0,
      },
      ne_agi_subtractions: {
        2023: null,
      },
      ne_cdcc_nonrefundable: {
        2023: null,
      },
      ne_cdcc_refundable: {
        2023: null,
      },
      ne_eitc: {
        2023: null,
      },
      ne_elderly_disabled_credit: {
        2023: null,
      },
      ne_exemptions: {
        2023: null,
      },
      ne_income_tax: {
        2023: null,
      },
      ne_income_tax_before_credits: {
        2023: null,
      },
      ne_income_tax_before_refundable_credits: {
        2023: null,
      },
      ne_itemized_deductions: {
        2023: null,
      },
      ne_nonrefundable_credits: {
        2023: null,
      },
      ne_refundable_credits: {
        2023: null,
      },
      ne_standard_deduction: {
        2023: null,
      },
      ne_taxable_income: {
        2023: null,
      },
      net_capital_gain: {
        2023: null,
      },
      net_investment_income: {
        2023: null,
      },
      net_investment_income_tax: {
        2023: null,
      },
      net_long_term_capital_gain: {
        2023: null,
      },
      net_long_term_capital_loss: {
        2023: null,
      },
      net_short_term_capital_gain: {
        2023: null,
      },
      net_short_term_capital_loss: {
        2023: null,
      },
      new_clean_vehicle_battery_capacity: {
        2023: 0,
      },
      new_clean_vehicle_battery_components_made_in_north_america: {
        2023: 0,
      },
      new_clean_vehicle_battery_critical_minerals_extracted_in_trading_partner_country:
        {
          2023: 0,
        },
      new_clean_vehicle_classification: {
        2023: "OTHER",
      },
      new_clean_vehicle_credit: {
        2023: null,
      },
      new_clean_vehicle_credit_eligible: {
        2023: null,
      },
      new_clean_vehicle_msrp: {
        2023: 0,
      },
      nj_agi: {
        2023: null,
      },
      nj_agi_additions: {
        2023: 0,
      },
      nj_agi_subtractions: {
        2023: 0,
      },
      nj_blind_or_disabled_exemption: {
        2023: null,
      },
      nj_cdcc: {
        2023: null,
      },
      nj_child_tax_credit: {
        2023: null,
      },
      nj_childless_eitc_age_eligible: {
        2023: null,
      },
      nj_dependents_attending_college_exemption: {
        2023: null,
      },
      nj_dependents_exemption: {
        2023: null,
      },
      nj_eitc: {
        2023: null,
      },
      nj_eitc_income_eligible: {
        2023: null,
      },
      nj_income_tax: {
        2023: null,
      },
      nj_income_tax_before_refundable_credits: {
        2023: 0,
      },
      nj_main_income_tax: {
        2023: null,
      },
      nj_refundable_credits: {
        2023: 0,
      },
      nj_regular_exemption: {
        2023: null,
      },
      nj_senior_exemption: {
        2023: null,
      },
      nj_taxable_income: {
        2023: null,
      },
      nj_total_deductions: {
        2023: 0,
      },
      nj_total_exemptions: {
        2023: null,
      },
      no_salt_income_tax: {
        2023: null,
      },
      non_refundable_american_opportunity_credit: {
        2023: null,
      },
      non_refundable_ctc: {
        2023: null,
      },
      nu06: {
        2023: 0,
      },
      nu13: {
        2023: 0,
      },
      nu18: {
        2023: 0,
      },
      num: {
        2023: null,
      },
      ny_agi: {
        2023: null,
      },
      ny_agi_additions: {
        2023: 0,
      },
      ny_agi_subtractions: {
        2023: null,
      },
      ny_cdcc: {
        2023: null,
      },
      ny_cdcc_max: {
        2023: null,
      },
      ny_cdcc_rate: {
        2023: null,
      },
      ny_college_tuition_credit: {
        2023: null,
      },
      ny_ctc: {
        2023: null,
      },
      ny_deductions: {
        2023: null,
      },
      ny_eitc: {
        2023: null,
      },
      ny_exemptions: {
        2023: null,
      },
      ny_household_credit: {
        2023: null,
      },
      ny_income_tax: {
        2023: null,
      },
      ny_income_tax_before_credits: {
        2023: null,
      },
      ny_income_tax_before_refundable_credits: {
        2023: null,
      },
      ny_itemized_deductions: {
        2023: null,
      },
      ny_itemized_deductions_max: {
        2023: null,
      },
      ny_itemized_deductions_reduction: {
        2023: 0,
      },
      ny_itemizes: {
        2023: null,
      },
      ny_main_income_tax: {
        2023: null,
      },
      ny_non_refundable_credits: {
        2023: null,
      },
      ny_real_property_tax_credit: {
        2023: null,
      },
      ny_refundable_credits: {
        2023: null,
      },
      ny_standard_deduction: {
        2023: null,
      },
      ny_supplemental_eitc: {
        2023: null,
      },
      ny_supplemental_tax: {
        2023: null,
      },
      ny_taxable_income: {
        2023: null,
      },
      nyc_cdcc: {
        2023: null,
      },
      nyc_cdcc_age_restricted_expenses: {
        2023: null,
      },
      nyc_cdcc_applicable_percentage: {
        2023: null,
      },
      nyc_cdcc_eligible: {
        2023: null,
      },
      nyc_cdcc_share_qualifying_childcare_expenses: {
        2023: null,
      },
      nyc_eitc: {
        2023: null,
      },
      nyc_household_credit: {
        2023: null,
      },
      nyc_income_tax: {
        2023: null,
      },
      nyc_income_tax_before_credits: {
        2023: null,
      },
      nyc_income_tax_before_refundable_credits: {
        2023: null,
      },
      nyc_non_refundable_credits: {
        2023: null,
      },
      nyc_refundable_credits: {
        2023: null,
      },
      nyc_school_credit_income: {
        2023: null,
      },
      nyc_school_tax_credit_fixed_amount: {
        2023: null,
      },
      nyc_school_tax_credit_rate_reduction_amount: {
        2023: null,
      },
      nyc_taxable_income: {
        2023: null,
      },
      nyc_unincorporated_business_credit: {
        2023: 0,
      },
      oh_agi: {
        2023: null,
      },
      oh_bonus_depreciation_add_back: {
        2023: 0,
      },
      oh_federal_conformity_deductions: {
        2023: 0,
      },
      oh_income_tax_before_credits: {
        2023: null,
      },
      oh_income_tax_exempt: {
        2023: null,
      },
      oh_other_add_backs: {
        2023: 0,
      },
      oh_section_179_expense_add_back: {
        2023: 0,
      },
      oh_taxable_income: {
        2023: 0,
      },
      oh_uniformed_services_retirement_income_deduction: {
        2023: 0,
      },
      ok_adjustments: {
        2023: 0,
      },
      ok_agi: {
        2023: null,
      },
      ok_agi_additions: {
        2023: 0,
      },
      ok_agi_subtractions: {
        2023: null,
      },
      ok_child_care_child_tax_credit: {
        2023: null,
      },
      ok_count_exemptions: {
        2023: null,
      },
      ok_eitc: {
        2023: null,
      },
      ok_exemptions: {
        2023: null,
      },
      ok_gross_income: {
        2023: null,
      },
      ok_income_tax: {
        2023: null,
      },
      ok_income_tax_before_credits: {
        2023: null,
      },
      ok_income_tax_before_refundable_credits: {
        2023: null,
      },
      ok_itemized_deductions: {
        2023: null,
      },
      ok_nonrefundable_credits: {
        2023: null,
      },
      ok_ptc: {
        2023: null,
      },
      ok_refundable_credits: {
        2023: null,
      },
      ok_standard_deduction: {
        2023: null,
      },
      ok_stc: {
        2023: null,
      },
      ok_taxable_income: {
        2023: null,
      },
      ok_use_tax: {
        2023: null,
      },
      or_deductions: {
        2023: null,
      },
      or_disabled_child_dependent_exemptions: {
        2023: null,
      },
      or_eitc: {
        2023: null,
      },
      or_exemption_credit: {
        2023: null,
      },
      or_federal_tax_liability_subtraction: {
        2023: null,
      },
      or_income_additions: {
        2023: 0,
      },
      or_income_after_additions: {
        2023: null,
      },
      or_income_after_subtractions: {
        2023: null,
      },
      or_income_subtractions: {
        2023: null,
      },
      or_income_tax: {
        2023: null,
      },
      or_income_tax_before_credits: {
        2023: null,
      },
      or_income_tax_before_refundable_credits: {
        2023: null,
      },
      or_itemized_deductions: {
        2023: null,
      },
      or_kicker: {
        2023: null,
      },
      or_non_refundable_credits: {
        2023: null,
      },
      or_refundable_credits: {
        2023: null,
      },
      or_regular_exemptions: {
        2023: null,
      },
      or_severely_disabled_exemptions: {
        2023: null,
      },
      or_standard_deduction: {
        2023: null,
      },
      or_tax_before_credits_in_prior_year: {
        2023: 0,
      },
      or_taxable_income: {
        2023: null,
      },
      other_net_gain: {
        2023: 0,
      },
      othertaxes: {
        2023: 0,
      },
      pa_adjusted_taxable_income: {
        2023: null,
      },
      pa_eligibility_income: {
        2023: null,
      },
      pa_income_tax: {
        2023: null,
      },
      pa_income_tax_after_forgiveness: {
        2023: null,
      },
      pa_income_tax_before_forgiveness: {
        2023: null,
      },
      pa_tax_deductions: {
        2023: 0,
      },
      pa_tax_forgiveness_amount: {
        2023: null,
      },
      pa_tax_forgiveness_rate: {
        2023: null,
      },
      pa_total_taxable_income: {
        2023: null,
      },
      pa_use_tax: {
        2023: null,
      },
      positive_agi: {
        2023: null,
      },
      pre_c04600: {
        2023: null,
      },
      premium_tax_credit: {
        2023: null,
      },
      prior_energy_efficient_home_improvement_credits: {
        2023: 0,
      },
      prior_energy_efficient_window_credits: {
        2023: 0,
      },
      property_tax_primary_residence: {
        2023: null,
      },
      ptc_phase_out_rate: {
        2023: null,
      },
      puerto_rico_income: {
        2023: 0,
      },
      purchased_qualifying_new_clean_vehicle: {
        2023: false,
      },
      purchased_qualifying_used_clean_vehicle: {
        2023: false,
      },
      qualified_battery_storage_technology_expenditures: {
        2023: 0,
      },
      qualified_business_income_deduction: {
        2023: null,
      },
      qualified_furnace_or_hot_water_boiler_expenditures: {
        2023: 0,
      },
      qualified_retirement_penalty: {
        2023: 0,
      },
      recapture_of_investment_credit: {
        2023: 0,
      },
      recovery_rebate_credit: {
        2023: null,
      },
      refundable_american_opportunity_credit: {
        2023: null,
      },
      refundable_ctc: {
        2023: null,
      },
      refundable_payroll_tax_credit: {
        2023: 0,
      },
      regular_tax_before_credits: {
        2023: null,
      },
      rents: {
        2023: null,
      },
      reported_slspc: {
        2023: 0,
      },
      residential_clean_energy_credit: {
        2023: null,
      },
      residential_efficiency_electrification_rebate: {
        2023: null,
      },
      residential_efficiency_electrification_retrofit_energy_savings: {
        2023: 0,
      },
      residential_efficiency_electrification_retrofit_expenditures: {
        2023: 0,
      },
      retirement_savings_credit: {
        2023: null,
      },
      rptc: {
        2023: null,
      },
      rrc_arpa: {
        2023: null,
      },
      rrc_caa: {
        2023: null,
      },
      rrc_cares: {
        2023: null,
      },
      salt_deduction: {
        2023: null,
      },
      salt_refund_last_year: {
        2023: 0,
      },
      sc_income_tax_before_credits: {
        2023: null,
      },
      sc_taxable_income: {
        2023: 0,
      },
      sc_young_child_exemption: {
        2023: null,
      },
      second_lowest_silver_plan_cost: {
        2023: null,
      },
      section_22_income: {
        2023: null,
      },
      self_employed_health_insurance_ald: {
        2023: null,
      },
      self_employed_pension_contribution_ald: {
        2023: null,
      },
      self_employment_tax_ald: {
        2023: null,
      },
      sep: {
        2023: 1,
      },
      separate_filer_itemizes: {
        2023: false,
      },
      small_wind_energy_property_expenditures: {
        2023: 0,
      },
      solar_electric_property_expenditures: {
        2023: 0,
      },
      solar_water_heating_property_expenditures: {
        2023: 0,
      },
      specified_possession_income: {
        2023: 0,
      },
      spouse_earned: {
        2023: null,
      },
      spouse_is_disabled: {
        2023: null,
      },
      spouse_separate_adjusted_gross_income: {
        2023: null,
      },
      spouse_separate_tax_unit_size: {
        2023: null,
      },
      standard: {
        2023: null,
      },
      standard_deduction: {
        2023: null,
      },
      state_and_local_sales_or_income_tax: {
        2023: null,
      },
      state_income_tax: {
        2023: null,
      },
      state_income_tax_before_refundable_credits: {
        2023: null,
      },
      state_sales_tax: {
        2023: 0,
      },
      surtax: {
        2023: 0,
      },
      tax: {
        2023: null,
      },
      tax_exempt_social_security: {
        2023: null,
      },
      tax_liability_if_itemizing: {
        2023: null,
      },
      tax_liability_if_not_itemizing: {
        2023: null,
      },
      tax_unit_capital_loss: {
        2023: null,
      },
      tax_unit_childcare_expenses: {
        2023: null,
      },
      tax_unit_children: {
        2023: null,
      },
      tax_unit_count_dependents: {
        2023: null,
      },
      tax_unit_dependent_elsewhere: {
        2023: false,
      },
      tax_unit_dependents: {
        2023: null,
      },
      tax_unit_earned_income: {
        2023: null,
      },
      tax_unit_fpg: {
        2023: null,
      },
      tax_unit_id: {
        2023: 0,
      },
      tax_unit_income_ami_ratio: {
        2023: 0,
      },
      tax_unit_is_joint: {
        2023: null,
      },
      tax_unit_itemizes: {
        2023: null,
      },
      tax_unit_medicaid_income_level: {
        2023: null,
      },
      tax_unit_net_capital_gains: {
        2023: null,
      },
      tax_unit_partnership_s_corp_income: {
        2023: null,
      },
      tax_unit_rental_income: {
        2023: null,
      },
      tax_unit_size: {
        2023: null,
      },
      tax_unit_social_security: {
        2023: null,
      },
      tax_unit_spouse_dependent_elsewhere: {
        2023: false,
      },
      tax_unit_ss: {
        2023: null,
      },
      tax_unit_ssi: {
        2023: null,
      },
      tax_unit_state: {
        2023: null,
      },
      tax_unit_taxable_social_security: {
        2023: null,
      },
      tax_unit_taxable_unemployment_compensation: {
        2023: null,
      },
      tax_unit_unemployment_compensation: {
        2023: null,
      },
      tax_unit_weight: {
        2023: 0,
      },
      taxable_income: {
        2023: null,
      },
      taxable_income_deductions: {
        2023: null,
      },
      taxable_income_deductions_if_itemizing: {
        2023: null,
      },
      taxable_income_deductions_if_not_itemizing: {
        2023: null,
      },
      taxable_income_less_qbid: {
        2023: null,
      },
      taxable_ss_magi: {
        2023: null,
      },
      taxable_uc_agi: {
        2023: null,
      },
      taxbc: {
        2023: null,
      },
      taxcalc_c04470: {
        2023: null,
      },
      taxcalc_c09200: {
        2023: null,
      },
      taxcalc_c17000: {
        2023: null,
      },
      taxcalc_c18300: {
        2023: null,
      },
      taxcalc_c19200: {
        2023: null,
      },
      taxcalc_c19700: {
        2023: null,
      },
      taxcalc_c20500: {
        2023: null,
      },
      taxcalc_cmbtp: {
        2023: null,
      },
      taxcalc_dsi: {
        2023: null,
      },
      taxcalc_e00200: {
        2023: null,
      },
      taxcalc_e00300: {
        2023: null,
      },
      taxcalc_e00400: {
        2023: null,
      },
      taxcalc_e00600: {
        2023: null,
      },
      taxcalc_e00650: {
        2023: null,
      },
      taxcalc_e00700: {
        2023: null,
      },
      taxcalc_e00800: {
        2023: null,
      },
      taxcalc_e00900: {
        2023: null,
      },
      taxcalc_e01100: {
        2023: null,
      },
      taxcalc_e01200: {
        2023: null,
      },
      taxcalc_e01500: {
        2023: null,
      },
      taxcalc_e01700: {
        2023: null,
      },
      taxcalc_e02000: {
        2023: null,
      },
      taxcalc_e02100: {
        2023: null,
      },
      taxcalc_e02300: {
        2023: null,
      },
      taxcalc_e02400: {
        2023: null,
      },
      taxcalc_e03150: {
        2023: null,
      },
      taxcalc_e03210: {
        2023: null,
      },
      taxcalc_e03220: {
        2023: null,
      },
      taxcalc_e03230: {
        2023: null,
      },
      taxcalc_e03240: {
        2023: null,
      },
      taxcalc_e03270: {
        2023: null,
      },
      taxcalc_e03290: {
        2023: null,
      },
      taxcalc_e03300: {
        2023: null,
      },
      taxcalc_e03400: {
        2023: null,
      },
      taxcalc_e03500: {
        2023: null,
      },
      taxcalc_e09700: {
        2023: null,
      },
      taxcalc_e09800: {
        2023: null,
      },
      taxcalc_e09900: {
        2023: null,
      },
      taxcalc_e11200: {
        2023: null,
      },
      taxcalc_e17500: {
        2023: null,
      },
      taxcalc_e18500: {
        2023: null,
      },
      taxcalc_e19200: {
        2023: null,
      },
      taxcalc_e19800: {
        2023: null,
      },
      taxcalc_e20100: {
        2023: null,
      },
      taxcalc_e20400: {
        2023: null,
      },
      taxcalc_e24515: {
        2023: null,
      },
      taxcalc_e24518: {
        2023: null,
      },
      taxcalc_e26270: {
        2023: null,
      },
      taxcalc_e27200: {
        2023: null,
      },
      taxcalc_e32800: {
        2023: null,
      },
      taxcalc_e58990: {
        2023: null,
      },
      taxcalc_e62900: {
        2023: null,
      },
      taxcalc_e87530: {
        2023: null,
      },
      taxcalc_f2441: {
        2023: null,
      },
      taxcalc_f6251: {
        2023: null,
      },
      taxcalc_fips: {
        2023: null,
      },
      taxcalc_g20500: {
        2023: null,
      },
      taxcalc_hasqdivltcg: {
        2023: null,
      },
      taxcalc_midr: {
        2023: null,
      },
      taxcalc_niit: {
        2023: null,
      },
      taxcalc_p22250: {
        2023: null,
      },
      taxcalc_p23250: {
        2023: null,
      },
      taxcalc_pencon: {
        2023: null,
      },
      taxcalc_pt_binc_w2_wages: {
        2023: null,
      },
      taxcalc_pt_sstb_income: {
        2023: null,
      },
      taxcalc_pt_ubia_property: {
        2023: null,
      },
      taxcalc_s006: {
        2023: null,
      },
      taxsim_age1: {
        2023: null,
      },
      taxsim_age2: {
        2023: null,
      },
      taxsim_age3: {
        2023: null,
      },
      taxsim_childcare: {
        2023: null,
      },
      taxsim_dep13: {
        2023: null,
      },
      taxsim_dep17: {
        2023: null,
      },
      taxsim_dep18: {
        2023: null,
      },
      taxsim_depx: {
        2023: null,
      },
      taxsim_dividends: {
        2023: null,
      },
      taxsim_fiitax: {
        2023: null,
      },
      taxsim_gssi: {
        2023: null,
      },
      taxsim_intrec: {
        2023: null,
      },
      taxsim_ltcg: {
        2023: null,
      },
      taxsim_mstat: {
        2023: null,
      },
      taxsim_page: {
        2023: null,
      },
      taxsim_pbusinc: {
        2023: null,
      },
      taxsim_pensions: {
        2023: null,
      },
      taxsim_pprofinc: {
        2023: 0,
      },
      taxsim_psemp: {
        2023: null,
      },
      taxsim_pui: {
        2023: null,
      },
      taxsim_pwages: {
        2023: null,
      },
      taxsim_sage: {
        2023: null,
      },
      taxsim_sbusinc: {
        2023: null,
      },
      taxsim_scorp: {
        2023: null,
      },
      taxsim_siitax: {
        2023: null,
      },
      taxsim_sprofinc: {
        2023: 0,
      },
      taxsim_ssemp: {
        2023: null,
      },
      taxsim_state: {
        2023: null,
      },
      taxsim_stcg: {
        2023: null,
      },
      taxsim_swages: {
        2023: null,
      },
      taxsim_taxsimid: {
        2023: null,
      },
      taxsim_tfica: {
        2023: null,
      },
      taxsim_ui: {
        2023: null,
      },
      taxsim_v10: {
        2023: null,
      },
      taxsim_v11: {
        2023: null,
      },
      taxsim_v12: {
        2023: null,
      },
      taxsim_v18: {
        2023: null,
      },
      taxsim_v25: {
        2023: null,
      },
      taxsim_year: {
        2023: null,
      },
      tuition_and_fees: {
        2023: 0,
      },
      unrecaptured_section_1250_gain: {
        2023: 0,
      },
      unreported_payroll_tax: {
        2023: 0,
      },
      us_govt_interest: {
        2023: 0,
      },
      used_clean_vehicle_credit: {
        2023: null,
      },
      used_clean_vehicle_credit_eligible: {
        2023: null,
      },
      used_clean_vehicle_sale_price: {
        2023: 0,
      },
      ut_additions_to_income: {
        2023: 0,
      },
      ut_at_home_parent_credit: {
        2023: null,
      },
      ut_claims_retirement_credit: {
        2023: null,
      },
      ut_eitc: {
        2023: null,
      },
      ut_federal_deductions_for_taxpayer_credit: {
        2023: null,
      },
      ut_income_tax: {
        2023: null,
      },
      ut_income_tax_before_credits: {
        2023: null,
      },
      ut_income_tax_before_refundable_credits: {
        2023: null,
      },
      ut_income_tax_exempt: {
        2023: null,
      },
      ut_personal_exemption: {
        2023: null,
      },
      ut_refundable_credits: {
        2023: 0,
      },
      ut_retirement_credit: {
        2023: null,
      },
      ut_retirement_credit_max: {
        2023: null,
      },
      ut_ss_benefits_credit: {
        2023: null,
      },
      ut_ss_benefits_credit_max: {
        2023: null,
      },
      ut_state_tax_refund: {
        2023: null,
      },
      ut_subtractions_from_income: {
        2023: 0,
      },
      ut_taxable_income: {
        2023: null,
      },
      ut_taxpayer_credit: {
        2023: null,
      },
      ut_taxpayer_credit_max: {
        2023: null,
      },
      ut_taxpayer_credit_phase_out_income: {
        2023: null,
      },
      ut_taxpayer_credit_reduction: {
        2023: null,
      },
      ut_total_dependents: {
        2023: null,
      },
      ut_total_income: {
        2023: null,
      },
      va_aged_blind_exemption: {
        2023: null,
      },
      va_disability_income_subtraction: {
        2023: null,
      },
      va_income_tax_before_credits: {
        2023: null,
      },
      va_military_basic_pay_subtraction: {
        2023: null,
      },
      va_personal_exemption: {
        2023: null,
      },
      va_standard_deduction: {
        2023: null,
      },
      va_taxable_income: {
        2023: 0,
      },
      wa_capital_gains_tax: {
        2023: null,
      },
      wa_income_tax: {
        2023: null,
      },
      wa_income_tax_before_refundable_credits: {
        2023: null,
      },
      wa_refundable_credits: {
        2023: null,
      },
      wa_working_families_tax_credit: {
        2023: null,
      },
      xtot: {
        2023: null,
      },
    },
  },
  axes: [
    [
      {
        name: "employment_income",
        period: "2023",
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
        2023: 0,
      },
      AFCS: {
        2023: null,
      },
      AFCS_reported: {
        2023: 0,
      },
      BSP: {
        2023: null,
      },
      BSP_reported: {
        2023: 0,
      },
      CB_HITC: {
        2023: null,
      },
      DLA_M_reported: {
        2023: 0,
      },
      DLA_SC_reported: {
        2023: 0,
      },
      ESA_contrib: {
        2023: null,
      },
      ESA_contrib_reported: {
        2023: 0,
      },
      ESA_income_reported: {
        2023: 0,
      },
      HB_individual_non_dep_deduction: {
        2023: null,
      },
      IIDB: {
        2023: null,
      },
      IIDB_reported: {
        2023: 0,
      },
      ISA_interest_income: {
        2023: 0,
      },
      JSA_contrib: {
        2023: null,
      },
      JSA_contrib_reported: {
        2023: 0,
      },
      JSA_income_reported: {
        2023: 0,
      },
      NI_class_2: {
        2023: null,
      },
      NI_class_4: {
        2023: null,
      },
      NI_exempt: {
        2023: null,
      },
      PIP_DL_reported: {
        2023: 0,
      },
      PIP_M_reported: {
        2023: 0,
      },
      SDA_reported: {
        2023: 0,
      },
      SMP: {
        2023: 0,
      },
      SSP: {
        2023: 0,
      },
      UC_MIF_applies: {
        2023: null,
      },
      UC_MIF_capped_earned_income: {
        2023: null,
      },
      UC_individual_child_element: {
        2023: null,
      },
      UC_individual_disabled_child_element: {
        2023: null,
      },
      UC_individual_non_dep_deduction: {
        2023: null,
      },
      UC_individual_severely_disabled_child_element: {
        2023: null,
      },
      UC_minimum_income_floor: {
        2023: null,
      },
      UC_non_dep_deduction_exempt: {
        2023: null,
      },
      aa_category: {
        2023: null,
      },
      access_fund: {
        2023: 0,
      },
      add_rate_earned_income: {
        2023: null,
      },
      add_rate_earned_income_tax: {
        2023: null,
      },
      add_rate_savings_income: {
        2023: null,
      },
      adjusted_net_income: {
        2023: null,
      },
      adult_ema: {
        2023: 0,
      },
      adult_index: {
        2023: null,
      },
      age: {
        2023: 40,
      },
      age_18_64: {
        2023: null,
      },
      age_over_64: {
        2023: null,
      },
      age_under_18: {
        2023: null,
      },
      allowances: {
        2023: null,
      },
      armed_forces_independence_payment: {
        2023: 0,
      },
      attendance_allowance: {
        2023: null,
      },
      base_net_income: {
        2023: 0,
      },
      basic_income: {
        2023: null,
      },
      basic_rate_earned_income: {
        2023: null,
      },
      basic_rate_earned_income_tax: {
        2023: null,
      },
      basic_rate_savings_income: {
        2023: null,
      },
      basic_rate_savings_income_pre_starter: {
        2023: null,
      },
      benefits: {
        2023: null,
      },
      benefits_modelling: {
        2023: null,
      },
      benefits_reported: {
        2023: null,
      },
      bi_household_phaseout: {
        2023: null,
      },
      bi_individual_phaseout: {
        2023: null,
      },
      bi_maximum: {
        2023: null,
      },
      bi_phaseout: {
        2023: null,
      },
      birth_year: {
        2023: null,
      },
      blind_persons_allowance: {
        2023: 0,
      },
      capital_allowances: {
        2023: 0,
      },
      capital_income: {
        2023: null,
      },
      capped_mcad: {
        2023: null,
      },
      carers_allowance: {
        2023: null,
      },
      carers_allowance_reported: {
        2023: 0,
      },
      charitable_investment_gifts: {
        2023: 0,
      },
      child_benefit_reported: {
        2023: 0,
      },
      child_benefit_respective_amount: {
        2023: null,
      },
      child_ema: {
        2023: 0,
      },
      child_index: {
        2023: null,
      },
      child_tax_credit_reported: {
        2023: 0,
      },
      childcare_expenses: {
        2023: 0,
      },
      cliff_evaluated: {
        2023: null,
      },
      cliff_gap: {
        2023: null,
      },
      council_tax_benefit_reported: {
        2023: 0,
      },
      covenanted_payments: {
        2023: 0,
      },
      current_education: {
        2023: "NOT_IN_EDUCATION",
      },
      deficiency_relief: {
        2023: 0,
      },
      dividend_allowance: {
        2023: null,
      },
      dividend_income: {
        2023: 0,
      },
      dividend_income_tax: {
        2023: null,
      },
      dla: {
        2023: null,
      },
      dla_m: {
        2023: null,
      },
      dla_m_category: {
        2023: null,
      },
      dla_sc: {
        2023: null,
      },
      dla_sc_category: {
        2023: null,
      },
      dla_sc_middle_plus: {
        2023: null,
      },
      earned_income: {
        2023: null,
      },
      earned_income_tax: {
        2023: null,
      },
      earned_taxable_income: {
        2023: null,
      },
      education_grants: {
        2023: 0,
      },
      employee_NI: {
        2023: null,
      },
      employee_NI_class_1: {
        2023: null,
      },
      employer_NI: {
        2023: null,
      },
      employer_NI_class_1: {
        2023: null,
      },
      employer_pension_contributions: {
        2023: 0,
      },
      employment_benefits: {
        2023: null,
      },
      employment_deductions: {
        2023: null,
      },
      employment_expenses: {
        2023: 0,
      },
      employment_income: {
        2023: null,
      },
      employment_status: {
        2023: "UNEMPLOYED",
      },
      family_benefits: {
        2023: null,
      },
      family_benefits_reported: {
        2023: 0,
      },
      gender: {
        2023: "MALE",
      },
      gift_aid: {
        2023: 0,
      },
      gross_income: {
        2023: null,
      },
      higher_rate_earned_income: {
        2023: null,
      },
      higher_rate_earned_income_tax: {
        2023: null,
      },
      higher_rate_savings_income: {
        2023: null,
      },
      highest_education: {
        2023: "UPPER_SECONDARY",
      },
      hours_worked: {
        2023: 0,
      },
      housing_benefit_reported: {
        2023: 0,
      },
      in_FE: {
        2023: false,
      },
      in_HE: {
        2023: false,
      },
      in_social_housing: {
        2023: null,
      },
      in_work: {
        2023: null,
      },
      incapacity_benefit: {
        2023: null,
      },
      incapacity_benefit_reported: {
        2023: 0,
      },
      income_decile: {
        2023: null,
      },
      income_support_reported: {
        2023: 0,
      },
      income_tax: {
        2023: null,
      },
      income_tax_pre_charges: {
        2023: null,
      },
      is_CTC_child_limit_exempt: {
        2023: null,
      },
      is_QYP: {
        2023: null,
      },
      is_SP_age: {
        2023: null,
      },
      is_WA_adult: {
        2023: null,
      },
      is_adult: {
        2023: null,
      },
      is_apprentice: {
        2023: false,
      },
      is_benunit_eldest_child: {
        2023: null,
      },
      is_benunit_head: {
        2023: null,
      },
      is_blind: {
        2023: false,
      },
      is_carer_for_benefits: {
        2023: null,
      },
      is_child: {
        2023: null,
      },
      is_child_born_before_child_limit: {
        2023: null,
      },
      is_child_for_CTC: {
        2023: null,
      },
      is_child_or_QYP: {
        2023: null,
      },
      is_disabled_for_benefits: {
        2023: null,
      },
      is_eldest_child: {
        2023: null,
      },
      is_enhanced_disabled_for_benefits: {
        2023: null,
      },
      is_female: {
        2023: null,
      },
      is_higher_earner: {
        2023: null,
      },
      is_household_head: {
        2023: null,
      },
      is_in_startup_period: {
        2023: false,
      },
      is_male: {
        2023: null,
      },
      is_older_child: {
        2023: null,
      },
      is_on_cliff: {
        2023: null,
      },
      is_severely_disabled_for_benefits: {
        2023: null,
      },
      is_young_child: {
        2023: null,
      },
      limited_capability_for_WRA: {
        2023: null,
      },
      loss_relief: {
        2023: null,
      },
      lump_sum_income: {
        2023: 0,
      },
      maintenance_expenses: {
        2023: 0,
      },
      maintenance_income: {
        2023: 0,
      },
      marginal_tax_rate: {
        2023: null,
      },
      marital_status: {
        2023: null,
      },
      market_income: {
        2023: null,
      },
      marriage_allowance: {
        2023: null,
      },
      married_couples_allowance: {
        2023: 0,
      },
      married_couples_allowance_deduction: {
        2023: null,
      },
      maternity_allowance: {
        2023: null,
      },
      maternity_allowance_reported: {
        2023: 0,
      },
      meets_marriage_allowance_income_conditions: {
        2023: null,
      },
      minimum_wage: {
        2023: null,
      },
      minimum_wage_category: {
        2023: null,
      },
      miscellaneous_income: {
        2023: 0,
      },
      national_insurance: {
        2023: null,
      },
      net_income: {
        2023: null,
      },
      occupational_pension_contributions: {
        2023: 0,
      },
      other_benefits: {
        2023: null,
      },
      other_deductions: {
        2023: 0,
      },
      over_16: {
        2023: null,
      },
      partners_unused_personal_allowance: {
        2023: null,
      },
      pays_scottish_income_tax: {
        2023: null,
      },
      pension_annual_allowance: {
        2023: null,
      },
      pension_contributions: {
        2023: null,
      },
      pension_contributions_relief: {
        2023: null,
      },
      pension_credit_reported: {
        2023: 0,
      },
      pension_income: {
        2023: 0,
      },
      people: {
        2023: 1,
      },
      person_benunit_id: {
        2023: 0,
      },
      person_benunit_role: {
        2023: null,
      },
      person_household_id: {
        2023: 0,
      },
      person_household_role: {
        2023: null,
      },
      person_id: {
        2023: 0,
      },
      person_state_id: {
        2023: 0,
      },
      person_state_role: {
        2023: null,
      },
      person_weight: {
        2023: null,
      },
      personal_allowance: {
        2023: null,
      },
      personal_benefits: {
        2023: null,
      },
      personal_benefits_reported: {
        2023: null,
      },
      personal_rent: {
        2023: null,
      },
      pip: {
        2023: null,
      },
      pip_dl: {
        2023: null,
      },
      pip_dl_category: {
        2023: null,
      },
      pip_m: {
        2023: null,
      },
      pip_m_category: {
        2023: null,
      },
      private_pension_contributions: {
        2023: 0,
      },
      private_transfer_income: {
        2023: 0,
      },
      property_allowance: {
        2023: null,
      },
      property_allowance_deduction: {
        2023: null,
      },
      property_income: {
        2023: 0,
      },
      raw_person_weight: {
        2023: 1,
      },
      receives_carers_allowance: {
        2023: null,
      },
      receives_enhanced_pip_dl: {
        2023: null,
      },
      receives_highest_dla_sc: {
        2023: null,
      },
      role: {
        2023: null,
      },
      savings_allowance: {
        2023: null,
      },
      savings_income_tax: {
        2023: null,
      },
      savings_interest_income: {
        2023: 0,
      },
      savings_starter_rate_income: {
        2023: null,
      },
      sda: {
        2023: null,
      },
      self_employed_NI: {
        2023: null,
      },
      self_employment_income: {
        2023: 0,
      },
      social_security_income: {
        2023: null,
      },
      ssmg: {
        2023: null,
      },
      ssmg_reported: {
        2023: 0,
      },
      state_pension: {
        2023: null,
      },
      state_pension_age: {
        2023: null,
      },
      state_pension_reported: {
        2023: null,
      },
      student_loans: {
        2023: 0,
      },
      student_payments: {
        2023: null,
      },
      sublet_income: {
        2023: 0,
      },
      tax: {
        2023: null,
      },
      tax_band: {
        2023: null,
      },
      tax_free_savings_income: {
        2023: null,
      },
      tax_modelling: {
        2023: null,
      },
      tax_reported: {
        2023: 0,
      },
      taxable_dividend_income: {
        2023: null,
      },
      taxable_employment_income: {
        2023: null,
      },
      taxable_miscellaneous_income: {
        2023: null,
      },
      taxable_pension_income: {
        2023: null,
      },
      taxable_property_income: {
        2023: null,
      },
      taxable_savings_interest_income: {
        2023: null,
      },
      taxable_self_employment_income: {
        2023: null,
      },
      taxable_social_security_income: {
        2023: null,
      },
      taxed_dividend_income: {
        2023: null,
      },
      taxed_income: {
        2023: null,
      },
      taxed_savings_income: {
        2023: null,
      },
      total_NI: {
        2023: null,
      },
      total_income: {
        2023: null,
      },
      total_pension_income: {
        2023: null,
      },
      trading_allowance: {
        2023: null,
      },
      trading_allowance_deduction: {
        2023: null,
      },
      trading_loss: {
        2023: 0,
      },
      triple_lock_uprating: {
        2023: null,
      },
      universal_credit_reported: {
        2023: 0,
      },
      unused_personal_allowance: {
        2023: null,
      },
      weekly_NI_class_2: {
        2023: null,
      },
      weekly_childcare_expenses: {
        2023: null,
      },
      weekly_hours: {
        2023: null,
      },
      winter_fuel_allowance_reported: {
        2023: 0,
      },
      working_tax_credit_reported: {
        2023: 0,
      },
    },
  },
  benunits: {
    "your immediate family": {
      members: ["you"],
      BRMA_LHA_rate: {
        2023: null,
      },
      CTC_child_element: {
        2023: null,
      },
      CTC_disabled_child_element: {
        2023: null,
      },
      CTC_family_element: {
        2023: null,
      },
      CTC_maximum_rate: {
        2023: null,
      },
      CTC_severely_disabled_child_element: {
        2023: null,
      },
      ESA_income: {
        2023: null,
      },
      ESA_income_eligible: {
        2023: null,
      },
      HB_non_dep_deductions: {
        2023: null,
      },
      JSA: {
        2023: null,
      },
      JSA_income: {
        2023: null,
      },
      JSA_income_applicable_amount: {
        2023: null,
      },
      JSA_income_applicable_income: {
        2023: null,
      },
      JSA_income_eligible: {
        2023: null,
      },
      LHA_allowed_bedrooms: {
        2023: null,
      },
      LHA_cap: {
        2023: null,
      },
      LHA_category: {
        2023: null,
      },
      LHA_eligible: {
        2023: null,
      },
      UC_LCWRA_element: {
        2023: null,
      },
      UC_carer_element: {
        2023: null,
      },
      UC_child_element: {
        2023: null,
      },
      UC_childcare_element: {
        2023: null,
      },
      UC_childcare_work_condition: {
        2023: null,
      },
      UC_claimant_type: {
        2023: null,
      },
      UC_disability_elements: {
        2023: null,
      },
      UC_earned_income: {
        2023: null,
      },
      UC_housing_costs_element: {
        2023: null,
      },
      UC_income_reduction: {
        2023: null,
      },
      UC_maximum_amount: {
        2023: null,
      },
      UC_maximum_childcare: {
        2023: null,
      },
      UC_non_dep_deductions: {
        2023: null,
      },
      UC_standard_allowance: {
        2023: null,
      },
      UC_unearned_income: {
        2023: null,
      },
      UC_work_allowance: {
        2023: null,
      },
      WTC_basic_element: {
        2023: null,
      },
      WTC_childcare_element: {
        2023: null,
      },
      WTC_couple_element: {
        2023: null,
      },
      WTC_disabled_element: {
        2023: null,
      },
      WTC_lone_parent_element: {
        2023: null,
      },
      WTC_maximum_rate: {
        2023: null,
      },
      WTC_severely_disabled_element: {
        2023: null,
      },
      WTC_worker_element: {
        2023: null,
      },
      additional_minimum_guarantee: {
        2023: null,
      },
      baseline_child_benefit_entitlement: {
        2023: 0,
      },
      baseline_ctc_entitlement: {
        2023: 0,
      },
      baseline_housing_benefit_entitlement: {
        2023: 0,
      },
      baseline_income_support_entitlement: {
        2023: 0,
      },
      baseline_pension_credit_entitlement: {
        2023: 0,
      },
      baseline_universal_credit_entitlement: {
        2023: 0,
      },
      baseline_wtc_entitlement: {
        2023: 0,
      },
      benefit_cap: {
        2023: null,
      },
      benefit_cap_reduction: {
        2023: null,
      },
      benefits_premiums: {
        2023: null,
      },
      benunit_has_carer: {
        2023: null,
      },
      benunit_id: {
        2023: 0,
      },
      benunit_is_renting: {
        2023: null,
      },
      benunit_rent: {
        2023: null,
      },
      benunit_tax: {
        2023: null,
      },
      benunit_tenure_type: {
        2023: null,
      },
      benunit_weekly_hours: {
        2023: null,
      },
      benunit_weight: {
        2023: null,
      },
      carer_minimum_guarantee_addition: {
        2023: null,
      },
      carer_premium: {
        2023: null,
      },
      child_benefit: {
        2023: null,
      },
      child_benefit_entitlement: {
        2023: null,
      },
      child_benefit_less_tax_charge: {
        2023: null,
      },
      child_minimum_guarantee_addition: {
        2023: null,
      },
      child_tax_credit: {
        2023: null,
      },
      child_tax_credit_pre_minimum: {
        2023: null,
      },
      claims_ESA_income: {
        2023: null,
      },
      claims_all_entitled_benefits: {
        2023: null,
      },
      claims_legacy_benefits: {
        2023: null,
      },
      council_tax_benefit: {
        2023: null,
      },
      count_children_and_qyp: {
        2023: null,
      },
      ctc_entitlement: {
        2023: null,
      },
      disability_premium: {
        2023: null,
      },
      eldest_adult_age: {
        2023: null,
      },
      eldest_child_age: {
        2023: null,
      },
      enhanced_disability_premium: {
        2023: null,
      },
      families: {
        2023: 1,
      },
      family_rent: {
        2023: null,
      },
      family_type: {
        2023: null,
      },
      guarantee_credit: {
        2023: null,
      },
      housing_benefit: {
        2023: null,
      },
      housing_benefit_applicable_amount: {
        2023: null,
      },
      housing_benefit_applicable_income: {
        2023: null,
      },
      housing_benefit_eligible: {
        2023: null,
      },
      housing_benefit_entitlement: {
        2023: null,
      },
      housing_benefit_pre_benefit_cap: {
        2023: null,
      },
      income_support: {
        2023: null,
      },
      income_support_applicable_amount: {
        2023: null,
      },
      income_support_applicable_income: {
        2023: null,
      },
      income_support_eligible: {
        2023: null,
      },
      income_support_entitlement: {
        2023: null,
      },
      is_CTC_eligible: {
        2023: null,
      },
      is_UC_eligible: {
        2023: null,
      },
      is_UC_work_allowance_eligible: {
        2023: null,
      },
      is_WTC_eligible: {
        2023: null,
      },
      is_benefit_cap_exempt: {
        2023: null,
      },
      is_couple: {
        2023: null,
      },
      is_guarantee_credit_eligible: {
        2023: null,
      },
      is_lone_parent: {
        2023: null,
      },
      is_married: {
        2023: false,
      },
      is_pension_credit_eligible: {
        2023: null,
      },
      is_savings_credit_eligible: {
        2023: null,
      },
      is_single: {
        2023: null,
      },
      is_single_person: {
        2023: null,
      },
      legacy_benefits: {
        2023: null,
      },
      minimum_guarantee: {
        2023: null,
      },
      num_UC_eligible_children: {
        2023: null,
      },
      num_adults: {
        2023: null,
      },
      num_carers: {
        2023: null,
      },
      num_children: {
        2023: null,
      },
      num_disabled_adults: {
        2023: null,
      },
      num_disabled_children: {
        2023: null,
      },
      num_enhanced_disabled_adults: {
        2023: null,
      },
      num_enhanced_disabled_children: {
        2023: null,
      },
      num_severely_disabled_adults: {
        2023: null,
      },
      num_severely_disabled_children: {
        2023: null,
      },
      pension_credit: {
        2023: null,
      },
      pension_credit_entitlement: {
        2023: null,
      },
      pension_credit_income: {
        2023: null,
      },
      relation_type: {
        2023: null,
      },
      savings_credit: {
        2023: null,
      },
      savings_credit_income: {
        2023: null,
      },
      severe_disability_minimum_guarantee_addition: {
        2023: null,
      },
      severe_disability_premium: {
        2023: null,
      },
      standard_minimum_guarantee: {
        2023: null,
      },
      tax_credits: {
        2023: null,
      },
      tax_credits_applicable_income: {
        2023: null,
      },
      tax_credits_reduction: {
        2023: null,
      },
      uc_has_entitlement: {
        2023: null,
      },
      universal_credit: {
        2023: null,
      },
      universal_credit_entitlement: {
        2023: null,
      },
      universal_credit_pre_benefit_cap: {
        2023: null,
      },
      working_tax_credit: {
        2023: null,
      },
      working_tax_credit_pre_minimum: {
        2023: null,
      },
      would_claim_CTC: {
        2023: null,
      },
      would_claim_ESA_income: {
        2023: null,
      },
      would_claim_HB: {
        2023: null,
      },
      would_claim_IS: {
        2023: null,
      },
      would_claim_JSA: {
        2023: null,
      },
      would_claim_UC: {
        2023: null,
      },
      would_claim_WTC: {
        2023: null,
      },
      would_claim_child_benefit: {
        2023: null,
      },
      would_claim_pc: {
        2023: null,
      },
      wtc_entitlement: {
        2023: null,
      },
      youngest_adult_age: {
        2023: null,
      },
      youngest_child_age: {
        2023: null,
      },
    },
  },
  households: {
    "your household": {
      members: ["you"],
      BRMA: {
        2023: "MAIDSTONE",
      },
      LVT: {
        2023: null,
      },
      accommodation_type: {
        2023: "UNKNOWN",
      },
      additional_residential_property_purchased: {
        2023: null,
      },
      alcohol_and_tobacco_consumption: {
        2023: 0,
      },
      baseline_business_rates: {
        2023: null,
      },
      baseline_corporate_sdlt: {
        2023: null,
      },
      baseline_expected_lbtt: {
        2023: 0,
      },
      baseline_expected_ltt: {
        2023: 0,
      },
      baseline_expected_sdlt: {
        2023: 0,
      },
      baseline_fuel_duty: {
        2023: 0,
      },
      baseline_hbai_excluded_income: {
        2023: null,
      },
      baseline_vat: {
        2023: null,
      },
      business_rates: {
        2023: null,
      },
      business_rates_change_incidence: {
        2023: null,
      },
      carbon_consumption: {
        2023: null,
      },
      carbon_tax: {
        2023: null,
      },
      change_in_business_rates: {
        2023: null,
      },
      change_in_expected_lbtt: {
        2023: null,
      },
      change_in_expected_ltt: {
        2023: null,
      },
      change_in_expected_sdlt: {
        2023: null,
      },
      change_in_fuel_duty: {
        2023: null,
      },
      clothing_and_footwear_consumption: {
        2023: 0,
      },
      communication_consumption: {
        2023: 0,
      },
      consumption: {
        2023: null,
      },
      corporate_land_value: {
        2023: null,
      },
      corporate_sdlt: {
        2023: null,
      },
      corporate_sdlt_change_incidence: {
        2023: null,
      },
      corporate_tax_incidence: {
        2023: null,
      },
      corporate_wealth: {
        2023: 0,
      },
      cost_of_living_support_payment: {
        2023: null,
      },
      council_tax: {
        2023: 0,
      },
      council_tax_band: {
        2023: "D",
      },
      council_tax_less_benefit: {
        2023: null,
      },
      country: {
        2023: null,
      },
      cumulative_non_residential_rent: {
        2023: 0,
      },
      cumulative_residential_rent: {
        2023: 0,
      },
      deep_poverty_gap: {
        2023: null,
      },
      deep_poverty_line: {
        2023: null,
      },
      diesel_litres: {
        2023: null,
      },
      diesel_price: {
        2023: null,
      },
      diesel_spending: {
        2023: 0,
      },
      domestic_energy_consumption: {
        2023: 0,
      },
      domestic_rates: {
        2023: null,
      },
      ebr_council_tax_rebate: {
        2023: null,
      },
      ebr_energy_bills_credit: {
        2023: null,
      },
      education_consumption: {
        2023: 0,
      },
      energy_bills_rebate: {
        2023: null,
      },
      epg_subsidy: {
        2023: null,
      },
      equiv_hbai_household_net_income: {
        2023: null,
      },
      equiv_hbai_household_net_income_ahc: {
        2023: null,
      },
      equiv_household_net_income: {
        2023: null,
      },
      expected_lbtt: {
        2023: null,
      },
      expected_ltt: {
        2023: null,
      },
      expected_sdlt: {
        2023: null,
      },
      food_and_non_alcoholic_beverages_consumption: {
        2023: 0,
      },
      fuel_duty: {
        2023: null,
      },
      full_rate_vat_consumption: {
        2023: null,
      },
      gross_financial_wealth: {
        2023: 0,
      },
      hbai_excluded_income: {
        2023: null,
      },
      hbai_excluded_income_change: {
        2023: null,
      },
      hbai_household_net_income: {
        2023: null,
      },
      hbai_household_net_income_ahc: {
        2023: null,
      },
      health_consumption: {
        2023: 0,
      },
      household_benefits: {
        2023: null,
      },
      household_count_people: {
        2023: null,
      },
      household_equivalisation_ahc: {
        2023: null,
      },
      household_equivalisation_bhc: {
        2023: null,
      },
      household_furnishings_consumption: {
        2023: 0,
      },
      household_gross_income: {
        2023: null,
      },
      household_id: {
        2023: 0,
      },
      household_income_decile: {
        2023: null,
      },
      household_land_value: {
        2023: null,
      },
      household_market_income: {
        2023: null,
      },
      household_net_income: {
        2023: null,
      },
      household_num_benunits: {
        2023: null,
      },
      household_owns_tv: {
        2023: null,
      },
      household_tax: {
        2023: null,
      },
      household_weight: {
        2023: 0,
      },
      households: {
        2023: 1,
      },
      housing_costs: {
        2023: null,
      },
      housing_service_charges: {
        2023: 0,
      },
      housing_water_and_electricity_consumption: {
        2023: 0,
      },
      in_deep_poverty: {
        2023: null,
      },
      in_deep_poverty_ahc: {
        2023: null,
      },
      in_deep_poverty_bhc: {
        2023: null,
      },
      in_original_frs: {
        2023: 0,
      },
      in_poverty: {
        2023: null,
      },
      in_poverty_ahc: {
        2023: null,
      },
      in_poverty_bhc: {
        2023: null,
      },
      is_renting: {
        2023: null,
      },
      is_shared_accommodation: {
        2023: false,
      },
      land_and_buildings_transaction_tax: {
        2023: null,
      },
      land_transaction_tax: {
        2023: null,
      },
      land_value: {
        2023: null,
      },
      lbtt_liable: {
        2023: null,
      },
      lbtt_on_non_residential_property_rent: {
        2023: null,
      },
      lbtt_on_non_residential_property_transactions: {
        2023: null,
      },
      lbtt_on_rent: {
        2023: null,
      },
      lbtt_on_residential_property_rent: {
        2023: null,
      },
      lbtt_on_residential_property_transactions: {
        2023: null,
      },
      lbtt_on_transactions: {
        2023: null,
      },
      local_authority: {
        2023: "MAIDSTONE",
      },
      ltt_liable: {
        2023: null,
      },
      ltt_on_non_residential_property_rent: {
        2023: null,
      },
      ltt_on_non_residential_property_transactions: {
        2023: null,
      },
      ltt_on_rent: {
        2023: null,
      },
      ltt_on_residential_property_rent: {
        2023: null,
      },
      ltt_on_residential_property_transactions: {
        2023: null,
      },
      ltt_on_transactions: {
        2023: null,
      },
      main_residence_value: {
        2023: 0,
      },
      main_residential_property_purchased: {
        2023: null,
      },
      main_residential_property_purchased_is_first_home: {
        2023: null,
      },
      miscellaneous_consumption: {
        2023: 0,
      },
      mortgage: {
        2023: null,
      },
      mortgage_capital_repayment: {
        2023: 0,
      },
      mortgage_interest_repayment: {
        2023: 0,
      },
      net_financial_wealth: {
        2023: 0,
      },
      non_primary_residence_wealth_tax: {
        2023: null,
      },
      non_residential_property_purchased: {
        2023: null,
      },
      non_residential_property_value: {
        2023: 0,
      },
      non_residential_rent: {
        2023: 0,
      },
      num_bedrooms: {
        2023: 0,
      },
      ons_tenure_type: {
        2023: null,
      },
      original_weight: {
        2023: 0,
      },
      other_residential_property_value: {
        2023: 0,
      },
      owned_land: {
        2023: 0,
      },
      petrol_litres: {
        2023: null,
      },
      petrol_price: {
        2023: null,
      },
      petrol_spending: {
        2023: 0,
      },
      poverty_gap: {
        2023: null,
      },
      poverty_gap_ahc: {
        2023: null,
      },
      poverty_gap_bhc: {
        2023: null,
      },
      poverty_line: {
        2023: null,
      },
      poverty_line_ahc: {
        2023: null,
      },
      poverty_line_bhc: {
        2023: null,
      },
      poverty_threshold_bhc: {
        2023: null,
      },
      property_purchased: {
        2023: true,
      },
      property_wealth: {
        2023: null,
      },
      real_household_net_income: {
        2023: null,
      },
      recreation_consumption: {
        2023: 0,
      },
      reduced_rate_vat_consumption: {
        2023: null,
      },
      region: {
        2023: "LONDON",
      },
      rent: {
        2023: 0,
      },
      residential_property_value: {
        2023: null,
      },
      restaurants_and_hotels_consumption: {
        2023: 0,
      },
      sdlt_liable: {
        2023: null,
      },
      sdlt_on_non_residential_property_rent: {
        2023: null,
      },
      sdlt_on_non_residential_property_transactions: {
        2023: null,
      },
      sdlt_on_rent: {
        2023: null,
      },
      sdlt_on_residential_property_rent: {
        2023: null,
      },
      sdlt_on_residential_property_transactions: {
        2023: null,
      },
      sdlt_on_transactions: {
        2023: null,
      },
      shareholding: {
        2023: null,
      },
      spi_imputed: {
        2023: 0,
      },
      stamp_duty_land_tax: {
        2023: null,
      },
      tenure_type: {
        2023: "RENT_PRIVATELY",
      },
      total_wealth: {
        2023: null,
      },
      transport_consumption: {
        2023: 0,
      },
      tv_licence: {
        2023: null,
      },
      tv_licence_discount: {
        2023: null,
      },
      uc_migrated: {
        2023: 0,
      },
      vat: {
        2023: null,
      },
      vat_change: {
        2023: null,
      },
      water_and_sewerage_charges: {
        2023: 0,
      },
      wealth_tax: {
        2023: null,
      },
      winter_fuel_allowance: {
        2023: null,
      },
      would_evade_tv_licence_fee: {
        2023: null,
      },
    },
  },
  axes: [
    [
      {
        name: "employment_income",
        period: "2023",
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
        2023: null,
      },
      ab_income_tax_before_refundable_credits: {
        2023: null,
      },
      ab_taxable_income: {
        2023: null,
      },
      acfb_eligible_child: {
        2023: null,
      },
      adult_index: {
        2023: null,
      },
      adult_years_in_canada: {
        2023: 0,
      },
      age: {
        2023: 18,
      },
      age_amount_credit: {
        2023: null,
      },
      basic_personal_amount: {
        2023: null,
      },
      basic_personal_amount_supplement: {
        2023: null,
      },
      bc_age_credit: {
        2023: null,
      },
      bc_climate_action_incentive_category: {
        2023: null,
      },
      bc_climate_action_tax_credit_person: {
        2023: null,
      },
      bc_family_benefit_eligible_child: {
        2023: null,
      },
      bc_income_tax_before_credits: {
        2023: null,
      },
      bc_income_tax_before_refundable_credits: {
        2023: null,
      },
      bc_non_refundable_credits: {
        2023: null,
      },
      bc_tax_reduction_credit: {
        2023: null,
      },
      bc_taxable_income: {
        2023: null,
      },
      benefits_income: {
        2023: 0,
      },
      canadian_armed_forces_and_personnel_deduction: {
        2023: 0,
      },
      child_benefit_base_person: {
        2023: null,
      },
      child_benefit_eligible: {
        2023: null,
      },
      child_disability_benefit_eligible: {
        2023: null,
      },
      climate_action_incentive_category: {
        2023: null,
      },
      climate_action_incentive_person: {
        2023: null,
      },
      cwb_dependant: {
        2023: null,
      },
      cwb_disability_supplement_eligible: {
        2023: null,
      },
      deductions_from_total_to_net_income: {
        2023: 0,
      },
      dental_benefit: {
        2023: null,
      },
      dental_benefit_eligible: {
        2023: null,
      },
      dental_expenses: {
        2023: 0,
      },
      disability_tax_credit: {
        2023: null,
      },
      dtc_base: {
        2023: null,
      },
      dtc_child_supplement: {
        2023: null,
      },
      dtc_eligible: {
        2023: false,
      },
      employment_income: {
        2023: null,
      },
      full_custody: {
        2023: false,
      },
      gst_credit_category: {
        2023: null,
      },
      gst_credit_person: {
        2023: null,
      },
      has_private_dental_insurance: {
        2023: false,
      },
      income_tax_before_credits: {
        2023: null,
      },
      income_tax_before_refundable_credits: {
        2023: null,
      },
      individual_net_income: {
        2023: null,
      },
      investment_income: {
        2023: 0,
      },
      is_adult: {
        2023: null,
      },
      is_child: {
        2023: null,
      },
      is_child_for_bc_climate_action_tax_credit: {
        2023: null,
      },
      is_child_for_climate_action_incentive: {
        2023: null,
      },
      is_child_for_gst_credit: {
        2023: null,
      },
      is_child_for_on_child_care_fee_subsidy: {
        2023: null,
      },
      is_child_for_on_child_care_fee_subsidy_reduction: {
        2023: null,
      },
      is_dependant: {
        2023: null,
      },
      is_disabled: {
        2023: false,
      },
      is_eldest_child_for_bc_climate_action_tax_credit: {
        2023: null,
      },
      is_eldest_child_for_climate_action_incentive: {
        2023: null,
      },
      is_eldest_child_in_single_household_for_gst_credit: {
        2023: null,
      },
      is_emancipated: {
        2023: false,
      },
      is_father: {
        2023: null,
      },
      is_female: {
        2023: false,
      },
      is_head: {
        2023: false,
      },
      is_head_or_spouse: {
        2023: false,
      },
      is_male: {
        2023: null,
      },
      is_mother: {
        2023: null,
      },
      is_spouse: {
        2023: false,
      },
      marginal_tax_rate: {
        2023: null,
      },
      maternity_and_parental_benefit: {
        2023: 0,
      },
      mb_income_tax_before_credits: {
        2023: null,
      },
      mb_income_tax_before_refundable_credits: {
        2023: null,
      },
      mb_taxable_income: {
        2023: null,
      },
      nb_child_benefit_eligible_child: {
        2023: null,
      },
      nb_income_tax_before_credits: {
        2023: null,
      },
      nb_income_tax_before_refundable_credits: {
        2023: null,
      },
      nb_taxable_income: {
        2023: null,
      },
      nl_income_tax_before_credits: {
        2023: null,
      },
      nl_income_tax_before_refundable_credits: {
        2023: null,
      },
      nl_taxable_income: {
        2023: null,
      },
      noec_child: {
        2023: null,
      },
      non_refundable_tax_credits: {
        2023: null,
      },
      ns_income_tax_before_credits: {
        2023: null,
      },
      ns_income_tax_before_refundable_credits: {
        2023: null,
      },
      ns_low_income_tax_reduction_eligible_child: {
        2023: null,
      },
      ns_non_refundable_credits: {
        2023: null,
      },
      ns_taxable_income: {
        2023: null,
      },
      nt_income_tax_before_credits: {
        2023: null,
      },
      nt_income_tax_before_refundable_credits: {
        2023: null,
      },
      nt_taxable_income: {
        2023: null,
      },
      nu_child_benefit_eligible_child: {
        2023: null,
      },
      nu_cost_of_living_basic_credit: {
        2023: null,
      },
      nu_cost_of_living_credit: {
        2023: null,
      },
      nu_cost_of_living_credit_adjusted_net_income: {
        2023: null,
      },
      nu_cost_of_living_credit_supplement: {
        2023: null,
      },
      nu_income_tax_before_credits: {
        2023: null,
      },
      nu_income_tax_before_refundable_credits: {
        2023: null,
      },
      nu_non_refundable_credits: {
        2023: null,
      },
      nu_taxable_income: {
        2023: null,
      },
      oas_eligibility: {
        2023: null,
      },
      oas_net: {
        2023: null,
      },
      oas_pre_repayment: {
        2023: null,
      },
      oas_repayment: {
        2023: null,
      },
      oeptc_child: {
        2023: null,
      },
      on_income_tax_before_credits: {
        2023: null,
      },
      on_income_tax_before_refundable_credits: {
        2023: null,
      },
      on_low_income_workers_tax_credit: {
        2023: null,
      },
      on_low_income_workers_tax_credit_base: {
        2023: null,
      },
      on_low_income_workers_tax_credit_eligible: {
        2023: null,
      },
      on_low_income_workers_tax_credit_eligible_people: {
        2023: null,
      },
      on_non_refundable_credits: {
        2023: null,
      },
      on_senior_homeowners_property_tax_grant: {
        2023: null,
      },
      on_senior_homeowners_property_tax_grant_base: {
        2023: null,
      },
      on_senior_homeowners_property_tax_grant_reduction: {
        2023: null,
      },
      on_taxable_income: {
        2023: null,
      },
      own_children_in_household: {
        2023: 0,
      },
      pe_income_tax_before_credits: {
        2023: null,
      },
      pe_income_tax_before_refundable_credits: {
        2023: null,
      },
      pe_taxable_income: {
        2023: null,
      },
      pension_and_savings_plan_income: {
        2023: 0,
      },
      person_index: {
        2023: null,
      },
      prior_training_credits: {
        2023: 0,
      },
      property_tax: {
        2023: 0,
      },
      qc_cost_of_living_credit: {
        2023: null,
      },
      qc_income_tax_before_credits: {
        2023: null,
      },
      qc_income_tax_before_refundable_credits: {
        2023: null,
      },
      qc_taxable_income: {
        2023: null,
      },
      registered_disability_savings_plan_income: {
        2023: 0,
      },
      rent: {
        2023: 0,
      },
      school_supply_credit: {
        2023: null,
      },
      self_employment_income: {
        2023: 0,
      },
      sk_income_tax_before_credits: {
        2023: null,
      },
      sk_income_tax_before_refundable_credits: {
        2023: null,
      },
      sk_taxable_income: {
        2023: null,
      },
      teaching_supplies_expenses: {
        2023: 0,
      },
      total_individual_pre_tax_income: {
        2023: null,
      },
      training_credit: {
        2023: null,
      },
      training_credit_income: {
        2023: null,
      },
      tuition_expenses: {
        2023: 0,
      },
      universal_child_care_benefit: {
        2023: 0,
      },
      working_income: {
        2023: null,
      },
      yt_child_benefit_eligible_child: {
        2023: null,
      },
      yt_childrens_arts_credit_eligible_child: {
        2023: null,
      },
      yt_income_tax_before_credits: {
        2023: null,
      },
      yt_income_tax_before_refundable_credits: {
        2023: null,
      },
      yt_non_refundable_credits: {
        2023: null,
      },
      yt_taxable_income: {
        2023: null,
      },
    },
  },
  households: {
    "your household": {
      members: ["you"],
      AB: {
        2023: null,
      },
      BC: {
        2023: null,
      },
      MB: {
        2023: null,
      },
      NB: {
        2023: null,
      },
      NL: {
        2023: null,
      },
      NS: {
        2023: null,
      },
      NT: {
        2023: null,
      },
      NU: {
        2023: null,
      },
      ONT: {
        2023: null,
      },
      PE: {
        2023: null,
      },
      QC: {
        2023: null,
      },
      SK: {
        2023: null,
      },
      YT: {
        2023: null,
      },
      ab_benefits: {
        2023: null,
      },
      acfb_base_component: {
        2023: null,
      },
      acfb_base_component_base: {
        2023: null,
      },
      acfb_base_component_reduction: {
        2023: null,
      },
      acfb_eligible_children: {
        2023: null,
      },
      acfb_working_component: {
        2023: null,
      },
      acfb_working_component_base: {
        2023: null,
      },
      acfb_working_component_reduction: {
        2023: null,
      },
      additional_dental_benefit: {
        2023: 0,
      },
      adjusted_family_net_income: {
        2023: null,
      },
      alberta_child_and_family_benefit: {
        2023: null,
      },
      bc_benefits: {
        2023: null,
      },
      bc_climate_action_tax_credit: {
        2023: null,
      },
      bc_climate_action_tax_credit_base: {
        2023: null,
      },
      bc_climate_action_tax_credit_dependant_children: {
        2023: null,
      },
      bc_climate_action_tax_credit_single_parent_household: {
        2023: null,
      },
      bc_family_benefit: {
        2023: null,
      },
      bc_family_benefit_base: {
        2023: null,
      },
      bc_family_benefit_eligible_children: {
        2023: null,
      },
      bc_family_benefit_first_reduction: {
        2023: null,
      },
      bc_refundable_credits: {
        2023: null,
      },
      benefits: {
        2023: null,
      },
      canada_workers_benefit: {
        2023: null,
      },
      child_benefit: {
        2023: null,
      },
      child_benefit_base: {
        2023: null,
      },
      child_benefit_eligible_children: {
        2023: null,
      },
      child_benefit_reduction: {
        2023: null,
      },
      child_disability_benefit: {
        2023: null,
      },
      child_disability_benefit_children: {
        2023: null,
      },
      child_disability_benefit_reduction: {
        2023: null,
      },
      childcare_costs: {
        2023: 0,
      },
      childcare_received_days: {
        2023: 0,
      },
      childcare_received_hours_per_day: {
        2023: 0,
      },
      childrens_sport_and_culture_participation_costs: {
        2023: 0,
      },
      climate_action_incentive: {
        2023: null,
      },
      climate_action_incentive_dependant_children: {
        2023: null,
      },
      climate_action_incentive_pre_rural: {
        2023: null,
      },
      climate_action_incentive_single_parent_household: {
        2023: null,
      },
      count_children: {
        2023: 0,
      },
      cwb_base: {
        2023: null,
      },
      cwb_base_max_amount: {
        2023: null,
      },
      cwb_base_phase_in: {
        2023: null,
      },
      cwb_base_phase_out: {
        2023: null,
      },
      cwb_disability_category: {
        2023: null,
      },
      cwb_disability_supplement: {
        2023: null,
      },
      cwb_disability_supplement_max_amount: {
        2023: null,
      },
      cwb_disability_supplement_phase_in: {
        2023: null,
      },
      cwb_disability_supplement_phase_out: {
        2023: null,
      },
      cwb_eligible: {
        2023: null,
      },
      family_employment_income: {
        2023: null,
      },
      family_net_income: {
        2023: null,
      },
      family_working_income: {
        2023: null,
      },
      full_time_childcare: {
        2023: false,
      },
      gst_credit: {
        2023: null,
      },
      gst_credit_base: {
        2023: null,
      },
      gst_credit_dependant_children: {
        2023: null,
      },
      gst_credit_reduction: {
        2023: null,
      },
      gst_credit_single_parent_household: {
        2023: null,
      },
      gst_credit_singles_boost: {
        2023: null,
      },
      home_energy_costs_on_a_reserve: {
        2023: 0,
      },
      household_income_tax_before_refundable_credits: {
        2023: null,
      },
      household_market_income: {
        2023: null,
      },
      household_net_income: {
        2023: null,
      },
      household_refundable_tax_credits: {
        2023: null,
      },
      household_size: {
        2023: null,
      },
      income_tax: {
        2023: null,
      },
      is_cwb_family: {
        2023: null,
      },
      is_in_northern_ontario: {
        2023: false,
      },
      is_married: {
        2023: null,
      },
      lived_in_a_student_residence: {
        2023: false,
      },
      market_income: {
        2023: null,
      },
      nb_benefits: {
        2023: null,
      },
      nb_child_benefit: {
        2023: null,
      },
      nb_child_benefit_eligible_children: {
        2023: null,
      },
      nb_child_benefit_supplement: {
        2023: null,
      },
      nb_low_income_tax_reduction: {
        2023: null,
      },
      nb_low_income_tax_reduction_base: {
        2023: null,
      },
      noec_count_children: {
        2023: null,
      },
      northern_ontario_energy_credit: {
        2023: null,
      },
      ns_affordable_living_tax_credit: {
        2023: null,
      },
      ns_income_assistance: {
        2023: 0,
      },
      ns_low_income_tax_reduction: {
        2023: null,
      },
      ns_low_income_tax_reduction_base: {
        2023: null,
      },
      ns_low_income_tax_reduction_base_children: {
        2023: null,
      },
      ns_low_income_tax_reduction_eligible_children: {
        2023: null,
      },
      ns_low_income_tax_reduction_reduction: {
        2023: null,
      },
      ns_poverty_reduction_credit: {
        2023: null,
      },
      ns_refundable_credits: {
        2023: null,
      },
      nu_benefits: {
        2023: null,
      },
      nu_child_benefit: {
        2023: null,
      },
      nu_child_benefit_base_component: {
        2023: null,
      },
      nu_child_benefit_base_component_base: {
        2023: null,
      },
      nu_child_benefit_base_component_reduction: {
        2023: null,
      },
      nu_child_benefit_eligible_children: {
        2023: null,
      },
      nu_child_benefit_working_component: {
        2023: null,
      },
      oeptc: {
        2023: null,
      },
      oeptc_category: {
        2023: null,
      },
      oeptc_count_children: {
        2023: null,
      },
      oeptc_energy_component: {
        2023: null,
      },
      oeptc_occupancy_cost: {
        2023: null,
      },
      oeptc_property_tax_component: {
        2023: null,
      },
      oeptc_senior_status: {
        2023: null,
      },
      on_benefits: {
        2023: null,
      },
      on_child_benefit: {
        2023: null,
      },
      on_child_benefit_base: {
        2023: null,
      },
      on_child_benefit_reduction: {
        2023: null,
      },
      on_child_care_fee_subsidy: {
        2023: null,
      },
      on_child_care_fee_subsidy_children: {
        2023: null,
      },
      on_child_care_fee_subsidy_full_time: {
        2023: null,
      },
      on_child_care_fee_subsidy_part_time: {
        2023: null,
      },
      on_child_care_fee_subsidy_reduction: {
        2023: null,
      },
      on_child_care_fee_subsidy_reduction_children: {
        2023: null,
      },
      on_per_child_care_subsidy_costs: {
        2023: 0,
      },
      on_refundable_credits: {
        2023: null,
      },
      on_sales_tax_credit: {
        2023: null,
      },
      on_sales_tax_credit_base: {
        2023: null,
      },
      on_sales_tax_credit_reduction: {
        2023: null,
      },
      on_trillium_benefit: {
        2023: null,
      },
      oshptg_adjusted_oeptc: {
        2023: null,
      },
      province: {
        2023: "UNKNOWN",
      },
      province_code_str: {
        2023: null,
      },
      province_name: {
        2023: "ONT",
      },
      province_str: {
        2023: null,
      },
      refundable_tax_credits: {
        2023: null,
      },
      rent_paid_to_public_or_non_profit_long_term_care_home: {
        2023: 0,
      },
      sk_active_family_benefit: {
        2023: null,
      },
      sk_benefits: {
        2023: null,
      },
      yt_child_benefit: {
        2023: null,
      },
      yt_child_benefit_base: {
        2023: null,
      },
      yt_child_benefit_eligible_children: {
        2023: null,
      },
      yt_childrens_arts_credit: {
        2023: null,
      },
      yt_childrens_arts_credit_eligible_children: {
        2023: null,
      },
      yt_childrens_arts_credit_expenses: {
        2023: 0,
      },
    },
  },
  axes: [
    [
      {
        name: "employment_income",
        period: "2023",
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
