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
    const cardPowers = "AKQJT98765432";
    const handsSortedByRank = sortByRank(input, cardPowers, countAndSortCharacters);
    return calculateTotalWinnings(handsSortedByRank);
}
function solveSecondPart(input) {
    const cardPowers = "AKQT98765432J";
    const handsSortedByRank = sortByRank(input, cardPowers, countAndSortCharactersPart2);
    return calculateTotalWinnings(handsSortedByRank);
}
function sortByRank(input, cardPowers, countAndSortCharacters) {
    return input.sort((a, b) => {
        const aCards = a.split(' ')[0];
        const bCards = b.split(' ')[0];
        const aCharCount = countAndSortCharacters(aCards);
        const bCharCount = countAndSortCharacters(bCards);
        for (let i = 0; i < Math.min(aCharCount.length, bCharCount.length); i++) {
            // First hand is stronger
            if (aCharCount[i][1] > bCharCount[i][1]) {
                return 1;
            }
            // Second hand is stronger
            else if (aCharCount[i][1] < bCharCount[i][1]) {
                return -1;
            }
            // First and second hand have the same number of matching cards
            else if (aCharCount[i][1] == bCharCount[i][1]) {
                if (aCharCount[i + 1] && bCharCount[i + 1]) {
                    // First hand is stronger
                    if (aCharCount[i + 1][1] > bCharCount[i + 1][1]) {
                        return 1;
                    }
                    // Second hand is stronger
                    else if (aCharCount[i + 1][1] < bCharCount[i + 1][1]) {
                        return -1;
                    }
                    else {
                        continue;
                    }
                }
                for (let j = 0; j < aCards.length; j++) {
                    if (aCards[j] !== bCards[j]) {
                        return cardPowers.indexOf(bCards[j]) - cardPowers.indexOf(aCards[j]);
                    }
                }
            }
        }
        return 0;
    });
}
function calculateTotalWinnings(handsSortedByRank) {
    let sum = 0;
    for (let i = 0; i < handsSortedByRank.length; i++) {
        // '32T3K 765'
        const bid = Number(handsSortedByRank[i].split(' ')[1]);
        sum += bid * (i + 1);
    }
    return sum;
}
function countAndSortCharacters(input) {
    const charCount = countCharacters(input);
    return getMapEntriesArraySortedByValues(charCount);
}
function countAndSortCharactersPart2(input) {
    var _a;
    const charCount = countCharacters(input);
    let numberOfJokers = (_a = charCount.get('J')) !== null && _a !== void 0 ? _a : 0;
    charCount.delete('J');
    let sort = getMapEntriesArraySortedByValues(charCount);
    if (sort[0]) {
        sort[0] = [sort[0][0], sort[0][1] + numberOfJokers];
    }
    else {
        // If all cards are jokers
        sort[0] = ['A', numberOfJokers];
    }
    return sort;
}
function countCharacters(input) {
    return input.split('').reduce((map, char) => {
        map.set(char, (map.get(char) || 0) + 1);
        return map;
    }, new Map());
}
function getMapEntriesArraySortedByValues(charCount) {
    return [...charCount.entries()].sort((a, b) => b[1] - a[1]);
}
