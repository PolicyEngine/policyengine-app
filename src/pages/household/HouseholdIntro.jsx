import SearchParamNavButton from "../../controls/SearchParamNavButton";
import CenteredMiddleColumn from "../../layout/CenteredMiddleColumn";

export default function HouseholdIntro() {
  return (
    <CenteredMiddleColumn
      title="Enter your household details"
      description="Tell us about your household to calculate your net income after taxes and benefits."
    >
      <SearchParamNavButton
        text="Enter my household"
        focus="input.household.maritalStatus"
        style={{margin: "20px auto 10px"}}
      />
    </CenteredMiddleColumn>
  );
}
