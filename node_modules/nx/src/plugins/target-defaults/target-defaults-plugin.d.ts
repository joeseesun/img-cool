import { TargetConfiguration } from '../../config/workspace-json-project-json';
import { NxPluginV2 } from '../../project-graph/plugins';
export declare const TargetDefaultsPlugin: NxPluginV2;
export default TargetDefaultsPlugin;
/**
 * This fn gets target info that would make a target uniquely compatible
 * with what is described by project.json or package.json. As the merge process
 * for config happens, without this, the target defaults may be compatible
 * with a config from a plugin and then that combined target be incompatible
 * with the project json configuration resulting in the target default values
 * being scrapped. By adding enough information from the project.json / package.json,
 * we can make sure that the target after merging is compatible with the defined target.
 */
export declare function getTargetInfo(target: string, projectJsonTargets: Record<string, TargetConfiguration>, packageJsonTargets: Record<string, TargetConfiguration>): {
    command: string;
    metadata: {
        [x: string]: any;
        description?: string;
        technologies?: string[];
    };
    executor?: undefined;
    options?: undefined;
} | {
    executor: string;
    options: {
        command: any;
        commands?: undefined;
        script?: undefined;
    };
    metadata: {
        [x: string]: any;
        description?: string;
        technologies?: string[];
    };
    command?: undefined;
} | {
    executor: string;
    options: {
        commands: any;
        command?: undefined;
        script?: undefined;
    };
    metadata: {
        [x: string]: any;
        description?: string;
        technologies?: string[];
    };
    command?: undefined;
} | {
    executor: string;
    metadata: {
        [x: string]: any;
        description?: string;
        technologies?: string[];
    };
    command?: undefined;
    options?: undefined;
} | {
    executor: string;
    options: {
        script: any;
        command?: undefined;
        commands?: undefined;
    };
    metadata: {
        [x: string]: any;
        description?: string;
        technologies?: string[];
    };
    command?: undefined;
} | {
    executor: string;
    command?: undefined;
    metadata?: undefined;
    options?: undefined;
} | {
    command?: undefined;
    metadata?: undefined;
    executor?: undefined;
    options?: undefined;
};
