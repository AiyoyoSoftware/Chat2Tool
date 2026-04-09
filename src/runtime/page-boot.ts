import { initInteractivePage } from './app-runtime';

export function mountInteractivePages(root: ParentNode = document) {
  for (const mount of root.querySelectorAll<HTMLElement>('[data-interactive-page]')) {
    if (mount.dataset.appMounted === 'true') continue;

    const runtimeId = mount.dataset.runtimeId;
    if (!runtimeId) continue;

    const runtimeNode = document.getElementById(runtimeId);
    if (!runtimeNode?.textContent) continue;

    mount.dataset.appMounted = 'true';
    initInteractivePage(mount, JSON.parse(runtimeNode.textContent));
  }
}

mountInteractivePages();
