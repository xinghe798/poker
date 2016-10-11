$(function(){
	
	// $(".zhuozi").html("");
	var color=['c','h','d','s'];  //扑克花色
	var dict={
		1:'A',2:'2',3:'3',4:'4',5:'5',6:'6',7:'7',8:'8',9:'9',10:'T',11:'J',12:'Q',13:'K'
	};
	$(".start").on("click",function(){
	var poker=[];
	var biao={};
	var index=0;
	
	while (poker.length<52) {	
		var	c=color[Math.floor(Math.random()*4)];  //随机取出一种花色
		var n=Math.ceil(Math.random()*13);  //随机生成 1-13 之间的数
		var item={color:c,number:n};
		if (!biao[c+'-'+n]) {
		poker.push({color:c,number:n});
		biao[c+'-'+n]=true;
		};
	}
	
	$(".move-left").css("display","block");
	$(".move-right").css("display","block");
	for (var i = 0; i < 7; i++) {
		for (var j = 0; j <i+1 ; j++) {
			$('<div>')
		    .addClass('pai shang')
		    .delay(index*50)
		    .css({backgroundImage:'url(img/'+dict[poker[index].number]+poker[index].color+'.png)'})
		    .attr('id',i+'-'+j)
		    .data('number',poker[index].number)
		    .animate({
		    	top:50*i,
		    	left:(6-i)*50+j*100,
		    	opacity:1
		    })
		    .appendTo('.zhuozi');
		    index+=1;
		}	
	}


	for (; index < poker.length; index++) {
		$('<div>')
	    .addClass('pai zuo')
	    .data('number',poker[index].number)
	    .delay(index*50)
	    .css({backgroundImage:'url(img/'+dict[poker[index].number]+poker[index].color+'.png)'})
	    .animate({
	    	top:460,
	    	left:150,
	    	opacity:1
	    })
	    .appendTo('.zhuozi');
	}
	

	var meiyoubeiyazhu=function(e){
	    var x=Number($(e).attr('id').split('-')[0]);
	    var y=Number($(e).attr('id').split('-')[1]);
	  	return $('#'+(x+1)+'-'+y).length||$('#'+(x+1)+'-'+(y+1)).length;
	}


	var shangyizhang=null;
	$('.zhuozi .pai').on('click',function(){
		if($(this).hasClass('shang')&&meiyoubeiyazhu(this)){
			return;
		}

		if($(this).data('number')===13){
			$(this).animate({top:0,left:600,opacity:0}).queue(function(){
					$(this).remove();
				})
			return;
		}
		$(this).toggleClass('chulie');
		if($(this).hasClass('chulie')){
			$(this).animate({top:'-=30'})
		}else{
			$(this).animate({top:'+=30'})
		}
		//第一次点击
		if(!shangyizhang){
				shangyizhang=$(this);
			}else {
				//第二次点击
				if(shangyizhang.data('number')+$(this).data('number')===13){
				$('.zhuozi .chulie').delay(400).animate({
					top:0,
					left:600,
					opacity:0,
				}).queue(function(){
					$(this).remove();
				})
			}else{
				$('.zhuozi .chulie').removeClass('chulie').animate({top:'+=30'})
			}
				shangyizhang=null;
			}
	})

   var zIndex=1;
   $('.move-right').on('click',function(){
       	zIndex+=1;
       	if($('.zhuozi .pai.zuo').eq(-1).hasClass("chulie")){
       		$('.zhuozi .pai.zuo').eq(-1).removeClass("chulie");
       		shangyizhang=null;
       	}
     	 $('.zhuozi .pai.zuo')
     	 .eq(-1).removeClass("zuo")
     	 .addClass('you')
     	 .animate({top:460,left:520}).
     	 css({zIndex:zIndex});   
   })

 	var cishu=0;
	$('.move-left').on('click',function(){
	 	cishu+=1
	 	if($('.zhuozi .zuo').length){
	 		return;
	 	}
	 	if(cishu>3){
	 		return;
	 	}

		$('.zhuozi .you').each(function(i){
	  		$(this)
	  		.delay(i*30)
	  		.animate({top:460,left:150})
	  		.css({zIndex:0})
	  		.removeClass('you')
	  		.addClass('zuo');
	  	})
	})

})	
})