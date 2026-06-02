export function hasSessionFlag(key: string) {
  return sessionStorage.getItem(key) === "yes";
}

export function setSessionFlag(key: string) {
  sessionStorage.setItem(key, "yes");
}

export function removeSessionFlag(key: string) {
  sessionStorage.removeItem(key);
}
