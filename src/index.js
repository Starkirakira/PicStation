import Masonry from 'masonry-layout'
import imagesLoaded from "imagesloaded";
import './public/css/style.css';
import 'babel-polyfill';
import {Notyf} from 'notyf';
import 'notyf/notyf.min.css';
import icon from './public/icon/bottom.png';
import imgBegin1 from './public/images/long_size_nature2.jpg';
import imgBegin2 from './public/images/long_size_nature1.jpg';

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
const img = document.createElement('img');
img.className = 'begin-img';
function importAll(r){
    return r.keys().map(r);
}
const imageArr = [imgBegin1,imgBegin2];
img.src = imageArr[Math.floor(Math.random()*imageArr.length)]; // 替换为你的图片路径
img.alt = 'Welcome';

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

observer.observe(sentinel);
function loadMoreImages(){
    if (isLoading) {
        return;
    }
    if(currentEnd === images.length) {
            notyf.open({ type: 'info', message: '没有了喵😿' });
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
    
}
//const grid = document.querySelector('.grid');

