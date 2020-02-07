export function getColor() {
    const palette = [
        '#21B6A8',
        '#177F75',
        '#B6212D',
        '#7F171F',
        '#B67721',
        '#C05780',
        '#0065A2',
        '#74737A',
        '#FFA23A'
    ];
    const max = palette.length - 1;
    const i = Math.floor(Math.random() * (max + 1));
    return palette[i];
}