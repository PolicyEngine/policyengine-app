import { HUMAN_PROMPT, AI_PROMPT } from "@anthropic-ai/sdk/index.mjs";

export const getExplainerAIPromptContent = (
  variable,
  value,
  computation_log
) => {
  const prompt = `
    ${HUMAN_PROMPT} You are an AI assistant explaining US policy calculations. 
    The user has run a simulation for the variable '${variable}' and got a result of ${value}.
    Here's the computation log:
    ${computation_log}
    
    Please explain this result in simple terms. Your explanation should:
    1. Briefly describe what ${variable} is.
    2. Explain the main factors that led to this result.
    3. Mention any key thresholds or rules that affected the calculation.
    4. If relevant, suggest how changes in input might affect this result.
    
    Keep your explanation concise but informative, suitable for a general audience. Do not start with phrases like "Certainly!" or "Here's an explanation. It will be rendered as markdown, so preface $ with \\ (a single backslash).

    ${AI_PROMPT}
  
  `;

  return prompt;
}