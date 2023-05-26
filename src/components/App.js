import { Component } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import StudentMode from './modes/student/StudentMode';

// bind katex to the window object
window.katex = katex;

export class App extends Component {
  render() {
    return <StudentMode />;
  }
}

export default App;
