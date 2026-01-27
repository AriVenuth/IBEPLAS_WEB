
export function getAspectRatio(width: number, height: number): string {
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const commonDivisor = gcd(width, height);
    return `${width / commonDivisor}:${height / commonDivisor}`;
}