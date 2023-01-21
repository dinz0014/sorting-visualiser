export type sortVizProps = {
    size: number;
    min: number;
    max: number;
    width: number;
    height: number;
};

export type sortVizState = {
    array: number[];
};

export enum animationType {
    ComparisonOn,
    ComparisonOff,
    Swap
}

export type animation = {
    type: animationType;
    firstIdx: number;
    firstValue?: number;
    secondIdx: number;
    secondValue?: number;
};
