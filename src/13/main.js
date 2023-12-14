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
        const testInput = yield file_utils_1.FileUtils.readFileAtPath(testInputFilePath, "\n\n");
        const input = yield file_utils_1.FileUtils.readFileAtPath(inputFilePath, "\n\n");
        console.log(`Test input solution first part: ${solveFirstPart(testInput)}`);
        console.log(`Test input solution second part: ${solveSecondPart(testInput)}`);
        console.log(`Input solution first part: ${solveFirstPart(input)}`);
        console.log(`Input solution second part: ${solveSecondPart(input)}`);
    });
}
function solveFirstPart(input) {
    let sum = 0;
    for (let row of input) {
        const pattern = breakPattern(row);
        sum += findReflection(pattern);
    }
    return sum;
}
function breakPattern(row) {
    return row.split('\n');
}
function findReflection(pattern) {
    const horizontal = horizontalReflection(pattern);
    if (horizontal != undefined) {
        return 100 * (horizontal + 1);
    }
    const vertical = verticalReflection(pattern);
    if (vertical != undefined) {
        return vertical + 1;
    }
    return 0;
}
function horizontalReflection(pattern) {
    let reflectionCandidates = [];
    for (let i = 0; i < pattern.length - 1; i++) {
        if (pattern[i] == pattern[i + 1]) {
            reflectionCandidates.push(i);
        }
    }
    for (let i = 0; i < reflectionCandidates.length; i++) {
        if (checkHorizontalReflection(pattern, reflectionCandidates[i])) {
            return reflectionCandidates[i];
        }
    }
}
function checkHorizontalReflection(pattern, reflectionCandidate) {
    for (let i = 1; i <= Math.min(reflectionCandidate, pattern.length - 2 - reflectionCandidate); i++) {
        if (pattern[reflectionCandidate - i] != pattern[reflectionCandidate + 1 + i]) {
            return false;
        }
    }
    return true;
}
function verticalReflection(pattern) {
    let reflectionCandidates = [];
    for (let j = 0; j < pattern[0].length - 1; j++) {
        let isRefCandidate = true;
        for (let i = 0; i < pattern.length; i++) {
            if (pattern[i][j] != pattern[i][j + 1]) {
                isRefCandidate = false;
            }
        }
        if (isRefCandidate) {
            reflectionCandidates.push(j);
        }
    }
    for (let j = 0; j < reflectionCandidates.length; j++) {
        if (checkVerticalReflection(pattern, reflectionCandidates[j])) {
            return reflectionCandidates[j];
        }
    }
}
function checkVerticalReflection(pattern, reflectionCandidate) {
    for (let j = 1; j <= Math.min(reflectionCandidate, pattern[0].length - 2 - reflectionCandidate); j++) {
        for (let i = 0; i < pattern.length; i++) {
            if (pattern[i][reflectionCandidate - j] != pattern[i][reflectionCandidate + 1 + j]) {
                return false;
            }
        }
    }
    return true;
}
function solveSecondPart(input) {
    let sum = 0;
    return sum;
}
