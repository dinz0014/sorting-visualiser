import React from 'react';
import getSelectionSortAnimations from '../sortingAlgorithms/selectionSort';
import {
    animationType,
    sortVizProps,
    sortVizState
} from '../types/sortVisualiserTypes';
import './SortingVisualiser.css';

export default class SortingVisualiser extends React.Component<
    sortVizProps,
    sortVizState
> {
    static defaultProps = {
        size: 200,
        min: 10,
        max: 700,
        width: window.innerWidth
    };

    static ANIMATION_TIME = 1;
    constructor(props: sortVizProps) {
        super(props);

        this.state = {
            array: []
        };
    }

    componentDidMount(): void {
        this.generateArray();
    }

    randomNumBetween(start: number, end: number): number {
        return Math.floor(Math.random() * (end - start + 1) + start);
    }

    generateArray(): void {
        const array: number[] = [];

        for (let i = 0; i < this.props.size; i++) {
            array.push(this.randomNumBetween(this.props.min, this.props.max));
        }

        this.setState({ array });
    }

    visualiseSelectionSort(): void {
        const animations = getSelectionSortAnimations(this.state.array);

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
                    firstStyle.backgroundColor = 'red';
                    secondStyle.backgroundColor = 'red';
                }, i * SortingVisualiser.ANIMATION_TIME);
            } else if (type === animationType.ComparisonOff) {
                setTimeout(() => {
                    firstStyle.backgroundColor = '#0394fc';
                    secondStyle.backgroundColor = '#0394fc';
                }, i * SortingVisualiser.ANIMATION_TIME);
            } else {
                setTimeout(() => {
                    firstStyle.height = `${firstValue}px`;
                    secondStyle.height = `${secondValue}px`;
                }, i * SortingVisualiser.ANIMATION_TIME);
            }
        }
    }

    render(): React.ReactNode {
        const { array } = this.state;
        const width = this.props.width;
        const barWidth = 0.7 * ((width * 0.7) / this.props.size - 1);
        const marg = width * 0.15;
        const containerWidth = (barWidth + 1) * this.props.size;

        return (
            <>
                <div>
                    <button onClick={() => this.generateArray()}>
                        Generate New Array
                    </button>
                    <button onClick={() => this.visualiseSelectionSort()}>
                        Selection Sort
                    </button>
                </div>
                <div
                    className="array-container"
                    style={{
                        left: `${marg}px`,
                        right: `${marg}px`,
                        height: `${this.props.max}px`
                    }}>
                    {array.map((value, idx) => {
                        return (
                            <div
                                className="array-bar"
                                id={`${idx}`}
                                key={idx}
                                style={{
                                    width: `${barWidth}px`,
                                    height: `${value}px`
                                }}></div>
                        );
                    })}
                </div>
            </>
        );
    }
}
