import { comparisonBarCol, defaultBarCol } from '../colours';
import { Animation } from '../types/sortVisualiserTypes';
import { AnimationType } from '../types/sortVisualiserTypes';

/*
Function that takes in the array of numbers to sort and performs Selection Sort.

This function returns a array of animations which, when processed, display the execution of selection sort, as well as the final sorted array.
*/
export default function getSelectionSortAnimations(
    array: number[]
): [Animation[], number[]] {
    const animations: Animation[] = [];

    for (let i = 0; i < array.length; i++) {
        let currMin = array[i];
        let mindex = i;

        for (let j = i + 1; j < array.length; j++) {
            // Push two animations (one for turning the array bars into their comparison colour and one to turn back to default colour)
            animations.push({
                type: AnimationType.ComparisonOn,
                firstIdx: mindex,
                secondIdx: j,
                colour: comparisonBarCol
            });
            animations.push({
                type: AnimationType.ComparisonOff,
                firstIdx: j,
                secondIdx: mindex,
                colour: defaultBarCol
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
            type: AnimationType.Swap,
            firstIdx: i,
            firstValue: array[i],
            secondIdx: mindex,
            secondValue: array[mindex]
        });
    }

    return [animations, array];
}
