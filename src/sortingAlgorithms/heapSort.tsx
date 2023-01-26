import { compare, swap } from '../animationUtils';
import { ComparisonType } from '../types/comparisonTypes';
import { Animation } from '../types/animationTypes';

/*
This function performs heap sort on an array of numbers.

It accepts as input the array of numbers to be sorted, and outputs an array of animations that visualise the execution of heap sort, as well as the sorted array
*/
export function getHeapSortAnimations(array: number[]): Animation[] {
    const animations: Animation[] = [];
    let end = array.length - 1;

    // We start from the parent of last index
    let root = Math.floor((end - 1) / 2);

    // Until there are no more parents left, sift down to heapify the subtree rooted at "root"
    while (root >= 0) {
        siftDown(array, animations, root, end);
        // Proceed to the previous parent
        root--;
    }

    // This is the actual sorting. The invariant here is that array[0..end] is a max heap at the end of each loop, and array[end..length] is sorted in ascending order.
    while (end >= 0) {
        // Take root of the heap and place at the end, and decrement end.
        swap(array, animations, end--, 0);
        // Heap property maybe violated so re-sift down to adjust heap.
        siftDown(array, animations, 0, end);
    }

    return animations;
}

/*
This function sifts a heap root down until it is at the correct place.

It accepts as input the array of numbers to be sorted, an array of animations to push animations into, the root index as well as the end of the heap in the original array.
*/
function siftDown(array: number[], animations: Animation[], root: number, end: number): void {
    // See if "root" has any children.
    while (2 * root + 1 <= end) {
        let child = 2 * root + 1;
        let swapWith = root;

        // Check which child is greater so that "root" can be swapped with that child to help achieve the heap invariant
        if (child <= end && compare(array, animations, swapWith, child, ComparisonType.LT)) {
            swapWith = child;
        }

        if (++child <= end && compare(array, animations, swapWith, child, ComparisonType.LT)) {
            swapWith = child;
        }

        // If both children are lower, we don't need to proceed further because we assume the subtrees rooted at the children are valid.
        if (swapWith === root) {
            break;
        }

        // Swap the root with the greater child and repeat the process
        swap(array, animations, root, swapWith);
        root = swapWith;
    }
}
