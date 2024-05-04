import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import * as serviceWorker from 'utils/serviceWorker';


createRoot(document.getElementById('root')).render(<App />);

serviceWorker.unregister();
