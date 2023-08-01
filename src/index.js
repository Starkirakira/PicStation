import Masonry from 'masonry-layout'
import imagesLoaded from "imagesloaded";
import './public/css/style.css';
import 'babel-polyfill';
import {Notyf} from 'notyf';
import 'notyf/notyf.min.css';

function importAll(r){
    return r.keys().map(r).slice(0,40);
}
const grid = document.querySelector('.grid');
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
    rootMargin: '100px',
    threshold: 1.0
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
    if(nextEnd === images.length) {
            notyf.open({ type: 'info', message: '没有了喵😿' });
    }
    currentEnd = nextEnd;
    isLoading = false;
    


}
//const grid = document.querySelector('.grid');

