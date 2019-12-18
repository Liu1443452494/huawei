import { $, ajax, bufferMove, jstool, rannum, addClass, removeClass, removeAll } from './tools.js';

//表单验证 注册提交
class Formvalidator {
    constructor() {
        this.inputs = $('form input', 'all');
        this.matips = $('.matips')
        this.matips_3 = $('.matips_3')
        this.m1_left = $('.m1_left')
        this.m1_right = $('.m1_right')
        this.bgs = $('.last .bg', 'all')
        this.span1s = $('.last .span1', 'all')
        this.form = $('form');
        this.btn = $('form .button')
        this.flag1 = true
        this.flag2 = true
        this.flag3 = true

    }
    init() {
        let _this = this;
        //手机号框失去焦点验证
        this.inputs[0].onblur = function() {
                _this.isRegister(this);
            }
            //密码框失去焦点验证
        this.inputs[1].onblur = function() {
                _this.pvalidator(this);
                _this.matips.style.display = 'none'
            }
            //确认密码框失去焦点验证
        this.inputs[2].onblur = function() {
                _this.confirmpassword(this);
            }
            //密码框提示
        this.inputs[1].oninput = function() {
                _this.passwordTips(this)
            }
            //手机号填写禁止输入字母
        this.inputs[0].oninput = function() {
                _this.forbiddenLetters(this)
            }
            //确定密码输入提示消失
        this.inputs[2].oninput = function() {
                this.parentNode.style.border = 0;
                this.parentNode.children[2].innerHTML = '';
            }
            //出生日期结构渲染
        this.datatime();
        //年月日点击显示与隐藏
        this.showOrHide();
        //注册提交
        this.onsubmit();
    }

    //判断手机号是否已经注册
    isRegister(obj) {
        let _this = this
        if (this.validator(obj)) {
            ajax({
                    url: 'http://10.31.161.144/huawei/php/register.php',
                    data: {
                        user: this.inputs[0].value,

                    },
                    type: 'post'

                })
                .then(data => {
                    if (data) {
                        _this.flag1 = false;
                        _this.inputs[0].parentNode.style.border = '1px solid red';
                        _this.inputs[0].parentNode.children[2].innerHTML = '手机号码已经注册';

                    }
                })
        };
    }


    //密码框提示
    passwordTips(obj) {
        obj.parentNode.style.border = 0;
        obj.parentNode.children[2].innerHTML = '';
        this.matips.style.display = 'block';
        this.m1_right.style.color = '#333';
        this.m1_left.style.color = '#333';
        this.matips_3.style.borderBottom = 0;
        this.matips_3.innerHTML = '密码强度：';
        let reg1 = /^(\w){8,}$/
        let reg3 = /[a-zA-Z]/g
        if (obj.value !== '') {
            if (reg1.test(obj.value)) {
                this.m1_left.style.color = 'rgb(55, 204, 14)';
                if (reg3.test(obj.value)) {
                    this.m1_right.style.color = 'rgb(55, 204, 14)';
                    this.matips_3.innerHTML = '密码强度：强';
                    this.matips_3.style.borderBottom = `4px solid rgb(55, 204, 14)`;
                }
            }
        }
    }

    //手机号框禁止输入字母

    forbiddenLetters(obj) {
        let reg = /[a-zA-z]/g
        if (reg.test(obj.value)) {
            setTimeout(() => {
                obj.value = obj.value.substr(0, obj.value.length - 1)
            }, 100)
        }
        obj.parentNode.style.border = 0;
        obj.parentNode.children[2].innerHTML = '';
    }

    //手机号验证
    validator(obj) {
        let reg = /^1[3578]\d{9}$/;
        if (obj.value !== '') {
            if (reg.test(obj.value)) {
                this.flag1 = true
                return true
            } else {
                obj.parentNode.style.border = '1px solid red';
                obj.parentNode.children[2].innerHTML = '手机号码不正确';
                this.flag1 = false;

            }
        }
    }

