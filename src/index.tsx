import { h, render } from 'preact';
import './style/index.css';
import App from './components/app';

const root = document.getElementById('root');

render(<App />, root!);
