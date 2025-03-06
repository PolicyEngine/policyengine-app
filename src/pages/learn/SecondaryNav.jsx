import { Link } from "react-router-dom";
import style from "../../style";
import { LEARN_DROPDOWN_LINKS } from "../../layout/Header.jsx";

// During front-end redesign, this feature should be rethought,
// as it does not fit best design practices. This should not be
// in the code base on or after Jan. 1, 2026.

export default function SecondaryNav(props) {
  const { countryId, pageType } = props;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#F7FAFD",
        padding: "0 1rem 1rem",
        flexWrap: "wrap",
        gap: "0.5rem",
      }}
    >
      {LEARN_DROPDOWN_LINKS.map((page) => (
        <Link
          key={page.link}
          to={`/${countryId}/${page.link}`}
          style={{
            padding: "0.5rem 1rem",
            textDecoration: "none",
            fontWeight: page.link === pageType ? "bold" : "normal",
            borderBottom:
              page.link === pageType
                ? `2px solid ${style.colors.BLUE}`
                : "none",
            color: style.colors.BLACK,
          }}
        >
          {page.title}
        </Link>
      ))}
    </div>
  );
}
