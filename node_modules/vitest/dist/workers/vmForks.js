import v8 from 'node:v8';
import { c as createForksRpcOptions, u as unwrapSerializableConfig } from '../chunks/utils.Cn0zI1t3.js';
import { r as runVmTests } from '../chunks/vm.jEFQDlX_.js';
import '@vitest/utils';
import 'node:url';
import 'node:vm';
import 'pathe';
import '../path.js';
import 'node:path';
import '../chunks/console.CN7AiMGV.js';
import 'node:console';
import 'node:stream';
import 'tinyrainbow';
import '../chunks/date.W2xKR2qe.js';
import '../chunks/utils.C8RiOc4B.js';
import '../chunks/execute.eDH0aFFd.js';
import 'node:fs';
import '@vitest/utils/error';
import 'vite-node/client';
import 'vite-node/utils';
import '@vitest/mocker';
import 'node:module';
import 'vite-node/constants';

class ForksVmWorker {
  getRpcOptions() {
    return createForksRpcOptions(v8);
  }
  async executeTests(method, state) {
    const exit = process.exit;
    state.ctx.config = unwrapSerializableConfig(state.ctx.config);
    try {
      await runVmTests(method, state);
    } finally {
      process.exit = exit;
    }
  }
  runTests(state) {
    return this.executeTests("run", state);
  }
  collectTests(state) {
    return this.executeTests("collect", state);
  }
}
const worker = new ForksVmWorker();

export { worker as default };
