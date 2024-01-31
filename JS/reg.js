const loginIdValidator = new FieldValidertor("txtLoginId", async function (
  val
) {
  const result = await API.exists(val);
  if (result.data) {
    return "账号已存在";
  }
  return msgInfo(val, MSG_KEY + "账号");
});

const nicknameValidator = new FieldValidertor("txtNickname", function (val) {
  return msgInfo(val, MSG_KEY + "昵称");
});

const loginPwdValidator = new FieldValidertor("txtLoginPwd", function (val) {
  return msgInfo(val, MSG_KEY + "密码");
});

const loginPwdConfirmValidator = new FieldValidertor(
  "txtLoginPwdConfirm",
  function (val) {
    const loginPwd = loginPwdValidator.inp.value;
    if (this.inp.value !== loginPwd && val) {
      return "两次密码不一致";
    }
    return msgInfo(val, "请确认密码");
  }
);

const regSubmit = $(".user-form");

async function All() {
  return [
    await loginIdValidator.validata(),
    await nicknameValidator.validata(),
    await loginPwdValidator.validata(),
    await loginPwdConfirmValidator.validata(),
  ].every((resp) => resp === true);
} //点击注册时触发全部验证

regSubmit.onsubmit = async function (e) {
  e.preventDefault();
  const loginId = loginIdValidator.inp.value,
    nickname = nicknameValidator.inp.value,
    loginPwd = loginPwdValidator.inp.value;
  // loginPwdConfirm = loginPwdConfirmValidator.inp.value;

  if (await All()) {
    const regResult = await API.reg({
      loginId,
      nickname,
      loginPwd,
    }).then((resp) => {
      if (resp.code === 0) {
        location.href = "./login.html";
      } else {
        loginIdValidator.p.innerText = resp.msg;
      }
      return resp;
    });
    console.log(regResult, "注册");
  }
};
