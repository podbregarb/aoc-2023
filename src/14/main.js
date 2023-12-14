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
const emptySpace = '.';
const roundRock = 'O';
const cubeRock = '#';
main();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const testInput = yield file_utils_1.FileUtils.readFileAtPath(testInputFilePath);
        const input = yield file_utils_1.FileUtils.readFileAtPath(inputFilePath);
        console.log(`Test input solution first part: ${solveFirstPart(testInput)}`);
        //console.log(`Test input solution second part: ${solveSecondPart(testInput)}`)
        console.log(`Input solution first part: ${solveFirstPart(input)}`);
        //console.log(`Input solution second part: ${solveSecondPart(input)}`)
    });
}
function solveFirstPart(input) {
    // input
    // O....#....
    // O.OO#....#
    // .....##...
    // OO.#O....O
    // .O.....O#.
    // O.#..O.#.#
    // ..O..#O..O
    // .......O..
    // #....###..
    // #OO..#....
    let sum = 0;
    for (let j = 0; j < input[0].length; j++) {
        let rowLoad = input.length;
        for (let i = 0; i < input.length; i++) {
            if (input[i][j] == cubeRock) {
                rowLoad = input.length - i - 1;
            }
            else if (input[i][j] == roundRock) {
                sum += rowLoad;
                rowLoad--;
            }
        }
    }
    return sum;
}
