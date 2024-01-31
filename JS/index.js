//
const close = $(".close");
const nickname = $("#nickname");
const loginId = $("#loginId");
const chatContainer = $(".chat-container");
const txtMsg = $("#txtMsg");
const sendFrom = $(".msg-container");
const imgs = {
  me: "./asset/avatar.png",
  robot: "./asset/robot-avatar.jpg",
};

const chatContainerHeight = chatContainer.clientHeight;

// 方法

async function currentUserInfo() {
  return await API.profile().then((resp) => resp);
} //获取当前登录用户信息

function formatTime() {
  const time = new Date();
  const year = time.getFullYear(),
    month = time.getMonth() + 1,
    day = time.getDate(),
    hours = time.getHours(),
    min = time.getMinutes(),
    s = String(time.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${min}:${s}`;
} //格式化时间

function createMsgHtml(content, imgUrl, isMe = "") {
  return `<div class="chat-item ${isMe}">
    <img class="chat-avatar" src="${imgUrl}" />
    <div class="chat-content">${content}</div>
    <div class="chat-date">${formatTime()}</div>
  </div>`;
} //创建消息文本元素

function spacingFn() {
  const spacing = chatContainer.scrollHeight - chatContainerHeight + 1;
  chatContainer.scrollTop = spacing;
} //滚动条置底

async function sendMsg(content, url, isMe = "") {
  const meMsg = createMsgHtml(content, url, isMe);
  chatContainer.innerHTML += meMsg;
  spacingFn();
} //发送消息

async function setName(target) {
  loginId.innerText = target.loginId;
  nickname.innerText = target.nickname;
} //设置昵称与账号(初始化)

async function chatHistory() {
  const currentUser = await currentUserInfo().then((resp) => resp.data);
  const history = await API.getHistory().then((resp) => {
    for (const key of resp.data) {
      let url,
        isMe = "";
      if (key.from === currentUser.loginId) {
        url = imgs.me;
        isMe = "me";
      } else {
        url = imgs.robot;
      }
      sendMsg(key.content, url, isMe);
    }
  });
  setName(currentUser);
} //聊天记录(初始化)

async function init() {
  chatHistory();
}
init();
// 事件
sendFrom.onsubmit = async function (e) {
  e.preventDefault();
  const val = txtMsg.value;
  sendMsg(val, imgs.me, "me");
  txtMsg.value = "";
  const resp = await API.sendChat(val).then((resp) => {
    const robotMsg = createMsgHtml(resp.data.content, imgs.robot);
    chatContainer.innerHTML += robotMsg;
    spacingFn();
  });
};

close.onclick = function () {
  location.href = "./login.html";
  API.loginOut();
}; //注销
