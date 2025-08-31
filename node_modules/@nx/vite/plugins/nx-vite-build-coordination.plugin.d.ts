import { type Plugin } from 'vite';
export interface NxViteBuildCoordinationPluginOptions {
    buildCommand: string;
}
export declare function nxViteBuildCoordinationPlugin(options: NxViteBuildCoordinationPluginOptions): Plugin;
