/* JavaScript Document */

var marqueeVars = {
	screenSize : '',
	width : 0,
	mobileSize : 600,
	autoPlay : true,
	currentPanel : 1,
	totalPanels : 0,
	timePassed : 0,
	timeToChange : 60,
	duration : 1250,
	inTransition : false,
	panelContent : Array
};

$(document).ready(function(){
	marqueeGatherData();
});

function marqueeGatherData() {
	$('.marquee_data .marquee_panel').each(function(index){
		marqueeVars.totalPanels = index + 1;
		var panel_image_l = $(this).attr('data-image')+'_l.jpg';
		var panel_image_s = $(this).attr('data-image')+'_s.jpg';
		var panel_caption = $(this).html();
		marqueeVars.panelContent[index] = '<div class="marquee_panel" data-image-s="'+panel_image_s+'" style="background-image:url('+panel_image_l+');"><div class="overlay"></div><div class="overlay2"></div><div class="panel_caption">'+panel_caption+'</div></div>';
	});
	var marqueeTimer = setInterval(marqueeAdvance,100);
}

function marqueeAdvance(){
	var marqueeWidth = $('.marquee').width();
	var currentSize = marqueeVars.screenSize;
	var newSize;

	if( marqueeWidth > marqueeVars.mobileSize ){
		newSize = 'large';
	}else{
		newSize = 'small';
	}
	marqueeVars.screenSize = newSize;

	if( currentSize != newSize ){
		if( marqueeVars.screenSize == 'large' ){
			marqueeMultiPanel();
		}
	}

	if( marqueeVars.timePassed == marqueeVars.timeToChange ){
		marqueeVars.timePassed = 0;

		if( marqueeVars.autoPlay == true ){
			if( marqueeVars.currentPanel == marqueeVars.totalPanels ){
				$('.marquee_nav div:nth-child(1)').trigger('click');
			}else{
				$('.marquee_nav div:nth-child('+(marqueeVars.currentPanel+1)+')').trigger('click');
			}
		}
	}else{
		marqueeVars.timePassed += 1;
	}
}

function marqueeMultiPanel(){
	marqueeVars.timePassed = 0;
	marqueeVars.autoPlay = true;
	var newHTML = '<div class="marquee_stage_large"><div class="marquee_container_1"></div><div class="marquee_nav"></div><div class="mbtn prev"></div><div class="mbtn next"></div></div>';
	$('.marquee_data').remove();
	$('.marquee').append(newHTML);

	for( i=0; i<marqueeVars.totalPanels; i++ ){
		$('.marquee_nav').append('<div></div>');
	}

	$('.marquee').hover(function(){
		marqueeVars.autoPlay = false;
	},function(){
		marqueeVars.autoPlay = true;
		marqueeVars.timePassed = Math.floor(marqueeVars.timeToChange / 2);
	});

	$('.marquee .mbtn').on('click',function(){
		if( !marqueeVars.inTransition ){
			if( $(this).hasClass('prev') ){
				marqueeVars.currentPanel -= 1;
				if( marqueeVars.currentPanel < 1 ){
					marqueeVars.currentPanel = marqueeVars.totalPanels;
				}
			}else{
				marqueeVars.currentPanel += 1;
				if( marqueeVars.currentPanel > marqueeVars.totalPanels ){
					marqueeVars.currentPanel = 1;
				}
			}
			$('.marquee_nav div:nth-child('+marqueeVars.currentPanel+')').trigger('click');
		}
	});

	$('.marquee_nav div').on('click',function(){
		if( !marqueeVars.inTransition ){
			marqueeVars.inTransition = true;

			var navClicked = $(this).index();
			marqueeVars.currentPanel = navClicked + 1;
			$('.marquee_nav div').removeClass('selected');
			$(this).addClass('selected');

			$('.marquee_stage_large').append('<div class="marquee_container_2" style="opacity:0;"></div>');
			$('.marquee_container_2').html(marqueeVars.panelContent[navClicked]).animate({opacity:1},marqueeVars.duration,function(){
				$('.marquee_container_1').remove();
				$(this).addClass('marquee_container_1').removeClass('marquee_container_2');
				marqueeVars.inTransition = false;
			});
		}
	});

	$('.marquee_nav div:first').trigger('click');

}

// change

// // debugger
// var debugTimer = setInterval(setDebugger,100);
// function setDebugger(){
// 	$('.var1').html('screenSize = '+marqueeVars.screenSize);
// 	$('.var2').html('width = '+marqueeVars.width);
// 	$('.var3').html('mobileSize = '+marqueeVars.mobileSize);
// 	$('.var4').html('autoPlay = '+marqueeVars.autoPlay);
// 	$('.var5').html('currentPanel = '+marqueeVars.currentPanel);
// 	$('.var6').html('totalPanels = '+marqueeVars.totalPanels);
// 	$('.var7').html('timePassed = '+marqueeVars.timePassed);
// 	$('.var8').html('timeToChange = '+marqueeVars.timeToChange);
// 	$('.var9').html('inTransition = '+marqueeVars.inTransition);
// }