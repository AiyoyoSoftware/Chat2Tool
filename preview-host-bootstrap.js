function createMemoryStorage() {
  const store = new Map();

  return {
    get length() {
      return store.size;
    },
    clear() {
      store.clear();
    },
    getItem(key) {
      const normalizedKey = String(key);
      return store.has(normalizedKey) ? store.get(normalizedKey) : null;
    },
    key(index) {
      const normalizedIndex = Number(index);
      if (!Number.isInteger(normalizedIndex) || normalizedIndex < 0 || normalizedIndex >= store.size) {
        return null;
      }
      return [...store.keys()][normalizedIndex] || null;
    },
    removeItem(key) {
      store.delete(String(key));
    },
    setItem(key, value) {
      store.set(String(key), String(value));
    },
  };
}

function installStorageShim(name) {
  try {
    void window[name];
    return;
  } catch (error) {
    const memoryStorage = createMemoryStorage();

    try {
      Object.defineProperty(window, name, {
        configurable: true,
        enumerable: true,
        value: memoryStorage,
      });
    } catch (defineError) {
      console.warn(`Could not install ${name} shim in preview host.`, defineError);
    }
  }
}

installStorageShim("localStorage");
installStorageShim("sessionStorage");
