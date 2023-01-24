import { Animation, AnimationType } from './types/animationTypes';
import { primary, secondary } from './colours';
import { ComparisonType } from './types/comparisonTypes';

export function compare(
    array: number[],
    animations: Animation[],
    i: number,
    j: number,
    type: ComparisonType
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

    switch (type) {
        case ComparisonType.EQ:
            return array[i] === array[j];

        case ComparisonType.NEQ:
            return array[i] !== array[j];

        case ComparisonType.GT:
            return array[i] > array[j];

        case ComparisonType.LT:
            return array[i] < array[j];

        case ComparisonType.GTE:
            return array[i] >= array[j];

        case ComparisonType.LTE:
            return array[i] <= array[j];
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
