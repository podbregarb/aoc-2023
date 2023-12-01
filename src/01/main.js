"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const fs = __importStar(require("fs"));
const testInputFilePath = 'testInput.txt';
const testInput2FilePath = 'testInput2.txt';
const inputFilePath = 'input.txt';
const numberMapping = {
    "one": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,
    "seven": 7,
    "eight": 8,
    "nine": 9
};
main();
function readFileAtPath(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            const rows = data.split('\n').map(line => line.trim());
            resolve(rows);
        });
    });
}
function findFirstNumber(chars) {
    const match = chars.match(/\d/);
    if (match) {
        return match[0];
    }
    else {
        return '';
    }
}
function solveFirstPart(input) {
    let sum = 0;
    for (let row of input) {
        const strNumber = findFirstNumber(row) + findFirstNumber(row.split('').reverse().join(''));
        sum += Number(strNumber);
    }
    return sum;
}
function findFirstNumberOrDescriptiveNumber(chars, reverse) {
    for (let i = 0; i < chars.length; i++) {
        if (Number(chars[i])) {
            return chars[i];
        }
        else {
            const s = Object.keys(numberMapping).find(descriptiveNumber => chars.substring(i).startsWith(reverse ? descriptiveNumber.split('').reverse().join('') : descriptiveNumber));
            if (s) {
                return numberMapping[s].toString();
            }
        }
    }
    return '';
}
function solveSecondPart(input) {
    let sum = 0;
    for (let row of input) {
        const strNumber = findFirstNumberOrDescriptiveNumber(row, false) +
            findFirstNumberOrDescriptiveNumber(row.split('').reverse().join(''), true);
        sum += Number(strNumber);
    }
    return sum;
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const testInput = yield readFileAtPath(testInputFilePath);
        console.log(`Test input solution first part: ${solveFirstPart(testInput)}`);
        const testInput2 = yield readFileAtPath(testInput2FilePath);
        console.log(`Test input solution second part: ${solveSecondPart(testInput2)}`);
        const input = yield readFileAtPath(inputFilePath);
        console.log(`Input solution first part: ${solveFirstPart(input)}`);
        console.log(`Input solution second part: ${solveSecondPart(input)}`);
    });
}
