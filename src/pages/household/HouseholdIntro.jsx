import NavigationButton from "../../controls/NavigationButton";
import CenteredMiddleColumn from "../../layout/CenteredMiddleColumn";

export default function HouseholdIntro() {
  return (
    <CenteredMiddleColumn
      title="Enter your household details"
      description="Tell us about your household to calculate your net income after taxes and benefits."
    >
      <NavigationButton
        text="Enter my household"
        focus="input.household.maritalStatus"
      />
    </CenteredMiddleColumn>
  );
}
