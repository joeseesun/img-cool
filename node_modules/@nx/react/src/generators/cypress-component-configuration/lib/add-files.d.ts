import { ProjectConfiguration, Tree } from '@nx/devkit';
import type { CypressComponentConfigurationSchema } from '../schema';
import { FoundTarget } from '@nx/cypress/src/utils/find-target-options';
export declare function addFiles(tree: Tree, projectConfig: ProjectConfiguration, options: CypressComponentConfigurationSchema, found: FoundTarget): Promise<void>;
