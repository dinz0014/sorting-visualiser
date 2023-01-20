import { animation } from '../types/sortVisualiserTypes';
import { animationType } from '../types/sortVisualiserTypes';

export default function getSelectionSortAnimations(
    originalArray: number[]
): animation[] {
    const animations = [];
    const copiedArray = Object.assign([], originalArray);

    for (let i = 0; i < copiedArray.length; i++) {
        let currMin = copiedArray[i];
        let mindex = i;

        for (let j = i + 1; j < copiedArray.length; j++) {
            animations.push({
                type: animationType.ComparisonOn,
                firstIdx: mindex,
                secondIdx: j
            });
            animations.push({
                type: animationType.ComparisonOff,
                firstIdx: j,
                secondIdx: mindex
            });
            if (copiedArray[j] < currMin) {
                currMin = copiedArray[j];
                mindex = j;
            }
        }

        let temp = copiedArray[mindex];
        copiedArray[mindex] = copiedArray[i];
        copiedArray[i] = temp;

        originalArray[mindex] = originalArray[i];
        originalArray[i] = temp;

        animations.push({
            type: animationType.Swap,
            firstIdx: i,
            firstValue: originalArray[i],
            secondIdx: mindex,
            secondValue: originalArray[mindex]
        });
    }

    return animations;
}
