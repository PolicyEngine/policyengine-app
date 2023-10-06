import style from "../style";
import Section from "./Section";
import useDisplayCategory from "./useDisplayCategory";

export default function PageHeader({
  title,
  subtitle,
  collapseTablet,
  backgroundColor,
  children,
}) {
  const displayCategory = useDisplayCategory();
  const dividerBorderStyle = `0.5px solid ${style.colors.BLACK}`;
  const collapsed =
    displayCategory === "mobile" ||
    (displayCategory === "tablet" && collapseTablet);
  const divider = !collapsed ? (
    <div
      style={{
        borderRight: dividerBorderStyle,
        height: "100%",
        marginLeft: 30,
        marginRight: 30,
      }}
    />
  ) : (
    <div
      style={{ borderTop: dividerBorderStyle, width: "100%", marginBottom: 30 }}
    />
  );
  return (
    <Section backgroundColor={backgroundColor}>
      <div
        style={{
          display: "flex",
          alignItems: collapsed ? "flex-start" : "center",
          flexDirection: collapsed ? "column" : "row",
          height: "100%",
        }}
      >
        <div
          style={{
            width: collapsed ? "100%" : 300,
          }}
        >
          <h2
            style={{
              color: style.colors.BLUE_PRIMARY,
            }}
          >
            {title}
          </h2>
          {subtitle && <h5 style={{ marginTop: 20 }}>{subtitle}</h5>}
        </div>
        {divider}
        <div
          style={{
            maxWidth: displayCategory === "mobile" ? "100%" : 800,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          {children}
        </div>
      </div>
    </Section>
  );
}
