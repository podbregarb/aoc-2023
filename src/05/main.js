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
    // seeds: 79 14 55 13
    // [79, 14, 55, 13]
    let seedsList = input[0].split(':')[1].trim().split(' ').map(s => Number(s));
    let seedRanges = [];
    for (let i = 0; i < seedsList.length; i += 2) {
        seedRanges.push([seedsList[i], seedsList[i] + seedsList[i + 1]]);
    }
    for (let i = 1; i < input.length; i++) {
        seedRanges = mapRangesTo(seedRanges, input[i]);
    }
    return Math.min(...seedRanges.map(range => range[0]));
}
function mapRangesTo(seeds, mapping) {
    // mapping example
    // seed-to-soil map:
    // 50 98 2
    // 52 50 48
    const ranges = mapping.split(':')[1].trim().split('\n').map(s => s.split(' ').map(s => Number(s)));
    for (let i = 0; i < seeds.length; i++) {
        // Range goes from seeds[i][0] to seeds[i][1]
        // Range needs to be split (if necessary) to ranges defined in ranges
        // [seeds[i][0], seeds[i][1]]
        for (let j = 0; j < ranges.length; j++) {
            // [ranges[j][1], ranges[j][1] + ranges[j][2]]
            // [sourceRange, sourceRange + rangeLength]
            const sourceRange = ranges[j][1];
            const rangeLength = ranges[j][2];
            if (seeds[i][0] <= sourceRange && (sourceRange + rangeLength) < seeds[i][1]) {
                seeds.splice(i, 1, [seeds[i][0], sourceRange - 1], [sourceRange, sourceRange + rangeLength - 1], [sourceRange + rangeLength, seeds[i][1]]);
            }
            else if (seeds[i][0] < sourceRange && seeds[i][1] > sourceRange && seeds[i][1] <= (sourceRange + rangeLength)) {
                seeds.splice(i, 1, [seeds[i][0], sourceRange - 1], [sourceRange, seeds[i][1]]);
            }
            else if (seeds[i][0] > sourceRange && seeds[i][0] < (sourceRange + rangeLength) && seeds[i][1] >= (sourceRange + rangeLength)) {
                seeds.splice(i, 1, [seeds[i][0], sourceRange + rangeLength - 1], [sourceRange + rangeLength, seeds[i][1]]);
            }
        }
    }
    let mappedTo = [];
    for (let i = 0; i < seeds.length; i++) {
        for (let j = 0; j < ranges.length; j++) {
            const destinationRange = ranges[j][0];
            const sourceRange = ranges[j][1];
            const rangeLength = ranges[j][2];
            if (sourceRange <= seeds[i][0] && seeds[i][1] < (sourceRange + rangeLength)) {
                if (!mappedTo[i]) {
                    mappedTo.push([
                        seeds[i][0] + (destinationRange - sourceRange),
                        seeds[i][1] + (destinationRange - sourceRange)
                    ]);
                }
            }
        }
        if (!mappedTo[i]) {
            mappedTo.push(seeds[i]);
        }
    }
    return mappedTo;
}
