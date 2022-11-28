const token = {
  value: "",
  admin: false,
  set(newToken: string) {
    this.value = newToken;
  },
  reset() {
    this.value = "";
  },
  exists() {
    return this.value !== "";
  },
  setAdmin(admin: boolean) {
    this.admin = admin;
  },
  isAdmin() {
    return this.admin;
  },
};

export default token;
