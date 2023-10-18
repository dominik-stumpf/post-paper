import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { HashtagNode } from '@lexical/hashtag';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { ListItemNode, ListNode } from '@lexical/list';
// import { LinkNode } from '@lexical/link';
// import { ListNode, ListItemNode } from '@lexical/list';
import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { Klass, LexicalNode } from 'lexical';

// import { AutocompleteNode } from './AutocompleteNode';
// import { EmojiNode } from './EmojiNode';
// import { EquationNode } from './EquationNode';
// import { ExcalidrawNode } from './ExcalidrawNode';
// import { ImageNode } from './ImageNode';
// import { KeywordNode } from './KeywordNode';
// import { MentionNode } from './MentionNode';

export const editorNodes: Array<Klass<LexicalNode>> = [
  HeadingNode,
  ListNode,
  ListItemNode,
  QuoteNode,
  CodeNode,
  HashtagNode,
  CodeHighlightNode,
  AutoLinkNode,
  LinkNode,
  TableCellNode,
  TableRowNode,
  TableNode,
  HorizontalRuleNode,
  // ImageNode,
  // MentionNode,
  // EmojiNode,
  // ExcalidrawNode,
  // EquationNode,
  // AutocompleteNode,
  // KeywordNode,
];
