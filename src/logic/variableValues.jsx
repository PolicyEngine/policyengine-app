

export function formatVariableValue(variable, value) {
    try {
        if (variable.unit == "currency-GBP") {
            // Format like "£1,234.56"
            return "£" + value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        } else if (variable.unit == "currency-USD") {
            return "$" + value.toFixed(2).toLocaleString();
        } else {
            return value.toLocaleString();
        }
    } catch (e) {
        return JSON.stringify(value);
    }
}