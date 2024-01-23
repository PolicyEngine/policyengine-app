export function getReformDefinitionCode(policy) {
  let lines = ["def modify_parameters(parameters):"];

  if (Object.keys(policy.reform.data).length === 0) {
    lines.pop();
    return lines;
  }

  for (const [parameterName, parameter] of Object.entries(policy.reform.data)) {
    for (let [instant, value] of Object.entries(parameter)) {
      const [start, end] = instant.split(".");
      if (value === false) {
        value = "False";
      } else if (value === true) {
        value = "True";
      }
      lines.push(
        `    parameters.${parameterName}.update(`,
        `        start=instant("${start}"), stop=instant("${end}"),`,
        `        value=${value})`,
      );
    }
  }
  lines.push("    return parameters");

  lines = lines.concat([
    "",
    "class reform(Reform):",
    "    def apply(self):",
    "        self.modify_parameters(modify_parameters)",
    "",
    "",
  ]);
  return lines;
}
