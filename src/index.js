
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
    });
    images.forEach(image => {
        const item = document.createElement('div');
        item.className = 'grid-item';
        
        const  img = document.createElement('img');
        img.onload = function(){
            grid.appendChild(item);
            masonry.appended(item);

        };
        img.src = image.default || image;
        item.appendChild(img);
    });
    //在这里没有能够触发on progress事件
    imagesLoaded(grid).on( 'progress', function( instance, image ) {
        var result = image.isLoaded ? 'loaded' : 'broken';
        console.log( 'image is ' + result + ' for ' + image.img.src );
      });
});

