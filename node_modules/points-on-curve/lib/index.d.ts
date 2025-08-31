export type Point = readonly [number, number];
export declare function simplify(points: readonly Point[], distance: number): Point[];
export declare function simplifyPoints(points: readonly Point[], start: number, end: number, epsilon: number, newPoints?: Point[]): Point[];
export declare function pointsOnBezierCurves(points: readonly Point[], tolerance?: number, distance?: number): Point[];
