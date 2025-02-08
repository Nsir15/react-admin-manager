const Storage = {
  /**
   * 将数据存入 localStorage
   *
   * @param key 键值
   * @param value 值，可以是任意类型的数据
   */
  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  /**
   * 从localStorage中获取指定键对应的值
   *
   * @param key 需要获取的键名
   * @returns 返回一个字符串或解析后的对象，如果键不存在则返回空字符串
   */
  get(key: string) {
    const value = localStorage.getItem(key);
    if (!value) return '';
    try {
      return JSON.parse(value);
    } catch (error) {
      return value;
    }
  },

  /**
   * 从localStorage中移除指定键对应的值
   *
   * @param key 要移除的键
   */
  removeItem(key: string) {
    localStorage.removeItem(key);
  },

  /**
   * 清除 localStorage 中的所有存储项
   */
  clearAll() {
    localStorage.clear();
  }
};

export default Storage;
