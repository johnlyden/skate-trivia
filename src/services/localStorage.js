export default {
  set: (key, value) => window.localStorage.setItem(key, JSON.stringify(value)),
  get: key => {
    const res = window.localStorage.getItem(key);

    if (res) {
      return JSON.parse(res);
    }
  },
  remove: name => window.localStorage.removeItem(name),
  update: (name, key, value) => {
    let existing = localStorage.getItem(name);
    existing = existing ? JSON.parse(existing) : {};
    existing[key] = value;
    window.localStorage.setItem(name, JSON.stringify(existing));
  }
};
