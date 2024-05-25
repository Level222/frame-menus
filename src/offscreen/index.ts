const copyText = (text: string) => {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.append(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
};

chrome.runtime.onMessage.addListener(async (message: unknown) => {
  if (
    typeof message === 'object'
    && message !== null
    && 'type' in message
    && message.type === 'COPY'
    && 'text' in message
    && typeof message.text === 'string'
  ) {
    copyText(message.text);
  }
});
