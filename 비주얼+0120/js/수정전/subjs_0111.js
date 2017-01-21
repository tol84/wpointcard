




/*          sub  -   tab - 카드이용안내       */


	$(function(){
/*	    $(".ctab > li > a:first").css({   "borderBottom":"2px solid #e56e6e", "color":"#333"   });   */
		$(".cpanel:not(:first)").hide();
	
		$(".ctab > li > a").click(function(){
			
			$(".cpanel").hide();
			$( $(this).attr("href") ).show();

		return false;

		});
	});




/*          sub  -   tab - 가맹점검색       */


	$(function(){
		$(".mpanel:not(:first)").hide();
	
		$(".mtab > li > a").click(function(){
			$(".mpanel").hide();
			$( $(this).attr("href") ).show();

		return false;

		});
	});




/*          sub  -   감추기 - 가맹점검색 정보영역        */


	$(function(){
        $(".infobtn").click(function(){
            if( $(".mapdescbox").css("marginLeft") == "0px" ){	
				$(".mapdescbox").stop().animate({ "marginLeft" : "-350px" }, 1000 , function(){
					$(".infobtn img").delay(1500).attr("src", "images/mapinfo_rightbtn.png");
				});
            }
            else{
				$(".msearchbox").css({ "display" : "block"});
                $(".mapdescbox").stop().animate({ "marginLeft" : "0px" }, 1000 , function(){s
					$(".infobtn img").delay(1500).attr("src", "images/mapinfo_leftbtn.png");
				});
				
            }
		return false;	
        });
    });





/*          sub  -   tab - 커뮤니티        */


		$(function(){
	/*		$(".ctab.m5 > li > a:first").css({   "borderBottom":"2px solid #e56e6e", "color":"#333"   });   */
			$(".cpanel:not(:first)").hide();
		
			$(".ctab.m5 > li > a").click(function(){
				
				$(".ctab.m5 .cpanel").hide();
				$( $(this).attr("href") ).show();
				$(".maininner.m5 .contant.c2 h3").html(  $(this).html()   );

			return false;

			});
		});



/*     SUB - faq - arrcodian  */


    $(function(){
        $(".arrco dd").hide();
        $(".arrco dt").click(function(){
            if($(this).next().css("display") == "none")
            {
                $(".arrco dd").hide();
                $(this).next().slideDown("fast");
				$(this).find(".faqdown").delay(1500).attr("src", "images/faq_up.png");  
            }
			else{  $(this).next().slideUp("fast", function(){
					$(".arrco dd").hide();
					$(".faqdown").delay(1500).attr("src", "images/faq_down.png");  
				});  
					
			}
            return false;
        });

    });




/*          sub -   슬라이딩  - 이벤트       */
 
	    $(function(){
		
			$(".sliding").append('<ul class="controlbtn"></ul>');   
			var trainroom = $(".train > li").length;   console.log(  trainroom  );   
			for( var index=1;   index<= trainroom; index++ )
			{
				$(".controlbtn").append('<li><a href="#">'+ index +'</a></li>');
			}
				
				$(".controlbtn > li:eq(0) > a").addClass("active");  
						
				$(".train").prepend( $(".train li:last") );   
				$(".train").css( "marginLeft", "-=100%" ); 		

		//다음버튼
			$(".next").click(function(){
				$(".train").animate({ "marginLeft":"-=100%" }, "fast" , "linear"  ,
				function(){
					$(".train").append( $(".train li:first") );    
					$(".train").css( "marginLeft", "+=100%" ); 
						//// delay
					
					var index = $(".train li").attr("class").substring(5,6);  
					$(".controlbtn > li			>      a").removeClass("active");
					$(".controlbtn > li:eq("+ index +") > a").addClass("active");
					console.log(   index   ); 
				});
				return false;
			}); //// .next END

		//이전버튼
			$(".prev").click(function(){
				$(".train").animate({ "marginLeft": "+=100%" }, "fast" , "linear"  ,
				function(){
					$(".train").prepend( $(".train li:last") );     
					$(".train").css( "marginLeft", "-=100%" );  
				
					var index = $(".train li").attr("class").substring(5,6);
					$(".controlbtn > li				> a").removeClass("active");
					$(".controlbtn > li:eq("+ index +") > a").addClass("active");
					console.log(   index   ); 
				});
					
				return false;
			});   //// .prev END
			
		/*  control   */
			$(".controlbtn li a").click(function(e){
					e.preventDefault();
					var now = Number( $(".train li").attr("class").substring(5,6) )+1;
					var target = $(this).text();


					if( now < target ){
						for( var index=now; index < target;  index++ ){  
							$(".next").click();
						}
					}
					if( now > target ){
						for( var index=now; index > target;  index-- ){  
							$(".prev").click();
						}
					}
			});

		/*   타이머  */  
			var timer = window.setInterval(function(){  $(".next").click();   }   ,   4000 );
			var now = true;
			$(".stopswitch").click(function(){
					
				if(   now  ){
					$(this).find("img").attr("src", "images/arrowoff.png");  now=false;
					window.clearInterval(   timer   );   
					console.log( now );    
				}
				else{
					$(this).find("img").attr("src", "images/pauseoff.png");  now=true;
					timer = window.setInterval(function(){  $(".next").click();   }   ,   4000 );  
					console.log(  now );  
				}
				return false;
			});  

		/*  swipe  */  /*
			$(".sliding").swipe( {
				swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
					if(direction == "left"){ $(".next").click(); }
					else if( direction == "right"){ $(".prev").click(); }	
				},
			   threshold:0
			});    */
		});
