import { Link, Navigate } from "react-router-dom";
import useCountryId from "../hooks/useCountryId";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Section from "../layout/Section";
import style from "../style";
import {
  locationLabels,
  locationTags,
  posts,
  topicLabels,
  topicTags,
} from "../posts/postTransformers";
import moment from "moment";
import { TwitterTweetEmbed } from "react-twitter-embed";
import Markdown from "react-markdown";
import useDisplayCategory from "../redesign/components/useDisplayCategory";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import React, { useEffect, useState, useRef } from "react";
import { useReadingTime } from "react-hook-reading-time";
import {
  FacebookOutlined,
  LinkedinOutlined,
  MailOutlined,
  PrinterOutlined,
  TwitterOutlined,
  FileImageOutlined,
} from "@ant-design/icons";
import authors from "../posts/authors.json";
import Plot from "react-plotly.js";
import { Helmet } from "react-helmet";
import { MarkdownFormatter } from "../redesign/style/MarkdownFormatter";
import {
  HighlightedBlock,
  PlotlyChartCode,
} from "../redesign/style/MarkdownFormatter";

// Function to handle image loading
const handleImageLoad = (path) => {
  // Try to load the image
  try {
    return require("../images/posts/" + path);
  } catch (error) {
    // If the require fails, return the fallback image
    console.error(`Failed to load image at ${path}:`, error);
    return "";
  }
};

export default function BlogPage() {
  // /uk/research/blog-slug-here
  const url = window.location.pathname;
  const countryId = useCountryId();
  const postName = url.split("/")[3];

  const post = posts.find((post) => post.slug === postName);
  const postDate = moment(post.date, "YYYY-MM-DD HH:mm:ss");

  const imageUrl = post.image ? handleImageLoad(post.image) : "";
  const file = require(`../posts/articles/${post.filename}`);

  const [content, setContent] = useState("");
  const isNotebook = post.filename.endsWith(".ipynb");
  useEffect(() => {
    fetch(file)
      .then((response) => response.text())
      .then((text) => {
        if (isNotebook) {
          setContent(JSON.parse(text));
        } else {
          setContent(text);
        }
      });
  }, [file, isNotebook]);

  // Some old links might point to a dated URL format
  const YYYYMMDDFormat = /^\d{4}-\d{2}-\d{2}-/;
  if (YYYYMMDDFormat.test(postName)) {
    return <Navigate to={`/${countryId}/blog/${postName.substring(11)}`} />;
  }

  let markdown;

  if (isNotebook && content) {
    markdown = content.cells
      .filter((cell) => cell.cell_type === "markdown")
      .map((cell) => cell.source.join(""))
      .join("\n");
  } else {
    markdown = content;
  }

  return (
    <>
      <Helmet>
        <meta property="og:title" content={post.title} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:description" content={post.description} />
      </Helmet>
      <Header />
      <Section backgroundColor={style.colors.BLUE_98}>
        <PostHeadingSection
          post={post}
          markdown={markdown}
          notebook={isNotebook && content}
          postDate={postDate}
          imageUrl={imageUrl}
        />
      </Section>
      <Section>
        <PostBodySection
          post={post}
          markdown={markdown}
          notebook={isNotebook && content}
        />
      </Section>
      <Footer />
    </>
  );
}

function NotebookCell({ data }) {
  const inputCell = data.source;
  const outputCell = (data.outputs || [])[0]?.data;
  let outputCellComponent;
  if (!outputCell) {
    outputCellComponent = null;
  } else {
    const outputType = Object.keys(outputCell)[0];
    if (outputType === "text/plain") {
      outputCellComponent = (
        <NotebookOutputPlain data={outputCell[outputType]} />
      );
    } else if (outputType === "application/vnd.plotly.v1+json") {
      outputCellComponent = (
        <NotebookOutputPlotly data={outputCell[outputType]} />
      );
    } else if (outputType === "text/html") {
      outputCellComponent = (
        <NotebookOutputHTML data={outputCell[outputType]} />
      );
    } else if (outputType === "text/markdown") {
      outputCellComponent = (
        <NotebookOutputMarkdown data={outputCell[outputType]} />
      );
    } else {
      outputCellComponent = <p>Unknown output type: {outputType}</p>;
    }
  }
  return (
    <>
      <PythonCodeCell data={inputCell} />
      {outputCellComponent}
    </>
  );
}

