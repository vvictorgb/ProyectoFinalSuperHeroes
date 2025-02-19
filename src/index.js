import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { Auth0Provider } from '@auth0/auth0-react';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider 
       domain="dev-wgkohpoofrbigcxw.us.auth0.com"
       clientId="p5xN0xhMSsJLUp0KrN0HaWmgTfymVgYG" 
      authorizationParams={{
        redirect_uri: window.location.origin
      }} >    
      <App />
    </Auth0Provider>
  </React.StrictMode>
);


