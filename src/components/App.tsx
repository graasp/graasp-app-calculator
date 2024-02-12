import katex from 'katex';
import 'katex/dist/katex.min.css';
import StudentMode from './modes/student/StudentMode';

// bind katex to the window object
window.katex = katex;

const App = (): JSX.Element => <StudentMode />;

export default App;
