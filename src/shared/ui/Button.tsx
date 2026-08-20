import { Link } from 'react-router-dom';
import type { ButtonHTMLAttributes, ComponentProps, ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';

type Variant = 'primary' | 'ghost';
type Size = 'sm' | 'md';

type SharedProps = {
  /** Required so every interactive surface is identifiable for a11y and tests. */
  id: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type NativeButtonProps = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'id' | 'children' | 'className'> & {
    as?: 'button';
    to?: undefined;
  };

type LinkButtonProps = SharedProps &
  Omit<ComponentProps<typeof Link>, 'id' | 'children' | 'className'> & {
    as: typeof Link;
  };

export type ButtonProps = NativeButtonProps | LinkButtonProps;

function buttonClassName(variant: Variant, size: Size, className?: string) {
  return cn(
    'inline-flex items-center justify-center rounded-full uppercase tracking-[0.12em] cursor-pointer',
    'transition-[background,border-color,color,box-shadow,transform] duration-300 ease-in-out',
    'disabled:cursor-not-allowed disabled:opacity-50',
    size === 'sm' && 'px-4 py-2 text-xs',
    size === 'md' && 'px-6 py-3 text-sm',
    variant === 'primary' &&
      'border border-[rgba(240,199,94,0.65)] font-bold text-[#0a1f1a] shadow-[0_6px_20px_rgba(240,199,94,0.28)] [background:linear-gradient(135deg,#fff9f0_0%,#f0c75e_100%)] hover:-translate-y-px hover:shadow-[0_8px_28px_rgba(240,199,94,0.42)] hover:[background:linear-gradient(135deg,#ffffff_0%,#ffe08a_100%)]',
    variant === 'ghost' &&
      'border border-[rgba(255,249,240,0.35)] bg-[rgba(255,249,240,0.08)] text-[#fff9f0] hover:border-[#f0c75e] hover:bg-[rgba(255,249,240,0.16)] hover:text-[#f0c75e]',
    className,
  );
}

/**
 * Pill CTA used for actions and in-app navigation.
 * Render as a real `<button>` or pass `as={Link}` so destinations stay anchors.
 */
export function Button(props: ButtonProps) {
  const { id, variant = 'primary', size = 'md', className, children } = props;
  const classes = buttonClassName(variant, size, className);

  if (props.as === Link) {
    const { as: _as, variant: _variant, size: _size, ...linkProps } = props;
    return (
      <Link {...linkProps} id={id} className={classes}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as NativeButtonProps;
  const { as: _as, variant: _v, size: _s, type = 'button', ...rest } = buttonProps;
  return (
    <button {...rest} id={id} type={type} className={classes}>
      {children}
    </button>
  );
}
