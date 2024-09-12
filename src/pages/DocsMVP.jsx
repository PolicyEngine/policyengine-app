import { Link, Navigate, useParams } from "react-router-dom";
import useCountryId from "../hooks/useCountryId";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Section from "../layout/Section";
import CodeBlock from "../layout/CodeBlock";
import style from "../style";
import {
  locationLabels,
  locationTags,
  posts,
  topicLabels,
  topicTags,
} from "../posts/postTransformers";
import useDisplayCategory from "../hooks/useDisplayCategory";
import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { Helmet } from "react-helmet";
import {
  MarkdownFormatter,
  HighlightedBlock,
  PlotlyChartCode,
} from "../layout/MarkdownFormatter";

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

export default function DocsMVP() {
  // /uk/research/blog-slug-here
  const { postName } = useParams();
  const countryId = useCountryId();

  const post = posts.find((post) => post.slug === postName);

  const imageUrl = post.image ? handleImageLoad(post.image) : "";
  // const file = require(`../posts/articles/${post.filename}`);
  // const file = require(`../posts/articles/child-benefit.ipynb`);
  const file = require("../posts/articles/child-benefit.json")

  const [content, setContent] = useState("");
  // const isNotebook = post.filename.endsWith(".ipynb");
  const isNotebook = true;
  useEffect(() => {
    // fetch(file)
    //   .then((response) => response.text())
    //   .then((text) => {
    //     if (isNotebook) {
    //       // console.log("Notebook content:", JSON.parse(text));
    //       // setContent(JSON.parse(text));
    //       setContent(text);
    //     } else {
      //       setContent(text);
      //     }
      //   });
      setContent(file)
  }, [file, isNotebook]);

  // Some old links might point to a dated URL format
  const YYYYMMDDFormat = /^\d{4}-\d{2}-\d{2}-/;
  if (YYYYMMDDFormat.test(postName)) {
    return <Navigate to={`/${countryId}/blog/${postName.substring(11)}`} />;
  }

  let markdown;

   if (isNotebook && content) {
    // console.log("content", content);
    markdown = content.cells
      .filter((cell) => cell.cell_type === "markdown")
      .map((cell) => {
        if (Array.isArray(cell.source)) {
          return cell.source.join("");
        } else {
          return cell.source;
        }
      })
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
      {/* <Section backgroundColor={style.colors.BLUE_98}>
        <PostHeadingSection
          post={post}
          markdown={markdown}
          notebook={isNotebook && content}
          postDate={postDate}
          imageUrl={imageUrl}
        />
      </Section> */}
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
  // const outputCell = (data.outputs || [])[1]?.data;
  const outputCell = (data.outputs || []).slice(-1)[0]
  // const outputs = data.outputs || [];
  // const outputCell = outputs[0]?.output_type === "display_data" ?  outputs.slice(-1)[0]?.data :  outputs[0]?.data['text/html'] ;
  
  // console.log("outputCell", inputCell, outputCell);
  let outputCellComponent;
  if (!outputCell) {
    outputCellComponent = null;
  } else {
    // const outputType = Object.keys(outputCell).slice(0)[0];
    const outputType =  outputCell["output_type"];
    if (outputType === "text/plain") {
      outputCellComponent = (
        <NotebookOutputPlain data={outputCell[outputType]} />
      );
    }
    else if(outputType === "execute_result"){
      outputCellComponent = (
        <NotebookOutputHTML data={outputCell['data']['text/html']} />
      );
    }
    else if(outputType === "display_data"){
      outputCellComponent = (
        <NotebookOutputPlotly data={outputCell['data']["application/vnd.plotly.v1+json"]} />
      );
    } else if (outputType === "application/vnd.plotly.v1+json") {
      outputCellComponent = (
        <NotebookOutputPlotly data={outputCell[outputType]} />
      );
    } else if (outputType === "text/html") {
      outputCellComponent = (
        // <NotebookOutputMarkdown data={outputCell[outputType]} />
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
      {inputCell!=="" && <PythonCodeCell data={inputCell} />}
      <br/>
      <br/>
      {outputCellComponent}
    </>
  );
}

function PythonCodeCell({data}) {
  const codeString = Array.isArray(data) ? data.join('') : data;

  return (
    <CodeBlock language="python" data={codeString} title="Input" collapsedHeight="0px" expandedHeight="260px"/>
  );
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
    // console.log(e, data);
    content = data;
  }
  return <p>{JSON.stringify(data)}</p>;
}

// function NotebookOutputHTML() {
//   return null;
// }
function NotebookOutputHTML({ data }) {
  // const htmlContent = data.join("");
  // useEffect(() => {
  //   const styleContent = htmlContent.match(/<style[^>]*>([\s\S]*?)<\/style>/);
  //   if (styleContent) {
  //     const styleElement = document.createElement('style');
  //     styleElement.innerHTML = styleContent[1];
  //     document.head.appendChild(styleElement);

  //     return () => {
  //       document.head.removeChild(styleElement);
  //     };
  //   }
  // }, [htmlContent]);

  // const cleanedHTML = htmlContent.replace(/<style[^>]*>[\s\S]*?<\/style>/, '');
  // return (
  //   <div dangerouslySetInnerHTML={{ __html: cleanedHTML }} />
  // );
  const tableHtml = Array.isArray(data) ? data.join('') : data;

  const styles = `
    .alternate-row {
      // border-collapse: collapse; /* Required for spacing between cells */
      border-spacing: 5px
      border: none
    }

    // th {
    //   color: white;
    //   background-color: #2C6496;
    //   padding: 5px;
    //   font-family: Roboto Serif;
    //   font-size: 16px;
    //   border-bottom: 1px solid black;
    //   text-align: center;
    //   vertical-align: middle;
    // }
    
    .alternate-row td th {
      padding: 10px; /* Add spacing between content and cell borders */
      // border: 0.5px solid #ddd; /* Add thin border to each cell */
    }

    .alternate-row tr:nth-child(odd) {
      background-color: #f5f5f5;
    }

    a {
      color: #2c6496;
    }

    .alternate-row tr:nth-child(even) {
      background-color: #fff;
    }

    .alternate-row tr:hover {
      background-color: #e0e0e0; /* Change background on hover */
    }

    .alternate-row thead tr {
      border-bottom: 2px solid #ddd; /* Line between header and body */
    }
  `;

  return (
    <div>
      <style>{styles}</style>  {/* Inline CSS within a style tag */}
      <div className="alternate-row" dangerouslySetInnerHTML={{ __html: tableHtml }} />
      <br />
    </div>
  );
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

function BlogPostList({ data }) {
  return (
    <ul style={{ listStyle: "none", paddingLeft: "0"}}>
      {data.map((item, index) => (
        <li key={index} style={{marginBottom: "8px"}}>
          <a href={`/${item.filename}`}>{item.title}</a>
        </li>
      ))}
    </ul>
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
    
    let nextCellData;
    if (Array.isArray(nextCell.source)) {
      nextCellData = nextCell.source.join("");
    } else {
      nextCellData = nextCell.source;
    }
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
        return <MarkdownFormatter markdown={Array.isArray(cell.source) ? cell.source.join("") : cell.source} />;
      } else if (cell.cell_type === "code") {
        // if()
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
          <p style={{ position: "sticky", top:"150px"}} className="spaced-sans-serif">PolicyEngine UK documentation</p>
          <div style={{ position: "sticky", top: 220, maxHeight: 600, overflowY: "scroll" }}>
            <BlogPostList data={posts} />
            {/* <MoreOn post={post} /> */}
            {/* <p className="spaced-sans-serif">Contents</p>
            <LeftContents markdown={markdown} notebook={notebook} /> */}
          </div>
        </div>

        <div style={{ flex: 4, minWidth: 0 }}>
          {bodyContent}
        </div>
        <div style={{ flex: 1, marginLeft: 30 }}>
          <div style={{ position: "sticky", top: 150 }}>
            <p className="spaced-sans-serif">Contents</p>
            <LeftContents markdown={markdown} notebook={notebook} />
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
            const element = document.getElementById((headerSlug[0]).toUpperCase());
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
