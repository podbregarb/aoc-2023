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
const dot = /\./g;
const gear = /\*/g;
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
    for (let i = 0; i < input.length; i++) {
        const row = input[i];
        const matches = row.matchAll(/\d+/g);
        for (let match of matches) {
            const matchIndex = match.index;
            // For every match, check around it if there is a symbol; if yes, add to sum
            if ((matchIndex != 0 && row[matchIndex - 1].replace(/\d+/g, '').replace(dot, '').length > 0) ||
                ((matchIndex + match[0].length) != row.length &&
                    row[matchIndex + match[0].length].replace(/\d+/g, '').replace(dot, '').length > 0) ||
                (i != 0 &&
                    input[i - 1].substring(Math.max(matchIndex - 1, 0), Math.min(matchIndex + match[0].length + 1, row.length)).replace(/\d+/g, '').replace(dot, '').length > 0) ||
                (i != input.length - 1 &&
                    input[i + 1].substring(Math.max(matchIndex - 1, 0), Math.min(matchIndex + match[0].length + 1, row.length)).replace(/\d+/g, '').replace(dot, '').length > 0)) {
                sum += Number(match);
            }
        }
    }
    return sum;
}
function addToGears(gears, row, column, value) {
    const key = `${row},${column}`;
    if (gears[key]) {
        gears[key].push(value);
    }
    else {
        gears[key] = [value];
    }
}
function solveSecondPart(input) {
    let gears = {};
    for (let i = 0; i < input.length; i++) {
        const row = input[i];
        const matches = row.matchAll(/\d+/g);
        for (let match of matches) {
            const matchIndex = match.index;
            if (matchIndex != 0 && row[matchIndex - 1].match(gear)) {
                addToGears(gears, i, matchIndex - 1, match[0]);
            }
            if ((matchIndex + match[0].length) != row.length && row[matchIndex + match[0].length].match(gear)) {
                addToGears(gears, i, matchIndex + match[0].length, match[0]);
            }
            if (i != 0) {
                const previousRow = input[i - 1].substring(Math.max(matchIndex - 1, 0), Math.min(matchIndex + match[0].length + 1, row.length));
                const matchArray = previousRow.matchAll(gear);
                for (let m of matchArray) {
                    addToGears(gears, i - 1, Math.max(matchIndex - 1, 0) + m.index, match[0]);
                }
            }
            if (i != input.length - 1) {
                const nextRow = input[i + 1].substring(Math.max(matchIndex - 1, 0), Math.min(matchIndex + match[0].length + 1, row.length));
                const matchArray = nextRow.matchAll(gear);
                for (let m of matchArray) {
                    addToGears(gears, i + 1, Math.max(matchIndex - 1, 0) + m.index, match[0]);
                }
            }
        }
    }
    let sum = 0;
    for (let key of Object.keys(gears)) {
        if (gears[key].length == 2) {
            sum += Number(gears[key][0]) * Number(gears[key][1]);
        }
    }
    return sum;
}