function PythonCodeCell() {
  return null;
}

function decode(str) {
  return str.replaceAll("\\u00a3", "£");
}

function recursivelyDecode(obj) {
  if (typeof obj === "string") {
    return decode(obj);
  } else if (Array.isArray(obj)) {
    return obj.map(recursivelyDecode);
  } else if (!obj) {
    return obj;
  } else if (typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        key,
        recursivelyDecode(value),
      ]),
    );
  } else {
    return obj;
  }
}

function parseJSONSafe(str) {
  str = str.replaceAll("'", "");
  return recursivelyDecode(JSON.parse(str));
}

function NotebookOutputPlain({ data }) {
  let content;
  try {
    let processedData;
    if (typeof data === "string") {
      processedData = data;
    } else {
      processedData = data[0];
    }
    content = parseJSONSafe(processedData);
    return <NotebookOutputPlotly data={content} />;
  } catch (e) {
    console.log(e, data);
    content = data;
  }
  return <p>{JSON.stringify(data)}</p>;
}

function NotebookOutputHTML() {
  return null;
}

function NotebookOutputMarkdown({ data }) {
  return <MarkdownFormatter markdown={data.join("")} />;
}

function NotebookOutputPlotly({ data }) {
  const title = data.layout?.title?.text;
  const displayCategory = useDisplayCategory();

  return (
    <>
      {title && (
        <h5
          style={{
            fontFamily: "Roboto Serif",
            color: style.colors.GRAY,
            textEmphasis: "italic",
          }}
        >
          {title}
        </h5>
      )}
      <Plot
        data={data.data}
        layout={Object.assign(data.layout, {
          width:
            displayCategory === "mobile" ? 600 : data.layout?.width || "100%",
          height: data.layout?.height || 600,
          title: {
            text: "",
          },
          paper_bgcolor: "transparent",
          plot_bgcolor: "transparent",
          margin: {
            l: 20,
            r: 20,
            t: 20,
            b: 20,
          },
        })}
        config={{
          displayModeBar: false,
          responsive: true,
        }}
      />
    </>
  );
}

