import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 8082;

app.use(
  cors({
    origin: '*',
    methods: ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS'],
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/static', express.static(path.join(__dirname, '..', 'static')));
app.use(express.static(path.join(__dirname, '..', 'static')));

const outputDir = path.join(process.cwd(), 'output');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

app.post('/api/saveCode', (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res
        .status(400)
        .json({ error: 'Missing data. Required JSON fields: code' });
    }

    console.log('Generated TypeScript code:', code);

    const outputPath = path.join(outputDir, 'output.ts');
    fs.writeFileSync(outputPath, code, 'utf8');

    res.json({ message: 'ok' });
  } catch (error) {
    console.error('Error saving code:', error);
    res.status(500).json({ error: 'Failed to save code' });
  }
});

app.post('/api/saveWorkflow', (req, res) => {
  try {
    const data = JSON.parse(req.body.json);
    const { workflowName, workflow } = data;

    if (!workflowName || !workflow) {
      return res.status(400).json({
        error: 'Missing data. Required JSON fields: workflowName, workflow',
      });
    }

    const workflowPath = path.join(outputDir, `${workflowName}.json`);
    fs.writeFileSync(workflowPath, JSON.stringify(workflow, null, 2), 'utf8');

    console.log(`Saved workflow to: ${workflowPath}`);
    res.json({ message: 'ok' });
  } catch (error) {
    console.error('Error saving workflow:', error);
    res.status(500).json({ error: 'Failed to save workflow' });
  }
});

app.post('/api/loadWorkflow', (req, res) => {
  try {
    const data = JSON.parse(req.body.json);
    const { workflowName } = data;

    if (!workflowName) {
      return res
        .status(400)
        .json({ error: 'Missing data. Required JSON fields: workflowName' });
    }

    const workflowPath = path.join(outputDir, `${workflowName}.json`);

    if (!fs.existsSync(workflowPath)) {
      return res
        .status(404)
        .json({ error: `Workflow ${workflowName} not found` });
    }

    const workflowData = fs.readFileSync(workflowPath, 'utf8');
    const workflow = JSON.parse(workflowData);

    res.json({ message: 'ok', workflow });
  } catch (error) {
    console.error('Error loading workflow:', error);
    res.status(500).json({ error: 'Failed to load workflow' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({
    message: 'ok',
    service: 'langgraph-editor-ts',
    version: '1.0.0',
    outputDir,
  });
});

app.get('/', (req, res) => {
  res.redirect('/static/index.html');
});

app.listen(PORT, () => {
  console.log(`🚀 LangGraph Editor TypeScript server running on port ${PORT}`);
  console.log(`📁 Output directory: ${outputDir}`);
  console.log(`🌐 Open: http://localhost:${PORT}/static/index.html`);
});

export default app;
