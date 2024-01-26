'use client';

import { Button } from '@/components/ui/button';
import { Check, Link } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

interface CopyToClipboardProps {
  copyContent?: string;
  copyHref: boolean;
}

const checkMarkPresenceMs = 1000;

export function CopyToClipboard({
  copyContent = '',
  copyHref,
}: CopyToClipboardProps) {
  const [showCheckMark, setShowCheckMark] = useState(false);

  const copyToClipboard = useCallback(async () => {
    const copyResult = copyHref ? location.href : copyContent;
    await navigator.clipboard.writeText(copyResult);
    setShowCheckMark(true);
  }, [copyContent, copyHref]);

  useEffect(() => {
    let timeoutId: number;

    if (showCheckMark) {
      timeoutId = window.setTimeout(() => {
        setShowCheckMark(false);
      }, checkMarkPresenceMs);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [showCheckMark]);

  return (
    <Button
      onClick={copyToClipboard}
      className="select-none"
      variant={'ghost'}
      size="icon"
    >
      {showCheckMark ? (
        <Check className="h-4 w-4" />
      ) : (
        <Link className="h-4 w-4" />
      )}
    </Button>
  );
}
