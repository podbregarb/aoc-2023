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
        console.log(`Test input solution first part: ${solveFirstPart(testInput)}`);
        console.log(`Test input solution second part: ${solveSecondPart(testInput)}`);
        console.log(`Input solution first part: ${solveFirstPart(input)}`);
        console.log(`Input solution second part: ${solveSecondPart(input)}`);
    });
}
function solveFirstPart(input) {
    // Time:      7  15   30
    const times = input[0].split(':')[1].trim().split(' ').filter(Boolean).map(s => Number(s));
    // Distance:  9  40  200
    const distances = input[1].split(':')[1].trim().split(' ').filter(Boolean).map(s => Number(s));
    return getNumberOfPossibleWins(times, distances);
}
function solveSecondPart(input) {
    // Time:      7  15   30
    const time = Number(input[0].split(':')[1].trim().split(' ').filter(Boolean).join(''));
    // Distance:  9  40  200
    const distance = Number(input[1].split(':')[1].trim().split(' ').filter(Boolean).join(''));
    return getNumberOfPossibleWins([time], [distance]);
}
function getNumberOfPossibleWins(times, distances) {
    let numberOfPossibleWins = 1;
    for (let i = 0; i < times.length; i++) {
        let sum = 0;
        const minDistanceToWin = distances[i];
        for (let j = 1; j < times[i]; j++) {
            const speed = j;
            const remainingTime = times[i] - j;
            if (speed * remainingTime > minDistanceToWin) {
                sum += 1;
            }
        }
        numberOfPossibleWins *= sum;
    }
    return numberOfPossibleWins;
}
