import postJson from "../posts/posts.json";
import style from "../style";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function BlogPostPreviewRegular(props) {
  const { title, description, image, filename, countryId } = props;
  const name = filename.split(".")[0];
  const imageSrc = require(`../images/posts/${image}`);
  const navigate = useNavigate();

  return (
    <motion.div
      style={{
        width: 300,
        height: 400,
        backgroundColor: style.colors.WHITE,
        margin: 10,
        display: "flex",
        flexDirection: "column",
        borderRadius: 20,
        cursor: "pointer",
      }}
      whileHover={{ scale: 1.05 }}
      onClick={() => navigate(`/${countryId}/blog/${name}`)}
    >
      <img
        src={imageSrc}
        style={{
          width: 300,
          height: 200,
          objectFit: "cover",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
        alt="Preview"
      />
      <div style={{ padding: 20 }}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </motion.div>
  );
}

export default function BlogPostHolder(props) {
  const { countryId } = props;
  // postJson is a JSON file containing all the blog posts.

  // Each post in the list has the following fields:
  // - title: the title of the post
  // - date: the date the post was published
  // - filename: the filename of the post (a Markdown file)
  // - image: the filename of the image to display with the post

  let posts = [];
  for (let i = 0; i < postJson.length; i++) {
    posts.push(
      <BlogPostPreviewRegular {...postJson[i]} countryId={countryId} />
    );
  }

  return (
    <div
      style={{
        display: "flex",
        paddingTop: 50,
        paddingBottom: 50,
        backgroundColor: style.colors.LIGHT_GRAY,
        overflowX: "scroll",
      }}
    >
      <div
        style={{
          minWidth: 300,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <h3>Blog</h3>
        </div>
      </div>
      {posts}
    </div>
  );
}
