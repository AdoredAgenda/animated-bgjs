(()=>{var t={302:(t,i,e)=>{const s=e(311);t.exports=class{constructor(t,i,e=150,s=200,n=this.canvas.height/2,o=.017,a=0,h={r:0,g:100,b:100,a:.01},r=!0){this.canvas=i,this.context=t,this.maxAmplitude=e,this.wavelength=s,this.y_position=n-e/2,this.frequency=o,this.angle=a,this.start_from_zero=r,this.x_position,this.color=h,this.x_position=r?0:this.canvas.width}rotateCoordinates(t,i){const e=this.angle*Math.PI/180,s=t-this.x_position,n=i-this.y_position;return{x:s*Math.cos(e)-n*Math.sin(e)+this.x_position,y:s*Math.sin(e)+n*Math.cos(e)+this.y_position}}calculateY(t,i){return this.y_position-Math.sin(t/this.wavelength+i)*this.maxAmplitude*Math.sin(i)}sinWave(t){this.canvas.width;const{r:i,g:e,b:n,a:o}=this.color;this.context.strokeStyle=`rgba(${i},${e},${n},${o})`,this.context.beginPath();const a=this.canvas.width/Math.cos(this.angle*Math.PI/180)+2*this.maxAmplitude*Math.cos(this.angle*Math.PI/180);for(let i=0==this.angle?0:-this.maxAmplitude/Math.sin(this.angle*Math.PI/180)*this.angle/Math.abs(this.angle);i<a;i+=30){const e=i,n=this.calculateY(i,t),o=this.rotateCoordinates(e,n).x,a=this.rotateCoordinates(e,n).y;s(o,a,this.context)}for(let i=a-30;i<a;i+=1){const e=i,n=this.calculateY(i,t),o=this.rotateCoordinates(e,n).x,a=this.rotateCoordinates(e,n).y;s(o,a,this.context)}}}},311:t=>{t.exports=function(t,i,e){e.lineTo(t,i),e.stroke()}}},i={};function e(s){var n=i[s];if(void 0!==n)return n.exports;var o=i[s]={exports:{}};return t[s](o,o.exports,e),o.exports}(()=>{const t=e(302);window.AnimatedBg=class{constructor(t,i,e,s,n){if(!(t instanceof HTMLCanvasElement))throw new Error("Expected a canvas element as the first argument");if("number"!=typeof i||"number"!=typeof e)throw new Error(`Expected typeof height and width: number, got: ${typeof i}, ${typeof i}`);if(!("object"==typeof s&&null!==s&&"r"in s&&"g"in s&&"b"in s))throw new Error("Expected a valid bgColor object with  keys: r, g, b");if(!(Number.isInteger(s.r)&&s.r>=0&&s.r<=255&&Number.isInteger(s.g)&&s.g>=0&&s.g<=255&&Number.isInteger(s.b)&&s.b>=0&&s.b<=255))throw new Error("The keys r, g, b of the bgColor object must have a value between 0 and 255");this.canvas=t,this.canvas.height=i,this.canvas.width=e,this.bgColor=s,this.context,this.increment=n,this.frequency=.01}init(){this.context=this.canvas.getContext("2d"),this.context.fillStyle=`rgb(${this.bgColor.r},${this.bgColor.g},${this.bgColor.b})`,this.context.fillRect(0,0,this.canvas.width,this.canvas.height),this.context.fill(),this.increment=0}sinWaveBg(i,e,s,n,o,a,h){const r=new t(this.context,this.canvas,i,e,s,n,o,a,h);this.animate.bind(this)(r)}animate(t){const i=this,e=t;i.increment=0,function t(){e.sinWave(i.increment),requestAnimationFrame(t),i.context.fillStyle=`rgba(${i.bgColor.r},${i.bgColor.g},${i.bgColor.b},0.03)`,i.context.fillRect(0,0,i.canvas.width,i.canvas.height),i.context.fill(),i.increment+=e.frequency}()}}})()})();