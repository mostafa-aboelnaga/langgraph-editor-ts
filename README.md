# LangGraph Editor - TypeScript

A visual workflow editor for LangGraph that generates **TypeScript code**. This is a TypeScript port of the original [langgraph-editor](https://github.com/Erickrus/langgraph-editor) by Erickrus.
**This editor generates TypeScript code for LangGraph workflows.**

![LangGraph Editor Interface](https://github.com/user-attachments/assets/2cff15b5-f294-4730-bb47-f84c2633c5ed)

## Features

- **Visual Workflow Editor**: Drag-and-drop interface using LiteGraph.js
- **TypeScript Code Generation**: Automatically generates TypeScript code for your LangGraph workflows
- **Three Node Types**:
  - `LangGraphNode`: Standard workflow nodes
  - `LangGraphConditionalNode`: Conditional routing nodes
  - `LangGraphEndNode`: Workflow termination nodes
- **Save/Load Workflows**: Persist your workflows as JSON files
- **Real-time Compilation**: Generate TypeScript code instantly

## Installation

```bash
# Clone the repository
git clone https://github.com/mostafa-aboelnaga/langgraph-editor-ts.git
cd langgraph-editor-ts

# Install dependencies
npm install

# Run in development mode
npm run dev
```

## Usage

1. **Start the server**:

   ```bash
   npm run dev
   ```

2. **Open the editor**:
   Navigate to `http://localhost:8082/static/index.html`

3. **Create your workflow**:

   - Right-click on the canvas to add nodes
   - Connect nodes by dragging from outputs to inputs
   - Set node names using the text widgets

4. **Generate TypeScript code**:

   - Right-click and select "Compile"
   - The generated TypeScript code will be saved to `output/output.ts`

5. **Save/Load workflows**:
   - Right-click and select "Save" to save your workflow
   - Right-click and select "Load" to load a saved workflow

## Generated Code Example

The editor generates TypeScript code like this:

```typescript
import { StateGraph, END } from '@langchain/langgraph';
import { GraphState } from './types';

// Create the workflow
const workflow = new StateGraph<GraphState>(GraphState);

// Define the nodes
workflow.addNode('query', query);
workflow.addNode('webSearch', webSearch);

// Build graph connections
workflow.setEntryPoint('query');
workflow.addConditionalEdges('query', decide, {
  condition_1: END,
  condition_2: 'webSearch',
});
workflow.addEdge('webSearch', END);

// Compile the workflow
const app = workflow.compile();

export { app };
```

## Project Structure

```
langgraph-editor-ts/
├── src/
│   └── server.ts          # Express server
├── static/
│   └── index.html         # Main editor interface
├── output/                # Generated code output
│   └── output.ts         # Generated TypeScript code
├── workflow.json          # Sample workflow
├── package.json
├── tsconfig.json
└── README.md
```

## API Endpoints

- `POST /api/saveCode` - Save generated TypeScript code
- `POST /api/saveWorkflow` - Save workflow as JSON
- `POST /api/loadWorkflow` - Load workflow from JSON
- `GET /api/health` - Health check

## Node Types

### LangGraphNode

Standard workflow node that represents a function in your workflow.

### LangGraphConditionalNode

Conditional routing node that allows branching logic based on conditions.

### LangGraphEndNode

Represents the END state of the workflow.

## Development

```bash
# Install dependencies
npm install

# Run in development mode (auto-reload)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Differences from Original

This TypeScript version differs from the original Python version in several key ways:

1. **Language**: Generates TypeScript code
2. **Backend**: Uses Node.js/Express
3. **Output**: Creates `.ts` files
4. **Imports**: Uses `@langchain/langgraph` TypeScript imports

## Credits

Based on the original [langgraph-editor](https://github.com/Erickrus/langgraph-editor) by Hu, Ying-Hao (hyinghao@hotmail.com).

This TypeScript port maintains the same visual interface and workflow concepts while generating TypeScript code for the LangGraph ecosystem.
