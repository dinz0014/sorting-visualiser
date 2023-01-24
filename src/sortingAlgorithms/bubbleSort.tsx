import { secondary, primary } from '../colours';
import { Animation } from '../types/animationTypes';
import { AnimationType } from '../types/animationTypes';

/*
Function that takes in an array of numbers to sort using bubble sort.

This function returns an array of animations that help visualise the execution of bubble sort, as well as the final sorted array.
*/
export function getBubbleSortAnimations(
    array: number[]
): [Animation[], number[]] {
    const animations: Animation[] = [];
    let swapped: boolean = false;

    do {
        swapped = false;
        for (let i = 1; i < array.length; i++) {
            // Push two animations, one to indicate a colour change for comparison and another to return back to default colour
            animations.push({
                type: AnimationType.ComparisonOn,
                firstIdx: i,
                secondIdx: i - 1,
                colour: secondary
            });
            animations.push({
                type: AnimationType.ComparisonOff,
                firstIdx: i,
                secondIdx: i - 1,
                colour: primary
            });

            // If the elements are out of order, swap them and remember that we swapped them
            if (array[i] < array[i - 1]) {
                let temp = array[i];
                array[i] = array[i - 1];
                array[i - 1] = temp;
                swapped = true;

                // Push a swap animation
                animations.push({
                    type: AnimationType.Swap,
                    firstIdx: i,
                    firstValue: array[i],
                    secondIdx: i - 1,
                    secondValue: array[i - 1]
                });
            }
        }
    } while (swapped);

    return [animations, array];
}

/*
Function that takes in an array of numbers to sort using an optimised version of bubble sort.

The idea is that every value after (and including) the last value that was swapped towards the end of the array is in its final sorted position.

This function returns an array of animations that help visualise the execution of optimised bubble sort, as well as the final sorted array.
*/
export function getOptimisedBubbleSortAnimations(
    array: number[]
): [Animation[], number[]] {
    const animations: Animation[] = [];
    let n = array.length;

    do {
        // This variable helps us keep track of where to finish our checking every iteration
        let newEnd = 0;

        for (let i = 1; i < n; i++) {
            // Push two animations, one to indicate a colour change for comparison and another to return back to default colour
            animations.push({
                type: AnimationType.ComparisonOn,
                firstIdx: i,
                secondIdx: i - 1,
                colour: secondary
            });
            animations.push({
                type: AnimationType.ComparisonOff,
                firstIdx: i,
                secondIdx: i - 1,
                colour: primary
            });

            // If the elements are out of order, we remember the index where the bigger element was swapped to
            if (array[i] < array[i - 1]) {
                let temp = array[i];
                array[i] = array[i - 1];
                array[i - 1] = temp;
                newEnd = i;

                // Push a swap animation
                animations.push({
                    type: AnimationType.Swap,
                    firstIdx: i,
                    firstValue: array[i],
                    secondIdx: i - 1,
                    secondValue: array[i - 1]
                });
            }
        }

        // Set the boundary for searching
        n = newEnd;
    } while (n > 1);

    return [animations, array];
}
