import { useLocalContext } from '@graasp/apps-query-client';
import { Context } from '@graasp/sdk';

import katex from 'katex';
import 'katex/dist/katex.min.css';

import AnalyticsView from './views/AnalyticsView';
import PlayerView from './views/PlayerView';

// bind katex to the window object
window.katex = katex;

const App = (): JSX.Element => {
  const { context } = useLocalContext();

  switch (context) {
    case Context.Analytics:
      return <AnalyticsView />;
    case Context.Player:
    case Context.Builder:
    default:
      return <PlayerView />;
  }
};

export default App;
