import { Animation } from '../types/animationTypes';
import { compare, swap } from '../animationUtils';
import { ComparisonType } from '../types/comparisonTypes';

/*
This function performs quick sort on an array of numbers.

It accepts the array of numbers to be sorted and returns an array of animations required to visualise the execution of quick sort as well as the sorted array.
*/
export function getQuickSortAnimations(array: number[]): Animation[] {
    const animations: Animation[] = [];
    quickSortHelper(array, animations, 0, array.length - 1);
    return animations;
}

/*
Helper function to perform quicksort and fill the animations array with appropriate animations.
*/
function quickSortHelper(
    array: number[],
    animations: Animation[],
    start: number,
    end: number
): void {
    // Recursively quick sort until the size of the portion is less than or equal to 2
    while (end - start > 1) {
        // Find sorted index of pivot
        let pIndex = partition(array, animations, start, end);

        // Recurse with quick sort on the smaller side and iterate to quick sort on the other side
        if (pIndex - start > end - pIndex) {
            quickSortHelper(array, animations, pIndex + 1, end);
            end = pIndex - 1;
        } else {
            quickSortHelper(array, animations, start, pIndex - 1);
            start = pIndex + 1;
        }
    }

    // Don't do anything if the size is 1
    if (start === end) {
        return;
    }

    // Manually sort portions of size 2
    if (compare(array, animations, start, end, ComparisonType.GT)) {
        swap(array, animations, start, end);
    }
}

/*
This function finds the sorted index of the pivot element. The pivot is found based on the median of 3 method.

*/
function partition(
    array: number[],
    animations: Animation[],
    l: number,
    r: number
): number {
    // Find median of 3 and put it at index r-1
    threeMedian(array, animations, l, r);
    let i = l,
        j = r - 1;

    while (true) {
        // Find elements to the left and right of pivot that are out of order
        while (compare(array, animations, ++i, r - 1, ComparisonType.LT)) {}
        while (compare(array, animations, --j, r - 1, ComparisonType.GT)) {}

        // If left pointer and right pointer cross, we don't need to swap. Otherwise, swap them
        if (i >= j) {
            break;
        } else {
            swap(array, animations, i, j);
        }
    }

    // Put the pivot into left pointer and return left pointer as the pivot index.
    swap(array, animations, i, r - 1);
    return i;
}

/*
This function sorts the left-most, right-most and central values of a portion of the array to be sorted and puts the median into the pivoting index.
*/
function threeMedian(
    array: number[],
    animations: Animation[],
    l: number,
    r: number
): void {
    let mid = Math.floor(l + (r - l) / 2);

    // Sort the three values at left pointer, mid pointer and right pointer
    if (compare(array, animations, l, mid, ComparisonType.GT)) {
        swap(array, animations, l, mid);
    }

    if (compare(array, animations, l, r, ComparisonType.GT)) {
        swap(array, animations, l, r);
    }

    if (compare(array, animations, mid, r, ComparisonType.GT)) {
        swap(array, animations, mid, r);
    }

    // Swap median into the second last element
    swap(array, animations, mid, r - 1);
}
