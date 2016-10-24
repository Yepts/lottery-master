var lotteryProject = function() {
	this.users = [];
	this.count = 0;
	this.history = {};
	//9个奖品选项
	this.userSize = 9;
	this.usernames = [];			
	this.winner = -1;	
	this.nowIndex = 0;
	this.minSpeed = 1000;
	this.maxSpeed = 40;
	this.acceleration = 80;
	this.speedMode = true;
	this.speed = this.minSpeed;
	this.runing = false;
	this.allowStop = false;

	//初始化获奖人员和获奖联系方式
 	var winnerUser="";
	var winnerTEL="";

	//显示初始化获奖名单
	this.init = function() {
		this.users = users.split(",");		
		var winnerList = db.list();
		for(var i = 0, l = winnerList.length; i < l; i++) {
			this.winnerListAdd(winnerList[i]);
		}		
		this.count = this.users.length;
	};

}


lotteryProject.prototype = {	
	// 绘制格子
	create: function(i) {
		ctx.drawImage(img1,165,300); 
		ctx.drawImage(img2,330,300);  
	    ctx.drawImage(img3,475,390); 
	    ctx.drawImage(img4,485,560);
	    ctx.drawImage(img5,405,710); 
	    ctx.drawImage(img6,250,790); 
	    ctx.drawImage(img7,95,710);
	    ctx.drawImage(img8,15,560);
	    ctx.drawImage(img9,30,390); 
	    ctx.drawImage(imgwine,210,460); 
	    //旋转图片的动画
		if(i==0){
			ctx.drawImage(img10,190,325); 
		}else if(i==1){
			ctx.drawImage(img10,355,325);  
		}else if(i==2){
			ctx.drawImage(img10,500,415);
		}else if(i==3){
			ctx.drawImage(img10,510,583);
		}else if(i==4){
			ctx.drawImage(img10,430,734); 
		}else if(i==5){
			ctx.drawImage(img10,275,813);
		}else if(i==6){
			ctx.drawImage(img10,120,734);
		}else if(i==7){
			ctx.drawImage(img10,40,585);
		}else if(i==8){
			ctx.drawImage(img10,55,415);
		}	   
	},	
	
	// 旋转
	whirling: function() {
		this.nowIndex = this.nowIndex%9;
		var fontIndex = this.nowIndex == 0 ? 8: this.nowIndex-1;
		if(this.speedMode == true) { // 加速
			this.speed -= this.acceleration;
			if(this.speed < this.maxSpeed) {
				this.allowStop = true;
				this.speed = this.maxSpeed;
			}
		} else { // 减速
			this.speed += this.acceleration;
			if(this.speed > this.minSpeed) {
				this.winner = this.nowIndex;
			}
		}		
		this.create(fontIndex);
		this.create(this.nowIndex);		
		this.nowIndex++;
		
		var _this = this;
		if(this.winner != -1) {
			setTimeout(function() {
				_this.showWinner();
			}, 1000);
			return false;
		}
		
		autoTime = setTimeout(function() {
			_this.whirling();
		}, this.speed);
	},

	
	// 显示是否抽到大奖
	showWinner: function() {		
		var i = 0, time = 0, _this = this;
		time = setInterval(function() {
			_this.create(_this.winner);
			i++;			
			if(i > 8) {
				if(_this.winner==2||_this.winner==5||_this.winner==8){
					alert("恭喜您获得大奖，请填写您的个人信息！");
					show('light');					
				}else{
					alert("谢谢参与，祝您身体健康！");
				}
				clearTimeout(time);
				_this.create(_this.winner);
				_this.runing = false;
			}
		}, 100);
		
		
	},

	//获奖名单
	winnerListAdd: function(obj, saveToDb) {		
		var html = '<tr><td name="'+obj.name+'">'+obj.name+'</td><td name="'+obj.value+'" align="right" >'+obj.value+'</td></tr>';			
		$("#user_list .list").prepend(html);	
		saveToDb && db.set(obj.name, obj);
	},
	
	
	draw: function() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);		
		var m = 9, _this = this, k = 0;
		for(var i = 0; i <= m; i++) {
			setTimeout(function() {
				if(k < m) _this.create(k);
				else if(k == m) _this.whirling();
				k++;
			}, 700*i);
		}
	},
	
	//抽奖开始加速
	run: function() {
		if(this.runing) return;
		this.runing = true;
		
		this.acceleration = Math.floor( Math.random()*60+60 ); // 加速度 60-120
		this.speedMode = true;
		this.allowStop = false;
		this.winner = -1;
		this.speed = this.minSpeed;	
		
		this.draw();
	},
	//停止抽奖减速
	stop: function() {
		if(this.allowStop) {
			this.allowStop = false;
			this.speedMode = false;
		}
	}
};

//显示获奖浮层
 function show(tag){
 	var light=document.getElementById(tag); 
 	light.style.display='block';

 }

 //隐藏获奖浮层
function hide(tag){
 	var light=document.getElementById(tag);
 	light.style.display='none';

}

//提交获奖信息
function submit(){
	hide("light");
	winnerUser=document.getElementById("winnerUser").value
	winnerTEL=document.getElementById("winnerTEL").value	
	//以json数据的形式存获奖信息
	lotteryProject.prototype.winnerListAdd({name:winnerUser, value:winnerTEL}, true);
	document.getElementById("winnerTEL").value="";
	document.getElementById("winnerUser").value="";
}


// 本地 key-value 数据库操作
var localDatabase = function() {
	
	
}

localDatabase.prototype.item = function(k) {
	var val = localStorage.getItem(k);
	if(!val) return null;
	
	try{
		val = JSON.parse(val);
	} catch(e) {
		console.log(e);
		val = val;
	}
	return val;
};

localDatabase.prototype.set = function(k, val) {
	try{
		if(typeof(val) != 'string') val = JSON.stringify(val);		
		localStorage.setItem(k, val);
	} catch(e) {
		console.log(e);
	}
};

localDatabase.prototype.list = function() {
	var k = '', val = null, rList = [];
	for(var i = 0, l = localStorage.length; i < l; i++) {
		k = localStorage.key(i);
		val = this.item(k);
		if(val) rList.push(val);
	}	
	return rList;
};

localDatabase.prototype.clear = function() {
	localStorage.clear();
};

localDatabase.prototype.del = function(k) {
	localStorage.removeItem(k);
};




