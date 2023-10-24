import { Interweave, Node } from 'interweave';
import { UrlMatcher } from 'interweave-autolink';

import { ICParseHTML } from './types';

export const CParseHTML: React.FC<ICParseHTML> = ({ content }) => {
  const transform = (node: HTMLElement, children: Node[]): React.ReactNode => {
    if (node.tagName.toLowerCase() === 'oembed') {
      const url = node.getAttribute('url');

      if (url) {
        const youtubeVideoID = url.split('?v=')[1];

        return (
          <div
            style={{
              position: 'relative',
              aspectRatio: '16/9',
              height: 'auto',
              width: '100%',
            }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${youtubeVideoID}`}
              title="YouTube video player"
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
              }}
            ></iframe>
          </div>
        );
      }
    }
  };

  return (
    <Interweave
      className="html-parse-content"
      content={content}
      transform={transform}
      matchers={[new UrlMatcher('url')]}
      newWindow={true}
    />
  );
};
