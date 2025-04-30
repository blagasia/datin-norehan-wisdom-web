
import React from 'react';

// Types for the drag and drop context
interface DragDropContextProps {
  onDragEnd: (result: any) => void;
  children: React.ReactNode;
}

// Types for the droppable component
interface DroppableProps {
  droppableId: string;
  children: (provided: {
    innerRef: React.RefCallback<HTMLElement>;
    droppableProps: any;
    placeholder: React.ReactNode;
  }) => React.ReactNode;
}

// Types for the draggable component
interface DraggableProps {
  draggableId: string;
  index: number;
  children: (provided: {
    innerRef: React.RefCallback<HTMLElement>;
    draggableProps: any;
    dragHandleProps: any;
  }) => React.ReactNode;
}

// Simple implementation of DragDropContext
export const DragDropContext = ({ onDragEnd, children }: DragDropContextProps) => {
  const handleDragEnd = (event: any) => {
    // This is a simplified implementation that doesn't actually do drag and drop
    // In a real app, we'd use a library like react-beautiful-dnd
    // But for this demo, we're just providing the structure
    onDragEnd({
      source: { index: event?.source?.index || 0 },
      destination: { index: event?.destination?.index || 0 }
    });
  };

  return (
    <div className="dnd-context" onDragEnd={handleDragEnd}>
      {children}
    </div>
  );
};

// Simple implementation of Droppable
export const Droppable = ({ droppableId, children }: DroppableProps) => {
  return (
    <>
      {children({
        innerRef: (el) => {
          // In a real implementation, this would set up the droppable area
          return el;
        },
        droppableProps: {
          'data-droppable-id': droppableId,
        },
        placeholder: <div className="placeholder"></div>,
      })}
    </>
  );
};

// Simple implementation of Draggable
export const Draggable = ({ draggableId, index, children }: DraggableProps) => {
  return (
    <>
      {children({
        innerRef: (el) => {
          // In a real implementation, this would set up the draggable element
          return el;
        },
        draggableProps: {
          'data-draggable-id': draggableId,
          'data-index': index,
          draggable: true,
        },
        dragHandleProps: {
          'data-drag-handle': true,
        },
      })}
    </>
  );
};
