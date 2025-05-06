// hooks/useDraggableCenteredWindow.js
import { useState, useEffect, useRef } from 'react';
import { useDraggable } from '@dnd-kit/core';

export const useDraggableWindow = (id) => {
  const windowRef = useRef(null);
  const headerRef = useRef(null);

  const [position, setPosition] = useState({ x: 0, y: 0 });

  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const dragStyle = transform
    ? { transform: `translate3d(${position.x + transform.x}px, ${position.y + transform.y}px, 0)` }
    : { transform: `translate3d(${position.x}px, ${position.y}px, 0)` };

  const handleDragEnd = () => {
    if (!transform) return;
    setPosition(prev => ({
      x: prev.x + transform.x,
      y: prev.y + transform.y
    }));
  };

  useEffect(() => {
    const { offsetWidth, offsetHeight } = windowRef.current;
    const centerX = (window.innerWidth - offsetWidth) / 2;
    const centerY = (window.innerHeight - offsetHeight) / 2;
    setPosition({ x: centerX, y: centerY });
  }, []);

  return {
    windowRef,
    headerRef,
    position,
    dragStyle,
    handleDragEnd,
    attributes,
    listeners,
    setNodeRef
  };
};
