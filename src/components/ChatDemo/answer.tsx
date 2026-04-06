import { FC } from 'react';
import React, { useState, useEffect } from 'react';
import Markdown from 'react-markdown';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ChatDemo/popover';
import { Skeleton } from '@/components/ChatDemo/skeleton';
import { SearchResults } from '@/components/SearchResults';
import { Logo } from '@/components/shared/Logo';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Message } from '@/types';
import { VectorSearchResult, KGSearchResult } from '@/types';

function formatMarkdownNewLines(markdown: string) {
  return markdown
    .replace(/\[(\d+)]/g, '[$1]($1)')
    .split(`"queries":`)[0]
    .replace(/\\u[\dA-F]{4}/gi, (match: string) => {
      return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
    });
}

interface Source extends VectorSearchResult {
  id: string;
  score: number;
  metadata: {
    title?: string;
    text?: string;
    documentid?: string;
    snippet?: string;
  };
}

const parseVectorSearchSources = (sources: string | object): Source[] => {
  if (typeof sources === 'string') {
    try {
      const parsedData = JSON.parse(sources);
      // Handle the new SSE format where results are in data.chunk_search_results
      if (parsedData.data && parsedData.data.chunk_search_results) {
        return parsedData.data.chunk_search_results;
      }
      return parsedData;
    } catch (error) {
      console.error('Failed to parse vector sources:', error);
      return [];
    }
  }
  return sources as Source[];
};

const parseKGSearchResults = (sources: string | object): KGSearchResult[] => {
  if (typeof sources === 'string') {
    try {
      const parsedData = JSON.parse(sources);
      // Handle the new SSE format where results are in data.graph_search_results
      if (parsedData.data && parsedData.data.graph_search_results) {
        return parsedData.data.graph_search_results;
      }
      // If the data is directly an array
      if (Array.isArray(parsedData)) {
        return parsedData;
      }
      return [];
    } catch (error) {
      console.error('Failed to parse KG sources:', error);
      return [];
    }
  }
  return [];
};

const SourceInfo: React.FC<{
  isSearching: boolean;
  sourcesCount: number | null;
}> = ({ isSearching, sourcesCount }) => (
  <div className="flex items-center justify-between w-full">
    <Logo width={50} height={50} disableLink={true} />
    <span className="text-sm font-normal text-text-primary">
      {isSearching ? (
        <span className="searching-animation">Searching over sources...</span>
      ) : sourcesCount !== null && sourcesCount > 0 ? (
        `View ${sourcesCount} Sources`
      ) : null}
    </span>
  </div>
);

