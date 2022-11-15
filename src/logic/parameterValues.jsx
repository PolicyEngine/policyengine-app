import { formatVariableValue } from "./variableValues";

export function getParameterAtInstant(parameter, instant) {
    const parameterValues = parameter.values;
    const parameterValuesInOrder = Object.keys(parameterValues).sort();
    if (parameterValuesInOrder.length == 0) {
        return null;
    }
    if (instant < parameterValuesInOrder[0]) {
        return parameterValues[parameterValuesInOrder[0]];
    }
    if (instant >= parameterValuesInOrder[parameterValuesInOrder.length - 1]) {
        return parameterValues[parameterValuesInOrder[parameterValuesInOrder.length - 1]];
    }
    for (let i = 0; i < parameterValuesInOrder.length - 1; i++) {
        const timePeriod = parameterValuesInOrder[i];
        const nextTimePeriod = parameterValuesInOrder[i + 1];
        if (instant >= timePeriod && instant < nextTimePeriod) {
            return parameterValues[timePeriod];
        }
    }
    return null;
}

export function getReformedParameter(parameter, reforms) {
    // The reform is specified in the format:
    // { parameter.module.name: { "2022-01-01.2022-12-19": value }, ... }
    // The above example sets the value of parameter.module.name to value in 2022.
    // Parameters have a 'values' attribute, which is in the format:
    // { "2022-01-01": value, ... }

    let newParameter = JSON.parse(JSON.stringify(parameter));
    let parameterValues = newParameter.values;
    if (!parameterValues) {
        return null;
    }
    const parameterValuesInOrder = Object.keys(parameterValues).sort();
    const reform = reforms[parameter.parameter];
    if (reform) {
        for (const [timePeriod, value] of Object.entries(reform)) {
            const [startDate, endDate] = timePeriod.split(".");
            // Delete all values in the time period
            for (const timePeriod of parameterValuesInOrder) {
                if (timePeriod >= startDate && timePeriod <= endDate) {
                    delete parameterValues[timePeriod];
                }
            }
            // Add the new value
            parameterValues[startDate] = value;
        }
    }
    return newParameter;
}