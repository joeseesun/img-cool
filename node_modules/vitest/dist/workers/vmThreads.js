import { a as createThreadsRpcOptions } from '../chunks/utils.Cn0zI1t3.js';
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

class ThreadsVmWorker {
  getRpcOptions(ctx) {
    return createThreadsRpcOptions(ctx);
  }
  runTests(state) {
    return runVmTests("run", state);
  }
  collectTests(state) {
    return runVmTests("collect", state);
  }
}
const worker = new ThreadsVmWorker();

export { worker as default };
