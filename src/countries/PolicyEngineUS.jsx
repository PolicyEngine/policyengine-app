import { PolicyEngine } from "./PolicyEngine";

export default class PolicyEngineUS extends PolicyEngine {
    constructor() {
        super("uk");

        this.country = "us";
    }

    initialiseCountry() {
        
    }
}