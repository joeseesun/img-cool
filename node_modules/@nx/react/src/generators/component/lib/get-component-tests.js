"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComponentTests = void 0;
function getComponentTests(schema) {
    return `
  it('should render successfully', () => {
    const { baseElement } = render(<${schema.className} />);
    expect(baseElement).toBeTruthy();
  });
  `;
}
exports.getComponentTests = getComponentTests;