function PostBodySection({ post, markdown, notebook }) {
  const displayCategory = useDisplayCategory();
  let bodyContent;
  if (!markdown && !notebook) {
    return null;
  }
  if (notebook) {
    const cellHandler = (cell) => {
      if (
        cell.metadata?.tags?.includes("highlighted-left") &&
        displayCategory === "desktop"
      ) {
        const nextCell = notebook.cells[notebook.cells.indexOf(cell) + 1];
        let currentCellData = cell.outputs[0].data["text/plain"][0];
        currentCellData = JSON.stringify(parseJSONSafe(currentCellData));
        const nextCellData = nextCell.source.join("");
        return (
          <HighlightedBlock
            leftContent={
              <PlotlyChartCode
                data={currentCellData}
                backgroundColor={style.colors.LIGHT_GRAY}
              />
            }
            rightContent={<MarkdownFormatter markdown={nextCellData} />}
          />
        );
      } else if (
        cell.metadata?.tags?.includes("highlighted-right") &&
        displayCategory === "desktop"
      ) {
        return null;
      } else if (cell.cell_type === "markdown") {
        return <MarkdownFormatter markdown={cell.source.join("")} />;
      } else if (cell.cell_type === "code") {
        return <NotebookCell data={cell} />;
      } else {
        return JSON.stringify(cell);
      }
    };
    bodyContent = notebook.cells.map(cellHandler);
  } else {
    bodyContent = <MarkdownFormatter markdown={markdown} />;
  }
  if (displayCategory === "desktop") {
    return (
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1, marginRight: 50 }}>
          <div style={{ position: "sticky", top: 150 }}>
            <p className="spaced-sans-serif">Contents</p>
            <LeftContents markdown={markdown} notebook={notebook} />
          </div>
        </div>
        <div style={{ flex: 4 }}>
          {bodyContent}
          <AuthorSection post={post} />
        </div>
        <div style={{ flex: 1, marginLeft: 30 }}>
          <div style={{ position: "sticky", top: 150 }}>
            <MoreOn post={post} />
          </div>
        </div>
      </div>
    );
  } else if (displayCategory === "tablet") {
    return (
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1, marginRight: 50 }}>
          <div style={{ position: "sticky", top: 150 }}>
            <p className="spaced-sans-serif">Contents</p>
            <div style={{ flex: 3, marginRight: 50, marginLeft: 50 }}>
              <LeftContents markdown={markdown} notebook={notebook} />
            </div>
            <div style={{ marginTop: 20 }} />
            <div style={{ marginRight: 50, marginLeft: 50 }}>
              <MoreOn post={post} />
            </div>
          </div>
        </div>
        <div style={{ flex: 3, marginRight: 50, marginLeft: 50 }}>
          {bodyContent}
          <AuthorSection post={post} />
        </div>
      </div>
    );
  } else {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: 30, marginRight: 50, marginLeft: 50 }}>
            <p className="spaced-sans-serif">Contents</p>
            <LeftContents markdown={markdown} notebook={notebook} />
          </div>
          <div style={{ flex: 1, marginRight: 50, marginLeft: 50 }}>
            {bodyContent}
            <AuthorSection post={post} />
          </div>
          <div style={{ flex: 1, marginRight: 50, marginLeft: 50 }}>
            <div style={{ marginTop: 20 }} />
            <MoreOn post={post} />
          </div>
        </div>
      </div>
    );
  }
}

function PostHeadingSection({ post, markdown, notebook, postDate, imageUrl }) {
  const displayCategory = useDisplayCategory();
  if (!notebook && !markdown) {
    return null;
  }
  if (displayCategory === "desktop") {
    return (
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <p className="spaced-sans-serif">
            {postDate.format("MMMM DD, YYYY")}
          </p>
          <Authorship post={post} />
          <div style={{ marginBottom: 100 }} />
          <ReadTime markdown={markdown} />
          <div style={{ marginTop: 100 }} />
          <ShareLinks post={post} />
        </div>
        <div style={{ flex: 3 }}>
          <h1>{post.title}</h1>
          <h5 style={{ marginTop: 50 }}>{post.description}</h5>
          {imageUrl === "" ? (
            <div
              style={{
                height: "300px",
                width: "100%",
                display: "flex",
                border: "1px solid grey",
                position: "relative",
              }}
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
          ) : (
            <img
              alt={post.title}
              src={imageUrl}
              style={{ width: "100%", marginTop: 50 }}
            />
          )}
        </div>
        <div style={{ flex: 1 }}></div>
      </div>
    );
  } else if (displayCategory === "tablet") {
    return (
      <div style={{ display: "flex" }}>
        <div>
          <h1>{post.title}</h1>
          <h5 style={{ marginTop: 50 }}>{post.description}</h5>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 30,
            }}
          >
            <Authorship post={post} />
            <p className="spaced-sans-serif">
              {postDate.format("MMMM DD, YYYY")}
            </p>
            <ReadTime markdown={markdown} />
          </div>
          <img alt={post.title} src={imageUrl} style={{ width: "100%" }} />
          <ShareLinks post={post} />
        </div>
      </div>
    );
  } else {
    return (
      <div style={{ display: "flex" }}>
        <div>
          <h1>{post.title}</h1>
          <h5 style={{ marginTop: 50 }}>{post.description}</h5>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 30,
            }}
          >
            <div>
              <p className="spaced-sans-serif">
                {postDate.format("MMMM DD, YYYY")}
              </p>
              <Authorship post={post} />
            </div>
            <ReadTime markdown={markdown} />
          </div>
          <img alt={post.title} src={imageUrl} style={{ width: "100%" }} />
          <ShareLinks post={post} />
        </div>
      </div>
    );
  }
}

