import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { FC, useState, useCallback } from 'react';

import { Button } from '@/components/ui/Button';
import { SearchProps } from '@/types';

function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

export const Search: FC<SearchProps> = ({
  pipeline,
  setQuery,
  placeholder,
  disabled = false,
}) => {
  const [value, setValue] = useState('');
  const router = useRouter();

  if (!placeholder) {
    placeholder = 'Search over your documents…';
  }

  const navigateToSearch = useCallback(
    debounce((searchValue: string) => {
      if (pipeline) {
        router.push(`/chat/?q=${encodeURIComponent(searchValue)}`);
      }
    }, 50),
    [router, pipeline]
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.trim()) {
      navigateToSearch(value.trim());
      setQuery(value.trim());
      setValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex items-center rounded-full border border-border hover:border-brand-navy/30 transition-colors">
        <input
          id="search-bar"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value)
          }
          autoFocus
          placeholder={placeholder}
          className="w-full px-4 py-2 h-10 bg-white text-text-body border-none rounded-l-full focus:outline-none focus:ring-0 placeholder:text-text-muted"
          disabled={disabled}
        />
        <Button
          type="submit"
          color="filled"
          className="px-4 py-2 h-10 rounded-r-full bg-brand-red hover:bg-brand-red-dark text-white"
          disabled={disabled}
        >
          <ArrowRight size={20} />
        </Button>
      </div>
    </form>
  );
};
