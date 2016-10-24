var canvas = document.getElementById('tutorial');
var ctx = canvas.getContext('2d');
ctx.globalCompositeOperation = 'lighter';
canvas.height = 1131;
canvas.width = 640;

//创建本地数据库
var db = new localDatabase();
var lottery = new lotteryProject();
var users = '';

	lottery.init();
	//初始画布的图片加载
	var img1=document.getElementById("1-img");
	var img2=document.getElementById("2-img");
	var img3=document.getElementById("3-img");
	var img4=document.getElementById("4-img");
	var img5=document.getElementById("5-img");
	var img6=document.getElementById("6-img");
	var img7=document.getElementById("7-img");
	var img8=document.getElementById("8-img");
	var img9=document.getElementById("9-img");
	var img10=document.getElementById("10-img");
	var imgwine=document.getElementById("wine-img");


	img1.onload=function(){  
				  ctx.drawImage(img1,165,300);      
			  }; 
	img2.onload=function(){  
				  ctx.drawImage(img2,330,300);      
			  }; 
	img3.onload=function(){  
				  ctx.drawImage(img3,475,390);      
			  }; 
	img4.onload=function(){  
				  ctx.drawImage(img4,485,560);      
			  };  
	img5.onload=function(){  
			  	  ctx.drawImage(img5,405,710);      
			  };   
	img6.onload=function(){  
			  	  ctx.drawImage(img6,250,790);      
			  }; 
	img7.onload=function(){  
			  	  ctx.drawImage(img7,95,710);      
			  }; 
	img8.onload=function(){  
			  	  ctx.drawImage(img8,15,560);      
			  };
	img9.onload=function(){  
			  	  ctx.drawImage(img9,30,390);      
			  };	
	 imgwine.onload=function(){  
			  	  ctx.drawImage(imgwine,210,460);      
			  };


//控制抽奖开始和结束			  
$(function() {
	$("#stop_button").click(function() {
		if(lottery.allowStop) {			
			lottery.stop();
		} else if(!lottery.runing) {			
			lottery.run();
		}		
		return false;
	});	
	
	

});


