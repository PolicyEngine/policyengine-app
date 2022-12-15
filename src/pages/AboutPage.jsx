import { Container } from "react-bootstrap";


export default function AboutPage(props) {
    return <Container style={{paddingLeft: 300, paddingRight: 300, paddingTop: 100}}>
        <h1>About</h1>
        <div style={{ paddingTop: 20, paddingBottom: 20 }}>
            <h3>Leadership</h3>
            <p><b>Max Ghenis</b> is the co-founder and CEO of PolicyEngine. He is also the founder and president of the UBI Center, a think tank researching universal basic income policies, and was previously a data scientist at Google. Max has a master's degree in Data, Economics, and Development Policy from MIT and a bachelor's degree in operations research from UC Berkeley.</p>
            <p><b>Nikhil Woodruff</b> is the co-founder and CTO of PolicyEngine. He is also the UK Research Director at the UBI Center, a think tank researching universal basic income policies, and was previously a data scientist at Caspian, where he worked in improving anti-money laundering investigations. Nikhil is currently on leave from Durham University's Computer Science program.</p>
        </div>
        <div style={{ paddingTop: 20, paddingBottom: 20 }}>
            <h3>Advisors</h3>
            <p><b>Jason M. DeBacker</b> is an associate professor in the Department of Economics at the Darla Moore School of Business and president of the PSL Foundation. His research interests lie in the areas of public finance and macroeconomics. He has published papers on these topics in the Journal of Financial Economics, the Journal of Law and Economics, the Journal of Public Economics, the Brookings Papers on Economic Activity and other outlets. From 2009 to 2012, he worked as a financial economist in the Office of Tax Analysis at the U.S. Department of the Treasury. Jason holds a bachelor's degree in Management Information Systems from the University of Georgia and a Ph.D. in Economics from the University of Texas at Austin.</p>
            <p><b>Richard W. Evans</b> is Advisory Board Visiting Fellow at Rice University’s Baker Institute for Public Policy, Director of the Open Source Economics Laboratory, nonresident fellow at the Tax Policy Center, and President of the Open Research Group. His research focuses on macroeconomics, fiscal policy, and computational modeling. Richard received a B.A. in economics and M.A. in public policy from Brigham Young University and a Ph.D. in economics from the University of Texas at Austin.</p>
            <p><b>Jesse Horwitz</b> is the co-founder of Hubble Contacts. He previously worked as a policy advisor to Andrew Yang's mayoral campaign and as an investment analyst. Jesse holds a bachelor's degree in Economics-Mathematics from Columbia University and attended Harvard Law School.</p>
            <p><b>Matt Jensen</b> is the founding director of the Open Source Policy Center at the American Enterprise Institute. He is also a co-founder of the Open Research Group, the Policy Simulation Library, and Compute Tooling. Jensen is a graduate of Pomona College with a degree in math.</p>
            <p><b>Ben Ogorek</b> is the chief data scientist at Spencer Health Solutions. He previous worked in data science roles at Nousot, CUNA Mutual Group, Google, and Nationwide. Ben holds a B.A., M.A., and Ph.D. in Statistics from North Carolina State University.</p>
        </div>
        <div style={{ paddingTop: 20, paddingBottom: 20 }}>
            <h3>PSL Foundation Board of Directors</h3>
            <p>PolicyEngine is fiscally sponsored by the PSL Foundation, a US nonprofit with the following directors:</p>
            <p><b>Jason DeBacker</b>, president of the PSL Foundation and associate professor of economics at the University of South Carolina's Darla Moore School of Business.</p>
            <p><b>Linda Gibbs</b>, principal at Bloomberg Associates. Linda previously served New York City as the Deputy Mayor for Health and Human Services and Commissioner of the Department of Homeless Services.</p>
            <p><b>Glenn Hubbard</b>, Dean Emeritus and Professor of Finance and Economics at Columbia University and nonresident senior fellow at the American Enterprise Institute. Glenn previously served as Chairman of the Council of Economic Advisers and Deputy Assistant Treasury Secretary.</p>
        </div>
    </Container>
}