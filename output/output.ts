import { StateGraph, END } from "@langchain/langgraph";
import { GraphState } from "./types";

// Create the workflow
const workflow = new StateGraph<GraphState>(GraphState);

// Define the nodes
workflow.addNode("web_search", web_search); // web_search
workflow.addNode("query", query); // query

// Build graph
workflow.addConditionalEdges(
    "query",
    decide,
    {
        "end": END,
        "web_search": "web_search",
    }
);
workflow.addEdge("web_search", END);
workflow.setEntryPoint("query");

// Compile the workflow
const app = workflow.compile();

export { app };