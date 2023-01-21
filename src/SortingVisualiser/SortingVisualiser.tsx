import React from 'react';
import { siteBgCol, comparisonBarCol, defaultBarCol } from '../colours';
import {
    getBubbleSortAnimations,
    getOptimisedBubbleSortAnimations
} from '../sortingAlgorithms/bubbleSort';
import getIterativeMergeSortAnimations from '../sortingAlgorithms/iterativeMergeSort';
import getSelectionSortAnimations from '../sortingAlgorithms/selectionSort';
import {
    Animation,
    AnimationType,
    SortVizProps,
    SortVizState
} from '../types/sortVisualiserTypes';
import './SortingVisualiser.css';

// Main component class for Sorting Visualiser
export default class SortingVisualiser extends React.Component<
    SortVizProps,
    SortVizState
> {
    // Default properties. TODO: Pull these from a config file of sorts
    static defaultProps = {
        size: 100,
        min: 10,
        max: 700,
        width: window.innerWidth,
        height: window.innerHeight
    };

    static ANIMATION_TIME = 10;
    static CONTROLS_HEIGHT = 80;
    originalArray: number[] = [];

    // Constructor
    constructor(props: SortVizProps) {
        super(props);

        this.state = {
            currArray: []
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

        for (let i = 0; i < this.props.size; i++) {
            currArray.push(
                this.randomNumBetween(this.props.min, this.props.max)
            );
        }

        this.originalArray = Object.assign([], currArray);
        this.setState({ currArray });
    }

    // Process an array of animations
    processAnimations(animations: Animation[], sortedArray: number[]): void {
        for (let i = 0; i < animations.length; i++) {
            const animation: Animation = animations[i];

            switch (animation.type) {
                case AnimationType.ComparisonOn:
                case AnimationType.ComparisonOff:
                    const firstStyle = document.getElementById(
                        `${animation.firstIdx}`
                    )?.style;
                    const secondStyle = document.getElementById(
                        `${animation.secondIdx}`
                    )?.style;

                    if (firstStyle === undefined || secondStyle === undefined) {
                        break;
                    }

                    setTimeout(() => {
                        firstStyle.backgroundColor = animation.colour;
                        secondStyle.backgroundColor = animation.colour;
                    }, i * SortingVisualiser.ANIMATION_TIME);

                    break;

                case AnimationType.Swap:
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

                    setTimeout(() => {
                        firstBarStyle.height = `${animation.firstValue}px`;
                        secondBarStyle.height = `${animation.secondValue}px`;
                    }, i * SortingVisualiser.ANIMATION_TIME);

                    break;

                case AnimationType.Replace:
                    const barStyle = document.getElementById(
                        `${animation.idx}`
                    )?.style;

                    if (barStyle == undefined) {
                        break;
                    }

                    setTimeout(() => {
                        barStyle.height = `${animation.value}px`;
                    }, i * SortingVisualiser.ANIMATION_TIME);

                    break;
            }

            // At the end of all animations, change the state with new sorted array
            if (i == animations.length - 1) {
                setTimeout(() => {
                    this.setState({ currArray: sortedArray });
                }, (i + 1) * SortingVisualiser.ANIMATION_TIME);
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

    visualiseIterativeMergeSort(): void {
        const [animations, sortedArray] = getIterativeMergeSortAnimations(
            this.state.currArray
        );

        this.processAnimations(animations, sortedArray);
    }

    // Renders the component to be viewed
    render(): React.ReactNode {
        // Calculates margins and bar width

        const currArray = this.state.currArray;
        const width = this.props.width;
        const height = this.props.height;
        const barWidth = 0.7 * ((width * 0.8) / this.props.size - 1);
        const marg = width * 0.1;

        // Renders the array bars and sets their relevant style attributes
        return (
            <div>
                <div
                    className="controlBar"
                    style={{
                        backgroundColor: siteBgCol,
                        height: `${SortingVisualiser.CONTROLS_HEIGHT}px`
                    }}
                >
                    <button onClick={() => this.revertArray()}>
                        Undo Sorting
                    </button>
                    <button onClick={() => this.generateArray()}>
                        Generate New Array
                    </button>
                    <button onClick={() => this.visualiseSelectionSort()}>
                        Selection Sort
                    </button>
                    <button onClick={() => this.visualiseBubbleSort()}>
                        Bubble Sort
                    </button>
                    <button onClick={() => this.visualiseOptimisedBubbleSort()}>
                        Optimised Bubble Sort
                    </button>
                    <button onClick={() => this.visualiseIterativeMergeSort()}>
                        Iterative Merge Sort
                    </button>
                </div>
                <div
                    className="array-container"
                    style={{
                        backgroundColor: siteBgCol,
                        width: `100%`,
                        height: `${
                            height - SortingVisualiser.CONTROLS_HEIGHT
                        }px`
                    }}
                >
                    {currArray.map((value, idx) => {
                        return (
                            <div
                                className="array-bar"
                                id={`${idx}`}
                                key={idx}
                                style={{
                                    width: `${barWidth}px`,
                                    height: `${value}px`,
                                    backgroundColor: defaultBarCol
                                }}
                            ></div>
                        );
                    })}
                </div>
            </div>
        );
    }
}
