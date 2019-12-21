import { $, ajax, bufferMove, jstool, rannum, addClass, removeClass, removeAll } from './tools.js';

//购物车
class Cart {
    constructor() {
        this.url = 'http://10.31.161.144/huawei/php/';
        this.list_pro = $('.list-pro');
        this.tool = $('.list-pro .totla_tool');
        this.t_span = $('.total_price span', 'all')[1];
        this.pricearr = [];
        this.numobj = $('.total_choose em');
    }
    init() {
        //判断cookie是否存在
        this.iscookie();
    }

    //判断cookie是否存在
    iscookie() {
        if (jstool.getcookie('sidarr') && jstool.getcookie('numarr')) {
            this.sidarr = jstool.getcookie('sidarr').split(',');
            this.numarr = jstool.getcookie('numarr').split(',');
            for (let i = 0; i < this.sidarr.length; i++) {
                this.cartrender(this.sidarr[i], this.numarr[i])
            }
        }
    }

    //渲染购物车
    cartrender(sid1, num) {
        let _this = this;
        let sid = sid1;
        ajax({
            url: this.url + 'cart.php',
            data: {
                sid: sid,
            },
            dataType: 'json',
        }).then(data => {
            let div = document.createElement('div')
            let str = '';
            str += `
            <div class="pro_list">
                <span class="checkbox l">
                    <input type="text" sid=${data.sid}>
                </span>
                <div class="pro_area l">
                    <div class="pro_main">
                        <a href="javascript:;">
                            <img src="${data.url}" alt="">
                        </a>
                        <ul class="l">
                            <li>
                                <a href="javascript:;" class="des">
                                    ${data.bdesc}</a>
                                <p>幻夜黑 全网通 6GB+64GB 官方标配</p>
                            </li>
                            <li>
                                <div class="li_price"><span>¥ ${data.price}.00</span></div>
                            </li>
                            <li>
                                <div class="p_stock">
                                    <a href="javascript:;" class="btn_left l" sid=${data.sid}> -</a>
                                    <input type="text" value="${num}" class="l">
                                    <a href="javascript:;" class="btn_right" sid=${data.sid}>+</a>
                                </div>
                            </li>
                            <li>
                                <div class="price_total">¥ ${num*data.price}.00
                                </div>
                            </li>
                            <li>
                                <span class="del" sid=${data.sid}>
                                    删除
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div class="pro_server">
                        <div class="server_list">
                            <div class="server_info l">
                                <span class="checkbox">
                                    <input type="text">
                                </span>
                                <div class="server_name">
                                    <span>碎屏(含后盖)服务宝1年</span>
                                </div>
                                <div class="server_price">
                                    <span>¥169.00</span>
                                </div>
                            </div>
                            <div class="server_link r">
                                <a href="javascript:;">了解详情</a>
                            </div>
                        </div>
                    </div>
                    <div class="pro_server">
                        <div class="server_list">
                            <div class="server_info l">
                                <span class="checkbox">
                                    <input type="text">
                                </span>
                                <div class="server_name">
                                    <span>延长服务保</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
            div.innerHTML = str;
            div.sid = data.sid;
            _this.list_pro.insertBefore(div, _this.list_pro.children[0]);
            let sid = data.sid;

            // 全选按钮
            let checkbox1 = $('.list_title .checkbox input');
            let checkbox3 = _this.list_pro.querySelectorAll('.pro_list>.checkbox>input');
            let checkbox4 = $('.totla_tool .checkbox input');
            //默认选中状态
            for (let i = 0; i < checkbox3.length; i++) {
                checkbox3[i].flag = true;
                checkbox3[i].style.backgroundPosition = '0 -129px';
            }
            //复选框点击
            if (this.sidarr.length == checkbox3.length) {
                for (let i = 0; i < checkbox3.length; i++) {
                    checkbox3[i].onclick = function() {
                        let str = this.parentNode.nextElementSibling.firstElementChild.children[1].children[3].firstElementChild.innerHTML;
                        if (this.flag == true) {
                            this.flag = false;


                            if (_this.ischecked(checkbox3)) {
                                checkbox1.flag = true;
                                checkbox4.flag = true;
                                checkbox1.style.backgroundPosition = '0 -129px';
                                checkbox4.style.backgroundPosition = '0 -129px';
                            } else {
                                checkbox1.flag = false;
                                checkbox4.flag = false;
                                checkbox1.style.backgroundPosition = '-18px -129px';
                                checkbox4.style.backgroundPosition = '-18px -129px';
                            }
                            _this.checkedchange_1(str.substring(2, str.indexOf('.')), this.getAttribute('sid'))
                        } else if (this.flag == false) {
                            this.flag = true;
                            if (_this.ischecked(checkbox3)) {
                                checkbox1.flag = true;
                                checkbox4.flag = true;
                                checkbox1.style.backgroundPosition = '0 -129px';
                                checkbox4.style.backgroundPosition = '0 -129px';
                            } else {
                                checkbox1.flag = false;
                                checkbox4.flag = false;
                                checkbox1.style.backgroundPosition = '-18px -129px';
                                checkbox4.style.backgroundPosition = '-18px -129px';
                            }
                            _this.checkedchange_2(str.substring(2, str.indexOf('.')), this.getAttribute('sid'));

                        }
                        if (this.flag == true) {
                            this.style.backgroundPosition = '0 -129px';
                        } else if (this.flag == false) {
                            this.style.backgroundPosition = '-18px -129px';
                        }
                    }
                }
            }

            //默认全选
            checkbox1.flag = true;
            checkbox4.flag = true;
            checkbox1.style.backgroundPosition = '0 -129px';
            checkbox4.style.backgroundPosition = '0 -129px';

            // 全选按钮点击
            _this.ischecked_1(checkbox1, checkbox4, checkbox3);
            _this.ischecked_1(checkbox4, checkbox1, checkbox3);

            //总计元素
            let t_price = $('.price_total');

            //减少按钮
            let btn_right = $('.btn_right');

            //增加按钮
            let btn_left = $('.btn_left');

            //单价元素
            let li_price = $('.li_price').firstElementChild;

            //删除按钮元素

            let del = $('.pro_main .del');

            //点击删除该商品
            del.onclick = function() {
                let str = this.parentNode.previousElementSibling.firstElementChild.innerHTML;
                if (confirm('你确定要删除吗')) {
                    _this.checkedchange_1(str.substring(2, str.indexOf('.')), this.getAttribute('sid'));
                    _this.list_pro.removeChild(this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode);
                    let index = _this.sidarr.indexOf(this.getAttribute('sid'));
                    _this.sidarr.splice(index, 1);
                    _this.numarr.splice(index, 1);
                    jstool.addcookie('sidarr', _this.sidarr, 30);
                    jstool.addcookie('numarr', _this.numarr, 30);
                }
            }

            //右按钮点击增加数量
            btn_right.onclick = function() {
                _this.addnum(this, t_price, li_price, this.getAttribute('sid'));
                _this.t_change(t_price.innerHTML.substring(2, t_price.innerHTML.indexOf('.')), this.getAttribute('sid'));
            }

            //左箭头点击减少数量
            btn_left.onclick = function() {
                _this.reducenum(this, t_price, li_price, this.getAttribute('sid'));
                _this.t_change(t_price.innerHTML.substring(2, t_price.innerHTML.indexOf('.')), this.getAttribute('sid'));
            }

            _this.totalprice(t_price.innerHTML.substring(2, t_price.innerHTML.indexOf('.')), sid);
            _this.numobj.innerHTML = this.pricearr.length;
        })
    }

    //全选按钮点击
    ischecked_1(obj, other, others) {
        let _this = this;
        obj.onclick = function() {
            if (this.flag == true) {
                this.flag = false;
            } else if (this.flag == false) {
                this.flag = true;
            }
            if (this.flag == true) {
                this.style.backgroundPosition = '0 -129px';
                other.style.backgroundPosition = '0 -129px';
                other.flag = true;
                _this.addchecked(others);
                for (let i = 0; i < others.length; i++) {
                    let str = others[i].parentNode.nextElementSibling.firstElementChild.children[1].children[3].firstElementChild.innerHTML;
                    _this.checkedchange_2(str.substring(2, str.indexOf('.')), others[i].getAttribute('sid'))

                }
            } else if (this.flag == false) {
                this.style.backgroundPosition = '-18px -129px';
                other.style.backgroundPosition = '-18px -129px';
                other.flag = false;
                _this.clearchecked(others);
                for (let i = 0; i < others.length; i++) {
                    let str = others[i].parentNode.nextElementSibling.firstElementChild.children[1].children[3].firstElementChild.innerHTML;
                    _this.checkedchange_1(str.substring(2, str.indexOf('.')), others[i].getAttribute('sid'));
                }
            }
        }
    }

    //判断是否选择状态
    ischecked(objs) {
        let num = 0;
        for (let i = 0; i < objs.length; i++) {
            if (objs[i].flag == false) {
                num = 1;
            }
        }
        if (num == 0) {
            return true;
        }
        if (num = 1) {
            return false;
        }

    }

    //清除选择状态
    clearchecked(obj) {
        for (let i = 0; i < obj.length; i++) {
            obj[i].flag = false;
            if (obj[i].flag == false) {
                obj[i].style.backgroundPosition = '-18px -129px';
            }
        }
    }

    addchecked(obj) {
        for (let i = 0; i < obj.length; i++) {
            obj[i].flag = true;
            if (obj[i].flag == true) {
                obj[i].style.backgroundPosition = '0 -129px';
            }
        }
    }

    //右按钮点击增加数量 并改变当前总价
    addnum(obj, priceobj, uprice, sid) {
        let price = uprice.innerHTML.substring(2, uprice.innerHTML.indexOf('.'))
        let num = parseInt(obj.previousElementSibling.value) + 1
        obj.previousElementSibling.value = num;
        priceobj.innerHTML = `¥ ${num*price}.00 `;
        obj.previousElementSibling.previousElementSibling.style.cursor = 'pointer'
            //添加cookie
        this.numarr[this.sidarr.indexOf(sid)] = num.toString();
        jstool.addcookie('numarr', this.numarr, 30);
    }


    //左按钮点击减少数量 并改变当前总价
    reducenum(obj, priceobj, uprice, sid) {
        let price = uprice.innerHTML.substring(2, uprice.innerHTML.indexOf('.'))
        let num = parseInt(obj.nextElementSibling.value) - 1;
        if (num <= 1) {
            num = 1;
            obj.style.cursor = ' no-drop';
        } else {
            obj.style.cursor = 'pointer'
        }
        obj.nextElementSibling.value = num;
        priceobj.innerHTML = `¥ ${num*price}.00 `;
        this.numarr[this.sidarr.indexOf(sid)] = num.toString();
        jstool.addcookie('numarr', this.numarr, 30)

    }

    //计算总价
    totalprice(price, sid) {
        this.pricearr.push([price, sid]);
        //价格数组赋值完 赋值给页面总价
        if (this.pricearr.length === this.sidarr.length) {
            //赋值总价
            this.addtprice();
        }
    }

    //未选择状态删除该项
    checkedchange_1(price, sid) {
        let num = 0;
        for (let i = 0; i < this.pricearr.length; i++) {
            if (price == this.pricearr[i][0]) {
                this.pricearr.splice(i, 1);
                this.addtprice()
            }
        }

    }

    //选择状态添加该项
    checkedchange_2(price, sid) {
        let num = 0;
        for (let i = 0; i < this.pricearr.length; i++) {
            if (this.pricearr[i][1] == sid) {
                num = 1;
            }
        }
        if (num == 0) {
            this.pricearr.push([price, sid]);
        }
        this.addtprice();
    }

    //点击左右按钮总价变化
    t_change(price, sid) {
        for (let i = 0; i < this.pricearr.length; i++) {
            if (sid == this.pricearr[i][1]) {
                this.pricearr[i][0] = price;
                this.addtprice();
            }
        }

    }

    //赋值总价
    addtprice() {
        let sum = 0;
        for (let i = 0; i < this.pricearr.length; i++) {
            sum += parseInt(this.pricearr[i][0]);
        }
        this.t_span.innerHTML = `¥  ${sum}.00`;
        this.numobj.innerHTML = this.pricearr.length;
    }
}
export {
    Cart
}