export const Answer: FC<{
  message: Message;
  isStreaming: boolean;
  isSearching: boolean;
}> = ({ message, isStreaming, isSearching }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [parsedVectorSources, setParsedVectorSources] = useState<Source[]>([]);
  const [parsedEntities, setParsedEntities] = useState<KGSearchResult[]>([]);
  const [parsedCommunities, setParsedCommunities] = useState<KGSearchResult[]>(
    []
  );
  const [sourcesCount, setSourcesCount] = useState<number | null>(null);

  useEffect(() => {
    if (message.sources) {
      let count = 0;

      if (message.sources.vector) {
        const parsed = parseVectorSearchSources(message.sources.vector);
        setParsedVectorSources(parsed);
        count += parsed.length;
      }

      if (message.sources.kg) {
        console.log('message.sources.kg', message.sources.kg);
        const kgResults = parseKGSearchResults(message.sources.kg);

        // Only attempt to filter if kgResults is an array
        if (Array.isArray(kgResults)) {
          const entitiesArray = kgResults.filter(
            (item: any) => item.result_type === 'entity'
          );
          const communitiesArray = kgResults.filter(
            (item: any) => item.result_type === 'community'
          );

          setParsedEntities(entitiesArray);
          setParsedCommunities(communitiesArray);
          count += entitiesArray.length + communitiesArray.length;
        } else {
          console.warn('KG search results is not an array:', kgResults);
          setParsedEntities([]);
          setParsedCommunities([]);
        }
      }

      setSourcesCount(count > 0 ? count : null);
    } else {
      setSourcesCount(null);
    }
  }, [message.sources]);

  const AnimatedEllipsis: FC = () => {
    const [dots, setDots] = useState('');

    useEffect(() => {
      const interval = setInterval(() => {
        setDots((prevDots) => (prevDots.length >= 3 ? '' : prevDots + '.'));
      }, 200);

      return () => clearInterval(interval);
    }, []);

    return (
      <span
        style={{
          color: '#1A1A1A',
          display: 'inline-block',
          width: '1em',
          height: '1em',
          textAlign: 'left',
        }}
      >
        {dots}
      </span>
    );
  };

  const renderContent = () => {
    const paragraphs = message.content.split('\n\n');
    return paragraphs.map((paragraph, index) => (
      <Markdown
        key={index}
        components={{
          h1: (props) => <h1 className="text-text-primary" {...props} />,
          h2: (props) => <h2 className="text-text-primary" {...props} />,
          h3: (props) => <h3 style={{ color: '#1A1A1A' }} {...props} />,
          h4: (props) => <h4 style={{ color: '#1A1A1A' }} {...props} />,
          h5: (props) => <h5 style={{ color: '#1A1A1A' }} {...props} />,
          h6: (props) => <h6 style={{ color: '#1A1A1A' }} {...props} />,
          strong: (props) => (
            <strong
              style={{ color: '#1A1A1A', fontWeight: 'bold' }}
              {...props}
            />
          ),
          p: ({ children }) => (
            <p style={{ color: '#1A1A1A', display: 'inline' }}>
              {children}
              {isStreaming && index === paragraphs.length - 1 && (
                <AnimatedEllipsis />
              )}
            </p>
          ),
          li: (props) => <li style={{ color: '#1A1A1A' }} {...props} />,
          blockquote: (props) => (
            <blockquote style={{ color: '#1A1A1A' }} {...props} />
          ),
          em: (props) => <em style={{ color: '#1A1A1A' }} {...props} />,
          code: (props) => <code style={{ color: '#1A1A1A' }} {...props} />,
          pre: (props) => <pre style={{ color: '#1A1A1A' }} {...props} />,

          a: ({ href, ...props }) => {
            if (!href) return null;
            let source: Source | KGSearchResult | null = null;
            let isKGElement = false;

            if (+href - 1 < parsedVectorSources.length) {
              source = parsedVectorSources[+href - 1];
            } else if (
              +href - 1 >= parsedVectorSources.length &&
              +href - 1 < parsedVectorSources.length + parsedEntities.length
            ) {
              source = parsedEntities[+href - parsedVectorSources.length - 1];
              isKGElement = true;
            } else if (
              +href - 1 >=
              parsedVectorSources.length + parsedEntities.length
            ) {
              source =
                parsedCommunities[
                  +href - parsedVectorSources.length - parsedEntities.length - 1
                ];
              isKGElement = true;
            }
            if (!source) return null;

            const metadata = isKGElement
              ? (source as KGSearchResult).content
              : (source as Source).metadata;
            const title = isKGElement ? metadata.name : metadata.title;
            const description = isKGElement
              ? metadata.description
              : (source as Source).text;
            return (
              <span className="inline-block w-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <span
                      title={title}
                      className="inline-block cursor-pointer transform scale-[60%] no-underline font-medium w-6 text-center h-6 rounded-full origin-top-left"
                      style={{ background: 'var(--popover)' }}
                    >
                      {href}
                    </span>
                  </PopoverTrigger>
                  <PopoverContent
                    align="start"
                    className="max-w-screen-md flex flex-col gap-2 bg-white shadow-lg ring-border border-border ring-1 text-xs"
                  >
                    {!isKGElement && metadata?.documentid && (
                      <div className="text-text-primary font-medium border-b border-border pb-1">
                        DocumentId: {metadata.documentid}
                      </div>
                    )}
                    <div className="text-text-primary text-ellipsis overflow-hidden whitespace-nowrap font-medium">
                      {title ? `Title: ${title}` : ''}
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-1 max-h-[200px] overflow-y-auto pr-2">
                        {isKGElement && (metadata as any).summary && (
                          <div className="text-text-body break-words mb-2">
                            <strong>Summary:</strong>{' '}
                            {(metadata as any).summary}
                          </div>
                        )}
                        {!isKGElement && (
                          <div className="text-text-body break-words mb-2">
                            {metadata?.snippet ?? ''}
                          </div>
                        )}
                        <div className="text-text-body break-words">
                          {description ?? ''}
                        </div>
                        {isKGElement && (metadata as any).impact_rating && (
                          <div className="text-text-body break-words mt-2">
                            <strong>Impact Rating:</strong>{' '}
                            {(metadata as any).impact_rating}
                          </div>
                        )}
                        {isKGElement &&
                          (metadata as any).rating_explanation && (
                            <div className="text-text-body break-words mt-2">
                              <strong>Rating Explanation:</strong>{' '}
                              {(metadata as any).rating_explanation}
                            </div>
                          )}
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </span>
            );
          },
        }}
      >
        {formatMarkdownNewLines(paragraph)}
      </Markdown>
    ));
  };
  return (
    <div className="mt-4">
      <Accordion
        type="single"
        collapsible
        className="w-full"
        onValueChange={(value) => setIsOpen(value === 'answer')}
      >
        <AccordionItem value="answer">
          <AccordionTrigger className="py-2 text-lg font-bold text-text-primary hover:no-underline">
            <SourceInfo isSearching={isSearching} sourcesCount={sourcesCount} />
          </AccordionTrigger>
          <AccordionContent>
            {!isSearching && sourcesCount !== null && sourcesCount > 0 && (
              <SearchResults
                vectorSearchResults={parsedVectorSources}
                entities={parsedEntities}
                communities={parsedCommunities}
              />
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="space-y-4 mt-4">
        {message.content || isStreaming ? (
          <div className="prose prose-sm max-w-full text-text-body overflow-y-auto max-h-[700px] prose-headings:text-text-primary prose-p:text-text-body prose-strong:text-text-primary prose-code:text-text-primary p-4 rounded-lg">
            {message.content ? (
              renderContent()
            ) : (
              <div
                style={{
                  color: '#1A1A1A',
                  display: 'inline-block',
                  width: '1em',
                  height: '1em',
                }}
              >
                <AnimatedEllipsis />
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <Skeleton className="max-w-lg h-4 bg-surface-offwhite" />
            <Skeleton className="max-w-2xl h-4 bg-surface-offwhite" />
            <Skeleton className="max-w-lg h-4 bg-surface-offwhite" />
            <Skeleton className="max-w-xl h-4 bg-surface-offwhite" />
          </div>
        )}
      </div>
    </div>
  );
};
