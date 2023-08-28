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
import Fuse from 'fuse.js';
import { useSearchParams } from "react-router-dom";

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
  const fuse = new Fuse(posts, {
    keys: ['title'],
  });
  const [searchParams, setSearchParams] = useSearchParams()
  const onSearch = (search) => {
    setSearchParams({search})
  }
  const searchField = searchParams.get("search")
  const filteredPosts = searchField ?
    fuse.search(searchField, {
      distance: 10,
    }).map((result) => result.item) :
    posts;
  return <div style={{
    display: "flex",
  }}>
    <div style={{
      flex: 1,
    }}>
      <BlogPostSearchTools onSearch={onSearch} />
    </div>
    <div style={{
      flex: 3,
      marginLeft: 50,
    }}>
      <h2 style={{marginBottom: 30}}>Results</h2>
      <BlogPostResults posts={filteredPosts} />
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

function BlogPostSearchTools({ onSearch }) {
  return (
    <div style={{
      position: "sticky",
      top: 150,
    }}>
      <TextBox placeholder="Search by keyword, author, etc." fontSize={15} id="blogpost-search-box" onSubmit={onSearch} />
      <ActionButton text="Search" onClick={() => {
        const searchBox = document.getElementById("blogpost-search-box");
        const searchQuery = searchBox.value;
        onSearch(searchQuery);
      }}/>
    </div>
  );
}
