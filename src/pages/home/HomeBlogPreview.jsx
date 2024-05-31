import style from "../../style";
import { SectionBottom, SectionTop } from "../../layout/Section";
import { posts } from "../../posts/postTransformers";
import useDisplayCategory from "../../hooks/useDisplayCategory";
import moment from "moment";
import React from "react";
import useCountryId from "../../hooks/useCountryId";
import EmphasisedLink from "../../layout/EmphasisedLink";
import { FileImageOutlined } from "@ant-design/icons";

export default function HomeBlogPreview() {
  const countryId = useCountryId();
  const featuredPosts =
    posts
      .filter(
        (post) =>
          post.tags.includes("featured") &&
          (post.tags.includes(countryId) || post.tags.includes("global")),
      )
      .sort((a, b) => b.date - a.date) || [];
  const otherPosts = posts
    .filter(
      (post) =>
        (post.tags.includes(countryId) || post.tags.includes("global")) &&
        !featuredPosts.includes(post),
    )
    .sort((a, b) => b.date - a.date);

  // Combine featured posts and other posts
  const allPosts = featuredPosts.concat(otherPosts);

  const displayCategory = useDisplayCategory();
  return (
    <>
      <SectionTop
        backgroundColor={style.colors.LIGHT_GRAY}
        title="Expert policy analysis"
      />
      {
        {
          mobile: <MobileBlogPreview allPosts={allPosts} />,
          tablet: <TabletBlogPreview allPosts={allPosts} />,
          desktop: <DesktopBlogPreview allPosts={allPosts} />,
        }[displayCategory]
      }
    </>
  );
}

function ReadMore() {
  const displayCategory = useDisplayCategory();
  const mobile = displayCategory === "mobile";
  const countryId = useCountryId();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: mobile ? "center" : "flex-end",
      }}
    >
      <div
        style={{
          margin: 40,
        }}
      >
        <EmphasisedLink
          text="Read more"
          url={`/${countryId}/research`}
          size={14}
        />
      </div>
    </div>
  );
}

function DesktopBlogPreview({ allPosts }) {
  const firstPost = allPosts?.[0];
  const rightColumnPosts = allPosts?.slice(1, 5);
  const firstRowPosts = allPosts?.slice(5, 8);

  return (
    <SectionBottom backgroundColor={style.colors.LIGHT_GRAY}>
      <div
        style={{
          marginTop: 50,
          display: "flex",
          flexDirection: "row",
          position: "relative",
        }}
      >
        <div style={{ width: "60%" }}>
          <div
            style={{
              position: "sticky",
              top: style.spacing.HEADER_HEIGHT + 20,
            }}
          >
            <FeaturedBlogPreview blogs={firstPost} />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "40%",
            marginLeft: 20,
            gap: 20,
          }}
        >
          {rightColumnPosts?.map((post) => (
            <SmallBlogPreview key={post.slug} blog={post} />
          ))}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 40,
          gap: 40,
        }}
      >
        {firstRowPosts?.map((post) => (
          <MediumBlogPreview key={post.slug} blog={post} />
        ))}
      </div>
      <ReadMore />
    </SectionBottom>
  );
}

