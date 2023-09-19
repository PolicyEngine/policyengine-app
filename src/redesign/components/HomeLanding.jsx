import style from "../style";
import { posts } from "../data/Posts";
import { FeaturedBlogPreview, MediumBlogPreview, SmallBlogPreview } from "./HomeBlogPreview";
import HomeQuoteCarousel from "./HomeQuoteCarousel";
import ActionButton from "./ActionButton";
import useDisplayCategory from "./useDisplayCategory";
import PageHeader from "./PageHeader";

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
    return <PageHeader
        title="Computing public policy for all"
        subtitle="PolicyEngine is a non-profit organisation that uses data science to build open-source tools that help policymakers and the public understand how public policy affects them."
    >
        <HomeQuoteCarousel />
    </PageHeader>
}
