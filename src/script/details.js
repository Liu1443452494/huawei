import { jstool, $, ajax } from './tools.js';




//放大镜效果
class Mglass {
    constructor() {
        this.scale = $('.p_left .scale');
        this.spic = $('.scale .spic')
        this.sf = $('.spic .sf');
        this.bf = $('.scale .bf');
        this.bpic = $('.scale .bpic');
        this.product = $('.product');

    }
    init() {
        let _this = this;


        //小图移入效果
        this.spic.onmouseover = function() {
            _this.over();
        }

        //小图移出效果
        this.spic.onmouseout = function() {
            _this.out();
        }


    }

    //小图移入 小放/大放=小图/大图
    over() {
        let _this = this;
        this.sf.style.visibility = 'visible';
        this.bf.style.visibility = 'visible';

        this.sf.style.width = this.spic.offsetWidth * this.bf.offsetWidth / this.bpic.offsetWidth + 'px';
        this.sf.style.height = this.spic.offsetHeight * this.bf.offsetHeight / this.bpic.offsetHeight + 'px';
        this.bili = this.bf.offsetWidth / this.sf.offsetWidth;

        this.spic.onmousemove = function(ev) {
            var ev = ev || event;
            _this.move(ev);
        }


    }

    //小图移出

    out() {
        this.sf.style.visibility = 'hidden';
        this.bf.style.visibility = 'hidden';
    }

    move(ev) {

        let l = ev.clientX - this.scale.offsetLeft - this.product.offsetLeft - this.sf.offsetWidth / 2;
        let t = ev.clientY - this.scale.offsetTop - this.product.offsetTop - this.sf.offsetHeight / 2;

        if (l <= 0) {
            l = 0;
        } else if (l >= this.spic.offsetWidth - this.sf.offsetWidth - 2) {
            l = this.spic.offsetWidth - this.sf.offsetWidth - 2;
        }

        if (t <= 0) {
            t = 0;
        } else if (t >= this.spic.offsetHeight - this.sf.offsetHeight - 2) {
            t = this.spic.offsetHeight - this.sf.offsetHeight - 2;
        }

        this.sf.style.left = l + 'px';
        this.sf.style.top = t + 'px';
        this.bpic.style.left = -l * this.bili + 'px';
        this.bpic.style.top = -t * this.bili + 'px';
    }


}
new Mglass().init();




//购物车渲染

class Cartrender {
    constructor() {
        this.sid = location.search.substr(location.search.length - 1, 1);
        this.url = 'http://10.31.161.144/huawei/php/';
        this.h1 = $('.contnet_meta h1');
        this.span = $('.m_span span');
        this.price = $('.info_price span', 'all');
        this.ul = $('.left_list ul');
        this.obj = new Mglass();




    }
    init() {
            //获取数据并渲染
            this.getdata();



        }
        //获取数据并渲染
    getdata() {
        let _this = this;
        ajax({
            url: this.url + 'details.php',
            data: {
                sid: this.sid
            },
            dataType: 'json'
        }).then(data => {
            let dataarr = data.urls.split(',')

            _this.obj.spic.firstElementChild.src = dataarr[0]
            _this.obj.bpic.src = dataarr[0];
            _this.h1.innerHTML = data.bdesc;
            _this.span.innerHTML = data.btips;
            _this.price[1].innerHTML = `￥${data.price}.00`;
            let str = '';
            for (let value of dataarr) {
                str += `
                <li>
                <a href="javascript:;">
                    <img src="${value}" alt="">
                </a>
            </li>
                `;
            }
            _this.ul.innerHTML = str;




            //点击小图切换
            let lis = $('li', 'all', this.ul);
            _this.imgswitch(lis)
        })
    }


    //点击小图切换 

    imgswitch(lis) {
        for (let i = 0; i < lis.length; i++) {
            lis[i].onmouseover = function() {

            }
        }

    }
}
new Cartrender().init();