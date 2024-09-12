import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Section from "../layout/Section";
import style from "../style";
import PageHeader from "../layout/PageHeader";
import moment from "moment";
import useDisplayCategory from "../hooks/useDisplayCategory";
import LinkButton from "controls/LinkButton";
import useCountryId from "../hooks/useCountryId";
import EmphasisedLink from "../layout/EmphasisedLink";

import { Helmet } from "react-helmet";
import { posts } from "../posts/postTransformers";


function SideTags({ tags }) {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                backgroundColor: "red",
            }}
        >
            {tags.slice(0, 2).map((tag, i) => (
                <div
                    key={tag}
                    style={{
                        flex: 1,
                        backgroundColor:
                            {
                                featured: style.colors.TEAL_LIGHT,
                                "in-the-news": style.colors.BLUE_LIGHT,
                            }[tag] || style.colors.WHITE,
                        padding: 20,
                        fontFamily: "Roboto",
                        fontSize: 12,
                        textTransform: "uppercase",
                        borderTop: i === 1 ? `1px solid ${style.colors.BLACK}` : "none",
                        borderRight: `1px solid ${style.colors.BLACK}`,
                        width: 50,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <div
                        style={{
                            transform: "rotate(-90deg)",
                        }}
                    >
                        {tag.replaceAll("-", " ")}
                    </div>
                </div>
            ))}
        </div>
    );
}

export function SmallBlogPreview({ blog }) {
    const displayCategory = useDisplayCategory();
    const countryId = useCountryId();
    let topLeft = null,
        left = null;
    if (displayCategory === "desktop") {
        topLeft = <BlogTags tags={blog.tags} />;
    } else {
        left = <SideTags tags={blog.tags} />;
    }

    const slug = blog.filename.split(".")[0];
    // const link = `/${countryId}/research/${slug}`;
    const link = blog.link;

    return (
        <BlogBox
            // topLeft={topLeft}
            left={left}
            topRight={
                <p
                    style={{
                        fontSize: 14,
                        padding: 10,
                        paddingBottom: 0,
                        textTransform: "uppercase",
                        fontFamily: "Roboto",
                    }}
                >
                    {moment(blog.date).format("MMMM D, YYYY")}
                </p>
            }
            bottomRight={
                <div style={{ marginRight: 10, marginBottom: 10 }}>
                    <EmphasisedLink text="Read" url={link} size={14} isStretched />
                </div>
            }
            style={{
                backgroundColor: blog.tags.includes(["in-the-news"])
                    ? style.colors.BLUE_LIGHT
                    : style.colors.LIGHT_GRAY,
                height: "100%",
                position: "relative",
            }}
        >
            <div
                style={{
                    padding: 10,
                    paddingTop: 0,
                    minHeight: displayCategory === "desktop" ? 100 : null,
                }}
            >
                <h4>{blog.title}</h4>
            </div>
        </BlogBox>
    );
}

function BlogTags({ tags }) {
    const displayCategory = useDisplayCategory();
    return (
        <div
            style={{
                display: "flex",
            }}
        >
            {tags.slice(0, 3).map((tag) => (
                <div
                    key={tag}
                    style={{
                        backgroundColor:
                            {
                                featured: style.colors.TEAL_LIGHT,
                                "in-the-news": style.colors.BLUE_LIGHT,
                            }[tag] || style.colors.WHITE,
                        padding: displayCategory === "desktop" ? 10 : 20,
                        fontFamily: "Roboto",
                        fontSize: 12,
                        textTransform: "uppercase",
                        borderRight: `1px solid ${style.colors.BLACK}`,
                        borderBottom: `1px solid ${style.colors.BLACK}`,
                    }}
                >
                    {tag.replaceAll("-", " ")}
                </div>
            ))}
        </div>
    );
}

function BlogBox({
    topLeft,
    topRight,
    left,
    children,
    bottomLeft,
    bottomRight,
    noBorder,
    style,
}) {
    return (
        <div
            style={{
                display: "flex",
                border: noBorder ? null : `1px solid black`,
                ...style,
                flexDirection: "row",
            }}
        >
            <div style={{ display: "flex" }}>{left}</div>
            <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>{topLeft}</div>
                    <div>{topRight}</div>
                </div>
                {children}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "auto",
                    }}
                >
                    <div>{bottomLeft}</div>
                    <div>{bottomRight}</div>
                </div>
            </div>
        </div>
    );
}

