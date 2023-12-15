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
        console.log(`Test input solution HASH: ${solveFirstPart(['HASH', ''])}`);
        console.log(`Test input solution first part: ${solveFirstPart(testInput)}`);
        console.log(`Test input solution second part: ${solveSecondPart(testInput)}`);
        console.log(`Input solution first part: ${solveFirstPart(input)}`);
        console.log(`Input solution second part: ${solveSecondPart(input)}`);
    });
}
function solveFirstPart(input) {
    let sum = 0;
    const steps = input[0].split(',');
    for (let i = 0; i < steps.length; i++) {
        sum += hash(steps[i]);
    }
    return sum;
}
function hash(string) {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
        hash += string[i].charCodeAt(0);
        hash *= 17;
        hash %= 256;
    }
    return hash;
}
function solveSecondPart(input) {
    let sum = 0;
    let boxes = new Map;
    const steps = input[0].split(',');
    for (let i = 0; i < steps.length; i++) {
        if (steps[i].includes('-')) {
            const stepToRemove = steps[i].split('-')[0];
            const key = hash(stepToRemove);
            if (boxes.has(key)) {
                const existingValues = boxes.get(key);
                const elementToRemoveIndex = existingValues.findIndex((value) => value[0] === stepToRemove);
                if (elementToRemoveIndex !== -1) {
                    existingValues.splice(elementToRemoveIndex, 1);
                    boxes.set(key, existingValues);
                }
            }
        }
        else {
            const step = steps[i].split('=');
            const label = step[0];
            const focalLength = Number(step[1]);
            const key = hash(label);
            if (boxes.has(key)) {
                let newValue = boxes.get(key);
                const elementToReplaceIndex = newValue.findIndex((value) => value[0] === label);
                if (elementToReplaceIndex !== -1) {
                    newValue[elementToReplaceIndex][1] = focalLength;
                }
                else {
                    newValue.push([label, focalLength]);
                }
                boxes.set(key, newValue);
            }
            else {
                boxes.set(key, [[label, focalLength]]);
            }
        }
    }
    for (let key of boxes.keys()) {
        for (let j = 0; j < boxes.get(key).length; j++) {
            sum += (key + 1) * (j + 1) * boxes.get(key)[j][1];
        }
    }
    return sum;
}
