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
const testInputPart2FilePath = 'testInputPart2.txt';
const inputFilePath = 'input.txt';
const start = 'AAA';
const end = 'ZZZ';
const indexMap = {
    'L': 0,
    'R': 1
};
main();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const testInput = yield file_utils_1.FileUtils.readFileAtPath(testInputFilePath);
        const testInput2 = yield file_utils_1.FileUtils.readFileAtPath(testInput2FilePath);
        const testInputPart2 = yield file_utils_1.FileUtils.readFileAtPath(testInputPart2FilePath);
        const input = yield file_utils_1.FileUtils.readFileAtPath(inputFilePath);
        console.log(`Test input solution first part: ${solveFirstPart(testInput)}`);
        console.log(`Test input solution first part 2: ${solveFirstPart(testInput2)}`);
        console.log(`Test input solution second part: ${solveSecondPart(testInputPart2)}`);
        // Too low: 1975
        console.log(`Input solution first part: ${solveFirstPart(input)}`);
        console.log(`Input solution second part: ${solveSecondPart(input)}`);
    });
}
function solveFirstPart(input) {
    // input
    // RL
    //
    // AAA = (BBB, CCC)
    // BBB = (DDD, EEE)
    // CCC = (ZZZ, GGG)
    // DDD = (DDD, DDD)
    // EEE = (EEE, EEE)
    // GGG = (GGG, GGG)
    // ZZZ = (ZZZ, ZZZ)
    // RL
    const instructions = input[0];
    const networkMap = getNetworkMap(input);
    let numberOfSteps = 0;
    let currentNode = start;
    for (let i = 0; i < instructions.length; i++) {
        if (currentNode == end) {
            break;
        }
        currentNode = networkMap[currentNode][indexMap[instructions[i]]];
        numberOfSteps++;
        if (i == (instructions.length - 1)) {
            i = -1;
        }
    }
    return numberOfSteps;
}
function solveSecondPart(input) {
    const networkMap = getNetworkMap(input);
    let startingNodes = Object.keys(networkMap).filter(key => key.endsWith('A'));
    let numberOfSteps = [];
    for (let i = 0; i < startingNodes.length; i++) {
        numberOfSteps.push(getNumberOfSteps(input, networkMap, startingNodes[i]));
    }
    return lowestCommonDenominator(numberOfSteps);
}
function lowestCommonDenominator(numberOfSteps) {
    // Source: https://stackoverflow.com/questions/31302054/how-to-find-the-least-common-multiple-of-a-range-of-numbers
    const gcd = (a, b) => b == 0 ? a : gcd(b, a % b);
    const lcm = (a, b) => a / gcd(a, b) * b;
    const lcmAll = (ns) => ns.reduce(lcm, 1);
    return lcmAll(numberOfSteps);
}
function getNumberOfSteps(input, networkMap, currentNode) {
    // RL
    const instructions = input[0];
    let numberOfSteps = 0;
    for (let i = 0; i < instructions.length; i++) {
        if (currentNode.endsWith('Z')) {
            break;
        }
        currentNode = networkMap[currentNode][indexMap[instructions[i]]];
        numberOfSteps++;
        if (i == (instructions.length - 1)) {
            i = -1;
        }
    }
    return numberOfSteps;
}
function getNetworkMap(input) {
    const networkMap = {};
    for (let i = 2; i < input.length; i++) {
        // input[i]: DDD = (DDD, DDD)
        const splitKey = input[i].trim().split(' = ');
        const splitValues = splitKey[1].replace('(', '').replace(')', '').split(', ');
        networkMap[splitKey[0]] = [
            splitValues[0],
            splitValues[1]
        ];
    }
    return networkMap;
}
