import { useEffect } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Section from "../layout/Section";
import PageHeader from "../layout/PageHeader";
import style from "../style";
import useDisplayCategory from "../hooks/useDisplayCategory";
import TextBox from "../layout/TextBox";
import Button from "controls/Button";
import {
  posts,
  topicTags,
  locationTags,
  locationLabels,
  topicLabels,
} from "../posts/postTransformers";
import authors from "../posts/authors.json";
import { MediumBlogPreview } from "./home/HomeBlogPreview";
import Fuse from "fuse.js";
import { useSearchParams } from "react-router-dom";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import FontIcon from "../layout/FontIcon";
import { Helmet } from "react-helmet";
import { Checkbox } from "antd";
import { useWindowHeight } from "../hooks/useWindow";

export default function Research() {
  return (
    <>
      <Helmet>
        <title>Research | PolicyEngine</title>
      </Helmet>
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
    </>
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
    window.scrollTo(0, 0);
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
    searchParams.get("topics")?.split(",") || [],
  );
  const [filteredLocations, setFilteredLocations] = useState(
    searchParams.get("locations")?.split(",") || initialLocations,
  );

  const [filteredAuthors, setFilteredAuthors] = useState(
    searchParams.get("authors")?.split(",") || [],
  );

  useEffect(() => {
    setFilteredTopics(searchParams.get("topics")?.split(",") || []);
    setFilteredLocations(
      searchParams.get("locations")?.split(",") || initialLocations,
    );
    setFilteredAuthors(searchParams.get("authors")?.split(",") || []);
  }, [searchParams, initialLocations]);

  const filterFunction = (post) => {
    const meetsTopics =
      filteredTopics.length === 0 ||
      filteredTopics.some((tag) => post.tags.includes(tag));
    const meetsLocations =
      filteredLocations.length === 0 ||
      filteredLocations.some((tag) => post.tags.includes(tag));
    const meetsAuthors =
      filteredAuthors.length === 0 ||
      filteredAuthors.some((author) => post.authors.includes(author));
    return meetsTopics && meetsLocations && meetsAuthors;
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

export function BlogPostResults({ posts }) {
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
  const authorKeys = Object.keys(authors);
  const authorKeyToLabel = Object.fromEntries(
    authorKeys.map((key) => [key, authors[key].name]),
  );

  const [expandedList, setExpandedList] = useState(null);

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
    <Button
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
        expandedList={expandedList}
        setExpandedList={setExpandedList}
      />
      <ExpandableCheckBoxList
        title="Location"
        keys={locationTags}
        keyToLabel={locationLabels}
        checkedValues={filteredLocations}
        setCheckedValues={setFilteredLocations}
        expandedList={expandedList}
        setExpandedList={setExpandedList}
      />
      <ExpandableCheckBoxList
        title="Author"
        keys={authorKeys}
        keyToLabel={authorKeyToLabel}
        checkedValues={filteredAuthors}
        setCheckedValues={setFilteredAuthors}
        expandedList={expandedList}
        setExpandedList={setExpandedList}
      />
    </>
  );

  const displayCategory = useDisplayCategory();
  // Three display values, in pixels
  const windowHeight = useWindowHeight();
  const TOP = 150;
  const BOTTOM_MARGIN = 24;
  if (displayCategory === "desktop") {
    return (
      <div
        style={{
          position: "sticky",
          top: TOP,
          display: "flex",
          flexDirection: "column",
          maxHeight: windowHeight - TOP - BOTTOM_MARGIN,
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
  expandedList,
  setExpandedList,
}) {
  return (
    <Expandable
      title={title}
      expandedList={expandedList}
      setExpandedList={setExpandedList}
    >
      {keys.map((key) => (
        <AntCheckbox
          key={key}
          label={keyToLabel[key] || key}
          checked={checkedValues.includes(key)}
          onCheck={() =>
            setCheckedValues(
              checkedValues.includes(key)
                ? checkedValues.filter((k) => k !== key)
                : [...checkedValues, key],
            )
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
      <AntCheckbox
        label="Select all"
        checked={checkedValues.length === keys.length}
        onCheck={() =>
          setCheckedValues(checkedValues.length === keys.length ? [] : keys)
        }
      />
    </Expandable>
  );
}

function Expandable({ title, expandedList, setExpandedList, children }) {
  const expanded = expandedList === title;
  const contentRef = useRef();
  const titleRef = useRef();

  const contentHeight = contentRef.current?.getBoundingClientRect().height;
  const titleHeight = 31;

  function handleExpand() {
    if (expanded) {
      setExpandedList(null);
    } else {
      setExpandedList(title);
    }
  }

  const titleComponent = (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 3,
        backgroundColor: style.colors.WHITE,
      }}
      ref={titleRef}
      onClick={() => handleExpand()}
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
        overflowY: expanded ? "scroll" : "hidden",
        overflowX: "hidden",
        marginTop: 10,
        position: "relative",
      }}
      initial={{
        maxHeight: titleHeight,
      }}
      animate={{
        maxHeight: expanded ? contentHeight + titleHeight : titleHeight,
      }}
    >
      {titleComponent}
      <div style={{ paddingLeft: 20, paddingTop: 10 }} ref={contentRef}>
        {children}
      </div>
    </motion.div>
  );
}

function AntCheckbox({ label, checked, onCheck }) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <style>
        {`
          /* Change the color of the checked checkbox */
          .ant-checkbox-inner {
            border-radius: 0 !important;
            height: 20px !important;
            width: 20px !important;
          }

          .ant-checkbox-checked .ant-checkbox-inner {
            background-color: #2C6496; /* Your custom color */
            border-radius: 0
          }

        `}
      </style>
      <Checkbox
        onChange={() => {
          onCheck(!checked);
        }}
        style={{
          margin: 5,
          appearance: "none",
          height: 20,
          fontWeight: 300,
          fontFamily: "Roboto Serif",
          cursor: "pointer",
        }}
      >
        {label}
      </Checkbox>
    </div>
  );
}
