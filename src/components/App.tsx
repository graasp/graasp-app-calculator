import katex from 'katex';
import 'katex/dist/katex.min.css';
import { useLocalContext } from '@graasp/apps-query-client';
import { Context } from '@graasp/sdk';
import BuilderView from './views/BuilderView';
import AnalyticView from './views/AnalyticView';

// bind katex to the window object
window.katex = katex;

const App = (): JSX.Element => {
  const { context } = useLocalContext();

  switch (context) {
    case Context.Analytics:
      return <AnalyticView />;
    case Context.Builder:
    case Context.Player:
    default:
      return <BuilderView />;
  }
};

export default App;
