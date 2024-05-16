const copyTextInTab = (text: string): void => {
  navigator.clipboard.writeText(text);
};

const copyText = async (text: string, tabId: number): Promise<void> => {
  await chrome.scripting.executeScript({
    target: {
      tabId,
    },
    func: copyTextInTab,
    args: [text],
  });
};

export default copyText;
