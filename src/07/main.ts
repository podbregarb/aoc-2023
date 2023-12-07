import {FileUtils} from "../utils/file-utils";

const testInputFilePath = 'testInput.txt';
const inputFilePath = 'input.txt';

main();

async function main() {
    const testInput = await FileUtils.readFileAtPath(testInputFilePath);
    const input = await FileUtils.readFileAtPath(inputFilePath);

    console.log(`Test input solution first part: ${solveFirstPart(testInput)}`)
    console.log(`Test input solution second part: ${solveSecondPart(testInput)}`)

    console.log(`Input solution first part: ${solveFirstPart(input)}`)
    console.log(`Input solution second part: ${solveSecondPart(input)}`)
}

function solveFirstPart(input: string[]): number {
    const cardPowers = "AKQJT98765432";
    const handsSortedByRank = sortByRank(input, cardPowers, countAndSortCharacters);
    return calculateTotalWinnings(handsSortedByRank);
}

function solveSecondPart(input: string[]): number {
    const cardPowers = "AKQT98765432J";
    const handsSortedByRank = sortByRank(input, cardPowers, countAndSortCharactersPart2);
    return calculateTotalWinnings(handsSortedByRank);
}

function sortByRank(input: string[], cardPowers: string, countAndSortCharacters: Function): string[] {

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
                    } else {
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

function calculateTotalWinnings(handsSortedByRank: string[]) {
    let sum = 0;
    for (let i = 0; i < handsSortedByRank.length; i++) {
        // '32T3K 765'
        const bid = Number(handsSortedByRank[i].split(' ')[1]);
        sum += bid * (i + 1);
    }
    return sum;
}

function countAndSortCharacters(input: string) {
    const charCount = countCharacters(input);
    return getMapEntriesArraySortedByValues(charCount);
}

function countAndSortCharactersPart2(input: string) {
    const charCount = countCharacters(input);

    let numberOfJokers = charCount.get('J') ?? 0;
    charCount.delete('J');

    let sort = getMapEntriesArraySortedByValues(charCount);
    if (sort[0]) {
        sort[0] = [sort[0][0], sort[0][1] + numberOfJokers];
    } else {
        // If all cards are jokers
        sort[0] = ['A', numberOfJokers];
    }
    return sort;
}

function countCharacters(input: string) {
    return input.split('').reduce((map, char) => {
        map.set(char, (map.get(char) || 0) + 1);
        return map;
    }, new Map<string, number>());
}

function getMapEntriesArraySortedByValues(charCount: Map<string, number>) {
    return [...charCount.entries()].sort((a, b) => b[1] - a[1]);
}



