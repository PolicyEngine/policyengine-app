import LinkButton from "../../controls/LinkButton";
import style from "../../style";
import westminster from "../../images/home/westminster.jpg";
import useDisplayCategory from "../../hooks/useDisplayCategory";
import { useWindowWidth } from "../../hooks/useWindow";

export default function HomeElectionBanner() {
  const dC = useDisplayCategory();
  const windowWidth = useWindowWidth();

  if (dC === "mobile") {
    return (
      <div
        style={{
          width: "100%",
          height: "min-content",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          backgroundColor: style.colors.LIGHT_GRAY,
          paddingLeft: "40px",
          paddingRight: "40px",
          paddingTop: "24px",
          paddingBottom: "24px",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            display: "flex",
            backgroundImage: `url(${westminster})`,
            // Fallback
            backgroundColor: style.colors.BLUE_LIGHT,
            backgroundSize: "cover",
            height: "min-content",
          }}
        >
          <div
            style={{
              height: "max-content",
              width: "100%",
              // This is BLUE_PRIMARY, but we're using RGBA
              // to prevent opacity issues
              backgroundColor: "rgba(44, 100, 150, 0.88)",
              display: "flex",
              flexDirection: "column",
              padding: "24px",
              justifyContent: "flex-end",
              alignItems: "flex-start",
              margin: "24px",
            }}
          >
            <h3
              style={{
                color: style.colors.WHITE,
              }}
            >
              Explore PolicyEngine&apos;s UK election coverage
            </h3>
            <p
              style={{
                color: style.colors.WHITE,
              }}
            >
              Use our new interactive tool to estimate the society-wide and
              household-level impacts of each party&apos;s manifesto
            </p>
            <LinkButton
              type="primary"
              text="Compare each party's impacts"
              style={{
                marginTop: "16px",
              }}
              link="/uk/2024-manifestos"
            />
          </div>
        </div>
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            width: "100%",
            height: "1px",
            margin: "24px 0",
            flexShrink: 0,
          }}
        ></div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            height: "100%",
          }}
        >
          <h4
            style={{
              color: style.colors.BLACK,
            }}
          >
            Explore PolicyEngine&apos;s analysis of each party&apos;s manifesto
          </h4>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "16px",
            }}
          >
            <LinkButton
              type="primary"
              text={windowWidth > 650 ? "Conservative" : "Con"}
              backgroundColor="#84badb"
              borderColor="#84badb"
              activeBackgroundColor="#0087dc"
              activeBorderColor="#0087dc"
              style={{
                width: "100%",
              }}
              link="/uk/research/conservative-2024-manifesto"
            />
            <LinkButton
              type="primary"
              text={windowWidth > 650 ? "Labour" : "Lab"}
              backgroundColor="#e388a0"
              borderColor="#e388a0"
              activeBackgroundColor="#e4003b"
              activeBorderColor="#e4003b"
              style={{
                width: "100%",
              }}
              link="/uk/research/labour-2024-manifesto"
            />
            <LinkButton
              type="primary"
              text={windowWidth > 650 ? "Liberal Democrats" : "Lib"}
              backgroundColor="#fad496"
              borderColor="#fad496"
              activeBackgroundColor="#faa61a"
              activeBorderColor="#faa61a"
              style={{
                width: "100%",
              }}
              link="/uk/research/lib-dem-2024-manifesto"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        height: "60vh",
        display: "grid",
        gridTemplateColumns: "75% 1px calc(25% - 1px)",
        gridTemplateRows: "100%",
        backgroundColor: style.colors.LIGHT_GRAY,
        paddingLeft: dC === "desktop" ? "calc((100% - 1200px) / 2)" : "100px",
        paddingRight: dC === "desktop" ? "calc((100% - 1200px) / 2)" : "100px",
        paddingTop: "24px",
        paddingBottom: "24px",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          display: "flex",
          paddingRight: "16px",
        }}
      >
        <img
          alt="Palace of Westminster"
          src={westminster}
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            margin: "auto 0",
            left: "25px",
            height: "max-content",
            width: "80%",
            // This is BLUE_PRIMARY, but we're using RGBA
            // to prevent opacity issues
            backgroundColor: "rgba(44, 100, 150, 0.88)",
            display: "flex",
            flexDirection: "column",
            padding: "48px",
            justifyContent: "flex-end",
            alignItems: "flex-start",
          }}
        >
          <h3
            style={{
              color: style.colors.WHITE,
            }}
          >
            Explore PolicyEngine&apos;s UK election coverage
          </h3>
          <p
            style={{
              color: style.colors.WHITE,
            }}
          >
            Use our new interactive tool to estimate the society-wide and
            household-level impacts of each party&apos;s manifesto
          </p>
          <LinkButton
            type="primary"
            text="Compare each party's impacts"
            style={{
              marginTop: "24px",
            }}
            link="/uk/2024-manifestos"
          />
        </div>
      </div>
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          width: "1px",
          height: "100%",
        }}
      ></div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          height: "100%",
          marginLeft: "16px",
        }}
      >
        <h4
          style={{
            color: style.colors.BLACK,
          }}
        >
          Explore PolicyEngine&apos;s analysis of each party&apos;s manifesto
        </h4>
        <LinkButton
          type="primary"
          text="Conservative"
          backgroundColor="#84badb"
          borderColor="#84badb"
          activeBackgroundColor="#0087dc"
          activeBorderColor="#0087dc"
          style={{
            width: "100%",
          }}
          link="/uk/research/conservative-2024-manifesto"
        />
        <LinkButton
          type="primary"
          text="Labour"
          backgroundColor="#e388a0"
          borderColor="#e388a0"
          activeBackgroundColor="#e4003b"
          activeBorderColor="#e4003b"
          style={{
            width: "100%",
          }}
          link="/uk/research/labour-2024-manifesto"
        />
        <LinkButton
          type="primary"
          text="Liberal Democrats"
          backgroundColor="#fad496"
          borderColor="#fad496"
          activeBackgroundColor="#faa61a"
          activeBorderColor="#faa61a"
          style={{
            width: "100%",
          }}
          link="/uk/research/lib-dem-2024-manifesto"
        />
      </div>
    </div>
  );
}
