'use client';

import { ReactNode, useCallback } from 'react';

interface CopyToClipboardProps {
  children: ReactNode;
  copyContent?: string;
  copyHref: boolean;
}
export function CopyToClipboard({
  children,
  copyContent = '',
  copyHref,
}: CopyToClipboardProps) {
  const copyToClipboard = useCallback(async () => {
    const copyResult = copyHref ? location.href : copyContent;
    try {
      await navigator.clipboard.writeText(copyResult);
    } catch (error) {
      console.error('failed to write to clipboard: ', error);
      return;
    }
    console.log('content written to clipboard:', copyResult);
  }, [copyContent, copyHref]);

  return (
    <button type="button" onClick={copyToClipboard} className="select-none">
      {children}
    </button>
  );
}
