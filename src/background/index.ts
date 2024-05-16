import menus from './menus';

chrome.runtime.onInstalled.addListener(async () => {
  await chrome.contextMenus.removeAll();

  for (const menu of menus) {
    chrome.contextMenus.create(menu.createProperties);
  }
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  for (const menu of menus) {
    if (menu.createProperties.id === info.menuItemId) {
      menu.onClick(info, tab);
      break;
    }
  }
});
