'use client';

import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Link } from 'lucide-react';

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
        <Check className="w-4 h-4" />
      ) : (
        <Link className="w-4 h-4" />
      )}
    </Button>
  );
}
