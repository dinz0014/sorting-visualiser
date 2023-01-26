import { compare, swap } from '../animationUtils';
import { ComparisonType } from '../types/comparisonTypes';
import { Animation } from '../types/animationTypes';

/*
This function performs insertion sort on the array.

It accepts the array of numbers to sort, and returns an array of animations that will visualise the execution of insertion sort, as well as the sorted array.
*/
export function getInsertionSortAnimations(array: number[]): Animation[] {
    const animations: Animation[] = [];

    // Consider all the elements from the 2nd one
    for (let i = 1; i < array.length; i++) {
        let j = i;
        // Repeatedly swap the current element with the element before it if they are out of order
        while (
            j >= 0 &&
            compare(array, animations, j - 1, j, ComparisonType.GT)
        ) {
            swap(array, animations, j, --j);
        }
    }

    return animations;
}