function TabletBlogPreview({ allPosts }) {
  const firstPost = allPosts?.[0];
  const smallPosts = allPosts.slice(1, 5);
  const leftHandPost = allPosts.slice(5, 6);
  const bottomPosts = allPosts.slice(6, 8);
  return (
    <SectionBottom>
      <div style={{ marginTop: 50, display: "flex", flexDirection: "row" }}>
        <FeaturedBlogPreview blogs={firstPost} />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 40,
        }}
      >
        <div style={{ flex: 1 }}>
          {leftHandPost?.map((post, index) => (
            <MediumBlogPreview blog={post} key={index} />
          ))}
        </div>
        <div style={{ width: 40 }} />
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {smallPosts?.map((post, index) => (
            <React.Fragment key={index}>
              <SmallBlogPreview key={post.slug} blog={post} />
              {index !== smallPosts.length - 1 && (
                <div style={{ height: 40 }} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 40,
        }}
      >
        {bottomPosts?.map((post, index) => (
          <React.Fragment key={index}>
            <MediumBlogPreview key={post.slug} blog={post} />
            {index !== bottomPosts.length - 1 && <div style={{ width: 40 }} />}
          </React.Fragment>
        ))}
      </div>
      <ReadMore />
    </SectionBottom>
  );
}

function MobileBlogPreview({ allPosts }) {
  const firstPost = allPosts?.[0];
  const smallPosts = allPosts.slice(1, 5);
  return (
    <div>
      <div
        style={{
          display: "flex",
          overflowX: "scroll",
          marginBottom: 40,
          marginTop: 40,
        }}
      >
        <div style={{ minWidth: 20 }} />
        <div
          style={{
            minWidth: 400,
            marginLeft: 20,
            marginRight: 20,
            height: "100%",
          }}
        >
          <MediumBlogPreview blog={firstPost} />
        </div>
        <div style={{ minWidth: 20 }} />
      </div>
      <SectionBottom>
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {smallPosts?.map((post, index) => (
            <>
              <SmallBlogPreview key={post.slug} blog={post} />
              {index !== smallPosts.length - 1 && (
                <div style={{ height: 40 }} />
              )}
            </>
          ))}
        </div>
        <ReadMore />
      </SectionBottom>
    </div>
  );
}

function BlogBox({
  topLeft,
  topRight,
  left,
  children,
  bottomLeft,
  bottomRight,
  noBorder,
  style,
}) {
  return (
    <div
      style={{
        display: "flex",
        border: noBorder ? null : `1px solid black`,
        ...style,
        flexDirection: "row",
      }}
    >
      <div style={{ display: "flex" }}>{left}</div>
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>{topLeft}</div>
          <div>{topRight}</div>
        </div>
        {children}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "auto",
          }}
        >
          <div>{bottomLeft}</div>
          <div>{bottomRight}</div>
        </div>
      </div>
    </div>
  );
}

function BlogTags({ tags }) {
  const displayCategory = useDisplayCategory();
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      {tags.slice(0, 3).map((tag) => (
        <div
          key={tag}
          style={{
            backgroundColor:
              {
                featured: style.colors.TEAL_LIGHT,
                "in-the-news": style.colors.BLUE_LIGHT,
              }[tag] || style.colors.WHITE,
            padding: displayCategory === "desktop" ? 10 : 20,
            fontFamily: "Roboto",
            fontSize: 12,
            textTransform: "uppercase",
            borderRight: `1px solid ${style.colors.BLACK}`,
            borderBottom: `1px solid ${style.colors.BLACK}`,
          }}
        >
          {tag.replaceAll("-", " ")}
        </div>
      ))}
    </div>
  );
}

const handleImageLoad = (path) => {
  // Try to load the image
  try {
    return require("../../images/posts/" + path);
  } catch (error) {
    // If the require fails, return the fallback image
    console.error(`Failed to load image at ${path}:`, error);
    return "";
  }
};

export function FeaturedBlogPreview({ blogs, width, imageHeight }) {
  // Only defined for desktop and tablet displays
  const displayCategory = useDisplayCategory();
  const currentBlog = blogs || {};

  const imageUrl = blogs.image ? handleImageLoad(blogs.image) : "";

  const countryId = useCountryId();
  const link = `/${countryId}/research/${currentBlog.slug}`;
  return (
    <div
      style={{
        width: width || "100%",
        border: `1px solid ${style.colors.BLACK}`,
      }}
    >
      <div
        style={{
          position: "relative",
        }}
      >
        {imageUrl === "" ? (
          <div style={{ height: "300px", width: "100%" }}>
            <FileImageOutlined
              style={{
                objectFit: "cover",
                fontSize: "32px",
                position: "absolute",
                top: "250px",
                right: "20px",
              }}
            />
          </div>
        ) : (
          // <FileImageOutlined />
          <img
            src={imageUrl}
            alt={currentBlog.coverAltText || `${currentBlog.title} cover image`}
            width="100%"
            height={imageHeight || (displayCategory === "desktop" ? 450 : 400)}
            style={{
              objectFit: "cover",
              borderBottom: `1px solid ${style.colors.BLACK}`,
            }}
          />
        )}
        <BlogBox
          noBorder
          topLeft={<BlogTags tags={currentBlog.tags || []} />}
          bottomRight={
            <div style={{ margin: 10 }}>
              <EmphasisedLink text="Read" url={link} size={14} isStretched />
            </div>
          }
          style={{
            backgroundColor: style.colors.TEAL_LIGHT,
            minHeight: 340,
          }}
        >
          <div style={{ padding: 20 }}>
            <p style={{ textTransform: "uppercase" }}>
              {moment(currentBlog.date).format("MMMM D, YYYY")}
            </p>
            <h3 style={{ minHeight: 70 }}>{currentBlog.title}</h3>
            <p>{currentBlog.description}</p>
          </div>
        </BlogBox>
      </div>
    </div>
  );
}

