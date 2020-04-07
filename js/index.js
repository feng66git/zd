$(function(){
	var trphone = /^1[3,4,5,6,7,8,9]\d{9}$/;
	
	
	$('.accept .icon').on('click',function(){
		$(this).toggleClass('on')
	})
	
	$('.submit').on('click',function(){
		var loan = [];
		var username = $('.form .name input').val();
		var phNb = $('.form .phNb input').val();
		var limit = $('.form .limit input').val();
		var code = $('.form .code input').val();
		if(username == ''){
			remin('请填写您姓名');
	        return;
		}else if(phNb == ''){
	        remin('请填写您的手机号码');
	        return;
	    }else if(!trphone.test(phNb)){
	        remin('请填写正确的手机号码');
	        return;
	    }else if(limit == ''){
	        remin('请输入期望额度');
	        return;
	    }else if(code == ''){
	        remin('请输入验证码');
	        return;
	    }else{
	    	$('.success').show()
	    }
	})
	$('.success .close').on('click',function(){
		$('.success').hide();
		$('input').val('');
	})
	var str = 's后重发';
	var t = 59;
	$('.getcode').on('click',function(){
		var _this = $(this);
  		var phNb = $('.form .phNb input').val();
  		if(phNb == ''){
	        remin('请输入您的手机号码');
	        return;
	    }else if(!trphone.test(phNb)){
	        remin('请输入正确的手机号码');
	        return;
	    }else{
      		_this.attr('disabled',true);
      		_this.html('59s后重发');
      		var timer = setInterval(function(){
        		t--;
        		if(t<10){
          			str = '0'+t+'s后重发';
        		}else{
          			str = t+'s后重发';
        		}
        		if(t<1){
          			t = 59;
          			str = '获取验证码';
          			clearInterval(timer)
          			_this.attr('disabled',false)
        		}
        		_this.html(str)
      		},1000)
    	}
	})
	function remin (e){
		var str = '<div id="remin">'+e+'</div>';
		$('body').append(str).stop();
		$('#remin').fadeIn()
		setTimeout(function(){
		  $('#remin').fadeOut().remove();
		},3000)
	}
})

	