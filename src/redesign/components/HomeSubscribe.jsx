import style from "../style";
import Section from "./Section";

export default function HomeSubscribe() {
  return (
    <Section height={500} backgroundColor={style.colors.BLUE_PRESSED}>
      <h2
        style={{
          color: style.colors.WHITE,
        }}
      >
        Subscribe to PolicyEngine
      </h2>
    </Section>
  );
}
