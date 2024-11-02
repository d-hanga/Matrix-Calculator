const addition = (a, b) => a + b;
const subtraction = (a, b) => a - b;
const multiplication = (a, b) => a * b;
const division = (a, b) => a / b;
const inversion = a => 1 / a;
const transposition = a => a * -1;

const operations = {
    "+": addition,
    "-": subtraction,
    "*": multiplication,
    "/": division,
    "T": transposition,
    "I": inversion
};

function combinearrays(arr1, arr2) {
    // arr1 = [a, b, c]
    // arr2 = [1,2]
    // => [a, 1, b, 2, c]
    let newarr = []
    if (arr1.length === 1) {
        return arr1
    }
    for (let i = 0; i < arr1.length + arr2.length; i++) {
        if (i % 2 === 0) {
            const elem = arr1[parseInt(i/2)];
            if (
                elem.includes("+") ||
                elem.includes("-") ||
                elem.includes("*") ||
                elem.includes("/")
            ) {
                newarr.push("(" + elem + ")")
            } else {
                newarr.push(elem)
            }
        } else {
            newarr.push(arr2[Math.floor(i/2)]);
        }
    }

    return newarr
}

function operationbreaker(raw) {
    const rawstripped = raw.replace(" ", "");
    let bracketsstart = false
    let foundoperations = []
    let params = [""]
    for (let i = 0; i < rawstripped.length; i++) {
        if (rawstripped[i] === "(") {
            bracketsstart = true
        } else if (rawstripped[i] === ")") {
            bracketsstart = false
        }
        if (bracketsstart) {
            if (rawstripped[i] !== ")" && rawstripped[i] !== "(") {
                params[params.length-1] += rawstripped[i]
            }
        } else if (operations[rawstripped[i]] !== undefined) {
            foundoperations.push(rawstripped[i])
            params.push("")
        } else if (rawstripped[i] !== ")" && rawstripped[i] !== "(") {
            params[params.length-1] += rawstripped[i]
        }
    }
    if (params[params.length-1] === "3") {
        let n;
    }
    
    if (!foundoperations.length && params.length === 1) {
        return parseFloat(params[0])
    }
    for (let i = foundoperations.length; i >= 0; i--) {
        if (operations[foundoperations[i]] !== undefined) {
            if (foundoperations[i] === "+" || foundoperations[i] === "-") {
                // console.log(params)
                // console.log(foundoperations)
                // console.log("")
                return operations[foundoperations[i]](
                    operationbreaker(
                        combinearrays(params.slice(0, i+1), foundoperations.slice(0, i)).join("")
                    ),
                    operationbreaker(
                        combinearrays(params.slice(i+1, params.length), foundoperations.slice(i+1, params.length)).join("")
                    )
                )
            }
        }
    }
    // only happens when the operation is multiplication or division => just take tha last operation happening excl. brackets
    return operations[foundoperations[foundoperations.length-1]](
        operationbreaker(
            combinearrays(params.slice(0, params.length-1), foundoperations.slice(0, foundoperations.length-1)).join("")
        ),
        operationbreaker(
            params[params.length-1]
        )
    )
}

console.log(
operationbreaker(
    "(1+2)*3+5-(3*6)*10"
))