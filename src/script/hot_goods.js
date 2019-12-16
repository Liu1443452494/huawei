//热销单品渲染

class Hotgoods {
    constructor() {
        this.url = 'http://localhost/huawei/php/';
        this.leftLi = document.querySelector('.hot_goods .list_left li');
        this.rightLi = document.querySelectorAll('.hot_goods .list_right li');
        this.topContent = document.querySelector('.topContent_2')

    }
    init() {
        let _this = this;
        ajax({
            url: this.url + 'hot_goods.php',
            dataType: 'json',
        }).then(data => {
            for (let value of data) {
                let str = '';
                if (value.title && value.price) {
                    str = `
                    <a href="">
                    <p class="grid_img">
                        <img src="${value.url}" alt="">
                    </p>
                    <p class="grid_title">${value.title}</p>
                    <p class="grid_desc">${value.desc} </p>
                    <p class="grid_price">¥${value.price}</p>`
                    if (value.tips) {
                        str += ` <p class="grid_tips">
                        <span>${value.tips}</span>
                    </p>`
                    }
                    _this.rightLi[value.sid - 2].innerHTML = str;
                    _this.hgoodshover(_this.rightLi[value.sid - 2]);
                } else {
                    _this.leftLi.innerHTML = ` <a href=""><img src="${value.url}" alt=""></a>`;
                    _this.hgoodshover(_this.leftLi);
                }


            }

        })
    }



    //鼠标移入移出效果
    hgoodshover(obj) {
            let _this = this;
            obj.onmouseover = function() {
                _this.addClass(this);
            }
            obj.onmouseout = function() {
                _this.removeClass(this);
            }



        }
        //添加类名
    addClass(obj) {
            obj.className = 'li_shadow';
        }
        //移除类名
    removeClass(obj) {
        obj.removeAttribute('class')
    }
}
export {
    Hotgoods
};