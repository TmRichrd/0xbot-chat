import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
const customCodeBlockPlugin = (md: MarkdownIt, enableCollection: boolean) => {
    md.renderer.rules.fence = (tokens, idx) => {
        const token = tokens[idx];
        const language = token.info ? token.info.trim() : '';

        let highlightedCode = '';
        if (language && hljs.getLanguage(language)) {
            try {
                highlightedCode = hljs.highlight(token.content, {language}).value;
            } catch (__) {
                highlightedCode = md.utils.escapeHtml(token.content);
            }
        } else {
            highlightedCode = md.utils.escapeHtml(token.content);
        }
        return `
      <div class="code-block-element">
        <div class="code-area">
          <div class="header">
            <div class="text">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#fff" fill-opacity="0.55" fill-rule="evenodd" d="M7 9v6H5.2V9H7Zm0-1v8H5c-.552 0-1-.299-1-.667V8.667C4 8.298 4.448 8 5 8h2Z" clip-rule="evenodd"></path><path stroke="#fff" stroke-linejoin="bevel" stroke-opacity="0.55" d="m8.5 10 3 2-3 2M15.5 15h-4"></path><path fill="#fff" fill-opacity="0.55" fill-rule="evenodd" d="M17 9v6h1.8V9H17Zm0-1v8h2c.552 0 1-.299 1-.667V8.667C20 8.298 19.552 8 19 8h-2Z" clip-rule="evenodd"></path></svg>
              <span class="code-area-language">${language}</span>
            </div>
            <div class="copy">
              <button class="copy-btn" onclick="copyCodeToClipboard(this)">Copy</button>
            </div>
          </div>
          <div class="content">
            <pre><code class="hljs language-${md.utils.escapeHtml(language)}">${highlightedCode}</code></pre>
          </div>
        </div>
      </div>
    `;
    };
};

const md = new MarkdownIt({
    highlight: (str, lang) => {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(str, {language: lang}).value;
            } catch (__) {
            }
        }
        return '';
    }
}).use(customCodeBlockPlugin);

export const renderMarkdown = (markdown: string, enableCollection: boolean = false): string => {
    return md.render(markdown, enableCollection);
};