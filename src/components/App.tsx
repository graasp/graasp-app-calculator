import katex from 'katex';
import 'katex/dist/katex.min.css';
import StudentView from './modes/student/StudentView';

// bind katex to the window object
window.katex = katex;

const App = (): JSX.Element => <StudentView />;

export default App;
