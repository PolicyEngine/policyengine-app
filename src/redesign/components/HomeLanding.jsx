import style from "../style";
import { posts } from "../data/Posts";
import {
  FeaturedBlogPreview,
  MediumBlogPreview,
  SmallBlogPreview,
} from "./HomeBlogPreview";
import LinkButton from "controls/LinkButton";
import useDisplayCategory from "./useDisplayCategory";
import Hero from "../images/hero.png";
import useCountryId from "./useCountryId";

function LandingAboutPolicyEngine() {
  const displayCategory = useDisplayCategory();
  return (
    <div
      style={{
        flex: 1,
        margin: 30,
        marginTop: 0,
        marginBottom: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h2
        style={{
          color: style.colors.BLUE_PRIMARY,
        }}
      >
        Computing public policy for everyone
      </h2>
      <div
        style={{
          border: `1px solid ${style.colors.DARK_GRAY}`,
          marginTop: 10,
          marginBottom: 30,
        }}
      />
      <h5>
        PolicyEngine is a non-profit organisation that uses data science to
        build open-source tools that help policymakers and the public understand
        how public policy affects them.
      </h5>
      {displayCategory === "desktop" && (
        <LinkButton text="Use the tool" link="/" />
      )}
    </div>
  );
}

function RelevantBlogPosts() {
  return (
    <>
      <FeaturedBlogPreview
        blogs={posts.slice(0, 3)}
        width="100%"
        imageHeight={300}
      />
      <div style={{ maxHeight: 200, marginTop: 20 }}>
        <SmallBlogPreview blog={posts[1]} />
      </div>
      <div style={{ maxHeight: 800, marginTop: 20 }}>
        <MediumBlogPreview blog={posts[2]} minHeight={50} />
      </div>
      <div style={{ maxHeight: 200, marginTop: 20 }}>
        <SmallBlogPreview blog={posts[3]} />
      </div>
      <div style={{ maxHeight: 200, marginTop: 20 }}>
        <SmallBlogPreview blog={posts[4]} />
      </div>
      <div style={{ maxHeight: 200, marginTop: 20, marginBottom: 20 }}>
        <SmallBlogPreview blog={posts[5]} />
      </div>
    </>
  );
}

RelevantBlogPosts;
LandingAboutPolicyEngine;

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
      <div
        style={{
          width: mobile ? "80vw" : "60vw",
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "between",
          flexDirection: mobile || tablet ? "column" : "row",
          gap: mobile || tablet ? 50 : 30,
          height: "100%",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          backgroundColor: "rgb(23, 53, 79, 0.7)",
          padding: 40,
        }}>
          <div
            style={{
              width: mobile || tablet ? "100%" : "50%",
            }}
          >
            <h1
              style={{
                color: "white",
                fontSize: mobile || tablet ? 40 : 55,
                alignItems: "center",
                margin: 0,
              }}
            >
              Computing Public Policy for Everyone
            </h1>
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
              text="Compute my taxes and benefits"
              link={`/${countryId}/household`}
              width="100%"
            />
            <LinkButton
              text="Compute policy reform impacts"
              link={`/${countryId}/policy`}
              width="100%"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
