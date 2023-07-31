import Masonry from 'masonry-layout'
import imagesLoaded from "imagesloaded";
import './public/css/style.css';
import 'babel-polyfill';

function importAll(r){
    return r.keys().map(r).slice(0,10);
}

const images = importAll(require.context('./public/pic', false, /\.(jpe?g|png|gif)$/));
//console.log(images);
document.addEventListener('DOMContentLoaded', function(){
    const grid = document.querySelector('.grid');
    const masonry = new Masonry(grid, {
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        percentPosition: true,
        transitionDuration: '0.8s',
        gutter:5
    });

    //在这里没有能够触发on progress事件
    images.forEach(image => {
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
        
        
    });

    imagesLoaded(grid).on('done', function(){
       
        //console.log(masonry)
        //masonry.reloadItems();
        masonry.layout();
    });
    
});


const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
}
const observer = new IntersectionObserver(callback, options);
function callback(entries, observer){
    entries.forEach(entry => {
        if (entry.isIntersecting){
            loadMoreImages();
        }
    });
}

let target = document.querySelector('.grid');
observer.observe(target);
function loadMoreImages(){
    
}
//const grid = document.querySelector('.grid');

