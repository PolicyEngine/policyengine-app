import { Container } from "react-bootstrap";
import useMobile from "../layout/Responsive";

export default function AboutPage(props) {
  const contents = (
    <>
      <h1>About</h1>
      <div style={{ paddingTop: 20, paddingBottom: 20 }}>
        <h3>Leadership</h3>
        <p>
          <b>Max Ghenis</b> is the co-founder and CEO of PolicyEngine. He is
          also the founder and president of the UBI Center, a think tank
          researching universal basic income policies, and was previously a data
          scientist at Google. Max has a master's degree in Data, Economics, and
          Development Policy from MIT and a bachelor's degree in operations
          research from UC Berkeley.
        </p>
        <p>
          <b>Nikhil Woodruff</b> is the co-founder and CTO of PolicyEngine. He
          is also the UK Research Director at the UBI Center, a think tank
          researching universal basic income policies, and was previously a data
          scientist at Caspian, where he worked in improving anti-money
          laundering investigations. Nikhil is currently on leave from Durham
          University's Computer Science program.
        </p>
      </div>
      <div style={{ paddingTop: 20, paddingBottom: 20 }}>
        <h3>PSL Foundation Board of Directors</h3>
        <p>
          PolicyEngine is fiscally sponsored by the PSL Foundation, a US
          nonprofit with the following directors:
        </p>
        <p>
          <b>Jason DeBacker</b>, president of the PSL Foundation and associate
          professor of economics at the University of South Carolina's Darla
          Moore School of Business.
        </p>
        <p>
          <b>Linda Gibbs</b>, principal at Bloomberg Associates. Linda
          previously served New York City as the Deputy Mayor for Health and
          Human Services and Commissioner of the Department of Homeless
          Services.
        </p>
        <p>
          <b>Glenn Hubbard</b>, Dean Emeritus and Professor of Finance and
          Economics at Columbia University and nonresident senior fellow at the
          American Enterprise Institute. Glenn previously served as Chairman of
          the Council of Economic Advisers and Deputy Assistant Treasury
          Secretary.
        </p>
      </div>
    </>
  );
  const mobile = useMobile();
  if (mobile) {
    return <Container style={{ padding: 20 }}>{contents}</Container>;
  } else {
    return (
      <Container style={{ maxWidth: 800, paddingTop: 40 }} className="serif">
        {contents}
      </Container>
    );
  }
}
