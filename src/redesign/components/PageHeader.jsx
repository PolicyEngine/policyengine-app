import style from "../style";
import Section from "./Section";
import useDisplayCategory from "./useDisplayCategory";


export default function PageHeader({ title, children }) {
    const displayCategory = useDisplayCategory();

    const dividerBorderStyle = `0.5px solid ${style.colors.BLACK}`;
    const divider = displayCategory !== "mobile" ?
        <div style={{borderRight: dividerBorderStyle, height: 145, marginLeft: 30, marginRight: 30 }} /> :
        <div style={{borderTop: dividerBorderStyle, width: "100%", marginBottom: 30 }} />;
    return <Section><div
        style={{
            display: "flex",
            alignItems: displayCategory !== "mobile" ? "center" : null,
            flexDirection: {
                desktop: "row",
                tablet: "row",
                mobile: "column",
            }[displayCategory],
        }}>
            <div style={{
                width: {
                    desktop: 300,
                    tablet: 300,
                    mobile: "100%",
                }[displayCategory],
            }}>
                <h2 style={{
                    color: style.colors.BLUE_PRIMARY,
                }}>
                    {title}
                </h2>
            </div>
            {divider}
            <p style={{
                paddingTop: 10
            }}>
                {children}
            </p>
        </div>
    </Section>
}