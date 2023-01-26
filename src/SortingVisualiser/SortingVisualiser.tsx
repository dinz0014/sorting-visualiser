import React from 'react';
import { background, primary, secondary } from '../colours';
import {
    getBubbleSortAnimations,
    getOptimisedBubbleSortAnimations
} from '../sortingAlgorithms/bubbleSort';
import { getHeapSortAnimations } from '../sortingAlgorithms/heapSort';
import { getInsertionSortAnimations } from '../sortingAlgorithms/insertionSort';
import getIterativeMergeSortAnimations from '../sortingAlgorithms/iterativeMergeSort';
import { getQuickSortAnimations } from '../sortingAlgorithms/quickSort';
import getSelectionSortAnimations from '../sortingAlgorithms/selectionSort';
import { Animation, AnimationType } from '../types/animationTypes';
import { SortVizProps, SortVizState } from '../types/visualiserModelTypes';
import './SortingVisualiser.css';

// Main component class for Sorting Visualiser
export default class SortingVisualiser extends React.Component<
    SortVizProps,
    SortVizState
> {
    // Default properties. TODO: Pull these from a config file of sorts
    static defaultProps = {
        min: 10,
        max: 700,
        width: window.innerWidth,
        height: window.innerHeight
    };

    static ANIMATION_TIME = 1;
    static CONTROLS_HEIGHT = 80;
    originalArray: number[] = [];
    timeOuts: NodeJS.Timeout[] = [];

    // Constructor
    constructor(props: SortVizProps) {
        super(props);

        this.state = {
            currArray: [],
            barColours: [],
            size: 175
        };
    }

    // Generate the array bars once component mounts
    componentDidMount(): void {
        this.generateArray();
    }

    // Utility function to get a random integer between two numbers (inclusive)
    randomNumBetween(start: number, end: number): number {
        return Math.floor(Math.random() * (end - start + 1) + start);
    }

    // Revert any sorting that has been done on the array
    revertArray(): void {
        let currArray: number[] = Object.assign([], this.originalArray);
        this.setState({ currArray });
    }

    // Generates the array of random numbers to be sorted
    generateArray(): void {
        const currArray: number[] = [];
        const barColours: number[] = [];

        for (let i = 0; i < this.state.size; i++) {
            currArray.push(
                this.randomNumBetween(this.props.min, this.props.max)
            );
            barColours.push(0);
        }

        this.originalArray = Object.assign([], currArray);
        this.setState({ currArray, barColours });
    }

    processAnimations(animations: Animation[]) {
        animations.map((val, idx) => {
            setTimeout(() => {
                this.animate(val);
            }, idx * SortingVisualiser.ANIMATION_TIME);
        });
                    }

    animate(animation: Animation) {
        const { type } = animation;

        // Switch based on animation type
        if (
            type === AnimationType.ComparisonOff ||
            type === AnimationType.ComparisonOn
        ) {
            const { firstIdx, secondIdx } = animation;

            const barColours: number[] = this.state.barColours.map(
                (val, idx) => {
                    if (
                        (idx === firstIdx || idx === secondIdx) &&
                        type === AnimationType.ComparisonOn
                    ) {
                        return 1;
                    } else {
                        return 0;
                    }
                }
                    );

            this.setState({ barColours });
        } else if (type === AnimationType.Swap) {
            const currArray = [...this.state.currArray];
            const { firstIdx, secondIdx, firstValue, secondValue } = animation;

            currArray[firstIdx] = firstValue;
            currArray[secondIdx] = secondValue;
            this.setState({ currArray });
        } else if (type === AnimationType.Replace) {
            const currArray = [...this.state.currArray];
            const { idx, value } = animation;

            currArray[idx] = value;
            this.setState({ currArray });
        }
    }

    // Visualises the execution of selection sort
    visualiseSelectionSort(): void {
        const animations = getSelectionSortAnimations([
            ...this.state.currArray
        ]);

        this.processAnimations(animations);
    }

    // Visualises the execution of insertion sort
    visualiseInsertionSort(): void {
        const animations = getInsertionSortAnimations([
            ...this.state.currArray
        ]);
        this.processAnimations(animations);
    }

    // Visualises the execution of bubble sort
    visualiseBubbleSort(): void {
        const animations = getBubbleSortAnimations([...this.state.currArray]);

        this.processAnimations(animations);
    }

    // Visualises the execution of optimised bubble sort
    visualiseOptimisedBubbleSort(): void {
        const animations = getOptimisedBubbleSortAnimations([
            ...this.state.currArray
        ]);

        this.processAnimations(animations);
    }

    // Visualises the execution of merge sort
    visualiseIterativeMergeSort(): void {
        const animations = getIterativeMergeSortAnimations([
            ...this.state.currArray
        ]);

        this.processAnimations(animations);
    }

    // Visualises the execution of quick sort
    visualiseQuickSort(): void {
        const animations = getQuickSortAnimations([...this.state.currArray]);

        this.processAnimations(animations);
    }

    // Visualises the execution of heap sort
    visualiseHeapSort(): void {
        const animations = getHeapSortAnimations([...this.state.currArray]);

        this.processAnimations(animations);
    }

    // Change array size and regenerate array upon slider change
    sizeSliderChangeHandler(event: any): void {
        this.setState(
            {
                size: event.target.value
            },
            () => {
                this.generateArray();
            }
        );
    }

    // Renders the component to be viewed
    render(): React.ReactNode {
        // Calculates margins and bar width
        const { currArray, barColours, size } = this.state;
        const width = this.props.width;
        const barWidth = (width * 0.8) / size - 1;

        // Renders the array bars and sets their relevant style attributes
        return (
            <div className="content">
                <div
                    className="control-bar"
                    style={{
                        backgroundColor: background
                    }}>
                    <div className="size-slider">
                        <input
                            type="range"
                            min="50"
                            max="300"
                            defaultValue={this.state.size}
                            id="sizeSlider"
                            onChange={(event) => {
                                this.sizeSliderChangeHandler(event);
                            }}></input>
                        <p id="sizeValue">Array size: {size}</p>
                    </div>
                    <div className="button-row">
                        <button
                            className="array-button"
                            onClick={() => {
                                this.revertArray();
                            }}>
                            Undo Sorting
                        </button>
                        <button
                            className="array-button"
                            onClick={() => {
                                this.generateArray();
                            }}>
                            Generate New Array
                        </button>
                        <button
                            className="sorting-button"
                            onClick={() => {
                                this.visualiseSelectionSort();
                            }}>
                            Selection Sort
                        </button>
                        <button
                            className="sorting-button"
                            onClick={() => {
                                this.visualiseInsertionSort();
                            }}>
                            Insertion Sort
                        </button>
                        <button
                            className="sorting-button"
                            onClick={() => {
                                this.visualiseBubbleSort();
                            }}>
                            Bubble Sort
                        </button>
                        <button
                            className="sorting-button"
                            onClick={() => {
                                this.visualiseOptimisedBubbleSort();
                            }}>
                            Optimised Bubble Sort
                        </button>
                        <button
                            className="sorting-button"
                            onClick={() => {
                                this.visualiseIterativeMergeSort();
                            }}>
                            Merge Sort
                        </button>
                        <button
                            className="sorting-button"
                            onClick={() => {
                                this.visualiseQuickSort();
                            }}>
                            Quick Sort
                        </button>
                        <button
                            className="sorting-button"
                            onClick={() => {
                                this.visualiseHeapSort();
                            }}>
                            Heap Sort
                        </button>
                    </div>
                </div>
                <div
                    className="array-container"
                    style={{
                        backgroundColor: background,
                        width: `100%`,
                        overflow: 'auto'
                    }}>
                    {/*Hacky way to get the array bars to be positioned exactly the same vertically no matter what the array is. Forces a dummy span element
                    which has the maximum height possible for a bar. This forces all of the array bars to be aligned to the bottom of this dummy bar. */}
                    <span
                        className="array-bar"
                        style={{
                            width: `1px`,
                            height: `750px`,
                            backgroundColor: background
                        }}></span>
                    {currArray.map((value, idx) => {
                        return (
                            <span
                                className="array-bar"
                                id={`${idx}`}
                                key={idx}
                                style={{
                                    width: `${barWidth}px`,
                                    height: `${value}px`,
                                    backgroundColor:
                                        barColours[idx] === 1
                                            ? secondary
                                            : primary
                                }}></span>
                        );
                    })}
                </div>
            </div>
        );
    }
}
