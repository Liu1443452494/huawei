//轮播图切换

class Carousel {
    constructor() {
        this.url = 'http://10.31.161.144/huawei/php/';
        this.carousel_banner = document.querySelector('.carousel_banner');
        this.list_div = document.querySelector('.list_div .slide_list ');
        this.leftbtn = document.querySelector('.button_left')
        this.rightbtn = document.querySelector('.button_right');
        this.timer = null;
        this.carousel = document.querySelector('#carousel');
    }
    init() {
            let _this = this;
            ajax({
                url: this.url + 'carousel.php',
                dataType: 'json',
            }).then(data => {
                console.log(_this.list_div);
                let str = '';
                let str1 = '';
                for (let value of data) {
                    str += `<img src="${value.url}" alt="">`
                    str1 += `<span></span>`
                }
                _this.carousel_banner.innerHTML += str;
                _this.list_div.innerHTML = str1;
                let imgs = _this.carousel_banner.querySelectorAll('img');
                imgs[0].className = 'show';
                let spans = _this.list_div.querySelectorAll('span');
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
                _this.removeAll(spans);
                _this.removeAll(imgs);
                _this.addClass(this, 'active');
                _this.addClass(imgs[i], 'show');
                num = i;
            }
        }
        //右箭头点击效果
        this.rightbtn.onclick = function() {
            if (num >= 5) {
                num = -1;
            }
            num++;
            _this.removeAll(spans);
            _this.removeAll(imgs);
            _this.addClass(spans[num], 'active');
            _this.addClass(imgs[num], 'show');
        }

        //左箭头点击效果
        this.leftbtn.onclick = function() {
            if (num <= 0) {
                num = 6;
            }
            num--;
            _this.removeAll(spans);
            _this.removeAll(imgs);
            _this.addClass(spans[num], 'active');
            _this.addClass(imgs[num], 'show');
        }


        //左箭头移入移出效果
        this.leftbtn.onmouseover = function() {
            this.style['background-position'] = '-240px -72px';
        }
        this.leftbtn.onmouseout = function() {
            this.style.backgroundPosition = '0 -72px';
        }


        //右箭头移入移出效果
        this.rightbtn.onmouseover = function() {
            this.style['background-position'] = '-158px -72px';
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
                console.log(_this.list_div);
            }, 3000)
            this.carousel.onmouseover = function() {
                clearInterval(_this.timer)
            }
            this.carousel.onmouseout = function() {
                _this.timer = setInterval(function() {
                    _this.rightbtn.onclick();
                }, 1000)
            }
        }
        //添加类名
    addClass(obj, name) {
            obj.className = name;
        }
        //移除类名
    removeClass(obj) {
            obj.removeAttribute('class')
        }
        //移除所有类名
    removeAll(objs) {
        for (let i = 0; i < objs.length; i++) {
            objs[i].className = '';
        }
    }


}
export {
    Carousel
};