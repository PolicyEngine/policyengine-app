import { useState } from "react";
import style from "redesign/style";
import { Carousel } from "../controls/Carousel";
import { motion } from "framer-motion";
import { useDisplayCategory } from "../controls/Responsive";

export function BlogPreview() {
  const displayCategory = useDisplayCategory();
  return (
    <div
      style={{
        padding: 100,
      }}
    >
      <h2 style={{ fontFamily: "Roboto Serif", marginBottom: 50 }}>
        Expert policy analysis
      </h2>
      <div style={{ 
        display: "flex",
        flexDirection: displayCategory === "mobile" ? "column" : "row",
      }}>
        <FeaturedBlogPost posts={[blogPost, blogPost]} />
        <div style={{ width: "30vw", paddingLeft: 50 }}>
          <SmallBlogPost post={blogPost} />
          <SmallBlogPost post={blogPost} />
          <SmallBlogPost post={blogPost} />
          <SmallBlogPost post={blogPost} />
        </div>
      </div>
    </div>
  );
}

const blogPost = {
  title: "Introducing Utah State Income Tax Analysis on PolicyEngine",
  date: "April 26, 2023",
  description: `Guaranteed Income for the 21st Century, or 21GI as the New School`,
  image: "https://picsum.photos/200/300",
  tags: ["featured", "in-the-news", "uk"],
}

function SmallBlogPost(props) {
  const { post } = props;
  return <div style={{ backgroundColor: style.colors.LIGHT_GRAY, height: 600 / 4, marginBottom: 20 }}>
    <div style={{ padding: 20 }}>
      <p style={{ textTransform: "uppercase" }}>April 26, 2023</p>
      <h5 style={{ fontFamily: "Roboto Serif", fontWeight: "bold" }}>
      {post.title}
      </h5>
    </div>
  </div>;
}

function FeaturedBlogPost(props) {
  const { posts } = props;
  const [postIndex, setPostIndex] = useState(0);
  return (
    <motion.div
      style={{
        backgroundColor: style.colors.LIGHT_GRAY,
        width: "50vw",
        cursor: "pointer",
      }}
    >
      <div style={{ height: 300, backgroundColor: "lightgray" }}></div>
      <div style={{ height: 300 }}>
        <Tags tags={posts[postIndex].tags} />
        <div style={{padding: 20,}}>
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
      <Carousel total={posts.length} current={postIndex} setCurrent={setPostIndex} />
    </motion.div>
  );
}

function Tags(props) {
  const { tags } = props;
  const colors = {
    "featured": style.colors.TEAL_LIGHT,
    "in-the-news": style.colors.BLUE_LIGHT,
  }
  const filteredTags = tags.filter(tag => tag in colors);
  return <div style={{
    display: "flex",
  }}>
    {filteredTags.map((tag, i) => {
      if (tag in colors) {
        return <div 
          key={tag}
          style={{
          backgroundColor: colors[tag],
          textTransform: "uppercase",
          padding: 10,
          border: `2px solid ${style.colors.GRAY}`,
          borderRight: i === filteredTags.length - 1 ? `2px solid ${style.colors.GRAY}` : "none",
        }}>{tag.replaceAll("-", " ")}</div>
      }
    })}
  </div>
}
