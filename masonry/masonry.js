/**

Authors - Austin Rix & Sam Carne

Dynamic layout for dynamic blocks / Masonry Layout


*/
var colCount = 7; // blocks in column 
var colWidth; 
var margin = 25; // spacing between blocks
var windowWidth;
var block;
var padding;
var blocksOnLoad = 15;
var maxHeight; // maxHeight gets the html height for footer position
var blocks = [];
var paddingTop = 50;
var timers = [];
var intCnt = 1;
$(window).load(setupBlocks);
$(window).load(function() { 
	// on load
	
		if (navigator.platform.toUpperCase().indexOf('WIN')!==-1) {
			$("#assocEssays .container").css("margin-left", 15);
		} else {
			$("#assocEssays .container").css("margin-left", 8);
		}
		setupBlocks();
	
}); 

$(document).ready(function () { //doc ready
     if(checkMobile()){
        paddingTop = 15;
        $("#assocEssays .container").css("margin-left", 15);
     }
     
     setupBlocks();
    $(".footerBtn").click(function(){
        blocksOnLoad += 15;
        setupBlocks();   
    });
	
});

$(function(){ // resized window adjust
	$(window).resize(function(){
		var intString = "int" + intCnt;
        intCnt++;
        timers.push(intString);
        setTimeout(function(){
            timers.pop();
            if(timers.length == 0){
		        if(checkMobile()){
		            paddingTop = 20;
		        }
		        else{
		            paddingTop = 50;
		        }
		        setupBlocks();
		    }  
        },100);
   	});
});

function setupBlocks() { // get Demensions 
	windowWidth = $("#assocEssays .container").width();
	colWidth = $('.block').outerWidth();
	blocks = [];
	colCount = Math.floor(windowWidth/(colWidth+margin*2));
	for(var i=0;i<colCount;i++){
		blocks.push(margin);
	}
	positionBlocks();
}

function positionBlocks() { // set the blocks in place
     maxHeight = 1;
     block = $('.block').outerWidth();
     padding = ($(window).width() - (colCount*(block + margin)))/2; // padding for center
     var cnt = 1;
	 $('.block').each(function(){
        if(cnt >= blocksOnLoad){
            $(this).css("display", "none");
        } else {
            $(this).css("display", "block");
            var min = Array.min(blocks) ;
            var index = $.inArray(min, blocks);
            var leftPos = margin+(index*(colWidth+margin));
            var down = 20 + min;
            $(this).css({
                'left':leftPos+padding-margin+'px',
                'top':min + paddingTop + 'px'
            });
            blocks[index] = min+$(this).outerHeight()+margin;

            var temp =  min+$(this).outerHeight()+margin; 
            if(temp > maxHeight) 
                maxHeight= temp;                
        }
        
        //multi line elipsis if text is too long
        var $p = $('.essayPrevCont', this);
		//var divh = $('.essayPrevCont', this).height();
		while ($p.outerHeight() > 190) {
			if(!$p.text().match(/\W*\s(\S)*$/)) break;
		    $p.text(function (index, text) {
		        return text.replace(/\W*\s(\S)*$/, '...');
		    });
		}
		
		//set height of container holding the elements
        $("#assocEssays .container").height(maxHeight + 125);
        cnt++;        
	});
   
   //footer code if height of container isn't applied for some reason
/*
    var footerSize = $("footer").height();
    var wWidth = $(window).width(); //Adjust footer to bottom  
    $("footer").css("position", "absolute");
    $("footer").css("top", maxHeight + footerSize);
    $("footer").css("width", wWidth); 
*/   
}

function checkMobile(){
    if($(window).width() < 840){        
        return true;
    }
    return false;
}

function getScrollBarWidth () {
    var $outer = $('<div>').css({visibility: 'hidden', width: 100, overflow: 'scroll'}).appendTo('body'),
        widthWithScroll = $('<div>').css({width: '100%'}).appendTo($outer).outerWidth();
    $outer.remove();
    scrollbarWidth = 100 - widthWithScroll;
    return scrollbarWidth;
};



// Function to get the Min value in Array
Array.min = function(array) {
    return Math.min.apply(Math, array);
};

