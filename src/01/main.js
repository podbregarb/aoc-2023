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
const testInput2FilePath = 'testInput2.txt';
const inputFilePath = 'input.txt';
const numberMapping = {
    "one": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,
    "seven": 7,
    "eight": 8,
    "nine": 9
};
main();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const testInput = yield file_utils_1.FileUtils.readFileAtPath(testInputFilePath);
        const testInput2 = yield file_utils_1.FileUtils.readFileAtPath(testInput2FilePath);
        const input = yield file_utils_1.FileUtils.readFileAtPath(inputFilePath);
        console.log(`Test input solution first part: ${solveFirstPart(testInput)}`);
        console.log(`Test input solution second part: ${solveSecondPart(testInput2)}`);
        console.log(`Input solution first part: ${solveFirstPart(input)}`);
        console.log(`Input solution second part: ${solveSecondPart(input)}`);
    });
}
function solveFirstPart(input) {
    let sum = 0;
    for (let row of input) {
        const strNumber = findFirstNumber(row) + findFirstNumber(row.split('').reverse().join(''));
        sum += Number(strNumber);
    }
    return sum;
}
function findFirstNumber(chars) {
    const match = chars.match(/\d/);
    if (match) {
        return match[0];
    }
    else {
        return '';
    }
}
function solveSecondPart(input) {
    let sum = 0;
    for (let row of input) {
        const strNumber = findFirstNumberOrDescriptiveNumber(row, false) +
            findFirstNumberOrDescriptiveNumber(row.split('').reverse().join(''), true);
        sum += Number(strNumber);
    }
    return sum;
}
function findFirstNumberOrDescriptiveNumber(chars, reverse) {
    for (let i = 0; i < chars.length; i++) {
        if (Number(chars[i])) {
            return chars[i];
        }
        else {
            const s = Object.keys(numberMapping).find(descriptiveNumber => chars.substring(i).startsWith(reverse ? descriptiveNumber.split('').reverse().join('') : descriptiveNumber));
            if (s) {
                return numberMapping[s].toString();
            }
        }
    }
    return '';
}
