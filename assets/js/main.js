
var stars = {
    starTab: {
        tabIndex: 0,
        timer: null,
        run: function (){
            var that = stars.starTab;

            // set auto run
            that.timer = setInterval(function (){
                that.tabIndex++;
                if(that.tabIndex == $('.stars .item').length){
                    clearInterval(that.timer);
                } else {
                    $('.stars .item').eq(that.tabIndex).addClass('go active')
                        .siblings('.item').removeClass('active');
                }
            }, 3500);
        },
        hover: function (){
            $('.stars .item').mouseover(function (){
                var that = stars.starTab;

                // set go status
                $(this).addClass('go active')
                    .siblings('.item').removeClass('active');
                $('.stars .item:lt(' + $(this).index() +')').addClass('go');
                $('.stars .item:gt(' + $(this).index() +')').removeClass('go');
                stars.tabIndex = $(this).index();

                // stop run
                clearInterval(that.timer);
            })
                .mouseout(function (){
                    var that = stars.starTab;

                    // run again
                    that.run();
                });
        },
        tab: function (){
            var that = stars.starTab;

            // first invoke
            $('.stars .item').eq(0).addClass('go active');
            that.run();
        }
    }

    // The following scripts are supposed to draw lines between dots in the home page
    // They are unfinished and untested at this moment

    //starProgressLine: {
    //    getTwoPointWidthAndDeg: function (x1, x2, y1, y2){
    //        // get width and deg between two point
    //        var width = Math.ceil(Math.sqrt(((x1-x2)*(x1-x2)) + ((y1-y2)*(y1-y2)))) + 'px';
    //        var deg = Math.atan((x1-x2) / (y1-y2)) + 'rad';
    //        var widthStr = 'width:' + width + ';';
    //        var degStr = (function (deg) {
    //            return 'transform: rotate(' + deg + ');' + '-webkit-transform: rotate(' + deg + ');' + '-moz-transform: rotate(' + deg + ');' + '-ms-transform: rotate(' + deg + ');' + '-o-transform: rotate(' + deg + ');'
    //        })(deg);
    //
    //        // return width, deg css ruler
    //        return {width: widthStr, deg: degStr};
    //    },
    //    bindTwoPoint: function (){
    //        // auto bind star point line
    //        function getXY(item){
    //            var x = Math.ceil(parseFloat($(item).css('left')));
    //            var y = Math.ceil(parseFloat($(item).css('top')));
    //            return {x: x, y: y};
    //        }
    //
    //        var item1XY = getXY('.html');
    //        var item2XY = getXY('.css');
    //        var item1 = stars.starProgressLine.getTwoPointWidthAndDeg(item1XY.x, item1XY.y, item2XY.x, item2XY.y);
    //        $('.html .progress-line').attr('style', item1.width + ' ' + item1.deg);
    //    }
    //}
};

$(function (){
    // init stars point
    setTimeout(function (){
        stars.starTab.hover();
        stars.starTab.tab();
    }, 1000);

    // connect stars point
    //stars.starProgressLine.bindTwoPoint();
});


