export type SortVizProps = {
    minVal: number;
    maxVal: number;
    minSize: number;
    maxSize: number;
};

export type SortVizState = {
    currArray: number[];
    barColours: number[];
    size: number;
    isSorting: boolean;
    sortType: string;
};
