'use client';

import { useState, useRef, useCallback, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface TooltipProps {
  text: string;
  children: ReactNode;
}

export default function Tooltip({ text, children }: TooltipProps) {
  const [show, setShow] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0, pos: 'bottom' as 'top' | 'bottom' });
  const triggerRef = useRef<HTMLSpanElement>(null);

  const handleEnter = useCallback(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const above = rect.top > 160;
      setCoords({
        x: rect.left + rect.width / 2,
        y: above ? rect.top - 8 : rect.bottom + 8,
        pos: above ? 'top' : 'bottom',
      });
    }
    setShow(true);
  }, []);

  return (
    <span
      ref={triggerRef}
      className="inline-flex items-center gap-1 cursor-help"
      onMouseEnter={handleEnter}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      <svg className="w-3.5 h-3.5 text-gray-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
      </svg>
      {show && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed z-[9999] w-64 px-3 py-2 text-xs font-normal text-gray-200 bg-gray-800 border border-gray-700 rounded-lg shadow-xl pointer-events-none"
          style={{
            left: coords.x,
            top: coords.pos === 'bottom' ? coords.y : undefined,
            bottom: coords.pos === 'top' ? `${window.innerHeight - coords.y}px` : undefined,
            transform: 'translateX(-50%)',
          }}
        >
          {text}
          <div className={`absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 border-gray-700 rotate-45 ${
            coords.pos === 'top' ? 'bottom-[-5px] border-r border-b' : 'top-[-5px] border-l border-t'
          }`} />
        </div>,
        document.body
      )}
    </span>
  );
}

export { metricInfo } from '@/lib/data';
