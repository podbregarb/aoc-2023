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
        const testInput = yield file_utils_1.FileUtils.readFileAtPath(testInputFilePath, '\n\n');
        const input = yield file_utils_1.FileUtils.readFileAtPath(inputFilePath, '\n\n');
        console.log(`Test input solution first part: ${solveFirstPart(testInput)}`);
        console.log(`Test input solution second part: ${solveSecondPart(testInput)}`);
        console.log(`Input solution first part: ${solveFirstPart(input)}`);
        console.log(`Input solution second part: ${solveSecondPart(input)}`);
    });
}
function solveFirstPart(input) {
    let seeds = input[0].split(':')[1].trim().split(' ').map(s => Number(s));
    for (let i = 1; i < input.length; i++) {
        seeds = mapTo(seeds, input[i]);
    }
    return Math.min(...seeds);
}
function mapTo(seeds, mapping) {
    const ranges = mapping.split(':')[1].trim().split('\n').map(s => s.split(' ').map(s => Number(s)));
    let mappedTo = [];
    for (let i = 0; i < seeds.length; i++) {
        for (let j = 0; j < ranges.length; j++) {
            const destinationRange = ranges[j][0];
            const sourceRange = ranges[j][1];
            const rangeLength = ranges[j][2];
            if (sourceRange <= seeds[i] && seeds[i] < (sourceRange + rangeLength)) {
                if (!mappedTo[i]) {
                    mappedTo.push(seeds[i] + (destinationRange - sourceRange));
                }
            }
        }
        if (!mappedTo[i]) {
            mappedTo.push(seeds[i]);
        }
    }
    return mappedTo;
}
function solveSecondPart(input) {
    let sum = 0;
    return sum;
}
