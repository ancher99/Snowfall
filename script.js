const canvas =document.getElementById('game')
const ctx = canvas.getContext('2d')

const ground = new Image();
ground.src='field.png'

const snowflake = new Image();
snowflake.src='snow.png'

let man = new Image();
man.src='man.png'

const moveup = new Image();
moveup.src='moveup.png'

const moveleft = new Image();
moveleft.src='moveleft.png'

const moveright = new Image();
moveright.src='moveright.png'

let sprite = new Image();
sprite.src='fire.png'

let over =new Image();
over.src='over.png'

let snowField =new Image();
snowField.src='snowField.png'


   
let score=0
let fireTime=0;
let timer=100;
let number=0;
let groundSnow=0;
let box=64;
let snow=[];
let placeSnow={
    x:5*box,
    y:5*box,
};
let placeSnowX=placeSnow.x;
let placeSnowY=placeSnow.y;



let fire ={
   x:Math.floor((Math.random() *8+1))*box,
   y:Math.floor((Math.random() *8+1))*box,
 };

document.addEventListener('keydown', direction);
function direction(event){
 if(event.keyCode ==37){
    if(placeSnowX===64){
     return
    }else{
     placeSnowX-=box
     man.src='moveleft.png'
    }
            
 }else  if(event.keyCode ==38){
    if(placeSnowY===64){
     return  
    }else{
     placeSnowY-=box
     man.src='moveup.png'
    }
 }else  if(event.keyCode ==39){
    if(placeSnowX===512){
     return
    }else{
     placeSnowX+=box
     man.src='moveright.png'
    }
 }else  if(event.keyCode ==40){
    if(placeSnowY===512){
        return
    }else{
     placeSnowY+=box
     man.src='man.png'
    }
 }
};

document.addEventListener('keydown', clearSnow);
function clearSnow(event){
 if(event.keyCode ===32){
    for(let i=0; i<snow.length; i++){
     if(placeSnowX===snow[i].x && placeSnowY===snow[i].y){
      delete snow[i].x;
      delete snow[i].y;
      groundSnow-=1;
      score+=1;

     }
    }      
 }
};

let stopDrowGround
let stopDrowPerson
let stopDrowSnowFall
let stopDrowFire
request()
function request(){
   
stopDrowGround=requestAnimationFrame(drowGround);
stopDrowPerson=requestAnimationFrame(drowPerson);
stopDrowSnowFall=requestAnimationFrame(drowSnowFall)
stopDrowFire=requestAnimationFrame(drowFire)

}


 let a=  setInterval(time,15000)
 let b=  setInterval(()=>{fireTime+=2},2000)





function drowGround(){
   ctx.drawImage(ground,0,0);
   number+=1
  
     if(number>timer){
       number=0
        if(groundSnow===64){
           cancelAnimationFrame(stopDrowGround)
           gameOver()
          }else{
            groundSnow+=1;
      const nu=rules()
      snow.push(nu)
      requestAnimationFrame(drowGround);
       for(let i=0; i<snow.length; i++){
         ctx.drawImage(snowflake,snow[i].x,snow[i].y)
       }  
  
     }   
      return
     }else{
        requestAnimationFrame(drowGround);
      for(let i=0; i<snow.length; i++){
       ctx.drawImage(snowflake,snow[i].x,snow[i].y)
        if(groundSnow===64){
        cancelAnimationFrame(stopDrowGround)
      
        gameOver()
       
    }    
   } 
 }
}

function drowPerson(){
   
   ctx.drawImage(man,placeSnowX,placeSnowY);
   if(groundSnow===64){
      
      cancelAnimationFrame(stopDrowPerson)
    
     
  }  else{
   requestAnimationFrame(drowPerson);
  }
 
}

function drowFire(){
   if(fireTime>=20){
      ctx.drawImage(sprite,fire.x,fire.y)
     
      
    if(placeSnowX == fire.x && placeSnowY == fire.y) {
		
		fire ={
         x:Math.floor((Math.random() *8+1))*box,
         y:Math.floor((Math.random() *8+1))*box,

       };
       
       fireTime=0;
       timer+=10
       numSnowflakes -= 50;
       cancelAnimationFrame(stopDrowFire)
   }
    }

    ctx.fillStyle='black'
    ctx.font='50px Arimo'
    ctx.fillText(score,390,675)
    
    
    if(groundSnow===64){
     
      cancelAnimationFrame(stopDrowFire) 
  }else{
   requestAnimationFrame(drowFire) 
  }

}

function time(){
   timer-=10;
   quantitySnow()   
 }






function rules(){
 let positionSnow ={
  x:Math.floor((Math.random() *8+1))*box,
  y:Math.floor((Math.random() *8+1))*box,
};
 for(let k=0; k<snow.length; k++){
    if(snow[k].x===positionSnow.x){
     if(snow[k].y===positionSnow.y){
      return rules();
   }
  }
 }
 return positionSnow
};






let numSnowflakes = 50; 
let snowflakes=[]
for (let i = 0; i < numSnowflakes; i++) {
   snowflakes.push({
    x: Math.random() * canvas.width,
    y: Math.random() * 622,
    radius: Math.random() * 7, 
    speed: Math.random() * 1 
   });
}
  
function copy(){
   snowflakes = [];
   for (let i = 0; i < numSnowflakes; i++) {
      snowflakes.push({
       x: Math.random() * canvas.width,
       y: Math.random() * 622,
       radius: Math.random() * 7, 
       speed: Math.random() * 1 
      });
   }
}


   function quantitySnow(){
      numSnowflakes += 100;
      for (let i = 0; i < numSnowflakes; i++) {
         snowflakes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * 622,
          radius: Math.random() * 7, 
          speed: Math.random() * 1 
         });
        }
   }





   

function drawSnow() {
   if(groundSnow===64){
      cancelAnimationFrame(stopDrowSnowFall)
      return
     }  

 ctx.fillStyle = "white";
 ctx.beginPath();

  for (let i = 0; i < numSnowflakes; i++) {
   let snowflake = snowflakes[i];
    ctx.moveTo(snowflake.x, snowflake.y);
    ctx.arc(snowflake.x, snowflake.y, snowflake.radius, 0, Math.PI * 2, true);
 }

 ctx.fill();
 moveSnow();
}

function moveSnow() {
   
 for (let i = 0; i < numSnowflakes; i++) {
  let snowflake = snowflakes[i];
  snowflake.y += snowflake.speed;

  if (snowflake.y > 622) {
    snowflake.y = 0;
  }
 }
}

function drowSnowFall() {
   requestAnimationFrame(drowSnowFall);
   drawSnow();
}
let as
function gameOver(){
   
   numSnowflakes = 0;
   ctx.drawImage(snowField,0,0)
   ctx.drawImage(over,128,128)
   ctx.fillStyle='black'
    ctx.font='50px Arimo'
    ctx.fillText(score,390,675)

    for(let i=0; i<localStorage.length; i++) {
      let key = localStorage.key(i);
      if(localStorage.getItem(key)==='0'){
        localStorage.setItem(key,score)
      }
}
}
  
let mouse={
   x:0,
   y:0
}
canvas.addEventListener('click', mouseClick)

function mouseClick (event) {
   const rect=canvas.getBoundingClientRect();
   mouse.x=event.clientX-rect.left;
   mouse.y=event.clientY-rect.top;
  
if(mouse.x>565 && mouse.y>630){
   request()
   restart ()
  
}else if(mouse.x<75 && mouse.y>625){
  window.history.back ();
  
}
}

function restart(){
   location. reload()
}








