//关闭广告
class Advertisingclosed {
    constructor() {
        this.adversting = document.querySelector('#adversting');
        this.btn = document.querySelector('#adversting a')
    }
    init() {
        let _this = this;
        this.btn.onclick = function() {
            _this.adversting.style.display = 'none';
        }
    }
}



export {
    Advertisingclosed
}