export function FeaturedBlogPreview({ blogs, width, imageHeight }) {
    // Only defined for desktop and tablet displays
    const displayCategory = useDisplayCategory();
    const currentBlog = blogs || {};

    //   const imageUrl = blogs.image ? handleImageLoad(blogs.image) : "";

    const countryId = useCountryId();
    // const link = `/${countryId}/research/${currentBlog.slug}`;
    const link = currentBlog.link;
    return (
        <div
            style={{
                width: width || "100%",
                border: `1px solid ${style.colors.BLACK}`,
            }}
        >
            <div
                style={{
                    position: "relative",
                }}
            >
                {/* {imageUrl === "" ? (
          <div style={{ height: "300px", width: "100%" }}>
            <FileImageOutlined
              style={{
                objectFit: "cover",
                fontSize: "32px",
                position: "absolute",
                top: "250px",
                right: "20px",
              }}
            />
          </div>
        ) : (
          // <FileImageOutlined />
          <img
            src={imageUrl}
            alt={currentBlog.coverAltText || `${currentBlog.title} cover image`}
            width="100%"
            height={imageHeight || (displayCategory === "desktop" ? 450 : 400)}
            style={{
              objectFit: "cover",
              borderBottom: `1px solid ${style.colors.BLACK}`,
            }}
          />
        )} */}
                <BlogBox
                    noBorder
                    // topLeft={<BlogTags tags={currentBlog.tags || []} />}
                    bottomRight={
                        <div style={{ margin: 10 }}>
                            <EmphasisedLink text="Read" url={link} size={14} isStretched />
                        </div>
                    }
                    style={{
                        backgroundColor: style.colors.TEAL_LIGHT,
                        minHeight: 340,
                    }}
                >
                    <div style={{ padding: 20 }}>
                        <p style={{ textTransform: "uppercase" }}>
                            {moment(currentBlog.date).format("MMMM D, YYYY")}
                        </p>
                        <h3 style={{ minHeight: 70 }}>{currentBlog.title}</h3>
                        <p>{currentBlog.description}</p>
                    </div>
                </BlogBox>
            </div>
        </div>
    );
}


export function SectionBottom({ height, backgroundColor, children }) {
    const displayCategory = useDisplayCategory();
    const sideMargin = {
        mobile: 40,
        tablet: 100,
        desktop: null,
    }[displayCategory];
    const topBottomMargins = {
        mobile: 40,
        tablet: 40,
        desktop: 80,
    }[displayCategory];
    let titleColor = null;
    if (
        [style.colors.BLUE_PRIMARY, style.colors.BLUE_PRESSED].includes(
            backgroundColor,
        )
    ) {
        titleColor = style.colors.WHITE;
    }
    return (
        <div
            style={{
                height,
                backgroundColor,
                display: "flex",
                justifyContent: "center",
                color: titleColor,
                borderBottom: `1px solid ${style.colors.BLACK}`,
            }}
        >
            <div
                style={{
                    width: {
                        mobile: "100%",
                        tablet: "100%",
                        desktop: 1_200,
                    }[displayCategory],
                    marginLeft: sideMargin,
                    marginRight: sideMargin,
                    marginBottom: topBottomMargins,
                }}
            >
                {children}
            </div>
        </div>
    );
}

const temp = [
    {
        "slug": "abc",
        "title": "PolicyEngine Documentation",
        "date": "2022-01-01",
        "description": "Link to the PolicyEngine working and the documentation.",
        "link": "http://localhost:3000/uk/anmol/uk-triple-lock-plus"
    },
    {
        filename: "child-tax-credit-calculator.md",
        tags: ["tax", "credit", "calculator"],
        date: "2022-01-01",
        title: "Child Tax Credit Calculator",
        link: "https://policyengine.org/us/trafwa-ctc-calculator"
    },
    {
        filename: "2024-manifestos.md",
        tags: ["elections", "manifestos", "2024"],
        date: "2022-01-01",
        title: "2024 Manifestos",
        link: "https://policyengine.org/uk/2024-manifestos"
    },
    {
        filename: "climate-and-energy-calculator.md",
        tags: ["climate", "energy", "calculator"],
        date: "2022-01-01",
        title: "Climate and Energy Calculator",
        link: "https://policyengine.org/uk/cec"
    },
    {
        filename: "manifestos-streamlit-app.md",
        tags: ["manifestos", "app", "interactive"],
        date: "2022-01-01",
        title: "Manifestos Streamlit App",
        link: "https://manifestos.streamlit.app/"
    }
]



function DesktopBlogPreview({ allPosts }) {
    const firstPost = allPosts?.[0];
    const rightColumnPosts = allPosts?.slice(1, 5);

    return (
        <SectionBottom backgroundColor={style.colors.LIGHT_GRAY}>
            <div
                style={{
                    marginTop: 50,
                    display: "flex",
                    flexDirection: "row",
                    position: "relative",
                }}
            >
                <div style={{ width: "60%" }}>
                    <div
                        style={{
                            position: "sticky",
                            top: style.spacing.HEADER_HEIGHT + 20,
                        }}
                    >
                        <h3>Documentations</h3>
                        <br />
                        <FeaturedBlogPreview blogs={firstPost} />
                    </div>
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        width: "40%",
                        marginLeft: 20,
                        gap: 20,
                        height: "400px",
                        overflowY: "scroll"
                    }}
                >
                    <h3>Streamlit Apps</h3>
                    <br />
                    {rightColumnPosts?.map((post) => (
                        <SmallBlogPreview key={post.slug} blog={post} />
                    ))}
                </div>
            </div>
            {/* <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 40,
            gap: 40,
          }}
        >
          {firstRowPosts?.map((post) => (
            <MediumBlogPreview key={post.slug} blog={post} />
          ))}
        </div> */}
            {/* <ReadMore /> */}
        </SectionBottom>
    );
}

