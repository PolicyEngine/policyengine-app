import { PolicyEngine } from "./PolicyEngine";

export default class PolicyEngineUS extends PolicyEngine {
    constructor() {
        super("uk");

        this.country = "us";
        this.householdId = "default";
        this.policyId = "current-law";
        this.reformPolicyId = "current-law";
    }
}