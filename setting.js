    if( diyvodid > 0)
	{var dmid=vodid+" "+vodsid,dmsid=vodsid;}
	else
	{
	var dmid=vodid,dmsid=vodsid;
	}
	//var dmid=vodid+" "+vodsid,dmsid=vodsid;
        if( laoding > 0){}else{ var css ='<style type="text/css">';css+='#loading-box{display: none;}';css+='</style>';$('body').append(css).addClass("");}    // ���ز�����
    if( danmuon > 0){
	var dp = new yzmplayer({autoplay: autoplay,element: document.getElementById('player'),theme: color,logo: logo,video: {url: vodurl,pic: vodpic,type: 'auto',},danmaku: {id: dmid,api: dmapi,user: user,}});
	}else{$('body').addClass("danmu-off");
	var dp = new yzmplayer({autoplay: autoplay,element: document.getElementById('player'),theme: color,logo: logo,video: {url: vodurl,pic: vodpic,type: 'auto',},});}
    // ������
    //function alert_back(text) {$(".alert_back").html(text).show();setTimeout(function () { $(".alert_back").fadeOut('slow'); },1200)}
    // ͨ�õ��
	add('.yzmplayer-list-icon',".yzmplayer-danmu",'show');
	function add(div1,div2,div3,div4) {$(div1).click(function() {$(div2).toggleClass(div3);$(div4).remove();});}
    //��ת����
    function formatTime(seconds) {return [parseInt(seconds / 60 / 60),parseInt(seconds / 60 % 60),parseInt(seconds % 60)].join(":").replace(/\b(\d)\b/g, "0$1");}
	//���������������ֵ������������,ֵ,��Чʱ��(Сʱ)
	function setCookie(c_name, value, expireHours) {var exdate = new Date();exdate.setHours(exdate.getHours() + expireHours);document.cookie = c_name + "=" + escape(value) + ((expireHours === null) ? "" : ";expires=" + exdate.toGMTString());}
	//��ȡ�����������ֵ������������
	function getCookie(c_name) {if (document.cookie.length > 0) {c_start = document.cookie.indexOf(c_name + "=");if (c_start !== -1) {c_start = c_start + c_name.length + 1;c_end = document.cookie.indexOf(";", c_start);if (c_end === -1) {c_end = document.cookie.length;};return unescape(document.cookie.substring(c_start, c_end));}}return "";}
	dp.on("loadedmetadata", function () {loadedmetadataHandler();});
    dp.on("ended", function () {endedHandler();});
    var playtime= Number(getCookie("time_"+ vodurl));
    var ctime= formatTime(playtime);
    function loadedmetadataHandler() {
        if ( playtime > 0 && dp.video.currentTime < playtime) {
                   setTimeout(function () {video_con_play() }, 1 * 1000);
        } else { dp.notice("��Ƶ��׼������������Ϊ������");setTimeout(function () {video_play() }, 1 * 1000);}
                   dp.on("timeupdate", function () {timeupdateHandler();});
	}
	//���Ž��Ȼص�  	
    function timeupdateHandler() {setCookie("time_"+ vodurl,dp.video.currentTime,24);}
    //���Ž����ص�		
    function endedHandler() {
    setCookie("time_"+ vodurl,"",-1);
    if (next!='') {dp.notice("5s��,���Զ�Ϊ��������һ��");setTimeout(function () {video_next();}, 5 * 1000);
         } else{dp.notice("��Ƶ�����ѽ���");setTimeout(function () {video_end();}, 2 * 1000); }}
    if (next!=''){ }else {$(".icon-xj").remove();};
    function video_next() {top.location.href = playnext;}
    function video_seek() {dp.seek(playtime);}
    $(".yzmplayer-showing").on("click", function () {dp.play();$(".vod-pic").remove();});
    //���Ի���Ļ��		
	$(".yzmplayer-comment-setting-color input").on("click", function () {
    var textcolor = $(this).attr("value"); 
    setTimeout(function (){$('.yzm-yzmplayer-comment-input').css({"color":textcolor});}, 100);
    });
    $(".yzmplayer-comment-setting-type input").on("click", function () {
    var texttype = $(this).attr("value"); 
    setTimeout(function (){$('.yzm-yzmplayer-comment-input').attr("dmtype",texttype);}, 100);
    });
    $("#dmset").on("click", function () {
    $(".yzmplayer-comment-icon").trigger("click");
    $(".yzmplayer-comment-setting-box").toggleClass("yzmplayer-comment-setting-open") 
    $("#yzmplayer").toggleClass("yzmplayer-hide-controller") 
    });

    $(".yzm-yzmplayer-send-icon").on("click", function () {
    var inputtext = document.getElementById("dmtext");
    var sendtexts = inputtext.value;
    var sendtype =$('.yzm-yzmplayer-comment-input').attr("dmtype");
    var sendcolor = $('.yzmplayer-comment-input').css("color"); 
    var sendtext = sendtexts.replace(new RegExp(pbgjz.join('|'),'img'),'*');
    if(sendtext.length < 1){dp.notice("Ҫ���뵯Ļ���ݰ�ι��");return;
    }else{dp.danmaku.send({text: sendtext,color: sendcolor,type: sendtype,});
    };
    $(".yzm-yzmplayer-comment-input").val("");
    })
