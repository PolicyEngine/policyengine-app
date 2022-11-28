import NavigationButton from "../../controls/NavigationButton";
import ResultsPanel from "../../layout/ResultsPanel";

export default function HouseholdIntro() {
  return (
    <ResultsPanel
      title="Enter your household details"
      description="Tell us about your household to calculate your net income after taxes and benefits."
    >
      <NavigationButton
        text="Enter my household"
        focus="input.household.maritalStatus"
      />
    </ResultsPanel>
  );
}
