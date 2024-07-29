import React from 'react';

import { Interweave } from 'interweave';

const HtmlParser = ({ content }: { content: string }): JSX.Element => (
  <Interweave content={content} />
);

export default HtmlParser;
