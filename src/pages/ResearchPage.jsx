import { BlogPostPreviewRegular } from "../layout/BlogPostHolder";
import postJson from "../posts/posts.json";
import style from "../style";

export default function ResearchPage(props) {
  document.title = "Research | PolicyEngine";
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
  let j = 0;
  for (let i = 0; i < postJson.length; i++) {
    if (
      postJson[i].tags.includes(countryId) ||
      postJson[i].tags.includes("global")
    ) {
      posts.push(
        <div
          key={i}
          style={{
            padding: 10,
          }}
        >
          <BlogPostPreviewRegular
            {...postJson[i]}
            countryId={countryId}
            width={j == 0 ? "30vw" : "30vw"}
            height={400}
            imageHeight={200}
            backgroundColor={style.colors.LIGHT_GRAY}
          />
        </div>
      );
      j++;
    }
  }
  style;

  // Left to right, top to bottom (wrap)
  return (
    <>
      <div style={{ padding: 50 }}>
        <h1>Research</h1>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {posts}
      </div>
    </>
  );
}
