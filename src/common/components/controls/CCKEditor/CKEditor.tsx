//#region IMPORT
import {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { EditorConfig } from 'ckeditor5/src/core';
import { EventInfo } from 'ckeditor5/src/utils';
import classNames from 'classnames';

import ClassicEditor from './classic-editor';
import { ICCKEditorProps, ICCKEditorRef } from './types';

import './index.scss';
//#endregion

const CCKEditor = forwardRef<ICCKEditorRef, ICCKEditorProps>(
  (
    { id, value, placeholder, error, className, minHeight, onChange, onBlur },
    ref,
  ) => {
    const instance = useRef<ClassicEditor | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const wordCountRef = useRef<HTMLDivElement | null>(null);

    const editorConfiguration = useMemo<EditorConfig>(
      () => ({
        placeholder,
      }),
      [placeholder],
    );

    const onReady = useCallback(
      (editor: ClassicEditor) => {
        editor.editing.view.change((writer) => {
          writer.setStyle(
            'min-height',
            `${minHeight}px`,
            editor.editing.view.document.getRoot() as any,
          );
        });

        const wordCountPlugin = editor.plugins.get('WordCount');

        if (wordCountRef.current) {
          wordCountRef.current.innerHTML = '';
          wordCountRef.current.appendChild(wordCountPlugin.wordCountContainer);
        }

        instance.current = editor;
      },
      [minHeight],
    );

    const onValueChange = useCallback(
      (e: EventInfo<string, unknown>, editor: ClassicEditor) => {
        onChange && onChange(editor.getData());
      },
      [onChange],
    );

    useImperativeHandle(ref, () => ({
      focus: () => {
        instance.current?.focus();
      },
      blur: () => {
        //
      },
    }));

    return (
      <div
        ref={containerRef}
        id={id}
        className={classNames('html-editor', { 'has-error': error }, className)}
      >
        <CKEditor
          editor={ClassicEditor}
          config={editorConfiguration}
          data={typeof value === 'string' ? value : ''}
          onReady={onReady}
          onChange={onValueChange}
          onBlur={onBlur}
        />
        <div ref={wordCountRef} className="classic-editor-word-count" />
      </div>
    );
  },
);

CCKEditor.defaultProps = {
  minHeight: 250,
};

export default memo(CCKEditor);
