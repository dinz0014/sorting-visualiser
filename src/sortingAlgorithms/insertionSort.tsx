import { compare, swap } from '../animationUtils';
import { ComparisonType } from '../types/comparisonTypes';
import { Animation } from '../types/animationTypes';

export function getInsertionSortAnimations(
    array: number[]
): [Animation[], number[]] {
    const animations: Animation[] = [];

    for (let i = 1; i < array.length; i++) {
        let j = i;
        while (
            j >= 0 &&
            compare(array, animations, j - 1, j, ComparisonType.GT)
        ) {
            swap(array, animations, j, --j);
        }
    }

    return [animations, array];
}
