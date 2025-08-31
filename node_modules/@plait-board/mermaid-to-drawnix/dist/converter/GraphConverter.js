import { DEFAULT_FONT_SIZE } from "../constants.js";
export class GraphConverter {
    constructor({ converter, }) {
        this.convert = (graph, config) => {
            return this.converter(graph, {
                ...config,
                fontSize: config.fontSize || DEFAULT_FONT_SIZE,
            });
        };
        this.converter = converter;
    }
}
