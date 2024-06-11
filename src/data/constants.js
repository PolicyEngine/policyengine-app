// The below is used to make parameter editor components appear as
// if a reform is applied into perpetuity; this should be replaced
// with more substantive changes to how parameter changes work to
// allow for application into perpetuity, if that is desired behavior
export const defaultForeverYear = "2100";

export const defaultYear = new Date().getFullYear() + 1;
export const defaultStartDate = defaultYear.toString().concat("-01-01");
export const defaultEndDate = defaultForeverYear.toString().concat("-12-31");

// Charts in ParameterOverTime are meant to extend to 10 years beyond
// the current year, as specified in app GitHub issue #1261; getPlotlyAxisFormat
// already adds five, so this function only adds an additional 5
export const defaultPOTEndDate = (defaultYear + 5).toString().concat("-12-31");
