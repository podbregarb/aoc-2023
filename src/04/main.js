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
    let sum = 0;
    for (let row of input) {
        // Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
        const winningAndElfsNumbers = row.split(':')[1].split('|');
        // " 41 48 83 86 17 | 83 86  6 31 17  9 48 53"
        // " 41 48 83 86 17 "
        const winningNumbers = winningAndElfsNumbers[0].split(' ').filter(Boolean);
        // " 83 86  6 31 17  9 48 53"
        const elfsNumbers = winningAndElfsNumbers[1].split(' ').filter(Boolean);
        const elfsWinningNumbers = elfsNumbers.filter(elfsNumber => winningNumbers.includes(elfsNumber));
        if (elfsWinningNumbers.length > 0) {
            sum += 2 ** (elfsWinningNumbers.length - 1);
        }
    }
    return sum;
}
function solveSecondPart(input) {
    let cardCopies = new Array(input.length).fill(1);
    for (let index = 0; index < input.length; index++) {
        const row = input[index];
        // Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
        const winningAndElfsNumbers = row.split(':')[1].split('|');
        // " 41 48 83 86 17 | 83 86  6 31 17  9 48 53"
        // " 41 48 83 86 17 "
        const winningNumbers = winningAndElfsNumbers[0].split(' ').filter(Boolean);
        // " 83 86  6 31 17  9 48 53"
        const elfsNumbers = winningAndElfsNumbers[1].split(' ').filter(Boolean);
        const elfsWinningNumbers = elfsNumbers.filter(elfsNumber => winningNumbers.includes(elfsNumber));
        for (let i = 0; i < elfsWinningNumbers.length; i++) {
            cardCopies[index + i + 1] += cardCopies[index];
        }
    }
    return cardCopies.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}
