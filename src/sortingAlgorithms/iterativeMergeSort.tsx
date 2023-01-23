import { comparisonBarCol, defaultBarCol } from '../colours';
import { Animation, AnimationType } from '../types/sortVisualiserTypes';

export default function getIterativeMergeSortAnimations(
    array: number[]
): [Animation[], number[]] {
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

    return [animations, array];
}

function merge(
    array: number[],
    animations: Animation[],
    left: number,
    mid: number,
    right: number
) {
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
        // Push two animations to indicate the starting and ending of comparison
        animations.push({
            type: AnimationType.ComparisonOn,
            firstIdx: left + i,
            secondIdx: mid + 1 + j,
            colour: comparisonBarCol
        });

        animations.push({
            type: AnimationType.ComparisonOff,
            firstIdx: left + i,
            secondIdx: mid + 1 + j,
            colour: defaultBarCol
        });

        // Push replace animations and replace the values in the original array with merged values
        if (L[i] <= R[j]) {
            animations.push({
                type: AnimationType.Replace,
                idx: k,
                value: L[i]
            });
            array[k++] = L[i++];
        } else {
            animations.push({
                type: AnimationType.Replace,
                idx: k,
                value: R[j]
            });
            array[k++] = R[j++];
        }
    }

    // Complete the merge by copying the left over bits of either L or R
    while (i < l1) {
        animations.push({
            type: AnimationType.Replace,
            idx: k,
            value: L[i]
        });
        array[k++] = L[i++];
    }

    while (j < l2) {
        animations.push({
            type: AnimationType.Replace,
            idx: k,
            value: R[j]
        });
        array[k++] = R[j++];
    }
}
