import { Point } from '@plait/core';
interface StrokePoint {
    point: Point;
    pressure?: number;
    timestamp: number;
    tiltX?: number;
    tiltY?: number;
}
export interface SmootherOptions {
    smoothing?: number;
    velocityWeight?: number;
    curvatureWeight?: number;
    minDistance?: number;
    maxPoints?: number;
    pressureSensitivity?: number;
    tiltSensitivity?: number;
    velocityThreshold?: number;
    samplingRate?: number;
}
export declare class FreehandSmoother {
    private readonly defaultOptions;
    private options;
    private points;
    private lastProcessedTime;
    private movingAverageVelocity;
    private readonly velocityWindowSize;
    constructor(options?: SmootherOptions);
    process(point: Point, data?: Partial<Omit<StrokePoint, 'point'>>): Point | null;
    reset(): void;
    private updatePoints;
    private checkDistance;
    private calculateDynamicParameters;
    private smooth;
    private calculateWeights;
    private getDistance;
    private calculateVelocity;
    private updateMovingAverage;
    private getAverageVelocity;
    private getPointVelocity;
    private getPointCurvature;
}
export {};
