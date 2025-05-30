import { defineRocketConfig } from 'config-rocket'

export default defineRocketConfig({
  parameters: [
    {
      id: '$confirm-USE_BUNX',
      resolver: {
        operation: 'prompt',
        label: 'Use `bunx`?, options: `true` = `bunx`, `false` = `npx`',
        type: 'confirm',
      },
    },
    {
      id: '$input-AI_PROVIDER',
      resolver: {
        operation: 'prompt',
        label: 'Set the AI_PROVIDER, options: `vertex`, `gemini`',
        type: 'text',
        initial: 'vertex',
      },
    },
    {
      id: '$input-AI_PROVIDER_KEY',
      resolver: {
        operation: 'prompt',
        label: 'GCP Project ID (vertex) or API Key (gemini)',
        type: 'text',
      },
    },
    {
      id: '$input-MODEL_ID',
      resolver: {
        operation: 'prompt',
        label: 'AI Model ID',
        type: 'text',
        initial: 'gemini-2.5-pro-exp-03-25',
      },
    },
    {
      id: '$input-GOOGLE_CLOUD_LOCATION',
      resolver: {
        operation: 'prompt',
        label: 'Google Cloud Location',
        type: 'text',
        initial: 'us-central1',
      },
    },
    {
      id: '$input-AI_TEMPERATURE',
      resolver: {
        operation: 'prompt',
        label: 'AI Temperature',
        type: 'text',
        initial: '0.0',
      },
    },
    {
      id: '$confirm-AI_USE_STREAMING',
      resolver: {
        operation: 'prompt',
        label: 'AI Use Streaming',
        type: 'confirm',
      },
    },
    {
      id: '$input-AI_MAX_OUTPUT_TOKENS',
      resolver: {
        operation: 'prompt',
        label: 'AI Max Output Tokens',
        type: 'text',
        initial: '65536',
      },
    },

  ],
  variablesResolver: {
    '{{ENTRY_COMMAND}}': { // Resolves to `bunx` or `npx`
      type: '$or',
      a: {
        type: 'match',
        a: '$confirm-USE_BUNX',
        b: true,
        result: 'bunx',
      },
      b: 'npx',
    },

    '{{AI_PROVIDER}}': '$input-AI_PROVIDER',
    '{{AI_PROVIDER_KEY_NAME}}': {
      type: '$or',
      a: {
        type: 'match',
        a: '$input-AI_PROVIDER',
        b: 'vertex',
        result: 'GOOGLE_CLOUD_PROJECT',
      },
      b: 'GEMINI_API_KEY',
    },
    '{{AI_PROVIDER_KEY_VALUE}}': '$input-AI_PROVIDER_KEY',

    '{{MODEL_ID_NAME}}': {
      type: '$or',
      a: {
        type: 'match',
        a: '$input-AI_PROVIDER',
        b: 'vertex',
        result: 'VERTEX_MODEL_ID',
      },
      b: 'GEMINI_MODEL_ID',
    },
    '{{MODEL_ID_VALUE}}': '$input-MODEL_ID',

    '{{GOOGLE_CLOUD_LOCATION}}': '$input-GOOGLE_CLOUD_LOCATION',
    '{{AI_TEMPERATURE}}': '$input-AI_TEMPERATURE',
    '{{AI_USE_STREAMING}}': '$confirm-AI_USE_STREAMING',
    '{{AI_MAX_OUTPUT_TOKENS}}': '$input-AI_MAX_OUTPUT_TOKENS',
  },

  filesBuildResolver: {
    'shariqriazz-vertex-mcp': {
      filePath: '.roo/mcp.json',
      content: 'fuel:shariqriazz-vertex-mcp/mcp.json',
    },
  },
})
