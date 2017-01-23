

/*       visaul      */

(function ($) {

    var root = this;
    var ns = root.ns = {};
    var ani, controller, tweenMng, pointMng;
    var utils = {
        ipop: function (arr, i) {
            var arr = Array.prototype.slice.call(arr);
            arr.splice(i, 1);
            return arr;
        },
        repeat: function (fun, n) {
            var args = Array.prototype.slice.call(arguments, 2);
            while(n--){
                fun.apply(this, args);
            }
        }
    };

    $(document).ready(function () {

        // 무조건 첫번째 ! 네임스페이스 세팅
        nsSetting();
        // 백그라운드 사본 생성
        bgAppend();
        // 사이즈 변경시 view 사이즈 변환
        viewSzCng();



        // 네임스페이스 세팅 후 교통수단 세팅
        ns.$transportImg =  ns.$near.find(".transport img");
        randomTransport(ns.$transportImg);

        utils.repeat.call(pointMng, pointMng.push, 3);

        ns.$coin.appendTo(ns.$scene);
        // 마커 이미지 클릭시 모달
        (function () {
            var playTweens = [];
            $(".mk_img").click(function () {
                var $modalPopup = $(".modal_popup");
                var href = $(this).attr("href");

                playTweens = tweenMng.getPlayingTweens();
                tweenMng.tweensAction(playTweens, "pause");
                $(".wp_modal").attr("href", href).fadeIn(200);
                $modalPopup.css("marginLeft", -$modalPopup.width()/2 + "px");
            });
            $(".modal_popup_close").click(function () {
                $(".wp_modal").fadeOut(200, function () {
                    tweenMng.tweensAction(playTweens, "play");
                });
            });
        })();


        // 시작시 애니메이션 세팅
        ani.cartOn();
        tweenMng.add("walkOut", ani.walkOut(ns.$char));
        tweenMng.add("walk", ani.character(ns.$charImg), ns.$charImg);
        window.setTimeout(function () {
            tweenMng.getTween("walk").pause();
        }, 1500);
        // 애니메이트 실행 + 트윈매니저에 등록
        window.setTimeout(function () {
            tweenMng.add("near", ani.setNear(ns.$near));
            tweenMng.add("far", ani.setFar(ns.$far));
            tweenMng.getTween("walk").play();

//          window.setInterval(function () {
//            pointMng.pop();
//          }, 1200);
        }, 3000);
    });

    // 자주 쓰는 jQuery 객체들
    function nsSetting() {
        ns.$view = $(".wpoint_view");
        ns.$scene = $(".scene");
        ns.$bg = $(".background");
        ns.$near = $(".near");
        ns.$near21 = $(".near.n21");
        ns.$far = $(".far");
        ns.$points = $(".point_cart .points");
        ns.$char = $(".people");
        ns.$charImg = $(".people img");
        ns.$wmark = $(".wmark");
        ns.$pointPopup = $(".point_popup");
        ns.$wpChar = $(".wp_character");
        ns.$pointCart = $(".point_cart");
        ns.$coin = $(".coin");

        ns.calcEventPos = function (n) {
            var nearWidth = ns.$near.width();
            return $.map(new Array(ns.$wmark.length), function (v, i) {
                return (ns.$wmark.eq(i).offset().left / nearWidth) * 100 - n;
            });
        };

        // 이벤트가 발생할 포지션들을 기억
        ns.eventPos = ns.calcEventPos(6);

    }

    // .near 백그라운드 사본 생성
    function bgAppend() {
        $(".near.n21")
            .before($(".near.n21").clone().removeClass("n21").addClass("n20"))
            .after($(".near.n21").clone())
            .next(".near.n21").removeClass("n21").addClass("n22");
        ns.$far = $(".far");
        ns.$near = $(".near");
    }

    // 로드, 사이즈 변경시 view 사이즈 변환
    function viewSzCng() {
        $(window).off("load.wp resize.wp").on("load.wp resize", (function () {
            var $wpoint_view = ns.$view;
            var $visual = $("#visual");
            var $near = ns.$near;
            var bfWidth = 0;
            var beforePer = 0;
            return function () {
                var currWidth = $near.width();
                var winWidth = $(window).width();
                if (bfWidth !== currWidth) {
                    // height 조정 : 4560 / 13 '==. 350
                    $wpoint_view.add($visual).height(Math.floor(currWidth / 13));
                    bfWidth = currWidth;
                }
                if(winWidth > 1000){
                    var v = (winWidth - 1000) / 182;
                    // ns.$wpChar.css("left", v + 0.9 + "%");
                    console.log(v);
                    ns.$scene.css("left", v*5 + "%");
                    ns.eventPos = ns.calcEventPos(6 + v*3);
                } else {
                    ns.$scene.css("left", "");
                    ns.eventPos = ns.calcEventPos(6);
                }
            }
        })());
    }
    function getNearWidth() {
        return ns.$near.width();
    }
    function getNearHeight() {
        return ns.$near.height();
    }

    // 랜덤한 이미지로 변환 (수정시 folderName, fileName )
    function randomTransport($imgs) {
        var folderName = "images/";
        var fileName = ["taxi", "subway", "bus"];
        var extension = ".png";
        var randIndex = Math.floor(Math.random()*100) % fileName.length;
        $imgs.each(function () {
            $(this).attr("src", folderName + fileName[randIndex] + extension).attr("class", fileName[randIndex]);
        });
    }

    // 트윈 객체 관리
    tweenMng = window.tm = {
        twArr: [],
        names: {},
        add: function (name, tween) {
            var len = this.twArr.length;
            if(this.names[name]){
                this.remove(name);
            }
            this.twArr[len] = tween;
            this.names[name] = len;
            return tween;
        },
        getTween: function (name) {
            return this.twArr[this.names[name]];
        },
        setTween: function (name, tween) {
            var i = this.names[name];
            if (i === undefined) {
                this.add(name, tween);
            }
            else {
                this.twArr[i] = tween;
            }
            return tween;
        },
        // allStop: function () {
        //   return this.tweensAction(this.twArr, "pause");
        // },
        // allPlay: function () {
        //   return this.tweensAction(this.twArr, "play");
        // },
        allScale: function (n) {
            return this.tweensAction(this.twArr, "timeScale", n);
        },
        getPlayingTweens: function () {
            var len = this.twArr.length;
            var twArr = [];
            while(len--){
                var currTw = this.twArr[len];
                if(currTw && currTw.isActive()){
                    twArr.push(currTw);
                }
            }
            return twArr;
        },
        // names, tweens
        tweensAction: function (arr, methodName) {
            var len = arr.length;
            var args = Array.prototype.slice.call(arguments, 2);
            var tempTw;
            while(len--){
                if(Object.prototype.toString.call(arr[len]) === "[object String]"){
                    tempTw = this.twArr[this.names[arr[len]]];
                }
                else {
                    tempTw = arr[len];
                }
                if(tempTw !== undefined){
                    tempTw[methodName].apply(tempTw, args);
                }
            }
            return this;
        },
        remove: function (name) {
            var index = this.names[name];
            if (index === undefined) return this;
            delete this.names[name];
            this.twArr = utils.ipop(this.twArr, index);
            return this;
        },
        reset: function () {
            this.twArr = [];
            this.names = {};
            return this;
        }
    };

    // 포인트(이미지) 객체들 관리
    // pointMng.push(10);
    pointMng = window.pm = {
        points: [],
        push: function () {
            var len = this.points.length;

            this.points[len] = $("<img>").attr("src", "images/coin_s.png").css({
                position: "absolute",
                bottom: Math.floor(len / 3) * 5 + "%",
                left: (len % 3) * 33.3 + "%",
                width: "33.3%"
            }).appendTo(ns.$points);

            return this.points[len];
        },
        pop: function () {
            var p = this.points.pop();
            if(p !== undefined){
                p.remove();
            }
            return this.points;
        },
        getLastPoint: function () {
            return this.points[this.points.length - 1];
        }
    };


    // 애니메이션 집합
    ani = {
        // 가까이 있는 배경
        setNear: function ($near) {
            var index = 0;
            var time  = 60;
            var type;
            var timeSub = 0;
            var $currNear = ns.$near21;
            // 진행도에 따라 실행되어지는 이벤트들 !
            var tline = new TimelineMax({

                onUpdate:function () {
                    var timeEvt;

                    if(ns.eventPos[index] < -($currNear.offset().left / $near.width())*100) {
                        timeEvt = new TimelineMax();
                        type = ns.$wmark.eq(index).attr("data-type");
                        timeSub = type === "pay" ? 1.5 : 0;
                        tweenMng.setTween("timeEvt", timeEvt);
                        timeEvt.addCallback(function () {
                            tweenMng.tweensAction(["walk", "near", "far"], "timeScale", 0.5);
                            ns.$wmark.eq(index-1).prepend($("<span>").html("Click Me").attr("class", "clickme").css("fontSize", 3 + ns.$scene.height()/25 + "px"));
                            tweenMng.setTween("markBounce",ani.markBounce(ns.$wmark.eq(index-1).find(".mk_img, .mk_arrow, .clickme")));
                        }, 0);

                        timeEvt.addCallback(function () {

                            tweenMng.tweensAction(["walk", "near", "far"], "timeScale", 0.3);
                        }, 0.3);

                        timeEvt.addCallback(function () {
                            tweenMng.tweensAction(["walk", "near", "far"], "timeScale", 0.1);
                        }, 0.6);

                        timeEvt.addCallback(function () {
                            var $currPopup = ns.$pointPopup.eq(index-1);
                            var offset;
                            tweenMng.tweensAction(["walk", "near", "far"], "pause");
                            tweenMng.setTween("popupOn", TweenMax.set($currPopup, {opacity:1, display:"block"}));
                            // 적립 세팅
                            if(type === "save"){
                                ns.$coin.removeAttr("style");
                                offset = $currPopup.offset();
                                ns.$coin.show();
                                offset.top = offset.top + ($currPopup.height() * 0.85 - ns.$coin.height()) / 2;
                                offset.left = offset.left + ($currPopup.width() - ns.$coin.width()) / 2;

                                ns.$coin.show().offset(offset);
                                tweenMng.setTween("coinOn", TweenMax.to(ns.$coin, 0.4, {opacity:1}));
                            }
                            // 결제 애니메이션
                            else {
                                var $point = pointMng.getLastPoint();
                                if(!$point) { return }
                                var pointWidth = $point.width();
                                var markOffset = ns.$wmark.eq(index-1).offset();
                                var pointOffset = $point.offset();

                                tweenMng.setTween("pointSub", TweenMax.to(
                                    $point,
                                    1,
                                    {
                                        bezier: {
                                            curviness: 0.4, autoRotate: true, values: [
                                                {
                                                    left: markOffset.left / 2.1,
                                                    top: (markOffset.top - ns.$scene.offset().top) * 0.55
                                                    , opacity:0.7
                                                },
                                                {
                                                    left: markOffset.left / 1.6,
                                                    top: (markOffset.top - ns.$scene.offset().top) * 0.9,
                                                    opacity:0
                                                }
                                            ], ease: Power3.easeOut
                                        }
                                    }
                                )).vars.onComplete = function () {
                                    pointMng.pop();
                                };
                            }

                        }, 1.7 );

                        timeEvt.addCallback(function () {
                            ns.$wmark.eq(index-1).find(".clickme").remove();
                            tweenMng.setTween("popupOff", TweenMax.to(ns.$pointPopup.eq(index-1), 0.3, {opacity:0, display:"none"}));
                        }, 3 + timeSub/2);

                        timeEvt.addCallback(function () {
                            var $currMark = ns.$wmark.eq(index-1);

                            // 적립 애니메이션
                            if(type === "save") {
                                var $point = pointMng.push().css("visibility", "hidden");
                                var pointWidth = $point.width();
                                ns.$coin.css("zIndex", 1);
                                tweenMng.setTween("pointAdd", TweenMax.to(
                                    ns.$coin,
                                    1,
                                    {
                                        bezier: {
                                            curviness: 0.5, autoRotate: true, values: [
                                                {
                                                    left: ($point.offset().left + ns.$coin.offset().left) / 2,
                                                    top: ($point.offset().top - ns.$scene.offset().top) / 3,
                                                    width: pointWidth / 1.25,
                                                    minWidth: pointWidth / 1.25
                                                },
                                                {
                                                    left: $point.offset().left,
                                                    top: $point.offset().top - ns.$scene.offset().top,
                                                    width: pointWidth,
                                                    minWidth: pointWidth
                                                }
                                            ], ease: Power3.easeOut
                                        }
                                    }
                                )).vars.onComplete = function () {
                                    ns.$coin.hide();
                                    $point.css("visibility", "visible");
                                };
                            }

                        }, 3.4);


                        // 교통수단 이벤트
                        if(index === 0){
                            // 교통수단 탑승
                            timeEvt.addCallback(function () {
                                tweenMng.setTween("cartOff", ani.cartOff());
                                tweenMng.setTween("walkIn", ani.walkIn($(".people")));
                                tweenMng.setTween("walk", tweenMng.getTween("walk").timeScale(1).play());
                            }, 5.5 - timeSub);
                            // 이동
                            timeEvt.addCallback(function () {
                                tweenMng.setTween("transport", TweenMax.to(".transport", time, {x:"200%"})).timeScale(30);
                                tweenMng.getTween("near").timeScale(3.5).play();
                                tweenMng.getTween("far").timeScale(3.5).play();
                            }, 7.5 - timeSub);
                            // 이동완료
                            timeEvt.addCallback(function () {
                                tweenMng.setTween("cartOn", ani.cartOn());
                                tweenMng.setTween("walkOut", ani.walkOut($(".people"))).timeScale(1);
                                tweenMng.getTween("walk").play();
                                tweenMng.getTween("near").timeScale(1).pause();
                                tweenMng.getTween("far").timeScale(1).pause();
                            }, 9.25 - timeSub);
                            timeEvt.addCallback(function () {
                                tweenMng.getTween("walk").pause();
                            },11.25 - timeSub);
                            // 원래대로 재생
                            timeEvt.addCallback(function () {
                                tweenMng.tweensAction(["walk", "near", "far"], "play");
                            }, 11.7 - timeSub);
                        } else {
                            timeEvt.addCallback(function(){
                                tweenMng.allScale(1);
                                tweenMng.tweensAction(["walk", "near", "far"], "play");
                            }, 5.5 - timeSub);
                        }
                        index += 1;
                    }
                }
            });

            // 완수시 초기화 후 리스타트
            tline.vars.onComplete= function () {
                $near.each(function () {
                    $(this).removeAttr("style");
                });
                index = 0;
                ns.$pointPopup.hide();
                this.restart();
            };

            tline.to($near, time, {x: "-=100%", ease: Linear.easeNone});

            //절반 진행시 교통수단 이미지 변환
            tline.addCallback(function () {
                randomTransport(ns.$transportImg);
                TweenMax.set(".transport", {x:"0%"});
            }, 25);

            return tline;
        },
        // 멀리 있는 배경
        setFar: function ($far) {
            return TweenMax.to($far, 180, {
                x: "-=100%", ease: Linear.easeNone,
                onComplete: function () {
                    $(this.target).each(function () {
                        $(this).removeAttr("style");
                    });
                    this.restart();
                }
            });
        },
        character: function ($char) {
            var tline = new TimelineMax({repeat:-1});
            tline.set($char, { attr:{src:'images/character_a.png'}});
            tline.to($char, 0.4, {y:"0%"});
            tline.to($char, 0.4, {y:"-4%",  attr:{src:"images/character_b.png"}});
            tline.to($char, 0.4, {y:"-3%", attr:{src:'images/character_c.png'}});
            tline.to($char, 0.4, {y:"0.5%", attr:{src:'images/character_d.png'}});
            return tline;
        },
        walkOut: function ($char) {
            TweenMax.set($char, {opacity:0, scale:0.3, x:-30});
            return TweenMax.to($char, 2, {opacity:1, scale:1, x:0});
        },
        walkIn: function ($char) {
            return TweenMax.to($char, 2, {opacity:0, scale:0.5, x:40});
        },
        cartOff: function () {
            return TweenMax.to(ns.$pointCart, 2, {opacity:0})
        },
        cartOn: function () {
            return TweenMax.to(ns.$pointCart, 2, {opacity:1})
        },
        markBounce: function ($markImg) {
            return TweenMax.to($markImg, 0.5, {y:-8, repeat:3, yoyo:true})
        }
    };
    root.ani = ani;
})(jQuery);
	