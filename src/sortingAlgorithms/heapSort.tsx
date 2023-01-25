import { compare, swap } from '../animationUtils';
import { ComparisonType } from '../types/comparisonTypes';
import { Animation } from '../types/animationTypes';

export function getHeapSortAnimations(
    array: number[]
): [Animation[], number[]] {
    let end = array.length - 1;
    let root = Math.floor((end - 1) / 2);
    const animations: Animation[] = [];

    while (root >= 0) {
        siftDown(array, animations, root, end);
        root--;
    }

    while (end >= 0) {
        swap(array, animations, end--, 0);
        siftDown(array, animations, 0, end);
    }

    return [animations, array];
}

function siftDown(
    array: number[],
    animations: Animation[],
    root: number,
    end: number
) {
    while (2 * root + 1 <= end) {
        let child = 2 * root + 1;
        let swapWith = root;

        if (
            child <= end &&
            compare(array, animations, swapWith, child, ComparisonType.LT)
        ) {
            swapWith = child;
        }

        if (
            ++child <= end &&
            compare(array, animations, swapWith, child, ComparisonType.LT)
        ) {
            swapWith = child;
        }

        if (swapWith === root) {
            break;
        }

        swap(array, animations, root, swapWith);
        root = swapWith;
    }
}
