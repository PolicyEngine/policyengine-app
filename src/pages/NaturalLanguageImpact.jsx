import { useState } from "react";
import { Container } from "react-bootstrap";
import { asyncApiCall, apiCall } from "../api/call";
import { motion } from "framer-motion";
import Spinner from "../layout/Spinner";

export default function NaturalLanguageImpact(props) {
    const { countryId } = props;
    const [query, setQuery] = useState("");
    const [placeholder, setPlaceholder] = useState("what is the revenue impact of abolishing Child Benefit?");
    setPlaceholder;
    const [answer, setAnswer] = useState("");
    const [inProgress, setInProgress] = useState(false);

    const getAnswer = () => {
        setInProgress(true);
        apiCall(`/${countryId}/answer`, {
            question: query,
        }, "POST").then(res => res.json()).then(res => {
            const questionId = res.result.question_id;
            asyncApiCall(`/${countryId}/answer/${questionId}`, null, 3000, 2000, data => {
                setAnswer(data.result)
            }).then(data => {
                setAnswer(data.result);
                setInProgress(false);
            });
        });
    }

    let responseText = null;

    if (answer.answer) {
        responseText = answer.answer;
    } else if (answer.subtask === "parse_policy") {
        responseText = "Understanding your question...";
    } else if (answer.subtask === "run_policy") {
        responseText = "Simulating a policy reform on PolicyEngine...";
    } else if (answer.subtask === "answer_question") {
        responseText = "Understanding the simulation results...";
    }

    return (
        <Container>
            <motion.div
                // when answer is not empty, animate the container to expand downwards 100px
                style={{
                    overflow: "hidden",
                }}
                animate={{
                    height: (inProgress || responseText) ? 200 : 100,
                }}
                transition={{
                    duration: 0.5,
                }}
            >
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                }}>
                    <div
                        style={{
                            paddingRight: 10,
                        }}
                    >
                        <h3 style={{
                            fontSize: 25,
                            margin: 0,
                        }}>
                            or just ask
                        </h3>
                    </div>
                    <input 
                        type="text"
                        placeholder={placeholder}
                        autoFocus
                        // disable outline on focus
                        style={{
                            height: "100px",
                            fontSize: 25,
                            padding: 10,
                            border: "none",
                            borderRadius: "25",
                            outline: "none",
                            width: Math.max((query ? query.length + 5 : placeholder.length) * 11, 50),
                            caretColor: "black",
                            marginBottom: 2,
                            color: "grey"
                        }}
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                getAnswer();
                            }
                        }}
                    />
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <h4>
                    {
                        inProgress ? <Spinner style={{marginRight: 15}} /> : null
                    }
                    {(responseText || "")}
                </h4>
            </div>
            </motion.div>
        </Container>
    );
}