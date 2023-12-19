import {FileUtils} from "../utils/file-utils";

const testInputFilePath = 'testInput.txt';
const inputFilePath = 'input.txt';

const accepted = 'A';
const rejected = 'R';

main();

async function main() {
    const testInput = await FileUtils.readFileAtPath(testInputFilePath, "\n\n");
    const input = await FileUtils.readFileAtPath(inputFilePath, "\n\n");

    console.log(`Test input solution first part: ${solveFirstPart(testInput)}`)
    console.log(`Test input solution second part: ${solveSecondPart(testInput)}`)

    console.log(`Input solution first part: ${solveFirstPart(input)}`)
    console.log(`Input solution second part: ${solveSecondPart(input)}`)
}

function solveFirstPart(input: string[]): number {
    const rules = input[0].split("\n");
    const ratings = input[1].split("\n");
    const rulesMap = getRulesMap(rules);
    const ratingsList = getRatingsList(ratings);
    const acceptedRatings = getAcceptedRatings(ratingsList, rulesMap);
    return countAcceptedRatings(acceptedRatings);
}

function solveSecondPart(input: string[]): number {
    let sum = 0;
    return sum;
}

function countAcceptedRatings(acceptedRatings: any[]) {
    let sum = 0;
    for (let i = 0; i < acceptedRatings.length; i++) {
        for (let key of Object.keys(acceptedRatings[i])) {
            sum += acceptedRatings[i][key];
        }
    }
    return sum;
}

function getAcceptedRatings(ratingsList: any, rulesMap: any) {
    let acceptedRatings = [];
    for (let i = 0; i < ratingsList.length; i++) {
        const rating = ratingsList[i];
        const accepted = getAcceptedOrRejected(rating, rulesMap, "in");
        if (accepted) {
            acceptedRatings.push(rating);
        }
    }
    return acceptedRatings;
}

function getAcceptedOrRejected(rating: any, rulesMap: any, currentRuleKey: string): boolean {
    // a<2006:qkq,m>2090:A,rfg
    const currentRule = rulesMap[currentRuleKey];
    const currentRuleConditions = currentRule.split(",");
    for (let i = 0; i < currentRuleConditions.length; i++) {
        const currentRuleCondition = currentRuleConditions[i];
        if (currentRuleCondition.includes('<')) {
            const split = currentRuleCondition.split(':');
            const nextKeyAcceptedOrRejected = split[1];
            const condition = split[0].split('<');
            if (rating[condition[0]] < Number(condition[1])) {
                if (nextKeyAcceptedOrRejected == accepted) {
                    return true;
                } else if (nextKeyAcceptedOrRejected == rejected) {
                    return false;
                } else {
                    return getAcceptedOrRejected(rating, rulesMap, nextKeyAcceptedOrRejected);
                }
            }
        } else if (currentRuleCondition.includes('>')) {
            const split = currentRuleCondition.split(':');
            const nextKeyAcceptedOrRejected = split[1];
            const condition = split[0].split('>');
            if (rating[condition[0]] > Number(condition[1])) {
                if (nextKeyAcceptedOrRejected == accepted) {
                    return true;
                } else if (nextKeyAcceptedOrRejected == rejected) {
                    return false;
                } else {
                    return getAcceptedOrRejected(rating, rulesMap, nextKeyAcceptedOrRejected);
                }
            }
        } else if (currentRuleCondition == accepted) {
            return true;
        } else if (currentRuleCondition == rejected) {
            return false;
        } else {
            return getAcceptedOrRejected(rating, rulesMap, currentRuleCondition);
        }
    }
    return false;
}

function getRatingsList(ratings: string[]) {
    // rules
    // {x=787,m=2655,a=1222,s=2876}
    let ratingsList: any = [];
    for (let i = 0; i < ratings.length; i++) {
        let oneRating: any = {};
        const splitRating = ratings[i].replace("{", "").replace("}", "").split(",");
        for (let j = 0; j < splitRating.length; j++) {
            const keyAndValue = splitRating[j].split("=");
            oneRating[keyAndValue[0]] = Number(keyAndValue[1]);
        }
        ratingsList.push(oneRating);
    }
    return ratingsList;
}

function getRulesMap(rules: string[]) {
    // rules
    // px{a<2006:qkq,m>2090:A,rfg}
    let rulesMap: any = {};
    for (let i = 0; i < rules.length; i++) {
        const splitRule = rules[i].split("{");
        rulesMap[splitRule[0]] = splitRule[1].replace("}", "");
    }
    return rulesMap;
}

