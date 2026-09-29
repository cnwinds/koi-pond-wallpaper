(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function e(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=e(i);fetch(i.href,r)}})();const me=Math.PI/180,je=180/Math.PI,L=[];for(let n=0;n<256;n++)L[n]=(n<16?"0":"")+n.toString(16);function Ne(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,s=Math.random()*4294967295|0;return(L[n&255]+L[n>>8&255]+L[n>>16&255]+L[n>>24&255]+"-"+L[t&255]+L[t>>8&255]+"-"+L[t>>16&15|64]+L[t>>24&255]+"-"+L[e&63|128]+L[e>>8&255]+"-"+L[e>>16&255]+L[e>>24&255]+L[s&255]+L[s>>8&255]+L[s>>16&255]+L[s>>24&255]).toLowerCase()}function wi(n,t){switch(t.constructor){case Float32Array:case Float64Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:case Uint8ClampedArray:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:return n}}function bi(n,t){switch(t.constructor){case Float32Array:case Float64Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:return n}}class R{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){return t===0?this.x=e:this.y=e,this}getComponent(t){return t===0?this.x:this.y}clone(){return new R(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,s=this.y,i=t.elements;return this.x=i[0]*e+i[3]*s+i[6],this.y=i[1]*e+i[4]*s+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Math.max(t,Math.min(e,s)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());return e===0?Math.PI/2:Math.acos(Math.max(-1,Math.min(1,this.dot(t)/e)))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,s=this.y-t.y;return e*e+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,s){return this.x=t.x+(e.x-t.x)*s,this.y=t.y+(e.y-t.y)*s,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const s=Math.cos(e),i=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*s-a*i+t.x,this.y=r*i+a*s+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}R.prototype.isVector2=!0;class X{constructor(t=0,e=0,s=0,i=1){this._x=t,this._y=e,this._z=s,this._w=i,this._onChangeCallback=Mi}static slerpFlat(t,e,s,i,r,a,h){const l=new X().fromArray(s,i),o=new X().fromArray(r,a);l.slerp(o,h).toArray(t,e)}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,s,i){return this._x=t,this._y=e,this._z=s,this._w=i,this._onChangeCallback(),this}clone(){return new X(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}identity(){return this.set(0,0,0,1)}setFromEuler(t,e=!0){const s=t._x,i=t._y,r=t._z,a=t._order,h=Math.cos(s/2),l=Math.cos(i/2),o=Math.cos(r/2),c=Math.sin(s/2),u=Math.sin(i/2),f=Math.sin(r/2);switch(a){case"XYZ":this._x=c*l*o+h*u*f,this._y=h*u*o-c*l*f,this._z=h*l*f+c*u*o,this._w=h*l*o-c*u*f;break;case"YXZ":this._x=c*l*o+h*u*f,this._y=h*u*o-c*l*f,this._z=h*l*f-c*u*o,this._w=h*l*o+c*u*f;break;case"ZXY":this._x=c*l*o-h*u*f,this._y=h*u*o+c*l*f,this._z=h*l*f+c*u*o,this._w=h*l*o-c*u*f;break;case"ZYX":this._x=c*l*o-h*u*f,this._y=h*u*o+c*l*f,this._z=h*l*f-c*u*o,this._w=h*l*o+c*u*f;break;case"YZX":this._x=c*l*o+h*u*f,this._y=h*u*o+c*l*f,this._z=h*l*f-c*u*o,this._w=h*l*o-c*u*f;break;case"XZY":this._x=c*l*o-h*u*f,this._y=h*u*o-c*l*f,this._z=h*l*f+c*u*o,this._w=h*l*o+c*u*f;break;default:throw new Error("Quaternion.setFromEuler: unknown order "+a)}return e&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const s=e/2,i=Math.sin(s);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(s),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,s=e[0],i=e[4],r=e[8],a=e[1],h=e[5],l=e[9],o=e[2],c=e[6],u=e[10],f=s+h+u;if(f>0){const m=.5/Math.sqrt(f+1);this._w=.25/m,this._x=(c-l)*m,this._y=(r-o)*m,this._z=(a-i)*m}else if(s>h&&s>u){const m=2*Math.sqrt(1+s-h-u);this._w=(c-l)/m,this._x=.25*m,this._y=(i+a)/m,this._z=(r+o)/m}else if(h>u){const m=2*Math.sqrt(1+h-s-u);this._w=(r-o)/m,this._x=(i+a)/m,this._y=.25*m,this._z=(l+c)/m}else{const m=2*Math.sqrt(1+u-s-h);this._w=(a-i)/m,this._x=(r+o)/m,this._y=(l+c)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let s=t.x*e.x+t.y*e.y+t.z*e.z+1;return s<Number.EPSILON?(s=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=s):(this._x=0,this._y=-t.z,this._z=t.y,this._w=s)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=s),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Math.max(-1,Math.min(1,this.dot(t)))))}rotateTowards(t,e){const s=this.angleTo(t);return s===0?this:this.slerp(t,Math.min(1,e/s))}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this.lengthSq())}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x*=t,this._y*=t,this._z*=t,this._w*=t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const s=t._x,i=t._y,r=t._z,a=t._w,h=e._x,l=e._y,o=e._z,c=e._w;return this._x=s*c+a*h+i*o-r*l,this._y=i*c+a*l+r*h-s*o,this._z=r*c+a*o+s*l-i*h,this._w=a*c-s*h-i*l-r*o,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const s=this._x,i=this._y,r=this._z,a=this._w;let h=a*t._w+s*t._x+i*t._y+r*t._z,l=t._x,o=t._y,c=t._z,u=t._w;if(h<0&&(l=-l,o=-o,c=-c,u=-u,h=-h),h>=1)return this;const f=1-h*h;if(f<=Number.EPSILON){const y=1-e;return this._w=y*a+e*u,this._x=y*s+e*l,this._y=y*i+e*o,this._z=y*r+e*c,this.normalize()}const m=Math.sqrt(f),x=Math.atan2(m,h),d=Math.sin((1-e)*x)/m,g=Math.sin(e*x)/m;return this._w=a*d+u*g,this._x=s*d+l*g,this._y=i*d+o*g,this._z=r*d+c*g,this._onChangeCallback(),this}slerpQuaternions(t,e,s){return this.copy(t).slerp(e,s)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),s=Math.random(),i=Math.sqrt(1-s),r=Math.sqrt(s);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this.set(t.getX(e),t.getY(e),t.getZ(e),t.getW(e))}_onChange(t){return this._onChangeCallback=t,this}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}function Mi(){}X.prototype.isQuaternion=!0;const Xe=new X;class S{constructor(t=0,e=0,s=0){this.x=t,this.y=e,this.z=s}set(t,e,s){return s===void 0&&(s=this.z),this.x=t,this.y=e,this.z=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){return t===0?this.x=e:t===1?this.y=e:this.z=e,this}getComponent(t){return t===0?this.x:t===1?this.y:this.z}clone(){return new S(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}applyEuler(t){return this.applyQuaternion(Xe.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Xe.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,s=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*s+r[6]*i,this.y=r[1]*e+r[4]*s+r[7]*i,this.z=r[2]*e+r[5]*s+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,s=this.y,i=this.z,r=t.elements,a=1/(r[3]*e+r[7]*s+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*s+r[8]*i+r[12])*a,this.y=(r[1]*e+r[5]*s+r[9]*i+r[13])*a,this.z=(r[2]*e+r[6]*s+r[10]*i+r[14])*a,this}applyQuaternion(t){const e=this.x,s=this.y,i=this.z,r=t.x,a=t.y,h=t.z,l=t.w,o=2*(a*i-h*s),c=2*(h*e-r*i),u=2*(r*s-a*e);return this.x=e+l*o+a*u-h*c,this.y=s+l*c+h*o-r*u,this.z=i+l*u+r*c-a*o,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,s=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*s+r[8]*i,this.y=r[1]*e+r[5]*s+r[9]*i,this.z=r[2]*e+r[6]*s+r[10]*i,this.normalize()}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Math.max(t,Math.min(e,s)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,s){return this.x=t.x+(e.x-t.x)*s,this.y=t.y+(e.y-t.y)*s,this.z=t.z+(e.z-t.z)*s,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const s=t.x,i=t.y,r=t.z,a=e.x,h=e.y,l=e.z;return this.x=i*l-r*h,this.y=r*a-s*l,this.z=s*h-i*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const s=t.dot(this)/e;return this.copy(t).multiplyScalar(s)}projectOnPlane(t){const e=this.dot(t)/(t.lengthSq()||1);return this.addScaledVector(t,-e)}reflect(t){return this.addScaledVector(t,-2*this.dot(t))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());return e===0?Math.PI/2:Math.acos(Math.max(-1,Math.min(1,this.dot(t)/e)))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,s=this.y-t.y,i=this.z-t.z;return e*e+s*s+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,s){const i=Math.sin(e)*t;return this.x=i*Math.sin(s),this.y=Math.cos(e)*t,this.z=i*Math.cos(s),this}setFromCylindricalCoords(t,e,s){return this.x=t*Math.sin(e),this.y=s,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),s=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.set(e,s,i)}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,s=Math.sqrt(1-e*e);return this.x=s*Math.cos(t),this.y=e,this.z=s*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}S.prototype.isVector3=!0;class G{constructor(t=0,e=0,s=0,i=1){this.x=t,this.y=e,this.z=s,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,s,i){return this.x=t,this.y=e,this.z=s,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){return this["xyzw"[t]]=e,this}getComponent(t){return this["xyzw"[t]]}clone(){return new G(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix4(t){const e=this.x,s=this.y,i=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*s+a[8]*i+a[12]*r,this.y=a[1]*e+a[5]*s+a[9]*i+a[13]*r,this.z=a[2]*e+a[6]*s+a[10]*i+a[14]*r,this.w=a[3]*e+a[7]*s+a[11]*i+a[15]*r,this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.dot(this)}length(){return Math.sqrt(this.dot(this))}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,s){return this.x=t.x+(e.x-t.x)*s,this.y=t.y+(e.y-t.y)*s,this.z=t.z+(e.z-t.z)*s,this.w=t.w+(e.w-t.w)*s,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}G.prototype.isVector4=!0;const _i=2e3,vt=2001,pe=new S,ct=new S,Yt=new S,q=new S,Si=new X,Ye=new S(1,1,1),Ze=new S;class N{constructor(t,e,s,i,r,a,h,l,o,c,u,f,m,x,d,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,s,i,r,a,h,l,o,c,u,f,m,x,d,g)}set(t,e,s,i,r,a,h,l,o,c,u,f,m,x,d,g){const y=this.elements;return y[0]=t,y[4]=e,y[8]=s,y[12]=i,y[1]=r,y[5]=a,y[9]=h,y[13]=l,y[2]=o,y[6]=c,y[10]=u,y[14]=f,y[3]=m,y[7]=x,y[11]=d,y[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)}clone(){return new N().fromArray(this.elements)}copy(t){const e=this.elements,s=t.elements;for(let i=0;i<16;i++)e[i]=s[i];return this}copyPosition(t){const e=this.elements,s=t.elements;return e[12]=s[12],e[13]=s[13],e[14]=s[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1)}extractBasis(t,e,s){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),s.setFromMatrixColumn(this,2),this}makeBasis(t,e,s){return this.set(t.x,e.x,s.x,0,t.y,e.y,s.y,0,t.z,e.z,s.z,0,0,0,0,1)}extractRotation(t){const e=this.elements,s=t.elements,i=1/pe.setFromMatrixColumn(t,0).length(),r=1/pe.setFromMatrixColumn(t,1).length(),a=1/pe.setFromMatrixColumn(t,2).length();return e[0]=s[0]*i,e[1]=s[1]*i,e[2]=s[2]*i,e[3]=0,e[4]=s[4]*r,e[5]=s[5]*r,e[6]=s[6]*r,e[7]=0,e[8]=s[8]*a,e[9]=s[9]*a,e[10]=s[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){return this.compose(Ze,Si.setFromEuler(t,!1),Ye)}makeRotationFromQuaternion(t){return this.compose(Ze,t,Ye)}lookAt(t,e,s){const i=this.elements;return q.subVectors(t,e),q.lengthSq()===0&&(q.z=1),q.normalize(),ct.crossVectors(s,q),ct.lengthSq()===0&&(Math.abs(s.z)===1?q.x+=1e-4:q.z+=1e-4,q.normalize(),ct.crossVectors(s,q)),ct.normalize(),Yt.crossVectors(q,ct),i[0]=ct.x,i[4]=Yt.x,i[8]=q.x,i[1]=ct.y,i[5]=Yt.y,i[9]=q.y,i[2]=ct.z,i[6]=Yt.z,i[10]=q.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const s=t.elements,i=e.elements,r=this.elements,a=s[0],h=s[4],l=s[8],o=s[12],c=s[1],u=s[5],f=s[9],m=s[13],x=s[2],d=s[6],g=s[10],y=s[14],w=s[3],v=s[7],_=s[11],k=s[15],I=i[0],p=i[4],M=i[8],b=i[12],C=i[1],T=i[5],E=i[9],z=i[13],A=i[2],P=i[6],F=i[10],D=i[14],V=i[3],K=i[7],xt=i[11],gt=i[15];return r[0]=a*I+h*C+l*A+o*V,r[4]=a*p+h*T+l*P+o*K,r[8]=a*M+h*E+l*F+o*xt,r[12]=a*b+h*z+l*D+o*gt,r[1]=c*I+u*C+f*A+m*V,r[5]=c*p+u*T+f*P+m*K,r[9]=c*M+u*E+f*F+m*xt,r[13]=c*b+u*z+f*D+m*gt,r[2]=x*I+d*C+g*A+y*V,r[6]=x*p+d*T+g*P+y*K,r[10]=x*M+d*E+g*F+y*xt,r[14]=x*b+d*z+g*D+y*gt,r[3]=w*I+v*C+_*A+k*V,r[7]=w*p+v*T+_*P+k*K,r[11]=w*M+v*E+_*F+k*xt,r[15]=w*b+v*z+_*D+k*gt,this}multiplyScalar(t){const e=this.elements;for(let s=0;s<16;s++)e[s]*=t;return this}determinant(){const t=this.elements,e=t[0],s=t[4],i=t[8],r=t[12],a=t[1],h=t[5],l=t[9],o=t[13],c=t[2],u=t[6],f=t[10],m=t[14],x=t[3],d=t[7],g=t[11],y=t[15],w=f*y-m*g,v=u*y-m*d,_=u*g-f*d,k=c*y-m*x,I=c*g-f*x,p=c*d-u*x;return e*(h*w-l*v+o*_)-s*(a*w-l*k+o*I)+i*(a*v-h*k+o*p)-r*(a*_-h*I+l*p)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,s){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=s),this}invert(){const t=this.elements,e=t[0],s=t[1],i=t[2],r=t[3],a=t[4],h=t[5],l=t[6],o=t[7],c=t[8],u=t[9],f=t[10],m=t[11],x=t[12],d=t[13],g=t[14],y=t[15],w=e*h-s*a,v=e*l-i*a,_=e*o-r*a,k=s*l-i*h,I=s*o-r*h,p=i*o-r*l,M=c*d-u*x,b=c*g-f*x,C=c*y-m*x,T=u*g-f*d,E=u*y-m*d,z=f*y-m*g,A=w*z-v*E+_*T+k*C-I*b+p*M;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/A;return t[0]=(h*z-l*E+o*T)*P,t[1]=(i*E-s*z-r*T)*P,t[2]=(d*p-g*I+y*k)*P,t[3]=(f*I-u*p-m*k)*P,t[4]=(l*C-a*z-o*b)*P,t[5]=(e*z-i*C+r*b)*P,t[6]=(g*_-x*p-y*v)*P,t[7]=(c*p-f*_+m*v)*P,t[8]=(a*E-h*C+o*M)*P,t[9]=(s*C-e*E-r*M)*P,t[10]=(x*I-d*_+y*w)*P,t[11]=(u*_-c*I-m*w)*P,t[12]=(h*b-a*T-l*M)*P,t[13]=(e*T-s*b+i*M)*P,t[14]=(d*v-x*k-g*w)*P,t[15]=(c*k-u*v+f*w)*P,this}scale(t){const e=this.elements;return e[0]*=t.x,e[4]*=t.y,e[8]*=t.z,e[1]*=t.x,e[5]*=t.y,e[9]*=t.z,e[2]*=t.x,e[6]*=t.y,e[10]*=t.z,e[3]*=t.x,e[7]*=t.y,e[11]*=t.z,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],s=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,s,i))}makeTranslation(t,e,s){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,s,0,0,0,1)}makeRotationX(t){const e=Math.cos(t),s=Math.sin(t);return this.set(1,0,0,0,0,e,-s,0,0,s,e,0,0,0,0,1)}makeRotationY(t){const e=Math.cos(t),s=Math.sin(t);return this.set(e,0,s,0,0,1,0,0,-s,0,e,0,0,0,0,1)}makeRotationZ(t){const e=Math.cos(t),s=Math.sin(t);return this.set(e,-s,0,0,s,e,0,0,0,0,1,0,0,0,0,1)}makeRotationAxis(t,e){const s=Math.cos(e),i=Math.sin(e),r=1-s,a=t.x,h=t.y,l=t.z,o=r*a,c=r*h;return this.set(o*a+s,o*h-i*l,o*l+i*h,0,o*h+i*l,c*h+s,c*l-i*a,0,o*l-i*h,c*l+i*a,r*l*l+s,0,0,0,0,1)}makeScale(t,e,s){return this.set(t,0,0,0,0,e,0,0,0,0,s,0,0,0,0,1)}makeShear(t,e,s,i,r,a){return this.set(1,s,r,0,t,1,a,0,e,i,1,0,0,0,0,1)}compose(t,e,s){const i=this.elements,r=e._x,a=e._y,h=e._z,l=e._w,o=r+r,c=a+a,u=h+h,f=r*o,m=r*c,x=r*u,d=a*c,g=a*u,y=h*u,w=l*o,v=l*c,_=l*u,k=s.x,I=s.y,p=s.z;return i[0]=(1-(d+y))*k,i[1]=(m+_)*k,i[2]=(x-v)*k,i[3]=0,i[4]=(m-_)*I,i[5]=(1-(f+y))*I,i[6]=(g+w)*I,i[7]=0,i[8]=(x+v)*p,i[9]=(g-w)*p,i[10]=(1-(f+d))*p,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,s){const i=this.elements;let r=Math.hypot(i[0],i[1],i[2]);const a=Math.hypot(i[4],i[5],i[6]),h=Math.hypot(i[8],i[9],i[10]);this.determinant()<0&&(r=-r),t.x=i[12],t.y=i[13],t.z=i[14];const l=zi.copy(this),o=l.elements,c=1/r,u=1/a,f=1/h;return o[0]*=c,o[1]*=c,o[2]*=c,o[4]*=u,o[5]*=u,o[6]*=u,o[8]*=f,o[9]*=f,o[10]*=f,e.setFromRotationMatrix(l),s.x=r,s.y=a,s.z=h,this}makePerspective(t,e,s,i,r,a,h=vt,l=!0){const o=this.elements,c=2*r/(e-t),u=2*r/(s-i),f=(e+t)/(e-t),m=(s+i)/(s-i);let x,d;const g=a===1/0;if(l){if(h!==vt)throw new Error("Matrix4.makePerspective: reversed depth requires WebGPU clip space");x=g?0:r/(a-r),d=g?r:a*r/(a-r)}else h===vt?(x=g?-1:-a/(a-r),d=g?-r:-a*r/(a-r)):(x=g?-1:-(a+r)/(a-r),d=g?-2*r:-2*a*r/(a-r));return o[0]=c,o[4]=0,o[8]=f,o[12]=0,o[1]=0,o[5]=u,o[9]=m,o[13]=0,o[2]=0,o[6]=0,o[10]=x,o[14]=d,o[3]=0,o[7]=0,o[11]=-1,o[15]=0,this}makeOrthographic(t,e,s,i,r,a,h=vt,l=!0){const o=this.elements,c=1/(e-t),u=1/(s-i),f=1/(a-r),m=(e+t)*c,x=(s+i)*u;let d,g;return l?(d=a*f,g=f):h===vt?(d=-r*f,g=-f):(d=-(a+r)*f,g=-2*f),o[0]=2*c,o[4]=0,o[8]=0,o[12]=-m,o[1]=0,o[5]=2*u,o[9]=0,o[13]=-x,o[2]=0,o[6]=0,o[10]=g,o[14]=d,o[3]=0,o[7]=0,o[11]=0,o[15]=1,this}equals(t){for(let e=0;e<16;e++)if(this.elements[e]!==t.elements[e])return!1;return!0}fromArray(t,e=0){for(let s=0;s<16;s++)this.elements[s]=t[s+e];return this}toArray(t=[],e=0){const s=this.elements;for(let i=0;i<16;i++)t[e+i]=s[i];return t}}N.prototype.isMatrix4=!0;const zi=new N,Ke=new N,Je=new X,St=n=>Math.max(-1,Math.min(1,n));class pt{constructor(t=0,e=0,s=0,i=pt.DEFAULT_ORDER){this._x=t,this._y=e,this._z=s,this._order=i,this._onChangeCallback=Pi}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,s,i=this._order){return this._x=t,this._y=e,this._z=s,this._order=i,this._onChangeCallback(),this}clone(){return new pt(this._x,this._y,this._z,this._order)}copy(t){return this.set(t._x,t._y,t._z,t._order)}setFromRotationMatrix(t,e=this._order,s=!0){const i=t.elements,r=i[0],a=i[4],h=i[8],l=i[1],o=i[5],c=i[9],u=i[2],f=i[6],m=i[10],x=.9999999;switch(e){case"XYZ":this._y=Math.asin(St(h)),Math.abs(h)<x?(this._x=Math.atan2(-c,m),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,o),this._z=0);break;case"YXZ":this._x=Math.asin(-St(c)),Math.abs(c)<x?(this._y=Math.atan2(h,m),this._z=Math.atan2(l,o)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(St(f)),Math.abs(f)<x?(this._y=Math.atan2(-u,m),this._z=Math.atan2(-a,o)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-St(u)),Math.abs(u)<x?(this._x=Math.atan2(f,m),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,o));break;case"YZX":this._z=Math.asin(St(l)),Math.abs(l)<x?(this._x=Math.atan2(-c,o),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(h,m));break;case"XZY":this._z=Math.asin(-St(a)),Math.abs(a)<x?(this._x=Math.atan2(f,o),this._y=Math.atan2(h,r)):(this._x=Math.atan2(-c,m),this._y=0);break;default:throw new Error("Euler.setFromRotationMatrix: unknown order "+e)}return this._order=e,s&&this._onChangeCallback(),this}setFromQuaternion(t,e,s){return Ke.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Ke,e,s)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Je.setFromEuler(this),this.setFromQuaternion(Je,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}function Pi(){}pt.DEFAULT_ORDER="XYZ";pt.prototype.isEuler=!0;class _t{constructor(t,e,s,i,r,a,h,l,o){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,s,i,r,a,h,l,o)}set(t,e,s,i,r,a,h,l,o){const c=this.elements;return c[0]=t,c[1]=i,c[2]=h,c[3]=e,c[4]=r,c[5]=l,c[6]=s,c[7]=a,c[8]=o,this}identity(){return this.set(1,0,0,0,1,0,0,0,1)}copy(t){const e=this.elements,s=t.elements;for(let i=0;i<9;i++)e[i]=s[i];return this}clone(){return new _t().fromArray(this.elements)}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10])}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const s=t.elements,i=e.elements,r=this.elements,a=s[0],h=s[3],l=s[6],o=s[1],c=s[4],u=s[7],f=s[2],m=s[5],x=s[8],d=i[0],g=i[3],y=i[6],w=i[1],v=i[4],_=i[7],k=i[2],I=i[5],p=i[8];return r[0]=a*d+h*w+l*k,r[3]=a*g+h*v+l*I,r[6]=a*y+h*_+l*p,r[1]=o*d+c*w+u*k,r[4]=o*g+c*v+u*I,r[7]=o*y+c*_+u*p,r[2]=f*d+m*w+x*k,r[5]=f*g+m*v+x*I,r[8]=f*y+m*_+x*p,this}multiplyScalar(t){const e=this.elements;for(let s=0;s<9;s++)e[s]*=t;return this}determinant(){const t=this.elements,e=t[0],s=t[1],i=t[2],r=t[3],a=t[4],h=t[5],l=t[6],o=t[7],c=t[8];return e*a*c-e*h*o-s*r*c+s*h*l+i*r*o-i*a*l}invert(){const t=this.elements,e=t[0],s=t[1],i=t[2],r=t[3],a=t[4],h=t[5],l=t[6],o=t[7],c=t[8],u=c*a-h*o,f=h*l-c*r,m=o*r-a*l,x=e*u+s*f+i*m;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);const d=1/x;return t[0]=u*d,t[1]=(i*o-c*s)*d,t[2]=(h*s-i*a)*d,t[3]=f*d,t[4]=(c*e-i*l)*d,t[5]=(i*r-h*e)*d,t[6]=m*d,t[7]=(s*l-o*e)*d,t[8]=(a*e-s*r)*d,this}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}makeTranslation(t,e){return t.isVector2&&(e=t.y,t=t.x),this.set(1,0,t,0,1,e,0,0,1)}makeRotation(t){const e=Math.cos(t),s=Math.sin(t);return this.set(e,-s,0,s,e,0,0,0,1)}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1)}setUvTransform(t,e,s,i,r,a,h){const l=Math.cos(r),o=Math.sin(r);return this.set(s*l,s*o,-s*(l*a+o*h)+a+t,-i*o,i*l,-i*(-o*a+l*h)+h+e,0,0,1)}scale(t,e){return this.premultiply(ye.makeScale(t,e))}rotate(t){return this.premultiply(ye.makeRotation(-t))}translate(t,e){return this.premultiply(ye.makeTranslation(t,e))}equals(t){for(let e=0;e<9;e++)if(this.elements[e]!==t.elements[e])return!1;return!0}fromArray(t,e=0){for(let s=0;s<9;s++)this.elements[s]=t[s+e];return this}toArray(t=[],e=0){for(let s=0;s<9;s++)t[e+s]=this.elements[s];return t}}_t.prototype.isMatrix3=!0;const ye=new _t,st="srgb",Zt="srgb-linear",zt=n=>n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4),Y=n=>n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055,Et=n=>Math.max(0,Math.min(1,n)),Ai=(n,t)=>(n%t+t)%t;function xe(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}const Kt={h:0,s:0,l:0};class at{constructor(t,e,s){this.r=1,this.g=1,this.b=1,this.set(t,e,s)}set(t,e,s){if(e===void 0&&s===void 0){if(t===void 0)return this;t&&t.isColor?this.copy(t):typeof t=="number"?this.setHex(t):typeof t=="string"&&this.setStyle(t)}else this.setRGB(t,e,s);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=st){return t=Math.floor(t),this.setRGB((t>>16&255)/255,(t>>8&255)/255,(t&255)/255,e)}setRGB(t,e,s,i=Zt){return i===st&&(t=zt(t),e=zt(e),s=zt(s)),this.r=t,this.g=e,this.b=s,this}setHSL(t,e,s,i=Zt){if(t=Ai(t,1),e=Et(e),s=Et(s),e===0)return this.setRGB(s,s,s,i);const r=s<=.5?s*(1+e):s+e-s*e,a=2*s-r;return this.setRGB(xe(a,r,t+1/3),xe(a,r,t),xe(a,r,t-1/3),i)}setStyle(t,e=st){let s;if(s=/^#([A-Fa-f\d]+)$/.exec(t)){const i=s[1];if(i.length===3)return this.setRGB(parseInt(i[0],16)/15,parseInt(i[1],16)/15,parseInt(i[2],16)/15,e);if(i.length===6)return this.setHex(parseInt(i,16),e)}else if(s=/^rgba?\(\s*([\d.]+)(%?)\s*,\s*([\d.]+)%?\s*,\s*([\d.]+)%?\s*(?:,\s*[\d.]+\s*)?\)$/.exec(t)){const i=s[2]==="%"?100:255;return this.setRGB(Math.min(1,s[1]/i),Math.min(1,s[3]/i),Math.min(1,s[4]/i),e)}else{if(s=/^hsla?\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*(?:,\s*[\d.]+\s*)?\)$/.exec(t))return this.setHSL(s[1]/360,s[2]/100,s[3]/100,e);if(Ae[t.toLowerCase()]!==void 0)return this.setHex(Ae[t.toLowerCase()],e)}return console.warn("Color: unknown color "+t),this}clone(){return new at(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=zt(t.r),this.g=zt(t.g),this.b=zt(t.b),this}copyLinearToSRGB(t){return this.r=Y(t.r),this.g=Y(t.g),this.b=Y(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this)}convertLinearToSRGB(){return this.copyLinearToSRGB(this)}getHex(t=st){let e=this.r,s=this.g,i=this.b;return t===st&&(e=Y(e),s=Y(s),i=Y(i)),Math.round(Et(e)*255)*65536+Math.round(Et(s)*255)*256+Math.round(Et(i)*255)}getHexString(t=st){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Zt){let s=this.r,i=this.g,r=this.b;e===st&&(s=Y(s),i=Y(i),r=Y(r));const a=Math.max(s,i,r),h=Math.min(s,i,r);let l=0,o=0;const c=(h+a)/2;if(h!==a){const u=a-h;o=c<=.5?u/(a+h):u/(2-a-h),a===s?l=(i-r)/u+(i<r?6:0):a===i?l=(r-s)/u+2:l=(s-i)/u+4,l/=6}return t.h=l,t.s=o,t.l=c,t}getRGB(t,e=Zt){return t.r=this.r,t.g=this.g,t.b=this.b,e===st&&(t.r=Y(t.r),t.g=Y(t.g),t.b=Y(t.b)),t}getStyle(t=st){const e=this.getRGB({},t);return`rgb(${Math.round(e.r*255)},${Math.round(e.g*255)},${Math.round(e.b*255)})`}offsetHSL(t,e,s){return this.getHSL(Kt),this.setHSL(Kt.h+t,Kt.s+e,Kt.l+s)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,s){return this.r=t.r+(e.r-t.r)*s,this.g=t.g+(e.g-t.g)*s,this.b=t.b+(e.b-t.b)*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}at.prototype.isColor=!0;const Ae={black:0,white:16777215,red:16711680,green:32768,lime:65280,blue:255,yellow:16776960,cyan:65535,magenta:16711935,gray:8421504,grey:8421504,orange:16753920};at.NAMES=Ae;const tt=new S,it=Array.from({length:8},()=>new S);class ht{constructor(t=new S(1/0,1/0,1/0),e=new S(-1/0,-1/0,-1/0)){this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0;e<t.length;e+=3)this.expandByPoint(tt.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0;e<t.count;e++)this.expandByPoint(tt.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(const e of t)this.expandByPoint(e);return this}setFromCenterAndSize(t,e){return tt.copy(e).multiplyScalar(.5),this.min.copy(t).sub(tt),this.max.copy(t).add(tt),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new ht().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const s=t.geometry;if(s!==void 0){const i=s.getAttribute("position");if(e&&i!==void 0)for(let r=0;r<i.count;r++)this.expandByPoint(tt.fromBufferAttribute(i,r).applyMatrix4(t.matrixWorld));else s.boundingBox===null&&s.computeBoundingBox(),Qe.copy(s.boundingBox).applyMatrix4(t.matrixWorld),this.union(Qe)}for(const i of t.children)this.expandByObject(i,e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,tt),tt.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,s;const i=t.normal;return i.x>0?(e=i.x*this.min.x,s=i.x*this.max.x):(e=i.x*this.max.x,s=i.x*this.min.x),i.y>0?(e+=i.y*this.min.y,s+=i.y*this.max.y):(e+=i.y*this.max.y,s+=i.y*this.min.y),i.z>0?(e+=i.z*this.min.z,s+=i.z*this.max.z):(e+=i.z*this.max.z,s+=i.z*this.min.z),e<=-t.constant&&s>=-t.constant}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,tt).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?(t.makeEmpty(),t):(this.getCenter(t.center),t.radius=this.getSize(tt).length()*.5,t)}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){if(this.isEmpty())return this;const e=this.min,s=this.max;return it[0].set(e.x,e.y,e.z).applyMatrix4(t),it[1].set(e.x,e.y,s.z).applyMatrix4(t),it[2].set(e.x,s.y,e.z).applyMatrix4(t),it[3].set(e.x,s.y,s.z).applyMatrix4(t),it[4].set(s.x,e.y,e.z).applyMatrix4(t),it[5].set(s.x,e.y,s.z).applyMatrix4(t),it[6].set(s.x,s.y,e.z).applyMatrix4(t),it[7].set(s.x,s.y,s.z).applyMatrix4(t),this.setFromPoints(it)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}ht.prototype.isBox3=!0;const Qe=new ht,Ci=new ht,ge=new S;class yt{constructor(t=new S,e=-1){this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){e!==void 0?this.center.copy(e):Ci.setFromPoints(t).getCenter(this.center);let s=0;for(const i of t)s=Math.max(s,this.center.distanceToSquared(i));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}clone(){return new yt().copy(this)}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const s=this.center.distanceToSquared(t);return e.copy(t),s>this.radius*this.radius&&e.sub(this.center).normalize().multiplyScalar(this.radius).add(this.center),e}getBoundingBox(t){return this.isEmpty()?t.makeEmpty():(t.set(this.center,this.center),t.expandByScalar(this.radius))}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius*=t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ge.subVectors(t,this.center);const e=ge.lengthSq();if(e>this.radius*this.radius){const s=Math.sqrt(e),i=(s-this.radius)*.5;this.center.addScaledVector(ge,i/s),this.radius+=i}return this}union(t){if(t.isEmpty())return this;if(this.isEmpty())return this.copy(t);const e=this.center.distanceTo(t.center);if(e+t.radius<=this.radius)return this;if(e+this.radius<=t.radius)return this.copy(t);const s=(e+this.radius+t.radius)*.5;return this.center.lerp(t.center,(s-this.radius)/e),this.radius=s,this}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}}yt.prototype.isSphere=!0;const ts=new S,ki=new S,Ii=new _t;class nt{constructor(t=new S(1,0,0),e=0){this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,s,i){return this.normal.set(t,e,s),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(t),this}setFromCoplanarPoints(t,e,s){const i=ts.subVectors(s,e).cross(ki.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t)}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}clone(){return new nt().copy(this)}normalize(){const t=this.normal.length();if(t===0)return this;const e=1/t;return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}applyMatrix4(t,e){const s=e||Ii.getNormalMatrix(t),i=this.coplanarPoint(ts).applyMatrix4(t),r=this.normal.applyMatrix3(s).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}}nt.prototype.isPlane=!0;const es=new yt,Jt=new S;class Ee{constructor(t=new nt,e=new nt,s=new nt,i=new nt,r=new nt,a=new nt){this.planes=[t,e,s,i,r,a]}set(t,e,s,i,r,a){const h=this.planes;return h[0].copy(t),h[1].copy(e),h[2].copy(s),h[3].copy(i),h[4].copy(r),h[5].copy(a),this}copy(t){for(let e=0;e<6;e++)this.planes[e].copy(t.planes[e]);return this}clone(){return new Ee().copy(this)}setFromProjectionMatrix(t,e=vt,s=!0){const i=this.planes,r=t.elements,a=r[0],h=r[4],l=r[8],o=r[12],c=r[1],u=r[5],f=r[9],m=r[13],x=r[2],d=r[6],g=r[10],y=r[14],w=r[3],v=r[7],_=r[11],k=r[15];return i[0].setComponents(w+a,v+h,_+l,k+o).normalize(),i[1].setComponents(w-a,v-h,_-l,k-o).normalize(),i[2].setComponents(w+c,v+u,_+f,k+m).normalize(),i[3].setComponents(w-c,v-u,_-f,k-m).normalize(),s?(i[4].setComponents(w-x,v-d,_-g,k-y).normalize(),i[5].setComponents(x,d,g,y).normalize()):e===_i?(i[4].setComponents(w+x,v+d,_+g,k+y).normalize(),i[5].setComponents(w-x,v-d,_-g,k-y).normalize()):(i[4].setComponents(x,d,g,y).normalize(),i[5].setComponents(w-x,v-d,_-g,k-y).normalize()),this}intersectsObject(t){const e=t.geometry;return e.boundingSphere===null&&e.computeBoundingSphere(),es.copy(e.boundingSphere).applyMatrix4(t.matrixWorld),this.intersectsSphere(es)}intersectsSphere(t){const e=this.planes,s=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(s)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let s=0;s<6;s++){const i=e[s].normal;if(Jt.x=i.x>0?t.max.x:t.min.x,Jt.y=i.y>0?t.max.y:t.min.y,Jt.z=i.z>0?t.max.z:t.min.z,e[s].distanceToPoint(Jt)<0)return!1}return!0}containsPoint(t){for(let e=0;e<6;e++)if(this.planes[e].distanceToPoint(t)<0)return!1;return!0}}const Ti=new Float32Array(1);new Uint32Array(Ti.buffer);class ce{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const s=this._listeners;s[t]===void 0&&(s[t]=[]),s[t].includes(e)||s[t].push(e)}hasEventListener(t,e){const s=this._listeners;return s!==void 0&&s[t]!==void 0&&s[t].includes(e)}removeEventListener(t,e){const s=this._listeners&&this._listeners[t];if(s===void 0)return;const i=s.indexOf(e);i!==-1&&s.splice(i,1)}dispatchEvent(t){const e=this._listeners&&this._listeners[t.type];if(e!==void 0){t.target=this;for(const s of e.slice())s.call(this,t);t.target=null}}}class Bi{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Fi=0;const ss=new S,Pt=new X,rt=new N,Qt=new S,Rt=new S,Ni=new S,Ei=new X,is=new S(1,0,0),rs=new S(0,1,0),ns=new S(0,0,1),as={type:"added"},Ri={type:"removed"},ve={type:"childadded",child:null},we={type:"childremoved",child:null};class j extends ce{constructor(){super(),Object.defineProperty(this,"id",{value:Fi++}),this.uuid=Ne(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=j.DEFAULT_UP.clone();const t=new S,e=new pt,s=new X,i=new S(1,1,1);e._onChange(()=>s.setFromEuler(e,!1)),s._onChange(()=>e.setFromQuaternion(s,void 0,!1)),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:s},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new N},normalMatrix:{value:new _t}}),this.matrix=new N,this.matrixWorld=new N,this.matrixAutoUpdate=j.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=j.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Bi,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.userData={}}onBeforeRender(){}onAfterRender(){}onBeforeShadow(){}onAfterShadow(){}dispose(){this.dispatchEvent({type:"dispose"})}applyMatrix4(t){return this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale),this}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Pt.setFromAxisAngle(t,e),this.quaternion.multiply(Pt),this}rotateOnWorldAxis(t,e){return Pt.setFromAxisAngle(t,e),this.quaternion.premultiply(Pt),this}rotateX(t){return this.rotateOnAxis(is,t)}rotateY(t){return this.rotateOnAxis(rs,t)}rotateZ(t){return this.rotateOnAxis(ns,t)}translateOnAxis(t,e){return ss.copy(t).applyQuaternion(this.quaternion),this.position.add(ss.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(is,t)}translateY(t){return this.translateOnAxis(rs,t)}translateZ(t){return this.translateOnAxis(ns,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(rt.copy(this.matrixWorld).invert())}lookAt(t,e,s){t.isVector3?Qt.copy(t):Qt.set(t,e,s);const i=this.parent;this.updateWorldMatrix(!0,!1),Rt.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?rt.lookAt(Rt,Qt,this.up):rt.lookAt(Qt,Rt,this.up),this.quaternion.setFromRotationMatrix(rt),i&&(rt.extractRotation(i.matrixWorld),Pt.setFromRotationMatrix(rt),this.quaternion.premultiply(Pt.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?this:(t&&t.isObject3D&&(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(as),ve.child=t,this.dispatchEvent(ve),ve.child=null),this)}remove(t){if(arguments.length>1){for(let s=0;s<arguments.length;s++)this.remove(arguments[s]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Ri),we.child=t,this.dispatchEvent(we),we.child=null),this}removeFromParent(){return this.parent!==null&&this.parent.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),rt.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),rt.multiply(t.parent.matrixWorld)),t.applyMatrix4(rt),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(as),this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(const s of this.children){const i=s.getObjectByProperty(t,e);if(i!==void 0)return i}}getObjectsByProperty(t,e,s=[]){this[t]===e&&s.push(this);for(const i of this.children)i.getObjectsByProperty(t,e,s);return s}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Rt,t,Ni),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Rt,Ei,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}traverse(t){t(this);const e=this.children;for(let s=0,i=e.length;s<i;s++)e[s].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let s=0,i=e.length;s<i;s++)e[s].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let s=0,i=e.length;s<i;s++){const r=e[s];(r.matrixWorldAutoUpdate===!0||t===!0)&&r.updateMatrixWorld(t)}}updateWorldMatrix(t,e){const s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(s===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(s.matrixWorld,this.matrix)),e===!0){const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].matrixWorldAutoUpdate===!0&&i[r].updateWorldMatrix(!1,!0)}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,t.onBeforeRender!==j.prototype.onBeforeRender&&(this.onBeforeRender=t.onBeforeRender),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(const s of t.children)this.add(s.clone());return this}}j.DEFAULT_UP=new S(0,1,0);j.DEFAULT_MATRIX_AUTO_UPDATE=!0;j.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;j.prototype.isObject3D=!0;class Di extends j{constructor(){super(),this.type="Group"}}Di.prototype.isGroup=!0;class Gs extends j{constructor(){super(),this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new pt,this.environmentIntensity=1,this.environmentRotation=new pt,this.overrideMaterial=null}copy(t,e){return super.copy(t,e),this.background=t.background,this.environment=t.environment,this.fog=t.fog,this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentRotation.copy(t.environmentRotation),this.environmentIntensity=t.environmentIntensity,this.overrideMaterial=t.overrideMaterial,this.matrixAutoUpdate=t.matrixAutoUpdate,this}}Gs.prototype.isScene=!0;const $s=35044,U=new S,be=new R,Hs={getComponent(n,t){const e=this.array[this._idx(n,t)];return this.normalized?wi(e,this.array):e},setComponent(n,t,e){return this.array[this._idx(n,t)]=this.normalized?bi(e,this.array):e,this},getX(n){return this.getComponent(n,0)},getY(n){return this.getComponent(n,1)},getZ(n){return this.getComponent(n,2)},getW(n){return this.getComponent(n,3)},setX(n,t){return this.setComponent(n,0,t)},setY(n,t){return this.setComponent(n,1,t)},setZ(n,t){return this.setComponent(n,2,t)},setW(n,t){return this.setComponent(n,3,t)},setXY(n,t,e){return this.setComponent(n,0,t),this.setComponent(n,1,e)},setXYZ(n,t,e,s){return this.setComponent(n,0,t),this.setComponent(n,1,e),this.setComponent(n,2,s)},setXYZW(n,t,e,s,i){return this.setComponent(n,0,t),this.setComponent(n,1,e),this.setComponent(n,2,s),this.setComponent(n,3,i)},applyMatrix3(n){if(this.itemSize===2)for(let t=0;t<this.count;t++)be.fromBufferAttribute(this,t).applyMatrix3(n),this.setXY(t,be.x,be.y);else if(this.itemSize===3)for(let t=0;t<this.count;t++)U.fromBufferAttribute(this,t).applyMatrix3(n),this.setXYZ(t,U.x,U.y,U.z);return this},applyMatrix4(n){for(let t=0;t<this.count;t++)U.fromBufferAttribute(this,t).applyMatrix4(n),this.setXYZ(t,U.x,U.y,U.z);return this},applyNormalMatrix(n){for(let t=0;t<this.count;t++)U.fromBufferAttribute(this,t).applyNormalMatrix(n),this.setXYZ(t,U.x,U.y,U.z);return this},transformDirection(n){for(let t=0;t<this.count;t++)U.fromBufferAttribute(this,t).transformDirection(n),this.setXYZ(t,U.x,U.y,U.z);return this}};class et extends ce{constructor(t,e,s=!1){if(super(),Array.isArray(t))throw new TypeError("BufferAttribute: array should be a Typed Array.");this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=s,this.usage=$s,this.updateRanges=[],this.gpuType=1015,this.version=0,this.onUploadCallback=qs}set needsUpdate(t){t===!0&&this.version++}_idx(t,e){return t*this.itemSize+e}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}onUpload(t){return this.onUploadCallback=t,this}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,s){const i=this.itemSize;t*=i,s*=e.itemSize;for(let r=0;r<i;r++)this.array[t+r]=e.array[s+r];return this}copyArray(t){return this.array.set(t),this}set(t,e=0){return this.array.set(t,e),this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}dispose(){this.dispatchEvent({type:"dispose"})}}Object.assign(et.prototype,Hs);et.prototype.isBufferAttribute=!0;function qs(){}class Li extends et{constructor(t,e,s){super(new Uint16Array(t),e,s)}}class Ui extends et{constructor(t,e,s){super(new Uint32Array(t),e,s)}}class bt extends et{constructor(t,e,s){super(new Float32Array(t),e,s)}}class Mt extends et{constructor(t,e,s,i=1){super(t,e,s),this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}clone(){return new Mt(this.array,this.itemSize).copy(this)}}Mt.prototype.isInstancedBufferAttribute=!0;class js extends ce{constructor(t,e){super(),this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=$s,this.updateRanges=[],this.version=0,this.uuid=Ne(),this.onUploadCallback=qs}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}set(t,e=0){return this.array.set(t,e),this}onUpload(t){return this.onUploadCallback=t,this}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,s){t*=this.stride,s*=e.stride;for(let i=0;i<this.stride;i++)this.array[t+i]=e.array[s+i];return this}clone(){return new this.constructor(new this.array.constructor(this.array),this.stride).copy(this)}dispose(){this.dispatchEvent({type:"dispose"})}}js.prototype.isInterleavedBuffer=!0;class Re extends js{constructor(t,e,s=1){super(t,e),this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}clone(){return new Re(new this.array.constructor(this.array),this.stride,this.meshPerAttribute)}}Re.prototype.isInstancedInterleavedBuffer=!0;class Xs{constructor(t,e,s,i=!1){this.name="",this.data=t,this.itemSize=e,this.offset=s,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}_idx(t,e){return t*this.data.stride+this.offset+e}clone(){const t=new this.array.constructor(this.count*this.itemSize);for(let e=0;e<this.count;e++)for(let s=0;s<this.itemSize;s++)t[e*this.itemSize+s]=this.array[this._idx(e,s)];return new et(t,this.itemSize,this.normalized)}}Object.assign(Xs.prototype,Hs);Xs.prototype.isInterleavedBufferAttribute=!0;let Oi=0;const ut=new N,Vi=new _t,os=new X,Wi=new ht,At=new S,te=new S;function Gi(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}class ot extends ce{constructor(){super(),Object.defineProperty(this,"id",{value:Oi++}),this.uuid=Ne(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Gi(t)?Ui:Li)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this.attributesVersion=(this.attributesVersion||0)+1,this}deleteAttribute(t){return delete this.attributes[t],this.attributesVersion=(this.attributesVersion||0)+1,this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,s=0){this.groups.push({start:t,count:e,materialIndex:s})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const s=this.attributes.normal;s!==void 0&&(s.applyNormalMatrix(Vi.getNormalMatrix(t)),s.needsUpdate=!0);const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return this.applyMatrix4(ut.makeRotationFromQuaternion(t))}rotateX(t){return this.applyMatrix4(ut.makeRotationX(t))}rotateY(t){return this.applyMatrix4(ut.makeRotationY(t))}rotateZ(t){return this.applyMatrix4(ut.makeRotationZ(t))}translate(t,e,s){return this.applyMatrix4(ut.makeTranslation(t,e,s))}scale(t,e,s){return this.applyMatrix4(ut.makeScale(t,e,s))}lookAt(t){return ut.lookAt(t,At.set(0,0,0),new S(0,1,0)),os.setFromRotationMatrix(ut),this.applyQuaternion(os)}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(te).negate(),this.translate(te.x,te.y,te.z)}setFromPoints(t){const e=[];for(const s of t)e.push(s.x,s.y,s.z||0);return this.setAttribute("position",new bt(e,3))}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ht);const t=this.attributes.position;if(t===void 0){this.boundingBox.makeEmpty();return}this.boundingBox.setFromBufferAttribute(t)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new yt);const t=this.attributes.position;if(t===void 0){this.boundingSphere.makeEmpty();return}const e=this.boundingSphere.center;Wi.setFromBufferAttribute(t).getCenter(e);let s=0;for(let i=0;i<t.count;i++)s=Math.max(s,e.distanceToSquared(At.fromBufferAttribute(t,i)));this.boundingSphere.radius=Math.sqrt(s)}computeTangents(){const t=this.index,e=this.attributes.position,s=this.attributes.normal,i=this.attributes.uv;if(t===null||e===void 0||s===void 0||i===void 0){console.error("BufferGeometry.computeTangents(): missing required attributes (index, position, normal or uv)");return}const r=e.count;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new et(new Float32Array(4*r),4));const a=this.getAttribute("tangent"),h=[],l=[];for(let M=0;M<r;M++)h[M]=new S,l[M]=new S;const o=new S,c=new S,u=new S,f=new R,m=new R,x=new R,d=new S,g=new S,y=(M,b,C)=>{o.fromBufferAttribute(e,M),c.fromBufferAttribute(e,b),u.fromBufferAttribute(e,C),f.fromBufferAttribute(i,M),m.fromBufferAttribute(i,b),x.fromBufferAttribute(i,C),c.sub(o),u.sub(o),m.sub(f),x.sub(f);const T=1/(m.x*x.y-x.x*m.y);isFinite(T)&&(d.copy(c).multiplyScalar(x.y).addScaledVector(u,-m.y).multiplyScalar(T),g.copy(u).multiplyScalar(m.x).addScaledVector(c,-x.x).multiplyScalar(T),h[M].add(d),h[b].add(d),h[C].add(d),l[M].add(g),l[b].add(g),l[C].add(g))},w=this.groups.length?this.groups:[{start:0,count:t.count}];for(const M of w)for(let b=M.start;b<M.start+M.count;b+=3)y(t.getX(b),t.getX(b+1),t.getX(b+2));const v=new S,_=new S,k=new S,I=new S,p=M=>{_.fromBufferAttribute(s,M),k.copy(_);const b=h[M];v.copy(b).sub(_.multiplyScalar(_.dot(b))).normalize(),I.crossVectors(k,b);const C=I.dot(l[M])<0?-1:1;a.setXYZW(M,v.x,v.y,v.z,C)};for(const M of w)for(let b=M.start;b<M.start+M.count;b++)p(t.getX(b))}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e===void 0)return;let s=this.getAttribute("normal");if(s===void 0||s.count!==e.count)s=new et(new Float32Array(e.count*3),3),this.setAttribute("normal",s);else for(let f=0;f<s.count;f++)s.setXYZ(f,0,0,0);const i=new S,r=new S,a=new S,h=new S,l=new S,o=new S,c=new S,u=new S;if(t)for(let f=0,m=t.count;f<m;f+=3){const x=t.getX(f),d=t.getX(f+1),g=t.getX(f+2);i.fromBufferAttribute(e,x),r.fromBufferAttribute(e,d),a.fromBufferAttribute(e,g),h.subVectors(a,r),l.subVectors(i,r),h.cross(l),o.fromBufferAttribute(s,x),c.fromBufferAttribute(s,d),u.fromBufferAttribute(s,g),o.add(h),c.add(h),u.add(h),s.setXYZ(x,o.x,o.y,o.z),s.setXYZ(d,c.x,c.y,c.z),s.setXYZ(g,u.x,u.y,u.z)}else for(let f=0,m=e.count;f<m;f+=3)i.fromBufferAttribute(e,f),r.fromBufferAttribute(e,f+1),a.fromBufferAttribute(e,f+2),h.subVectors(a,r),l.subVectors(i,r),h.cross(l),s.setXYZ(f,h.x,h.y,h.z),s.setXYZ(f+1,h.x,h.y,h.z),s.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),s.needsUpdate=!0}normalizeNormals(){const t=this.attributes.normal;for(let e=0,s=t.count;e<s;e++)At.fromBufferAttribute(t,e).normalize(),t.setXYZ(e,At.x,At.y,At.z)}toNonIndexed(){if(this.index===null)return console.warn("BufferGeometry.toNonIndexed(): geometry is already non-indexed."),this;const t=new ot,e=this.index,s=i=>{const r=i.itemSize,a=new i.array.constructor(e.count*r);for(let h=0;h<e.count;h++){const l=e.getX(h);for(let o=0;o<r;o++)a[h*r+o]=i.array[i._idx(l,o)]}return new et(a,r,i.normalized)};for(const i in this.attributes)t.setAttribute(i,s(this.attributes[i]));for(const i in this.morphAttributes)t.morphAttributes[i]=this.morphAttributes[i].map(s);t.morphTargetsRelative=this.morphTargetsRelative;for(const i of this.groups)t.addGroup(i.start,i.count,i.materialIndex);return t}clone(){return new ot().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.name=t.name,t.index!==null&&this.setIndex(t.index.clone());for(const e in t.attributes)this.setAttribute(e,t.attributes[e].clone());for(const e in t.morphAttributes)this.morphAttributes[e]=t.morphAttributes[e].map(s=>s.clone());this.morphTargetsRelative=t.morphTargetsRelative;for(const e of t.groups)this.addGroup(e.start,e.count,e.materialIndex);return t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}ot.prototype.isBufferGeometry=!0;class De extends ot{constructor(){super(),this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}clone(){return new De().copy(this)}}De.prototype.isInstancedBufferGeometry=!0;class Le extends j{constructor(t=new ot,e=null){super(),this.type="Mesh",this.geometry=t,this.material=e,this.count=1}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this.count=t.count,this}}Le.prototype.isMesh=!0;const Dt=new N,hs=new ht,ls=new yt;class wt extends Le{constructor(t,e,s){super(t,e),this.type="InstancedMesh",this.instanceMatrix=new Mt(new Float32Array(s*16),16),this.instanceColor=null,this.count=s,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<s;i++)this.setMatrixAt(i,Dt.identity())}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}getColorAt(t,e){return e.fromArray(this.instanceColor.array,t*3)}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Mt(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}computeBoundingBox(){const t=this.geometry;this.boundingBox===null&&(this.boundingBox=new ht),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let e=0;e<this.count;e++)this.getMatrixAt(e,Dt),hs.copy(t.boundingBox).applyMatrix4(Dt),this.boundingBox.union(hs)}computeBoundingSphere(){const t=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new yt),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let e=0;e<this.count;e++)this.getMatrixAt(e,Dt),ls.copy(t.boundingSphere).applyMatrix4(Dt),this.boundingSphere.union(ls)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}clone(t){return new wt(this.geometry,this.material,this.count).copy(this,t)}dispose(){this.dispatchEvent({type:"dispose"})}}wt.prototype.isInstancedMesh=!0;const ft=new S,cs=new R,us=new R;class Ue extends j{constructor(){super(),this.type="Camera",this.matrixWorldInverse=new N,this.projectionMatrix=new N,this.projectionMatrixInverse=new N,this.coordinateSystem=vt,this.reversedDepth=!0}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this.reversedDepth=t.reversedDepth,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}Ue.prototype.isCamera=!0;function Ys(n,t,e,s,i,r,a){n.view===null&&(n.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1});const h=n.view;h.enabled=!0,h.fullWidth=t,h.fullHeight=e,h.offsetX=s,h.offsetY=i,h.width=r,h.height=a,n.updateProjectionMatrix()}class Zs extends Ue{constructor(t=50,e=1,s=.1,i=2e3){super(),this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=s,this.far=i,this.infiniteFar=!1,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.infiniteFar=t.infiniteFar,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=je*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){return .5*this.getFilmHeight()/Math.tan(me*.5*this.fov)}getEffectiveFOV(){return je*2*Math.atan(Math.tan(me*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,s){ft.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ft.x,ft.y).multiplyScalar(-t/ft.z),ft.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),s.set(ft.x,ft.y).multiplyScalar(-t/ft.z)}getViewSize(t,e){return this.getViewBounds(t,cs,us),e.subVectors(us,cs)}setViewOffset(t,e,s,i,r,a){this.aspect=t/e,Ys(this,t,e,s,i,r,a)}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(me*.5*this.fov)/this.zoom,s=2*e,i=this.aspect*s,r=-.5*i;const a=this.view;if(a!==null&&a.enabled){const o=a.fullWidth,c=a.fullHeight;r+=a.offsetX*i/o,e-=a.offsetY*s/c,i*=a.width/o,s*=a.height/c}const h=this.filmOffset;h!==0&&(r+=t*h/this.getFilmWidth());const l=this.infiniteFar?1/0:this.far;this.projectionMatrix.makePerspective(r,r+i,e,e-s,t,l,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}}Zs.prototype.isPerspectiveCamera=!0;class $i extends Ue{constructor(t=-1,e=1,s=1,i=-1,r=.1,a=2e3){super(),this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=s,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,s,i,r,a){Ys(this,t,e,s,i,r,a)}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),s=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=s-t,a=s+t,h=i+e,l=i-e;const o=this.view;if(o!==null&&o.enabled){const c=(this.right-this.left)/o.fullWidth/this.zoom,u=(this.top-this.bottom)/o.fullHeight/this.zoom;r+=c*o.offsetX,a=r+c*o.width,h-=u*o.offsetY,l=h-u*o.height}this.projectionMatrix.makeOrthographic(r,a,h,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}}$i.prototype.isOrthographicCamera=!0;function Ks(n,t,e,s,i){t&&n.setIndex(t),n.setAttribute("position",new bt(e,3)),n.setAttribute("normal",new bt(s,3)),n.setAttribute("uv",new bt(i,2))}class Hi extends ot{constructor(t=1,e=1,s=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:s,heightSegments:i};const r=t/2,a=e/2,h=Math.floor(s),l=Math.floor(i),o=h+1,c=l+1,u=t/h,f=e/l,m=[],x=[],d=[],g=[];for(let y=0;y<c;y++){const w=y*f-a;for(let v=0;v<o;v++)x.push(v*u-r,-w,0),d.push(0,0,1),g.push(v/h,1-y/l)}for(let y=0;y<l;y++)for(let w=0;w<h;w++){const v=w+o*y,_=w+o*(y+1),k=w+1+o*(y+1),I=w+1+o*y;m.push(v,_,I,_,k,I)}Ks(this,m,x,d,g)}}class Me extends ot{constructor(t=1,e=32,s=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:s,thetaLength:i},e=Math.max(3,e);const r=[],a=[0,0,0],h=[0,0,1],l=[.5,.5];for(let o=0;o<=e;o++){const c=s+o/e*i,u=t*Math.cos(c),f=t*Math.sin(c);a.push(u,f,0),h.push(0,0,1),l.push((u/t+1)/2,(f/t+1)/2)}for(let o=1;o<=e;o++)r.push(o,o+1,0);Ks(this,r,a,h,l)}}const B={device:null,queue:null,adapter:null,context:null,canvas:null,format:"bgra8unorm",features:new Set,limits:null,hasTimestamp:!1,hasFloat32Filterable:!1,encoder:null,frame:0,samplers:null,_submitHooks:[],async init({canvas:n=null,requiredLimits:t={},headless:e=!1}={}){if(!navigator.gpu)throw new Error("WebGPU is not available in this browser.");const s=await navigator.gpu.requestAdapter({powerPreference:"high-performance"});if(!s)throw new Error("No WebGPU adapter found.");this.adapter=s;const i=s.limits,r={maxSampledTexturesPerShaderStage:32,maxSamplersPerShaderStage:16,maxStorageBuffersPerShaderStage:10,maxStorageTexturesPerShaderStage:8,maxComputeWorkgroupStorageSize:32768,maxColorAttachmentBytesPerSample:64,maxStorageBuffersInVertexStage:4,maxStorageBuffersInFragmentStage:8,maxStorageTexturesInFragmentStage:4,maxBindingsPerBindGroup:1e3,maxBufferSize:1024*1024*1024,maxStorageBufferBindingSize:512*1024*1024,...t},a={};for(const c in r)i[c]!==void 0&&(a[c]=Math.min(r[c],i[c]));const l=["float32-filterable","timestamp-query","rg11b10ufloat-renderable","float32-blendable","shader-f16","clip-distances"].filter(c=>s.features.has(c));this.features=new Set(l),this.hasTimestamp=this.features.has("timestamp-query"),this.hasFloat32Filterable=this.features.has("float32-filterable");const o=await s.requestDevice({requiredFeatures:l,requiredLimits:a});return this.device=o,this.queue=o.queue,this.limits=o.limits,o.lost.then(c=>console.error("WebGPU device lost:",c.message)),o.addEventListener&&o.addEventListener("uncapturederror",c=>console.error("WebGPU:",c.error.message.split(`
`).slice(0,6).join(`
`))),n&&!e&&(this.canvas=n,this.context=n.getContext("webgpu"),this.format=navigator.gpu.getPreferredCanvasFormat(),this.context.configure({device:o,format:this.format,alphaMode:"opaque",usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_DST})),this._createSamplers(),this},_createSamplers(){const n=this.device,t=s=>n.createSampler(s),e={magFilter:"linear",minFilter:"linear",mipmapFilter:"linear"};this.samplers={linearRepeat:t({...e,addressModeU:"repeat",addressModeV:"repeat",addressModeW:"repeat"}),linearClamp:t({...e,addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge",addressModeW:"clamp-to-edge"}),linearMirror:t({...e,addressModeU:"mirror-repeat",addressModeV:"mirror-repeat",addressModeW:"mirror-repeat"}),anisoRepeat:t({...e,addressModeU:"repeat",addressModeV:"repeat",addressModeW:"repeat",maxAnisotropy:8}),aniso4Repeat:t({...e,addressModeU:"repeat",addressModeV:"repeat",addressModeW:"repeat",maxAnisotropy:4}),anisoClamp:t({...e,addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge",maxAnisotropy:8}),nearestClamp:t({magFilter:"nearest",minFilter:"nearest",mipmapFilter:"nearest",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge",addressModeW:"clamp-to-edge"}),nearestRepeat:t({magFilter:"nearest",minFilter:"nearest",mipmapFilter:"nearest",addressModeU:"repeat",addressModeV:"repeat",addressModeW:"repeat"}),shadow:t({magFilter:"linear",minFilter:"linear",compare:"less",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge"})}},beginFrame(){return this.frame++,this.getEncoder()},getEncoder(){return this.encoder||(this.encoder=this.device.createCommandEncoder()),this.encoder},submit(){if(!this.encoder)return;const n=this._submitHooks;this._submitHooks=[];for(const t of n)t.before&&t.before(this.encoder);this.queue.submit([this.encoder.finish()]),this.encoder=null;for(const t of n)t.after&&t.after()},onSubmit(n,t){this._submitHooks.push({before:n,after:t})},_pending:new Set,syncCompiles:[],renderPipeline(n){return this._async(n,"render")},computePipeline(n){return this._async(n,"compute")},_async(n,t){const e={pipeline:null,label:n.label,desc:n,kind:t,failed:!1},s=Promise.resolve().then(()=>e.pipeline?void 0:(t==="render"?this.device.createRenderPipelineAsync:this.device.createComputePipelineAsync).call(this.device,n).then(r=>{e.pipeline||(e.pipeline=r),e.desc=null},r=>{e.failed=!0,console.error(`WebGPU: pipeline "${n.label}" failed: ${r.message.split(`
`).slice(0,6).join(`
`)}`)})).finally(()=>this._pending.delete(s));return this._pending.add(s),e},ready(n){return n.pipeline||n.failed||(this.syncCompiles.push(n.label),n.pipeline=n.kind==="render"?this.device.createRenderPipeline(n.desc):this.device.createComputePipeline(n.desc)),n.pipeline},async pipelinesReady(){for(;this._pending.size;)await Promise.all([...this._pending])},computePass(n,t,e){const s=this.getEncoder().beginComputePass({label:n,timestampWrites:e});t(s),s.end()}},qi={r8unorm:{bytes:1,sample:"float"},rg8unorm:{bytes:2,sample:"float"},rgba8unorm:{bytes:4,sample:"float"},"rgba8unorm-srgb":{bytes:4,sample:"float"},bgra8unorm:{bytes:4,sample:"float"},r16float:{bytes:2,sample:"float"},rg16float:{bytes:4,sample:"float"},rgba16float:{bytes:8,sample:"float"},rg11b10ufloat:{bytes:4,sample:"float"},r32float:{bytes:4,sample:"unfilterable-float"},rg32float:{bytes:8,sample:"unfilterable-float"},rgba32float:{bytes:16,sample:"unfilterable-float"},r32uint:{bytes:4,sample:"uint"},rg32uint:{bytes:8,sample:"uint"},rgba32uint:{bytes:16,sample:"uint"},r32sint:{bytes:4,sample:"sint"},r8uint:{bytes:1,sample:"uint"},rgba8uint:{bytes:4,sample:"uint"},depth32float:{bytes:4,sample:"depth"},depth24plus:{bytes:4,sample:"depth"},"depth24plus-stencil8":{bytes:4,sample:"depth"}};function Js(n){const t=qi[n];if(!t)throw new Error("Unknown texture format "+n);return t}function ji(n){const t=Js(n).sample;return t==="unfilterable-float"&&B.hasFloat32Filterable?"float":t}const fs={f32:{size:4,align:4,n:1},i32:{size:4,align:4,n:1,int:!0},u32:{size:4,align:4,n:1,uint:!0},vec2f:{size:8,align:8,n:2},vec3f:{size:12,align:16,n:3},vec4f:{size:16,align:16,n:4},vec2i:{size:8,align:8,n:2,int:!0},vec4i:{size:16,align:16,n:4,int:!0},vec2u:{size:8,align:8,n:2,uint:!0},vec4u:{size:16,align:16,n:4,uint:!0},mat3x3f:{size:48,align:16,n:12,mat3:!0},mat4x4f:{size:64,align:16,n:16}};function Xi(n){const t=/^(\w+)(?:\[(\d+)\])?$/.exec(n);if(!t||!fs[t[1]])throw new Error("Unsupported uniform type "+n);const e=fs[t[1]],s=t[2]?Number(t[2]):0;if(s&&e.align<16)throw new Error(`uniform array ${n}: element must be 16-byte aligned (use vec4f)`);return{name:t[1],base:e,count:s}}function ds(n,t,e,s,i,r){const{base:a}=i,h=a.int?e:a.uint?t:n;if(typeof r=="number"||typeof r=="boolean"){h[s]=Number(r);return}if(r!=null){if(r.isMatrix4||r.isMatrix3){const l=r.elements;if(a.mat3)if(l.length===9)for(let o=0;o<3;o++)for(let c=0;c<3;c++)n[s+o*4+c]=l[o*3+c];else for(let o=0;o<3;o++)for(let c=0;c<3;c++)n[s+o*4+c]=l[o*4+c];else for(let o=0;o<16;o++)n[s+o]=l[o];return}if(r.isColor){h[s]=r.r,h[s+1]=r.g,h[s+2]=r.b,a.n===4&&(h[s+3]=1);return}if(r.isVector2){h[s]=r.x,h[s+1]=r.y;return}if(r.isVector3){h[s]=r.x,h[s+1]=r.y,h[s+2]=r.z;return}if(r.isVector4||r.isQuaternion){h[s]=r.x,h[s+1]=r.y,h[s+2]=r.z,h[s+3]=r.w;return}if(ArrayBuffer.isView(r)||Array.isArray(r)){for(let l=0;l<Math.min(r.length,a.n);l++)h[s+l]=r[l];return}throw new Error("Cannot write uniform value "+r)}}let Yi=0;class Tt{constructor(t,e,{label:s}={}){this.structName=t,this.label=s||t,this.id=Yi++,this.layout={},this.fields={},this.order=[];let i=0,r=16;for(const h in e){const l=e[h],o=Array.isArray(l)?l[0]:l,c=Array.isArray(l)?l[1]:void 0,u=Xi(o),f=u.base.align;r=Math.max(r,f),i=Math.ceil(i/f)*f;const m=u.count?Math.ceil(u.base.size/16)*16:u.base.size,x=u.count?m*u.count:u.base.size;this.layout[h]={offset:i,type:u,typeStr:o,stride:m,size:x},this.order.push(h),this.fields[h]={value:c!==void 0?c:Zi(u)},i+=x}this.byteLength=Math.max(16,Math.ceil(i/r)*r),this.data=new ArrayBuffer(this.byteLength),this.f32=new Float32Array(this.data),this.u32=new Uint32Array(this.data),this.i32=new Int32Array(this.data),this.buffer=null,this.version=0;const a=this;this.values=new Proxy({},{get:(h,l)=>a.fields[l]&&a.fields[l].value,set:(h,l,o)=>(a.set(l,o),!0)})}get wgsl(){let t=`struct ${this.structName} {
`;for(const e of this.order){const{type:s}=this.layout[e];t+=s.count?`	${e}: array<${s.name}, ${s.count}>,
`:`	${e}: ${s.name},
`}return t+`};
`}set(t,e){const s=this.fields[t];if(!s)throw new Error(`${this.structName}: no uniform ${t}`);s.value&&typeof s.value=="object"&&!Array.isArray(s.value)&&s.value.copy&&e&&e.constructor===s.value.constructor?s.value.copy(e):s.value=e}get(t){return this.fields[t].value}_pack(){this.onBeforePack&&this.onBeforePack(this);const{f32:t,u32:e,i32:s,fields:i}=this,r=this._plan||this._makePlan();for(let a=0;a<r.length;a++){const{name:h,o:l,type:o,stride:c,count:u,n:f}=r[a],m=i[h].value;if(typeof m=="number"){(o.base.int?s:o.base.uint?e:t)[l]=m;continue}if(u){if(!m)continue;if(typeof m[0]=="number"){const x=o.base.int?s:o.base.uint?e:t,d=Math.min(u,m.length/f);for(let g=0;g<d;g++){const y=l+g*c,w=g*f,v=Math.min(f,m.length-w);for(let _=0;_<v;_++)x[y+_]=m[w+_]}}else{const x=Math.min(u,m.length);for(let d=0;d<x;d++)ds(t,e,s,l+d*c,o,m[d])}}else ds(t,e,s,l,o,m)}}_makePlan(){return this._plan=this.order.map(t=>{const{offset:e,type:s,stride:i}=this.layout[t];return{name:t,o:e/4,type:s,stride:i/4,count:s.count,n:s.base.n}}),this._plan}getBuffer(){return this.buffer||(this.buffer=B.device.createBuffer({label:this.label,size:this.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this._last=new Uint32Array(this.byteLength/4),this._last.fill(4294967295)),this.buffer}upload(t){if(t!==void 0&&t===this._token&&this.buffer)return this.buffer;this._token=t;const e=this.getBuffer();this._pack();const s=this.u32,i=this._last;let r=!1;for(let a=0;a<s.length;a++)if(s[a]!==i[a]){r=!0;break}return r&&(i.set(s),B.queue.writeBuffer(e,0,this.data)),e}}function Zi(n){return n.count?null:n.base.n===1?0:new Array(n.base.n).fill(0)}let Ki=0;class Ce{constructor(t={}){this.id=Ki++,this.label=t.label||t.name||"texture"+this.id,this.width=Math.max(1,t.width||1),this.height=Math.max(1,t.height||1),this.depth=Math.max(1,t.depth||(t.dimension==="cube"?6:1)),this.dimension=t.dimension||"2d",this.format=t.format||"rgba8unorm",this.mipsOption=t.mips??!1,this.sampleCount=t.sampleCount||1;const e=t.usage||["sample","copyDst"];this.usageList=e,this.sampler=t.sampler||"linearClamp",this.gpu=null,this.version=0,this._views=new Map,this.isTexture=!0,t.data&&(this.pendingData=t.data)}get mipLevelCount(){return this.mipsOption===!0?Math.floor(Math.log2(Math.max(this.width,this.height,this.dimension==="3d"?this.depth:1)))+1:typeof this.mipsOption=="number"?this.mipsOption:1}get usage(){let t=0;for(const e of this.usageList)t|={sample:GPUTextureUsage.TEXTURE_BINDING,render:GPUTextureUsage.RENDER_ATTACHMENT,storage:GPUTextureUsage.STORAGE_BINDING,copySrc:GPUTextureUsage.COPY_SRC,copyDst:GPUTextureUsage.COPY_DST}[e];return this.mipLevelCount>1&&(t|=GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING),t}get isDepth(){return this.format.startsWith("depth")}get sampleType(){return ji(this.format)}wgslType(t=this.defaultViewDimension){const e=this.sampleType;if(e==="depth")return{"2d":"texture_depth_2d","2d-array":"texture_depth_2d_array",cube:"texture_depth_cube"}[t];const s=e==="uint"?"u32":e==="sint"?"i32":"f32";return`texture_${t.replace("-","_")}<${s}>`}get defaultViewDimension(){return this.dimension}getGPU(){return this.gpu||this._create(),this.gpu}_create(){const t=this.dimension==="3d"?"3d":"2d";if(this.gpu=B.device.createTexture({label:this.label,size:{width:this.width,height:this.height,depthOrArrayLayers:this.depth},dimension:t,format:this.format,mipLevelCount:this.mipLevelCount,sampleCount:this.sampleCount,usage:this.usage}),this._views.clear(),this.version++,this.pendingData){const e=this.pendingData;this.pendingData=null,this.upload(e)}}view(t=null){const e=this.getGPU(),s=t?JSON.stringify(t):"";let i=this._views.get(s);return i||(i=e.createView({label:this.label+s,dimension:t?.dimension||this.defaultViewDimension,...t||{}}),this._views.set(s,i)),i}resize(t,e,s=this.depth){if(t=Math.max(1,Math.floor(t)),e=Math.max(1,Math.floor(e)),t===this.width&&e===this.height&&s===this.depth&&this.gpu)return!1;if(this.width=t,this.height=e,this.depth=s,this.gpu){const i=this.gpu;B.onSubmit(null,()=>i.destroy()),this.gpu=null}return this._create(),!0}upload(t,{mip:e=0,layer:s=0,layers:i=null,width:r=null,height:a=null,x:h=0,y:l=0}={}){if(!this.gpu){if(e===0&&s===0&&!r){this.pendingData=t,this.getGPU();return}this.getGPU()}const o=Js(this.format).bytes,c=r||Math.max(1,this.width>>e),u=a||Math.max(1,this.height>>e),f=i||(this.dimension==="3d"?Math.max(1,this.depth>>e):this.depth-s),m=t instanceof ArrayBuffer?t:t.buffer,x=t instanceof ArrayBuffer?0:t.byteOffset;B.queue.writeTexture({texture:this.gpu,mipLevel:e,origin:{x:h,y:l,z:s}},m,{offset:x,bytesPerRow:c*o,rowsPerImage:u},{width:c,height:u,depthOrArrayLayers:f})}destroy(){this.gpu&&this.gpu.destroy(),this.gpu=null,this.version++}}class ms{constructor(t,e,{colors:s=["rgba16float"],depth:i=null,label:r="rt",mips:a=!1,usage:h=["sample","render","copySrc","copyDst"],depthUsage:l=["sample","render","copySrc","copyDst"],scale:o=1}={}){this.label=r,this.width=Math.max(1,t|0),this.height=Math.max(1,e|0),this.scale=o,this.textures=s.map((c,u)=>{const f=typeof c=="string"?{format:c}:c;return new Ce({label:`${r}.${f.name||u}`,width:this.width,height:this.height,format:f.format,mips:f.mips??a,usage:f.usage||h})}),this.depthTexture=i?new Ce({label:r+".depth",width:this.width,height:this.height,format:i,usage:l}):null}get texture(){return this.textures[0]}get formats(){return this.textures.map(t=>t.format)}setSize(t,e){if(t=Math.max(1,t|0),e=Math.max(1,e|0),t===this.width&&e===this.height)return!1;this.width=t,this.height=e;for(const s of this.textures)s.resize(t,e);return this.depthTexture&&this.depthTexture.resize(t,e),!0}}const Qs=[["smpLinearRepeat","linearRepeat","filtering"],["smpLinearClamp","linearClamp","filtering"],["smpLinearMirror","linearMirror","filtering"],["smpAnisoRepeat","anisoRepeat","filtering"],["smpAnisoClamp","anisoClamp","filtering"],["smpAniso4Repeat","aniso4Repeat","filtering"],["smpNearestClamp","nearestClamp","non-filtering"],["smpNearestRepeat","nearestRepeat","non-filtering"],["smpShadow","shadow","comparison"]];let Ji=0;class Bt{constructor({name:t,deps:e=[],code:s="",bindings:i={},uniforms:r=null,uniformName:a=null}){this.id=Ji++,this.name=t||"module"+this.id,this.deps=e.filter(Boolean),this.code=s,this.bindings={...i},r&&(this.bindings[a||Qi(r.structName)]={uniform:r}),this.isShaderModule=!0}}function Qi(n){return n[0].toLowerCase()+n.slice(1)}function ke(n){const t=[],e=new Set,s=i=>{if(!(!i||e.has(i))){e.add(i);for(const r of i.deps)s(r);t.push(i)}};for(const i of n)s(i);return t}function ps(n,t={}){const e=n.split(`
`),s=[],i=[],r=()=>i.length===0||i[i.length-1].active,a=h=>{h=h.trim();let l;if(l=/^!\s*(\w+)$/.exec(h))return!ys(t[l[1]]);if(l=/^(\w+)\s*(==|!=|>=|<=|>|<)\s*([\w.'"-]+)$/.exec(h)){const o=t[l[1]];let c=l[3].replace(/^['"]|['"]$/g,"");switch(!isNaN(Number(c))&&typeof o=="number"&&(c=Number(c)),l[2]){case"==":return o==c;case"!=":return o!=c;case">=":return o>=c;case"<=":return o<=c;case">":return o>c;case"<":return o<c}}return/\|\|/.test(h)?h.split("||").some(o=>a(o)):/&&/.test(h)?h.split("&&").every(o=>a(o)):ys(t[h])};for(const h of e){const l=h.trim();let o;if(o=/^#(if|ifdef|ifndef)\s+(.*)$/.exec(l)){const c=r();let u;o[1]==="ifdef"?u=t[o[2].trim()]!==void 0:o[1]==="ifndef"?u=t[o[2].trim()]===void 0:u=a(o[2]),i.push({active:c&&u,taken:u,parent:c});continue}if(o=/^#elif\s+(.*)$/.exec(l)){const c=i[i.length-1],u=!c.taken&&a(o[1]);c.active=c.parent&&u,c.taken=c.taken||u;continue}if(l==="#else"){const c=i[i.length-1];c.active=c.parent&&!c.taken,c.taken=!0;continue}if(l==="#endif"){i.pop();continue}r()&&s.push(h)}if(i.length)throw new Error("preprocess: unterminated #if");return s.join(`
`)}function ys(n){return n!=null&&n!==!1&&n!==0&&n!=="0"}function Q(n){return typeof n=="function"?n():n}function tr(n,t,e){const s=GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,i=e==="compute"?GPUShaderStage.COMPUTE:s;if(t.uniform){const r=t.uniform;return{layout:{visibility:i,buffer:{type:"uniform"}},decl:`var<uniform> ${n}: ${r.structName};`,struct:r}}if(t.uniformBuffer)return{layout:{visibility:i,buffer:{type:"uniform"}},decl:`var<uniform> ${n}: ${t.wgslType};`};if(t.storage){const r=Q(t.storage),a=t.access||"read",h=t.wgslType||`array<${t.type||r.type}>`;return{layout:{visibility:e==="compute"?i:a==="read"?s:GPUShaderStage.FRAGMENT,buffer:{type:a==="read"?"read-only-storage":"storage"}},decl:`var<storage, ${a==="read"?"read":"read_write"}> ${n}: ${h};`}}if(t.storageTexture){const r=Q(t.storageTexture),a=t.access||"write",h=t.viewDimension||t.view?.dimension||r.defaultViewDimension;return{layout:{visibility:e==="compute"?i:GPUShaderStage.FRAGMENT,storageTexture:{access:a==="write"?"write-only":a==="read"?"read-only":"read-write",format:r.format,viewDimension:h}},decl:`var ${n}: texture_storage_${h.replace("-","_")}<${r.format}, ${a}>;`}}if(t.texture){const r=Q(t.texture),a=t.viewDimension||t.view?.dimension||r.defaultViewDimension;let h=t.sampleType||r.sampleType,l=t.wgslType||r.wgslType(a);return t.sampleType==="unfilterable-float"&&r.isDepth&&(l=`texture_${a.replace("-","_")}<f32>`),{layout:{visibility:i,texture:{sampleType:h,viewDimension:a,multisampled:r.sampleCount>1}},decl:`var ${n}: ${l};`}}if(t.sampler)return{layout:{visibility:i,sampler:{type:t.samplerType||"filtering"}},decl:`var ${n}: ${t.samplerType==="comparison"?"sampler_comparison":"sampler"};`};throw new Error(`binding ${n}: unknown spec`)}function er(n){if(n.uniform)return{buffer:n.uniform.getBuffer()};if(n.uniformBuffer)return{buffer:Q(n.uniformBuffer)};if(n.storage){const t=Q(n.storage),e=t.getGPU?t.getGPU():t;return n.offset!==void 0?{buffer:e,offset:n.offset,size:n.size}:{buffer:e}}if(n.storageTexture)return Q(n.storageTexture).view(n.view||{dimension:n.viewDimension||Q(n.storageTexture).defaultViewDimension,mipLevelCount:1,baseMipLevel:n.mip||0});if(n.texture){const t=Q(n.texture);return n.view||n.viewDimension?t.view({...n.view||{},dimension:n.viewDimension||n.view.dimension}):t.view()}if(n.sampler)return typeof n.sampler=="string"?B.samplers[n.sampler]:n.sampler;throw new Error("unknown binding")}const ti=0,ei=1,si=2,ii=3,sr=4;function ir(n){return n.uniform?ti:n.uniformBuffer?ei:n.storage?si:n.storageTexture||n.texture?ii:sr}const rr=4,xs=new Map;function ri(n,t){const e=JSON.stringify(n);let s=xs.get(e);return s||(s=B.device.createBindGroupLayout({label:t,entries:n}),xs.set(e,s)),s}class Oe{constructor(t,e,s="bindings",i=null,r=null){if(this.label=s,this.stage=e,this.names=Object.keys(t),this.specs=t,this.described=this.names.map(h=>tr(h,t[h],e)),i)for(let h=0;h<this.names.length;h++){const l=this.described[h].layout,o=i[this.names[h]];o==="fragment"&&l.visibility&GPUShaderStage.FRAGMENT&&(l.visibility=GPUShaderStage.FRAGMENT),o==="vertex"&&l.visibility&GPUShaderStage.VERTEX&&(l.visibility=GPUShaderStage.VERTEX)}if(r)for(let h=0;h<this.names.length;h++){const l=this.described[h];r.has(this.names[h])&&(l.layout.buffer={type:"read-only-storage"},l.decl=l.decl.replace(/^var<uniform>/,"var<storage, read>"))}this.layout=ri(this.described.map((h,l)=>({binding:l,...h.layout})),s),this.group=null;const a=this.names.length;this._specs=this.names.map(h=>t[h]),this._kinds=this._specs.map(ir),this._blocks=this._specs.filter(h=>h.uniform).map(h=>h.uniform),this._objs=new Array(a).fill(null),this._vers=new Array(a).fill(0),this._entry=null,this._cache=[],this._token=null}declarations(t){return this.described.map((e,s)=>`@group(${t}) @binding(${s}) ${e.decl}`).join(`
`)}structs(){const t=[];for(const e of this.described)e.struct&&!t.includes(e.struct)&&t.push(e.struct);return t}getBindGroup(t){if(t!==void 0&&t===this._token&&this.group)return this.group;this._token=t;const e=this._specs,s=this._kinds,i=this._objs,r=this._vers,a=e.length;for(let c=0;c<a;c++){const u=e[c];let f=null,m=0;switch(s[c]){case ti:f=u.uniform;break;case ei:f=Q(u.uniformBuffer);break;case si:f=Q(u.storage),f.getGPU&&(f.getGPU(),m=f.version);break;case ii:f=Q(u.storageTexture||u.texture),f&&f.getGPU&&(f.getGPU(),m=f.version);break;default:f=u.sampler}i[c]=f,r[c]=m}const h=this._blocks;for(let c=0;c<h.length;c++)h[c].upload(t);if(this._entry&&this._matches(this._entry))return this.group;const l=this._cache;for(let c=0;c<l.length;c++){const u=l[c];if(!(u===this._entry||!this._matches(u)))return this._entry=u,this.group=u.group,this.group}const o=new Array(a);for(let c=0;c<a;c++)o[c]={binding:c,resource:er(e[c])};return this.group=B.device.createBindGroup({label:this.label,layout:this.layout,entries:o}),this._entry={objs:i.slice(),vers:r.slice(),group:this.group},l.unshift(this._entry),l.length>rr&&l.pop(),this.group}_matches(t){const e=this._objs,s=this._vers,i=t.objs,r=t.vers;for(let a=0;a<e.length;a++)if(e[a]!==i[a]||s[a]!==r[a])return!1;return!0}}let Ve=null,kt=null;function nr(n){Ve=n,kt=null}function ni(n){if(kt||(kt={}),!kt[n]){const t={frame:{uniform:Ve}};for(const[e,s,i]of Qs)t[e]={sampler:s,samplerType:i};kt[n]=new Oe(t,n,"group0-"+n)}return kt[n]}const gs=new WeakMap;function ai(n,t="render"){if(n===Ve)return ni(t);let e=gs.get(n);if(e||gs.set(n,e={}),!e[t]){const s={frame:{uniform:n}};for(const[i,r,a]of Qs)s[i]={sampler:r,samplerType:a};e[t]=new Oe(s,t,"group0-"+n.label)}return e[t]}function oi({modules:n=[],bindings:t={},code:e="",defines:s={},stage:i="render",label:r="shader",header:a=""}){const h=ke(n),l={};for(const d of h)for(const g in d.bindings){if(l[g]&&l[g]!==d.bindings[g]&&!ar(l[g],d.bindings[g]))throw new Error(`${r}: binding ${g} declared twice (${d.name})`);l[g]=d.bindings[g]}for(const d in t)l[d]=t[d];let o=null,c=null;if(i==="render"&&/@vertex\s+fn\s+vs\b/.test(e)){let d="";for(const p of h)d+=p.code+`
`;const g=ps(d+e,s),y=vs(g,"vs"),w=/@fragment\s+fn\s+fs\b/.test(g)?vs(g,"fs"):null;o={};for(const p in l)!y.has(p)&&(!w||w.has(p))?o[p]="fragment":w&&!w.has(p)&&y.has(p)&&(o[p]="vertex");c=new Set;const v=B.limits||{},_=(v.maxUniformBuffersPerShaderStage||12)-2,k={vertex:v.maxStorageBuffersInVertexStage??4,fragment:v.maxStorageBuffersInFragmentStage??v.maxStorageBuffersPerShaderStage??8},I=(p,M)=>!o[p]||o[p]===M;for(const p of["fragment","vertex"]){const M=Object.keys(l).filter(T=>l[T].uniform&&I(T,p)&&!c.has(T));let b=Object.keys(l).filter(T=>(l[T].storage||c.has(T))&&I(T,p)).length;M.sort((T,E)=>(o[T]===p?0:1)-(o[E]===p?0:1));let C=M.length;for(const T of M){if(C<=_||b>=k[p])break;c.add(T),b++,C--}}}const u=new Oe(l,i,r+".g1",o,c),f=ni(i),m=[...new Set([...f.structs(),...u.structs()])];let x="";B.features.has("shader-f16")&&s.F16&&(x+=`enable f16;
`),s.CLIP_DISTANCES&&(x+=`enable clip_distances;
`),/diagnostic\s*\(\s*off\s*,\s*derivative_uniformity/.test(a)||(x+=`diagnostic( off, derivative_uniformity );
`),x+=a,x+=m.map(d=>d.wgsl).join(`
`)+`
`,x+=f.declarations(0)+`
`,x+=u.declarations(1)+`
`;for(const d of h)x+=`// ---- ${d.name}
${d.code}
`;return x+=e,{code:ps(x,s),bindings:u,group0:f,modules:h}}function vs(n,t){const e=new Map,s=/\bfn\s+([A-Za-z_]\w*)\s*\(/g;let i;for(;i=s.exec(n);){const l=n.indexOf("{",i.index);if(l<0)break;let o=0,c=l;for(;c<n.length;c++){const f=n[c];if(f==="{")o++;else if(f==="}"&&--o===0)break}(!/@(vertex|fragment|compute)[^;{}]*$/.test(n.slice(Math.max(0,i.index-80),i.index))||i[1]===t)&&e.set(i[1],n.slice(i.index,c+1)),s.lastIndex=c+1}const r=new Set,a=[t],h=new Set;for(;a.length;){const l=a.pop();if(!(h.has(l)||!e.has(l))){h.add(l);for(const o of e.get(l).match(/[A-Za-z_]\w*/g)||[])r.add(o),e.has(o)&&!h.has(o)&&a.push(o)}}return r}function ar(n,t){const e=Object.keys(n),s=Object.keys(t);return e.length===s.length&&e.every(i=>n[i]===t[i])}const ws=new Map;function hi(n,t){let e=ws.get(n);return e||(e=B.device.createShaderModule({label:t,code:n}),ws.set(n,e),e.getCompilationInfo&&e.getCompilationInfo().then(s=>{const i=s.messages.filter(a=>a.type==="error");if(!i.length)return;const r=n.split(`
`);for(const a of i){const h=Math.max(0,a.lineNum-4),l=Math.min(r.length,a.lineNum+2),o=r.slice(h,l).map((c,u)=>`${h+u+1}${h+u+1===a.lineNum?">":" "} ${c}`).join(`
`);console.error(`WGSL error in ${t} (${a.lineNum}:${a.linePos}): ${a.message}
${o}`)}}),e)}const li={view:"mat4x4f",proj:"mat4x4f",viewProj:"mat4x4f",invView:"mat4x4f",invProj:"mat4x4f",invViewProj:"mat4x4f",viewProjNoJitter:"mat4x4f",prevViewProjNoJitter:"mat4x4f",cameraPos:["vec3f",new S],near:["f32",.1],prevCameraPos:["vec3f",new S],far:["f32",6e4],resolution:["vec2f",new R(1,1)],invResolution:["vec2f",new R(1,1)],outputResolution:["vec2f",new R(1,1)],jitter:["vec2f",new R],prevJitter:["vec2f",new R],frameIndex:["u32",0],time:["f32",0],dt:["f32",1/60],seaLevel:["f32",0],sunDir:["vec3f",new S(.3,.6,-.7).normalize()],night:["f32",0],sunColor:["vec3f",new at(1,1,1)],exposure:["f32",1],skyIrradiance:["vec3f",new at(.3,.4,.6)],cameraUnderwater:["f32",0],horizonColor:["vec3f",new at(.6,.7,.8)],cameraWaterHeight:["f32",0],waterAbsorption:["vec3f",new S(.42,.075,.035)],windSpeed:["f32",7],waterScattering:["vec3f",new S(.012,.018,.024)],envIntensity:["f32",1],windDir:["vec2f",new R(.35,.94).normalize()],reversedDepth:["f32",1],pad0:["f32",0],debug:["vec4f",new G]},or=["view","proj","viewProj","invView","invProj","invViewProj","viewProjNoJitter","prevViewProjNoJitter","cameraPos","near","prevCameraPos","far","resolution","invResolution","jitter","prevJitter","reversedDepth"],Z=new Tt("Frame",li,{label:"frame"});nr(Z);function hr(n){const t=new Tt("Frame",li,{label:n});return t.onBeforePack=()=>{for(const e of Z.order)or.includes(e)||(t.fields[e].value=Z.fields[e].value)},t}const O=Z.fields;O.time,O.dt,O.seaLevel,O.sunDir,O.sunColor,O.skyIrradiance,O.horizonColor,O.waterAbsorption,O.waterScattering,O.cameraUnderwater,O.cameraWaterHeight,O.exposure,O.windDir,O.windSpeed,O.night,O.envIntensity;const bs=new N;function ci(n,t,e,{jitterX:s=0,jitterY:i=0,prevViewProj:r=null,prevCameraPos:a=null,block:h=Z}={}){const l=h.fields;n.updateMatrixWorld(),n.matrixWorldInverse&&n.matrixWorldInverse.copy(n.matrixWorld).invert();const o=n.matrixWorldInverse,c=n.projectionMatrix;l.view.value=o.clone(),l.proj.value=c.clone();const u=new N().multiplyMatrices(c,o);l.viewProjNoJitter.value=u.clone();const f=2*s/t,m=2*i/e;bs.makeTranslation(f,m,0);const x=new N().multiplyMatrices(bs,u);l.viewProj.value=x,l.invView.value=n.matrixWorld.clone(),l.invProj.value=c.clone().invert(),l.invViewProj.value=x.clone().invert(),l.prevViewProjNoJitter.value=r?r.clone():u.clone(),l.cameraPos.value=new S().setFromMatrixPosition(n.matrixWorld),l.prevCameraPos.value=a?a.clone():l.cameraPos.value.clone(),l.near.value=n.near,l.far.value=n.far,l.resolution.value=new R(t,e),l.invResolution.value=new R(1/t,1/e),l.prevJitter.value=l.jitter.value?l.jitter.value.clone():new R,l.jitter.value=new R(f,m),l.reversedDepth.value=n.reversedDepth===!1?0:1}let Ms=0;const lr={color:["vec3f",null],opacity:["f32",1],emissive:["vec3f",null],roughness:["f32",1],metalness:["f32",0],alphaTest:["f32",0]};class cr{constructor(t={}){this.id=Ms++,this.isMaterial=!0,this.name=t.name||"material"+this.id,this.version=0,this.modules=t.modules||[],this.varyings=t.varyings||{},this.attributes=t.attributes||{},this.vertex=t.vertex||"",this.surface=t.surface||"",this.output=t.output||"",this.shadow=t.shadow||"",this.defines={...t.defines||{}},this.lit=t.lit!==!1,this.side=t.side||"front",this.transparent=!!t.transparent,this.blending=t.blending||(this.transparent?"normal":"none"),this.depthWrite=t.depthWrite??!this.transparent,this.depthTest=t.depthTest??!0,this.depthCompare=t.depthCompare||null,this.depthBias=t.depthBias||0,this.depthBiasSlopeScale=t.depthBiasSlopeScale||0,this.colorWrite=t.colorWrite??!0,this.topology=t.topology||"triangle-list",this.visible=t.visible??!0,this.vertexColors=!!t.vertexColors,this.velocityWeight=t.velocityWeight??1,this.underwaterLighting=t.underwaterLighting||"full",this.appliesHillShadow=!!t.appliesHillShadow,this.localLightsCheap=!!t.localLightsCheap,this.receiveShadows=t.receiveShadows??!0,this.userData=t.userData||{};const e={...lr};for(const i in t.uniforms||{})e[i]=t.uniforms[i];this.uniformBlock=new Tt("MaterialParams"+this.id,e,{label:this.name}),this.uniforms=this.uniformBlock.fields;const s=this.uniforms;s.color.value=ee(t.color,new at(1,1,1)),s.emissive.value=ee(t.emissive,new at(0,0,0)),t.roughness!==void 0&&(s.roughness.value=t.roughness),t.metalness!==void 0&&(s.metalness.value=t.metalness),t.opacity!==void 0&&(s.opacity.value=t.opacity),t.alphaTest!==void 0&&(s.alphaTest.value=t.alphaTest),this.bindings={};for(const i in t.textures||{}){const r=t.textures[i];this.bindings[i]=r&&r.isTexture?{texture:r}:typeof r=="function"?{texture:r}:r}for(const i in t.storage||{}){const r=t.storage[i];this.bindings[i]=r&&r.isStorageBuffer?{storage:r,access:"read"}:r}Object.assign(this.bindings,t.bindings||{}),this._listeners=[]}get color(){return this.uniforms.color.value}set color(t){this.uniforms.color.value=ee(t,this.uniforms.color.value)}get emissive(){return this.uniforms.emissive.value}set emissive(t){this.uniforms.emissive.value=ee(t,this.uniforms.emissive.value)}get roughness(){return this.uniforms.roughness.value}set roughness(t){this.uniforms.roughness.value=t}get metalness(){return this.uniforms.metalness.value}set metalness(t){this.uniforms.metalness.value=t}get opacity(){return this.uniforms.opacity.value}set opacity(t){this.uniforms.opacity.value=t}get alphaTest(){return this.uniforms.alphaTest.value}set alphaTest(t){t>0!=this.uniforms.alphaTest.value>0&&(this.needsUpdate=!0),this.uniforms.alphaTest.value=t}set(t,e){this.uniformBlock.set(t,e)}set needsUpdate(t){t&&this.version++}setDefine(t,e){this.defines[t]!==e&&(this.defines[t]=e,this.version++)}pipelineKey(){return`${this.id}.${this.version}.${this.side}.${this.transparent}.${typeof this.blending=="string"?this.blending:JSON.stringify(this.blending)}.${this.depthWrite}.${this.depthTest}.${this.depthCompare}.${this.colorWrite}.${this.topology}.${this.alphaTest>0}.${this.underwaterLighting}.${this.appliesHillShadow}.${this.localLightsCheap}.${this.receiveShadows}.${this.depthBias}.${this.depthBiasSlopeScale}.${this.vertexColors}`}allDefines(){return{...this.defines,UNDERWATER_LIGHTING:{none:0,lite:1,full:2}[this.underwaterLighting]??2,HILL_SHADOW_SELF:this.appliesHillShadow?1:0,LOCAL_LIGHTS_CHEAP:this.localLightsCheap?1:0,ALPHA_TEST:this.alphaTest>0?1:0,DOUBLE_SIDED:this.side==="double"?1:0,BACK_SIDE:this.side==="back"?1:0,TRANSPARENT:this.transparent?1:0,RECEIVE_SHADOWS:this.receiveShadows?1:0}}addEventListener(t,e){t==="dispose"&&this._listeners.push(e)}dispose(){for(const t of this._listeners)t({target:this})}clone(){const t=Object.create(Object.getPrototypeOf(this));return Object.assign(t,this),t.id=Ms++,t.version=0,t.defines={...this.defines},t.bindings={...this.bindings},t.uniformBlock=new Tt("MaterialParams"+t.id,Object.fromEntries(this.uniformBlock.order.map(e=>[e,[this.uniformBlock.layout[e].typeStr,ui(this.uniforms[e].value)]])),{label:t.name}),t.uniforms=t.uniformBlock.fields,t._listeners=[],t}}function ui(n){return n&&typeof n=="object"&&n.clone?n.clone():Array.isArray(n)?n.map(ui):n}function ee(n,t){return n==null?t:n.isColor?t.copy?t.copy(n):n.clone():typeof n=="number"||typeof n=="string"?t.set(n):Array.isArray(n)?t.setRGB(n[0],n[1],n[2]):n.isVector3?t.setRGB(n.x,n.y,n.z):t}function re(n){if(!n||n==="none")return;if(typeof n=="object")return n;const t=(e,s,i="add")=>({srcFactor:e,dstFactor:s,operation:i});switch(n){case"normal":return{color:t("src-alpha","one-minus-src-alpha"),alpha:t("one","one-minus-src-alpha")};case"premultiplied":return{color:t("one","one-minus-src-alpha"),alpha:t("one","one-minus-src-alpha")};case"additive":return{color:t("src-alpha","one"),alpha:t("zero","one")};case"add":return{color:t("one","one"),alpha:t("one","one")};case"multiply":return{color:t("dst","zero"),alpha:t("zero","one")};case"min":return{color:t("one","one","min"),alpha:t("one","one","min")};case"max":return{color:t("one","one","max"),alpha:t("one","one","max")}}throw new Error("unknown blending "+n)}const mt=new Bt({name:"common",code:`
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
`}),fi={hooks:{},version:0},di={directModulation:"fn hookDirectModulation( P: vec3f, N: vec3f ) -> vec3f { return vec3f( 1.0 ); }",ambientModulation:"fn hookAmbientModulation( P: vec3f, N: vec3f ) -> vec3f { return vec3f( 1.0 ); }",shadowPosition:"fn hookShadowPosition( P: vec3f, N: vec3f, pixel: vec2f ) -> vec3f { return P; }",bounce:"fn hookBounce( P: vec3f, N: vec3f ) -> vec3f { return vec3f( 0.0 ); }",localLights:"fn hookLocalLights( s: Surface, P: vec3f, N: vec3f, V: vec3f, acc: ptr<function, LightAccum> ) {}",envSpecular:"fn hookEnvSpecular( R: vec3f, roughness: f32 ) -> vec3f { let t = sat( R.y * 0.5 + 0.5 ); return mix( frame.horizonColor * 0.6, frame.skyIrradiance * PI, t ) * frame.envIntensity; }",envDiffuse:"fn hookEnvDiffuse( N: vec3f ) -> vec3f { return mix( frame.horizonColor * 0.25, frame.skyIrradiance, N.y * 0.5 + 0.5 ) * frame.envIntensity; }"};function ur(){const n=[];for(const t in di){const e=fi.hooks[t];e?n.push(e):n.push(fr(t))}return n}const _s={};function fr(n){return _s[n]||(_s[n]=new Bt({name:"hook-"+n+"-default",deps:[Wt],code:di[n]}))}const Ot=new Tt("SunShadow",{matrices:["mat4x4f[4]",[new N,new N,new N,new N]],cascades:["vec4f[4]",[new G,new G,new G,new G]],count:["u32",0],mapSize:["f32",2048],bias:["f32",2e-5],fade:["f32",1],pcssCascades:["u32",1],sunAngularDiameter:["f32",.00925],enabled:["f32",0],pad:["f32",0],blend:["vec4f[4]",[new G,new G,new G,new G]]});let mi=null;function dr(n){mi=n}const pi=new Bt({name:"sunShadow",deps:[mt],uniforms:Ot,uniformName:"shadowParams",bindings:{sunShadowMap:{texture:()=>mi,viewDimension:"2d-array"}},code:`
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
`}),Wt=new Bt({name:"surface",deps:[mt],code:`
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
`}),_e=new Bt({name:"lighting",deps:[mt,Wt,pi],code:`
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
`}),mr={position:"vec3f",normal:"vec3f",uv:"vec2f",color:"vec4f"},pr={normal:"vec3f( 0.0, 1.0, 0.0 )",uv:"vec2f( 0.0 )",color:"vec4f( 1.0 )"},yr=/^(u32|i32|vec[234][ui])$/;function xr(n){return n==="f32"?"0.0":n==="u32"?"0u":n==="i32"?"0i":`${n}()`}function gr(n,t,e){const s=e.kind,i=new Set(t.map(y=>y.name)),r=n.allDefines();r.PASS_MAIN=s==="main"?1:0,r.PASS_DEPTH=s==="depth"?1:0,r.PASS_COLOR=s==="color"?1:0,r.PASS_LATE=e.late?1:0,r.LIT=n.lit?1:0,r.INSTANCED=i.has("instanceMatrix0")?1:0,r.INSTANCE_COLOR=i.has("instanceColor")?1:0,Object.assign(r,e.defines||{}),r.CLIP_DISTANCES=r.REFRACTION_CLIP&&B.features.has("clip-distances")?1:0;let a=`struct VertexIn {
`;for(const y of t)a+=`	@location( ${y.location} ) ${y.name}: ${y.wgsl},
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
`;for(const y in n.attributes)h+=`	${y}: ${n.attributes[y]},
`;h+=`};
`;const l=s==="main";let o=0,c=`struct VSOut {
	@builtin( position ) clip: vec4f,
`;c+=`	@location( ${o++} ) worldPos: vec3f,
`,c+=`	@location( ${o++} ) normal: vec3f,
`,c+=`	@location( ${o++} ) uv: vec2f,
`,c+=`	@location( ${o++} ) color: vec4f,
`,l&&(c+=`	@location( ${o++} ) curClip: vec4f,
`,c+=`	@location( ${o++} ) prevClip: vec4f,
`);for(const y in n.varyings){const w=n.varyings[y];c+=`	@location( ${o++} )${yr.test(w)?" @interpolate( flat )":""} ${y}: ${w},
`}if(c+=`};
`,r.CLIP_DISTANCES){const y=[...c.matchAll(/\s(\w+): [^,]+,\n/g)].map(w=>w[1]);c+=c.replace("struct VSOut {","struct VSOutClip {").replace(/};\n$/,`	@builtin( clip_distances ) clipDistances: array<f32, 1>,
};
`),c+=`fn vsClip( o: VSOut, d: f32 ) -> VSOutClip {
	var c: VSOutClip;
${y.map(w=>`	c.${w} = o.${w};
`).join("")}	c.clipDistances[ 0 ] = d;
	return c;
}
`}let u="";for(const y in mr)if(i.has(y)){const w=t.find(v=>v.name===y);y==="color"&&w.wgsl==="vec3f"?u+=`	v.color = vec4f( i.color, 1.0 );
`:u+=`	v.${y} = i.${y};
`}else y!=="position"&&(u+=`	v.${y} = ${pr[y]};
`);for(const y in n.attributes)u+=i.has(y)?`	v.${y} = i.${y};
`:`	v.${y} = ${xr(n.attributes[y])};
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
${n.vertex}
}

fn materialSurface( in: FragInput, s: ptr<function, Surface> ) {
${n.surface}
}

fn materialOutput( in: FragInput, s: Surface, r: ptr<function, FragResult> ) {
${n.output}
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
`,m=n.shadow?`fn materialShadow( in: FragInput ) -> bool {
${n.shadow}
}
`:"";r.HAS_SHADOW_HOOK=n.shadow?1:0,r.NEEDS_DEPTH_FRAGMENT=s==="depth"&&(n.alphaTest>0||n.shadow)?1:0,r.HAS_POSITION=i.has("position")?1:0;const x=f.replace("fn fragInput(",m+"fn fragInput(").replace(/\bTRANSPARENT_F\b/g,n.transparent?"true":"false").replace(/\bVELOCITY_WEIGHT\b/g,Ss(n.velocityWeight)).replace(/\bREFRACTION_CLIP_MARGIN\b/g,Ss((e.defines&&e.defines.REFRACTION_CLIP_MARGIN)??0));let d=[mt,Wt,...n.modules];return(s!=="depth"||ke(n.modules).includes(_e))&&(d=[mt,Wt,...ur(),_e,...n.modules]),n.lightingHooks===!1&&!ke(n.modules).includes(_e)&&(d=[mt,Wt,pi,...n.modules]),{code:x,modules:d,defines:r,bindings:{mat:{uniform:n.uniformBlock},...n.bindings},hasFragment:s!=="depth"||r.NEEDS_DEPTH_FRAGMENT===1}}function Ss(n){const t=String(n);return t.includes(".")||t.includes("e")?t:t+".0"}const zs=new yt,Ps=new Ee,As=new N,vr=new S,Cs=new S,ks=new WeakMap;let wr=0;const Ct=256,Is=40;class br{constructor(){this.pipelines=new Map,this.geometries=new WeakMap,this.capacity=8192,this.drawBuffer=null,this.drawData=null,this.drawCount=0,this.frame=-1,this.stats={draws:0,triangles:0,pipelines:0},this.drawLayout=null,this.drawBindGroup=null,this.syncPipelines=!0}_ensureDrawBuffer(){this.drawBuffer&&this.drawData.byteLength>=this.capacity*Ct||(this.drawBuffer&&this.drawBuffer.destroy(),this.drawBuffer=B.device.createBuffer({label:"draws",size:this.capacity*Ct,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.drawData=new Float32Array(this.capacity*Ct/4),this.drawLayout=ri([{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform",hasDynamicOffset:!0,minBindingSize:Is*4}}],"draw"),this.drawBindGroup=B.device.createBindGroup({label:"draws",layout:this.drawLayout,entries:[{binding:0,resource:{buffer:this.drawBuffer,size:Is*4}}]}))}_beginFrame(){this.frame!==B.frame&&(this.frame=B.frame,this._ensureDrawBuffer(),this.drawCount>this.capacity*.75&&(this.capacity*=2,this._ensureDrawBuffer()),this.drawCount=0,B.onSubmit(()=>{this.drawCount&&B.queue.writeBuffer(this.drawBuffer,0,this.drawData.buffer,0,this.drawCount*Ct)}),this.stats.draws=0,this.stats.triangles=0)}_slot(t){let e=t.__draw;if(e||(e=t.__draw={frame:-1,slot:0,cur:new Float32Array(16),prev:new Float32Array(16),has:!1}),e.frame===B.frame)return e.slot;if(this.drawCount>=this.capacity)throw new Error("MeshRenderer: draw buffer full");e.frame=B.frame,e.slot=this.drawCount++;const s=t.matrixWorld.elements;e.has&&!t.resetVelocity?e.prev.set(e.cur):e.prev.set(s),e.cur.set(s),e.has=!0,t.resetVelocity=!1;const i=e.slot*Ct/4,r=this.drawData;r.set(e.cur,i),r.set(t.staticVelocity?e.cur:e.prev,i+16);const a=t.drawParams;if(r[i+32]=t.id??0,r[i+33]=a?a[0]:0,r[i+34]=a?a[1]:0,r[i+35]=a?a[2]:0,a&&a.length>3)for(let h=0;h<4;h++)r[i+36+h]=a[3+h]??0;return e.slot}_geometryGPU(t){let e=this.geometries.get(t);return e||(e={buffers:new Map,index:null,indexVersion:-1},this.geometries.set(t,e),t.addEventListener&&t.addEventListener("dispose",()=>{for(const s of e.buffers.values())s.buffer.destroy();e.index&&e.index.buffer.destroy(),this.geometries.delete(t)})),e}_attributeBuffer(t,e){const s=this._geometryGPU(t),i=e.isInterleavedBufferAttribute?e.data:e;if(i.gpuBuffer)return i.gpuBuffer.getGPU?i.gpuBuffer.getGPU():i.gpuBuffer;let r=s.buffers.get(i);const a=i.version??0;if(r&&r.version===a&&r.array===i.array)return r.buffer;const h=Mr(e);if((!r||r.size<h.byteLength)&&(r&&r.buffer.destroy(),r={buffer:B.device.createBuffer({label:e.name||"attribute",size:Math.max(16,ne(h.byteLength)),usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST}),size:h.byteLength,version:-1},s.buffers.set(i,r)),r.version!==a){const l=i.updateRanges&&i.updateRanges.length&&r.version>=0?i.updateRanges:null;if(l&&h.array===i.array){const o=i.array.BYTES_PER_ELEMENT;for(const c of l)B.queue.writeBuffer(r.buffer,c.start*o,i.array.buffer,i.array.byteOffset+c.start*o,ne(c.count*o));i.clearUpdateRanges?i.clearUpdateRanges():i.updateRanges.length=0}else Ts(r.buffer,h);r.version=a}return r.array=i.array,r.buffer}_indexBuffer(t){const e=t.index;if(!e)return null;const s=this._geometryGPU(t);if(s.indexRef&&s.indexSrc===e.array&&s.indexVersion===(e.version??0))return s.indexRef;const i=e.array instanceof Uint16Array||e.array instanceof Uint32Array?e.array:new Uint32Array(e.array);return(!s.index||s.index.size<i.byteLength)&&(s.index&&s.index.buffer.destroy(),s.index={buffer:B.device.createBuffer({label:"index",size:Math.max(16,ne(i.byteLength)),usage:GPUBufferUsage.INDEX|GPUBufferUsage.COPY_DST}),size:i.byteLength},s.indexVersion=-1),s.indexVersion!==(e.version??0)&&(Ts(s.index.buffer,i),s.indexVersion=e.version??0),s.indexSrc=e.array,s.indexRef={buffer:s.index.buffer,format:i instanceof Uint16Array?"uint16":"uint32"},s.indexRef}_cachedLayout(t,e,s){let i=ks.get(e);i||ks.set(e,i=new Map);const r=t.isInstancedMesh?t.instanceColor?2:1:0,a=r?s.id+":"+r:s.id;let h=i.get(a);if(h&&h.version===s.version&&h.attrsVersion===e.attributesVersion&&(!r||h.instanceMatrix===t.instanceMatrix)){const c=h.refs,u=h.names,f=e.attributes;let m=!0;for(let x=0;x<u.length;x++)if(f[u[x]]!==c[x]){m=!1;break}if(m)return h.vl}const l=this._layout(t,e,s),o=l.layout.filter(c=>!c.name.startsWith("instance")).map(c=>c.name);return h={version:s.version,attrsVersion:e.attributesVersion,instanceMatrix:t.instanceMatrix,names:o,refs:o.map(c=>e.attributes[c]),vl:l},l.pipelines=new Map,i.set(a,h),l}_layout(t,e,s){const i=[],r=["position","normal","uv","color",...Object.keys(s.attributes)];for(const u of r){const f=e.attributes[u];f&&!(u==="color"&&!s.vertexColors&&!s.attributes.color)&&i.push({name:u,attr:f})}if(t.isInstancedMesh){for(let u=0;u<4;u++)i.push({name:"instanceMatrix"+u,attr:t.instanceMatrix,column:u});t.instanceColor&&i.push({name:"instanceColor",attr:t.instanceColor})}const a=[],h=[],l=new Map;let o=0;for(const u of i){const f=u.attr,m=f.isInterleavedBufferAttribute?f.data:f,x=!!(f.isInstancedBufferAttribute||m.isInstancedInterleavedBuffer||f.meshPerAttribute||m.meshPerAttribute)||u.name.startsWith("instance"),d=yi(f);let g=l.get(m);if(g===void 0){g=a.length,l.set(m,g);const _=f.isInterleavedBufferAttribute?f.data.stride*d.bytesPerComponent:f.itemSize*d.bytesPerComponent;a.push({src:m,attr:f,layout:{arrayStride:d.converted?d.itemSize*4:_,stepMode:x?"instance":"vertex",attributes:[]}})}let y=f.isInterleavedBufferAttribute?f.offset*d.bytesPerComponent:0,w=d.format,v=d.wgsl;u.column!==void 0&&(y=u.column*16,w="float32x4",v="vec4f"),a[g].layout.attributes.push({shaderLocation:o,offset:y,format:w}),(u.name==="position"||u.name==="normal")&&(v="vec3f"),u.name==="uv"&&(v="vec2f"),u.name==="color"&&(v=f.itemSize===4?"vec4f":"vec3f"),u.name==="instanceColor"&&(v="vec3f"),s.attributes[u.name]&&(v=s.attributes[u.name]),h.push({name:u.name,wgsl:v,location:o,instanced:x}),o++}return{key:h.map(u=>`${u.name}:${u.wgsl}`).join(",")+"|"+a.map(u=>`${u.layout.arrayStride}/${u.layout.stepMode}/${u.layout.attributes.map(f=>f.format+"@"+f.offset).join(";")}`).join(","),layout:h,buffers:a}}_pipeline(t,e,s){t.__pkFrame!==B.frame&&(t.__pk=t.pipelineKey()+"|"+fi.version,t.__pkFrame=B.frame);const i=s.passKey;let r=e.pipelines&&e.pipelines.get(i);if(r&&r.materialKey===t.__pk)return r.p;const a=`${t.__pk}|${e.key}|${i}`;let h=this.pipelines.get(a);return h||(h=this._createPipeline(t,e,s,a)),e.pipelines&&e.pipelines.set(i,{materialKey:t.__pk,p:h}),h}_createPipeline(t,e,s,i){const r=gr(t,e.layout,s),a=oi({modules:r.modules,bindings:r.bindings,code:r.code,defines:r.defines,stage:"render",label:t.name}),h=hi(a.code,t.name);this._ensureDrawBuffer();const l=B.device.createPipelineLayout({bindGroupLayouts:[a.group0.layout,a.bindings.layout,this.drawLayout]}),o=re(t.blending);let c=[];s.kind==="main"?c=[{format:s.colorFormats[0],blend:t.transparent||s.late?o:void 0,writeMask:t.colorWrite?GPUColorWrite.ALL:0},{format:s.colorFormats[1],blend:s.late?re("premultiplied"):void 0,writeMask:t.colorWrite?GPUColorWrite.ALL:0},{format:s.colorFormats[2],blend:re("normal"),writeMask:t.colorWrite?GPUColorWrite.ALL:0}]:s.kind==="color"&&(c=s.colorFormats.map(g=>({format:g,blend:o,writeMask:t.colorWrite?GPUColorWrite.ALL:0})));const u=t.side,f=s.cullOverride||(u==="double"?"none":u==="back"?"front":"back"),m=t.depthTest?t.depthCompare||s.depthCompare:"always",x={label:t.name+" "+s.kind,layout:l,vertex:{module:h,entryPoint:"vs",buffers:e.buffers.map(g=>g.layout)},primitive:{topology:t.topology,cullMode:f,frontFace:"ccw"}};r.hasFragment&&(x.fragment={module:h,entryPoint:"fs",targets:c}),s.depthFormat&&(x.depthStencil={format:s.depthFormat,depthWriteEnabled:t.depthWrite,depthCompare:m,depthBias:s.kind==="depth"?s.depthBias||0:t.depthBias,depthBiasSlopeScale:s.kind==="depth"?s.depthBiasSlopeScale||0:t.depthBiasSlopeScale});const d={handle:B.renderPipeline(x),bindings:a.bindings,label:x.label};return this.pipelines.set(i,d),this.stats.pipelines=this.pipelines.size,d}collect(t,{camera:e,layerMask:s=4294967295,filter:i=null,kind:r="main",cull:a=!0}){const h=[],l=[];e&&(e.updateMatrixWorld(),As.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse.copy(e.matrixWorld).invert()),Ps.setFromProjectionMatrix(As,e.reversedDepth!==!1),Cs.setFromMatrixPosition(e.matrixWorld));const o=this.precompiling,c=u=>{if(!(!u.visible&&!o)){u.isMesh&&u.material&&u.geometry&&(u.layers.mask&s)!==0&&(!i||i(u))&&(r!=="depth"||u.castShadow)&&(o||!a||!e||u.frustumCulled===!1||this._inFrustum(u))&&(u.onBeforeRender&&u.onBeforeRender(null,null,e,u.geometry,u.material,null),(u.visible||o)&&this._addItems(u,h,l));for(const f of u.children)c(f)}};return t.updateMatrixWorld(),c(t),h.sort((u,f)=>u.renderOrder-f.renderOrder||u.pipeKey-f.pipeKey||u.z-f.z),l.sort((u,f)=>u.renderOrder-f.renderOrder||f.z-u.z),{opaque:h,transparent:l}}_inFrustum(t){let e=null;return t.isInstancedMesh?(!t.boundingSphere&&t.computeBoundingSphere&&t.computeBoundingSphere(),e=t.boundingSphere):(t.geometry.boundingSphere||t.geometry.computeBoundingSphere(),e=t.geometry.boundingSphere),!e||e.radius<0||!Number.isFinite(e.radius)?!0:(zs.copy(e).applyMatrix4(t.matrixWorld),Ps.intersectsSphere(zs))}_addItems(t,e,s){const i=t.geometry,r=Array.isArray(t.material)?t.material:null,a=vr.setFromMatrixPosition(t.matrixWorld).distanceToSquared(Cs),h=(o,c,u)=>{if(!o||!o.visible&&!this.precompiling)return;const f={object:t,geometry:i,material:o,start:c,count:u,z:a,renderOrder:t.renderOrder||0,pipeKey:o.id};(o.transparent?s:e).push(f)},l=i.drawRange||{start:0,count:1/0};if(r&&i.groups&&i.groups.length)for(const o of i.groups){const c=Math.max(o.start,l.start),u=Math.min(o.start+o.count,l.start+l.count);u>c&&h(r[o.materialIndex],c,u-c)}else h(r?r[0]:t.material,l.start,l.count)}render(t,e){this._beginFrame(),e={kind:"main",late:!1,colorFormats:[],depthFormat:null,depthCompare:"greater-equal",frameBlock:Z,layerMask:4294967295,...e},e.passKey=`${e.kind}.${e.late?1:0}.${e.colorFormats.join(",")}.${e.depthFormat}.${e.depthCompare}.${e.cullOverride||""}.${e.defines?JSON.stringify(e.defines):""}`;const s=e.items||this.collect(t,e),i=B.getEncoder(),r=(e.colorViews||[]).map((l,o)=>{const c=e.clearColors?e.clearColors[o]:null;return{view:l,loadOp:c?"clear":"load",storeOp:"store",clearValue:c||[0,0,0,0]}}),a={label:e.label||e.kind,colorAttachments:r};e.depthView&&(a.depthStencilAttachment={view:e.depthView,depthLoadOp:e.clearDepth===null||e.clearDepth===void 0?"load":"clear",depthStoreOp:"store",depthClearValue:e.clearDepth??0}),e.timestampWrites&&(a.timestampWrites=e.timestampWrites);const h=i.beginRenderPass(a);e.viewport&&h.setViewport(...e.viewport),h.setBindGroup(0,ai(e.frameBlock,"render").getBindGroup()),this.drawItems(h,s.opaque,e),e.betweenLists&&e.betweenLists(h),this.drawItems(h,s.transparent,e),e.after&&e.after(h),h.end()}drawItems(t,e,s){let i=null,r=null;const a=++wr;for(const h of e){const{object:l,geometry:o,material:c}=h;if(!o.attributes.position&&!o.vertexCount&&!o.indirect)continue;let u,f;if(this.precompiling){try{u=this._cachedLayout(l,o,c),f=this._pipeline(c,u,s)}catch{continue}continue}u=this._cachedLayout(l,o,c),f=this._pipeline(c,u,s);const m=f.handle.pipeline||(this.syncPipelines?B.ready(f.handle):null);if(!m)continue;f!==i&&(t.setPipeline(m),i=f);const x=f.bindings.getBindGroup(a);x!==r&&(t.setBindGroup(1,x),r=x),t.setBindGroup(2,this.drawBindGroup,[this._slot(l)*Ct]);for(let y=0;y<u.buffers.length;y++)t.setVertexBuffer(y,this._attributeBuffer(o,u.buffers[y].attr));const d=l.isInstancedMesh?l.count:o.instanceCount??1;if(d===0)continue;const g=this._indexBuffer(o);if(o.indirect){const y=o.indirect.buffer.getGPU?o.indirect.buffer.getGPU():o.indirect.buffer,w=o.indirect.offsets||[o.indirect.offset||0];g&&t.setIndexBuffer(g.buffer,g.format);for(const v of w)g?t.drawIndexedIndirect(y,v):t.drawIndirect(y,v),this.stats.draws++;continue}if(g){const y=Math.min(h.count,o.index.count-h.start);if(y<=0)continue;t.setIndexBuffer(g.buffer,g.format),t.drawIndexed(y,d===1/0?1:d,h.start,0,0),this.stats.triangles+=y/3*d}else{const y=o.attributes.position?o.attributes.position.count:o.vertexCount,w=Math.min(h.count,y-h.start);if(w<=0)continue;t.draw(w,d,h.start,0),this.stats.triangles+=w/3*d}this.stats.draws++}}}function ne(n){return Math.ceil(n/4)*4}function Ts(n,t){if(t.byteLength%4===0){B.queue.writeBuffer(n,0,t.buffer,t.byteOffset,t.byteLength);return}const e=new Uint8Array(ne(t.byteLength));e.set(new Uint8Array(t.buffer,t.byteOffset,t.byteLength)),B.queue.writeBuffer(n,0,e)}const Bs=new WeakMap;function Mr(n){const t=n.isInterleavedBufferAttribute?n.data:n;if(!yi(n).converted)return t.array;let s=Bs.get(t);if(s&&s.version===t.version)return s.array;const i=n.count,r=n.itemSize,a=new Float32Array(i*r),h=n.normalized?_r(t.array):1;for(let l=0;l<i*r;l++)a[l]=t.array[l]/h;return Bs.set(t,{version:t.version,array:a}),a}function _r(n){return n instanceof Uint8Array?255:n instanceof Int8Array?127:n instanceof Uint16Array?65535:n instanceof Int16Array?32767:1}function yi(n){const e=(n.isInterleavedBufferAttribute?n.data:n).array,s=n.itemSize,i=n.normalized,r=h=>s===1?h:`vec${s}${h==="f32"?"f":h==="u32"?"u":"i"}`;if(e instanceof Float32Array)return{format:s===1?"float32":`float32x${s}`,wgsl:r("f32"),bytesPerComponent:4,itemSize:s};if(e instanceof Uint32Array)return{format:s===1?"uint32":`uint32x${s}`,wgsl:r("u32"),bytesPerComponent:4,itemSize:s};if(e instanceof Int32Array)return{format:s===1?"sint32":`sint32x${s}`,wgsl:r("i32"),bytesPerComponent:4,itemSize:s};const a={Uint8Array:["uint8","unorm8",1],Int8Array:["sint8","snorm8",1],Uint16Array:["uint16","unorm16",2],Int16Array:["sint16","snorm16",2]}[e.constructor.name];if(a&&(s===2||s===4)&&!n.isInterleavedBufferAttribute){const h=(i?a[1]:a[0])+"x"+s,l=r(i?"f32":e instanceof Uint8Array||e instanceof Uint16Array?"u32":"i32");return{format:h,wgsl:l,bytesPerComponent:a[2],itemSize:s}}return{format:s===1?"float32":`float32x${s}`,wgsl:r("f32"),bytesPerComponent:4,itemSize:s,converted:!0}}const Sr=`
struct FSIn { @builtin( position ) pos: vec4f, @location( 0 ) uv: vec2f };
@vertex fn vs( @builtin( vertex_index ) i: u32 ) -> FSIn {
	let p = vec2f( f32( ( i << 1u ) & 2u ), f32( i & 2u ) );
	var o: FSIn;
	o.pos = vec4f( p * 2.0 - 1.0, FS_DEPTH, 1.0 );
	o.uv = vec2f( p.x, 1.0 - p.y );
	return o;
}
`;class zr{constructor({label:t="fullscreen",modules:e=[],bindings:s={},code:i,colorFormats:r=["rgba16float"],blend:a="none",defines:h={},depthFormat:l=null,depthCompare:o="always",depthWrite:c=!1,depth:u=0,writeMasks:f=null,blends:m=null}){this.label=t,this.colorFormats=r;const x=i.includes("@fragment")?i:`${i}
@fragment fn fs( in: FSIn ) -> @location( 0 ) vec4f { return fragment( in ); }
`,d=oi({modules:[mt,...e],bindings:s,code:Sr.replace("FS_DEPTH",u.toFixed(6))+x,defines:h,stage:"render",label:t});this.source=d.code,this.bindings=d.bindings;const g=hi(d.code,t),y={label:t,layout:B.device.createPipelineLayout({bindGroupLayouts:[d.group0.layout,d.bindings.layout]}),vertex:{module:g,entryPoint:"vs"},fragment:{module:g,entryPoint:"fs",targets:r.map((w,v)=>({format:w,blend:re(m?m[v]:v===0?a:"none"),writeMask:f?f[v]:GPUColorWrite.ALL}))},primitive:{topology:"triangle-list"}};l&&(y.depthStencil={format:l,depthCompare:o,depthWriteEnabled:c}),this.handle=B.renderPipeline(y),this.timestampWrites=null}get pipeline(){return B.ready(this.handle)}draw(t,e=Z){t.setPipeline(B.ready(this.handle)),t.setBindGroup(0,ai(e,"render").getBindGroup()),t.setBindGroup(1,this.bindings.getBindGroup()),t.draw(3)}render({colorViews:t,clear:e=null,viewport:s=null,frameBlock:i=Z,depthView:r=null,encoder:a=B.getEncoder()}={}){const h=t.map(c=>c.isTexture?c.view({dimension:"2d",mipLevelCount:1}):c),l={label:this.label,colorAttachments:h.map(c=>({view:c,loadOp:e?"clear":"load",storeOp:"store",clearValue:e||[0,0,0,0]}))};r&&(l.depthStencilAttachment={view:r,depthLoadOp:"load",depthStoreOp:"store"}),this.timestampWrites&&(l.timestampWrites=this.timestampWrites);const o=a.beginRenderPass(l);s&&o.setViewport(...s),this.draw(o,i),o.end()}}new N;new N;const Ie=[];for(let n=0;n<8;n++)Ie.push(new S);const Lt=new S,Pr=new S(0,1,0),Fs=new N,Ar=new S,Cr=new G;class kr{constructor({size:t=2048,splits:e=[10,60,400],lightMargin:s=200,normalBias:i=[.015,.06,.3],bias:r=2e-5,pcssCascades:a=1}={}){this.size=t,this.splits=e,this.count=e.length,this.lightMargin=s,this.normalBias=i,this.periods=e.map((l,o)=>o===0?1:o===1?2:4),this.texture=new Ce({label:"sunShadowMap",width:t,height:t,depth:this.count,dimension:"2d-array",format:"depth32float",usage:["sample","render"]}),dr(this.texture),this.cascades=e.map((l,o)=>({camera:{matrixWorld:new N,matrixWorldInverse:new N,projectionMatrix:new N,near:0,far:1,reversedDepth:!1,updateMatrixWorld(){},isCamera:!0,isShadowCamera:!0},block:hr("shadowView"+o),viewProj:new N,radius:0,dirty:!0})),this.enabled=!0,this.layerMask=4294967295,this.frame=0,this.lastSun=new S(0,-2,0);const h=Ot.fields;h.count.value=this.count,h.mapSize.value=t,h.bias.value=r,h.pcssCascades.value=a,h.enabled.value=1}_margin(t){const e=this.splits[this.count-1],s=t/e;return Math.max(.25*s*s,.25*s)*e}_fit(t,e,s){const i=this.cascades[t],r=t===0?0:this.splits[t-1],a=this.splits[t],h=this._margin(r),l=this._margin(a),o=Math.max(e.near,r-h*.5),c=t===this.count-1?a:a+l*.5;Ot.fields.blend.value[t]=new G(r,a,h,l);const u=Math.tan(e.fov*Math.PI/360),f=u*e.aspect;let m=0;for(const C of[o,c])for(const T of[-1,1])for(const E of[-1,1])Ie[m++].set(T*f*C,E*u*C,-C).applyMatrix4(e.matrixWorld);const x=Math.min(c,(o+c)/2*(1+f*f+u*u));Lt.set(0,0,-x).applyMatrix4(e.matrixWorld);let d=0;for(const C of Ie)d=Math.max(d,C.distanceTo(Lt));d=Math.ceil(d*16)/16,i.radius=d;const g=i.camera,y=s,w=Math.abs(y.y)>.99?Ar.set(1,0,0):Pr;g.matrixWorld.lookAt(y,new S(0,0,0),w),Fs.copy(g.matrixWorld).invert();const v=2*d/this.size,_=Cr.set(Lt.x,Lt.y,Lt.z,1).applyMatrix4(Fs);_.x=Math.round(_.x/v)*v,_.y=Math.round(_.y/v)*v;const k=d+this.lightMargin,I=new S(_.x,_.y,_.z+k).applyMatrix4(g.matrixWorld);g.matrixWorld.setPosition(I),g.matrixWorldInverse.copy(g.matrixWorld).invert();const p=.1,M=k+d;g.near=p,g.far=M,Ir(g.projectionMatrix,-d,d,d,-d,p,M),i.viewProj.multiplyMatrices(g.projectionMatrix,g.matrixWorldInverse);const b=Ot.fields;b.matrices.value[t]=i.viewProj.clone(),b.cascades.value[t]=new G(c,v,this.normalBias[t]??.05,M-p)}update(t,e){if(this.frame++,Ot.fields.enabled.value=this.enabled&&e.y>-.05?1:0,!this.enabled)return[];t.updateMatrixWorld();const s=this.lastSun.angleTo(e)>1e-4;this.lastSun.copy(e);const i=[];for(let r=0;r<this.count;r++)(s||this.cascades[r].dirty||(this.frame+r)%this.periods[r]===0)&&(this._fit(r,t,e),this.cascades[r].dirty=!1,i.push(r));return i}render(t,e,s){for(const i of s){const r=this.cascades[i];ci(r.camera,this.size,this.size,{block:r.block}),e.render(t,{label:"shadow cascade "+i,kind:"depth",camera:r.camera,frameBlock:r.block,depthView:this.texture.view({dimension:"2d",baseArrayLayer:i,arrayLayerCount:1}),depthFormat:"depth32float",clearDepth:1,depthCompare:"less-equal",layerMask:this.layerMask,depthBias:2,depthBiasSlopeScale:1.5})}}}function Ir(n,t,e,s,i,r,a){const h=1/(e-t),l=1/(s-i),o=1/(a-r);return n.set(2*h,0,0,-(e+t)*h,0,2*l,0,-(s+i)*l,0,0,-o,-r*o,0,0,0,1),n}function xi(n){let t=n>>>0;return function(){t|=0,t=t+1831565813|0;let s=Math.imul(t^t>>>15,1|t);return s=s+Math.imul(s^s>>>7,61|s)^s,((s^s>>>14)>>>0)/4294967296}}function Te(n){return Math.atan2(Math.sin(n),Math.cos(n))}function Ut(n,t,e){return n+Te(t-n)*e}const Tr=7,Br=4,Fr=8;function Nr({fish:n=46,halfW:t=8,halfH:e=4.5,cx:s=0,cy:i=0,seed:r=7}={}){const a=xi(r),h=Math.max(1,Math.min(80,n|0)),l=[],o=[],c=[],u={x:s+t*.06,y:i-e*.04};let f=1,m=0,x=0;const d={halfW:t,halfH:e,cx:s,cy:i},g=Math.max(4,Math.round(h*.34));for(let p=0;p<h;p++){const M=p<g,b=a(),C=b<.34?0:b<.6?1:b<.8?2:3,T=1.05+a()*.7;let E,z,A;if(M){const P=a()*Math.PI*2,F=Math.sqrt(a())*Math.min(t,e)*.22;E=u.x+Math.cos(P)*F,z=u.y+Math.sin(P)*F*.72,A=P+.4}else{const P=a()*Math.PI*2,F=.15+Math.sqrt(a())*.72;E=s+Math.cos(P)*t*F*.78,z=i+Math.sin(P)*e*F*.78,A=a()*Math.PI*2}l.push({x:E,y:z,heading:A,targetHeading:A,speed:.45+a()*.25,cruise:.52+a()*.38,len:T,phase:a()*Math.PI*2,hz:4.2+a()*2.4,pattern:C,seed:a()*20+.2,school:M,orbit:.35+a()*.95,retarget:.4+a()*1.6,seek:null,seekDist:99,z:.08+a()*.1})}function y(p,M,b){c.push({x:p,y:M,age:0,amp:b}),c.length>Fr&&c.shift()}function w(p){for(let M=0;M<o.length;M++)if(o[M].id===p)return o[M];return null}function v(p,M,b=0,C=0){d.halfW=Math.max(.5,p),d.halfH=Math.max(.5,M),d.cx=b,d.cy=C;const T=d.halfW*.84,E=d.halfH*.8;for(const z of l)z.x=Math.min(d.cx+T,Math.max(d.cx-T,z.x)),z.y=Math.min(d.cy+E,Math.max(d.cy-E,z.y))}function _(p,M){const b=(p-d.cx)/d.halfW,C=(M-d.cy)/d.halfH;if(b*b+C*C>1.2)return!1;if(o.length>=Br){const A=o.shift();for(const P of l)P.seek===A.id&&(P.seek=null)}const T={id:f++,x:p,y:M,life:9,splashed:!1};o.push(T),y(p,M,1);const E=l.map((A,P)=>({index:P,d:Math.hypot(A.x-p,A.y-M)})).sort((A,P)=>A.d-P.d),z=Math.min(Tr,E.length);for(let A=0;A<z;A++)l[E[A].index].seek=T.id;return!0}function k(p,M){let b=p.targetHeading;const C=p.seek!=null?w(p.seek):null;if(p.seek!=null&&!C&&(p.seek=null),C)b=Math.atan2(C.y-p.y,C.x-p.x),p.seekDist=Math.hypot(C.x-p.x,C.y-p.y);else if(p.school){const $=m*.22+p.phase,lt=u.x+Math.cos($)*p.orbit,Ft=u.y+Math.sin($*.9)*p.orbit*.7,Nt=Math.atan2(Ft-p.y,lt-p.x);b=Ut(p.targetHeading,Nt,.72),p.seekDist=99}else p.seekDist=99;const T=(p.x-d.cx)/(d.halfW*.8),E=(p.y-d.cy)/(d.halfH*.76),z=T*T+E*E;if(z>1){const $=Math.atan2(d.cy-p.y,d.cx-p.x);b=Ut(b,$,Math.min(1,(z-1)*1.5))}let A=0,P=0;const F=Math.max(.2,p.len*.16);for(let $=0;$<l.length;$++){const lt=l[$];if(lt===p)continue;const Ft=p.x-lt.x,Nt=p.y-lt.y,fe=Ft*Ft+Nt*Nt,de=(p.len+lt.len)*.28;if(fe<de*de&&fe>1e-8){const He=Math.sqrt(fe),qe=(de-He)/He;A+=Ft*qe,P+=Nt*qe}}if(A!==0||P!==0){const $=Math.atan2(P,A),lt=C&&p.seekDist<F*2.2;b=Ut(b,$,lt?.15:.42)}const D=C?.38*p.len:.9*p.len,V=Math.max(p.speed,.15)/Math.max(D,.15)*M,K=Math.max(-V,Math.min(V,Te(b-p.heading)));p.heading=Te(p.heading+K);let xt=p.cruise*(.86+.14*Math.sin(m*.35+p.phase));if(C){const $=p.seekDist<.7?Math.max(.22,p.seekDist/.7):1;xt=p.cruise*1.75*$}const gt=1.1*M;p.speed+=Math.max(-gt,Math.min(gt,xt-p.speed));const vi=Math.sin(m*p.hz+p.phase)*(C&&p.seekDist<F?.22:.07),$e=p.heading+vi;p.x+=Math.cos($e)*p.speed*M,p.y+=Math.sin($e)*p.speed*M;const jt=d.halfW*.86,Xt=d.halfH*.82;if((p.x>d.cx+jt||p.x<d.cx-jt||p.y>d.cy+Xt||p.y<d.cy-Xt)&&(p.x=Math.min(d.cx+jt,Math.max(d.cx-jt,p.x)),p.y=Math.min(d.cy+Xt,Math.max(d.cy-Xt,p.y)),p.heading=Ut(p.heading,Math.atan2(d.cy-p.y,d.cx-p.x),.45)),p.retarget-=M,p.retarget<=0&&!C){if(p.targetHeading=p.heading+(a()-.5)*1.5,p.school){const $=Math.atan2(u.y-p.y,u.x-p.x);p.targetHeading=Ut(p.targetHeading,$,.6)}p.retarget=1.2+a()*2.4}C&&p.seekDist<F&&(C.life-=M*2.4,p.speed*=.9,C.splashed||(C.splashed=!0,y(C.x,C.y,.55)))}function I(p){const M=Math.max(0,Math.min(p,.1));if(M!==0){m+=M,u.x=d.cx+Math.cos(m*.07)*d.halfW*.16,u.y=d.cy+Math.sin(m*.05)*d.halfH*.14;for(let b=0;b<l.length;b++)k(l[b],M);for(let b=c.length-1;b>=0;b--)c[b].age+=M,c[b].age>4.4&&c.splice(b,1);for(let b=o.length-1;b>=0;b--){const C=o[b];if(C.life-=M*.28,C.life<=0){x++,y(C.x,C.y,.35),o.splice(b,1);for(const T of l)T.seek===C.id&&(T.seek=null)}}}}return{fish:l,foods:o,ripples:c,bounds:d,get time(){return m},get eaten(){return x},step:I,feed:_,setBounds:v}}function Ns(n,t,e){const s=Math.min(1,Math.max(0,(e-n)/(t-n)));return s*s*(3-2*s)}function Er(n){const t=Ns(0,.2,n),e=Ns(.74,1,n),s=Math.sin(Math.PI*Math.min(1,Math.max(0,n)));let i=.046+Math.pow(s,.7)*.2;return i*=.38+.62*t,i*=1-e*.72,i}function Rr(){const n=[],t=[],e=[],s=[];function i(v,_,k,I,p){return n.push(v,_,k),t.push(0,0,1),e.push(I,p),n.length/3-1}const r=18,a=[];for(let v=0;v<=r;v++){const _=v/r,k=-.92+_*1.72,I=Er(_);a.push([i(k,I,.02,_,1),i(k,-I,.02,_,-1)])}for(let v=0;v<r;v++){const[_,k]=a[v],[I,p]=a[v+1];s.push(_,I,k,k,I,p)}const h=i(-.92,0,.02,0,0),l=7,o=[];for(let v=0;v<l;v++){const _=v/(l-1),k=(_-.5)*.86,I=.34+Math.cos((_-.5)*Math.PI)*.2;o.push(i(-.92-I,k,.018,-.28,(_-.5)*2))}for(let v=0;v<l-1;v++)s.push(h,o[v],o[v+1]);const c=.12,u=.1,f=i(c+.1,u*.35,.025,.7,.4),m=i(c-.02,u*.7,.025,.55,.7),x=i(c+.02,u+.16,.02,-.12,1.2);s.push(f,x,m);const d=i(c+.1,-u*.35,.025,.7,-.4),g=i(c-.02,-u*.7,.025,.55,-.7),y=i(c+.02,-.26,.02,-.12,-1.2);s.push(d,g,y);const w=new ot;return w.setAttribute("position",new bt(n,3)),w.setAttribute("normal",new bt(t,3)),w.setAttribute("uv",new bt(e,2)),w.setIndex(s),w}const Be=new Tt("PondParams",{ripples:["vec4f[8]",new Float32Array(32)],bounds:["vec4f",[8,4.5,0,0]]},{label:"pond"}),Dr=`
fn rippleDisp(p: vec2f) -> vec2f {
  var d = vec2f(0.0);
  for (var i = 0u; i < 8u; i = i + 1u) {
    let rip = pondParams.ripples[i];
    if (rip.w <= 0.01) { continue; }
    let o = p - rip.xy;
    let dist = length(o);
    let rad = rip.z * 1.2;
    let band = exp(-pow2((dist - rad) * 5.2)) * exp(-rip.z * 0.72) * rip.w;
    d += o * (1.0 / max(dist, 0.05)) * band * 0.28;
  }
  return d;
}

fn rippleRing(p: vec2f) -> f32 {
  var a = 0.0;
  for (var i = 0u; i < 8u; i = i + 1u) {
    let rip = pondParams.ripples[i];
    if (rip.w <= 0.01) { continue; }
    let dist = length(p - rip.xy);
    let rad = rip.z * 1.2;
    a += exp(-pow2((dist - rad) * 7.5)) * exp(-rip.z * 0.62) * rip.w;
  }
  return a;
}

fn pondShore(p: vec2f) -> f32 {
  let q = (p - pondParams.bounds.zw) / max(pondParams.bounds.xy, vec2f(0.001));
  return smoothstep(0.7, 1.16, length(q * vec2f(1.0, 1.04)));
}

fn pondCaustic(p: vec2f, t: f32) -> f32 {
  // Wide ribbons where a smooth noise sum crosses zero. Same idea as the WebGL
  // pond: not Voronoi edges (cracked glass) and not sine ovals.
  let q = p + rippleDisp(p);
  let s = 0.46;
  let n1 = mx_noise_float2(q * s + vec2f(t * 0.05, -t * 0.035));
  let n2 = mx_noise_float2(q * (s * 1.22) + vec2f(n1 * 0.55, -n1 * 0.35) + vec2f(-t * 0.038, t * 0.028));
  let band = pow(sat(1.0 - abs(n1 + n2 * 0.85) * 1.12), 3.6);
  let m1 = mx_noise_float2(vec2f(q.y, q.x) * (s * 0.86) + vec2f(2.2, -t * 0.042));
  let m2 = mx_noise_float2(vec2f(q.y, q.x) * (s * 1.05) + vec2f(m1 * 0.45 + 1.4, 0.6) + vec2f(t * 0.03, 1.3));
  let cross = pow(sat(1.0 - abs(m1 + m2 * 0.8) * 1.15), 4.0);
  return sat(band * 0.92 + cross * 0.48);
}
`,We=new Bt({name:"pond",deps:[mt],uniforms:Be,uniformName:"pondParams",code:Dr}),$t={lit:!1,side:"double",roughness:1,metalness:0};function Ht(n){const t=new cr(n);return t.lightingHooks=!1,t}function Lr(){return Ht({...$t,name:"pond-floor",modules:[We],surface:`
      let p = in.P.xy;
      let shore = pondShore(p);
      let q = length((p - pondParams.bounds.zw) / max(pondParams.bounds.xy, vec2f(0.001)));
      let n = mx_noise_float2(p * 1.35);
      let n2 = mx_noise_float2(p * 4.8 + vec2f(3.0, 8.0));
      let cell = mx_cell_noise_float2(p * 6.5);
      let deep = vec3f(0.028, 0.11, 0.09);
      let midc = vec3f(0.05, 0.17, 0.135);
      let shallow = vec3f(0.09, 0.26, 0.19);
      var col = mix(shallow, midc, smoothstep(0.1, 0.55, q));
      col = mix(col, deep, smoothstep(0.5, 1.02, q));
      col *= 0.9 + 0.14 * n + 0.07 * n2;
      col *= 0.93 + 0.09 * cell;
      let cau = pondCaustic(p, frame.time);
      col += vec3f(0.7, 0.98, 0.52) * cau * mix(1.35, 0.28, shore);
      col += vec3f(0.45, 0.62, 0.42) * rippleRing(p);
      col = mix(col, vec3f(0.03, 0.07, 0.045), shore * 0.42);
      s.albedo = col;
      s.emissive = vec3f(0.0);
      s.alpha = 1.0;
    `})}function Ur(){return Ht({...$t,name:"koi",modules:[We],attributes:{aFish:"vec4f"},varyings:{vFish:"vec4f"},vertex:`
      o.vFish = v.aFish;
      let along = v.position.x;
      let tailW = sat(0.2 - along);
      let fin = select(0.0, 1.0, v.uv.x < 0.0);
      let phase = frame.time * v.aFish.z + v.aFish.y;
      let wave = sin(phase - along * 4.6);
      v.position.y += wave * (tailW * 0.3 + fin * 0.11);
      v.position.y += sin(phase * 1.35) * fin * sign(v.position.y) * 0.05;
    `,surface:`
      let kind = in.vs.vFish.x;
      let seed = in.vs.vFish.w;
      let u = sat(in.uv.x);
      let v = clamp(in.uv.y, -1.2, 1.2);
      let across = abs(v);
      let n = mx_noise_float2(vec2f(u * 2.6, v * 1.15) + seed);
      let n2 = mx_noise_float2(vec2f(u * 5.4, v * 2.1) + seed * 2.7);
      var col: vec3f;
      if (kind < 0.5) {
        let blotch = smoothstep(0.02, 0.28, n) * smoothstep(0.12, 0.4, u) * (1.0 - smoothstep(0.88, 0.98, u));
        let broken = smoothstep(-0.15, 0.2, n2);
        let red = vec3f(0.78, 0.08, 0.04);
        let white = vec3f(0.9, 0.88, 0.82);
        col = mix(white, red, sat(blotch * broken));
        let tancho = smoothstep(0.2, 0.05, length(vec2f((u - 0.8) * 1.7, v * 0.85))) * step(0.62, fract(seed * 1.7));
        col = mix(col, red, tancho);
      } else if (kind < 1.5) {
        let belly = smoothstep(0.15, 0.85, across);
        col = mix(vec3f(0.92, 0.28, 0.04), vec3f(0.98, 0.58, 0.22), belly * 0.55);
        col = mix(col, vec3f(0.62, 0.16, 0.02), smoothstep(0.15, 0.75, n2) * 0.4);
      } else if (kind < 2.5) {
        let flash = mix(vec3f(0.78, 0.24, 0.05), vec3f(0.82, 0.8, 0.74), step(0.55, fract(seed * 2.3)));
        col = mix(vec3f(0.045, 0.046, 0.05), flash, smoothstep(0.12, 0.55, n) * smoothstep(0.08, 0.3, u));
      } else {
        col = mix(vec3f(0.78, 0.84, 0.86), vec3f(0.42, 0.5, 0.56), smoothstep(-0.1, 0.55, n) * 0.55);
        col = mix(col, vec3f(0.9, 0.93, 0.95), smoothstep(0.35, 0.02, across) * 0.35);
      }
      let rim = smoothstep(0.55, 1.05, across);
      col = mix(col, col * vec3f(0.35, 0.4, 0.38), rim * 0.85);
      let scaleLine = 0.5 + 0.5 * sin(u * 52.0 + v * 8.0);
      col *= 0.94 + 0.06 * scaleLine;
      let eyeU = 0.8;
      let eyeV = 0.38;
      let e = min(length(vec2f((u - eyeU) * 2.4, v - eyeV)), length(vec2f((u - eyeU) * 2.4, v + eyeV)));
      let pupil = smoothstep(0.11, 0.04, e) * step(0.55, u);
      let glint = smoothstep(0.04, 0.0, length(vec2f((u - 0.83) * 2.8, abs(v) - eyeV - 0.03)));
      col = mix(col, vec3f(0.02, 0.02, 0.025), pupil);
      col = mix(col, vec3f(0.95, 0.95, 0.9), glint * pupil);
      let cau = pondCaustic(in.P.xy, frame.time);
      let water = vec3f(0.18, 0.38, 0.28);
      col = mix(col, water, 0.045);
      col += vec3f(0.35, 0.5, 0.28) * cau * 0.16;
      s.albedo = col;
      s.alpha = 1.0;
    `})}function Or(){return Ht({...$t,name:"koi-shadow",transparent:!0,depthWrite:!1,surface:`
      let q = in.uv * 2.0 - 1.0;
      let r = length(q);
      s.albedo = vec3f(0.02, 0.05, 0.04);
      s.alpha = smoothstep(1.0, 0.15, r) * 0.32;
    `})}function Vr(){return Ht({...$t,name:"food",surface:`
      let q = in.uv * 2.0 - 1.0;
      let r = length(q);
      let col = mix(vec3f(0.62, 0.36, 0.12), vec3f(0.4, 0.22, 0.08), smoothstep(0.2, 0.95, r));
      s.albedo = col;
      s.alpha = 1.0;
    `})}function Wr(){return Ht({...$t,name:"plants",modules:[We],transparent:!0,depthWrite:!1,attributes:{aPlant:"vec4f"},varyings:{vPlant:"vec4f"},vertex:`
      o.vPlant = v.aPlant;
      v.position.z += sin(frame.time * 0.55 + v.aPlant.w) * 0.012;
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
        col = mix(vec3f(0.02, 0.1, 0.045), vec3f(0.1, 0.26, 0.08), shade);
        col = mix(col, col * 0.62, smoothstep(0.4, 0.95, rad));
      } else if (kind < 1.5) {
        let n = mx_noise_float2(q * 2.8 + seed);
        let scallop = 0.045 * sin(ang * 8.0 + seed);
        let r = rad * (0.9 + 0.1 * n) - scallop;
        let dAng = abs(atan2(sin(ang - 0.18), cos(ang - 0.18)));
        let notch = smoothstep(0.5, 0.04, dAng) * smoothstep(0.16, 0.7, rad);
        mask = smoothstep(1.02, 0.86, r) * (1.0 - notch);
        let veins = pow(abs(cos(ang * 5.0 + seed * 0.2)), 10.0) * smoothstep(0.05, 0.7, rad);
        col = mix(vec3f(0.04, 0.22, 0.07), vec3f(0.16, 0.42, 0.12), shade);
        col = mix(vec3f(0.02, 0.12, 0.04), col, smoothstep(0.0, 0.38, rad));
        col = mix(col, vec3f(0.28, 0.5, 0.16), smoothstep(0.7, 0.98, rad) * 0.65);
        col = mix(col, col * 0.45, veins);
        let mot = mx_noise_float2(in.P.xy * 2.2 + seed);
        col = mix(col, col * vec3f(0.82, 1.08, 0.78), mot * 0.28);
      } else {
        let petals = pow(sat(0.64 + 0.36 * cos(ang * 7.0 + seed)), 0.7);
        let petalRad = rad / max(petals, 0.35);
        mask = smoothstep(1.0, 0.62, petalRad) * smoothstep(0.0, 0.05, rad);
        let center = smoothstep(0.32, 0.08, rad);
        let pink = mix(vec3f(0.78, 0.18, 0.34), vec3f(0.98, 0.62, 0.7), sat(1.0 - rad * 0.8));
        col = mix(pink, vec3f(0.98, 0.82, 0.32), center);
      }
      let cau = pondCaustic(in.P.xy, frame.time);
      col += vec3f(0.22, 0.32, 0.18) * cau * 0.28;
      s.albedo = col;
      s.alpha = sat(mask);
    `})}const Gr=`
fn fragment(in: FSIn) -> vec4f {
  var c = textureLoad(hdr, vec2i(in.pos.xy), 0).rgb;
  c *= 0.96;
  c = c / (c + vec3f(0.95));
  let uv = in.uv;
  let vig = smoothstep(1.15, 0.38, length((uv - 0.5) * vec2f(1.05, 1.22)));
  c *= mix(0.62, 1.0, vig);
  c = mix(c, c * vec3f(0.86, 1.1, 1.02), 0.4);
  let grain = (interleavedGradientNoise(in.pos.xy + vec2f(frame.time * 17.0, 0.0)) - 0.5) * 0.012;
  return vec4f(linearToSrgb(sat3(c + grain)), 1.0);
}
`,Es=new S,Rs=new X,Ds=new S,Ls=new N,$r=new S(0,0,1),H=new S,dt=new S;function se(n,t,e,s,i,r,a,h){Es.set(e,s,i),Rs.setFromAxisAngle($r,r),Ds.set(a,h,1),Ls.compose(Es,Rs,Ds),n.setMatrixAt(t,Ls)}function Us(n){n.updateProjectionMatrix(),n.updateMatrixWorld(!0);let t=1/0,e=-1/0,s=1/0,i=-1/0;const r=[[-1,-1],[1,-1],[1,1],[-1,1]];for(let a=0;a<r.length;a++){const h=r[a][0],l=r[a][1];H.set(h,l,1).unproject(n),dt.set(h,l,0).unproject(n);const o=dt.z-H.z,c=Math.abs(o)<1e-6?0:(0-H.z)/o,u=H.x+(dt.x-H.x)*c,f=H.y+(dt.y-H.y)*c;u<t&&(t=u),u>e&&(e=u),f<s&&(s=f),f>i&&(i=f)}return{halfW:(e-t)*.5,halfH:(i-s)*.5,cx:(t+e)*.5,cy:(s+i)*.5}}function Hr(n){const t=[];function e(i,r,a,h){t.push({nx:i,ny:r,scaleN:a,kind:h,seed:n()*12+.2,shade:n(),phase:n()*Math.PI*2,rot:n()*Math.PI*2,squash:.82+n()*.28})}const s=[[-.98,-.92],[.98,-.92],[-.98,.92],[.98,.92]];for(let i=0;i<s.length;i++)for(let r=0;r<6;r++)e(s[i][0]+(n()-.5)*.32,s[i][1]+(n()-.5)*.26,.75+n()*.75,n()<.4?0:1);for(let i=0;i<18;i++){const r=n()*Math.PI*2,a=.76+n()*.3;e(Math.cos(r)*a,Math.sin(r)*a,.42+n()*.42,1)}for(let i=0;i<4;i++){const r=n()*Math.PI*2,a=.48+n()*.16;e(Math.cos(r)*a,Math.sin(r)*a,.36+n()*.22,1)}for(let i=0;i<5;i++){const r=(i+.35)/5*Math.PI*2,a=.7+n()*.18;e(Math.cos(r)*a,Math.sin(r)*a,.28+n()*.14,2)}return t.sort((i,r)=>i.kind-r.kind||r.scaleN-i.scaleN),t}async function qr({canvas:n=null,width:t=1280,height:e=720,fish:s=46,seed:i=7}={}){await B.init({canvas:n,headless:!n});const r=new kr({size:32,splits:[40],pcssCascades:0}),a=new Zs(24,t/Math.max(1,e),.15,90);a.position.set(0,0,26),a.lookAt(0,0,0);const h=Us(a),l=Nr({fish:s,halfW:h.halfW,halfH:h.halfH,cx:h.cx,cy:h.cy,seed:i}),o=new Gs,c=new Le(new Hi(1,1),Lr());c.frustumCulled=!1,c.renderOrder=0;const u=Rr(),f=new Float32Array(l.fish.length*4);for(let z=0;z<l.fish.length;z++){const A=l.fish[z];f[z*4]=A.pattern,f[z*4+1]=A.phase,f[z*4+2]=A.hz,f[z*4+3]=A.seed}u.setAttribute("aFish",new Mt(f,4));const m=new wt(u,Ur(),l.fish.length);m.frustumCulled=!1,m.renderOrder=1;const x=new wt(new Me(1,18),Or(),l.fish.length);x.frustumCulled=!1,x.renderOrder=0;const d=new wt(new Me(1,14),Vr(),4);d.count=0,d.frustumCulled=!1,d.renderOrder=2;const g=Hr(xi(i+101>>>0)),y=new Me(1,28),w=new Float32Array(g.length*4);for(let z=0;z<g.length;z++){const A=g[z];w[z*4]=A.kind,w[z*4+1]=A.seed,w[z*4+2]=A.shade,w[z*4+3]=A.phase}y.setAttribute("aPlant",new Mt(w,4));const v=new wt(y,Wr(),g.length);v.frustumCulled=!1,v.renderOrder=1,o.add(c,m,d,x,v);const _=new ms(t,e,{colors:["rgba16float"],depth:"depth32float",label:"pond-scene"}),k=new ms(t,e,{colors:["rgba8unorm"],label:"pond-ldr"}),I=n?B.format:"rgba8unorm",p=new zr({label:"pond-grade",colorFormats:[I],bindings:{hdr:{texture:()=>_.texture}},code:Gr}),M=new br;M.syncPipelines=!0;const b={canvas:n,camera:a,sim:l,ldr:k,shadows:r,width:t,height:e,_dt:1/30,get halfW(){return l.bounds.halfW},get halfH(){return l.bounds.halfH},get centerX(){return l.bounds.cx},get centerY(){return l.bounds.cy},get stats(){return M.stats},get time(){return l.time},feed(z,A){return l.feed(z,A)},step(z){b._dt=z,l.step(z),T()},resize(z,A){b.width=Math.max(1,z|0),b.height=Math.max(1,A|0),a.aspect=b.width/b.height;const P=Us(a);l.setBounds(P.halfW,P.halfH,P.cx,P.cy);const F=Math.max(P.halfW,P.halfH)*4.2;c.scale.set(F,F,1),_.setSize(b.width,b.height),k.setSize(b.width,b.height),C(),T()},render(){B.beginFrame(),Z.fields.time.value=l.time,Z.fields.dt.value=b._dt,Z.fields.frameIndex.value=Z.fields.frameIndex.value+1>>>0,Be.fields.bounds.value=[l.bounds.halfW,l.bounds.halfH,l.bounds.cx,l.bounds.cy],E(),ci(a,b.width,b.height),M.render(o,{camera:a,kind:"color",label:"pond",colorViews:[_.texture.view()],colorFormats:["rgba16float"],clearColors:[[.08,.2,.16,1]],depthView:_.depthTexture.view(),depthFormat:"depth32float",clearDepth:0});const z=n?B.context.getCurrentTexture().createView():k.texture.view();p.render({colorViews:[z]}),B.submit()},pick(z,A,P){const F=(z-P.left)/P.width*2-1,D=-((A-P.top)/P.height*2-1);a.updateProjectionMatrix(),a.updateMatrixWorld(!0),H.set(F,D,1).unproject(a),dt.set(F,D,0).unproject(a);const V=dt.z-H.z;if(Math.abs(V)<1e-6)return null;const K=(0-H.z)/V;return{x:H.x+(dt.x-H.x)*K,y:H.y+(dt.y-H.y)*K}}};function C(){const z=Math.min(l.bounds.halfW,l.bounds.halfH);for(let A=0;A<g.length;A++){const P=g[A],F=l.bounds.cx+P.nx*l.bounds.halfW,D=l.bounds.cy+P.ny*l.bounds.halfH,V=P.scaleN*(z/5.15),K=.48+P.kind*.03;se(v,A,F,D,K,P.rot,V,V*P.squash)}v.instanceMatrix.needsUpdate=!0}function T(){for(let z=0;z<l.fish.length;z++){const A=l.fish[z],P=A.len/1.72;se(m,z,A.x,A.y,A.z,A.heading,P,P*.9);const F=A.len*.48,D=Math.cos(A.heading)*.05,V=Math.sin(A.heading)*.05;se(x,z,A.x-D,A.y-V,.035,A.heading,F,F*.36)}m.instanceMatrix.needsUpdate=!0,x.instanceMatrix.needsUpdate=!0,d.count=l.foods.length;for(let z=0;z<l.foods.length;z++){const A=l.foods[z],P=.085+Math.sin(l.time*5+z)*.012;se(d,z,A.x,A.y,.32,l.time*.4,P,P)}d.instanceMatrix.needsUpdate=!0}function E(){const z=Be.fields.ripples.value;z.fill(0);const A=Math.min(8,l.ripples.length);for(let P=0;P<A;P++){const F=l.ripples[P],D=P*4;z[D]=F.x,z[D+1]=F.y,z[D+2]=F.age,z[D+3]=F.amp}}return b.resize(t,e),b}const ue=new URLSearchParams(location.search);function qt(n,t){const e=ue.get(n);if(e==null||e==="")return t;const s=Number(e);return Number.isFinite(s)?s:t}const J=document.getElementById("pond"),oe=document.getElementById("hint"),Se=document.getElementById("err"),he=document.getElementById("perf"),jr=Math.max(1,Math.min(80,qt("fish",46)|0)),Xr=Math.max(8,Math.min(60,qt("fps",30))),Os=Math.max(480,qt("res",1440)),Yr=Math.max(.25,qt("dpr",1)),Zr=ue.get("demo")==="1",Kr=qt("seed",7)|0,Jr=!!(window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches),gi=ue.get("perf")==="1";ue.get("ui")==="0"&&oe&&(oe.hidden=!0);gi&&he&&(he.style.display="block");function Vs(){const n=Math.max(1,window.innerWidth),t=Math.max(1,window.innerHeight),e=Math.min(window.devicePixelRatio||1,Yr);let s=Math.max(1,Math.round(n*e)),i=Math.max(1,Math.round(t*e));const r=Math.max(s,i);if(r>Os){const a=Os/r;s=Math.max(1,Math.round(s*a)),i=Math.max(1,Math.round(i*a))}return{w:s,h:i}}function Qr(n){return String(n).replace(/[&<>]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;"})[t])}function tn(n){J&&(J.style.display="none"),oe&&(oe.hidden=!0),Se&&(Se.style.display="block",Se.innerHTML=`<h1>WebGPU 没能启动</h1><p>${Qr(n&&n.message?n.message:n)}</p><p>这条演示只在较新的 Chrome、Edge 或 Safari 里运行，不能当作 Lively 壁纸。桌面请继续用仓库根目录的 WebGL 锦鲤池 <code>index.html</code>（<a href="https://github.com/cnwinds/koi-pond-wallpaper">仓库</a>）。Lively 和 WebView2 里经常没有 WebGPU。</p>`)}let ae=!1,Fe=document.hidden,Gt=0,It=0,Vt=0,ze=0,ie=0,le=null;function en(){return le??Xr}function Ws(n){Fe=n,Fe||(It=performance.now(),Vt=0,Gt||(Gt=requestAnimationFrame(Ge)))}let W=null,Pe=2.2;function Ge(n){if(Gt=0,Fe||document.hidden||ae||!W)return;const t=It?Math.min(.1,(n-It)/1e3):0;It=n,Vt+=t;const e=1/en();if(Vt>=e){const s=Math.min(Vt,.1)*(Jr?.25:1);if(Vt=0,Zr&&(Pe+=s,Pe>4.5)){Pe=0;const i=Math.random()*Math.PI*2,r=.08+Math.random()*.35;W.feed(W.centerX+Math.cos(i)*W.halfW*r,W.centerY+Math.sin(i)*W.halfH*r)}if(W.step(s),W.render(),ze++,gi&&he&&(ie+=s,ie>=.5)){const i=W.stats;he.textContent=`${Math.round(ze/ie)} fps · ${W.width}×${W.height} · draws ${i.draws} · tris ${Math.round(i.triangles)}`,ze=0,ie=0}}Gt=requestAnimationFrame(Ge)}async function sn(){if(!navigator.gpu)throw new Error("navigator.gpu 不存在。");const n=Vs();J.width=n.w,J.height=n.h,W=await qr({canvas:J,width:n.w,height:n.h,fish:jr,seed:Kr}),window.addEventListener("resize",()=>{const t=Vs();t.w===J.width&&t.h===J.height||(J.width=t.w,J.height=t.h,W.resize(t.w,t.h))}),J.addEventListener("pointerdown",t=>{if(t.button!=null&&t.button!==0)return;const e=W.pick(t.clientX,t.clientY,J.getBoundingClientRect());e&&W.feed(e.x,e.y)}),document.addEventListener("visibilitychange",()=>Ws(document.hidden||ae)),window.addEventListener("blur",()=>{le=8}),window.addEventListener("focus",()=>{le=null,It=performance.now()}),window.livelyWallpaperPlaybackChanged=t=>{try{ae=!!(typeof t=="string"?JSON.parse(t):t).IsPaused,Ws(document.hidden||ae)}catch{}},document.addEventListener("contextmenu",t=>t.preventDefault()),It=performance.now(),document.hidden||(Gt=requestAnimationFrame(Ge))}sn().catch(tn);
