import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
document.documentElement.classList.add('font-sans');
import { ThemeProvider } from './Components/ui/theme-provider.tsx'
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store/index.ts';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
          <GoogleOAuthProvider clientId="859424619330-fd4tm6rtd4rv4df6rijfqp4it5ham81a.apps.googleusercontent.com">
              <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme" >
                  <Provider store ={store}>
                      <App />
                  </Provider>
              </ThemeProvider>
        </GoogleOAuthProvider>
    </Router>
  </React.StrictMode>,
)
