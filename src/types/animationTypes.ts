export enum AnimationType {
    ComparisonOn = 1,
    ComparisonOff = 2,
    Swap = 3,
    Replace = 4
}

export type ComparisonAnimation = {
    type: AnimationType.ComparisonOn | AnimationType.ComparisonOff;
    firstIdx: number;
    secondIdx: number;
};

export type SwapAnimation = {
    type: AnimationType.Swap;
    firstIdx: number;
    firstValue: number;
    secondIdx: number;
    secondValue: number;
};

export type ReplaceAnimation = {
    type: AnimationType.Replace;
    idx: number;
    value: number;
};

export type Animation = ComparisonAnimation | SwapAnimation | ReplaceAnimation;
