function str2num(input) {
    // Check for non-string input or empty input
    if (typeof input !== 'string' || input.trim() === '') {
        return input; // Return as is if not a string or is empty
    }

    // Replace comma with dot for float parsing
    const normalizedInput = input.replace(',', '.');

    // Attempt to parse as integer
    const intValue = parseInt(normalizedInput, 10);
    if (!isNaN(intValue) && intValue.toString() === normalizedInput) {
        return intValue; // Return as integer if valid
    }

    // Attempt to parse as float
    const floatValue = parseFloat(normalizedInput);
    if (!isNaN(floatValue)) {
        return floatValue; // Return as float if valid
    }

    // Return as string if neither
    return input;
}

export default str2num;
