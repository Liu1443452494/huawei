let id = document.querySelector('script').id;
//首页模块
import { Hotgoods } from './hot_goods.js';
import { Carousel, Panels } from './carousel.js';
import { Advertisingclosed } from './nav.js';

//登录页模块
import { Login } from './login.js';

//注册页模块
import { Formvalidator } from './register.js';

//详情页模块

import { Mglass, Cartrender, Addcart } from './details.js';

//购物车模块
import { Cart } from './cart.js';


console.log(id);

if (id == 'index') {
    new Hotgoods().init();
    new Carousel().init();
    new Panels().init();
    new Advertisingclosed().init();
}
if (id == 'login') {
    new Login().init();
}

if (id == 'register') {
    new Formvalidator().init();
}
if (id == 'details') {
    new Mglass().init();
    new Cartrender().init();
    new Addcart().init();
}
if (id == 'cart') {
    new Cart().init();
}