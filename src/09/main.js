"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const file_utils_1 = require("../utils/file-utils");
const testInputFilePath = 'testInput.txt';
const inputFilePath = 'input.txt';
main();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const testInput = yield file_utils_1.FileUtils.readFileAtPath(testInputFilePath);
        const input = yield file_utils_1.FileUtils.readFileAtPath(inputFilePath);
        console.log(`Test input solution first part: ${solve(testInput)}`);
        console.log(`Test input solution second part: ${solve(testInput, false)}`);
        console.log(`Input solution first part: ${solve(input)}`);
        console.log(`Input solution second part: ${solve(input, false)}`);
    });
}
function solve(input, next = true) {
    let sum = 0;
    for (let i = 0; i < input.length; i++) {
        // 0 3 6 9 12 15
        const sequence = input[i].split(' ').map(s => Number(s));
        const differences = getDifferences([sequence]);
        const newSequenceElement = getNewSequenceElement(differences, next);
        sum += newSequenceElement;
    }
    return sum;
}
function getNewSequenceElement(differences, next = true) {
    let difference = 0;
    for (let i = differences.length - 1; i > 0; i--) {
        if (next) {
            difference += differences[i][differences[i].length - 1];
        }
        else {
            difference = differences[i][0] - difference;
        }
    }
    const startingElementIndex = next ? differences[0].length - 1 : 0;
    const startingElement = differences[0][startingElementIndex];
    return next ? startingElement + difference : startingElement - difference;
}
function getDifferences(sequences) {
    if (sequences[sequences.length - 1].filter(n => n != 0).length == 0) {
        return sequences;
    }
    let newSequence = [];
    for (let i = 1; i < sequences[sequences.length - 1].length; i++) {
        newSequence.push(sequences[sequences.length - 1][i] - sequences[sequences.length - 1][i - 1]);
    }
    sequences.push(newSequence);
    return getDifferences(sequences);
}
