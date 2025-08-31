import { Configuration } from 'webpack';
export declare function buildBaseWebpackConfig({ tsConfigPath, compiler, }: {
    tsConfigPath: string;
    compiler: 'swc' | 'babel';
}): Configuration;
