import style from "redesign/style";

export function BlogPreview() {
  return (
    <div
      style={{
        padding: 100,
      }}
    >
      <h2 style={{ fontFamily: "Roboto Serif", marginBottom: 50 }}>
        Expert policy analysis
      </h2>
      <div style={{ display: "flex" }}>
        <FeaturedBlogPost />
        <div style={{ width: "30vw", paddingLeft: 50 }}>
          <SmallBlogPost />
        </div>
      </div>
    </div>
  );
}

function FeaturedBlogPost() {
  return (
    <div
      style={{
        backgroundColor: style.colors.TEAL_LIGHT,
        width: "50vw",
      }}
    >
      <div style={{ height: 300, backgroundColor: "lightgray" }}></div>
      <div style={{ height: 300, padding: 20 }}>
        <p style={{ textTransform: "uppercase" }}>April 26, 2023</p>
        <h3 style={{ fontFamily: "Roboto Serif", fontWeight: "bold" }}>
          Introducing Utah State Income Tax Analysis on PolicyEngine
        </h3>
        <p>
          Guaranteed Income for the 21st Century, or 21GI as the New School
          abbreviates it, would abolish the Earned Income Tax Credit and provide
          $12,500 per adult and $4,500 per child. The proposal then phases out
          the new benefit linearly with respect to the tax unit’s adjusted gross
          income, depending on number of adults{" "}
        </p>
      </div>
    </div>
  );
}

function SmallBlogPost() {
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: style.colors.MEDIUM_DARK_GRAY,
      }}
    >
      <div style={{ display: "flex" }}>
        <div
          style={{
            backgroundColor: style.colors.TEAL_LIGHT,
            textTransform: "uppercase",
            height: 40,
            padding: 10,
            border: `1px solid ${style.colors.DARK_GRAY}`,
          }}
        >
          Featured
        </div>
        <div
          style={{
            backgroundColor: style.colors.LIGHT_GRAY,
            textTransform: "uppercase",
            height: 40,
            padding: 10,
            border: `1px solid ${style.colors.DARK_GRAY}`,
          }}
        >
          Blog
        </div>
        <p
          style={{
            textTransform: "uppercase",
            marginLeft: "auto",
            padding: 10,
          }}
        >
          April 26, 2023
        </p>
      </div>
      <div style={{ width: "80%", padding: 20, marginBottom: 20 }}>
        <h5 style={{ fontFamily: "Roboto Serif", fontWeight: "bold" }}>
          Introducing Utah State Income Tax Analysis on PolicyEngine
        </h5>
      </div>
    </div>
  );
}
