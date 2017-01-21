



/*          main  -   슬라이딩  - 공지사항       */
	
		
		$(function(){
				
			var timer = window.setInterval(function(){  	
					var a= $('.a2.a21  .train2 li');
					$(".a2.a21 .train2").append( a[0] );   }   ,   4000 );
					 
			var now = true;

			$(".a2.a21  .a2desc.btn.b21").click(function(){		
				if(   now  ){
					$(this).find("img").attr("src", "images/play_btn2.png");  now=false;
					window.clearInterval(   timer   );   
					console.log( now );    
				}
				else{
					$(this).find("img").attr("src", "images/stop_btn2.png");  now=true;
					timer = window.setInterval(function(){ 
							var a= $('.a2.a21  .train2 li');
							$(".a2.a21 .train2").append( a[0] );   }   ,   4000 );
							console.log(  now );  
				}
				return false;
			});  
       	});  



/*          main  -   슬라이딩  - 새소식       */
	
		
		$(function(){
				
			var timer = window.setInterval(function(){  	
					var a= $('.a2.a22  .train2 li');
					$(".a2.a22 .train2").append( a[0] );   }   ,   4000 );
					 
			var now = true;

			$(".a2.a22  .a2desc.btn.b21").click(function(){		
				if(   now  ){
					$(this).find("img").attr("src", "images/play_btn2.png");  now=false;
					window.clearInterval(   timer   );   
					console.log( now );    
				}
				else{
					$(this).find("img").attr("src", "images/stop_btn2.png");  now=true;
					timer = window.setInterval(function(){ 
							var a= $('.a2.a22  .train2 li');
							$(".a2.a22 .train2").append( a[0] );   }   ,   4000 );
							console.log(  now );  
				}
				return false;
			});  
       	});  




/*          main  -   슬라이딩  - 이벤트       */


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