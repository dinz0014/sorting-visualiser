import { Animation, AnimationType } from './types/animationTypes';
import { ComparisonType } from './types/comparisonTypes';

/*
This function peforms a comparison between two numbers and adds corresponding animations into an array of animations.

It accepts as input:
array - the original array of numbers to be sorted
animations - the array of animations to push animations into
i - first index in "array" to compare
j - second index in "array" to compare
type - the type of comparison to perform
array_alt1 - an optional argument, for an alternate array of numbers to consider
array_alt2 - an optional argument, for another alternate array of numbers to consider
alt1_idx - an optional argument, for an index in "array_alt1" to compare
alt2_idx - an optional argument, for an index in "array_alt2" to compare

and outputs the result of the comparison.
*/
export function compare(
    array: number[],
    animations: Animation[],
    i: number,
    j: number,
    type: ComparisonType,
    array_alt1?: number[],
    array_alt2?: number[],
    alt1_idx?: number,
    alt2_idx?: number
): boolean {
    // Push two animations to indicate the start and end of the comparison
    animations.push({
        type: AnimationType.ComparisonOn,
        firstIdx: i,
        secondIdx: j
    });

    animations.push({
        type: AnimationType.ComparisonOff,
        firstIdx: i,
        secondIdx: j
    });

    let array1 = array;
    let array2 = array;
    let idx1 = i;
    let idx2 = j;

    // Parse optional arguments and prepare for comparison
    if (
        array_alt1 !== undefined &&
        array_alt2 !== undefined &&
        alt1_idx !== undefined &&
        alt2_idx !== undefined
    ) {
        array1 = array_alt1;
        array2 = array_alt2;
        idx1 = alt1_idx;
        idx2 = alt2_idx;
    }

    // Return the result of the comparison
    switch (type) {
        case ComparisonType.EQ:
            return array1[idx1] === array2[idx2];

        case ComparisonType.NEQ:
            return array1[idx1] !== array2[idx2];

        case ComparisonType.GT:
            return array1[idx1] > array2[idx2];

        case ComparisonType.LT:
            return array1[idx1] < array2[idx2];

        case ComparisonType.GTE:
            return array1[idx1] >= array2[idx2];

        case ComparisonType.LTE:
            return array1[idx1] <= array2[idx2];
    }
}

/*
This function performs the swap operation between two indices of the same array and adds corresponding animations into an animations array.

It accepts as input:
array -  the array of numbers to consider
animations - the array of animations to push animations into
i - one index to swap
j - the other index to swap
*/
export function swap(
    array: number[],
    animations: Animation[],
    i: number,
    j: number
): void {
    animations.push({
        type: AnimationType.Swap,
        firstIdx: i,
        firstValue: array[j],
        secondIdx: j,
        secondValue: array[i]
    });

    [array[i], array[j]] = [array[j], array[i]];
}

/*
This function performs a replace operation on the original array and adds the relevant animations into an animations array.

It accepts as input:
array - the array of numbers to consider
animations - the array of animations to put animations into
i - the index at which the replacement will occur
val - the value which "array[idx]" should be replaced to
*/
export function replace(
    array: number[],
    animations: Animation[],
    i: number,
    val: number
): void {
    animations.push({ type: AnimationType.Replace, idx: i, value: val });

    array[i] = val;
}
