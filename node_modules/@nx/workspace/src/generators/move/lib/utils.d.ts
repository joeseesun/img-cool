import { ProjectConfiguration, Tree } from '@nx/devkit';
import { Schema } from '../schema';
/**
 * This helper function ensures that we don't move libs or apps
 * outside of the folders they should be in.
 *
 * This will break if someone isn't using the default libs/apps
 * folders. In that case, they're on their own :/
 */
export declare function getDestination(host: Tree, schema: Schema, project: ProjectConfiguration): string;
/**
 * Joins path segments replacing slashes with dashes
 *
 * @param path
 */
export declare function getNewProjectName(path: string): string;
/**
 * Normalizes slashes (removes duplicates)
 *
 * @param input
 */
export declare function normalizePathSlashes(input: string): string;
