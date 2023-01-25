import React from 'react';
import { background, primary } from '../colours';
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
import { SortVizProps, SortVizState } from '../types/sortVisualiserTypes';
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
        this.setState({ currArray, size: this.originalArray.length });
    }

    // Generates the array of random numbers to be sorted
    generateArray(): void {
        const currArray: number[] = [];
        this.timeOuts.map((timeOut) => {
            clearTimeout(timeOut);
        });

        for (let i = 0; i < this.state.size; i++) {
            currArray.push(
                this.randomNumBetween(this.props.min, this.props.max)
            );
        }

        this.originalArray = Object.assign([], currArray);
        this.setState({ currArray, size: this.state.size });
    }

    // Process an array of animations
    processAnimations(animations: Animation[], sortedArray: number[]): void {
        for (let i = 0; i < animations.length; i++) {
            const animation: Animation = animations[i];

            // Switch based on animation type
            switch (animation.type) {
                case AnimationType.ComparisonOn:
                case AnimationType.ComparisonOff:
                    // Handle comparison animations
                    const firstStyle = document.getElementById(
                        `${animation.firstIdx}`
                    )?.style;
                    const secondStyle = document.getElementById(
                        `${animation.secondIdx}`
                    )?.style;

                    if (firstStyle === undefined || secondStyle === undefined) {
                        break;
                    }

                    this.timeOuts.push(
                        setTimeout(() => {
                            firstStyle.backgroundColor = animation.colour;
                            secondStyle.backgroundColor = animation.colour;
                            console.log('still going');
                        }, i * SortingVisualiser.ANIMATION_TIME)
                    );

                    break;

                case AnimationType.Swap:
                    // Handle swap animations
                    const firstBarStyle = document.getElementById(
                        `${animation.firstIdx}`
                    )?.style;
                    const secondBarStyle = document.getElementById(
                        `${animation.secondIdx}`
                    )?.style;

                    if (
                        firstBarStyle === undefined ||
                        secondBarStyle === undefined
                    ) {
                        break;
                    }

                    this.timeOuts.push(
                        setTimeout(() => {
                            firstBarStyle.height = `${animation.firstValue}px`;
                            secondBarStyle.height = `${animation.secondValue}px`;
                        }, i * SortingVisualiser.ANIMATION_TIME)
                    );

                    break;

                case AnimationType.Replace:
                    // Handle replace animations
                    const barStyle = document.getElementById(
                        `${animation.idx}`
                    )?.style;

                    if (barStyle === undefined) {
                        break;
                    }

                    this.timeOuts.push(
                        setTimeout(() => {
                            barStyle.height = `${animation.value}px`;
                        }, i * SortingVisualiser.ANIMATION_TIME)
                    );

                    break;
            }

            // At the end of all animations, change the state with new sorted array
            if (i === animations.length - 1) {
                this.timeOuts.push(
                    setTimeout(() => {
                        this.setState({
                            currArray: sortedArray,
                            size: sortedArray.length
                        });
                    }, (i + 1) * SortingVisualiser.ANIMATION_TIME)
                );
            }
        }
    }

    // Visualises the execution of selection sort
    visualiseSelectionSort(): void {
        const [animations, sortedArray] = getSelectionSortAnimations(
            this.state.currArray
        );
        this.processAnimations(animations, sortedArray);
    }

    // Visualises the execution of insertion sort
    visualiseInsertionSort(): void {
        const [animations, sortedArray] = getInsertionSortAnimations(
            this.state.currArray
        );
        this.processAnimations(animations, sortedArray);
    }

    // Visualises the execution of bubble sort
    visualiseBubbleSort(): void {
        const [animations, sortedArray] = getBubbleSortAnimations(
            this.state.currArray
        );

        this.processAnimations(animations, sortedArray);
    }

    // Visualises the execution of optimised bubble sort
    visualiseOptimisedBubbleSort(): void {
        const [animations, sortedArray] = getOptimisedBubbleSortAnimations(
            this.state.currArray
        );

        this.processAnimations(animations, sortedArray);
    }

    // Visualises the execution of merge sort
    visualiseIterativeMergeSort(): void {
        const [animations, sortedArray] = getIterativeMergeSortAnimations(
            this.state.currArray
        );

        this.processAnimations(animations, sortedArray);
    }

    // Visualises the execution of quick sort
    visualiseQuickSort(): void {
        const [animations, sortedArray] = getQuickSortAnimations(
            this.state.currArray
        );
        this.processAnimations(animations, sortedArray);
    }

    // Visualises the execution of heap sort
    visualiseHeapSort(): void {
        const [animations, sortedArray] = getHeapSortAnimations(
            this.state.currArray
        );
        this.processAnimations(animations, sortedArray);
    }

    // Change array size and regenerate array upon slider change
    sizeSliderChangeHandler(event: any): void {
        this.setState(
            {
                currArray: this.state.currArray,
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
        const currArray = this.state.currArray;
        const width = this.props.width;
        const height = this.props.height;
        const barWidth = (width * 0.8) / this.state.currArray.length - 1;

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
                        <p id="sizeValue">Array size: {this.state.size}</p>
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
                                    height: `${value}px`
                                }}></span>
                        );
                    })}
                </div>
            </div>
        );
    }
}
