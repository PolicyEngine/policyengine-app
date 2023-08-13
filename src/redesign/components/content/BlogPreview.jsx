import { useState } from "react";
import style from "../../style";
import { Carousel } from "../controls/Carousel";
import { useDisplayCategory } from "../controls/Responsive";
import { posts } from "../../data/Posts";

export function BlogPreview() {
  // eslint-disable-next-line no-unused-vars
  const displayCategory = useDisplayCategory();
  //const isDesktop = displayCategory === "desktop";
  return (
    <div>
      <h2 style={{ fontFamily: "Roboto Serif", padding: 50 }}>
        Expert policy research and analysis
      </h2>
      <FeaturedBlogPost
        posts={posts.filter((post) => post.tags.includes("featured"))}
      />
    </div>
  );
}

function IndividualMobileFeaturedBlogPost(props) {
  const { post } = props;
  return (
    <div
      style={{
        backgroundColor: style.colors.TEAL_98,
        width: "70vw",
        cursor: "pointer",
      }}
    >
      <div style={{ height: 300, backgroundColor: "lightgray" }}></div>
      <TaggedBox tags={post.tags}>
        <div
          style={{
            padding: 10,
            height: 280,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <p style={{ textTransform: "uppercase" }}>April 26, 2023</p>
          <h3 style={{ fontFamily: "Roboto Serif", fontWeight: "bold" }}>
            {post.title}
          </h3>
          <p>{post.description}</p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "auto",
            }}
          >
            <div
              style={{
                marginLeft: "auto",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                minHeight: 50,
              }}
            >
              Read{" "}
              <span
                className="material-symbols-outlined"
                style={{ marginLeft: 10, fontSize: 15 }}
              >
                arrow_forward
              </span>
            </div>
          </div>
        </div>
      </TaggedBox>
    </div>
  );
}

function MobileFeaturedBlogPost(props) {
  const { posts } = props;
  return (
    <div style={{ display: "flex", overflowX: "scroll", paddingBottom: 50 }}>
      <div style={{ marginLeft: 30 }} />
      {posts.map((post) => (
        <div
          key={post.title}
          style={{
            paddingLeft: 20,
          }}
        >
          <IndividualMobileFeaturedBlogPost post={post} />
        </div>
      ))}
      <div style={{ marginLeft: 30 }} />
    </div>
  );
}

function DesktopFeaturedSmallBlogPosts(props) {
  const { posts } = props;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "40vw",
        marginLeft: 50,
      }}
    >
      {posts.map((post, i) => (
        <div
          key={post.title}
          style={{ marginTop: i > 0 ? 20 : 0, height: "25%" }}
        >
          <SmallBlogPost post={post} />
        </div>
      ))}
    </div>
  );
}

function FeaturedBlogPost(props) {
  const { posts } = props;
  const displayCategory = useDisplayCategory();
  const [postIndex, setPostIndex] = useState(0);
  if (displayCategory === "mobile") {
    return <MobileFeaturedBlogPost posts={posts} />;
  }
  return (
    <div
      style={{
        padding: 50,
        paddingTop: 0,
        display: "flex",
      }}
    >
      <div
        style={{
          backgroundColor: style.colors.TEAL_98,
          width: displayCategory === "desktop" ? "50vw" : null,
          cursor: "pointer",
        }}
      >
        <div style={{ height: 300, backgroundColor: "lightgray" }}></div>
        <TaggedBox tags={posts[postIndex].tags}>
          <div
            style={{
              padding: 20,
              height: 280,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <p style={{ textTransform: "uppercase" }}>April 26, 2023</p>
            <h3 style={{ fontFamily: "Roboto Serif", fontWeight: "bold" }}>
              {posts[postIndex].title}
            </h3>
            <p>{posts[postIndex].description}</p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "auto",
              }}
            >
              <div
                style={{
                  marginLeft: "auto",
                  textTransform: "uppercase",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  minHeight: 50,
                }}
              >
                Read{" "}
                <span
                  className="material-symbols-outlined"
                  style={{ marginLeft: 10, fontSize: 15 }}
                >
                  arrow_forward
                </span>
              </div>
            </div>
          </div>
          <Carousel
            total={posts.length}
            current={postIndex}
            setCurrent={setPostIndex}
          />
        </TaggedBox>
      </div>
      {displayCategory === "desktop" ? (
        <DesktopFeaturedSmallBlogPosts posts={posts} />
      ) : null}
    </div>
  );
}

function Tags(props) {
  const { tags } = props;
  const colors = {
    featured: style.colors.TEAL_LIGHT,
    "in-the-news": style.colors.BLUE_LIGHT,
  };
  const filteredTags = tags.filter((tag) => tag in colors);
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      {filteredTags.map((tag, i) => {
        if (tag in colors) {
          return (
            <div
              key={tag}
              style={{
                backgroundColor: colors[tag],
                textTransform: "uppercase",
                padding: 10,
                border: `2px solid ${style.colors.GRAY}`,
                borderTop: "none",
                borderLeft: i !== 0 ? `2px solid ${style.colors.GRAY}` : "none",
                borderRight:
                  i === filteredTags.length - 1
                    ? `2px solid ${style.colors.GRAY}`
                    : "none",
              }}
            >
              {tag.replaceAll("-", " ")}
            </div>
          );
        }
      })}
    </div>
  );
}

function TaggedBox(props) {
  const { tags, children, ...rest } = props;
  return (
    <div
      style={{
        border: `2px solid ${style.colors.GRAY}`,
        ...(rest.style || {}),
      }}
    >
      <Tags tags={tags} />
      {children}
    </div>
  );
}

function SmallBlogPost(props) {
  const { post } = props;
  return (
    <TaggedBox
      tags={post.tags}
      style={{ backgroundColor: style.colors.LIGHT_GRAY, height: "100%" }}
    >
      <div style={{ padding: 10 }}>
        <h5 style={{ fontFamily: "Roboto Serif", fontWeight: "bold" }}>
          {post.title}
        </h5>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              marginLeft: "auto",
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              minHeight: 20,
            }}
          >
            Read{" "}
            <span
              className="material-symbols-outlined"
              style={{ marginLeft: 10, fontSize: 15 }}
            >
              arrow_forward
            </span>
          </div>
        </div>
      </div>
    </TaggedBox>
  );
}
