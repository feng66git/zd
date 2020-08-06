$(function(){
	var trphone = /^1[3,4,5,6,7,8,9]\d{9}$/;
	var move = {
		speed:1,
		el:$('.move'),
		height:$('.move').height()/2,
		moving:function(){
			this.speed++;
			if(this.speed>=this.height){
				this.speed = 1;
				$('.move').css('top','0')
			}
			$('.move').css('top','-'+this.speed+'px')
		},
		start:function(){
			setInterval(()=>{
				this.moving()
			},70)
		},
		init:function(){
			this.start()
		}
	}
	move.init()
	$('.sel button').on('click',function(){
		$(this).toggleClass('on')
	})
	$('.accept .icon').on('click',function(){
		$(this).toggleClass('on')
	})
	$('.pop_success .close').on('click',function(){
		$('.pop_success').hide()
		$('input').val('')
		$('.sel button').removeClass('on')
	})
	//手机号验证
	$('.form_ph .submit').on('click',function(){
		var username = $('.form .name input').val();
		var phNb = $('.form .phNb input').val();
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
	    }else if(code == ''){
	        remin('请输入验证码');
	        return;
	    }else if(!$('.accept .icon').hasClass('on')){
	        remin('请同意众贷网服务协议');
	        return;
	    }else{
	    	window.location.href = './info.html?phone='+phNb+'&username='+encodeURI(username);
	    }
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
      		_this.attr('disabled',true)
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


	$('.radio button').click(function(){
		$(this).addClass('on').siblings().removeClass('on')
	})
	$('.sel_loan button').click(function(){
		$(this).toggleClass('on')
	})
	//信息提交
	$('.forms .submit').click(function(){
		var loan = [];
		var limitNum = '';
		var dateNum = '';
		$('.sel_limit button').each(function(){
			if($(this).hasClass('on')){
				limitNum = $(this).html();
			}
		})
		$('.sel_date button').each(function(){
			if($(this).hasClass('on')){
				dateNum = $(this).html();
			}
		})
		$('.sel_loan button').each(function(){
			if($(this).hasClass('on')){
				loan.push($(this).html());
			}
		})
		if(limitNum == ''){
			alert('请选择期望额度');
			return;
		}else if(dateNum == ''){
			alert('请选择期望分期数');
			return;
		}else if(loan.length == 0) {
			alert('请选择您的资质');
	        return;
		}
		var username = decodeURI(getUrlStr('username='));
		var phone = getUrlStr('phone=');
		success(limitNum,dateNum,loan.join(','),username,phone)
	})

	$('.pop_success .close').click(function(){
		$('.pop_success').hide()
	})

	function success(limitNum,dateNum,loan,username,phone){
		phone = phone.replace(phone.substring(3,7), "****")
		var html = '';
		html+=`
			<li>您期望申请资金：<span>${limitNum}</span></li>
			<li>您期望分期数：<span>${dateNum}</span></li>
			<li>提高放款率的资质：<span>${loan}</span></li>
			<li>姓名：<span>${username}</span></li>
			<li>手机号码：<span>${phone}</span></li>
		`;
		$('.pop_success').show().find('ul').html(html)
	}

	function getUrlStr(_str){ 
		var url = window.location.href;
		var k = url.split(_str)[1]; 
		if(k){ 
			if(k.indexOf('&') != -1){ 
				k = k.substr(0,k.indexOf('&')) 
			} 
		}else{ 
			k = '' 
		} 
		return k; 
	}
	function remin (e){
		var str = '<div id="remin">'+e+'</div>';
		$('body').append(str).stop();
		$('#remin').fadeIn()
		setTimeout(function(){
		  $('#remin').fadeOut().remove();
		},3000)
	}
})

	