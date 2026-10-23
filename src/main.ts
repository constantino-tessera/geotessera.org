import App from './App.svelte';
import './styles/global.css';
import { mount } from 'svelte';

const target = document.getElementById('app')!;
// Build-time discovery content is for non-JavaScript clients, not hydration.
target.replaceChildren();
const app = mount(App, { target });

export default app;
