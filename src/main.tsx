import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import outputs from "../amplify_outputs.json"
import { Amplify } from 'aws-amplify'
import { configureAutoTrack } from 'aws-amplify/analytics'

Amplify.configure(outputs)


configureAutoTrack({
  enable: true,
  type: 'session',
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
