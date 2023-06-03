
var isClick = false;
var resultPid = 0;
var resultMsg = "";
var isChai = false;
var Timerr;
var bCode = "";

$(function () {
    //new Marquee("marquee_rule",0,1,700,120,60,0,0);

    $(".js_close_dialog").click(function () {
        $(".iDialog").hide();
        $(".iDialogLayout").hide();
    })


})

//关闭红包
function closebox() {
    $('#login_box').hide();
    $('#hongbao_back').hide();
}

//关闭红包层
function close_hongbao() {
    isChai = false;
    $('#hongbao_result').find('.w2').html('恭喜发财，大吉大利!');
    $('#hongbao_open').hide();
    $('#hongbao_result').hide();
    $('#hongbao_back').hide();
    $("#hongbao_open").removeClass("out");
    $("#hongbao_result").removeClass("in").hide();
}

//关闭登录框
function closebox() {
    $('#login_box').hide();
    $('#hongbao_back').hide();
}

//检查用户帐号
function checkUser() {
    var _username = $("#username").val();
    if (_username == "") {
        showMsg("输入会员帐号不能为空!");
        return false;
    }
    $.ajax({
        url: '/Home/GetBag',
        dataType: 'json',
        cache: false,
        type: 'POST',
        data: { username: _username },
        success: function (obj) {
            switch (obj.stat) {
                case '-1':
                    showMsg('您输入的会员帐号不能为空!');
                    bCode = "";
                    break;
                case '-2':
                    showMsg('您的账号无法参与活动!');
                    bCode = "";
                    break;
                case '-3':
                    showMsg('您的机会已经用完啦!');
                    bCode = "";
                    break;
                case '-4':
                    showMsg(obj.msg);
                    bCode = "";
                    break;
                case '0':
                    $('#hb_count').html(obj.score);
                    $('#j-packet').show();
                    $('#j-packet-bg').show();
                    $('#j-dailog-bag').hide();
                    $('.dailog-bag-bg').hide();
                    $('.packet-1').show();
                    $('.packet-2').hide();

                    break;
                default:
                    showMsg('网络错误,请稍后再抽奖');
                    break;
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var x = 1;
        }
    });
}

function lotterylist() {
    $.ajax({
        url: 'ajax.php?action=lotterylist',
        dataType: 'json',
        cache: false,
        type: 'POST',
        success: function (obj) {
            if (obj) {
                var sAwardEle = "";
                $.each(obj, function (i, award) {
                    sAwardEle += '<li style="width:auto;">恭喜&nbsp;&nbsp;' + award.user + '用户抢到' + award.prize + '元</li>';
                });
                $(".picList").html(sAwardEle);
                jQuery(".box-t-left").slide({ mainCell: ".bd ul", autoPlay: true, effect: "leftMarquee", vis: 3, interTime: 10 });
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var x = 1;
        }
    })
}

function ajaxLottery() {
    $.ajax({
        url: '/Home/Check',
        dataType: 'json',
        cache: false,
        type: 'GET',
        success: function (obj) {
            switch (obj.stat) {
                case '-4':
                    clearInterval(Timerr);
                    $("#hb_start").hide();
                    $("#hb_for").hide();
                    $("#hb_next").hide();
                    $("#hb_end").hide();
                    $("#today_end").show();
                    window.clearInterval(timerhb);
                    break;
                case '-1':
                    //下一波倒计时
                    clearInterval(Timerr);

                    var c_time = obj.c_time.replace(/-/g, "/");
                    var start_time = obj.start_time.replace(/-/g, "/");

                    NowTimeOld = new Date(c_time);
                    startDateTime = new Date(start_time);
                    one = setInterval(getRTimeOne, 1000);
                    window.clearInterval(timerhb);
                    $("#hb_start").hide();
                    $("#hb_for").hide();
                    $("#hb_end").hide();
                    $("#today_end").hide();

                    $("#hb_next").show();
                    break;
                case '0':
                    //抽奖动画
                    var c_time = obj.c_time.replace(/-/g, "/");
                    var end_time = obj.end_time.replace(/-/g, "/");

                    NowTimeOld = new Date(c_time);
                    waveTime = new Date(end_time);
                    two = setInterval(getRTimeTwo, 1000);
                    timerhb = setInterval(hby, 200);
                    $("#hb_start").hide();
                    $("#hb_end").hide();
                    $("#today_end").hide();
                    $("#hb_next").hide();
                    $("#hb_for").show();

                    break;
                default:
                    break;

            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var x = 1;
        }
    })
}


function startGame() {
    if (isClick) {
        return;
    }
    var _username = $("#username").val();
    if (_username == "") {
        showMsg("输入会员帐号不能为空!");
        return false;
    }
    isClick = true;
    $.ajax({
        url: '/Home/Fetch',
        dataType: 'json',
        cache: false,
        type: 'POST',
        data: { username: _username },
        success: function (obj) {
            switch (obj.stat) {
                case '-1':
                    showMsg('您输入的信息不能为空!');
                    bCode = "";
                    isClick = false;
                    break;
                case '-2':
                    showMsg('您的账号无法参与活动!');
                    bCode = "";
                    isClick = false;
                    break;
                case '-3':
                    showMsg('您的机会已经用完啦!');
                    bCode = "";
                    isClick = false;
                    break;
                case '-4':
                    showMsg('当前时段无法领取红包!');
                    bCode = "";
                    isClick = false;
                    break;
                case '5':
                    showMsg(obj.msg);
                    isClick = false;
                    break;
                case '0':
                    var type = obj.type;
                    resultMsg = obj.msg;
                    $(".packet-open").text("");
                    $(".packet-open").addClass("xuanzhuan")
                    $(".packet-open").bind('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                        $('.packet-open').removeClass('xuanzhuan');

                        $("#hb_money").html("<span>" + obj.msg + "</span>");
                        $('.packet-2').show();
                        $('.packet-1').hide();
                        $(".packet-open").text("拆红包");
                    });
                    //$('#j-packet').addClass('animated shake');
                    //$('#j-packet').bind('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                    //    $('#j-packet').removeClass('animated shake');

                    //    $("#hb_money").html("<span>" + obj.msg + "</span>");
                    //    $('.packet-2').show();
                    //    $('.packet-1').hide();
                    //});
                    break;
                case '10':
                    var type = obj.type;
                    resultMsg = obj.msg;

                    $('#j-packet').addClass('animated shake');
                    $('#j-packet').bind('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                        $('#j-packet').removeClass('animated shake');

                        $("#hb_money").html("<span>" + obj.msg + "</span>");
                        $('.packet-2').show();
                        $('.packet-1').hide();
                    });
                    break;
                default:
                    showMsg(obj.msg);
                    break;
            }
        },
        failure: function () {
            //api请求失败处理
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var x = 1;
            showMsg('网络故障,请联系管理员');
        }
    })

}

function queryBtn() {

    var _bonuscode = $("#querycode").val();

    if (_bonuscode == "") {

        showMsg("输入会员帐号不能为空!");

        return false;

    }

    queryPage(1);

}

var pagesize = 5;



function queryPage(page) {

    $.ajax({

        url: '/Home/Query?p=' + page + '&size=' + pagesize,

        dataType: 'json',

        cache: false,

        data: { querycode: $("#querycode").val() },

        type: 'GET',

        success: function (obj) {

            if (obj.count != 0) {

                var sHtml1 = "";

                var x = "";

                $.each(obj.data, function (i, award) {

                    x = (award.x == "已对接处理") ? "<font color=yellow>已派彩</font>" : "<font color=white>未派彩</font>";

                    sHtml1 += "<tr><td>" + award.bag_money + "</td><td>" + award.get_time + "</td><td>" + x + "</td></tr>";

                })

                var sPage = Paging(page, pagesize, obj.count, 2, "queryPage", '', '', '上一页', '下一页');

                $(".quotes").html(sPage);

                $("#query_content").html(sHtml1);

            } else {

                $("#query_content").html("<tr><td colspan='3'>未找到相关信息</td></tr>");

            }

        },

        error: function (XMLHttpRequest, textStatus, errorThrown) {

            var x = 1;

        }

    })

}


function Paging(pageNum, pageSize, totalCount, skipCount, fuctionName, currentStyleName, currentUseLink, preText, nextText, firstText, lastText) {

    var returnValue = "";

    var begin = 1;

    var end = 1;

    var totalpage = Math.floor(totalCount / pageSize);

    if (totalCount % pageSize > 0) {

        totalpage++;

    }

    if (preText == null) {

        firstText = "prev";

    }

    if (nextText == null) {

        nextText = "next";

    }



    begin = pageNum - skipCount;

    end = pageNum + skipCount;



    if (begin <= 0) {

        end = end - begin + 1;

        begin = 1;

    }



    if (end > totalpage) {

        end = totalpage;

    }

    for (count = begin; count <= end; count++) {

        if (currentUseLink) {

            if (count == pageNum) {

                returnValue += "<a class=\"" + currentStyleName + "\" href=\"javascript:void(0);\" onclick=\"" + fuctionName + "(" + count.toString() + ");\">" + count.toString() + "</a> ";

            }

            else {

                returnValue += "<a href=\"javascript:void(0);\" onclick=\"" + fuctionName + "(" + count.toString() + ");\">" + count.toString() + "</a> ";

            }

        }

        else {

            if (count == pageNum) {

                returnValue += "<span class=\"" + currentStyleName + "\">" + count.toString() + "</span> ";

            }

            else {

                returnValue += "<a href=\"javascript:void(0);\" onclick=\"" + fuctionName + "(" + count.toString() + ");\">" + count.toString() + "</a> ";
            }

        }

    }

    if (pageNum - skipCount > 1) {

        returnValue = " ... " + returnValue;

    }

    if (pageNum + skipCount < totalpage) {

        returnValue = returnValue + " ... ";

    }



    if (pageNum > 1) {

        returnValue = "<a href=\"javascript:void(0);\" onclick=\"" + fuctionName + "(" + (pageNum - 1).toString() + ");\"> " + preText + "</a> " + returnValue;

    }

    if (pageNum < totalpage) {

        returnValue = returnValue + " <a href=\"javascript:void(0);\" onclick=\"" + fuctionName + "(" + (pageNum + 1).toString() + ");\">" + nextText + "</a>";

    }



    if (firstText != null) {

        if (pageNum > 1) {

            returnValue = "<a href=\"javascript:void(0);\" onclick=\"" + fuctionName + "(1);\">" + firstText + "</a> " + returnValue;
        }

    }

    if (lastText != null) {

        if (pageNum < totalpage) {

            returnValue = returnValue + " " + " <a href=\"javascript:void(0);\" onclick=\"" + fuctionName + "(" + totalpage.toString() + ");\">" + lastText + "</a>";
        }

    }

    return returnValue;



}

