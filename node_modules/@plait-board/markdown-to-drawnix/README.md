# markdown-to-drawnix

Convert markdown to drawnix mind map.

## Set up

Install packages:

```
yarn
```

Start development playground:

```
yarn start
```

Build command:

```
yarn build
```

## Get started

```ts
parseMarkdownToDrawnix(markdownDefinition: string)
```

The `markdownDefinition` is the markdown text definition.

Example code:

```ts
import { parseMarkdownToDrawnix } from "@drawnix/markdown-to-drawnix";

try {
  const mind = await parseMarkdownToDrawnix(
    markdownDefinition
  );
  // Render mind on Drawnix
} catch (e) {
  // Parse error, displaying error message to users
}
```

## Playground

Try out [here](https://markdown-to-drawnix.pages.dev).

## Thanks 

Inspired by [remark-parse](https://github.com/remarkjs/remark)

