import { useState } from "react";
import { IntroductionToPolicyEngine } from "./components/content/IntroductionToPolicyEngine";
import { HeaderBar } from "./components/content/Header";
import { CalculatorCallToAction } from "./components/content/CalculatorCallToAction";
import { SubscribeToPolicyEngine } from "./components/content/SubscribeToPolicyEngine";
import { BlogPreview } from "./components/content/BlogPreview";

export default function PolicyEngine() {
  const [countryId] = useState("us");
  return (
    <div>
      <HeaderBar />
      <IntroductionToPolicyEngine countryId={countryId} />
      <CalculatorCallToAction />
      <BlogPreview />
      <SubscribeToPolicyEngine />
    </div>
  );
}
