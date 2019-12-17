import { $, ajax, bufferMove, jstool, rannum, addClass, removeClass, removeAll } from './tools.js';


//表单验证
class Formvalidator {
    constructor() {
        this.inputs = $('form input', 'all');
        this.matips = $('.matips')
        this.matips_3 = $('.matips_3')
        this.m1_left = $('.m1_left')
        this.m1_right = $('.m1_right')

    }
    init() {
            let _this = this;
            console.log(this.matips);
            this.inputs[0].onblur = function() {
                _this.validator(this);
            }
            this.inputs[1].onblur = function() {
                _this.pvalidator(this);
                _this.matips.style.display = 'none'
            }
            this.inputs[2].onblur = function() {
                _this.confirmpassword(this);
            }



            this.inputs[1].oninput = function() {
                this.parentNode.style.border = 0;
                this.parentNode.children[2].innerHTML = '';
                _this.matips.style.display = 'block';
                _this.matips_3.style.borderBottom = 0;
                _this.matips_3.innerHTML = '密码强度：';
                let reg1 = /^(\w){8,}$/
                let reg3 = /[a-zA-Z]/g
                if (this.value !== '') {
                    if (reg1.test(this.value)) {
                        _this.m1_left.style.color = 'rgb(55, 204, 14)';
                        if (reg3.test(this.value)) {
                            _this.m1_right.style.color = 'rgb(55, 204, 14)';
                            _this.matips_3.innerHTML = '密码强度：强';
                            _this.matips_3.borderBottom = `4px solid rgb(55, 204, 14)`;
                        }
                    }
                }
            }

            this.inputs[0].oninput = function() {
                let reg = /[a-zA-z]/g
                if (reg.test(this.value)) {
                    setTimeout(() => {
                        this.value = this.value.substr(0, this.value.length - 1)
                    }, 100)

                }
                this.parentNode.style.border = 0;
                this.parentNode.children[2].innerHTML = '';
            }

            this.inputs[2].oninput = function() {
                this.parentNode.style.border = 0;
                this.parentNode.children[2].innerHTML = '';
            }

        }
        //手机号验证
    validator(obj) {

        let reg = /^1[3578]\d{9}$/;
        if (obj.value !== '') {
            if (reg.test(obj.value)) {

            } else {
                obj.parentNode.style.border = '1px solid red';
                obj.parentNode.children[2].innerHTML = '手机号码不正确';

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
                    } else {
                        obj.parentNode.style.border = '1px solid red';
                        obj.parentNode.children[2].innerHTML = '至少包含字母和数字，不能包含空格';
                    }
                } else {
                    obj.parentNode.style.border = '1px solid red';
                    obj.parentNode.children[2].innerHTML = '至少包含8个字符';
                }
            }
        }
        //确认密码
    confirmpassword(obj) {
        if (obj.value !== '') {
            if (obj.value == this.inputs[1].value) {

            } else {
                obj.parentNode.style.border = '1px solid red';
                obj.parentNode.children[2].innerHTML = '密码与确认密码不一致';
            }
        }
    }

}
new Formvalidator().init();