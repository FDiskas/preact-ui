import { h, render } from 'preact';
import 'tailwindcss/tailwind.css';
import './style/index.scss';
import App from './components/app';

const root = document.getElementById('root');

render(<App />, root!);
