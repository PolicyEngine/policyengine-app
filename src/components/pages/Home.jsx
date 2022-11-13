import style from "../../style";
import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import PolicyEngineContext from "../../logic/PolicyEngineContext";
import { Col, Container, Row } from "react-bootstrap";

export default function Home() {
    const navigate = useNavigate();
    const PolicyEngine = useContext(PolicyEngineContext);
    // Items are centered horizontally, and placed in order vertically.
    const mainTitle = <>
        <div style={{
            paddingLeft: 50, 
            paddingRight: 100, 
            paddingTop: 70,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        }}>
            <h1>We compute the impact of public policy.</h1>
            <h4>PolicyEngine's free, open-source software turns law into code.</h4>
            <div style={{paddingTop: 20, display: "flex"}}>
                <motion.div style={{
                    width: 300, 
                    backgroundColor: style.colors.LIGHT_GRAY,
                    padding: 20,
                    marginRight: 20,
                    cursor: "pointer",
                }}
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate(PolicyEngine.getCountryUrl("/household"))}
                >
                    <h2>Compute my household income</h2>
                    <p>Use PolicyEngine to calculate your taxes and benefits, and explore how they'd change under different scenarios and policies.</p>
                </motion.div>
                <motion.div style={{
                    width: 300, 
                    backgroundColor: style.colors.LIGHT_GRAY,
                    padding: 20,
                    cursor: "pointer",
                }}
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate(PolicyEngine.getCountryUrl("/policy"))}
                >
                    <h2>Compute the impact of policy reforms</h2>
                    <p>Use PolicyEngine to calculate your taxes and benefits, and explore how they'd change under different scenarios and policies.</p>
                </motion.div>
            </div>
        </div>
        <div
            style={{
                backgroundColor: style.colors.LIGHT_GRAY,
                height: 600,
                marginTop: 50,
            }}
        >
            <Container style={{paddingTop: 100, paddingBottom: 100}}>
                <Row>
                    <Col>
                        {/* This panel slides and fades in from the left when scrolled past. */}
                        <motion.div
                            style={{
                                backgroundColor: style.colors.LIGHT_GRAY,
                                padding: 20,
                                paddingLeft: 50,
                                paddingRight: 50,
                                borderRadius: 10,
                                width: "100%",
                                height: "100%",
                            }}
                            initial={{ opacity: 0, x: -100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.75 }}
                        >
                            <h1 style={{paddingBottom: 30}}>Simulate the full tax-benefit system on any household</h1>
                            <h5>Our free and open-source models describe a country's tax and benefit laws. Describe a household's characteristics and instantly compute their taxes, benefits, marginal tax rates and more.</h5>
                        </motion.div>
                    </Col>
                    <Col>
                    </Col>
                </Row>
            </Container>
        </div>
        <div
            style={{
                backgroundColor: style.colors.WHITE,
                height: 600,
            }}
        >
            <Container style={{paddingTop: 100, paddingBottom: 100}}>
                <Row>
                    <Col></Col>
                    <Col>
                        {/* This panel slides and fades in from the left when scrolled past. */}
                        <motion.div
                            style={{
                                backgroundColor: style.colors.WHITE,
                                padding: 20,
                                paddingLeft: 50,
                                paddingRight: 50,
                                borderRadius: 10,
                                width: "100%",
                                height: "100%",
                            }}
                            initial={{ opacity: 0, x: 100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.75 }}
                        >
                            <h1 style={{paddingBottom: 30}}>Design custom policy reforms</h1>
                            <h5>Our free and open-source models describe a country's tax and benefit laws. Describe a household's characteristics and instantly compute their taxes, benefits, marginal tax rates and more.</h5>
                        </motion.div>
                    </Col>
                </Row>
            </Container>
        </div>

        <div
            style={{
                backgroundColor: style.colors.LIGHT_GRAY,
                height: 600,
                marginTop: 50,
            }}
        >
            <Container style={{paddingTop: 100, paddingBottom: 100}}>
                <Row>
                    <Col>
                        {/* This panel slides and fades in from the left when scrolled past. */}
                        <motion.div
                            style={{
                                backgroundColor: style.colors.LIGHT_GRAY,
                                padding: 20,
                                paddingLeft: 50,
                                paddingRight: 50,
                                borderRadius: 10,
                                width: "100%",
                                height: "100%",
                            }}
                            initial={{ opacity: 0, x: -100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.75 }}
                        >
                            <h1 style={{paddingBottom: 30}}>See how reforms affect households</h1>
                            <h5>Our free and open-source models describe a country's tax and benefit laws. Describe a household's characteristics and instantly compute their taxes, benefits, marginal tax rates and more.</h5>
                        </motion.div>
                    </Col>
                    <Col>
                    </Col>
                </Row>
            </Container>
        </div>
    </>
    return mainTitle;
}