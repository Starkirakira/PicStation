import Masonry from "masonry-layout";
import imagesLoaded from 'imagesloaded';

function importAll(r) { 
    return r.keys().map(r);
}

const images = importAll(require, context('./public/pic', false, /\.(jpe?g|png|gif)$/));