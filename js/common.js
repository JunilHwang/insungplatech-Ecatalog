//Variable Setting
var am = new autoAnimation();

//Document Event;
$(pageLoadEvent)
.on("click",".sub_view",subPageChange)
.on("click",".main_view",mainView)
.on('click','.sub-default .left, .sub-default .right',changePage)
.on('click','.layerOpener',layerOpen)
.on('click','.layer .close, .layer .bg',layerClose)
$(window).on("keyup",function(event){
	if($(".layer.active").length && event.keyCode == 27){
		layerClose();
	}
})

function layerClose(){
	$(".layer").stop().fadeOut(300,function(){
		$(this).removeClass("active")
	})
}

//pageLoadEvent
function pageLoadEvent(){

	//Product Slide

	//animation Class Setting and play
	am.classSetting().change({obj:$('.main')}).play();
	// am.classSetting().change({obj:$('.sub')}).play();
	//subView(".sub06");

	if(opener) opener.close();
}

//subPageChange
function subPageChange(){
	subView($(this).data('menu'));
}

//mainView
function mainView(){
	if($('.main').hasClass('active')) return false;
	am.callbackfn = function(){
		callbackAnimation({type:'main'});
	}
	am.change({obj:$('.sub>nav, .sub>.active, .sub_footer'),reverse:'reverse'}).play();
}

//subView
function subView(menu){
	var callback, before;
	if($('.sub').hasClass('active')){
		before = $(".sub>.active");
		callback = function(){
			callbackAnimation({type:'subPart',menu:menu});
		};
	} else {
		before = $('.main');
		callback = function(){
			callbackAnimation({type:'sub',menu:menu});
		};
	}
	if(typeof menu == "string" && !$('.gnb '+menu).hasClass('active')){
		$('.gnb .active').removeClass('active');
		$('.gnb '+menu).addClass('active');
	}
	am.callbackfn = callback;
	am.change({obj:before,reverse:'reverse'}).play();
}

//callback
function callbackAnimation(option){
	var before,after,afterPart;
	switch(option.type){
		case 'main' :
			before = $('.sub');
			after  = $('.main');
		break;
		case 'sub' :
			before = $('.main');
			after  = $('.sub');
		break;
		case 'subPart' :
			before = $('.sub>.active');                        
			after  = $(option.menu);
		break;
	}
	before.fadeOut(300,function(){
		before.removeClass('active');
		$(this).removeAttr('style');
		after.fadeIn(300,function(){
			$(this).attr('style','');
			if(option.type == 'sub'){
				$('.sub>.active').removeClass('active');
				$('.sub,'+option.menu).addClass('active');
				am.change({obj:$('.sub-default,'+option.menu),reverse:'normal'}).play();
			} else {
				after.addClass('active');
				am.change({obj:after,reverse:'normal'}).play();
			}
		})
	})
}

//footerBtnClick
function changePage(){
	var
		obj = $('.sub>.page.active'),
		idx = $('.sub>.page.active').index()-1,
		min = 0,
		max = $('.sub>.page').length-1,
		newObj;
	if($(this).hasClass('left')){
		if(--idx < min) idx = max;
	} else {
		if(++idx > max) idx = min;
	}
	newObj = $('.sub>.page').eq(idx)
	subView(newObj);
	$('.gnb .active').removeClass('active')
	console.log(idx);
	if(idx < 5){
		$('.gnb li').eq(0).addClass('active');
	} else if(idx < 7){
		$('.gnb li').eq(1).addClass('active');
	} else if(idx < 14){
		$('.gnb li').eq(2).addClass('active');
	} else {
		$('.gnb li').eq(3).addClass('active');
	}
}

function layerOpen(){
	var key1 = $(this).data("key");
	var key2 = $(".key",this).html();
	var obj = layerData[key1][key2];
	$(".layer-title").html(obj.subject);
	$(".layer-content").html(obj.content);
	$(".layer").addClass("active");
}