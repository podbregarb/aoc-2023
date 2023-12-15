import {FileUtils} from "../utils/file-utils";

const testInputFilePath = 'testInput.txt';
const inputFilePath = 'input.txt';

main();

async function main() {
    const testInput = await FileUtils.readFileAtPath(testInputFilePath);
    const input = await FileUtils.readFileAtPath(inputFilePath);

    console.log(`Test input solution HASH: ${solveFirstPart(['HASH', ''])}`)
    console.log(`Test input solution first part: ${solveFirstPart(testInput)}`)
    console.log(`Test input solution second part: ${solveSecondPart(testInput)}`)

    console.log(`Input solution first part: ${solveFirstPart(input)}`)
    console.log(`Input solution second part: ${solveSecondPart(input)}`)
}

function solveFirstPart(input: string[]): number {
    let sum = 0;
    const steps = input[0].split(',');
    for (let i = 0; i < steps.length; i++) {
        sum += hash(steps[i]);
    }
    return sum;
}

function hash(string: string): number {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
        hash += string[i].charCodeAt(0);
        hash *= 17;
        hash %= 256;
    }
    return hash;
}

function solveSecondPart(input: string[]): number {
    let sum = 0;
    let boxes: Map<number, [[string, number]]> = new Map;
    const steps = input[0].split(',');
    for (let i = 0; i < steps.length; i++) {
        if (steps[i].includes('-')) {
            const stepToRemove = steps[i].split('-')[0];
            const key = hash(stepToRemove);
            if (boxes.has(key)) {
                const existingValues = boxes.get(key)!;
                const elementToRemoveIndex = existingValues.findIndex((value) => value[0] === stepToRemove);
                if (elementToRemoveIndex !== -1) {
                    existingValues.splice(elementToRemoveIndex, 1);
                    boxes.set(key, existingValues);
                }
            }
        } else {
            const step = steps[i].split('=');
            const label = step[0];
            const focalLength = Number(step[1]);
            const key = hash(label);
            if (boxes.has(key)) {
                let newValue = boxes.get(key)!;
                const elementToReplaceIndex = newValue.findIndex((value) => value[0] === label);
                if (elementToReplaceIndex !== -1) {
                    newValue[elementToReplaceIndex][1] = focalLength;
                } else {
                    newValue.push([label, focalLength]);
                }
                boxes.set(key, newValue);
            } else {
                boxes.set(key, [[label, focalLength]]);
            }
        }
    }
    for (let key of boxes.keys()) {
        for (let j = 0; j < boxes.get(key)!.length; j++) {
            sum += (key + 1) * (j + 1) * boxes.get(key)![j][1];
        }
    }
    return sum;
}

