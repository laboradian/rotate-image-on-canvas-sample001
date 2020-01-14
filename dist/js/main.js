console.log('%c 🌈 Laboradian.com 🌈 %c http://laboradian.com ',
  'background: #2383BF; color: #fff; font-size: 1.4em;',
  'background: #e3e3e3; color: #000; margin-bottom: 1px; padding-top: 4px; padding-bottom: 1px;');

const THRESHOLD_WIDTH = 500;
const SCREEN_WIDTH = $(window).width();

const IMG_WIDTH = 100;
const IMG_HEIGHT = 100;
const MARGIN_H = 50;
const MARGIN_V = 80;
const COLUMN_NUM = (SCREEN_WIDTH > THRESHOLD_WIDTH) ? 5 : 2;
console.log('COLUMN_NUM =', COLUMN_NUM);

window.addEventListener('load', () => {
    const VERT_NUM = 1 + (Math.ceil(12/COLUMN_NUM));
    const canvas = document.querySelector('#screen');
    canvas.width = (IMG_WIDTH * COLUMN_NUM) + (MARGIN_H * (COLUMN_NUM + 1));
    canvas.height = (IMG_HEIGHT * VERT_NUM) + (MARGIN_V * (VERT_NUM + 1));

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
                x: IMG_WIDTH + MARGIN_H,
                y: MARGIN_V
            };
            ctx.fillText('回転', origin.x + MARGIN_H, origin.y - 25);
            ctx.clearRect(origin.x + 20, origin.y - 25, 160, 160);
            drawRotatedImage(img, origin.x + IMG_WIDTH, origin.y + 50, angle);
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
