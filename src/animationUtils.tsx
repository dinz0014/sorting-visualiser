import { Animation, AnimationType } from './types/animationTypes';
import { primary, secondary } from './colours';
import { ComparisonType } from './types/comparisonTypes';

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
    animations.push({
        type: AnimationType.ComparisonOn,
        firstIdx: i,
        secondIdx: j,
        colour: secondary
    });

    animations.push({
        type: AnimationType.ComparisonOff,
        firstIdx: i,
        secondIdx: j,
        colour: primary
    });

    let array1 = array;
    let array2 = array;
    let idx1 = i;
    let idx2 = j;

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

export function replace(
    array: number[],
    animations: Animation[],
    i: number,
    val: number
): void {
    animations.push({ type: AnimationType.Replace, idx: i, value: val });

    array[i] = val;
}
