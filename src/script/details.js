import { jstool, $, ajax, bufferMove } from './tools.js';




//放大镜效果
class Mglass {
    constructor() {
        this.scale = $('.p_left .scale');
        this.spic = $('.scale .spic')
        this.sf = $('.spic .sf');
        this.bf = $('.scale .bf');
        this.bpic = $('.scale .bpic');
        this.product = $('.product ');

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
        this.btn_left = $('.left_nav .btn_left');
        this.btn_right = $('.left_nav .btn_right');
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
            lis[0].firstElementChild.style.border = ` 1px solid #ca141d`;
            _this.imgswitch(lis);
            this.leftbtn(lis);
            this.rightbtn(lis);

        })
    }


    //点击小图切换 

    imgswitch(lis) {
        console.log(lis);
        let _this = this;
        for (let i = 0; i < lis.length; i++) {
            lis[i].onmouseover = function() {
                for (let j = 0; j < lis.length; j++) {
                    lis[j].firstElementChild.style.border = 0;
                }


                _this.obj.spic.firstElementChild.src = this.children[0].firstElementChild.src;
                _this.obj.bpic.src = this.children[0].firstElementChild.src;
                this.firstElementChild.style.border = ` 1px solid #ca141d`;
            }

        }

    }

    //点击左箭头切换图片
    leftbtn(lis) {
            let _this = this;
            this.btn_left.onclick = function() {
                let ulleft = _this.ul.offsetLeft;
                let num = lis[0].offsetWidth;
                if (ulleft >= 0) {
                    num = 0;
                    bufferMove(_this.ul, { left: 0 });
                }
                bufferMove(_this.ul, { left: ulleft + num });
            }
        }
        //点击右箭头切换
    rightbtn(lis) {
        let _this = this;
        this.btn_right.onclick = function() {
            let ulleft = _this.ul.offsetLeft;
            let num = lis[0].offsetWidth;
            if (ulleft <= -num * (lis.length - 5)) {
                num = 0;
                bufferMove(_this.ul, { left: -num * (lis.length - 5) });
            }
            bufferMove(_this.ul, { left: ulleft - num });


        }
    }


}





//点击加入购物车


class Addcart {
    constructor() {
        this.sidarr = [];
        this.numarr = [];
        this.sid = location.search.substr(location.search.length - 1, 1);
        this.input = $('.stock input')
        this.btn = $('.buttonmain .btn-01');

    }
    init() {
        let _this = this;
        this.btn.onclick = function() {
            _this.addcart();
            if (confirm('购物车加入成功，是否进入购物车查看')) {
                location.href = 'cart.html'
            }
        }
    }

    //加入购物车
    addcart() {
        if (jstool.getcookie('numarr') && jstool.getcookie('sidarr')) {
            this.sidarr = jstool.getcookie('sidarr').split(',')
            this.numarr = jstool.getcookie('numarr').split(',')

        }
        if (this.sidarr.indexOf(this.sid) != -1) {
            let num = this.numarr[this.sidarr.indexOf(this.sid)];
            let sum = parseInt(num) + parseInt(this.input.value);
            this.numarr[this.sidarr.indexOf(this.sid)] = sum;
            jstool.addcookie('numarr', this.numarr, 30);

        } else {
            this.sidarr.push(this.sid);
            this.numarr.push(this.input.value);
            jstool.addcookie('sidarr', this.sidarr, 30);
            jstool.addcookie('numarr', this.numarr, 30);


        }

    }
}
export {
    Mglass,
    Cartrender,
    Addcart
}