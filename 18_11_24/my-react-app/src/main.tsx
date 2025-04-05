import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from "react-dom/client";
import './index.sass'
import App from './App.tsx'
import { BrowserRouter } from "react-router-dom";
import React from 'react';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </QueryClientProvider>
    </React.StrictMode>,
);

