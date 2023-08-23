import style from "../style";
import Section from "./Section";

export default function Footer() {
  return (
    <Section height={500} backgroundColor={style.colors.BLUE_PRESSED}>
      <h1
        style={{
          color: style.colors.WHITE,
        }}
      >
        Footer
      </h1>
    </Section>
  );
}
