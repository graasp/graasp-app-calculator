import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from './components/Root';
import './index.css';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(<Root />);
