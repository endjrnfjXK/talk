// 用户登录和注册的表单项验证的通用代码

/**
 * 对某一个表单项进行验证的构造函数
 */
class FieldValidertor {
  /**
   * 构造器
   * @param {String} txtId 文本框id
   * @param {Function} validertorFn 验证规则函数，当需要对该文本框进行验证时，会调用该函数。函数的参数为当前文本框的值，函数的返回值为验证错误消息，若没用返回，则无错误
   */
  constructor(txtId, validertorFn) {
    this.inp = $(`#${txtId}`);
    this.validertorFn = validertorFn;
    this.p = this.inp.nextElementSibling;

    this.inp.onblur = () => {
      this.validata();
    };
  }

  /**
   * 验证，成功返回true，失败返回false
   */
  async validata() {
    const err = await this.validertorFn(this.inp.value);
    if (err) {
      this.p.innerText = err;
      return false;
    } else {
      this.p.innerText = "";
      return true;
    }
  }
}

function msgInfo(val, msg) {
  if (!val) {
    return msg;
  }
}

const MSG_KEY = "请填写";