dp.danmaku.opacity(1);
    //��Ļ�б��ȡ
	
$(".yzmplayer-list-icon,.yzm-yzmplayer-send-icon").on("click", function () {		   
	$(".list-show").empty();
	$.ajax({
    url:dmapi+"?id="+dmid,
    success:function (data) {
            if (data.code == 0) {
                var danmaku = data.danmaku;
                $(".danmuku-num").text(danmaku.length)
                $(danmaku).each(function(index, item) {
                    var dammulist = `<d class="danmuku-list" time="${item[0]}"><li>${formatTime(item[0])}</li><li title="${item[4]}">${item[4]}</li><li>${item[5]}</li></d>`
                    $(".list-show").append(dammulist);
                })
            }
            $(".danmuku-list").on("click", function() {dp.seek($(this).attr("time"))})
    }
	});
});
         setTimeout(function () {$("#link1").fadeIn();}, 1 * 500);
         setTimeout(function () {$("#link2").fadeIn();}, 1 * 1000);
         setTimeout(function () {$("#link3,#span").fadeIn();}, 2 * 1000);
         $(".yzmplayer-fulloff-icon").on("click", function () {dp.fullScreen.cancel();})
    //����loadingԪ��		
function video_play() {
         $("#link3").text("��Ƶ��׼������������Ϊ������");
         setTimeout(function () {dp.play();$("#loading-box").remove();}, 1 * 1500);
	};
function video_con_play() {
        if( laoding > 0)
        {
         var conplayer = ` <e>�Ѳ�����${ctime}�������ϴβ��ţ�</e><d class="conplay-jump">�� <i id="num">10</i>s</d><d class="conplaying">��</d>`
         $("#link3").html(conplayer);
         //setTimeout(function () {$("#laoding-pic,.memory-play-wrap,#loading-box").remove();dp.play();}, 15 * 1000);
         var span = document.getElementById('num');
         var num = span.innerHTML;
         var timer = null;
         setTimeout( function(){
		timer = setInterval(function(){
			num--;	
			span.innerHTML = num;
			if(num == 0){
			clearInterval(timer);video_seek();dp.play();$("#laoding-pic,.memory-play-wrap,#loading-box").remove();
		}
		},1000);
	},1 );
	}else{dp.play();}
         var cplayer = `<div class="memory-play-wrap"><div class="memory-play"><span class="close">��</span><span>�ϴο��� </span><span>${ctime}</span><span class="play-jump">��ת����</span></div></div>`
             $(".yzmplayer-cplayer").append(cplayer);
             $(".close").on("click", function () {$(".memory-play-wrap").remove();});
             setTimeout(function () {$(".memory-play-wrap").remove();}, 20 * 1000);
         $(".conplaying").on("click", function () {clearTimeout(timer);$("#laoding-pic,#loading-box").remove();dp.play();});
         $(".conplay-jump,.play-jump").on("click", function () {clearTimeout(timer);video_seek();$("#laoding-pic,.memory-play-wrap,#loading-box").remove();dp.play();});
	};