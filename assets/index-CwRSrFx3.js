(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function t(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(i){if(i.ep)return;i.ep=!0;const n=t(i);fetch(i.href,n)}})();const vt=Math.PI/180,Gt=180/Math.PI,oe=[];for(let r=0;r<256;r++)oe[r]=(r<16?"0":"")+r.toString(16);function Kt(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,s=Math.random()*4294967295|0;return(oe[r&255]+oe[r>>8&255]+oe[r>>16&255]+oe[r>>24&255]+"-"+oe[e&255]+oe[e>>8&255]+"-"+oe[e>>16&15|64]+oe[e>>24&255]+"-"+oe[t&63|128]+oe[t>>8&255]+"-"+oe[t>>16&255]+oe[t>>24&255]+oe[s&255]+oe[s>>8&255]+oe[s>>16&255]+oe[s>>24&255]).toLowerCase()}const Pr=(r,e,t)=>Math.max(e,Math.min(t,r)),Xi=(r,e)=>(r%e+e)%e,Cr=(r,e,t,s,i)=>s+(r-e)*(i-s)/(t-e),Tr=(r,e,t)=>r!==e?(t-r)/(e-r):0,Ki=(r,e,t)=>(1-t)*r+t*e,Lr=(r,e,t,s)=>Ki(r,e,1-Math.exp(-t*s)),Fr=(r,e=1)=>e-Math.abs(Xi(r,e*2)-e);function Dr(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function Br(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}const Rr=(r,e)=>r+Math.floor(Math.random()*(e-r+1)),Ir=(r,e)=>r+Math.random()*(e-r),$r=r=>r*(.5-Math.random());let Ns=1234567;function Nr(r){r!==void 0&&(Ns=r);let e=Ns+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}const Er=r=>r*vt,Wr=r=>r*Gt,Or=r=>(r&r-1)===0&&r!==0,Ur=r=>Math.pow(2,Math.ceil(Math.log(r)/Math.LN2)),Vr=r=>Math.pow(2,Math.floor(Math.log(r)/Math.LN2));function Yi(r,e){switch(e.constructor){case Float32Array:case Float64Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:case Uint8ClampedArray:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:return r}}function Zi(r,e){switch(e.constructor){case Float32Array:case Float64Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:return r}}const Gr={normalize:Zi,denormalize:Yi,DEG2RAD:vt,RAD2DEG:Gt,generateUUID:Kt,clamp:Pr,euclideanModulo:Xi,mapLinear:Cr,inverseLerp:Tr,lerp:Ki,damp:Lr,pingpong:Fr,smoothstep:Dr,smootherstep:Br,randInt:Rr,randFloat:Ir,randFloatSpread:$r,seededRandom:Nr,degToRad:Er,radToDeg:Wr,isPowerOfTwo:Or,ceilPowerOfTwo:Ur,floorPowerOfTwo:Vr};class se{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){return e===0?this.x=t:this.y=t,this}getComponent(e){return e===0?this.x:this.y}clone(){return new se(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,s=this.y,i=e.elements;return this.x=i[0]*t+i[3]*s+i[6],this.y=i[1]*t+i[4]*s+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Math.max(e,Math.min(t,s)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());return t===0?Math.PI/2:Math.acos(Math.max(-1,Math.min(1,this.dot(e)/t)))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,s=this.y-e.y;return t*t+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,s){return this.x=e.x+(t.x-e.x)*s,this.y=e.y+(t.y-e.y)*s,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const s=Math.cos(t),i=Math.sin(t),n=this.x-e.x,a=this.y-e.y;return this.x=n*s-a*i+e.x,this.y=n*i+a*s+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}se.prototype.isVector2=!0;class ve{constructor(e=0,t=0,s=0,i=1){this._x=e,this._y=t,this._z=s,this._w=i,this._onChangeCallback=Hr}static slerpFlat(e,t,s,i,n,a,h){const o=new ve().fromArray(s,i),l=new ve().fromArray(n,a);o.slerp(l,h).toArray(e,t)}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,s,i){return this._x=e,this._y=t,this._z=s,this._w=i,this._onChangeCallback(),this}clone(){return new ve(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}identity(){return this.set(0,0,0,1)}setFromEuler(e,t=!0){const s=e._x,i=e._y,n=e._z,a=e._order,h=Math.cos(s/2),o=Math.cos(i/2),l=Math.cos(n/2),c=Math.sin(s/2),u=Math.sin(i/2),f=Math.sin(n/2);switch(a){case"XYZ":this._x=c*o*l+h*u*f,this._y=h*u*l-c*o*f,this._z=h*o*f+c*u*l,this._w=h*o*l-c*u*f;break;case"YXZ":this._x=c*o*l+h*u*f,this._y=h*u*l-c*o*f,this._z=h*o*f-c*u*l,this._w=h*o*l+c*u*f;break;case"ZXY":this._x=c*o*l-h*u*f,this._y=h*u*l+c*o*f,this._z=h*o*f+c*u*l,this._w=h*o*l-c*u*f;break;case"ZYX":this._x=c*o*l-h*u*f,this._y=h*u*l+c*o*f,this._z=h*o*f-c*u*l,this._w=h*o*l+c*u*f;break;case"YZX":this._x=c*o*l+h*u*f,this._y=h*u*l+c*o*f,this._z=h*o*f-c*u*l,this._w=h*o*l-c*u*f;break;case"XZY":this._x=c*o*l-h*u*f,this._y=h*u*l-c*o*f,this._z=h*o*f+c*u*l,this._w=h*o*l+c*u*f;break;default:throw new Error("Quaternion.setFromEuler: unknown order "+a)}return t&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const s=t/2,i=Math.sin(s);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(s),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,s=t[0],i=t[4],n=t[8],a=t[1],h=t[5],o=t[9],l=t[2],c=t[6],u=t[10],f=s+h+u;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(c-o)*p,this._y=(n-l)*p,this._z=(a-i)*p}else if(s>h&&s>u){const p=2*Math.sqrt(1+s-h-u);this._w=(c-o)/p,this._x=.25*p,this._y=(i+a)/p,this._z=(n+l)/p}else if(h>u){const p=2*Math.sqrt(1+h-s-u);this._w=(n-l)/p,this._x=(i+a)/p,this._y=.25*p,this._z=(o+c)/p}else{const p=2*Math.sqrt(1+u-s-h);this._w=(a-i)/p,this._x=(n+l)/p,this._y=(o+c)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let s=e.x*t.x+e.y*t.y+e.z*t.z+1;return s<Number.EPSILON?(s=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=s):(this._x=0,this._y=-e.z,this._z=e.y,this._w=s)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=s),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Math.max(-1,Math.min(1,this.dot(e)))))}rotateTowards(e,t){const s=this.angleTo(e);return s===0?this:this.slerp(e,Math.min(1,t/s))}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this.lengthSq())}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const s=e._x,i=e._y,n=e._z,a=e._w,h=t._x,o=t._y,l=t._z,c=t._w;return this._x=s*c+a*h+i*l-n*o,this._y=i*c+a*o+n*h-s*l,this._z=n*c+a*l+s*o-i*h,this._w=a*c-s*h-i*o-n*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const s=this._x,i=this._y,n=this._z,a=this._w;let h=a*e._w+s*e._x+i*e._y+n*e._z,o=e._x,l=e._y,c=e._z,u=e._w;if(h<0&&(o=-o,l=-l,c=-c,u=-u,h=-h),h>=1)return this;const f=1-h*h;if(f<=Number.EPSILON){const y=1-t;return this._w=y*a+t*u,this._x=y*s+t*o,this._y=y*i+t*l,this._z=y*n+t*c,this.normalize()}const p=Math.sqrt(f),m=Math.atan2(p,h),d=Math.sin((1-t)*m)/p,v=Math.sin(t*m)/p;return this._w=a*d+u*v,this._x=s*d+o*v,this._y=i*d+l*v,this._z=n*d+c*v,this._onChangeCallback(),this}slerpQuaternions(e,t,s){return this.copy(e).slerp(t,s)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),s=Math.random(),i=Math.sqrt(1-s),n=Math.sqrt(s);return this.set(i*Math.sin(e),i*Math.cos(e),n*Math.sin(t),n*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this.set(e.getX(t),e.getY(t),e.getZ(t),e.getW(t))}_onChange(e){return this._onChangeCallback=e,this}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}function Hr(){}ve.prototype.isQuaternion=!0;const Es=new ve;class C{constructor(e=0,t=0,s=0){this.x=e,this.y=t,this.z=s}set(e,t,s){return s===void 0&&(s=this.z),this.x=e,this.y=t,this.z=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){return e===0?this.x=t:e===1?this.y=t:this.z=t,this}getComponent(e){return e===0?this.x:e===1?this.y:this.z}clone(){return new C(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}applyEuler(e){return this.applyQuaternion(Es.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Es.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,s=this.y,i=this.z,n=e.elements;return this.x=n[0]*t+n[3]*s+n[6]*i,this.y=n[1]*t+n[4]*s+n[7]*i,this.z=n[2]*t+n[5]*s+n[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,s=this.y,i=this.z,n=e.elements,a=1/(n[3]*t+n[7]*s+n[11]*i+n[15]);return this.x=(n[0]*t+n[4]*s+n[8]*i+n[12])*a,this.y=(n[1]*t+n[5]*s+n[9]*i+n[13])*a,this.z=(n[2]*t+n[6]*s+n[10]*i+n[14])*a,this}applyQuaternion(e){const t=this.x,s=this.y,i=this.z,n=e.x,a=e.y,h=e.z,o=e.w,l=2*(a*i-h*s),c=2*(h*t-n*i),u=2*(n*s-a*t);return this.x=t+o*l+a*u-h*c,this.y=s+o*c+h*l-n*u,this.z=i+o*u+n*c-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,s=this.y,i=this.z,n=e.elements;return this.x=n[0]*t+n[4]*s+n[8]*i,this.y=n[1]*t+n[5]*s+n[9]*i,this.z=n[2]*t+n[6]*s+n[10]*i,this.normalize()}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Math.max(e,Math.min(t,s)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,s){return this.x=e.x+(t.x-e.x)*s,this.y=e.y+(t.y-e.y)*s,this.z=e.z+(t.z-e.z)*s,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const s=e.x,i=e.y,n=e.z,a=t.x,h=t.y,o=t.z;return this.x=i*o-n*h,this.y=n*a-s*o,this.z=s*h-i*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const s=e.dot(this)/t;return this.copy(e).multiplyScalar(s)}projectOnPlane(e){const t=this.dot(e)/(e.lengthSq()||1);return this.addScaledVector(e,-t)}reflect(e){return this.addScaledVector(e,-2*this.dot(e))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());return t===0?Math.PI/2:Math.acos(Math.max(-1,Math.min(1,this.dot(e)/t)))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,s=this.y-e.y,i=this.z-e.z;return t*t+s*s+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,s){const i=Math.sin(t)*e;return this.x=i*Math.sin(s),this.y=Math.cos(t)*e,this.z=i*Math.cos(s),this}setFromCylindricalCoords(e,t,s){return this.x=e*Math.sin(t),this.y=s,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),s=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.set(t,s,i)}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,s=Math.sqrt(1-t*t);return this.x=s*Math.cos(e),this.y=t,this.z=s*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}C.prototype.isVector3=!0;class G{constructor(e=0,t=0,s=0,i=1){this.x=e,this.y=t,this.z=s,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,s,i){return this.x=e,this.y=t,this.z=s,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){return this["xyzw"[e]]=t,this}getComponent(e){return this["xyzw"[e]]}clone(){return new G(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix4(e){const t=this.x,s=this.y,i=this.z,n=this.w,a=e.elements;return this.x=a[0]*t+a[4]*s+a[8]*i+a[12]*n,this.y=a[1]*t+a[5]*s+a[9]*i+a[13]*n,this.z=a[2]*t+a[6]*s+a[10]*i+a[14]*n,this.w=a[3]*t+a[7]*s+a[11]*i+a[15]*n,this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.dot(this)}length(){return Math.sqrt(this.dot(this))}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,s){return this.x=e.x+(t.x-e.x)*s,this.y=e.y+(t.y-e.y)*s,this.z=e.z+(t.z-e.z)*s,this.w=e.w+(t.w-e.w)*s,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}G.prototype.isVector4=!0;const qr=2e3,Ge=2001,is=new C,$e=new C,kt=new C,pe=new C,jr=new ve,Ws=new C(1,1,1),Os=new C;class U{constructor(e,t,s,i,n,a,h,o,l,c,u,f,p,m,d,v){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,s,i,n,a,h,o,l,c,u,f,p,m,d,v)}set(e,t,s,i,n,a,h,o,l,c,u,f,p,m,d,v){const y=this.elements;return y[0]=e,y[4]=t,y[8]=s,y[12]=i,y[1]=n,y[5]=a,y[9]=h,y[13]=o,y[2]=l,y[6]=c,y[10]=u,y[14]=f,y[3]=p,y[7]=m,y[11]=d,y[15]=v,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)}clone(){return new U().fromArray(this.elements)}copy(e){const t=this.elements,s=e.elements;for(let i=0;i<16;i++)t[i]=s[i];return this}copyPosition(e){const t=this.elements,s=e.elements;return t[12]=s[12],t[13]=s[13],t[14]=s[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1)}extractBasis(e,t,s){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),s.setFromMatrixColumn(this,2),this}makeBasis(e,t,s){return this.set(e.x,t.x,s.x,0,e.y,t.y,s.y,0,e.z,t.z,s.z,0,0,0,0,1)}extractRotation(e){const t=this.elements,s=e.elements,i=1/is.setFromMatrixColumn(e,0).length(),n=1/is.setFromMatrixColumn(e,1).length(),a=1/is.setFromMatrixColumn(e,2).length();return t[0]=s[0]*i,t[1]=s[1]*i,t[2]=s[2]*i,t[3]=0,t[4]=s[4]*n,t[5]=s[5]*n,t[6]=s[6]*n,t[7]=0,t[8]=s[8]*a,t[9]=s[9]*a,t[10]=s[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){return this.compose(Os,jr.setFromEuler(e,!1),Ws)}makeRotationFromQuaternion(e){return this.compose(Os,e,Ws)}lookAt(e,t,s){const i=this.elements;return pe.subVectors(e,t),pe.lengthSq()===0&&(pe.z=1),pe.normalize(),$e.crossVectors(s,pe),$e.lengthSq()===0&&(Math.abs(s.z)===1?pe.x+=1e-4:pe.z+=1e-4,pe.normalize(),$e.crossVectors(s,pe)),$e.normalize(),kt.crossVectors(pe,$e),i[0]=$e.x,i[4]=kt.x,i[8]=pe.x,i[1]=$e.y,i[5]=kt.y,i[9]=pe.y,i[2]=$e.z,i[6]=kt.z,i[10]=pe.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const s=e.elements,i=t.elements,n=this.elements,a=s[0],h=s[4],o=s[8],l=s[12],c=s[1],u=s[5],f=s[9],p=s[13],m=s[2],d=s[6],v=s[10],y=s[14],w=s[3],g=s[7],S=s[11],k=s[15],T=i[0],b=i[4],M=i[8],x=i[12],z=i[1],P=i[5],_=i[9],A=i[13],$=i[2],D=i[6],H=i[10],I=i[14],B=i[3],X=i[7],ee=i[11],L=i[15];return n[0]=a*T+h*z+o*$+l*B,n[4]=a*b+h*P+o*D+l*X,n[8]=a*M+h*_+o*H+l*ee,n[12]=a*x+h*A+o*I+l*L,n[1]=c*T+u*z+f*$+p*B,n[5]=c*b+u*P+f*D+p*X,n[9]=c*M+u*_+f*H+p*ee,n[13]=c*x+u*A+f*I+p*L,n[2]=m*T+d*z+v*$+y*B,n[6]=m*b+d*P+v*D+y*X,n[10]=m*M+d*_+v*H+y*ee,n[14]=m*x+d*A+v*I+y*L,n[3]=w*T+g*z+S*$+k*B,n[7]=w*b+g*P+S*D+k*X,n[11]=w*M+g*_+S*H+k*ee,n[15]=w*x+g*A+S*I+k*L,this}multiplyScalar(e){const t=this.elements;for(let s=0;s<16;s++)t[s]*=e;return this}determinant(){const e=this.elements,t=e[0],s=e[4],i=e[8],n=e[12],a=e[1],h=e[5],o=e[9],l=e[13],c=e[2],u=e[6],f=e[10],p=e[14],m=e[3],d=e[7],v=e[11],y=e[15],w=f*y-p*v,g=u*y-p*d,S=u*v-f*d,k=c*y-p*m,T=c*v-f*m,b=c*d-u*m;return t*(h*w-o*g+l*S)-s*(a*w-o*k+l*T)+i*(a*g-h*k+l*b)-n*(a*S-h*T+o*b)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,s){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=s),this}invert(){const e=this.elements,t=e[0],s=e[1],i=e[2],n=e[3],a=e[4],h=e[5],o=e[6],l=e[7],c=e[8],u=e[9],f=e[10],p=e[11],m=e[12],d=e[13],v=e[14],y=e[15],w=t*h-s*a,g=t*o-i*a,S=t*l-n*a,k=s*o-i*h,T=s*l-n*h,b=i*l-n*o,M=c*d-u*m,x=c*v-f*m,z=c*y-p*m,P=u*v-f*d,_=u*y-p*d,A=f*y-p*v,$=w*A-g*_+S*P+k*z-T*x+b*M;if($===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const D=1/$;return e[0]=(h*A-o*_+l*P)*D,e[1]=(i*_-s*A-n*P)*D,e[2]=(d*b-v*T+y*k)*D,e[3]=(f*T-u*b-p*k)*D,e[4]=(o*z-a*A-l*x)*D,e[5]=(t*A-i*z+n*x)*D,e[6]=(v*S-m*b-y*g)*D,e[7]=(c*b-f*S+p*g)*D,e[8]=(a*_-h*z+l*M)*D,e[9]=(s*z-t*_-n*M)*D,e[10]=(m*T-d*S+y*w)*D,e[11]=(u*S-c*T-p*w)*D,e[12]=(h*x-a*P-o*M)*D,e[13]=(t*P-s*x+i*M)*D,e[14]=(d*g-m*k-v*w)*D,e[15]=(c*k-u*g+f*w)*D,this}scale(e){const t=this.elements;return t[0]*=e.x,t[4]*=e.y,t[8]*=e.z,t[1]*=e.x,t[5]*=e.y,t[9]*=e.z,t[2]*=e.x,t[6]*=e.y,t[10]*=e.z,t[3]*=e.x,t[7]*=e.y,t[11]*=e.z,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],s=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,s,i))}makeTranslation(e,t,s){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,s,0,0,0,1)}makeRotationX(e){const t=Math.cos(e),s=Math.sin(e);return this.set(1,0,0,0,0,t,-s,0,0,s,t,0,0,0,0,1)}makeRotationY(e){const t=Math.cos(e),s=Math.sin(e);return this.set(t,0,s,0,0,1,0,0,-s,0,t,0,0,0,0,1)}makeRotationZ(e){const t=Math.cos(e),s=Math.sin(e);return this.set(t,-s,0,0,s,t,0,0,0,0,1,0,0,0,0,1)}makeRotationAxis(e,t){const s=Math.cos(t),i=Math.sin(t),n=1-s,a=e.x,h=e.y,o=e.z,l=n*a,c=n*h;return this.set(l*a+s,l*h-i*o,l*o+i*h,0,l*h+i*o,c*h+s,c*o-i*a,0,l*o-i*h,c*o+i*a,n*o*o+s,0,0,0,0,1)}makeScale(e,t,s){return this.set(e,0,0,0,0,t,0,0,0,0,s,0,0,0,0,1)}makeShear(e,t,s,i,n,a){return this.set(1,s,n,0,e,1,a,0,t,i,1,0,0,0,0,1)}compose(e,t,s){const i=this.elements,n=t._x,a=t._y,h=t._z,o=t._w,l=n+n,c=a+a,u=h+h,f=n*l,p=n*c,m=n*u,d=a*c,v=a*u,y=h*u,w=o*l,g=o*c,S=o*u,k=s.x,T=s.y,b=s.z;return i[0]=(1-(d+y))*k,i[1]=(p+S)*k,i[2]=(m-g)*k,i[3]=0,i[4]=(p-S)*T,i[5]=(1-(f+y))*T,i[6]=(v+w)*T,i[7]=0,i[8]=(m+g)*b,i[9]=(v-w)*b,i[10]=(1-(f+d))*b,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,s){const i=this.elements;let n=Math.hypot(i[0],i[1],i[2]);const a=Math.hypot(i[4],i[5],i[6]),h=Math.hypot(i[8],i[9],i[10]);this.determinant()<0&&(n=-n),e.x=i[12],e.y=i[13],e.z=i[14];const o=Xr.copy(this),l=o.elements,c=1/n,u=1/a,f=1/h;return l[0]*=c,l[1]*=c,l[2]*=c,l[4]*=u,l[5]*=u,l[6]*=u,l[8]*=f,l[9]*=f,l[10]*=f,t.setFromRotationMatrix(o),s.x=n,s.y=a,s.z=h,this}makePerspective(e,t,s,i,n,a,h=Ge,o=!0){const l=this.elements,c=2*n/(t-e),u=2*n/(s-i),f=(t+e)/(t-e),p=(s+i)/(s-i);let m,d;const v=a===1/0;if(o){if(h!==Ge)throw new Error("Matrix4.makePerspective: reversed depth requires WebGPU clip space");m=v?0:n/(a-n),d=v?n:a*n/(a-n)}else h===Ge?(m=v?-1:-a/(a-n),d=v?-n:-a*n/(a-n)):(m=v?-1:-(a+n)/(a-n),d=v?-2*n:-2*a*n/(a-n));return l[0]=c,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=u,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=d,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,s,i,n,a,h=Ge,o=!0){const l=this.elements,c=1/(t-e),u=1/(s-i),f=1/(a-n),p=(t+e)*c,m=(s+i)*u;let d,v;return o?(d=a*f,v=f):h===Ge?(d=-n*f,v=-f):(d=-(a+n)*f,v=-2*f),l[0]=2*c,l[4]=0,l[8]=0,l[12]=-p,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-m,l[2]=0,l[6]=0,l[10]=v,l[14]=d,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){for(let t=0;t<16;t++)if(this.elements[t]!==e.elements[t])return!1;return!0}fromArray(e,t=0){for(let s=0;s<16;s++)this.elements[s]=e[s+t];return this}toArray(e=[],t=0){const s=this.elements;for(let i=0;i<16;i++)e[t+i]=s[i];return e}}U.prototype.isMatrix4=!0;const Xr=new U,Us=new U,Vs=new ve,Qe=r=>Math.max(-1,Math.min(1,r));class Oe{constructor(e=0,t=0,s=0,i=Oe.DEFAULT_ORDER){this._x=e,this._y=t,this._z=s,this._order=i,this._onChangeCallback=Kr}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,s,i=this._order){return this._x=e,this._y=t,this._z=s,this._order=i,this._onChangeCallback(),this}clone(){return new Oe(this._x,this._y,this._z,this._order)}copy(e){return this.set(e._x,e._y,e._z,e._order)}setFromRotationMatrix(e,t=this._order,s=!0){const i=e.elements,n=i[0],a=i[4],h=i[8],o=i[1],l=i[5],c=i[9],u=i[2],f=i[6],p=i[10],m=.9999999;switch(t){case"XYZ":this._y=Math.asin(Qe(h)),Math.abs(h)<m?(this._x=Math.atan2(-c,p),this._z=Math.atan2(-a,n)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Qe(c)),Math.abs(c)<m?(this._y=Math.atan2(h,p),this._z=Math.atan2(o,l)):(this._y=Math.atan2(-u,n),this._z=0);break;case"ZXY":this._x=Math.asin(Qe(f)),Math.abs(f)<m?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(o,n));break;case"ZYX":this._y=Math.asin(-Qe(u)),Math.abs(u)<m?(this._x=Math.atan2(f,p),this._z=Math.atan2(o,n)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Qe(o)),Math.abs(o)<m?(this._x=Math.atan2(-c,l),this._y=Math.atan2(-u,n)):(this._x=0,this._y=Math.atan2(h,p));break;case"XZY":this._z=Math.asin(-Qe(a)),Math.abs(a)<m?(this._x=Math.atan2(f,l),this._y=Math.atan2(h,n)):(this._x=Math.atan2(-c,p),this._y=0);break;default:throw new Error("Euler.setFromRotationMatrix: unknown order "+t)}return this._order=t,s&&this._onChangeCallback(),this}setFromQuaternion(e,t,s){return Us.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Us,t,s)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Vs.setFromEuler(this),this.setFromQuaternion(Vs,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}function Kr(){}Oe.DEFAULT_ORDER="XYZ";Oe.prototype.isEuler=!0;class Ze{constructor(e,t,s,i,n,a,h,o,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,s,i,n,a,h,o,l)}set(e,t,s,i,n,a,h,o,l){const c=this.elements;return c[0]=e,c[1]=i,c[2]=h,c[3]=t,c[4]=n,c[5]=o,c[6]=s,c[7]=a,c[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1)}copy(e){const t=this.elements,s=e.elements;for(let i=0;i<9;i++)t[i]=s[i];return this}clone(){return new Ze().fromArray(this.elements)}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10])}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const s=e.elements,i=t.elements,n=this.elements,a=s[0],h=s[3],o=s[6],l=s[1],c=s[4],u=s[7],f=s[2],p=s[5],m=s[8],d=i[0],v=i[3],y=i[6],w=i[1],g=i[4],S=i[7],k=i[2],T=i[5],b=i[8];return n[0]=a*d+h*w+o*k,n[3]=a*v+h*g+o*T,n[6]=a*y+h*S+o*b,n[1]=l*d+c*w+u*k,n[4]=l*v+c*g+u*T,n[7]=l*y+c*S+u*b,n[2]=f*d+p*w+m*k,n[5]=f*v+p*g+m*T,n[8]=f*y+p*S+m*b,this}multiplyScalar(e){const t=this.elements;for(let s=0;s<9;s++)t[s]*=e;return this}determinant(){const e=this.elements,t=e[0],s=e[1],i=e[2],n=e[3],a=e[4],h=e[5],o=e[6],l=e[7],c=e[8];return t*a*c-t*h*l-s*n*c+s*h*o+i*n*l-i*a*o}invert(){const e=this.elements,t=e[0],s=e[1],i=e[2],n=e[3],a=e[4],h=e[5],o=e[6],l=e[7],c=e[8],u=c*a-h*l,f=h*o-c*n,p=l*n-a*o,m=t*u+s*f+i*p;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const d=1/m;return e[0]=u*d,e[1]=(i*l-c*s)*d,e[2]=(h*s-i*a)*d,e[3]=f*d,e[4]=(c*t-i*o)*d,e[5]=(i*n-h*t)*d,e[6]=p*d,e[7]=(s*o-l*t)*d,e[8]=(a*t-s*n)*d,this}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}makeTranslation(e,t){return e.isVector2&&(t=e.y,e=e.x),this.set(1,0,e,0,1,t,0,0,1)}makeRotation(e){const t=Math.cos(e),s=Math.sin(e);return this.set(t,-s,0,s,t,0,0,0,1)}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1)}setUvTransform(e,t,s,i,n,a,h){const o=Math.cos(n),l=Math.sin(n);return this.set(s*o,s*l,-s*(o*a+l*h)+a+e,-i*l,i*o,-i*(-l*a+o*h)+h+t,0,0,1)}scale(e,t){return this.premultiply(rs.makeScale(e,t))}rotate(e){return this.premultiply(rs.makeRotation(-e))}translate(e,t){return this.premultiply(rs.makeTranslation(e,t))}equals(e){for(let t=0;t<9;t++)if(this.elements[t]!==e.elements[t])return!1;return!0}fromArray(e,t=0){for(let s=0;s<9;s++)this.elements[s]=e[s+t];return this}toArray(e=[],t=0){for(let s=0;s<9;s++)e[t+s]=this.elements[s];return e}}Ze.prototype.isMatrix3=!0;const rs=new Ze,Ce="srgb",At="srgb-linear",Je=r=>r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4),we=r=>r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055,ht=r=>Math.max(0,Math.min(1,r)),Yr=(r,e)=>(r%e+e)%e;function ns(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}const Pt={h:0,s:0,l:0};class Ae{constructor(e,t,s){this.r=1,this.g=1,this.b=1,this.set(e,t,s)}set(e,t,s){if(t===void 0&&s===void 0){if(e===void 0)return this;e&&e.isColor?this.copy(e):typeof e=="number"?this.setHex(e):typeof e=="string"&&this.setStyle(e)}else this.setRGB(e,t,s);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ce){return e=Math.floor(e),this.setRGB((e>>16&255)/255,(e>>8&255)/255,(e&255)/255,t)}setRGB(e,t,s,i=At){return i===Ce&&(e=Je(e),t=Je(t),s=Je(s)),this.r=e,this.g=t,this.b=s,this}setHSL(e,t,s,i=At){if(e=Yr(e,1),t=ht(t),s=ht(s),t===0)return this.setRGB(s,s,s,i);const n=s<=.5?s*(1+t):s+t-s*t,a=2*s-n;return this.setRGB(ns(a,n,e+1/3),ns(a,n,e),ns(a,n,e-1/3),i)}setStyle(e,t=Ce){let s;if(s=/^#([A-Fa-f\d]+)$/.exec(e)){const i=s[1];if(i.length===3)return this.setRGB(parseInt(i[0],16)/15,parseInt(i[1],16)/15,parseInt(i[2],16)/15,t);if(i.length===6)return this.setHex(parseInt(i,16),t)}else if(s=/^rgba?\(\s*([\d.]+)(%?)\s*,\s*([\d.]+)%?\s*,\s*([\d.]+)%?\s*(?:,\s*[\d.]+\s*)?\)$/.exec(e)){const i=s[2]==="%"?100:255;return this.setRGB(Math.min(1,s[1]/i),Math.min(1,s[3]/i),Math.min(1,s[4]/i),t)}else{if(s=/^hsla?\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*(?:,\s*[\d.]+\s*)?\)$/.exec(e))return this.setHSL(s[1]/360,s[2]/100,s[3]/100,t);if(gs[e.toLowerCase()]!==void 0)return this.setHex(gs[e.toLowerCase()],t)}return console.warn("Color: unknown color "+e),this}clone(){return new Ae(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Je(e.r),this.g=Je(e.g),this.b=Je(e.b),this}copyLinearToSRGB(e){return this.r=we(e.r),this.g=we(e.g),this.b=we(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this)}convertLinearToSRGB(){return this.copyLinearToSRGB(this)}getHex(e=Ce){let t=this.r,s=this.g,i=this.b;return e===Ce&&(t=we(t),s=we(s),i=we(i)),Math.round(ht(t)*255)*65536+Math.round(ht(s)*255)*256+Math.round(ht(i)*255)}getHexString(e=Ce){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=At){let s=this.r,i=this.g,n=this.b;t===Ce&&(s=we(s),i=we(i),n=we(n));const a=Math.max(s,i,n),h=Math.min(s,i,n);let o=0,l=0;const c=(h+a)/2;if(h!==a){const u=a-h;l=c<=.5?u/(a+h):u/(2-a-h),a===s?o=(i-n)/u+(i<n?6:0):a===i?o=(n-s)/u+2:o=(s-i)/u+4,o/=6}return e.h=o,e.s=l,e.l=c,e}getRGB(e,t=At){return e.r=this.r,e.g=this.g,e.b=this.b,t===Ce&&(e.r=we(e.r),e.g=we(e.g),e.b=we(e.b)),e}getStyle(e=Ce){const t=this.getRGB({},e);return`rgb(${Math.round(t.r*255)},${Math.round(t.g*255)},${Math.round(t.b*255)})`}offsetHSL(e,t,s){return this.getHSL(Pt),this.setHSL(Pt.h+e,Pt.s+t,Pt.l+s)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,s){return this.r=e.r+(t.r-e.r)*s,this.g=e.g+(t.g-e.g)*s,this.b=e.b+(t.b-e.b)*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}Ae.prototype.isColor=!0;const gs={black:0,white:16777215,red:16711680,green:32768,lime:65280,blue:255,yellow:16776960,cyan:65535,magenta:16711935,gray:8421504,grey:8421504,orange:16753920};Ae.NAMES=gs;const ke=new C,Te=Array.from({length:8},()=>new C);class ze{constructor(e=new C(1/0,1/0,1/0),t=new C(-1/0,-1/0,-1/0)){this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0;t<e.length;t+=3)this.expandByPoint(ke.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0;t<e.count;t++)this.expandByPoint(ke.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(const t of e)this.expandByPoint(t);return this}setFromCenterAndSize(e,t){return ke.copy(t).multiplyScalar(.5),this.min.copy(e).sub(ke),this.max.copy(e).add(ke),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new ze().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const s=e.geometry;if(s!==void 0){const i=s.getAttribute("position");if(t&&i!==void 0)for(let n=0;n<i.count;n++)this.expandByPoint(ke.fromBufferAttribute(i,n).applyMatrix4(e.matrixWorld));else s.boundingBox===null&&s.computeBoundingBox(),Gs.copy(s.boundingBox).applyMatrix4(e.matrixWorld),this.union(Gs)}for(const i of e.children)this.expandByObject(i,t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,ke),ke.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,s;const i=e.normal;return i.x>0?(t=i.x*this.min.x,s=i.x*this.max.x):(t=i.x*this.max.x,s=i.x*this.min.x),i.y>0?(t+=i.y*this.min.y,s+=i.y*this.max.y):(t+=i.y*this.max.y,s+=i.y*this.min.y),i.z>0?(t+=i.z*this.min.z,s+=i.z*this.max.z):(t+=i.z*this.max.z,s+=i.z*this.min.z),t<=-e.constant&&s>=-e.constant}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ke).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?(e.makeEmpty(),e):(this.getCenter(e.center),e.radius=this.getSize(ke).length()*.5,e)}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){if(this.isEmpty())return this;const t=this.min,s=this.max;return Te[0].set(t.x,t.y,t.z).applyMatrix4(e),Te[1].set(t.x,t.y,s.z).applyMatrix4(e),Te[2].set(t.x,s.y,t.z).applyMatrix4(e),Te[3].set(t.x,s.y,s.z).applyMatrix4(e),Te[4].set(s.x,t.y,t.z).applyMatrix4(e),Te[5].set(s.x,t.y,s.z).applyMatrix4(e),Te[6].set(s.x,s.y,t.z).applyMatrix4(e),Te[7].set(s.x,s.y,s.z).applyMatrix4(e),this.setFromPoints(Te)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}ze.prototype.isBox3=!0;const Gs=new ze,Zr=new ze,as=new C;class Pe{constructor(e=new C,t=-1){this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){t!==void 0?this.center.copy(t):Zr.setFromPoints(e).getCenter(this.center);let s=0;for(const i of e)s=Math.max(s,this.center.distanceToSquared(i));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}clone(){return new Pe().copy(this)}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const s=this.center.distanceToSquared(e);return t.copy(e),s>this.radius*this.radius&&t.sub(this.center).normalize().multiplyScalar(this.radius).add(this.center),t}getBoundingBox(e){return this.isEmpty()?e.makeEmpty():(e.set(this.center,this.center),e.expandByScalar(this.radius))}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;as.subVectors(e,this.center);const t=as.lengthSq();if(t>this.radius*this.radius){const s=Math.sqrt(t),i=(s-this.radius)*.5;this.center.addScaledVector(as,i/s),this.radius+=i}return this}union(e){if(e.isEmpty())return this;if(this.isEmpty())return this.copy(e);const t=this.center.distanceTo(e.center);if(t+e.radius<=this.radius)return this;if(t+this.radius<=e.radius)return this.copy(e);const s=(t+this.radius+e.radius)*.5;return this.center.lerp(e.center,(s-this.radius)/t),this.radius=s,this}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}}Pe.prototype.isSphere=!0;const Hs=new C,Qr=new C,Jr=new Ze;class Be{constructor(e=new C(1,0,0),t=0){this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,s,i){return this.normal.set(e,t,s),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(e),this}setFromCoplanarPoints(e,t,s){const i=Hs.subVectors(s,t).cross(Qr.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e)}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}clone(){return new Be().copy(this)}normalize(){const e=this.normal.length();if(e===0)return this;const t=1/e;return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}applyMatrix4(e,t){const s=t||Jr.getNormalMatrix(e),i=this.coplanarPoint(Hs).applyMatrix4(e),n=this.normal.applyMatrix3(s).normalize();return this.constant=-i.dot(n),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}}Be.prototype.isPlane=!0;const qs=new Pe,Ct=new C;class zt{constructor(e=new Be,t=new Be,s=new Be,i=new Be,n=new Be,a=new Be){this.planes=[e,t,s,i,n,a]}set(e,t,s,i,n,a){const h=this.planes;return h[0].copy(e),h[1].copy(t),h[2].copy(s),h[3].copy(i),h[4].copy(n),h[5].copy(a),this}copy(e){for(let t=0;t<6;t++)this.planes[t].copy(e.planes[t]);return this}clone(){return new zt().copy(this)}setFromProjectionMatrix(e,t=Ge,s=!0){const i=this.planes,n=e.elements,a=n[0],h=n[4],o=n[8],l=n[12],c=n[1],u=n[5],f=n[9],p=n[13],m=n[2],d=n[6],v=n[10],y=n[14],w=n[3],g=n[7],S=n[11],k=n[15];return i[0].setComponents(w+a,g+h,S+o,k+l).normalize(),i[1].setComponents(w-a,g-h,S-o,k-l).normalize(),i[2].setComponents(w+c,g+u,S+f,k+p).normalize(),i[3].setComponents(w-c,g-u,S-f,k-p).normalize(),s?(i[4].setComponents(w-m,g-d,S-v,k-y).normalize(),i[5].setComponents(m,d,v,y).normalize()):t===qr?(i[4].setComponents(w+m,g+d,S+v,k+y).normalize(),i[5].setComponents(w-m,g-d,S-v,k-y).normalize()):(i[4].setComponents(m,d,v,y).normalize(),i[5].setComponents(w-m,g-d,S-v,k-y).normalize()),this}intersectsObject(e){const t=e.geometry;return t.boundingSphere===null&&t.computeBoundingSphere(),qs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld),this.intersectsSphere(qs)}intersectsSphere(e){const t=this.planes,s=e.center,i=-e.radius;for(let n=0;n<6;n++)if(t[n].distanceToPoint(s)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let s=0;s<6;s++){const i=t[s].normal;if(Ct.x=i.x>0?e.max.x:e.min.x,Ct.y=i.y>0?e.max.y:e.min.y,Ct.z=i.z>0?e.max.z:e.min.z,t[s].distanceToPoint(Ct)<0)return!1}return!0}containsPoint(e){for(let t=0;t<6;t++)if(this.planes[t].distanceToPoint(e)<0)return!1;return!0}}const en=new Float32Array(1);new Uint32Array(en.buffer);class Yt{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const s=this._listeners;s[e]===void 0&&(s[e]=[]),s[e].includes(t)||s[e].push(t)}hasEventListener(e,t){const s=this._listeners;return s!==void 0&&s[e]!==void 0&&s[e].includes(t)}removeEventListener(e,t){const s=this._listeners&&this._listeners[e];if(s===void 0)return;const i=s.indexOf(t);i!==-1&&s.splice(i,1)}dispatchEvent(e){const t=this._listeners&&this._listeners[e.type];if(t!==void 0){e.target=this;for(const s of t.slice())s.call(this,e);e.target=null}}}class tn{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let sn=0;const js=new C,et=new ve,Le=new U,Tt=new C,ct=new C,rn=new C,nn=new ve,Xs=new C(1,0,0),Ks=new C(0,1,0),Ys=new C(0,0,1),Zs={type:"added"},an={type:"removed"},os={type:"childadded",child:null},ls={type:"childremoved",child:null};class xe extends Yt{constructor(){super(),Object.defineProperty(this,"id",{value:sn++}),this.uuid=Kt(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=xe.DEFAULT_UP.clone();const e=new C,t=new Oe,s=new ve,i=new C(1,1,1);t._onChange(()=>s.setFromEuler(t,!1)),s._onChange(()=>t.setFromQuaternion(s,void 0,!1)),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:s},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new U},normalMatrix:{value:new Ze}}),this.matrix=new U,this.matrixWorld=new U,this.matrixAutoUpdate=xe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=xe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new tn,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.userData={}}onBeforeRender(){}onAfterRender(){}onBeforeShadow(){}onAfterShadow(){}dispose(){this.dispatchEvent({type:"dispose"})}applyMatrix4(e){return this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return et.setFromAxisAngle(e,t),this.quaternion.multiply(et),this}rotateOnWorldAxis(e,t){return et.setFromAxisAngle(e,t),this.quaternion.premultiply(et),this}rotateX(e){return this.rotateOnAxis(Xs,e)}rotateY(e){return this.rotateOnAxis(Ks,e)}rotateZ(e){return this.rotateOnAxis(Ys,e)}translateOnAxis(e,t){return js.copy(e).applyQuaternion(this.quaternion),this.position.add(js.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Xs,e)}translateY(e){return this.translateOnAxis(Ks,e)}translateZ(e){return this.translateOnAxis(Ys,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Le.copy(this.matrixWorld).invert())}lookAt(e,t,s){e.isVector3?Tt.copy(e):Tt.set(e,t,s);const i=this.parent;this.updateWorldMatrix(!0,!1),ct.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Le.lookAt(ct,Tt,this.up):Le.lookAt(Tt,ct,this.up),this.quaternion.setFromRotationMatrix(Le),i&&(Le.extractRotation(i.matrixWorld),et.setFromRotationMatrix(Le),this.quaternion.premultiply(et.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?this:(e&&e.isObject3D&&(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Zs),os.child=e,this.dispatchEvent(os),os.child=null),this)}remove(e){if(arguments.length>1){for(let s=0;s<arguments.length;s++)this.remove(arguments[s]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(an),ls.child=e,this.dispatchEvent(ls),ls.child=null),this}removeFromParent(){return this.parent!==null&&this.parent.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Le.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Le.multiply(e.parent.matrixWorld)),e.applyMatrix4(Le),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Zs),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(const s of this.children){const i=s.getObjectByProperty(e,t);if(i!==void 0)return i}}getObjectsByProperty(e,t,s=[]){this[e]===t&&s.push(this);for(const i of this.children)i.getObjectsByProperty(e,t,s);return s}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ct,e,rn),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ct,nn,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}traverse(e){e(this);const t=this.children;for(let s=0,i=t.length;s<i;s++)t[s].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let s=0,i=t.length;s<i;s++)t[s].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let s=0,i=t.length;s<i;s++){const n=t[s];(n.matrixWorldAutoUpdate===!0||e===!0)&&n.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(s===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(s.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let n=0,a=i.length;n<a;n++)i[n].matrixWorldAutoUpdate===!0&&i[n].updateWorldMatrix(!1,!0)}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,e.onBeforeRender!==xe.prototype.onBeforeRender&&(this.onBeforeRender=e.onBeforeRender),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(const s of e.children)this.add(s.clone());return this}}xe.DEFAULT_UP=new C(0,1,0);xe.DEFAULT_MATRIX_AUTO_UPDATE=!0;xe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;xe.prototype.isObject3D=!0;class on extends xe{constructor(){super(),this.type="Group"}}on.prototype.isGroup=!0;class Ps extends xe{constructor(){super(),this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Oe,this.environmentIntensity=1,this.environmentRotation=new Oe,this.overrideMaterial=null}copy(e,t){return super.copy(e,t),this.background=e.background,this.environment=e.environment,this.fog=e.fog,this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentRotation.copy(e.environmentRotation),this.environmentIntensity=e.environmentIntensity,this.overrideMaterial=e.overrideMaterial,this.matrixAutoUpdate=e.matrixAutoUpdate,this}}Ps.prototype.isScene=!0;const Qi=35044,he=new C,hs=new se,Ji={getComponent(r,e){const t=this.array[this._idx(r,e)];return this.normalized?Yi(t,this.array):t},setComponent(r,e,t){return this.array[this._idx(r,e)]=this.normalized?Zi(t,this.array):t,this},getX(r){return this.getComponent(r,0)},getY(r){return this.getComponent(r,1)},getZ(r){return this.getComponent(r,2)},getW(r){return this.getComponent(r,3)},setX(r,e){return this.setComponent(r,0,e)},setY(r,e){return this.setComponent(r,1,e)},setZ(r,e){return this.setComponent(r,2,e)},setW(r,e){return this.setComponent(r,3,e)},setXY(r,e,t){return this.setComponent(r,0,e),this.setComponent(r,1,t)},setXYZ(r,e,t,s){return this.setComponent(r,0,e),this.setComponent(r,1,t),this.setComponent(r,2,s)},setXYZW(r,e,t,s,i){return this.setComponent(r,0,e),this.setComponent(r,1,t),this.setComponent(r,2,s),this.setComponent(r,3,i)},applyMatrix3(r){if(this.itemSize===2)for(let e=0;e<this.count;e++)hs.fromBufferAttribute(this,e).applyMatrix3(r),this.setXY(e,hs.x,hs.y);else if(this.itemSize===3)for(let e=0;e<this.count;e++)he.fromBufferAttribute(this,e).applyMatrix3(r),this.setXYZ(e,he.x,he.y,he.z);return this},applyMatrix4(r){for(let e=0;e<this.count;e++)he.fromBufferAttribute(this,e).applyMatrix4(r),this.setXYZ(e,he.x,he.y,he.z);return this},applyNormalMatrix(r){for(let e=0;e<this.count;e++)he.fromBufferAttribute(this,e).applyNormalMatrix(r),this.setXYZ(e,he.x,he.y,he.z);return this},transformDirection(r){for(let e=0;e<this.count;e++)he.fromBufferAttribute(this,e).transformDirection(r),this.setXYZ(e,he.x,he.y,he.z);return this}};class le extends Yt{constructor(e,t,s=!1){if(super(),Array.isArray(e))throw new TypeError("BufferAttribute: array should be a Typed Array.");this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=s,this.usage=Qi,this.updateRanges=[],this.gpuType=1015,this.version=0,this.onUploadCallback=er}set needsUpdate(e){e===!0&&this.version++}_idx(e,t){return e*this.itemSize+t}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}onUpload(e){return this.onUploadCallback=e,this}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,s){const i=this.itemSize;e*=i,s*=t.itemSize;for(let n=0;n<i;n++)this.array[e+n]=t.array[s+n];return this}copyArray(e){return this.array.set(e),this}set(e,t=0){return this.array.set(e,t),this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}dispose(){this.dispatchEvent({type:"dispose"})}}Object.assign(le.prototype,Ji);le.prototype.isBufferAttribute=!0;function er(){}class ln extends le{constructor(e,t,s){super(new Uint16Array(e),t,s)}}class hn extends le{constructor(e,t,s){super(new Uint32Array(e),t,s)}}class nt extends le{constructor(e,t,s){super(new Float32Array(e),t,s)}}class Xe extends le{constructor(e,t,s,i=1){super(e,t,s),this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(){return new Xe(this.array,this.itemSize).copy(this)}}Xe.prototype.isInstancedBufferAttribute=!0;class tr extends Yt{constructor(e,t){super(),this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Qi,this.updateRanges=[],this.version=0,this.uuid=Kt(),this.onUploadCallback=er}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}set(e,t=0){return this.array.set(e,t),this}onUpload(e){return this.onUploadCallback=e,this}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,s){e*=this.stride,s*=t.stride;for(let i=0;i<this.stride;i++)this.array[e+i]=t.array[s+i];return this}clone(){return new this.constructor(new this.array.constructor(this.array),this.stride).copy(this)}dispose(){this.dispatchEvent({type:"dispose"})}}tr.prototype.isInterleavedBuffer=!0;class Cs extends tr{constructor(e,t,s=1){super(e,t),this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(){return new Cs(new this.array.constructor(this.array),this.stride,this.meshPerAttribute)}}Cs.prototype.isInstancedInterleavedBuffer=!0;class sr{constructor(e,t,s,i=!1){this.name="",this.data=e,this.itemSize=t,this.offset=s,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}_idx(e,t){return e*this.data.stride+this.offset+t}clone(){const e=new this.array.constructor(this.count*this.itemSize);for(let t=0;t<this.count;t++)for(let s=0;s<this.itemSize;s++)e[t*this.itemSize+s]=this.array[this._idx(t,s)];return new le(e,this.itemSize,this.normalized)}}Object.assign(sr.prototype,Ji);sr.prototype.isInterleavedBufferAttribute=!0;let cn=0;const Ne=new U,un=new Ze,Qs=new ve,fn=new ze,tt=new C,Lt=new C;function dn(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}class _e extends Yt{constructor(){super(),Object.defineProperty(this,"id",{value:cn++}),this.uuid=Kt(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(dn(e)?hn:ln)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this.attributesVersion=(this.attributesVersion||0)+1,this}deleteAttribute(e){return delete this.attributes[e],this.attributesVersion=(this.attributesVersion||0)+1,this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,s=0){this.groups.push({start:e,count:t,materialIndex:s})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const s=this.attributes.normal;s!==void 0&&(s.applyNormalMatrix(un.getNormalMatrix(e)),s.needsUpdate=!0);const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return this.applyMatrix4(Ne.makeRotationFromQuaternion(e))}rotateX(e){return this.applyMatrix4(Ne.makeRotationX(e))}rotateY(e){return this.applyMatrix4(Ne.makeRotationY(e))}rotateZ(e){return this.applyMatrix4(Ne.makeRotationZ(e))}translate(e,t,s){return this.applyMatrix4(Ne.makeTranslation(e,t,s))}scale(e,t,s){return this.applyMatrix4(Ne.makeScale(e,t,s))}lookAt(e){return Ne.lookAt(e,tt.set(0,0,0),new C(0,1,0)),Qs.setFromRotationMatrix(Ne),this.applyQuaternion(Qs)}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Lt).negate(),this.translate(Lt.x,Lt.y,Lt.z)}setFromPoints(e){const t=[];for(const s of e)t.push(s.x,s.y,s.z||0);return this.setAttribute("position",new nt(t,3))}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ze);const e=this.attributes.position;if(e===void 0){this.boundingBox.makeEmpty();return}this.boundingBox.setFromBufferAttribute(e)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Pe);const e=this.attributes.position;if(e===void 0){this.boundingSphere.makeEmpty();return}const t=this.boundingSphere.center;fn.setFromBufferAttribute(e).getCenter(t);let s=0;for(let i=0;i<e.count;i++)s=Math.max(s,t.distanceToSquared(tt.fromBufferAttribute(e,i)));this.boundingSphere.radius=Math.sqrt(s)}computeTangents(){const e=this.index,t=this.attributes.position,s=this.attributes.normal,i=this.attributes.uv;if(e===null||t===void 0||s===void 0||i===void 0){console.error("BufferGeometry.computeTangents(): missing required attributes (index, position, normal or uv)");return}const n=t.count;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new le(new Float32Array(4*n),4));const a=this.getAttribute("tangent"),h=[],o=[];for(let M=0;M<n;M++)h[M]=new C,o[M]=new C;const l=new C,c=new C,u=new C,f=new se,p=new se,m=new se,d=new C,v=new C,y=(M,x,z)=>{l.fromBufferAttribute(t,M),c.fromBufferAttribute(t,x),u.fromBufferAttribute(t,z),f.fromBufferAttribute(i,M),p.fromBufferAttribute(i,x),m.fromBufferAttribute(i,z),c.sub(l),u.sub(l),p.sub(f),m.sub(f);const P=1/(p.x*m.y-m.x*p.y);isFinite(P)&&(d.copy(c).multiplyScalar(m.y).addScaledVector(u,-p.y).multiplyScalar(P),v.copy(u).multiplyScalar(p.x).addScaledVector(c,-m.x).multiplyScalar(P),h[M].add(d),h[x].add(d),h[z].add(d),o[M].add(v),o[x].add(v),o[z].add(v))},w=this.groups.length?this.groups:[{start:0,count:e.count}];for(const M of w)for(let x=M.start;x<M.start+M.count;x+=3)y(e.getX(x),e.getX(x+1),e.getX(x+2));const g=new C,S=new C,k=new C,T=new C,b=M=>{S.fromBufferAttribute(s,M),k.copy(S);const x=h[M];g.copy(x).sub(S.multiplyScalar(S.dot(x))).normalize(),T.crossVectors(k,x);const z=T.dot(o[M])<0?-1:1;a.setXYZW(M,g.x,g.y,g.z,z)};for(const M of w)for(let x=M.start;x<M.start+M.count;x++)b(e.getX(x))}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t===void 0)return;let s=this.getAttribute("normal");if(s===void 0||s.count!==t.count)s=new le(new Float32Array(t.count*3),3),this.setAttribute("normal",s);else for(let f=0;f<s.count;f++)s.setXYZ(f,0,0,0);const i=new C,n=new C,a=new C,h=new C,o=new C,l=new C,c=new C,u=new C;if(e)for(let f=0,p=e.count;f<p;f+=3){const m=e.getX(f),d=e.getX(f+1),v=e.getX(f+2);i.fromBufferAttribute(t,m),n.fromBufferAttribute(t,d),a.fromBufferAttribute(t,v),h.subVectors(a,n),o.subVectors(i,n),h.cross(o),l.fromBufferAttribute(s,m),c.fromBufferAttribute(s,d),u.fromBufferAttribute(s,v),l.add(h),c.add(h),u.add(h),s.setXYZ(m,l.x,l.y,l.z),s.setXYZ(d,c.x,c.y,c.z),s.setXYZ(v,u.x,u.y,u.z)}else for(let f=0,p=t.count;f<p;f+=3)i.fromBufferAttribute(t,f),n.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),h.subVectors(a,n),o.subVectors(i,n),h.cross(o),s.setXYZ(f,h.x,h.y,h.z),s.setXYZ(f+1,h.x,h.y,h.z),s.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),s.needsUpdate=!0}normalizeNormals(){const e=this.attributes.normal;for(let t=0,s=e.count;t<s;t++)tt.fromBufferAttribute(e,t).normalize(),e.setXYZ(t,tt.x,tt.y,tt.z)}toNonIndexed(){if(this.index===null)return console.warn("BufferGeometry.toNonIndexed(): geometry is already non-indexed."),this;const e=new _e,t=this.index,s=i=>{const n=i.itemSize,a=new i.array.constructor(t.count*n);for(let h=0;h<t.count;h++){const o=t.getX(h);for(let l=0;l<n;l++)a[h*n+l]=i.array[i._idx(o,l)]}return new le(a,n,i.normalized)};for(const i in this.attributes)e.setAttribute(i,s(this.attributes[i]));for(const i in this.morphAttributes)e.morphAttributes[i]=this.morphAttributes[i].map(s);e.morphTargetsRelative=this.morphTargetsRelative;for(const i of this.groups)e.addGroup(i.start,i.count,i.materialIndex);return e}clone(){return new _e().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.name=e.name,e.index!==null&&this.setIndex(e.index.clone());for(const t in e.attributes)this.setAttribute(t,e.attributes[t].clone());for(const t in e.morphAttributes)this.morphAttributes[t]=e.morphAttributes[t].map(s=>s.clone());this.morphTargetsRelative=e.morphTargetsRelative;for(const t of e.groups)this.addGroup(t.start,t.count,t.materialIndex);return e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}_e.prototype.isBufferGeometry=!0;class Zt extends _e{constructor(){super(),this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}clone(){return new Zt().copy(this)}}Zt.prototype.isInstancedBufferGeometry=!0;class Ke extends xe{constructor(e=new _e,t=null){super(),this.type="Mesh",this.geometry=e,this.material=t,this.count=1}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this.count=e.count,this}}Ke.prototype.isMesh=!0;const ut=new U,Js=new ze,ei=new Pe;class bt extends Ke{constructor(e,t,s){super(e,t),this.type="InstancedMesh",this.instanceMatrix=new Xe(new Float32Array(s*16),16),this.instanceColor=null,this.count=s,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<s;i++)this.setMatrixAt(i,ut.identity())}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}getColorAt(e,t){return t.fromArray(this.instanceColor.array,e*3)}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Xe(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new ze),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let t=0;t<this.count;t++)this.getMatrixAt(t,ut),Js.copy(e.boundingBox).applyMatrix4(ut),this.boundingBox.union(Js)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Pe),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let t=0;t<this.count;t++)this.getMatrixAt(t,ut),ei.copy(e.boundingSphere).applyMatrix4(ut),this.boundingSphere.union(ei)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}clone(e){return new bt(this.geometry,this.material,this.count).copy(this,e)}dispose(){this.dispatchEvent({type:"dispose"})}}bt.prototype.isInstancedMesh=!0;const Ee=new C,ti=new se,si=new se;class Ts extends xe{constructor(){super(),this.type="Camera",this.matrixWorldInverse=new U,this.projectionMatrix=new U,this.projectionMatrixInverse=new U,this.coordinateSystem=Ge,this.reversedDepth=!0}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this.reversedDepth=e.reversedDepth,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}Ts.prototype.isCamera=!0;function ir(r,e,t,s,i,n,a){r.view===null&&(r.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1});const h=r.view;h.enabled=!0,h.fullWidth=e,h.fullHeight=t,h.offsetX=s,h.offsetY=i,h.width=n,h.height=a,r.updateProjectionMatrix()}class rr extends Ts{constructor(e=50,t=1,s=.1,i=2e3){super(),this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=s,this.far=i,this.infiniteFar=!1,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.infiniteFar=e.infiniteFar,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Gt*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){return .5*this.getFilmHeight()/Math.tan(vt*.5*this.fov)}getEffectiveFOV(){return Gt*2*Math.atan(Math.tan(vt*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,s){Ee.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ee.x,Ee.y).multiplyScalar(-e/Ee.z),Ee.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),s.set(Ee.x,Ee.y).multiplyScalar(-e/Ee.z)}getViewSize(e,t){return this.getViewBounds(e,ti,si),t.subVectors(si,ti)}setViewOffset(e,t,s,i,n,a){this.aspect=e/t,ir(this,e,t,s,i,n,a)}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(vt*.5*this.fov)/this.zoom,s=2*t,i=this.aspect*s,n=-.5*i;const a=this.view;if(a!==null&&a.enabled){const l=a.fullWidth,c=a.fullHeight;n+=a.offsetX*i/l,t-=a.offsetY*s/c,i*=a.width/l,s*=a.height/c}const h=this.filmOffset;h!==0&&(n+=e*h/this.getFilmWidth());const o=this.infiniteFar?1/0:this.far;this.projectionMatrix.makePerspective(n,n+i,t,t-s,e,o,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}}rr.prototype.isPerspectiveCamera=!0;class pn extends Ts{constructor(e=-1,t=1,s=1,i=-1,n=.1,a=2e3){super(),this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=s,this.bottom=i,this.near=n,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,s,i,n,a){ir(this,e,t,s,i,n,a)}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),s=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let n=s-e,a=s+e,h=i+t,o=i-t;const l=this.view;if(l!==null&&l.enabled){const c=(this.right-this.left)/l.fullWidth/this.zoom,u=(this.top-this.bottom)/l.fullHeight/this.zoom;n+=c*l.offsetX,a=n+c*l.width,h-=u*l.offsetY,o=h-u*l.height}this.projectionMatrix.makeOrthographic(n,a,h,o,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}}pn.prototype.isOrthographicCamera=!0;function nr(r,e,t,s,i){e&&r.setIndex(e),r.setAttribute("position",new nt(t,3)),r.setAttribute("normal",new nt(s,3)),r.setAttribute("uv",new nt(i,2))}class mn extends _e{constructor(e=1,t=1,s=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:s,heightSegments:i};const n=e/2,a=t/2,h=Math.floor(s),o=Math.floor(i),l=h+1,c=o+1,u=e/h,f=t/o,p=[],m=[],d=[],v=[];for(let y=0;y<c;y++){const w=y*f-a;for(let g=0;g<l;g++)m.push(g*u-n,-w,0),d.push(0,0,1),v.push(g/h,1-y/o)}for(let y=0;y<o;y++)for(let w=0;w<h;w++){const g=w+l*y,S=w+l*(y+1),k=w+1+l*(y+1),T=w+1+l*y;p.push(g,S,T,S,k,T)}nr(this,p,m,d,v)}}class ii extends _e{constructor(e=1,t=32,s=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:s,thetaLength:i},t=Math.max(3,t);const n=[],a=[0,0,0],h=[0,0,1],o=[.5,.5];for(let l=0;l<=t;l++){const c=s+l/t*i,u=e*Math.cos(c),f=e*Math.sin(c);a.push(u,f,0),h.push(0,0,1),o.push((u/e+1)/2,(f/e+1)/2)}for(let l=1;l<=t;l++)n.push(l,l+1,0);nr(this,n,a,h,o)}}const F={device:null,queue:null,adapter:null,context:null,canvas:null,format:"bgra8unorm",features:new Set,limits:null,hasTimestamp:!1,hasFloat32Filterable:!1,encoder:null,frame:0,samplers:null,_submitHooks:[],async init({canvas:r=null,requiredLimits:e={},headless:t=!1}={}){if(!navigator.gpu)throw new Error("WebGPU is not available in this browser.");const s=await navigator.gpu.requestAdapter({powerPreference:"high-performance"});if(!s)throw new Error("No WebGPU adapter found.");this.adapter=s;const i=s.limits,n={maxSampledTexturesPerShaderStage:32,maxSamplersPerShaderStage:16,maxStorageBuffersPerShaderStage:10,maxStorageTexturesPerShaderStage:8,maxComputeWorkgroupStorageSize:32768,maxColorAttachmentBytesPerSample:64,maxStorageBuffersInVertexStage:4,maxStorageBuffersInFragmentStage:8,maxStorageTexturesInFragmentStage:4,maxBindingsPerBindGroup:1e3,maxBufferSize:1024*1024*1024,maxStorageBufferBindingSize:512*1024*1024,...e},a={};for(const c in n)i[c]!==void 0&&(a[c]=Math.min(n[c],i[c]));const o=["float32-filterable","timestamp-query","rg11b10ufloat-renderable","float32-blendable","shader-f16","clip-distances"].filter(c=>s.features.has(c));this.features=new Set(o),this.hasTimestamp=this.features.has("timestamp-query"),this.hasFloat32Filterable=this.features.has("float32-filterable");const l=await s.requestDevice({requiredFeatures:o,requiredLimits:a});return this.device=l,this.queue=l.queue,this.limits=l.limits,l.lost.then(c=>console.error("WebGPU device lost:",c.message)),l.addEventListener&&l.addEventListener("uncapturederror",c=>console.error("WebGPU:",c.error.message.split(`
`).slice(0,6).join(`
`))),r&&!t&&(this.canvas=r,this.context=r.getContext("webgpu"),this.format=navigator.gpu.getPreferredCanvasFormat(),this.context.configure({device:l,format:this.format,alphaMode:"opaque",usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_DST})),this._createSamplers(),this},_createSamplers(){const r=this.device,e=s=>r.createSampler(s),t={magFilter:"linear",minFilter:"linear",mipmapFilter:"linear"};this.samplers={linearRepeat:e({...t,addressModeU:"repeat",addressModeV:"repeat",addressModeW:"repeat"}),linearClamp:e({...t,addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge",addressModeW:"clamp-to-edge"}),linearMirror:e({...t,addressModeU:"mirror-repeat",addressModeV:"mirror-repeat",addressModeW:"mirror-repeat"}),anisoRepeat:e({...t,addressModeU:"repeat",addressModeV:"repeat",addressModeW:"repeat",maxAnisotropy:8}),aniso4Repeat:e({...t,addressModeU:"repeat",addressModeV:"repeat",addressModeW:"repeat",maxAnisotropy:4}),anisoClamp:e({...t,addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge",maxAnisotropy:8}),nearestClamp:e({magFilter:"nearest",minFilter:"nearest",mipmapFilter:"nearest",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge",addressModeW:"clamp-to-edge"}),nearestRepeat:e({magFilter:"nearest",minFilter:"nearest",mipmapFilter:"nearest",addressModeU:"repeat",addressModeV:"repeat",addressModeW:"repeat"}),shadow:e({magFilter:"linear",minFilter:"linear",compare:"less",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge"})}},beginFrame(){return this.frame++,this.getEncoder()},getEncoder(){return this.encoder||(this.encoder=this.device.createCommandEncoder()),this.encoder},submit(){if(!this.encoder)return;const r=this._submitHooks;this._submitHooks=[];for(const e of r)e.before&&e.before(this.encoder);this.queue.submit([this.encoder.finish()]),this.encoder=null;for(const e of r)e.after&&e.after()},onSubmit(r,e){this._submitHooks.push({before:r,after:e})},_pending:new Set,syncCompiles:[],renderPipeline(r){return this._async(r,"render")},computePipeline(r){return this._async(r,"compute")},_async(r,e){const t={pipeline:null,label:r.label,desc:r,kind:e,failed:!1},s=Promise.resolve().then(()=>t.pipeline?void 0:(e==="render"?this.device.createRenderPipelineAsync:this.device.createComputePipelineAsync).call(this.device,r).then(n=>{t.pipeline||(t.pipeline=n),t.desc=null},n=>{t.failed=!0,console.error(`WebGPU: pipeline "${r.label}" failed: ${n.message.split(`
`).slice(0,6).join(`
`)}`)})).finally(()=>this._pending.delete(s));return this._pending.add(s),t},ready(r){return r.pipeline||r.failed||(this.syncCompiles.push(r.label),r.pipeline=r.kind==="render"?this.device.createRenderPipeline(r.desc):this.device.createComputePipeline(r.desc)),r.pipeline},async pipelinesReady(){for(;this._pending.size;)await Promise.all([...this._pending])},computePass(r,e,t){const s=this.getEncoder().beginComputePass({label:r,timestampWrites:t});e(s),s.end()}},yn={r8unorm:{bytes:1,sample:"float"},rg8unorm:{bytes:2,sample:"float"},rgba8unorm:{bytes:4,sample:"float"},"rgba8unorm-srgb":{bytes:4,sample:"float"},bgra8unorm:{bytes:4,sample:"float"},r16float:{bytes:2,sample:"float"},rg16float:{bytes:4,sample:"float"},rgba16float:{bytes:8,sample:"float"},rg11b10ufloat:{bytes:4,sample:"float"},r32float:{bytes:4,sample:"unfilterable-float"},rg32float:{bytes:8,sample:"unfilterable-float"},rgba32float:{bytes:16,sample:"unfilterable-float"},r32uint:{bytes:4,sample:"uint"},rg32uint:{bytes:8,sample:"uint"},rgba32uint:{bytes:16,sample:"uint"},r32sint:{bytes:4,sample:"sint"},r8uint:{bytes:1,sample:"uint"},rgba8uint:{bytes:4,sample:"uint"},depth32float:{bytes:4,sample:"depth"},depth24plus:{bytes:4,sample:"depth"},"depth24plus-stencil8":{bytes:4,sample:"depth"}};function ar(r){const e=yn[r];if(!e)throw new Error("Unknown texture format "+r);return e}function xn(r){const e=ar(r).sample;return e==="unfilterable-float"&&F.hasFloat32Filterable?"float":e}const ri={f32:{size:4,align:4,n:1},i32:{size:4,align:4,n:1,int:!0},u32:{size:4,align:4,n:1,uint:!0},vec2f:{size:8,align:8,n:2},vec3f:{size:12,align:16,n:3},vec4f:{size:16,align:16,n:4},vec2i:{size:8,align:8,n:2,int:!0},vec4i:{size:16,align:16,n:4,int:!0},vec2u:{size:8,align:8,n:2,uint:!0},vec4u:{size:16,align:16,n:4,uint:!0},mat3x3f:{size:48,align:16,n:12,mat3:!0},mat4x4f:{size:64,align:16,n:16}};function vn(r){const e=/^(\w+)(?:\[(\d+)\])?$/.exec(r);if(!e||!ri[e[1]])throw new Error("Unsupported uniform type "+r);const t=ri[e[1]],s=e[2]?Number(e[2]):0;if(s&&t.align<16)throw new Error(`uniform array ${r}: element must be 16-byte aligned (use vec4f)`);return{name:e[1],base:t,count:s}}function ni(r,e,t,s,i,n){const{base:a}=i,h=a.int?t:a.uint?e:r;if(typeof n=="number"||typeof n=="boolean"){h[s]=Number(n);return}if(n!=null){if(n.isMatrix4||n.isMatrix3){const o=n.elements;if(a.mat3)if(o.length===9)for(let l=0;l<3;l++)for(let c=0;c<3;c++)r[s+l*4+c]=o[l*3+c];else for(let l=0;l<3;l++)for(let c=0;c<3;c++)r[s+l*4+c]=o[l*4+c];else for(let l=0;l<16;l++)r[s+l]=o[l];return}if(n.isColor){h[s]=n.r,h[s+1]=n.g,h[s+2]=n.b,a.n===4&&(h[s+3]=1);return}if(n.isVector2){h[s]=n.x,h[s+1]=n.y;return}if(n.isVector3){h[s]=n.x,h[s+1]=n.y,h[s+2]=n.z;return}if(n.isVector4||n.isQuaternion){h[s]=n.x,h[s+1]=n.y,h[s+2]=n.z,h[s+3]=n.w;return}if(ArrayBuffer.isView(n)||Array.isArray(n)){for(let o=0;o<Math.min(n.length,a.n);o++)h[s+o]=n[o];return}throw new Error("Cannot write uniform value "+n)}}let gn=0;class de{constructor(e,t,{label:s}={}){this.structName=e,this.label=s||e,this.id=gn++,this.layout={},this.fields={},this.order=[];let i=0,n=16;for(const h in t){const o=t[h],l=Array.isArray(o)?o[0]:o,c=Array.isArray(o)?o[1]:void 0,u=vn(l),f=u.base.align;n=Math.max(n,f),i=Math.ceil(i/f)*f;const p=u.count?Math.ceil(u.base.size/16)*16:u.base.size,m=u.count?p*u.count:u.base.size;this.layout[h]={offset:i,type:u,typeStr:l,stride:p,size:m},this.order.push(h),this.fields[h]={value:c!==void 0?c:wn(u)},i+=m}this.byteLength=Math.max(16,Math.ceil(i/n)*n),this.data=new ArrayBuffer(this.byteLength),this.f32=new Float32Array(this.data),this.u32=new Uint32Array(this.data),this.i32=new Int32Array(this.data),this.buffer=null,this.version=0;const a=this;this.values=new Proxy({},{get:(h,o)=>a.fields[o]&&a.fields[o].value,set:(h,o,l)=>(a.set(o,l),!0)})}get wgsl(){let e=`struct ${this.structName} {
`;for(const t of this.order){const{type:s}=this.layout[t];e+=s.count?`	${t}: array<${s.name}, ${s.count}>,
`:`	${t}: ${s.name},
`}return e+`};
`}set(e,t){const s=this.fields[e];if(!s)throw new Error(`${this.structName}: no uniform ${e}`);s.value&&typeof s.value=="object"&&!Array.isArray(s.value)&&s.value.copy&&t&&t.constructor===s.value.constructor?s.value.copy(t):s.value=t}get(e){return this.fields[e].value}_pack(){this.onBeforePack&&this.onBeforePack(this);const{f32:e,u32:t,i32:s,fields:i}=this,n=this._plan||this._makePlan();for(let a=0;a<n.length;a++){const{name:h,o,type:l,stride:c,count:u,n:f}=n[a],p=i[h].value;if(typeof p=="number"){(l.base.int?s:l.base.uint?t:e)[o]=p;continue}if(u){if(!p)continue;if(typeof p[0]=="number"){const m=l.base.int?s:l.base.uint?t:e,d=Math.min(u,p.length/f);for(let v=0;v<d;v++){const y=o+v*c,w=v*f,g=Math.min(f,p.length-w);for(let S=0;S<g;S++)m[y+S]=p[w+S]}}else{const m=Math.min(u,p.length);for(let d=0;d<m;d++)ni(e,t,s,o+d*c,l,p[d])}}else ni(e,t,s,o,l,p)}}_makePlan(){return this._plan=this.order.map(e=>{const{offset:t,type:s,stride:i}=this.layout[e];return{name:e,o:t/4,type:s,stride:i/4,count:s.count,n:s.base.n}}),this._plan}getBuffer(){return this.buffer||(this.buffer=F.device.createBuffer({label:this.label,size:this.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this._last=new Uint32Array(this.byteLength/4),this._last.fill(4294967295)),this.buffer}upload(e){if(e!==void 0&&e===this._token&&this.buffer)return this.buffer;this._token=e;const t=this.getBuffer();this._pack();const s=this.u32,i=this._last;let n=!1;for(let a=0;a<s.length;a++)if(s[a]!==i[a]){n=!0;break}return n&&(i.set(s),F.queue.writeBuffer(t,0,this.data)),t}}function wn(r){return r.count?null:r.base.n===1?0:new Array(r.base.n).fill(0)}let bn=0;class Ye{constructor(e={}){this.id=bn++,this.label=e.label||e.name||"texture"+this.id,this.width=Math.max(1,e.width||1),this.height=Math.max(1,e.height||1),this.depth=Math.max(1,e.depth||(e.dimension==="cube"?6:1)),this.dimension=e.dimension||"2d",this.format=e.format||"rgba8unorm",this.mipsOption=e.mips??!1,this.sampleCount=e.sampleCount||1;const t=e.usage||["sample","copyDst"];this.usageList=t,this.sampler=e.sampler||"linearClamp",this.gpu=null,this.version=0,this._views=new Map,this.isTexture=!0,e.data&&(this.pendingData=e.data)}get mipLevelCount(){return this.mipsOption===!0?Math.floor(Math.log2(Math.max(this.width,this.height,this.dimension==="3d"?this.depth:1)))+1:typeof this.mipsOption=="number"?this.mipsOption:1}get usage(){let e=0;for(const t of this.usageList)e|={sample:GPUTextureUsage.TEXTURE_BINDING,render:GPUTextureUsage.RENDER_ATTACHMENT,storage:GPUTextureUsage.STORAGE_BINDING,copySrc:GPUTextureUsage.COPY_SRC,copyDst:GPUTextureUsage.COPY_DST}[t];return this.mipLevelCount>1&&(e|=GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING),e}get isDepth(){return this.format.startsWith("depth")}get sampleType(){return xn(this.format)}wgslType(e=this.defaultViewDimension){const t=this.sampleType;if(t==="depth")return{"2d":"texture_depth_2d","2d-array":"texture_depth_2d_array",cube:"texture_depth_cube"}[e];const s=t==="uint"?"u32":t==="sint"?"i32":"f32";return`texture_${e.replace("-","_")}<${s}>`}get defaultViewDimension(){return this.dimension}getGPU(){return this.gpu||this._create(),this.gpu}_create(){const e=this.dimension==="3d"?"3d":"2d";if(this.gpu=F.device.createTexture({label:this.label,size:{width:this.width,height:this.height,depthOrArrayLayers:this.depth},dimension:e,format:this.format,mipLevelCount:this.mipLevelCount,sampleCount:this.sampleCount,usage:this.usage}),this._views.clear(),this.version++,this.pendingData){const t=this.pendingData;this.pendingData=null,this.upload(t)}}view(e=null){const t=this.getGPU(),s=e?JSON.stringify(e):"";let i=this._views.get(s);return i||(i=t.createView({label:this.label+s,dimension:e?.dimension||this.defaultViewDimension,...e||{}}),this._views.set(s,i)),i}resize(e,t,s=this.depth){if(e=Math.max(1,Math.floor(e)),t=Math.max(1,Math.floor(t)),e===this.width&&t===this.height&&s===this.depth&&this.gpu)return!1;if(this.width=e,this.height=t,this.depth=s,this.gpu){const i=this.gpu;F.onSubmit(null,()=>i.destroy()),this.gpu=null}return this._create(),!0}upload(e,{mip:t=0,layer:s=0,layers:i=null,width:n=null,height:a=null,x:h=0,y:o=0}={}){if(!this.gpu){if(t===0&&s===0&&!n){this.pendingData=e,this.getGPU();return}this.getGPU()}const l=ar(this.format).bytes,c=n||Math.max(1,this.width>>t),u=a||Math.max(1,this.height>>t),f=i||(this.dimension==="3d"?Math.max(1,this.depth>>t):this.depth-s),p=e instanceof ArrayBuffer?e:e.buffer,m=e instanceof ArrayBuffer?0:e.byteOffset;F.queue.writeTexture({texture:this.gpu,mipLevel:t,origin:{x:h,y:o,z:s}},p,{offset:m,bytesPerRow:c*l,rowsPerImage:u},{width:c,height:u,depthOrArrayLayers:f})}destroy(){this.gpu&&this.gpu.destroy(),this.gpu=null,this.version++}}class pt{constructor(e,t,{colors:s=["rgba16float"],depth:i=null,label:n="rt",mips:a=!1,usage:h=["sample","render","copySrc","copyDst"],depthUsage:o=["sample","render","copySrc","copyDst"],scale:l=1}={}){this.label=n,this.width=Math.max(1,e|0),this.height=Math.max(1,t|0),this.scale=l,this.textures=s.map((c,u)=>{const f=typeof c=="string"?{format:c}:c;return new Ye({label:`${n}.${f.name||u}`,width:this.width,height:this.height,format:f.format,mips:f.mips??a,usage:f.usage||h})}),this.depthTexture=i?new Ye({label:n+".depth",width:this.width,height:this.height,format:i,usage:o}):null}get texture(){return this.textures[0]}get formats(){return this.textures.map(e=>e.format)}setSize(e,t){if(e=Math.max(1,e|0),t=Math.max(1,t|0),e===this.width&&t===this.height)return!1;this.width=e,this.height=t;for(const s of this.textures)s.resize(e,t);return this.depthTexture&&this.depthTexture.resize(e,t),!0}}let Mn=0;class ye{constructor({label:e,count:t,type:s="vec4f",stride:i=null,data:n=null,usage:a=[]}){if(this.id=Mn++,this.label=e||"buffer"+this.id,this.count=t,this.type=s,this.stride=i||{f32:4,u32:4,i32:4,"atomic<u32>":4,"atomic<i32>":4,vec2f:8,vec2u:8,vec3f:16,vec4f:16,vec4u:16,vec4i:16,mat4x4f:64}[s],!this.stride)throw new Error(`StorageBuffer ${this.label}: pass a stride for ${s}`);this.byteLength=Math.max(16,t*this.stride),this.extraUsage=a,this.gpu=null,this.version=0,this.pendingData=n,this.isStorageBuffer=!0}getGPU(){if(!this.gpu){let e=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST|GPUBufferUsage.COPY_SRC;for(const t of this.extraUsage)e|={vertex:GPUBufferUsage.VERTEX,index:GPUBufferUsage.INDEX,indirect:GPUBufferUsage.INDIRECT,uniform:GPUBufferUsage.UNIFORM}[t];if(this.gpu=F.device.createBuffer({label:this.label,size:Math.ceil(this.byteLength/4)*4,usage:e}),this.version++,this.pendingData){const t=this.pendingData;this.pendingData=null,this.write(t)}}return this.gpu}write(e,t=0){if(!this.gpu){if(t===0){this.pendingData=e,this.getGPU();return}this.getGPU()}F.queue.writeBuffer(this.gpu,t,e.buffer||e,e.byteOffset||0,e.byteLength??void 0)}destroy(){this.gpu&&this.gpu.destroy(),this.gpu=null}}const or=[["smpLinearRepeat","linearRepeat","filtering"],["smpLinearClamp","linearClamp","filtering"],["smpLinearMirror","linearMirror","filtering"],["smpAnisoRepeat","anisoRepeat","filtering"],["smpAnisoClamp","anisoClamp","filtering"],["smpAniso4Repeat","aniso4Repeat","filtering"],["smpNearestClamp","nearestClamp","non-filtering"],["smpNearestRepeat","nearestRepeat","non-filtering"],["smpShadow","shadow","comparison"]];let Sn=0;class Q{constructor({name:e,deps:t=[],code:s="",bindings:i={},uniforms:n=null,uniformName:a=null}){this.id=Sn++,this.name=e||"module"+this.id,this.deps=t.filter(Boolean),this.code=s,this.bindings={...i},n&&(this.bindings[a||zn(n.structName)]={uniform:n}),this.isShaderModule=!0}}function zn(r){return r[0].toLowerCase()+r.slice(1)}function ws(r){const e=[],t=new Set,s=i=>{if(!(!i||t.has(i))){t.add(i);for(const n of i.deps)s(n);e.push(i)}};for(const i of r)s(i);return e}function ai(r,e={}){const t=r.split(`
`),s=[],i=[],n=()=>i.length===0||i[i.length-1].active,a=h=>{h=h.trim();let o;if(o=/^!\s*(\w+)$/.exec(h))return!oi(e[o[1]]);if(o=/^(\w+)\s*(==|!=|>=|<=|>|<)\s*([\w.'"-]+)$/.exec(h)){const l=e[o[1]];let c=o[3].replace(/^['"]|['"]$/g,"");switch(!isNaN(Number(c))&&typeof l=="number"&&(c=Number(c)),o[2]){case"==":return l==c;case"!=":return l!=c;case">=":return l>=c;case"<=":return l<=c;case">":return l>c;case"<":return l<c}}return/\|\|/.test(h)?h.split("||").some(l=>a(l)):/&&/.test(h)?h.split("&&").every(l=>a(l)):oi(e[h])};for(const h of t){const o=h.trim();let l;if(l=/^#(if|ifdef|ifndef)\s+(.*)$/.exec(o)){const c=n();let u;l[1]==="ifdef"?u=e[l[2].trim()]!==void 0:l[1]==="ifndef"?u=e[l[2].trim()]===void 0:u=a(l[2]),i.push({active:c&&u,taken:u,parent:c});continue}if(l=/^#elif\s+(.*)$/.exec(o)){const c=i[i.length-1],u=!c.taken&&a(l[1]);c.active=c.parent&&u,c.taken=c.taken||u;continue}if(o==="#else"){const c=i[i.length-1];c.active=c.parent&&!c.taken,c.taken=!0;continue}if(o==="#endif"){i.pop();continue}n()&&s.push(h)}if(i.length)throw new Error("preprocess: unterminated #if");return s.join(`
`)}function oi(r){return r!=null&&r!==!1&&r!==0&&r!=="0"}function Se(r){return typeof r=="function"?r():r}function _n(r,e,t){const s=GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,i=t==="compute"?GPUShaderStage.COMPUTE:s;if(e.uniform){const n=e.uniform;return{layout:{visibility:i,buffer:{type:"uniform"}},decl:`var<uniform> ${r}: ${n.structName};`,struct:n}}if(e.uniformBuffer)return{layout:{visibility:i,buffer:{type:"uniform"}},decl:`var<uniform> ${r}: ${e.wgslType};`};if(e.storage){const n=Se(e.storage),a=e.access||"read",h=e.wgslType||`array<${e.type||n.type}>`;return{layout:{visibility:t==="compute"?i:a==="read"?s:GPUShaderStage.FRAGMENT,buffer:{type:a==="read"?"read-only-storage":"storage"}},decl:`var<storage, ${a==="read"?"read":"read_write"}> ${r}: ${h};`}}if(e.storageTexture){const n=Se(e.storageTexture),a=e.access||"write",h=e.viewDimension||e.view?.dimension||n.defaultViewDimension;return{layout:{visibility:t==="compute"?i:GPUShaderStage.FRAGMENT,storageTexture:{access:a==="write"?"write-only":a==="read"?"read-only":"read-write",format:n.format,viewDimension:h}},decl:`var ${r}: texture_storage_${h.replace("-","_")}<${n.format}, ${a}>;`}}if(e.texture){const n=Se(e.texture),a=e.viewDimension||e.view?.dimension||n.defaultViewDimension;let h=e.sampleType||n.sampleType,o=e.wgslType||n.wgslType(a);return e.sampleType==="unfilterable-float"&&n.isDepth&&(o=`texture_${a.replace("-","_")}<f32>`),{layout:{visibility:i,texture:{sampleType:h,viewDimension:a,multisampled:n.sampleCount>1}},decl:`var ${r}: ${o};`}}if(e.sampler)return{layout:{visibility:i,sampler:{type:e.samplerType||"filtering"}},decl:`var ${r}: ${e.samplerType==="comparison"?"sampler_comparison":"sampler"};`};throw new Error(`binding ${r}: unknown spec`)}function kn(r){if(r.uniform)return{buffer:r.uniform.getBuffer()};if(r.uniformBuffer)return{buffer:Se(r.uniformBuffer)};if(r.storage){const e=Se(r.storage),t=e.getGPU?e.getGPU():e;return r.offset!==void 0?{buffer:t,offset:r.offset,size:r.size}:{buffer:t}}if(r.storageTexture)return Se(r.storageTexture).view(r.view||{dimension:r.viewDimension||Se(r.storageTexture).defaultViewDimension,mipLevelCount:1,baseMipLevel:r.mip||0});if(r.texture){const e=Se(r.texture);return r.view||r.viewDimension?e.view({...r.view||{},dimension:r.viewDimension||r.view.dimension}):e.view()}if(r.sampler)return typeof r.sampler=="string"?F.samplers[r.sampler]:r.sampler;throw new Error("unknown binding")}const lr=0,hr=1,cr=2,ur=3,An=4;function Pn(r){return r.uniform?lr:r.uniformBuffer?hr:r.storage?cr:r.storageTexture||r.texture?ur:An}const Cn=4,li=new Map;function fr(r,e){const t=JSON.stringify(r);let s=li.get(t);return s||(s=F.device.createBindGroupLayout({label:e,entries:r}),li.set(t,s)),s}class Ls{constructor(e,t,s="bindings",i=null,n=null){if(this.label=s,this.stage=t,this.names=Object.keys(e),this.specs=e,this.described=this.names.map(h=>_n(h,e[h],t)),i)for(let h=0;h<this.names.length;h++){const o=this.described[h].layout,l=i[this.names[h]];l==="fragment"&&o.visibility&GPUShaderStage.FRAGMENT&&(o.visibility=GPUShaderStage.FRAGMENT),l==="vertex"&&o.visibility&GPUShaderStage.VERTEX&&(o.visibility=GPUShaderStage.VERTEX)}if(n)for(let h=0;h<this.names.length;h++){const o=this.described[h];n.has(this.names[h])&&(o.layout.buffer={type:"read-only-storage"},o.decl=o.decl.replace(/^var<uniform>/,"var<storage, read>"))}this.layout=fr(this.described.map((h,o)=>({binding:o,...h.layout})),s),this.group=null;const a=this.names.length;this._specs=this.names.map(h=>e[h]),this._kinds=this._specs.map(Pn),this._blocks=this._specs.filter(h=>h.uniform).map(h=>h.uniform),this._objs=new Array(a).fill(null),this._vers=new Array(a).fill(0),this._entry=null,this._cache=[],this._token=null}declarations(e){return this.described.map((t,s)=>`@group(${e}) @binding(${s}) ${t.decl}`).join(`
`)}structs(){const e=[];for(const t of this.described)t.struct&&!e.includes(t.struct)&&e.push(t.struct);return e}getBindGroup(e){if(e!==void 0&&e===this._token&&this.group)return this.group;this._token=e;const t=this._specs,s=this._kinds,i=this._objs,n=this._vers,a=t.length;for(let c=0;c<a;c++){const u=t[c];let f=null,p=0;switch(s[c]){case lr:f=u.uniform;break;case hr:f=Se(u.uniformBuffer);break;case cr:f=Se(u.storage),f.getGPU&&(f.getGPU(),p=f.version);break;case ur:f=Se(u.storageTexture||u.texture),f&&f.getGPU&&(f.getGPU(),p=f.version);break;default:f=u.sampler}i[c]=f,n[c]=p}const h=this._blocks;for(let c=0;c<h.length;c++)h[c].upload(e);if(this._entry&&this._matches(this._entry))return this.group;const o=this._cache;for(let c=0;c<o.length;c++){const u=o[c];if(!(u===this._entry||!this._matches(u)))return this._entry=u,this.group=u.group,this.group}const l=new Array(a);for(let c=0;c<a;c++)l[c]={binding:c,resource:kn(t[c])};return this.group=F.device.createBindGroup({label:this.label,layout:this.layout,entries:l}),this._entry={objs:i.slice(),vers:n.slice(),group:this.group},o.unshift(this._entry),o.length>Cn&&o.pop(),this.group}_matches(e){const t=this._objs,s=this._vers,i=e.objs,n=e.vers;for(let a=0;a<t.length;a++)if(t[a]!==i[a]||s[a]!==n[a])return!1;return!0}}let Fs=null,it=null;function Tn(r){Fs=r,it=null}function dr(r){if(it||(it={}),!it[r]){const e={frame:{uniform:Fs}};for(const[t,s,i]of or)e[t]={sampler:s,samplerType:i};it[r]=new Ls(e,r,"group0-"+r)}return it[r]}const hi=new WeakMap;function pr(r,e="render"){if(r===Fs)return dr(e);let t=hi.get(r);if(t||hi.set(r,t={}),!t[e]){const s={frame:{uniform:r}};for(const[i,n,a]of or)s[i]={sampler:n,samplerType:a};t[e]=new Ls(s,e,"group0-"+r.label)}return t[e]}function Qt({modules:r=[],bindings:e={},code:t="",defines:s={},stage:i="render",label:n="shader",header:a=""}){const h=ws(r),o={};for(const d of h)for(const v in d.bindings){if(o[v]&&o[v]!==d.bindings[v]&&!Ln(o[v],d.bindings[v]))throw new Error(`${n}: binding ${v} declared twice (${d.name})`);o[v]=d.bindings[v]}for(const d in e)o[d]=e[d];let l=null,c=null;if(i==="render"&&/@vertex\s+fn\s+vs\b/.test(t)){let d="";for(const b of h)d+=b.code+`
`;const v=ai(d+t,s),y=ci(v,"vs"),w=/@fragment\s+fn\s+fs\b/.test(v)?ci(v,"fs"):null;l={};for(const b in o)!y.has(b)&&(!w||w.has(b))?l[b]="fragment":w&&!w.has(b)&&y.has(b)&&(l[b]="vertex");c=new Set;const g=F.limits||{},S=(g.maxUniformBuffersPerShaderStage||12)-2,k={vertex:g.maxStorageBuffersInVertexStage??4,fragment:g.maxStorageBuffersInFragmentStage??g.maxStorageBuffersPerShaderStage??8},T=(b,M)=>!l[b]||l[b]===M;for(const b of["fragment","vertex"]){const M=Object.keys(o).filter(P=>o[P].uniform&&T(P,b)&&!c.has(P));let x=Object.keys(o).filter(P=>(o[P].storage||c.has(P))&&T(P,b)).length;M.sort((P,_)=>(l[P]===b?0:1)-(l[_]===b?0:1));let z=M.length;for(const P of M){if(z<=S||x>=k[b])break;c.add(P),x++,z--}}}const u=new Ls(o,i,n+".g1",l,c),f=dr(i),p=[...new Set([...f.structs(),...u.structs()])];let m="";F.features.has("shader-f16")&&s.F16&&(m+=`enable f16;
`),s.CLIP_DISTANCES&&(m+=`enable clip_distances;
`),/diagnostic\s*\(\s*off\s*,\s*derivative_uniformity/.test(a)||(m+=`diagnostic( off, derivative_uniformity );
`),m+=a,m+=p.map(d=>d.wgsl).join(`
`)+`
`,m+=f.declarations(0)+`
`,m+=u.declarations(1)+`
`;for(const d of h)m+=`// ---- ${d.name}
${d.code}
`;return m+=t,{code:ai(m,s),bindings:u,group0:f,modules:h}}function ci(r,e){const t=new Map,s=/\bfn\s+([A-Za-z_]\w*)\s*\(/g;let i;for(;i=s.exec(r);){const o=r.indexOf("{",i.index);if(o<0)break;let l=0,c=o;for(;c<r.length;c++){const f=r[c];if(f==="{")l++;else if(f==="}"&&--l===0)break}(!/@(vertex|fragment|compute)[^;{}]*$/.test(r.slice(Math.max(0,i.index-80),i.index))||i[1]===e)&&t.set(i[1],r.slice(i.index,c+1)),s.lastIndex=c+1}const n=new Set,a=[e],h=new Set;for(;a.length;){const o=a.pop();if(!(h.has(o)||!t.has(o))){h.add(o);for(const l of t.get(o).match(/[A-Za-z_]\w*/g)||[])n.add(l),t.has(l)&&!h.has(l)&&a.push(l)}}return n}function Ln(r,e){const t=Object.keys(r),s=Object.keys(e);return t.length===s.length&&t.every(i=>r[i]===e[i])}const ui=new Map;function Jt(r,e){let t=ui.get(r);return t||(t=F.device.createShaderModule({label:e,code:r}),ui.set(r,t),t.getCompilationInfo&&t.getCompilationInfo().then(s=>{const i=s.messages.filter(a=>a.type==="error");if(!i.length)return;const n=r.split(`
`);for(const a of i){const h=Math.max(0,a.lineNum-4),o=Math.min(n.length,a.lineNum+2),l=n.slice(h,o).map((c,u)=>`${h+u+1}${h+u+1===a.lineNum?">":" "} ${c}`).join(`
`);console.error(`WGSL error in ${e} (${a.lineNum}:${a.linePos}): ${a.message}
${l}`)}}),t)}class Me{constructor({label:e="kernel",modules:t=[],bindings:s={},code:i,workgroupSize:n=[64,1,1],defines:a={},entryPoint:h="main"}){this.label=e,this.workgroupSize=n;const[o,l=1,c=1]=n,u=i.replace(/\bWG_X\b/g,o).replace(/\bWG_Y\b/g,l).replace(/\bWG_Z\b/g,c),f=Qt({modules:t,bindings:s,code:u,defines:a,stage:"compute",label:e});this.source=f.code,this.bindings=f.bindings,this.group0=f.group0;const p=Jt(f.code,e);this.handle=F.computePipeline({label:e,layout:F.device.createPipelineLayout({bindGroupLayouts:[f.group0.layout,f.bindings.layout]}),compute:{module:p,entryPoint:h}}),this.timestampWrites=null}get pipeline(){return F.ready(this.handle)}dispatch(e,{pass:t=null,indirect:s=null}={}){const[i,n=1,a=1]=Array.isArray(e)?e:[e];if(!s&&(i===0||n===0||a===0))return;const h=o=>{o.setPipeline(F.ready(this.handle)),o.setBindGroup(0,this.group0.getBindGroup()),o.setBindGroup(1,this.bindings.getBindGroup()),s?o.dispatchWorkgroupsIndirect(s.buffer.getGPU?s.buffer.getGPU():s.buffer,s.offset||0):o.dispatchWorkgroups(i,n,a)};t?h(t):F.computePass(this.label,h,this.timestampWrites||void 0)}groups(e,t=1,s=1){const[i,n=1,a=1]=this.workgroupSize;return[Math.ceil(e/i),Math.ceil(t/n),Math.ceil(s/a)]}}const fi=new Map;let Ft=null;function Fn(r){let e=fi.get(r);return e||(Ft||(Ft=F.device.createShaderModule({label:"mipmap",code:`
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
	`})),e=F.device.createRenderPipeline({label:"mipmap "+r,layout:"auto",vertex:{module:Ft,entryPoint:"vs"},fragment:{module:Ft,entryPoint:"fs",targets:[{format:r}]},primitive:{topology:"triangle-list"}}),fi.set(r,e),e)}const di=new WeakMap;function Dn(r,e,t){let s=di.get(r);if(s&&s.gpu===e)return s;const i=r.mipLevelCount,n=r.dimension==="3d"?1:r.depth,a=[],h=t.getBindGroupLayout(0);for(let o=0;o<n;o++)for(let l=1;l<i;l++){const c=e.createView({dimension:"2d",baseMipLevel:l-1,mipLevelCount:1,baseArrayLayer:o,arrayLayerCount:1}),u=e.createView({dimension:"2d",baseMipLevel:l,mipLevelCount:1,baseArrayLayer:o,arrayLayerCount:1}),f=F.device.createBindGroup({label:"mipmap "+r.label,layout:h,entries:[{binding:0,resource:c},{binding:1,resource:F.samplers.linearClamp}]});a.push({bg:f,desc:{label:"mipmap",colorAttachments:[{view:u,loadOp:"clear",storeOp:"store",clearValue:[0,0,0,0]}]}})}return s={gpu:e,pipeline:t,steps:a},di.set(r,s),s}function Bn(r,e=F.getEncoder()){if(r.mipLevelCount<2)return;const t=r.getGPU(),s=Fn(r.format),{steps:i}=Dn(r,t,s);for(let n=0;n<i.length;n++){const a=e.beginRenderPass(i[n].desc);a.setPipeline(s),a.setBindGroup(0,i[n].bg),a.draw(3),a.end()}}const mr={view:"mat4x4f",proj:"mat4x4f",viewProj:"mat4x4f",invView:"mat4x4f",invProj:"mat4x4f",invViewProj:"mat4x4f",viewProjNoJitter:"mat4x4f",prevViewProjNoJitter:"mat4x4f",cameraPos:["vec3f",new C],near:["f32",.1],prevCameraPos:["vec3f",new C],far:["f32",6e4],resolution:["vec2f",new se(1,1)],invResolution:["vec2f",new se(1,1)],outputResolution:["vec2f",new se(1,1)],jitter:["vec2f",new se],prevJitter:["vec2f",new se],frameIndex:["u32",0],time:["f32",0],dt:["f32",1/60],seaLevel:["f32",0],sunDir:["vec3f",new C(.3,.6,-.7).normalize()],night:["f32",0],sunColor:["vec3f",new Ae(1,1,1)],exposure:["f32",1],skyIrradiance:["vec3f",new Ae(.3,.4,.6)],cameraUnderwater:["f32",0],horizonColor:["vec3f",new Ae(.6,.7,.8)],cameraWaterHeight:["f32",0],waterAbsorption:["vec3f",new C(.42,.075,.035)],windSpeed:["f32",7],waterScattering:["vec3f",new C(.012,.018,.024)],envIntensity:["f32",1],windDir:["vec2f",new se(.35,.94).normalize()],reversedDepth:["f32",1],pad0:["f32",0],debug:["vec4f",new G]},Rn=["view","proj","viewProj","invView","invProj","invViewProj","viewProjNoJitter","prevViewProjNoJitter","cameraPos","near","prevCameraPos","far","resolution","invResolution","jitter","prevJitter","reversedDepth"],Re=new de("Frame",mr,{label:"frame"});Tn(Re);function In(r){const e=new de("Frame",mr,{label:r});return e.onBeforePack=()=>{for(const t of Re.order)Rn.includes(t)||(e.fields[t].value=Re.fields[t].value)},e}const ce=Re.fields,me={time:ce.time,dt:ce.dt,seaLevel:ce.seaLevel,sunDir:ce.sunDir,sunColor:ce.sunColor,skyIrradiance:ce.skyIrradiance,horizonColor:ce.horizonColor,waterAbsorption:ce.waterAbsorption,waterScattering:ce.waterScattering,cameraUnderwater:ce.cameraUnderwater,cameraWaterHeight:ce.cameraWaterHeight,exposure:ce.exposure,windDir:ce.windDir,windSpeed:ce.windSpeed,night:ce.night,envIntensity:ce.envIntensity},Et=9.81,pi=new U;function yr(r,e,t,{jitterX:s=0,jitterY:i=0,prevViewProj:n=null,prevCameraPos:a=null,block:h=Re}={}){const o=h.fields;r.updateMatrixWorld(),r.matrixWorldInverse&&r.matrixWorldInverse.copy(r.matrixWorld).invert();const l=r.matrixWorldInverse,c=r.projectionMatrix;o.view.value=l.clone(),o.proj.value=c.clone();const u=new U().multiplyMatrices(c,l);o.viewProjNoJitter.value=u.clone();const f=2*s/e,p=2*i/t;pi.makeTranslation(f,p,0);const m=new U().multiplyMatrices(pi,u);o.viewProj.value=m,o.invView.value=r.matrixWorld.clone(),o.invProj.value=c.clone().invert(),o.invViewProj.value=m.clone().invert(),o.prevViewProjNoJitter.value=n?n.clone():u.clone(),o.cameraPos.value=new C().setFromMatrixPosition(r.matrixWorld),o.prevCameraPos.value=a?a.clone():o.cameraPos.value.clone(),o.near.value=r.near,o.far.value=r.far,o.resolution.value=new se(e,t),o.invResolution.value=new se(1/e,1/t),o.prevJitter.value=o.jitter.value?o.jitter.value.clone():new se,o.jitter.value=new se(f,p),o.reversedDepth.value=r.reversedDepth===!1?0:1}let mi=0;const $n={color:["vec3f",null],opacity:["f32",1],emissive:["vec3f",null],roughness:["f32",1],metalness:["f32",0],alphaTest:["f32",0]};class lt{constructor(e={}){this.id=mi++,this.isMaterial=!0,this.name=e.name||"material"+this.id,this.version=0,this.modules=e.modules||[],this.varyings=e.varyings||{},this.attributes=e.attributes||{},this.vertex=e.vertex||"",this.surface=e.surface||"",this.output=e.output||"",this.shadow=e.shadow||"",this.defines={...e.defines||{}},this.lit=e.lit!==!1,this.side=e.side||"front",this.transparent=!!e.transparent,this.blending=e.blending||(this.transparent?"normal":"none"),this.depthWrite=e.depthWrite??!this.transparent,this.depthTest=e.depthTest??!0,this.depthCompare=e.depthCompare||null,this.depthBias=e.depthBias||0,this.depthBiasSlopeScale=e.depthBiasSlopeScale||0,this.colorWrite=e.colorWrite??!0,this.topology=e.topology||"triangle-list",this.visible=e.visible??!0,this.vertexColors=!!e.vertexColors,this.velocityWeight=e.velocityWeight??1,this.underwaterLighting=e.underwaterLighting||"full",this.appliesHillShadow=!!e.appliesHillShadow,this.localLightsCheap=!!e.localLightsCheap,this.receiveShadows=e.receiveShadows??!0,this.userData=e.userData||{};const t={...$n};for(const i in e.uniforms||{})t[i]=e.uniforms[i];this.uniformBlock=new de("MaterialParams"+this.id,t,{label:this.name}),this.uniforms=this.uniformBlock.fields;const s=this.uniforms;s.color.value=Dt(e.color,new Ae(1,1,1)),s.emissive.value=Dt(e.emissive,new Ae(0,0,0)),e.roughness!==void 0&&(s.roughness.value=e.roughness),e.metalness!==void 0&&(s.metalness.value=e.metalness),e.opacity!==void 0&&(s.opacity.value=e.opacity),e.alphaTest!==void 0&&(s.alphaTest.value=e.alphaTest),this.bindings={};for(const i in e.textures||{}){const n=e.textures[i];this.bindings[i]=n&&n.isTexture?{texture:n}:typeof n=="function"?{texture:n}:n}for(const i in e.storage||{}){const n=e.storage[i];this.bindings[i]=n&&n.isStorageBuffer?{storage:n,access:"read"}:n}Object.assign(this.bindings,e.bindings||{}),this._listeners=[]}get color(){return this.uniforms.color.value}set color(e){this.uniforms.color.value=Dt(e,this.uniforms.color.value)}get emissive(){return this.uniforms.emissive.value}set emissive(e){this.uniforms.emissive.value=Dt(e,this.uniforms.emissive.value)}get roughness(){return this.uniforms.roughness.value}set roughness(e){this.uniforms.roughness.value=e}get metalness(){return this.uniforms.metalness.value}set metalness(e){this.uniforms.metalness.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms.opacity.value=e}get alphaTest(){return this.uniforms.alphaTest.value}set alphaTest(e){e>0!=this.uniforms.alphaTest.value>0&&(this.needsUpdate=!0),this.uniforms.alphaTest.value=e}set(e,t){this.uniformBlock.set(e,t)}set needsUpdate(e){e&&this.version++}setDefine(e,t){this.defines[e]!==t&&(this.defines[e]=t,this.version++)}pipelineKey(){return`${this.id}.${this.version}.${this.side}.${this.transparent}.${typeof this.blending=="string"?this.blending:JSON.stringify(this.blending)}.${this.depthWrite}.${this.depthTest}.${this.depthCompare}.${this.colorWrite}.${this.topology}.${this.alphaTest>0}.${this.underwaterLighting}.${this.appliesHillShadow}.${this.localLightsCheap}.${this.receiveShadows}.${this.depthBias}.${this.depthBiasSlopeScale}.${this.vertexColors}`}allDefines(){return{...this.defines,UNDERWATER_LIGHTING:{none:0,lite:1,full:2}[this.underwaterLighting]??2,HILL_SHADOW_SELF:this.appliesHillShadow?1:0,LOCAL_LIGHTS_CHEAP:this.localLightsCheap?1:0,ALPHA_TEST:this.alphaTest>0?1:0,DOUBLE_SIDED:this.side==="double"?1:0,BACK_SIDE:this.side==="back"?1:0,TRANSPARENT:this.transparent?1:0,RECEIVE_SHADOWS:this.receiveShadows?1:0}}addEventListener(e,t){e==="dispose"&&this._listeners.push(t)}dispose(){for(const e of this._listeners)e({target:this})}clone(){const e=Object.create(Object.getPrototypeOf(this));return Object.assign(e,this),e.id=mi++,e.version=0,e.defines={...this.defines},e.bindings={...this.bindings},e.uniformBlock=new de("MaterialParams"+e.id,Object.fromEntries(this.uniformBlock.order.map(t=>[t,[this.uniformBlock.layout[t].typeStr,xr(this.uniforms[t].value)]])),{label:e.name}),e.uniforms=e.uniformBlock.fields,e._listeners=[],e}}function xr(r){return r&&typeof r=="object"&&r.clone?r.clone():Array.isArray(r)?r.map(xr):r}function Dt(r,e){return r==null?e:r.isColor?e.copy?e.copy(r):r.clone():typeof r=="number"||typeof r=="string"?e.set(r):Array.isArray(r)?e.setRGB(r[0],r[1],r[2]):r.isVector3?e.setRGB(r.x,r.y,r.z):e}function Wt(r){if(!r||r==="none")return;if(typeof r=="object")return r;const e=(t,s,i="add")=>({srcFactor:t,dstFactor:s,operation:i});switch(r){case"normal":return{color:e("src-alpha","one-minus-src-alpha"),alpha:e("one","one-minus-src-alpha")};case"premultiplied":return{color:e("one","one-minus-src-alpha"),alpha:e("one","one-minus-src-alpha")};case"additive":return{color:e("src-alpha","one"),alpha:e("zero","one")};case"add":return{color:e("one","one"),alpha:e("one","one")};case"multiply":return{color:e("dst","zero"),alpha:e("zero","one")};case"min":return{color:e("one","one","min"),alpha:e("one","one","min")};case"max":return{color:e("one","one","max"),alpha:e("one","one","max")}}throw new Error("unknown blending "+r)}const J=new Q({name:"common",code:`
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
`}),gt={hooks:{},version:0,set(r,e){this.hooks[r]=e,this.version++},modules(){return Object.values(this.hooks).filter(Boolean)}},vr={directModulation:"fn hookDirectModulation( P: vec3f, N: vec3f ) -> vec3f { return vec3f( 1.0 ); }",ambientModulation:"fn hookAmbientModulation( P: vec3f, N: vec3f ) -> vec3f { return vec3f( 1.0 ); }",shadowPosition:"fn hookShadowPosition( P: vec3f, N: vec3f, pixel: vec2f ) -> vec3f { return P; }",bounce:"fn hookBounce( P: vec3f, N: vec3f ) -> vec3f { return vec3f( 0.0 ); }",localLights:"fn hookLocalLights( s: Surface, P: vec3f, N: vec3f, V: vec3f, acc: ptr<function, LightAccum> ) {}",envSpecular:"fn hookEnvSpecular( R: vec3f, roughness: f32 ) -> vec3f { let t = sat( R.y * 0.5 + 0.5 ); return mix( frame.horizonColor * 0.6, frame.skyIrradiance * PI, t ) * frame.envIntensity; }",envDiffuse:"fn hookEnvDiffuse( N: vec3f ) -> vec3f { return mix( frame.horizonColor * 0.25, frame.skyIrradiance, N.y * 0.5 + 0.5 ) * frame.envIntensity; }"};function Nn(){const r=[];for(const e in vr){const t=gt.hooks[e];t?r.push(t):r.push(En(e))}return r}const yi={};function En(r){return yi[r]||(yi[r]=new Q({name:"hook-"+r+"-default",deps:[je],code:vr[r]}))}const rt=new de("SunShadow",{matrices:["mat4x4f[4]",[new U,new U,new U,new U]],cascades:["vec4f[4]",[new G,new G,new G,new G]],count:["u32",0],mapSize:["f32",2048],bias:["f32",2e-5],fade:["f32",1],pcssCascades:["u32",1],sunAngularDiameter:["f32",.00925],enabled:["f32",0],pad:["f32",0],blend:["vec4f[4]",[new G,new G,new G,new G]]});let gr=null;function Wn(r){gr=r}const wr=new Q({name:"sunShadow",deps:[J],uniforms:rt,uniformName:"shadowParams",bindings:{sunShadowMap:{texture:()=>gr,viewDimension:"2d-array"}},code:`
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
`}),je=new Q({name:"surface",deps:[J],code:`
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
`}),cs=new Q({name:"lighting",deps:[J,je,wr],code:`
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
`}),On={position:"vec3f",normal:"vec3f",uv:"vec2f",color:"vec4f"},Un={normal:"vec3f( 0.0, 1.0, 0.0 )",uv:"vec2f( 0.0 )",color:"vec4f( 1.0 )"},Vn=/^(u32|i32|vec[234][ui])$/;function Gn(r){return r==="f32"?"0.0":r==="u32"?"0u":r==="i32"?"0i":`${r}()`}function Hn(r,e,t){const s=t.kind,i=new Set(e.map(y=>y.name)),n=r.allDefines();n.PASS_MAIN=s==="main"?1:0,n.PASS_DEPTH=s==="depth"?1:0,n.PASS_COLOR=s==="color"?1:0,n.PASS_LATE=t.late?1:0,n.LIT=r.lit?1:0,n.INSTANCED=i.has("instanceMatrix0")?1:0,n.INSTANCE_COLOR=i.has("instanceColor")?1:0,Object.assign(n,t.defines||{}),n.CLIP_DISTANCES=n.REFRACTION_CLIP&&F.features.has("clip-distances")?1:0;let a=`struct VertexIn {
`;for(const y of e)a+=`	@location( ${y.location} ) ${y.name}: ${y.wgsl},
`;a+=`	@builtin( instance_index ) instance: u32,
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
`;for(const y in r.attributes)h+=`	${y}: ${r.attributes[y]},
`;h+=`};
`;const o=s==="main";let l=0,c=`struct VSOut {
	@builtin( position ) clip: vec4f,
`;c+=`	@location( ${l++} ) worldPos: vec3f,
`,c+=`	@location( ${l++} ) normal: vec3f,
`,c+=`	@location( ${l++} ) uv: vec2f,
`,c+=`	@location( ${l++} ) color: vec4f,
`,o&&(c+=`	@location( ${l++} ) curClip: vec4f,
`,c+=`	@location( ${l++} ) prevClip: vec4f,
`);for(const y in r.varyings){const w=r.varyings[y];c+=`	@location( ${l++} )${Vn.test(w)?" @interpolate( flat )":""} ${y}: ${w},
`}if(c+=`};
`,n.CLIP_DISTANCES){const y=[...c.matchAll(/\s(\w+): [^,]+,\n/g)].map(w=>w[1]);c+=c.replace("struct VSOut {","struct VSOutClip {").replace(/};\n$/,`	@builtin( clip_distances ) clipDistances: array<f32, 1>,
};
`),c+=`fn vsClip( o: VSOut, d: f32 ) -> VSOutClip {
	var c: VSOutClip;
${y.map(w=>`	c.${w} = o.${w};
`).join("")}	c.clipDistances[ 0 ] = d;
	return c;
}
`}let u="";for(const y in On)if(i.has(y)){const w=e.find(g=>g.name===y);y==="color"&&w.wgsl==="vec3f"?u+=`	v.color = vec4f( i.color, 1.0 );
`:u+=`	v.${y} = i.${y};
`}else y!=="position"&&(u+=`	v.${y} = ${Un[y]};
`);for(const y in r.attributes)u+=i.has(y)?`	v.${y} = i.${y};
`:`	v.${y} = ${Gn(r.attributes[y])};
`;const f=`
struct Draw {
	model: mat4x4f,
	prevModel: mat4x4f,
	params: vec4f,  // x: object id, y: user, z: user, w: user
	params2: vec4f,
};
@group( 2 ) @binding( 0 ) var<uniform> draw: Draw;

${a}
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
${r.vertex}
}

fn materialSurface( in: FragInput, s: ptr<function, Surface> ) {
${r.surface}
}

fn materialOutput( in: FragInput, s: Surface, r: ptr<function, FragResult> ) {
${r.output}
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
`,p=r.shadow?`fn materialShadow( in: FragInput ) -> bool {
${r.shadow}
}
`:"";n.HAS_SHADOW_HOOK=r.shadow?1:0,n.NEEDS_DEPTH_FRAGMENT=s==="depth"&&(r.alphaTest>0||r.shadow)?1:0,n.HAS_POSITION=i.has("position")?1:0;const m=f.replace("fn fragInput(",p+"fn fragInput(").replace(/\bTRANSPARENT_F\b/g,r.transparent?"true":"false").replace(/\bVELOCITY_WEIGHT\b/g,xi(r.velocityWeight)).replace(/\bREFRACTION_CLIP_MARGIN\b/g,xi((t.defines&&t.defines.REFRACTION_CLIP_MARGIN)??0));let d=[J,je,...r.modules];return(s!=="depth"||ws(r.modules).includes(cs))&&(d=[J,je,...Nn(),cs,...r.modules]),r.lightingHooks===!1&&!ws(r.modules).includes(cs)&&(d=[J,je,wr,...r.modules]),{code:m,modules:d,defines:n,bindings:{mat:{uniform:r.uniformBlock},...r.bindings},hasFragment:s!=="depth"||n.NEEDS_DEPTH_FRAGMENT===1}}function xi(r){const e=String(r);return e.includes(".")||e.includes("e")?e:e+".0"}const vi=new Pe,gi=new zt,wi=new U,qn=new C,bi=new C,Mi=new WeakMap;let jn=0;const st=256,Si=40;class Xn{constructor(){this.pipelines=new Map,this.geometries=new WeakMap,this.capacity=8192,this.drawBuffer=null,this.drawData=null,this.drawCount=0,this.frame=-1,this.stats={draws:0,triangles:0,pipelines:0},this.drawLayout=null,this.drawBindGroup=null,this.syncPipelines=!0}_ensureDrawBuffer(){this.drawBuffer&&this.drawData.byteLength>=this.capacity*st||(this.drawBuffer&&this.drawBuffer.destroy(),this.drawBuffer=F.device.createBuffer({label:"draws",size:this.capacity*st,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.drawData=new Float32Array(this.capacity*st/4),this.drawLayout=fr([{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform",hasDynamicOffset:!0,minBindingSize:Si*4}}],"draw"),this.drawBindGroup=F.device.createBindGroup({label:"draws",layout:this.drawLayout,entries:[{binding:0,resource:{buffer:this.drawBuffer,size:Si*4}}]}))}_beginFrame(){this.frame!==F.frame&&(this.frame=F.frame,this._ensureDrawBuffer(),this.drawCount>this.capacity*.75&&(this.capacity*=2,this._ensureDrawBuffer()),this.drawCount=0,F.onSubmit(()=>{this.drawCount&&F.queue.writeBuffer(this.drawBuffer,0,this.drawData.buffer,0,this.drawCount*st)}),this.stats.draws=0,this.stats.triangles=0)}_slot(e){let t=e.__draw;if(t||(t=e.__draw={frame:-1,slot:0,cur:new Float32Array(16),prev:new Float32Array(16),has:!1}),t.frame===F.frame)return t.slot;if(this.drawCount>=this.capacity)throw new Error("MeshRenderer: draw buffer full");t.frame=F.frame,t.slot=this.drawCount++;const s=e.matrixWorld.elements;t.has&&!e.resetVelocity?t.prev.set(t.cur):t.prev.set(s),t.cur.set(s),t.has=!0,e.resetVelocity=!1;const i=t.slot*st/4,n=this.drawData;n.set(t.cur,i),n.set(e.staticVelocity?t.cur:t.prev,i+16);const a=e.drawParams;if(n[i+32]=e.id??0,n[i+33]=a?a[0]:0,n[i+34]=a?a[1]:0,n[i+35]=a?a[2]:0,a&&a.length>3)for(let h=0;h<4;h++)n[i+36+h]=a[3+h]??0;return t.slot}_geometryGPU(e){let t=this.geometries.get(e);return t||(t={buffers:new Map,index:null,indexVersion:-1},this.geometries.set(e,t),e.addEventListener&&e.addEventListener("dispose",()=>{for(const s of t.buffers.values())s.buffer.destroy();t.index&&t.index.buffer.destroy(),this.geometries.delete(e)})),t}_attributeBuffer(e,t){const s=this._geometryGPU(e),i=t.isInterleavedBufferAttribute?t.data:t;if(i.gpuBuffer)return i.gpuBuffer.getGPU?i.gpuBuffer.getGPU():i.gpuBuffer;let n=s.buffers.get(i);const a=i.version??0;if(n&&n.version===a&&n.array===i.array)return n.buffer;const h=Kn(t);if((!n||n.size<h.byteLength)&&(n&&n.buffer.destroy(),n={buffer:F.device.createBuffer({label:t.name||"attribute",size:Math.max(16,Ot(h.byteLength)),usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST}),size:h.byteLength,version:-1},s.buffers.set(i,n)),n.version!==a){const o=i.updateRanges&&i.updateRanges.length&&n.version>=0?i.updateRanges:null;if(o&&h.array===i.array){const l=i.array.BYTES_PER_ELEMENT;for(const c of o)F.queue.writeBuffer(n.buffer,c.start*l,i.array.buffer,i.array.byteOffset+c.start*l,Ot(c.count*l));i.clearUpdateRanges?i.clearUpdateRanges():i.updateRanges.length=0}else zi(n.buffer,h);n.version=a}return n.array=i.array,n.buffer}_indexBuffer(e){const t=e.index;if(!t)return null;const s=this._geometryGPU(e);if(s.indexRef&&s.indexSrc===t.array&&s.indexVersion===(t.version??0))return s.indexRef;const i=t.array instanceof Uint16Array||t.array instanceof Uint32Array?t.array:new Uint32Array(t.array);return(!s.index||s.index.size<i.byteLength)&&(s.index&&s.index.buffer.destroy(),s.index={buffer:F.device.createBuffer({label:"index",size:Math.max(16,Ot(i.byteLength)),usage:GPUBufferUsage.INDEX|GPUBufferUsage.COPY_DST}),size:i.byteLength},s.indexVersion=-1),s.indexVersion!==(t.version??0)&&(zi(s.index.buffer,i),s.indexVersion=t.version??0),s.indexSrc=t.array,s.indexRef={buffer:s.index.buffer,format:i instanceof Uint16Array?"uint16":"uint32"},s.indexRef}_cachedLayout(e,t,s){let i=Mi.get(t);i||Mi.set(t,i=new Map);const n=e.isInstancedMesh?e.instanceColor?2:1:0,a=n?s.id+":"+n:s.id;let h=i.get(a);if(h&&h.version===s.version&&h.attrsVersion===t.attributesVersion&&(!n||h.instanceMatrix===e.instanceMatrix)){const c=h.refs,u=h.names,f=t.attributes;let p=!0;for(let m=0;m<u.length;m++)if(f[u[m]]!==c[m]){p=!1;break}if(p)return h.vl}const o=this._layout(e,t,s),l=o.layout.filter(c=>!c.name.startsWith("instance")).map(c=>c.name);return h={version:s.version,attrsVersion:t.attributesVersion,instanceMatrix:e.instanceMatrix,names:l,refs:l.map(c=>t.attributes[c]),vl:o},o.pipelines=new Map,i.set(a,h),o}_layout(e,t,s){const i=[],n=["position","normal","uv","color",...Object.keys(s.attributes)];for(const u of n){const f=t.attributes[u];f&&!(u==="color"&&!s.vertexColors&&!s.attributes.color)&&i.push({name:u,attr:f})}if(e.isInstancedMesh){for(let u=0;u<4;u++)i.push({name:"instanceMatrix"+u,attr:e.instanceMatrix,column:u});e.instanceColor&&i.push({name:"instanceColor",attr:e.instanceColor})}const a=[],h=[],o=new Map;let l=0;for(const u of i){const f=u.attr,p=f.isInterleavedBufferAttribute?f.data:f,m=!!(f.isInstancedBufferAttribute||p.isInstancedInterleavedBuffer||f.meshPerAttribute||p.meshPerAttribute)||u.name.startsWith("instance"),d=br(f);let v=o.get(p);if(v===void 0){v=a.length,o.set(p,v);const S=f.isInterleavedBufferAttribute?f.data.stride*d.bytesPerComponent:f.itemSize*d.bytesPerComponent;a.push({src:p,attr:f,layout:{arrayStride:d.converted?d.itemSize*4:S,stepMode:m?"instance":"vertex",attributes:[]}})}let y=f.isInterleavedBufferAttribute?f.offset*d.bytesPerComponent:0,w=d.format,g=d.wgsl;u.column!==void 0&&(y=u.column*16,w="float32x4",g="vec4f"),a[v].layout.attributes.push({shaderLocation:l,offset:y,format:w}),(u.name==="position"||u.name==="normal")&&(g="vec3f"),u.name==="uv"&&(g="vec2f"),u.name==="color"&&(g=f.itemSize===4?"vec4f":"vec3f"),u.name==="instanceColor"&&(g="vec3f"),s.attributes[u.name]&&(g=s.attributes[u.name]),h.push({name:u.name,wgsl:g,location:l,instanced:m}),l++}return{key:h.map(u=>`${u.name}:${u.wgsl}`).join(",")+"|"+a.map(u=>`${u.layout.arrayStride}/${u.layout.stepMode}/${u.layout.attributes.map(f=>f.format+"@"+f.offset).join(";")}`).join(","),layout:h,buffers:a}}_pipeline(e,t,s){e.__pkFrame!==F.frame&&(e.__pk=e.pipelineKey()+"|"+gt.version,e.__pkFrame=F.frame);const i=s.passKey;let n=t.pipelines&&t.pipelines.get(i);if(n&&n.materialKey===e.__pk)return n.p;const a=`${e.__pk}|${t.key}|${i}`;let h=this.pipelines.get(a);return h||(h=this._createPipeline(e,t,s,a)),t.pipelines&&t.pipelines.set(i,{materialKey:e.__pk,p:h}),h}_createPipeline(e,t,s,i){const n=Hn(e,t.layout,s),a=Qt({modules:n.modules,bindings:n.bindings,code:n.code,defines:n.defines,stage:"render",label:e.name}),h=Jt(a.code,e.name);this._ensureDrawBuffer();const o=F.device.createPipelineLayout({bindGroupLayouts:[a.group0.layout,a.bindings.layout,this.drawLayout]}),l=Wt(e.blending);let c=[];s.kind==="main"?c=[{format:s.colorFormats[0],blend:e.transparent||s.late?l:void 0,writeMask:e.colorWrite?GPUColorWrite.ALL:0},{format:s.colorFormats[1],blend:s.late?Wt("premultiplied"):void 0,writeMask:e.colorWrite?GPUColorWrite.ALL:0},{format:s.colorFormats[2],blend:Wt("normal"),writeMask:e.colorWrite?GPUColorWrite.ALL:0}]:s.kind==="color"&&(c=s.colorFormats.map(v=>({format:v,blend:l,writeMask:e.colorWrite?GPUColorWrite.ALL:0})));const u=e.side,f=s.cullOverride||(u==="double"?"none":u==="back"?"front":"back"),p=e.depthTest?e.depthCompare||s.depthCompare:"always",m={label:e.name+" "+s.kind,layout:o,vertex:{module:h,entryPoint:"vs",buffers:t.buffers.map(v=>v.layout)},primitive:{topology:e.topology,cullMode:f,frontFace:"ccw"}};n.hasFragment&&(m.fragment={module:h,entryPoint:"fs",targets:c}),s.depthFormat&&(m.depthStencil={format:s.depthFormat,depthWriteEnabled:e.depthWrite,depthCompare:p,depthBias:s.kind==="depth"?s.depthBias||0:e.depthBias,depthBiasSlopeScale:s.kind==="depth"?s.depthBiasSlopeScale||0:e.depthBiasSlopeScale});const d={handle:F.renderPipeline(m),bindings:a.bindings,label:m.label};return this.pipelines.set(i,d),this.stats.pipelines=this.pipelines.size,d}collect(e,{camera:t,layerMask:s=4294967295,filter:i=null,kind:n="main",cull:a=!0}){const h=[],o=[];t&&(t.updateMatrixWorld(),wi.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse.copy(t.matrixWorld).invert()),gi.setFromProjectionMatrix(wi,t.reversedDepth!==!1),bi.setFromMatrixPosition(t.matrixWorld));const l=this.precompiling,c=u=>{if(!(!u.visible&&!l)){u.isMesh&&u.material&&u.geometry&&(u.layers.mask&s)!==0&&(!i||i(u))&&(n!=="depth"||u.castShadow)&&(l||!a||!t||u.frustumCulled===!1||this._inFrustum(u))&&(u.onBeforeRender&&u.onBeforeRender(null,null,t,u.geometry,u.material,null),(u.visible||l)&&this._addItems(u,h,o));for(const f of u.children)c(f)}};return e.updateMatrixWorld(),c(e),h.sort((u,f)=>u.renderOrder-f.renderOrder||u.pipeKey-f.pipeKey||u.z-f.z),o.sort((u,f)=>u.renderOrder-f.renderOrder||f.z-u.z),{opaque:h,transparent:o}}_inFrustum(e){let t=null;return e.isInstancedMesh?(!e.boundingSphere&&e.computeBoundingSphere&&e.computeBoundingSphere(),t=e.boundingSphere):(e.geometry.boundingSphere||e.geometry.computeBoundingSphere(),t=e.geometry.boundingSphere),!t||t.radius<0||!Number.isFinite(t.radius)?!0:(vi.copy(t).applyMatrix4(e.matrixWorld),gi.intersectsSphere(vi))}_addItems(e,t,s){const i=e.geometry,n=Array.isArray(e.material)?e.material:null,a=qn.setFromMatrixPosition(e.matrixWorld).distanceToSquared(bi),h=(l,c,u)=>{if(!l||!l.visible&&!this.precompiling)return;const f={object:e,geometry:i,material:l,start:c,count:u,z:a,renderOrder:e.renderOrder||0,pipeKey:l.id};(l.transparent?s:t).push(f)},o=i.drawRange||{start:0,count:1/0};if(n&&i.groups&&i.groups.length)for(const l of i.groups){const c=Math.max(l.start,o.start),u=Math.min(l.start+l.count,o.start+o.count);u>c&&h(n[l.materialIndex],c,u-c)}else h(n?n[0]:e.material,o.start,o.count)}render(e,t){this._beginFrame(),t={kind:"main",late:!1,colorFormats:[],depthFormat:null,depthCompare:"greater-equal",frameBlock:Re,layerMask:4294967295,...t},t.passKey=`${t.kind}.${t.late?1:0}.${t.colorFormats.join(",")}.${t.depthFormat}.${t.depthCompare}.${t.cullOverride||""}.${t.defines?JSON.stringify(t.defines):""}`;const s=t.items||this.collect(e,t),i=F.getEncoder(),n=(t.colorViews||[]).map((o,l)=>{const c=t.clearColors?t.clearColors[l]:null;return{view:o,loadOp:c?"clear":"load",storeOp:"store",clearValue:c||[0,0,0,0]}}),a={label:t.label||t.kind,colorAttachments:n};t.depthView&&(a.depthStencilAttachment={view:t.depthView,depthLoadOp:t.clearDepth===null||t.clearDepth===void 0?"load":"clear",depthStoreOp:"store",depthClearValue:t.clearDepth??0}),t.timestampWrites&&(a.timestampWrites=t.timestampWrites);const h=i.beginRenderPass(a);t.viewport&&h.setViewport(...t.viewport),h.setBindGroup(0,pr(t.frameBlock,"render").getBindGroup()),this.drawItems(h,s.opaque,t),t.betweenLists&&t.betweenLists(h),this.drawItems(h,s.transparent,t),t.after&&t.after(h),h.end()}drawItems(e,t,s){let i=null,n=null;const a=++jn;for(const h of t){const{object:o,geometry:l,material:c}=h;if(!l.attributes.position&&!l.vertexCount&&!l.indirect)continue;let u,f;if(this.precompiling){try{u=this._cachedLayout(o,l,c),f=this._pipeline(c,u,s)}catch{continue}continue}u=this._cachedLayout(o,l,c),f=this._pipeline(c,u,s);const p=f.handle.pipeline||(this.syncPipelines?F.ready(f.handle):null);if(!p)continue;f!==i&&(e.setPipeline(p),i=f);const m=f.bindings.getBindGroup(a);m!==n&&(e.setBindGroup(1,m),n=m),e.setBindGroup(2,this.drawBindGroup,[this._slot(o)*st]);for(let y=0;y<u.buffers.length;y++)e.setVertexBuffer(y,this._attributeBuffer(l,u.buffers[y].attr));const d=o.isInstancedMesh?o.count:l.instanceCount??1;if(d===0)continue;const v=this._indexBuffer(l);if(l.indirect){const y=l.indirect.buffer.getGPU?l.indirect.buffer.getGPU():l.indirect.buffer,w=l.indirect.offsets||[l.indirect.offset||0];v&&e.setIndexBuffer(v.buffer,v.format);for(const g of w)v?e.drawIndexedIndirect(y,g):e.drawIndirect(y,g),this.stats.draws++;continue}if(v){const y=Math.min(h.count,l.index.count-h.start);if(y<=0)continue;e.setIndexBuffer(v.buffer,v.format),e.drawIndexed(y,d===1/0?1:d,h.start,0,0),this.stats.triangles+=y/3*d}else{const y=l.attributes.position?l.attributes.position.count:l.vertexCount,w=Math.min(h.count,y-h.start);if(w<=0)continue;e.draw(w,d,h.start,0),this.stats.triangles+=w/3*d}this.stats.draws++}}}function Ot(r){return Math.ceil(r/4)*4}function zi(r,e){if(e.byteLength%4===0){F.queue.writeBuffer(r,0,e.buffer,e.byteOffset,e.byteLength);return}const t=new Uint8Array(Ot(e.byteLength));t.set(new Uint8Array(e.buffer,e.byteOffset,e.byteLength)),F.queue.writeBuffer(r,0,t)}const _i=new WeakMap;function Kn(r){const e=r.isInterleavedBufferAttribute?r.data:r;if(!br(r).converted)return e.array;let s=_i.get(e);if(s&&s.version===e.version)return s.array;const i=r.count,n=r.itemSize,a=new Float32Array(i*n),h=r.normalized?Yn(e.array):1;for(let o=0;o<i*n;o++)a[o]=e.array[o]/h;return _i.set(e,{version:e.version,array:a}),a}function Yn(r){return r instanceof Uint8Array?255:r instanceof Int8Array?127:r instanceof Uint16Array?65535:r instanceof Int16Array?32767:1}function br(r){const t=(r.isInterleavedBufferAttribute?r.data:r).array,s=r.itemSize,i=r.normalized,n=h=>s===1?h:`vec${s}${h==="f32"?"f":h==="u32"?"u":"i"}`;if(t instanceof Float32Array)return{format:s===1?"float32":`float32x${s}`,wgsl:n("f32"),bytesPerComponent:4,itemSize:s};if(t instanceof Uint32Array)return{format:s===1?"uint32":`uint32x${s}`,wgsl:n("u32"),bytesPerComponent:4,itemSize:s};if(t instanceof Int32Array)return{format:s===1?"sint32":`sint32x${s}`,wgsl:n("i32"),bytesPerComponent:4,itemSize:s};const a={Uint8Array:["uint8","unorm8",1],Int8Array:["sint8","snorm8",1],Uint16Array:["uint16","unorm16",2],Int16Array:["sint16","snorm16",2]}[t.constructor.name];if(a&&(s===2||s===4)&&!r.isInterleavedBufferAttribute){const h=(i?a[1]:a[0])+"x"+s,o=n(i?"f32":t instanceof Uint8Array||t instanceof Uint16Array?"u32":"i32");return{format:h,wgsl:o,bytesPerComponent:a[2],itemSize:s}}return{format:s===1?"float32":`float32x${s}`,wgsl:n("f32"),bytesPerComponent:4,itemSize:s,converted:!0}}const Zn=`
struct FSIn { @builtin( position ) pos: vec4f, @location( 0 ) uv: vec2f };
@vertex fn vs( @builtin( vertex_index ) i: u32 ) -> FSIn {
	let p = vec2f( f32( ( i << 1u ) & 2u ), f32( i & 2u ) );
	var o: FSIn;
	o.pos = vec4f( p * 2.0 - 1.0, FS_DEPTH, 1.0 );
	o.uv = vec2f( p.x, 1.0 - p.y );
	return o;
}
`;class Mr{constructor({label:e="fullscreen",modules:t=[],bindings:s={},code:i,colorFormats:n=["rgba16float"],blend:a="none",defines:h={},depthFormat:o=null,depthCompare:l="always",depthWrite:c=!1,depth:u=0,writeMasks:f=null,blends:p=null}){this.label=e,this.colorFormats=n;const m=i.includes("@fragment")?i:`${i}
@fragment fn fs( in: FSIn ) -> @location( 0 ) vec4f { return fragment( in ); }
`,d=Qt({modules:[J,...t],bindings:s,code:Zn.replace("FS_DEPTH",u.toFixed(6))+m,defines:h,stage:"render",label:e});this.source=d.code,this.bindings=d.bindings;const v=Jt(d.code,e),y={label:e,layout:F.device.createPipelineLayout({bindGroupLayouts:[d.group0.layout,d.bindings.layout]}),vertex:{module:v,entryPoint:"vs"},fragment:{module:v,entryPoint:"fs",targets:n.map((w,g)=>({format:w,blend:Wt(p?p[g]:g===0?a:"none"),writeMask:f?f[g]:GPUColorWrite.ALL}))},primitive:{topology:"triangle-list"}};o&&(y.depthStencil={format:o,depthCompare:l,depthWriteEnabled:c}),this.handle=F.renderPipeline(y),this.timestampWrites=null}get pipeline(){return F.ready(this.handle)}draw(e,t=Re){e.setPipeline(F.ready(this.handle)),e.setBindGroup(0,pr(t,"render").getBindGroup()),e.setBindGroup(1,this.bindings.getBindGroup()),e.draw(3)}render({colorViews:e,clear:t=null,viewport:s=null,frameBlock:i=Re,depthView:n=null,encoder:a=F.getEncoder()}={}){const h=e.map(c=>c.isTexture?c.view({dimension:"2d",mipLevelCount:1}):c),o={label:this.label,colorAttachments:h.map(c=>({view:c,loadOp:t?"clear":"load",storeOp:"store",clearValue:t||[0,0,0,0]}))};n&&(o.depthStencilAttachment={view:n,depthLoadOp:"load",depthStoreOp:"store"}),this.timestampWrites&&(o.timestampWrites=this.timestampWrites);const l=a.beginRenderPass(o);s&&l.setViewport(...s),this.draw(l,i),l.end()}}const ki=new C,Qn=new Pe,Ai=new zt,Jn=new U,ea=new U,at={OPAQUE:0,WATER:1,TRANSPARENT:2},ft="depth32float";class ta{constructor(e,t,s){this.meshRenderer=e,this.scene=t,this.camera=s,this.scale=1,this.width=1,this.height=1,this.sceneRT=new pt(1,1,{colors:[{format:"rgba16float",name:"color"},{format:"rgba16float",name:"velocity"},{format:"rgba8unorm",name:"waterMask"}],depth:ft,label:"scene"}),this.velocityTexture=this.sceneRT.textures[1],this.waterMaskTexture=this.sceneRT.textures[2],this.opaqueCopy=new pt(1,1,{colors:["rgba16float"],depth:ft,label:"opaqueCopy"}),this.opaqueDepthHalf=new pt(1,1,{colors:["r16float"],label:"opaqueDepthHalf"}),this._depthHalfPass=null,this.hullMaskRT=new pt(1,1,{colors:["r16float"],depth:ft,label:"hullMask"}),this.hullMaskScene=new Ps,this.hullMaskMaterial=new lt({name:"hullMask",lit:!1,side:"double",surface:"s.albedo = vec3f( length( in.P - frame.cameraPos ), 0.0, 0.0 ); s.emissive = vec3f( 0.0 );"}),this.hullMasks=[],this.hullMaskActive={value:0},this.background=null,this.clearColor=[0,0,0,1],this.onBeforeWater=null}setSize(e,t){this.width=e,this.height=t,this.sceneRT.setSize(e,t),this.opaqueCopy.setSize(e,t),this.opaqueDepthHalf.setSize(e,t),this.hullMaskRT.setSize(e,t)}addHullMask(e,t){e.computeBoundingBox(),e.computeBoundingSphere();const s=new Ke(e,this.hullMaskMaterial);return s.matrixAutoUpdate=!1,s.frustumCulled=!1,this.hullMaskScene.add(s),this.hullMasks.push({mesh:s,object:t,box:e.boundingBox.clone().expandByScalar(.05),sphere:e.boundingSphere}),s}_renderHullMasks(e){let t=0;Ai.setFromProjectionMatrix(Jn.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse));for(const i of this.hullMasks){i.object.updateWorldMatrix(!0,!1),i.mesh.matrix.copy(i.object.matrixWorld),i.mesh.matrixWorld.copy(i.object.matrixWorld),ki.setFromMatrixPosition(e.matrixWorld).applyMatrix4(ea.copy(i.object.matrixWorld).invert());const n=!i.box.containsPoint(ki)&&Ai.intersectsSphere(Qn.copy(i.sphere).applyMatrix4(i.object.matrixWorld));i.mesh.visible=n,n&&t++}if(this.hullMaskActive.value=t>0?1:0,!t)return;const s=this.hullMaskRT;this.meshRenderer.render(this.hullMaskScene,{label:"hull mask",kind:"color",camera:e,colorViews:[s.texture.view()],colorFormats:s.formats,clearColors:[[0,0,0,0]],depthView:s.depthTexture.view(),depthFormat:ft,clearDepth:0,cull:!1})}render(){const{scene:e,camera:t,meshRenderer:s}=this,i=this.sceneRT,n=i.textures.map(l=>l.view()),a={camera:t,colorViews:n,colorFormats:i.formats,depthView:i.depthTexture.view(),depthFormat:ft,kind:"main"};s.render(e,{...a,label:"opaque",layerMask:1<<at.OPAQUE,clearColors:[this.clearColor,[0,0,0,0],[0,0,0,0]],clearDepth:0,after:this.background?l=>this.background.draw(l):null});const h=F.getEncoder(),o={width:i.width,height:i.height};h.copyTextureToTexture({texture:i.texture.getGPU()},{texture:this.opaqueCopy.texture.getGPU()},o),h.copyTextureToTexture({texture:i.depthTexture.getGPU()},{texture:this.opaqueCopy.depthTexture.getGPU()},o),this._depthHalfPass||(this._depthHalfPass=new Mr({label:"opaque depth half",colorFormats:["r16float"],bindings:{srcDepth:{texture:()=>this.opaqueCopy.depthTexture}},code:"fn fragment( in: FSIn ) -> vec4f { return vec4f( textureLoad( srcDepth, vec2i( in.pos.xy ), 0 ), 0.0, 0.0, 1.0 ); }"})),this._depthHalfPass.render({colorViews:[this.opaqueDepthHalf.texture],clear:[0,0,0,0]}),this.hullMasks.length>0&&this._renderHullMasks(t),this.onBeforeWater&&this.onBeforeWater(),s.render(e,{...a,label:"water + transparent",late:!0,layerMask:1<<at.WATER|1<<at.TRANSPARENT})}}const bs=[];for(let r=0;r<8;r++)bs.push(new C);const dt=new C,sa=new C(0,1,0),Pi=new U,ia=new C,ra=new G;class na{constructor({size:e=2048,splits:t=[10,60,400],lightMargin:s=200,normalBias:i=[.015,.06,.3],bias:n=2e-5,pcssCascades:a=1}={}){this.size=e,this.splits=t,this.count=t.length,this.lightMargin=s,this.normalBias=i,this.periods=t.map((o,l)=>l===0?1:l===1?2:4),this.texture=new Ye({label:"sunShadowMap",width:e,height:e,depth:this.count,dimension:"2d-array",format:"depth32float",usage:["sample","render"]}),Wn(this.texture),this.cascades=t.map((o,l)=>({camera:{matrixWorld:new U,matrixWorldInverse:new U,projectionMatrix:new U,near:0,far:1,reversedDepth:!1,updateMatrixWorld(){},isCamera:!0,isShadowCamera:!0},block:In("shadowView"+l),viewProj:new U,radius:0,dirty:!0})),this.enabled=!0,this.layerMask=4294967295,this.frame=0,this.lastSun=new C(0,-2,0);const h=rt.fields;h.count.value=this.count,h.mapSize.value=e,h.bias.value=n,h.pcssCascades.value=a,h.enabled.value=1}_margin(e){const t=this.splits[this.count-1],s=e/t;return Math.max(.25*s*s,.25*s)*t}_fit(e,t,s){const i=this.cascades[e],n=e===0?0:this.splits[e-1],a=this.splits[e],h=this._margin(n),o=this._margin(a),l=Math.max(t.near,n-h*.5),c=e===this.count-1?a:a+o*.5;rt.fields.blend.value[e]=new G(n,a,h,o);const u=Math.tan(t.fov*Math.PI/360),f=u*t.aspect;let p=0;for(const z of[l,c])for(const P of[-1,1])for(const _ of[-1,1])bs[p++].set(P*f*z,_*u*z,-z).applyMatrix4(t.matrixWorld);const m=Math.min(c,(l+c)/2*(1+f*f+u*u));dt.set(0,0,-m).applyMatrix4(t.matrixWorld);let d=0;for(const z of bs)d=Math.max(d,z.distanceTo(dt));d=Math.ceil(d*16)/16,i.radius=d;const v=i.camera,y=s,w=Math.abs(y.y)>.99?ia.set(1,0,0):sa;v.matrixWorld.lookAt(y,new C(0,0,0),w),Pi.copy(v.matrixWorld).invert();const g=2*d/this.size,S=ra.set(dt.x,dt.y,dt.z,1).applyMatrix4(Pi);S.x=Math.round(S.x/g)*g,S.y=Math.round(S.y/g)*g;const k=d+this.lightMargin,T=new C(S.x,S.y,S.z+k).applyMatrix4(v.matrixWorld);v.matrixWorld.setPosition(T),v.matrixWorldInverse.copy(v.matrixWorld).invert();const b=.1,M=k+d;v.near=b,v.far=M,aa(v.projectionMatrix,-d,d,d,-d,b,M),i.viewProj.multiplyMatrices(v.projectionMatrix,v.matrixWorldInverse);const x=rt.fields;x.matrices.value[e]=i.viewProj.clone(),x.cascades.value[e]=new G(c,g,this.normalBias[e]??.05,M-b)}update(e,t){if(this.frame++,rt.fields.enabled.value=this.enabled&&t.y>-.05?1:0,!this.enabled)return[];e.updateMatrixWorld();const s=this.lastSun.angleTo(t)>1e-4;this.lastSun.copy(t);const i=[];for(let n=0;n<this.count;n++)(s||this.cascades[n].dirty||(this.frame+n)%this.periods[n]===0)&&(this._fit(n,e,t),this.cascades[n].dirty=!1,i.push(n));return i}render(e,t,s){for(const i of s){const n=this.cascades[i];yr(n.camera,this.size,this.size,{block:n.block}),t.render(e,{label:"shadow cascade "+i,kind:"depth",camera:n.camera,frameBlock:n.block,depthView:this.texture.view({dimension:"2d",baseArrayLayer:i,arrayLayerCount:1}),depthFormat:"depth32float",clearDepth:1,depthCompare:"less-equal",layerMask:this.layerMask,depthBias:2,depthBiasSlopeScale:1.5})}}}function aa(r,e,t,s,i,n,a){const h=1/(t-e),o=1/(s-i),l=1/(a-n);return r.set(2*h,0,0,-(t+e)*h,0,2*o,0,-(s+i)*o,0,0,-l,-n*l,0,0,0,1),r}class oa{constructor({gridSize:e=64,leafSize:t=8,levels:s=12,rangeFactor:i=2.5,morphStartRatio:n=.66,maxInstances:a=1500,minY:h=-20,maxY:o=20,heightBounds:l=null,center:c=null,prefix:u="cdlod"}={}){this.G=e,this.leafSize=t,this.levels=s,this.minY=h,this.maxY=o,this.heightBounds=l,this.fixedRoot=c,this.ranges=[];const f=[];let p=0;for(let b=0;b<s;b++){const M=t*Math.pow(2,b)*i;this.ranges.push(M);const x=p+(M-p)*n;f.push(new se(x,1/Math.max(.001,M-x))),p=M}const m=[];for(let b=0;b<s;b++)m.push(t*Math.pow(2,b)/e);this.uMorph={array:f},this.uSpacing={array:m};const d=u,v=d[0].toUpperCase()+d.slice(1);this.params=new de(v+"Params",{morph:[`vec4f[${s}]`,f.map((b,M)=>new G(b.x,b.y,m[M],0))]},{label:d}),this.module=new Q({name:d,uniforms:this.params,uniformName:d,code:`
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
`});const y=e,w=new Float32Array((y+1)*(y+1)*3);let g=0;for(let b=0;b<=y;b++)for(let M=0;M<=y;M++)w[g++]=M/y,w[g++]=0,w[g++]=b/y;const S=8,k=new Uint32Array(y*y*6);g=0;for(let b=0;b<y;b+=S)for(let M=0;M<y;M++)for(let x=b;x<Math.min(b+S,y);x++){const z=M*(y+1)+x,P=z+1,_=z+(y+1),A=_+1;(x+M)%2===0?(k[g++]=z,k[g++]=_,k[g++]=P,k[g++]=P,k[g++]=_,k[g++]=A):(k[g++]=z,k[g++]=_,k[g++]=A,k[g++]=z,k[g++]=A,k[g++]=P)}const T=new Zt;T.setAttribute("position",new le(w,3)),T.setIndex(new le(k,1)),this.nodeArray=new Float32Array(a*4),this.nodeAttr=new Xe(this.nodeArray,4),T.setAttribute("nodeData",this.nodeAttr),T.instanceCount=0,T.boundingSphere=new Pe(new C,1e7),T.boundingBox=new ze(new C(-1e7,-1e7,-1e7),new C(1e7,1e7,1e7)),this.geometry=T,this.maxInstances=a,this.count=0,this._box=new ze,this._frustum=new zt,this._mat=new U,this._cam=new C,this.lodCounts=new Array(s).fill(0)}vertexNodes(e=null,{out:t="lod",viewPos:s="frame.cameraPos"}={}){const i=this.module.name,n=e?`${e}( ${i}Snapped( v.nodeData, v.position.xz ) )`:"0.0";return`let ${t} = ${i}Morph( v.nodeData, v.position.xz, ${s}, ${n} );`}update(e){e.updateMatrixWorld(),this._mat.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(this._mat,e.coordinateSystem,e.reversedDepth),e.getWorldPosition(this._cam),this.count=0,this.lodCounts.fill(0);const t=this.levels-1,s=this.leafSize*Math.pow(2,t);if(this.fixedRoot){const{x:o,z:l,size:c}=this.fixedRoot,u=Math.ceil(c/s);for(let f=0;f<u;f++)for(let p=0;p<u;p++)this._select(o+p*s,l+f*s,s,t)}else{const o=Math.floor(this._cam.x/s),l=Math.floor(this._cam.z/s);for(let c=-1;c<=1;c++)for(let u=-1;u<=1;u++)this._select((o+u)*s,(l+c)*s,s,t)}const i=this.count,n=this._order||(this._order=[]);n.length=i;const a=this.nodeArray,h=this._cam;for(let o=0;o<i;o++){const l=a[o*4+2],c=Math.max(a[o*4]-h.x,0,h.x-a[o*4]-l),u=Math.max(a[o*4+1]-h.z,0,h.z-a[o*4+1]-l);n[o]={d:c*c+u*u,x:a[o*4],z:a[o*4+1],s:l,l:a[o*4+3]}}n.sort((o,l)=>o.d-l.d);for(let o=0;o<i;o++){const l=n[o];a[o*4]=l.x,a[o*4+1]=l.z,a[o*4+2]=l.s,a[o*4+3]=l.l}this.geometry.instanceCount=this.count,this.nodeAttr.clearUpdateRanges(),this.nodeAttr.addUpdateRange(0,this.count*4),this.nodeAttr.needsUpdate=!0}_bounds(e,t,s){if(this.heightBounds){const[i,n]=this.heightBounds(e,t,e+s,t+s);this._box.min.set(e,i,t),this._box.max.set(e+s,n,t+s)}else this._box.min.set(e,this.minY,t),this._box.max.set(e+s,this.maxY,t+s);return this._box}_intersectsSphere(e,t){const s=this._cam,i=Math.max(e.min.x-s.x,0,s.x-e.max.x),n=Math.max(e.min.y-s.y,0,s.y-e.max.y),a=Math.max(e.min.z-s.z,0,s.z-e.max.z);return i*i+n*n+a*a<=t*t}_add(e,t,s,i){if(this.count>=this.maxInstances)return;const n=this.count*4;this.nodeArray[n]=e,this.nodeArray[n+1]=t,this.nodeArray[n+2]=s,this.nodeArray[n+3]=i,this.count++,this.lodCounts[i]++}_select(e,t,s,i){const n=this._bounds(e,t,s);if(!this._intersectsSphere(n,this.ranges[i]))return!1;if(!this._frustum.intersectsBox(n))return!0;if(i===0||!this._intersectsSphere(n,this.ranges[i-1]))return this._add(e,t,s,i),!0;const a=s*.5,h=[[e,t],[e+a,t],[e,t+a],[e+a,t+a]];for(const[o,l]of h)if(!this._select(o,l,a,i-1)){const c=this._bounds(o,l,a);this._frustum.intersectsBox(c)&&this._add(o,l,a,i)}return!0}}const wt=256,E=wt,la=8,mt=E/2,ha=[733,157,33.3,7.1],Ci=Math.PI*2;class Ti{constructor(e={}){this.scale=e.scale??1,this.windSpeed=e.windSpeed??8,this.windDirection=e.windDirection??20,this.fetch=e.fetch??200,this.spreadBlend=e.spreadBlend??.9,this.swell=e.swell??.2,this.peakEnhancement=e.peakEnhancement??3.3,this.shortWavesFade=e.shortWavesFade??.01}}const us=`
const FFT_N: u32 = ${E}u;
const FFT_HALF: u32 = ${mt}u;
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
`;class ca{constructor(e,t={}){this.renderer=e,this.cascades=t.cascades??4,this.sizes=(t.sizes??ha).slice(0,this.cascades),this.depth=t.depth??500,this.local=new Ti(t.local??{windSpeed:7,windDirection:25,fetch:120,spreadBlend:.85,swell:.05}),this.swell=new Ti(t.swell??{scale:.48,windSpeed:6,windDirection:5,fetch:1200,spreadBlend:1,swell:.9,shortWavesFade:.1});const s=this.cascades;this.params=new de("OceanParams",{sizes:["vec4f[4]",[0,1,2,3].map(h=>new G(this.sizes[h]??1,0,0,0))],cuts:["vec4f[4]",[0,1,2,3].map(()=>new G)],sysA:["vec4f[2]",[new G,new G]],sysB:["vec4f[2]",[new G,new G]],choppiness:["f32",t.choppiness??.9],foamBias:["f32",.58],foamGain:["f32",3],foamDecay:["f32",.35],foamAdd:["f32",2.5],time:["f32",0],depth:["f32",this.depth],seed:["u32",1337]},{label:"ocean"});const i=this.params.fields;this.choppiness=i.choppiness,this.foamBias=i.foamBias,this.foamGain=i.foamGain,this.foamDecay=i.foamDecay,this.foamAdd=i.foamAdd,this.time=i.time,this.uDepth=i.depth,this.uSeed=i.seed,this.timeScale=1;const n=E*E*s;this.h0=new ye({label:"fftH0",count:n,type:"vec4f"}),this.waveData=new ye({label:"fftWave",count:n,type:"vec4f"}),this.tmp=new ye({label:"fftTmp",count:n*2,type:"vec4f"}),this.foam=new ye({label:"fftFoam",count:n,type:"f32"}),this.mipSrc=new ye({label:"fftMipSrc",count:n*2,type:"vec4f"}),this.mipMid=new ye({label:"fftMipMid",count:64*s*2,type:"vec4f"});const a=h=>new Ye({label:h,width:E,height:E,depth:s,dimension:"2d-array",format:"rgba16float",mips:!0,usage:["sample","storage","copyDst","copySrc"],sampler:"linearRepeat"});this.displacementTexture=a("oceanDisplacement"),this.derivativeTexture=a("oceanDerivatives"),this.module=new Q({name:"ocean",deps:[J],uniforms:this.params,uniformName:"ocean",bindings:{oceanDisplacement:{texture:this.displacementTexture,viewDimension:"2d-array"},oceanDerivatives:{texture:this.derivativeTexture,viewDimension:"2d-array"}},code:`
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
`}),this._buildKernels(),this.updateSpectrumUniforms(),this.needsSpectrum=!0}get uSizes(){return{array:this.sizes}}setCascadeSizes(e){this.sizes=e.slice(0,this.cascades),this.updateSpectrumUniforms()}updateSpectrumUniforms(){const e=this.cascades,t=this.params.fields;for(let i=0;i<e;i++){const n=i===0?1e-4:Ci/this.sizes[i]*6,a=i===e-1?9999:Ci/this.sizes[i+1]*6;t.cuts.value[i].set(n,a,0,0),t.sizes.value[i].set(this.sizes[i],0,0,0)}t.depth.value=this.depth;const s=[this.local,this.swell];for(let i=0;i<2;i++){const n=s[i],a=Math.max(1,n.fetch)*1e3,h=Math.max(.1,n.windSpeed),o=.076*Math.pow(Et*a/(h*h),-.22),l=22*Math.pow(h*a/(Et*Et),-.33);t.sysA.value[i].set(n.scale,Gr.degToRad(n.windDirection),n.spreadBlend,n.swell),t.sysB.value[i].set(o,l,n.peakEnhancement,n.shortWavesFade)}this.params.set("cuts",t.cuts.value),this.params.set("sizes",t.sizes.value),this.params.set("sysA",t.sysA.value),this.params.set("sysB",t.sysB.value),this.needsSpectrum=!0}_buildKernels(){this.cascades;const e={ocean:{uniform:this.params}},t=c=>({storage:c,access:"read_write"}),s=`
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
`;this.initSpectrumKernel=new Me({label:"Ocean Init Spectrum",modules:[J],bindings:{...e,h0:t(this.h0),waveData:t(this.waveData)},workgroupSize:[16,16,1],code:us+s+`
@compute @workgroup_size( WG_X, WG_Y, WG_Z )
fn main( @builtin( global_invocation_id ) gid: vec3u ) {
	let x = i32( gid.x ); let y = i32( gid.y ); let c = i32( gid.z );
	let idx = c * ${E*E} + y * ${E} + x;

	let L = ocean.sizes[ c ].x;
	let dk = TWO_PI / L;
	let kx = f32( x - ${mt} ) * dk;
	let kz = f32( y - ${mt} ) * dk;
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
}`}),this.conjugateKernel=new Me({label:"Ocean Conjugate",bindings:{h0:t(this.h0),tmp:t(this.tmp)},workgroupSize:[16,16,1],code:`
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
}`}),this.copyH0Kernel=new Me({label:"Ocean Copy H0",bindings:{h0:t(this.h0),tmp:t(this.tmp),foam:t(this.foam)},workgroupSize:[16,16,1],code:`
@compute @workgroup_size( WG_X, WG_Y, WG_Z )
fn main( @builtin( global_invocation_id ) gid: vec3u ) {
	let idx = gid.z * ${E*E}u + gid.y * ${E}u + gid.x;
	h0[ idx ] = tmp[ idx ];
	foam[ idx ] = 0.0;
}`});let i="";for(let c=0;c<la;c++){const u=1<<c;i+=`
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
	}`}const n=`var<workgroup> fftShared: array<vec4f, ${E*2}>;
