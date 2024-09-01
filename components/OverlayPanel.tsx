import React, { useRef, useEffect } from 'react';

interface OverlayPanelProps {
  children: React.ReactNode;
  position: { top: number; left: number };
  onClose: () => void;
}

export default function OverlayPanel({ children, position, onClose }: OverlayPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={panelRef}
      style={{
        position: 'absolute',
        top: position.top,
        left: position.left,
        zIndex: 10,
        backgroundColor: 'white',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        padding: '1rem',
        paddingBottom: 0,
        maxWidth: '750px',
        marginRight: '1rem'
      }}
      className='overlay-panel'
    >
      
      {children}
      <div className='flex justify-start py-2' style={{borderTop: '1px solid #e5e7eb'}}>
        <button className='btn btn-sm btn-circle mr-2'>C</button>
        <button className='btn btn-sm btn-circle'>S</button>
      </div>
    </div>
  );
}
