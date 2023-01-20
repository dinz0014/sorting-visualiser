import { animation } from '../types/sortVisualiserTypes';

export default function getSelectionSortAnimations(
    array: number[]
): animation[] {
    const animations = [];

    for (let i = 0; i < array.length; i++) {
        let currMin = array[i];
        let mindex = i;

        for (let j = i + 1; j < array.length; j++) {
            animations.push({ firstIdx: mindex, secondIdx: j });
            if (array[j] < currMin) {
                currMin = array[j];
                mindex = j;
            }
        }

        let temp = array[mindex];
        array[mindex] = array[i];
        array[i] = temp;
    }

    return animations;
}
