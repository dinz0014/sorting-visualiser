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
export default class SortingVisualiser extends React.Component<SortVizProps, SortVizState> {
    // Default properties. TODO: Pull these from a config file of sorts
    static defaultProps = {
        minVal: 10,
        maxVal: 1000,
        minSize: 10,
        maxSize: 300
    };

    ANIMATION_TIME = 10;
    originalArray: number[] = [];
    animationArray: Animation[] = [];
    currAnimIndex: number = 0;
    animationIntervalID?: ReturnType<typeof setInterval>;

    // Constructor
    constructor(props: SortVizProps) {
        super(props);

        this.state = {
            currArray: [],
            barColours: [],
            size: Math.floor((props.maxSize + props.minSize) / 2),
            isSorting: false,
            sortType: ''
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

    // Calculates a reasonable animation time based on the array size
    getAnimationDelay(): number {
        return this.ANIMATION_TIME - Math.floor(this.state.size / 100);
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

    // Revert any sorting that has been done on the array
    revertArray(): void {
        this.stopAnimations();
        this.revertBarColours();

        let currArray: number[] = Object.assign([], this.originalArray);
        this.setState({ currArray });
    }

    // Reverts the barColours back to default
    revertBarColours(): void {
        const barColours: number[] = [];
        for (let i = 0; i < this.state.size; i++) {
            barColours.push(0);
        }
        this.setState({ barColours });
    }

    // Generates the array of random numbers to be sorted
    generateArray(): void {
        const currArray: number[] = [];
        this.stopAnimations();

        for (let i = 0; i < this.state.size; i++) {
            currArray.push(this.randomNumBetween(this.props.minVal, this.props.maxVal));
        }

        this.originalArray = Object.assign([], currArray);
        this.setState({ currArray });
    }

    // Process the animations in an array of animations
    processAnimations(): void {
        this.currAnimIndex = 0;
        this.animationIntervalID = setInterval(() => {
            this.animate();
        }, this.getAnimationDelay());
    }

    // Process a single animation
    animate(): void {
        if (this.currAnimIndex === this.animationArray.length) {
            this.stopAnimations();
            this.animationArray = [];
            return;
        }

        const animation: Animation = this.animationArray[this.currAnimIndex++];
        const { type } = animation;

        // Switch based on animation type
        if (type === AnimationType.ComparisonOff || type === AnimationType.ComparisonOn) {
            const { firstIdx, secondIdx } = animation;

            // Set all other bars to default colour, set the compared bars to red colour
            const barColours: number[] = this.state.barColours.map((_val, idx) => {
                if (
                    (idx === firstIdx || idx === secondIdx) &&
                    type === AnimationType.ComparisonOn
                ) {
                    return 1;
                } else {
                    return 0;
                }
            });

            this.setState({ barColours });
        } else if (type === AnimationType.Swap) {
            const currArray = [...this.state.currArray];
            const { firstIdx, secondIdx, firstValue, secondValue } = animation;

            // Swap the values at the given indices
            currArray[firstIdx] = firstValue;
            currArray[secondIdx] = secondValue;
            this.setState({ currArray });
        } else if (type === AnimationType.Replace) {
            const currArray = [...this.state.currArray];
            const { idx, value } = animation;

            // Replace the value at a given index with a given value
            currArray[idx] = value;
            this.setState({ currArray });
        }
    }

    // Stop the animations and set all colours back to default
    stopAnimations(): void {
        this.revertBarColours();
        this.setState({ sortType: '' });
        if (this.animationIntervalID !== undefined) {
            clearInterval(this.animationIntervalID);
            this.setState({ isSorting: false });
        }
    }

    getSortButtonClassName(id: string): string {
        if (this.state.sortType === id) {
            return 'selected-sorting-button';
        }

        return 'sorting-button';
    }

    // Visualises the sorting with the help of a type that is passed in as a string
    visualiseSort(sortType: string): void {
        this.setState({ isSorting: true, sortType });

        switch (sortType) {
            case 'select':
                this.animationArray = getSelectionSortAnimations([...this.state.currArray]);
                break;
            case 'insert':
                this.animationArray = getInsertionSortAnimations([...this.state.currArray]);
                break;
            case 'bubble':
                this.animationArray = getBubbleSortAnimations([...this.state.currArray]);
                break;
            case 'opt_bubble':
                this.animationArray = getOptimisedBubbleSortAnimations([...this.state.currArray]);
                break;
            case 'merge':
                this.animationArray = getIterativeMergeSortAnimations([...this.state.currArray]);
                break;
            case 'quick':
                this.animationArray = getQuickSortAnimations([...this.state.currArray]);
                break;
            case 'heap':
                this.animationArray = getHeapSortAnimations([...this.state.currArray]);
                break;
        }

        this.processAnimations();
    }

    // Renders the component to be viewed
    render(): React.ReactNode {
        // Calculates margins and bar width
        const { currArray, barColours, size, isSorting, sortType } = this.state;
        const width = window.innerWidth;
        const barWidth = (width * 0.8) / size - 1;

        // Renders the array bars and sets their relevant style attributes
        return (
            <div className="content">
                <div
                    className="control-bar"
                    style={{
                        backgroundColor: background
                    }}>
                    <div className="array-controls">
                        <div className="size-slider">
                            <p id="sizeValue">Array size: {size}</p>
                            <input
                                type="range"
                                min={`${this.props.minSize}`}
                                max={`${this.props.maxSize}`}
                                defaultValue={`${this.state.size}`}
                                id="sizeSlider"
                                disabled={isSorting}
                                onChange={(event) => {
                                    this.sizeSliderChangeHandler(event);
                                }}></input>
                        </div>
                        <div className="arr-buttons">
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
                                className="array-button"
                                disabled={!isSorting}
                                onClick={() => {
                                    this.stopAnimations();
                                }}
                                id="stopButton">
                                <span className="material-symbols-rounded">Stop</span>
                                <span>Stop</span>
                            </button>
                        </div>
                    </div>
                    <div className="sort-buttons">
                        <div>
                            <button
                                className={this.getSortButtonClassName('select')}
                                disabled={isSorting}
                                onClick={() => {
                                    this.visualiseSort('select');
                                }}>
                                Selection Sort
                            </button>
                            <button
                                className={this.getSortButtonClassName('insert')}
                                disabled={isSorting}
                                onClick={() => {
                                    this.visualiseSort('insert');
                                }}>
                                Insertion Sort
                            </button>
                        </div>
                        <div>
                            <button
                                className={this.getSortButtonClassName('bubble')}
                                disabled={isSorting}
                                onClick={() => {
                                    this.visualiseSort('bubble');
                                }}>
                                Bubble Sort
                            </button>
                        </div>
                        <div>
                            <button
                                className={this.getSortButtonClassName('opt_bubble')}
                                disabled={isSorting}
                                onClick={() => {
                                    this.visualiseSort('opt_bubble');
                                }}>
                                Optimised Bubble Sort
                            </button>
                        </div>
                        <div>
                            <button
                                className={this.getSortButtonClassName('merge')}
                                disabled={isSorting}
                                onClick={() => {
                                    this.visualiseSort('merge');
                                }}>
                                Merge Sort
                            </button>
                        </div>
                        <div>
                            <button
                                className={this.getSortButtonClassName('quick')}
                                disabled={isSorting}
                                onClick={() => {
                                    this.visualiseSort('quick');
                                }}>
                                Quick Sort
                            </button>
                        </div>
                        <div>
                            <button
                                className={this.getSortButtonClassName('heap')}
                                disabled={isSorting}
                                onClick={() => {
                                    this.visualiseSort('heap');
                                }}>
                                Heap Sort
                            </button>
                        </div>
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
                            height: `${this.props.maxVal * 0.8}px`,
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
                                    height: `${value * 0.8}px`,
                                    backgroundColor: barColours[idx] === 1 ? secondary : primary
                                }}></span>
                        );
                    })}
                </div>
            </div>
        );
    }
}