`;this.rowKernel=new Me({label:"Ocean FFT Rows",modules:[J],bindings:{...e,h0:t(this.h0),waveData:t(this.waveData),tmp:t(this.tmp)},workgroupSize:[mt,1,1],code:us+n+`
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
${i}

	for ( var e = 0u; e < 2u; e++ ) {
		let x = t + e * FFT_HALF;
		let o = ( base + x ) * 2u;
		tmp[ o ] = fftShared[ x * 2u ];
		tmp[ o + 1u ] = fftShared[ x * 2u + 1u ];
	}
}`});const a=(c,u)=>({storageTexture:c,access:"write",view:{dimension:"2d-array",baseMipLevel:u,mipLevelCount:1}});this.columnKernel=new Me({label:"Ocean FFT Columns",modules:[J],bindings:{...e,tmp:t(this.tmp),foam:t(this.foam),mipSrc:t(this.mipSrc),dispOut:a(this.displacementTexture,0),derivOut:a(this.derivativeTexture,0)},workgroupSize:[mt,1,1],code:us+n+`
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
${i}

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
}`});const h=(c,u,f,p,m)=>{const d=f*2;let v="";return u?v=`${u}[ ly * ${f}u + lx ] = v;`:p===5&&(v=`mipMid[ ( c * 64u + gy * 8u + gx ) * 2u + ${m}u ] = v;`),`
	if ( lx < ${f}u && ly < ${f}u ) {
		let i = ly * ${2*d}u + lx * 2u;
		let v = ( ${c}[ i ] + ${c}[ i + 1u ] + ${c}[ i + ${d}u ] + ${c}[ i + ${d+1}u ] ) * 0.25;
		textureStore( out${p}, vec2u( gx * ${f}u + lx, gy * ${f}u + ly ), c, v );
		${v}
	}`},o=(c,u)=>new Me({label:"Ocean Mips A",bindings:{mipSrc:t(this.mipSrc),mipMid:t(this.mipMid),out1:a(c,1),out2:a(c,2),out3:a(c,3),out4:a(c,4),out5:a(c,5)},workgroupSize:[16,16,1],code:`
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
}`}),l=(c,u)=>new Me({label:"Ocean Mips B",bindings:{mipMid:t(this.mipMid),out6:a(c,6),out7:a(c,7),out8:a(c,8)},workgroupSize:[8,8,1],code:`
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
}`});this.mipKernelsA=[o(this.displacementTexture,0),o(this.derivativeTexture,1)],this.mipKernelsB=[l(this.displacementTexture,0),l(this.derivativeTexture,1)]}update(e){const t=this.cascades;if(this.needsSpectrum){this.needsSpectrum=!1;const s=[E/16,E/16,t];this.initSpectrumKernel.dispatch(s),this.conjugateKernel.dispatch(s),this.copyH0Kernel.dispatch(s)}this.time.value+=e*this.timeScale,F.computePass("Ocean FFT",s=>{this.rowKernel.dispatch([E,t,1],{pass:s}),this.columnKernel.dispatch([E,t,1],{pass:s});for(const i of this.mipKernelsA)i.dispatch([E/32,E/32,t],{pass:s});for(const i of this.mipKernelsB)i.dispatch([1,1,t],{pass:s})})}sampleDisplacement(e,t=null,s=null){const i=[];for(let n=0;n<this.cascades;n++){let a=`textureSampleLevel( oceanDisplacement, smpLinearRepeat, ( ${e} ) / ocean.sizes[ ${n} ].x, ${n}, ${t??"0.0"} ).xyz`;s&&(a+=` * ( ${s[n]} )`),i.push(a)}return"( "+i.join(" + ")+" )"}}class ua{constructor({fft:e,cdlod:t,foamTexture:s}){this.fft=e,this.cdlod=t,this.foamTexture=s,this.shore=null,this.wake=null,this.terrain=null,this.detail=null,this.shoreSim=null,this.foamShading=null,this.params=new de("WaterSurfaceParams",{amplitude:["f32",1],slopeScale:["f32",1],foamCoverage:["f32",1],foamSharpness:["f32",2.2],foamScale:["f32",.09]},{label:"waterSurface"});const i=this.params.fields;this.amplitude=i.amplitude,this.slopeScale=i.slopeScale,this.foamCoverage=i.foamCoverage,this.foamSharpness=i.foamSharpness,this.foamScale=i.foamScale,this.foamWeights=[.35,.45,.5,.25];const n=[],a=[];for(let o=0;o<e.cascades;o++)n.push(Math.min(40,e.sizes[o]*.08)),a.push([0,.05,.25,.5][o]??.5);const h=o=>`array<f32, ${o.length}>( ${o.map(l=>l.toFixed(5)).join(", ")} )`;this.attenuationModule=new Q({name:"waterSurfaceAttenuation",deps:[J],code:`
fn waterSurfaceCascadeAttenuation( c: i32, depth: f32 ) -> f32 {
	let d0 = ${h(n)};
	let floorAmt = ${h(a)};
	let a = smoothstep( 0.0, d0[ c ], depth );
	return mix( floorAmt[ c ] * smoothstep( 0.0, 0.6, depth ), 1.0, a );
}
`}),this._module=null}get surfFoam(){const e=this.foamShading;if(e&&e.module)return e;if(typeof e=="function"){const t=e({});if(t&&t.isShaderModule)return{module:t};if(t&&t.module)return t}return null}get module(){return this._module||(this._module=this._buildModule()),this._module}_buildModule(){const e=this.fft,t=e.cascades,s=!!this.terrain,i=!!this.shore,n=!!this.wake,a=!!this.detail,h=this.surfFoam,o=!!this.shoreSim,l=this.cdlod.module.name,c=l[0].toUpperCase()+l.slice(1)+"Vertex",u=b=>Number(b).toFixed(6);let f="";for(let b=0;b<t;b++){const x=e.sizes[b]/wt;f+=`
	{
		// band-limit to the mesh spacing to avoid aliasing / swimming
		let level = max( log2( spacing / ${u(x)} ) + 0.7, 0.0 );
		let att = waterSurfaceCascadeAttenuation( ${b}, depth );
		let uv = worldXZ / ocean.sizes[ ${b} ].x;
		let s = textureSampleLevel( oceanDisplacement, smpLinearRepeat, uv, ${b}, level );
		disp += s.xyz * att;
		// foam coverage is smooth enough to evaluate per vertex (sampled at a fixed detail level,
		// the displacement sample itself from there on)
		var fv = s.w;
		if ( level < 1.5 ) { fv = textureSampleLevel( oceanDisplacement, smpLinearRepeat, uv, ${b}, 1.5 ).w; }
		foam += fv * ${u(this.foamWeights[b]??.25)} * att;
	}`}const p=`
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
${i?`
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
${n?"	extra += wakeDisplacement( worldXZ );":""}

	var total = disp + extra;
	var y = frame.seaLevel + total.y;
${i?`
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
`;let m="";for(let b=0;b<t;b++){let M=`waterSurfaceCascadeAttenuation( ${b}, depth )`;a&&b>=t-2?M+=" * rough":a&&b===t-3&&(M+=" * mix( 1.0, rough, 0.4 )"),m+=`	d += textureSample( oceanDerivatives, smpAniso4Repeat, lagXZ / ocean.sizes[ ${b} ].x, ${b} ) * ( ${M} );
`}const d=t-1,v=e.sizes[d],y=7.3,w=3.1,g=v/y/wt,S=v/w/wt,k=(b,M)=>`vec2f( ${b}.x * ${u(Math.cos(M))} - ${b}.y * ${u(Math.sin(M))}, ${b}.x * ${u(Math.sin(M))} + ${b}.y * ${u(Math.cos(M))} )`,T=`
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
	let face = ${i?"sat( surfMask.x )":"0.0"};
	// (some of it stays: the lace of the previous wave is drawn up the face)
	let simFoam = ${o?"extraFoam * ( 1.0 - face * 0.72 )":"0.0"};
	foamSum += simFoam;
	// bubbles mixed into the water (milky, turquoise, hides the bottom): surf and wake
	var aeration = 0.0;

	// world-space gusts / slicks modulate the short wind waves (non-repeating dark and bright patches)
${a?`	let det = seaDetailSample( lagXZ );
	let rough = det.rough;`:"	let rough = 1.0;"}

${m}
	d *= waterSurface.amplitude;
	var slopes = vec2f( d.x / max( d.z + 1.0, 0.2 ), d.y / max( d.w + 1.0, 0.2 ) );

	// Near-field capillary ripples. Within a few metres of the camera a pixel covers less than
	// the finest cascade's texel (~3 cm), so the surface looks glassy. Re-sample that cascade at
	// ~1 m and ~2.3 m tiles (rotated, so they never line up with it) wherever the footprint is
	// small. Damped in slicks with the short wind waves. Explicit LOD: this runs in a branch.
	let near = smoothstep( 0.04, 0.01, footprint ) * rough;
	if ( near > 0.002 ) {
		let c1 = textureSampleLevel( oceanDerivatives, smpLinearRepeat, ${k("lagXZ",.63)} * ${u(y/v)}, ${d}, max( log2( footprint / ${u(g)} ), 0.0 ) );
		let c2 = textureSampleLevel( oceanDerivatives, smpLinearRepeat, ${k("lagXZ",2.14)} * ${u(w/v)}, ${d}, max( log2( footprint / ${u(S)} ), 0.0 ) );
		// gradients back into world axes (transpose of the rotation)
		let g1 = c1.xy; let g2 = c2.xy;
		let g = ${k("g1",-.63)} * 0.55 + ${k("g2",-2.14)} * 0.35;
		slopes += g * near;
	}
	let jac = ( d.z + 1.0 ) * ( d.w + 1.0 );
${n?`
	{
		let w = wakeFragment( lagXZ );
		slopes += w.slopes;
		foamSum += w.foam;
		aeration += w.aeration;
	}`:""}

	// base normal: large shoreline waves (per-vertex, can overhang) perturbed by FFT detail
	var normal: vec3f;
	var baseNormal = vec3f( 0.0, 1.0, 0.0 );
${i?`
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
${a?"	whitecaps = whitecaps * mix( 0.5, 1.5, det.gust ) + det.streak * 0.5;":""}
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
	fa.fresh = ${i?"shoreFoam":"0.0"}; fa.sim = simFoam; fa.simState = simState; fa.roller = ${i?"surfMask.y":"0.0"}; fa.P = P;
	o.foamInfo = surfFoamShading( fa );
	foam = o.foamInfo.foam;`:""}

	o.normal = normal;
	o.foam = foam;
	o.coverage = coverage;
	o.slopes = slopes;
	o.jacobian = jac;
	o.rough = rough;
	o.aeration = sat( aeration );
	o.gust = ${a?"det.gust":"0.5"};
	o.slick = ${a?"det.slick":"0.0"};
	return o;
}
`;return new Q({name:"waterSurface",deps:[J,e.module,this.cdlod.module,this.attenuationModule,s&&this.terrain.module,i&&this.shore.module,n&&this.wake.module,a&&this.detail.module,h&&h.module],uniforms:this.params,uniformName:"waterSurface",bindings:{waterFoamTex:{texture:this.foamTexture}},code:p+T})}seaDepth(e){return`waterSurfaceSeaDepth( ${e} )`}cascadeAttenuation(e,t){return`waterSurfaceCascadeAttenuation( ${e}, ${t} )`}}const Ms=6,fa=new de("WhaleMarks",{marks:[`vec4f[${Ms}]`,new Array(Ms).fill(0).map(()=>new G(0,0,1,0))]},{label:"whaleMarks"}),da=new Q({name:"whaleWater",uniforms:fa,uniformName:"whaleMarks",code:`
fn whaleWater( xz: vec2f ) -> vec2f {
	var foam = 0.0; var slick = 0.0;
	for ( var i = 0; i < ${Ms}; i++ ) {
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
`}),We={left:.15,right:.15,bottom:.6,top:0},yt={cx:(We.right-We.left)/2,cy:(We.top-We.bottom)/2,sx:1+(We.left+We.right)/2,sy:1+(We.top+We.bottom)/2};new U().set(1/yt.sx,0,0,-0/yt.sx,0,1/yt.sy,0,.3/yt.sy,0,0,1,0,0,0,0,1);new U;const Fe=1.333,pa=new Q({name:"waterFresnel",deps:[J],code:`
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
`});class ma extends lt{constructor({surface:e,sky:t,sceneCopy:s,sceneDepthHalf:i=null,refraction:n=null,reflection:a=null,hullMask:h=null,hullMaskActive:o=null}){super({name:"water",lit:!1,side:"double",transparent:!1,blending:"none",depthWrite:!0,defines:{IS_WATER:1},attributes:{nodeData:"vec4f"},varyings:{vLagXZ:"vec2f",vWaveH:"f32",vSeaDepth:"f32",vFoam:"f32",vShoreN:"vec3f",vShoreFoam:"f32",vSurfMask:"vec2f"},uniforms:{backscatter:["f32",.035],sss:["f32",1],refraction:["f32",.06],foamIntensity:["f32",1],waterRoughness:["f32",.035],reflectionStrength:["f32",1],ssr:["f32",1],debugMode:["i32",0],hullActive:["f32",0]}}),this.isWaterMaterial=!0,this.lightingHooks=!1,this.waterSurface=e,this.sky=t,this.reflection=a,this.clouds=null,this.cheap=!1,this.cameraWaterHeightNode=null;const l=this.uniforms;this.params={absorption:me.waterAbsorption,scattering:me.waterScattering,backscatter:l.backscatter,sss:l.sss,refraction:l.refraction,foamIntensity:l.foamIntensity,roughness:l.waterRoughness,reflectionStrength:l.reflectionStrength,ssr:l.ssr},this.debugMode=l.debugMode,this.sceneDepthTexture=s.depthTexture,this.sceneColorTexture=s.texture,this.sceneDepthHalfTexture=i,this.refraction=n,this.hullMaskTexture=h,this.hullMaskActive=o,o&&(this.uniformBlock.fields.hullActive=o),this._built=!1}get _hullOn(){return this._hull?this.hullOverride!==void 0&&this.hullOverride!==null?!!this.hullOverride:this.hullMaskActive.value>.5:!1}pipelineKey(){return this._built||this._build(),super.pipelineKey()+(this._hullOn?".hull":"")}allDefines(){return{...super.allDefines(),WATER_HULL:this._hullOn?1:0}}_build(){this._built=!0;const e=this.waterSurface,t=this.sky,s=!!e.terrain,i=!!e.shore,n=!!e.shoreSim,a=!!e.surfFoam,h=!!(this.clouds&&this.clouds.module),o=!!(this.hullMaskTexture&&this.hullMaskActive),l=!!(this.reflection&&this.reflection.module);this.modules=[J,pa,xa,da,e.module,t&&t.module,h&&this.clouds.module,n&&e.shoreSim.module,l&&this.reflection.module,this.cameraWaterHeightNode&&this.cameraWaterHeightNode.module].filter(Boolean),this.bindings.waterSceneColor={texture:this.sceneColorTexture},this.bindings.waterSceneDepth={texture:this.sceneDepthTexture,sampleType:"unfilterable-float"},this.sceneDepthHalfTexture&&(this.bindings.waterSceneDepthHalf={texture:this.sceneDepthHalfTexture}),this.setDefine("WATER_DEPTH_HALF",this.sceneDepthHalfTexture?1:0);const c=!!this.refraction;c&&(this.bindings.waterRefrColor={texture:this.refraction.texture},this.bindings.waterRefrDepth={texture:this.refraction.depthTexture,sampleType:"unfilterable-float"}),this.setDefine("WATER_REFRACTION",c?1:0),o&&(this.bindings.waterHullMask={texture:this.hullMaskTexture,sampleType:"unfilterable-float"}),this._hull=o,this.vertex=`
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
`,this.output=this.cheap?"r.color = vec4f( 0.02, 0.05, 0.1, 1.0 ); r.mask = vec4f( 0.0, 1.0, 0.0, 1.0 );":this._shadeWGSL({T:s,SH:i,SIM:n,SF:a,CL:h,HULL:o,REFL:l}),this.needsUpdate=!0}_shadeWGSL({T:e,SH:t,SIM:s,SF:i,CL:n,HULL:a,REFL:h}){this.waterSurface;const o=t,l=t,c=e&&t,u=this.cameraWaterHeightNode?String(this.cameraWaterHeightNode):"frame.cameraWaterHeight";return`
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
${n?"	sunLight *= cloudsShadow( pos.xz );":""}
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
${i?"		let foamLit = surfFoamLight( surf.foamInfo, N, L, V, sunLight, pos );":"		let foamLit = ( sunLight * ( max( dot( N, L ), 0.0 ) * 0.75 + 0.25 ) * INV_PI + frame.skyIrradiance * 0.95 ) * 0.85;"}
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
`}}const Bt=yt,Rt=r=>r.toFixed(6),ya=`
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
`,xa=new Q({name:"waterHelpers",deps:[J],code:ya});function va(r,e=1024){const t=new Ye({label:"foamPattern",width:e,height:e,format:"rgba16float",mips:!0,usage:["sample","storage","copyDst"],sampler:"anisoRepeat"}),s=(n,a,h)=>{let o="",l=.5,c=0;for(let u=0;u<h;u++)o+=`${o?" + ":""}vnoise( ${n}, ${(a*Math.pow(2,u)).toFixed(1)} ) * ${l}`,c+=l,l*=.5;return`( ( ${o} ) / ${c} )`};return new Me({label:"Foam Pattern",bindings:{foamOut:{storageTexture:t,access:"write",view:{dimension:"2d",baseMipLevel:0,mipLevelCount:1}}},workgroupSize:[8,8,1],code:`
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
}`}).dispatch([e/8,e/8,1]),Bn(t),t}class ga{constructor(e,t=e.label){const s=e.width;if(e.height!==s||s&s-1||s<32||s>512)throw new Error("ComputeMips: square power-of-two 32..512 only");this.res=s,this.layers=e.dimension==="3d"?1:e.depth;const i=e.mipLevelCount,n=Math.min(5,i-1),a=f=>({storageTexture:e,access:"write",view:{dimension:"2d-array",baseMipLevel:f,mipLevelCount:1}}),h=f=>({texture:e,view:{dimension:"2d-array",baseMipLevel:f,mipLevelCount:1}}),o=(f,p,m,d)=>`
	if ( lx < ${m}u && ly < ${m}u ) {
		let i = ly * ${4*m}u + lx * 2u;
		let v = ( ${f}[ i ] + ${f}[ i + 1u ] + ${f}[ i + ${2*m}u ] + ${f}[ i + ${2*m+1}u ] ) * 0.25;
		textureStore( out${d}, vec2u( gx * ${m}u + lx, gy * ${m}u + ly ), layer, v );
		${p?`${p}[ ly * ${m}u + lx ] = v;`:""}
	}
	workgroupBarrier();`,l={src0:h(0)};let c="";for(let f=1;f<=n;f++)l["out"+f]=a(f);for(let f=2,p=8;f<=n;f++,p>>=1)c+=o("s"+(f-1),f<n?"s"+f:null,p,f);this.kernelA=new Me({label:t+" mips A",bindings:l,workgroupSize:[16,16,1],code:`
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
}`}),this.kernelB=null;const u=s>>5;if(i>6&&u>1){const f={src5:h(5)};let p="",m="",d="s5";for(let v=6,y=u>>1;v<i&&y>=1;v++,y>>=1){f["out"+v]=a(v);const w=y>1&&v<i-1?"s"+v:null;w&&(m+=`var<workgroup> ${w}: array<vec4f, ${y*y}>;
`),p+=o(d,w,y,v),d=w}this.kernelB=new Me({label:t+" mips B",bindings:f,workgroupSize:[u,u,1],code:`
var<workgroup> s5: array<vec4f, ${u*u}>;
${m}
@compute @workgroup_size( WG_X, WG_Y, WG_Z )
fn main( @builtin( local_invocation_id ) lid: vec3u, @builtin( workgroup_id ) wid: vec3u ) {
	let lx = lid.x; let ly = lid.y; let layer = wid.z;
	let gx = 0u; let gy = 0u;
	s5[ ly * ${u}u + lx ] = textureLoad( src5, vec2u( lx, ly ), layer, 0 );
	workgroupBarrier();
${p}
}`})}}dispatch(e=null){const t=e?{pass:e}:void 0;this.kernelA.dispatch([this.res/32,this.res/32,this.layers],t),this.kernelB&&this.kernelB.dispatch([1,1,this.layers],t)}}class Li{constructor(e,t,{res:s,grid:i,depths:n,name:a,slopeLevel:h,margin:o}){this.fft=e,this.cascade=t,this.tile=e.sizes[t],this.res=s,this.margin=o,this.grid=Math.ceil(i*(1+2*o)),this.depths=n,this.texture=new Ye({label:a,width:s,height:s,format:"rgba16float",mips:!0,usage:["sample","render","storage","copyDst","copySrc"],sampler:"anisoRepeat"}),this.target={texture:this.texture};const l=this.grid,c=l+1,u=new Uint32Array(l*l*6);for(let p=0,m=0;p<l;p++)for(let d=0;d<l;d++){const v=p*c+d;u[m++]=v,u[m++]=v+1,u[m++]=v+c,u[m++]=v+c,u[m++]=v+1,u[m++]=v+c+1}this.indexCount=u.length,this.indexBuffer=F.device.createBuffer({label:a+" indices",size:u.byteLength,usage:GPUBufferUsage.INDEX|GPUBufferUsage.COPY_DST}),F.queue.writeBuffer(this.indexBuffer,0,u),this.mipChain=new ga(this.texture,a);const f=this.tile;this.pipelines=[];for(let p=0;p<n.length;p++){const m=n[p],d=`
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
	let off = ( T.xz / tDown - T0.xz / max( - T0.y, 0.15 ) ) * ${m.toFixed(3)};
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
	return vec4f( ${p===0?"I":"0.0"}, ${p===1?"I":"0.0"}, 0.0, 1.0 );
}
`,v=Qt({modules:[J,e.module],code:d,stage:"render",label:a}),y=Jt(v.code,a),w={srcFactor:"one",dstFactor:"one",operation:"add"},g=F.renderPipeline({label:a+p,layout:F.device.createPipelineLayout({bindGroupLayouts:[v.group0.layout,v.bindings.layout]}),vertex:{module:y,entryPoint:"vs"},fragment:{module:y,entryPoint:"fs",targets:[{format:"rgba16float",blend:{color:w,alpha:w}}]},primitive:{topology:"triangle-list",cullMode:"none"}});this.pipelines.push({pipeline:g,bindings:v.bindings,group0:v.group0})}}render(){const t=F.getEncoder().beginRenderPass({label:this.texture.label,colorAttachments:[{view:this.texture.view({dimension:"2d",baseMipLevel:0,mipLevelCount:1}),clearValue:[0,0,0,0],loadOp:"clear",storeOp:"store"}]});t.setIndexBuffer(this.indexBuffer,"uint32");for(const s of this.pipelines)t.setPipeline(F.ready(s.pipeline)),t.setBindGroup(0,s.group0.getBindGroup()),t.setBindGroup(1,s.bindings.getBindGroup()),t.drawIndexed(this.indexCount,1);t.end()}mips(e){this.mipChain.dispatch(e)}}class wa{constructor(e,t){this.renderer=e,this.fft=t,this.params=new de("CausticsParams",{strength:["f32",.75]},{label:"caustics"}),this.strength=this.params.fields.strength,this.detail=null;const s=t.cascades-1;this.fine=new Li(t,s,{res:512,grid:256,depths:[1.2,4],name:"causticsFine",slopeLevel:1,margin:.35}),this.broad=new Li(t,s-1,{res:256,grid:128,depths:[3,9],name:"causticsBroad",slopeLevel:.5,margin:.35}),this._module=null}update(){this.fine.render(this.renderer),this.broad.render(this.renderer),F.computePass("Caustics Mips",e=>{this.fine.mips(e),this.broad.mips(e)})}get module(){if(this._module)return this._module;const e=this.detail,t=this.fine,s=this.broad;return this._module=new Q({name:"caustics",deps:[J,e?e.module:null],uniforms:this.params,uniformName:"caustics",bindings:{causticsFineTex:{texture:t.texture},causticsBroadTex:{texture:s.texture}},code:`
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
`}),this._module}get fineTex(){return this.fine.texture}get broadTex(){return this.broad.texture}}const De=512,ba=[128,1024];function Ma({fft:r,caustics:e,clouds:t=null,terrain:s=null,shore:i=null,surface:n=null,shoreSim:a=null}){const h=new de("UnderwaterParams",{reach:["f32",3]},{label:"underwater"});h.onBeforePack=()=>{h.fields.reach.value=i&&i.amplitude?i.amplitude.value*1.5+1.2:3};const o=!!s,l=!!(i&&s),c=[J,je,r.module,s&&s.module,l&&i.module,a&&a.module,e&&e.module,t&&t.module,n&&n.attenuationModule],u=Math.min(3,r.cascades),f=Math.min(2,r.cascades),p=new Q({name:"underwater",deps:c,uniforms:h,uniformName:"underwater",code:`
struct UnderwaterLongWaves { height: f32, slope: vec2f, foam: f32 };