function Links({links}){
    return (
        links.map((link, index) => (
            <li key={index}>
                <a href={link.url}>
                    <b>{link.title}:</b>
                </a>
            </li>
        ))
    )
}

function ShowcaseItem({
    title,
    description,
    linkTitle,
    link,
    image,
    altText,
    borderColor,
    color,
    imageIsMissing,
}) {
    const displayCategory = useDisplayCategory();

    return (
        <div
            style={{
                display: "flex",
                flexDirection: displayCategory === "desktop" ? "row" : "column",
                marginTop: 50,
                paddingBottom: 50,
                borderBottom: `1px solid ${borderColor || style.colors.WHITE}`,
                alignItems: "center",
            }}
        >
            <div
                style={{
                    minWidth: displayCategory === "desktop" ? 300 : "100%",
                    maxWidth: displayCategory === "desktop" ? 300 : "100%",
                    paddingRight: displayCategory === "desktop" ? 100 : 0,
                    marginBottom: displayCategory !== "desktop" ? 20 : 0,
                }}
            >
                <h2 style={{ color: color }}>{title}</h2>
            </div>
            <div
                style={{
                    paddingRight: displayCategory === "desktop" ? 50 : 0,
                    marginBottom: displayCategory !== "desktop" ? 20 : 0,
                }}
            >
                <p>{description}</p>
                <EmphasisedLink url={link} text={linkTitle} />
            </div>

                        <div
              style={{
                height: "300px",
                width: "100%",
                display: "flex",
                flexDirection: "column", // Add this line to specify the direction of the flex items
                justifyContent: "center", // Center items vertically
                alignItems: "center", // Center items horizontally
              }}
            >
              <Links links={temp?.slice(1, 5)} />
            </div>
        </div>
    );
}



export default function DocsPage() {
    // const displayCategory = useDisplayCategory();
    // const mobile = displayCategory === "mobile";
    // const desktop = displayCategory === "top";
    // const link = "https://opencollective.com/policyengine";
    return (
        <>
            <Helmet>
                <title>Documentation | PolicyEngine</title>
            </Helmet>
            <div>
                <Header />
                <div>

                    <DesktopBlogPreview allPosts={temp} />
                    <PageHeader title="PolicyEngine Documentation" backgroundColor={style.colors.BLUE_98}>
                        <p style={{ margin: 0 }}>
                            Link to the PolicyEngine working and the documentation.
                        </p>
                        <a href="http://localhost:3000/uk/anmol/uk-triple-lock-plus">
                            Documemtation Page
                        </a>
                    </PageHeader>
                </div>
                <div>
                    <Section
                        backgroundColor={style.colors.LIGHT_GRAY}
                        title="Streamlit Apps"
                    >
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                padding: "20px",
                            }}
                        >
                            <ul style={{ fontFamily: style.fonts.BODY_FONT }}>
                                <li>
                                    <a href="https://policyengine.org/us/trafwa-ctc-calculator">
                                        <b>Child Tax Credit Calculator:</b> Use our tool to calculate your potential benefits under the Child Tax Credit policy.
                                    </a>
                                </li>
                                <li>
                                    <a href="https://policyengine.org/uk/2024-manifestos">
                                        <b>2024 Manifestos:</b> Explore the policy proposals from various parties for the upcoming 2024 elections.
                                    </a>
                                </li>
                                <li>
                                    <a href="https://policyengine.org/uk/cec">
                                        <b>Climate and Energy Calculator:</b> Analyze the impact of different climate and energy policies using our calculator.
                                    </a>
                                </li>
                                <li>
                                    <a href="https://manifestos.streamlit.app/">
                                        <b>Manifestos Streamlit App:</b> Access our interactive app to compare and contrast different political manifestos.
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </Section>
                </div>
                <div>
                    <Section>
                        <ShowcaseItem
                            title="Advanced analysis with our Python packages"
                            description="Dive deeper into policy impact analysis using PolicyEngine's open-source Python packages. Customize your simulations and perform advanced reforms for thorough insights, all on your own computer."
                            linkTitle="Try it out"
                            // link={`https://policyengine.github.io/policyengine-${countryId}`}
                            link="https://opencollective.com/policyengine"
                            altText="Screenshot of a Python terminal using PolicyEngine's Python package"
                            color="black"
                        /></Section>
                </div>
                <Footer />
            </div>
        </>
    );
}
