import Button from "../../controls/Button"
import style from "../../style"
import westminster from "../../images/home/westminster.jpg";

export default function HomeElectionBanner() {
  return (
    <div
      style={{
        width: "100%",
        height: "75vh",
        display: "grid",
        gridTemplateColumns: "75% 1px calc(25% - 1px)",
        gridTemplateRows: "100%",
        backgroundColor: "#222222",
        paddingLeft: "calc((100% - 1200px) / 2)",
        paddingRight: "calc((100% - 1200px) / 2)",
        paddingTop: "24px",
        paddingBottom: "24px"
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          display: "flex",
          paddingRight: "16px"
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
              color: style.colors.WHITE
            }}
          >
            Use our new interactive tool to estimate the society-wide and household-level impacts of each party&apos;s manifesto
          </p>
            <Button
              type="primary"
              text="Compare each party's impacts"
              style={{
                marginTop: "24px"
              }}
            />
        </div>

      </div>
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          width: "1px",
          height: "100%"
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
          marginLeft: "16px"
        }}
      >
        <h4
          style={{
            color: style.colors.WHITE
          }}
        >
          Explore PolicyEngine&apos;s analysis of each party&apos;s manifesto
        </h4>
        <Button
          type="primary"
          text="Conservative"
          backgroundColor="#84badb"
          borderColor="#84badb"
          activeBackgroundColor="#0087dc"
          style={{
            width: "100%"
          }}
        />
        <Button
          type="primary"
          text="Labour"
          backgroundColor="#e388a0"
          borderColor="#e388a0"
          activeBackgroundColor="#e4003b"
          style={{
            width: "100%"
          }}
        />
        <Button
          type="primary"
          text="Liberal Democratic"
          backgroundColor="#fad496"
          borderColor="#fad496"
          activeBackgroundColor="#faa61a"
          style={{
            width: "100%"
          }}
        />

      </div>
    </div>
  )
}