// long waves at xz: height, slope and foam from the coarse FFT cascades and the shore waves
// texel: the bake's texel size (m); the cascades are read no finer than it (level >= 2)
fn underwaterLongWaves( xz: vec2f, texel: f32 ) -> UnderwaterLongWaves {
	let seaDepth = ${o?"frame.seaLevel - terrainHeightAt( xz )":"50.0"};
	var h = 0.0;
	var slope = vec2f( 0.0 );
	for ( var c = 0; c < ${u}; c++ ) {
		let uv = xz / ocean.sizes[ c ].x;
		let att = ${n?"waterSurfaceCascadeAttenuation( c, seaDepth )":"1.0"};
		let lvl = max( 2.0, log2( texel * ${wt}.0 / ocean.sizes[ c ].x ) );
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
${a?"	foam += shoreSimSample( xz ).x * 0.8;":""}
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
`}),m=new de("UwMapParams",{origin0:["vec2f",new se],origin1:["vec2f",new se],reach:["f32",3]},{label:"uwMap"});m.onBeforePack=()=>{m.fields.reach.value=i&&i.amplitude?i.amplitude.value*1.5+1.2:3};const d=[m.fields.origin0,m.fields.origin1],v=z=>new Ye({label:z,width:De,height:De,format:"rgba16float",usage:["sample","storage"]}),y=ba.map((z,P)=>{const _=z/De,A=v("uwWaves"+P),$=v("uwLevel"+P),D=new Me({label:"Underwater Light Map "+P,modules:[p,...e&&e.module?[e.module]:[]],bindings:{uwMapParams:{uniform:m},uwOutA:{storageTexture:A,access:"write"},uwOutB:{storageTexture:$,access:"write"}},workgroupSize:[8,8,1],code:`
@compute @workgroup_size( WG_X, WG_Y, WG_Z )
fn main( @builtin( global_invocation_id ) gid: vec3u ) {
	let xz = ( vec2f( gid.xy ) + 0.5 ) * ${_} + uwMapParams.origin${P};
	let lw = underwaterLongWaves( xz, ${_} );
	textureStore( uwOutA, vec2u( gid.xy ), vec4f( lw.height - frame.seaLevel, lw.slope, sat( lw.foam ) ) );
	let dk = ${e&&e.module?"causticsDetailK( xz )":"1.0"};
	textureStore( uwOutB, vec2u( gid.xy ), vec4f( underwaterMeanLevel( xz ) - frame.seaLevel, dk, 0.0, 1.0 ) );
}
`});return{extent:z,texel:_,A,B:$,kernel:D,origin:d[P]}}),[w,g]=y,S=new Q({name:"uwMap",deps:[J],uniforms:m,uniformName:"uwMapParams",bindings:{uwWaves0:{texture:w.A},uwLevel0:{texture:w.B},uwWaves1:{texture:g.A},uwLevel1:{texture:g.B}},code:`
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
	let st0 = ( xz - uwMapParams.origin0 ) / ${w.texel};
	let st1 = ( xz - uwMapParams.origin1 ) / ${g.texel};
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
`}),k=z=>{for(const P of y){const _=P.extent/2;P.origin.value.set(Math.floor(z.position.x/P.texel)*P.texel-_,Math.floor(z.position.z/P.texel)*P.texel-_)}for(const P of y)P.kernel.dispatch([De/8,De/8,1])},T=[J,je,S,e&&e.module,t&&t.module,s&&s.module].filter(Boolean),b=new Q({name:"hook-directModulation-underwater",deps:T,code:`
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
`}),M=new Q({name:"hook-ambientModulation-underwater",deps:[b],code:`
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
`}),x=new Q({name:"hook-shadowPosition-underwater",deps:T,code:`
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
`});return gt.set("directModulation",b),gt.set("shadowPosition",x),gt.set("ambientModulation",M),{helpers:p,direct:b,ambient:M,shadowPos:x,params:h,update:k,levels:y}}const j={BODY:0,DORSAL1:1,DORSAL2:2,ANAL:3,CAUDAL:4,PECTORAL:5,PELVIC:6,FINLET:7,EYE:8,MOUTH:9,FLESH:10,ICE:11,LEAF:12,SHELL:13,FILLET:14,DISC:15,WHIP:16,CARAPACE:17,SKIN:18,FLIPPER:19},Ss=Math.PI*2,Ut=(r,e)=>{if(e<=r[0][0])return r[0][1];for(let t=1;t<r.length;t++)if(e<=r[t][0]){const s=r[t-1],i=r[t],n=(e-s[0])/(i[0]-s[0]),a=n*n*(3-2*n);return s[1]+(i[1]-s[1])*(.5*n+.5*a)}return r[r.length-1][1]},fe=(r,e,t)=>r+(e-r)*t,Mt=(r,e,t)=>Math.max(e,Math.min(t,r)),Sa=(r,e,t)=>{const s=Mt((t-r)/(e-r),0,1);return s*s*(3-2*s)};class za{constructor(){this.pos=[],this.dat=[],this.idx=[],this.seams=[]}v(e,t,s,i,n,a,h){return this.pos.push(e,t,s),this.dat.push(i,n,a,h),this.pos.length/3-1}tri(e,t,s){this.idx.push(e,t,s)}quad(e,t,s,i){this.idx.push(e,t,i,t,s,i)}build(){const e=new _e;e.setAttribute("position",new nt(this.pos,3)),e.setAttribute("aData",new nt(this.dat,4)),e.setIndex(this.idx),e.computeVertexNormals();const t=e.attributes.normal.array;for(const[s,i]of this.seams){let n=t[s*3]+t[i*3],a=t[s*3+1]+t[i*3+1],h=t[s*3+2]+t[i*3+2];const o=Math.hypot(n,a,h)||1;n/=o,a/=o,h/=o,t[s*3]=t[i*3]=n,t[s*3+1]=t[i*3+1]=a,t[s*3+2]=t[i*3+2]=h}return e.computeBoundingSphere(),e}}function Ue(r,e){return{T:Ut(r.top,e),B:Ut(r.bot,e),W:Ut(r.wid,e),e:2/r.sec}}function Ht(r,e,t){const s=Math.sin(e),i=Math.cos(e);return t[0]=r.W*Math.sign(s)*Math.pow(Math.abs(s),r.e),t[1]=(i>=0?r.T:r.B)*Math.sign(i)*Math.pow(Math.abs(i),r.e),t}function fs(r,e){const s=[0,0],i=[0,0];Ht(r,0,s);let n=0;for(let a=1;a<=24;a++)Ht(r,e*a/24,i),n+=Math.hypot(i[0]-s[0],i[1]-s[1]),s[0]=i[0],s[1]=i[1];return n}function zs(r,e){const t=e>=0?r.T:r.B,s=Math.min(1,Math.abs(e)/Math.max(t,1e-4)),i=2/r.e;return r.W*Math.pow(Math.max(0,1-Math.pow(s,i)),1/i)}function ds(r,e){const t=r.e,s=e>=0?Math.pow(Mt(e/Math.max(r.T,1e-4),0,.97),1/t):-Math.pow(Mt(-e/Math.max(r.B,1e-4),0,.97),1/t);return Math.acos(s)}function _a(r,e,t,s){const i=[34,16,7,4][e],n=[];for(let o=0;o<=i;o++){const l=o/i;n.push(.6*Math.pow(l,1.55)+.4*l)}n[0]=[.006,.014,.03,.05][e];const a=o=>{let l=1,c=1/0;for(let u=1;u<n.length-1;u++){const f=Math.abs(n[u]-o);f<c&&(c=f,l=u)}n[l]=o};e<2&&a(r.mouth.corner);const h=n.filter(o=>o>=t-1e-6&&o<=s+1e-6);return h[0]>t+1e-4&&t>0&&h.unshift(t),h[h.length-1]<s-1e-4&&h.push(s),h}function ka(r,e,t){const s=t.lod,i=e.body,n=b=>.5-b*i,a=t.u0??0,h=t.u1??1,o=[26,14,7,5][s],l=_a(e,s,a,h),c=t.mouth&&a===0,u=e.mouth,f=u.corner,p=b=>fe(u.tip,u.y,Math.min(1,b/f)),m=Ue(e,f),d=ds(m,u.y),v=Mt(Math.round(o*d/Math.PI),3,o-3),y=o-v,w=b=>c?1-Sa(f*.8,f*1.3,b):0,g=[],S=[0,0];for(const b of l){const M=Ue(e,b),x=b<f?ds(M,p(b)):ds(M,u.y*(M.T+M.B)/(m.T+m.B)),z=n(b),P=0,_={u:b,upper:[],lower:[]},A=w(b),$=fs(M,Math.PI);for(let D=0;D<=v;D++){const H=-x+2*x*D/v;Ht(M,H,S);const I=fs(M,Math.abs(H)),B=S[1]>=0?S[1]/Math.max(M.T,1e-4):S[1]/Math.max(M.B,1e-4);_.upper.push(r.v(S[0],S[1],z,b*i,j.BODY,I,B))}for(let D=0;D<=y;D++){const H=x+(Ss-2*x)*D/y;Ht(M,H,S);const I=H>Math.PI?Ss-H:H,B=Math.min($,fs(M,I)),X=S[1]>=0?S[1]/Math.max(M.T,1e-4):S[1]/Math.max(M.B,1e-4),ee=(D===0||D===y)&&b>=f?0:A;_.lower.push(r.v(S[0],S[1],z,b*i,j.BODY+.9*ee,B,X))}r.seams.push([_.upper[v],_.lower[0]],[_.upper[0],_.lower[y]]),_.c=M,_.z=z,_.phiM=x,_.wj=A,_.jawFwd=P,g.push(_)}for(let b=0;b<g.length-1;b++){const M=g[b],x=g[b+1];for(let z=0;z<v;z++)r.quad(M.upper[z],M.upper[z+1],x.upper[z+1],x.upper[z]);for(let z=0;z<y;z++)r.quad(M.lower[z],M.lower[z+1],x.lower[z+1],x.lower[z])}const k=g[0],T=g[g.length-1];if(a===0){const M=p(0),x=Math.min(k.c.T,k.c.B)*.3,z=r.v(0,M+x*.5,.5,0,j.BODY,0,0),P=r.v(0,M-x*.5,.5+(c?u.protrude:0),0,j.BODY+.9*(c?1:0),0,0);for(let _=0;_<v;_++)r.tri(z,k.upper[_+1],k.upper[_]);for(let _=0;_<y;_++)r.tri(P,k.lower[_+1],k.lower[_]);if(c||(r.tri(z,k.upper[0],P),r.tri(z,P,k.upper[v])),c){const _=[],A=[],$=g.filter(B=>B.u<=f+1e-6),D=B=>Math.min(1,B/f);for(const B of $){const X=.45*(1-D(B.u)),ee=p(B.u),L=B.upper[v],O=B.upper[0],N=r.pos[L*3],R=r.pos[O*3],ie=r.pos[L*3+1],ae=B.c.T,Ie=B.c.B,V=D(B.u);_.push([r.v(N*.97,ie,B.z,B.u*i,j.MOUTH,V,0),r.v(0,ee+X*(ae-ee)*.8,B.z-.004,B.u*i,j.MOUTH,V,0),r.v(R*.97,ie,B.z,B.u*i,j.MOUTH,V,0)]);const Z=B.wj,re=B.z+B.jawFwd;A.push([r.v(N*.97,ie,re,B.u*i,j.MOUTH+.9*Z,V,0),r.v(0,ee-X*(ee+Ie)*.8,re-.004,B.u*i,j.MOUTH+.9*Z,V,0),r.v(R*.97,ie,re,B.u*i,j.MOUTH+.9*Z,V,0)])}for(let B=0;B<_.length-1;B++){const X=_[B],ee=_[B+1];r.quad(X[0],X[1],ee[1],ee[0]),r.quad(X[1],X[2],ee[2],ee[1]);const L=A[B],O=A[B+1];r.quad(L[1],L[0],O[0],O[1]),r.quad(L[2],L[1],O[1],O[2])}const H=_[0],I=A[0];r.tri(z,H[1],H[0]),r.tri(z,H[2],H[1]),r.tri(P,I[0],I[1]),r.tri(P,I[1],I[2])}}else Fi(r,k,v,y,i,!0);if(h>=1){const b=r.v(0,0,T.z-.004,i,j.BODY,0,0);for(let M=0;M<v;M++)r.tri(b,T.upper[M],T.upper[M+1]);for(let M=0;M<y;M++)r.tri(b,T.lower[M],T.lower[M+1])}else Fi(r,T,v,y,i,!1);return g}function Fi(r,e,t,s,i,n){const h=[...e.upper,...e.lower.slice(1,s)].map(l=>{const c=r.pos[l*3],u=r.pos[l*3+1];return r.v(c,u,e.z,e.u*i,j.FLESH,c,u)}),o=r.v(0,(e.c.T-e.c.B)*.3,e.z,e.u*i,j.FLESH,0,(e.c.T-e.c.B)*.3);for(let l=0;l<h.length;l++){const c=h[l],u=h[(l+1)%h.length];n?r.tri(o,u,c):r.tri(o,c,u)}}function Ds(r,e,t,s,i,n,a){const h=[];for(let o=0;o<t.length;o++)if(h.push({...t[o],dip:0,id:n[o]}),o<t.length-1){const l=t[o],c=t[o+1],u=(f,p)=>[(f[0]+p[0])/2,(f[1]+p[1])/2,(f[2]+p[2])/2];h.push({b:u(l.b,c.b),t:u(l.t,c.t),ub:(l.ub+c.ub)/2,ut:(l.ut+c.ut)/2,dip:s,id:(n[o]+n[o+1])/2})}for(const o of[!1,!0]){const l=[];for(const c of h){const u=[],f=1-c.dip;for(let p=0;p<=i;p++){const m=p/i*f;u.push(r.v(fe(c.b[0],c.t[0],m),fe(c.b[1],c.t[1],m),fe(c.b[2],c.t[2],m),fe(c.ub,c.ut,m),e,m,c.id))}l.push(u)}for(let c=0;c<l.length-1;c++)for(let u=0;u<i;u++){const f=l[c][u],p=l[c+1][u],m=l[c+1][u+1],d=l[c][u+1];o!==a?r.quad(p,f,d,m):r.quad(f,p,m,d)}}}function Bs(r,e){if(r<=e)return[...Array(r).keys()];const t=[];for(let s=0;s<e;s++)t.push(Math.round(s*(r-1)/(e-1)));return t}function Di(r,e,t,s,i){const n=e.body,a=l=>.5-l*n,h=i.pose==="dead",o=[3,1,1,1][i.lod];t.forEach((l,c)=>{const u=s>0?l.spiny?j.DORSAL1:j.DORSAL2:j.ANAL,f=Bs(l.rays,[40,7,3,2][i.lod]),p=h?l.spiny?.42:.22:0,m=f.map(d=>{const v=l.rays>1?d/(l.rays-1):0,y=fe(l.from,l.to,v),w=Ue(e,y),g=s>0?w.T*.9:-w.B*.9;let S=Ut(l.h,v)+(s>0?w.T:w.B)*.1,k=fe(l.rake[0],l.rake[1],v);k=fe(k,1.45,p),S*=h?l.rays>30?.85:.95:1;const T=[0,g+s*S*Math.cos(k),a(y)-S*Math.sin(k)];return{b:[0,g,a(y)],t:T,ub:y*n,ut:y*n+S*Math.sin(k)}});Ds(r,u,m,i.lod>=2?0:l.notch,o,f.map(d=>d+c*40),s<0)})}function Aa(r,e,t){const s=e.caudal,i=e.body,n=.5-i+.014,a=Ue(e,1),h=Math.min(a.T,a.B)*.9,o=t.pose==="dead",l=s.rays,c=Bs(l,[40,9,5,3][t.lod]),u=s.span*(o?.93:1),f=c.map(p=>{const m=-1+2*p/(l-1),d=Math.abs(m);let v,y;return s.shape==="rounded"?(v=u*m*.95,y=s.len*(1-.3*m*m)):s.shape==="truncate"?(v=u*m,y=s.len*(1-.05*m*m)*fe(s.fork,1,d)):s.shape==="lunate"?(v=u*m*(.75+.25*d),y=s.len*(s.fork+(1-s.fork)*Math.pow(d,1.8))):(v=u*m,y=s.len*(s.fork+(1-s.fork)*Math.pow(d,1.3))),{b:[0,h*m,n],t:[0,v,n-.014-y],ub:i-.014,ut:i+y}});Ds(r,j.CAUDAL,f,t.lod>=2?0:.05,[3,1,1,1][t.lod],c,!1)}function Bi(r,e,t,s,i){const n=e.body,a=p=>.5-p*n,h=i.pose==="dead",o=Ue(e,t.u),l=t.rays,c=Bs(l,[24,5,3,2][i.lod]),u=[2,1,1,1][i.lod],f=s===j.PELVIC;for(const p of[1,-1]){const m=c.map(v=>{const y=l>1?v/(l-1):0;let w,g,S,k,T;if(f)w=-o.B*.88,g=p*(o.W*.22+y*o.W*.12),S=fe(-.35,-.75,y),k=t.len*(1-.45*y),T=h?.14:.35;else{w=t.y+t.base*(.5-y),g=p*zs(o,w)*.94;const x=t.shape;S=x==="falcate"?fe(.05,-.55,y):x==="pointed"?fe(.1,-.85,y):fe(.25,-1.1,y),k=t.len*(x==="falcate"?1-.85*Math.pow(y,.55):x==="pointed"?1-.62*Math.pow(y,.9):.62+.38*Math.sin(Math.PI*(.15+.85*y))),T=h?.16:t.spread,h&&(S=S*.6-.08)}const b=[p*Math.sin(T)*Math.cos(S),Math.sin(S),-Math.cos(T)*Math.cos(S)],M=a(t.u);return{b:[g,w,M],t:[g+b[0]*k,w+b[1]*k,M+b[2]*k],ub:t.u*n,ut:t.u*n-b[2]*k}}),d=r.pos.length/3;Ds(r,s,m,i.lod>=2?0:.035,u,c,p<0);for(let v=d;v<r.pos.length/3;v++){const y=r.pos[v*3],w=r.pos[v*3+1],g=r.pos[v*3+2],S=Mt((.5-g)/n,0,1),k=zs(Ue(e,S),w)+.004;Math.abs(y)<k&&(r.pos[v*3]=p*k)}}}function Pa(r,e,t){const s=e.finlets,i=e.body,n=a=>.5-a*i;for(const[a,h]of[[s.dorsal,1],[s.ventral,-1]])for(let o=0;o<a;o++){const l=fe(s.from,s.to,(o+.5)/a),c=Ue(e,l),u=h>0?c.T*.85:-c.B*.85,f=(s.to-s.from)/a*.75,p=.006+(h>0?c.T:c.B)*.12;for(const m of[!1,!0]){const d=r.v(0,u,n(l),l*i,j.FINLET,0,0),v=r.v(0,u,n(l+f),(l+f)*i,j.FINLET,0,1),y=r.v(0,u+h*p,n(l+f*1.6),(l+f*1.6)*i,j.FINLET,1,.5);h>0!==m?r.tri(d,y,v):r.tri(d,v,y)}}}function Ca(r,e,t){const s=e.eye,i=e.body,n=s.u,a=.5-n*i,h=Ue(e,n),o=s.r,l=t.lod===0?18:10,c=t.lod===0?5:2,u=.34*o;for(const f of[1,-1]){const p=zs(h,s.y),m=new C(f,.06,.22).normalize(),d=new C(0,1,0).addScaledVector(m,-m.y).normalize(),v=new C().crossVectors(m,d),y=new C(f*(p-o*.12),s.y,a),w=[];for(let g=0;g<=c;g++){const S=g/c,k=[],T=g===0?1:l;for(let b=0;b<T;b++){const M=b/l*Ss,x=Math.cos(M)*S,z=Math.sin(M)*S,P=u*(1-S*S)+o*.12,_=y.x+d.x*z*o+v.x*x*o+m.x*P,A=y.y+d.y*z*o+v.y*x*o+m.y*P,$=y.z+d.z*z*o+v.z*x*o+m.z*P;k.push(r.v(_,A,$,n*i,j.EYE,x*f,z))}w.push(k)}for(let g=0;g<c;g++)for(let S=0;S<l;S++){const k=(S+1)%l;if(g===0)f>0?r.tri(w[0][0],w[1][S],w[1][k]):r.tri(w[0][0],w[1][k],w[1][S]);else{const T=w[g][S],b=w[g][k],M=w[g+1][k],x=w[g+1][S];f>0?r.quad(T,x,M,b):r.quad(T,b,M,x)}}}}function Ta(r,e={}){const t={lod:0,pose:"swim",...e},s=t.lod;t.mouth=t.mouth??(s<2&&t.pose==="dead");const i=new za,n=t.u0??0,a=t.u1??1;ka(i,r,t);const h=o=>o>=n&&o<=a;return t.fins!==!1&&(Di(i,r,(l=>s<3?l:l.slice(-1))(r.dorsal.filter(l=>h(l.from))),1,t),s<3&&Di(i,r,r.anal.filter(l=>h(l.from)),-1,t),a>=1&&Aa(i,r,t),h(r.pectoral.u)&&s<3&&Bi(i,r,r.pectoral,j.PECTORAL,t),r.pelvic&&h(r.pelvic.u)&&s<2&&Bi(i,r,r.pelvic,j.PELVIC,t),r.finlets&&s<2&&a>=1&&Pa(i,r)),(t.eyes??s===0)&&h(r.eye.u)&&Ca(i,r,t),i.build()}const Y={silverside:0,chromis:1,grunt:2,yellowtail:3,tang:4,sergeant:5,wrasse:6,parrot:7,angel:8,barracuda:9,redSnapper:10,grouper:11,tuna:12,mahi:13,mullet:14,needlefish:15,jack:16,tarpon:17,stingray:18,eagleRay:19,turtle:20},K=(r,e,t,s,i,n=.16)=>({from:r,to:e,rays:t,spiny:!0,h:s,rake:i,notch:n}),W=(r,e,t,s,i,n=.015)=>({from:r,to:e,rays:t,spiny:!1,h:s,rake:i,notch:n}),_s={silverside:{pattern:Y.silverside,body:.83,sec:2,top:[[0,.003],[.03,.016],[.1,.035],[.25,.058],[.45,.068],[.65,.056],[.85,.034],[1,.026]],bot:[[0,.003],[.03,.014],[.1,.032],[.25,.055],[.45,.064],[.65,.05],[.85,.03],[1,.024]],wid:[[0,.003],[.05,.016],[.2,.032],[.4,.036],[.7,.026],[1,.013]],mouth:{corner:.07,y:.004,tip:.006,protrude:0},eye:{u:.1,y:.014,r:.03},opercle:.22,scales:.02,scaleVis:.35,lateral:.05,arch:.1,dorsal:[K(.47,.53,5,[[0,.035],[1,.02]],[.5,.7],.125),W(.63,.74,9,[[0,.04],[1,.02]],[.6,.9])],anal:[W(.58,.78,12,[[0,.035],[1,.018]],[.6,.9])],pectoral:{u:.2,y:.02,len:.1,base:.018,rays:10,shape:"pointed",spread:.4},pelvic:{u:.45,len:.05,rays:5},caudal:{shape:"forked",len:.17,span:.1,fork:.5,rays:13},iris:14211264,irid:.8,metal:.65},chromis:{pattern:Y.chromis,body:.76,sec:2.1,top:[[0,.005],[.03,.03],[.08,.07],[.16,.12],[.28,.158],[.42,.168],[.56,.153],[.7,.118],[.84,.074],[1,.05]],bot:[[0,.005],[.03,.024],[.08,.054],[.16,.09],[.28,.123],[.42,.133],[.56,.123],[.7,.098],[.84,.064],[1,.045]],wid:[[0,.005],[.05,.03],[.15,.05],[.3,.058],[.5,.053],[.7,.04],[.9,.024],[1,.02]],mouth:{corner:.06,y:0,tip:.004,protrude:0},eye:{u:.15,y:.05,r:.033},opercle:.27,scales:.028,scaleVis:.6,lateral:.55,arch:.15,dorsal:[K(.3,.6,12,[[0,.05],[.3,.075],[1,.07]],[.35,.5]),W(.6,.87,11,[[0,.08],[.5,.085],[1,.035]],[.6,1.1])],anal:[K(.56,.62,2,[[0,.04],[1,.06]],[.4,.5],.1),W(.62,.86,11,[[0,.08],[.4,.085],[1,.035]],[.6,1.1])],pectoral:{u:.3,y:-.01,len:.17,base:.035,rays:17,shape:"pointed",spread:.45},pelvic:{u:.33,len:.12,rays:6},caudal:{shape:"forked",len:.24,span:.19,fork:.35,rays:17},iris:4876952,irid:.15,metal:.15},grunt:{pattern:Y.grunt,body:.81,sec:2.2,top:[[0,.005],[.03,.026],[.08,.055],[.16,.093],[.28,.13],[.42,.143],[.56,.135],[.7,.105],[.84,.068],[1,.048]],bot:[[0,.005],[.03,.02],[.08,.042],[.16,.072],[.28,.1],[.42,.11],[.56,.103],[.7,.083],[.84,.058],[1,.045]],wid:[[0,.005],[.05,.028],[.15,.05],[.3,.06],[.5,.056],[.7,.042],[.9,.026],[1,.021]],mouth:{corner:.1,y:-.012,tip:-.006,protrude:0},eye:{u:.14,y:.048,r:.026},opercle:.28,scales:.02,scaleVis:.5,lateral:.45,arch:.15,dorsal:[K(.31,.6,12,[[0,.05],[.25,.085],[1,.045]],[.3,.55],.175),W(.6,.84,15,[[0,.055],[.5,.06],[1,.03]],[.6,.95])],anal:[K(.62,.67,3,[[0,.03],[1,.055]],[.4,.5],.1),W(.67,.84,8,[[0,.065],[1,.03]],[.6,.9])],pectoral:{u:.31,y:-.02,len:.16,base:.03,rays:16,shape:"pointed",spread:.4},pelvic:{u:.34,len:.1,rays:6},caudal:{shape:"forked",len:.19,span:.14,fork:.55,rays:17},iris:13148224,irid:.25,metal:.25},yellowtail:{pattern:Y.yellowtail,body:.77,sec:2.1,top:[[0,.004],[.03,.02],[.08,.045],[.16,.074],[.28,.099],[.42,.108],[.56,.099],[.7,.077],[.85,.051],[1,.037]],bot:[[0,.004],[.03,.016],[.08,.035],[.16,.058],[.28,.079],[.42,.089],[.56,.082],[.7,.063],[.85,.044],[1,.034]],wid:[[0,.004],[.05,.02],[.14,.036],[.28,.047],[.45,.047],[.65,.038],[.85,.026],[1,.017]],mouth:{corner:.1,y:-.008,tip:-.003,protrude:.003},eye:{u:.12,y:.038,r:.022},opercle:.26,scales:.016,scaleVis:.45,lateral:.42,arch:.12,dorsal:[K(.33,.6,10,[[0,.04],[.3,.06],[1,.04]],[.35,.55],.15),W(.6,.83,13,[[0,.045],[1,.025]],[.6,.95])],anal:[K(.62,.66,3,[[0,.025],[1,.04]],[.4,.5],.1),W(.66,.82,9,[[0,.05],[1,.025]],[.6,.9])],pectoral:{u:.3,y:-.015,len:.15,base:.025,rays:15,shape:"pointed",spread:.4},pelvic:{u:.34,len:.09,rays:6},caudal:{shape:"forked",len:.23,span:.165,fork:.36,rays:17},iris:14198832,irid:.35,metal:.3},tang:{pattern:Y.tang,body:.8,sec:2,top:[[0,.006],[.03,.04],[.08,.1],[.16,.16],[.28,.21],[.42,.232],[.56,.22],[.7,.17],[.84,.095],[1,.042]],bot:[[0,.006],[.03,.035],[.08,.085],[.16,.14],[.28,.19],[.42,.215],[.56,.205],[.7,.16],[.84,.09],[1,.04]],wid:[[0,.005],[.05,.025],[.15,.04],[.3,.046],[.5,.043],[.7,.033],[.9,.02],[1,.015]],mouth:{corner:.04,y:.006,tip:.006,protrude:0},eye:{u:.17,y:.085,r:.026},opercle:.27,scales:0,scaleVis:0,lateral:.75,arch:.1,dorsal:[K(.22,.4,9,[[0,.04],[1,.07]],[.4,.5],.125),W(.4,.9,26,[[0,.07],[.6,.085],[1,.045]],[.55,.95])],anal:[K(.45,.52,3,[[0,.03],[1,.06]],[.4,.5],.1),W(.52,.9,24,[[0,.07],[.6,.08],[1,.045]],[.55,.95])],pectoral:{u:.3,y:0,len:.15,base:.03,rays:16,shape:"pointed",spread:.45},pelvic:{u:.3,len:.07,rays:5},caudal:{shape:"lunate",len:.2,span:.19,fork:.55,rays:16},iris:2767480,irid:.1,metal:.05},sergeant:{pattern:Y.sergeant,body:.79,sec:2.1,top:[[0,.005],[.03,.032],[.08,.075],[.16,.13],[.28,.175],[.42,.19],[.56,.176],[.7,.138],[.84,.085],[1,.055]],bot:[[0,.005],[.03,.026],[.08,.06],[.16,.103],[.28,.143],[.42,.155],[.56,.143],[.7,.113],[.84,.073],[1,.05]],wid:[[0,.005],[.05,.03],[.15,.05],[.3,.057],[.5,.052],[.7,.04],[.9,.024],[1,.02]],mouth:{corner:.06,y:-.004,tip:0,protrude:0},eye:{u:.15,y:.055,r:.03},opercle:.28,scales:.026,scaleVis:.55,lateral:.6,arch:.15,dorsal:[K(.3,.6,13,[[0,.05],[.3,.07],[1,.065]],[.35,.5]),W(.6,.86,13,[[0,.075],[.5,.08],[1,.035]],[.6,1])],anal:[K(.56,.62,2,[[0,.04],[1,.06]],[.4,.5],.1),W(.62,.85,12,[[0,.075],[.5,.078],[1,.035]],[.6,1])],pectoral:{u:.3,y:-.01,len:.16,base:.035,rays:18,shape:"rounded",spread:.45},pelvic:{u:.33,len:.11,rays:6},caudal:{shape:"forked",len:.21,span:.17,fork:.6,rays:17},iris:12628064,irid:.1,metal:.15},wrasse:{pattern:Y.wrasse,body:.84,sec:2,top:[[0,.004],[.03,.02],[.08,.042],[.18,.07],[.32,.088],[.5,.09],[.68,.075],[.85,.05],[1,.042]],bot:[[0,.004],[.03,.018],[.08,.038],[.18,.063],[.32,.08],[.5,.082],[.68,.068],[.85,.046],[1,.04]],wid:[[0,.004],[.05,.022],[.15,.038],[.3,.045],[.5,.043],[.7,.034],[.9,.022],[1,.018]],mouth:{corner:.07,y:-.004,tip:0,protrude:0},eye:{u:.13,y:.03,r:.02},opercle:.25,scales:.02,scaleVis:.35,lateral:.55,arch:.25,dorsal:[K(.28,.5,8,[[0,.03],[1,.035]],[.5,.6],.075),W(.5,.85,13,[[0,.038],[1,.03]],[.6,.8])],anal:[W(.56,.84,14,[[0,.03],[1,.028]],[.6,.8])],pectoral:{u:.24,y:0,len:.12,base:.024,rays:13,shape:"rounded",spread:.5},pelvic:{u:.28,len:.06,rays:5},caudal:{shape:"truncate",len:.16,span:.1,fork:.88,rays:13},iris:13658688,irid:.15,metal:.1},parrot:{pattern:Y.parrot,body:.82,sec:2.2,top:[[0,.012],[.02,.035],[.06,.068],[.12,.098],[.22,.128],[.36,.143],[.5,.14],[.64,.118],[.78,.088],[.9,.066],[1,.058]],bot:[[0,.012],[.02,.03],[.06,.055],[.12,.083],[.22,.108],[.36,.123],[.5,.12],[.64,.103],[.78,.078],[.9,.06],[1,.055]],wid:[[0,.01],[.04,.038],[.12,.062],[.25,.077],[.45,.075],[.65,.06],[.85,.04],[1,.029]],mouth:{corner:.06,y:-.018,tip:-.012,protrude:0},eye:{u:.13,y:.052,r:.018},opercle:.27,scales:.034,scaleVis:.75,lateral:.55,arch:.3,dorsal:[K(.28,.55,9,[[0,.035],[1,.04]],[.5,.6],.075),W(.55,.84,10,[[0,.045],[1,.035]],[.6,.8])],anal:[K(.6,.64,2,[[0,.025],[1,.035]],[.5,.6],.075),W(.64,.83,9,[[0,.04],[1,.032]],[.6,.8])],pectoral:{u:.26,y:0,len:.13,base:.03,rays:13,shape:"rounded",spread:.5},pelvic:{u:.3,len:.07,rays:5},caudal:{shape:"lunate",len:.18,span:.14,fork:.62,rays:15},iris:13668400,irid:.1,metal:.05},angel:{pattern:Y.angel,body:.82,sec:2,top:[[0,.006],[.03,.045],[.08,.11],[.16,.18],[.28,.24],[.42,.262],[.56,.25],[.7,.205],[.84,.13],[1,.06]],bot:[[0,.006],[.03,.04],[.08,.1],[.16,.165],[.28,.225],[.42,.25],[.56,.24],[.7,.198],[.84,.125],[1,.058]],wid:[[0,.005],[.05,.025],[.15,.04],[.3,.046],[.5,.043],[.7,.034],[.9,.02],[1,.016]],mouth:{corner:.05,y:.004,tip:.006,protrude:0},eye:{u:.18,y:.075,r:.026},opercle:.3,scales:.03,scaleVis:.9,lateral:.7,arch:.1,dorsal:[K(.34,.5,9,[[0,.035],[1,.07]],[.4,.55],.1),W(.5,.95,20,[[0,.09],[.7,.16],[.85,.2],[1,.06]],[.7,1.2])],anal:[K(.5,.58,3,[[0,.03],[1,.06]],[.4,.55],.1),W(.58,.95,18,[[0,.09],[.7,.15],[.85,.19],[1,.06]],[.7,1.2])],pectoral:{u:.33,y:0,len:.15,base:.035,rays:18,shape:"rounded",spread:.4},pelvic:{u:.32,len:.14,rays:6},caudal:{shape:"rounded",len:.18,span:.14,fork:1,rays:17},iris:13672480,irid:.05,metal:.05},barracuda:{pattern:Y.barracuda,body:.87,sec:2,top:[[0,.002],[.03,.012],[.08,.025],[.16,.041],[.28,.057],[.42,.064],[.58,.063],[.72,.054],[.85,.04],[.95,.03],[1,.028]],bot:[[0,.002],[.03,.014],[.08,.028],[.16,.044],[.28,.057],[.42,.063],[.58,.061],[.72,.051],[.85,.038],[.95,.028],[1,.026]],wid:[[0,.002],[.04,.014],[.12,.028],[.25,.039],[.45,.044],[.65,.039],[.85,.028],[1,.018]],mouth:{corner:.14,y:-.006,tip:-.002,protrude:.012},eye:{u:.12,y:.018,r:.012},opercle:.24,scales:.008,scaleVis:.25,lateral:.2,arch:.05,dorsal:[K(.44,.5,5,[[0,.055],[1,.03]],[.35,.6],.1),W(.74,.8,9,[[0,.05],[1,.02]],[.55,.9])],anal:[W(.75,.81,9,[[0,.045],[1,.02]],[.55,.9])],pectoral:{u:.3,y:-.015,len:.08,base:.016,rays:12,shape:"pointed",spread:.35},pelvic:{u:.47,len:.05,rays:6},caudal:{shape:"forked",len:.13,span:.1,fork:.55,rays:17},iris:12107952,irid:.5,metal:.55},redSnapper:{pattern:Y.redSnapper,body:.82,sec:2.15,top:[[0,.004],[.02,.02],[.06,.045],[.12,.075],[.2,.11],[.3,.145],[.42,.162],[.55,.155],[.68,.125],[.8,.09],[.9,.062],[1,.05]],bot:[[0,.004],[.02,.018],[.06,.035],[.12,.06],[.2,.09],[.3,.115],[.42,.132],[.55,.128],[.68,.1],[.8,.07],[.9,.054],[1,.048]],wid:[[0,.004],[.03,.02],[.1,.042],[.2,.058],[.35,.066],[.5,.062],[.65,.05],[.8,.034],[.92,.024],[1,.02]],mouth:{corner:.11,y:-.012,tip:-.004,protrude:.004},eye:{u:.135,y:.058,r:.022},opercle:.29,scales:.018,scaleVis:.7,lateral:.45,arch:.15,dorsal:[K(.34,.62,10,[[0,.045],[.3,.085],[1,.065]],[.3,.5],.175),W(.62,.86,14,[[0,.075],[.4,.078],[1,.035]],[.6,.95])],anal:[K(.64,.68,3,[[0,.03],[1,.05]],[.4,.5],.1),W(.68,.84,8,[[0,.075],[1,.035]],[.6,.9])],pectoral:{u:.34,y:-.02,len:.19,base:.034,rays:16,shape:"pointed",spread:.35},pelvic:{u:.38,len:.11,rays:6},caudal:{shape:"forked",len:.18,span:.13,fork:.78,rays:17},iris:13119520,irid:.3,metal:.25},grouper:{pattern:Y.grouper,body:.84,sec:2.2,top:[[0,.006],[.03,.03],[.08,.06],[.15,.094],[.25,.128],[.38,.148],[.52,.146],[.66,.126],[.8,.094],[.92,.07],[1,.06]],bot:[[0,.006],[.03,.03],[.08,.06],[.15,.09],[.25,.12],[.38,.137],[.52,.134],[.66,.11],[.8,.08],[.92,.063],[1,.058]],wid:[[0,.006],[.04,.035],[.12,.064],[.25,.079],[.4,.081],[.6,.07],[.8,.05],[1,.03]],mouth:{corner:.16,y:-.022,tip:-.01,protrude:.008},eye:{u:.14,y:.07,r:.019},opercle:.33,scales:.011,scaleVis:.4,lateral:.55,arch:.2,dorsal:[K(.3,.6,11,[[0,.04],[.3,.07],[1,.055]],[.3,.45],.21),W(.6,.85,17,[[0,.065],[.5,.075],[1,.03]],[.55,.9])],anal:[K(.64,.68,3,[[0,.025],[1,.04]],[.4,.5],.125),W(.68,.84,8,[[0,.065],[.5,.07],[1,.035]],[.55,.9])],pectoral:{u:.33,y:-.02,len:.16,base:.04,rays:17,shape:"rounded",spread:.4},pelvic:{u:.35,len:.12,rays:6},caudal:{shape:"rounded",len:.16,span:.11,fork:1,rays:15},iris:10127968,irid:.05,metal:0},tuna:{pattern:Y.tuna,body:.84,sec:2,top:[[0,.003],[.03,.02],[.08,.045],[.15,.075],[.26,.105],[.38,.118],[.5,.115],[.62,.095],[.74,.065],[.86,.035],[.95,.02],[1,.018]],bot:[[0,.003],[.03,.018],[.08,.04],[.15,.065],[.26,.092],[.38,.105],[.5,.102],[.62,.085],[.74,.058],[.86,.032],[.95,.018],[1,.016]],wid:[[0,.003],[.04,.025],[.12,.055],[.25,.08],[.4,.088],[.55,.08],[.7,.058],[.85,.035],[.95,.03],[1,.02]],mouth:{corner:.085,y:-.008,tip:-.003,protrude:.003},eye:{u:.1,y:.03,r:.022},opercle:.26,scales:0,scaleVis:0,lateral:.3,arch:.2,dorsal:[K(.3,.47,13,[[0,.07],[.3,.06],[1,.015]],[.45,.8],.1),W(.52,.6,12,[[0,.1],[.5,.05],[1,.015]],[.75,1.1])],anal:[W(.56,.63,12,[[0,.09],[.5,.045],[1,.012]],[.75,1.1])],pectoral:{u:.3,y:0,len:.2,base:.03,rays:12,shape:"falcate",spread:.3},pelvic:{u:.32,len:.06,rays:5},caudal:{shape:"lunate",len:.16,span:.25,fork:.25,rays:19},finlets:{from:.64,to:.95,dorsal:8,ventral:7},iris:12623936,irid:.9,metal:.55},mahi:{pattern:Y.mahi,body:.83,sec:2,top:[[0,.016],[.005,.075],[.013,.12],[.03,.148],[.07,.16],[.18,.154],[.32,.134],[.48,.112],[.64,.088],[.8,.06],[.92,.036],[1,.026]],bot:[[0,.01],[.03,.045],[.08,.072],[.15,.09],[.3,.096],[.45,.09],[.6,.078],[.75,.06],[.9,.035],[1,.022]],wid:[[0,.008],[.04,.034],[.15,.05],[.3,.052],[.5,.045],[.7,.035],[.9,.02],[1,.015]],mouth:{corner:.075,y:-.03,tip:-.02,protrude:.004},eye:{u:.085,y:.012,r:.017},opercle:.22,scales:.007,scaleVis:.2,lateral:.25,arch:.25,dorsal:[W(.07,.97,44,[[0,.075],[.08,.105],[.3,.08],[.8,.055],[1,.03]],[.35,.9])],anal:[W(.5,.97,24,[[0,.055],[.2,.06],[1,.03]],[.5,.9])],pectoral:{u:.2,y:-.02,len:.11,base:.022,rays:16,shape:"pointed",spread:.4},pelvic:{u:.22,len:.08,rays:6},caudal:{shape:"forked",len:.17,span:.17,fork:.3,rays:17},iris:9079376,irid:.6,metal:.25},mullet:{pattern:Y.mullet,body:.82,sec:2.15,top:[[0,.008],[.03,.03],[.08,.055],[.16,.08],[.28,.1],[.42,.107],[.56,.1],[.7,.082],[.84,.058],[1,.044]],bot:[[0,.008],[.03,.028],[.08,.05],[.16,.072],[.28,.088],[.42,.093],[.56,.086],[.7,.07],[.84,.05],[1,.04]],wid:[[0,.008],[.04,.036],[.12,.06],[.25,.072],[.42,.072],[.6,.06],[.8,.04],[1,.024]],mouth:{corner:.055,y:-.004,tip:0,protrude:0},eye:{u:.1,y:.024,r:.02},opercle:.25,scales:.024,scaleVis:.6,lateral:.3,arch:0,dorsal:[K(.44,.52,4,[[0,.06],[1,.035]],[.35,.6],.125),W(.66,.74,9,[[0,.06],[1,.025]],[.55,.9])],anal:[W(.62,.72,11,[[0,.055],[1,.025]],[.55,.9])],pectoral:{u:.27,y:.03,len:.13,base:.022,rays:16,shape:"pointed",spread:.45},pelvic:{u:.4,len:.08,rays:6},caudal:{shape:"forked",len:.18,span:.13,fork:.6,rays:15},iris:13154448,irid:.5,metal:.55},needlefish:{pattern:Y.needlefish,body:.9,sec:2,top:[[0,.0015],[.1,.0035],[.17,.007],[.22,.017],[.28,.026],[.4,.032],[.6,.034],[.78,.03],[.9,.02],[1,.014]],bot:[[0,.0015],[.1,.0035],[.17,.007],[.22,.016],[.28,.024],[.4,.03],[.6,.032],[.78,.028],[.9,.019],[1,.013]],wid:[[0,.0015],[.1,.003],[.18,.008],[.24,.02],[.4,.026],[.7,.024],[.9,.016],[1,.012]],mouth:{corner:.2,y:0,tip:0,protrude:.006},eye:{u:.235,y:.008,r:.012},opercle:.3,scales:0,scaleVis:0,lateral:-.7,arch:0,dorsal:[W(.76,.9,14,[[0,.04],[.2,.035],[1,.018]],[.6,.95])],anal:[W(.73,.89,18,[[0,.04],[.2,.035],[1,.018]],[.6,.95])],pectoral:{u:.33,y:.006,len:.06,base:.01,rays:12,shape:"pointed",spread:.35},pelvic:{u:.62,len:.04,rays:6},caudal:{shape:"forked",len:.1,span:.06,fork:.75,rays:15},iris:13686984,irid:.6,metal:.55},jack:{pattern:Y.jack,body:.78,sec:2,top:[[0,.004],[.03,.024],[.08,.055],[.16,.088],[.28,.114],[.42,.12],[.56,.107],[.7,.078],[.84,.042],[.94,.024],[1,.02]],bot:[[0,.004],[.03,.02],[.08,.046],[.16,.074],[.28,.098],[.42,.105],[.56,.094],[.7,.068],[.84,.037],[.94,.022],[1,.019]],wid:[[0,.004],[.05,.022],[.15,.04],[.3,.048],[.5,.044],[.7,.032],[.88,.02],[1,.016]],mouth:{corner:.09,y:-.006,tip:-.002,protrude:.002},eye:{u:.12,y:.03,r:.024},opercle:.26,scales:.008,scaleVis:.2,lateral:.35,arch:.45,dorsal:[K(.34,.46,8,[[0,.045],[.3,.05],[1,.02]],[.4,.7],.15),W(.47,.84,27,[[0,.075],[.15,.06],[1,.025]],[.55,1.05])],anal:[K(.54,.57,2,[[0,.02],[1,.03]],[.5,.6],.15),W(.58,.84,24,[[0,.065],[.15,.05],[1,.022]],[.55,1.05])],pectoral:{u:.29,y:0,len:.2,base:.024,rays:19,shape:"falcate",spread:.35},pelvic:{u:.31,len:.07,rays:6},caudal:{shape:"forked",len:.22,span:.19,fork:.25,rays:17},iris:13156512,irid:.7,metal:.5},tarpon:{pattern:Y.tarpon,body:.8,sec:2.05,top:[[0,.004],[.03,.02],[.08,.045],[.16,.075],[.28,.1],[.42,.11],[.56,.102],[.7,.08],[.84,.052],[1,.036]],bot:[[0,.004],[.03,.022],[.08,.05],[.16,.078],[.28,.098],[.42,.105],[.56,.098],[.7,.077],[.84,.05],[1,.034]],wid:[[0,.004],[.05,.025],[.15,.044],[.3,.052],[.5,.05],[.7,.04],[.88,.026],[1,.018]],mouth:{corner:.13,y:.004,tip:.018,protrude:.014},eye:{u:.09,y:.028,r:.022},opercle:.22,scales:.05,scaleVis:1,lateral:.05,arch:.05,dorsal:[W(.45,.56,13,[[0,.07],[.6,.06],[.93,.05],[1,.2]],[.45,.95])],anal:[W(.64,.78,20,[[0,.07],[.3,.05],[1,.02]],[.5,.95])],pectoral:{u:.24,y:-.06,len:.13,base:.02,rays:13,shape:"pointed",spread:.5},pelvic:{u:.43,len:.08,rays:9},caudal:{shape:"forked",len:.2,span:.17,fork:.35,rays:19},iris:12632240,irid:.3,metal:.8},stingray:{pattern:Y.stingray,body:1,eye:{u:.3,y:.05,r:.012},opercle:.4,mouth:{corner:.1,y:-.03,tip:-.03},lateral:0,arch:0,scales:0,scaleVis:0,iris:6316096,irid:0,metal:0},eagleRay:{pattern:Y.eagleRay,body:1,eye:{u:.2,y:.05,r:.014},opercle:.3,mouth:{corner:.1,y:-.03,tip:-.03},lateral:0,arch:0,scales:0,scaleVis:0,iris:4210752,irid:0,metal:0},turtle:{pattern:Y.turtle,body:1,eye:{u:.1,y:.04,r:.013},opercle:.2,mouth:{corner:.05,y:0,tip:0},lateral:0,arch:0,scales:0,scaleVis:0,iris:3153936,irid:0,metal:0}},La={silverside:{back:7178874,flank:12897486,belly:15133418,fin:11056302,edge:10003616,rough:.3},chromis:{back:1522296,flank:2581688,belly:5605572,fin:2974384,edge:791588,rough:.4},grunt:{back:11045420,flank:14466106,belly:15130032,fin:14199856,edge:13146660,rough:.4},yellowtail:{back:5663378,flank:10397374,belly:15722212,fin:14468726,edge:14860352,rough:.35},tang:{back:1190252,flank:2245280,belly:2771624,fin:2375574,edge:6988508,rough:.45},sergeant:{back:12889148,flank:13028028,belly:15132380,fin:11184792,edge:9079424,rough:.4},wrasse:{back:13941790,flank:14994492,belly:15658708,fin:14469782,edge:13152368,rough:.4},parrot:{back:1927756,flank:3054202,belly:7126172,fin:3971706,edge:13400666,rough:.4},angel:{back:921106,flank:1184278,belly:1447450,fin:921106,edge:2892816,rough:.45},barracuda:{back:3556940,flank:11844800,belly:15133420,fin:5923940,edge:2896948,rough:.3},redSnapper:{back:12073532,flank:14183018,belly:15649988,fin:13384756,edge:12069924,rough:.33},grouper:{back:8020552,flank:11836540,belly:14208180,fin:7232064,edge:3944484,rough:.4},tuna:{back:923176,flank:6714506,belly:14080734,fin:1975856,edge:1448482,rough:.28},mahi:{back:1203306,flank:13481258,belly:15721114,fin:2907292,edge:1854620,rough:.3},mullet:{back:4741206,flank:11844798,belly:15133418,fin:8686732,edge:7107700,rough:.33},needlefish:{back:3569260,flank:11848908,belly:15659762,fin:7771790,edge:4613740,rough:.3},jack:{back:5666444,flank:12372176,belly:15133934,fin:8819868,edge:3949644,rough:.3},tarpon:{back:3558492,flank:13949660,belly:15659250,fin:8819868,edge:5002844,rough:.28},stingray:{back:7102540,flank:8023126,belly:14210768,fin:4997686,edge:9075814,rough:.5},eagleRay:{back:1316894,flank:1843240,belly:14738146,fin:1053720,edge:2764342,rough:.35},turtle:{back:4076064,flank:8808506,belly:13154436,fin:4866616,edge:10130048,rough:.45}},Fa=new Q({name:"lodFade",code:`
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
`}),Da=8,Sr=Object.keys(Y).sort((r,e)=>Y[r]-Y[e]);function Ba(){const r=[],e=t=>new Ae(t);for(const t of Sr){const s=_s[t],i=La[t],n=e(i.back),a=e(i.flank),h=e(i.belly),o=e(i.fin),l=e(i.edge),c=e(s.iris),u=s.body;r.push(new G(n.r,n.g,n.b,s.metal*.55),new G(a.r,a.g,a.b,s.irid),new G(h.r,h.g,h.b,i.rough),new G(o.r,o.g,o.b,s.mouth.tip),new G(l.r,l.g,l.b,s.scales),new G(c.r,c.g,c.b,s.scaleVis),new G(.5-s.eye.u*u,s.eye.y,s.eye.r,.5-s.opercle*u),new G(s.lateral,s.arch,.5-s.mouth.corner*u,s.mouth.y))}return new de("FishSkin",{rows:[`vec4f[${r.length}]`,r]},{label:"fishSkin"})}let Ri=null;const Ra=()=>Ri||(Ri=Ba()),es=r=>{const e=String(r);return e.includes(".")||e.includes("e")?e:e+".0"},te=r=>es(Y[r]),q=r=>es(j[r]);let It=null;function Ia(){return It||(It=new Q({name:"fish",deps:[J,Fa],uniforms:Ra(),uniformName:"fishSkin",code:`
fn fishRotateQ( q: vec4f, v: vec3f ) -> vec3f { return v + cross( q.xyz, cross( q.xyz, v ) + v * q.w ) * 2.0; }
fn fishRow( pattern: f32, k: i32 ) -> vec4f { return fishSkin.rows[ clamp( i32( pattern ), 0, ${Sr.length-1} ) * ${Da} + k ]; }
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
`}),It)}const $a={vFishLocal:"vec3f",vFishData:"vec4f",vFishInfo:"vec4f",vFishFlags:"vec4f",vFishFade:"vec2f"};function Na(r,e){let t;e?t=`let fe = ${r.fadeEntry()};
	let ri = fe.index;
	o.vFishFade = vec2f( fe.fade, fe.outgoing );`:t=`let ri = ${r.recordIndex()};
	o.vFishFade = vec2f( 1.0, 0.0 );`;const s=r.record("ri");return`
	${t}
	let r0 = ${s[0]}; let q = ${s[1]}; let r2 = ${s[2]}; let r3 = ${s[3]};`}function Ea(r,e){return`
	${Na(r,e)}
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
	let eagle = pattern == ${te("eagleRay")};
	let off = fishSwimOffset( r2.x, d, p, env, r2.y, bend, eagle );
	p += off;
	// the fish's own motion since the last frame (position change + swimming wave): motion vectors
	let delta = fishRotateQ( q, off - fishSwimOffset( r2.x - r3.w, d, v.position, env, r2.y, bend, eagle ) ) * r0.w + r3.xyz;
	v.useWorld = true;
	v.worldNormal = fishRotateQ( q, v.normal );
	v.worldPos = fishRotateQ( q, p * r0.w ) + r0.xyz;
	v.prevWorldPos = v.worldPos - delta;`}const Wa=`
	if ( ! lodFadeVisible( in.pixel, in.vs.vFishFade.x, in.vs.vFishFade.y > 0.5 ) ) { discard; }`,Oa=`
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
	let dhdx = dpdx( bumpH ); let dhdy = dpdy( bumpH );`;function Ua(r,e){return`
	${Oa}
	${e?Wa:""}
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
	if ( pat == ${te("silverside")} ) {
		// silver lateral band with a dark upper edge; translucent green back
		let bandK = fishBand( h, 0.02, 0.1, fwH + 0.05 ) * bodyK;
		c = mix( c, vec3f( 0.78, 0.82, 0.84 ), bandK * 0.8 );
		c = mix( c, vec3f( 0.12, 0.2, 0.2 ), fishBand( h, 0.14, 0.015, fwH + 0.02 ) * bodyK * 0.6 );
		metal += bandK * 0.25;
	} else if ( pat == ${te("chromis")} ) {
		// dark margins on the tail lobes, azure line from the snout through the eye
		let lobe = select( 0.0, smoothstep( 5.5, 7.5, abs( w - 8.0 ) ), P == ${q("CAUDAL")} );
		c = mix( c, vec3f( 0.01, 0.015, 0.03 ), lobe );
		let lineK = fishBand( y - ( z - eye.x ) * 0.35, eye.y + 0.015, 0.004, 0.003 ) * smoothstep( eye.x - 0.02, eye.x + 0.05, z ) * bodyK;
		c = mix( c, vec3f( 0.3, 0.6, 0.95 ), lineK * 0.7 );
	} else if ( pat == ${te("grunt")} ) {
		// French grunt: yellow with oblique blue-silver stripes (straight above the lateral
		// line); bluestriped grunt: straight blue stripes. Red mouth.
		let blue = fract( seed * 3.7 ) < 0.4;
		let above = smoothstep( 0.35, 0.45, h );
		let slope = select( mix( 0.45, 0.0, above ), 0.0, blue );
		let sv = sin( ( y - z * slope ) * select( 150.0, 190.0, blue ) );
		let stripe = smoothstep( 0.45, 0.8, sv ) * bodyK * ( 1.0 - tBelly * 0.7 );
		let lineC = select( vec3f( 0.52, 0.6, 0.7 ), vec3f( 0.12, 0.26, 0.55 ), blue );
		c = mix( c, lineC, stripe * select( 0.7, 0.9, blue ) );
	} else if ( pat == ${te("yellowtail")} ) {
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
	} else if ( pat == ${te("tang")} ) {
		// fine dark wavy lines, pale scalpel at the tail base
		let lines = smoothstep( 0.75, 0.95, sin( y * 170.0 + z * 30.0 + n1 * 3.0 ) ) * 0.3 * bodyK;
		c *= 1.0 - lines;
		let spine = ( 1.0 - smoothstep( 0.01, 0.02, length( vec2f( z + 0.27, y * 1.5 ) ) ) ) * bodyK;
		c = mix( c, vec3f( 0.85, 0.8, 0.55 ), spine );
		c = mix( c, edgeC, select( 0.0, smoothstep( 0.8, 1.0, t ), isFin ) );
	} else if ( pat == ${te("sergeant")} ) {
		// five black bars from behind the head to the tail stalk (a faint sixth on the peduncle), a dark
		// spot at the base of the pectoral fin
		let barsP = smoothstep( 0.45, 0.7, sin( ( z - 0.215 ) * 52.0 + 1.57 ) ) * smoothstep( -0.29, -0.24, z ) * ( 1.0 - smoothstep( 0.225, 0.26, z ) );
		let sixth = fishBand( z, -0.33, 0.012, 0.01 ) * 0.4;
		let bars = max( barsP, sixth ) * ( 1.0 - tBelly * 0.8 );
		c = mix( c, vec3f( 0.02, 0.02, 0.03 ), bars * select( select( 0.0, 0.4, isFin ), 0.92, isBody ) );
		let pecSpot = ( 1.0 - smoothstep( 0.012, 0.02, length( vec2f( z - eye.w + 0.03, y + 0.005 ) ) ) ) * bodyK;
		c = mix( c, vec3f( 0.03, 0.035, 0.05 ), pecSpot * 0.8 );
	} else if ( pat == ${te("wrasse")} ) {
		// bluehead wrasse: yellow initial phase with a dark midlateral stripe; blue-headed males
		let male = fract( seed * 7.1 ) < 0.15;
		let stripe = fishBand( h, 0.05, 0.1, fwH + 0.04 ) * bodyK * smoothstep( 0.25, 0.1, z );
		let female = mix( c, vec3f( 0.04, 0.04, 0.03 ), stripe * 0.9 );
		let head = smoothstep( 0.12, 0.17, z );
		let collar = fishBand( z, 0.13, 0.012, 0.006 );
		let maleC = mix( mix( vec3f( 0.1, 0.42, 0.28 ), vec3f( 0.05, 0.14, 0.62 ), head ), vec3f( 0.02, 0.02, 0.02 ), collar * bodyK );
		c = select( female, maleC, male );
	} else if ( pat == ${te("parrot")} ) {
		// stoplight (terminal phase: green, pink / orange marks, yellow spot on the gill cover)
		// or queen parrotfish (blue-green, orange-pink marks around the mouth)
		let queen = fract( seed * 4.3 ) < 0.4;
		let base = select( vec3f( 0.1, 0.42, 0.26 ), vec3f( 0.06, 0.34, 0.42 ), queen );
		c = mix( c, base * mix( 0.8, 1.1, scaleShade ), bodyK * 0.75 );
		let mark = fishBand( y - ( z - 0.3 ) * 0.4, -0.03, 0.008, 0.008 ) * smoothstep( 0.18, 0.35, z ) * bodyK;
		c = mix( c, select( vec3f( 0.85, 0.45, 0.32 ), vec3f( 0.75, 0.42, 0.28 ), queen ), mark );
		let spot = ( 1.0 - smoothstep( 0.01, 0.02, length( vec2f( z - eye.w - 0.02, y - 0.05 ) ) ) ) * bodyK;
		c = mix( c, vec3f( 0.88, 0.72, 0.12 ), spot * select( 1.0, 0.0, queen ) );
	} else if ( pat == ${te("angel")} ) {
		// French angelfish: black, yellow rims on the scales, yellow face and eye ring
		let rims = smoothstep( 0.72, 0.95, sf ) * max( sfade, 0.35 ) * bodyK;
		c = mix( c, vec3f( 0.62, 0.48, 0.06 ), rims * 0.6 );
		let face = smoothstep( 0.4, 0.43, z ) * bodyK;
		c = mix( c, vec3f( 0.55, 0.45, 0.2 ), face * 0.6 );
		let er0 = length( vec2f( z - eye.x, y - eye.y ) ) / eye.z;
		let ringA = smoothstep( 1.05, 1.2, er0 ) * ( 1.0 - smoothstep( 1.45, 1.65, er0 ) ) * bodyK;
		c = mix( c, vec3f( 0.7, 0.52, 0.06 ), ringA * 0.85 );
	} else if ( pat == ${te("barracuda")} ) {
		// dark oblique bars on the upper flank, black blotches on the lower rear flank
		let bars = smoothstep( 0.35, 0.8, sin( z * 58.0 + h * 1.5 + n1 ) ) * smoothstep( 0.2, 0.55, h ) * bodyK;
		c *= 1.0 - bars * 0.45;
		let bl = smoothstep( 0.6, 0.78, n2 ) * smoothstep( 0.1, -0.25, z ) * ( 1.0 - smoothstep( -0.3, 0.2, h ) ) * bodyK;
		c = mix( c, vec3f( 0.03, 0.03, 0.035 ), bl * 0.9 );
		c = mix( c, vec3f( 0.75, 0.78, 0.8 ), select( 0.0, smoothstep( 0.85, 1.0, t ) * smoothstep( 5.0, 7.0, abs( w - 8.0 ) ), P == ${q("CAUDAL")} ) );
	} else if ( pat == ${te("redSnapper")} ) {
		// rose red back fading to a silvery pink belly; rows of scales show as fine oblique lines
		let rows = smoothstep( 0.6, 0.95, sin( y * 210.0 + z * 120.0 ) ) * max( sfade, 0.3 ) * bodyK * 0.15;
		c *= 1.0 - rows;
	} else if ( pat == ${te("grouper")} ) {
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
	} else if ( pat == ${te("tuna")} ) {
		// blackfin tuna: sharp dark back, bronze band, pale bars on the belly, dusky yellow finlets
		let bronze = fishBand( h, 0.28, 0.05, fwH + 0.06 ) * smoothstep( 0.3, 0.2, z ) * bodyK;
		c = mix( c, vec3f( 0.42, 0.34, 0.14 ), bronze * 0.6 );
		c = mix( c, back, smoothstep( 0.28, 0.4, h ) * bodyK );
		let bars = smoothstep( 0.6, 0.9, sin( z * 95.0 ) ) * smoothstep( 0.0, -0.3, h ) * smoothstep( 0.2, 0.1, z ) * bodyK;
		c = mix( c, vec3f( 0.85, 0.88, 0.9 ), bars * 0.35 );
		c = mix( c, vec3f( 0.55, 0.48, 0.16 ), select( 0.0, 0.85, P == ${q("FINLET")} ) );
	} else if ( pat == ${te("mahi")} ) {
		// mahi-mahi: blue-green back, golden flanks with scattered blue spots
		let cell = floor( vec2f( z, y ) * 55.0 );
		let jit = vec2f( fishHash( cell + 3.1 ), fishHash( cell + 7.7 ) ) - 0.5;
		let fc = fract( vec2f( z, y ) * 55.0 ) - 0.5 - jit * 0.55;
		let rs = mix( 0.1, 0.24, fishHash( cell + 1.3 ) );
		let spots = ( 1.0 - smoothstep( rs, rs + 0.1, length( fc * vec2f( 1.0, 1.25 ) ) ) ) * step( 0.45, fishHash( cell + seed * 7.0 ) ) * bodyK * ( 1.0 - tBelly );
		c = mix( c, vec3f( 0.08, 0.22, 0.5 ), spots * 0.75 );
		c = mix( c, vec3f( 0.2, 0.5, 0.3 ), smoothstep( 0.0, 0.5, h ) * bodyK * 0.35 );
	} else if ( pat == ${te("mullet")} ) {
		// faint dark stripes along the scale rows of the upper flank
		let lines = smoothstep( 0.7, 0.95, sin( sd * 280.0 ) ) * smoothstep( -0.1, 0.3, h ) * bodyK * 0.25;
		c *= 1.0 - lines;
	} else if ( pat == ${te("needlefish")} ) {
		// dark blue lateral stripe, dark beak
		let stripe = fishBand( h, 0.0, 0.06, fwH + 0.05 ) * bodyK;
		c = mix( c, vec3f( 0.12, 0.25, 0.45 ), stripe * 0.6 );
		c = mix( c, vec3f( 0.12, 0.16, 0.16 ), smoothstep( 0.32, 0.36, z ) * bodyK * 0.7 );
	} else if ( pat == ${te("jack")} ) {
		// bar jack: black stripe along the base of the dorsal fin into the lower tail lobe,
		// electric blue below it
		let top = fishBand( h, 0.82, 0.06, fwH + 0.05 ) * smoothstep( 0.2, 0.05, z ) * bodyK;
		let blue = fishBand( h, 0.68, 0.05, fwH + 0.05 ) * smoothstep( 0.2, 0.05, z ) * bodyK;
		c = mix( c, vec3f( 0.15, 0.45, 0.9 ), blue * 0.5 );
		c = mix( c, vec3f( 0.02, 0.03, 0.05 ), top * 0.85 );
		let lobe = select( 0.0, smoothstep( 7.5, 5.5, w ) * smoothstep( 0.1, 0.3, t ), P == ${q("CAUDAL")} );
		c = mix( c, vec3f( 0.02, 0.03, 0.05 ), lobe * 0.8 );
	} else if ( pat == ${te("tarpon")} ) {
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
		let lip = select( vec3f( 0.5, 0.3, 0.3 ), vec3f( 0.6, 0.08, 0.06 ), pat == ${te("grunt")} );
		c = mix( lip, vec3f( 0.03, 0.012, 0.012 ), smoothstep( 0.05, 0.85, t ) );
		metal = 0.0;
		rough = 0.35;
	} else if ( P == ${q("FLESH")} ) {
		// cut face: muscle rings around the backbone, bone and blood at the centre
		let r = length( vec2f( t, w * 1.2 ) );
		let dark = select( 0.0, 1.0, pat == ${te("tuna")} );
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
		let eagleK = select( 0.0, 1.0, pat == ${te("eagleRay")} );
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
`}function Va(r,e,t){return new lt({name:e,roughness:.4,metalness:0,modules:[Ia(),r.module],attributes:{aData:"vec4f",aKind:"f32"},varyings:$a,...t})}function Ga(r,{fade:e=!1}={}){return Va(r,e?"FishFade":"Fish",{vertex:Ea(r,e),surface:Ua(!1,e)})}function Ha(r){return r.split(/[^A-Za-z0-9]+/).filter(Boolean).map((t,s)=>s===0?t[0].toLowerCase()+t.slice(1):t[0].toUpperCase()+t.slice(1)).join("")}class qa{constructor(e,t,{maxInstances:s,dynamic:i=!1,fade:n=!1}){this.name=e,this.kinds=t;const a=t.length;this.maxInstances=s,this.dynamic=i;const h=this.prefix=Ha(e);let o=0,l=0;for(const T of t)o+=T.geometry.attributes.position.count,l+=T.geometry.index.count;const c=new Float32Array(o*3),u=new Float32Array(o*3),f=new Float32Array(o*4),p=new Float32Array(o),m=new Uint32Array(l);this.firstIndex=new Uint32Array(a),this.indexCount=new Uint32Array(a),this.baseVertex=new Uint32Array(a);let d=0,v=0;t.forEach((T,b)=>{const M=T.geometry,x=M.attributes.position.count;c.set(M.attributes.position.array,d*3),u.set(M.attributes.normal.array,d*3),M.attributes.aData&&f.set(M.attributes.aData.array,d*4),p.fill(b,d,d+x),m.set(M.index.array,v),this.firstIndex[b]=v,this.indexCount[b]=M.index.count,this.baseVertex[b]=d,T.triangles=M.index.count/3,T.vertices=x,d+=x,v+=M.index.count});const y=new _e;y.setAttribute("position",new le(c,3)),y.setAttribute("normal",new le(u,3)),y.setAttribute("aData",new le(f,4)),y.setAttribute("aKind",new le(p,1)),y.setIndex(new le(m,1)),this.vertexCount=o,this.data=new Float32Array(s*16),this.instanceBuffer=new ye({label:e+".instances",count:s*4,type:"vec4f"});const w=this;this.dataAttr={set needsUpdate(T){T&&w.upload()}};const g=s*2;this.list=new Uint32Array(g),this.listBuffer=new ye({label:e+".list",count:g,type:"u32"}),this.baseArray=new Uint32Array(Math.max(a,4)),this.baseBuffer=new ye({label:e+".base",count:this.baseArray.length,type:"u32"}),this.commands=new Uint32Array(a*5),this.indirectBuffer=new ye({label:e+".indirect",count:a*5,type:"u32",usage:["indirect"]}),this.offsetPool=[[],[]],this.mainOffsets=[],this.shadowOffsets=[],y.indirect={buffer:this.indirectBuffer,offsets:this.mainOffsets},this.geometry=y,this.pairKind=new Uint16Array(g),this.pairId=new Uint32Array(g),this.pairs=0,this.counts=new Uint32Array(a),this.cursor=new Uint32Array(a),this.visibleInstances=0,this.visibleTriangles=0,this.shadowTriangles=0,this.mesh=null,this.fadeMesh=null,this.fadeOffsets=[],this.fadeInstances=0;const S={[h+"Instances"]:{storage:this.instanceBuffer,access:"read"},[h+"List"]:{storage:this.listBuffer,access:"read"},[h+"Base"]:{storage:this.baseBuffer,access:"read"}};let k=`
fn ${h}RecordIndex( kind: u32, instance: u32 ) -> u32 { return ${h}List[ ${h}Base[ kind ] + instance ]; }
fn ${h}Record( index: u32, k: u32 ) -> vec4f { return ${h}Instances[ index * 4u + k ]; }
`;if(n){this.fadeList=new Uint32Array(g),this.fadeListBuffer=new ye({label:e+".fadeList",count:g,type:"u32"}),this.fadeBaseArray=new Uint32Array(Math.max(a,4)),this.fadeBaseBuffer=new ye({label:e+".fadeBase",count:this.fadeBaseArray.length,type:"u32"}),this.fadeCommands=new Uint32Array(a*5),this.fadeIndirectBuffer=new ye({label:e+".fadeIndirect",count:a*5,type:"u32",usage:["indirect"]});const T=new _e;for(const b in y.attributes)T.setAttribute(b,y.attributes[b]);T.setIndex(y.index),T.indirect={buffer:this.fadeIndirectBuffer,offsets:this.fadeOffsets},this.fadeGeometry=T,this.fadeKind=new Uint16Array(g),this.fadeVal=new Uint32Array(g),this.fadePairs=0,this.fadeCounts=new Uint32Array(a),this.fadeCursor=new Uint32Array(a),this.fadePool=[],S[h+"FadeList"]={storage:this.fadeListBuffer,access:"read"},S[h+"FadeBase"]={storage:this.fadeBaseBuffer,access:"read"},k+=`
struct ${h}FadeInfo { index: u32, fade: f32, outgoing: f32 };
// fade channel: the instance record index, its fade (0..1) and whether this draw is the
// outgoing level (1) or the incoming one (0)
fn ${h}FadeEntry( kind: u32, instance: u32 ) -> ${h}FadeInfo {
	let e = ${h}FadeList[ ${h}FadeBase[ kind ] + instance ];
	return ${h}FadeInfo( e & 0xffffffu, f32( ( e >> 24u ) & 127u ) / 127.0, f32( e >> 31u ) );
}
`}this.module=new Q({name:"batch-"+h,bindings:S,code:k})}fadeEntry(){return`${this.prefix}FadeEntry( u32( v.aKind ), v.instance )`}addFade(e,t,s,i){const n=this.fadePairs++;this.fadeKind[n]=e;const a=Math.round(Math.min(1,Math.max(0,s))*127);this.fadeVal[n]=(t&16777215|a<<24|(i?2147483648:0))>>>0,this.fadeCounts[e]++}createFadeMesh(e){const t=new Ke(this.fadeGeometry,e);t.name=this.name+".fade",t.frustumCulled=!1,t.castShadow=!1,t.receiveShadow=!0,t.matrixAutoUpdate=!1;const s=this.fadeGeometry;return t.onBeforeRender=()=>{s.indirect.offsets=this.fadeOffsets},this.fadeMesh=t,t}recordIndex(){return`${this.prefix}RecordIndex( u32( v.aKind ), v.instance )`}record(e){return[0,1,2,3].map(t=>`${this.prefix}Record( ${e}, ${t}u )`)}createMesh(e,{castShadow:t=!1,receiveShadow:s=!0}={}){const i=new Ke(this.geometry,e);i.name=this.name,i.frustumCulled=!1,i.castShadow=t,i.receiveShadow=s,i.matrixAutoUpdate=!1;const n=this.geometry;return i.onBeforeRender=(a,h,o)=>{const l=o&&(o.isOrthographicCamera||o.reversedDepth===!1);n.indirect.offsets=l?this.shadowOffsets:this.mainOffsets},this.mesh=i,i}upload(){this.instanceBuffer.write(this.data)}begin(){this.pairs=0,this.counts.fill(0),this.fadeList&&(this.fadePairs=0,this.fadeCounts.fill(0))}add(e,t){const s=this.pairs++;this.pairKind[s]=e,this.pairId[s]=t,this.counts[e]++}offsets(e,t){const s=this.offsetPool[e];return s[t]||(s[t]=new Array(t).fill(0))}commit(){const e=this.kinds.length,t=this.commands,s=this.baseArray,i=this.counts,n=this.cursor;let a=0,h=0,o=0,l=0,c=0;for(let w=0;w<e;w++){const g=i[w];s[w]=a,n[w]=a;const S=w*5;t[S]=this.indexCount[w],t[S+1]=g,t[S+2]=this.firstIndex[w],t[S+3]=this.baseVertex[w],t[S+4]=0,g>0&&(this.kinds[w].shadow&&o++,this.kinds[w].shadowOnly||h++),a+=g}const u=this.list,f=this.pairKind,p=this.pairId;for(let w=0;w<this.pairs;w++)u[n[f[w]]++]=p[w];const m=this.offsets(0,h),d=this.offsets(1,o);let v=0,y=0;for(let w=0;w<e;w++){const g=i[w];if(g===0)continue;const S=this.kinds[w];S.shadowOnly||(m[v++]=w*20,l+=g*S.triangles),S.shadow&&(d[y++]=w*20,c+=g*S.triangles)}this.mainOffsets=m,this.shadowOffsets=d,this.geometry.indirect.offsets=m,this.fadeList&&this.commitFade(),this.visibleInstances=a,this.visibleTriangles=l,this.shadowTriangles=c,a>0&&this.listBuffer.write(u.subarray(0,a)),this.baseBuffer.write(s),this.indirectBuffer.write(t)}commitFade(){const e=this.kinds.length,t=this.fadeCommands,s=this.fadeBaseArray,i=this.fadeCounts,n=this.fadeCursor;let a=0,h=0;for(let m=0;m<e;m++){const d=i[m];s[m]=a,n[m]=a;const v=m*5;t[v]=this.indexCount[m],t[v+1]=d,t[v+2]=this.firstIndex[m],t[v+3]=this.baseVertex[m],t[v+4]=0,d>0&&!this.kinds[m].shadowOnly&&h++,a+=d}const o=this.fadeList,l=this.fadeKind,c=this.fadeVal;for(let m=0;m<this.fadePairs;m++)o[n[l[m]]++]=c[m];const u=this.fadePool[h]||(this.fadePool[h]=new Array(h).fill(0));let f=0,p=0;for(let m=0;m<e;m++)i[m]===0||this.kinds[m].shadowOnly||(u[f++]=m*20,p+=i[m]*this.kinds[m].triangles);this.fadeOffsets=u,this.fadeGeometry.indirect.offsets=u,this.fadeInstances=a,this.visibleTriangles+=p,a>0&&this.fadeListBuffer.write(o.subarray(0,a)),this.fadeBaseBuffer.write(s),this.fadeIndirectBuffer.write(t),this.fadeMesh&&(this.fadeMesh.visible=h>0)}dispose(){this.geometry.dispose(),this.fadeGeometry&&this.fadeGeometry.dispose();for(const e of[this.instanceBuffer,this.listBuffer,this.baseBuffer,this.indirectBuffer,this.fadeListBuffer,this.fadeBaseBuffer,this.fadeIndirectBuffer])e&&e.destroy();this.mesh&&this.mesh.removeFromParent()}}function zr(r){let e=r>>>0;return function(){e|=0,e=e+1831565813|0;let s=Math.imul(e^e>>>15,1|e);return s=s+Math.imul(s^s>>>7,61|s)^s,((s^s>>>14)>>>0)/4294967296}}function qe(r){return Math.atan2(Math.sin(r),Math.cos(r))}function Ii(r,e,t){return r+qe(e-r)*t}const ja=3,Xa=12,Ka=8,Ya=.7,Za=1.15,Qa=1.85,Ja=1.45,eo=.58,to=.32;function $i(r,e){return 1-Math.exp(-r/Math.max(e,1e-4))}function ps(r,e){for(let t=0;t<r.length;t++){const s=r[t];s.seek===e&&(s.seek=null,s.cruiseHeading=s.heading)}}function so(r,e,t,s,i=1){let n=qe(e-r.heading);Math.PI-Math.abs(n)<.22&&(n=(Math.abs(r.yawRate)>.02?Math.sign(r.yawRate):r.turnSign||1)*Math.abs(n)),Math.abs(n)>.25&&(r.turnSign=Math.sign(n)||r.turnSign||1);const a=Math.tanh(n*Qa/Math.max(t,.001))*t,h=Math.sqrt(2*Ja*Math.abs(n)),o=h<Math.abs(a)?Math.sign(n||a)*Math.min(t,h):a,c=(o*r.yawRate<0||Math.abs(o)+1e-4<Math.abs(r.yawRate)?to:eo)*i,u=1-Math.exp(-s/Math.max(c,.001));r.yawRate+=(o-r.yawRate)*u,r.heading=qe(r.heading+r.yawRate*s)}function io({fish:r=46,halfW:e=8,halfH:t=4.5,cx:s=0,cy:i=0,seed:n=7}={}){const a=zr(n),h=Math.max(1,Math.min(80,r|0)),o=[],l=[],c=[],u={x:s+e*.06,y:i-t*.04};let f=1,p=0,m=0;const d={halfW:e,halfH:t,cx:s,cy:i},v=Math.max(4,Math.round(h*.34));for(let x=0;x<h;x++){const z=x<v,P=a(),_=P<.34?0:P<.6?1:P<.8?2:3,A=1.05+a()*.7;let $,D,H;if(z){const I=a()*Math.PI*2,B=Math.sqrt(a())*Math.min(e,t)*.22;$=u.x+Math.cos(I)*B,D=u.y+Math.sin(I)*B*.72,H=I+.4}else{const I=a()*Math.PI*2,B=.15+Math.sqrt(a())*.72;$=s+Math.cos(I)*e*B*.78,D=i+Math.sin(I)*t*B*.78,H=a()*Math.PI*2}o.push({x:$,y:D,heading:H,aim:H,yawRate:0,turnSign:0,cruiseHeading:H,sep:0,speed:.45+a()*.25,cruise:.52+a()*.38,len:A,phase:a()*Math.PI*2,hz:4.2+a()*2.4,pattern:_,seed:a()*20+.2,school:z,orbit:.35+a()*.95,greed:.32+a()*.68,vision:2.6+a()*2.4,eatT:0,idleT:0,seek:null,seekDist:99,z:.08+a()*.1})}function y(x,z,P){c.push({x,y:z,age:0,amp:P}),c.length>Ka&&c.shift()}function w(x){for(let z=0;z<l.length;z++)if(l[z].id===x)return l[z];return null}function g(x,z,P=0,_=0){d.halfW=Math.max(.5,x),d.halfH=Math.max(.5,z),d.cx=P,d.cy=_;const A=d.halfW*.84,$=d.halfH*.8;for(const D of o)D.x=Math.min(d.cx+A,Math.max(d.cx-A,D.x)),D.y=Math.min(d.cy+$,Math.max(d.cy-$,D.y))}function S(x,z){const P=(x-d.cx)/d.halfW,_=(z-d.cy)/d.halfH;if(P*P+_*_>1.2)return!1;const A=2+(a()*2|0);for(let $=0;$<A;$++){for(;l.length>=Xa;){const D=l.shift();ps(o,D.id)}l.push({id:f++,x:x+(a()-.5)*.36,y:z+(a()-.5)*.28,vx:(a()-.5)*.22,vy:(a()-.5)*.18,r:.05+a()*.02,bob:a()*Math.PI*2,life:18+a()*8,eaten:!1})}return y(x,z,1),!0}function k(x,z){!z||z.eaten||(z.eaten=!0,m++,x.seek=null,x.eatT=.42,x.idleT=.65+a()*.75,x.cruiseHeading=x.heading,x.seekDist=99,y(z.x,z.y,.32))}function T(){const x=[];for(let _=0;_<o.length;_++){const A=o[_];if(A.eatT>0){A.seek!=null&&(A.seek=null,A.cruiseHeading=A.heading);continue}let $=null,D=1/0;const H=A.vision*(.45+A.greed*.7);for(let I=0;I<l.length;I++){const B=l[I];if(B.eaten)continue;const X=Math.hypot(B.x-A.x,B.y-A.y);X<D&&X<=H&&(D=X,$=B)}$&&x.push({f:A,dist:D,id:$.id})}x.sort((_,A)=>_.dist-A.dist);const z=new Set,P=Math.min(ja,x.length);for(let _=0;_<P;_++)x[_].f.seek=x[_].id,z.add(x[_].f);for(let _=0;_<o.length;_++){const A=o[_];z.has(A)||A.eatT>0||A.seek!=null&&(A.seek=null,A.cruiseHeading=A.heading)}}function b(x,z){x.eatT>0&&(x.eatT=Math.max(0,x.eatT-z));const P=x.eatT>0,_=!P&&x.seek!=null?w(x.seek):null;!P&&x.seek!=null&&(!_||_.eaten)&&(x.seek=null,x.cruiseHeading=x.heading),_?x.idleT=0:x.idleT>0&&(x.idleT=Math.max(0,x.idleT-z));let A=x.cruiseHeading,$=!1;if(P)A=x.heading,x.seekDist=99;else if(_){x.seekDist=Math.hypot(_.x-x.x,_.y-x.y);const V=x.len*.58*.46,Z=x.x+Math.cos(x.heading)*V,re=x.y+Math.sin(x.heading)*V;Math.hypot(_.x-Z,_.y-re)<.16||x.seekDist<.14?(k(x,_),A=x.heading,x.seekDist=99):($=!0,A=Math.atan2(_.y-x.y,_.x-x.x))}else if(x.school){const V=p*.08+x.phase,Z=u.x+Math.cos(V)*x.orbit,re=u.y+Math.sin(V*.9)*x.orbit*.7,ge=Math.hypot(Z-x.x,re-x.y);x.seekDist=99,A=ge<.35?x.aim:Math.atan2(re-x.y,Z-x.x)}else{x.seekDist=99;const V=Math.sin(p*.085+x.phase*1.7)*.1+Math.sin(p*.037+x.seed)*.04;x.cruiseHeading=qe(x.cruiseHeading+V*z),A=x.cruiseHeading}const D=(x.x-d.cx)/(d.halfW*.8),H=(x.y-d.cy)/(d.halfH*.76),I=D*D+H*H;let B=!1;if(I>.62){const V=Math.atan2(d.cy-x.y,d.cx-x.x),Z=Math.min(.9,(I-.62)*1.15);A=Ii(A,V,Z),B=I>1}let X=0,ee=0;for(let V=0;V<o.length;V++){const Z=o[V];if(Z===x)continue;const re=x.x-Z.x,ge=x.y-Z.y,ne=re*re+ge*ge,ss=(x.len+Z.len)*.28;if(ne<ss*ss&&ne>1e-8){const Is=Math.sqrt(ne),$s=(ss-Is)/Is;X+=re*$s,ee+=ge*$s}}let L=0;if(X!==0||ee!==0){let V=qe(Math.atan2(ee,X)-A);V=Math.max(-.5,Math.min(.5,V));const Z=$&&x.seekDist<1.05;L=V*(Z?.12:.32)}x.sep+=(L-x.sep)*$i(z,.55),A=qe(A+x.sep);let O=$?.18:x.school?.4:.82;I>.62&&(O=Math.min(O,.36)),P&&(O=.35),x.aim=Ii(x.aim,A,$i(z,O));let N=B?Za:Ya;if($){const V=Math.max(.45,x.len*.58);let Z=.8;if(x.seekDist<V*2.2){const ge=Math.max(0,Math.min(1,x.seekDist/(V*2.2)));Z=.42+(.8-.42)*ge}const re=x.speed/Math.max(.25,Z*V);N=Math.min(2.05,Math.max(.45,re))}so(x,x.aim,N,z,$?.55:1);let R=x.cruise*(.92+.08*Math.sin(p*.22+x.phase));if(P)R=x.cruise*.18;else if(x.idleT>0&&!$)R=x.cruise*.36;else if($){const V=Math.abs(qe(A-x.heading)),Z=1-Math.min(1,V/1.35),re=.9,ge=x.seekDist<re?.45+.55*(x.seekDist/re):1;R=Math.max(x.cruise*(.65+.85*Z)*ge,x.cruise*.32)}const ie=.85*z;x.speed+=Math.max(-ie,Math.min(ie,R-x.speed)),x.x+=Math.cos(x.heading)*x.speed*z,x.y+=Math.sin(x.heading)*x.speed*z;const ae=d.halfW*.86,Ie=d.halfH*.82;(x.x>d.cx+ae||x.x<d.cx-ae||x.y>d.cy+Ie||x.y<d.cy-Ie)&&(x.x=Math.min(d.cx+ae,Math.max(d.cx-ae,x.x)),x.y=Math.min(d.cy+Ie,Math.max(d.cy-Ie,x.y)))}function M(x){const z=Math.max(0,Math.min(x,.1));if(z===0)return;p+=z,u.x=d.cx+Math.cos(p*.07)*d.halfW*.16,u.y=d.cy+Math.sin(p*.05)*d.halfH*.14;const P=Math.exp(Math.log(.94)*z*30);for(let _=l.length-1;_>=0;_--){const A=l[_];A.life-=z,A.bob+=z*3,A.vx*=P,A.vy*=P,A.x+=A.vx*z,A.y+=A.vy*z;const $=d.halfW*.9,D=d.halfH*.86;A.x=Math.min(d.cx+$,Math.max(d.cx-$,A.x)),A.y=Math.min(d.cy+D,Math.max(d.cy-D,A.y)),A.life<=0&&(ps(o,A.id),l.splice(_,1))}T();for(let _=0;_<o.length;_++)b(o[_],z);for(let _=l.length-1;_>=0;_--)l[_].eaten&&(ps(o,l[_].id),l.splice(_,1));for(let _=c.length-1;_>=0;_--)c[_].age+=z,c[_].age>8&&c.splice(_,1)}return{fish:o,foods:l,ripples:c,bounds:d,get time(){return p},get eaten(){return m},step:M,feed:S,setBounds:g}}const ks=new de("PondWake",{rings:["vec4f[8]",new Float32Array(32)],bounds:["vec4f",[8,4.5,0,0]]},{label:"pondWake"}),ro=`
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
`,_r=new Q({name:"pondWake",deps:[J],uniforms:ks,uniformName:"pondWake",code:ro}),no=new Q({name:"pondBed",code:`
fn terrainHeightAt(xz: vec2f) -> f32 { return -1.12; }
fn terrainNormalRock(xz: vec2f) -> vec4f { return vec4f(0.0); }
fn terrainNormalRockLevel(xz: vec2f, level: f32) -> vec4f { return vec4f(0.0); }
fn terrainSunShadowAt(P: vec3f) -> f32 { return 1.0; }
`}),ao=new Q({name:"pondSky",code:`
fn skyReflectionRadiance(dir: vec3f) -> vec3f {
  let h = sat(dir.y * 0.55 + 0.08);
  return mix(vec3f(0.58, 0.7, 0.64), vec3f(0.34, 0.55, 0.64), h);
}
fn skyRadianceWithClouds(dir: vec3f, withSun: bool) -> vec3f {
  let disk = select(0.0, pow(sat(dot(dir, frame.sunDir)), 1400.0) * 8.0, withSun);
  return skyReflectionRadiance(dir) + vec3f(disk);
}
`});function oo(){return new lt({name:"pond-floor",roughness:.92,metalness:0,modules:[_r],underwaterLighting:"full",surface:`
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
    `})}function lo(){return new lt({name:"food",roughness:.7,metalness:0,underwaterLighting:"full",surface:`
      let q = in.uv * 2.0 - 1.0;
      let r = length(q);
      s.albedo = mix(vec3f(0.86, 0.62, 0.32), vec3f(0.42, 0.24, 0.08), smoothstep(0.05, 0.92, r));
      s.alpha = 1.0;
    `})}function ho(){return new lt({name:"plants",roughness:.72,metalness:0,transparent:!0,depthWrite:!1,underwaterLighting:"none",attributes:{aPlant:"vec4f"},varyings:{vPlant:"vec4f"},vertex:`
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
    `})}const co=`
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
`,Ni=["redSnapper","grunt","grouper","tarpon","parrot"],Ei=Math.PI*2,Wi=new C,He=new ve,Oi=new C,Ui=new U,uo=new C(0,1,0),Ve=new C,$t=new C;function ms(r){const e=r.attributes.position.array,t=r.attributes.normal.array;for(let i=0;i<e.length;i+=3){const n=e[i+1];e[i+1]=0,e[i+2]=n}for(let i=0;i<t.length;i+=3)t[i]=0,t[i+1]=1,t[i+2]=0;const s=r.index.array;for(let i=0;i<s.length;i+=3){const n=s[i+1];s[i+1]=s[i+2],s[i+2]=n}return r.computeBoundingSphere(),r}function kr(r,e,t,s){Ve.set(e,t,1).unproject(r),$t.set(e,t,0).unproject(r);const i=$t.y-Ve.y,n=Math.abs(i)<1e-8?0:(s-Ve.y)/i;return{x:Ve.x+($t.x-Ve.x)*n,z:Ve.z+($t.z-Ve.z)*n}}function Vi(r){r.updateProjectionMatrix(),r.updateMatrixWorld(!0);let e=1/0,t=-1/0,s=1/0,i=-1/0;const n=[[-1,-1],[1,-1],[1,1],[-1,1]];for(let a=0;a<n.length;a++){const h=kr(r,n[a][0],n[a][1],0);h.x<e&&(e=h.x),h.x>t&&(t=h.x),h.z<s&&(s=h.z),h.z>i&&(i=h.z)}return{halfW:(t-e)*.5,halfH:(i-s)*.5,cx:(e+t)*.5,cy:(s+i)*.5}}function fo(r,e,t,s){const i=Math.sin(r*.5),n=Math.cos(r*.5),a=Math.sin(e*.5),h=Math.cos(e*.5),o=Math.sin(t*.5),l=Math.cos(t*.5),c=n*a,u=i*h,f=-i*a,p=n*h;return s.set(c*l+u*o,-c*o+u*l,p*o+f*l,p*l-f*o),s}function Gi(r,e,t,s,i,n,a,h){Wi.set(t,s,i),He.setFromAxisAngle(uo,n),Oi.set(a,1,h),Ui.compose(Wi,He,Oi),r.setMatrixAt(e,Ui)}function po(r){const e=[];function t(i,n,a,h){e.push({nx:i,ny:n,scaleN:a,kind:h,seed:r()*12+.2,shade:r(),phase:r()*Math.PI*2,rot:r()*Math.PI*2,squash:.82+r()*.28})}const s=[[-.98,-.92],[.98,-.92],[-.98,.92],[.98,.92]];for(let i=0;i<s.length;i++)for(let n=0;n<6;n++)t(s[i][0]+(r()-.5)*.32,s[i][1]+(r()-.5)*.26,.75+r()*.75,r()<.4?0:1);for(let i=0;i<18;i++){const n=r()*Math.PI*2,a=.76+r()*.3;t(Math.cos(n)*a,Math.sin(n)*a,.42+r()*.42,1)}for(let i=0;i<4;i++){const n=r()*Math.PI*2,a=.48+r()*.16;t(Math.cos(n)*a,Math.sin(n)*a,.36+r()*.22,1)}for(let i=0;i<5;i++){const n=(i+.35)/5*Math.PI*2,a=.7+r()*.18;t(Math.cos(n)*a,Math.sin(n)*a,.28+r()*.14,2)}return e.sort((i,n)=>i.kind-n.kind||n.scaleN-i.scaleN),e}function mo(r){for(let e=0;e<r.length;e++){const t=r[e];t.pattern===0?t.kind=0:t.pattern===1?t.kind=1:t.pattern===2?t.kind=t.seed>8?2:4:t.kind=3,t.swim=t.phase,t.prevX=t.x,t.prevY=t.y,t.prevH=t.heading}}async function yo({canvas:r=null,width:e=1280,height:t=720,fish:s=46,seed:i=7}={}){await F.init({canvas:r,headless:!r});const n=new na({size:32,splits:[40],pcssCascades:0});n.enabled=!1,rt.fields.enabled.value=0;const a=new rr(30,e/Math.max(1,t),.2,80);a.position.set(0,10.4,6.4),a.lookAt(0,-.35,0);const h=Vi(a),o=io({fish:s,halfW:h.halfW,halfH:h.halfH,cx:h.cx,cy:h.cy,seed:i});mo(o.fish);const l=new C(.48,.78,.28).normalize();me.sunDir.value.copy(l),me.sunColor.value.setRGB(5.4,5.1,4.6),me.skyIrradiance.value.setRGB(.42,.5,.46),me.horizonColor.value.setRGB(.55,.68,.62),me.seaLevel.value=0,me.cameraWaterHeight.value=0,me.cameraUnderwater.value=0,me.windSpeed.value=2.6,me.windDir.value.set(.42,.91).normalize(),me.waterAbsorption.value.set(.22,.055,.028),me.waterScattering.value.set(.018,.026,.03);const c=new ca(null,{cascades:2,sizes:[14,3.6],depth:1.65,choppiness:.55,local:{windSpeed:2.8,windDirection:38,fetch:1.4,spreadBlend:.72,swell:.04,shortWavesFade:.06},swell:{scale:.22,windSpeed:2.1,windDirection:12,fetch:6,spreadBlend:1,swell:.35,shortWavesFade:.18}});c.foamBias.value=.22,c.timeScale=.24;const u=va(null,256),f=new oa({gridSize:72,leafSize:64,levels:1,rangeFactor:4,maxInstances:4,minY:-2,maxY:2,center:{x:-32,z:-32,size:64}}),p=new ua({fft:c,cdlod:f,foamTexture:u});p.wake={module:_r},p.terrain={module:no},p.amplitude.value=.58,p.slopeScale.value=1.7,p.foamCoverage.value=.22;const m=new wa(null,c);m.strength.value=.9;const d=Ma({fft:c,caustics:m,surface:p,terrain:p.terrain}),v=new Ps,y=new Xn;y.syncPipelines=!0;const w=new ta(y,v,a);w.clearColor=[.05,.16,.13,1];const g=new ma({surface:p,sky:{module:ao},sceneCopy:w.opaqueCopy,sceneDepthHalf:w.opaqueDepthHalf.texture});g.params.refraction.value=.16,g.params.foamIntensity.value=.4,g.params.roughness.value=.04,g.params.sss.value=.55,g.params.ssr.value=0;const S=new Ke(f.geometry,g);S.frustumCulled=!1,S.layers.set(at.WATER);const k=new Ke(ms(new mn(1,1)),oo());k.frustumCulled=!1,k.position.y=-1.12;const T=Ni.map(L=>({geometry:Ta(_s[L],{lod:1,pose:"swim",eyes:!0})})),b=new qa("Fish",T,{maxInstances:80}),M=b.createMesh(Ga(b));M.layers.set(at.OPAQUE);const x=new bt(ms(new ii(1,14)),lo(),12);x.count=0,x.frustumCulled=!1;const z=po(zr(i+101>>>0)),P=ms(new ii(1,28)),_=new Float32Array(z.length*4);for(let L=0;L<z.length;L++){const O=z[L];_[L*4]=O.kind,_[L*4+1]=O.seed,_[L*4+2]=O.shade,_[L*4+3]=O.phase}P.setAttribute("aPlant",new Xe(_,4));const A=new bt(P,ho(),z.length);A.frustumCulled=!1,A.layers.set(at.TRANSPARENT),v.add(k,M,x,S,A);const $=new pt(e,t,{colors:["rgba8unorm"],label:"pond-ldr"}),D=r?F.format:"rgba8unorm",H=new Mr({label:"pond-grade",colorFormats:[D],bindings:{hdr:{texture:()=>w.sceneRT.texture}},code:co}),I={canvas:r,camera:a,sim:o,shadows:n,ldr:$,width:e,height:t,_dt:1/30,get halfW(){return o.bounds.halfW},get halfH(){return o.bounds.halfH},get centerX(){return o.bounds.cx},get centerY(){return o.bounds.cy},get stats(){return y.stats},get time(){return o.time},feed(L,O){return o.feed(L,O)},step(L){I._dt=L,o.step(L),X()},resize(L,O){I.width=Math.max(1,L|0),I.height=Math.max(1,O|0),a.aspect=I.width/I.height;const N=Vi(a);o.setBounds(N.halfW,N.halfH,N.cx,N.cy);const R=Math.max(N.halfW,N.halfH)*3.4;k.scale.set(R,1,R),w.setSize(I.width,I.height),$.setSize(I.width,I.height),B(),X()},render(){F.beginFrame();const L=Re.fields;L.time.value=o.time,L.dt.value=I._dt,L.frameIndex.value=L.frameIndex.value+1>>>0,ks.fields.bounds.value=[o.bounds.halfW,o.bounds.halfH,o.bounds.cx,o.bounds.cy],ee(),c.update(I._dt),m.update(),d.update(a),f.update(a),yr(a,I.width,I.height),w.render();const O=r?F.context.getCurrentTexture().createView():$.texture.view();H.render({colorViews:[O]}),F.submit()},pick(L,O,N){const R=(L-N.left)/N.width*2-1,ie=-((O-N.top)/N.height*2-1);a.updateProjectionMatrix(),a.updateMatrixWorld(!0);const ae=kr(a,R,ie,0);return{x:ae.x,y:ae.z}}};function B(){const L=Math.min(o.bounds.halfW,o.bounds.halfH);for(let O=0;O<z.length;O++){const N=z[O],R=o.bounds.cx+N.nx*o.bounds.halfW,ie=o.bounds.cy+N.ny*o.bounds.halfH,ae=N.scaleN*(L/3.6);Gi(A,O,R,.22,ie,N.rot,ae,ae*N.squash)}A.instanceMatrix.needsUpdate=!0}function X(){const L=b.data,O=Math.max(I._dt,1e-4);b.begin();for(let N=0;N<o.fish.length;N++){const R=o.fish[N],ie=.72+Math.max(0,R.hz-4.2)*.16,ae=O*Ei*ie;R.swim=(R.swim+ae)%(Ei*64);const Ie=R.len*.58,V=-.38-R.seed%1*.28,Z=Math.atan2(Math.cos(R.heading),Math.sin(R.heading)),re=R.yawRate||0,ge=Math.max(-.48,Math.min(.48,re*.42));fo(Z,0,ge,He);const ne=N*16;L[ne]=R.x,L[ne+1]=V,L[ne+2]=R.y,L[ne+3]=Ie,L[ne+4]=He.x,L[ne+5]=He.y,L[ne+6]=He.z,L[ne+7]=He.w,L[ne+8]=R.swim,L[ne+9]=.05+Math.min(.04,R.speed*.03),L[ne+10]=Math.max(-.4,Math.min(.4,re*.34)),L[ne+11]=_s[Ni[R.kind]].pattern+(R.seed%1*.83+.02),L[ne+12]=R.x-R.prevX,L[ne+13]=0,L[ne+14]=R.y-R.prevY,L[ne+15]=ae,R.prevX=R.x,R.prevY=R.y,R.prevH=R.heading,b.add(R.kind,N)}b.commit(),b.dataAttr.needsUpdate=!0,x.count=o.foods.length;for(let N=0;N<o.foods.length;N++){const R=o.foods[N],ie=Math.sin(R.bob)*.012,ae=R.r||.055;Gi(x,N,R.x,-.08+ie,R.y,R.bob*.05,ae,ae*.86)}x.instanceMatrix.needsUpdate=!0}function ee(){const L=ks.fields.rings.value;L.fill(0);const O=Math.min(8,o.ripples.length);for(let N=0;N<O;N++){const R=o.ripples[N],ie=N*4;L[ie]=R.x,L[ie+1]=R.y,L[ie+2]=R.age,L[ie+3]=R.amp}}return I.resize(e,t),I}const ts=new URLSearchParams(location.search);function _t(r,e){const t=ts.get(r);if(t==null||t==="")return e;const s=Number(t);return Number.isFinite(s)?s:e}const be=document.getElementById("pond"),qt=document.getElementById("hint"),ys=document.getElementById("err"),jt=document.getElementById("perf"),xo=Math.max(1,Math.min(80,_t("fish",46)|0)),vo=Math.max(8,Math.min(60,_t("fps",30))),Hi=Math.max(480,_t("res",1440)),go=Math.max(.25,_t("dpr",1)),wo=ts.get("demo")==="1",bo=_t("seed",7)|0,Mo=!!(window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches),Ar=ts.get("perf")==="1";ts.get("ui")==="0"&&qt&&(qt.hidden=!0);Ar&&jt&&(jt.style.display="block");function qi(){const r=Math.max(1,window.innerWidth),e=Math.max(1,window.innerHeight),t=Math.min(window.devicePixelRatio||1,go);let s=Math.max(1,Math.round(r*t)),i=Math.max(1,Math.round(e*t));const n=Math.max(s,i);if(n>Hi){const a=Hi/n;s=Math.max(1,Math.round(s*a)),i=Math.max(1,Math.round(i*a))}return{w:s,h:i}}function So(r){return String(r).replace(/[&<>]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;"})[e])}function zo(r){be&&(be.style.display="none"),qt&&(qt.hidden=!0),ys&&(ys.style.display="block",ys.innerHTML=`<h1>WebGPU 没能启动</h1><p>${So(r&&r.message?r.message:r)}</p><p>这条演示只在较新的 Chrome、Edge 或 Safari 里运行，不能当作 Lively 壁纸。桌面请继续用仓库根目录的 WebGL 锦鲤池 <code>index.html</code>（<a href="https://github.com/cnwinds/koi-pond-wallpaper">仓库</a>）。Lively 和 WebView2 里经常没有 WebGPU。</p>`)}let Vt=!1,As=document.hidden,St=0,ot=0,xt=0,xs=0,Nt=0,Xt=null;function _o(){return Xt??vo}function ji(r){As=r,As||(ot=performance.now(),xt=0,St||(St=requestAnimationFrame(Rs)))}let ue=null,vs=2.2;function Rs(r){if(St=0,As||document.hidden||Vt||!ue)return;const e=ot?Math.min(.1,(r-ot)/1e3):0;ot=r,xt+=e;const t=1/_o();if(xt>=t){const s=Math.min(xt,.1)*(Mo?.25:1);if(xt=0,wo&&(vs+=s,vs>4.5)){vs=0;const i=Math.random()*Math.PI*2,n=.08+Math.random()*.35;ue.feed(ue.centerX+Math.cos(i)*ue.halfW*n,ue.centerY+Math.sin(i)*ue.halfH*n)}if(ue.step(s),ue.render(),xs++,Ar&&jt&&(Nt+=s,Nt>=.5)){const i=ue.stats;jt.textContent=`${Math.round(xs/Nt)} fps · ${ue.width}×${ue.height} · draws ${i.draws} · tris ${Math.round(i.triangles)}`,xs=0,Nt=0}}St=requestAnimationFrame(Rs)}async function ko(){if(!navigator.gpu)throw new Error("navigator.gpu 不存在。");const r=qi();be.width=r.w,be.height=r.h,ue=await yo({canvas:be,width:r.w,height:r.h,fish:xo,seed:bo}),window.addEventListener("resize",()=>{const e=qi();e.w===be.width&&e.h===be.height||(be.width=e.w,be.height=e.h,ue.resize(e.w,e.h))}),be.addEventListener("pointerdown",e=>{if(e.button!=null&&e.button!==0)return;const t=ue.pick(e.clientX,e.clientY,be.getBoundingClientRect());t&&ue.feed(t.x,t.y)}),document.addEventListener("visibilitychange",()=>ji(document.hidden||Vt)),window.addEventListener("blur",()=>{Xt=8}),window.addEventListener("focus",()=>{Xt=null,ot=performance.now()}),window.livelyWallpaperPlaybackChanged=e=>{try{Vt=!!(typeof e=="string"?JSON.parse(e):e).IsPaused,ji(document.hidden||Vt)}catch{}},document.addEventListener("contextmenu",e=>e.preventDefault()),ot=performance.now(),document.hidden||(St=requestAnimationFrame(Rs))}ko().catch(zo);
