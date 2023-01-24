import { compare, swap } from '../animationUtils';
import { Animation } from '../types/animationTypes';
import { ComparisonType } from '../types/comparisonTypes';

/*
Function that takes in an array of numbers to sort using bubble sort.

This function returns an array of animations that help visualise the execution of bubble sort, as well as the final sorted array.
*/
export function getBubbleSortAnimations(
    array: number[]
): [Animation[], number[]] {
    const animations: Animation[] = [];
    let swapped: boolean = false;

    do {
        swapped = false;
        for (let i = 1; i < array.length; i++) {
            // If the elements are out of order, swap them and remember that we swapped them
            if (compare(array, animations, i - 1, i, ComparisonType.GT)) {
                swap(array, animations, i, i - 1);
                swapped = true;
            }
        }
    } while (swapped);

    return [animations, array];
}

/*
Function that takes in an array of numbers to sort using an optimised version of bubble sort.

The idea is that every value after (and including) the last value that was swapped towards the end of the array is in its final sorted position.

This function returns an array of animations that help visualise the execution of optimised bubble sort, as well as the final sorted array.
*/
export function getOptimisedBubbleSortAnimations(
    array: number[]
): [Animation[], number[]] {
    const animations: Animation[] = [];
    let n = array.length;

    do {
        // This variable helps us keep track of where to finish our checking every iteration
        let newEnd = 0;

        for (let i = 1; i < n; i++) {
            // If the elements are out of order, we remember the index where the bigger element was swapped to
            if (compare(array, animations, i - 1, i, ComparisonType.GT)) {
                swap(array, animations, i, i - 1);
                newEnd = i;
            }
        }

        // Set the boundary for searching
        n = newEnd;
    } while (n > 1);

    return [animations, array];
}
