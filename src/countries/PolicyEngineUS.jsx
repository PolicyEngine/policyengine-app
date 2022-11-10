import { PolicyEngine } from "./PolicyEngine";

export default class PolicyEngineUS extends PolicyEngine {
    constructor() {
        super("uk");

        this.country = "us";
        this.employment_income = "employment_income";
        this.household_net_income = "spm_unit_net_income";
    }

    initialiseCountry() {
        
    }
}