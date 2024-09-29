import LinkButton from "controls/LinkButton";
import useDisplayCategory from "../../hooks/useDisplayCategory";
import Hero from "../../images/hero.png";
import useCountryId from "../../hooks/useCountryId";
import style from "../../style";

export default function HomeLanding() {
  const displayCategory = useDisplayCategory();
  const mobile = displayCategory === "mobile";
  const tablet = displayCategory === "tablet";
  const countryId = useCountryId();

  return (
    <div
      style={{
        height: mobile ? 600 : 500,
        position: "relative",
      }}
    >
      {countryId === "uk" ? (
        <div
          style={{
            width: "100%",
            height: mobile ? 600 : "100%",
            backgroundColor: style.colors.DARKEST_BLUE,
          }}
        />
      ) : (
        <img
          src={Hero}
          style={{
            width: "100%",
            height: mobile ? 600 : "100%",
            objectFit: "cover",
            position: "absolute",
          }}
          alt="Neon-style abstract lights background"
        />
      )}
      <div
        style={{
          width: mobile ? "80vw" : "60vw",
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: mobile || tablet ? "column" : "row",
            gap: mobile || tablet ? 50 : 30,
            height: "100%",
            backdropFilter: countryId !== "uk" && "blur(10px)",
            WebkitBackdropFilter: countryId !== "uk" && "blur(10px)",
            backgroundColor:
              countryId === "uk" ? "rgb(23, 53, 79)" : "rgba(23, 53, 79, 0.77)",
            padding: 40,
          }}
        >
          <div
            style={{
              width: mobile || tablet ? "100%" : "50%",
            }}
          >
            <h1
              style={{
                color: "white",
                fontSize: mobile || tablet ? 36 : 48,
                alignItems: "center",
                margin: 0,
              }}
            >
              Democratizing Public Policy Analysis
            </h1>
            <p
              style={{
                color: "white",
                fontSize: mobile || tablet ? 18 : 24,
                marginTop: 20,
              }}
            >
              Leveraging cutting-edge technology to make policy analysis
              accessible, transparent, and impactful for everyone.
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
              width: mobile || tablet ? "100%" : "50%",
            }}
          >
            <LinkButton
              text="Explore Our Solutions"
              link="/solutions"
              width="100%"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
