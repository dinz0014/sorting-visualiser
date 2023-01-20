import React from 'react';
import { arrayBuffer } from 'stream/consumers';
import { getTextOfJSDocComment, isThisTypeNode } from 'typescript';
import { sortVizProps, sortVizState } from '../types/sortVisualiserTypes';
import './SortingVisualiser.css';

export default class SortingVisualiser extends React.Component<
    sortVizProps,
    sortVizState
> {
    static defaultProps = {
        size: 300,
        min: 10,
        max: 700
    };

    constructor(props: sortVizProps) {
        super(props);

        this.state = {
            array: [],
            width: window.innerWidth
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

        const width = window.innerWidth;
        this.setState({ array, width });
    }

    render(): React.ReactNode {
        const { array, width } = this.state;
        const barWidth = 0.7 * ((width * 0.7) / this.props.size - 1);
        const marg = width * 0.15;
        const containerWidth = (barWidth + 1) * this.props.size;
        console.log(this.props.size);

        return (
            <>
                <div>
                    <button onClick={() => this.generateArray()}>
                        Generate New Array
                    </button>
                    <button>Selection Sort</button>
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
