const token = {
  value: "",
  set(newToken: string) {
    this.value = newToken;
  },
  reset() {
    this.value = "";
  },
  exists() {
    return this.value !== "";
  },
};

export default token;
