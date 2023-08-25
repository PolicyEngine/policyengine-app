import Header from "./Header";
import Footer from "./Footer";
import Section from "./Section";
import PageHeader from "./PageHeader";
import style from "../style";
import useDisplayCategory from "./useDisplayCategory";
import TextBox from "./TextBox";
import ActionButton from "./ActionButton";
import { posts } from "../data/Posts";
import { MediumBlogPreview } from "./HomeBlogPreview";

export default function Research() {
  const displayCategory = useDisplayCategory();
  return (
    <div>
      <Header />
      <PageHeader
        title="Research and analysis"
        backgroundColor={style.colors.BLUE_98}
      >
        <p style={{margin: 0}}>
        Explore Brookings’ research and commentary to deepen your understanding of local, national, and global challenges. Our experts offer evidence-based analysis and innovative policy solutions that inform decision-making and drive positive change.
        </p>
      </PageHeader>
      <Section>
      {{
        desktop: <ResearchDesktop />,
      }[displayCategory]}
      </Section>
      <Footer />
    </div>
  );
}

function ResearchDesktop() {
  return <div style={{
    display: "flex",
  }}>
    <div style={{
      flex: 1,
    }}>
      <BlogPostSearchTools />
    </div>
    <div style={{
      flex: 3,
      marginLeft: 50,
    }}>
      <h2 style={{marginBottom: 30}}>Results</h2>
      <BlogPostResults posts={posts} />
    </div>
  </div>
}

function BlogPostResults({ posts }) {
  return <div style={{
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
  }}>
      {posts.map((post) => (
        <div key={post.title} style={{
          width: "47%",
          marginBottom: 40,
        }}>
          <MediumBlogPreview key={post.title} blog={post} />
        </div>
      ))}
    </div>;
}

function BlogPostSearchTools() {
  return (
    <div>
      <TextBox placeholder="Search by keyword, author, etc." fontSize={15} />
      <ActionButton text="Search" />
    </div>
  );
}

BlogPostResults;
BlogPostSearchTools;