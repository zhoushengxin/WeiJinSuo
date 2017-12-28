$(function () {
    bannerRender();
    initTabSwipe();

    //初始化  工具提示
    $('[data-toggle="tooltip"]').tooltip();
});

var bannerRender =function () {
    var renderHtml =function () {
        var isMobile =$(window).width() < 768;

        $(".carousel-indicators").html(template("pointTemplate",window.data))
        $(".carousel-inner").html(template("imageTemplate",{list:window.data,isM:isMobile}))
    }




    var render =function () {
        if(window.data){
            renderHtml()
        }else {
            $.ajax({
                type:"get",
                url:"js/data.json",
                data:{},
                datatype:"json",
                success:function (data) {
                    window.data =data;
                    renderHtml()
                }
            })
        }
    }
    render();

    $(window).on("resize",function () {
        render();
    })

//    移动端手动切换轮播图
    var startx =0;
    var distancex =0;
    var isMove =false;

    $(".wjs_banner").on("touchstart",function (e) {
        startx = e.originalEvent.touches[0].clientX;
    }).on("touchmove",function (e) {
        var movex =e.originalEvent.touches[0].clientX;
        distancex = movex - startx;
        isMove =true;
    }).on("touchend",function (e) {
        if (isMove && Math.abs(distancex) >50){
            if (distancex >0){
                $("#carousel-example-generic").carousel("prev")
            }else {
                $("#carousel-example-generic").carousel("next")
            }
        }
        startx =0;
        distancex =0;
        isMove=false;
    })

}

var initTabSwipe =function () {

    /*1. 获取所有的子页签  求出宽度的和 */
    /*2. 把页签容器设置成你的宽度 出现滚动条*/
    /*3. 准备一个容器装 页签容器 溢出隐藏*/
    /*4. 大容器套一个长的子容器 初始化成区域滚动*/
    var $tab = $('.wjs_product .nav-tabs');
    var $tabchild =$tab.children();
    var width =0;
    $tabchild.each(function (i, item) {
        width += $(item).outerWidth(true)
       // width() 内容
       // innerwidth() 内容+内边距
       // outerwidth() 内容 + 内边距 +边框
       // outerwidth(true) 内容 + 内边距 +边框 + 外边框

    });
    $tab.width(width);
    new IScroll(".nav-tabs-parent",{
        scrollX :true,
        scrollY:false,
        click:true
    })
}