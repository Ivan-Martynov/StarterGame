export const isPortrait = (width: number, height: number): boolean => {
    return width * 3 < height * 4;
};

export const getScale = (
    width: number,
    height: number,
    fixedWidth: number,
    fixedHeight: number
): number => {
    return Math.min(width / fixedWidth, height / fixedHeight);
};
