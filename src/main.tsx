import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import outputs from "../amplify_outputs.json"
import { Amplify } from 'aws-amplify'

Amplify.configure({
  ...outputs, 
  Analytics: {
    Pinpoint: {
      appId: outputs.analytics.amazon_pinpoint.app_id,
      region: outputs.analytics.amazon_pinpoint.aws_region,
    },
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
