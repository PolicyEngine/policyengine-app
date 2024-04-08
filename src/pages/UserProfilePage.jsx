import Footer from "../redesign/components/Footer";
import Header from "../redesign/components/Header";
import Helmet from "react-helmet";
import Section from "../redesign/components/Section";
import PageHeader from "../redesign/components/PageHeader";
import style from "../redesign/style";

export default function UserProfilePage() {

  return (
    <>
      <Helmet>
        <title>My Profile | PolicyEngine</title>
      </Helmet>
      <div>
        <Header /> {/*
        <PageHeader
          title="My profile"
          backgroundColor={style.colors.BLUE_98}
        >
          <p style={{ margin: 0 }}>
            Read PolicyEngine&apos;s research on recent and proposed policy
            reforms, as well as technical and general updates from the
            organisation.
          </p>
        </PageHeader>
  */}
        <h1>My profile</h1>
        {/*<div style={{ paddingTop: 20, paddingBottom: 20 }}>*/}
        <Section>
        </Section>
        <Footer />
      </div>
    </>
  )

}