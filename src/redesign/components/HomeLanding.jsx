import style from "../style";
import { posts } from "../data/Posts";
import { FeaturedBlogPreview, MediumBlogPreview, SmallBlogPreview } from "./HomeBlogPreview";
import ActionButton from "./ActionButton";
import useDisplayCategory from "./useDisplayCategory";
import Hero from "../images/hero.png"

function LandingAboutPolicyEngine() {
    const displayCategory = useDisplayCategory();
    return <div style={{
        flex: 1,
        margin: 30,
        marginTop: 0,
        marginBottom: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    }}>
        <h2 style={{
            color: style.colors.BLUE_PRIMARY,
        }}>Computing public policy for everyone</h2>
        <div style={{
            border: `1px solid ${style.colors.DARK_GRAY}`,
            marginTop: 10,
            marginBottom: 30,
        }} />
        <h5>
            PolicyEngine is a non-profit organisation that uses data science to build open-source tools that help policymakers and the public understand how public policy affects them.
        </h5>
        {
            (displayCategory === "desktop") && <ActionButton text="Use the tool" link="/" />
        }
    </div>
}

function RelevantBlogPosts() {
    return <>
        <FeaturedBlogPreview blogs={posts.slice(0, 3)} width="100%" imageHeight={300} />
        <div style={{maxHeight: 200, marginTop: 20}}>
            <SmallBlogPreview blog={posts[1]} />
        </div>
        <div style={{maxHeight: 800, marginTop: 20}}>
            <MediumBlogPreview blog={posts[2]} minHeight={50} />
        </div>
        <div style={{maxHeight: 200, marginTop: 20}}>
            <SmallBlogPreview blog={posts[3]} />
        </div>
        <div style={{maxHeight: 200, marginTop: 20}}>
            <SmallBlogPreview blog={posts[4]} />
        </div>
        <div style={{maxHeight: 200, marginTop: 20, marginBottom: 20 }}>
            <SmallBlogPreview blog={posts[5]} />
        </div>
    </>
}

RelevantBlogPosts;
LandingAboutPolicyEngine;

export default function HomeLanding() {
    const displayCategory = useDisplayCategory();
    const mobile = displayCategory === "mobile";
    mobile;
    return <div style={{
        height: 500,
    }}>
        <img src={Hero} style={{
            width: "100%",
            height: 500,
            objectFit: "cover",
            position: "absolute",
        }} />
        <div style={{
            width: "60vw",
            height: 300,
            top: 200,
            left: "20vw",
            position: "absolute",
            display: "flex",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            backgroundColor: "rgb(23, 53, 79, 0.7)",
        }}>
            <div style={{width: 400, heiight: "100%", padding: 20, display: "flex", flexDirection: "column"}}>
            <h1 style={{color: "white", fontSize: 55, alignItems: "center", margin: 0}}>Computing Public Policy for Everyone</h1>
            </div>
        </div>
    </div>
}
