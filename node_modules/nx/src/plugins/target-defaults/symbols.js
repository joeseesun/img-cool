"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OVERRIDE_SOURCE_FILE = exports.ONLY_MODIFIES_EXISTING_TARGET = void 0;
/**
 * This marks that a target provides information which should modify a target already registered
 * on the project via other plugins. If the target has not already been registered, and this symbol is true,
 * the information provided by it will be discarded.
 *
 * NOTE: This cannot be a symbol, as they are not serialized in JSON the communication
 * between the plugin-worker and the main process.
 */
exports.ONLY_MODIFIES_EXISTING_TARGET = 'NX_ONLY_MODIFIES_EXISTING_TARGET';
/**
 * This is used to override the source file for the target defaults plugin.
 * This allows the plugin to use the project files as the context, but point to nx.json as the source file.
 *
 * NOTE: This cannot be a symbol, as they are not serialized in JSON the communication
 * between the plugin-worker and the main process.
 */
exports.OVERRIDE_SOURCE_FILE = 'NX_OVERRIDE_SOURCE_FILE';
