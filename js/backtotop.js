// 返回顶部实现函数
// 作者：霍韩淋
// 日期：2022年2月9日
(function () {
    //获取元素
    var backtotop = document.getElementById("backtotop")

    var timer

    //设置按钮点击监听事件
    backtotop.addEventListener("click", function () {
        //设表先关，以防用户多次点击事件，占用timer内存
        clearInterval(timer)

        //设置定时器实现逐步滚动
        timer = setInterval(function () {
            document.documentElement.scrollTop -= 300
            //实现判断如果滚动条已经到了顶部则清除定时器
            if (document.documentElement.scrollTop <= 0) {
                clearInterval(timer)
            }
        }, 50)
    })

    //实现当滚动条拉下的时候返回顶部按钮才出现，顶部的时候返回顶部按钮消失
    //给widow对象的滚动条设置监听事件
    window.addEventListener("scroll", function () { 
        if (this.document.documentElement.scrollTop <= 0) {
            //按钮消失
            backtotop.style.display = "none"
        }
        else { 
            backtotop.style.display = "block"
        }
    })

})()