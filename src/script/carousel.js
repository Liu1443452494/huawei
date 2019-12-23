//导入模块
import { $, ajax, bufferMove, jstool, rannum, addClass, removeClass, removeAll } from './tools.js';

//轮播图渲染和切换

class Carousel {
    constructor() {
        this.url = 'http://10.31.161.144/huawei/php/';
        this.carousel_banner = $('.carousel_banner');
        this.list_div = $('.list_div .slide_list');
        this.leftbtn = $('.button_left');
        this.rightbtn = $('.button_right');
        this.timer = null;
        this.carousel = $('#carousel');
        this.topcontnet = $('.topContent_2');
        this.login_url = $('.login_url');


    }
    init() {
            //判断登录状态
            if (jstool.getcookie('login')) {
                let str = jstool.getcookie('username1');
                let str1 = str.substr(0, 4);
                let str2 = str.substr(7.4);
                console.log(str2);
                this.login_url.innerHTML = `
                您好！ &nbsp;<a href="login.html">${str1} </a>
                                <span>****</span><a href="register.html">${str2}</a>`
            } else {
                this.login_url.innerHTML = `
                您好！请 &nbsp;<a href="login.html">登录 </a>
                <span>&nbsp;/&nbsp;</span><a href="register.html">注册</a>
                `
            }

            let _this = this;
            ajax({
                url: this.url + 'carousel.php',
                dataType: 'json',
            }).then(data => {
                let str = '';
                let str1 = '';
                for (let value of data) {
                    str += `<img src="${value.url}" alt="">`
                    str1 += `<span></span>`
                }
                _this.carousel_banner.innerHTML += str;
                _this.list_div.innerHTML = str1;
                let imgs = $('img', 'all', _this.carousel_banner)
                imgs[0].className = 'show';
                let spans = $('span', 'all', _this.list_div);
                spans[0].className = 'active';
                _this.bannerSwitch(imgs, spans);
            })
            this.autoplay();
        }
        //轮播图切换效果
    bannerSwitch(imgs, spans) {
        let _this = this;
        let num = 0;
        for (let i = 0; i < spans.length; i++) {
            spans[i].onmouseover = function() {
                removeAll(spans, 'active');
                removeAll(imgs, 'show');
                addClass(this, 'active');
                addClass(imgs[i], 'show');
                num = i;
            }
        }
        //右箭头点击效果
        this.rightbtn.onclick = function() {
            if (num >= 5) {
                num = -1;
            }
            num++;
            removeAll(spans, 'active');
            removeAll(imgs, 'show');
            addClass(spans[num], 'active');
            addClass(imgs[num], 'show');
        }

        //左箭头点击效果
        this.leftbtn.onclick = function() {
            if (num <= 0) {
                num = 6;
            }
            num--;
            removeAll(spans, 'active');
            removeAll(imgs, 'show');
            addClass(spans[num], 'active');
            addClass(imgs[num], 'show');
        }


        //左箭头移入移出效果
        this.leftbtn.onmouseover = function() {
            this.style.backgroundPosition = '-240px -72px';
        }
        this.leftbtn.onmouseout = function() {
            this.style.backgroundPosition = '0 -72px';
        }


        //右箭头移入移出效果
        this.rightbtn.onmouseover = function() {
            this.style.backgroundPosition = '-158px -72px';
        }
        this.rightbtn.onmouseout = function() {
            this.style.backgroundPosition = '-78px -72px';
        }
    }

    //自动轮播
    autoplay() {
        let _this = this;
        this.timer = setInterval(function() {
            _this.rightbtn.onclick();

        }, 3000)
        this.carousel.onmouseover = function(e) {
            clearInterval(_this.timer)
        }
        this.carousel.onmouseout = function() {
            _this.timer = setInterval(function() {
                _this.rightbtn.onclick();
            }, 1000)
        }
    }

}


//导航栏渲染和效果

class Panels {
    constructor() {
        this.url = 'http://10.31.161.144/huawei/php/';
        this.lis = $('.carousel_list>ul>li', 'all');
        this.panels = $('.carousel_list>ul>li .li_panels', 'all');

    }
    init() {
            let _this = this;


            ajax({
                url: this.url + 'c_panels.php',
                dataType: 'json',

            }).then(data => {
                for (let i = 0; i < _this.panels.length; i++) {
                    let str = '';
                    for (let value of data) {
                        if (parseInt(value.type) == i) {
                            str += '<ul>'
                            let arr = value.urls.split(',');
                            let arr1 = value.title.split(',')
                            for (let i = 0; i < arr.length; i++) {
                                str += ` <li>
                                        <a href="">
                                            <img src="${arr[i]}" alt="">
                                            <span>${arr1[i]}</span>
                                        </a>
                                    </li>`
                            }
                            str += `</ul>`
                        }

                    }
                    if (str !== '') {
                        str += ` <ul class="sub_list">
                        <li><a href="">查看全部</a></li>
                    </ul>`
                    }

                    _this.panels[i].innerHTML = str;
                    _this.bewidth(_this.panels[i])

                }
            })
            this.navshow()
        }
        //确定二级导航宽度
    bewidth(obj) {
        if (obj.children.length == 2) {
            obj.style.width = '200px'
        }

        if (obj.children.length == 5) {
            obj.style.width = '1020px'
        }
        if (obj.children.length == 0) {
            obj.style.display = 'none';
        }
    }

    //鼠标移入移出显示隐藏二级导航
    navshow() {
        let _this = this
        for (let i = 0; i < this.lis.length; i++) {
            this.lis[i].onmouseover = function() {
                removeAll(_this.lis, 'active');
                removeAll(_this.panels, 'show');
                addClass(_this.lis[i], 'active');
                addClass(_this.panels[i], 'show');
            }
            this.lis[i].onmouseout = function() {
                removeAll(_this.lis, 'active');
                removeAll(_this.panels, 'show');

            }


        }
    }


}


export {
    Carousel,
    Panels
};