import React from 'react';
import { siteBgCol, comparisonBarCol, defaultBarCol } from '../colours';
import getBubbleSortAnimations from '../sortingAlgorithms/bubbleSort';
import getOptimisedBubbleSortAnimations from '../sortingAlgorithms/bubbleSort';
import getSelectionSortAnimations from '../sortingAlgorithms/selectionSort';
import {
    animation,
    animationType,
    sortVizProps,
    sortVizState
} from '../types/sortVisualiserTypes';
import './SortingVisualiser.css';

// Main component class for Sorting Visualiser
export default class SortingVisualiser extends React.Component<
    sortVizProps,
    sortVizState
> {
    // Default properties. TODO: Pull these from a config file of sorts
    static defaultProps = {
        size: 25,
        min: 10,
        max: 700,
        width: window.innerWidth,
        height: window.innerHeight
    };

    static ANIMATION_TIME = 10;
    static CONTROLS_HEIGHT = 80;

    // Constructor
    constructor(props: sortVizProps) {
        super(props);

        this.state = {
            array: []
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

    // Generates the array of random numbers to be sorted
    generateArray(): void {
        const array: number[] = [];

        for (let i = 0; i < this.props.size; i++) {
            array.push(this.randomNumBetween(this.props.min, this.props.max));
        }

        this.setState({ array });
    }

    // Process an array of animations
    processAnimations(animations: animation[]): void {
        for (let i = 0; i < animations.length; i++) {
            const { type, firstIdx, firstValue, secondIdx, secondValue } =
                animations[i];
            const firstStyle = document.getElementById(`${firstIdx}`)?.style;
            const secondStyle = document.getElementById(`${secondIdx}`)?.style;

            if (firstStyle === undefined || secondStyle === undefined) {
                return;
            }

            if (type === animationType.ComparisonOn) {
                setTimeout(() => {
                    firstStyle.backgroundColor = comparisonBarCol;
                    secondStyle.backgroundColor = comparisonBarCol;
                }, i * SortingVisualiser.ANIMATION_TIME);
            } else if (type === animationType.ComparisonOff) {
                setTimeout(() => {
                    firstStyle.backgroundColor = defaultBarCol;
                    secondStyle.backgroundColor = defaultBarCol;
                }, i * SortingVisualiser.ANIMATION_TIME);
            } else {
                setTimeout(() => {
                    firstStyle.height = `${firstValue}px`;
                    secondStyle.height = `${secondValue}px`;
                }, i * SortingVisualiser.ANIMATION_TIME);
            }
        }
    }

    // Visualises the execution of selection sort
    visualiseSelectionSort(): void {
        const animations = getSelectionSortAnimations(this.state.array);

        this.processAnimations(animations);
    }

    // Visualises the execution of bubble sort
    visualiseBubbleSort(): void {
        const animations = getBubbleSortAnimations(this.state.array);

        this.processAnimations(animations);
    }

    // Visualises the execution of optimised bubble sort
    visualiseOptimisedBubbleSort(): void {
        const animations = getOptimisedBubbleSortAnimations(this.state.array);

        this.processAnimations(animations);
    }

    // Renders the component to be viewed
    render(): React.ReactNode {
        // Calculates margins and bar width
        const { array } = this.state;
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
                    }}>
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
                </div>
                <div
                    className="array-container"
                    style={{
                        backgroundColor: siteBgCol,
                        width: `100%`,
                        height: `${
                            height - SortingVisualiser.CONTROLS_HEIGHT
                        }px`
                    }}>
                    {array.map((value, idx) => {
                        return (
                            <div
                                className="array-bar"
                                id={`${idx}`}
                                key={idx}
                                style={{
                                    width: `${barWidth}px`,
                                    height: `${value}px`,
                                    backgroundColor: defaultBarCol
                                }}></div>
                        );
                    })}
                </div>
            </div>
        );
    }
}
