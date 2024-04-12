import ReactDOM from 'react-dom/client';
import App from './App';
import './theme.scss';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./sw.js')
      .then((reg) => console.log('Success: ', reg.scope))
      .catch((err) => console.log('Failure: ', err));
  });
}
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);
