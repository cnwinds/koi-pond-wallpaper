(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function t(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(r){if(r.ep)return;r.ep=!0;const a=t(r);fetch(r.href,a)}})();const xt=Math.PI/180,Gt=180/Math.PI,ie=[];for(let i=0;i<256;i++)ie[i]=(i<16?"0":"")+i.toString(16);function Kt(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,s=Math.random()*4294967295|0;return(ie[i&255]+ie[i>>8&255]+ie[i>>16&255]+ie[i>>24&255]+"-"+ie[e&255]+ie[e>>8&255]+"-"+ie[e>>16&15|64]+ie[e>>24&255]+"-"+ie[t&63|128]+ie[t>>8&255]+"-"+ie[t>>16&255]+ie[t>>24&255]+ie[s&255]+ie[s>>8&255]+ie[s>>16&255]+ie[s>>24&255]).toLowerCase()}const Ai=(i,e,t)=>Math.max(e,Math.min(t,i)),jr=(i,e)=>(i%e+e)%e,Pi=(i,e,t,s,r)=>s+(i-e)*(r-s)/(t-e),Ci=(i,e,t)=>i!==e?(t-i)/(e-i):0,Xr=(i,e,t)=>(1-t)*i+t*e,Ti=(i,e,t,s)=>Xr(i,e,1-Math.exp(-t*s)),Li=(i,e=1)=>e-Math.abs(jr(i,e*2)-e);function Fi(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Di(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}const Bi=(i,e)=>i+Math.floor(Math.random()*(e-i+1)),Ri=(i,e)=>i+Math.random()*(e-i),Ii=i=>i*(.5-Math.random());let Bs=1234567;function $i(i){i!==void 0&&(Bs=i);let e=Bs+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}const Ni=i=>i*xt,Ei=i=>i*Gt,Wi=i=>(i&i-1)===0&&i!==0,Oi=i=>Math.pow(2,Math.ceil(Math.log(i)/Math.LN2)),Ui=i=>Math.pow(2,Math.floor(Math.log(i)/Math.LN2));function Kr(i,e){switch(e.constructor){case Float32Array:case Float64Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:return i}}function Yr(i,e){switch(e.constructor){case Float32Array:case Float64Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:return i}}const Vi={normalize:Yr,denormalize:Kr,DEG2RAD:xt,RAD2DEG:Gt,generateUUID:Kt,clamp:Ai,euclideanModulo:jr,mapLinear:Pi,inverseLerp:Ci,lerp:Xr,damp:Ti,pingpong:Li,smoothstep:Fi,smootherstep:Di,randInt:Bi,randFloat:Ri,randFloatSpread:Ii,seededRandom:$i,degToRad:Ni,radToDeg:Ei,isPowerOfTwo:Wi,ceilPowerOfTwo:Oi,floorPowerOfTwo:Ui};class ee{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){return e===0?this.x=t:this.y=t,this}getComponent(e){return e===0?this.x:this.y}clone(){return new ee(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,s=this.y,r=e.elements;return this.x=r[0]*t+r[3]*s+r[6],this.y=r[1]*t+r[4]*s+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Math.max(e,Math.min(t,s)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());return t===0?Math.PI/2:Math.acos(Math.max(-1,Math.min(1,this.dot(e)/t)))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,s=this.y-e.y;return t*t+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,s){return this.x=e.x+(t.x-e.x)*s,this.y=e.y+(t.y-e.y)*s,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const s=Math.cos(t),r=Math.sin(t),a=this.x-e.x,n=this.y-e.y;return this.x=a*s-n*r+e.x,this.y=a*r+n*s+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}ee.prototype.isVector2=!0;class ye{constructor(e=0,t=0,s=0,r=1){this._x=e,this._y=t,this._z=s,this._w=r,this._onChangeCallback=Gi}static slerpFlat(e,t,s,r,a,n,h){const o=new ye().fromArray(s,r),l=new ye().fromArray(a,n);o.slerp(l,h).toArray(e,t)}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,s,r){return this._x=e,this._y=t,this._z=s,this._w=r,this._onChangeCallback(),this}clone(){return new ye(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}identity(){return this.set(0,0,0,1)}setFromEuler(e,t=!0){const s=e._x,r=e._y,a=e._z,n=e._order,h=Math.cos(s/2),o=Math.cos(r/2),l=Math.cos(a/2),c=Math.sin(s/2),u=Math.sin(r/2),f=Math.sin(a/2);switch(n){case"XYZ":this._x=c*o*l+h*u*f,this._y=h*u*l-c*o*f,this._z=h*o*f+c*u*l,this._w=h*o*l-c*u*f;break;case"YXZ":this._x=c*o*l+h*u*f,this._y=h*u*l-c*o*f,this._z=h*o*f-c*u*l,this._w=h*o*l+c*u*f;break;case"ZXY":this._x=c*o*l-h*u*f,this._y=h*u*l+c*o*f,this._z=h*o*f+c*u*l,this._w=h*o*l-c*u*f;break;case"ZYX":this._x=c*o*l-h*u*f,this._y=h*u*l+c*o*f,this._z=h*o*f-c*u*l,this._w=h*o*l+c*u*f;break;case"YZX":this._x=c*o*l+h*u*f,this._y=h*u*l+c*o*f,this._z=h*o*f-c*u*l,this._w=h*o*l-c*u*f;break;case"XZY":this._x=c*o*l-h*u*f,this._y=h*u*l-c*o*f,this._z=h*o*f+c*u*l,this._w=h*o*l+c*u*f;break;default:throw new Error("Quaternion.setFromEuler: unknown order "+n)}return t&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const s=t/2,r=Math.sin(s);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(s),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,s=t[0],r=t[4],a=t[8],n=t[1],h=t[5],o=t[9],l=t[2],c=t[6],u=t[10],f=s+h+u;if(f>0){const m=.5/Math.sqrt(f+1);this._w=.25/m,this._x=(c-o)*m,this._y=(a-l)*m,this._z=(n-r)*m}else if(s>h&&s>u){const m=2*Math.sqrt(1+s-h-u);this._w=(c-o)/m,this._x=.25*m,this._y=(r+n)/m,this._z=(a+l)/m}else if(h>u){const m=2*Math.sqrt(1+h-s-u);this._w=(a-l)/m,this._x=(r+n)/m,this._y=.25*m,this._z=(o+c)/m}else{const m=2*Math.sqrt(1+u-s-h);this._w=(n-r)/m,this._x=(a+l)/m,this._y=(o+c)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let s=e.x*t.x+e.y*t.y+e.z*t.z+1;return s<Number.EPSILON?(s=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=s):(this._x=0,this._y=-e.z,this._z=e.y,this._w=s)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=s),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Math.max(-1,Math.min(1,this.dot(e)))))}rotateTowards(e,t){const s=this.angleTo(e);return s===0?this:this.slerp(e,Math.min(1,t/s))}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this.lengthSq())}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const s=e._x,r=e._y,a=e._z,n=e._w,h=t._x,o=t._y,l=t._z,c=t._w;return this._x=s*c+n*h+r*l-a*o,this._y=r*c+n*o+a*h-s*l,this._z=a*c+n*l+s*o-r*h,this._w=n*c-s*h-r*o-a*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const s=this._x,r=this._y,a=this._z,n=this._w;let h=n*e._w+s*e._x+r*e._y+a*e._z,o=e._x,l=e._y,c=e._z,u=e._w;if(h<0&&(o=-o,l=-l,c=-c,u=-u,h=-h),h>=1)return this;const f=1-h*h;if(f<=Number.EPSILON){const x=1-t;return this._w=x*n+t*u,this._x=x*s+t*o,this._y=x*r+t*l,this._z=x*a+t*c,this.normalize()}const m=Math.sqrt(f),y=Math.atan2(m,h),d=Math.sin((1-t)*y)/m,v=Math.sin(t*y)/m;return this._w=n*d+u*v,this._x=s*d+o*v,this._y=r*d+l*v,this._z=a*d+c*v,this._onChangeCallback(),this}slerpQuaternions(e,t,s){return this.copy(e).slerp(t,s)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),s=Math.random(),r=Math.sqrt(1-s),a=Math.sqrt(s);return this.set(r*Math.sin(e),r*Math.cos(e),a*Math.sin(t),a*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this.set(e.getX(t),e.getY(t),e.getZ(t),e.getW(t))}_onChange(e){return this._onChangeCallback=e,this}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}function Gi(){}ye.prototype.isQuaternion=!0;const Rs=new ye;class k{constructor(e=0,t=0,s=0){this.x=e,this.y=t,this.z=s}set(e,t,s){return s===void 0&&(s=this.z),this.x=e,this.y=t,this.z=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){return e===0?this.x=t:e===1?this.y=t:this.z=t,this}getComponent(e){return e===0?this.x:e===1?this.y:this.z}clone(){return new k(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}applyEuler(e){return this.applyQuaternion(Rs.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Rs.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,s=this.y,r=this.z,a=e.elements;return this.x=a[0]*t+a[3]*s+a[6]*r,this.y=a[1]*t+a[4]*s+a[7]*r,this.z=a[2]*t+a[5]*s+a[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,s=this.y,r=this.z,a=e.elements,n=1/(a[3]*t+a[7]*s+a[11]*r+a[15]);return this.x=(a[0]*t+a[4]*s+a[8]*r+a[12])*n,this.y=(a[1]*t+a[5]*s+a[9]*r+a[13])*n,this.z=(a[2]*t+a[6]*s+a[10]*r+a[14])*n,this}applyQuaternion(e){const t=this.x,s=this.y,r=this.z,a=e.x,n=e.y,h=e.z,o=e.w,l=2*(n*r-h*s),c=2*(h*t-a*r),u=2*(a*s-n*t);return this.x=t+o*l+n*u-h*c,this.y=s+o*c+h*l-a*u,this.z=r+o*u+a*c-n*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,s=this.y,r=this.z,a=e.elements;return this.x=a[0]*t+a[4]*s+a[8]*r,this.y=a[1]*t+a[5]*s+a[9]*r,this.z=a[2]*t+a[6]*s+a[10]*r,this.normalize()}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Math.max(e,Math.min(t,s)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,s){return this.x=e.x+(t.x-e.x)*s,this.y=e.y+(t.y-e.y)*s,this.z=e.z+(t.z-e.z)*s,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const s=e.x,r=e.y,a=e.z,n=t.x,h=t.y,o=t.z;return this.x=r*o-a*h,this.y=a*n-s*o,this.z=s*h-r*n,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const s=e.dot(this)/t;return this.copy(e).multiplyScalar(s)}projectOnPlane(e){const t=this.dot(e)/(e.lengthSq()||1);return this.addScaledVector(e,-t)}reflect(e){return this.addScaledVector(e,-2*this.dot(e))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());return t===0?Math.PI/2:Math.acos(Math.max(-1,Math.min(1,this.dot(e)/t)))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,s=this.y-e.y,r=this.z-e.z;return t*t+s*s+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,s){const r=Math.sin(t)*e;return this.x=r*Math.sin(s),this.y=Math.cos(t)*e,this.z=r*Math.cos(s),this}setFromCylindricalCoords(e,t,s){return this.x=e*Math.sin(t),this.y=s,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),s=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.set(t,s,r)}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,s=Math.sqrt(1-t*t);return this.x=s*Math.cos(e),this.y=t,this.z=s*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}k.prototype.isVector3=!0;class G{constructor(e=0,t=0,s=0,r=1){this.x=e,this.y=t,this.z=s,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,s,r){return this.x=e,this.y=t,this.z=s,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){return this["xyzw"[e]]=t,this}getComponent(e){return this["xyzw"[e]]}clone(){return new G(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix4(e){const t=this.x,s=this.y,r=this.z,a=this.w,n=e.elements;return this.x=n[0]*t+n[4]*s+n[8]*r+n[12]*a,this.y=n[1]*t+n[5]*s+n[9]*r+n[13]*a,this.z=n[2]*t+n[6]*s+n[10]*r+n[14]*a,this.w=n[3]*t+n[7]*s+n[11]*r+n[15]*a,this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.dot(this)}length(){return Math.sqrt(this.dot(this))}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,s){return this.x=e.x+(t.x-e.x)*s,this.y=e.y+(t.y-e.y)*s,this.z=e.z+(t.z-e.z)*s,this.w=e.w+(t.w-e.w)*s,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}G.prototype.isVector4=!0;const Hi=2e3,Ve=2001,ss=new k,Ie=new k,kt=new k,fe=new k,qi=new ye,Is=new k(1,1,1),$s=new k;class U{constructor(e,t,s,r,a,n,h,o,l,c,u,f,m,y,d,v){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,s,r,a,n,h,o,l,c,u,f,m,y,d,v)}set(e,t,s,r,a,n,h,o,l,c,u,f,m,y,d,v){const x=this.elements;return x[0]=e,x[4]=t,x[8]=s,x[12]=r,x[1]=a,x[5]=n,x[9]=h,x[13]=o,x[2]=l,x[6]=c,x[10]=u,x[14]=f,x[3]=m,x[7]=y,x[11]=d,x[15]=v,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)}clone(){return new U().fromArray(this.elements)}copy(e){const t=this.elements,s=e.elements;for(let r=0;r<16;r++)t[r]=s[r];return this}copyPosition(e){const t=this.elements,s=e.elements;return t[12]=s[12],t[13]=s[13],t[14]=s[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1)}extractBasis(e,t,s){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),s.setFromMatrixColumn(this,2),this}makeBasis(e,t,s){return this.set(e.x,t.x,s.x,0,e.y,t.y,s.y,0,e.z,t.z,s.z,0,0,0,0,1)}extractRotation(e){const t=this.elements,s=e.elements,r=1/ss.setFromMatrixColumn(e,0).length(),a=1/ss.setFromMatrixColumn(e,1).length(),n=1/ss.setFromMatrixColumn(e,2).length();return t[0]=s[0]*r,t[1]=s[1]*r,t[2]=s[2]*r,t[3]=0,t[4]=s[4]*a,t[5]=s[5]*a,t[6]=s[6]*a,t[7]=0,t[8]=s[8]*n,t[9]=s[9]*n,t[10]=s[10]*n,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){return this.compose($s,qi.setFromEuler(e,!1),Is)}makeRotationFromQuaternion(e){return this.compose($s,e,Is)}lookAt(e,t,s){const r=this.elements;return fe.subVectors(e,t),fe.lengthSq()===0&&(fe.z=1),fe.normalize(),Ie.crossVectors(s,fe),Ie.lengthSq()===0&&(Math.abs(s.z)===1?fe.x+=1e-4:fe.z+=1e-4,fe.normalize(),Ie.crossVectors(s,fe)),Ie.normalize(),kt.crossVectors(fe,Ie),r[0]=Ie.x,r[4]=kt.x,r[8]=fe.x,r[1]=Ie.y,r[5]=kt.y,r[9]=fe.y,r[2]=Ie.z,r[6]=kt.z,r[10]=fe.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const s=e.elements,r=t.elements,a=this.elements,n=s[0],h=s[4],o=s[8],l=s[12],c=s[1],u=s[5],f=s[9],m=s[13],y=s[2],d=s[6],v=s[10],x=s[14],b=s[3],w=s[7],M=s[11],z=s[15],A=r[0],p=r[4],g=r[8],S=r[12],_=r[1],C=r[5],P=r[9],D=r[13],$=r[2],F=r[6],H=r[10],O=r[14],R=r[3],re=r[7],te=r[11],T=r[15];return a[0]=n*A+h*_+o*$+l*R,a[4]=n*p+h*C+o*F+l*re,a[8]=n*g+h*P+o*H+l*te,a[12]=n*S+h*D+o*O+l*T,a[1]=c*A+u*_+f*$+m*R,a[5]=c*p+u*C+f*F+m*re,a[9]=c*g+u*P+f*H+m*te,a[13]=c*S+u*D+f*O+m*T,a[2]=y*A+d*_+v*$+x*R,a[6]=y*p+d*C+v*F+x*re,a[10]=y*g+d*P+v*H+x*te,a[14]=y*S+d*D+v*O+x*T,a[3]=b*A+w*_+M*$+z*R,a[7]=b*p+w*C+M*F+z*re,a[11]=b*g+w*P+M*H+z*te,a[15]=b*S+w*D+M*O+z*T,this}multiplyScalar(e){const t=this.elements;for(let s=0;s<16;s++)t[s]*=e;return this}determinant(){const e=this.elements,t=e[0],s=e[4],r=e[8],a=e[12],n=e[1],h=e[5],o=e[9],l=e[13],c=e[2],u=e[6],f=e[10],m=e[14],y=e[3],d=e[7],v=e[11],x=e[15],b=f*x-m*v,w=u*x-m*d,M=u*v-f*d,z=c*x-m*y,A=c*v-f*y,p=c*d-u*y;return t*(h*b-o*w+l*M)-s*(n*b-o*z+l*A)+r*(n*w-h*z+l*p)-a*(n*M-h*A+o*p)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,s){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=s),this}invert(){const e=this.elements,t=e[0],s=e[1],r=e[2],a=e[3],n=e[4],h=e[5],o=e[6],l=e[7],c=e[8],u=e[9],f=e[10],m=e[11],y=e[12],d=e[13],v=e[14],x=e[15],b=t*h-s*n,w=t*o-r*n,M=t*l-a*n,z=s*o-r*h,A=s*l-a*h,p=r*l-a*o,g=c*d-u*y,S=c*v-f*y,_=c*x-m*y,C=u*v-f*d,P=u*x-m*d,D=f*x-m*v,$=b*D-w*P+M*C+z*_-A*S+p*g;if($===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const F=1/$;return e[0]=(h*D-o*P+l*C)*F,e[1]=(r*P-s*D-a*C)*F,e[2]=(d*p-v*A+x*z)*F,e[3]=(f*A-u*p-m*z)*F,e[4]=(o*_-n*D-l*S)*F,e[5]=(t*D-r*_+a*S)*F,e[6]=(v*M-y*p-x*w)*F,e[7]=(c*p-f*M+m*w)*F,e[8]=(n*P-h*_+l*g)*F,e[9]=(s*_-t*P-a*g)*F,e[10]=(y*A-d*M+x*b)*F,e[11]=(u*M-c*A-m*b)*F,e[12]=(h*S-n*C-o*g)*F,e[13]=(t*C-s*S+r*g)*F,e[14]=(d*w-y*z-v*b)*F,e[15]=(c*z-u*w+f*b)*F,this}scale(e){const t=this.elements;return t[0]*=e.x,t[4]*=e.y,t[8]*=e.z,t[1]*=e.x,t[5]*=e.y,t[9]*=e.z,t[2]*=e.x,t[6]*=e.y,t[10]*=e.z,t[3]*=e.x,t[7]*=e.y,t[11]*=e.z,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],s=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,s,r))}makeTranslation(e,t,s){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,s,0,0,0,1)}makeRotationX(e){const t=Math.cos(e),s=Math.sin(e);return this.set(1,0,0,0,0,t,-s,0,0,s,t,0,0,0,0,1)}makeRotationY(e){const t=Math.cos(e),s=Math.sin(e);return this.set(t,0,s,0,0,1,0,0,-s,0,t,0,0,0,0,1)}makeRotationZ(e){const t=Math.cos(e),s=Math.sin(e);return this.set(t,-s,0,0,s,t,0,0,0,0,1,0,0,0,0,1)}makeRotationAxis(e,t){const s=Math.cos(t),r=Math.sin(t),a=1-s,n=e.x,h=e.y,o=e.z,l=a*n,c=a*h;return this.set(l*n+s,l*h-r*o,l*o+r*h,0,l*h+r*o,c*h+s,c*o-r*n,0,l*o-r*h,c*o+r*n,a*o*o+s,0,0,0,0,1)}makeScale(e,t,s){return this.set(e,0,0,0,0,t,0,0,0,0,s,0,0,0,0,1)}makeShear(e,t,s,r,a,n){return this.set(1,s,a,0,e,1,n,0,t,r,1,0,0,0,0,1)}compose(e,t,s){const r=this.elements,a=t._x,n=t._y,h=t._z,o=t._w,l=a+a,c=n+n,u=h+h,f=a*l,m=a*c,y=a*u,d=n*c,v=n*u,x=h*u,b=o*l,w=o*c,M=o*u,z=s.x,A=s.y,p=s.z;return r[0]=(1-(d+x))*z,r[1]=(m+M)*z,r[2]=(y-w)*z,r[3]=0,r[4]=(m-M)*A,r[5]=(1-(f+x))*A,r[6]=(v+b)*A,r[7]=0,r[8]=(y+w)*p,r[9]=(v-b)*p,r[10]=(1-(f+d))*p,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,s){const r=this.elements;let a=Math.hypot(r[0],r[1],r[2]);const n=Math.hypot(r[4],r[5],r[6]),h=Math.hypot(r[8],r[9],r[10]);this.determinant()<0&&(a=-a),e.x=r[12],e.y=r[13],e.z=r[14];const o=ji.copy(this),l=o.elements,c=1/a,u=1/n,f=1/h;return l[0]*=c,l[1]*=c,l[2]*=c,l[4]*=u,l[5]*=u,l[6]*=u,l[8]*=f,l[9]*=f,l[10]*=f,t.setFromRotationMatrix(o),s.x=a,s.y=n,s.z=h,this}makePerspective(e,t,s,r,a,n,h=Ve,o=!0){const l=this.elements,c=2*a/(t-e),u=2*a/(s-r),f=(t+e)/(t-e),m=(s+r)/(s-r);let y,d;const v=n===1/0;if(o){if(h!==Ve)throw new Error("Matrix4.makePerspective: reversed depth requires WebGPU clip space");y=v?0:a/(n-a),d=v?a:n*a/(n-a)}else h===Ve?(y=v?-1:-n/(n-a),d=v?-a:-n*a/(n-a)):(y=v?-1:-(n+a)/(n-a),d=v?-2*a:-2*n*a/(n-a));return l[0]=c,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=u,l[9]=m,l[13]=0,l[2]=0,l[6]=0,l[10]=y,l[14]=d,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,s,r,a,n,h=Ve,o=!0){const l=this.elements,c=1/(t-e),u=1/(s-r),f=1/(n-a),m=(t+e)*c,y=(s+r)*u;let d,v;return o?(d=n*f,v=f):h===Ve?(d=-a*f,v=-f):(d=-(n+a)*f,v=-2*f),l[0]=2*c,l[4]=0,l[8]=0,l[12]=-m,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-y,l[2]=0,l[6]=0,l[10]=v,l[14]=d,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){for(let t=0;t<16;t++)if(this.elements[t]!==e.elements[t])return!1;return!0}fromArray(e,t=0){for(let s=0;s<16;s++)this.elements[s]=e[s+t];return this}toArray(e=[],t=0){const s=this.elements;for(let r=0;r<16;r++)e[t+r]=s[r];return e}}U.prototype.isMatrix4=!0;const ji=new U,Ns=new U,Es=new ye,Ye=i=>Math.max(-1,Math.min(1,i));class We{constructor(e=0,t=0,s=0,r=We.DEFAULT_ORDER){this._x=e,this._y=t,this._z=s,this._order=r,this._onChangeCallback=Xi}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,s,r=this._order){return this._x=e,this._y=t,this._z=s,this._order=r,this._onChangeCallback(),this}clone(){return new We(this._x,this._y,this._z,this._order)}copy(e){return this.set(e._x,e._y,e._z,e._order)}setFromRotationMatrix(e,t=this._order,s=!0){const r=e.elements,a=r[0],n=r[4],h=r[8],o=r[1],l=r[5],c=r[9],u=r[2],f=r[6],m=r[10],y=.9999999;switch(t){case"XYZ":this._y=Math.asin(Ye(h)),Math.abs(h)<y?(this._x=Math.atan2(-c,m),this._z=Math.atan2(-n,a)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ye(c)),Math.abs(c)<y?(this._y=Math.atan2(h,m),this._z=Math.atan2(o,l)):(this._y=Math.atan2(-u,a),this._z=0);break;case"ZXY":this._x=Math.asin(Ye(f)),Math.abs(f)<y?(this._y=Math.atan2(-u,m),this._z=Math.atan2(-n,l)):(this._y=0,this._z=Math.atan2(o,a));break;case"ZYX":this._y=Math.asin(-Ye(u)),Math.abs(u)<y?(this._x=Math.atan2(f,m),this._z=Math.atan2(o,a)):(this._x=0,this._z=Math.atan2(-n,l));break;case"YZX":this._z=Math.asin(Ye(o)),Math.abs(o)<y?(this._x=Math.atan2(-c,l),this._y=Math.atan2(-u,a)):(this._x=0,this._y=Math.atan2(h,m));break;case"XZY":this._z=Math.asin(-Ye(n)),Math.abs(n)<y?(this._x=Math.atan2(f,l),this._y=Math.atan2(h,a)):(this._x=Math.atan2(-c,m),this._y=0);break;default:throw new Error("Euler.setFromRotationMatrix: unknown order "+t)}return this._order=t,s&&this._onChangeCallback(),this}setFromQuaternion(e,t,s){return Ns.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ns,t,s)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Es.setFromEuler(this),this.setFromQuaternion(Es,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}function Xi(){}We.DEFAULT_ORDER="XYZ";We.prototype.isEuler=!0;class Ke{constructor(e,t,s,r,a,n,h,o,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,s,r,a,n,h,o,l)}set(e,t,s,r,a,n,h,o,l){const c=this.elements;return c[0]=e,c[1]=r,c[2]=h,c[3]=t,c[4]=a,c[5]=o,c[6]=s,c[7]=n,c[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1)}copy(e){const t=this.elements,s=e.elements;for(let r=0;r<9;r++)t[r]=s[r];return this}clone(){return new Ke().fromArray(this.elements)}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10])}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const s=e.elements,r=t.elements,a=this.elements,n=s[0],h=s[3],o=s[6],l=s[1],c=s[4],u=s[7],f=s[2],m=s[5],y=s[8],d=r[0],v=r[3],x=r[6],b=r[1],w=r[4],M=r[7],z=r[2],A=r[5],p=r[8];return a[0]=n*d+h*b+o*z,a[3]=n*v+h*w+o*A,a[6]=n*x+h*M+o*p,a[1]=l*d+c*b+u*z,a[4]=l*v+c*w+u*A,a[7]=l*x+c*M+u*p,a[2]=f*d+m*b+y*z,a[5]=f*v+m*w+y*A,a[8]=f*x+m*M+y*p,this}multiplyScalar(e){const t=this.elements;for(let s=0;s<9;s++)t[s]*=e;return this}determinant(){const e=this.elements,t=e[0],s=e[1],r=e[2],a=e[3],n=e[4],h=e[5],o=e[6],l=e[7],c=e[8];return t*n*c-t*h*l-s*a*c+s*h*o+r*a*l-r*n*o}invert(){const e=this.elements,t=e[0],s=e[1],r=e[2],a=e[3],n=e[4],h=e[5],o=e[6],l=e[7],c=e[8],u=c*n-h*l,f=h*o-c*a,m=l*a-n*o,y=t*u+s*f+r*m;if(y===0)return this.set(0,0,0,0,0,0,0,0,0);const d=1/y;return e[0]=u*d,e[1]=(r*l-c*s)*d,e[2]=(h*s-r*n)*d,e[3]=f*d,e[4]=(c*t-r*o)*d,e[5]=(r*a-h*t)*d,e[6]=m*d,e[7]=(s*o-l*t)*d,e[8]=(n*t-s*a)*d,this}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}makeTranslation(e,t){return e.isVector2&&(t=e.y,e=e.x),this.set(1,0,e,0,1,t,0,0,1)}makeRotation(e){const t=Math.cos(e),s=Math.sin(e);return this.set(t,-s,0,s,t,0,0,0,1)}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1)}setUvTransform(e,t,s,r,a,n,h){const o=Math.cos(a),l=Math.sin(a);return this.set(s*o,s*l,-s*(o*n+l*h)+n+e,-r*l,r*o,-r*(-l*n+o*h)+h+t,0,0,1)}scale(e,t){return this.premultiply(rs.makeScale(e,t))}rotate(e){return this.premultiply(rs.makeRotation(-e))}translate(e,t){return this.premultiply(rs.makeTranslation(e,t))}equals(e){for(let t=0;t<9;t++)if(this.elements[t]!==e.elements[t])return!1;return!0}fromArray(e,t=0){for(let s=0;s<9;s++)this.elements[s]=e[s+t];return this}toArray(e=[],t=0){for(let s=0;s<9;s++)e[t+s]=this.elements[s];return e}}Ke.prototype.isMatrix3=!0;const rs=new Ke,Ce="srgb",At="srgb-linear",Ze=i=>i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4),xe=i=>i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055,lt=i=>Math.max(0,Math.min(1,i)),Ki=(i,e)=>(i%e+e)%e;function is(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}const Pt={h:0,s:0,l:0};class ke{constructor(e,t,s){this.r=1,this.g=1,this.b=1,this.set(e,t,s)}set(e,t,s){if(t===void 0&&s===void 0){if(e===void 0)return this;e&&e.isColor?this.copy(e):typeof e=="number"?this.setHex(e):typeof e=="string"&&this.setStyle(e)}else this.setRGB(e,t,s);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ce){return e=Math.floor(e),this.setRGB((e>>16&255)/255,(e>>8&255)/255,(e&255)/255,t)}setRGB(e,t,s,r=At){return r===Ce&&(e=Ze(e),t=Ze(t),s=Ze(s)),this.r=e,this.g=t,this.b=s,this}setHSL(e,t,s,r=At){if(e=Ki(e,1),t=lt(t),s=lt(s),t===0)return this.setRGB(s,s,s,r);const a=s<=.5?s*(1+t):s+t-s*t,n=2*s-a;return this.setRGB(is(n,a,e+1/3),is(n,a,e),is(n,a,e-1/3),r)}setStyle(e,t=Ce){let s;if(s=/^#([A-Fa-f\d]+)$/.exec(e)){const r=s[1];if(r.length===3)return this.setRGB(parseInt(r[0],16)/15,parseInt(r[1],16)/15,parseInt(r[2],16)/15,t);if(r.length===6)return this.setHex(parseInt(r,16),t)}else if(s=/^rgba?\(\s*([\d.]+)(%?)\s*,\s*([\d.]+)%?\s*,\s*([\d.]+)%?\s*(?:,\s*[\d.]+\s*)?\)$/.exec(e)){const r=s[2]==="%"?100:255;return this.setRGB(Math.min(1,s[1]/r),Math.min(1,s[3]/r),Math.min(1,s[4]/r),t)}else{if(s=/^hsla?\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*(?:,\s*[\d.]+\s*)?\)$/.exec(e))return this.setHSL(s[1]/360,s[2]/100,s[3]/100,t);if(xs[e.toLowerCase()]!==void 0)return this.setHex(xs[e.toLowerCase()],t)}return console.warn("Color: unknown color "+e),this}clone(){return new ke(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ze(e.r),this.g=Ze(e.g),this.b=Ze(e.b),this}copyLinearToSRGB(e){return this.r=xe(e.r),this.g=xe(e.g),this.b=xe(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this)}convertLinearToSRGB(){return this.copyLinearToSRGB(this)}getHex(e=Ce){let t=this.r,s=this.g,r=this.b;return e===Ce&&(t=xe(t),s=xe(s),r=xe(r)),Math.round(lt(t)*255)*65536+Math.round(lt(s)*255)*256+Math.round(lt(r)*255)}getHexString(e=Ce){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=At){let s=this.r,r=this.g,a=this.b;t===Ce&&(s=xe(s),r=xe(r),a=xe(a));const n=Math.max(s,r,a),h=Math.min(s,r,a);let o=0,l=0;const c=(h+n)/2;if(h!==n){const u=n-h;l=c<=.5?u/(n+h):u/(2-n-h),n===s?o=(r-a)/u+(r<a?6:0):n===r?o=(a-s)/u+2:o=(s-r)/u+4,o/=6}return e.h=o,e.s=l,e.l=c,e}getRGB(e,t=At){return e.r=this.r,e.g=this.g,e.b=this.b,t===Ce&&(e.r=xe(e.r),e.g=xe(e.g),e.b=xe(e.b)),e}getStyle(e=Ce){const t=this.getRGB({},e);return`rgb(${Math.round(t.r*255)},${Math.round(t.g*255)},${Math.round(t.b*255)})`}offsetHSL(e,t,s){return this.getHSL(Pt),this.setHSL(Pt.h+e,Pt.s+t,Pt.l+s)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,s){return this.r=e.r+(t.r-e.r)*s,this.g=e.g+(t.g-e.g)*s,this.b=e.b+(t.b-e.b)*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}ke.prototype.isColor=!0;const xs={black:0,white:16777215,red:16711680,green:32768,lime:65280,blue:255,yellow:16776960,cyan:65535,magenta:16711935,gray:8421504,grey:8421504,orange:16753920};ke.NAMES=xs;const _e=new k,Te=Array.from({length:8},()=>new k);class be{constructor(e=new k(1/0,1/0,1/0),t=new k(-1/0,-1/0,-1/0)){this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0;t<e.length;t+=3)this.expandByPoint(_e.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0;t<e.count;t++)this.expandByPoint(_e.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(const t of e)this.expandByPoint(t);return this}setFromCenterAndSize(e,t){return _e.copy(t).multiplyScalar(.5),this.min.copy(e).sub(_e),this.max.copy(e).add(_e),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new be().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const s=e.geometry;if(s!==void 0){const r=s.getAttribute("position");if(t&&r!==void 0)for(let a=0;a<r.count;a++)this.expandByPoint(_e.fromBufferAttribute(r,a).applyMatrix4(e.matrixWorld));else s.boundingBox===null&&s.computeBoundingBox(),Ws.copy(s.boundingBox).applyMatrix4(e.matrixWorld),this.union(Ws)}for(const r of e.children)this.expandByObject(r,t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,_e),_e.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,s;const r=e.normal;return r.x>0?(t=r.x*this.min.x,s=r.x*this.max.x):(t=r.x*this.max.x,s=r.x*this.min.x),r.y>0?(t+=r.y*this.min.y,s+=r.y*this.max.y):(t+=r.y*this.max.y,s+=r.y*this.min.y),r.z>0?(t+=r.z*this.min.z,s+=r.z*this.max.z):(t+=r.z*this.max.z,s+=r.z*this.min.z),t<=-e.constant&&s>=-e.constant}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,_e).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?(e.makeEmpty(),e):(this.getCenter(e.center),e.radius=this.getSize(_e).length()*.5,e)}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){if(this.isEmpty())return this;const t=this.min,s=this.max;return Te[0].set(t.x,t.y,t.z).applyMatrix4(e),Te[1].set(t.x,t.y,s.z).applyMatrix4(e),Te[2].set(t.x,s.y,t.z).applyMatrix4(e),Te[3].set(t.x,s.y,s.z).applyMatrix4(e),Te[4].set(s.x,t.y,t.z).applyMatrix4(e),Te[5].set(s.x,t.y,s.z).applyMatrix4(e),Te[6].set(s.x,s.y,t.z).applyMatrix4(e),Te[7].set(s.x,s.y,s.z).applyMatrix4(e),this.setFromPoints(Te)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}be.prototype.isBox3=!0;const Ws=new be,Yi=new be,as=new k;class Ae{constructor(e=new k,t=-1){this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){t!==void 0?this.center.copy(t):Yi.setFromPoints(e).getCenter(this.center);let s=0;for(const r of e)s=Math.max(s,this.center.distanceToSquared(r));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}clone(){return new Ae().copy(this)}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const s=this.center.distanceToSquared(e);return t.copy(e),s>this.radius*this.radius&&t.sub(this.center).normalize().multiplyScalar(this.radius).add(this.center),t}getBoundingBox(e){return this.isEmpty()?e.makeEmpty():(e.set(this.center,this.center),e.expandByScalar(this.radius))}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;as.subVectors(e,this.center);const t=as.lengthSq();if(t>this.radius*this.radius){const s=Math.sqrt(t),r=(s-this.radius)*.5;this.center.addScaledVector(as,r/s),this.radius+=r}return this}union(e){if(e.isEmpty())return this;if(this.isEmpty())return this.copy(e);const t=this.center.distanceTo(e.center);if(t+e.radius<=this.radius)return this;if(t+this.radius<=e.radius)return this.copy(e);const s=(t+this.radius+e.radius)*.5;return this.center.lerp(e.center,(s-this.radius)/t),this.radius=s,this}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}}Ae.prototype.isSphere=!0;const Os=new k,Zi=new k,Qi=new Ke;class Be{constructor(e=new k(1,0,0),t=0){this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,s,r){return this.normal.set(e,t,s),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(e),this}setFromCoplanarPoints(e,t,s){const r=Os.subVectors(s,t).cross(Zi.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e)}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}clone(){return new Be().copy(this)}normalize(){const e=this.normal.length();if(e===0)return this;const t=1/e;return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}applyMatrix4(e,t){const s=t||Qi.getNormalMatrix(e),r=this.coplanarPoint(Os).applyMatrix4(e),a=this.normal.applyMatrix3(s).normalize();return this.constant=-r.dot(a),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}}Be.prototype.isPlane=!0;const Us=new Ae,Ct=new k;class Mt{constructor(e=new Be,t=new Be,s=new Be,r=new Be,a=new Be,n=new Be){this.planes=[e,t,s,r,a,n]}set(e,t,s,r,a,n){const h=this.planes;return h[0].copy(e),h[1].copy(t),h[2].copy(s),h[3].copy(r),h[4].copy(a),h[5].copy(n),this}copy(e){for(let t=0;t<6;t++)this.planes[t].copy(e.planes[t]);return this}clone(){return new Mt().copy(this)}setFromProjectionMatrix(e,t=Ve,s=!0){const r=this.planes,a=e.elements,n=a[0],h=a[4],o=a[8],l=a[12],c=a[1],u=a[5],f=a[9],m=a[13],y=a[2],d=a[6],v=a[10],x=a[14],b=a[3],w=a[7],M=a[11],z=a[15];return r[0].setComponents(b+n,w+h,M+o,z+l).normalize(),r[1].setComponents(b-n,w-h,M-o,z-l).normalize(),r[2].setComponents(b+c,w+u,M+f,z+m).normalize(),r[3].setComponents(b-c,w-u,M-f,z-m).normalize(),s?(r[4].setComponents(b-y,w-d,M-v,z-x).normalize(),r[5].setComponents(y,d,v,x).normalize()):t===Hi?(r[4].setComponents(b+y,w+d,M+v,z+x).normalize(),r[5].setComponents(b-y,w-d,M-v,z-x).normalize()):(r[4].setComponents(y,d,v,x).normalize(),r[5].setComponents(b-y,w-d,M-v,z-x).normalize()),this}intersectsObject(e){const t=e.geometry;return t.boundingSphere===null&&t.computeBoundingSphere(),Us.copy(t.boundingSphere).applyMatrix4(e.matrixWorld),this.intersectsSphere(Us)}intersectsSphere(e){const t=this.planes,s=e.center,r=-e.radius;for(let a=0;a<6;a++)if(t[a].distanceToPoint(s)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let s=0;s<6;s++){const r=t[s].normal;if(Ct.x=r.x>0?e.max.x:e.min.x,Ct.y=r.y>0?e.max.y:e.min.y,Ct.z=r.z>0?e.max.z:e.min.z,t[s].distanceToPoint(Ct)<0)return!1}return!0}containsPoint(e){for(let t=0;t<6;t++)if(this.planes[t].distanceToPoint(e)<0)return!1;return!0}}const Ji=new Float32Array(1);new Uint32Array(Ji.buffer);class Yt{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const s=this._listeners;s[e]===void 0&&(s[e]=[]),s[e].includes(t)||s[e].push(t)}hasEventListener(e,t){const s=this._listeners;return s!==void 0&&s[e]!==void 0&&s[e].includes(t)}removeEventListener(e,t){const s=this._listeners&&this._listeners[e];if(s===void 0)return;const r=s.indexOf(t);r!==-1&&s.splice(r,1)}dispatchEvent(e){const t=this._listeners&&this._listeners[e.type];if(t!==void 0){e.target=this;for(const s of t.slice())s.call(this,e);e.target=null}}}class ea{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let ta=0;const Vs=new k,Qe=new ye,Le=new U,Tt=new k,ht=new k,sa=new k,ra=new ye,Gs=new k(1,0,0),Hs=new k(0,1,0),qs=new k(0,0,1),js={type:"added"},ia={type:"removed"},ns={type:"childadded",child:null},os={type:"childremoved",child:null};class me extends Yt{constructor(){super(),Object.defineProperty(this,"id",{value:ta++}),this.uuid=Kt(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=me.DEFAULT_UP.clone();const e=new k,t=new We,s=new ye,r=new k(1,1,1);t._onChange(()=>s.setFromEuler(t,!1)),s._onChange(()=>t.setFromQuaternion(s,void 0,!1)),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:s},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new U},normalMatrix:{value:new Ke}}),this.matrix=new U,this.matrixWorld=new U,this.matrixAutoUpdate=me.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=me.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ea,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.userData={}}onBeforeRender(){}onAfterRender(){}onBeforeShadow(){}onAfterShadow(){}dispose(){this.dispatchEvent({type:"dispose"})}applyMatrix4(e){return this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Qe.setFromAxisAngle(e,t),this.quaternion.multiply(Qe),this}rotateOnWorldAxis(e,t){return Qe.setFromAxisAngle(e,t),this.quaternion.premultiply(Qe),this}rotateX(e){return this.rotateOnAxis(Gs,e)}rotateY(e){return this.rotateOnAxis(Hs,e)}rotateZ(e){return this.rotateOnAxis(qs,e)}translateOnAxis(e,t){return Vs.copy(e).applyQuaternion(this.quaternion),this.position.add(Vs.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Gs,e)}translateY(e){return this.translateOnAxis(Hs,e)}translateZ(e){return this.translateOnAxis(qs,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Le.copy(this.matrixWorld).invert())}lookAt(e,t,s){e.isVector3?Tt.copy(e):Tt.set(e,t,s);const r=this.parent;this.updateWorldMatrix(!0,!1),ht.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Le.lookAt(ht,Tt,this.up):Le.lookAt(Tt,ht,this.up),this.quaternion.setFromRotationMatrix(Le),r&&(Le.extractRotation(r.matrixWorld),Qe.setFromRotationMatrix(Le),this.quaternion.premultiply(Qe.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?this:(e&&e.isObject3D&&(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(js),ns.child=e,this.dispatchEvent(ns),ns.child=null),this)}remove(e){if(arguments.length>1){for(let s=0;s<arguments.length;s++)this.remove(arguments[s]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(ia),os.child=e,this.dispatchEvent(os),os.child=null),this}removeFromParent(){return this.parent!==null&&this.parent.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Le.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Le.multiply(e.parent.matrixWorld)),e.applyMatrix4(Le),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(js),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(const s of this.children){const r=s.getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,s=[]){this[e]===t&&s.push(this);for(const r of this.children)r.getObjectsByProperty(e,t,s);return s}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ht,e,sa),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ht,ra,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}traverse(e){e(this);const t=this.children;for(let s=0,r=t.length;s<r;s++)t[s].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let s=0,r=t.length;s<r;s++)t[s].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let s=0,r=t.length;s<r;s++){const a=t[s];(a.matrixWorldAutoUpdate===!0||e===!0)&&a.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(s===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(s.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let a=0,n=r.length;a<n;a++)r[a].matrixWorldAutoUpdate===!0&&r[a].updateWorldMatrix(!1,!0)}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,e.onBeforeRender!==me.prototype.onBeforeRender&&(this.onBeforeRender=e.onBeforeRender),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(const s of e.children)this.add(s.clone());return this}}me.DEFAULT_UP=new k(0,1,0);me.DEFAULT_MATRIX_AUTO_UPDATE=!0;me.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;me.prototype.isObject3D=!0;class aa extends me{constructor(){super(),this.type="Group"}}aa.prototype.isGroup=!0;class ks extends me{constructor(){super(),this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new We,this.environmentIntensity=1,this.environmentRotation=new We,this.overrideMaterial=null}copy(e,t){return super.copy(e,t),this.background=e.background,this.environment=e.environment,this.fog=e.fog,this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentRotation.copy(e.environmentRotation),this.environmentIntensity=e.environmentIntensity,this.overrideMaterial=e.overrideMaterial,this.matrixAutoUpdate=e.matrixAutoUpdate,this}}ks.prototype.isScene=!0;const Zr=35044,ne=new k,ls=new ee,Qr={getComponent(i,e){const t=this.array[this._idx(i,e)];return this.normalized?Kr(t,this.array):t},setComponent(i,e,t){return this.array[this._idx(i,e)]=this.normalized?Yr(t,this.array):t,this},getX(i){return this.getComponent(i,0)},getY(i){return this.getComponent(i,1)},getZ(i){return this.getComponent(i,2)},getW(i){return this.getComponent(i,3)},setX(i,e){return this.setComponent(i,0,e)},setY(i,e){return this.setComponent(i,1,e)},setZ(i,e){return this.setComponent(i,2,e)},setW(i,e){return this.setComponent(i,3,e)},setXY(i,e,t){return this.setComponent(i,0,e),this.setComponent(i,1,t)},setXYZ(i,e,t,s){return this.setComponent(i,0,e),this.setComponent(i,1,t),this.setComponent(i,2,s)},setXYZW(i,e,t,s,r){return this.setComponent(i,0,e),this.setComponent(i,1,t),this.setComponent(i,2,s),this.setComponent(i,3,r)},applyMatrix3(i){if(this.itemSize===2)for(let e=0;e<this.count;e++)ls.fromBufferAttribute(this,e).applyMatrix3(i),this.setXY(e,ls.x,ls.y);else if(this.itemSize===3)for(let e=0;e<this.count;e++)ne.fromBufferAttribute(this,e).applyMatrix3(i),this.setXYZ(e,ne.x,ne.y,ne.z);return this},applyMatrix4(i){for(let e=0;e<this.count;e++)ne.fromBufferAttribute(this,e).applyMatrix4(i),this.setXYZ(e,ne.x,ne.y,ne.z);return this},applyNormalMatrix(i){for(let e=0;e<this.count;e++)ne.fromBufferAttribute(this,e).applyNormalMatrix(i),this.setXYZ(e,ne.x,ne.y,ne.z);return this},transformDirection(i){for(let e=0;e<this.count;e++)ne.fromBufferAttribute(this,e).transformDirection(i),this.setXYZ(e,ne.x,ne.y,ne.z);return this}};class ae extends Yt{constructor(e,t,s=!1){if(super(),Array.isArray(e))throw new TypeError("BufferAttribute: array should be a Typed Array.");this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=s,this.usage=Zr,this.updateRanges=[],this.gpuType=1015,this.version=0,this.onUploadCallback=Jr}set needsUpdate(e){e===!0&&this.version++}_idx(e,t){return e*this.itemSize+t}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}onUpload(e){return this.onUploadCallback=e,this}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,s){const r=this.itemSize;e*=r,s*=t.itemSize;for(let a=0;a<r;a++)this.array[e+a]=t.array[s+a];return this}copyArray(e){return this.array.set(e),this}set(e,t=0){return this.array.set(e,t),this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}dispose(){this.dispatchEvent({type:"dispose"})}}Object.assign(ae.prototype,Qr);ae.prototype.isBufferAttribute=!0;function Jr(){}class na extends ae{constructor(e,t,s){super(new Uint16Array(e),t,s)}}class oa extends ae{constructor(e,t,s){super(new Uint32Array(e),t,s)}}class rt extends ae{constructor(e,t,s){super(new Float32Array(e),t,s)}}class qe extends ae{constructor(e,t,s,r=1){super(e,t,s),this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(){return new qe(this.array,this.itemSize).copy(this)}}qe.prototype.isInstancedBufferAttribute=!0;class ei extends Yt{constructor(e,t){super(),this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Zr,this.updateRanges=[],this.version=0,this.uuid=Kt(),this.onUploadCallback=Jr}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}set(e,t=0){return this.array.set(e,t),this}onUpload(e){return this.onUploadCallback=e,this}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,s){e*=this.stride,s*=t.stride;for(let r=0;r<this.stride;r++)this.array[e+r]=t.array[s+r];return this}clone(){return new this.constructor(new this.array.constructor(this.array),this.stride).copy(this)}dispose(){this.dispatchEvent({type:"dispose"})}}ei.prototype.isInterleavedBuffer=!0;class As extends ei{constructor(e,t,s=1){super(e,t),this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(){return new As(new this.array.constructor(this.array),this.stride,this.meshPerAttribute)}}As.prototype.isInstancedInterleavedBuffer=!0;class ti{constructor(e,t,s,r=!1){this.name="",this.data=e,this.itemSize=t,this.offset=s,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}_idx(e,t){return e*this.data.stride+this.offset+t}clone(){const e=new this.array.constructor(this.count*this.itemSize);for(let t=0;t<this.count;t++)for(let s=0;s<this.itemSize;s++)e[t*this.itemSize+s]=this.array[this._idx(t,s)];return new ae(e,this.itemSize,this.normalized)}}Object.assign(ti.prototype,Qr);ti.prototype.isInterleavedBufferAttribute=!0;let la=0;const $e=new U,ha=new Ke,Xs=new ye,ca=new be,Je=new k,Lt=new k;function ua(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}class Se extends Yt{constructor(){super(),Object.defineProperty(this,"id",{value:la++}),this.uuid=Kt(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(ua(e)?oa:na)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this.attributesVersion=(this.attributesVersion||0)+1,this}deleteAttribute(e){return delete this.attributes[e],this.attributesVersion=(this.attributesVersion||0)+1,this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,s=0){this.groups.push({start:e,count:t,materialIndex:s})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const s=this.attributes.normal;s!==void 0&&(s.applyNormalMatrix(ha.getNormalMatrix(e)),s.needsUpdate=!0);const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return this.applyMatrix4($e.makeRotationFromQuaternion(e))}rotateX(e){return this.applyMatrix4($e.makeRotationX(e))}rotateY(e){return this.applyMatrix4($e.makeRotationY(e))}rotateZ(e){return this.applyMatrix4($e.makeRotationZ(e))}translate(e,t,s){return this.applyMatrix4($e.makeTranslation(e,t,s))}scale(e,t,s){return this.applyMatrix4($e.makeScale(e,t,s))}lookAt(e){return $e.lookAt(e,Je.set(0,0,0),new k(0,1,0)),Xs.setFromRotationMatrix($e),this.applyQuaternion(Xs)}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Lt).negate(),this.translate(Lt.x,Lt.y,Lt.z)}setFromPoints(e){const t=[];for(const s of e)t.push(s.x,s.y,s.z||0);return this.setAttribute("position",new rt(t,3))}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new be);const e=this.attributes.position;if(e===void 0){this.boundingBox.makeEmpty();return}this.boundingBox.setFromBufferAttribute(e)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ae);const e=this.attributes.position;if(e===void 0){this.boundingSphere.makeEmpty();return}const t=this.boundingSphere.center;ca.setFromBufferAttribute(e).getCenter(t);let s=0;for(let r=0;r<e.count;r++)s=Math.max(s,t.distanceToSquared(Je.fromBufferAttribute(e,r)));this.boundingSphere.radius=Math.sqrt(s)}computeTangents(){const e=this.index,t=this.attributes.position,s=this.attributes.normal,r=this.attributes.uv;if(e===null||t===void 0||s===void 0||r===void 0){console.error("BufferGeometry.computeTangents(): missing required attributes (index, position, normal or uv)");return}const a=t.count;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ae(new Float32Array(4*a),4));const n=this.getAttribute("tangent"),h=[],o=[];for(let g=0;g<a;g++)h[g]=new k,o[g]=new k;const l=new k,c=new k,u=new k,f=new ee,m=new ee,y=new ee,d=new k,v=new k,x=(g,S,_)=>{l.fromBufferAttribute(t,g),c.fromBufferAttribute(t,S),u.fromBufferAttribute(t,_),f.fromBufferAttribute(r,g),m.fromBufferAttribute(r,S),y.fromBufferAttribute(r,_),c.sub(l),u.sub(l),m.sub(f),y.sub(f);const C=1/(m.x*y.y-y.x*m.y);isFinite(C)&&(d.copy(c).multiplyScalar(y.y).addScaledVector(u,-m.y).multiplyScalar(C),v.copy(u).multiplyScalar(m.x).addScaledVector(c,-y.x).multiplyScalar(C),h[g].add(d),h[S].add(d),h[_].add(d),o[g].add(v),o[S].add(v),o[_].add(v))},b=this.groups.length?this.groups:[{start:0,count:e.count}];for(const g of b)for(let S=g.start;S<g.start+g.count;S+=3)x(e.getX(S),e.getX(S+1),e.getX(S+2));const w=new k,M=new k,z=new k,A=new k,p=g=>{M.fromBufferAttribute(s,g),z.copy(M);const S=h[g];w.copy(S).sub(M.multiplyScalar(M.dot(S))).normalize(),A.crossVectors(z,S);const _=A.dot(o[g])<0?-1:1;n.setXYZW(g,w.x,w.y,w.z,_)};for(const g of b)for(let S=g.start;S<g.start+g.count;S++)p(e.getX(S))}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t===void 0)return;let s=this.getAttribute("normal");if(s===void 0||s.count!==t.count)s=new ae(new Float32Array(t.count*3),3),this.setAttribute("normal",s);else for(let f=0;f<s.count;f++)s.setXYZ(f,0,0,0);const r=new k,a=new k,n=new k,h=new k,o=new k,l=new k,c=new k,u=new k;if(e)for(let f=0,m=e.count;f<m;f+=3){const y=e.getX(f),d=e.getX(f+1),v=e.getX(f+2);r.fromBufferAttribute(t,y),a.fromBufferAttribute(t,d),n.fromBufferAttribute(t,v),h.subVectors(n,a),o.subVectors(r,a),h.cross(o),l.fromBufferAttribute(s,y),c.fromBufferAttribute(s,d),u.fromBufferAttribute(s,v),l.add(h),c.add(h),u.add(h),s.setXYZ(y,l.x,l.y,l.z),s.setXYZ(d,c.x,c.y,c.z),s.setXYZ(v,u.x,u.y,u.z)}else for(let f=0,m=t.count;f<m;f+=3)r.fromBufferAttribute(t,f),a.fromBufferAttribute(t,f+1),n.fromBufferAttribute(t,f+2),h.subVectors(n,a),o.subVectors(r,a),h.cross(o),s.setXYZ(f,h.x,h.y,h.z),s.setXYZ(f+1,h.x,h.y,h.z),s.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),s.needsUpdate=!0}normalizeNormals(){const e=this.attributes.normal;for(let t=0,s=e.count;t<s;t++)Je.fromBufferAttribute(e,t).normalize(),e.setXYZ(t,Je.x,Je.y,Je.z)}toNonIndexed(){if(this.index===null)return console.warn("BufferGeometry.toNonIndexed(): geometry is already non-indexed."),this;const e=new Se,t=this.index,s=r=>{const a=r.itemSize,n=new r.array.constructor(t.count*a);for(let h=0;h<t.count;h++){const o=t.getX(h);for(let l=0;l<a;l++)n[h*a+l]=r.array[r._idx(o,l)]}return new ae(n,a,r.normalized)};for(const r in this.attributes)e.setAttribute(r,s(this.attributes[r]));for(const r in this.morphAttributes)e.morphAttributes[r]=this.morphAttributes[r].map(s);e.morphTargetsRelative=this.morphTargetsRelative;for(const r of this.groups)e.addGroup(r.start,r.count,r.materialIndex);return e}clone(){return new Se().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.name=e.name,e.index!==null&&this.setIndex(e.index.clone());for(const t in e.attributes)this.setAttribute(t,e.attributes[t].clone());for(const t in e.morphAttributes)this.morphAttributes[t]=e.morphAttributes[t].map(s=>s.clone());this.morphTargetsRelative=e.morphTargetsRelative;for(const t of e.groups)this.addGroup(t.start,t.count,t.materialIndex);return e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}Se.prototype.isBufferGeometry=!0;class Zt extends Se{constructor(){super(),this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}clone(){return new Zt().copy(this)}}Zt.prototype.isInstancedBufferGeometry=!0;class je extends me{constructor(e=new Se,t=null){super(),this.type="Mesh",this.geometry=e,this.material=t,this.count=1}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this.count=e.count,this}}je.prototype.isMesh=!0;const ct=new U,Ks=new be,Ys=new Ae;class wt extends je{constructor(e,t,s){super(e,t),this.type="InstancedMesh",this.instanceMatrix=new qe(new Float32Array(s*16),16),this.instanceColor=null,this.count=s,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<s;r++)this.setMatrixAt(r,ct.identity())}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}getColorAt(e,t){return t.fromArray(this.instanceColor.array,e*3)}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new qe(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new be),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let t=0;t<this.count;t++)this.getMatrixAt(t,ct),Ks.copy(e.boundingBox).applyMatrix4(ct),this.boundingBox.union(Ks)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Ae),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let t=0;t<this.count;t++)this.getMatrixAt(t,ct),Ys.copy(e.boundingSphere).applyMatrix4(ct),this.boundingSphere.union(Ys)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}clone(e){return new wt(this.geometry,this.material,this.count).copy(this,e)}dispose(){this.dispatchEvent({type:"dispose"})}}wt.prototype.isInstancedMesh=!0;const Ne=new k,Zs=new ee,Qs=new ee;class Ps extends me{constructor(){super(),this.type="Camera",this.matrixWorldInverse=new U,this.projectionMatrix=new U,this.projectionMatrixInverse=new U,this.coordinateSystem=Ve,this.reversedDepth=!0}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this.reversedDepth=e.reversedDepth,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}Ps.prototype.isCamera=!0;function si(i,e,t,s,r,a,n){i.view===null&&(i.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1});const h=i.view;h.enabled=!0,h.fullWidth=e,h.fullHeight=t,h.offsetX=s,h.offsetY=r,h.width=a,h.height=n,i.updateProjectionMatrix()}class ri extends Ps{constructor(e=50,t=1,s=.1,r=2e3){super(),this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=s,this.far=r,this.infiniteFar=!1,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.infiniteFar=e.infiniteFar,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Gt*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){return .5*this.getFilmHeight()/Math.tan(xt*.5*this.fov)}getEffectiveFOV(){return Gt*2*Math.atan(Math.tan(xt*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,s){Ne.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ne.x,Ne.y).multiplyScalar(-e/Ne.z),Ne.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),s.set(Ne.x,Ne.y).multiplyScalar(-e/Ne.z)}getViewSize(e,t){return this.getViewBounds(e,Zs,Qs),t.subVectors(Qs,Zs)}setViewOffset(e,t,s,r,a,n){this.aspect=e/t,si(this,e,t,s,r,a,n)}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(xt*.5*this.fov)/this.zoom,s=2*t,r=this.aspect*s,a=-.5*r;const n=this.view;if(n!==null&&n.enabled){const l=n.fullWidth,c=n.fullHeight;a+=n.offsetX*r/l,t-=n.offsetY*s/c,r*=n.width/l,s*=n.height/c}const h=this.filmOffset;h!==0&&(a+=e*h/this.getFilmWidth());const o=this.infiniteFar?1/0:this.far;this.projectionMatrix.makePerspective(a,a+r,t,t-s,e,o,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}}ri.prototype.isPerspectiveCamera=!0;class fa extends Ps{constructor(e=-1,t=1,s=1,r=-1,a=.1,n=2e3){super(),this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=s,this.bottom=r,this.near=a,this.far=n,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,s,r,a,n){si(this,e,t,s,r,a,n)}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),s=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let a=s-e,n=s+e,h=r+t,o=r-t;const l=this.view;if(l!==null&&l.enabled){const c=(this.right-this.left)/l.fullWidth/this.zoom,u=(this.top-this.bottom)/l.fullHeight/this.zoom;a+=c*l.offsetX,n=a+c*l.width,h-=u*l.offsetY,o=h-u*l.height}this.projectionMatrix.makeOrthographic(a,n,h,o,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}}fa.prototype.isOrthographicCamera=!0;function ii(i,e,t,s,r){e&&i.setIndex(e),i.setAttribute("position",new rt(t,3)),i.setAttribute("normal",new rt(s,3)),i.setAttribute("uv",new rt(r,2))}class da extends Se{constructor(e=1,t=1,s=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:s,heightSegments:r};const a=e/2,n=t/2,h=Math.floor(s),o=Math.floor(r),l=h+1,c=o+1,u=e/h,f=t/o,m=[],y=[],d=[],v=[];for(let x=0;x<c;x++){const b=x*f-n;for(let w=0;w<l;w++)y.push(w*u-a,-b,0),d.push(0,0,1),v.push(w/h,1-x/o)}for(let x=0;x<o;x++)for(let b=0;b<h;b++){const w=b+l*x,M=b+l*(x+1),z=b+1+l*(x+1),A=b+1+l*x;m.push(w,M,A,M,z,A)}ii(this,m,y,d,v)}}class Js extends Se{constructor(e=1,t=32,s=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:s,thetaLength:r},t=Math.max(3,t);const a=[],n=[0,0,0],h=[0,0,1],o=[.5,.5];for(let l=0;l<=t;l++){const c=s+l/t*r,u=e*Math.cos(c),f=e*Math.sin(c);n.push(u,f,0),h.push(0,0,1),o.push((u/e+1)/2,(f/e+1)/2)}for(let l=1;l<=t;l++)a.push(l,l+1,0);ii(this,a,n,h,o)}}const L={device:null,queue:null,adapter:null,context:null,canvas:null,format:"bgra8unorm",features:new Set,limits:null,hasTimestamp:!1,hasFloat32Filterable:!1,encoder:null,frame:0,samplers:null,_submitHooks:[],async init({canvas:i=null,requiredLimits:e={},headless:t=!1}={}){if(!navigator.gpu)throw new Error("WebGPU is not available in this browser.");const s=await navigator.gpu.requestAdapter({powerPreference:"high-performance"});if(!s)throw new Error("No WebGPU adapter found.");this.adapter=s;const r=s.limits,a={maxSampledTexturesPerShaderStage:32,maxSamplersPerShaderStage:16,maxStorageBuffersPerShaderStage:10,maxStorageTexturesPerShaderStage:8,maxComputeWorkgroupStorageSize:32768,maxColorAttachmentBytesPerSample:64,maxStorageBuffersInVertexStage:4,maxStorageBuffersInFragmentStage:8,maxStorageTexturesInFragmentStage:4,maxBindingsPerBindGroup:1e3,maxBufferSize:1024*1024*1024,maxStorageBufferBindingSize:512*1024*1024,...e},n={};for(const c in a)r[c]!==void 0&&(n[c]=Math.min(a[c],r[c]));const o=["float32-filterable","timestamp-query","rg11b10ufloat-renderable","float32-blendable","shader-f16","clip-distances"].filter(c=>s.features.has(c));this.features=new Set(o),this.hasTimestamp=this.features.has("timestamp-query"),this.hasFloat32Filterable=this.features.has("float32-filterable");const l=await s.requestDevice({requiredFeatures:o,requiredLimits:n});return this.device=l,this.queue=l.queue,this.limits=l.limits,l.lost.then(c=>console.error("WebGPU device lost:",c.message)),l.addEventListener&&l.addEventListener("uncapturederror",c=>console.error("WebGPU:",c.error.message.split(`
`).slice(0,6).join(`
`))),i&&!t&&(this.canvas=i,this.context=i.getContext("webgpu"),this.format=navigator.gpu.getPreferredCanvasFormat(),this.context.configure({device:l,format:this.format,alphaMode:"opaque",usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_DST})),this._createSamplers(),this},_createSamplers(){const i=this.device,e=s=>i.createSampler(s),t={magFilter:"linear",minFilter:"linear",mipmapFilter:"linear"};this.samplers={linearRepeat:e({...t,addressModeU:"repeat",addressModeV:"repeat",addressModeW:"repeat"}),linearClamp:e({...t,addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge",addressModeW:"clamp-to-edge"}),linearMirror:e({...t,addressModeU:"mirror-repeat",addressModeV:"mirror-repeat",addressModeW:"mirror-repeat"}),anisoRepeat:e({...t,addressModeU:"repeat",addressModeV:"repeat",addressModeW:"repeat",maxAnisotropy:8}),aniso4Repeat:e({...t,addressModeU:"repeat",addressModeV:"repeat",addressModeW:"repeat",maxAnisotropy:4}),anisoClamp:e({...t,addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge",maxAnisotropy:8}),nearestClamp:e({magFilter:"nearest",minFilter:"nearest",mipmapFilter:"nearest",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge",addressModeW:"clamp-to-edge"}),nearestRepeat:e({magFilter:"nearest",minFilter:"nearest",mipmapFilter:"nearest",addressModeU:"repeat",addressModeV:"repeat",addressModeW:"repeat"}),shadow:e({magFilter:"linear",minFilter:"linear",compare:"less",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge"})}},beginFrame(){return this.frame++,this.getEncoder()},getEncoder(){return this.encoder||(this.encoder=this.device.createCommandEncoder()),this.encoder},submit(){if(!this.encoder)return;const i=this._submitHooks;this._submitHooks=[];for(const e of i)e.before&&e.before(this.encoder);this.queue.submit([this.encoder.finish()]),this.encoder=null;for(const e of i)e.after&&e.after()},onSubmit(i,e){this._submitHooks.push({before:i,after:e})},_pending:new Set,syncCompiles:[],renderPipeline(i){return this._async(i,"render")},computePipeline(i){return this._async(i,"compute")},_async(i,e){const t={pipeline:null,label:i.label,desc:i,kind:e,failed:!1},s=Promise.resolve().then(()=>t.pipeline?void 0:(e==="render"?this.device.createRenderPipelineAsync:this.device.createComputePipelineAsync).call(this.device,i).then(a=>{t.pipeline||(t.pipeline=a),t.desc=null},a=>{t.failed=!0,console.error(`WebGPU: pipeline "${i.label}" failed: ${a.message.split(`
`).slice(0,6).join(`
`)}`)})).finally(()=>this._pending.delete(s));return this._pending.add(s),t},ready(i){return i.pipeline||i.failed||(this.syncCompiles.push(i.label),i.pipeline=i.kind==="render"?this.device.createRenderPipeline(i.desc):this.device.createComputePipeline(i.desc)),i.pipeline},async pipelinesReady(){for(;this._pending.size;)await Promise.all([...this._pending])},computePass(i,e,t){const s=this.getEncoder().beginComputePass({label:i,timestampWrites:t});e(s),s.end()}},pa={r8unorm:{bytes:1,sample:"float"},rg8unorm:{bytes:2,sample:"float"},rgba8unorm:{bytes:4,sample:"float"},"rgba8unorm-srgb":{bytes:4,sample:"float"},bgra8unorm:{bytes:4,sample:"float"},r16float:{bytes:2,sample:"float"},rg16float:{bytes:4,sample:"float"},rgba16float:{bytes:8,sample:"float"},rg11b10ufloat:{bytes:4,sample:"float"},r32float:{bytes:4,sample:"unfilterable-float"},rg32float:{bytes:8,sample:"unfilterable-float"},rgba32float:{bytes:16,sample:"unfilterable-float"},r32uint:{bytes:4,sample:"uint"},rg32uint:{bytes:8,sample:"uint"},rgba32uint:{bytes:16,sample:"uint"},r32sint:{bytes:4,sample:"sint"},r8uint:{bytes:1,sample:"uint"},rgba8uint:{bytes:4,sample:"uint"},depth32float:{bytes:4,sample:"depth"},depth24plus:{bytes:4,sample:"depth"},"depth24plus-stencil8":{bytes:4,sample:"depth"}};function ai(i){const e=pa[i];if(!e)throw new Error("Unknown texture format "+i);return e}function ma(i){const e=ai(i).sample;return e==="unfilterable-float"&&L.hasFloat32Filterable?"float":e}const er={f32:{size:4,align:4,n:1},i32:{size:4,align:4,n:1,int:!0},u32:{size:4,align:4,n:1,uint:!0},vec2f:{size:8,align:8,n:2},vec3f:{size:12,align:16,n:3},vec4f:{size:16,align:16,n:4},vec2i:{size:8,align:8,n:2,int:!0},vec4i:{size:16,align:16,n:4,int:!0},vec2u:{size:8,align:8,n:2,uint:!0},vec4u:{size:16,align:16,n:4,uint:!0},mat3x3f:{size:48,align:16,n:12,mat3:!0},mat4x4f:{size:64,align:16,n:16}};function ya(i){const e=/^(\w+)(?:\[(\d+)\])?$/.exec(i);if(!e||!er[e[1]])throw new Error("Unsupported uniform type "+i);const t=er[e[1]],s=e[2]?Number(e[2]):0;if(s&&t.align<16)throw new Error(`uniform array ${i}: element must be 16-byte aligned (use vec4f)`);return{name:e[1],base:t,count:s}}function tr(i,e,t,s,r,a){const{base:n}=r,h=n.int?t:n.uint?e:i;if(typeof a=="number"||typeof a=="boolean"){h[s]=Number(a);return}if(a!=null){if(a.isMatrix4||a.isMatrix3){const o=a.elements;if(n.mat3)if(o.length===9)for(let l=0;l<3;l++)for(let c=0;c<3;c++)i[s+l*4+c]=o[l*3+c];else for(let l=0;l<3;l++)for(let c=0;c<3;c++)i[s+l*4+c]=o[l*4+c];else for(let l=0;l<16;l++)i[s+l]=o[l];return}if(a.isColor){h[s]=a.r,h[s+1]=a.g,h[s+2]=a.b,n.n===4&&(h[s+3]=1);return}if(a.isVector2){h[s]=a.x,h[s+1]=a.y;return}if(a.isVector3){h[s]=a.x,h[s+1]=a.y,h[s+2]=a.z;return}if(a.isVector4||a.isQuaternion){h[s]=a.x,h[s+1]=a.y,h[s+2]=a.z,h[s+3]=a.w;return}if(ArrayBuffer.isView(a)||Array.isArray(a)){for(let o=0;o<Math.min(a.length,n.n);o++)h[s+o]=a[o];return}throw new Error("Cannot write uniform value "+a)}}let xa=0;class ue{constructor(e,t,{label:s}={}){this.structName=e,this.label=s||e,this.id=xa++,this.layout={},this.fields={},this.order=[];let r=0,a=16;for(const h in t){const o=t[h],l=Array.isArray(o)?o[0]:o,c=Array.isArray(o)?o[1]:void 0,u=ya(l),f=u.base.align;a=Math.max(a,f),r=Math.ceil(r/f)*f;const m=u.count?Math.ceil(u.base.size/16)*16:u.base.size,y=u.count?m*u.count:u.base.size;this.layout[h]={offset:r,type:u,typeStr:l,stride:m,size:y},this.order.push(h),this.fields[h]={value:c!==void 0?c:va(u)},r+=y}this.byteLength=Math.max(16,Math.ceil(r/a)*a),this.data=new ArrayBuffer(this.byteLength),this.f32=new Float32Array(this.data),this.u32=new Uint32Array(this.data),this.i32=new Int32Array(this.data),this.buffer=null,this.version=0;const n=this;this.values=new Proxy({},{get:(h,o)=>n.fields[o]&&n.fields[o].value,set:(h,o,l)=>(n.set(o,l),!0)})}get wgsl(){let e=`struct ${this.structName} {
`;for(const t of this.order){const{type:s}=this.layout[t];e+=s.count?`	${t}: array<${s.name}, ${s.count}>,
`:`	${t}: ${s.name},
`}return e+`};
`}set(e,t){const s=this.fields[e];if(!s)throw new Error(`${this.structName}: no uniform ${e}`);s.value&&typeof s.value=="object"&&!Array.isArray(s.value)&&s.value.copy&&t&&t.constructor===s.value.constructor?s.value.copy(t):s.value=t}get(e){return this.fields[e].value}_pack(){this.onBeforePack&&this.onBeforePack(this);const{f32:e,u32:t,i32:s,fields:r}=this,a=this._plan||this._makePlan();for(let n=0;n<a.length;n++){const{name:h,o,type:l,stride:c,count:u,n:f}=a[n],m=r[h].value;if(typeof m=="number"){(l.base.int?s:l.base.uint?t:e)[o]=m;continue}if(u){if(!m)continue;if(typeof m[0]=="number"){const y=l.base.int?s:l.base.uint?t:e,d=Math.min(u,m.length/f);for(let v=0;v<d;v++){const x=o+v*c,b=v*f,w=Math.min(f,m.length-b);for(let M=0;M<w;M++)y[x+M]=m[b+M]}}else{const y=Math.min(u,m.length);for(let d=0;d<y;d++)tr(e,t,s,o+d*c,l,m[d])}}else tr(e,t,s,o,l,m)}}_makePlan(){return this._plan=this.order.map(e=>{const{offset:t,type:s,stride:r}=this.layout[e];return{name:e,o:t/4,type:s,stride:r/4,count:s.count,n:s.base.n}}),this._plan}getBuffer(){return this.buffer||(this.buffer=L.device.createBuffer({label:this.label,size:this.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this._last=new Uint32Array(this.byteLength/4),this._last.fill(4294967295)),this.buffer}upload(e){if(e!==void 0&&e===this._token&&this.buffer)return this.buffer;this._token=e;const t=this.getBuffer();this._pack();const s=this.u32,r=this._last;let a=!1;for(let n=0;n<s.length;n++)if(s[n]!==r[n]){a=!0;break}return a&&(r.set(s),L.queue.writeBuffer(t,0,this.data)),t}}function va(i){return i.count?null:i.base.n===1?0:new Array(i.base.n).fill(0)}let ga=0;class Xe{constructor(e={}){this.id=ga++,this.label=e.label||e.name||"texture"+this.id,this.width=Math.max(1,e.width||1),this.height=Math.max(1,e.height||1),this.depth=Math.max(1,e.depth||(e.dimension==="cube"?6:1)),this.dimension=e.dimension||"2d",this.format=e.format||"rgba8unorm",this.mipsOption=e.mips??!1,this.sampleCount=e.sampleCount||1;const t=e.usage||["sample","copyDst"];this.usageList=t,this.sampler=e.sampler||"linearClamp",this.gpu=null,this.version=0,this._views=new Map,this.isTexture=!0,e.data&&(this.pendingData=e.data)}get mipLevelCount(){return this.mipsOption===!0?Math.floor(Math.log2(Math.max(this.width,this.height,this.dimension==="3d"?this.depth:1)))+1:typeof this.mipsOption=="number"?this.mipsOption:1}get usage(){let e=0;for(const t of this.usageList)e|={sample:GPUTextureUsage.TEXTURE_BINDING,render:GPUTextureUsage.RENDER_ATTACHMENT,storage:GPUTextureUsage.STORAGE_BINDING,copySrc:GPUTextureUsage.COPY_SRC,copyDst:GPUTextureUsage.COPY_DST}[t];return this.mipLevelCount>1&&(e|=GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING),e}get isDepth(){return this.format.startsWith("depth")}get sampleType(){return ma(this.format)}wgslType(e=this.defaultViewDimension){const t=this.sampleType;if(t==="depth")return{"2d":"texture_depth_2d","2d-array":"texture_depth_2d_array",cube:"texture_depth_cube"}[e];const s=t==="uint"?"u32":t==="sint"?"i32":"f32";return`texture_${e.replace("-","_")}<${s}>`}get defaultViewDimension(){return this.dimension}getGPU(){return this.gpu||this._create(),this.gpu}_create(){const e=this.dimension==="3d"?"3d":"2d";if(this.gpu=L.device.createTexture({label:this.label,size:{width:this.width,height:this.height,depthOrArrayLayers:this.depth},dimension:e,format:this.format,mipLevelCount:this.mipLevelCount,sampleCount:this.sampleCount,usage:this.usage}),this._views.clear(),this.version++,this.pendingData){const t=this.pendingData;this.pendingData=null,this.upload(t)}}view(e=null){const t=this.getGPU(),s=e?JSON.stringify(e):"";let r=this._views.get(s);return r||(r=t.createView({label:this.label+s,dimension:e?.dimension||this.defaultViewDimension,...e||{}}),this._views.set(s,r)),r}resize(e,t,s=this.depth){if(e=Math.max(1,Math.floor(e)),t=Math.max(1,Math.floor(t)),e===this.width&&t===this.height&&s===this.depth&&this.gpu)return!1;if(this.width=e,this.height=t,this.depth=s,this.gpu){const r=this.gpu;L.onSubmit(null,()=>r.destroy()),this.gpu=null}return this._create(),!0}upload(e,{mip:t=0,layer:s=0,layers:r=null,width:a=null,height:n=null,x:h=0,y:o=0}={}){if(!this.gpu){if(t===0&&s===0&&!a){this.pendingData=e,this.getGPU();return}this.getGPU()}const l=ai(this.format).bytes,c=a||Math.max(1,this.width>>t),u=n||Math.max(1,this.height>>t),f=r||(this.dimension==="3d"?Math.max(1,this.depth>>t):this.depth-s),m=e instanceof ArrayBuffer?e:e.buffer,y=e instanceof ArrayBuffer?0:e.byteOffset;L.queue.writeTexture({texture:this.gpu,mipLevel:t,origin:{x:h,y:o,z:s}},m,{offset:y,bytesPerRow:c*l,rowsPerImage:u},{width:c,height:u,depthOrArrayLayers:f})}destroy(){this.gpu&&this.gpu.destroy(),this.gpu=null,this.version++}}class dt{constructor(e,t,{colors:s=["rgba16float"],depth:r=null,label:a="rt",mips:n=!1,usage:h=["sample","render","copySrc","copyDst"],depthUsage:o=["sample","render","copySrc","copyDst"],scale:l=1}={}){this.label=a,this.width=Math.max(1,e|0),this.height=Math.max(1,t|0),this.scale=l,this.textures=s.map((c,u)=>{const f=typeof c=="string"?{format:c}:c;return new Xe({label:`${a}.${f.name||u}`,width:this.width,height:this.height,format:f.format,mips:f.mips??n,usage:f.usage||h})}),this.depthTexture=r?new Xe({label:a+".depth",width:this.width,height:this.height,format:r,usage:o}):null}get texture(){return this.textures[0]}get formats(){return this.textures.map(e=>e.format)}setSize(e,t){if(e=Math.max(1,e|0),t=Math.max(1,t|0),e===this.width&&t===this.height)return!1;this.width=e,this.height=t;for(const s of this.textures)s.resize(e,t);return this.depthTexture&&this.depthTexture.resize(e,t),!0}}let wa=0;class pe{constructor({label:e,count:t,type:s="vec4f",stride:r=null,data:a=null,usage:n=[]}){if(this.id=wa++,this.label=e||"buffer"+this.id,this.count=t,this.type=s,this.stride=r||{f32:4,u32:4,i32:4,"atomic<u32>":4,"atomic<i32>":4,vec2f:8,vec2u:8,vec3f:16,vec4f:16,vec4u:16,vec4i:16,mat4x4f:64}[s],!this.stride)throw new Error(`StorageBuffer ${this.label}: pass a stride for ${s}`);this.byteLength=Math.max(16,t*this.stride),this.extraUsage=n,this.gpu=null,this.version=0,this.pendingData=a,this.isStorageBuffer=!0}getGPU(){if(!this.gpu){let e=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST|GPUBufferUsage.COPY_SRC;for(const t of this.extraUsage)e|={vertex:GPUBufferUsage.VERTEX,index:GPUBufferUsage.INDEX,indirect:GPUBufferUsage.INDIRECT,uniform:GPUBufferUsage.UNIFORM}[t];if(this.gpu=L.device.createBuffer({label:this.label,size:Math.ceil(this.byteLength/4)*4,usage:e}),this.version++,this.pendingData){const t=this.pendingData;this.pendingData=null,this.write(t)}}return this.gpu}write(e,t=0){if(!this.gpu){if(t===0){this.pendingData=e,this.getGPU();return}this.getGPU()}L.queue.writeBuffer(this.gpu,t,e.buffer||e,e.byteOffset||0,e.byteLength??void 0)}destroy(){this.gpu&&this.gpu.destroy(),this.gpu=null}}const ni=[["smpLinearRepeat","linearRepeat","filtering"],["smpLinearClamp","linearClamp","filtering"],["smpLinearMirror","linearMirror","filtering"],["smpAnisoRepeat","anisoRepeat","filtering"],["smpAnisoClamp","anisoClamp","filtering"],["smpAniso4Repeat","aniso4Repeat","filtering"],["smpNearestClamp","nearestClamp","non-filtering"],["smpNearestRepeat","nearestRepeat","non-filtering"],["smpShadow","shadow","comparison"]];let ba=0;class Y{constructor({name:e,deps:t=[],code:s="",bindings:r={},uniforms:a=null,uniformName:n=null}){this.id=ba++,this.name=e||"module"+this.id,this.deps=t.filter(Boolean),this.code=s,this.bindings={...r},a&&(this.bindings[n||Sa(a.structName)]={uniform:a}),this.isShaderModule=!0}}function Sa(i){return i[0].toLowerCase()+i.slice(1)}function vs(i){const e=[],t=new Set,s=r=>{if(!(!r||t.has(r))){t.add(r);for(const a of r.deps)s(a);e.push(r)}};for(const r of i)s(r);return e}function sr(i,e={}){const t=i.split(`
`),s=[],r=[],a=()=>r.length===0||r[r.length-1].active,n=h=>{h=h.trim();let o;if(o=/^!\s*(\w+)$/.exec(h))return!rr(e[o[1]]);if(o=/^(\w+)\s*(==|!=|>=|<=|>|<)\s*([\w.'"-]+)$/.exec(h)){const l=e[o[1]];let c=o[3].replace(/^['"]|['"]$/g,"");switch(!isNaN(Number(c))&&typeof l=="number"&&(c=Number(c)),o[2]){case"==":return l==c;case"!=":return l!=c;case">=":return l>=c;case"<=":return l<=c;case">":return l>c;case"<":return l<c}}return/\|\|/.test(h)?h.split("||").some(l=>n(l)):/&&/.test(h)?h.split("&&").every(l=>n(l)):rr(e[h])};for(const h of t){const o=h.trim();let l;if(l=/^#(if|ifdef|ifndef)\s+(.*)$/.exec(o)){const c=a();let u;l[1]==="ifdef"?u=e[l[2].trim()]!==void 0:l[1]==="ifndef"?u=e[l[2].trim()]===void 0:u=n(l[2]),r.push({active:c&&u,taken:u,parent:c});continue}if(l=/^#elif\s+(.*)$/.exec(o)){const c=r[r.length-1],u=!c.taken&&n(l[1]);c.active=c.parent&&u,c.taken=c.taken||u;continue}if(o==="#else"){const c=r[r.length-1];c.active=c.parent&&!c.taken,c.taken=!0;continue}if(o==="#endif"){r.pop();continue}a()&&s.push(h)}if(r.length)throw new Error("preprocess: unterminated #if");return s.join(`
`)}function rr(i){return i!=null&&i!==!1&&i!==0&&i!=="0"}function we(i){return typeof i=="function"?i():i}function Ma(i,e,t){const s=GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,r=t==="compute"?GPUShaderStage.COMPUTE:s;if(e.uniform){const a=e.uniform;return{layout:{visibility:r,buffer:{type:"uniform"}},decl:`var<uniform> ${i}: ${a.structName};`,struct:a}}if(e.uniformBuffer)return{layout:{visibility:r,buffer:{type:"uniform"}},decl:`var<uniform> ${i}: ${e.wgslType};`};if(e.storage){const a=we(e.storage),n=e.access||"read",h=e.wgslType||`array<${e.type||a.type}>`;return{layout:{visibility:t==="compute"?r:n==="read"?s:GPUShaderStage.FRAGMENT,buffer:{type:n==="read"?"read-only-storage":"storage"}},decl:`var<storage, ${n==="read"?"read":"read_write"}> ${i}: ${h};`}}if(e.storageTexture){const a=we(e.storageTexture),n=e.access||"write",h=e.viewDimension||e.view?.dimension||a.defaultViewDimension;return{layout:{visibility:t==="compute"?r:GPUShaderStage.FRAGMENT,storageTexture:{access:n==="write"?"write-only":n==="read"?"read-only":"read-write",format:a.format,viewDimension:h}},decl:`var ${i}: texture_storage_${h.replace("-","_")}<${a.format}, ${n}>;`}}if(e.texture){const a=we(e.texture),n=e.viewDimension||e.view?.dimension||a.defaultViewDimension;let h=e.sampleType||a.sampleType,o=e.wgslType||a.wgslType(n);return e.sampleType==="unfilterable-float"&&a.isDepth&&(o=`texture_${n.replace("-","_")}<f32>`),{layout:{visibility:r,texture:{sampleType:h,viewDimension:n,multisampled:a.sampleCount>1}},decl:`var ${i}: ${o};`}}if(e.sampler)return{layout:{visibility:r,sampler:{type:e.samplerType||"filtering"}},decl:`var ${i}: ${e.samplerType==="comparison"?"sampler_comparison":"sampler"};`};throw new Error(`binding ${i}: unknown spec`)}function za(i){if(i.uniform)return{buffer:i.uniform.getBuffer()};if(i.uniformBuffer)return{buffer:we(i.uniformBuffer)};if(i.storage){const e=we(i.storage),t=e.getGPU?e.getGPU():e;return i.offset!==void 0?{buffer:t,offset:i.offset,size:i.size}:{buffer:t}}if(i.storageTexture)return we(i.storageTexture).view(i.view||{dimension:i.viewDimension||we(i.storageTexture).defaultViewDimension,mipLevelCount:1,baseMipLevel:i.mip||0});if(i.texture){const e=we(i.texture);return i.view||i.viewDimension?e.view({...i.view||{},dimension:i.viewDimension||i.view.dimension}):e.view()}if(i.sampler)return typeof i.sampler=="string"?L.samplers[i.sampler]:i.sampler;throw new Error("unknown binding")}const oi=0,li=1,hi=2,ci=3,_a=4;function ka(i){return i.uniform?oi:i.uniformBuffer?li:i.storage?hi:i.storageTexture||i.texture?ci:_a}const Aa=4,ir=new Map;function ui(i,e){const t=JSON.stringify(i);let s=ir.get(t);return s||(s=L.device.createBindGroupLayout({label:e,entries:i}),ir.set(t,s)),s}class Cs{constructor(e,t,s="bindings",r=null,a=null){if(this.label=s,this.stage=t,this.names=Object.keys(e),this.specs=e,this.described=this.names.map(h=>Ma(h,e[h],t)),r)for(let h=0;h<this.names.length;h++){const o=this.described[h].layout,l=r[this.names[h]];l==="fragment"&&o.visibility&GPUShaderStage.FRAGMENT&&(o.visibility=GPUShaderStage.FRAGMENT),l==="vertex"&&o.visibility&GPUShaderStage.VERTEX&&(o.visibility=GPUShaderStage.VERTEX)}if(a)for(let h=0;h<this.names.length;h++){const o=this.described[h];a.has(this.names[h])&&(o.layout.buffer={type:"read-only-storage"},o.decl=o.decl.replace(/^var<uniform>/,"var<storage, read>"))}this.layout=ui(this.described.map((h,o)=>({binding:o,...h.layout})),s),this.group=null;const n=this.names.length;this._specs=this.names.map(h=>e[h]),this._kinds=this._specs.map(ka),this._blocks=this._specs.filter(h=>h.uniform).map(h=>h.uniform),this._objs=new Array(n).fill(null),this._vers=new Array(n).fill(0),this._entry=null,this._cache=[],this._token=null}declarations(e){return this.described.map((t,s)=>`@group(${e}) @binding(${s}) ${t.decl}`).join(`
`)}structs(){const e=[];for(const t of this.described)t.struct&&!e.includes(t.struct)&&e.push(t.struct);return e}getBindGroup(e){if(e!==void 0&&e===this._token&&this.group)return this.group;this._token=e;const t=this._specs,s=this._kinds,r=this._objs,a=this._vers,n=t.length;for(let c=0;c<n;c++){const u=t[c];let f=null,m=0;switch(s[c]){case oi:f=u.uniform;break;case li:f=we(u.uniformBuffer);break;case hi:f=we(u.storage),f.getGPU&&(f.getGPU(),m=f.version);break;case ci:f=we(u.storageTexture||u.texture),f&&f.getGPU&&(f.getGPU(),m=f.version);break;default:f=u.sampler}r[c]=f,a[c]=m}const h=this._blocks;for(let c=0;c<h.length;c++)h[c].upload(e);if(this._entry&&this._matches(this._entry))return this.group;const o=this._cache;for(let c=0;c<o.length;c++){const u=o[c];if(!(u===this._entry||!this._matches(u)))return this._entry=u,this.group=u.group,this.group}const l=new Array(n);for(let c=0;c<n;c++)l[c]={binding:c,resource:za(t[c])};return this.group=L.device.createBindGroup({label:this.label,layout:this.layout,entries:l}),this._entry={objs:r.slice(),vers:a.slice(),group:this.group},o.unshift(this._entry),o.length>Aa&&o.pop(),this.group}_matches(e){const t=this._objs,s=this._vers,r=e.objs,a=e.vers;for(let n=0;n<t.length;n++)if(t[n]!==r[n]||s[n]!==a[n])return!1;return!0}}let Ts=null,tt=null;function Pa(i){Ts=i,tt=null}function fi(i){if(tt||(tt={}),!tt[i]){const e={frame:{uniform:Ts}};for(const[t,s,r]of ni)e[t]={sampler:s,samplerType:r};tt[i]=new Cs(e,i,"group0-"+i)}return tt[i]}const ar=new WeakMap;function di(i,e="render"){if(i===Ts)return fi(e);let t=ar.get(i);if(t||ar.set(i,t={}),!t[e]){const s={frame:{uniform:i}};for(const[r,a,n]of ni)s[r]={sampler:a,samplerType:n};t[e]=new Cs(s,e,"group0-"+i.label)}return t[e]}function Qt({modules:i=[],bindings:e={},code:t="",defines:s={},stage:r="render",label:a="shader",header:n=""}){const h=vs(i),o={};for(const d of h)for(const v in d.bindings){if(o[v]&&o[v]!==d.bindings[v]&&!Ca(o[v],d.bindings[v]))throw new Error(`${a}: binding ${v} declared twice (${d.name})`);o[v]=d.bindings[v]}for(const d in e)o[d]=e[d];let l=null,c=null;if(r==="render"&&/@vertex\s+fn\s+vs\b/.test(t)){let d="";for(const p of h)d+=p.code+`
`;const v=sr(d+t,s),x=nr(v,"vs"),b=/@fragment\s+fn\s+fs\b/.test(v)?nr(v,"fs"):null;l={};for(const p in o)!x.has(p)&&(!b||b.has(p))?l[p]="fragment":b&&!b.has(p)&&x.has(p)&&(l[p]="vertex");c=new Set;const w=L.limits||{},M=(w.maxUniformBuffersPerShaderStage||12)-2,z={vertex:w.maxStorageBuffersInVertexStage??4,fragment:w.maxStorageBuffersInFragmentStage??w.maxStorageBuffersPerShaderStage??8},A=(p,g)=>!l[p]||l[p]===g;for(const p of["fragment","vertex"]){const g=Object.keys(o).filter(C=>o[C].uniform&&A(C,p)&&!c.has(C));let S=Object.keys(o).filter(C=>(o[C].storage||c.has(C))&&A(C,p)).length;g.sort((C,P)=>(l[C]===p?0:1)-(l[P]===p?0:1));let _=g.length;for(const C of g){if(_<=M||S>=z[p])break;c.add(C),S++,_--}}}const u=new Cs(o,r,a+".g1",l,c),f=fi(r),m=[...new Set([...f.structs(),...u.structs()])];let y="";L.features.has("shader-f16")&&s.F16&&(y+=`enable f16;
`),s.CLIP_DISTANCES&&(y+=`enable clip_distances;
`),/diagnostic\s*\(\s*off\s*,\s*derivative_uniformity/.test(n)||(y+=`diagnostic( off, derivative_uniformity );
`),y+=n,y+=m.map(d=>d.wgsl).join(`
`)+`
`,y+=f.declarations(0)+`
`,y+=u.declarations(1)+`
`;for(const d of h)y+=`// ---- ${d.name}
${d.code}
`;return y+=t,{code:sr(y,s),bindings:u,group0:f,modules:h}}function nr(i,e){const t=new Map,s=/\bfn\s+([A-Za-z_]\w*)\s*\(/g;let r;for(;r=s.exec(i);){const o=i.indexOf("{",r.index);if(o<0)break;let l=0,c=o;for(;c<i.length;c++){const f=i[c];if(f==="{")l++;else if(f==="}"&&--l===0)break}(!/@(vertex|fragment|compute)[^;{}]*$/.test(i.slice(Math.max(0,r.index-80),r.index))||r[1]===e)&&t.set(r[1],i.slice(r.index,c+1)),s.lastIndex=c+1}const a=new Set,n=[e],h=new Set;for(;n.length;){const o=n.pop();if(!(h.has(o)||!t.has(o))){h.add(o);for(const l of t.get(o).match(/[A-Za-z_]\w*/g)||[])a.add(l),t.has(l)&&!h.has(l)&&n.push(l)}}return a}function Ca(i,e){const t=Object.keys(i),s=Object.keys(e);return t.length===s.length&&t.every(r=>i[r]===e[r])}const or=new Map;function Jt(i,e){let t=or.get(i);return t||(t=L.device.createShaderModule({label:e,code:i}),or.set(i,t),t.getCompilationInfo&&t.getCompilationInfo().then(s=>{const r=s.messages.filter(n=>n.type==="error");if(!r.length)return;const a=i.split(`
`);for(const n of r){const h=Math.max(0,n.lineNum-4),o=Math.min(a.length,n.lineNum+2),l=a.slice(h,o).map((c,u)=>`${h+u+1}${h+u+1===n.lineNum?">":" "} ${c}`).join(`
`);console.error(`WGSL error in ${e} (${n.lineNum}:${n.linePos}): ${n.message}
${l}`)}}),t)}class ge{constructor({label:e="kernel",modules:t=[],bindings:s={},code:r,workgroupSize:a=[64,1,1],defines:n={},entryPoint:h="main"}){this.label=e,this.workgroupSize=a;const[o,l=1,c=1]=a,u=r.replace(/\bWG_X\b/g,o).replace(/\bWG_Y\b/g,l).replace(/\bWG_Z\b/g,c),f=Qt({modules:t,bindings:s,code:u,defines:n,stage:"compute",label:e});this.source=f.code,this.bindings=f.bindings,this.group0=f.group0;const m=Jt(f.code,e);this.handle=L.computePipeline({label:e,layout:L.device.createPipelineLayout({bindGroupLayouts:[f.group0.layout,f.bindings.layout]}),compute:{module:m,entryPoint:h}}),this.timestampWrites=null}get pipeline(){return L.ready(this.handle)}dispatch(e,{pass:t=null,indirect:s=null}={}){const[r,a=1,n=1]=Array.isArray(e)?e:[e];if(!s&&(r===0||a===0||n===0))return;const h=o=>{o.setPipeline(L.ready(this.handle)),o.setBindGroup(0,this.group0.getBindGroup()),o.setBindGroup(1,this.bindings.getBindGroup()),s?o.dispatchWorkgroupsIndirect(s.buffer.getGPU?s.buffer.getGPU():s.buffer,s.offset||0):o.dispatchWorkgroups(r,a,n)};t?h(t):L.computePass(this.label,h,this.timestampWrites||void 0)}groups(e,t=1,s=1){const[r,a=1,n=1]=this.workgroupSize;return[Math.ceil(e/r),Math.ceil(t/a),Math.ceil(s/n)]}}const lr=new Map;let Ft=null;function Ta(i){let e=lr.get(i);return e||(Ft||(Ft=L.device.createShaderModule({label:"mipmap",code:`
		struct VSOut { @builtin( position ) pos: vec4f, @location( 0 ) uv: vec2f };
		@vertex fn vs( @builtin( vertex_index ) i: u32 ) -> VSOut {
			let p = vec2f( f32( ( i << 1u ) & 2u ), f32( i & 2u ) );
			var o: VSOut;
			o.pos = vec4f( p * 2.0 - 1.0, 0.0, 1.0 );
			o.uv = vec2f( p.x, 1.0 - p.y );
			return o;
		}
		@group( 0 ) @binding( 0 ) var src: texture_2d<f32>;
		@group( 0 ) @binding( 1 ) var smp: sampler;
		@fragment fn fs( in: VSOut ) -> @location( 0 ) vec4f {
			return textureSampleLevel( src, smp, in.uv, 0.0 );
		}
	`})),e=L.device.createRenderPipeline({label:"mipmap "+i,layout:"auto",vertex:{module:Ft,entryPoint:"vs"},fragment:{module:Ft,entryPoint:"fs",targets:[{format:i}]},primitive:{topology:"triangle-list"}}),lr.set(i,e),e)}const hr=new WeakMap;function La(i,e,t){let s=hr.get(i);if(s&&s.gpu===e)return s;const r=i.mipLevelCount,a=i.dimension==="3d"?1:i.depth,n=[],h=t.getBindGroupLayout(0);for(let o=0;o<a;o++)for(let l=1;l<r;l++){const c=e.createView({dimension:"2d",baseMipLevel:l-1,mipLevelCount:1,baseArrayLayer:o,arrayLayerCount:1}),u=e.createView({dimension:"2d",baseMipLevel:l,mipLevelCount:1,baseArrayLayer:o,arrayLayerCount:1}),f=L.device.createBindGroup({label:"mipmap "+i.label,layout:h,entries:[{binding:0,resource:c},{binding:1,resource:L.samplers.linearClamp}]});n.push({bg:f,desc:{label:"mipmap",colorAttachments:[{view:u,loadOp:"clear",storeOp:"store",clearValue:[0,0,0,0]}]}})}return s={gpu:e,pipeline:t,steps:n},hr.set(i,s),s}function Fa(i,e=L.getEncoder()){if(i.mipLevelCount<2)return;const t=i.getGPU(),s=Ta(i.format),{steps:r}=La(i,t,s);for(let a=0;a<r.length;a++){const n=e.beginRenderPass(r[a].desc);n.setPipeline(s),n.setBindGroup(0,r[a].bg),n.draw(3),n.end()}}const pi={view:"mat4x4f",proj:"mat4x4f",viewProj:"mat4x4f",invView:"mat4x4f",invProj:"mat4x4f",invViewProj:"mat4x4f",viewProjNoJitter:"mat4x4f",prevViewProjNoJitter:"mat4x4f",cameraPos:["vec3f",new k],near:["f32",.1],prevCameraPos:["vec3f",new k],far:["f32",6e4],resolution:["vec2f",new ee(1,1)],invResolution:["vec2f",new ee(1,1)],outputResolution:["vec2f",new ee(1,1)],jitter:["vec2f",new ee],prevJitter:["vec2f",new ee],frameIndex:["u32",0],time:["f32",0],dt:["f32",1/60],seaLevel:["f32",0],sunDir:["vec3f",new k(.3,.6,-.7).normalize()],night:["f32",0],sunColor:["vec3f",new ke(1,1,1)],exposure:["f32",1],skyIrradiance:["vec3f",new ke(.3,.4,.6)],cameraUnderwater:["f32",0],horizonColor:["vec3f",new ke(.6,.7,.8)],cameraWaterHeight:["f32",0],waterAbsorption:["vec3f",new k(.42,.075,.035)],windSpeed:["f32",7],waterScattering:["vec3f",new k(.012,.018,.024)],envIntensity:["f32",1],windDir:["vec2f",new ee(.35,.94).normalize()],reversedDepth:["f32",1],pad0:["f32",0],debug:["vec4f",new G]},Da=["view","proj","viewProj","invView","invProj","invViewProj","viewProjNoJitter","prevViewProjNoJitter","cameraPos","near","prevCameraPos","far","resolution","invResolution","jitter","prevJitter","reversedDepth"],Re=new ue("Frame",pi,{label:"frame"});Pa(Re);function Ba(i){const e=new ue("Frame",pi,{label:i});return e.onBeforePack=()=>{for(const t of Re.order)Da.includes(t)||(e.fields[t].value=Re.fields[t].value)},e}const oe=Re.fields,de={time:oe.time,dt:oe.dt,seaLevel:oe.seaLevel,sunDir:oe.sunDir,sunColor:oe.sunColor,skyIrradiance:oe.skyIrradiance,horizonColor:oe.horizonColor,waterAbsorption:oe.waterAbsorption,waterScattering:oe.waterScattering,cameraUnderwater:oe.cameraUnderwater,cameraWaterHeight:oe.cameraWaterHeight,exposure:oe.exposure,windDir:oe.windDir,windSpeed:oe.windSpeed,night:oe.night,envIntensity:oe.envIntensity},Et=9.81,cr=new U;function mi(i,e,t,{jitterX:s=0,jitterY:r=0,prevViewProj:a=null,prevCameraPos:n=null,block:h=Re}={}){const o=h.fields;i.updateMatrixWorld(),i.matrixWorldInverse&&i.matrixWorldInverse.copy(i.matrixWorld).invert();const l=i.matrixWorldInverse,c=i.projectionMatrix;o.view.value=l.clone(),o.proj.value=c.clone();const u=new U().multiplyMatrices(c,l);o.viewProjNoJitter.value=u.clone();const f=2*s/e,m=2*r/t;cr.makeTranslation(f,m,0);const y=new U().multiplyMatrices(cr,u);o.viewProj.value=y,o.invView.value=i.matrixWorld.clone(),o.invProj.value=c.clone().invert(),o.invViewProj.value=y.clone().invert(),o.prevViewProjNoJitter.value=a?a.clone():u.clone(),o.cameraPos.value=new k().setFromMatrixPosition(i.matrixWorld),o.prevCameraPos.value=n?n.clone():o.cameraPos.value.clone(),o.near.value=i.near,o.far.value=i.far,o.resolution.value=new ee(e,t),o.invResolution.value=new ee(1/e,1/t),o.prevJitter.value=o.jitter.value?o.jitter.value.clone():new ee,o.jitter.value=new ee(f,m),o.reversedDepth.value=i.reversedDepth===!1?0:1}let ur=0;const Ra={color:["vec3f",null],opacity:["f32",1],emissive:["vec3f",null],roughness:["f32",1],metalness:["f32",0],alphaTest:["f32",0]};class ot{constructor(e={}){this.id=ur++,this.isMaterial=!0,this.name=e.name||"material"+this.id,this.version=0,this.modules=e.modules||[],this.varyings=e.varyings||{},this.attributes=e.attributes||{},this.vertex=e.vertex||"",this.surface=e.surface||"",this.output=e.output||"",this.shadow=e.shadow||"",this.defines={...e.defines||{}},this.lit=e.lit!==!1,this.side=e.side||"front",this.transparent=!!e.transparent,this.blending=e.blending||(this.transparent?"normal":"none"),this.depthWrite=e.depthWrite??!this.transparent,this.depthTest=e.depthTest??!0,this.depthCompare=e.depthCompare||null,this.depthBias=e.depthBias||0,this.depthBiasSlopeScale=e.depthBiasSlopeScale||0,this.colorWrite=e.colorWrite??!0,this.topology=e.topology||"triangle-list",this.visible=e.visible??!0,this.vertexColors=!!e.vertexColors,this.velocityWeight=e.velocityWeight??1,this.underwaterLighting=e.underwaterLighting||"full",this.appliesHillShadow=!!e.appliesHillShadow,this.localLightsCheap=!!e.localLightsCheap,this.receiveShadows=e.receiveShadows??!0,this.userData=e.userData||{};const t={...Ra};for(const r in e.uniforms||{})t[r]=e.uniforms[r];this.uniformBlock=new ue("MaterialParams"+this.id,t,{label:this.name}),this.uniforms=this.uniformBlock.fields;const s=this.uniforms;s.color.value=Dt(e.color,new ke(1,1,1)),s.emissive.value=Dt(e.emissive,new ke(0,0,0)),e.roughness!==void 0&&(s.roughness.value=e.roughness),e.metalness!==void 0&&(s.metalness.value=e.metalness),e.opacity!==void 0&&(s.opacity.value=e.opacity),e.alphaTest!==void 0&&(s.alphaTest.value=e.alphaTest),this.bindings={};for(const r in e.textures||{}){const a=e.textures[r];this.bindings[r]=a&&a.isTexture?{texture:a}:typeof a=="function"?{texture:a}:a}for(const r in e.storage||{}){const a=e.storage[r];this.bindings[r]=a&&a.isStorageBuffer?{storage:a,access:"read"}:a}Object.assign(this.bindings,e.bindings||{}),this._listeners=[]}get color(){return this.uniforms.color.value}set color(e){this.uniforms.color.value=Dt(e,this.uniforms.color.value)}get emissive(){return this.uniforms.emissive.value}set emissive(e){this.uniforms.emissive.value=Dt(e,this.uniforms.emissive.value)}get roughness(){return this.uniforms.roughness.value}set roughness(e){this.uniforms.roughness.value=e}get metalness(){return this.uniforms.metalness.value}set metalness(e){this.uniforms.metalness.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms.opacity.value=e}get alphaTest(){return this.uniforms.alphaTest.value}set alphaTest(e){e>0!=this.uniforms.alphaTest.value>0&&(this.needsUpdate=!0),this.uniforms.alphaTest.value=e}set(e,t){this.uniformBlock.set(e,t)}set needsUpdate(e){e&&this.version++}setDefine(e,t){this.defines[e]!==t&&(this.defines[e]=t,this.version++)}pipelineKey(){return`${this.id}.${this.version}.${this.side}.${this.transparent}.${typeof this.blending=="string"?this.blending:JSON.stringify(this.blending)}.${this.depthWrite}.${this.depthTest}.${this.depthCompare}.${this.colorWrite}.${this.topology}.${this.alphaTest>0}.${this.underwaterLighting}.${this.appliesHillShadow}.${this.localLightsCheap}.${this.receiveShadows}.${this.depthBias}.${this.depthBiasSlopeScale}.${this.vertexColors}`}allDefines(){return{...this.defines,UNDERWATER_LIGHTING:{none:0,lite:1,full:2}[this.underwaterLighting]??2,HILL_SHADOW_SELF:this.appliesHillShadow?1:0,LOCAL_LIGHTS_CHEAP:this.localLightsCheap?1:0,ALPHA_TEST:this.alphaTest>0?1:0,DOUBLE_SIDED:this.side==="double"?1:0,BACK_SIDE:this.side==="back"?1:0,TRANSPARENT:this.transparent?1:0,RECEIVE_SHADOWS:this.receiveShadows?1:0}}addEventListener(e,t){e==="dispose"&&this._listeners.push(t)}dispose(){for(const e of this._listeners)e({target:this})}clone(){const e=Object.create(Object.getPrototypeOf(this));return Object.assign(e,this),e.id=ur++,e.version=0,e.defines={...this.defines},e.bindings={...this.bindings},e.uniformBlock=new ue("MaterialParams"+e.id,Object.fromEntries(this.uniformBlock.order.map(t=>[t,[this.uniformBlock.layout[t].typeStr,yi(this.uniforms[t].value)]])),{label:e.name}),e.uniforms=e.uniformBlock.fields,e._listeners=[],e}}function yi(i){return i&&typeof i=="object"&&i.clone?i.clone():Array.isArray(i)?i.map(yi):i}function Dt(i,e){return i==null?e:i.isColor?e.copy?e.copy(i):i.clone():typeof i=="number"||typeof i=="string"?e.set(i):Array.isArray(i)?e.setRGB(i[0],i[1],i[2]):i.isVector3?e.setRGB(i.x,i.y,i.z):e}function Wt(i){if(!i||i==="none")return;if(typeof i=="object")return i;const e=(t,s,r="add")=>({srcFactor:t,dstFactor:s,operation:r});switch(i){case"normal":return{color:e("src-alpha","one-minus-src-alpha"),alpha:e("one","one-minus-src-alpha")};case"premultiplied":return{color:e("one","one-minus-src-alpha"),alpha:e("one","one-minus-src-alpha")};case"additive":return{color:e("src-alpha","one"),alpha:e("zero","one")};case"add":return{color:e("one","one"),alpha:e("one","one")};case"multiply":return{color:e("dst","zero"),alpha:e("zero","one")};case"min":return{color:e("one","one","min"),alpha:e("one","one","min")};case"max":return{color:e("one","one","max"),alpha:e("one","one","max")}}throw new Error("unknown blending "+i)}const Z=new Y({name:"common",code:`
const PI: f32 = 3.141592653589793;
const TWO_PI: f32 = 6.283185307179586;
const INV_PI: f32 = 0.3183098861837907;
const EPS: f32 = 1e-5;

fn sat( x: f32 ) -> f32 { return clamp( x, 0.0, 1.0 ); }
fn sat3( x: vec3f ) -> vec3f { return clamp( x, vec3f( 0.0 ), vec3f( 1.0 ) ); }
fn pow2( x: f32 ) -> f32 { return x * x; }
fn pow4( x: f32 ) -> f32 { let y = x * x; return y * y; }
fn pow5( x: f32 ) -> f32 { let y = x * x; return y * y * x; }
fn luminance( c: vec3f ) -> f32 { return dot( c, vec3f( 0.2126, 0.7152, 0.0722 ) ); }
fn remap( x: f32, a: f32, b: f32, c: f32, d: f32 ) -> f32 { return c + ( x - a ) * ( d - c ) / ( b - a ); }
fn remapClamp( x: f32, a: f32, b: f32, c: f32, d: f32 ) -> f32 { return mix( c, d, sat( ( x - a ) / ( b - a ) ) ); }
fn rotate2( v: vec2f, a: f32 ) -> vec2f { let c = cos( a ); let s = sin( a ); return vec2f( c * v.x - s * v.y, s * v.x + c * v.y ); }

// ---- depth (reversed-Z: 1 at the near plane, 0 at far / infinity)

// positive view-space distance along the view axis from a depth-buffer value
fn viewDepth( d: f32 ) -> f32 {
	let v = frame.invProj * vec4f( 0.0, 0.0, d, 1.0 );
	return - v.z / v.w;
}

// uv (0..1, y down) + depth -> world / view position
fn ndcFromUv( uv: vec2f, d: f32 ) -> vec4f { return vec4f( uv.x * 2.0 - 1.0, 1.0 - uv.y * 2.0, d, 1.0 ); }
fn worldFromDepth( uv: vec2f, d: f32 ) -> vec3f {
	let p = frame.invViewProj * ndcFromUv( uv, d );
	return p.xyz / p.w;
}
fn viewFromDepth( uv: vec2f, d: f32 ) -> vec3f {
	let p = frame.invProj * ndcFromUv( uv, d );
	return p.xyz / p.w;
}
// world direction of the camera ray through uv
fn viewRay( uv: vec2f ) -> vec3f {
	let p = frame.invViewProj * ndcFromUv( uv, 0.5 );
	return normalize( p.xyz / p.w - frame.cameraPos );
}
// world position -> uv (y down) and depth
fn projectToUv( P: vec3f ) -> vec3f {
	let c = frame.viewProjNoJitter * vec4f( P, 1.0 );
	let n = c.xyz / c.w;
	return vec3f( n.x * 0.5 + 0.5, 0.5 - n.y * 0.5, n.z );
}
fn isSky( d: f32 ) -> bool { return d <= 0.0; }

// ---- hashes

fn pcg( v: u32 ) -> u32 {
	let state = v * 747796405u + 2891336453u;
	let word = ( ( state >> ( ( state >> 28u ) + 4u ) ) ^ state ) * 277803737u;
	return ( word >> 22u ) ^ word;
}
fn pcg3( v0: vec3u ) -> vec3u {
	var v = v0 * 1664525u + 1013904223u;
	v.x += v.y * v.z; v.y += v.z * v.x; v.z += v.x * v.y;
	v ^= v >> vec3u( 16u );
	v.x += v.y * v.z; v.y += v.z * v.x; v.z += v.x * v.y;
	return v;
}
fn u32ToUnit( h: u32 ) -> f32 { return f32( h >> 8u ) * ( 1.0 / 16777216.0 ) + ( 0.5 / 16777216.0 ); }
// float hash in [0, 1) of a float seed (TSL hash())
fn hash11( p: f32 ) -> f32 { return u32ToUnit( pcg( bitcast<u32>( p ) ^ 0x9e3779b9u ) ); }
fn hash21( p: vec2f ) -> f32 { return u32ToUnit( pcg( bitcast<u32>( p.x ) ^ pcg( bitcast<u32>( p.y ) ) ) ); }
fn hash31( p: vec3f ) -> f32 { return u32ToUnit( pcg3( bitcast<vec3u>( p ) ).x ); }
fn hash22( p: vec2f ) -> vec2f {
	let h = pcg3( vec3u( bitcast<vec2u>( p ), 0x51ed270bu ) );
	return vec2f( u32ToUnit( h.x ), u32ToUnit( h.y ) );
}
fn hash33( p: vec3f ) -> vec3f {
	let h = pcg3( bitcast<vec3u>( p ) );
	return vec3f( u32ToUnit( h.x ), u32ToUnit( h.y ), u32ToUnit( h.z ) );
}
fn hashU( a: u32, b: u32 ) -> f32 { return u32ToUnit( pcg( a ^ pcg( b ) ) ); }
fn ihash3( p: vec3i ) -> vec3u { return pcg3( bitcast<vec3u>( p ) ); }

// Jimenez interleaved gradient noise at a pixel (0..1)
fn interleavedGradientNoise( px: vec2f ) -> f32 { return fract( 52.9829189 * fract( dot( px, vec2f( 0.06711056, 0.00583715 ) ) ) ); }

// i-th of n points of a Vogel disc (unit radius), rotated by phi
fn vogelDiskSample( i: i32, n: i32, phi: f32 ) -> vec2f {
	let r = sqrt( ( f32( i ) + 0.5 ) / f32( n ) );
	let theta = f32( i ) * 2.399963229728653 + phi;
	return vec2f( cos( theta ), sin( theta ) ) * r;
}

// ---- gradient noise: MaterialX (three's MaterialXNoise.js) bit for bit — the same Jenkins
// lookup3 hash, gradients, quintic fade and gradient scales (0.6616 in 2D, 0.982 in 3D), so the
// procedural patterns land where they did in the three.js version.

fn _mxRotl( x: u32, k: u32 ) -> u32 { return ( x << k ) | ( x >> ( 32u - k ) ); }
fn _mxFinal( a0: u32, b0: u32, c0: u32 ) -> u32 {
	var a = a0; var b = b0; var c = c0;
	c ^= b; c -= _mxRotl( b, 14u );
	a ^= c; a -= _mxRotl( c, 11u );
	b ^= a; b -= _mxRotl( a, 25u );
	c ^= b; c -= _mxRotl( b, 16u );
	a ^= c; a -= _mxRotl( c, 4u );
	b ^= a; b -= _mxRotl( a, 14u );
	c ^= b; c -= _mxRotl( b, 24u );
	return c;
}
fn mxHash2( x: i32, y: i32 ) -> u32 { let s = 0xdeadbeefu + ( 2u << 2u ) + 13u; return _mxFinal( s + u32( x ), s + u32( y ), s ); }
fn mxHash3( x: i32, y: i32, z: i32 ) -> u32 { let s = 0xdeadbeefu + ( 3u << 2u ) + 13u; return _mxFinal( s + u32( x ), s + u32( y ), s + u32( z ) ); }
fn _mxGrad2( hash: u32, x: f32, y: f32 ) -> f32 {
	let h = hash & 7u;
	let u = select( y, x, h < 4u );
	let v = 2.0 * select( x, y, h < 4u );
	return select( u, - u, ( h & 1u ) != 0u ) + select( v, - v, ( h & 2u ) != 0u );
}
fn _gradDot3( h: u32, p: vec3f ) -> f32 {
	let hh = h & 15u;
	let u = select( p.y, p.x, hh < 8u );
	let v = select( select( p.z, p.x, hh == 12u || hh == 14u ), p.y, hh < 4u );
	return select( u, - u, ( hh & 1u ) != 0u ) + select( v, - v, ( hh & 2u ) != 0u );
}
fn _fade3( t: vec3f ) -> vec3f { return t * t * t * ( t * ( t * 6.0 - 15.0 ) + 10.0 ); }
fn _h3( i: vec3i ) -> u32 { return mxHash3( i.x, i.y, i.z ); }

fn perlin3( p: vec3f ) -> f32 {
	let fl = floor( p );
	let i = vec3i( fl );
	let f = p - fl;
	let u = _fade3( f );
	let n000 = _gradDot3( _h3( i ), f );
	let n100 = _gradDot3( _h3( i + vec3i( 1, 0, 0 ) ), f - vec3f( 1.0, 0.0, 0.0 ) );
	let n010 = _gradDot3( _h3( i + vec3i( 0, 1, 0 ) ), f - vec3f( 0.0, 1.0, 0.0 ) );
	let n110 = _gradDot3( _h3( i + vec3i( 1, 1, 0 ) ), f - vec3f( 1.0, 1.0, 0.0 ) );
	let n001 = _gradDot3( _h3( i + vec3i( 0, 0, 1 ) ), f - vec3f( 0.0, 0.0, 1.0 ) );
	let n101 = _gradDot3( _h3( i + vec3i( 1, 0, 1 ) ), f - vec3f( 1.0, 0.0, 1.0 ) );
	let n011 = _gradDot3( _h3( i + vec3i( 0, 1, 1 ) ), f - vec3f( 0.0, 1.0, 1.0 ) );
	let n111 = _gradDot3( _h3( i + vec3i( 1, 1, 1 ) ), f - vec3f( 1.0, 1.0, 1.0 ) );
	let x0 = mix( mix( n000, n100, u.x ), mix( n010, n110, u.x ), u.y );
	let x1 = mix( mix( n001, n101, u.x ), mix( n011, n111, u.x ), u.y );
	return mix( x0, x1, u.z ) * 0.982;
}
fn perlin2( p: vec2f ) -> f32 {
	let fl = floor( p );
	let X = i32( fl.x ); let Y = i32( fl.y );
	let fx = p.x - fl.x; let fy = p.y - fl.y;
	let u = _fade3( vec3f( fx, fy, 0.0 ) );
	let v0 = _mxGrad2( mxHash2( X, Y ), fx, fy );
	let v1 = _mxGrad2( mxHash2( X + 1, Y ), fx - 1.0, fy );
	let v2 = _mxGrad2( mxHash2( X, Y + 1 ), fx, fy - 1.0 );
	let v3 = _mxGrad2( mxHash2( X + 1, Y + 1 ), fx - 1.0, fy - 1.0 );
	let s1 = 1.0 - u.x;
	return ( ( 1.0 - u.y ) * ( v0 * s1 + v1 * u.x ) + u.y * ( v2 * s1 + v3 * u.x ) ) * 0.6616;
}
fn mx_noise_float3( p: vec3f ) -> f32 { return perlin3( p ); }
fn mx_noise_float2( p: vec2f ) -> f32 { return perlin2( p ); }
// MaterialX vec3 noise: one hash per corner, its three low bytes pick the gradients
fn _mxGrad3v( h: u32, p: vec3f ) -> vec3f { return vec3f( _gradDot3( h & 0xffu, p ), _gradDot3( ( h >> 8u ) & 0xffu, p ), _gradDot3( ( h >> 16u ) & 0xffu, p ) ); }
fn mx_noise_vec3( p: vec3f ) -> vec3f {
	let fl = floor( p );
	let i = vec3i( fl );
	let f = p - fl;
	let u = _fade3( f );
	let n000 = _mxGrad3v( _h3( i ), f );
	let n100 = _mxGrad3v( _h3( i + vec3i( 1, 0, 0 ) ), f - vec3f( 1.0, 0.0, 0.0 ) );
	let n010 = _mxGrad3v( _h3( i + vec3i( 0, 1, 0 ) ), f - vec3f( 0.0, 1.0, 0.0 ) );
	let n110 = _mxGrad3v( _h3( i + vec3i( 1, 1, 0 ) ), f - vec3f( 1.0, 1.0, 0.0 ) );
	let n001 = _mxGrad3v( _h3( i + vec3i( 0, 0, 1 ) ), f - vec3f( 0.0, 0.0, 1.0 ) );
	let n101 = _mxGrad3v( _h3( i + vec3i( 1, 0, 1 ) ), f - vec3f( 1.0, 0.0, 1.0 ) );
	let n011 = _mxGrad3v( _h3( i + vec3i( 0, 1, 1 ) ), f - vec3f( 0.0, 1.0, 1.0 ) );
	let n111 = _mxGrad3v( _h3( i + vec3i( 1, 1, 1 ) ), f - vec3f( 1.0, 1.0, 1.0 ) );
	let x0 = mix( mix( n000, n100, u.x ), mix( n010, n110, u.x ), u.y );
	let x1 = mix( mix( n001, n101, u.x ), mix( n011, n111, u.x ), u.y );
	return mix( x0, x1, u.z ) * 0.982;
}
fn mx_fractal_noise_float3( p: vec3f, octaves: i32, lacunarity: f32, diminish: f32 ) -> f32 {
	var r = 0.0; var amp = 1.0; var q = p;
	for ( var i = 0; i < octaves; i++ ) { r += amp * perlin3( q ); amp *= diminish; q *= lacunarity; }
	return r;
}
fn mx_cell_noise_float3( p: vec3f ) -> f32 { let i = vec3i( floor( p ) ); return f32( mxHash3( i.x, i.y, i.z ) ) / f32( 0xffffffffu ); }
fn mx_cell_noise_float2( p: vec2f ) -> f32 { let i = vec2i( floor( p ) ); return f32( mxHash2( i.x, i.y ) ) / f32( 0xffffffffu ); }
// distances to the nearest two feature points (F1, F2), jitter 0..1
fn mx_worley_noise_vec2_3( p: vec3f, jitter: f32 ) -> vec2f {
	let i = vec3i( floor( p ) );
	let f = fract( p );
	var d1 = 1e9; var d2 = 1e9;
	for ( var z = -1; z <= 1; z++ ) { for ( var y = -1; y <= 1; y++ ) { for ( var x = -1; x <= 1; x++ ) {
		let c = vec3i( x, y, z );
		let h = ihash3( i + c );
		let o = vec3f( f32( c.x ), f32( c.y ), f32( c.z ) ) + ( vec3f( u32ToUnit( h.x ), u32ToUnit( h.y ), u32ToUnit( h.z ) ) - 0.5 ) * jitter + 0.5 - f;
		let d = dot( o, o );
		if ( d < d1 ) { d2 = d1; d1 = d; } else if ( d < d2 ) { d2 = d; }
	} } }
	return sqrt( vec2f( d1, d2 ) );
}
fn mx_worley_noise_vec2_2( p: vec2f, jitter: f32 ) -> vec2f {
	let i = vec2i( floor( p ) );
	let f = fract( p );
	var d1 = 1e9; var d2 = 1e9;
	for ( var y = -1; y <= 1; y++ ) { for ( var x = -1; x <= 1; x++ ) {
		let c = vec2i( x, y );
		let h = ihash3( vec3i( i + c, 0 ) );
		let o = vec2f( f32( c.x ), f32( c.y ) ) + ( vec2f( u32ToUnit( h.x ), u32ToUnit( h.y ) ) - 0.5 ) * jitter + 0.5 - f;
		let d = dot( o, o );
		if ( d < d1 ) { d2 = d1; d1 = d; } else if ( d < d2 ) { d2 = d; }
	} }
	return sqrt( vec2f( d1, d2 ) );
}

// ---- normals

// orthonormal basis around n (Frisvad / Duff et al.)
fn basis( n: vec3f ) -> mat3x3f {
	let s = select( -1.0, 1.0, n.z >= 0.0 );
	let a = -1.0 / ( s + n.z );
	let b = n.x * n.y * a;
	let t = vec3f( 1.0 + s * n.x * n.x * a, s * b, -s * n.x );
	let bt = vec3f( b, s + n.y * n.y * a, -n.y );
	return mat3x3f( t, bt, n );
}

// Perturb a world-space normal by a height field sampled with screen-space derivatives
// (Mikkelsen, "Bump Mapping Unparametrized Surfaces"; TSL perturbNormal equivalent).
// dhdx / dhdy: dpdx / dpdy of the height (in metres) at this pixel.
fn perturbNormalByHeight( P: vec3f, N: vec3f, dhdx: f32, dhdy: f32, strength: f32 ) -> vec3f {
	let dPdx = dpdx( P );
	let dPdy = dpdy( P );
	let r1 = cross( dPdy, N );
	let r2 = cross( N, dPdx );
	let det = dot( dPdx, r1 );
	let grad = sign( det ) * ( dhdx * r1 + dhdy * r2 ) * strength;
	return normalize( abs( det ) * N - grad );
}

// tangent-space normal map sample (xy in -1..1) applied with a derivative-based TBN
fn perturbNormalByMap( P: vec3f, N: vec3f, uv: vec2f, mapN: vec3f ) -> vec3f {
	let dp1 = dpdx( P ); let dp2 = dpdy( P );
	let duv1 = dpdx( uv ); let duv2 = dpdy( uv );
	let dp2perp = cross( dp2, N ); let dp1perp = cross( N, dp1 );
	let T = dp2perp * duv1.x + dp1perp * duv2.x;
	let B = dp2perp * duv1.y + dp1perp * duv2.y;
	let invmax = inverseSqrt( max( max( dot( T, T ), dot( B, B ) ), 1e-20 ) );
	return normalize( mat3x3f( T * invmax, B * invmax, N ) * mapN );
}

// ---- color

fn srgbToLinear( c: vec3f ) -> vec3f {
	return select( pow( ( c + 0.055 ) / 1.055, vec3f( 2.4 ) ), c / 12.92, c <= vec3f( 0.04045 ) );
}
fn linearToSrgb( c: vec3f ) -> vec3f {
	return select( 1.055 * pow( c, vec3f( 1.0 / 2.4 ) ) - 0.055, c * 12.92, c <= vec3f( 0.0031308 ) );
}
`}),vt={hooks:{},version:0,set(i,e){this.hooks[i]=e,this.version++},modules(){return Object.values(this.hooks).filter(Boolean)}},xi={directModulation:"fn hookDirectModulation( P: vec3f, N: vec3f ) -> vec3f { return vec3f( 1.0 ); }",ambientModulation:"fn hookAmbientModulation( P: vec3f, N: vec3f ) -> vec3f { return vec3f( 1.0 ); }",shadowPosition:"fn hookShadowPosition( P: vec3f, N: vec3f, pixel: vec2f ) -> vec3f { return P; }",bounce:"fn hookBounce( P: vec3f, N: vec3f ) -> vec3f { return vec3f( 0.0 ); }",localLights:"fn hookLocalLights( s: Surface, P: vec3f, N: vec3f, V: vec3f, acc: ptr<function, LightAccum> ) {}",envSpecular:"fn hookEnvSpecular( R: vec3f, roughness: f32 ) -> vec3f { let t = sat( R.y * 0.5 + 0.5 ); return mix( frame.horizonColor * 0.6, frame.skyIrradiance * PI, t ) * frame.envIntensity; }",envDiffuse:"fn hookEnvDiffuse( N: vec3f ) -> vec3f { return mix( frame.horizonColor * 0.25, frame.skyIrradiance, N.y * 0.5 + 0.5 ) * frame.envIntensity; }"};function Ia(){const i=[];for(const e in xi){const t=vt.hooks[e];t?i.push(t):i.push($a(e))}return i}const fr={};function $a(i){return fr[i]||(fr[i]=new Y({name:"hook-"+i+"-default",deps:[He],code:xi[i]}))}const st=new ue("SunShadow",{matrices:["mat4x4f[4]",[new U,new U,new U,new U]],cascades:["vec4f[4]",[new G,new G,new G,new G]],count:["u32",0],mapSize:["f32",2048],bias:["f32",2e-5],fade:["f32",1],pcssCascades:["u32",1],sunAngularDiameter:["f32",.00925],enabled:["f32",0],pad:["f32",0],blend:["vec4f[4]",[new G,new G,new G,new G]]});let vi=null;function Na(i){vi=i}const gi=new Y({name:"sunShadow",deps:[Z],uniforms:st,uniformName:"shadowParams",bindings:{sunShadowMap:{texture:()=>vi,viewDimension:"2d-array"}},code:`
fn shadowCascadeOf( viewDist: f32 ) -> i32 {
	for ( var i = 0; i < i32( shadowParams.count ); i++ ) { if ( viewDist < shadowParams.cascades[ i ].x ) { return i; } }
	return -1;
}

fn _shadowTap( uv: vec2f, layer: i32, z: f32 ) -> f32 {
	return textureSampleCompareLevel( sunShadowMap, smpShadow, uv, layer, z );
}

// shadow map depth (0 near .. 1 far, standard Z) at uv
fn _shadowDepth( uv: vec2f, layer: i32 ) -> f32 {
	let dim = vec2f( textureDimensions( sunShadowMap ) );
	let px = vec2i( clamp( uv * dim, vec2f( 0.0 ), dim - 1.0 ) );
	return textureLoad( sunShadowMap, px, layer, 0 );
}

// Contact-hardening sun shadows (PCSS, the former SunShadowFilter) on the near cascades. The penumbra of a
// real sun shadow grows with the distance from the occluder to the receiver (the sun is a 0.53 deg disc):
// sharp where an object touches the ground, soft under a palm crown 10 m up. Per pixel:
//  1. blocker search: average depth of the occluders around the pixel (raw depth loads, no sampler)
//  2. penumbra width = occluder-receiver distance * sun diameter, converted to this cascade's texels
//  3. percentage-closer filtering over that width
// Both sample sets are Vogel disks rotated per pixel and per frame (interleaved gradient noise): the
// TAA resolves the noise into a smooth gradient. Farther cascades: three's PCFShadowFilter (5 Vogel taps
// of hardware comparisons over one texel, rotated per pixel).
const SHADOW_MAX_OCCLUDER_HEIGHT: f32 = 30.0; // m: search radius covers penumbrae of occluders up to this far above
const SHADOW_SEARCH_TAPS: i32 = 8;
const SHADOW_FILTER_TAPS: i32 = 12;

fn sunShadowCascade( P: vec3f, N: vec3f, c: i32, noise: f32, pcfNoise: f32 ) -> f32 {
	return _sunShadowCascade( P, N, c, noise, pcfNoise, true );
}

// pcss = false: the 5-tap PCF filter in every cascade (no blocker search)
fn _sunShadowCascade( P: vec3f, N: vec3f, c: i32, noise: f32, pcfNoise: f32, pcss: bool ) -> f32 {
	let info = shadowParams.cascades[ c ];
	let Pb = P + N * info.z;
	let sc = shadowParams.matrices[ c ] * vec4f( Pb, 1.0 );
	let uvz = vec3f( sc.x * 0.5 + 0.5, 0.5 - sc.y * 0.5, sc.z );
	if ( any( uvz.xy < vec2f( 0.0 ) ) || any( uvz.xy > vec2f( 1.0 ) ) || uvz.z > 1.0 ) { return 1.0; }
	let z = uvz.z - shadowParams.bias;
	let texel = 1.0 / shadowParams.mapSize;
	if ( pcss && u32( c ) < shadowParams.pcssCascades ) {
		// moved every frame (Jimenez 2014): a noise pattern fixed on screen would never average out
		let phi = noise * TWO_PI;
		let width = info.y * shadowParams.mapSize; // cascade width (m)
		let range = info.w; // depth range (m)
		let SD = shadowParams.sunAngularDiameter;
		// 1. blockers within the widest penumbra this cascade can show. The texel straight along the light
		// ray comes first: a thin occluder (a log, a rope, a rail) can fall between the disk taps, which
		// left lit dots inside its umbra.
		let searchUV = max( min( SHADOW_MAX_OCCLUDER_HEIGHT * SD / width, texel * 24.0 ), texel * 1.5 );
		let d0 = _shadowDepth( uvz.xy, c );
		var blockSum = select( 0.0, d0, d0 < z );
		var blockCount = select( 0.0, 1.0, d0 < z );
		for ( var i = 0; i < SHADOW_SEARCH_TAPS; i++ ) {
			let d = _shadowDepth( uvz.xy + vogelDiskSample( i, SHADOW_SEARCH_TAPS, phi ) * searchUV, c );
			// standard depth: an occluder is closer to the light = smaller depth
			if ( d < z ) { blockSum += d; blockCount += 1.0; }
		}
		if ( blockCount < 0.5 ) { return 1.0; }
		// 2. occluder-receiver distance (orthographic: depth is linear over the camera range)
		let dz = abs( blockSum / blockCount - z ) * range;
		let penumbraUV = clamp( dz * SD / width, texel * 1.2, texel * 32.0 );
		// 3. PCF over the penumbra
		var sum = 0.0;
		for ( var i = 0; i < SHADOW_FILTER_TAPS; i++ ) {
			let d = _shadowDepth( uvz.xy + vogelDiskSample( i, SHADOW_FILTER_TAPS, phi + 1.7 ) * penumbraUV, c );
			sum += select( 0.0, 1.0, z <= d );
		}
		return sum / f32( SHADOW_FILTER_TAPS );
	}
	// three's PCFShadowFilter: 5 samples on a Vogel disk of one texel, rotated per pixel
	let phiP = pcfNoise * TWO_PI;
	var sum = 0.0;
	for ( var i = 0; i < 5; i++ ) {
		sum += _shadowTap( uvz.xy + vogelDiskSample( i, 5, phiP ) * texel, c, z );
	}
	return sum / 5.0;
}

// visibility of the sun at P (1 = lit); pixel = fragment coordinate for the dither.
// Cascade seams blended over a band that grows with their distance (SoftCSMShadowNode: a quarter of it,
// 2.5 m at the 10 m seam, 15 m at 60 m, and the last cascade fades out over its final 100 m); each
// cascade's map is widened to cover its part of the overlap.
fn sunShadow( P: vec3f, N: vec3f, pixel: vec2f ) -> f32 {
	return _sunShadow( P, N, pixel, true );
}

// sunShadow with the plain 5-tap PCF filter everywhere (surfaces whose own detail hides penumbrae: water)
fn sunShadowPCF( P: vec3f, N: vec3f, pixel: vec2f ) -> f32 {
	return _sunShadow( P, N, pixel, false );
}

fn _sunShadow( P: vec3f, N: vec3f, pixel: vec2f, pcss: bool ) -> f32 {
	if ( shadowParams.enabled < 0.5 ) { return 1.0; }
	let dist = dot( P - frame.cameraPos, - vec3f( frame.view[ 0 ][ 2 ], frame.view[ 1 ][ 2 ], frame.view[ 2 ][ 2 ] ) );
	let noise = interleavedGradientNoise( pixel + f32( frame.frameIndex % 64u ) * 5.588238 );
	let pcfNoise = interleavedGradientNoise( pixel );
	if ( shadowParams.fade < 0.5 ) {
		let c = shadowCascadeOf( dist );
		if ( c < 0 ) { return 1.0; }
		return _sunShadowCascade( P, N, c, noise, pcfNoise, pcss );
	}
	var ret = 1.0;
	let last = i32( shadowParams.count ) - 1;
	for ( var i = 0; i <= last; i++ ) {
		let b = shadowParams.blend[ i ]; // x, y: cascade range, z / w: blend margin at its near / far seam
		let center = ( b.x + b.y ) * 0.5;
		let margin = max( select( b.w, b.z, dist < center ), 1e-5 );
		let csmX = b.x - margin * 0.5;
		let csmY = select( b.y + margin * 0.5, b.y, i == last );
		if ( dist >= csmX && dist <= csmY ) {
			var ratio = clamp( min( dist - csmX, csmY - dist ) / margin, 0.0, 1.0 );
			// no fade at the near edge of the first cascade
			if ( i == 0 && dist <= center ) { ratio = 1.0; }
			ret -= ( 1.0 - _sunShadowCascade( P, N, i, noise, pcfNoise, pcss ) ) * ratio;
		}
	}
	return max( ret, 0.0 );
}

// one depth comparison in cascade c (1 = lit; outside the map: lit). For volumetric marches (haze shafts,
// motes) where the jitter and the temporal resolve do the filtering.
fn sunShadowCascadeHard( P: vec3f, c: i32 ) -> f32 {
	let sc = shadowParams.matrices[ c ] * vec4f( P, 1.0 );
	let uv = vec2f( sc.x * 0.5 + 0.5, 0.5 - sc.y * 0.5 );
	if ( any( uv <= vec2f( 0.0 ) ) || any( uv >= vec2f( 1.0 ) ) || sc.z > 1.0 ) { return 1.0; }
	return select( 0.0, 1.0, sc.z - 2e-5 <= _shadowDepth( uv, c ) );
}
// same in the cascade covering P (by view distance), 1 beyond the last one or with shadows off
fn sunShadowHard( P: vec3f ) -> f32 {
	if ( shadowParams.enabled < 0.5 ) { return 1.0; }
	let dist = dot( P - frame.cameraPos, - vec3f( frame.view[ 0 ][ 2 ], frame.view[ 1 ][ 2 ], frame.view[ 2 ][ 2 ] ) );
	let c = shadowCascadeOf( dist );
	if ( c < 0 ) { return 1.0; }
	return sunShadowCascadeHard( P, c );
}
`}),He=new Y({name:"surface",deps:[Z],code:`
struct Surface {
	albedo: vec3f,
	alpha: f32,
	normal: vec3f,      // world space, shading normal
	roughness: f32,
	emissive: vec3f,
	metalness: f32,
	translucency: vec3f, // fraction of the direct light transmitted through thin foliage (x lightColor)
	ao: f32,
	sheenColor: vec3f,
	specularIntensity: f32,
	clearcoat: f32,
	clearcoatRoughness: f32,
	sheenRoughness: f32,
	ior: f32,
	clearcoatNormal: vec3f,
	envIntensity: f32,
};

fn defaultSurface( N: vec3f ) -> Surface {
	var s: Surface;
	s.albedo = vec3f( 1.0 ); s.alpha = 1.0; s.normal = N; s.roughness = 1.0; s.metalness = 0.0;
	s.emissive = vec3f( 0.0 ); s.translucency = vec3f( 0.0 ); s.ao = 1.0; s.sheenColor = vec3f( 0.0 );
	s.specularIntensity = 1.0; s.clearcoat = 0.0; s.clearcoatRoughness = 0.0; s.sheenRoughness = 1.0;
	s.ior = 1.5; s.clearcoatNormal = N; s.envIntensity = 1.0;
	return s;
}

// screen derivatives of the lit position, taken at the top of shadeSurface (every lane of the quad
// is live there; the sun hooks run in a branch, where derivatives are undefined)
var<private> lightDPdx: vec3f = vec3f( 0.0 );
var<private> lightDPdy: vec3f = vec3f( 0.0 );

struct LightAccum {
	directDiffuse: vec3f,
	directSpecular: vec3f,
	indirectDiffuse: vec3f,
	indirectSpecular: vec3f,
};

fn F_Schlick( f0: vec3f, f90: f32, dotVH: f32 ) -> vec3f {
	let fresnel = exp2( ( -5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + f90 * fresnel;
}
fn V_GGX_SmithCorrelated( alpha: f32, dotNL: f32, dotNV: f32 ) -> f32 {
	let a2 = alpha * alpha;
	let gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * dotNV * dotNV );
	let gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * dotNL * dotNL );
	return 0.5 / max( gv + gl, EPS );
}
fn D_GGX( alpha: f32, dotNH: f32 ) -> f32 {
	let a2 = alpha * alpha;
	let d = dotNH * dotNH * ( a2 - 1.0 ) + 1.0;
	return INV_PI * a2 / ( d * d );
}
fn BRDF_GGX( L: vec3f, V: vec3f, N: vec3f, f0: vec3f, f90: f32, roughness: f32 ) -> vec3f {
	let alpha = roughness * roughness;
	let H = normalize( L + V );
	let dotNL = sat( dot( N, L ) ); let dotNV = sat( dot( N, V ) );
	let dotNH = sat( dot( N, H ) ); let dotVH = sat( dot( V, H ) );
	return F_Schlick( f0, f90, dotVH ) * V_GGX_SmithCorrelated( alpha, dotNL, dotNV ) * D_GGX( alpha, dotNH );
}
// Charlie sheen (Estevez & Kulla)
fn D_Charlie( roughness: f32, dotNH: f32 ) -> f32 {
	let a = roughness * roughness;
	let invA = 1.0 / a;
	let cos2h = dotNH * dotNH;
	let sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invA ) * pow( sin2h, invA * 0.5 ) / ( 2.0 * PI );
}
fn V_Neubelt( dotNV: f32, dotNL: f32 ) -> f32 { return sat( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) ); }
fn BRDF_Sheen( L: vec3f, V: vec3f, N: vec3f, color: vec3f, roughness: f32 ) -> vec3f {
	let H = normalize( L + V );
	return color * D_Charlie( roughness, sat( dot( N, H ) ) ) * V_Neubelt( sat( dot( N, V ) ), sat( dot( N, L ) ) );
}
// analytical approximation of the split-sum DFG term (Karis)
fn DFGApprox( dotNV: f32, roughness: f32 ) -> vec2f {
	let c0 = vec4f( -1.0, -0.0275, -0.572, 0.022 );
	let c1 = vec4f( 1.0, 0.0425, 1.04, -0.04 );
	let r = roughness * c0 + c1;
	let a004 = min( r.x * r.x, exp2( -9.28 * dotNV ) ) * r.x + r.y;
	return vec2f( -1.04, 1.04 ) * a004 + r.zw;
}
// multi-scattering specular energy compensation (Fdez-Aguera), as three's computeMultiscattering
fn multiscatter( N: vec3f, V: vec3f, specColor: vec3f, specF90: f32, roughness: f32, single: ptr<function, vec3f>, multi: ptr<function, vec3f> ) {
	let fab = DFGApprox( sat( dot( N, V ) ), roughness );
	let Fr = specColor;
	let FssEss = Fr * fab.x + specF90 * fab.y;
	let Ess = fab.x + fab.y;
	let Ems = 1.0 - Ess;
	let Favg = Fr + ( 1.0 - Fr ) * 0.047619;
	let Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	*single += FssEss;
	*multi += Fms * Ems;
}
`}),hs=new Y({name:"lighting",deps:[Z,He,gi],code:`
// STUDIO_LIGHTING (a pass define, e.g. the fish portraits of the catch card): the world hooks are
// skipped (no shadows, caustics, cloud / hill shadow, bounce, local lights, underwater tint) and the
// environment is a neutral photo studio: a grey sweep lit from above plus one large softbox whose
// azimuth is frame.debug.x (radians, animatable). The key light is frame.sunDir / frame.sunColor of
// the view's own frame block.
fn studioEnvSpecular( R: vec3f, roughness: f32 ) -> vec3f {
	let sweep = mix( vec3f( 0.035, 0.04, 0.045 ), vec3f( 0.55, 0.57, 0.6 ), smoothstep( -0.35, 0.85, R.y ) );
	let az = atan2( R.x, R.z ) - frame.debug.x;
	let w = 0.35 + roughness * 1.6;
	let box = exp( - az * az / ( w * w ) ) * smoothstep( -0.05, 0.3, R.y ) * smoothstep( 0.98, 0.55, R.y );
	return ( sweep + box * vec3f( 2.4, 2.35, 2.25 ) / ( 1.0 + roughness * 3.0 ) ) * frame.envIntensity;
}
fn studioEnvDiffuse( N: vec3f ) -> vec3f {
	return mix( vec3f( 0.05, 0.055, 0.06 ), vec3f( 0.3, 0.31, 0.33 ), N.y * 0.5 + 0.5 ) * frame.envIntensity;
}

fn shadeSurface( s: Surface, P: vec3f, V: vec3f, pixel: vec2f ) -> vec3f {
	let N = s.normal;
	let rough = clamp( s.roughness, 0.03, 1.0 );
	let diffuseColor = s.albedo * ( 1.0 - s.metalness );
	let specF0 = mix( vec3f( 0.04 ) * s.specularIntensity, s.albedo, s.metalness );
	let specF90 = mix( s.specularIntensity, 1.0, s.metalness );
	var acc: LightAccum;
	acc.directDiffuse = vec3f( 0.0 ); acc.directSpecular = vec3f( 0.0 );
	acc.indirectDiffuse = vec3f( 0.0 ); acc.indirectSpecular = vec3f( 0.0 );

	lightDPdx = dpdx( P );
	lightDPdy = dpdy( P );

	// ---- sun / moon
	let L = frame.sunDir;
	let dotNL = sat( dot( N, L ) );
#if STUDIO_LIGHTING
	let lightColor = frame.sunColor;
#else
	// Faces turned away from the sun with no transmission get nothing from it: the modulation hooks
	// (clouds, hill shadow, caustics) and the shadow filters only run for the rest, and the filters
	// only where the hooks left light (their derivatives are taken ahead: lightDPdx / lightDPdy)
	var lightColor = vec3f( 0.0 );
	if ( dotNL > 0.0 || any( s.translucency > vec3f( 0.0 ) ) ) {
		lightColor = frame.sunColor * hookDirectModulation( P, N );
#if MATERIAL_SUN_MODULATION
		// per-material key-light multiplier (the former TerrainLightingModel: heightfield hill shadow)
		lightColor *= materialSunModulation( P, N );
#endif
		let geomN = N;
		var shadow = 0.0;
		if ( any( lightColor > vec3f( 0.0 ) ) ) {
#if REFRACTION_CLIP
			// the water's refraction source (seen blurred through the water): one hard shadow tap
			shadow = sunShadowHard( hookShadowPosition( P, geomN, pixel ) );
#else
			shadow = sunShadow( hookShadowPosition( P, geomN, pixel ), geomN, pixel );
#endif
		}
		lightColor *= shadow;
	}
#endif
	let irradiance = dotNL * lightColor;
	acc.directDiffuse += irradiance * diffuseColor * INV_PI;
	acc.directSpecular += irradiance * BRDF_GGX( L, V, N, specF0, specF90, rough );
#if SHEEN
	acc.directSpecular += irradiance * BRDF_Sheen( L, V, N, s.sheenColor, max( s.sheenRoughness, 0.07 ) );
#endif
	// thin-surface transmission (foliage): lit from behind as well
	acc.directDiffuse += s.translucency * lightColor;
#if CLEARCOAT
	let ccN = s.clearcoatNormal;
	let ccNL = sat( dot( ccN, L ) );
	let ccSpec = ccNL * lightColor * BRDF_GGX( L, V, ccN, vec3f( 0.04 ), 1.0, clamp( s.clearcoatRoughness, 0.03, 1.0 ) );
#endif

	// ---- local lights (lanterns, windows, boat lights, flashlight)
#if !STUDIO_LIGHTING
	hookLocalLights( s, P, N, V, &acc );
#endif

	// ---- indirect: environment + ground bounce
	// (three's PhysicalLightingModel: env irradiance goes through the multiscatter-compensated
	// diffuse; the ground bounce is plain Lambert)
	let R = reflect( -V, N );
	let Rr = normalize( mix( R, N, rough * rough ) );
#if STUDIO_LIGHTING
	let envIrr = studioEnvDiffuse( N ) * PI * s.envIntensity;
	let radiance = studioEnvSpecular( Rr, rough ) * s.envIntensity;
#else
	let envIrr = hookEnvDiffuse( N ) * PI * s.envIntensity;
	let radiance = hookEnvSpecular( Rr, rough ) * s.envIntensity;
#endif
	var single = vec3f( 0.0 ); var multi = vec3f( 0.0 );
	multiscatter( N, V, specF0, specF90, rough, &single, &multi );
	let totalScatter = single + multi;
	let diffuseMS = diffuseColor * ( 1.0 - max( max( totalScatter.r, totalScatter.g ), totalScatter.b ) );
	acc.indirectSpecular += radiance * single + multi * envIrr * INV_PI;
#if STUDIO_LIGHTING
	acc.indirectDiffuse += diffuseMS * envIrr * INV_PI;
#else
	acc.indirectDiffuse += diffuseMS * envIrr * INV_PI + hookBounce( P, N ) * diffuseColor;
#endif

	// ambient occlusion (specular occlusion after Lagarde)
	let dotNV = sat( dot( N, V ) );
	let specAO = sat( pow( dotNV + s.ao, exp2( -16.0 * rough - 1.0 ) ) - 1.0 + s.ao );
	acc.indirectDiffuse *= s.ao;
	acc.indirectSpecular *= specAO;
#if STUDIO_LIGHTING
	let amb = vec3f( 1.0 );
#else
	let amb = hookAmbientModulation( P, N );
#endif
	acc.indirectDiffuse *= amb;
	acc.indirectSpecular *= amb;

	var color = acc.directDiffuse + acc.directSpecular + acc.indirectDiffuse + acc.indirectSpecular;
#if SHEEN
	color += s.sheenColor * envIrr * INV_PI * 0.5 * s.ao * amb;
#endif
#if CLEARCOAT
	let ccNV = sat( dot( ccN, V ) );
	let Fcc = F_Schlick( vec3f( 0.04 ), 1.0, ccNV ) * s.clearcoat;
#if STUDIO_LIGHTING
	let ccRad = studioEnvSpecular( reflect( -V, ccN ), clamp( s.clearcoatRoughness, 0.03, 1.0 ) ) * amb * specAO;
#else
	let ccRad = hookEnvSpecular( reflect( -V, ccN ), clamp( s.clearcoatRoughness, 0.03, 1.0 ) ) * amb * specAO;
#endif
	color = color * ( 1.0 - Fcc ) + ( ccSpec * s.clearcoat + ccRad * Fcc );
#endif
	return color + s.emissive;
}
`}),Ea={position:"vec3f",normal:"vec3f",uv:"vec2f",color:"vec4f"},Wa={normal:"vec3f( 0.0, 1.0, 0.0 )",uv:"vec2f( 0.0 )",color:"vec4f( 1.0 )"},Oa=/^(u32|i32|vec[234][ui])$/;function Ua(i){return i==="f32"?"0.0":i==="u32"?"0u":i==="i32"?"0i":`${i}()`}function Va(i,e,t){const s=t.kind,r=new Set(e.map(x=>x.name)),a=i.allDefines();a.PASS_MAIN=s==="main"?1:0,a.PASS_DEPTH=s==="depth"?1:0,a.PASS_COLOR=s==="color"?1:0,a.PASS_LATE=t.late?1:0,a.LIT=i.lit?1:0,a.INSTANCED=r.has("instanceMatrix0")?1:0,a.INSTANCE_COLOR=r.has("instanceColor")?1:0,Object.assign(a,t.defines||{}),a.CLIP_DISTANCES=a.REFRACTION_CLIP&&L.features.has("clip-distances")?1:0;let n=`struct VertexIn {
`;for(const x of e)n+=`	@location( ${x.location} ) ${x.name}: ${x.wgsl},
`;n+=`	@builtin( instance_index ) instance: u32,
	@builtin( vertex_index ) vertex: u32,
};
`;let h=`struct VertexData {
	position: vec3f,
	normal: vec3f,
	uv: vec2f,
	color: vec4f,
	model: mat4x4f,
	prevModel: mat4x4f,
	instance: u32,
	vertex: u32,
	worldOffset: vec3f,
	prevWorldOffset: vec3f,
	useWorld: bool,
	worldPos: vec3f,
	worldNormal: vec3f,
	prevWorldPos: vec3f,
`;for(const x in i.attributes)h+=`	${x}: ${i.attributes[x]},
`;h+=`};
`;const o=s==="main";let l=0,c=`struct VSOut {
	@builtin( position ) clip: vec4f,
`;c+=`	@location( ${l++} ) worldPos: vec3f,
`,c+=`	@location( ${l++} ) normal: vec3f,
`,c+=`	@location( ${l++} ) uv: vec2f,
`,c+=`	@location( ${l++} ) color: vec4f,
`,o&&(c+=`	@location( ${l++} ) curClip: vec4f,
`,c+=`	@location( ${l++} ) prevClip: vec4f,
`);for(const x in i.varyings){const b=i.varyings[x];c+=`	@location( ${l++} )${Oa.test(b)?" @interpolate( flat )":""} ${x}: ${b},
`}if(c+=`};
`,a.CLIP_DISTANCES){const x=[...c.matchAll(/\s(\w+): [^,]+,\n/g)].map(b=>b[1]);c+=c.replace("struct VSOut {","struct VSOutClip {").replace(/};\n$/,`	@builtin( clip_distances ) clipDistances: array<f32, 1>,
};
`),c+=`fn vsClip( o: VSOut, d: f32 ) -> VSOutClip {
	var c: VSOutClip;
${x.map(b=>`	c.${b} = o.${b};
`).join("")}	c.clipDistances[ 0 ] = d;
	return c;
}
`}let u="";for(const x in Ea)if(r.has(x)){const b=e.find(w=>w.name===x);x==="color"&&b.wgsl==="vec3f"?u+=`	v.color = vec4f( i.color, 1.0 );
`:u+=`	v.${x} = i.${x};
`}else x!=="position"&&(u+=`	v.${x} = ${Wa[x]};
`);for(const x in i.attributes)u+=r.has(x)?`	v.${x} = i.${x};
`:`	v.${x} = ${Ua(i.attributes[x])};
`;const f=`
struct Draw {
	model: mat4x4f,
	prevModel: mat4x4f,
	params: vec4f,  // x: object id, y: user, z: user, w: user
	params2: vec4f,
};
@group( 2 ) @binding( 0 ) var<uniform> draw: Draw;

${n}
${h}
${c}

struct FragInput {
	vs: VSOut,
	P: vec3f,
	N: vec3f,
	V: vec3f,
	uv: vec2f,
	color: vec4f,
	front: bool,
	pixel: vec2f,
};

struct FragResult {
	color: vec4f,
	velocity: vec4f,
	mask: vec4f,
};

fn cofactor3( m: mat4x4f ) -> mat3x3f {
	let a = m[ 0 ].xyz; let b = m[ 1 ].xyz; let c = m[ 2 ].xyz;
	return mat3x3f( cross( b, c ), cross( c, a ), cross( a, b ) );
}

fn materialVertex( v: ptr<function, VertexData>, o: ptr<function, VSOut> ) {
${i.vertex}
}

fn materialSurface( in: FragInput, s: ptr<function, Surface> ) {
${i.surface}
}

fn materialOutput( in: FragInput, s: Surface, r: ptr<function, FragResult> ) {
${i.output}
}

#if CLIP_DISTANCES
@vertex fn vs( i: VertexIn ) -> VSOutClip {
#else
@vertex fn vs( i: VertexIn ) -> VSOut {
#endif
	var v: VertexData;
${u}#if !HAS_POSITION
	v.position = vec3f( 0.0 );
#endif
	v.instance = i.instance;
	v.vertex = i.vertex;
#if INSTANCED
	let im = mat4x4f( i.instanceMatrix0, i.instanceMatrix1, i.instanceMatrix2, i.instanceMatrix3 );
	v.model = draw.model * im;
	v.prevModel = draw.prevModel * im;
#else
	v.model = draw.model;
	v.prevModel = draw.prevModel;
#endif
#if INSTANCE_COLOR
	v.color = vec4f( v.color.rgb * i.instanceColor, v.color.a );
#endif
	v.worldOffset = vec3f( 0.0 );
	v.prevWorldOffset = vec3f( 1e30 );
	v.useWorld = false;
	v.prevWorldPos = vec3f( 1e30 );
	var o: VSOut;
	materialVertex( &v, &o );
	var wp: vec3f;
	var wn: vec3f;
	var pwp: vec3f;
	if ( v.useWorld ) {
		wp = v.worldPos;
		wn = v.worldNormal;
		pwp = select( v.prevWorldPos, wp, v.prevWorldPos.x > 1e29 );
	} else {
		let lp = vec4f( v.position, 1.0 );
		wp = ( v.model * lp ).xyz + v.worldOffset;
		wn = cofactor3( v.model ) * v.normal;
		pwp = ( v.prevModel * lp ).xyz + select( v.prevWorldOffset, v.worldOffset, v.prevWorldOffset.x > 1e29 );
	}
	o.worldPos = wp;
	o.normal = wn;
	o.uv = v.uv;
	o.color = v.color;
	o.clip = frame.viewProj * vec4f( wp, 1.0 );
#if PASS_MAIN
	o.curClip = frame.viewProjNoJitter * vec4f( wp, 1.0 );
	o.prevClip = frame.prevViewProjNoJitter * vec4f( pwp, 1.0 );
#endif
#if CLIP_DISTANCES
	return vsClip( o, frame.seaLevel + REFRACTION_CLIP_MARGIN - wp.y );
#else
	return o;
#endif
}

#if PASS_MAIN && !PASS_LATE && LIT && !IS_WATER && !ALPHA_TEST && !STUDIO_LIGHTING
// Deep under the water, seen from above it: the water drawn over this pixel shows the refraction
// pass (ocean/RefractionPass.js) at its refracted end point, never this pixel's own colour. The end
// point is predicted as the water shader traces it (flat surface, the seabed at P's depth, a margin
// for the wave slopes); where it would leave the screen the water takes the refraction pass' edge.
const SUBMERGED_DEPTH: f32 = 2.5; // m below sea level: below the deepest wave troughs
fn submergedHidden( P: vec3f ) -> bool {
	let sea = frame.seaLevel;
	if ( P.y > sea - SUBMERGED_DEPTH || frame.cameraPos.y < sea + 1.0 ) { return false; }
	let V = normalize( P - frame.cameraPos );
	let pos = frame.cameraPos + V * ( ( frame.cameraPos.y - sea ) / max( - V.y, 1e-4 ) );
	let Tr = refract( V, vec3f( 0.0, 1.0, 0.0 ), 1.0 / 1.333 );
	let Tv = normalize( vec3f( Tr.x, min( Tr.y, -0.08 ), Tr.z ) );
	let L = ( sea - P.y ) / max( - Tv.y, 0.04 );
	let c = frame.viewProj * vec4f( pos + Tv * min( L, 80.0 ), 1.0 );
	let uv = c.xy / max( c.w, 1e-4 ) * vec2f( 0.5, -0.5 ) + 0.5;
	return all( uv > vec2f( 0.1 ) ) && all( uv < vec2f( 0.9 ) ) && c.w > 0.0;
}
#endif

fn fragInput( vs: VSOut, front: bool ) -> FragInput {
	var in: FragInput;
	in.vs = vs;
	in.P = vs.worldPos;
	var N = normalize( vs.normal );
#if DOUBLE_SIDED
	N = select( -N, N, front );
#endif
#if BACK_SIDE
	N = -N;
#endif
	in.N = N;
	in.V = normalize( frame.cameraPos - vs.worldPos );
	in.uv = vs.uv;
	in.color = vs.color;
	in.front = front;
	in.pixel = vs.clip.xy;
	return in;
}

fn surfaceOf( in: FragInput ) -> Surface {
	var s = defaultSurface( in.N );
	s.albedo = mat.color * in.color.rgb;
	s.alpha = mat.opacity * in.color.a;
	s.roughness = mat.roughness;
	s.metalness = mat.metalness;
	s.emissive = mat.emissive;
	materialSurface( in, &s );
	return s;
}

#if PASS_DEPTH
#if NEEDS_DEPTH_FRAGMENT
@fragment fn fs( vs: VSOut, @builtin( front_facing ) front: bool ) {
	let in = fragInput( vs, front );
#if HAS_SHADOW_HOOK
	if ( ! materialShadow( in ) ) { discard; }
#else
	let s = surfaceOf( in );
	if ( s.alpha < mat.alphaTest ) { discard; }
#endif
}
#endif
#else

#if PASS_MAIN
struct FragOut {
	@location( 0 ) color: vec4f,
	@location( 1 ) velocity: vec4f,
	@location( 2 ) mask: vec4f,
};
#else
struct FragOut {
	@location( 0 ) color: vec4f,
};
#endif

@fragment fn fs( vs: VSOut, @builtin( front_facing ) front: bool ) -> FragOut {
	let in = fragInput( vs, front );
#if REFRACTION_CLIP
#if !CLIP_DISTANCES
	// the water's refraction source only holds what is under the water (pass.defines)
	if ( in.P.y > frame.seaLevel + REFRACTION_CLIP_MARGIN ) { discard; }
#endif
#endif
#if PASS_MAIN && !PASS_LATE && LIT && !IS_WATER && !ALPHA_TEST && !STUDIO_LIGHTING
	// hidden under the water (see submergedHidden): an ambient colour, keeping depth and motion
	if ( submergedHidden( in.P ) ) {
		var so: FragOut;
		so.color = vec4f( mat.color * in.color.rgb * hookEnvDiffuse( in.N ) * hookAmbientModulation( in.P, in.N ), 1.0 );
		let cur0 = vs.curClip.xy / vs.curClip.w;
		let prev0 = vs.prevClip.xy / vs.prevClip.w;
		so.velocity = vec4f( ( cur0 - prev0 ) * vec2f( 0.5, -0.5 ), 0.0, 1.0 );
		so.mask = vec4f( 0.0 );
		return so;
	}
#endif
	var s = surfaceOf( in );
#if ALPHA_TEST
	if ( s.alpha < mat.alphaTest ) { discard; }
#endif
	s.normal = normalize( s.normal );
	s.clearcoatNormal = normalize( s.clearcoatNormal );
	var r: FragResult;
#if LIT
	r.color = vec4f( shadeSurface( s, in.P, in.V, in.pixel ), s.alpha );
#else
	r.color = vec4f( s.albedo + s.emissive, s.alpha );
#endif
#if PASS_MAIN
	let cur = vs.curClip.xy / vs.curClip.w;
	let prev = vs.prevClip.xy / vs.prevClip.w;
	r.velocity = vec4f( ( cur - prev ) * vec2f( 0.5, -0.5 ), 0.0, 1.0 );
#else
	r.velocity = vec4f( 0.0 );
#endif
	r.mask = vec4f( 0.0 );
	materialOutput( in, s, &r );
	var out: FragOut;
	out.color = r.color;
#if PASS_MAIN
#if PASS_LATE
	// premultiplied: opaque outputs overwrite, blended ones weight their motion by coverage
#if VELOCITY_OPAQUE
	// the fragment owns the motion of its pixel even when its colour is blended (AirMotes specks)
	let a = VELOCITY_WEIGHT;
#else
	let a = select( 1.0, r.color.a, TRANSPARENT_F ) * VELOCITY_WEIGHT;
#endif
	out.velocity = vec4f( r.velocity.xy * a, 0.0, a );
#else
	out.velocity = r.velocity;
#endif
	out.mask = r.mask;
#endif
	return out;
}
#endif
`,m=i.shadow?`fn materialShadow( in: FragInput ) -> bool {
${i.shadow}
}
`:"";a.HAS_SHADOW_HOOK=i.shadow?1:0,a.NEEDS_DEPTH_FRAGMENT=s==="depth"&&(i.alphaTest>0||i.shadow)?1:0,a.HAS_POSITION=r.has("position")?1:0;const y=f.replace("fn fragInput(",m+"fn fragInput(").replace(/\bTRANSPARENT_F\b/g,i.transparent?"true":"false").replace(/\bVELOCITY_WEIGHT\b/g,dr(i.velocityWeight)).replace(/\bREFRACTION_CLIP_MARGIN\b/g,dr((t.defines&&t.defines.REFRACTION_CLIP_MARGIN)??0));let d=[Z,He,...i.modules];return(s!=="depth"||vs(i.modules).includes(hs))&&(d=[Z,He,...Ia(),hs,...i.modules]),i.lightingHooks===!1&&!vs(i.modules).includes(hs)&&(d=[Z,He,gi,...i.modules]),{code:y,modules:d,defines:a,bindings:{mat:{uniform:i.uniformBlock},...i.bindings},hasFragment:s!=="depth"||a.NEEDS_DEPTH_FRAGMENT===1}}function dr(i){const e=String(i);return e.includes(".")||e.includes("e")?e:e+".0"}const pr=new Ae,mr=new Mt,yr=new U,Ga=new k,xr=new k,vr=new WeakMap;let Ha=0;const et=256,gr=40;class qa{constructor(){this.pipelines=new Map,this.geometries=new WeakMap,this.capacity=8192,this.drawBuffer=null,this.drawData=null,this.drawCount=0,this.frame=-1,this.stats={draws:0,triangles:0,pipelines:0},this.drawLayout=null,this.drawBindGroup=null,this.syncPipelines=!0}_ensureDrawBuffer(){this.drawBuffer&&this.drawData.byteLength>=this.capacity*et||(this.drawBuffer&&this.drawBuffer.destroy(),this.drawBuffer=L.device.createBuffer({label:"draws",size:this.capacity*et,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.drawData=new Float32Array(this.capacity*et/4),this.drawLayout=ui([{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform",hasDynamicOffset:!0,minBindingSize:gr*4}}],"draw"),this.drawBindGroup=L.device.createBindGroup({label:"draws",layout:this.drawLayout,entries:[{binding:0,resource:{buffer:this.drawBuffer,size:gr*4}}]}))}_beginFrame(){this.frame!==L.frame&&(this.frame=L.frame,this._ensureDrawBuffer(),this.drawCount>this.capacity*.75&&(this.capacity*=2,this._ensureDrawBuffer()),this.drawCount=0,L.onSubmit(()=>{this.drawCount&&L.queue.writeBuffer(this.drawBuffer,0,this.drawData.buffer,0,this.drawCount*et)}),this.stats.draws=0,this.stats.triangles=0)}_slot(e){let t=e.__draw;if(t||(t=e.__draw={frame:-1,slot:0,cur:new Float32Array(16),prev:new Float32Array(16),has:!1}),t.frame===L.frame)return t.slot;if(this.drawCount>=this.capacity)throw new Error("MeshRenderer: draw buffer full");t.frame=L.frame,t.slot=this.drawCount++;const s=e.matrixWorld.elements;t.has&&!e.resetVelocity?t.prev.set(t.cur):t.prev.set(s),t.cur.set(s),t.has=!0,e.resetVelocity=!1;const r=t.slot*et/4,a=this.drawData;a.set(t.cur,r),a.set(e.staticVelocity?t.cur:t.prev,r+16);const n=e.drawParams;if(a[r+32]=e.id??0,a[r+33]=n?n[0]:0,a[r+34]=n?n[1]:0,a[r+35]=n?n[2]:0,n&&n.length>3)for(let h=0;h<4;h++)a[r+36+h]=n[3+h]??0;return t.slot}_geometryGPU(e){let t=this.geometries.get(e);return t||(t={buffers:new Map,index:null,indexVersion:-1},this.geometries.set(e,t),e.addEventListener&&e.addEventListener("dispose",()=>{for(const s of t.buffers.values())s.buffer.destroy();t.index&&t.index.buffer.destroy(),this.geometries.delete(e)})),t}_attributeBuffer(e,t){const s=this._geometryGPU(e),r=t.isInterleavedBufferAttribute?t.data:t;if(r.gpuBuffer)return r.gpuBuffer.getGPU?r.gpuBuffer.getGPU():r.gpuBuffer;let a=s.buffers.get(r);const n=r.version??0;if(a&&a.version===n&&a.array===r.array)return a.buffer;const h=ja(t);if((!a||a.size<h.byteLength)&&(a&&a.buffer.destroy(),a={buffer:L.device.createBuffer({label:t.name||"attribute",size:Math.max(16,Ot(h.byteLength)),usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST}),size:h.byteLength,version:-1},s.buffers.set(r,a)),a.version!==n){const o=r.updateRanges&&r.updateRanges.length&&a.version>=0?r.updateRanges:null;if(o&&h.array===r.array){const l=r.array.BYTES_PER_ELEMENT;for(const c of o)L.queue.writeBuffer(a.buffer,c.start*l,r.array.buffer,r.array.byteOffset+c.start*l,Ot(c.count*l));r.clearUpdateRanges?r.clearUpdateRanges():r.updateRanges.length=0}else wr(a.buffer,h);a.version=n}return a.array=r.array,a.buffer}_indexBuffer(e){const t=e.index;if(!t)return null;const s=this._geometryGPU(e);if(s.indexRef&&s.indexSrc===t.array&&s.indexVersion===(t.version??0))return s.indexRef;const r=t.array instanceof Uint16Array||t.array instanceof Uint32Array?t.array:new Uint32Array(t.array);return(!s.index||s.index.size<r.byteLength)&&(s.index&&s.index.buffer.destroy(),s.index={buffer:L.device.createBuffer({label:"index",size:Math.max(16,Ot(r.byteLength)),usage:GPUBufferUsage.INDEX|GPUBufferUsage.COPY_DST}),size:r.byteLength},s.indexVersion=-1),s.indexVersion!==(t.version??0)&&(wr(s.index.buffer,r),s.indexVersion=t.version??0),s.indexSrc=t.array,s.indexRef={buffer:s.index.buffer,format:r instanceof Uint16Array?"uint16":"uint32"},s.indexRef}_cachedLayout(e,t,s){let r=vr.get(t);r||vr.set(t,r=new Map);const a=e.isInstancedMesh?e.instanceColor?2:1:0,n=a?s.id+":"+a:s.id;let h=r.get(n);if(h&&h.version===s.version&&h.attrsVersion===t.attributesVersion&&(!a||h.instanceMatrix===e.instanceMatrix)){const c=h.refs,u=h.names,f=t.attributes;let m=!0;for(let y=0;y<u.length;y++)if(f[u[y]]!==c[y]){m=!1;break}if(m)return h.vl}const o=this._layout(e,t,s),l=o.layout.filter(c=>!c.name.startsWith("instance")).map(c=>c.name);return h={version:s.version,attrsVersion:t.attributesVersion,instanceMatrix:e.instanceMatrix,names:l,refs:l.map(c=>t.attributes[c]),vl:o},o.pipelines=new Map,r.set(n,h),o}_layout(e,t,s){const r=[],a=["position","normal","uv","color",...Object.keys(s.attributes)];for(const u of a){const f=t.attributes[u];f&&!(u==="color"&&!s.vertexColors&&!s.attributes.color)&&r.push({name:u,attr:f})}if(e.isInstancedMesh){for(let u=0;u<4;u++)r.push({name:"instanceMatrix"+u,attr:e.instanceMatrix,column:u});e.instanceColor&&r.push({name:"instanceColor",attr:e.instanceColor})}const n=[],h=[],o=new Map;let l=0;for(const u of r){const f=u.attr,m=f.isInterleavedBufferAttribute?f.data:f,y=!!(f.isInstancedBufferAttribute||m.isInstancedInterleavedBuffer||f.meshPerAttribute||m.meshPerAttribute)||u.name.startsWith("instance"),d=wi(f);let v=o.get(m);if(v===void 0){v=n.length,o.set(m,v);const M=f.isInterleavedBufferAttribute?f.data.stride*d.bytesPerComponent:f.itemSize*d.bytesPerComponent;n.push({src:m,attr:f,layout:{arrayStride:d.converted?d.itemSize*4:M,stepMode:y?"instance":"vertex",attributes:[]}})}let x=f.isInterleavedBufferAttribute?f.offset*d.bytesPerComponent:0,b=d.format,w=d.wgsl;u.column!==void 0&&(x=u.column*16,b="float32x4",w="vec4f"),n[v].layout.attributes.push({shaderLocation:l,offset:x,format:b}),(u.name==="position"||u.name==="normal")&&(w="vec3f"),u.name==="uv"&&(w="vec2f"),u.name==="color"&&(w=f.itemSize===4?"vec4f":"vec3f"),u.name==="instanceColor"&&(w="vec3f"),s.attributes[u.name]&&(w=s.attributes[u.name]),h.push({name:u.name,wgsl:w,location:l,instanced:y}),l++}return{key:h.map(u=>`${u.name}:${u.wgsl}`).join(",")+"|"+n.map(u=>`${u.layout.arrayStride}/${u.layout.stepMode}/${u.layout.attributes.map(f=>f.format+"@"+f.offset).join(";")}`).join(","),layout:h,buffers:n}}_pipeline(e,t,s){e.__pkFrame!==L.frame&&(e.__pk=e.pipelineKey()+"|"+vt.version,e.__pkFrame=L.frame);const r=s.passKey;let a=t.pipelines&&t.pipelines.get(r);if(a&&a.materialKey===e.__pk)return a.p;const n=`${e.__pk}|${t.key}|${r}`;let h=this.pipelines.get(n);return h||(h=this._createPipeline(e,t,s,n)),t.pipelines&&t.pipelines.set(r,{materialKey:e.__pk,p:h}),h}_createPipeline(e,t,s,r){const a=Va(e,t.layout,s),n=Qt({modules:a.modules,bindings:a.bindings,code:a.code,defines:a.defines,stage:"render",label:e.name}),h=Jt(n.code,e.name);this._ensureDrawBuffer();const o=L.device.createPipelineLayout({bindGroupLayouts:[n.group0.layout,n.bindings.layout,this.drawLayout]}),l=Wt(e.blending);let c=[];s.kind==="main"?c=[{format:s.colorFormats[0],blend:e.transparent||s.late?l:void 0,writeMask:e.colorWrite?GPUColorWrite.ALL:0},{format:s.colorFormats[1],blend:s.late?Wt("premultiplied"):void 0,writeMask:e.colorWrite?GPUColorWrite.ALL:0},{format:s.colorFormats[2],blend:Wt("normal"),writeMask:e.colorWrite?GPUColorWrite.ALL:0}]:s.kind==="color"&&(c=s.colorFormats.map(v=>({format:v,blend:l,writeMask:e.colorWrite?GPUColorWrite.ALL:0})));const u=e.side,f=s.cullOverride||(u==="double"?"none":u==="back"?"front":"back"),m=e.depthTest?e.depthCompare||s.depthCompare:"always",y={label:e.name+" "+s.kind,layout:o,vertex:{module:h,entryPoint:"vs",buffers:t.buffers.map(v=>v.layout)},primitive:{topology:e.topology,cullMode:f,frontFace:"ccw"}};a.hasFragment&&(y.fragment={module:h,entryPoint:"fs",targets:c}),s.depthFormat&&(y.depthStencil={format:s.depthFormat,depthWriteEnabled:e.depthWrite,depthCompare:m,depthBias:s.kind==="depth"?s.depthBias||0:e.depthBias,depthBiasSlopeScale:s.kind==="depth"?s.depthBiasSlopeScale||0:e.depthBiasSlopeScale});const d={handle:L.renderPipeline(y),bindings:n.bindings,label:y.label};return this.pipelines.set(r,d),this.stats.pipelines=this.pipelines.size,d}collect(e,{camera:t,layerMask:s=4294967295,filter:r=null,kind:a="main",cull:n=!0}){const h=[],o=[];t&&(t.updateMatrixWorld(),yr.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse.copy(t.matrixWorld).invert()),mr.setFromProjectionMatrix(yr,t.reversedDepth!==!1),xr.setFromMatrixPosition(t.matrixWorld));const l=this.precompiling,c=u=>{if(!(!u.visible&&!l)){u.isMesh&&u.material&&u.geometry&&(u.layers.mask&s)!==0&&(!r||r(u))&&(a!=="depth"||u.castShadow)&&(l||!n||!t||u.frustumCulled===!1||this._inFrustum(u))&&(u.onBeforeRender&&u.onBeforeRender(null,null,t,u.geometry,u.material,null),(u.visible||l)&&this._addItems(u,h,o));for(const f of u.children)c(f)}};return e.updateMatrixWorld(),c(e),h.sort((u,f)=>u.renderOrder-f.renderOrder||u.pipeKey-f.pipeKey||u.z-f.z),o.sort((u,f)=>u.renderOrder-f.renderOrder||f.z-u.z),{opaque:h,transparent:o}}_inFrustum(e){let t=null;return e.isInstancedMesh?(!e.boundingSphere&&e.computeBoundingSphere&&e.computeBoundingSphere(),t=e.boundingSphere):(e.geometry.boundingSphere||e.geometry.computeBoundingSphere(),t=e.geometry.boundingSphere),!t||t.radius<0||!Number.isFinite(t.radius)?!0:(pr.copy(t).applyMatrix4(e.matrixWorld),mr.intersectsSphere(pr))}_addItems(e,t,s){const r=e.geometry,a=Array.isArray(e.material)?e.material:null,n=Ga.setFromMatrixPosition(e.matrixWorld).distanceToSquared(xr),h=(l,c,u)=>{if(!l||!l.visible&&!this.precompiling)return;const f={object:e,geometry:r,material:l,start:c,count:u,z:n,renderOrder:e.renderOrder||0,pipeKey:l.id};(l.transparent?s:t).push(f)},o=r.drawRange||{start:0,count:1/0};if(a&&r.groups&&r.groups.length)for(const l of r.groups){const c=Math.max(l.start,o.start),u=Math.min(l.start+l.count,o.start+o.count);u>c&&h(a[l.materialIndex],c,u-c)}else h(a?a[0]:e.material,o.start,o.count)}render(e,t){this._beginFrame(),t={kind:"main",late:!1,colorFormats:[],depthFormat:null,depthCompare:"greater-equal",frameBlock:Re,layerMask:4294967295,...t},t.passKey=`${t.kind}.${t.late?1:0}.${t.colorFormats.join(",")}.${t.depthFormat}.${t.depthCompare}.${t.cullOverride||""}.${t.defines?JSON.stringify(t.defines):""}`;const s=t.items||this.collect(e,t),r=L.getEncoder(),a=(t.colorViews||[]).map((o,l)=>{const c=t.clearColors?t.clearColors[l]:null;return{view:o,loadOp:c?"clear":"load",storeOp:"store",clearValue:c||[0,0,0,0]}}),n={label:t.label||t.kind,colorAttachments:a};t.depthView&&(n.depthStencilAttachment={view:t.depthView,depthLoadOp:t.clearDepth===null||t.clearDepth===void 0?"load":"clear",depthStoreOp:"store",depthClearValue:t.clearDepth??0}),t.timestampWrites&&(n.timestampWrites=t.timestampWrites);const h=r.beginRenderPass(n);t.viewport&&h.setViewport(...t.viewport),h.setBindGroup(0,di(t.frameBlock,"render").getBindGroup()),this.drawItems(h,s.opaque,t),t.betweenLists&&t.betweenLists(h),this.drawItems(h,s.transparent,t),t.after&&t.after(h),h.end()}drawItems(e,t,s){let r=null,a=null;const n=++Ha;for(const h of t){const{object:o,geometry:l,material:c}=h;if(!l.attributes.position&&!l.vertexCount&&!l.indirect)continue;let u,f;if(this.precompiling){try{u=this._cachedLayout(o,l,c),f=this._pipeline(c,u,s)}catch{continue}continue}u=this._cachedLayout(o,l,c),f=this._pipeline(c,u,s);const m=f.handle.pipeline||(this.syncPipelines?L.ready(f.handle):null);if(!m)continue;f!==r&&(e.setPipeline(m),r=f);const y=f.bindings.getBindGroup(n);y!==a&&(e.setBindGroup(1,y),a=y),e.setBindGroup(2,this.drawBindGroup,[this._slot(o)*et]);for(let x=0;x<u.buffers.length;x++)e.setVertexBuffer(x,this._attributeBuffer(l,u.buffers[x].attr));const d=o.isInstancedMesh?o.count:l.instanceCount??1;if(d===0)continue;const v=this._indexBuffer(l);if(l.indirect){const x=l.indirect.buffer.getGPU?l.indirect.buffer.getGPU():l.indirect.buffer,b=l.indirect.offsets||[l.indirect.offset||0];v&&e.setIndexBuffer(v.buffer,v.format);for(const w of b)v?e.drawIndexedIndirect(x,w):e.drawIndirect(x,w),this.stats.draws++;continue}if(v){const x=Math.min(h.count,l.index.count-h.start);if(x<=0)continue;e.setIndexBuffer(v.buffer,v.format),e.drawIndexed(x,d===1/0?1:d,h.start,0,0),this.stats.triangles+=x/3*d}else{const x=l.attributes.position?l.attributes.position.count:l.vertexCount,b=Math.min(h.count,x-h.start);if(b<=0)continue;e.draw(b,d,h.start,0),this.stats.triangles+=b/3*d}this.stats.draws++}}}function Ot(i){return Math.ceil(i/4)*4}function wr(i,e){if(e.byteLength%4===0){L.queue.writeBuffer(i,0,e.buffer,e.byteOffset,e.byteLength);return}const t=new Uint8Array(Ot(e.byteLength));t.set(new Uint8Array(e.buffer,e.byteOffset,e.byteLength)),L.queue.writeBuffer(i,0,t)}const br=new WeakMap;function ja(i){const e=i.isInterleavedBufferAttribute?i.data:i;if(!wi(i).converted)return e.array;let s=br.get(e);if(s&&s.version===e.version)return s.array;const r=i.count,a=i.itemSize,n=new Float32Array(r*a),h=i.normalized?Xa(e.array):1;for(let o=0;o<r*a;o++)n[o]=e.array[o]/h;return br.set(e,{version:e.version,array:n}),n}function Xa(i){return i instanceof Uint8Array?255:i instanceof Int8Array?127:i instanceof Uint16Array?65535:i instanceof Int16Array?32767:1}function wi(i){const t=(i.isInterleavedBufferAttribute?i.data:i).array,s=i.itemSize,r=i.normalized,a=h=>s===1?h:`vec${s}${h==="f32"?"f":h==="u32"?"u":"i"}`;if(t instanceof Float32Array)return{format:s===1?"float32":`float32x${s}`,wgsl:a("f32"),bytesPerComponent:4,itemSize:s};if(t instanceof Uint32Array)return{format:s===1?"uint32":`uint32x${s}`,wgsl:a("u32"),bytesPerComponent:4,itemSize:s};if(t instanceof Int32Array)return{format:s===1?"sint32":`sint32x${s}`,wgsl:a("i32"),bytesPerComponent:4,itemSize:s};const n={Uint8Array:["uint8","unorm8",1],Int8Array:["sint8","snorm8",1],Uint16Array:["uint16","unorm16",2],Int16Array:["sint16","snorm16",2]}[t.constructor.name];if(n&&(s===2||s===4)&&!i.isInterleavedBufferAttribute){const h=(r?n[1]:n[0])+"x"+s,o=a(r?"f32":t instanceof Uint8Array||t instanceof Uint16Array?"u32":"i32");return{format:h,wgsl:o,bytesPerComponent:n[2],itemSize:s}}return{format:s===1?"float32":`float32x${s}`,wgsl:a("f32"),bytesPerComponent:4,itemSize:s,converted:!0}}const Ka=`
struct FSIn { @builtin( position ) pos: vec4f, @location( 0 ) uv: vec2f };
@vertex fn vs( @builtin( vertex_index ) i: u32 ) -> FSIn {
	let p = vec2f( f32( ( i << 1u ) & 2u ), f32( i & 2u ) );
	var o: FSIn;
	o.pos = vec4f( p * 2.0 - 1.0, FS_DEPTH, 1.0 );
	o.uv = vec2f( p.x, 1.0 - p.y );
	return o;
}
`;class bi{constructor({label:e="fullscreen",modules:t=[],bindings:s={},code:r,colorFormats:a=["rgba16float"],blend:n="none",defines:h={},depthFormat:o=null,depthCompare:l="always",depthWrite:c=!1,depth:u=0,writeMasks:f=null,blends:m=null}){this.label=e,this.colorFormats=a;const y=r.includes("@fragment")?r:`${r}
@fragment fn fs( in: FSIn ) -> @location( 0 ) vec4f { return fragment( in ); }
`,d=Qt({modules:[Z,...t],bindings:s,code:Ka.replace("FS_DEPTH",u.toFixed(6))+y,defines:h,stage:"render",label:e});this.source=d.code,this.bindings=d.bindings;const v=Jt(d.code,e),x={label:e,layout:L.device.createPipelineLayout({bindGroupLayouts:[d.group0.layout,d.bindings.layout]}),vertex:{module:v,entryPoint:"vs"},fragment:{module:v,entryPoint:"fs",targets:a.map((b,w)=>({format:b,blend:Wt(m?m[w]:w===0?n:"none"),writeMask:f?f[w]:GPUColorWrite.ALL}))},primitive:{topology:"triangle-list"}};o&&(x.depthStencil={format:o,depthCompare:l,depthWriteEnabled:c}),this.handle=L.renderPipeline(x),this.timestampWrites=null}get pipeline(){return L.ready(this.handle)}draw(e,t=Re){e.setPipeline(L.ready(this.handle)),e.setBindGroup(0,di(t,"render").getBindGroup()),e.setBindGroup(1,this.bindings.getBindGroup()),e.draw(3)}render({colorViews:e,clear:t=null,viewport:s=null,frameBlock:r=Re,depthView:a=null,encoder:n=L.getEncoder()}={}){const h=e.map(c=>c.isTexture?c.view({dimension:"2d",mipLevelCount:1}):c),o={label:this.label,colorAttachments:h.map(c=>({view:c,loadOp:t?"clear":"load",storeOp:"store",clearValue:t||[0,0,0,0]}))};a&&(o.depthStencilAttachment={view:a,depthLoadOp:"load",depthStoreOp:"store"}),this.timestampWrites&&(o.timestampWrites=this.timestampWrites);const l=n.beginRenderPass(o);s&&l.setViewport(...s),this.draw(l,r),l.end()}}const Sr=new k,Ya=new Ae,Mr=new Mt,Za=new U,Qa=new U,it={OPAQUE:0,WATER:1,TRANSPARENT:2},ut="depth32float";class Ja{constructor(e,t,s){this.meshRenderer=e,this.scene=t,this.camera=s,this.scale=1,this.width=1,this.height=1,this.sceneRT=new dt(1,1,{colors:[{format:"rgba16float",name:"color"},{format:"rgba16float",name:"velocity"},{format:"rgba8unorm",name:"waterMask"}],depth:ut,label:"scene"}),this.velocityTexture=this.sceneRT.textures[1],this.waterMaskTexture=this.sceneRT.textures[2],this.opaqueCopy=new dt(1,1,{colors:["rgba16float"],depth:ut,label:"opaqueCopy"}),this.opaqueDepthHalf=new dt(1,1,{colors:["r16float"],label:"opaqueDepthHalf"}),this._depthHalfPass=null,this.hullMaskRT=new dt(1,1,{colors:["r16float"],depth:ut,label:"hullMask"}),this.hullMaskScene=new ks,this.hullMaskMaterial=new ot({name:"hullMask",lit:!1,side:"double",surface:"s.albedo = vec3f( length( in.P - frame.cameraPos ), 0.0, 0.0 ); s.emissive = vec3f( 0.0 );"}),this.hullMasks=[],this.hullMaskActive={value:0},this.background=null,this.clearColor=[0,0,0,1],this.onBeforeWater=null}setSize(e,t){this.width=e,this.height=t,this.sceneRT.setSize(e,t),this.opaqueCopy.setSize(e,t),this.opaqueDepthHalf.setSize(e,t),this.hullMaskRT.setSize(e,t)}addHullMask(e,t){e.computeBoundingBox(),e.computeBoundingSphere();const s=new je(e,this.hullMaskMaterial);return s.matrixAutoUpdate=!1,s.frustumCulled=!1,this.hullMaskScene.add(s),this.hullMasks.push({mesh:s,object:t,box:e.boundingBox.clone().expandByScalar(.05),sphere:e.boundingSphere}),s}_renderHullMasks(e){let t=0;Mr.setFromProjectionMatrix(Za.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse));for(const r of this.hullMasks){r.object.updateWorldMatrix(!0,!1),r.mesh.matrix.copy(r.object.matrixWorld),r.mesh.matrixWorld.copy(r.object.matrixWorld),Sr.setFromMatrixPosition(e.matrixWorld).applyMatrix4(Qa.copy(r.object.matrixWorld).invert());const a=!r.box.containsPoint(Sr)&&Mr.intersectsSphere(Ya.copy(r.sphere).applyMatrix4(r.object.matrixWorld));r.mesh.visible=a,a&&t++}if(this.hullMaskActive.value=t>0?1:0,!t)return;const s=this.hullMaskRT;this.meshRenderer.render(this.hullMaskScene,{label:"hull mask",kind:"color",camera:e,colorViews:[s.texture.view()],colorFormats:s.formats,clearColors:[[0,0,0,0]],depthView:s.depthTexture.view(),depthFormat:ut,clearDepth:0,cull:!1})}render(){const{scene:e,camera:t,meshRenderer:s}=this,r=this.sceneRT,a=r.textures.map(l=>l.view()),n={camera:t,colorViews:a,colorFormats:r.formats,depthView:r.depthTexture.view(),depthFormat:ut,kind:"main"};s.render(e,{...n,label:"opaque",layerMask:1<<it.OPAQUE,clearColors:[this.clearColor,[0,0,0,0],[0,0,0,0]],clearDepth:0,after:this.background?l=>this.background.draw(l):null});const h=L.getEncoder(),o={width:r.width,height:r.height};h.copyTextureToTexture({texture:r.texture.getGPU()},{texture:this.opaqueCopy.texture.getGPU()},o),h.copyTextureToTexture({texture:r.depthTexture.getGPU()},{texture:this.opaqueCopy.depthTexture.getGPU()},o),this._depthHalfPass||(this._depthHalfPass=new bi({label:"opaque depth half",colorFormats:["r16float"],bindings:{srcDepth:{texture:()=>this.opaqueCopy.depthTexture}},code:"fn fragment( in: FSIn ) -> vec4f { return vec4f( textureLoad( srcDepth, vec2i( in.pos.xy ), 0 ), 0.0, 0.0, 1.0 ); }"})),this._depthHalfPass.render({colorViews:[this.opaqueDepthHalf.texture],clear:[0,0,0,0]}),this.hullMasks.length>0&&this._renderHullMasks(t),this.onBeforeWater&&this.onBeforeWater(),s.render(e,{...n,label:"water + transparent",late:!0,layerMask:1<<it.WATER|1<<it.TRANSPARENT})}}const gs=[];for(let i=0;i<8;i++)gs.push(new k);const ft=new k,en=new k(0,1,0),zr=new U,tn=new k,sn=new G;class rn{constructor({size:e=2048,splits:t=[10,60,400],lightMargin:s=200,normalBias:r=[.015,.06,.3],bias:a=2e-5,pcssCascades:n=1}={}){this.size=e,this.splits=t,this.count=t.length,this.lightMargin=s,this.normalBias=r,this.periods=t.map((o,l)=>l===0?1:l===1?2:4),this.texture=new Xe({label:"sunShadowMap",width:e,height:e,depth:this.count,dimension:"2d-array",format:"depth32float",usage:["sample","render"]}),Na(this.texture),this.cascades=t.map((o,l)=>({camera:{matrixWorld:new U,matrixWorldInverse:new U,projectionMatrix:new U,near:0,far:1,reversedDepth:!1,updateMatrixWorld(){},isCamera:!0,isShadowCamera:!0},block:Ba("shadowView"+l),viewProj:new U,radius:0,dirty:!0})),this.enabled=!0,this.layerMask=4294967295,this.frame=0,this.lastSun=new k(0,-2,0);const h=st.fields;h.count.value=this.count,h.mapSize.value=e,h.bias.value=a,h.pcssCascades.value=n,h.enabled.value=1}_margin(e){const t=this.splits[this.count-1],s=e/t;return Math.max(.25*s*s,.25*s)*t}_fit(e,t,s){const r=this.cascades[e],a=e===0?0:this.splits[e-1],n=this.splits[e],h=this._margin(a),o=this._margin(n),l=Math.max(t.near,a-h*.5),c=e===this.count-1?n:n+o*.5;st.fields.blend.value[e]=new G(a,n,h,o);const u=Math.tan(t.fov*Math.PI/360),f=u*t.aspect;let m=0;for(const _ of[l,c])for(const C of[-1,1])for(const P of[-1,1])gs[m++].set(C*f*_,P*u*_,-_).applyMatrix4(t.matrixWorld);const y=Math.min(c,(l+c)/2*(1+f*f+u*u));ft.set(0,0,-y).applyMatrix4(t.matrixWorld);let d=0;for(const _ of gs)d=Math.max(d,_.distanceTo(ft));d=Math.ceil(d*16)/16,r.radius=d;const v=r.camera,x=s,b=Math.abs(x.y)>.99?tn.set(1,0,0):en;v.matrixWorld.lookAt(x,new k(0,0,0),b),zr.copy(v.matrixWorld).invert();const w=2*d/this.size,M=sn.set(ft.x,ft.y,ft.z,1).applyMatrix4(zr);M.x=Math.round(M.x/w)*w,M.y=Math.round(M.y/w)*w;const z=d+this.lightMargin,A=new k(M.x,M.y,M.z+z).applyMatrix4(v.matrixWorld);v.matrixWorld.setPosition(A),v.matrixWorldInverse.copy(v.matrixWorld).invert();const p=.1,g=z+d;v.near=p,v.far=g,an(v.projectionMatrix,-d,d,d,-d,p,g),r.viewProj.multiplyMatrices(v.projectionMatrix,v.matrixWorldInverse);const S=st.fields;S.matrices.value[e]=r.viewProj.clone(),S.cascades.value[e]=new G(c,w,this.normalBias[e]??.05,g-p)}update(e,t){if(this.frame++,st.fields.enabled.value=this.enabled&&t.y>-.05?1:0,!this.enabled)return[];e.updateMatrixWorld();const s=this.lastSun.angleTo(t)>1e-4;this.lastSun.copy(t);const r=[];for(let a=0;a<this.count;a++)(s||this.cascades[a].dirty||(this.frame+a)%this.periods[a]===0)&&(this._fit(a,e,t),this.cascades[a].dirty=!1,r.push(a));return r}render(e,t,s){for(const r of s){const a=this.cascades[r];mi(a.camera,this.size,this.size,{block:a.block}),t.render(e,{label:"shadow cascade "+r,kind:"depth",camera:a.camera,frameBlock:a.block,depthView:this.texture.view({dimension:"2d",baseArrayLayer:r,arrayLayerCount:1}),depthFormat:"depth32float",clearDepth:1,depthCompare:"less-equal",layerMask:this.layerMask,depthBias:2,depthBiasSlopeScale:1.5})}}}function an(i,e,t,s,r,a,n){const h=1/(t-e),o=1/(s-r),l=1/(n-a);return i.set(2*h,0,0,-(t+e)*h,0,2*o,0,-(s+r)*o,0,0,-l,-a*l,0,0,0,1),i}class nn{constructor({gridSize:e=64,leafSize:t=8,levels:s=12,rangeFactor:r=2.5,morphStartRatio:a=.66,maxInstances:n=1500,minY:h=-20,maxY:o=20,heightBounds:l=null,center:c=null,prefix:u="cdlod"}={}){this.G=e,this.leafSize=t,this.levels=s,this.minY=h,this.maxY=o,this.heightBounds=l,this.fixedRoot=c,this.ranges=[];const f=[];let m=0;for(let p=0;p<s;p++){const g=t*Math.pow(2,p)*r;this.ranges.push(g);const S=m+(g-m)*a;f.push(new ee(S,1/Math.max(.001,g-S))),m=g}const y=[];for(let p=0;p<s;p++)y.push(t*Math.pow(2,p)/e);this.uMorph={array:f},this.uSpacing={array:y};const d=u,v=d[0].toUpperCase()+d.slice(1);this.params=new ue(v+"Params",{morph:[`vec4f[${s}]`,f.map((p,g)=>new G(p.x,p.y,y[g],0))]},{label:d}),this.module=new Y({name:d,uniforms:this.params,uniformName:d,code:`
struct ${v}Vertex { worldXZ: vec2f, spacing: f32, morphK: f32, lod: f32, size: f32 };

// Morph in world space on the LOD's own vertex lattice (spacing h). Quarter nodes of a
// partially subdivided parent carry the parent's LOD, so their extra vertices first snap
// onto that lattice; every node covering a point then computes the same position.
fn ${d}Snapped( node: vec4f, grid: vec2f ) -> vec2f {
	let h = ${d}.morph[ i32( node.w ) ].z;
	let p = node.xy + grid * node.z;
	return floor( p / h + 1e-3 ) * h;
}

fn ${d}Morph( node: vec4f, grid: vec2f, viewPos: vec3f, y0: f32 ) -> ${v}Vertex {
	let lod = i32( node.w );
	let m = ${d}.morph[ lod ];
	let h = m.z;
	let p = node.xy + grid * node.z;
	let idx = floor( p / h + 1e-3 );
	let snapped = idx * h;
	let dist = length( viewPos - vec3f( snapped.x, y0, snapped.y ) );
	let morphK = clamp( ( dist - m.x ) * m.y, 0.0, 1.0 );
	let odd = fract( idx * 0.5 ) * 2.0;
	var o: ${v}Vertex;
	o.worldXZ = snapped - odd * h * morphK;
	o.spacing = h * ( morphK + 1.0 );
	o.morphK = morphK;
	o.lod = node.w;
	o.size = node.z;
	return o;
}
`});const x=e,b=new Float32Array((x+1)*(x+1)*3);let w=0;for(let p=0;p<=x;p++)for(let g=0;g<=x;g++)b[w++]=g/x,b[w++]=0,b[w++]=p/x;const M=8,z=new Uint32Array(x*x*6);w=0;for(let p=0;p<x;p+=M)for(let g=0;g<x;g++)for(let S=p;S<Math.min(p+M,x);S++){const _=g*(x+1)+S,C=_+1,P=_+(x+1),D=P+1;(S+g)%2===0?(z[w++]=_,z[w++]=P,z[w++]=C,z[w++]=C,z[w++]=P,z[w++]=D):(z[w++]=_,z[w++]=P,z[w++]=D,z[w++]=_,z[w++]=D,z[w++]=C)}const A=new Zt;A.setAttribute("position",new ae(b,3)),A.setIndex(new ae(z,1)),this.nodeArray=new Float32Array(n*4),this.nodeAttr=new qe(this.nodeArray,4),A.setAttribute("nodeData",this.nodeAttr),A.instanceCount=0,A.boundingSphere=new Ae(new k,1e7),A.boundingBox=new be(new k(-1e7,-1e7,-1e7),new k(1e7,1e7,1e7)),this.geometry=A,this.maxInstances=n,this.count=0,this._box=new be,this._frustum=new Mt,this._mat=new U,this._cam=new k,this.lodCounts=new Array(s).fill(0)}vertexNodes(e=null,{out:t="lod",viewPos:s="frame.cameraPos"}={}){const r=this.module.name,a=e?`${e}( ${r}Snapped( v.nodeData, v.position.xz ) )`:"0.0";return`let ${t} = ${r}Morph( v.nodeData, v.position.xz, ${s}, ${a} );`}update(e){e.updateMatrixWorld(),this._mat.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(this._mat,e.coordinateSystem,e.reversedDepth),e.getWorldPosition(this._cam),this.count=0,this.lodCounts.fill(0);const t=this.levels-1,s=this.leafSize*Math.pow(2,t);if(this.fixedRoot){const{x:o,z:l,size:c}=this.fixedRoot,u=Math.ceil(c/s);for(let f=0;f<u;f++)for(let m=0;m<u;m++)this._select(o+m*s,l+f*s,s,t)}else{const o=Math.floor(this._cam.x/s),l=Math.floor(this._cam.z/s);for(let c=-1;c<=1;c++)for(let u=-1;u<=1;u++)this._select((o+u)*s,(l+c)*s,s,t)}const r=this.count,a=this._order||(this._order=[]);a.length=r;const n=this.nodeArray,h=this._cam;for(let o=0;o<r;o++){const l=n[o*4+2],c=Math.max(n[o*4]-h.x,0,h.x-n[o*4]-l),u=Math.max(n[o*4+1]-h.z,0,h.z-n[o*4+1]-l);a[o]={d:c*c+u*u,x:n[o*4],z:n[o*4+1],s:l,l:n[o*4+3]}}a.sort((o,l)=>o.d-l.d);for(let o=0;o<r;o++){const l=a[o];n[o*4]=l.x,n[o*4+1]=l.z,n[o*4+2]=l.s,n[o*4+3]=l.l}this.geometry.instanceCount=this.count,this.nodeAttr.clearUpdateRanges(),this.nodeAttr.addUpdateRange(0,this.count*4),this.nodeAttr.needsUpdate=!0}_bounds(e,t,s){if(this.heightBounds){const[r,a]=this.heightBounds(e,t,e+s,t+s);this._box.min.set(e,r,t),this._box.max.set(e+s,a,t+s)}else this._box.min.set(e,this.minY,t),this._box.max.set(e+s,this.maxY,t+s);return this._box}_intersectsSphere(e,t){const s=this._cam,r=Math.max(e.min.x-s.x,0,s.x-e.max.x),a=Math.max(e.min.y-s.y,0,s.y-e.max.y),n=Math.max(e.min.z-s.z,0,s.z-e.max.z);return r*r+a*a+n*n<=t*t}_add(e,t,s,r){if(this.count>=this.maxInstances)return;const a=this.count*4;this.nodeArray[a]=e,this.nodeArray[a+1]=t,this.nodeArray[a+2]=s,this.nodeArray[a+3]=r,this.count++,this.lodCounts[r]++}_select(e,t,s,r){const a=this._bounds(e,t,s);if(!this._intersectsSphere(a,this.ranges[r]))return!1;if(!this._frustum.intersectsBox(a))return!0;if(r===0||!this._intersectsSphere(a,this.ranges[r-1]))return this._add(e,t,s,r),!0;const n=s*.5,h=[[e,t],[e+n,t],[e,t+n],[e+n,t+n]];for(const[o,l]of h)if(!this._select(o,l,n,r-1)){const c=this._bounds(o,l,n);this._frustum.intersectsBox(c)&&this._add(o,l,n,r)}return!0}}const gt=256,E=gt,on=8,pt=E/2,ln=[733,157,33.3,7.1],_r=Math.PI*2;class kr{constructor(e={}){this.scale=e.scale??1,this.windSpeed=e.windSpeed??8,this.windDirection=e.windDirection??20,this.fetch=e.fetch??200,this.spreadBlend=e.spreadBlend??.9,this.swell=e.swell??.2,this.peakEnhancement=e.peakEnhancement??3.3,this.shortWavesFade=e.shortWavesFade??.01}}const cs=`
const FFT_N: u32 = ${E}u;
const FFT_HALF: u32 = ${pt}u;
const FFT_G: f32 = ${Et};

fn fftBitReverse8( v: u32 ) -> u32 {
	var r = v;
	r = ( ( r & 0x55u ) << 1u ) | ( ( r >> 1u ) & 0x55u );
	r = ( ( r & 0x33u ) << 2u ) | ( ( r >> 2u ) & 0x33u );
	r = ( ( r & 0x0Fu ) << 4u ) | ( ( r >> 4u ) & 0x0Fu );
	return r;
}

// complex multiply of two packed complex numbers (v.xy, v.zw) by scalar complex w
fn fftCmul2( v: vec4f, w: vec2f ) -> vec4f {
	return vec4f( v.x * w.x - v.y * w.y, v.x * w.y + v.y * w.x, v.z * w.x - v.w * w.y, v.z * w.y + v.w * w.x );
}

// PCG hash
fn fftPcg( v: u32 ) -> u32 {
	let state = v * 747796405u + 2891336453u;
	let word = ( ( state >> ( ( state >> 28u ) + 4u ) ) ^ state ) * 277803737u;
	return ( word >> 22u ) ^ word;
}
fn fftToUnit( h: u32 ) -> f32 { return f32( h >> 8u ) * ( 1.0 / 16777216.0 ) + ( 0.5 / 16777216.0 ); }
`;class hn{constructor(e,t={}){this.renderer=e,this.cascades=t.cascades??4,this.sizes=(t.sizes??ln).slice(0,this.cascades),this.depth=t.depth??500,this.local=new kr(t.local??{windSpeed:7,windDirection:25,fetch:120,spreadBlend:.85,swell:.05}),this.swell=new kr(t.swell??{scale:.48,windSpeed:6,windDirection:5,fetch:1200,spreadBlend:1,swell:.9,shortWavesFade:.1});const s=this.cascades;this.params=new ue("OceanParams",{sizes:["vec4f[4]",[0,1,2,3].map(h=>new G(this.sizes[h]??1,0,0,0))],cuts:["vec4f[4]",[0,1,2,3].map(()=>new G)],sysA:["vec4f[2]",[new G,new G]],sysB:["vec4f[2]",[new G,new G]],choppiness:["f32",t.choppiness??.9],foamBias:["f32",.58],foamGain:["f32",3],foamDecay:["f32",.35],foamAdd:["f32",2.5],time:["f32",0],depth:["f32",this.depth],seed:["u32",1337]},{label:"ocean"});const r=this.params.fields;this.choppiness=r.choppiness,this.foamBias=r.foamBias,this.foamGain=r.foamGain,this.foamDecay=r.foamDecay,this.foamAdd=r.foamAdd,this.time=r.time,this.uDepth=r.depth,this.uSeed=r.seed,this.timeScale=1;const a=E*E*s;this.h0=new pe({label:"fftH0",count:a,type:"vec4f"}),this.waveData=new pe({label:"fftWave",count:a,type:"vec4f"}),this.tmp=new pe({label:"fftTmp",count:a*2,type:"vec4f"}),this.foam=new pe({label:"fftFoam",count:a,type:"f32"}),this.mipSrc=new pe({label:"fftMipSrc",count:a*2,type:"vec4f"}),this.mipMid=new pe({label:"fftMipMid",count:64*s*2,type:"vec4f"});const n=h=>new Xe({label:h,width:E,height:E,depth:s,dimension:"2d-array",format:"rgba16float",mips:!0,usage:["sample","storage","copyDst","copySrc"],sampler:"linearRepeat"});this.displacementTexture=n("oceanDisplacement"),this.derivativeTexture=n("oceanDerivatives"),this.module=new Y({name:"ocean",deps:[Z],uniforms:this.params,uniformName:"ocean",bindings:{oceanDisplacement:{texture:this.displacementTexture,viewDimension:"2d-array"},oceanDerivatives:{texture:this.derivativeTexture,viewDimension:"2d-array"}},code:`
const OCEAN_CASCADES: i32 = ${s};
const OCEAN_FFT_SIZE: f32 = ${E}.0;

// Sample all cascades' displacement at world xz (explicit mip level).
fn oceanSampleDisplacement( xz: vec2f, level: f32 ) -> vec3f {
	var sum = vec3f( 0.0 );
	for ( var c = 0; c < OCEAN_CASCADES; c++ ) {
		sum += textureSampleLevel( oceanDisplacement, smpLinearRepeat, xz / ocean.sizes[ c ].x, c, level ).xyz;
	}
	return sum;
}

// ... with a weight per cascade
fn oceanSampleDisplacementWeighted( xz: vec2f, level: f32, w: vec4f ) -> vec3f {
	var sum = vec3f( 0.0 );
	for ( var c = 0; c < OCEAN_CASCADES; c++ ) {
		sum += textureSampleLevel( oceanDisplacement, smpLinearRepeat, xz / ocean.sizes[ c ].x, c, level ).xyz * w[ c ];
	}
	return sum;
}
`}),this._buildKernels(),this.updateSpectrumUniforms(),this.needsSpectrum=!0}get uSizes(){return{array:this.sizes}}setCascadeSizes(e){this.sizes=e.slice(0,this.cascades),this.updateSpectrumUniforms()}updateSpectrumUniforms(){const e=this.cascades,t=this.params.fields;for(let r=0;r<e;r++){const a=r===0?1e-4:_r/this.sizes[r]*6,n=r===e-1?9999:_r/this.sizes[r+1]*6;t.cuts.value[r].set(a,n,0,0),t.sizes.value[r].set(this.sizes[r],0,0,0)}t.depth.value=this.depth;const s=[this.local,this.swell];for(let r=0;r<2;r++){const a=s[r],n=Math.max(1,a.fetch)*1e3,h=Math.max(.1,a.windSpeed),o=.076*Math.pow(Et*n/(h*h),-.22),l=22*Math.pow(h*n/(Et*Et),-.33);t.sysA.value[r].set(a.scale,Vi.degToRad(a.windDirection),a.spreadBlend,a.swell),t.sysB.value[r].set(o,l,a.peakEnhancement,a.shortWavesFade)}this.params.set("cuts",t.cuts.value),this.params.set("sizes",t.sizes.value),this.params.set("sysA",t.sysA.value),this.params.set("sysB",t.sysB.value),this.needsSpectrum=!0}_buildKernels(){this.cascades;const e={ocean:{uniform:this.params}},t=c=>({storage:c,access:"read_write"}),s=`
fn dispersion( k: f32 ) -> f32 { return sqrt( k * FFT_G * tanh( min( k * ocean.depth, 20.0 ) ) ); }

fn dispersionDerivative( k: f32 ) -> f32 {
	let kd = min( k * ocean.depth, 20.0 );
	let th = tanh( kd );
	let ch = cosh( kd );
	return FFT_G * ( ocean.depth * k / ( ch * ch ) + th ) / dispersion( k ) * 0.5;
}

fn tmaCorrection( omega: f32 ) -> f32 {
	let omegaH = omega * sqrt( ocean.depth / FFT_G );
	let a = omegaH * omegaH * 0.5;
	let b = 1.0 - pow( 2.0 - omegaH, 2.0 ) * 0.5;
	return select( select( 1.0, b, omegaH < 2.0 ), a, omegaH <= 1.0 );
}

fn jonswap( omega: f32, sysA: vec4f, sysB: vec4f ) -> f32 {
	let alpha = sysB.x; let peakOmega = sysB.y; let gamma = sysB.z;
	let sigma = select( 0.09, 0.07, omega <= peakOmega );
	let d = omega - peakOmega;
	let r = exp( - d * d / ( sigma * sigma * peakOmega * peakOmega * 2.0 ) );
	let inv = 1.0 / omega;
	let po = peakOmega * inv;
	return sysA.x * tmaCorrection( omega ) * alpha * ( FFT_G * FFT_G )
		* pow( inv, 5.0 )
		* exp( pow( po, 4.0 ) * -1.25 )
		* pow( abs( gamma ), r );
}

fn normalisationFactor( s: f32 ) -> f32 {
	let s2 = s * s; let s3 = s2 * s; let s4 = s3 * s;
	let lo = s4 * -0.000564 + s3 * 0.00776 - s2 * 0.044 + s * 0.192 + 0.163;
	let hi = s4 * -4.80e-08 + s3 * 1.07e-05 - s2 * 9.53e-04 + s * 5.90e-02 + 3.93e-01;
	return select( hi, lo, s < 5.0 );
}

fn directionSpectrum( theta: f32, omega: f32, sysA: vec4f, sysB: vec4f ) -> f32 {
	let peakOmega = sysB.y;
	let ratio = omega / peakOmega;
	let spreadPower = select( pow( abs( ratio ), 5.0 ) * 6.97, pow( abs( ratio ), -2.5 ) * 9.77, omega > peakOmega );
	let s = spreadPower + tanh( min( ratio, 20.0 ) ) * 16.0 * sysA.w * sysA.w;
	let dTheta = theta - sysA.y;
	let cos2s = normalisationFactor( s ) * pow( abs( cos( dTheta * 0.5 ) ), s * 2.0 );
	let cosT = cos( dTheta );
	let base = cosT * cosT * ( 2.0 / PI ) * select( 0.0, 1.0, cosT > 0.0 );
	return mix( base, cos2s, sysA.z );
}

fn shortWavesFade( k: f32, sysB: vec4f ) -> f32 { return exp( - sysB.w * sysB.w * k * k ); }
`;this.initSpectrumKernel=new ge({label:"Ocean Init Spectrum",modules:[Z],bindings:{...e,h0:t(this.h0),waveData:t(this.waveData)},workgroupSize:[16,16,1],code:cs+s+`
@compute @workgroup_size( WG_X, WG_Y, WG_Z )
fn main( @builtin( global_invocation_id ) gid: vec3u ) {
	let x = i32( gid.x ); let y = i32( gid.y ); let c = i32( gid.z );
	let idx = c * ${E*E} + y * ${E} + x;

	let L = ocean.sizes[ c ].x;
	let dk = TWO_PI / L;
	let kx = f32( x - ${pt} ) * dk;
	let kz = f32( y - ${pt} ) * dk;
	let kLen = length( vec2f( kx, kz ) );

	var outH = vec4f( 0.0 );
	var outW = vec4f( kx, kz, 0.0, 0.0 );

	if ( kLen >= ocean.cuts[ c ].x && kLen <= ocean.cuts[ c ].y ) {
		let omega = dispersion( kLen );
		let dOmega = dispersionDerivative( kLen );
		let theta = atan2( kz, kx );

		let sa0 = ocean.sysA[ 0 ]; let sb0 = ocean.sysB[ 0 ];
		let sa1 = ocean.sysA[ 1 ]; let sb1 = ocean.sysB[ 1 ];

		let S0 = jonswap( omega, sa0, sb0 ) * directionSpectrum( theta, omega, sa0, sb0 ) * shortWavesFade( kLen, sb0 );
		let S1 = jonswap( omega, sa1, sb1 ) * directionSpectrum( theta, omega, sa1, sb1 ) * shortWavesFade( kLen, sb1 );
		let S = max( S0 + S1, 0.0 );

		// E|h0|^2 = S(k) dk^2 / 2 so that var(height) = sum S(k) dk^2 (h has both +k and -k terms)
		let amp = sqrt( S * abs( dOmega ) / kLen * dk * dk ) * 0.5;

		// gaussian random pair (Box-Muller)
		let seed = u32( idx ) * 4u + ocean.seed * 7919u;
		let u1 = fftToUnit( fftPcg( seed ) );
		let u2 = fftToUnit( fftPcg( seed + 1u ) );
		let r = sqrt( log( u1 ) * -2.0 );
		let g0 = r * cos( u2 * TWO_PI );
		let g1 = r * sin( u2 * TWO_PI );

		outH = vec4f( g0 * amp, g1 * amp, 0.0, 0.0 );
		outW = vec4f( kx, kz, 1.0 / kLen, omega );
	}

	h0[ idx ] = outH;
	waveData[ idx ] = outW;
}`}),this.conjugateKernel=new ge({label:"Ocean Conjugate",bindings:{h0:t(this.h0),tmp:t(this.tmp)},workgroupSize:[16,16,1],code:`
@compute @workgroup_size( WG_X, WG_Y, WG_Z )
fn main( @builtin( global_invocation_id ) gid: vec3u ) {
	let x = i32( gid.x ); let y = i32( gid.y ); let c = i32( gid.z );
	let base = c * ${E*E};
	let idx = base + y * ${E} + x;
	let xm = ( ${E} - x ) % ${E};
	let ym = ( ${E} - y ) % ${E};
	let idxm = base + ym * ${E} + xm;
	let hm = h0[ idxm ].xy;
	let cur = h0[ idx ].xy;
	tmp[ idx ] = vec4f( cur.x, cur.y, hm.x, - hm.y );
}`}),this.copyH0Kernel=new ge({label:"Ocean Copy H0",bindings:{h0:t(this.h0),tmp:t(this.tmp),foam:t(this.foam)},workgroupSize:[16,16,1],code:`
@compute @workgroup_size( WG_X, WG_Y, WG_Z )
fn main( @builtin( global_invocation_id ) gid: vec3u ) {
	let idx = gid.z * ${E*E}u + gid.y * ${E}u + gid.x;
	h0[ idx ] = tmp[ idx ];
	foam[ idx ] = 0.0;
}`});let r="";for(let c=0;c<on;c++){const u=1<<c;r+=`
	{
		let pos = t & ${u-1}u;
		let i = ( ( t >> ${c}u ) << ${c+1}u ) | pos;
		let j = i + ${u}u;
		let ang = f32( pos ) * ${(Math.PI/u).toFixed(12)};
		let w = vec2f( cos( ang ), sin( ang ) );
		let i2 = i * 2u; let j2 = j * 2u;
		let a0 = fftShared[ i2 ]; let a1 = fftShared[ i2 + 1u ];
		let b0 = fftCmul2( fftShared[ j2 ], w ); let b1 = fftCmul2( fftShared[ j2 + 1u ], w );
		fftShared[ i2 ] = a0 + b0;
		fftShared[ i2 + 1u ] = a1 + b1;
		fftShared[ j2 ] = a0 - b0;
		fftShared[ j2 + 1u ] = a1 - b1;
		workgroupBarrier();
	}`}const a=`var<workgroup> fftShared: array<vec4f, ${E*2}>;
`;this.rowKernel=new ge({label:"Ocean FFT Rows",modules:[Z],bindings:{...e,h0:t(this.h0),waveData:t(this.waveData),tmp:t(this.tmp)},workgroupSize:[pt,1,1],code:cs+a+`
@compute @workgroup_size( WG_X, WG_Y, WG_Z )
fn main( @builtin( local_invocation_id ) lid: vec3u, @builtin( workgroup_id ) wid: vec3u ) {
	let t = lid.x;
	let row = wid.x;
	let c = wid.y;
	let base = c * ${E*E}u + row * ${E}u;
	let time = ocean.time;

	for ( var e = 0u; e < 2u; e++ ) {
		let x = t + e * FFT_HALF;
		let idx = base + x;
		let w = waveData[ idx ];
		let hv = h0[ idx ];
		let ph = w.w * time;
		let cs = cos( ph ); let sn = sin( ph );

		// h = h0 * e^{i w t} + conj(h0(-k)) * e^{-i w t}
		let hr = hv.x * cs - hv.y * sn + hv.z * cs + hv.w * sn;
		let hi = hv.x * sn + hv.y * cs - hv.z * sn + hv.w * cs;

		let kx = w.x; let kz = w.y; let ik = w.z;
		let fx = kx * ik; let fz = kz * ik;

		// Dx_hat = i kx/k h, Dz_hat = i kz/k h  ->  c0 = Dx + i Dz
		let c0 = vec2f( - ( fx * hi + fz * hr ), fx * hr - fz * hi );
		// c1 = Dy + i dDx/dz,  dDx/dz_hat = -kx kz / k h
		let q = - ( kx * kz * ik );
		let c1 = vec2f( hr - q * hi, hi + q * hr );
		// c2 = dDy/dx + i dDy/dz
		let c2 = vec2f( - ( kx * hi + kz * hr ), kx * hr - kz * hi );
		// c3 = dDx/dx + i dDz/dz
		let a = - ( kx * kx * ik ); let b = - ( kz * kz * ik );
		let c3 = vec2f( a * hr - b * hi, a * hi + b * hr );

		let r = fftBitReverse8( x ) * 2u;
		fftShared[ r ] = vec4f( c0, c1 );
		fftShared[ r + 1u ] = vec4f( c2, c3 );
	}

	workgroupBarrier();
${r}

	for ( var e = 0u; e < 2u; e++ ) {
		let x = t + e * FFT_HALF;
		let o = ( base + x ) * 2u;
		tmp[ o ] = fftShared[ x * 2u ];
		tmp[ o + 1u ] = fftShared[ x * 2u + 1u ];
	}
}`});const n=(c,u)=>({storageTexture:c,access:"write",view:{dimension:"2d-array",baseMipLevel:u,mipLevelCount:1}});this.columnKernel=new ge({label:"Ocean FFT Columns",modules:[Z],bindings:{...e,tmp:t(this.tmp),foam:t(this.foam),mipSrc:t(this.mipSrc),dispOut:n(this.displacementTexture,0),derivOut:n(this.derivativeTexture,0)},workgroupSize:[pt,1,1],code:cs+a+`
@compute @workgroup_size( WG_X, WG_Y, WG_Z )
fn main( @builtin( local_invocation_id ) lid: vec3u, @builtin( workgroup_id ) wid: vec3u ) {
	let t = lid.x;
	let col = wid.x;
	let c = wid.y;
	let base = c * ${E*E}u;

	for ( var e = 0u; e < 2u; e++ ) {
		let y = t + e * FFT_HALF;
		let idx = base + y * ${E}u + col;
		let r = fftBitReverse8( y ) * 2u;
		fftShared[ r ] = tmp[ idx * 2u ];
		fftShared[ r + 1u ] = tmp[ idx * 2u + 1u ];
	}

	workgroupBarrier();
${r}

	let lambda = ocean.choppiness;
	for ( var e = 0u; e < 2u; e++ ) {
		let y = t + e * FFT_HALF;
		let idx = base + y * ${E}u + col;
		let sign = select( -1.0, 1.0, ( ( col + y ) & 1u ) == 0u );
		let A = fftShared[ y * 2u ] * sign;
		let B = fftShared[ y * 2u + 1u ] * sign;

		let Dx = A.x; let Dz = A.y; let Dy = A.z; let Dxz = A.w;
		let Dyx = B.x; let Dyz = B.y; let Dxx = B.z; let Dzz = B.w;

		let jxx = lambda * Dxx + 1.0;
		let jzz = lambda * Dzz + 1.0;
		let jxz = lambda * Dxz;
		let J = jxx * jzz - jxz * jxz;

		// Persistent foam: generated where the surface compresses (J < bias),
		// then slowly decays so whitecaps leave trailing foam patches.
		let prev = foam[ idx ];
		let gen = sat( ( ocean.foamBias - J ) * ocean.foamGain );
		let f = prev * exp( - ocean.foamDecay * frame.dt ) + gen * ocean.foamAdd * frame.dt;
		let fNew = clamp( max( f, gen * 0.5 ), 0.0, 1.5 );
		foam[ idx ] = fNew;

		let uv = vec2u( col, y );
		let vDisp = vec4f( lambda * Dx, Dy, lambda * Dz, fNew );
		let vDeriv = vec4f( Dyx, Dyz, lambda * Dxx, lambda * Dzz );
		textureStore( dispOut, uv, c, vDisp );
		textureStore( derivOut, uv, c, vDeriv );
		mipSrc[ idx * 2u ] = vDisp;
		mipSrc[ idx * 2u + 1u ] = vDeriv;
	}
}`});const h=(c,u,f,m,y)=>{const d=f*2;let v="";return u?v=`${u}[ ly * ${f}u + lx ] = v;`:m===5&&(v=`mipMid[ ( c * 64u + gy * 8u + gx ) * 2u + ${y}u ] = v;`),`
	if ( lx < ${f}u && ly < ${f}u ) {
		let i = ly * ${2*d}u + lx * 2u;
		let v = ( ${c}[ i ] + ${c}[ i + 1u ] + ${c}[ i + ${d}u ] + ${c}[ i + ${d+1}u ] ) * 0.25;
		textureStore( out${m}, vec2u( gx * ${f}u + lx, gy * ${f}u + ly ), c, v );
		${v}
	}`},o=(c,u)=>new ge({label:"Ocean Mips A",bindings:{mipSrc:t(this.mipSrc),mipMid:t(this.mipMid),out1:n(c,1),out2:n(c,2),out3:n(c,3),out4:n(c,4),out5:n(c,5)},workgroupSize:[16,16,1],code:`
var<workgroup> s1: array<vec4f, 256>;
var<workgroup> s2: array<vec4f, 64>;
var<workgroup> s3: array<vec4f, 16>;
var<workgroup> s4: array<vec4f, 4>;
fn src( c: u32, x: u32, y: u32 ) -> vec4f { return mipSrc[ ( c * ${E*E}u + y * ${E}u + x ) * 2u + ${u}u ]; }
@compute @workgroup_size( WG_X, WG_Y, WG_Z )
fn main( @builtin( local_invocation_id ) lid: vec3u, @builtin( workgroup_id ) wid: vec3u ) {
	let lx = lid.x; let ly = lid.y;
	let gx = wid.x; let gy = wid.y; let c = wid.z;
	let x1 = gx * 16u + lx; let y1 = gy * 16u + ly;
	let x0 = x1 * 2u; let y0 = y1 * 2u;
	let v1 = ( src( c, x0, y0 ) + src( c, x0 + 1u, y0 ) + src( c, x0, y0 + 1u ) + src( c, x0 + 1u, y0 + 1u ) ) * 0.25;
	textureStore( out1, vec2u( x1, y1 ), c, v1 );
	s1[ ly * 16u + lx ] = v1;
	workgroupBarrier();
${h("s1","s2",8,2,u)}
	workgroupBarrier();
${h("s2","s3",4,3,u)}
	workgroupBarrier();
${h("s3","s4",2,4,u)}
	workgroupBarrier();
${h("s4",null,1,5,u)}
}`}),l=(c,u)=>new ge({label:"Ocean Mips B",bindings:{mipMid:t(this.mipMid),out6:n(c,6),out7:n(c,7),out8:n(c,8)},workgroupSize:[8,8,1],code:`
var<workgroup> s5: array<vec4f, 64>;
var<workgroup> s6: array<vec4f, 16>;
var<workgroup> s7: array<vec4f, 4>;
@compute @workgroup_size( WG_X, WG_Y, WG_Z )
fn main( @builtin( local_invocation_id ) lid: vec3u, @builtin( workgroup_id ) wid: vec3u ) {
	let lx = lid.x; let ly = lid.y; let c = wid.z;
	let gx = 0u; let gy = 0u;
	s5[ ly * 8u + lx ] = mipMid[ ( c * 64u + ly * 8u + lx ) * 2u + ${u}u ];
	workgroupBarrier();
${h("s5","s6",4,6,u)}
	workgroupBarrier();
${h("s6","s7",2,7,u)}
	workgroupBarrier();
${h("s7",null,1,8,u)}
}`});this.mipKernelsA=[o(this.displacementTexture,0),o(this.derivativeTexture,1)],this.mipKernelsB=[l(this.displacementTexture,0),l(this.derivativeTexture,1)]}update(e){const t=this.cascades;if(this.needsSpectrum){this.needsSpectrum=!1;const s=[E/16,E/16,t];this.initSpectrumKernel.dispatch(s),this.conjugateKernel.dispatch(s),this.copyH0Kernel.dispatch(s)}this.time.value+=e*this.timeScale,L.computePass("Ocean FFT",s=>{this.rowKernel.dispatch([E,t,1],{pass:s}),this.columnKernel.dispatch([E,t,1],{pass:s});for(const r of this.mipKernelsA)r.dispatch([E/32,E/32,t],{pass:s});for(const r of this.mipKernelsB)r.dispatch([1,1,t],{pass:s})})}sampleDisplacement(e,t=null,s=null){const r=[];for(let a=0;a<this.cascades;a++){let n=`textureSampleLevel( oceanDisplacement, smpLinearRepeat, ( ${e} ) / ocean.sizes[ ${a} ].x, ${a}, ${t??"0.0"} ).xyz`;s&&(n+=` * ( ${s[a]} )`),r.push(n)}return"( "+r.join(" + ")+" )"}}class cn{constructor({fft:e,cdlod:t,foamTexture:s}){this.fft=e,this.cdlod=t,this.foamTexture=s,this.shore=null,this.wake=null,this.terrain=null,this.detail=null,this.shoreSim=null,this.foamShading=null,this.params=new ue("WaterSurfaceParams",{amplitude:["f32",1],slopeScale:["f32",1],foamCoverage:["f32",1],foamSharpness:["f32",2.2],foamScale:["f32",.09]},{label:"waterSurface"});const r=this.params.fields;this.amplitude=r.amplitude,this.slopeScale=r.slopeScale,this.foamCoverage=r.foamCoverage,this.foamSharpness=r.foamSharpness,this.foamScale=r.foamScale,this.foamWeights=[.35,.45,.5,.25];const a=[],n=[];for(let o=0;o<e.cascades;o++)a.push(Math.min(40,e.sizes[o]*.08)),n.push([0,.05,.25,.5][o]??.5);const h=o=>`array<f32, ${o.length}>( ${o.map(l=>l.toFixed(5)).join(", ")} )`;this.attenuationModule=new Y({name:"waterSurfaceAttenuation",deps:[Z],code:`
fn waterSurfaceCascadeAttenuation( c: i32, depth: f32 ) -> f32 {
	let d0 = ${h(a)};
	let floorAmt = ${h(n)};
	let a = smoothstep( 0.0, d0[ c ], depth );
	return mix( floorAmt[ c ] * smoothstep( 0.0, 0.6, depth ), 1.0, a );
}
`}),this._module=null}get surfFoam(){const e=this.foamShading;if(e&&e.module)return e;if(typeof e=="function"){const t=e({});if(t&&t.isShaderModule)return{module:t};if(t&&t.module)return t}return null}get module(){return this._module||(this._module=this._buildModule()),this._module}_buildModule(){const e=this.fft,t=e.cascades,s=!!this.terrain,r=!!this.shore,a=!!this.wake,n=!!this.detail,h=this.surfFoam,o=!!this.shoreSim,l=this.cdlod.module.name,c=l[0].toUpperCase()+l.slice(1)+"Vertex",u=p=>Number(p).toFixed(6);let f="";for(let p=0;p<t;p++){const S=e.sizes[p]/gt;f+=`
	{
		// band-limit to the mesh spacing to avoid aliasing / swimming
		let level = max( log2( spacing / ${u(S)} ) + 0.7, 0.0 );
		let att = waterSurfaceCascadeAttenuation( ${p}, depth );
		let uv = worldXZ / ocean.sizes[ ${p} ].x;
		let s = textureSampleLevel( oceanDisplacement, smpLinearRepeat, uv, ${p}, level );
		disp += s.xyz * att;
		// foam coverage is smooth enough to evaluate per vertex (sampled at a fixed detail level,
		// the displacement sample itself from there on)
		var fv = s.w;
		if ( level < 1.5 ) { fv = textureSampleLevel( oceanDisplacement, smpLinearRepeat, uv, ${p}, 1.5 ).w; }
		foam += fv * ${u(this.foamWeights[p]??.25)} * att;
	}`}const m=`
const WATER_SHORE_DEEP: f32 = 26.0; // m: ShoreWaves' envelope smoothstep( 26, 13, depth ) is 0 beyond

struct WaterSurfaceVertex {
	position: vec3f,
	lagXZ: vec2f,
	height: f32,
	depth: f32,
	foam: f32,
	shoreN: vec3f,
	shoreFoam: f32,
	swash: f32,
	surfMask: vec2f, // clear plunging face, whitewater roller relief (m)
};

// depth of the sea floor below mean sea level at xz (m)
fn waterSurfaceSeaDepth( xz: vec2f ) -> f32 {
	return ${s?"frame.seaLevel - terrainHeightAt( xz )":"500.0"};
}

fn waterSurfaceVertex( node: vec4f, grid: vec2f ) -> WaterSurfaceVertex {
	let lod: ${c} = ${l}Morph( node, grid, frame.cameraPos, 0.0 );
	let worldXZ = lod.worldXZ;
	let spacing = lod.spacing;
	let ground = ${s?"terrainHeightAt( worldXZ )":"-500.0"};
	let depth = ${s?"frame.seaLevel - ground":"500.0"};

	var disp = vec3f( 0.0 );
	var foam = 0.0;
${f}

	disp *= waterSurface.amplitude;

	var extra = vec3f( 0.0 );
	var shoreN = vec3f( 0.0, 1.0, 0.0 );
	var shoreFoam = 0.0;
	var swash = 0.0;
	var surfMask = vec2f( 0.0 ); // clear plunging face, whitewater roller relief (m)
${r?`
	// Offshore of WATER_SHORE_DEEP the shore waves have faded out completely (their envelope is 0 from 26 m
	// of depth, see ShoreWaves) and there is no swash: most of the sea skips their evaluation.
	let nearShore = depth < WATER_SHORE_DEEP;
	var swashLevel = -1e4;
	if ( nearShore ) {
		let sw = shoreEvaluate( worldXZ, depth, ground );
		extra += sw.disp;
		shoreN = clamp( sw.nShore, vec3f( -1.0 ), vec3f( 1.0 ) );
		// (the foam line on the swash front is added per pixel in the water shader: on this coarse mesh
		// it would end short of the front and follow the triangles)
		shoreFoam = sw.foam;
		surfMask = vec2f( sw.face, sw.roller );
		swashLevel = sw.swashLevel;
	}`:""}
${a?"	extra += wakeDisplacement( worldXZ );":""}

	var total = disp + extra;
	var y = frame.seaLevel + total.y;
${r?`
	if ( nearShore ) {
		// thin run-up sheet on the sand: take whichever surface is higher (smooth max)
		let k = 0.04;
		// no run-up sheet on steep rock (cliffs, sea stacks): waves break against it instead
		let nr = ${s?"terrainNormalRockLevel( worldXZ, 0.0 )":"vec4f( 0.0 )"};
		let gentle = ${s?"smoothstep( 0.45, 0.25, length( nr.xy ) )":"1.0"};
		let hmx = sat( ( swashLevel - y ) / k * 0.5 + 0.5 ) * gentle;
		let smax = mix( y, swashLevel, hmx ) + hmx * ( 1.0 - hmx ) * k;
		swash = smoothstep( -0.02, 0.03, swashLevel - y );
		y = smax;
		// Where the sheet is the surface it is the sheet that is seen, not the wave below it: the sheet
		// lies on the sand (the sand's slope, no horizontal wave motion, no plunging face / roller).
		// Otherwise the backwash sheet over the lower beach face, exposed by the trough of the next
		// wave, keeps the trough's tilted normal and motion and reads as a separate dark strip
		// between the sea and the thin film further up.
		shoreN = normalize( mix( shoreN, vec3f( nr.x, 1.0, nr.y ), hmx ) );
		let still = 1.0 - hmx;
		total = vec3f( total.x * still, total.y, total.z * still );
		surfMask *= still;
	}`:""}
${s?`
	// hide the water sheet below dry land (beyond the swash zone)
	let below = select( ground - 0.06, min( ground - 2.0, frame.seaLevel - 1.0 ), depth < -3.0 );
	y = select( y, min( y, below ), y < ground );`:""}

	var o: WaterSurfaceVertex;
	o.position = vec3f( worldXZ.x + total.x, y, worldXZ.y + total.z );
	o.lagXZ = worldXZ;
	o.height = total.y;
	o.depth = depth;
	o.foam = foam;
	o.shoreN = shoreN;
	o.shoreFoam = shoreFoam;
	o.swash = swash;
	o.surfMask = surfMask;
	return o;
}
`;let y="";for(let p=0;p<t;p++){let g=`waterSurfaceCascadeAttenuation( ${p}, depth )`;n&&p>=t-2?g+=" * rough":n&&p===t-3&&(g+=" * mix( 1.0, rough, 0.4 )"),y+=`	d += textureSample( oceanDerivatives, smpAniso4Repeat, lagXZ / ocean.sizes[ ${p} ].x, ${p} ) * ( ${g} );
`}const d=t-1,v=e.sizes[d],x=7.3,b=3.1,w=v/x/gt,M=v/b/gt,z=(p,g)=>`vec2f( ${p}.x * ${u(Math.cos(g))} - ${p}.y * ${u(Math.sin(g))}, ${p}.x * ${u(Math.sin(g))} + ${p}.y * ${u(Math.cos(g))} )`,A=`
struct WaterSurfaceFrag {
	normal: vec3f,
	foam: f32,
	coverage: f32,
	slopes: vec2f,
	jacobian: f32,
	rough: f32,
	aeration: f32,
	gust: f32,
	slick: f32,
${h?"	foamInfo: SurfFoamInfo,":""}
};

// extraFoam: foam carried by the water (ShoreSim); simState: ShoreSim.sample() here; surfMask
// (clear face of a plunging wave, whitewater roller relief, from the vertex stage)
fn waterSurfaceFragment( lagXZ: vec2f, footprint: f32, depth: f32, vertexFoam: f32, shoreN: vec3f, shoreFoam: f32, extraFoam: f32, simState: vec4f, surfMask: vec2f, P: vec3f ) -> WaterSurfaceFrag {
	var d = vec4f( 0.0 );
	var foamSum = 0.0;
	// the clear concave face of a plunging wave overhangs the trough: the foam carried by the
	// (depth-averaged, world-space) shore simulation below it is not on the face
	let face = ${r?"sat( surfMask.x )":"0.0"};
	// (some of it stays: the lace of the previous wave is drawn up the face)
	let simFoam = ${o?"extraFoam * ( 1.0 - face * 0.72 )":"0.0"};
	foamSum += simFoam;
	// bubbles mixed into the water (milky, turquoise, hides the bottom): surf and wake
	var aeration = 0.0;

	// world-space gusts / slicks modulate the short wind waves (non-repeating dark and bright patches)
${n?`	let det = seaDetailSample( lagXZ );
	let rough = det.rough;`:"	let rough = 1.0;"}

${y}
	d *= waterSurface.amplitude;
	var slopes = vec2f( d.x / max( d.z + 1.0, 0.2 ), d.y / max( d.w + 1.0, 0.2 ) );

	// Near-field capillary ripples. Within a few metres of the camera a pixel covers less than
	// the finest cascade's texel (~3 cm), so the surface looks glassy. Re-sample that cascade at
	// ~1 m and ~2.3 m tiles (rotated, so they never line up with it) wherever the footprint is
	// small. Damped in slicks with the short wind waves. Explicit LOD: this runs in a branch.
	let near = smoothstep( 0.04, 0.01, footprint ) * rough;
	if ( near > 0.002 ) {
		let c1 = textureSampleLevel( oceanDerivatives, smpLinearRepeat, ${z("lagXZ",.63)} * ${u(x/v)}, ${d}, max( log2( footprint / ${u(w)} ), 0.0 ) );
		let c2 = textureSampleLevel( oceanDerivatives, smpLinearRepeat, ${z("lagXZ",2.14)} * ${u(b/v)}, ${d}, max( log2( footprint / ${u(M)} ), 0.0 ) );
		// gradients back into world axes (transpose of the rotation)
		let g1 = c1.xy; let g2 = c2.xy;
		let g = ${z("g1",-.63)} * 0.55 + ${z("g2",-2.14)} * 0.35;
		slopes += g * near;
	}
	let jac = ( d.z + 1.0 ) * ( d.w + 1.0 );
${a?`
	{
		let w = wakeFragment( lagXZ );
		slopes += w.slopes;
		foamSum += w.foam;
		aeration += w.aeration;
	}`:""}

	// base normal: large shoreline waves (per-vertex, can overhang) perturbed by FFT detail
	var normal: vec3f;
	var baseNormal = vec3f( 0.0, 1.0, 0.0 );
${r?`
	{
		// On a coarse mesh the shore normal can flip between the vertices of a folding crest: the
		// interpolated vector then cancels out (or is NaN). Keep it finite and facing up; NaN
		// would otherwise surface as a white-hot cell after the output clamp.
		let sn = clamp( shoreN, vec3f( -1.0 ), vec3f( 1.0 ) ) + vec3f( 0.0, 1e-3, 0.0 );
		let Ns0 = sn / max( length( sn ), 1e-4 );
		let Ns = normalize( vec3f( Ns0.x, max( Ns0.y, 0.12 ), Ns0.z ) );
		baseNormal = Ns;
		// the ripples and chop ride on the wave: the detail normal is rotated onto the tilted face
		// (reoriented normal mapping) instead of being flattened by it, so a steep face keeps the
		// full texture of the sea surface rather than turning into smooth plastic
		let nd = normalize( vec3f( - slopes.x, 1.0, - slopes.y ) );
		let tq = Ns + vec3f( 0.0, 1.0, 0.0 );
		let uq = vec3f( slopes.x, 1.0, slopes.y ) * nd.y;
		normal = normalize( tq * ( dot( tq, uq ) / tq.y ) - uq );
		foamSum += shoreFoam * ${o?"0.55":"1.0"};
		// the roller and the water behind the plunge point are full of bubbles, decaying behind the
		// bore with the foam it sheds; the clear face of a plunging wave is not
		aeration += sat( shoreFoam * 1.2 + simFoam * 0.7 ) * ( 1.0 - face ) * smoothstep( -0.1, 0.3, depth );
	}`:`
	normal = normalize( vec3f( - slopes.x, 1.0, - slopes.y ) );`}

	// whitecaps: persistent (per vertex) + fresh where the surface is compressed right now;
	// more of them inside gusts, plus windrow lines in fresh wind
	let fresh = sat( ( ocean.foamBias - 0.15 - jac ) * 2.0 );
	var whitecaps = vertexFoam + fresh;
${n?"	whitecaps = whitecaps * mix( 0.5, 1.5, det.gust ) + det.streak * 0.5;":""}
	let coverage = sat( ( foamSum + whitecaps ) * waterSurface.foamCoverage );

	// foam pattern: an irregular bubbly mat thresholded by coverage, so foam grows, tears into
	// lace and dissolves naturally
	let fuv = lagXZ * waterSurface.foamScale;
	let p1 = textureSample( waterFoamTex, smpAniso4Repeat, fuv );
	// second layer at another scale, rotated, to break repetition
	let r2 = vec2f( fuv.x * 0.8 - fuv.y * 0.6, fuv.x * 0.6 + fuv.y * 0.8 );
	let p2 = textureSample( waterFoamTex, smpAniso4Repeat, r2 * 2.37 + vec2f( 0.31, 0.77 ) );
	let pattern = p1.x * 0.62 + p2.x * 0.38;
	let thresh = 1.05 - coverage * 1.1;
	let soft = 0.06 + footprint * 0.1;
	let detail = smoothstep( thresh - soft, thresh + soft, pattern ) * ( p1.y * 0.25 + 0.8 );
	// at distance the pattern averages out -> use coverage directly
	let far = smoothstep( 0.15, 1.2, footprint );
	var foam = mix( detail, coverage * 0.85, far );

	var o: WaterSurfaceFrag;
${h?`
	// foam look (surf zone whitewater / lace, see SurfFoam)
	var fa: SurfFoamArgs;
	fa.coverage = coverage; fa.foam = foam; fa.footprint = footprint; fa.depth = depth; fa.bubbles = p1.y;
	fa.lagXZ = lagXZ; fa.normal = normal; fa.baseNormal = baseNormal;
	fa.fresh = ${r?"shoreFoam":"0.0"}; fa.sim = simFoam; fa.simState = simState; fa.roller = ${r?"surfMask.y":"0.0"}; fa.P = P;
	o.foamInfo = surfFoamShading( fa );
	foam = o.foamInfo.foam;`:""}

	o.normal = normal;
	o.foam = foam;
	o.coverage = coverage;
	o.slopes = slopes;
	o.jacobian = jac;
	o.rough = rough;
	o.aeration = sat( aeration );
	o.gust = ${n?"det.gust":"0.5"};
	o.slick = ${n?"det.slick":"0.0"};
	return o;
}
`;return new Y({name:"waterSurface",deps:[Z,e.module,this.cdlod.module,this.attenuationModule,s&&this.terrain.module,r&&this.shore.module,a&&this.wake.module,n&&this.detail.module,h&&h.module],uniforms:this.params,uniformName:"waterSurface",bindings:{waterFoamTex:{texture:this.foamTexture}},code:m+A})}seaDepth(e){return`waterSurfaceSeaDepth( ${e} )`}cascadeAttenuation(e,t){return`waterSurfaceCascadeAttenuation( ${e}, ${t} )`}}const ws=6,un=new ue("WhaleMarks",{marks:[`vec4f[${ws}]`,new Array(ws).fill(0).map(()=>new G(0,0,1,0))]},{label:"whaleMarks"}),fn=new Y({name:"whaleWater",uniforms:un,uniformName:"whaleMarks",code:`
fn whaleWater( xz: vec2f ) -> vec2f {
	var foam = 0.0; var slick = 0.0;
	for ( var i = 0; i < ${ws}; i++ ) {
		let e = whaleMarks.marks[ i ];
		let d = length( xz - e.xy ) / e.z;
		// (outside a mark, or an unused one, core or the amounts are 0)
		if ( d >= 1.0 || e.w == 0.0 ) { continue; }
		let core = 1.0 - smoothstep( 0.2, 1.0, d );
		// churned water breaks up into lumps and streaks with dark water between them, denser
		// toward the middle
		let q = xz * 0.8; let q2 = xz * 2.9;
		let n1 = sin( q.x + sin( q.y * 1.3 ) * 1.7 ) * sin( q.y * 1.1 + sin( q.x * 1.7 ) * 1.4 );
		let n2 = sin( q2.x * 1.1 + sin( q2.y ) * 1.3 ) * sin( q2.y * 0.9 + sin( q2.x * 1.2 ) );
		let lumps = smoothstep( -0.25, 0.55, n1 * 0.7 + n2 * 0.45 + ( 1.0 - d ) * 0.5 );
		foam = max( foam, core * max( e.w, 0.0 ) * lumps * 0.85 );
		slick = max( slick, core * max( - e.w, 0.0 ) );
	}
	return vec2f( foam, slick );
}
`}),Ee={left:.15,right:.15,bottom:.6,top:0},mt={cx:(Ee.right-Ee.left)/2,cy:(Ee.top-Ee.bottom)/2,sx:1+(Ee.left+Ee.right)/2,sy:1+(Ee.top+Ee.bottom)/2};new U().set(1/mt.sx,0,0,-0/mt.sx,0,1/mt.sy,0,.3/mt.sy,0,0,1,0,0,0,0,1);new U;const Fe=1.333,dn=new Y({name:"waterFresnel",deps:[Z],code:`
fn fresnelDielectric( cosI: f32, eta: f32 ) -> f32 {
	let c = clamp( cosI, 0.0, 1.0 );
	let g2 = eta * eta - 1.0 + c * c;
	let tir = g2 < 0.0;
	let g = sqrt( max( g2, 0.0 ) );
	let a = ( g - c ) / ( g + c );
	let b = ( c * ( g + c ) - 1.0 ) / ( c * ( g - c ) + 1.0 );
	return select( 0.5 * ( a * a ) * ( b * b + 1.0 ), 1.0, tir );
}

fn waterPhaseHG( cosT: f32, g: f32 ) -> f32 {
	let g2 = g * g;
	return ( ( 1.0 - g2 ) / ( 4.0 * PI ) ) / pow( max( 1.0 + g2 - cosT * 2.0 * g, 1e-4 ), 1.5 );
}

fn viewPositionFromViewZ( uv: vec2f, viewZ: f32 ) -> vec3f {
	let ndc = vec2f( uv.x * 2.0 - 1.0, ( 1.0 - uv.y ) * 2.0 - 1.0 );
	let p00 = frame.proj[ 0 ][ 0 ];
	let p11 = frame.proj[ 1 ][ 1 ];
	return vec3f( ndc.x / p00, ndc.y / p11, -1.0 ) * ( - viewZ );
}
`});class pn extends ot{constructor({surface:e,sky:t,sceneCopy:s,sceneDepthHalf:r=null,refraction:a=null,reflection:n=null,hullMask:h=null,hullMaskActive:o=null}){super({name:"water",lit:!1,side:"double",transparent:!1,blending:"none",depthWrite:!0,defines:{IS_WATER:1},attributes:{nodeData:"vec4f"},varyings:{vLagXZ:"vec2f",vWaveH:"f32",vSeaDepth:"f32",vFoam:"f32",vShoreN:"vec3f",vShoreFoam:"f32",vSurfMask:"vec2f"},uniforms:{backscatter:["f32",.035],sss:["f32",1],refraction:["f32",.06],foamIntensity:["f32",1],waterRoughness:["f32",.035],reflectionStrength:["f32",1],ssr:["f32",1],debugMode:["i32",0],hullActive:["f32",0]}}),this.isWaterMaterial=!0,this.lightingHooks=!1,this.waterSurface=e,this.sky=t,this.reflection=n,this.clouds=null,this.cheap=!1,this.cameraWaterHeightNode=null;const l=this.uniforms;this.params={absorption:de.waterAbsorption,scattering:de.waterScattering,backscatter:l.backscatter,sss:l.sss,refraction:l.refraction,foamIntensity:l.foamIntensity,roughness:l.waterRoughness,reflectionStrength:l.reflectionStrength,ssr:l.ssr},this.debugMode=l.debugMode,this.sceneDepthTexture=s.depthTexture,this.sceneColorTexture=s.texture,this.sceneDepthHalfTexture=r,this.refraction=a,this.hullMaskTexture=h,this.hullMaskActive=o,o&&(this.uniformBlock.fields.hullActive=o),this._built=!1}get _hullOn(){return this._hull?this.hullOverride!==void 0&&this.hullOverride!==null?!!this.hullOverride:this.hullMaskActive.value>.5:!1}pipelineKey(){return this._built||this._build(),super.pipelineKey()+(this._hullOn?".hull":"")}allDefines(){return{...super.allDefines(),WATER_HULL:this._hullOn?1:0}}_build(){this._built=!0;const e=this.waterSurface,t=this.sky,s=!!e.terrain,r=!!e.shore,a=!!e.shoreSim,n=!!e.surfFoam,h=!!(this.clouds&&this.clouds.module),o=!!(this.hullMaskTexture&&this.hullMaskActive),l=!!(this.reflection&&this.reflection.module);this.modules=[Z,dn,yn,fn,e.module,t&&t.module,h&&this.clouds.module,a&&e.shoreSim.module,l&&this.reflection.module,this.cameraWaterHeightNode&&this.cameraWaterHeightNode.module].filter(Boolean),this.bindings.waterSceneColor={texture:this.sceneColorTexture},this.bindings.waterSceneDepth={texture:this.sceneDepthTexture,sampleType:"unfilterable-float"},this.sceneDepthHalfTexture&&(this.bindings.waterSceneDepthHalf={texture:this.sceneDepthHalfTexture}),this.setDefine("WATER_DEPTH_HALF",this.sceneDepthHalfTexture?1:0);const c=!!this.refraction;c&&(this.bindings.waterRefrColor={texture:this.refraction.texture},this.bindings.waterRefrDepth={texture:this.refraction.depthTexture,sampleType:"unfilterable-float"}),this.setDefine("WATER_REFRACTION",c?1:0),o&&(this.bindings.waterHullMask={texture:this.hullMaskTexture,sampleType:"unfilterable-float"}),this._hull=o,this.vertex=`
	let r = waterSurfaceVertex( v.nodeData, v.position.xz );
	v.useWorld = true;
	v.worldPos = r.position;
	v.worldNormal = vec3f( 0.0, 1.0, 0.0 );
	o.vLagXZ = r.lagXZ;
	o.vWaveH = r.height;
	o.vSeaDepth = r.depth;
	o.vFoam = r.foam;
	o.vShoreN = r.shoreN;
	o.vShoreFoam = r.shoreFoam;
	o.vSurfMask = r.surfMask;
`,this.output=this.cheap?"r.color = vec4f( 0.02, 0.05, 0.1, 1.0 ); r.mask = vec4f( 0.0, 1.0, 0.0, 1.0 );":this._shadeWGSL({T:s,SH:r,SIM:a,SF:n,CL:h,HULL:o,REFL:l}),this.needsUpdate=!0}_shadeWGSL({T:e,SH:t,SIM:s,SF:r,CL:a,HULL:n,REFL:h}){this.waterSurface;const o=t,l=t,c=e&&t,u=this.cameraWaterHeightNode?String(this.cameraWaterHeightNode):"frame.cameraWaterHeight";return`
	let pos = in.P;
	let screenUV = in.pixel * frame.invResolution;
	let posV = ( frame.view * vec4f( pos, 1.0 ) ).xyz;
	let lagXZ = in.vs.vLagXZ;
	let vDepth = in.vs.vSeaDepth;
	let vHeight = in.vs.vWaveH;
	// footprint of this pixel on the surface (m) — for filtering / roughness (uniform control flow)
	let footprint = max( length( fwidth( lagXZ ) ), 1e-4 );

#if WATER_HULL
	// No sea inside a hull: the surface behind the nearest face of the hull volume is water the hull
	// keeps out (without this it shows through the cockpit sole when the stern squats or the boat heels)
	if ( mat.hullActive > 0.5 && in.front ) {
		let mSize = vec2f( textureDimensions( waterHullMask ) );
		let hullDist = textureLoad( waterHullMask, vec2i( clamp( screenUV, vec2f( 0.0 ), vec2f( 0.9999 ) ) * mSize ), 0 ).x;
		if ( hullDist > 0.01 && length( pos - frame.cameraPos ) > hullDist - 0.02 ) { discard; }
	}
#endif

	let toCam = frame.cameraPos - pos;
	let dist = length( toCam );
	let V = toCam / dist;
	let L = frame.sunDir;
	// the sun light reaching the surface: sun colour x shadow maps (three's direct light), x clouds,
	// x the island's own shadow (heightfield horizon: the shadow map's range is too short to hold it)
	// (5-tap PCF: the waves break up any penumbra detail the contact-hardening filter would add)
	var sunLight = frame.sunColor * sunShadowPCF( pos, vec3f( 0.0, 1.0, 0.0 ), in.pixel );
${a?"	sunLight *= cloudsShadow( pos.xz );":""}
${e?"	sunLight *= terrainSunShadowAt( pos );":""}

	// water film thickness at this pixel and the distance to the swash front (ShoreWaves.swashEdge):
	// the sheet ends exactly on its analytic leading edge, not on the mesh triangles
	let groundH = ${e?"terrainHeightAt( pos.xz )":"-500.0"};
	var thickness = ${e?"pos.y - groundH":"10.0"};
	var frontD = 1e3;
	var swTau = 0.0;
	var swRt = 0.0;
${c?`	if ( vDepth < 1.0 ) {
		let tRaw = thickness;
		let se = shoreSwashEdge( pos.xz, thickness );
		thickness = se.x; frontD = se.y; swTau = se.z; swRt = se.w;
		// The draining sheet has no rounded front: it thins out over decimetres and breaks up where the
		// sand drains faster. The analytic front runs parallel to the shoreline; kept as a hard, smooth
		// edge (with the uprush's meniscus, rim and contact shadow) it read as a dark line ruled along
		// the beach between the foam and the wet sand.
		let backwash = smoothstep( 0.32, 0.46, swTau );
		if ( backwash > 0.0 && swRt > 0.0 && frontD < 3.0 ) {
			frontD += ( perlin2( pos.xz * 1.1 ) * 0.35 + perlin2( pos.xz * 3.7 + vec2f( 5.3, 1.9 ) ) * 0.15 ) * backwash;
			thickness = min( tRaw, frontD * mix( 0.08, 0.025, backwash ) );
		}
	}`:""}
	// the foam line riding the swash front, per pixel: a dense bubbly bead right at the edge while
	// the sheet runs up, a thinning lace behind it; weaker in the backwash (it sinks into the sand)
	let uprush = smoothstep( 0.46, 0.32, swTau );
	let bead = smoothstep( -0.01, 0.05, frontD ) * smoothstep( 0.6, 0.12, frontD );
	let trail = smoothstep( -0.01, 0.25, frontD ) * smoothstep( 2.2, 0.3, frontD );
	// patchy along the front (dense bunches and thin stretches), not an even white rope (only where
	// the edge foam below can be non-zero: it is weighted by the run-up and the shallow depth)
	var edgePatch = 1.0;
${c?`	if ( swRt > 0.0 && vDepth < 0.4 ) {
		edgePatch = smoothstep( -0.45, 0.55, perlin2( pos.xz * 0.42 ) ) * 0.7 + smoothstep( -0.3, 0.6, perlin2( pos.xz * 1.7 + vec2f( 3.1, 7.7 ) ) ) * 0.3;
	}`:""}
	let edgeFoam = ( bead * mix( 0.45, 1.1, uprush ) * mix( 0.35, 1.0, edgePatch ) + trail * mix( 0.12, 0.4, uprush ) * edgePatch ) * smoothstep( 0.0, 1.0, swRt ) * smoothstep( 0.4, -0.2, vDepth );
	// the meniscus: the last decimetre of the advancing sheet bends down to the sand
	let lipW = ( 1.0 - smoothstep( 0.0, 0.14, frontD ) ) * uprush;

	let simState = ${s?"shoreSimSample( pos.xz )":"vec4f( 0.0 )"};
	let surf = waterSurfaceFragment( lagXZ, footprint, vDepth, in.vs.vFoam, in.vs.vShoreN, in.vs.vShoreFoam + edgeFoam, simState.x, simState, in.vs.vSurfMask, pos );
	var foam = surf.foam;
	// the whale's churned white water and flat fluke-print slick (WhaleWater.js)
	let whaleW = whaleWater( pos.xz );
	foam = max( foam, whaleW.x );

	// Which medium is the view ray in before it reaches this fragment? The water surface is a closed
	// interface: a front face (its air side towards the camera) is seen from the air, a back face from
	// the water. For the visible (nearest) fragment this is the medium the ray starts in at the near
	// clip plane, which is exactly how the clip plane slices the water. The winding can't be trusted
	// in folds of the choppy / breaking surface: there, and well above or below the surface, the
	// camera's own medium decides.
	let camH = frame.cameraPos.y - ${u};
${t?"	let folded = surf.jacobian < 0.1 || normalize( in.vs.vShoreN ).y < 0.35;":"	let folded = surf.jacobian < 0.1;"}
	let nearSurface = abs( camH ) < 1.5;
	let viewFromBelow = select( camH < 0.0, ! in.front, nearSurface && ! folded );
	let seenFromBelow = select( 0.0, 1.0, viewFromBelow );
	// shading normal on the viewer's side of the interface. Triangle winding can't be trusted
	// (tiny self-intersections of the choppy FFT surface render as back faces seen from above),
	// so pick the side from the camera and bend facets that face away to grazing instead of
	// flipping them (a flipped normal turns a fold into a white sky-mirror patch).
	let Nup = normalize( mix( surf.normal, vec3f( 0.0, 1.0, 0.0 ), whaleW.y * 0.75 ) );
	let Nside = select( Nup, - Nup, viewFromBelow );
	let Nview = normalize( Nside + V * max( - dot( Nside, V ) + 0.03, 0.0 ) );

	// roughness from unresolved slope variance (Cox-Munk: mss = 0.003 + 0.00512 U)
	let mss = ( 0.003 + frame.windSpeed * 0.00512 ) * waterSurface.slopeScale;
	let kpx = PI / footprint;
	let unresolved = sat( log2( 110.0 / kpx ) / 9.0 );
	let roughVar = surf.rough * surf.rough;
	let alpha2 = ( mat.waterRoughness * mat.waterRoughness + mss * 2.0 * unresolved * roughVar + foam * 0.2 + surf.aeration * 0.03 ) * ( 1.0 - whaleW.y * 0.6 );
	// slope spread the mesh / normal maps can't show at this distance (for the reflection)
	let sigmaUnres = sqrt( mss * unresolved * roughVar );

	var outCol = vec3f( 0.0 );
	var ssrW = 0.0;
	var dbgPath = 0.0;
	var dbgScene = vec3f( 0.0 );
	var dbgSrc = vec3f( 0.0 ); // which image the seabed came from (debug view 12)
	var dbgRefr = vec3f( 0.0 ); // refraction image at the end point: coverage, depth > 0, behind (13)

	if ( ! viewFromBelow ) {

		// ================= ABOVE WATER =================
		// near the leading edge the surface bends down to meet the sand like a rounded bead
		// (meniscus), tilting the normal toward dry land
		let edgeW = max( ( 1.0 - smoothstep( 0.0, 0.006, thickness ) ) * uprush, lipW );
		let nr = ${e?"terrainNormalRock( pos.xz )":"vec4f( 0.0 )"};
		let uphill = normalize( - vec2f( nr.x, nr.y ) + vec2f( 1e-5, 0.0 ) );
		let N = normalize( Nview + vec3f( uphill.x, 0.0, uphill.y ) * ( edgeW * edgeW * 0.7 ) );
		let NdV = max( dot( N, V ), 1e-4 );
		let F = fresnelDielectric( NdV, ${Fe} );

		// ---- reflection
		let Rraw = reflect( - V, N );
		// unresolved facets tilt the average reflection toward the higher, darker sky: rough
		// patches (gusts) darken toward the horizon, slicks stay bright and mirror-like
		let Rup = max( Rraw.y, 0.004 ) + sigmaUnres * 1.3 * ( 1.0 - max( Rraw.y, 0.0 ) );
		let R = normalize( vec3f( Rraw.x, Rup, Rraw.z ) );
		// reflections pointing below the horizon hit other waves: fade toward a dark sea color
		let horizonOcc = max( smoothstep( -0.12, 0.08, Rraw.y ), smoothstep( 0.25, 0.06, thickness ) );
		// (unused where both its weights are 0: horizonOcc here, the rim at the swash front below)
		var skyRefl = vec3f( 0.0 );
		if ( horizonOcc > 0.0 || frontD < 0.1 ) { skyRefl = skyReflectionRadiance( R ); }
		var reflCol = mix( frame.horizonColor * 0.35, skyRefl, horizonOcc );

		// objects (pier, boat, hills, village) reflected from the screen; only rays close to the
		// horizon can hit anything, so steep reflections skip the march entirely
		// (looking down, F is tiny: the reflection can't be seen, skip the march)
		if ( Rraw.y < 0.45 && F > 0.05 && mat.ssr > 0.5 ) {
			let Rv = normalize( ( frame.view * vec4f( Rraw, 0.0 ) ).xyz );
			// (rays toward the camera get no weight: see facing in _waterSSR)
			if ( Rv.z < 0.5 ) {
				let r = _waterSSR( posV, Rv, pos.y, Rraw.y );
				reflCol = mix( reflCol, r.rgb, r.a );
				ssrW = r.a;
			}
		}
${h?`
		// planar reflection of scene objects (alpha = coverage)
		let rOffset = N.xz * 0.8 / max( dist, 1.0 ) * 4.0;
		let rs = reflectionSample( screenUV, rOffset );
		reflCol = mix( reflCol, rs.rgb, rs.a );`:""}

		reflCol *= mat.reflectionStrength;

		// ---- sun specular (GGX), sun light already includes shadowing
		let H = normalize( L + V );
		let NdL = max( dot( N, L ), 0.0 );
		let NdH = max( dot( N, H ), 0.0 );
		let VdH = max( dot( V, H ), 0.0 );
		let Fs = fresnelDielectric( VdH, ${Fe} );
		let spec = _waterDGGX( NdH, alpha2 ) * _waterVSmithGGX( NdL, NdV, alpha2 ) * Fs * NdL;
		// physically the glint is ~1e5x brighter than the sky; clamp to stay inside fp16 range
		let sunSpec = sunLight * min( spec, 400.0 );

		// ---- refraction / water volume
		// Trace the refracted view ray (Snell) to the sea floor instead of using the straight
		// screen ray: at grazing angles the straight ray overestimates the water path ~10x.
		// view ray inside the water (unit, downward). Facets of a curling crest can refract it
		// upward on a coarse mesh; keep it heading down into the water body.
		let Tr = refract( - V, N, 1.0 / ${Fe} );
		let Tv = normalize( vec3f( Tr.x, min( Tr.y, -0.08 ), Tr.z ) );
		let tDown = max( - Tv.y, 0.04 );
		let surfViewZ = posV.z;

		// water column below the surface along the refracted ray (terrain, 2 refinements)
${e?`		let L0 = max( pos.y - groundH, 0.0 ) / tDown;
		// deep water: the end point is capped at 80 m and the column is opaque long before, so the
		// refinements can't change the result
		var Lt = L0;
		if ( L0 < 100.0 ) {
			let L1 = max( pos.y - terrainHeightAt( pos.xz + Tv.xz * min( L0, 200.0 ) ), 0.0 ) / tDown;
			Lt = max( pos.y - terrainHeightAt( pos.xz + Tv.xz * min( L1 * 0.5 + L0 * 0.5, 200.0 ) ), 0.0 ) / tDown;
		}`:"		let Lt = 400.0;"}
		let Lter = clamp( Lt, 0.0, 400.0 );
		// thin breaking crests: the refracted ray leaves through the back of the wave into the sky
		let crestT = ${o?"shoreCrestPath( lagXZ, vDepth, Tv )":"1e4"};
		let thruCrest = crestT < Lter;

		// project the refracted end point to the screen
		let pEnd = pos + Tv * min( Lter, 80.0 );
		let clipEnd = frame.proj * ( frame.view * vec4f( pEnd, 1.0 ) );
		let ndcEnd = clipEnd.xy / max( clipEnd.w, 1e-4 );
		let uvR = vec2f( ndcEnd.x * 0.5 + 0.5, ndcEnd.y * -0.5 + 0.5 );
		let onScreen = all( uvR > vec2f( 0.0 ) ) && all( uvR < vec2f( 1.0 ) );
		var uvF = screenUV;
		var dR = 0.0;
		var sceneCol = vec3f( 0.0 );
		var found = false;
#if WATER_REFRACTION
		// the scene below the water only (RefractionPass): nothing above the water (pier, rails, posts,
		// the boat) can hide the refracted end point. Coverage in alpha: bilinear across its edge, then
		// un-premultiplied, so the clip boundary blends instead of darkening.
		// The image extends past the screen (RefractionPass guard band): the refracted end points of the
		// pixels near the bottom edge land below the screen (light bends down into the water), and the
		// seabed there is drawn. Lookups project with this frame's jittered camera, as the image was.
		{
			let cj = frame.viewProj * vec4f( pEnd, 1.0 );
			let uvRc = _waterRefrUV( cj.xy / max( cj.w, 1e-4 ) );
			let rc = textureSampleLevel( waterRefrColor, smpLinearClamp, uvRc, 0.0 );
			let rSize = vec2f( textureDimensions( waterRefrDepth ) );
			let rd = textureLoad( waterRefrDepth, vec2i( min( uvRc * rSize, rSize - 1.0 ) ), 0 ).x;
			// only what lies behind this surface point can be seen through it: submerged parts of
			// objects in front of it (the hull of the boat you stand in, pier piles) would otherwise be
			// pasted onto the sea far out, wherever the end point lands on them (or off screen next to
			// them: the edge texel)
			dbgRefr = vec3f( rc.a, select( 0.0, 1.0, rd > 0.0 ), select( 0.0, 1.0, surfViewZ + viewDepth( rd ) > WATER_BEHIND ) );
			if ( rc.a > 0.5 && rd > 0.0 && surfViewZ + viewDepth( rd ) > WATER_BEHIND ) {
				sceneCol = rc.rgb / rc.a;
				uvF = uvR;
				dR = rd;
				found = true;
			} else if ( rc.a > 0.5 && rd > 0.0 ) {
				// the end point lies on something in front (a pile, a hull): what lies straight behind
				// this pixel, from the same (lit) source. The opaque copy shades deep seabed cheaply and
				// flickered against it as the piles passed in front while walking the pier.
				let uvS = _waterRefrUV( vec2f( screenUV.x * 2.0 - 1.0, 1.0 - screenUV.y * 2.0 ) );
				let rcS = textureSampleLevel( waterRefrColor, smpLinearClamp, uvS, 0.0 );
				let rdS = textureLoad( waterRefrDepth, vec2i( min( uvS * rSize, rSize - 1.0 ) ), 0 ).x;
				if ( rcS.a > 0.5 && rdS > 0.0 && surfViewZ + viewDepth( rdS ) > WATER_BEHIND ) {
					sceneCol = rcS.rgb / rcS.a;
					uvF = screenUV;
					dR = rdS;
					found = true;
				}
			}
		}
#endif
		if ( ! found ) {
			// nothing under the water there (shallows above the clip height, off screen): the opaque copy,
			// where the refracted sample lies behind the water surface, else the unrefracted pixel
			let dO = _waterSceneDepthAt( uvR );
			let valid = onScreen && surfViewZ + viewDepth( dO ) > WATER_BEHIND;
			uvF = select( screenUV, uvR, valid );
			dR = select( _waterSceneDepthAt( screenUV ), dO, valid );
			sceneCol = textureSampleLevel( waterSceneColor, smpLinearClamp, uvF, 0.0 ).rgb;
		} else {
			// Thin water (the swash film on the sand): the refraction offset is a few pixels at most and
			// nothing can stand between the film and the sand, so the opaque pass's own image of the sand
			// is the right one: it has the wet swash sand and its ripples, which the refraction image
			// draws as plain seabed and leaves out altogether above its clip height (0.4 m). Switching
			// between the two there drew a hard straight line across the wet sand along that height.
			let filmW = 1.0 - smoothstep( 0.04, 0.3, thickness );
			if ( filmW > 0.0 ) {
				let dO = _waterSceneDepthAt( uvR );
				let uvO = select( screenUV, uvR, onScreen && surfViewZ + viewDepth( dO ) > WATER_BEHIND );
				sceneCol = mix( sceneCol, textureSampleLevel( waterSceneColor, smpLinearClamp, uvO, 0.0 ).rgb, filmW );
			}
		}
		// (a branch: select() would evaluate the sky for every pixel)
		if ( thruCrest ) { sceneCol = skyReflectionRadiance( normalize( vec3f( Tv.x, max( abs( Tv.y ), 0.03 ), Tv.z ) ) ); }

		// objects in front of the sea floor (pylons, rocks, reef) shorten the path
		let qView = viewPositionFromViewZ( uvF, - viewDepth( dR ) );
		let qDist = length( qView - posV );
		var pathLen = clamp( min( Lter, qDist ), 0.0, 400.0 );
		pathLen = min( pathLen, crestT );
		dbgPath = pathLen;
		dbgScene = sceneCol;
		dbgSrc = select( vec3f( 1.0, 0.0, 0.0 ), vec3f( 0.0, 1.0, 0.0 ), found );

		// bubbles mixed into the water (the surf behind breakers, wakes): a strong scatterer, the water
		// turns milky turquoise and the bottom disappears (WaterSurface.fragment aeration)
		let aer = surf.aeration;
		// sand stirred up where the bores have just passed (the foam they left marks that water):
		// clouds of sediment, not a uniform tint
		let sandK = ${s?"sat( simState.x * 2.5 ) * 1.8 + 0.45":"1.0"};
${l?`		// surf zone: sand and bubbles stirred up by the breakers (see ShoreWaves.surfMedium)
		let surfMed = shoreSurfMedium( pos.xz, vDepth );
		let sigA = frame.waterAbsorption + surfMed.absorb * sandK;
		// (bubble plumes are shallow and patchy: a moderate scatterer, milky turquoise rather than a glow)
		let sigS = frame.waterScattering + surfMed.scatter * sandK + aer * 1.6;`:`		let sigA = frame.waterAbsorption;
		let sigS = frame.waterScattering + aer * 1.6;`}
		let sigT = sigA + sigS;

		// refracted sun direction
		let Ls = - refract( - L, vec3f( 0.0, 1.0, 0.0 ), 1.0 / ${Fe} ); // toward the sun from underwater
		let muS = max( Ls.y, 0.1 );
		let muV = max( - Tv.y, 0.15 );

		let Tview = exp( - sigT * pathLen );

		// in-scattered light along the view ray (single scattering sun + ambient), analytic
		// light at depth z: E0 * exp(-sigT * z / mu). Along the view ray z = s * muV.
		let sunIn = sunLight * ( 1.0 - fresnelDielectric( max( L.y, 0.02 ), ${Fe} ) );
		let kSun = sigT * ( 1.0 + muV / muS );
		let kAmb = sigT * ( 1.0 + muV / 0.75 );
		let cosPh = dot( Tv, Ls );
		let phase = waterPhaseHG( cosPh, 0.86 ) * 0.7 + ${(.3/(4*Math.PI)).toFixed(8)};
		let bb = sigS * mix( mat.backscatter, 0.06, sat( aer * 2.0 ) );
		// multiple-scattering boosted backscatter (Gordon R = 0.33 bb/(a+bb))
		let albedoMS = bb * ( 0.33 * 4.0 ) / ( sigA + bb );
		let inSun = sunIn * ( sigS * phase + albedoMS * sigT * INV_PI ) * ( 1.0 - exp( - kSun * pathLen ) ) / kSun;
		let inAmb = frame.skyIrradiance * ( sigS * 0.25 + albedoMS * sigT ) * ( 1.0 - exp( - kAmb * pathLen ) ) / kAmb;

		// crest translucency (sun shining through thin wave tips)
		let vH = normalize( vec2f( V.x, V.z ) );
		let lH = normalize( vec2f( L.x, L.z ) + 1e-5 );
		// (light entering the top and back of a thin crest scatters out of the face over a broad lobe:
		// side-lit waves glow green too, not only when looking straight into the sun)
		let back = pow( sat( dot( vH, - lH ) * 0.6 + 0.4 ), 2.5 );
		let crest = sat( vHeight * 0.9 + 0.1 ) * ( sat( ( 1.0 - N.y ) * 4.0 ) + 0.25 );
		let sssCol = vec3f( 0.12, 0.55, 0.45 ) * 0.06;
		let sss = sunLight * sssCol * back * crest * mat.sss * smoothstep( 0.0, 0.25, L.y );

		// the bead of the meniscus shades the sand right under it
		let transmitted = sceneCol * Tview * ( 1.0 - 0.3 * lipW ) + inSun + inAmb + sss;

		// ---- foam
		// foam: bright diffuse scatterer (albedo ~0.85), wrapped sun + sky irradiance (skyIrradiance = E/PI)
${r?"		let foamLit = surfFoamLight( surf.foamInfo, N, L, V, sunLight, pos );":"		let foamLit = ( sunLight * ( max( dot( N, L ), 0.0 ) * 0.75 + 0.25 ) * INV_PI + frame.skyIrradiance * 0.95 ) * 0.85;"}
		let foamCol = foamLit * mat.foamIntensity;

		// a thin bright rim just behind the edge: the rounded bead catches the sky
		let rim = smoothstep( 0.0, 0.025, frontD ) * smoothstep( 0.1, 0.035, frontD ) * uprush;
		let water = mix( transmitted, reflCol, F ) + sunSpec + skyRefl * ( 0.22 * rim );
		let shaded = mix( water, foamCol + sunSpec * 0.05, sat( foam ) );
		// fade into the sand right at the leading edge (anti-aliased by the film thickness)
		let edgeAA = smoothstep( 0.0, max( fwidth( thickness ) * 1.5, 0.004 ), thickness );
		// contact shadow: the sand just ahead of the advancing edge is darkened (the bead's
		// shadow and the wetting front), fading within ~15 cm
		outCol = shaded;
		if ( edgeAA < 1.0 ) {
			let contact = smoothstep( -0.16, -0.005, frontD ) * ( 1.0 - edgeAA ) * uprush;
			let sandC = textureSampleLevel( waterSceneColor, smpLinearClamp, screenUV, 0.0 ).rgb * ( 1.0 - 0.3 * contact );
			outCol = mix( sandC, shaded, edgeAA );
		}

	} else {

		// ================= BELOW WATER (looking up at the surface) =================
		let N = Nview;
		let NdV = max( dot( N, V ), 1e-4 );
		// from water (n=1.333) into air: eta = 1/1.333
		let F = fresnelDielectric( NdV, ${(1/Fe).toFixed(8)} );
		let Tt = refract( - V, N, ${Fe} );
		let tValid = dot( Tt, Tt ) > 0.5;
		let Td = normalize( select( vec3f( 0.0, 1.0, 0.0 ), Tt, tValid ) );
		// sky through Snell's window; the sun disk is bounded so grazing refractions of it far
		// away cannot bloom through the fog
		let skyT = min( skyRadianceWithClouds( Td, true ), vec3f( 60.0 ) );

		// total internal reflection mirrors the lit water body below: the radiance of an
		// infinitely long view ray through the medium in the reflected direction
		let sigA = frame.waterAbsorption; let sigS = frame.waterScattering; let sigT = sigA + sigS;
		let bb = sigS * mat.backscatter;
		let albedoMS = bb * ( 0.33 * 4.0 ) / ( sigA + bb );
		let Rr = reflect( - V, N );
		let LsU = - refract( - L, vec3f( 0.0, 1.0, 0.0 ), 1.0 / ${Fe} );
		let muU = max( LsU.y, 0.15 );
		let phR = waterPhaseHG( dot( Rr, LsU ), 0.86 ) * 0.7 + ${(.3/(4*Math.PI)).toFixed(8)};
		let kS = sigT * ( 1.0 - min( Rr.y, 0.0 ) / muU );
		let kA = sigT * ( 1.0 - min( Rr.y, 0.0 ) / 0.8 );
		let eSunU = sunLight * ( 1.0 - fresnelDielectric( max( L.y, 0.02 ), ${Fe} ) );
		let deepCol = eSunU * ( sigS * phR + albedoMS * sigT * INV_PI ) / kS
			+ frame.skyIrradiance * PI * ( sigS * ( 1.0 / ( 4.0 * PI ) ) + albedoMS * sigT * INV_PI ) / kA;

		// objects above the water seen through Snell's window (from the viewport)
		let sceneDepthC = _waterSceneDepthAt( screenUV );
		let sceneZ = - viewDepth( sceneDepthC );
		let hasObj = posV.z - sceneZ > 0.0 && sceneZ > - frame.far * 0.9;
		let objCol = textureSampleLevel( waterSceneColor, smpLinearClamp, screenUV, 0.0 ).rgb;
		let transmittedU = select( skyT, objCol, hasObj );

		let foamUnder = ( frame.skyIrradiance + sunLight * 0.5 ) * 0.25;
		outCol = mix( transmittedU * ( 1.0 - F ) + deepCol * F, foamUnder, sat( foam ) * 0.7 );

	}

	// debug views: 1 = back faces red, 2 = normals, 3 = foam, 7 = the seabed seen through, 12 = its source
	let dbg = mat.debugMode;
	var res = min( outCol, vec3f( 16000.0 ) );
	if ( dbg == 1 ) {
		res = select( vec3f( 50.0, 0.0, 0.0 ), res, in.front );
	} else if ( dbg == 2 ) {
		res = Nview * 0.5 + 0.5;
	} else if ( dbg == 3 ) {
		res = vec3f( foam );
	} else if ( dbg == 4 ) {
		let nanN = Nup.x != Nup.x || Nup.y != Nup.y || Nup.z != Nup.z;
		let nanL = lagXZ.x != lagXZ.x || lagXZ.y != lagXZ.y;
		let big = length( surf.slopes ) > 4.0;
		res = vec3f( select( 0.0, 1.0, nanN ), select( 0.0, 1.0, nanL ), select( 0.0, 1.0, big ) ) + 0.05;
	} else if ( dbg == 10 ) {
		res = vec3f( ssrW );
	} else if ( dbg == 6 ) {
		res = vec3f( dbgPath * 0.02, 0.0, 0.0 );
	} else if ( dbg == 9 ) {
		let sceneDepthC = _waterSceneDepthAt( screenUV );
		let dz = - viewDepth( sceneDepthC );
		res = vec3f( sceneDepthC * 100.0, - dz * 0.02, - posV.z * 0.02 );
	} else if ( dbg == 8 ) {
		res = vec3f( 0.0, vDepth * 0.02, 0.0 );
	} else if ( dbg == 7 ) {
		res = dbgScene;
	} else if ( dbg == 13 ) {
		res = dbgRefr;
	} else if ( dbg == 12 ) {
		// green: the refraction image, red: the opaque copy (nothing below the water there in the image)
		res = dbgSrc;
	} else if ( dbg == 11 ) {
		// surf foam sources: whitewater of the breaking wave (r), foam carried by the shore sim (g), clear plunging face (b)
		res = vec3f( in.vs.vShoreFoam, simState.x, in.vs.vSurfMask.x );
	} else if ( dbg == 5 ) {
		res = vec3f( fract( lagXZ.x * 0.1 ), fract( vHeight ), fract( lagXZ.y * 0.1 ) );
	}
	r.color = vec4f( res, 1.0 );
	// camera velocity for TAA (default: static), plus the water mask (SceneRenderer) for the
	// underwater pass: whether the visible surface is seen from below
	r.mask = vec4f( seenFromBelow, 1.0, 0.0, 1.0 );
`}}const Bt=mt,Rt=i=>i.toFixed(6),mn=`
// a refracted sample is usable when it lies this far behind the water surface (view depth, m): objects in
// front of it (the hull you stand in, pier piles) are rejected
const WATER_BEHIND: f32 = 0.05;
// screen NDC -> uv in the refraction image, which extends past the screen (RefractionPass guard band)
fn _waterRefrUV( ndc: vec2f ) -> vec2f {
	let n = ( ndc - vec2f( ${Rt(Bt.cx)}, ${Rt(Bt.cy)} ) ) / vec2f( ${Rt(Bt.sx)}, ${Rt(Bt.sy)} );
	return clamp( vec2f( n.x * 0.5 + 0.5, 0.5 - n.y * 0.5 ), vec2f( 0.0005 ), vec2f( 0.9995 ) );
}
fn _waterDGGX( NdH: f32, a2: f32 ) -> f32 {
	let d = NdH * NdH * ( a2 - 1.0 ) + 1.0;
	return a2 / ( d * d * PI );
}
fn _waterVSmithGGX( NdL: f32, NdV: f32, a2: f32 ) -> f32 {
	let gv = NdL * sqrt( NdV * NdV * ( 1.0 - a2 ) + a2 );
	let gl = NdV * sqrt( NdL * NdL * ( 1.0 - a2 ) + a2 );
	return 0.5 / max( gv + gl, 1e-5 );
}
// depth via exact texel loads (float depth textures + filtering samplers are unreliable)
fn _waterSceneDepthAt( uv: vec2f ) -> f32 {
	let size = vec2f( textureDimensions( waterSceneDepth ) );
	let p = vec2i( clamp( uv, vec2f( 0.0 ), vec2f( 0.9999 ) ) * size );
	return textureLoad( waterSceneDepth, p, 0 ).x;
}
// linear view Z of the opaque scene for the reflection march (half float copy: the march is
// bandwidth bound and its thickness tests allow centimetres)
fn _waterSceneZAt( uv: vec2f ) -> f32 {
#if WATER_DEPTH_HALF
	let size = vec2f( textureDimensions( waterSceneDepthHalf ) );
	return - viewDepth( textureLoad( waterSceneDepthHalf, vec2i( clamp( uv, vec2f( 0.0 ), vec2f( 0.9999 ) ) * size ), 0 ).x );
#else
	return - viewDepth( _waterSceneDepthAt( uv ) );
#endif
}
fn _waterProject( p: vec3f ) -> vec2f {
	let clip = frame.proj * vec4f( p, 1.0 );
	let ndc = clip.xy / max( clip.w, 1e-4 );
	return vec2f( ndc.x * 0.5 + 0.5, ndc.y * -0.5 + 0.5 );
}

// --------------------------------------------------------------- screen-space reflection
// March the reflected ray through the opaque depth copy (view space, geometric steps, then a
// short bisection). Returns ( color, weight ): weight fades at screen edges, for rays heading
// back toward the camera and at the end of the search range.
// y0, ry: world height of the start and the ray's rise per metre. A hit beyond 260 m, or below the
// water on a descending ray, is weighted 0, so the march stops once the last miss is there.
fn _waterSSR( posV: vec3f, Rv: vec3f, y0: f32, ry: f32 ) -> vec4f {
	var hit = false;
	// steps grow with the distance: far away the first ones would all land in the same pixel
	let stepScale = max( - posV.z / 60.0, 1.0 );
	var t = 0.15 * stepScale;
	var dt = 0.25 * stepScale;
	var prevT = 0.0;
	for ( var i = 0; i < 11; i++ ) {
		prevT = t;
		if ( prevT >= 260.0 || ( ry <= 0.0 && y0 + ry * prevT < frame.seaLevel - 0.2 ) ) { break; }
		t += dt;
		dt *= 1.7;
		let p = posV + Rv * t;
		let uv = _waterProject( p );
		if ( uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0 || p.z > -0.1 ) { break; }
		let sz = _waterSceneZAt( uv );
		// behind the visible surface, within a thickness covering the last step
		if ( p.z < sz && sz - p.z < max( dt * 1.3, max( t * 0.08, 0.3 ) ) ) {
			hit = true;
			break;
		}
	}

	var color = vec3f( 0.0 );
	var weight = 0.0;
	if ( hit ) {
		// refine between the last miss and the hit
		var a = prevT; var b = t;
		for ( var k = 0; k < 3; k++ ) {
			let m = ( a + b ) * 0.5;
			let p = posV + Rv * m;
			let behind = p.z < _waterSceneZAt( _waterProject( p ) );
			b = select( b, m, behind );
			a = select( m, a, behind );
		}
		let hitT = b;
		let hitV = posV + Rv * b;
		let uv = _waterProject( hitV );
		// after refining, the ray must really touch the surface there (a ray that only passed far
		// behind a thin or distant object is a false hit)
		let gap = abs( _waterSceneZAt( uv ) - hitV.z );
		let touch = smoothstep( max( b * 0.04, 0.4 ), max( b * 0.02, 0.2 ), gap );
		// anything under the surface (seabed seen through the water, submerged hull) is not
		// visible to a reflected ray: those rays run into the next wave instead
		let hitY = ( frame.invView * vec4f( hitV, 1.0 ) ).y;
		color = textureSampleLevel( waterSceneColor, smpLinearClamp, uv, 0.0 ).rgb;
		let edge = smoothstep( 0.0, 0.06, uv.x ) * smoothstep( 1.0, 0.94, uv.x ) * smoothstep( 0.0, 0.06, uv.y ) * smoothstep( 1.0, 0.94, uv.y );
		let facing = smoothstep( 0.5, 0.1, Rv.z ); // rays toward the camera leave the screen
		weight = edge * facing * touch * smoothstep( 260.0, 120.0, hitT ) * smoothstep( frame.seaLevel - 0.15, frame.seaLevel + 0.35, hitY );
	}
	return vec4f( color, weight );
}
`,yn=new Y({name:"waterHelpers",deps:[Z],code:mn});function xn(i,e=1024){const t=new Xe({label:"foamPattern",width:e,height:e,format:"rgba16float",mips:!0,usage:["sample","storage","copyDst"],sampler:"anisoRepeat"}),s=(a,n,h)=>{let o="",l=.5,c=0;for(let u=0;u<h;u++)o+=`${o?" + ":""}vnoise( ${a}, ${(n*Math.pow(2,u)).toFixed(1)} ) * ${l}`,c+=l,l*=.5;return`( ( ${o} ) / ${c} )`};return new ge({label:"Foam Pattern",bindings:{foamOut:{storageTexture:t,access:"write",view:{dimension:"2d",baseMipLevel:0,mipLevelCount:1}}},workgroupSize:[8,8,1],code:`
fn hash2( p: vec2f ) -> vec2f { return fract( sin( vec2f( dot( p, vec2f( 127.1, 311.7 ) ), dot( p, vec2f( 269.5, 183.3 ) ) ) ) * 43758.5453 ); }
// GLSL-style mod (TSL .mod): x - y * floor( x / y )
fn fmod2( x: vec2f, y: f32 ) -> vec2f { return x - y * floor( x / y ); }

// periodic worley F1 with jittered cell sizes
fn worley( uv: vec2f, cells: f32 ) -> f32 {
	let p = uv * cells;
	let ip = floor( p );
	let fp = fract( p );
	var f1 = 8.0;
	for ( var j = -1; j <= 1; j++ ) {
		for ( var i = -1; i <= 1; i++ ) {
			let o = vec2f( f32( i ), f32( j ) );
			let cell = fmod2( ip + o, cells );
			let h = hash2( cell );
			let d = length( o + h - fp );
			f1 = min( f1, d );
		}
	}
	return f1;
}

fn vnoise( uv: vec2f, cells: f32 ) -> f32 {
	let p = uv * cells;
	let i = floor( p );
	let f = fract( p );
	let u = f * f * ( 3.0 - f * 2.0 );
	let a = hash2( fmod2( i, cells ) ).x;
	let b = hash2( fmod2( i + vec2f( 1.0, 0.0 ), cells ) ).x;
	let c = hash2( fmod2( i + vec2f( 0.0, 1.0 ), cells ) ).x;
	let d = hash2( fmod2( i + vec2f( 1.0, 1.0 ), cells ) ).x;
	return mix( mix( a, b, u.x ), mix( c, d, u.x ), u.y );
}

@compute @workgroup_size( WG_X, WG_Y, WG_Z )
fn main( @builtin( global_invocation_id ) gid: vec3u ) {
	let px = gid.xy;
	let uv = ( vec2f( px ) + 0.5 ) / ${e}.0;

	// domain warp (organic, flowing shapes)
	let w1 = ( vec2f( ${s("uv",3,4)}, ${s("( uv + 0.43 )",3,4)} ) - 0.5 ) * 0.14;
	let wuv = uv + w1;

	// density: ragged rafts
	let dens = ${s("wuv",4,6)};

	// holes of many sizes punched through the mat (worley, radius varied by noise)
	let holeA = smoothstep( 0.28, 0.12, worley( wuv, 7.0 ) + ( ${s("uv",16,3)} - 0.5 ) * 0.25 );
	let holeB = smoothstep( 0.30, 0.16, worley( wuv + 0.17, 19.0 ) + ( ${s("uv",32,2)} - 0.5 ) * 0.3 );
	let holeC = smoothstep( 0.32, 0.18, worley( wuv + 0.61, 47.0 ) );
	let holes = clamp( holeA * 0.9 + holeB * 0.7 + holeC * 0.45, 0.0, 1.0 );

	// fine bubbles: small bright dots
	let bub = smoothstep( 0.24, 0.08, worley( uv + 0.33, 140.0 ) ) * 0.8 + smoothstep( 0.2, 0.05, worley( uv + 0.71, 260.0 ) ) * 0.5;

	// streaks (drawn out by flow)
	let suv = vec2f( uv.x * 1.0, uv.y * 1.0 ) + w1 * 2.0;
	let streak = ${s("suv",12,4)};

	let foam = clamp( dens * 1.35 - holes * 0.55 + bub * 0.08, 0.0, 1.0 );
	let mottle = ${s("uv",2,3)};

	textureStore( foamOut, px, vec4f( foam, clamp( bub, 0.0, 1.0 ), mottle, streak ) );
}`}).dispatch([e/8,e/8,1]),Fa(t),t}class vn{constructor(e,t=e.label){const s=e.width;if(e.height!==s||s&s-1||s<32||s>512)throw new Error("ComputeMips: square power-of-two 32..512 only");this.res=s,this.layers=e.dimension==="3d"?1:e.depth;const r=e.mipLevelCount,a=Math.min(5,r-1),n=f=>({storageTexture:e,access:"write",view:{dimension:"2d-array",baseMipLevel:f,mipLevelCount:1}}),h=f=>({texture:e,view:{dimension:"2d-array",baseMipLevel:f,mipLevelCount:1}}),o=(f,m,y,d)=>`
	if ( lx < ${y}u && ly < ${y}u ) {
		let i = ly * ${4*y}u + lx * 2u;
		let v = ( ${f}[ i ] + ${f}[ i + 1u ] + ${f}[ i + ${2*y}u ] + ${f}[ i + ${2*y+1}u ] ) * 0.25;
		textureStore( out${d}, vec2u( gx * ${y}u + lx, gy * ${y}u + ly ), layer, v );
		${m?`${m}[ ly * ${y}u + lx ] = v;`:""}
	}
	workgroupBarrier();`,l={src0:h(0)};let c="";for(let f=1;f<=a;f++)l["out"+f]=n(f);for(let f=2,m=8;f<=a;f++,m>>=1)c+=o("s"+(f-1),f<a?"s"+f:null,m,f);this.kernelA=new ge({label:t+" mips A",bindings:l,workgroupSize:[16,16,1],code:`
var<workgroup> s1: array<vec4f, 256>;
var<workgroup> s2: array<vec4f, 64>;
var<workgroup> s3: array<vec4f, 16>;
var<workgroup> s4: array<vec4f, 4>;
@compute @workgroup_size( WG_X, WG_Y, WG_Z )
fn main( @builtin( local_invocation_id ) lid: vec3u, @builtin( workgroup_id ) wid: vec3u ) {
	let lx = lid.x; let ly = lid.y;
	let gx = wid.x; let gy = wid.y; let layer = wid.z;
	let x1 = gx * 16u + lx; let y1 = gy * 16u + ly;
	let p = vec2u( x1, y1 ) * 2u;
	let v1 = ( textureLoad( src0, p, layer, 0 ) + textureLoad( src0, p + vec2u( 1u, 0u ), layer, 0 ) + textureLoad( src0, p + vec2u( 0u, 1u ), layer, 0 ) + textureLoad( src0, p + vec2u( 1u, 1u ), layer, 0 ) ) * 0.25;
	textureStore( out1, vec2u( x1, y1 ), layer, v1 );
	s1[ ly * 16u + lx ] = v1;
	workgroupBarrier();
${c}
}`}),this.kernelB=null;const u=s>>5;if(r>6&&u>1){const f={src5:h(5)};let m="",y="",d="s5";for(let v=6,x=u>>1;v<r&&x>=1;v++,x>>=1){f["out"+v]=n(v);const b=x>1&&v<r-1?"s"+v:null;b&&(y+=`var<workgroup> ${b}: array<vec4f, ${x*x}>;
`),m+=o(d,b,x,v),d=b}this.kernelB=new ge({label:t+" mips B",bindings:f,workgroupSize:[u,u,1],code:`
var<workgroup> s5: array<vec4f, ${u*u}>;
${y}
@compute @workgroup_size( WG_X, WG_Y, WG_Z )
fn main( @builtin( local_invocation_id ) lid: vec3u, @builtin( workgroup_id ) wid: vec3u ) {
	let lx = lid.x; let ly = lid.y; let layer = wid.z;
	let gx = 0u; let gy = 0u;
	s5[ ly * ${u}u + lx ] = textureLoad( src5, vec2u( lx, ly ), layer, 0 );
	workgroupBarrier();
${m}
}`})}}dispatch(e=null){const t=e?{pass:e}:void 0;this.kernelA.dispatch([this.res/32,this.res/32,this.layers],t),this.kernelB&&this.kernelB.dispatch([1,1,this.layers],t)}}class Ar{constructor(e,t,{res:s,grid:r,depths:a,name:n,slopeLevel:h,margin:o}){this.fft=e,this.cascade=t,this.tile=e.sizes[t],this.res=s,this.margin=o,this.grid=Math.ceil(r*(1+2*o)),this.depths=a,this.texture=new Xe({label:n,width:s,height:s,format:"rgba16float",mips:!0,usage:["sample","render","storage","copyDst","copySrc"],sampler:"anisoRepeat"}),this.target={texture:this.texture};const l=this.grid,c=l+1,u=new Uint32Array(l*l*6);for(let m=0,y=0;m<l;m++)for(let d=0;d<l;d++){const v=m*c+d;u[y++]=v,u[y++]=v+1,u[y++]=v+c,u[y++]=v+c,u[y++]=v+1,u[y++]=v+c+1}this.indexCount=u.length,this.indexBuffer=L.device.createBuffer({label:n+" indices",size:u.byteLength,usage:GPUBufferUsage.INDEX|GPUBufferUsage.COPY_DST}),L.queue.writeBuffer(this.indexBuffer,0,u),this.mipChain=new vn(this.texture,n);const f=this.tile;this.pipelines=[];for(let m=0;m<a.length;m++){const y=a[m],d=`
struct CauOut { @builtin( position ) pos: vec4f, @location( 0 ) vOld: vec2f, @location( 1 ) vNew: vec2f };

@vertex fn vs( @builtin( vertex_index ) vi: u32 ) -> CauOut {
	// vertex of a ${this.grid} x ${this.grid} quad grid over [-margin, 1 + margin]^2 (indexed)
	let cx = vi % ${this.grid+1}u; let cy = vi / ${this.grid+1}u;
	let uv = vec2f( vec2u( cx, cy ) ) / ${this.grid}.0 * ${(1+2*o).toFixed(4)} - ${o.toFixed(4)};
	let d = textureSampleLevel( oceanDerivatives, smpLinearRepeat, uv, ${t}, ${h.toFixed(3)} );
	let s = vec2f( d.x / max( d.z + 1.0, 0.3 ), d.y / max( d.w + 1.0, 0.3 ) );
	let n = normalize( vec3f( - s.x, 1.0, - s.y ) );
	let T = refract( - frame.sunDir, n, 1.0 / 1.333 );
	let tDown = max( - T.y, 0.15 );
	// flat-surface refraction offset is removed so the pattern stays registered with the
	// entry point (the lookup re-applies it with the real depth)
	let T0 = refract( - frame.sunDir, vec3f( 0.0, 1.0, 0.0 ), 1.0 / 1.333 );
	let off = ( T.xz / tDown - T0.xz / max( - T0.y, 0.15 ) ) * ${y.toFixed(3)};
	let p = uv * ${f};
	let qq = p + off;
	var o: CauOut;
	o.vOld = p;
	o.vNew = qq;
	let ndc = qq / ${f} * 2.0 - 1.0;
	o.pos = vec4f( ndc.x, ndc.y, 0.0, 1.0 );
	return o;
}

@fragment fn fs( in: CauOut ) -> @location( 0 ) vec4f {
	// area ratio between the surface patch and its image on the floor
	let ao = abs( dpdx( in.vOld ).x * dpdy( in.vOld ).y - dpdx( in.vOld ).y * dpdy( in.vOld ).x );
	let an = abs( dpdx( in.vNew ).x * dpdy( in.vNew ).y - dpdx( in.vNew ).y * dpdy( in.vNew ).x );
	// soft limit: a single nearly-folded cell must not become a flat white hot spot (the
	// finite sun disk spreads real caustic peaks to a few times the mean anyway)
	let I = ao / max( an + ao * ( 1.0 / 8.0 ), 1e-9 );
	return vec4f( ${m===0?"I":"0.0"}, ${m===1?"I":"0.0"}, 0.0, 1.0 );
}
`,v=Qt({modules:[Z,e.module],code:d,stage:"render",label:n}),x=Jt(v.code,n),b={srcFactor:"one",dstFactor:"one",operation:"add"},w=L.renderPipeline({label:n+m,layout:L.device.createPipelineLayout({bindGroupLayouts:[v.group0.layout,v.bindings.layout]}),vertex:{module:x,entryPoint:"vs"},fragment:{module:x,entryPoint:"fs",targets:[{format:"rgba16float",blend:{color:b,alpha:b}}]},primitive:{topology:"triangle-list",cullMode:"none"}});this.pipelines.push({pipeline:w,bindings:v.bindings,group0:v.group0})}}render(){const t=L.getEncoder().beginRenderPass({label:this.texture.label,colorAttachments:[{view:this.texture.view({dimension:"2d",baseMipLevel:0,mipLevelCount:1}),clearValue:[0,0,0,0],loadOp:"clear",storeOp:"store"}]});t.setIndexBuffer(this.indexBuffer,"uint32");for(const s of this.pipelines)t.setPipeline(L.ready(s.pipeline)),t.setBindGroup(0,s.group0.getBindGroup()),t.setBindGroup(1,s.bindings.getBindGroup()),t.drawIndexed(this.indexCount,1);t.end()}mips(e){this.mipChain.dispatch(e)}}class gn{constructor(e,t){this.renderer=e,this.fft=t,this.params=new ue("CausticsParams",{strength:["f32",.75]},{label:"caustics"}),this.strength=this.params.fields.strength,this.detail=null;const s=t.cascades-1;this.fine=new Ar(t,s,{res:512,grid:256,depths:[1.2,4],name:"causticsFine",slopeLevel:1,margin:.35}),this.broad=new Ar(t,s-1,{res:256,grid:128,depths:[3,9],name:"causticsBroad",slopeLevel:.5,margin:.35}),this._module=null}update(){this.fine.render(this.renderer),this.broad.render(this.renderer),L.computePass("Caustics Mips",e=>{this.fine.mips(e),this.broad.mips(e)})}get module(){if(this._module)return this._module;const e=this.detail,t=this.fine,s=this.broad;return this._module=new Y({name:"caustics",deps:[Z,e?e.module:null],uniforms:this.params,uniformName:"caustics",bindings:{causticsFineTex:{texture:t.texture},causticsBroadTex:{texture:s.texture}},code:`
// the blur level is the least filtering; with a footprint, each gradient is stretched to at
// least that level's texel size
fn _causticsStretch( g: vec2f, minLen: f32 ) -> vec2f { return g * max( minLen / max( length( g ), 1e-9 ), 1.0 ); }
fn _causticsFetchFine( uv: vec2f, lvl: f32, gdx: vec2f, gdy: vec2f, useGrad: bool ) -> vec4f {
	if ( ! useGrad ) { return textureSampleLevel( causticsFineTex, smpAnisoRepeat, uv, lvl ); }
	let minLen = exp2( lvl ) / ${t.res}.0;
	return textureSampleGrad( causticsFineTex, smpAnisoRepeat, uv, _causticsStretch( gdx / ${t.tile}, minLen ), _causticsStretch( gdy / ${t.tile}, minLen ) );
}
fn _causticsFetchBroad( uv: vec2f, lvl: f32, gdx: vec2f, gdy: vec2f, useGrad: bool ) -> vec4f {
	if ( ! useGrad ) { return textureSampleLevel( causticsBroadTex, smpAnisoRepeat, uv, lvl ); }
	let minLen = exp2( lvl ) / ${s.res}.0;
	return textureSampleGrad( causticsBroadTex, smpAnisoRepeat, uv, _causticsStretch( gdx / ${s.tile}, minLen ), _causticsStretch( gdy / ${s.tile}, minLen ) );
}

// gust / slick factor of the caustics at xz (1 without sea detail)
fn causticsDetailK( xz: vec2f ) -> f32 {
${e?`	let det = seaDetailSample( xz );
	return mix( 0.55, 1.25, det.gust ) * ( 1.0 - det.slick * 0.6 );`:"	return 1.0;"}
}

// mono: one fine lookup instead of three (no chromatic dispersion); detailK < 0: evaluated here
fn _causticsSample( P: vec3f, depth: f32, level: f32, slope: vec2f, foam: f32, hasFoam: bool, gdx: vec2f, gdy: vec2f, useGrad: bool, mono: bool, detailK: f32 ) -> vec3f {
	// the light reaching this point entered the water up-sun along the refracted sun ray
	let n = normalize( vec3f( - slope.x, 1.0, - slope.y ) );
	let Ls = refract( - frame.sunDir, n, 1.0 / 1.333 );
	let tDown = max( - Ls.y, 0.15 );
	let entry = P.xz - Ls.xz * ( depth / tDown );

	// deeper -> softer (finite sun disk + forward scattering)
	let blur = select( clamp( depth * 0.4 - 0.2, 0.0, 3.0 ), level, level >= 0.0 );
	let wD = sat( ( depth - 1.2 ) / 2.8 ); // blend between the two focal planes

	let uvF = entry / ${t.tile};
	let tg = _causticsFetchFine( uvF, blur, gdx, gdy, useGrad );
	let g = mix( tg.x, tg.y, wD );
	var r = g;
	var b = g;
	if ( ! mono ) {
		// slight chromatic dispersion: each color lands a little apart along the sun direction
		let disp = normalize( Ls.xz + vec2f( 1e-4, 0.0 ) ) * ( depth * 0.0035 );
		let tr = _causticsFetchFine( uvF + disp / ${t.tile}, blur, gdx, gdy, useGrad );
		let tb = _causticsFetchFine( uvF - disp / ${t.tile}, blur, gdx, gdy, useGrad );
		r = mix( tr.x, tr.y, wD );
		b = mix( tb.x, tb.y, wD );
	}
	let broad = _causticsFetchBroad( entry / ${s.tile}, 1.5, gdx, gdy, useGrad );
	let br = mix( broad.x, broad.y, sat( depth / 9.0 ) );
	let c = vec3f( r, g, b ) * mix( 1.0, br, 0.6 );

	// no caustics right at the surface, strongest in the first metres, fading with depth
	var k = smoothstep( 0.03, 0.5, depth ) * exp( depth * -0.06 ) * caustics.strength;
	k *= select( causticsDetailK( entry ), detailK, detailK >= 0.0 );
	if ( hasFoam ) { k *= 1.0 - sat( foam ); }
	let result = mix( vec3f( 1.0 ), c, k );
	// foam and bubble clouds scatter the light back up: the floor under them is shaded
	return select( result, result * ( 1.0 - sat( foam ) * 0.6 ), hasFoam );
}

fn causticsSample( P: vec3f, depth: f32, slope: vec2f, foam: f32, gdx: vec2f, gdy: vec2f ) -> vec3f {
	return _causticsSample( P, depth, -1.0, slope, foam, true, gdx, gdy, true, false, -1.0 );
}

fn causticsSampleBaked( P: vec3f, depth: f32, slope: vec2f, foam: f32, gdx: vec2f, gdy: vec2f, detailK: f32 ) -> vec3f {
	return _causticsSample( P, depth, -1.0, slope, foam, true, gdx, gdy, true, false, detailK );
}

// without the chromatic dispersion (one fine lookup): the water's refraction source, seen blurred
fn causticsSampleBakedMono( P: vec3f, depth: f32, slope: vec2f, foam: f32, gdx: vec2f, gdy: vec2f, detailK: f32 ) -> vec3f {
	return _causticsSample( P, depth, -1.0, slope, foam, true, gdx, gdy, true, true, detailK );
}

fn causticsSampleLevel( P: vec3f, depth: f32, level: f32 ) -> vec3f {
	return _causticsSample( P, depth, level, vec2f( 0.0 ), 0.0, false, vec2f( 0.0 ), vec2f( 0.0 ), false, false, -1.0 );
}

fn causticsSampleShaft( P: vec3f, depth: f32, level: f32, detailK: f32 ) -> vec3f {
	return _causticsSample( P, depth, level, vec2f( 0.0 ), 0.0, false, vec2f( 0.0 ), vec2f( 0.0 ), false, true, detailK );
}
`}),this._module}get fineTex(){return this.fine.texture}get broadTex(){return this.broad.texture}}const De=512,wn=[128,1024];function bn({fft:i,caustics:e,clouds:t=null,terrain:s=null,shore:r=null,surface:a=null,shoreSim:n=null}){const h=new ue("UnderwaterParams",{reach:["f32",3]},{label:"underwater"});h.onBeforePack=()=>{h.fields.reach.value=r&&r.amplitude?r.amplitude.value*1.5+1.2:3};const o=!!s,l=!!(r&&s),c=[Z,He,i.module,s&&s.module,l&&r.module,n&&n.module,e&&e.module,t&&t.module,a&&a.attenuationModule],u=Math.min(3,i.cascades),f=Math.min(2,i.cascades),m=new Y({name:"underwater",deps:c,uniforms:h,uniformName:"underwater",code:`
struct UnderwaterLongWaves { height: f32, slope: vec2f, foam: f32 };

// long waves at xz: height, slope and foam from the coarse FFT cascades and the shore waves
// texel: the bake's texel size (m); the cascades are read no finer than it (level >= 2)
fn underwaterLongWaves( xz: vec2f, texel: f32 ) -> UnderwaterLongWaves {
	let seaDepth = ${o?"frame.seaLevel - terrainHeightAt( xz )":"50.0"};
	var h = 0.0;
	var slope = vec2f( 0.0 );
	for ( var c = 0; c < ${u}; c++ ) {
		let uv = xz / ocean.sizes[ c ].x;
		let att = ${a?"waterSurfaceCascadeAttenuation( c, seaDepth )":"1.0"};
		let lvl = max( 2.0, log2( texel * ${gt}.0 / ocean.sizes[ c ].x ) );
		h += textureSampleLevel( oceanDisplacement, smpLinearRepeat, uv, c, lvl ).y * att;
		if ( c < 2 ) {
			let d = textureSampleLevel( oceanDerivatives, smpLinearRepeat, uv, c, lvl );
			slope += vec2f( d.x, d.y ) * att;
		}
	}

	var foam = 0.0;
${l?`	{
		let sw = shoreEvaluate( xz, seaDepth, terrainHeightAt( xz ) );
		h += sw.disp.y;
		let n = sw.nShore;
		slope += - vec2f( n.x, n.z ) / max( n.y, 0.25 );
		foam += sw.foam;
	}`:""}
${n?"	foam += shoreSimSample( xz ).x * 0.8;":""}
	// waves only exist over water: none over dry land
${o?"	h = h * smoothstep( 0.0, 1.0, seaDepth ) - smoothstep( 0.0, -0.4, seaDepth ) * 10.0;":""}
	var o: UnderwaterLongWaves;
	o.height = frame.seaLevel + h;
	o.slope = slope;
	o.foam = foam;
	return o;
}

fn underwaterSigT() -> vec3f { return frame.waterAbsorption + frame.waterScattering; }

// mean water level from the two longest FFT cascades (one texture binding)
fn underwaterMeanLevel( xz: vec2f ) -> f32 {
	var h = 0.0;
	for ( var c = 0; c < ${f}; c++ ) {
		h += textureSampleLevel( oceanDisplacement, smpLinearRepeat, xz / ocean.sizes[ c ].x, c, 3.0 ).y;
	}
${o?"	h *= smoothstep( 0.0, 3.0, frame.seaLevel - terrainHeightAt( xz ) );":""}
	return frame.seaLevel + h;
}
`}),y=new ue("UwMapParams",{origin0:["vec2f",new ee],origin1:["vec2f",new ee],reach:["f32",3]},{label:"uwMap"});y.onBeforePack=()=>{y.fields.reach.value=r&&r.amplitude?r.amplitude.value*1.5+1.2:3};const d=[y.fields.origin0,y.fields.origin1],v=_=>new Xe({label:_,width:De,height:De,format:"rgba16float",usage:["sample","storage"]}),x=wn.map((_,C)=>{const P=_/De,D=v("uwWaves"+C),$=v("uwLevel"+C),F=new ge({label:"Underwater Light Map "+C,modules:[m,...e&&e.module?[e.module]:[]],bindings:{uwMapParams:{uniform:y},uwOutA:{storageTexture:D,access:"write"},uwOutB:{storageTexture:$,access:"write"}},workgroupSize:[8,8,1],code:`
@compute @workgroup_size( WG_X, WG_Y, WG_Z )
fn main( @builtin( global_invocation_id ) gid: vec3u ) {
	let xz = ( vec2f( gid.xy ) + 0.5 ) * ${P} + uwMapParams.origin${C};
	let lw = underwaterLongWaves( xz, ${P} );
	textureStore( uwOutA, vec2u( gid.xy ), vec4f( lw.height - frame.seaLevel, lw.slope, sat( lw.foam ) ) );
	let dk = ${e&&e.module?"causticsDetailK( xz )":"1.0"};
	textureStore( uwOutB, vec2u( gid.xy ), vec4f( underwaterMeanLevel( xz ) - frame.seaLevel, dk, 0.0, 1.0 ) );
}
`});return{extent:_,texel:P,A:D,B:$,kernel:F,origin:d[C]}}),[b,w]=x,M=new Y({name:"uwMap",deps:[Z],uniforms:y,uniformName:"uwMapParams",bindings:{uwWaves0:{texture:b.A},uwLevel0:{texture:b.B},uwWaves1:{texture:w.A},uwLevel1:{texture:w.B}},code:`
struct UwMapSample { height: f32, slope: vec2f, foam: f32, mean: f32, detailK: f32 };

fn uwReach() -> f32 { return uwMapParams.reach; }

// bilinear lookup of the baked maps at xz (near map first, then far; flat sea beyond).
// waves: map A (height, slope, foam) is only read for the full direct term
// (the direct, ambient and shadow position hooks look up the same point: the last lookup is
// remembered; one made with waves serves the calls without)
var<private> uwMemoXZ: vec2f = vec2f( 3.0e38 );
var<private> uwMemoWaves: bool = false;
var<private> uwMemo: UwMapSample;
fn uwMapLookup( xz: vec2f, waves: bool ) -> UwMapSample {
	if ( all( xz == uwMemoXZ ) && ( uwMemoWaves || ! waves ) ) { return uwMemo; }
	uwMemoXZ = xz;
	uwMemoWaves = waves;
	uwMemo = _uwMapLookup( xz, waves );
	return uwMemo;
}
fn _uwMapLookup( xz: vec2f, waves: bool ) -> UwMapSample {
	var a = vec4f( 0.0 );
	var b = vec4f( 0.0, 0.9, 0.0, 0.0 );
	let st0 = ( xz - uwMapParams.origin0 ) / ${b.texel};
	let st1 = ( xz - uwMapParams.origin1 ) / ${w.texel};
	if ( all( st0 > vec2f( 0.5 ) ) && all( st0 < vec2f( ${De}.0 - 0.5 ) ) ) {
		let uv = st0 / ${De}.0;
		if ( waves ) { a = textureSampleLevel( uwWaves0, smpLinearClamp, uv, 0.0 ); }
		b = textureSampleLevel( uwLevel0, smpLinearClamp, uv, 0.0 );
	} else if ( all( st1 > vec2f( 0.5 ) ) && all( st1 < vec2f( ${De}.0 - 0.5 ) ) ) {
		let uv = st1 / ${De}.0;
		if ( waves ) { a = textureSampleLevel( uwWaves1, smpLinearClamp, uv, 0.0 ); }
		b = textureSampleLevel( uwLevel1, smpLinearClamp, uv, 0.0 );
	}
	return UwMapSample( frame.seaLevel + a.x, a.yz, a.w, frame.seaLevel + b.x, b.y );
}
`}),z=_=>{for(const C of x){const P=C.extent/2;C.origin.value.set(Math.floor(_.position.x/C.texel)*C.texel-P,Math.floor(_.position.z/C.texel)*C.texel-P)}for(const C of x)C.kernel.dispatch([De/8,De/8,1])},A=[Z,He,M,e&&e.module,t&&t.module,s&&s.module].filter(Boolean),p=new Y({name:"hook-directModulation-underwater",deps:A,code:`
fn hookDirectModulation( P: vec3f, N: vec3f ) -> vec3f {
#if IS_WATER
	return vec3f( 1.0 );
#else
	var result = vec3f( 1.0 );
#if UNDERWATER_LIGHTING == 2
	// the pixel's footprint on the ground plane, to filter the caustics over it (screen derivatives
	// taken by shadeSurface in uniform control flow: this hook runs in its branches)
	let gdx = lightDPdx.xz;
	let gdy = lightDPdy.xz;
#endif
#if UNDERWATER_LIGHTING != 0
	// cheap reject: above anything the water reaches
	if ( P.y < frame.seaLevel + uwReach() ) {
#if UNDERWATER_LIGHTING == 2
		let lw = uwMapLookup( P.xz, true );
		let lwHeight = lw.height;
#else
		let lwHeight = uwMapLookup( P.xz, false ).mean;
#endif
		let d = max( lwHeight - P.y, 0.0 );
		if ( d > 0.0 ) {
			let under = smoothstep( 0.0, 0.08, d );
			let Ls = refract( - frame.sunDir, vec3f( 0.0, 1.0, 0.0 ), 1.0 / 1.333 );
			let mu = max( - Ls.y, 0.15 );
			let atten = exp( - ( frame.waterAbsorption + frame.waterScattering ) * d / mu );
#if UNDERWATER_LIGHTING == 2
#if REFRACTION_CLIP
			// the refraction source is half resolution and seen blurred: no dispersion
			let caust = ${e?"causticsSampleBakedMono( P, d, lw.slope, lw.foam, gdx, gdy, lw.detailK )":"vec3f( 1.0 )"};
#else
			let caust = ${e?"causticsSampleBaked( P, d, lw.slope, lw.foam, gdx, gdy, lw.detailK )":"vec3f( 1.0 )"};
#endif
#else
			let caust = vec3f( 1.0 );
#endif
			result = mix( vec3f( 1.0 ), atten * caust, under );
		}
	}
#endif
	let cloudShadow = ${t?"cloudsShadow( P.xz )":"1.0"};
	// hills shadowing the island and the bay at low sun (terrain heightfield shadow; the terrain and
	// the rocks apply it in their own lighting model)
#if HILL_SHADOW_SELF
	let hill = 1.0;
#else
	let hill = ${o?"terrainSunShadowAt( P )":"1.0"};
#endif
	return result * cloudShadow * hill;
#endif
}
`}),g=new Y({name:"hook-ambientModulation-underwater",deps:[p],code:`
fn hookAmbientModulation( P: vec3f, N: vec3f ) -> vec3f {
	var result = vec3f( 1.0 );
#if !IS_WATER
#if UNDERWATER_LIGHTING != 0
	if ( P.y < frame.seaLevel + uwReach() ) {
		// the ambient term only needs the mean water level (no shore evaluation)
		let d = max( uwMapLookup( P.xz, false ).mean - P.y, 0.0 );
		let under = smoothstep( 0.0, 0.1, d );
		// diffuse downwelling light: effective path ~1.2x depth, plus a little in-scattered blue
		let atten = exp( - ( frame.waterAbsorption + frame.waterScattering ) * d * 1.2 ) * 0.85 + vec3f( 0.0, 0.02, 0.04 ) * exp( d * -0.1 );
		result = mix( vec3f( 1.0 ), atten, under );
	}
#endif
#endif
	return result;
}
`}),S=new Y({name:"hook-shadowPosition-underwater",deps:A,code:`
fn hookShadowPosition( P: vec3f, N: vec3f, pixel: vec2f ) -> vec3f {
#if IS_WATER || UNDERWATER_LIGHTING == 0
	return P;
#else
	if ( P.y >= frame.seaLevel + uwReach() ) { return P; }
#if UNDERWATER_LIGHTING == 2
	let m = uwMapLookup( P.xz, true );
	let h = m.height;
	let n = normalize( vec3f( - m.slope.x, 1.0, - m.slope.y ) );
#else
	let h = uwMapLookup( P.xz, false ).mean;
	let n = vec3f( 0.0, 1.0, 0.0 );
#endif
	let d = h - P.y;
	if ( d <= 0.0 ) { return P; }
	let up = - refract( - frame.sunDir, n, 1.0 / 1.333 ); // toward the entry point, in the water
	let entry = P + up * ( d / max( up.y, 0.15 ) );
	let g = interleavedGradientNoise( pixel + f32( frame.frameIndex % 64u ) * 5.588238 );
	let phi = g * TWO_PI;
	let rad = sqrt( fract( g * 1.618034 + 0.31 ) ) * min( d * 0.05, 0.5 );
	return entry + vec3f( cos( phi ), 0.0, sin( phi ) ) * rad;
#endif
}
`});return vt.set("directModulation",p),vt.set("shadowPosition",S),vt.set("ambientModulation",g),{helpers:m,direct:p,ambient:g,shadowPos:S,params:h,update:z,levels:x}}const j={BODY:0,DORSAL1:1,DORSAL2:2,ANAL:3,CAUDAL:4,PECTORAL:5,PELVIC:6,FINLET:7,EYE:8,MOUTH:9,FLESH:10,ICE:11,LEAF:12,SHELL:13,FILLET:14,DISC:15,WHIP:16,CARAPACE:17,SKIN:18,FLIPPER:19},bs=Math.PI*2,Ut=(i,e)=>{if(e<=i[0][0])return i[0][1];for(let t=1;t<i.length;t++)if(e<=i[t][0]){const s=i[t-1],r=i[t],a=(e-s[0])/(r[0]-s[0]),n=a*a*(3-2*a);return s[1]+(r[1]-s[1])*(.5*a+.5*n)}return i[i.length-1][1]},ce=(i,e,t)=>i+(e-i)*t,bt=(i,e,t)=>Math.max(e,Math.min(t,i)),Sn=(i,e,t)=>{const s=bt((t-i)/(e-i),0,1);return s*s*(3-2*s)};class Mn{constructor(){this.pos=[],this.dat=[],this.idx=[],this.seams=[]}v(e,t,s,r,a,n,h){return this.pos.push(e,t,s),this.dat.push(r,a,n,h),this.pos.length/3-1}tri(e,t,s){this.idx.push(e,t,s)}quad(e,t,s,r){this.idx.push(e,t,r,t,s,r)}build(){const e=new Se;e.setAttribute("position",new rt(this.pos,3)),e.setAttribute("aData",new rt(this.dat,4)),e.setIndex(this.idx),e.computeVertexNormals();const t=e.attributes.normal.array;for(const[s,r]of this.seams){let a=t[s*3]+t[r*3],n=t[s*3+1]+t[r*3+1],h=t[s*3+2]+t[r*3+2];const o=Math.hypot(a,n,h)||1;a/=o,n/=o,h/=o,t[s*3]=t[r*3]=a,t[s*3+1]=t[r*3+1]=n,t[s*3+2]=t[r*3+2]=h}return e.computeBoundingSphere(),e}}function Oe(i,e){return{T:Ut(i.top,e),B:Ut(i.bot,e),W:Ut(i.wid,e),e:2/i.sec}}function Ht(i,e,t){const s=Math.sin(e),r=Math.cos(e);return t[0]=i.W*Math.sign(s)*Math.pow(Math.abs(s),i.e),t[1]=(r>=0?i.T:i.B)*Math.sign(r)*Math.pow(Math.abs(r),i.e),t}function us(i,e){const s=[0,0],r=[0,0];Ht(i,0,s);let a=0;for(let n=1;n<=24;n++)Ht(i,e*n/24,r),a+=Math.hypot(r[0]-s[0],r[1]-s[1]),s[0]=r[0],s[1]=r[1];return a}function Ss(i,e){const t=e>=0?i.T:i.B,s=Math.min(1,Math.abs(e)/Math.max(t,1e-4)),r=2/i.e;return i.W*Math.pow(Math.max(0,1-Math.pow(s,r)),1/r)}function fs(i,e){const t=i.e,s=e>=0?Math.pow(bt(e/Math.max(i.T,1e-4),0,.97),1/t):-Math.pow(bt(-e/Math.max(i.B,1e-4),0,.97),1/t);return Math.acos(s)}function zn(i,e,t,s){const r=[34,16,7,4][e],a=[];for(let o=0;o<=r;o++){const l=o/r;a.push(.6*Math.pow(l,1.55)+.4*l)}a[0]=[.006,.014,.03,.05][e];const n=o=>{let l=1,c=1/0;for(let u=1;u<a.length-1;u++){const f=Math.abs(a[u]-o);f<c&&(c=f,l=u)}a[l]=o};e<2&&n(i.mouth.corner);const h=a.filter(o=>o>=t-1e-6&&o<=s+1e-6);return h[0]>t+1e-4&&t>0&&h.unshift(t),h[h.length-1]<s-1e-4&&h.push(s),h}function _n(i,e,t){const s=t.lod,r=e.body,a=p=>.5-p*r,n=t.u0??0,h=t.u1??1,o=[26,14,7,5][s],l=zn(e,s,n,h),c=t.mouth&&n===0,u=e.mouth,f=u.corner,m=p=>ce(u.tip,u.y,Math.min(1,p/f)),y=Oe(e,f),d=fs(y,u.y),v=bt(Math.round(o*d/Math.PI),3,o-3),x=o-v,b=p=>c?1-Sn(f*.8,f*1.3,p):0,w=[],M=[0,0];for(const p of l){const g=Oe(e,p),S=p<f?fs(g,m(p)):fs(g,u.y*(g.T+g.B)/(y.T+y.B)),_=a(p),C=0,P={u:p,upper:[],lower:[]},D=b(p),$=us(g,Math.PI);for(let F=0;F<=v;F++){const H=-S+2*S*F/v;Ht(g,H,M);const O=us(g,Math.abs(H)),R=M[1]>=0?M[1]/Math.max(g.T,1e-4):M[1]/Math.max(g.B,1e-4);P.upper.push(i.v(M[0],M[1],_,p*r,j.BODY,O,R))}for(let F=0;F<=x;F++){const H=S+(bs-2*S)*F/x;Ht(g,H,M);const O=H>Math.PI?bs-H:H,R=Math.min($,us(g,O)),re=M[1]>=0?M[1]/Math.max(g.T,1e-4):M[1]/Math.max(g.B,1e-4),te=(F===0||F===x)&&p>=f?0:D;P.lower.push(i.v(M[0],M[1],_,p*r,j.BODY+.9*te,R,re))}i.seams.push([P.upper[v],P.lower[0]],[P.upper[0],P.lower[x]]),P.c=g,P.z=_,P.phiM=S,P.wj=D,P.jawFwd=C,w.push(P)}for(let p=0;p<w.length-1;p++){const g=w[p],S=w[p+1];for(let _=0;_<v;_++)i.quad(g.upper[_],g.upper[_+1],S.upper[_+1],S.upper[_]);for(let _=0;_<x;_++)i.quad(g.lower[_],g.lower[_+1],S.lower[_+1],S.lower[_])}const z=w[0],A=w[w.length-1];if(n===0){const g=m(0),S=Math.min(z.c.T,z.c.B)*.3,_=i.v(0,g+S*.5,.5,0,j.BODY,0,0),C=i.v(0,g-S*.5,.5+(c?u.protrude:0),0,j.BODY+.9*(c?1:0),0,0);for(let P=0;P<v;P++)i.tri(_,z.upper[P+1],z.upper[P]);for(let P=0;P<x;P++)i.tri(C,z.lower[P+1],z.lower[P]);if(c||(i.tri(_,z.upper[0],C),i.tri(_,C,z.upper[v])),c){const P=[],D=[],$=w.filter(R=>R.u<=f+1e-6),F=R=>Math.min(1,R/f);for(const R of $){const re=.45*(1-F(R.u)),te=m(R.u),T=R.upper[v],V=R.upper[0],I=i.pos[T*3],B=i.pos[V*3],N=i.pos[T*3+1],Q=R.c.T,Me=R.c.B,he=F(R.u);P.push([i.v(I*.97,N,R.z,R.u*r,j.MOUTH,he,0),i.v(0,te+re*(Q-te)*.8,R.z-.004,R.u*r,j.MOUTH,he,0),i.v(B*.97,N,R.z,R.u*r,j.MOUTH,he,0)]);const Pe=R.wj,ze=R.z+R.jawFwd;D.push([i.v(I*.97,N,ze,R.u*r,j.MOUTH+.9*Pe,he,0),i.v(0,te-re*(te+Me)*.8,ze-.004,R.u*r,j.MOUTH+.9*Pe,he,0),i.v(B*.97,N,ze,R.u*r,j.MOUTH+.9*Pe,he,0)])}for(let R=0;R<P.length-1;R++){const re=P[R],te=P[R+1];i.quad(re[0],re[1],te[1],te[0]),i.quad(re[1],re[2],te[2],te[1]);const T=D[R],V=D[R+1];i.quad(T[1],T[0],V[0],V[1]),i.quad(T[2],T[1],V[1],V[2])}const H=P[0],O=D[0];i.tri(_,H[1],H[0]),i.tri(_,H[2],H[1]),i.tri(C,O[0],O[1]),i.tri(C,O[1],O[2])}}else Pr(i,z,v,x,r,!0);if(h>=1){const p=i.v(0,0,A.z-.004,r,j.BODY,0,0);for(let g=0;g<v;g++)i.tri(p,A.upper[g],A.upper[g+1]);for(let g=0;g<x;g++)i.tri(p,A.lower[g],A.lower[g+1])}else Pr(i,A,v,x,r,!1);return w}function Pr(i,e,t,s,r,a){const h=[...e.upper,...e.lower.slice(1,s)].map(l=>{const c=i.pos[l*3],u=i.pos[l*3+1];return i.v(c,u,e.z,e.u*r,j.FLESH,c,u)}),o=i.v(0,(e.c.T-e.c.B)*.3,e.z,e.u*r,j.FLESH,0,(e.c.T-e.c.B)*.3);for(let l=0;l<h.length;l++){const c=h[l],u=h[(l+1)%h.length];a?i.tri(o,u,c):i.tri(o,c,u)}}function Ls(i,e,t,s,r,a,n){const h=[];for(let o=0;o<t.length;o++)if(h.push({...t[o],dip:0,id:a[o]}),o<t.length-1){const l=t[o],c=t[o+1],u=(f,m)=>[(f[0]+m[0])/2,(f[1]+m[1])/2,(f[2]+m[2])/2];h.push({b:u(l.b,c.b),t:u(l.t,c.t),ub:(l.ub+c.ub)/2,ut:(l.ut+c.ut)/2,dip:s,id:(a[o]+a[o+1])/2})}for(const o of[!1,!0]){const l=[];for(const c of h){const u=[],f=1-c.dip;for(let m=0;m<=r;m++){const y=m/r*f;u.push(i.v(ce(c.b[0],c.t[0],y),ce(c.b[1],c.t[1],y),ce(c.b[2],c.t[2],y),ce(c.ub,c.ut,y),e,y,c.id))}l.push(u)}for(let c=0;c<l.length-1;c++)for(let u=0;u<r;u++){const f=l[c][u],m=l[c+1][u],y=l[c+1][u+1],d=l[c][u+1];o!==n?i.quad(m,f,d,y):i.quad(f,m,y,d)}}}function Fs(i,e){if(i<=e)return[...Array(i).keys()];const t=[];for(let s=0;s<e;s++)t.push(Math.round(s*(i-1)/(e-1)));return t}function Cr(i,e,t,s,r){const a=e.body,n=l=>.5-l*a,h=r.pose==="dead",o=[3,1,1,1][r.lod];t.forEach((l,c)=>{const u=s>0?l.spiny?j.DORSAL1:j.DORSAL2:j.ANAL,f=Fs(l.rays,[40,7,3,2][r.lod]),m=h?l.spiny?.42:.22:0,y=f.map(d=>{const v=l.rays>1?d/(l.rays-1):0,x=ce(l.from,l.to,v),b=Oe(e,x),w=s>0?b.T*.9:-b.B*.9;let M=Ut(l.h,v)+(s>0?b.T:b.B)*.1,z=ce(l.rake[0],l.rake[1],v);z=ce(z,1.45,m),M*=h?l.rays>30?.85:.95:1;const A=[0,w+s*M*Math.cos(z),n(x)-M*Math.sin(z)];return{b:[0,w,n(x)],t:A,ub:x*a,ut:x*a+M*Math.sin(z)}});Ls(i,u,y,r.lod>=2?0:l.notch,o,f.map(d=>d+c*40),s<0)})}function kn(i,e,t){const s=e.caudal,r=e.body,a=.5-r+.014,n=Oe(e,1),h=Math.min(n.T,n.B)*.9,o=t.pose==="dead",l=s.rays,c=Fs(l,[40,9,5,3][t.lod]),u=s.span*(o?.93:1),f=c.map(m=>{const y=-1+2*m/(l-1),d=Math.abs(y);let v,x;return s.shape==="rounded"?(v=u*y*.95,x=s.len*(1-.3*y*y)):s.shape==="truncate"?(v=u*y,x=s.len*(1-.05*y*y)*ce(s.fork,1,d)):s.shape==="lunate"?(v=u*y*(.75+.25*d),x=s.len*(s.fork+(1-s.fork)*Math.pow(d,1.8))):(v=u*y,x=s.len*(s.fork+(1-s.fork)*Math.pow(d,1.3))),{b:[0,h*y,a],t:[0,v,a-.014-x],ub:r-.014,ut:r+x}});Ls(i,j.CAUDAL,f,t.lod>=2?0:.05,[3,1,1,1][t.lod],c,!1)}function Tr(i,e,t,s,r){const a=e.body,n=m=>.5-m*a,h=r.pose==="dead",o=Oe(e,t.u),l=t.rays,c=Fs(l,[24,5,3,2][r.lod]),u=[2,1,1,1][r.lod],f=s===j.PELVIC;for(const m of[1,-1]){const y=c.map(v=>{const x=l>1?v/(l-1):0;let b,w,M,z,A;if(f)b=-o.B*.88,w=m*(o.W*.22+x*o.W*.12),M=ce(-.35,-.75,x),z=t.len*(1-.45*x),A=h?.14:.35;else{b=t.y+t.base*(.5-x),w=m*Ss(o,b)*.94;const S=t.shape;M=S==="falcate"?ce(.05,-.55,x):S==="pointed"?ce(.1,-.85,x):ce(.25,-1.1,x),z=t.len*(S==="falcate"?1-.85*Math.pow(x,.55):S==="pointed"?1-.62*Math.pow(x,.9):.62+.38*Math.sin(Math.PI*(.15+.85*x))),A=h?.16:t.spread,h&&(M=M*.6-.08)}const p=[m*Math.sin(A)*Math.cos(M),Math.sin(M),-Math.cos(A)*Math.cos(M)],g=n(t.u);return{b:[w,b,g],t:[w+p[0]*z,b+p[1]*z,g+p[2]*z],ub:t.u*a,ut:t.u*a-p[2]*z}}),d=i.pos.length/3;Ls(i,s,y,r.lod>=2?0:.035,u,c,m<0);for(let v=d;v<i.pos.length/3;v++){const x=i.pos[v*3],b=i.pos[v*3+1],w=i.pos[v*3+2],M=bt((.5-w)/a,0,1),z=Ss(Oe(e,M),b)+.004;Math.abs(x)<z&&(i.pos[v*3]=m*z)}}}function An(i,e,t){const s=e.finlets,r=e.body,a=n=>.5-n*r;for(const[n,h]of[[s.dorsal,1],[s.ventral,-1]])for(let o=0;o<n;o++){const l=ce(s.from,s.to,(o+.5)/n),c=Oe(e,l),u=h>0?c.T*.85:-c.B*.85,f=(s.to-s.from)/n*.75,m=.006+(h>0?c.T:c.B)*.12;for(const y of[!1,!0]){const d=i.v(0,u,a(l),l*r,j.FINLET,0,0),v=i.v(0,u,a(l+f),(l+f)*r,j.FINLET,0,1),x=i.v(0,u+h*m,a(l+f*1.6),(l+f*1.6)*r,j.FINLET,1,.5);h>0!==y?i.tri(d,x,v):i.tri(d,v,x)}}}function Pn(i,e,t){const s=e.eye,r=e.body,a=s.u,n=.5-a*r,h=Oe(e,a),o=s.r,l=t.lod===0?18:10,c=t.lod===0?5:2,u=.34*o;for(const f of[1,-1]){const m=Ss(h,s.y),y=new k(f,.06,.22).normalize(),d=new k(0,1,0).addScaledVector(y,-y.y).normalize(),v=new k().crossVectors(y,d),x=new k(f*(m-o*.12),s.y,n),b=[];for(let w=0;w<=c;w++){const M=w/c,z=[],A=w===0?1:l;for(let p=0;p<A;p++){const g=p/l*bs,S=Math.cos(g)*M,_=Math.sin(g)*M,C=u*(1-M*M)+o*.12,P=x.x+d.x*_*o+v.x*S*o+y.x*C,D=x.y+d.y*_*o+v.y*S*o+y.y*C,$=x.z+d.z*_*o+v.z*S*o+y.z*C;z.push(i.v(P,D,$,a*r,j.EYE,S*f,_))}b.push(z)}for(let w=0;w<c;w++)for(let M=0;M<l;M++){const z=(M+1)%l;if(w===0)f>0?i.tri(b[0][0],b[1][M],b[1][z]):i.tri(b[0][0],b[1][z],b[1][M]);else{const A=b[w][M],p=b[w][z],g=b[w+1][z],S=b[w+1][M];f>0?i.quad(A,S,g,p):i.quad(A,p,g,S)}}}}function Cn(i,e={}){const t={lod:0,pose:"swim",...e},s=t.lod;t.mouth=t.mouth??(s<2&&t.pose==="dead");const r=new Mn,a=t.u0??0,n=t.u1??1;_n(r,i,t);const h=o=>o>=a&&o<=n;return t.fins!==!1&&(Cr(r,i,(l=>s<3?l:l.slice(-1))(i.dorsal.filter(l=>h(l.from))),1,t),s<3&&Cr(r,i,i.anal.filter(l=>h(l.from)),-1,t),n>=1&&kn(r,i,t),h(i.pectoral.u)&&s<3&&Tr(r,i,i.pectoral,j.PECTORAL,t),i.pelvic&&h(i.pelvic.u)&&s<2&&Tr(r,i,i.pelvic,j.PELVIC,t),i.finlets&&s<2&&n>=1&&An(r,i)),(t.eyes??s===0)&&h(i.eye.u)&&Pn(r,i,t),r.build()}const K={silverside:0,chromis:1,grunt:2,yellowtail:3,tang:4,sergeant:5,wrasse:6,parrot:7,angel:8,barracuda:9,redSnapper:10,grouper:11,tuna:12,mahi:13,mullet:14,needlefish:15,jack:16,tarpon:17,stingray:18,eagleRay:19,turtle:20},X=(i,e,t,s,r,a=.16)=>({from:i,to:e,rays:t,spiny:!0,h:s,rake:r,notch:a}),W=(i,e,t,s,r,a=.015)=>({from:i,to:e,rays:t,spiny:!1,h:s,rake:r,notch:a}),Ms={silverside:{pattern:K.silverside,body:.83,sec:2,top:[[0,.003],[.03,.016],[.1,.035],[.25,.058],[.45,.068],[.65,.056],[.85,.034],[1,.026]],bot:[[0,.003],[.03,.014],[.1,.032],[.25,.055],[.45,.064],[.65,.05],[.85,.03],[1,.024]],wid:[[0,.003],[.05,.016],[.2,.032],[.4,.036],[.7,.026],[1,.013]],mouth:{corner:.07,y:.004,tip:.006,protrude:0},eye:{u:.1,y:.014,r:.03},opercle:.22,scales:.02,scaleVis:.35,lateral:.05,arch:.1,dorsal:[X(.47,.53,5,[[0,.035],[1,.02]],[.5,.7],.125),W(.63,.74,9,[[0,.04],[1,.02]],[.6,.9])],anal:[W(.58,.78,12,[[0,.035],[1,.018]],[.6,.9])],pectoral:{u:.2,y:.02,len:.1,base:.018,rays:10,shape:"pointed",spread:.4},pelvic:{u:.45,len:.05,rays:5},caudal:{shape:"forked",len:.17,span:.1,fork:.5,rays:13},iris:14211264,irid:.8,metal:.65},chromis:{pattern:K.chromis,body:.76,sec:2.1,top:[[0,.005],[.03,.03],[.08,.07],[.16,.12],[.28,.158],[.42,.168],[.56,.153],[.7,.118],[.84,.074],[1,.05]],bot:[[0,.005],[.03,.024],[.08,.054],[.16,.09],[.28,.123],[.42,.133],[.56,.123],[.7,.098],[.84,.064],[1,.045]],wid:[[0,.005],[.05,.03],[.15,.05],[.3,.058],[.5,.053],[.7,.04],[.9,.024],[1,.02]],mouth:{corner:.06,y:0,tip:.004,protrude:0},eye:{u:.15,y:.05,r:.033},opercle:.27,scales:.028,scaleVis:.6,lateral:.55,arch:.15,dorsal:[X(.3,.6,12,[[0,.05],[.3,.075],[1,.07]],[.35,.5]),W(.6,.87,11,[[0,.08],[.5,.085],[1,.035]],[.6,1.1])],anal:[X(.56,.62,2,[[0,.04],[1,.06]],[.4,.5],.1),W(.62,.86,11,[[0,.08],[.4,.085],[1,.035]],[.6,1.1])],pectoral:{u:.3,y:-.01,len:.17,base:.035,rays:17,shape:"pointed",spread:.45},pelvic:{u:.33,len:.12,rays:6},caudal:{shape:"forked",len:.24,span:.19,fork:.35,rays:17},iris:4876952,irid:.15,metal:.15},grunt:{pattern:K.grunt,body:.81,sec:2.2,top:[[0,.005],[.03,.026],[.08,.055],[.16,.093],[.28,.13],[.42,.143],[.56,.135],[.7,.105],[.84,.068],[1,.048]],bot:[[0,.005],[.03,.02],[.08,.042],[.16,.072],[.28,.1],[.42,.11],[.56,.103],[.7,.083],[.84,.058],[1,.045]],wid:[[0,.005],[.05,.028],[.15,.05],[.3,.06],[.5,.056],[.7,.042],[.9,.026],[1,.021]],mouth:{corner:.1,y:-.012,tip:-.006,protrude:0},eye:{u:.14,y:.048,r:.026},opercle:.28,scales:.02,scaleVis:.5,lateral:.45,arch:.15,dorsal:[X(.31,.6,12,[[0,.05],[.25,.085],[1,.045]],[.3,.55],.175),W(.6,.84,15,[[0,.055],[.5,.06],[1,.03]],[.6,.95])],anal:[X(.62,.67,3,[[0,.03],[1,.055]],[.4,.5],.1),W(.67,.84,8,[[0,.065],[1,.03]],[.6,.9])],pectoral:{u:.31,y:-.02,len:.16,base:.03,rays:16,shape:"pointed",spread:.4},pelvic:{u:.34,len:.1,rays:6},caudal:{shape:"forked",len:.19,span:.14,fork:.55,rays:17},iris:13148224,irid:.25,metal:.25},yellowtail:{pattern:K.yellowtail,body:.77,sec:2.1,top:[[0,.004],[.03,.02],[.08,.045],[.16,.074],[.28,.099],[.42,.108],[.56,.099],[.7,.077],[.85,.051],[1,.037]],bot:[[0,.004],[.03,.016],[.08,.035],[.16,.058],[.28,.079],[.42,.089],[.56,.082],[.7,.063],[.85,.044],[1,.034]],wid:[[0,.004],[.05,.02],[.14,.036],[.28,.047],[.45,.047],[.65,.038],[.85,.026],[1,.017]],mouth:{corner:.1,y:-.008,tip:-.003,protrude:.003},eye:{u:.12,y:.038,r:.022},opercle:.26,scales:.016,scaleVis:.45,lateral:.42,arch:.12,dorsal:[X(.33,.6,10,[[0,.04],[.3,.06],[1,.04]],[.35,.55],.15),W(.6,.83,13,[[0,.045],[1,.025]],[.6,.95])],anal:[X(.62,.66,3,[[0,.025],[1,.04]],[.4,.5],.1),W(.66,.82,9,[[0,.05],[1,.025]],[.6,.9])],pectoral:{u:.3,y:-.015,len:.15,base:.025,rays:15,shape:"pointed",spread:.4},pelvic:{u:.34,len:.09,rays:6},caudal:{shape:"forked",len:.23,span:.165,fork:.36,rays:17},iris:14198832,irid:.35,metal:.3},tang:{pattern:K.tang,body:.8,sec:2,top:[[0,.006],[.03,.04],[.08,.1],[.16,.16],[.28,.21],[.42,.232],[.56,.22],[.7,.17],[.84,.095],[1,.042]],bot:[[0,.006],[.03,.035],[.08,.085],[.16,.14],[.28,.19],[.42,.215],[.56,.205],[.7,.16],[.84,.09],[1,.04]],wid:[[0,.005],[.05,.025],[.15,.04],[.3,.046],[.5,.043],[.7,.033],[.9,.02],[1,.015]],mouth:{corner:.04,y:.006,tip:.006,protrude:0},eye:{u:.17,y:.085,r:.026},opercle:.27,scales:0,scaleVis:0,lateral:.75,arch:.1,dorsal:[X(.22,.4,9,[[0,.04],[1,.07]],[.4,.5],.125),W(.4,.9,26,[[0,.07],[.6,.085],[1,.045]],[.55,.95])],anal:[X(.45,.52,3,[[0,.03],[1,.06]],[.4,.5],.1),W(.52,.9,24,[[0,.07],[.6,.08],[1,.045]],[.55,.95])],pectoral:{u:.3,y:0,len:.15,base:.03,rays:16,shape:"pointed",spread:.45},pelvic:{u:.3,len:.07,rays:5},caudal:{shape:"lunate",len:.2,span:.19,fork:.55,rays:16},iris:2767480,irid:.1,metal:.05},sergeant:{pattern:K.sergeant,body:.79,sec:2.1,top:[[0,.005],[.03,.032],[.08,.075],[.16,.13],[.28,.175],[.42,.19],[.56,.176],[.7,.138],[.84,.085],[1,.055]],bot:[[0,.005],[.03,.026],[.08,.06],[.16,.103],[.28,.143],[.42,.155],[.56,.143],[.7,.113],[.84,.073],[1,.05]],wid:[[0,.005],[.05,.03],[.15,.05],[.3,.057],[.5,.052],[.7,.04],[.9,.024],[1,.02]],mouth:{corner:.06,y:-.004,tip:0,protrude:0},eye:{u:.15,y:.055,r:.03},opercle:.28,scales:.026,scaleVis:.55,lateral:.6,arch:.15,dorsal:[X(.3,.6,13,[[0,.05],[.3,.07],[1,.065]],[.35,.5]),W(.6,.86,13,[[0,.075],[.5,.08],[1,.035]],[.6,1])],anal:[X(.56,.62,2,[[0,.04],[1,.06]],[.4,.5],.1),W(.62,.85,12,[[0,.075],[.5,.078],[1,.035]],[.6,1])],pectoral:{u:.3,y:-.01,len:.16,base:.035,rays:18,shape:"rounded",spread:.45},pelvic:{u:.33,len:.11,rays:6},caudal:{shape:"forked",len:.21,span:.17,fork:.6,rays:17},iris:12628064,irid:.1,metal:.15},wrasse:{pattern:K.wrasse,body:.84,sec:2,top:[[0,.004],[.03,.02],[.08,.042],[.18,.07],[.32,.088],[.5,.09],[.68,.075],[.85,.05],[1,.042]],bot:[[0,.004],[.03,.018],[.08,.038],[.18,.063],[.32,.08],[.5,.082],[.68,.068],[.85,.046],[1,.04]],wid:[[0,.004],[.05,.022],[.15,.038],[.3,.045],[.5,.043],[.7,.034],[.9,.022],[1,.018]],mouth:{corner:.07,y:-.004,tip:0,protrude:0},eye:{u:.13,y:.03,r:.02},opercle:.25,scales:.02,scaleVis:.35,lateral:.55,arch:.25,dorsal:[X(.28,.5,8,[[0,.03],[1,.035]],[.5,.6],.075),W(.5,.85,13,[[0,.038],[1,.03]],[.6,.8])],anal:[W(.56,.84,14,[[0,.03],[1,.028]],[.6,.8])],pectoral:{u:.24,y:0,len:.12,base:.024,rays:13,shape:"rounded",spread:.5},pelvic:{u:.28,len:.06,rays:5},caudal:{shape:"truncate",len:.16,span:.1,fork:.88,rays:13},iris:13658688,irid:.15,metal:.1},parrot:{pattern:K.parrot,body:.82,sec:2.2,top:[[0,.012],[.02,.035],[.06,.068],[.12,.098],[.22,.128],[.36,.143],[.5,.14],[.64,.118],[.78,.088],[.9,.066],[1,.058]],bot:[[0,.012],[.02,.03],[.06,.055],[.12,.083],[.22,.108],[.36,.123],[.5,.12],[.64,.103],[.78,.078],[.9,.06],[1,.055]],wid:[[0,.01],[.04,.038],[.12,.062],[.25,.077],[.45,.075],[.65,.06],[.85,.04],[1,.029]],mouth:{corner:.06,y:-.018,tip:-.012,protrude:0},eye:{u:.13,y:.052,r:.018},opercle:.27,scales:.034,scaleVis:.75,lateral:.55,arch:.3,dorsal:[X(.28,.55,9,[[0,.035],[1,.04]],[.5,.6],.075),W(.55,.84,10,[[0,.045],[1,.035]],[.6,.8])],anal:[X(.6,.64,2,[[0,.025],[1,.035]],[.5,.6],.075),W(.64,.83,9,[[0,.04],[1,.032]],[.6,.8])],pectoral:{u:.26,y:0,len:.13,base:.03,rays:13,shape:"rounded",spread:.5},pelvic:{u:.3,len:.07,rays:5},caudal:{shape:"lunate",len:.18,span:.14,fork:.62,rays:15},iris:13668400,irid:.1,metal:.05},angel:{pattern:K.angel,body:.82,sec:2,top:[[0,.006],[.03,.045],[.08,.11],[.16,.18],[.28,.24],[.42,.262],[.56,.25],[.7,.205],[.84,.13],[1,.06]],bot:[[0,.006],[.03,.04],[.08,.1],[.16,.165],[.28,.225],[.42,.25],[.56,.24],[.7,.198],[.84,.125],[1,.058]],wid:[[0,.005],[.05,.025],[.15,.04],[.3,.046],[.5,.043],[.7,.034],[.9,.02],[1,.016]],mouth:{corner:.05,y:.004,tip:.006,protrude:0},eye:{u:.18,y:.075,r:.026},opercle:.3,scales:.03,scaleVis:.9,lateral:.7,arch:.1,dorsal:[X(.34,.5,9,[[0,.035],[1,.07]],[.4,.55],.1),W(.5,.95,20,[[0,.09],[.7,.16],[.85,.2],[1,.06]],[.7,1.2])],anal:[X(.5,.58,3,[[0,.03],[1,.06]],[.4,.55],.1),W(.58,.95,18,[[0,.09],[.7,.15],[.85,.19],[1,.06]],[.7,1.2])],pectoral:{u:.33,y:0,len:.15,base:.035,rays:18,shape:"rounded",spread:.4},pelvic:{u:.32,len:.14,rays:6},caudal:{shape:"rounded",len:.18,span:.14,fork:1,rays:17},iris:13672480,irid:.05,metal:.05},barracuda:{pattern:K.barracuda,body:.87,sec:2,top:[[0,.002],[.03,.012],[.08,.025],[.16,.041],[.28,.057],[.42,.064],[.58,.063],[.72,.054],[.85,.04],[.95,.03],[1,.028]],bot:[[0,.002],[.03,.014],[.08,.028],[.16,.044],[.28,.057],[.42,.063],[.58,.061],[.72,.051],[.85,.038],[.95,.028],[1,.026]],wid:[[0,.002],[.04,.014],[.12,.028],[.25,.039],[.45,.044],[.65,.039],[.85,.028],[1,.018]],mouth:{corner:.14,y:-.006,tip:-.002,protrude:.012},eye:{u:.12,y:.018,r:.012},opercle:.24,scales:.008,scaleVis:.25,lateral:.2,arch:.05,dorsal:[X(.44,.5,5,[[0,.055],[1,.03]],[.35,.6],.1),W(.74,.8,9,[[0,.05],[1,.02]],[.55,.9])],anal:[W(.75,.81,9,[[0,.045],[1,.02]],[.55,.9])],pectoral:{u:.3,y:-.015,len:.08,base:.016,rays:12,shape:"pointed",spread:.35},pelvic:{u:.47,len:.05,rays:6},caudal:{shape:"forked",len:.13,span:.1,fork:.55,rays:17},iris:12107952,irid:.5,metal:.55},redSnapper:{pattern:K.redSnapper,body:.82,sec:2.15,top:[[0,.004],[.02,.02],[.06,.045],[.12,.075],[.2,.11],[.3,.145],[.42,.162],[.55,.155],[.68,.125],[.8,.09],[.9,.062],[1,.05]],bot:[[0,.004],[.02,.018],[.06,.035],[.12,.06],[.2,.09],[.3,.115],[.42,.132],[.55,.128],[.68,.1],[.8,.07],[.9,.054],[1,.048]],wid:[[0,.004],[.03,.02],[.1,.042],[.2,.058],[.35,.066],[.5,.062],[.65,.05],[.8,.034],[.92,.024],[1,.02]],mouth:{corner:.11,y:-.012,tip:-.004,protrude:.004},eye:{u:.135,y:.058,r:.022},opercle:.29,scales:.018,scaleVis:.7,lateral:.45,arch:.15,dorsal:[X(.34,.62,10,[[0,.045],[.3,.085],[1,.065]],[.3,.5],.175),W(.62,.86,14,[[0,.075],[.4,.078],[1,.035]],[.6,.95])],anal:[X(.64,.68,3,[[0,.03],[1,.05]],[.4,.5],.1),W(.68,.84,8,[[0,.075],[1,.035]],[.6,.9])],pectoral:{u:.34,y:-.02,len:.19,base:.034,rays:16,shape:"pointed",spread:.35},pelvic:{u:.38,len:.11,rays:6},caudal:{shape:"forked",len:.18,span:.13,fork:.78,rays:17},iris:13119520,irid:.3,metal:.25},grouper:{pattern:K.grouper,body:.84,sec:2.2,top:[[0,.006],[.03,.03],[.08,.06],[.15,.094],[.25,.128],[.38,.148],[.52,.146],[.66,.126],[.8,.094],[.92,.07],[1,.06]],bot:[[0,.006],[.03,.03],[.08,.06],[.15,.09],[.25,.12],[.38,.137],[.52,.134],[.66,.11],[.8,.08],[.92,.063],[1,.058]],wid:[[0,.006],[.04,.035],[.12,.064],[.25,.079],[.4,.081],[.6,.07],[.8,.05],[1,.03]],mouth:{corner:.16,y:-.022,tip:-.01,protrude:.008},eye:{u:.14,y:.07,r:.019},opercle:.33,scales:.011,scaleVis:.4,lateral:.55,arch:.2,dorsal:[X(.3,.6,11,[[0,.04],[.3,.07],[1,.055]],[.3,.45],.21),W(.6,.85,17,[[0,.065],[.5,.075],[1,.03]],[.55,.9])],anal:[X(.64,.68,3,[[0,.025],[1,.04]],[.4,.5],.125),W(.68,.84,8,[[0,.065],[.5,.07],[1,.035]],[.55,.9])],pectoral:{u:.33,y:-.02,len:.16,base:.04,rays:17,shape:"rounded",spread:.4},pelvic:{u:.35,len:.12,rays:6},caudal:{shape:"rounded",len:.16,span:.11,fork:1,rays:15},iris:10127968,irid:.05,metal:0},tuna:{pattern:K.tuna,body:.84,sec:2,top:[[0,.003],[.03,.02],[.08,.045],[.15,.075],[.26,.105],[.38,.118],[.5,.115],[.62,.095],[.74,.065],[.86,.035],[.95,.02],[1,.018]],bot:[[0,.003],[.03,.018],[.08,.04],[.15,.065],[.26,.092],[.38,.105],[.5,.102],[.62,.085],[.74,.058],[.86,.032],[.95,.018],[1,.016]],wid:[[0,.003],[.04,.025],[.12,.055],[.25,.08],[.4,.088],[.55,.08],[.7,.058],[.85,.035],[.95,.03],[1,.02]],mouth:{corner:.085,y:-.008,tip:-.003,protrude:.003},eye:{u:.1,y:.03,r:.022},opercle:.26,scales:0,scaleVis:0,lateral:.3,arch:.2,dorsal:[X(.3,.47,13,[[0,.07],[.3,.06],[1,.015]],[.45,.8],.1),W(.52,.6,12,[[0,.1],[.5,.05],[1,.015]],[.75,1.1])],anal:[W(.56,.63,12,[[0,.09],[.5,.045],[1,.012]],[.75,1.1])],pectoral:{u:.3,y:0,len:.2,base:.03,rays:12,shape:"falcate",spread:.3},pelvic:{u:.32,len:.06,rays:5},caudal:{shape:"lunate",len:.16,span:.25,fork:.25,rays:19},finlets:{from:.64,to:.95,dorsal:8,ventral:7},iris:12623936,irid:.9,metal:.55},mahi:{pattern:K.mahi,body:.83,sec:2,top:[[0,.016],[.005,.075],[.013,.12],[.03,.148],[.07,.16],[.18,.154],[.32,.134],[.48,.112],[.64,.088],[.8,.06],[.92,.036],[1,.026]],bot:[[0,.01],[.03,.045],[.08,.072],[.15,.09],[.3,.096],[.45,.09],[.6,.078],[.75,.06],[.9,.035],[1,.022]],wid:[[0,.008],[.04,.034],[.15,.05],[.3,.052],[.5,.045],[.7,.035],[.9,.02],[1,.015]],mouth:{corner:.075,y:-.03,tip:-.02,protrude:.004},eye:{u:.085,y:.012,r:.017},opercle:.22,scales:.007,scaleVis:.2,lateral:.25,arch:.25,dorsal:[W(.07,.97,44,[[0,.075],[.08,.105],[.3,.08],[.8,.055],[1,.03]],[.35,.9])],anal:[W(.5,.97,24,[[0,.055],[.2,.06],[1,.03]],[.5,.9])],pectoral:{u:.2,y:-.02,len:.11,base:.022,rays:16,shape:"pointed",spread:.4},pelvic:{u:.22,len:.08,rays:6},caudal:{shape:"forked",len:.17,span:.17,fork:.3,rays:17},iris:9079376,irid:.6,metal:.25},mullet:{pattern:K.mullet,body:.82,sec:2.15,top:[[0,.008],[.03,.03],[.08,.055],[.16,.08],[.28,.1],[.42,.107],[.56,.1],[.7,.082],[.84,.058],[1,.044]],bot:[[0,.008],[.03,.028],[.08,.05],[.16,.072],[.28,.088],[.42,.093],[.56,.086],[.7,.07],[.84,.05],[1,.04]],wid:[[0,.008],[.04,.036],[.12,.06],[.25,.072],[.42,.072],[.6,.06],[.8,.04],[1,.024]],mouth:{corner:.055,y:-.004,tip:0,protrude:0},eye:{u:.1,y:.024,r:.02},opercle:.25,scales:.024,scaleVis:.6,lateral:.3,arch:0,dorsal:[X(.44,.52,4,[[0,.06],[1,.035]],[.35,.6],.125),W(.66,.74,9,[[0,.06],[1,.025]],[.55,.9])],anal:[W(.62,.72,11,[[0,.055],[1,.025]],[.55,.9])],pectoral:{u:.27,y:.03,len:.13,base:.022,rays:16,shape:"pointed",spread:.45},pelvic:{u:.4,len:.08,rays:6},caudal:{shape:"forked",len:.18,span:.13,fork:.6,rays:15},iris:13154448,irid:.5,metal:.55},needlefish:{pattern:K.needlefish,body:.9,sec:2,top:[[0,.0015],[.1,.0035],[.17,.007],[.22,.017],[.28,.026],[.4,.032],[.6,.034],[.78,.03],[.9,.02],[1,.014]],bot:[[0,.0015],[.1,.0035],[.17,.007],[.22,.016],[.28,.024],[.4,.03],[.6,.032],[.78,.028],[.9,.019],[1,.013]],wid:[[0,.0015],[.1,.003],[.18,.008],[.24,.02],[.4,.026],[.7,.024],[.9,.016],[1,.012]],mouth:{corner:.2,y:0,tip:0,protrude:.006},eye:{u:.235,y:.008,r:.012},opercle:.3,scales:0,scaleVis:0,lateral:-.7,arch:0,dorsal:[W(.76,.9,14,[[0,.04],[.2,.035],[1,.018]],[.6,.95])],anal:[W(.73,.89,18,[[0,.04],[.2,.035],[1,.018]],[.6,.95])],pectoral:{u:.33,y:.006,len:.06,base:.01,rays:12,shape:"pointed",spread:.35},pelvic:{u:.62,len:.04,rays:6},caudal:{shape:"forked",len:.1,span:.06,fork:.75,rays:15},iris:13686984,irid:.6,metal:.55},jack:{pattern:K.jack,body:.78,sec:2,top:[[0,.004],[.03,.024],[.08,.055],[.16,.088],[.28,.114],[.42,.12],[.56,.107],[.7,.078],[.84,.042],[.94,.024],[1,.02]],bot:[[0,.004],[.03,.02],[.08,.046],[.16,.074],[.28,.098],[.42,.105],[.56,.094],[.7,.068],[.84,.037],[.94,.022],[1,.019]],wid:[[0,.004],[.05,.022],[.15,.04],[.3,.048],[.5,.044],[.7,.032],[.88,.02],[1,.016]],mouth:{corner:.09,y:-.006,tip:-.002,protrude:.002},eye:{u:.12,y:.03,r:.024},opercle:.26,scales:.008,scaleVis:.2,lateral:.35,arch:.45,dorsal:[X(.34,.46,8,[[0,.045],[.3,.05],[1,.02]],[.4,.7],.15),W(.47,.84,27,[[0,.075],[.15,.06],[1,.025]],[.55,1.05])],anal:[X(.54,.57,2,[[0,.02],[1,.03]],[.5,.6],.15),W(.58,.84,24,[[0,.065],[.15,.05],[1,.022]],[.55,1.05])],pectoral:{u:.29,y:0,len:.2,base:.024,rays:19,shape:"falcate",spread:.35},pelvic:{u:.31,len:.07,rays:6},caudal:{shape:"forked",len:.22,span:.19,fork:.25,rays:17},iris:13156512,irid:.7,metal:.5},tarpon:{pattern:K.tarpon,body:.8,sec:2.05,top:[[0,.004],[.03,.02],[.08,.045],[.16,.075],[.28,.1],[.42,.11],[.56,.102],[.7,.08],[.84,.052],[1,.036]],bot:[[0,.004],[.03,.022],[.08,.05],[.16,.078],[.28,.098],[.42,.105],[.56,.098],[.7,.077],[.84,.05],[1,.034]],wid:[[0,.004],[.05,.025],[.15,.044],[.3,.052],[.5,.05],[.7,.04],[.88,.026],[1,.018]],mouth:{corner:.13,y:.004,tip:.018,protrude:.014},eye:{u:.09,y:.028,r:.022},opercle:.22,scales:.05,scaleVis:1,lateral:.05,arch:.05,dorsal:[W(.45,.56,13,[[0,.07],[.6,.06],[.93,.05],[1,.2]],[.45,.95])],anal:[W(.64,.78,20,[[0,.07],[.3,.05],[1,.02]],[.5,.95])],pectoral:{u:.24,y:-.06,len:.13,base:.02,rays:13,shape:"pointed",spread:.5},pelvic:{u:.43,len:.08,rays:9},caudal:{shape:"forked",len:.2,span:.17,fork:.35,rays:19},iris:12632240,irid:.3,metal:.8},stingray:{pattern:K.stingray,body:1,eye:{u:.3,y:.05,r:.012},opercle:.4,mouth:{corner:.1,y:-.03,tip:-.03},lateral:0,arch:0,scales:0,scaleVis:0,iris:6316096,irid:0,metal:0},eagleRay:{pattern:K.eagleRay,body:1,eye:{u:.2,y:.05,r:.014},opercle:.3,mouth:{corner:.1,y:-.03,tip:-.03},lateral:0,arch:0,scales:0,scaleVis:0,iris:4210752,irid:0,metal:0},turtle:{pattern:K.turtle,body:1,eye:{u:.1,y:.04,r:.013},opercle:.2,mouth:{corner:.05,y:0,tip:0},lateral:0,arch:0,scales:0,scaleVis:0,iris:3153936,irid:0,metal:0}},Tn={silverside:{back:7178874,flank:12897486,belly:15133418,fin:11056302,edge:10003616,rough:.3},chromis:{back:1522296,flank:2581688,belly:5605572,fin:2974384,edge:791588,rough:.4},grunt:{back:11045420,flank:14466106,belly:15130032,fin:14199856,edge:13146660,rough:.4},yellowtail:{back:5663378,flank:10397374,belly:15722212,fin:14468726,edge:14860352,rough:.35},tang:{back:1190252,flank:2245280,belly:2771624,fin:2375574,edge:6988508,rough:.45},sergeant:{back:12889148,flank:13028028,belly:15132380,fin:11184792,edge:9079424,rough:.4},wrasse:{back:13941790,flank:14994492,belly:15658708,fin:14469782,edge:13152368,rough:.4},parrot:{back:1927756,flank:3054202,belly:7126172,fin:3971706,edge:13400666,rough:.4},angel:{back:921106,flank:1184278,belly:1447450,fin:921106,edge:2892816,rough:.45},barracuda:{back:3556940,flank:11844800,belly:15133420,fin:5923940,edge:2896948,rough:.3},redSnapper:{back:12073532,flank:14183018,belly:15649988,fin:13384756,edge:12069924,rough:.33},grouper:{back:8020552,flank:11836540,belly:14208180,fin:7232064,edge:3944484,rough:.4},tuna:{back:923176,flank:6714506,belly:14080734,fin:1975856,edge:1448482,rough:.28},mahi:{back:1203306,flank:13481258,belly:15721114,fin:2907292,edge:1854620,rough:.3},mullet:{back:4741206,flank:11844798,belly:15133418,fin:8686732,edge:7107700,rough:.33},needlefish:{back:3569260,flank:11848908,belly:15659762,fin:7771790,edge:4613740,rough:.3},jack:{back:5666444,flank:12372176,belly:15133934,fin:8819868,edge:3949644,rough:.3},tarpon:{back:3558492,flank:13949660,belly:15659250,fin:8819868,edge:5002844,rough:.28},stingray:{back:7102540,flank:8023126,belly:14210768,fin:4997686,edge:9075814,rough:.5},eagleRay:{back:1316894,flank:1843240,belly:14738146,fin:1053720,edge:2764342,rough:.35},turtle:{back:4076064,flank:8808506,belly:13154436,fin:4866616,edge:10130048,rough:.45}},Ln=new Y({name:"lodFade",code:`
// Bayer 4x4 threshold in (0, 1): bit-interleaved formula of
//   0  8  2 10 / 12  4 14  6 / 3 11  1  9 / 15  7 13  5
fn bayer4( pixel: vec2f ) -> f32 {
	let f = frame.frameIndex;
	// shift the pattern by a different offset every frame (all 16 over 16 frames)
	let p = vec2u( pixel ) + vec2u( f * 3u, ( f >> 2u ) * 1u );
	let x0 = p.x & 1u; let x1 = ( p.x >> 1u ) & 1u;
	let y0 = p.y & 1u; let y1 = ( p.y >> 1u ) & 1u;
	let v = ( ( x0 ^ y0 ) << 3u ) | ( y0 << 2u ) | ( ( x1 ^ y1 ) << 1u ) | y1;
	return ( f32( v ) + 0.5 ) / 16.0;
}

fn lodFadeVisible( pixel: vec2f, fade: f32, outgoing: bool ) -> bool {
	let t = bayer4( pixel );
	return select( ( t < fade ), ( t >= fade ), outgoing );
}
`}),Fn=8,Si=Object.keys(K).sort((i,e)=>K[i]-K[e]);function Dn(){const i=[],e=t=>new ke(t);for(const t of Si){const s=Ms[t],r=Tn[t],a=e(r.back),n=e(r.flank),h=e(r.belly),o=e(r.fin),l=e(r.edge),c=e(s.iris),u=s.body;i.push(new G(a.r,a.g,a.b,s.metal*.55),new G(n.r,n.g,n.b,s.irid),new G(h.r,h.g,h.b,r.rough),new G(o.r,o.g,o.b,s.mouth.tip),new G(l.r,l.g,l.b,s.scales),new G(c.r,c.g,c.b,s.scaleVis),new G(.5-s.eye.u*u,s.eye.y,s.eye.r,.5-s.opercle*u),new G(s.lateral,s.arch,.5-s.mouth.corner*u,s.mouth.y))}return new ue("FishSkin",{rows:[`vec4f[${i.length}]`,i]},{label:"fishSkin"})}let Lr=null;const Bn=()=>Lr||(Lr=Dn()),es=i=>{const e=String(i);return e.includes(".")||e.includes("e")?e:e+".0"},J=i=>es(K[i]),q=i=>es(j[i]);let It=null;function Rn(){return It||(It=new Y({name:"fish",deps:[Z,Ln],uniforms:Bn(),uniformName:"fishSkin",code:`
fn fishRotateQ( q: vec4f, v: vec3f ) -> vec3f { return v + cross( q.xyz, cross( q.xyz, v ) + v * q.w ) * 2.0; }
fn fishRow( pattern: f32, k: i32 ) -> vec4f { return fishSkin.rows[ clamp( i32( pattern ), 0, ${Si.length-1} ) * ${Fn} + k ]; }
fn fishPartOf( d: vec4f ) -> f32 { return floor( d.y + 0.01 ); }
fn fishJawOf( d: vec4f ) -> f32 { return max( fract( d.y + 0.01 ) - 0.01, 0.0 ) / 0.9; }

fn fishHash( p: vec2f ) -> f32 { return fract( sin( dot( p, vec2f( 127.1, 311.7 ) ) ) * 43758.5453 ); }

// value noise 2D (cheap, for blotches and skin variation)
fn fishVnoise( p: vec2f ) -> f32 {
	let i = floor( p ); let f = fract( p );
	let w = f * f * ( 3.0 - f * 2.0 );
	let a = fishHash( i ); let b = fishHash( i + vec2f( 1.0, 0.0 ) ); let c = fishHash( i + vec2f( 0.0, 1.0 ) ); let d = fishHash( i + vec2f( 1.0, 1.0 ) );
	return mix( mix( a, b, w.x ), mix( c, d, w.x ), w.y );
}

// posterior edge of the gill cover (local z) at height fraction h: convex backward, sweeping
// forward under the throat
fn fishOpercleEdge( zOp: f32, h: f32 ) -> f32 { return zOp - 0.028 * ( 1.0 - h * h ) + smoothstep( -0.35, -1.0, h ) * 0.07; }
fn fishOpercleMask( h: f32 ) -> f32 { return smoothstep( -0.98, -0.9, h ) * ( 1.0 - smoothstep( 0.45, 0.62, h ) ); }

fn fishBand( x: f32, center: f32, width: f32, soft: f32 ) -> f32 { return 1.0 - smoothstep( width, width + soft, abs( x - center ) ); }

// Deformation as a function of the phase (evaluated for this and the previous frame):
// fish: travelling body wave (amplitude grows toward the tail) plus the turning bend,
// sculling pectorals; rays: the disc margins undulate (stingray) or flap (eagle ray);
// turtle: the front flippers stroke, the hind ones paddle.
// d = aData, p = rest position, amp = wave amplitude, bend = turning bend at this vertex
fn fishSwimOffset( ph: f32, d: vec4f, p: vec3f, env: f32, amp: f32, bend: f32, eagle: bool ) -> vec3f {
	let u = d.x;
	let part = fishPartOf( d );
	let isDisc = part == ${q("DISC")};
	let isFlip = part == ${q("FLIPPER")};
	let turtle = part > ${es(j.WHIP+.5)};
	let side = d.z; // rays: distance from the midline; flippers: along the flipper
	let lat = sin( ph - u * 5.6 ) * env * amp + bend;
	let flap = select( 0.0, sin( ph * 0.7 + 1.3 ) * d.z * 0.035, part == ${q("PECTORAL")} );
	let fish = vec3f( lat + flap * sign( p.x ), 0.0, 0.0 );
	let k = select( 8.0, 1.2, eagle );
	let disc = vec3f( 0.0, sin( ph - u * k ) * pow( side, 1.6 ) * amp, 0.0 );
	let front = d.w < 1.5;
	let stroke = vec3f( 0.0, sin( ph ) * select( 0.07, 0.3, front ), cos( ph ) * select( 0.0, 0.14, front ) ) * side;
	return select( select( select( fish, vec3f( 0.0 ), turtle ), stroke, isFlip ), disc, isDisc );
}

// eye colour: pupil, iris with radial streaks, dark rim
fn fishEyeCol( r: f32, ang: f32, irisC: vec3f, cloudy: f32 ) -> vec3f {
	let streak = sin( ang * 26.0 ) * 0.5 + 0.5;
	let irisL = dot( irisC, vec3f( 0.3, 0.59, 0.11 ) );
	let iris = irisC * min( 1.0, 0.36 / max( irisL, 1e-3 ) ) * mix( 0.6, 1.05, streak ) * ( smoothstep( 0.55, 0.72, r ) * 0.45 + 0.5 );
	let ring = smoothstep( 0.8, 0.97, r );
	var e = mix( iris, vec3f( 0.025, 0.025, 0.028 ), ring );
	e = mix( e, vec3f( 0.004, 0.005, 0.007 ), 1.0 - smoothstep( 0.5, 0.56, r ) );
	// cloudy eyes of fish out of the water for a while
	e = mix( e, vec3f( 0.42, 0.44, 0.46 ), cloudy * 0.55 * ( 1.0 - smoothstep( 0.7, 1.0, r ) ) );
	return e;
}
`}),It)}const In={vFishLocal:"vec3f",vFishData:"vec4f",vFishInfo:"vec4f",vFishFlags:"vec4f",vFishFade:"vec2f"};function $n(i,e){let t;e?t=`let fe = ${i.fadeEntry()};
	let ri = fe.index;
	o.vFishFade = vec2f( fe.fade, fe.outgoing );`:t=`let ri = ${i.recordIndex()};
	o.vFishFade = vec2f( 1.0, 0.0 );`;const s=i.record("ri");return`
	${t}
	let r0 = ${s[0]}; let q = ${s[1]}; let r2 = ${s[2]}; let r3 = ${s[3]};`}function Nn(i,e){return`
	${$n(i,e)}
	let d = v.aData;
	let u = d.x;
	var p = v.position;
	o.vFishLocal = p;
	o.vFishData = d;
	o.vFishInfo = vec4f( floor( r2.w ), fract( r2.w ), r0.w, 0.0 );
	o.vFishFlags = vec4f( 0.0 );
	let pattern = floor( r2.w );
	let env = ( u * u * 0.85 + 0.08 ) * ( smoothstep( 0.0, 0.25, u ) * 0.7 + 0.3 );
	let bend = r2.z * ( u * u );
	let eagle = pattern == ${J("eagleRay")};
	let off = fishSwimOffset( r2.x, d, p, env, r2.y, bend, eagle );
	p += off;
	// the fish's own motion since the last frame (position change + swimming wave): motion vectors
	let delta = fishRotateQ( q, off - fishSwimOffset( r2.x - r3.w, d, v.position, env, r2.y, bend, eagle ) ) * r0.w + r3.xyz;
	v.useWorld = true;
	v.worldNormal = fishRotateQ( q, v.normal );
	v.worldPos = fishRotateQ( q, p * r0.w ) + r0.xyz;
	v.prevWorldPos = v.worldPos - delta;`}const En=`
	if ( ! lodFadeVisible( in.pixel, in.vs.vFishFade.x, in.vs.vFishFade.y > 0.5 ) ) { discard; }`,Wn=`
	let D = in.vs.vFishData; let Lp = in.vs.vFishLocal; let I = in.vs.vFishInfo;
	let pattern = floor( I.x + 0.5 );
	let part = fishPartOf( D );
	let scaleSize = fishRow( pattern, 4 ).w; let scaleVis = fishRow( pattern, 5 ).w;
	// scale rows: posterior margins are arcs, rows offset by half a scale
	let ss = max( scaleSize, 0.004 );
	// gentle waviness of the scale rows (in scale units: big scales stay in orderly rows)
	let warp = ( sin( Lp.z * 23.0 + D.z * 31.0 ) * 0.35 + sin( Lp.z * 41.0 - D.z * 17.0 ) * 0.25 ) * mix( 1.0, 0.3, smoothstep( 0.015, 0.045, scaleSize ) );
	let sa = ( 0.5 - Lp.z ) / ss + warp; let sb = D.z / ( ss * 0.8 ) + warp * 0.6;
	let rowI = floor( sb );
	let fb = fract( sb ) * 2.0 - 1.0;
	let sf = fract( sa + rowI * 0.5 + fb * fb * 0.32 );
	// pixel footprint (m) against the scale size (m): fade out sub-pixel detail
	let Pv = ( frame.view * vec4f( in.P, 1.0 ) ).xyz;
	let px = length( fwidth( Pv ) );
	let sfade = ( 1.0 - smoothstep( 0.25, 0.7, px / ( ss * I.z ) ) ) * select( 0.0, 1.0, scaleSize > 0.001 );

	// ---- relief
	var bumpH = 0.0;
	{
		let isBody = part == ${q("BODY")};
		let L = I.z;
		// scales: each rises toward its free posterior margin
		let sc = smoothstep( 0.0, 0.9, sf ) * ( 1.0 - smoothstep( 0.9, 1.0, sf ) ) * sfade * scaleVis;
		// gill cover: raised in front of its edge
		let eyeOp = fishRow( pattern, 6 );
		let h = D.w;
		let zE = fishOpercleEdge( eyeOp.w, h );
		let onOp = fishOpercleMask( h );
		let op = smoothstep( -0.004, 0.004, Lp.z - zE ) * onOp;
		let grainFade = 1.0 - smoothstep( 0.3, 0.8, px / ( 0.004 * I.z ) );
		let grain = ( fishVnoise( vec2f( Lp.z, D.z ) * 420.0 ) - 0.5 ) * 0.00022 * grainFade;
		let bodyH = sc * 0.0016 + op * 0.0025 + grain;
		// fin rays: ridges
		let isFin = part > 0.5 && part < 7.5;
		let rd = abs( fract( D.w + 0.5 ) - 0.5 );
		let ray = ( 1.0 - smoothstep( 0.0, 0.25, rd ) ) * 0.0004;
		bumpH = select( select( 0.0, ray, isFin ), bodyH, isBody ) * L;
	}
	let dhdx = dpdx( bumpH ); let dhdy = dpdy( bumpH );`;function On(i,e){return`
	${Wn}
	${e?En:""}
	var rough = 0.4;
	var metal = 0.0;
	var transl = 0.0;
	var coat = 0.0;
	var spec = 0.5;
	let seed = I.y; let L = I.z;
	let pat = pattern;
	let P = part;
	let u = D.x; let h = D.w; let sd = D.z;
	let z = Lp.z; let y = Lp.y;
	let t = D.z; let w = D.w; // fins: along / across the rays
	let isBody = P == ${q("BODY")};
	let isFin = P > 0.5 && P < 7.5;
	let bodyK = select( 0.0, 1.0, isBody );
	let r0 = fishRow( pat, 0 ); let r1 = fishRow( pat, 1 ); let r2 = fishRow( pat, 2 ); let r3 = fishRow( pat, 3 );
	let r4 = fishRow( pat, 4 ); let r5 = fishRow( pat, 5 ); let r6 = fishRow( pat, 6 ); let r7 = fishRow( pat, 7 );
	let back = r0.xyz; let flank = r1.xyz; let belly = r2.xyz;
	let finC = r3.xyz; let edgeC = r4.xyz; let irisC = r5.xyz;
	let eye = r6; let lat = r7;
	let flags = in.vs.vFishFlags;
	let n1 = fishVnoise( vec2f( z, y ) * 38.0 + seed * 17.0 );
	let n2 = fishVnoise( vec2f( z, sd ) * 11.0 + seed * 5.0 );
	let fwW = fwidth( w ); let fwH = fwidth( h );

	// ---- counter-shading
	let tBack = smoothstep( 0.2, 0.75, h );
	let tBelly = 1.0 - smoothstep( -0.7, -0.1, h );
	var c = mix( mix( flank, back, tBack ), belly, tBelly );
	let silver = 1.0 - tBack * 0.75; // guanine reflection weight
	metal = r0.w * silver * bodyK;
	rough = r2.w;
	// scales: a thin shadow line under each free margin, the exposed field slightly brighter
	// toward the margin
	let scaleShade = smoothstep( 0.3, 0.9, sf ) * sfade * scaleVis;
	let pocket = smoothstep( 0.88, 0.97, sf ) * ( 1.0 - smoothstep( 0.97, 1.0, sf ) ) * sfade * scaleVis;
	let cellK = ( fishHash( vec2f( floor( sa + floor( sb ) * 0.5 ), floor( sb ) ) ) - 0.5 ) * 0.1 * sfade * scaleVis;
	// (on silvery skin the pocket is a thin line: the mirror-like scale reflects its own light)
	c *= mix( 1.0, 0.96 + scaleShade * 0.07 - pocket * mix( 0.14, 0.06, r0.w ) + cellK, bodyK );
	c *= mix( 1.0, n1 * 0.14 + 0.93, bodyK );
	c *= mix( 1.0, n2 * 0.2 + 0.9, bodyK );
	rough = mix( rough, rough * mix( 0.8, 1.25, n2 ), bodyK );

	// ---- fins: ray-striped membranes, darker and thinner toward the edge
	if ( isFin && P != ${q("FINLET")} ) {
		var fin = mix( finC, edgeC, smoothstep( 0.4, 1.0, t ) );
		let rd = abs( fract( w + 0.5 ) - 0.5 );
		let rayW = select( 0.06, 0.1, P == ${q("DORSAL1")} );
		let ray = ( 1.0 - smoothstep( rayW, fwW * 1.2 + rayW + 0.04, rd ) ) * ( 1.0 - smoothstep( 0.2, 0.6, fwW ) );
		fin *= mix( 0.9, 1.06, ray );
		// thicker and darker where the fin joins the body, thinnest at the edge
		fin *= smoothstep( 0.0, 0.15, t ) * 0.2 + 0.8;
		c = fin;
		transl = mix( 0.8, 0.55, ray ) * ( smoothstep( 0.0, 0.3, t ) * 0.4 + 0.6 );
		// paired fins: the fin colour, a little lighter toward the edge (thin membrane)
		let paired = P == ${q("PECTORAL")} || P == ${q("PELVIC")};
		c = select( c, c * mix( 0.85, 1.1, smoothstep( 0.2, 1.0, t ) ), paired );
		transl *= select( 1.0, 0.45, paired );
		rough = 0.4;
	}

	// ---- species markings (body; some on fins)
	if ( pat == ${J("silverside")} ) {
		// silver lateral band with a dark upper edge; translucent green back
		let bandK = fishBand( h, 0.02, 0.1, fwH + 0.05 ) * bodyK;
		c = mix( c, vec3f( 0.78, 0.82, 0.84 ), bandK * 0.8 );
		c = mix( c, vec3f( 0.12, 0.2, 0.2 ), fishBand( h, 0.14, 0.015, fwH + 0.02 ) * bodyK * 0.6 );
		metal += bandK * 0.25;
	} else if ( pat == ${J("chromis")} ) {
		// dark margins on the tail lobes, azure line from the snout through the eye
		let lobe = select( 0.0, smoothstep( 5.5, 7.5, abs( w - 8.0 ) ), P == ${q("CAUDAL")} );
		c = mix( c, vec3f( 0.01, 0.015, 0.03 ), lobe );
		let lineK = fishBand( y - ( z - eye.x ) * 0.35, eye.y + 0.015, 0.004, 0.003 ) * smoothstep( eye.x - 0.02, eye.x + 0.05, z ) * bodyK;
		c = mix( c, vec3f( 0.3, 0.6, 0.95 ), lineK * 0.7 );
	} else if ( pat == ${J("grunt")} ) {
		// French grunt: yellow with oblique blue-silver stripes (straight above the lateral
		// line); bluestriped grunt: straight blue stripes. Red mouth.
		let blue = fract( seed * 3.7 ) < 0.4;
		let above = smoothstep( 0.35, 0.45, h );
		let slope = select( mix( 0.45, 0.0, above ), 0.0, blue );
		let sv = sin( ( y - z * slope ) * select( 150.0, 190.0, blue ) );
		let stripe = smoothstep( 0.45, 0.8, sv ) * bodyK * ( 1.0 - tBelly * 0.7 );
		let lineC = select( vec3f( 0.52, 0.6, 0.7 ), vec3f( 0.12, 0.26, 0.55 ), blue );
		c = mix( c, lineC, stripe * select( 0.7, 0.9, blue ) );
	} else if ( pat == ${J("yellowtail")} ) {
		// yellow stripe from the snout widening into the yellow tail; yellow spots on the back
		let wS = mix( 0.006, 0.035, smoothstep( 0.1, -0.25, z ) );
		let stripe = fishBand( y - 0.004, 0.0, wS, 0.004 ) * bodyK;
		let qq = vec2f( z, y ) * 70.0;
		let cell = floor( qq );
		let j = ( vec2f( fishHash( cell + 3.1 ), fishHash( cell + 7.7 ) ) - 0.5 ) * 0.5;
		let rr = fishHash( cell + 1.3 ) * 0.14 + 0.1;
		let spots = ( 1.0 - smoothstep( rr, rr + 0.12, length( fract( qq ) - 0.5 - j ) ) ) * step( 0.4, fishHash( cell + seed ) ) * tBack * bodyK;
		c = mix( c, vec3f( 0.85, 0.62, 0.05 ), max( stripe, spots * 0.8 ) );
		c = mix( c, vec3f( 0.86, 0.66, 0.06 ), select( 0.0, 1.0, P == ${q("CAUDAL")} ) );
	} else if ( pat == ${J("tang")} ) {
		// fine dark wavy lines, pale scalpel at the tail base
		let lines = smoothstep( 0.75, 0.95, sin( y * 170.0 + z * 30.0 + n1 * 3.0 ) ) * 0.3 * bodyK;
		c *= 1.0 - lines;
		let spine = ( 1.0 - smoothstep( 0.01, 0.02, length( vec2f( z + 0.27, y * 1.5 ) ) ) ) * bodyK;
		c = mix( c, vec3f( 0.85, 0.8, 0.55 ), spine );
		c = mix( c, edgeC, select( 0.0, smoothstep( 0.8, 1.0, t ), isFin ) );
	} else if ( pat == ${J("sergeant")} ) {
		// five black bars from behind the head to the tail stalk (a faint sixth on the peduncle), a dark
		// spot at the base of the pectoral fin
		let barsP = smoothstep( 0.45, 0.7, sin( ( z - 0.215 ) * 52.0 + 1.57 ) ) * smoothstep( -0.29, -0.24, z ) * ( 1.0 - smoothstep( 0.225, 0.26, z ) );
		let sixth = fishBand( z, -0.33, 0.012, 0.01 ) * 0.4;
		let bars = max( barsP, sixth ) * ( 1.0 - tBelly * 0.8 );
		c = mix( c, vec3f( 0.02, 0.02, 0.03 ), bars * select( select( 0.0, 0.4, isFin ), 0.92, isBody ) );
		let pecSpot = ( 1.0 - smoothstep( 0.012, 0.02, length( vec2f( z - eye.w + 0.03, y + 0.005 ) ) ) ) * bodyK;
		c = mix( c, vec3f( 0.03, 0.035, 0.05 ), pecSpot * 0.8 );
	} else if ( pat == ${J("wrasse")} ) {
		// bluehead wrasse: yellow initial phase with a dark midlateral stripe; blue-headed males
		let male = fract( seed * 7.1 ) < 0.15;
		let stripe = fishBand( h, 0.05, 0.1, fwH + 0.04 ) * bodyK * smoothstep( 0.25, 0.1, z );
		let female = mix( c, vec3f( 0.04, 0.04, 0.03 ), stripe * 0.9 );
		let head = smoothstep( 0.12, 0.17, z );
		let collar = fishBand( z, 0.13, 0.012, 0.006 );
		let maleC = mix( mix( vec3f( 0.1, 0.42, 0.28 ), vec3f( 0.05, 0.14, 0.62 ), head ), vec3f( 0.02, 0.02, 0.02 ), collar * bodyK );
		c = select( female, maleC, male );
	} else if ( pat == ${J("parrot")} ) {
		// stoplight (terminal phase: green, pink / orange marks, yellow spot on the gill cover)
		// or queen parrotfish (blue-green, orange-pink marks around the mouth)
		let queen = fract( seed * 4.3 ) < 0.4;
		let base = select( vec3f( 0.1, 0.42, 0.26 ), vec3f( 0.06, 0.34, 0.42 ), queen );
		c = mix( c, base * mix( 0.8, 1.1, scaleShade ), bodyK * 0.75 );
		let mark = fishBand( y - ( z - 0.3 ) * 0.4, -0.03, 0.008, 0.008 ) * smoothstep( 0.18, 0.35, z ) * bodyK;
		c = mix( c, select( vec3f( 0.85, 0.45, 0.32 ), vec3f( 0.75, 0.42, 0.28 ), queen ), mark );
		let spot = ( 1.0 - smoothstep( 0.01, 0.02, length( vec2f( z - eye.w - 0.02, y - 0.05 ) ) ) ) * bodyK;
		c = mix( c, vec3f( 0.88, 0.72, 0.12 ), spot * select( 1.0, 0.0, queen ) );
	} else if ( pat == ${J("angel")} ) {
		// French angelfish: black, yellow rims on the scales, yellow face and eye ring
		let rims = smoothstep( 0.72, 0.95, sf ) * max( sfade, 0.35 ) * bodyK;
		c = mix( c, vec3f( 0.62, 0.48, 0.06 ), rims * 0.6 );
		let face = smoothstep( 0.4, 0.43, z ) * bodyK;
		c = mix( c, vec3f( 0.55, 0.45, 0.2 ), face * 0.6 );
		let er0 = length( vec2f( z - eye.x, y - eye.y ) ) / eye.z;
		let ringA = smoothstep( 1.05, 1.2, er0 ) * ( 1.0 - smoothstep( 1.45, 1.65, er0 ) ) * bodyK;
		c = mix( c, vec3f( 0.7, 0.52, 0.06 ), ringA * 0.85 );
	} else if ( pat == ${J("barracuda")} ) {
		// dark oblique bars on the upper flank, black blotches on the lower rear flank
		let bars = smoothstep( 0.35, 0.8, sin( z * 58.0 + h * 1.5 + n1 ) ) * smoothstep( 0.2, 0.55, h ) * bodyK;
		c *= 1.0 - bars * 0.45;
		let bl = smoothstep( 0.6, 0.78, n2 ) * smoothstep( 0.1, -0.25, z ) * ( 1.0 - smoothstep( -0.3, 0.2, h ) ) * bodyK;
		c = mix( c, vec3f( 0.03, 0.03, 0.035 ), bl * 0.9 );
		c = mix( c, vec3f( 0.75, 0.78, 0.8 ), select( 0.0, smoothstep( 0.85, 1.0, t ) * smoothstep( 5.0, 7.0, abs( w - 8.0 ) ), P == ${q("CAUDAL")} ) );
	} else if ( pat == ${J("redSnapper")} ) {
		// rose red back fading to a silvery pink belly; rows of scales show as fine oblique lines
		let rows = smoothstep( 0.6, 0.95, sin( y * 210.0 + z * 120.0 ) ) * max( sfade, 0.3 ) * bodyK * 0.15;
		c *= 1.0 - rows;
	} else if ( pat == ${J("grouper")} ) {
		// Nassau grouper: dark brown bars, a band from the snout through the eye, a black saddle
		// on the tail stalk, dark spots around the eye
		let zz = 0.5 - z;
		let wob = ( n2 - 0.5 ) * 0.03;
		let bars = smoothstep( 0.2, 0.6, sin( ( zz + wob ) * 34.0 - 1.2 ) ) * smoothstep( 0.3, 0.38, zz ) * smoothstep( 0.86, 0.78, zz ) * ( 1.0 - tBelly * 0.85 );
		let stripe = fishBand( y - eye.y - ( z - eye.x ) * 0.25, 0.0, 0.008, 0.006 ) * smoothstep( eye.x - 0.08, eye.x, z ) * smoothstep( 0.5, 0.45, z );
		let saddle = smoothstep( 0.4, 0.7, h ) * fishBand( zz, 0.8, 0.025, 0.01 );
		let spots = smoothstep( 0.72, 0.85, fishVnoise( vec2f( z, y ) * 160.0 + seed * 3.0 ) ) * smoothstep( eye.x - 0.12, eye.x, z );
		let dark = max( max( bars * 0.85, stripe * 0.85 ), max( saddle, spots * 0.7 ) ) * bodyK;
		c = mix( c, vec3f( 0.13, 0.085, 0.05 ), dark );
		let pale = smoothstep( 0.86, 0.93, fishVnoise( vec2f( z, y ) * 150.0 + 9.0 ) ) * bodyK * 0.2;
		c = mix( c, vec3f( 0.85, 0.8, 0.72 ), pale );
	} else if ( pat == ${J("tuna")} ) {
		// blackfin tuna: sharp dark back, bronze band, pale bars on the belly, dusky yellow finlets
		let bronze = fishBand( h, 0.28, 0.05, fwH + 0.06 ) * smoothstep( 0.3, 0.2, z ) * bodyK;
		c = mix( c, vec3f( 0.42, 0.34, 0.14 ), bronze * 0.6 );
		c = mix( c, back, smoothstep( 0.28, 0.4, h ) * bodyK );
		let bars = smoothstep( 0.6, 0.9, sin( z * 95.0 ) ) * smoothstep( 0.0, -0.3, h ) * smoothstep( 0.2, 0.1, z ) * bodyK;
		c = mix( c, vec3f( 0.85, 0.88, 0.9 ), bars * 0.35 );
		c = mix( c, vec3f( 0.55, 0.48, 0.16 ), select( 0.0, 0.85, P == ${q("FINLET")} ) );
	} else if ( pat == ${J("mahi")} ) {
		// mahi-mahi: blue-green back, golden flanks with scattered blue spots
		let cell = floor( vec2f( z, y ) * 55.0 );
		let jit = vec2f( fishHash( cell + 3.1 ), fishHash( cell + 7.7 ) ) - 0.5;
		let fc = fract( vec2f( z, y ) * 55.0 ) - 0.5 - jit * 0.55;
		let rs = mix( 0.1, 0.24, fishHash( cell + 1.3 ) );
		let spots = ( 1.0 - smoothstep( rs, rs + 0.1, length( fc * vec2f( 1.0, 1.25 ) ) ) ) * step( 0.45, fishHash( cell + seed * 7.0 ) ) * bodyK * ( 1.0 - tBelly );
		c = mix( c, vec3f( 0.08, 0.22, 0.5 ), spots * 0.75 );
		c = mix( c, vec3f( 0.2, 0.5, 0.3 ), smoothstep( 0.0, 0.5, h ) * bodyK * 0.35 );
	} else if ( pat == ${J("mullet")} ) {
		// faint dark stripes along the scale rows of the upper flank
		let lines = smoothstep( 0.7, 0.95, sin( sd * 280.0 ) ) * smoothstep( -0.1, 0.3, h ) * bodyK * 0.25;
		c *= 1.0 - lines;
	} else if ( pat == ${J("needlefish")} ) {
		// dark blue lateral stripe, dark beak
		let stripe = fishBand( h, 0.0, 0.06, fwH + 0.05 ) * bodyK;
		c = mix( c, vec3f( 0.12, 0.25, 0.45 ), stripe * 0.6 );
		c = mix( c, vec3f( 0.12, 0.16, 0.16 ), smoothstep( 0.32, 0.36, z ) * bodyK * 0.7 );
	} else if ( pat == ${J("jack")} ) {
		// bar jack: black stripe along the base of the dorsal fin into the lower tail lobe,
		// electric blue below it
		let top = fishBand( h, 0.82, 0.06, fwH + 0.05 ) * smoothstep( 0.2, 0.05, z ) * bodyK;
		let blue = fishBand( h, 0.68, 0.05, fwH + 0.05 ) * smoothstep( 0.2, 0.05, z ) * bodyK;
		c = mix( c, vec3f( 0.15, 0.45, 0.9 ), blue * 0.5 );
		c = mix( c, vec3f( 0.02, 0.03, 0.05 ), top * 0.85 );
		let lobe = select( 0.0, smoothstep( 7.5, 5.5, w ) * smoothstep( 0.1, 0.3, t ), P == ${q("CAUDAL")} );
		c = mix( c, vec3f( 0.02, 0.03, 0.05 ), lobe * 0.8 );
	} else if ( pat == ${J("tarpon")} ) {
		// huge scales with dark edges
		let rims = smoothstep( 0.8, 0.97, sf ) * sfade * bodyK;
		c *= 1.0 - rims * 0.35;
	}

	// ---- lateral line (a row of pores along a dark line)
	let hl = lat.x + lat.y * ( 1.0 - smoothstep( 0.12, 0.55, u ) );
	let lineK = fishBand( h, hl, fwH * 0.5 + 0.012, fwH + 0.008 ) * bodyK * smoothstep( 0.18, 0.25, u ) * smoothstep( 0.9, 0.8, u );
	c *= 1.0 - lineK * 0.3;

	// ---- gill cover edge and the preopercle (dark creases); gills show red on dead fish
	let zE = fishOpercleEdge( eye.w, h );
	let dOp = z - zE;
	let onOp = fishOpercleMask( h ) * bodyK;
	let crease = ( 1.0 - smoothstep( 0.0015, 0.004, abs( dOp ) ) ) * onOp;
	c *= 1.0 - crease * 0.45;
	let pre = ( 1.0 - smoothstep( 0.001, 0.003, abs( dOp - 0.04 ) ) ) * onOp * smoothstep( 0.6, 0.2, h );
	c *= 1.0 - pre * 0.2;
	let gill = smoothstep( 0.0, -0.0015, dOp ) * smoothstep( -0.007, -0.003, dOp ) * onOp * smoothstep( 0.0, -0.5, h ) * flags.w;
	c = mix( c, vec3f( 0.3, 0.03, 0.035 ), gill * 0.8 );

	// ---- lips (the mouth line from the snout to the corner), the edge of the upper jaw bone
	// and the nostrils
	let hz = lat.z; let hy = lat.w; let tipY = r3.w;
	let mt = clamp( ( z - hz ) / ( 0.5 - hz ), 0.0, 1.0 );
	let yLip = mix( hy, tipY, mt );
	let lips = ( 1.0 - smoothstep( 0.0015, 0.0035, abs( y - yLip ) ) ) * step( hz - 0.004, z ) * bodyK;
	c *= 1.0 - lips * 0.55;
	let maxZ = hz + 0.006 - ( y - hy ) * 0.35;
	let maxilla = ( 1.0 - smoothstep( 0.001, 0.0025, abs( z - maxZ ) ) ) * smoothstep( hy - 0.002, hy + 0.002, y ) * smoothstep( hy + 0.04, hy + 0.025, y ) * bodyK;
	c *= 1.0 - maxilla * 0.3;
	let nostril = ( 1.0 - smoothstep( 0.1, 0.2, length( vec2f( z - eye.x - eye.z * 1.7, y - eye.y - eye.z * 0.25 ) ) / eye.z ) ) * bodyK;
	c *= 1.0 - nostril * 0.6;

	// ---- painted eye (under the dome where there is one)
	let er = length( vec2f( z - eye.x, y - eye.y ) ) / eye.z;
	let painted = ( 1.0 - smoothstep( 0.95, 1.1, er ) ) * bodyK;
	c = mix( c, fishEyeCol( er, atan2( y - eye.y, z - eye.x ), irisC, flags.x ), painted );
	metal *= 1.0 - painted;

	// ---- eye dome: pupil, iris, glossy cornea
	if ( P == ${q("EYE")} ) {
		let r = length( vec2f( t, w ) );
		c = fishEyeCol( r, atan2( w, t ), irisC, flags.x );
		c = mix( c, flank * 0.6, smoothstep( 0.93, 1.0, r ) );
		rough = mix( 0.04, 0.3, flags.x );
		spec = 1.0;
		metal = 0.0;
	} else if ( P == ${q("MOUTH")} ) {
		// inside of the mouth: pale pink lips to a dark throat (grunts are red inside)
		let lip = select( vec3f( 0.5, 0.3, 0.3 ), vec3f( 0.6, 0.08, 0.06 ), pat == ${J("grunt")} );
		c = mix( lip, vec3f( 0.03, 0.012, 0.012 ), smoothstep( 0.05, 0.85, t ) );
		metal = 0.0;
		rough = 0.35;
	} else if ( P == ${q("FLESH")} ) {
		// cut face: muscle rings around the backbone, bone and blood at the centre
		let r = length( vec2f( t, w * 1.2 ) );
		let dark = select( 0.0, 1.0, pat == ${J("tuna")} );
		let meat = mix( vec3f( 0.62, 0.36, 0.32 ), vec3f( 0.3, 0.035, 0.035 ), dark );
		let rings = smoothstep( 0.6, 0.95, sin( r * 520.0 + atan2( w, abs( t ) ) * 2.0 ) ) * 0.12;
		var m = meat * ( 1.0 - rings );
		let bone = 1.0 - smoothstep( 0.006, 0.009, length( vec2f( t, w - 0.004 ) ) );
		m = mix( m, vec3f( 0.75, 0.68, 0.58 ), bone );
		m = mix( m, vec3f( 0.3, 0.02, 0.02 ), ( 1.0 - smoothstep( 0.01, 0.03, r ) ) * 0.5 * ( 1.0 - bone ) );
		// skin rim
		c = m;
		metal = 0.0;
		rough = 0.3;
		transl = 0.3;
	} else if ( P == ${q("FILLET")} ) {
		// salted, sun dried flesh: pale and translucent at the thin edges, muscle chevrons,
		// salt crystals
		let ax = abs( t );
		let chev = smoothstep( 0.55, 0.9, sin( ( w + ax * 0.35 ) * 160.0 ) ) * 0.1;
		var m = mix( vec3f( 0.36, 0.26, 0.13 ), vec3f( 0.52, 0.42, 0.26 ), smoothstep( 0.35, 1.0, ax ) ) * ( 1.0 - chev );
		let salt = step( 0.94, fishHash( floor( vec2f( t, w ) * 900.0 ) ) );
		m = mix( m, vec3f( 0.8, 0.8, 0.78 ), salt * 0.6 );
		m *= mix( 0.9, 1.05, n1 );
		c = m;
		metal = 0.0;
		rough = 0.6;
		transl = mix( 0.25, 0.8, smoothstep( 0.5, 1.0, ax ) );
	} else if ( P == ${q("ICE")} ) {
		// glassy crushed ice: dim albedo (light passes into it), sharp glints
		c = vec3f( 0.3, 0.4, 0.46 ) * mix( 0.8, 1.15, fract( t * 7.3 ) );
		rough = mix( 0.04, 0.2, fract( w * 5.1 ) );
		metal = 0.0;
		transl = 0.9;
		spec = 1.0;
	} else if ( P == ${q("LEAF")} ) {
		// banana leaf: glossy green, pale midrib, fine parallel veins
		let ax = abs( t );
		let veins = smoothstep( 0.6, 0.95, sin( w * 420.0 + ax * 60.0 ) ) * 0.12;
		var lc = mix( vec3f( 0.025, 0.08, 0.015 ), vec3f( 0.05, 0.13, 0.025 ), n2 ) * ( 1.0 - veins );
		lc = mix( lc, vec3f( 0.25, 0.3, 0.1 ), 1.0 - smoothstep( 0.015, 0.03, ax ) );
		lc = mix( lc, vec3f( 0.25, 0.22, 0.08 ), smoothstep( 0.9, 1.0, ax ) * 0.6 );
		c = lc;
		metal = 0.0;
		rough = 0.28;
		transl = 0.25;
	} else if ( P == ${q("DISC")} || P == ${q("WHIP")} ) {
		// rays: sandy, finely mottled back (stingray) or black with white rings (eagle ray);
		// white belly
		let top = w > 0.0;
		let eagleK = select( 0.0, 1.0, pat == ${J("eagleRay")} );
		let qq = vec2f( Lp.x, Lp.z ) * 20.0;
		let cell = floor( qq );
		let jit = ( vec2f( fishHash( cell + 1.7 ), fishHash( cell + 5.3 ) ) - 0.5 ) * 0.4;
		let rad = fishHash( cell + 9.1 ) * 0.14 + 0.12;
		let ring = abs( length( fract( qq ) - 0.5 - jit ) - rad );
		let spots = ( 1.0 - smoothstep( 0.035, 0.075, ring ) ) * step( 0.45, fishHash( cell ) );
		let mottle = fishVnoise( vec2f( Lp.x, Lp.z ) * 60.0 ) * 0.25 + n2 * 0.2 + 0.7;
		var dorsal = mix( back * mottle, mix( back, vec3f( 0.75, 0.78, 0.8 ), spots * 0.85 ), eagleK );
		dorsal = mix( dorsal, edgeC, smoothstep( 0.8, 1.0, t ) * 0.4 * ( 1.0 - eagleK ) );
		c = select( belly, dorsal, top );
		c = select( c, finC, P == ${q("WHIP")} );
		metal = 0.0;
		rough = r2.w;
	} else if ( P == ${q("CARAPACE")} ) {
		// green turtle shell: scutes (vertebral row, costals, marginals) with dark seams and
		// radiating olive / brown / amber streaks
		let X = t; let Y = w;
		let ax = abs( X );
		let rr = length( vec2f( X, Y ) );
		let vert = ax < 0.3;
		let ySeams = select( vec4f( -0.42, -0.02, 0.36, 2.0 ), vec4f( -0.58, -0.22, 0.14, 0.5 ), vert );
		let yc = Y + ax * ax * 0.25;
		let dY = min( min( abs( yc - ySeams.x ), abs( yc - ySeams.y ) ), min( abs( yc - ySeams.z ), abs( yc - ySeams.w ) ) );
		let dX = abs( ax - 0.3 );
		let marg = rr > 0.84;
		let angle = atan2( Y, X );
		let dM = min( abs( rr - 0.84 ), abs( fract( angle * ${es(12/Math.PI)} ) - 0.5 ) * 0.25 );
		let seam = min( select( min( dY, dX ), dM, marg ), abs( rr - 0.84 ) );
		let streak = sin( atan2( yc - ( floor( yc * 2.8 ) + 0.5 ) / 2.8, X - sign( X ) * 0.55 ) * 11.0 + n2 * 6.0 ) * 0.5 + 0.5;
		let blotch = smoothstep( 0.45, 0.8, fishVnoise( vec2f( X, Y ) * 9.0 ) );
		var shell = mix( back, flank, streak * 0.55 + blotch * 0.45 );
		shell = mix( shell, vec3f( 0.2, 0.14, 0.06 ), smoothstep( 0.6, 0.9, n1 ) * 0.4 );
		shell *= mix( 0.45, 1.0, smoothstep( 0.003, 0.012, seam ) );
		c = shell;
		metal = 0.0;
		rough = 0.35;
	} else if ( P == ${q("SKIN")} || P == ${q("FLIPPER")} ) {
		// scaly grey-brown skin with pale scale margins; pale yellow plastron
		let qq = vec2f( Lp.x + Lp.y, Lp.z ) * 55.0;
		let rowS = floor( qq.y );
		let q2 = qq + vec2f( rowS * 0.5, 0.0 );
		let ff = fract( q2 ) - 0.5;
		let scale = smoothstep( 0.32, 0.47, max( abs( ff.x ), abs( ff.y ) ) );
		let tone = fishHash( floor( q2 ) ) * 0.35 + 0.8;
		let skin = mix( finC * tone, edgeC, scale * 0.45 );
		c = select( skin, belly * mix( 0.85, 1.05, n1 ), w > 1.5 && P == ${q("SKIN")} );
		metal = 0.0;
		rough = 0.5;
	} else if ( P == ${q("SHELL")} ) {
		// spiny lobster: red-brown carapace with cream spots, banded legs
		let sp = vec2f( t, w ) * 12.0;
		let spots = ( 1.0 - smoothstep( 0.18, 0.3, length( fract( sp ) - 0.5 ) ) ) * step( 0.6, fishHash( floor( sp ) ) );
		var sh = mix( vec3f( 0.16, 0.045, 0.03 ), vec3f( 0.32, 0.1, 0.04 ), n1 );
		sh = mix( sh, vec3f( 0.7, 0.55, 0.22 ), spots * 0.85 );
		c = sh;
		metal = 0.0;
		rough = 0.35;
	}

	// iridescent sheen on silvery skin at grazing angles
	let cosV = abs( dot( in.N, in.V ) );
	let irid = r1.w * bodyK * silver * ( 1.0 - cosV );
	let hueA = vec3f( 0.55, 0.95, 0.8 ); let hueB = vec3f( 0.95, 0.6, 1.0 );
	c = mix( c, c * mix( hueA, hueB, cosV ) * 1.25, irid * 0.6 );

	s.albedo = c;
	s.roughness = rough;
	s.metalness = metal;
	// The reference (three r186) reads specularIntensityNode (the 'fishSpec' var) before the colour
	// function assigns it, so the var reads its zero default there: the fish have no dielectric
	// specular in the reference (only metal / grazing reflections; verified headless against the
	// original: with a constant 0.5 it gains exactly the port's highlights). FISH_SPECULAR selects: 'reference' (look of the three.js app) or 'intended' (0.5,
	// 1.0 on eyes and ice, as the code was written).
	s.specularIntensity = spec;
	s.normal = perturbNormalByHeight( in.P, in.N, dhdx, dhdy, 1.0 );
	// translucencyNode: lightColor * albedo * transl * 0.5 (the engine multiplies by the light)
	s.translucency = c * ( transl * 0.5 );
`}function Un(i,e,t){return new ot({name:e,roughness:.4,metalness:0,modules:[Rn(),i.module],attributes:{aData:"vec4f",aKind:"f32"},varyings:In,...t})}function Vn(i,{fade:e=!1}={}){return Un(i,e?"FishFade":"Fish",{vertex:Nn(i,e),surface:On(!1,e)})}function Gn(i){return i.split(/[^A-Za-z0-9]+/).filter(Boolean).map((t,s)=>s===0?t[0].toLowerCase()+t.slice(1):t[0].toUpperCase()+t.slice(1)).join("")}class Hn{constructor(e,t,{maxInstances:s,dynamic:r=!1,fade:a=!1}){this.name=e,this.kinds=t;const n=t.length;this.maxInstances=s,this.dynamic=r;const h=this.prefix=Gn(e);let o=0,l=0;for(const A of t)o+=A.geometry.attributes.position.count,l+=A.geometry.index.count;const c=new Float32Array(o*3),u=new Float32Array(o*3),f=new Float32Array(o*4),m=new Float32Array(o),y=new Uint32Array(l);this.firstIndex=new Uint32Array(n),this.indexCount=new Uint32Array(n),this.baseVertex=new Uint32Array(n);let d=0,v=0;t.forEach((A,p)=>{const g=A.geometry,S=g.attributes.position.count;c.set(g.attributes.position.array,d*3),u.set(g.attributes.normal.array,d*3),g.attributes.aData&&f.set(g.attributes.aData.array,d*4),m.fill(p,d,d+S),y.set(g.index.array,v),this.firstIndex[p]=v,this.indexCount[p]=g.index.count,this.baseVertex[p]=d,A.triangles=g.index.count/3,A.vertices=S,d+=S,v+=g.index.count});const x=new Se;x.setAttribute("position",new ae(c,3)),x.setAttribute("normal",new ae(u,3)),x.setAttribute("aData",new ae(f,4)),x.setAttribute("aKind",new ae(m,1)),x.setIndex(new ae(y,1)),this.vertexCount=o,this.data=new Float32Array(s*16),this.instanceBuffer=new pe({label:e+".instances",count:s*4,type:"vec4f"});const b=this;this.dataAttr={set needsUpdate(A){A&&b.upload()}};const w=s*2;this.list=new Uint32Array(w),this.listBuffer=new pe({label:e+".list",count:w,type:"u32"}),this.baseArray=new Uint32Array(Math.max(n,4)),this.baseBuffer=new pe({label:e+".base",count:this.baseArray.length,type:"u32"}),this.commands=new Uint32Array(n*5),this.indirectBuffer=new pe({label:e+".indirect",count:n*5,type:"u32",usage:["indirect"]}),this.offsetPool=[[],[]],this.mainOffsets=[],this.shadowOffsets=[],x.indirect={buffer:this.indirectBuffer,offsets:this.mainOffsets},this.geometry=x,this.pairKind=new Uint16Array(w),this.pairId=new Uint32Array(w),this.pairs=0,this.counts=new Uint32Array(n),this.cursor=new Uint32Array(n),this.visibleInstances=0,this.visibleTriangles=0,this.shadowTriangles=0,this.mesh=null,this.fadeMesh=null,this.fadeOffsets=[],this.fadeInstances=0;const M={[h+"Instances"]:{storage:this.instanceBuffer,access:"read"},[h+"List"]:{storage:this.listBuffer,access:"read"},[h+"Base"]:{storage:this.baseBuffer,access:"read"}};let z=`
fn ${h}RecordIndex( kind: u32, instance: u32 ) -> u32 { return ${h}List[ ${h}Base[ kind ] + instance ]; }
fn ${h}Record( index: u32, k: u32 ) -> vec4f { return ${h}Instances[ index * 4u + k ]; }
`;if(a){this.fadeList=new Uint32Array(w),this.fadeListBuffer=new pe({label:e+".fadeList",count:w,type:"u32"}),this.fadeBaseArray=new Uint32Array(Math.max(n,4)),this.fadeBaseBuffer=new pe({label:e+".fadeBase",count:this.fadeBaseArray.length,type:"u32"}),this.fadeCommands=new Uint32Array(n*5),this.fadeIndirectBuffer=new pe({label:e+".fadeIndirect",count:n*5,type:"u32",usage:["indirect"]});const A=new Se;for(const p in x.attributes)A.setAttribute(p,x.attributes[p]);A.setIndex(x.index),A.indirect={buffer:this.fadeIndirectBuffer,offsets:this.fadeOffsets},this.fadeGeometry=A,this.fadeKind=new Uint16Array(w),this.fadeVal=new Uint32Array(w),this.fadePairs=0,this.fadeCounts=new Uint32Array(n),this.fadeCursor=new Uint32Array(n),this.fadePool=[],M[h+"FadeList"]={storage:this.fadeListBuffer,access:"read"},M[h+"FadeBase"]={storage:this.fadeBaseBuffer,access:"read"},z+=`
struct ${h}FadeInfo { index: u32, fade: f32, outgoing: f32 };
// fade channel: the instance record index, its fade (0..1) and whether this draw is the
// outgoing level (1) or the incoming one (0)
fn ${h}FadeEntry( kind: u32, instance: u32 ) -> ${h}FadeInfo {
	let e = ${h}FadeList[ ${h}FadeBase[ kind ] + instance ];
	return ${h}FadeInfo( e & 0xffffffu, f32( ( e >> 24u ) & 127u ) / 127.0, f32( e >> 31u ) );
}
`}this.module=new Y({name:"batch-"+h,bindings:M,code:z})}fadeEntry(){return`${this.prefix}FadeEntry( u32( v.aKind ), v.instance )`}addFade(e,t,s,r){const a=this.fadePairs++;this.fadeKind[a]=e;const n=Math.round(Math.min(1,Math.max(0,s))*127);this.fadeVal[a]=(t&16777215|n<<24|(r?2147483648:0))>>>0,this.fadeCounts[e]++}createFadeMesh(e){const t=new je(this.fadeGeometry,e);t.name=this.name+".fade",t.frustumCulled=!1,t.castShadow=!1,t.receiveShadow=!0,t.matrixAutoUpdate=!1;const s=this.fadeGeometry;return t.onBeforeRender=()=>{s.indirect.offsets=this.fadeOffsets},this.fadeMesh=t,t}recordIndex(){return`${this.prefix}RecordIndex( u32( v.aKind ), v.instance )`}record(e){return[0,1,2,3].map(t=>`${this.prefix}Record( ${e}, ${t}u )`)}createMesh(e,{castShadow:t=!1,receiveShadow:s=!0}={}){const r=new je(this.geometry,e);r.name=this.name,r.frustumCulled=!1,r.castShadow=t,r.receiveShadow=s,r.matrixAutoUpdate=!1;const a=this.geometry;return r.onBeforeRender=(n,h,o)=>{const l=o&&(o.isOrthographicCamera||o.reversedDepth===!1);a.indirect.offsets=l?this.shadowOffsets:this.mainOffsets},this.mesh=r,r}upload(){this.instanceBuffer.write(this.data)}begin(){this.pairs=0,this.counts.fill(0),this.fadeList&&(this.fadePairs=0,this.fadeCounts.fill(0))}add(e,t){const s=this.pairs++;this.pairKind[s]=e,this.pairId[s]=t,this.counts[e]++}offsets(e,t){const s=this.offsetPool[e];return s[t]||(s[t]=new Array(t).fill(0))}commit(){const e=this.kinds.length,t=this.commands,s=this.baseArray,r=this.counts,a=this.cursor;let n=0,h=0,o=0,l=0,c=0;for(let b=0;b<e;b++){const w=r[b];s[b]=n,a[b]=n;const M=b*5;t[M]=this.indexCount[b],t[M+1]=w,t[M+2]=this.firstIndex[b],t[M+3]=this.baseVertex[b],t[M+4]=0,w>0&&(this.kinds[b].shadow&&o++,this.kinds[b].shadowOnly||h++),n+=w}const u=this.list,f=this.pairKind,m=this.pairId;for(let b=0;b<this.pairs;b++)u[a[f[b]]++]=m[b];const y=this.offsets(0,h),d=this.offsets(1,o);let v=0,x=0;for(let b=0;b<e;b++){const w=r[b];if(w===0)continue;const M=this.kinds[b];M.shadowOnly||(y[v++]=b*20,l+=w*M.triangles),M.shadow&&(d[x++]=b*20,c+=w*M.triangles)}this.mainOffsets=y,this.shadowOffsets=d,this.geometry.indirect.offsets=y,this.fadeList&&this.commitFade(),this.visibleInstances=n,this.visibleTriangles=l,this.shadowTriangles=c,n>0&&this.listBuffer.write(u.subarray(0,n)),this.baseBuffer.write(s),this.indirectBuffer.write(t)}commitFade(){const e=this.kinds.length,t=this.fadeCommands,s=this.fadeBaseArray,r=this.fadeCounts,a=this.fadeCursor;let n=0,h=0;for(let y=0;y<e;y++){const d=r[y];s[y]=n,a[y]=n;const v=y*5;t[v]=this.indexCount[y],t[v+1]=d,t[v+2]=this.firstIndex[y],t[v+3]=this.baseVertex[y],t[v+4]=0,d>0&&!this.kinds[y].shadowOnly&&h++,n+=d}const o=this.fadeList,l=this.fadeKind,c=this.fadeVal;for(let y=0;y<this.fadePairs;y++)o[a[l[y]]++]=c[y];const u=this.fadePool[h]||(this.fadePool[h]=new Array(h).fill(0));let f=0,m=0;for(let y=0;y<e;y++)r[y]===0||this.kinds[y].shadowOnly||(u[f++]=y*20,m+=r[y]*this.kinds[y].triangles);this.fadeOffsets=u,this.fadeGeometry.indirect.offsets=u,this.fadeInstances=n,this.visibleTriangles+=m,n>0&&this.fadeListBuffer.write(o.subarray(0,n)),this.fadeBaseBuffer.write(s),this.fadeIndirectBuffer.write(t),this.fadeMesh&&(this.fadeMesh.visible=h>0)}dispose(){this.geometry.dispose(),this.fadeGeometry&&this.fadeGeometry.dispose();for(const e of[this.instanceBuffer,this.listBuffer,this.baseBuffer,this.indirectBuffer,this.fadeListBuffer,this.fadeBaseBuffer,this.fadeIndirectBuffer])e&&e.destroy();this.mesh&&this.mesh.removeFromParent()}}function Mi(i){let e=i>>>0;return function(){e|=0,e=e+1831565813|0;let s=Math.imul(e^e>>>15,1|e);return s=s+Math.imul(s^s>>>7,61|s)^s,((s^s>>>14)>>>0)/4294967296}}function at(i){return Math.atan2(Math.sin(i),Math.cos(i))}function Fr(i,e,t){return i+at(e-i)*t}const qn=7,jn=4,Xn=8,Kn=.7,Yn=.95,Zn=1.15,Qn=1.85,Jn=.72,Dr=1.45;function Br(i,e){return Math.max(-e,Math.min(e,i))}function Rr(i,e){return 1-Math.exp(-i/Math.max(e,1e-4))}function Ir(i,e){for(let t=0;t<i.length;t++){const s=i[t];s.seek===e&&(s.seek=null,s.cruiseHeading=s.heading)}}function eo(i,e,t,s){let r=at(e-i.heading);Math.PI-Math.abs(r)<.22&&(r=(Math.abs(i.yawRate)>.02?Math.sign(i.yawRate):i.turnSign||1)*Math.abs(r)),Math.abs(r)>.25&&(i.turnSign=Math.sign(r)||i.turnSign||1);const a=Br(r*Qn,t),n=Math.sqrt(2*Dr*Math.abs(r)),h=Math.abs(n)<Math.abs(a)?Math.sign(r||a)*Math.min(t,n):a,o=h-i.yawRate,c=(h*i.yawRate<0||Math.abs(h)<Math.abs(i.yawRate)-1e-6?Dr:Jn)*s;i.yawRate+=Br(o,c),i.heading=at(i.heading+i.yawRate*s)}function to({fish:i=46,halfW:e=8,halfH:t=4.5,cx:s=0,cy:r=0,seed:a=7}={}){const n=Mi(a),h=Math.max(1,Math.min(80,i|0)),o=[],l=[],c=[],u={x:s+e*.06,y:r-t*.04};let f=1,m=0,y=0;const d={halfW:e,halfH:t,cx:s,cy:r},v=Math.max(4,Math.round(h*.34));for(let p=0;p<h;p++){const g=p<v,S=n(),_=S<.34?0:S<.6?1:S<.8?2:3,C=1.05+n()*.7;let P,D,$;if(g){const F=n()*Math.PI*2,H=Math.sqrt(n())*Math.min(e,t)*.22;P=u.x+Math.cos(F)*H,D=u.y+Math.sin(F)*H*.72,$=F+.4}else{const F=n()*Math.PI*2,H=.15+Math.sqrt(n())*.72;P=s+Math.cos(F)*e*H*.78,D=r+Math.sin(F)*t*H*.78,$=n()*Math.PI*2}o.push({x:P,y:D,heading:$,aim:$,yawRate:0,turnSign:0,cruiseHeading:$,sep:0,speed:.45+n()*.25,cruise:.52+n()*.38,len:C,phase:n()*Math.PI*2,hz:4.2+n()*2.4,pattern:_,seed:n()*20+.2,school:g,orbit:.35+n()*.95,seek:null,seekDist:99,z:.08+n()*.1})}function x(p,g,S){c.push({x:p,y:g,age:0,amp:S}),c.length>Xn&&c.shift()}function b(p){for(let g=0;g<l.length;g++)if(l[g].id===p)return l[g];return null}function w(p,g,S=0,_=0){d.halfW=Math.max(.5,p),d.halfH=Math.max(.5,g),d.cx=S,d.cy=_;const C=d.halfW*.84,P=d.halfH*.8;for(const D of o)D.x=Math.min(d.cx+C,Math.max(d.cx-C,D.x)),D.y=Math.min(d.cy+P,Math.max(d.cy-P,D.y))}function M(p,g){const S=(p-d.cx)/d.halfW,_=(g-d.cy)/d.halfH;if(S*S+_*_>1.2)return!1;if(l.length>=jn){const $=l.shift();Ir(o,$.id)}const C={id:f++,x:p,y:g,life:9,splashed:!1};l.push(C),x(p,g,1);const P=o.map(($,F)=>({index:F,d:Math.hypot($.x-p,$.y-g)})).sort(($,F)=>$.d-F.d),D=Math.min(qn,P.length);for(let $=0;$<D;$++)o[P[$].index].seek=C.id;return!0}function z(p,g){const S=p.seek!=null?b(p.seek):null;p.seek!=null&&!S&&(p.seek=null,p.cruiseHeading=p.heading);let _=p.cruiseHeading;if(S)p.seekDist=Math.hypot(S.x-p.x,S.y-p.y),p.seekDist<.28?_=p.aim:_=Math.atan2(S.y-p.y,S.x-p.x);else if(p.school){const N=m*.08+p.phase,Q=u.x+Math.cos(N)*p.orbit,Me=u.y+Math.sin(N*.9)*p.orbit*.7,he=Math.hypot(Q-p.x,Me-p.y);p.seekDist=99,_=he<.35?p.aim:Math.atan2(Me-p.y,Q-p.x)}else{p.seekDist=99;const N=Math.sin(m*.085+p.phase*1.7)*.1+Math.sin(m*.037+p.seed)*.04;p.cruiseHeading=at(p.cruiseHeading+N*g),_=p.cruiseHeading}const C=(p.x-d.cx)/(d.halfW*.8),P=(p.y-d.cy)/(d.halfH*.76),D=C*C+P*P;let $=!1;if(D>.62){const N=Math.atan2(d.cy-p.y,d.cx-p.x),Q=Math.min(.9,(D-.62)*1.15);_=Fr(_,N,Q),$=D>1}let F=0,H=0;const O=Math.max(.2,p.len*.16);for(let N=0;N<o.length;N++){const Q=o[N];if(Q===p)continue;const Me=p.x-Q.x,he=p.y-Q.y,Pe=Me*Me+he*he,ze=(p.len+Q.len)*.28;if(Pe<ze*ze&&Pe>1e-8){const _t=Math.sqrt(Pe),se=(ze-_t)/_t;F+=Me*se,H+=he*se}}let R=0;if(F!==0||H!==0){let N=at(Math.atan2(H,F)-_);N=Math.max(-.5,Math.min(.5,N));const Q=S&&p.seekDist<O*2.2;R=N*(Q?.16:.32)}if(p.sep+=(R-p.sep)*Rr(g,.55),_=at(_+p.sep),!(S&&p.seekDist<.28&&D<=.62)){let N=S?.34:p.school?.4:.82;D>.62&&(N=Math.min(N,.36)),p.aim=Fr(p.aim,_,Rr(g,N))}const te=$?Zn:S?Yn:Kn;eo(p,p.aim,te,g);let T=p.cruise*(.92+.08*Math.sin(m*.22+p.phase));if(S){const N=p.seekDist<.7?Math.max(.22,p.seekDist/.7):1;T=p.cruise*1.75*N}const V=1.1*g;p.speed+=Math.max(-V,Math.min(V,T-p.speed)),p.x+=Math.cos(p.heading)*p.speed*g,p.y+=Math.sin(p.heading)*p.speed*g;const I=d.halfW*.86,B=d.halfH*.82;(p.x>d.cx+I||p.x<d.cx-I||p.y>d.cy+B||p.y<d.cy-B)&&(p.x=Math.min(d.cx+I,Math.max(d.cx-I,p.x)),p.y=Math.min(d.cy+B,Math.max(d.cy-B,p.y))),S&&p.seekDist<O&&(S.life-=g*2.4,p.speed*=.9,S.splashed||(S.splashed=!0,x(S.x,S.y,.55)))}function A(p){const g=Math.max(0,Math.min(p,.1));if(g!==0){m+=g,u.x=d.cx+Math.cos(m*.07)*d.halfW*.16,u.y=d.cy+Math.sin(m*.05)*d.halfH*.14;for(let S=0;S<o.length;S++)z(o[S],g);for(let S=c.length-1;S>=0;S--)c[S].age+=g,c[S].age>8&&c.splice(S,1);for(let S=l.length-1;S>=0;S--){const _=l[S];_.life-=g*.28,_.life<=0&&(y++,x(_.x,_.y,.35),l.splice(S,1),Ir(o,_.id))}}}return{fish:o,foods:l,ripples:c,bounds:d,get time(){return m},get eaten(){return y},step:A,feed:M,setBounds:w}}const zs=new ue("PondWake",{rings:["vec4f[8]",new Float32Array(32)],bounds:["vec4f",[8,4.5,0,0]]},{label:"pondWake"}),so=`
struct WakeFrag { slopes: vec2f, foam: f32, aeration: f32 }

fn wakeHeight(xz: vec2f) -> f32 {
  var h = 0.0;
  for (var i = 0u; i < 8u; i = i + 1u) {
    let rip = pondWake.rings[i];
    if (rip.w <= 0.01) { continue; }
    let dist = length(xz - rip.xy);
    let x = dist - rip.z * 0.38;
    let env = exp(-rip.z * 0.2) * rip.w;
    let gauss = exp(-x * x * 2.4);
    h += sin(x * 7.2) * gauss * env * 0.07;
  }
  return h;
}

fn wakeDisplacement(xz: vec2f) -> vec3f {
  return vec3f(0.0, wakeHeight(xz), 0.0);
}

fn wakeFragment(xz: vec2f) -> WakeFrag {
  var slope = vec2f(0.0);
  var foam = 0.0;
  for (var i = 0u; i < 8u; i = i + 1u) {
    let rip = pondWake.rings[i];
    if (rip.w <= 0.01) { continue; }
    let o = xz - rip.xy;
    let dist = max(length(o), 0.04);
    let x = dist - rip.z * 0.38;
    let env = exp(-rip.z * 0.2) * rip.w;
    let gauss = exp(-x * x * 2.4);
    let s = sin(x * 7.2);
    let c = cos(x * 7.2);
    let dh = (c * 7.2 * gauss + s * gauss * (-4.8 * x)) * env * 0.07;
    slope += (o / dist) * dh;
    foam += sat(s) * gauss * env * 0.18;
  }
  var w: WakeFrag;
  w.slopes = slope;
  w.foam = foam;
  w.aeration = foam * 0.12;
  return w;
}

fn pondShore(p: vec2f) -> f32 {
  let q = (p - pondWake.bounds.zw) / max(pondWake.bounds.xy, vec2f(0.001));
  return smoothstep(0.72, 1.18, length(q * vec2f(1.0, 1.04)));
}
`,zi=new Y({name:"pondWake",deps:[Z],uniforms:zs,uniformName:"pondWake",code:so}),ro=new Y({name:"pondBed",code:`
fn terrainHeightAt(xz: vec2f) -> f32 { return -1.12; }
fn terrainNormalRock(xz: vec2f) -> vec4f { return vec4f(0.0); }
fn terrainNormalRockLevel(xz: vec2f, level: f32) -> vec4f { return vec4f(0.0); }
fn terrainSunShadowAt(P: vec3f) -> f32 { return 1.0; }
`}),io=new Y({name:"pondSky",code:`
fn skyReflectionRadiance(dir: vec3f) -> vec3f {
  let h = sat(dir.y * 0.55 + 0.08);
  return mix(vec3f(0.58, 0.7, 0.64), vec3f(0.34, 0.55, 0.64), h);
}
fn skyRadianceWithClouds(dir: vec3f, withSun: bool) -> vec3f {
  let disk = select(0.0, pow(sat(dot(dir, frame.sunDir)), 1400.0) * 8.0, withSun);
  return skyReflectionRadiance(dir) + vec3f(disk);
}
`});function ao(){return new ot({name:"pond-floor",roughness:.92,metalness:0,modules:[zi],underwaterLighting:"full",surface:`
      let p = in.P.xz;
      let shore = pondShore(p);
      let q = length((p - pondWake.bounds.zw) / max(pondWake.bounds.xy, vec2f(0.001)));
      let n = mx_noise_float2(p * 0.85);
      let n2 = mx_noise_float2(p * 3.4 + vec2f(2.0, 5.0));
      let deep = vec3f(0.045, 0.16, 0.12);
      let midc = vec3f(0.09, 0.28, 0.2);
      let shallow = vec3f(0.2, 0.42, 0.26);
      var col = mix(shallow, midc, smoothstep(0.08, 0.5, q));
      col = mix(col, deep, smoothstep(0.45, 1.0, q));
      col *= 0.9 + 0.16 * n + 0.08 * n2;
      col = mix(col, vec3f(0.04, 0.07, 0.045), shore * 0.72);
      s.albedo = col;
      s.roughness = mix(0.86, 0.98, shore);
      s.emissive = vec3f(0.0);
    `})}function no(){return new ot({name:"food",roughness:.7,metalness:0,underwaterLighting:"full",surface:`
      let q = in.uv * 2.0 - 1.0;
      let r = length(q);
      s.albedo = mix(vec3f(0.72, 0.42, 0.14), vec3f(0.38, 0.2, 0.07), smoothstep(0.15, 0.95, r));
      s.alpha = 1.0;
    `})}function oo(){return new ot({name:"plants",roughness:.72,metalness:0,transparent:!0,depthWrite:!1,underwaterLighting:"none",attributes:{aPlant:"vec4f"},varyings:{vPlant:"vec4f"},vertex:`
      o.vPlant = v.aPlant;
      v.position.y += sin(frame.time * 0.55 + v.aPlant.w) * 0.012;
    `,surface:`
      let kind = in.vs.vPlant.x;
      let seed = in.vs.vPlant.y;
      let shade = in.vs.vPlant.z;
      let q = in.uv * 2.0 - 1.0;
      let ang = atan2(q.y, q.x);
      let rad = length(q);
      var col = vec3f(0.1, 0.35, 0.14);
      var mask = 1.0;
      if (kind < 0.5) {
        let n = mx_noise_float2(q * 1.7 + seed);
        let lobes = 0.7 + 0.3 * pow(sat(0.5 + 0.5 * cos(ang * 3.0 + seed)), 0.55);
        let r = rad / lobes * (0.88 + 0.2 * n);
        mask = smoothstep(1.06, 0.7, r);
        col = mix(vec3f(0.03, 0.14, 0.05), vec3f(0.14, 0.34, 0.1), shade);
        col = mix(col, col * 0.62, smoothstep(0.4, 0.95, rad));
      } else if (kind < 1.5) {
        let n = mx_noise_float2(q * 2.8 + seed);
        let scallop = 0.045 * sin(ang * 8.0 + seed);
        let r = rad * (0.9 + 0.1 * n) - scallop;
        let dAng = abs(atan2(sin(ang - 0.18), cos(ang - 0.18)));
        let notch = smoothstep(0.5, 0.04, dAng) * smoothstep(0.16, 0.7, rad);
        mask = smoothstep(1.02, 0.86, r) * (1.0 - notch);
        let veins = pow(abs(cos(ang * 5.0 + seed * 0.2)), 10.0) * smoothstep(0.05, 0.7, rad);
        col = mix(vec3f(0.05, 0.26, 0.08), vec3f(0.2, 0.48, 0.14), shade);
        col = mix(vec3f(0.03, 0.16, 0.05), col, smoothstep(0.0, 0.38, rad));
        col = mix(col, vec3f(0.34, 0.58, 0.18), smoothstep(0.7, 0.98, rad) * 0.65);
        col = mix(col, col * 0.45, veins);
      } else {
        let petals = pow(sat(0.64 + 0.36 * cos(ang * 7.0 + seed)), 0.7);
        let petalRad = rad / max(petals, 0.35);
        mask = smoothstep(1.0, 0.62, petalRad) * smoothstep(0.0, 0.05, rad);
        let center = smoothstep(0.32, 0.08, rad);
        let pink = mix(vec3f(0.82, 0.2, 0.36), vec3f(0.98, 0.66, 0.74), sat(1.0 - rad * 0.8));
        col = mix(pink, vec3f(0.98, 0.84, 0.34), center);
      }
      s.albedo = col;
      s.alpha = sat(mask);
    `})}const lo=`
fn fragment(in: FSIn) -> vec4f {
  var c = textureLoad(hdr, vec2i(in.pos.xy), 0).rgb;
  c *= 1.05;
  c = c / (c + vec3f(0.85));
  let uv = in.uv;
  let vig = smoothstep(1.2, 0.35, length((uv - 0.5) * vec2f(1.05, 1.2)));
  c *= mix(0.72, 1.0, vig);
  c = mix(c, c * vec3f(0.9, 1.08, 1.0), 0.28);
  let grain = (interleavedGradientNoise(in.pos.xy + vec2f(frame.time * 17.0, 0.0)) - 0.5) * 0.008;
  return vec4f(linearToSrgb(sat3(c + grain)), 1.0);
}
`,$r=["redSnapper","grunt","grouper","tarpon","parrot"],Nr=Math.PI*2,Er=new k,Ge=new ye,Wr=new k,Or=new U,ho=new k(0,1,0),Ue=new k,$t=new k;function ds(i){const e=i.attributes.position.array,t=i.attributes.normal.array;for(let r=0;r<e.length;r+=3){const a=e[r+1];e[r+1]=0,e[r+2]=a}for(let r=0;r<t.length;r+=3)t[r]=0,t[r+1]=1,t[r+2]=0;const s=i.index.array;for(let r=0;r<s.length;r+=3){const a=s[r+1];s[r+1]=s[r+2],s[r+2]=a}return i.computeBoundingSphere(),i}function _i(i,e,t,s){Ue.set(e,t,1).unproject(i),$t.set(e,t,0).unproject(i);const r=$t.y-Ue.y,a=Math.abs(r)<1e-8?0:(s-Ue.y)/r;return{x:Ue.x+($t.x-Ue.x)*a,z:Ue.z+($t.z-Ue.z)*a}}function Ur(i){i.updateProjectionMatrix(),i.updateMatrixWorld(!0);let e=1/0,t=-1/0,s=1/0,r=-1/0;const a=[[-1,-1],[1,-1],[1,1],[-1,1]];for(let n=0;n<a.length;n++){const h=_i(i,a[n][0],a[n][1],0);h.x<e&&(e=h.x),h.x>t&&(t=h.x),h.z<s&&(s=h.z),h.z>r&&(r=h.z)}return{halfW:(t-e)*.5,halfH:(r-s)*.5,cx:(e+t)*.5,cy:(s+r)*.5}}function co(i,e,t,s){const r=Math.sin(i*.5),a=Math.cos(i*.5),n=Math.sin(e*.5),h=Math.cos(e*.5),o=Math.sin(t*.5),l=Math.cos(t*.5),c=a*n,u=r*h,f=-r*n,m=a*h;return s.set(c*l+u*o,-c*o+u*l,m*o+f*l,m*l-f*o),s}function Vr(i,e,t,s,r,a,n,h){Er.set(t,s,r),Ge.setFromAxisAngle(ho,a),Wr.set(n,1,h),Or.compose(Er,Ge,Wr),i.setMatrixAt(e,Or)}function uo(i){const e=[];function t(r,a,n,h){e.push({nx:r,ny:a,scaleN:n,kind:h,seed:i()*12+.2,shade:i(),phase:i()*Math.PI*2,rot:i()*Math.PI*2,squash:.82+i()*.28})}const s=[[-.98,-.92],[.98,-.92],[-.98,.92],[.98,.92]];for(let r=0;r<s.length;r++)for(let a=0;a<6;a++)t(s[r][0]+(i()-.5)*.32,s[r][1]+(i()-.5)*.26,.75+i()*.75,i()<.4?0:1);for(let r=0;r<18;r++){const a=i()*Math.PI*2,n=.76+i()*.3;t(Math.cos(a)*n,Math.sin(a)*n,.42+i()*.42,1)}for(let r=0;r<4;r++){const a=i()*Math.PI*2,n=.48+i()*.16;t(Math.cos(a)*n,Math.sin(a)*n,.36+i()*.22,1)}for(let r=0;r<5;r++){const a=(r+.35)/5*Math.PI*2,n=.7+i()*.18;t(Math.cos(a)*n,Math.sin(a)*n,.28+i()*.14,2)}return e.sort((r,a)=>r.kind-a.kind||a.scaleN-r.scaleN),e}function fo(i){for(let e=0;e<i.length;e++){const t=i[e];t.pattern===0?t.kind=0:t.pattern===1?t.kind=1:t.pattern===2?t.kind=t.seed>8?2:4:t.kind=3,t.swim=t.phase,t.prevX=t.x,t.prevY=t.y,t.prevH=t.heading}}async function po({canvas:i=null,width:e=1280,height:t=720,fish:s=46,seed:r=7}={}){await L.init({canvas:i,headless:!i});const a=new rn({size:32,splits:[40],pcssCascades:0});a.enabled=!1,st.fields.enabled.value=0;const n=new ri(30,e/Math.max(1,t),.2,80);n.position.set(0,10.4,6.4),n.lookAt(0,-.35,0);const h=Ur(n),o=to({fish:s,halfW:h.halfW,halfH:h.halfH,cx:h.cx,cy:h.cy,seed:r});fo(o.fish);const l=new k(.48,.78,.28).normalize();de.sunDir.value.copy(l),de.sunColor.value.setRGB(5.4,5.1,4.6),de.skyIrradiance.value.setRGB(.42,.5,.46),de.horizonColor.value.setRGB(.55,.68,.62),de.seaLevel.value=0,de.cameraWaterHeight.value=0,de.cameraUnderwater.value=0,de.windSpeed.value=2.6,de.windDir.value.set(.42,.91).normalize(),de.waterAbsorption.value.set(.22,.055,.028),de.waterScattering.value.set(.018,.026,.03);const c=new hn(null,{cascades:2,sizes:[14,3.6],depth:1.65,choppiness:.55,local:{windSpeed:2.8,windDirection:38,fetch:1.4,spreadBlend:.72,swell:.04,shortWavesFade:.06},swell:{scale:.22,windSpeed:2.1,windDirection:12,fetch:6,spreadBlend:1,swell:.35,shortWavesFade:.18}});c.foamBias.value=.22,c.timeScale=.24;const u=xn(null,256),f=new nn({gridSize:72,leafSize:64,levels:1,rangeFactor:4,maxInstances:4,minY:-2,maxY:2,center:{x:-32,z:-32,size:64}}),m=new cn({fft:c,cdlod:f,foamTexture:u});m.wake={module:zi},m.terrain={module:ro},m.amplitude.value=.58,m.slopeScale.value=1.7,m.foamCoverage.value=.22;const y=new gn(null,c);y.strength.value=.9;const d=bn({fft:c,caustics:y,surface:m,terrain:m.terrain}),v=new ks,x=new qa;x.syncPipelines=!0;const b=new Ja(x,v,n);b.clearColor=[.05,.16,.13,1];const w=new pn({surface:m,sky:{module:io},sceneCopy:b.opaqueCopy,sceneDepthHalf:b.opaqueDepthHalf.texture});w.params.refraction.value=.16,w.params.foamIntensity.value=.4,w.params.roughness.value=.04,w.params.sss.value=.55,w.params.ssr.value=0;const M=new je(f.geometry,w);M.frustumCulled=!1,M.layers.set(it.WATER);const z=new je(ds(new da(1,1)),ao());z.frustumCulled=!1,z.position.y=-1.12;const A=$r.map(T=>({geometry:Cn(Ms[T],{lod:1,pose:"swim",eyes:!0})})),p=new Hn("Fish",A,{maxInstances:80}),g=p.createMesh(Vn(p));g.layers.set(it.OPAQUE);const S=new wt(ds(new Js(1,14)),no(),4);S.count=0,S.frustumCulled=!1;const _=uo(Mi(r+101>>>0)),C=ds(new Js(1,28)),P=new Float32Array(_.length*4);for(let T=0;T<_.length;T++){const V=_[T];P[T*4]=V.kind,P[T*4+1]=V.seed,P[T*4+2]=V.shade,P[T*4+3]=V.phase}C.setAttribute("aPlant",new qe(P,4));const D=new wt(C,oo(),_.length);D.frustumCulled=!1,D.layers.set(it.TRANSPARENT),v.add(z,g,S,M,D);const $=new dt(e,t,{colors:["rgba8unorm"],label:"pond-ldr"}),F=i?L.format:"rgba8unorm",H=new bi({label:"pond-grade",colorFormats:[F],bindings:{hdr:{texture:()=>b.sceneRT.texture}},code:lo}),O={canvas:i,camera:n,sim:o,shadows:a,ldr:$,width:e,height:t,_dt:1/30,get halfW(){return o.bounds.halfW},get halfH(){return o.bounds.halfH},get centerX(){return o.bounds.cx},get centerY(){return o.bounds.cy},get stats(){return x.stats},get time(){return o.time},feed(T,V){return o.feed(T,V)},step(T){O._dt=T,o.step(T),re()},resize(T,V){O.width=Math.max(1,T|0),O.height=Math.max(1,V|0),n.aspect=O.width/O.height;const I=Ur(n);o.setBounds(I.halfW,I.halfH,I.cx,I.cy);const B=Math.max(I.halfW,I.halfH)*3.4;z.scale.set(B,1,B),b.setSize(O.width,O.height),$.setSize(O.width,O.height),R(),re()},render(){L.beginFrame();const T=Re.fields;T.time.value=o.time,T.dt.value=O._dt,T.frameIndex.value=T.frameIndex.value+1>>>0,zs.fields.bounds.value=[o.bounds.halfW,o.bounds.halfH,o.bounds.cx,o.bounds.cy],te(),c.update(O._dt),y.update(),d.update(n),f.update(n),mi(n,O.width,O.height),b.render();const V=i?L.context.getCurrentTexture().createView():$.texture.view();H.render({colorViews:[V]}),L.submit()},pick(T,V,I){const B=(T-I.left)/I.width*2-1,N=-((V-I.top)/I.height*2-1);n.updateProjectionMatrix(),n.updateMatrixWorld(!0);const Q=_i(n,B,N,0);return{x:Q.x,y:Q.z}}};function R(){const T=Math.min(o.bounds.halfW,o.bounds.halfH);for(let V=0;V<_.length;V++){const I=_[V],B=o.bounds.cx+I.nx*o.bounds.halfW,N=o.bounds.cy+I.ny*o.bounds.halfH,Q=I.scaleN*(T/3.6);Vr(D,V,B,.22,N,I.rot,Q,Q*I.squash)}D.instanceMatrix.needsUpdate=!0}function re(){const T=p.data,V=Math.max(O._dt,1e-4);p.begin();for(let I=0;I<o.fish.length;I++){const B=o.fish[I],N=.72+Math.max(0,B.hz-4.2)*.16,Q=V*Nr*N;B.swim=(B.swim+Q)%(Nr*64);const Me=B.len*.58,he=-.38-B.seed%1*.28,Pe=Math.atan2(Math.cos(B.heading),Math.sin(B.heading)),ze=B.yawRate||0,_t=Math.max(-.42,Math.min(.42,ze*.38));co(Pe,0,_t,Ge);const se=I*16;T[se]=B.x,T[se+1]=he,T[se+2]=B.y,T[se+3]=Me,T[se+4]=Ge.x,T[se+5]=Ge.y,T[se+6]=Ge.z,T[se+7]=Ge.w,T[se+8]=B.swim,T[se+9]=.05+Math.min(.04,B.speed*.03),T[se+10]=Math.max(-.36,Math.min(.36,ze*.28)),T[se+11]=Ms[$r[B.kind]].pattern+(B.seed%1*.83+.02),T[se+12]=B.x-B.prevX,T[se+13]=0,T[se+14]=B.y-B.prevY,T[se+15]=Q,B.prevX=B.x,B.prevY=B.y,B.prevH=B.heading,p.add(B.kind,I)}p.commit(),p.dataAttr.needsUpdate=!0,S.count=o.foods.length;for(let I=0;I<o.foods.length;I++){const B=o.foods[I],N=.07+Math.sin(o.time*5+I)*.01;Vr(S,I,B.x,-.12,B.y,o.time*.4,N,N)}S.instanceMatrix.needsUpdate=!0}function te(){const T=zs.fields.rings.value;T.fill(0);const V=Math.min(8,o.ripples.length);for(let I=0;I<V;I++){const B=o.ripples[I],N=I*4;T[N]=B.x,T[N+1]=B.y,T[N+2]=B.age,T[N+3]=B.amp}}return O.resize(e,t),O}const ts=new URLSearchParams(location.search);function zt(i,e){const t=ts.get(i);if(t==null||t==="")return e;const s=Number(t);return Number.isFinite(s)?s:e}const ve=document.getElementById("pond"),qt=document.getElementById("hint"),ps=document.getElementById("err"),jt=document.getElementById("perf"),mo=Math.max(1,Math.min(80,zt("fish",46)|0)),yo=Math.max(8,Math.min(60,zt("fps",30))),Gr=Math.max(480,zt("res",1440)),xo=Math.max(.25,zt("dpr",1)),vo=ts.get("demo")==="1",go=zt("seed",7)|0,wo=!!(window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches),ki=ts.get("perf")==="1";ts.get("ui")==="0"&&qt&&(qt.hidden=!0);ki&&jt&&(jt.style.display="block");function Hr(){const i=Math.max(1,window.innerWidth),e=Math.max(1,window.innerHeight),t=Math.min(window.devicePixelRatio||1,xo);let s=Math.max(1,Math.round(i*t)),r=Math.max(1,Math.round(e*t));const a=Math.max(s,r);if(a>Gr){const n=Gr/a;s=Math.max(1,Math.round(s*n)),r=Math.max(1,Math.round(r*n))}return{w:s,h:r}}function bo(i){return String(i).replace(/[&<>]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;"})[e])}function So(i){ve&&(ve.style.display="none"),qt&&(qt.hidden=!0),ps&&(ps.style.display="block",ps.innerHTML=`<h1>WebGPU 没能启动</h1><p>${bo(i&&i.message?i.message:i)}</p><p>这条演示只在较新的 Chrome、Edge 或 Safari 里运行，不能当作 Lively 壁纸。桌面请继续用仓库根目录的 WebGL 锦鲤池 <code>index.html</code>（<a href="https://github.com/cnwinds/koi-pond-wallpaper">仓库</a>）。Lively 和 WebView2 里经常没有 WebGPU。</p>`)}let Vt=!1,_s=document.hidden,St=0,nt=0,yt=0,ms=0,Nt=0,Xt=null;function Mo(){return Xt??yo}function qr(i){_s=i,_s||(nt=performance.now(),yt=0,St||(St=requestAnimationFrame(Ds)))}let le=null,ys=2.2;function Ds(i){if(St=0,_s||document.hidden||Vt||!le)return;const e=nt?Math.min(.1,(i-nt)/1e3):0;nt=i,yt+=e;const t=1/Mo();if(yt>=t){const s=Math.min(yt,.1)*(wo?.25:1);if(yt=0,vo&&(ys+=s,ys>4.5)){ys=0;const r=Math.random()*Math.PI*2,a=.08+Math.random()*.35;le.feed(le.centerX+Math.cos(r)*le.halfW*a,le.centerY+Math.sin(r)*le.halfH*a)}if(le.step(s),le.render(),ms++,ki&&jt&&(Nt+=s,Nt>=.5)){const r=le.stats;jt.textContent=`${Math.round(ms/Nt)} fps · ${le.width}×${le.height} · draws ${r.draws} · tris ${Math.round(r.triangles)}`,ms=0,Nt=0}}St=requestAnimationFrame(Ds)}async function zo(){if(!navigator.gpu)throw new Error("navigator.gpu 不存在。");const i=Hr();ve.width=i.w,ve.height=i.h,le=await po({canvas:ve,width:i.w,height:i.h,fish:mo,seed:go}),window.addEventListener("resize",()=>{const e=Hr();e.w===ve.width&&e.h===ve.height||(ve.width=e.w,ve.height=e.h,le.resize(e.w,e.h))}),ve.addEventListener("pointerdown",e=>{if(e.button!=null&&e.button!==0)return;const t=le.pick(e.clientX,e.clientY,ve.getBoundingClientRect());t&&le.feed(t.x,t.y)}),document.addEventListener("visibilitychange",()=>qr(document.hidden||Vt)),window.addEventListener("blur",()=>{Xt=8}),window.addEventListener("focus",()=>{Xt=null,nt=performance.now()}),window.livelyWallpaperPlaybackChanged=e=>{try{Vt=!!(typeof e=="string"?JSON.parse(e):e).IsPaused,qr(document.hidden||Vt)}catch{}},document.addEventListener("contextmenu",e=>e.preventDefault()),nt=performance.now(),document.hidden||(St=requestAnimationFrame(Ds))}zo().catch(So);
