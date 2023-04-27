import postJson from "../posts/posts.json";
import style from "../style";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";

export function BlogPostPreviewRegular(props) {
  const { title, description, image, filename, countryId, date, width, height, imageHeight, backgroundColor } =
    props;
  let name = filename.split(".")[0];
  if (
    name.startsWith("uk-") ||
    name.startsWith("us-") ||
    name.startsWith("ca-")
  ) {
    name = name.substring(3);
  }
  const imageSrc = require(`../images/posts/${image}`);
  const navigate = useNavigate();

  // Date will be like 2022-01-01. Convert it to 'April 1st, 2022'
  const dateString = moment(date).format("MMMM Do, YYYY");

  return (
    <motion.div
      initial={{
        backgroundColor: backgroundColor || style.colors.WHITE,
        color: style.colors.BLACK,
      }}
      style={{
        width: width || 300,
        margin: 10,
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        height: height || 450,
      }}
      whileHover={{ 
        scale: 1.05,
        backgroundColor: style.colors.DARK_GRAY,
        color: style.colors.WHITE,
      }}
      transition={{ duration: 0.25 }}
      onClick={() => navigate(`/${countryId}/blog/${name}`)}
    >
      <img
        src={imageSrc}
        style={{
          width: width || 300,
          height: imageHeight || 180,
          maxHeight: 180,
          // Fit inside without stretching
          objectFit: "cover",
        }}
        alt="Preview"
      />
      <div style={{ padding: 20, paddingBottom: 0,  }}>
        <p style={{fontSize: 18}} >{title}</p>
        <p>{description}</p>
      </div>
      <div
        style={{
          padding: 20,
          paddingTop: 0,
          marginTop: "auto",
          display: "flex",
          alignItems: "end",
        }}
      >
        <p
          style={{
            marginLeft: "auto",
            marginBottom: 5,
          }}
        >
          {dateString}
        </p>
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
  // Sort posts by date
  postJson.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
  for (let i = 0; i < postJson.length; i++) {
    if (
      postJson[i].tags.includes(countryId) ||
      postJson[i].tags.includes("global")
    )
      posts.push(
        <BlogPostPreviewRegular
          key={i}
          {...postJson[i]}
          countryId={countryId}
        />
      );
  }

  return (
    <div
      style={{
        display: "flex",
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: style.colors.LIGHT_GRAY,
        overflowX: "scroll",
        overflowY: "hidden",
      }}
    >
      {posts}
    </div>
  );
}
