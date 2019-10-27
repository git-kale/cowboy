let p1bullet, p1gun;
var para, node, winnode, winpara, p1time, p2time, start;



function startGame() {
	myGameArea.start();
}

var myGameArea = {
	canvas: document.createElement("canvas"),

	start: function () {
		let rand = 1 + 4000 * Math.random()
		console.log(rand)
		p1bullet = new component(10, 10, "./include/circle.svg", 10, 120, "p1bullet");
		p1gun = new component(30, 30, "./include/p1gun.png", 10, 120, "image");
		p2bullet = new component(10, 10, "./include/circle.svg", 430, 120, "p2bullet");
		p2gun = new component(30, 30, "./include/p2gun.png", 430, 120, "image");
		this.canvas.width = 480;
		this.canvas.height = 270;
		this.context = this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		this.frameNo = 0;
		this.interval = setInterval(updateGameArea, 1);

		var d = new Date();
		var n = d.getTime();

		// sleep time expects milliseconds
		function sleep(time) {
			return new Promise((resolve) => setTimeout(resolve, time));
		}

		// Usage!
		sleep(rand).then(() => {
			// Do something after the sleep!
			para = document.createElement("p");
			node = document.createTextNode("Go !!!");
			para.appendChild(node);

			var element = document.getElementById("div1");
			element.appendChild(para);
			var d = new Date();
			start = d.getTime();


		});

	},
	clear: function () {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	},
	stop: function () {
		clearInterval(this.interval);
	},
	restart: function () {
		myGameArea.start();
	}
}


function component(width, height, color, x, y, type) {
	this.type = type;
	if (type == "image" || type == "p1bullet" || type == "p2bullet") {
		this.image = new Image();
		this.image.src = color;
	}
	this.width = width;
	this.height = height;
	this.speedX = 0;
	this.speedY = 0;
	this.x = x;
	this.y = y;
	this.update = function () {
		ctx = myGameArea.context;
		if (type == "image" || type == "p1bullet" || type == "p2bullet") {
			ctx.drawImage(this.image,
				this.x,
				this.y,
				this.width, this.height);
		} else {
			ctx.fillStyle = color;
			ctx.fillRect(this.x, this.y, this.width, this.height);
		}
	}
	this.newPos = function () {
		this.x += this.speedX;
		this.y += this.speedY;
		if (this.type == "p1bullet" && this.x == 430) {
			console.log("p1wins")
			winpara = document.createElement("p");
			var d = new Date();
			p1time = d.getTime() - start;
			winnode = document.createTextNode("p1wins in " + p1time / 1000 + " seconds");
			winpara.appendChild(winnode);

			var element = document.getElementById("div1");
			element.appendChild(winpara);
			myGameArea.stop()
		}
		else if (this.type == "p2bullet" && this.x == 10) {
			console.log("p2wins")
			winpara = document.createElement("p");
			var d = new Date();
			p2time = d.getTime() - start;
			winnode = document.createTextNode("p2wins in " + p2time / 1000 + " seconds");
			winpara.appendChild(winnode);

			var element = document.getElementById("div1");
			element.appendChild(winpara);
			myGameArea.stop()
		}
	}
}

function updateGameArea() {
	myGameArea.clear();
	p1bullet.newPos();
	p1bullet.update();
	p1gun.newPos();
	p1gun.update();
	p2gun.newPos();
	p2gun.update()
	p2bullet.newPos();
	p2bullet.update();
}

document.addEventListener('keydown', function (event) {
	if (event.key == "Alt") {
		p2bullet.speedX = -10;
	}
	else if (event.key == "Control") {
		p1bullet.speedX = 10;
	}
	else if (event.key == "r") {
		if (para) {
			para.removeChild(node)
		}
		if (winpara) {
			winpara.removeChild(winnode)
		}
		myGameArea.restart()

	}
});