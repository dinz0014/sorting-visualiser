import { animation } from '../types/sortVisualiserTypes';
import { animationType } from '../types/sortVisualiserTypes';

/*
Function that takes in an array of numbers to sort using bubble sort.

This function returns an array of animations that help visualise the execution of bubble sort
*/
export default function getBubbleSortAnimations(array: number[]): animation[] {
    const animations: animation[] = [];
    let swapped: boolean = false;

    do {
        swapped = false;
        for (let i = 1; i < array.length; i++) {
            // Push two animations, one to indicate a colour change for comparison and another to return back to default colour
            animations.push({
                type: animationType.ComparisonOn,
                firstIdx: i,
                secondIdx: i - 1
            });
            animations.push({
                type: animationType.ComparisonOff,
                firstIdx: i,
                secondIdx: i - 1
            });

            // If the elements are out of order, swap them and remember that we swapped them
            if (array[i] < array[i - 1]) {
                let temp = array[i];
                array[i] = array[i - 1];
                array[i - 1] = temp;
                swapped = true;

                // Push a swap animation
                animations.push({
                    type: animationType.Swap,
                    firstIdx: i,
                    firstValue: array[i],
                    secondIdx: i - 1,
                    secondValue: array[i - 1]
                });
            }
        }
    } while (swapped);

    return animations;
}
