import { compare, swap } from '../animationUtils';
import { Animation } from '../types/animationTypes';
import { ComparisonType } from '../types/comparisonTypes';

/*
Function that takes in the array of numbers to sort and performs Selection Sort.

This function returns a array of animations which, when processed, display the execution of selection sort, as well as the final sorted array.
*/
export default function getSelectionSortAnimations(
    array: number[]
): Animation[] {
    const animations: Animation[] = [];

    // Repeatedly find the minimum element in the unsorted portion of the array and place in the correct spot.
    for (let i = 0; i < array.length; i++) {
        let mindex = i;

        for (let j = i + 1; j < array.length; j++) {
            if (compare(array, animations, j, mindex, ComparisonType.LT)) {
                mindex = j;
            }
        }

        swap(array, animations, mindex, i);
    }

    return animations;
}
