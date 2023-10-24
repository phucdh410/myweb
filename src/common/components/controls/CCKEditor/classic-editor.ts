//#region IMPORT
import { Alignment } from '@ckeditor/ckeditor5-alignment';
import { Autoformat } from '@ckeditor/ckeditor5-autoformat';
import {
  Bold,
  Italic,
  Strikethrough,
  Underline,
} from '@ckeditor/ckeditor5-basic-styles';
import { ClassicEditor as ClassicEditorBase } from '@ckeditor/ckeditor5-editor-classic';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { FindAndReplace } from '@ckeditor/ckeditor5-find-and-replace';
import {
  FontBackgroundColor,
  FontColor,
  FontSize,
} from '@ckeditor/ckeditor5-font';
import {
  Image,
  ImageCaption,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  PictureEditing,
} from '@ckeditor/ckeditor5-image';
import { Indent } from '@ckeditor/ckeditor5-indent';
import { Link } from '@ckeditor/ckeditor5-link';
import { List } from '@ckeditor/ckeditor5-list';
import ListProperties from '@ckeditor/ckeditor5-list/src/listproperties';
import { MediaEmbed } from '@ckeditor/ckeditor5-media-embed';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { RemoveFormat } from '@ckeditor/ckeditor5-remove-format';
import {
  Table,
  TableCellProperties,
  TableProperties,
  TableToolbar,
} from '@ckeditor/ckeditor5-table';
import { Base64UploadAdapter } from '@ckeditor/ckeditor5-upload';
import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';
import { WordCount } from '@ckeditor/ckeditor5-word-count';

import { REDUCED_MATERIAL_COLORS } from './color';
// import { CUploadAdapterPlugin } from './extra-plugins';
//#endregion

export default class ClassicEditor extends ClassicEditorBase {}

// Plugins to include in the build.
ClassicEditor.builtinPlugins = [
  Alignment,
  Autoformat,
  Bold,
  Essentials,
  FindAndReplace,
  FontBackgroundColor,
  FontColor,
  FontSize,
  Image,
  ImageCaption,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  Base64UploadAdapter,
  Indent,
  Indent,
  Italic,
  Link,
  List,
  ListProperties,
  MediaEmbed,
  Paragraph,
  PictureEditing,
  RemoveFormat,
  SimpleUploadAdapter,
  Strikethrough,
  Table,
  TableCellProperties,
  TableProperties,
  TableToolbar,
  Underline,
  WordCount,
];

// Editor configuration.
ClassicEditor.defaultConfig = {
  toolbar: {
    items: [
      'bold',
      'italic',
      'underline',
      'strikethrough',
      '|',
      'fontSize',
      'fontColor',
      'fontBackgroundColor',
      '|',
      'bulletedList',
      'numberedList',
      '|',
      'alignment',
      'outdent',
      'indent',
      '|',
      'insertTable',
      'uploadImage',
      'link',
      'mediaEmbed',
      '|',
      'removeFormat',
      'findAndReplace',
      '|',
      'undo',
      'redo',
    ],
  },
  // extraPlugins: [CUploadAdapterPlugin],
  list: {
    properties: {
      styles: true,
      startIndex: true,
      reversed: true,
    },
  },
  fontSize: {
    options: [12, 14, 16, 18, 24, 32, 35, 40],
  },
  fontColor: {
    columns: 12,
    colors: REDUCED_MATERIAL_COLORS,
  },
  fontBackgroundColor: {
    columns: 12,
    colors: REDUCED_MATERIAL_COLORS,
  },
  link: {
    addTargetToExternalLinks: true,
  },
  image: {
    toolbar: [
      'imageStyle:alignLeft',
      'imageStyle:block',
      'imageStyle:alignRight',
      '|',
      'toggleImageCaption',
      'imageTextAlternative',
    ],
  },
  table: {
    contentToolbar: [
      'tableColumn',
      'tableRow',
      'mergeTableCells',
      '|',
      'tableProperties',
      'tableCellProperties',
    ],
  },
  language: 'vi',
};
