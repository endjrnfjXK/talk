const API = (function () {
  // 接口封装
  const BASE_URL = "https://study.duyiedu.com";
  const TOKEN_KEY = "token";

  function getHeroes(url, disposition) {
    const headers = {};
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      headers.authorization = `Bearer ` + token;
    }
    if (disposition && disposition.method === "POST") {
      headers["Content-Type"] = "application/json";
    }
    return fetch(BASE_URL + url, {
      method: "GET",
      headers,
      ...disposition,
    });
  } //发送请求
  async function reg(userInfo) {
    return await getHeroes("/api/user/reg", {
      method: "POST",
      body: JSON.stringify(userInfo),
    }).then((resp) => resp.json());
  } //注册

  async function login(loginInfo) {
    const resp = await getHeroes("/api/user/login", {
      method: "POST",
      body: JSON.stringify(loginInfo),
    });
    const result = await resp.json();
    if (result.code === 0) {
      // 登录成功
      // 将响应头中的token保存(localStorage)
      const token = resp.headers.get("Authorization");
      localStorage.setItem(TOKEN_KEY, token);
    }
    return result;
  } //登录

  async function exists(loginId) {
    const resp = await getHeroes(`/api/user/exists?loginId=${loginId}`);
    return await resp.json();
  } //验证账号

  async function profile() {
    const resp = await getHeroes("/api/user/profile");
    return await resp.json();
  } //当前登录的用户信息

  async function sendChat(content) {
    const resp = await getHeroes("/api/chat", {
      method: "POST",
      body: JSON.stringify({ content }),
    });
    return await resp.json();
  } //发送聊天消息

  async function getHistory() {
    const resp = await getHeroes("/api/chat/history", {
      methon: "GET",
    });
    return await resp.json();
  } //获取聊天记录

  function loginOut() {
    localStorage.removeItem(TOKEN_KEY);
  } //注销登录

  return {
    reg,
    login,
    exists,
    profile,
    sendChat,
    getHistory,
    loginOut,
  };
})();
