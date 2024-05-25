const copyText = async (text: string): Promise<void> => {
  const offscreenURL = chrome.runtime.getURL('offscreen.html');

  const existingContexts = await chrome.runtime.getContexts({
    contextTypes: [chrome.runtime.ContextType.OFFSCREEN_DOCUMENT],
    documentUrls: [offscreenURL],
  });

  const offscreenAlreadyExists = existingContexts.length > 0;

  if (!offscreenAlreadyExists) {
    await chrome.offscreen.createDocument({
      url: offscreenURL,
      reasons: [chrome.offscreen.Reason.CLIPBOARD],
      justification: 'To copy frame address',
    });
  }

  await chrome.runtime.sendMessage({
    type: 'COPY',
    text,
  });

  if (!offscreenAlreadyExists) {
    await chrome.offscreen.closeDocument();
  }
};

export default copyText;
