import { CommandModule } from 'yargs';
export type ResetCommandOptions = {
    onlyCache?: boolean;
    onlyDaemon?: boolean;
    onlyWorkspaceData?: boolean;
};
export declare const yargsResetCommand: CommandModule<Record<string, unknown>, ResetCommandOptions>;