function Authorship({ post }) {
  const countryId = useCountryId();
  const authorNames = post.authors.map((author) => (
    <nobr key={author}>
      <span style={{ color: style.colors.BLUE_PRIMARY }}>
        <Link
          to={`/${countryId}/research?authors=${author}`}
          className="highlighted-link"
          style={{ marginBottom: 0, marginTop: 20 }}
        >
          {author.replaceAll("-", " ")}
        </Link>
      </span>
    </nobr>
  ));
  let sentenceStructure;
  if (authorNames.length === 1) {
    sentenceStructure = <>By {authorNames}</>;
  } else if (authorNames.length === 2) {
    sentenceStructure = (
      <>
        By {authorNames[0]} <nobr>and {authorNames[1]}</nobr>
      </>
    );
  } else {
    const lastAuthor = authorNames.pop();
    sentenceStructure = (
      <>
        By {authorNames.reduce((prev, curr) => [prev, ", ", curr])}, and{" "}
        {lastAuthor}
      </>
    );
  }
  return <p className="spaced-sans-serif">{sentenceStructure}</p>;
}

function AuthorSection({ post }) {
  const countryId = useCountryId();
  const authorDescriptions = post.authors.map((author) => {
    const authorImage = require(
      `../images/authors/${authors[author].headshot}`,
    );

    return (
      <div
        key={author}
        style={{
          display: "flex",
          justifyContent: "start",
          gap: 15,
          padding: "1rem .5rem",
          borderTop: "1px solid black",
        }}
      >
        <img
          alt={authors[author].name}
          src={authorImage}
          width={70}
          height={70}
          style={{
            objectFit: "cover",
          }}
        />
        <p style={{ paddingTop: 5 }}>
          <span
            className="spaced-sans-serif"
            style={{ color: style.colors.BLUE_PRIMARY }}
          >
            <Link
              to={`/${countryId}/research?authors=${author}`}
              className="highlighted-link"
            >
              {author.replaceAll("-", " ")}
            </Link>
          </span>
          <br></br>
          <span style={{ fontSize: 12 }}>{authors[author].title}</span>
        </p>
      </div>
    );
  });

  return (
    <ul style={{ marginTop: 50, marginLeft: "-2rem" }}>{authorDescriptions}</ul>
  );
}

function MoreOn({ post }) {
  const countryId = useCountryId();
  const categoryLinks = post.tags
    .filter((tag) => locationTags.includes(tag) || topicTags.includes(tag))
    .map((tag) => {
      if (locationTags.includes(tag)) {
        return (
          <div key={tag} style={{ marginBottom: 10 }}>
            <Link
              className="highlighted-link"
              to={`/${countryId}/research?locations=${tag}`}
              style={{ marginBottom: 0, marginTop: 20 }}
            >
              {locationLabels[tag]}
            </Link>
          </div>
        );
      }
      return (
        <div key={tag} style={{ marginBottom: 10 }}>
          <Link
            className="highlighted-link"
            to={`/${countryId}/research?topics=${tag}`}
            style={{ marginBottom: 0, marginTop: 20 }}
          >
            {topicLabels[tag]}
          </Link>
        </div>
      );
    });
  return (
    <>
      <p
        className="spaced-sans-serif"
        style={{ color: style.colors.BLUE_PRIMARY, zIndex: -1 }}
      >
        More on
      </p>
      {categoryLinks}
    </>
  );
}

function ReadTime({ markdown }) {
  const { text } = useReadingTime(markdown);
  return (
    <p className="spaced-sans-serif" style={{ color: style.colors.GRAY }}>
      {text}
    </p>
  );
}

