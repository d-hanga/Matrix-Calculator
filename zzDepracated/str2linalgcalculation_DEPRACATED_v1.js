// import { addition, subtraction, multiplication, inversion, division, transposition } from "./operations.js";
const { addition, subtraction, multiplication, inversion, division, transposition } = require("./operations.js");

const operations = {
    "+": addition,
    "-": subtraction,
    "*": multiplication,
    "/": division,
    "T": transposition,
    "I": inversion
};

// const operationpriorities = [
//     ["+", "-"],
//     ["*", "/"],
//     ["T", "I"]
// ];

const operationpriorities = {
    "+": 0,
    "-": 0,
    "*": 1,
    "/": 1,
    "T": 2,
    "I": 2
}

const amount_operationpriorities = Math.max(...Object.values(operationpriorities))


function combinearrays(arr1, arr2) {
    // arr1 = [a, b, c]
    // arr2 = [1,2]
    // => [a, 1, b, 2, c]
    let newarr = new Array()
    
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

function operationbreaker(raw, matrices) {
    const rawstripped = raw.replace(" ", "");
    let bracketsstart = false
    let foundoperations = []
    let params = [""]
    let lasts = new Array(amount_operationpriorities).fill(null)
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
        }  else if (operations[rawstripped[i]] !== undefined) {
            lasts[operationpriorities[rawstripped[i]]] = i;
            foundoperations.push(rawstripped[i])
            params.push("")
        } else if (rawstripped[i] !== ")" && rawstripped[i] !== "(") {
            params[params.length-1] += rawstripped[i]
        }
    }

    if (!foundoperations.length && params.length === 1) {
        console.log(params[0])
        // if (params[0][-1] == "T") {
        //     if (params[0][-2] == "I") {
        //         console.log("1. T, 2. I    ", params[0].slice(0, -2))
        //         return operations["T"](operations["I"](matrices[params[0].slice(0, -2)]))
        //     }
        //     console.log("         T    ", params[0].slice(0, -2))
        //     return operations["T"](matrices[params[0].slice(0, -1)])
        // } else if (params[0][-1] == "I") {
        //     if (params[0][-2] == "T") {
        //         console.log("1. I, 2. T    ", params[0].slice(0, -2))
        //         return operations["I"](operations["T"](matrices[params[0].slice(0, -2)]))
        //     }
        //     console.log("         I    ", params[0].slice(0, -2))
        //     return operations["I"](matrices[params[0].slice(0, -1)])
        // }
        return matrices[params[0]]
    }



    for (let i = foundoperations.length; i >= 0; i--) {
        if (operations[foundoperations[i]] !== undefined) {
            if (foundoperations[i] === "+" || foundoperations[i] === "-") {
                // console.log(params)
                // console.log(foundoperations)
                // console.log("")
                return operations[foundoperations[i]](
                    operationbreaker(
                        combinearrays(params.slice(0, i+1), foundoperations.slice(0, i)).join(""),
                        matrices
                    ),
                    operationbreaker(
                        combinearrays(params.slice(i+1, params.length), foundoperations.slice(i+1, params.length)).join(""),
                        matrices
                    )
                )
            }
        }
    }
    // make cases: for plus/minus, mul/div, and selfoperations down here for nicer sorting shiiiii
    
    // only happens when the operation is multiplication or division => just take tha last operation happening excl. brackets
    return operations[foundoperations[foundoperations.length-1]](
        operationbreaker(
            combinearrays(params.slice(0, params.length-1), foundoperations.slice(0, foundoperations.length-1)).join("")
            , matrices
        ),
        operationbreaker(
            params[params.length-1]
            , matrices
        )
    )
}


matrices = {
    "A":[[1,2,3],[4,5.1,6],[7,8,9]],
    "B":[[10,20,30],[40,51,60],[70,80,90]],
    "C":[[100,200,300],[400,510,600],[700,800,900]],
    "D":[[1000,2000,3000],[4000,5100,6000],[7000,8000,9000]]
}


console.log(
    operationbreaker(
//     "(A+C)*A+B-(D*C)*A", matrices                // (A+(transpose(C)))*transpose(A)+B-(D*(C))*A
//     // "(A+CT)*AT+B-(D*C)*AT", matrices                // (A+(transpose(C)))*transpose(A)+B-(D*(C))*transpose(A)
        "(A+CTI)*AT+B-(D*CI)*AIT", matrices          // (A+(transpose(C)^(-1)))*transpose(A)+B-(D*(C^(-1)))*transpose(A^(-1))
    )
);


// console.log(subtraction(
//     addition(
//         multiplication(
//             addition(
//                 matrices["A"],
//                 matrices["C"]
//             ),
//             matrices["A"]
//         ),
//         matrices["B"]
//     ),
//     multiplication(
//         multiplication(
//             matrices["D"],
//             matrices["C"]
//         ),
//         matrices["A"]
//     )
// ))


console.log(
    inversion(
        matrices["C"]
    )
)