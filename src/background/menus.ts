import copyText from './copyText';

export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

export type Menu = {
  createProperties: WithRequired<chrome.contextMenus.CreateProperties, 'id'>;
  onClick: (info: chrome.contextMenus.OnClickData, tab?: chrome.tabs.Tab) => void;
};

const menus: Menu[] = [
  {
    createProperties: {
      id: 'OPEN_FRAME_IN_NEW_TAB',
      title: 'Open Frame in New Tab',
      contexts: [chrome.contextMenus.ContextType.FRAME],
    },
    onClick: ({ frameUrl }, tab) => {
      if (frameUrl && tab) {
        chrome.tabs.create({
          url: frameUrl,
          active: false,
          index: tab.index + 1,
        });
      }
    },
  },
  {
    createProperties: {
      id: 'OPEN_FRAME_IN_NEW_WINDOW',
      title: 'Open Frame in New Window',
      contexts: [chrome.contextMenus.ContextType.FRAME],
    },
    onClick: ({ frameUrl }) => {
      if (frameUrl) {
        chrome.windows.create({
          url: frameUrl,
        });
      }
    },
  },
  {
    createProperties: {
      id: 'OPEN_FRAME_IN_INCOGNITO_WINDOW',
      title: 'Open Frame in Incognito Window',
      contexts: [chrome.contextMenus.ContextType.FRAME],
    },
    onClick: ({ frameUrl }) => {
      if (frameUrl) {
        chrome.windows.create({
          url: frameUrl,
          incognito: true,
        });
      }
    },
  },
  {
    createProperties: {
      id: 'SAVE_FRAME_AS',
      title: 'Save Frame As...',
      contexts: [chrome.contextMenus.ContextType.FRAME],
    },
    onClick: ({ frameUrl }) => {
      if (frameUrl) {
        chrome.downloads.download({
          url: frameUrl,
          saveAs: true,
        });
      }
    },
  },
  {
    createProperties: {
      id: 'COPY_FRAME_ADDRESS',
      title: 'Copy Frame Address',
      contexts: [chrome.contextMenus.ContextType.FRAME],
    },
    onClick: ({ frameUrl }) => {
      if (frameUrl) {
        copyText(frameUrl);
      }
    },
  },
];

export default menus;
