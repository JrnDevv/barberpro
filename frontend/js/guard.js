import { getUser, clearSession } from "./storage.js";

export function requireAuth(allowRoles = []) {
  const user = getUser();

  if (!user) {
    window.location.href = "./login.html";
    return null;
  }

  if (allowRoles.length && !allowRoles.includes(user.role)) {
    clearSession();
    window.location.href = "./login.html";
    return null;
  }

  return user;
}
