import Cookies from "universal-cookie";

const cookies = new Cookies(null, { path: "/" });
const addHours = (date: Date, h: number) => {
  const newDate = new Date(date.getTime() + h * 60 * 60 * 1000);
  return newDate;
};
class CookieHandler {
  private _defaultExpireDate = addHours(new Date(Date.now()), 48);
  private _authCookieName = "user";
  constructor() {}

  getAuthCookie() {
    const cookie = cookies.get(this._authCookieName);
    return cookie;
  }

  setAuthCookie(accessToken: string) {
    cookies.set(this._authCookieName, accessToken, {
      expires: this._defaultExpireDate,
    });
  }

  removeAuthCookie() {
    cookies.remove(this._authCookieName);
  }
}

const cookieHandler = new CookieHandler();
export default cookieHandler;
