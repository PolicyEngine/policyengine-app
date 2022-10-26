import { PolicyEngine } from "./PolicyEngine";

export default class PolicyEngineUK extends PolicyEngine {
    constructor() {
        super("uk");

        this.country = "uk";
        this.householdId = "default";
        this.policyId = "current-law";
        this.reformPolicyId = "current-law";
    }
}