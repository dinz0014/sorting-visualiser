import { animation } from '../types/sortVisualiserTypes';
import { animationType } from '../types/sortVisualiserTypes';

/*
Function that takes in the array of numbers to sort and performs Selection Sort.

This function returns a array of animations which, when processed, display the execution of selection sort.
*/
export default function getSelectionSortAnimations(
    array: number[]
): animation[] {
    const animations = [];

    for (let i = 0; i < array.length; i++) {
        let currMin = array[i];
        let mindex = i;

        for (let j = i + 1; j < array.length; j++) {
            // Push two animations (one for turning the array bars into their comparison colour and one to turn back to default colour)
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

            if (array[j] < currMin) {
                currMin = array[j];
                mindex = j;
            }
        }

        let temp = array[mindex];
        array[mindex] = array[i];
        array[i] = temp;

        // Here, we are swapping two values so add this into the animations
        animations.push({
            type: animationType.Swap,
            firstIdx: i,
            firstValue: array[i],
            secondIdx: mindex,
            secondValue: array[mindex]
        });
    }

    return animations;
}
