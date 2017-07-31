/* global */
import '../../node_modules/bootstrap-sass/assets/javascripts/bootstrap.js';
import 'babel-polyfill'

//import _ from 'lodash'

// index.html ファイルをコピーする
require('file-loader?name=../../dist/[name].[ext]!../index.html');

require('file-loader?name=../../dist/img/[name].[ext]!../img/icon.png');
require('file-loader?name=../../dist/img/[name].[ext]!../img/rotate-image-on-canvas.png');

console.log('%c 🌈 Laboradian.com 🌈 %c http://laboradian.com ',
  'background: #2383BF; color: #fff; font-size: 1.4em;',
  'background: #e3e3e3; color: #000; margin-bottom: 1px; padding-top: 4px; padding-bottom: 1px;');


const IMG_WIDTH = 100;
const IMG_HEIGHT = 100;
const MARGIN_H = 50;
const MARGIN_V = 80;
const COLUMN_NUM = 6;

window.addEventListener('load', () => {
    const canvas = document.querySelector('#screen');
    canvas.width = (IMG_WIDTH * 6) + (MARGIN_H * 7);
    canvas.height = (IMG_HEIGHT * 4) + (MARGIN_V * 5);

    const TO_RADIANS = Math.PI/180;
    const drawRotatedImage = function(image, x, y, angle) {
        ctx.save();
        //ctx.translate(x + (image.width/2), y + (image.height/2));
        ctx.translate(x, y);
        ctx.rotate(angle * TO_RADIANS);
        ctx.drawImage(image, -(image.width/2), -(image.height/2));
        ctx.restore();
    }

    let origin = {x: MARGIN_H, y: MARGIN_V};
    const ctx = canvas.getContext('2d');
    ctx.font = "bold 18px Verdana, '游ゴシック', YuGothic";
    ctx.fillStyle = "green";
    const img = new Image();
    let i, ix, iy, angle_tmp;
    img.addEventListener('load', () => {

        // 元の画像
        ctx.fillText('元の画像', origin.x, origin.y - 20);
        ctx.drawImage(img, origin.x, origin.y);

        for (i=0; i<12; i++) {
            ix = i % COLUMN_NUM;
            iy = parseInt(i / COLUMN_NUM);
            angle_tmp = 30 * (i + 1);

            origin = {
                x: (IMG_WIDTH/2) + (IMG_WIDTH * ix) + (MARGIN_H * (ix + 1)),
                y: (IMG_HEIGHT/2) + (IMG_HEIGHT * (iy + 1)) + (MARGIN_V * (iy + 2))
            };
            drawRotatedImage(img, origin.x, origin.y, angle_tmp);
            ctx.fillText(`${angle_tmp}°`, origin.x - (IMG_WIDTH/2), origin.y - (IMG_HEIGHT/2 + 20));
        }

        let angle = 0;
        const step = (/*timestamp*/) => {
            origin = {
                x: (IMG_WIDTH/2) + MARGIN_H,
                y: (IMG_HEIGHT/2) + (IMG_HEIGHT * 3) + (MARGIN_V * 4) + 20
            };
            ctx.fillText('回転', origin.x - (IMG_WIDTH/2), origin.y - (IMG_HEIGHT/2 + 30));
            ctx.clearRect(origin.x - 80, origin.y - 80, 160, 160);
            drawRotatedImage(img, origin.x, origin.y, angle);
            if (angle > 360) {
                angle = 0;
            } else {
                angle += 1.0;
            }
            window.requestAnimationFrame(step);
        };
        window.requestAnimationFrame(step);
    });
    img.src = './img/icon.png';
});
