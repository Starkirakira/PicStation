import Masonry from 'masonry-layout'
import imagesLoaded from "imagesloaded";
import './public/css/style.css';
import 'babel-polyfill';
import {Notyf} from 'notyf';
import 'notyf/notyf.min.css';
import icon from './public/icon/bottom.png';
import imgBegin from './public/images/longsize begin.jpg';

let link = document.querySelector('link[rel="icon"]');
if(!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
}
link.href = icon;

const grid = document.querySelector('.grid');
const header = document.createElement('header');
header.className = 'img-header';
const h1 = document.createElement('h1');
h1.textContent = '欢迎来到我的图站';
const p = document.createElement('p');
p.textContent = '在这里，你可以浏览到各种精美的图片，希望你喜欢！';
const img = document.createElement('img');
img.className = 'begin-img';
function importAll(r){
    return r.keys().map(r).slice(0,40);
}
img.src = imgBegin; // 替换为你的图片路径
img.alt = 'Welcome';

header.appendChild(h1);
header.appendChild(p);
header.appendChild(img);

// 在 .grid 元素前插入新创建的 header 元素
grid.parentNode.insertBefore(header, grid);

const masonry = new Masonry(grid, {
    itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
    percentPosition: true,
    transitionDuration: '0.8s',
    gutter:5
});
const images = importAll(require.context('./public/pic', false, /\.(jpe?g|png|gif)$/));
const notyf = new Notyf({
    duration: 5000,
    position: {
        x: 'center',
        y: 'top',
    },
    types: [
        {
            type: 'info',
            icon: false,
        }
    ]
});
let currentEnd = 10;
let isLoading = false;
function loadImages(sindex, eindex) {
    for (let i = sindex; i < eindex; i++) {
        const image = images[i];
        const item = document.createElement('div');
        item.className = 'grid-item';
        const  img = document.createElement('img');
        img.src = image.default || image;
        item.appendChild(img);
        img.onload = function(){
            grid.appendChild(item);
            masonry.appended(item);
            //masonry.layout();
        };
    }
}

//console.log(images);
document.addEventListener('DOMContentLoaded', function(){
   
    //循环插入图片和图片容器
    loadImages(0, 10);

    imagesLoaded(grid).on('done', function(){
       
        //console.log(masonry)
        //masonry.reloadItems();
        masonry.layout();
    });
    
});

let sentinel = document.createElement('div');
sentinel.className = 'sentienel';
document.body.appendChild(sentinel);



const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
}
let loaded = false;
window.addEventListener('load', () => {
    loaded = true;
});
const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && loaded) {
        loadMoreImages();
    }
}, options);

//let target = document.querySelector('.grid');
observer.observe(sentinel);
function loadMoreImages(){
    if (isLoading) {
        return;
    }
    isLoading = true;
    let nextEnd = currentEnd + 10;
    if(nextEnd > images.length) {
        nextEnd = images.length;
    }
    loadImages(currentEnd, nextEnd);
    currentEnd = nextEnd;
   
    isLoading = false;
    if(nextEnd === images.length) {
        notyf.open({ type: 'info', message: '没有了喵😿' });
}


}
//const grid = document.querySelector('.grid');

