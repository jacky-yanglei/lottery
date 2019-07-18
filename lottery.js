$.fn.extend({
    lottery: function (option) {
        option.winner = parseInt(option.winner);
        if (option.winner < 1 || option.winner > 12){
            console.error('中奖项不在范围内');
            return;
        }
        if (!option.callback) {
            option.callback = function (index) {
                console.log(index);
            }
        }
        this.priceArr = option.price || [1,2,3,4,5,6,7,8,9,0,11,12];
        this.IntervalIndex = 0;
        var fastCircle = 3;
        var fastSpeed = 20;
        var fastCount = 0;
        var slowCircle = 2;
        var slowSpeed = 40;
        var slowCount = 0;
        this.resultSpeed = [];
        for (var i = 0; i < this.priceArr.length; i++) {
            this.resultSpeed.push(slowSpeed + slowSpeed * 2 * i);
        }
        var _that = this;
        var timer = setInterval(function () {
            _that.activeFun();
            fastCount += fastSpeed;
            if (fastCount === fastCircle*_that.priceArr.length*fastSpeed + fastSpeed*fastCircle) {
                clearInterval(timer);
                timer = setInterval(function () {
                    _that.activeFun();
                    slowCount += slowSpeed;
                    if (slowCount === slowCircle*_that.priceArr.length*slowSpeed + slowSpeed*slowCircle + option.winner * slowSpeed) {
                        clearInterval(timer);
                        _that.resultFun();
                    }
                }, slowSpeed);
            }
        }, fastSpeed);
        this.activeFun = function () {
            this.find('.lottery-block').removeClass('active');
            if (this.IntervalIndex === this.priceArr.length) {
                this.IntervalIndex = -1;
            }
            this.IntervalIndex++;
            this.find('.lottery-block' + (this.IntervalIndex+1)).addClass('active');
        };
        this.resultFun = function () {
            var Arr = this.resultSpeed;
            var _that = this;
            for (var i = 0;i < Arr.length; i++) {
                setTimeout(function () {
                    _that.activeFun();
                    if (i === Arr.length - 1) {
                        setTimeout(option.callback(option.winner),200);
                    }
                }(i), Arr[i]);
            }
        }
    }
});

// $('.btn').click(function () {
//     $('.lottery').lottery({
//         winner: Math.floor(Math.random()*12) + 1, // 中奖项 必传
//         price: ['一等奖','二等奖','三等奖','四等奖','五等奖','六等奖','七等奖','八等奖','九等奖','十等奖','十一等奖','十二等奖'], // 奖品列表 非必传
//         callback: function (index) {
//             alert(index);
//         } // 抽奖转完之后的回调方法
//     });
// });