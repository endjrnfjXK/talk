//

const loginSubmit = $(".user-form");

const loginIdValidator = new FieldValidertor("txtLoginId", function (val) {
  return msgInfo(val, MSG_KEY + "账号");
});

const loginPwdValidator = new FieldValidertor("txtLoginPwd", function (val) {
  return msgInfo(val, MSG_KEY + "密码");
});

async function All() {
  return [
    await loginIdValidator.validata(),
    await loginPwdValidator.validata(),
  ].every((resp) => resp === true);
} //点击登录时触发全部验证

loginSubmit.onsubmit = async function (e) {
  e.preventDefault();
  const loginId = loginIdValidator.inp.value,
    loginPwd = loginPwdValidator.inp.value;
  if (await All()) {
    const resp = await API.login({ loginId, loginPwd }).then((resp) => {
      console.log(resp);
      if (resp.code === 0) {
        location.href = "./index.html";
        return;
      }
      loginIdValidator.p.innerText = resp.msg;
    });
  }
};
