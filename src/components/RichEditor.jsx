import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import './RichEditor.scss';
import { useEffect } from 'react';

const RichEditor = ({ value, onChange, className, placeholder }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value || '',
    editorProps: {
      attributes: {
        'data-placeholder': placeholder || '请输入内容',
      },
    },
    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange(editor.getHTML());
      }
    },
  });

  // 当外部 value 变化时（如编辑文章回填），更新编辑器内容
  useEffect(() => {
    if (editor && value !== undefined && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  return (
    <div className={`rich-editor ${className || ''}`}>
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichEditor;