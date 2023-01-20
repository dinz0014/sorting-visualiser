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