    //密码验证
    pvalidator(obj) {
        let reg1 = /^(\w){8,}$/
        let reg3 = /[a-zA-Z]/g
        if (obj.value !== '') {
            if (reg1.test(obj.value)) {
                this.m1_left.style.color = 'rgb(55, 204, 14)';
                if (reg3.test(obj.value)) {
                    this.m1_right.style.color = 'rgb(55, 204, 14)';
                    this.matips_3.innerHTML = '密码强度：强';
                    this.flag2 = true

                } else {
                    obj.parentNode.style.border = '1px solid red';
                    obj.parentNode.children[2].innerHTML = '至少包含字母和数字，不能包含空格';
                    this.flag2 = false

                }
            } else {
                obj.parentNode.style.border = '1px solid red';
                obj.parentNode.children[2].innerHTML = '至少包含8个字符';
                this.flag2 = false

            }
        }
    }


    //确认密码
    confirmpassword(obj) {
        if (obj.value !== '') {
            if (obj.value == this.inputs[1].value) {
                this.flag3 = true

            } else {
                obj.parentNode.style.border = '1px solid red';
                obj.parentNode.children[2].innerHTML = '密码与确认密码不一致';
                this.flag3 = false;



            }
        }
    }

    //出生日期渲染
    datatime() {
        let _this = this
        _this.render(this.span1s[0], 2019, 1900);
        _this.render(this.span1s[1], 1, 12);
        _this.render(this.span1s[2], 1, 31);
        let str = this.span1s[0].parentNode.innerText.substr(0, 4);

    }

    //出生日期渲染
    render(obj, num1, num2) {
        let str = '';
        if (num1 > num2) {
            for (let i = num1; i >= num2; i--) {
                str += `<span>${i}</span>`
            }
            obj.innerHTML = str;
        } else {
            for (let i = num1; i <= num2; i++) {
                str += `<span>${i}</span>`
            }
            obj.innerHTML = str;
        }

        let spans = $('span', 'all', obj)
        for (let i = 0; i < spans.length; i++) {
            spans[i].onclick = function() {
                if (spans.length > 31) {
                    obj.parentNode.firstElementChild.innerHTML = spans[i].innerHTML + '年';
                    obj.style.display = 'none'
                } else if (spans.length > 31) {
                    obj.parentNode.firstElementChild.innerHTML = spans[i].innerHTML + '月'
                    obj.style.display = 'none'
                } else {
                    obj.parentNode.firstElementChild.innerHTML = spans[i].innerHTML + '日'
                    obj.style.display = 'none'
                }

            }
        }
    }

    //年月日显示与隐藏
    showOrHide() {
        let _this = this;
        for (let i = 0; i < this.bgs.length; i++) {
            this.bgs[i].onclick = function() {
                for (let j = 0; j < _this.span1s.length; j++) {
                    _this.span1s[j].style.display = 'none'
                }
                _this.span1s[i].style.display = 'block'
            }
        }
    }

    //注册提交
    onsubmit() {
        let _this = this;
        this.btn.onclick = function() {
            if (_this.inputs[0].value == '') {
                _this.inputs[0].parentNode.style.border = '1px solid red';
                _this.inputs[0].parentNode.children[2].innerHTML = '手机号码不能为空';
                _this.flag1 = false

                if (_this.inputs[1].value == '') {
                    _this.inputs[1].parentNode.style.border = '1px solid red';
                    _this.inputs[1].parentNode.children[2].innerHTML = '密码不能为空';
                    _this.flag2 = false

                    if (_this.inputs[2].value == '') {
                        _this.inputs[2].parentNode.style.border = '1px solid red';
                        _this.inputs[2].parentNode.children[2].innerHTML = '密码不能为空';
                        _this.flag3 = false

                    }
                }
            }

            if (!_this.flag1 || !_this.flag2 || !_this.flag3) {
                return false
            } else {
                let username = _this.inputs[0].value;
                let password = _this.inputs[1].value;
                ajax({
                    url: 'http://10.31.161.144/huawei/php/register.php',
                    data: {
                        username: username,
                        password: password
                    },
                    type: 'post',

                })
                alert('注册成功');
                location.reload(true)
            }

        }

    }

}
new Formvalidator().init();