import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip';

const colorStyles = {
  primary:
    'bg-brand-red text-white hover:bg-brand-red-dark',
  secondary:
    'bg-brand-navy text-white hover:bg-brand-navy-light',
  filled:
    'bg-brand-red text-white hover:bg-brand-red-dark',
  danger:
    'bg-brand-red-dark text-white hover:bg-brand-red',
  amber:
    'bg-amber-500 text-white hover:bg-amber-600',
  blue:
    'bg-brand-blue-accent/10 text-brand-navy ring-1 ring-inset ring-brand-blue-accent/20 hover:bg-brand-blue-accent/20',
  blue_filled:
    'bg-brand-blue-accent text-brand-navy hover:opacity-90',
  text:
    'text-brand-red hover:text-brand-red-dark',
  text_gray:
    'text-text-muted hover:text-text-primary',
  disabled:
    'bg-gray-300 text-gray-500 cursor-not-allowed',
  light:
    'bg-surface-pale text-text-primary hover:bg-surface-offwhite',
  transparent:
    'bg-transparent text-text-primary hover:bg-surface-offwhite',
};

const shapeStyles = {
  default: 'rounded-button px-3 py-1.5',
  rounded: 'rounded-full px-3 py-1.5',
  outline: 'px-3 py-1.5 ring-1 ring-inset ring-border rounded-button',
  outline_wide: 'px-4 py-1.5 ring-1 ring-inset ring-border rounded-button',
  slim: 'rounded-button px-2 py-1 h-9 flex items-center justify-center',
};

type ButtonBaseProps = {
  color?: keyof typeof colorStyles;
  shape?: keyof typeof shapeStyles;
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
  as?: 'button' | 'anchor';
};

export type ButtonAsButton = ButtonBaseProps & {
  as?: 'button';
  href?: undefined;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonAsAnchor = ButtonBaseProps & {
  as: 'anchor';
  href: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

interface ButtonProps extends ButtonBaseProps {
  as?: 'button' | 'anchor';
  href?: string;
}

type ButtonAttributes = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  keyof ButtonProps
>;
type AnchorAttributes = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof ButtonProps
>;

interface ButtonWithTooltipProps extends ButtonProps {
  tooltip?: React.ReactNode;
}

const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonWithTooltipProps & (ButtonAttributes | AnchorAttributes)
>((props, ref) => {
  const {
    as = 'button',
    color = 'primary',
    shape = 'default',
    className,
    children,
    href,
    disabled = false,
    tooltip,
    ...restProps
  } = props;

  const buttonColor = disabled ? 'disabled' : color;

  const buttonClassName = clsx(
    'inline-flex gap-0.5 justify-center overflow-hidden font-medium transition',
    colorStyles[buttonColor],
    shapeStyles[shape],
    className
  );

  let ButtonElement: React.ReactElement;

  if (as === 'anchor') {
    if (!href) {
      throw new Error(
        "The 'href' prop is required when using Button as 'anchor'."
      );
    }

    ButtonElement = (
      <Link href={href} passHref legacyBehavior>
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={buttonClassName}
          {...(restProps as AnchorAttributes)}
        >
          {children}
        </a>
      </Link>
    );
  } else {
    ButtonElement = (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        disabled={disabled}
        className={buttonClassName}
        {...(restProps as ButtonAttributes)}
      >
        {children}
      </button>
    );
  }

  if (tooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{ButtonElement}</TooltipTrigger>
          <TooltipContent>{tooltip}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return ButtonElement;
});

Button.displayName = 'Button';

export { Button };