export function MediumBlogPreview({ blog, minHeight }) {
  const displayCategory = useDisplayCategory();
  const countryId = useCountryId();
  const slug = blog.filename.split(".")[0];
  const link = `/${countryId}/research/${slug}`;

  const imageUrl = blog.image ? handleImageLoad(blog.image) : "";

  return (
    <div
      style={{
        height: "100%",
        flex: 1,
        position: "relative",
      }}
    >
      <div>
        {imageUrl !== "" ? (
          <img
            src={imageUrl}
            alt={blog.coverAltText || `${blog.title} cover image`}
            height={300}
            width="100%"
            style={{
              objectFit: "cover",
              border: `1px solid ${style.colors.BLACK}`,
              borderBottom: "none",
            }}
          />
        ) : (
          <div
            style={{ height: "300px", width: "100%", border: "1px solid grey" }}
          >
            <FileImageOutlined
              style={{
                fontSize: "32px",
                position: "absolute",
                top: "250px",
                right: "20px",
              }}
            />
          </div>
        )}
      </div>
      <BlogBox
        style={{
          backgroundColor: blog.tags.includes(["in-the-news"])
            ? style.colors.BLUE_LIGHT
            : style.colors.LIGHT_GRAY,
          minHeight: minHeight || (displayCategory === "mobile" ? 460 : 430),
          maxHeight: displayCategory === "mobile" ? 400 : null,
        }}
        topLeft={<BlogTags tags={blog.tags} />}
        bottomRight={
          <div style={{ margin: 30 }}>
            <EmphasisedLink text="Read" url={link} size={14} isStretched />
          </div>
        }
      >
        <div style={{ padding: 20 }}>
          <p style={{ textTransform: "uppercase", fontFamily: "Roboto" }}>
            {moment(blog.date).format("MMMM D, YYYY")}
          </p>
          <h4>{blog.title}</h4>
          <p>{blog.description}</p>
        </div>
      </BlogBox>
    </div>
  );
}

function SideTags({ tags }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: "red",
      }}
    >
      {tags.slice(0, 2).map((tag, i) => (
        <div
          key={tag}
          style={{
            flex: 1,
            backgroundColor:
              {
                featured: style.colors.TEAL_LIGHT,
                "in-the-news": style.colors.BLUE_LIGHT,
              }[tag] || style.colors.WHITE,
            padding: 20,
            fontFamily: "Roboto",
            fontSize: 12,
            textTransform: "uppercase",
            borderTop: i === 1 ? `1px solid ${style.colors.BLACK}` : "none",
            borderRight: `1px solid ${style.colors.BLACK}`,
            width: 50,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              transform: "rotate(-90deg)",
            }}
          >
            {tag.replaceAll("-", " ")}
          </div>
        </div>
      ))}
    </div>
  );
}

export function SmallBlogPreview({ blog }) {
  const displayCategory = useDisplayCategory();
  const countryId = useCountryId();
  let topLeft = null,
    left = null;
  if (displayCategory === "desktop") {
    topLeft = <BlogTags tags={blog.tags} />;
  } else {
    left = <SideTags tags={blog.tags} />;
  }

  const slug = blog.filename.split(".")[0];
  const link = `/${countryId}/research/${slug}`;

  return (
    <BlogBox
      topLeft={topLeft}
      left={left}
      topRight={
        <p
          style={{
            fontSize: 14,
            padding: 10,
            paddingBottom: 0,
            textTransform: "uppercase",
            fontFamily: "Roboto",
          }}
        >
          {moment(blog.date).format("MMMM D, YYYY")}
        </p>
      }
      bottomRight={
        <div style={{ marginRight: 10, marginBottom: 10 }}>
          <EmphasisedLink text="Read" url={link} size={14} isStretched />
        </div>
      }
      style={{
        backgroundColor: blog.tags.includes(["in-the-news"])
          ? style.colors.BLUE_LIGHT
          : style.colors.LIGHT_GRAY,
        height: "100%",
        position: "relative",
      }}
    >
      <div
        style={{
          padding: 10,
          paddingTop: 0,
          minHeight: displayCategory === "desktop" ? 100 : null,
        }}
      >
        <h4>{blog.title}</h4>
      </div>
    </BlogBox>
  );
}
