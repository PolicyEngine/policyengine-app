import Header from "./Header";
import Footer from "./Footer";
import Section from "./Section";
import PageHeader from "./PageHeader";
import style from "../style";
import useDisplayCategory from "./useDisplayCategory";
import TextBox from "./TextBox";
import ActionButton from "./ActionButton";
import {
  posts,
  topicTags,
  locationTags,
  locationLabels,
  topicLabels,
} from "../data/Posts";
import { MediumBlogPreview } from "./HomeBlogPreview";
import Fuse from "fuse.js";
import { useSearchParams } from "react-router-dom";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import FontIcon from "./FontIcon";
import { authorKeys, authorKeyToLabel } from "redesign/data/Authors";

export default function Research() {
  return (
    <div>
      <Header />
      <PageHeader
        title="Research and analysis"
        backgroundColor={style.colors.BLUE_98}
      >
        <p style={{ margin: 0 }}>
          Read PolicyEngine&apos;s research on recent and proposed policy
          reforms, as well as technical and general updates from the
          organisation.
        </p>
      </PageHeader>
      <Section>
        <ResearchExplorer />
      </Section>
      <Footer />
    </div>
  );
}

function ResearchExplorer() {
  const displayCategory = useDisplayCategory();
  const [searchParams, setSearchParams] = useSearchParams();
  const onSearch = (search) => {
    if (!search) {
      setSearchParams({});
    } else {
      setSearchParams({ search });
    }
    scrollTo(0, 0);
  };

  const extractCountryIdFromPathname = () => {
    const pathSegments = window.location.pathname.split("/").filter(Boolean);
    if (pathSegments.length > 0) {
      return pathSegments[0];
    }
  };

  const initialLocations = locationTags.filter(
    (location) =>
      location === extractCountryIdFromPathname() ||
      location.startsWith(extractCountryIdFromPathname() + "-") ||
      location === "global",
  );

  const [filteredTopics, setFilteredTopics] = useState(
    searchParams.get("topics")?.split(",") || topicTags,
  );
  const [filteredLocations, setFilteredLocations] = useState(
    searchParams.get("locations")?.split(",") || initialLocations,
  );

  const [filteredAuthors, setFilteredAuthors] = useState(
    searchParams.get("authors")?.split(",") || authorKeys,
  );
  const filterFunction = (post) => {
    let hasMetAtLeastOneFilteredTopic = false;
    for (const tag of filteredTopics) {
      if (post.tags.includes(tag)) {
        hasMetAtLeastOneFilteredTopic = true;
      }
    }
    let hasMetAtLeastOneFilteredLocation = false;
    for (const tag of filteredLocations) {
      if (post.tags.includes(tag)) {
        hasMetAtLeastOneFilteredLocation = true;
      }
    }
    let hasMetAtLeastOneFilteredAuthor = false;
    for (const author of filteredAuthors) {
      if (post.authors.includes(author)) {
        hasMetAtLeastOneFilteredAuthor = true;
      }
    }
    return (
      hasMetAtLeastOneFilteredLocation &
      hasMetAtLeastOneFilteredTopic &
      hasMetAtLeastOneFilteredAuthor
    );
  };

  const preFilteredPosts = posts.filter(filterFunction);
  const fuse = new Fuse(preFilteredPosts, {
    keys: ["title"],
  });
  const searchField = searchParams.get("search");
  const filteredPosts = searchField
    ? fuse
        .search(searchField, {
          distance: 10,
        })
        .map((result) => result.item)
    : preFilteredPosts;

  const searchTools = (
    <BlogPostSearchTools
      onSearch={onSearch}
      filteredTopics={filteredTopics}
      filteredLocations={filteredLocations}
      setFilteredTopics={setFilteredTopics}
      setFilteredLocations={setFilteredLocations}
      filteredAuthors={filteredAuthors}
      setFilteredAuthors={setFilteredAuthors}
    />
  );

  const postResults = (
    <>
      <h2 style={{ marginBottom: 30 }}>
        {filteredPosts.length} result{filteredPosts.length === 1 ? "" : "s"}
      </h2>
      <BlogPostResults posts={filteredPosts} />
    </>
  );

  if (displayCategory === "desktop") {
    return (
      <div
        style={{
          display: "flex",
        }}
      >
        <div
          style={{
            flex: 1,
          }}
        >
          {searchTools}
        </div>
        <div
          style={{
            flex: 3,
            marginLeft: 50,
          }}
        >
          {postResults}
        </div>
      </div>
    );
  } else {
    return (
      <>
        {searchTools}
        {postResults}
      </>
    );
  }
}

function BlogPostResults({ posts }) {
  const displayCategory = useDisplayCategory();
  let postComponents;
  if (displayCategory === "desktop") {
    postComponents = posts.map((post) => (
      <div
        key={JSON.stringify(post)}
        style={{
          width: "47%",
          marginBottom: 40,
        }}
      >
        <MediumBlogPreview key={post.title} blog={post} />
      </div>
    ));
  } else {
    postComponents = posts.map((post) => (
      <div
        key={JSON.stringify(post)}
        style={{
          marginBottom: 40,
        }}
      >
        <MediumBlogPreview key={post.title} blog={post} />
      </div>
    ));
  }
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      {postComponents}
    </div>
  );
}

