
import React from 'react';
import { Label } from '@/components/ui/label';

interface TextBlockContent {
  text: string;
}

interface TextBlockEditorProps {
  content: TextBlockContent;
  onChange: (content: TextBlockContent) => void;
  readOnly?: boolean;
}

const TextBlockEditor: React.FC<TextBlockEditorProps> = ({ 
  content, 
  onChange,
  readOnly = false
}) => {
  if (readOnly) {
    return (
      <div dangerouslySetInnerHTML={{ __html: content.text }} className="prose max-w-none" />
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="text-editor">Text Content</Label>
        <div className="mt-2">
          <textarea
            id="text-editor"
            value={content.text}
            onChange={(e) => onChange({ text: e.target.value })}
            className="w-full min-h-[200px] p-3 border rounded-md"
            placeholder="Enter your text content here. You can use HTML tags for formatting."
          />
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Preview</h4>
        <div 
          className="p-4 border rounded-md bg-white prose max-w-none"
          dangerouslySetInnerHTML={{ __html: content.text }}
        />
      </div>
    </div>
  );
};

export default TextBlockEditor;
