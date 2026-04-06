import { TrendingUp, Shield, Users, Briefcase } from 'lucide-react';
import { FC } from 'react';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { DefaultQueriesProps } from '@/types';

export const DefaultQueries: FC<DefaultQueriesProps> = ({ setQuery, mode }) => {
  const defaultRagQueries = [
    {
      query:
        'Explain how Linked Investment Service Provider (LISP) funds work and their benefits for clients.',
      icon: <TrendingUp className="h-6 w-6 text-brand-navy" />,
    },
    {
      query:
        'What are the key differences between a living annuity and a life annuity for retirement planning?',
      icon: <Briefcase className="h-6 w-6 text-brand-navy" />,
    },
    {
      query:
        'Summarise the FAIS Act requirements for providing financial advice on investment products.',
      icon: <Shield className="h-6 w-6 text-brand-navy" />,
    },
    {
      query:
        'What factors should I consider when recommending a risk profile for a new client?',
      icon: <Users className="h-6 w-6 text-brand-navy" />,
    },
  ];

  const defaultAgentQueries = [
    {
      query:
        'Help me prepare talking points for a client review meeting about their investment portfolio.',
      icon: <Briefcase className="h-6 w-6 text-brand-navy" />,
    },
    {
      query:
        'What compliance checks should I perform before recommending a fund switch?',
      icon: <Shield className="h-6 w-6 text-brand-navy" />,
    },
    {
      query:
        'Analyse the suitability of balanced funds for a conservative client nearing retirement.',
      icon: <TrendingUp className="h-6 w-6 text-brand-navy" />,
    },
    {
      query:
        'What are the tax implications of withdrawing from a retirement annuity before age 55?',
      icon: <Users className="h-6 w-6 text-brand-navy" />,
    },
  ];

  const getQueriesBasedOnMode = (mode: 'rag' | 'rag_agent') => {
    if (mode === 'rag') {
      return defaultRagQueries;
    } else if (mode === 'rag_agent') {
      return defaultAgentQueries;
    } else {
      throw new Error('Invalid mode');
    }
  };

  const defaultQueries = getQueriesBasedOnMode(mode);

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-8 mt-24">
      <img
        src="/images/momentum-mark.svg"
        className="h-16 w-16 opacity-50"
        alt="Momentum"
      />
      <p className="text-2xl text-text-muted font-light tracking-wide">
        How can I help you today?
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-4xl px-4">
        {defaultQueries.map(({ query, icon }, index) => (
          <Alert
            key={index}
            className="cursor-pointer bg-gray-50/60 hover:bg-gray-200/80 border-gray-200/50 flex flex-col items-start p-4 min-h-[120px] h-auto transition-colors"
            onClick={() => setQuery(query)}
          >
            <div className="mb-2">{icon}</div>
            <AlertDescription className="text-sm text-left text-text-body">
              {query}
            </AlertDescription>
          </Alert>
        ))}
      </div>
    </div>
  );
};
