import { compare, replace } from '../animationUtils';
import { Animation } from '../types/animationTypes';
import { ComparisonType } from '../types/comparisonTypes';

/*
This function performs iterative merge sort on the array of numbers.

It accepts the array to be sorted as the imput, and outputs an array of animations that will visualise the execution of iterative merge sort, as well as the sorted array.
*/
export default function getIterativeMergeSortAnimations(
    array: number[]
): Animation[] {
    const animations: Animation[] = [];
    const n = array.length;
    let subSize = 1;

    // Start with arrays of size 1 and repeat until size gets bigger than input
    while (subSize < n) {
        // We always start at left most element of array to merge
        let l = 0;

        while (l < n) {
            // Figure out right and middle points (round down to last index if calculated value is bigger)
            let r = Math.min(l + 2 * subSize - 1, n - 1);
            let m = Math.min(l + subSize - 1, n - 1);

            // Merge the two arrays: array[l:m+1] and array[m+1:r]
            merge(array, animations, l, m, r);

            // Go to next two arrays
            l += 2 * subSize;
        }

        // Increase size of arrays we are considering
        subSize *= 2;
    }

    return animations;
}

/*
Helper function for merge sort to perform the merge operation on a specific subarray.

It accepts as input the array of numbers to be sorted, the array of animations to push animations into, the left/mid/right points of the subarray.
 */
function merge(
    array: number[],
    animations: Animation[],
    left: number,
    mid: number,
    right: number
): void {
    // L holds the left partition and R holds the right partition
    let L: number[] = [];
    let R: number[] = [];
    let l1 = mid - left + 1;
    let l2 = right - mid;

    for (let i = 0; i < l1; i++) {
        L.push(array[left + i]);
    }

    for (let i = 0; i < l2; i++) {
        R.push(array[mid + i + 1]);
    }

    let i = 0;
    let j = 0;
    let k = left;

    // Perform the merge by referencing L and R, and replacing values in the original array
    while (i < l1 && j < l2) {
        if (
            compare(
                array,
                animations,
                left + i,
                mid + 1 + j,
                ComparisonType.LTE,
                L,
                R,
                i,
                j
            )
        ) {
            replace(array, animations, k++, L[i++]);
        } else {
            replace(array, animations, k++, R[j++]);
        }
    }

    // Complete the merge by copying the left over bits of either L or R
    while (i < l1) {
        replace(array, animations, k++, L[i++]);
    }

    while (j < l2) {
        replace(array, animations, k++, R[j++]);
    }
}
