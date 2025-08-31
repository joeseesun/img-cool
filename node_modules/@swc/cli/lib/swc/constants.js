"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CompileStatus", {
    enumerable: true,
    get: function() {
        return CompileStatus;
    }
});
var CompileStatus;
(function(CompileStatus) {
    CompileStatus[CompileStatus["Copied"] = 0] = "Copied";
    CompileStatus[CompileStatus["Compiled"] = 1] = "Compiled";
    CompileStatus[CompileStatus["Omitted"] = 2] = "Omitted";
    CompileStatus[CompileStatus["Failed"] = 3] = "Failed";
})(CompileStatus || (CompileStatus = {}));

//# sourceMappingURL=constants.js.map