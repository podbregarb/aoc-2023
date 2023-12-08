import {FileUtils} from "../utils/file-utils";

const testInputFilePath = 'testInput.txt';
const inputFilePath = 'input.txt';

main();

async function main() {
    const testInput = await FileUtils.readFileAtPath(testInputFilePath, '\n\n');
    const input = await FileUtils.readFileAtPath(inputFilePath, '\n\n');

    console.log(`Test input solution first part: ${solveFirstPart(testInput)}`)
    console.log(`Test input solution second part: ${solveSecondPart(testInput)}`)

    console.log(`Input solution first part: ${solveFirstPart(input)}`)
    console.log(`Input solution second part: ${solveSecondPart(input)}`)
}

function solveFirstPart(input: string[]): number {
    let seeds = input[0].split(':')[1].trim().split(' ').map(s => Number(s));
    for (let i = 1; i < input.length; i++) {
        seeds = mapTo(seeds, input[i]);
    }
    return Math.min(...seeds);
}

function mapTo(seeds: number[], mapping: string): number[] {
    const ranges = mapping.split(':')[1].trim().split('\n').map(s => s.split(' ').map(s => Number(s)));
    let mappedTo: number[] = [];
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

function solveSecondPart(input: string[]): number {
    // seeds: 79 14 55 13
    // [79, 14, 55, 13]
    let seedsList = input[0].split(':')[1].trim().split(' ').map(s => Number(s));
    let seedRanges: [number, number][] = [];
    for (let i = 0; i < seedsList.length; i += 2) {
        seedRanges.push([seedsList[i], seedsList[i] + seedsList[i + 1]]);
    }

    for (let i = 1; i < input.length; i++) {
        seedRanges = mapRangesTo(seedRanges, input[i]);
    }
    return Math.min(...seedRanges.map(range => range[0]));
}

function mapRangesTo(seeds: [number, number][], mapping: string): [number, number][] {
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
                seeds.splice(
                    i,
                    1,
                    [seeds[i][0], sourceRange - 1],
                    [sourceRange, sourceRange + rangeLength - 1],
                    [sourceRange + rangeLength, seeds[i][1]]
                )
            } else if (seeds[i][0] < sourceRange && seeds[i][1] > sourceRange && seeds[i][1] <= (sourceRange + rangeLength)) {
                seeds.splice(i, 1, [seeds[i][0], sourceRange - 1], [sourceRange, seeds[i][1]])
            } else if (seeds[i][0] > sourceRange && seeds[i][0] < (sourceRange + rangeLength) && seeds[i][1] >= (sourceRange + rangeLength)) {
                seeds.splice(
                    i,
                    1,
                    [seeds[i][0], sourceRange + rangeLength - 1],
                    [sourceRange + rangeLength, seeds[i][1]]
                )
            }
        }
    }
    let mappedTo: [number, number][] = [];
    for (let i = 0; i < seeds.length; i++) {
        for (let j = 0; j < ranges.length; j++) {
            const destinationRange = ranges[j][0];
            const sourceRange = ranges[j][1];
            const rangeLength = ranges[j][2];
            if (sourceRange <= seeds[i][0] && seeds[i][1] < (sourceRange + rangeLength)) {
                if (!mappedTo[i]) {
                    mappedTo.push(
                        [
                            seeds[i][0] + (destinationRange - sourceRange),
                            seeds[i][1] + (destinationRange - sourceRange)
                        ]
                    );
                }
            }
        }
        if (!mappedTo[i]) {
            mappedTo.push(seeds[i]);
        }
    }
    return mappedTo;
}