function BlogPostSearchTools({
  onSearch,
  filteredTopics,
  setFilteredTopics,
  filteredLocations,
  setFilteredLocations,
  filteredAuthors,
  setFilteredAuthors,
}) {
  const textBox = (
    <TextBox
      placeholder="Search by keyword, author, etc."
      fontSize={15}
      id="blogpost-search-box"
      onSubmit={onSearch}
      enterKeyHint="Search"
    />
  );
  const searchButton = (
    <ActionButton
      text="Search"
      onClick={() => {
        const searchBox = document.getElementById("blogpost-search-box");
        const searchQuery = searchBox.value;
        onSearch(searchQuery);
      }}
      height={50}
    />
  );
  const filterTools = (
    <>
      <p
        className="spaced-sans-serif"
        style={{
          borderBottom: `1px solid ${style.colors.MEDIUM_DARK_GRAY}`,
          paddingTop: 30,
        }}
      >
        Filter by
      </p>
      <ExpandableCheckBoxList
        title="Topic"
        keys={topicTags}
        keyToLabel={topicLabels}
        checkedValues={filteredTopics}
        setCheckedValues={setFilteredTopics}
      />
      <ExpandableCheckBoxList
        title="Location"
        keys={locationTags}
        keyToLabel={locationLabels}
        checkedValues={filteredLocations}
        setCheckedValues={setFilteredLocations}
      />
      <ExpandableCheckBoxList
        title="Author"
        keys={authorKeys}
        keyToLabel={authorKeyToLabel}
        checkedValues={filteredAuthors}
        setCheckedValues={setFilteredAuthors}
      />
    </>
  );
  const displayCategory = useDisplayCategory();
  if (displayCategory === "desktop") {
    return (
      <div
        style={{
          position: "sticky",
          top: 150,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {textBox}
        <div style={{ marginBottom: 20 }} />
        {searchButton}
        {filterTools}
      </div>
    );
  } else if (displayCategory === "tablet") {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        {textBox}
        <div style={{ marginLeft: "auto", paddingLeft: 20 }} />
        {searchButton}
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        {textBox}
      </div>
    );
  }
}

function ExpandableCheckBoxList({
  title,
  keys,
  keyToLabel,
  checkedValues,
  setCheckedValues,
}) {
  return (
    <Expandable title={title}>
      {keys.map((key) => (
        <Checkbox
          key={key}
          label={keyToLabel[key] || key}
          checked={checkedValues.includes(key)}
          onCheck={
            checkedValues.includes(key)
              ? () => setCheckedValues(checkedValues.filter((k) => k !== key))
              : () => setCheckedValues(checkedValues.concat([key]))
          }
        />
      ))}
      <div
        style={{
          borderBottom: "1px solid lightgray",
          width: "100%",
          marginTop: 5,
          marginBottom: 5,
        }}
      />
      <Checkbox
        label="Select all"
        checked={checkedValues.length === keys.length}
        onCheck={
          checkedValues.length === keys.length
            ? () => setCheckedValues([])
            : () => setCheckedValues(keys)
        }
      />
    </Expandable>
  );
}

function Expandable({ title, children }) {
  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef();
  const titleRef = useRef();
  const titleComponent = (
    <div
      style={{ display: "flex", alignItems: "center" }}
      ref={titleRef}
      onClick={() => setExpanded(!expanded)}
    >
      <p style={{ margin: 0 }}>{title}</p>
      <FontIcon
        name="arrow_drop_down"
        size={20}
        style={{
          marginLeft: "auto",
          transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.3s ease-in-out",
        }}
      />
    </div>
  );
  return (
    <motion.div
      style={{
        cursor: "pointer",
        overflowY: "hidden",
        marginTop: 10,
      }}
      initial={{
        maxHeight: 30,
      }}
      animate={{
        maxHeight: expanded
          ? contentRef.current?.getBoundingClientRect().height +
            titleRef.current?.getBoundingClientRect().height
          : titleRef.current?.getBoundingClientRect().height,
      }}
      transition={{
        duration: 0.3,
        easings: "ease-out",
      }}
    >
      {titleComponent}
      <div style={{ paddingLeft: 20, paddingTop: 10 }} ref={contentRef}>
        {children}
      </div>
    </motion.div>
  );
}

function Checkbox({ label, checked, onCheck }) {
  label;
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <input
        type="checkbox"
        title={label}
        style={{
          borderRadius: 0,
          border: `2px solid ${style.colors.DARK_GRAY}`,
          height: 20,
          width: 20,
          padding: 5,
          margin: 5,
          appearance: "none",
          backgroundColor: checked
            ? style.colors.TEAL_PRESSED
            : style.colors.TEAL_LIGHT,
          cursor: "pointer",
        }}
        onClick={() => {
          onCheck(!checked);
        }}
      />
      <p style={{ marginLeft: 15, margin: 0, fontFamily: "Roboto Serif" }}>
        {label}
      </p>
    </div>
  );
}
