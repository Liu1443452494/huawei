import { $, ajax, bufferMove, rannum, addClass, removeClass, removeAll, jstool } from './tools.js';
//登录
class Login {
    constructor() {
        this.inputs = $('form input', 'all');
        this.btn = $('form .button')
        this.p = $('form .first')
        this.tips = $('form .tips')
    }
    init() {
        let _this = this;
        //判断cookie是否存在 存在记住密码
        this.isCookie()
            //登录验证
        this.verify();
        //输入提示消失
        this.inputs[0].oninput = function() {
            _this.p.style.display = 'none';

        }
    }

    //判断cookie是否存在 存在记住密码
    isCookie() {
        if (jstool.getcookie('username') && jstool.getcookie('password')) {
            this.inputs[0].value = jstool.getcookie('username');
            this.inputs[1].value = jstool.getcookie('password');
            this.inputs[2].checked = 'checked';
        }
    }

    //点击登录验证
    verify() {
        let _this = this;
        this.btn.onclick = function() {
            if (_this.inputs[0].value == '') {
                _this.p.style.display = 'block';
                _this.tips.innerHTML = '请输入你的账号'
            } else {
                let reg1 = /^(\w){8,}$/
                if (reg1.test(_this.inputs[0].value)) {
                    if (_this.inputs[1].value == '') {
                        _this.p.style.display = 'block';
                        _this.tips.innerHTML = '请输入你的密码'
                    } else {
                        ajax({
                            url: 'http://10.31.161.144/huawei/php/login.php',
                            data: {
                                username: _this.inputs[0].value,
                                password: _this.inputs[1].value
                            },
                            type: 'post'
                        }).then(data => {
                            if (data) {
                                if (_this.inputs[2].checked) {
                                    jstool.addcookie('username', _this.inputs[0].value, 10);
                                    jstool.addcookie('password', _this.inputs[1].value, 10);
                                } else {
                                    jstool.delcookie('username');
                                    jstool.delcookie('password');

                                }

                                alert('登录成功');
                                jstool.addcookie('username1', _this.inputs[0].value, 1);
                                jstool.addcookie('login', true, 1)


                                location.href = 'index.html'
                            } else {
                                _this.p.style.display = 'block';
                                _this.tips.innerHTML = '账号或密码错误'
                            }
                        })

                    }
                } else {
                    _this.p.style.display = 'block';
                    _this.tips.innerHTML = '华为帐号限制在4~80 个字符'
                }
            }
        }
    }
}
export {
    Login
}