function DesktopShareLink({ icon, url, action, text }) {
  const displayCategory = useDisplayCategory();
  const desktop = displayCategory === "desktop";
  return (
    <div
      style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
      onClick={() => {
        if (url) {
          window.open(url, "_blank");
        } else action();
      }}
    >
      {React.createElement(icon, {
        style: {
          color: desktop ? style.colors.WHITE : style.colors.DARK_GRAY,
          border: !desktop && `2px solid ${style.colors.DARK_GRAY}`,
          backgroundColor: desktop ? style.colors.GRAY : "transparent",
          fontSize: displayCategory === "desktop" ? 15 : 40,
          padding: 10,
          marginTop: displayCategory === "desktop" ? 10 : 40,
          marginBottom: 10,
          marginRight: displayCategory === "desktop" ? 10 : 0,
        },
      })}
      <p
        className="spaced-sans-serif"
        style={{ marginLeft: 35, margin: 0, color: style.colors.GRAY }}
      >
        {text}
      </p>
    </div>
  );
}

function ShareLinks({ post }) {
  const displayCategory = useDisplayCategory();
  const desktop = displayCategory === "desktop";
  return (
    <div
      style={{
        display: "flex",
        flexDirection: desktop ? "column" : "row",
        width: "100%",
        justifyContent: desktop ? null : "space-between",
      }}
    >
      {desktop && <p className="spaced-sans-serif">Share</p>}
      <DesktopShareLink
        icon={TwitterOutlined}
        url={`https://twitter.com/intent/tweet?text=${post.title}&url=${window.location.href}`}
        text={desktop && "Twitter"}
      />
      <DesktopShareLink
        icon={FacebookOutlined}
        url={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
        text={desktop && "Facebook"}
      />
      <DesktopShareLink
        icon={LinkedinOutlined}
        url={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=${post.title}&summary=${post.description}`}
        text={desktop && "LinkedIn"}
      />
      <DesktopShareLink
        icon={MailOutlined}
        url={`mailto:?subject=${post.title}&body=${window.location.href}`}
        text={desktop && "Email"}
      />
      <DesktopShareLink
        icon={PrinterOutlined}
        action={window.print}
        text={desktop && "Print"}
      />
    </div>
  );
}

function LeftContents(props) {
  const { markdown } = props;

  // Look for ##, ###, and ### to create a table of contents.
  // Split the markdown into an array of lines
  const lines = markdown.split("\n");
  // Find theShareLinks lines that start with ##, ###, or ####
  const headers = lines.filter((line) => line.startsWith("##"));
  const headerLevels = headers.map((header) => header.split("#").length - 1);
  const headerTexts = headers.map((header) => {
    const text = header.split(" ").slice(1).join(" ");
    if (text.includes("[")) {
      return text.split("[").slice(1).join("[").split("]")[0];
    }
    return text;
  });
  const headerSlugs = headers.map((header) =>
    header
      .split(" ")
      .slice(1)
      .join(" ")
      .split(" ")
      .join("-")
      .replace("\\", "")
      .replace(/,/g, ""),
  );

  let contents = [];
  for (let i = 0; i < headers.length; i++) {
    const headerLevel = headerLevels[i];
    const headerText = headerTexts[i];
    const headerSlug = headerSlugs[i];
    contents.push(
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: 5 }}
        key={headerSlug}
      >
        <p
          style={{
            fontSize: 16 - 2 * (headerLevel - 2),
            cursor: "pointer",
            margin: 5,
            marginLeft: 0,
            paddingLeft: 10 * (headerLevel - 2),
            padding: 5,
            fontFamily: "Roboto Serif",
            marginBottom: 0,
            marginTop: 0,
          }}
          onClick={() => {
            const element = document.getElementById(headerSlug);
            if (element) {
              window.scrollTo({
                top: element.offsetTop - 200,
                behavior: "smooth",
              });
            }
          }}
        >
          {headerText}
        </p>
      </div>,
    );
  }

  if (contents.length === 0) {
    return null;
  }

  return contents;
}
