console.log("%c 🌈 Laboradian.com 🌈 %c http://laboradian.com ","background: #2383BF; color: #fff; font-size: 1.4em;","background: #e3e3e3; color: #000; margin-bottom: 1px; padding-top: 4px; padding-bottom: 1px;");const IMG_WIDTH=100,IMG_HEIGHT=100,MARGIN_H=50,MARGIN_V=80,COLUMN_NUM=5;window.addEventListener("load",()=>{const e=document.querySelector("#screen");e.width=850,e.height=980;const t=Math.PI/180,o=function(e,o,n,r){a.save(),a.translate(o,n),a.rotate(r*t),a.drawImage(e,-e.width/2,-e.height/2),a.restore()};let n={x:50,y:80};const a=e.getContext("2d");a.font="bold 18px Verdana, '游ゴシック', YuGothic",a.fillStyle="green";const r=new Image;let i,d,c,l;r.addEventListener("load",()=>{for(a.fillText("元の画像",n.x,n.y-20),a.drawImage(r,n.x,n.y),i=0;i<12;i++)d=i%5,c=parseInt(i/5),l=30*(i+1),o(r,(n={x:50+100*d+50*(d+1),y:50+100*(c+1)+80*(c+2)}).x,n.y,l),a.fillText(`${l}°`,n.x-50,n.y-70);let e=0;const t=()=>{n={x:100,y:870},a.fillText("回転",n.x-50,n.y-80),a.clearRect(n.x-80,n.y-80,160,160),o(r,n.x,n.y,e),e>360?e=0:e+=1,window.requestAnimationFrame(t)};window.requestAnimationFrame(t)}),r.src="./img/icon.png"});