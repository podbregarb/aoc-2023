import {FileUtils} from "../utils/file-utils";

const testInputFilePath = 'testInput.txt';
const testInput2FilePath = 'testInput2.txt';
const testInputPart2FilePath = 'testInputPart2.txt';
const inputFilePath = 'input.txt';

const start = 'AAA';
const end = 'ZZZ';

const indexMap: any = {
    'L': 0,
    'R': 1
}

main();

async function main() {
    const testInput = await FileUtils.readFileAtPath(testInputFilePath);
    const testInput2 = await FileUtils.readFileAtPath(testInput2FilePath);
    const testInputPart2 = await FileUtils.readFileAtPath(testInputPart2FilePath);
    const input = await FileUtils.readFileAtPath(inputFilePath);

    console.log(`Test input solution first part: ${solveFirstPart(testInput)}`)
    console.log(`Test input solution first part 2: ${solveFirstPart(testInput2)}`)
    console.log(`Test input solution second part: ${solveSecondPart(testInputPart2)}`)

    // Too low: 1975
    console.log(`Input solution first part: ${solveFirstPart(input)}`)
    console.log(`Input solution second part: ${solveSecondPart(input)}`)
}

function solveFirstPart(input: string[]): number {
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

function solveSecondPart(input: string[]): number {
    const networkMap: any = getNetworkMap(input);
    let startingNodes = Object.keys(networkMap).filter(key => key.endsWith('A'));
    let numberOfSteps = [];
    for (let i = 0; i < startingNodes.length; i++) {
        numberOfSteps.push(getNumberOfSteps(input, networkMap, startingNodes[i]))
    }
    return lowestCommonDenominator(numberOfSteps);
}

function lowestCommonDenominator(numberOfSteps: any[]) {
    // Source: https://stackoverflow.com/questions/31302054/how-to-find-the-least-common-multiple-of-a-range-of-numbers
    const gcd: (a: number, b: number) => any = (a, b) => b == 0 ? a : gcd(b, a % b)
    const lcm = (a: number, b: number) => a / gcd(a, b) * b
    const lcmAll = (ns: any) => ns.reduce(lcm, 1)

    return lcmAll(numberOfSteps);
}

function getNumberOfSteps(input: string[], networkMap: any, currentNode: string): number {
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

function getNetworkMap(input: string[]) {
    const networkMap: any = {};
    for (let i = 2; i < input.length; i++) {
        // input[i]: DDD = (DDD, DDD)
        const splitKey = input[i].trim().split(' = ');
        const splitValues = splitKey[1].replace('(', '').replace(')', '').split(', ')
        networkMap[splitKey[0]] = [
            splitValues[0],
            splitValues[1]
        ]
    }
    return networkMap;
}

