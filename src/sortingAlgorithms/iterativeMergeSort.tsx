import { comparisonBarCol, defaultBarCol } from '../colours';
import { Animation, AnimationType } from '../types/sortVisualiserTypes';

export default function getIterativeMergeSortAnimations(
    array: number[]
): [Animation[], number[]] {
    const animations: Animation[] = [];
    const n = array.length;
    let subSize = 1;

    while (subSize < n) {
        let l = 0;

        while (l < n) {
            let r = Math.min(l + 2 * subSize - 1, n - 1);
            let m = Math.min(l + subSize - 1, n - 1);

            merge(array, animations, l, m, r);

            l += 2 * subSize;
        }

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

    while (i < l1 && j < l2) {
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
