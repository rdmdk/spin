var main = document.querySelector("main");
var section = document.querySelector("section");
var button = document.querySelector("button");
var edit = document.querySelector(".edit");
var colors = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p"];
var list;
if (localStorage.list) list = localStorage.list;
else update();

list = list.split(",");
list.sort(() => Math.random() - 0.5);

function scale() {
	var ll = list.length;
	var scale;
	if (ll <= 10) scale = ll <= 5 ? 19 : 20;
	else if (ll <= 20) scale = ll <= 15 ? 17 : 18;
	else if (ll <= 30) scale = ll <= 25 ? 15 : 16;
	else if (ll <= 40) scale = ll <= 35 ? 13 : 14;
	else if (ll <= 50) scale = ll <= 45 ? 11 : 12;
	else if (ll <= 60) scale = ll <= 55 ? 9 : 10;
	else if (ll <= 70) scale = ll <= 65 ? 7 : 8;
	else if (ll <= 80) scale = ll <= 75 ? 5 : 6;
	else if (ll <= 90) scale = ll <= 85 ? 3 : 4;
	else if (ll <= 100) scale = ll <= 95 ? 1 : 2;
	else scale = 0;
	main.style.fontSize = scale + "rem";
}

function update() {
	var input = window.prompt("Enter a comma-delimmited list of initials", localStorage.list);
	if (input !== null && input !== localStorage.list) {
		if (input.match(/^[0-9]+$/gm)) {
			var n = parseInt(input);
			list = "";
		    	for (var i = 1; i <= n; i++) {
				list += i + ",";
			}
		} else if (input === "abc") list = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z";
		else if (input === "ci") list = "ac,alg,ba,da,dl,jl,li,mf,mt,on,rd,sl,sw,vz";
		else list = input;
		list = list.replace(/^\,|\,$/gm, "").replace(/\,+/gm, ",");
		localStorage.list = list;
	}
}

function setup() {
	section.innerHTML = "";
	list.forEach((a, i) => {
		section.insertAdjacentHTML("beforeend", "<div style='transform:translate(-50%, -50%) rotate(" + ((360 / list.length) * i).toFixed(1) + "deg)'><span title='Take me out'>" + a + "</span></div");
	});
	section.querySelectorAll("span").forEach((s) => {
		s.addEventListener("click", () => {
			list.splice(list.indexOf(s.innerText), 1);
			setup();
		});
	});
}

function shifting(a) {
	for (let i = 0; i < a; i++) {
		var b = list.shift();
		list.push(b);
	}
	setup();
}

function go() {
	var t = section.querySelector(".winner") ? 22e3 : 20e3;
	if (section.querySelector(".winner")) section.querySelector(".winner").classList.remove("winner");
	section.classList.add("spin");
	button.classList.add("marker");
	setTimeout(() => shifting(Math.floor(Math.random() * list.length) + 1), 2e3);
	setTimeout(() => {
		section.querySelector("div span").className = "winner";
		section.classList.remove("spin");
		setTimeout(() => button.classList.remove("marker"), 2e3);
	}, t);
}

scale();
setup();

button.addEventListener("click", () => {
	if (document.querySelectorAll("div").length > 1) go();
	else window.location.reload();
});

section.className = colors[Math.floor(Math.random() * colors.length)];

edit.addEventListener("click", () => {
	update();
	window.location.reload();
});
