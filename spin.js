var main = document.querySelector('main');
var section = document.querySelector('section');
var button = document.querySelector('button');
var button_span = button.querySelector('span');
var edit = document.querySelector('.edit');
var colors = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p'];
var list;

if (window.location.hash && window.location.hash !== '#') update(decodeURI(window.location.hash.substring(1)));
else if (localStorage.list) update(localStorage.list);
else update();

list = list.split(',');
list.sort(() => Math.random() - 0.5);

function spacing() {
	var l = list.length,
	fs1 = l <= 15 ? 9 : l <= 30 ? 10.5 : l <= 45 ? 11.5 : 12,
	fs2 = l <= 15 ? 0.4 : l <= 30 ? 0.15 : l <= 45 ? 0.1 : l <= 60 ? 0.075 : l <= 75 ? 0.04 : 0.04,
	s = 'main{font-size:' + fs1 + 'rem}span{font-size:' + fs2 + 'em}';
	
	if (document.head.querySelector('style')) document.head.querySelector('style').innerText = s;
	else document.head.insertAdjacentHTML('beforeend', '<style>' + s + '</style>');
}

function update(x) {
	var input = x ? x : window.prompt('Enter a comma-delimited list of initials', localStorage.list);
	if (input !== '' && input !== null) {
		if (input.match(/^[0-9]+$/gm)) {
			var n = parseInt(input);
			list = '';
		    	for (var i = 1; i <= n; i++) {
				list += i + ',';
			}
		} else if (input === 'abc') list = 'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z';
		else if (input === 'ci') list = 'cb,jp,li,mf,mo,on,pw,rd,sh,vz';
		else list = input;
		list = list.replace(/^\,|\,$/gm, '').replace(/\,+/gm, ',').toLowerCase();
		localStorage.list = list;
		spacing();
		setup();
	}
}

function setup() {
	section.innerHTML = '';
	button_span.innerText = '';
	if (typeof list === 'string') list.split(',');
	list.forEach((a, i) => {
		section.insertAdjacentHTML('beforeend', '<div style="transform:translate(-50%, -50%) rotate(' + ((360 / list.length) * i).toFixed(1) + 'deg)"><span title="Take me out">' + a + '</span></div');
	});
	spacing();
	section.querySelectorAll('span').forEach((s) => {
		s.addEventListener('click', () => {
			list.splice(list.indexOf(s.innerText.toLowerCase()), 1);
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
	if (!section.classList.contains('spin')) {
		button_span.innerText = '';
		if (section.querySelector('.winner')) section.querySelector('.winner').classList.remove('winner');
		section.classList.add('spin');
		button.classList.add('marker');
		setTimeout(() => shifting(Math.floor(Math.random() * list.length) + 1), 3e3);
		setTimeout(() => {
			section.querySelector('div span').className = 'winner';
			section.classList.remove('spin');
			button_span.innerText = section.querySelector('div span').innerText;
			setTimeout(() => button.classList.remove('marker'), 2e3);
		}, 15e3);
	} else return false;
}

spacing();
setup();

button.addEventListener('click', () => {
	if (document.querySelectorAll('div').length > 1) go();
	else window.location.reload();
});

window.addEventListener('keyup', (e) => {
	if ((e.which || e.keyCode) == 13 || (e.which || e.keyCode) == 32) {
		e.preventDefault();
		if (document.querySelectorAll('div').length > 1) go();
	}
});

var c = Math.floor(Math.random() * colors.length);
section.classList.add(colors[c]);
edit.classList.add(colors[c]);

edit.addEventListener('click', () => {
	update();
	//window.location.reload();
});
