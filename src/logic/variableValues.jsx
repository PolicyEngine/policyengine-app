

export function formatVariableValue(variable, value, precision = 0) {
    try {
        if (variable.unit == "currency-GBP") {
            // Format like "£1,234.56"
            return "£" + value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: precision });
        } else if (variable.unit == "currency-USD") {
            return "$" + value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: precision });
        } else if (variable.unit == "/1") {
            // Format as x.1%
            return (value * 100).toFixed(0) + "%";
        } else {
            return value.toLocaleString();
        }
    } catch (e) {
        return JSON.stringify(value);
    }
}

export function getPlotlyAxisFormat(unit) {
    // Possible units: currency-GBP, currency-USD, /1
    if (unit == "currency-GBP") {
        return {
            tickformat: ",.0f",
            tickprefix: "£",
        }
    } else if (unit == "currency-USD") {
        return {
            tickformat: ",.0f",
            tickprefix: "$",
        }
    } else if (unit == "/1") {
        return {
            tickformat: ",.2%",
        }
    }
}