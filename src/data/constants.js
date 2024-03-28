// The below is used to make parameter editor components appear as
// if a reform is applied into perpetuity; this should be replaced
// with more substantive changes to how parameter changes work to 
// allow for application into perpetuity, if that is desired behavior
export const defaultForeverYear = "2100"

export const defaultYear = new Date().getFullYear();
export const defaultStartDate = defaultYear.toString().concat("-01-01");
export const defaultEndDate = defaultForeverYear.toString().concat("-12-31");
