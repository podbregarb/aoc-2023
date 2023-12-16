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
const emptyTile = '.';
const leftMirror = '\\';
const rightMirror = '/';
const vertical = '|';
const horizontal = '-';
const right = 'R';
const left = 'L';
const up = 'U';
const down = 'D';
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
    // input
    // .|...\....
    // |.-.\.....
    // .....|-...
    // ........|.
    // ..........
    // .........\
    // ..../.\\..
    // .-.-/..|..
    // .|....-|.\
    // ..//.|....
    return getEnergizedScore(input, [0, 0, right]);
}
function solveSecondPart(input) {
    let highestEnergizedScore = 0;
    // First and last row
    for (let j = 0; j < input[0].length; j++) {
        for (let row of [0, input.length - 1]) {
            let energizedScore = getEnergizedScore(input, [row, j, down]);
            if (energizedScore > highestEnergizedScore) {
                highestEnergizedScore = energizedScore;
            }
        }
    }
    // First and last column
    for (let i = 0; i < input.length; i++) {
        for (let column of [0, input[0].length - 1]) {
            let energizedScore = getEnergizedScore(input, [i, column, right]);
            if (energizedScore > highestEnergizedScore) {
                highestEnergizedScore = energizedScore;
            }
        }
    }
    return highestEnergizedScore;
}
function getEnergizedScore(input, startingBeam) {
    let energizedBeams = [];
    energizedBeams = travel(input, startingBeam, energizedBeams);
    let uniqueEnergizedBeams = [];
    for (let i = 0; i < energizedBeams.length; i++) {
        if (!uniqueEnergizedBeams.find(beam => beam[0] == energizedBeams[i][0] && beam[1] == energizedBeams[i][1])) {
            uniqueEnergizedBeams.push([energizedBeams[i][0], energizedBeams[i][1]]);
        }
    }
    return uniqueEnergizedBeams.length;
}
function travel(input, currentBeam, energizedBeams) {
    while (true) {
        if (energizedBeams.find(beam => beam[0] == currentBeam[0] && beam[1] == currentBeam[1] && beam[2] == currentBeam[2])) {
            break;
        }
        energizedBeams.push([currentBeam[0], currentBeam[1], currentBeam[2]]);
        let currentTile = input[currentBeam[0]][currentBeam[1]];
        if (currentTile == emptyTile) {
            if (currentBeam[2] == right) {
                if (currentBeam[1] + 1 < input.length) {
                    currentBeam = [currentBeam[0], currentBeam[1] + 1, currentBeam[2]];
                }
                else {
                    break;
                }
            }
            else if (currentBeam[2] == left) {
                if (currentBeam[1] - 1 >= 0) {
                    currentBeam = [currentBeam[0], currentBeam[1] - 1, currentBeam[2]];
                }
                else {
                    break;
                }
            }
            else if (currentBeam[2] == up) {
                if (currentBeam[0] - 1 >= 0) {
                    currentBeam = [currentBeam[0] - 1, currentBeam[1], currentBeam[2]];
                }
                else {
                    break;
                }
            }
            else if (currentBeam[2] == down) {
                if (currentBeam[0] + 1 < input[0].length) {
                    currentBeam = [currentBeam[0] + 1, currentBeam[1], currentBeam[2]];
                }
                else {
                    break;
                }
            }
        }
        else if (currentTile == leftMirror) {
            if (currentBeam[2] == right) {
                if (currentBeam[0] + 1 < input[0].length) {
                    currentBeam = [currentBeam[0] + 1, currentBeam[1], down];
                }
                else {
                    break;
                }
            }
            else if (currentBeam[2] == left) {
                if (currentBeam[0] - 1 >= 0) {
                    currentBeam = [currentBeam[0] - 1, currentBeam[1], up];
                }
                else {
                    break;
                }
            }
            else if (currentBeam[2] == up) {
                if (currentBeam[1] - 1 >= 0) {
                    currentBeam = [currentBeam[0], currentBeam[1] - 1, left];
                }
                else {
                    break;
                }
            }
            else if (currentBeam[2] == down) {
                if (currentBeam[1] + 1 < input.length) {
                    currentBeam = [currentBeam[0], currentBeam[1] + 1, right];
                }
                else {
                    break;
                }
            }
        }
        else if (currentTile == rightMirror) {
            if (currentBeam[2] == right) {
                if (currentBeam[0] - 1 >= 0) {
                    currentBeam = [currentBeam[0] - 1, currentBeam[1], up];
                }
                else {
                    break;
                }
            }
            else if (currentBeam[2] == left) {
                if (currentBeam[0] + 1 < input[0].length) {
                    currentBeam = [currentBeam[0] + 1, currentBeam[1], down];
                }
                else {
                    break;
                }
            }
            else if (currentBeam[2] == up) {
                if (currentBeam[1] + 1 < input.length) {
                    currentBeam = [currentBeam[0], currentBeam[1] + 1, right];
                }
                else {
                    break;
                }
            }
            else if (currentBeam[2] == down) {
                if (currentBeam[1] - 1 >= 0) {
                    currentBeam = [currentBeam[0], currentBeam[1] - 1, left];
                }
                else {
                    break;
                }
            }
        }
        else if (currentTile == vertical) {
            if (currentBeam[2] == right || currentBeam[2] == left) {
                if (currentBeam[0] - 1 >= 0) {
                    travel(input, [currentBeam[0] - 1, currentBeam[1], up], energizedBeams);
                }
                if (currentBeam[0] + 1 < input[0].length) {
                    travel(input, [currentBeam[0] + 1, currentBeam[1], down], energizedBeams);
                }
                break;
            }
            else if (currentBeam[2] == up) {
                if (currentBeam[0] - 1 >= 0) {
                    currentBeam = [currentBeam[0] - 1, currentBeam[1], currentBeam[2]];
                }
                else {
                    break;
                }
            }
            else if (currentBeam[2] == down) {
                if (currentBeam[0] + 1 < input[0].length) {
                    currentBeam = [currentBeam[0] + 1, currentBeam[1], currentBeam[2]];
                }
                else {
                    break;
                }
            }
        }
        else if (currentTile == horizontal) {
            if (currentBeam[2] == right) {
                if (currentBeam[1] + 1 < input.length) {
                    currentBeam = [currentBeam[0], currentBeam[1] + 1, currentBeam[2]];
                }
                else {
                    break;
                }
            }
            else if (currentBeam[2] == left) {
                if (currentBeam[1] - 1 >= 0) {
                    currentBeam = [currentBeam[0], currentBeam[1] - 1, currentBeam[2]];
                }
                else {
                    break;
                }
            }
            else if (currentBeam[2] == up || currentBeam[2] == down) {
                if (currentBeam[1] - 1 >= 0) {
                    travel(input, [currentBeam[0], currentBeam[1] - 1, left], energizedBeams);
                }
                if (currentBeam[1] + 1 < input.length) {
                    travel(input, [currentBeam[0], currentBeam[1] + 1, right], energizedBeams);
                }
                break;
            }
        }
    }
    return energizedBeams;
}
