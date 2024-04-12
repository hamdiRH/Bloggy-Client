import MarkdownPreview from '@uiw/react-markdown-preview';

export default function Markdown({ source }) {
  return <MarkdownPreview source={source} style={{ padding: 16, overflow: 'hidden' }} />;
}
