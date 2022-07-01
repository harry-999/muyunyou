// 轮播图实现函数
// 作者：霍韩淋
// 日期：2022年2月8日
(function () {
    //获取元素
    var left_btn = document.getElementById("left_btn")
    var right_btn = document.getElementById("right_btn")
    var carousel_list = document.getElementById("carousel_list")
    var circle_list = document.getElementById("circle_list")
    var lis = circle_list.getElementsByTagName("li")
    var banner=document.getElementById("banner")

    //克隆第一张图片到最后(此时的节点为孤儿节点需要上树成为dom元素)
    var last_pic = carousel_list.firstElementChild.cloneNode(true)
    //上树
    carousel_list.appendChild(last_pic)

    //设置全局变量用于储存现在的banner图片
    var index = 0

    //设置节流锁
    var lock = true

    //添加右按钮监听
    //提取右按钮处理函数用于后面自动轮播
    right_btn.addEventListener("click", function () { 
        right_btn_handle()
    })
    function right_btn_handle() {
        //判断节流锁状态(如果节流锁状态为false则会一直执行该语句)
        if (!lock) return
        //关锁（以至于实现多次点击时候还是会先执行完轮播效果后才打开）
        lock = false
        index++
        //设置过渡
        carousel_list.style.transition = "transform .5s ease 0s"
        //拉动
        carousel_list.style.transform = "translateX(" + -index * 16.666 + "%)"
        //设置左按钮终点
        if (index >= 5) {
            //并且更新index(不放在延时器里面原因是要实现圆点快速移动)
            index = 0
            //设置延时器替代过渡移动到第6张假0图
            setTimeout(function () {
                carousel_list.style.transform = "translateX(" + -5 * 16.666 + "%)"
                //取消过渡瞬间移动到第0张
                carousel_list.style.transition = "none"
                carousel_list.style.transform = "translateX(" + 0 * 16.666 + "%)"
            }, 500)
        }
        //更新小圆点
        setcircle()
        //开锁(保证在轮播效果期间（.5s）的时候节流锁是出于false状态，这样就不会进行下一张轮播效果,结束后打开锁来读取监听事件)
        setTimeout(function () {
            lock = true
        }, 500)
    }

    //添加左按钮监听
    left_btn.addEventListener("click", function () {
        //判断节流锁状态
        if (!lock) return
        //关锁
        lock = false
        index--
        //拉动（设置过渡）
        carousel_list.style.transform = "translateX(" + -index * 16.666 + "%)"
        //判断终点(瞬间移动到第6张假0图，然后自动过渡延时.5s到第5张图)
        if (index < 0) {
            //取消过渡，瞬间移动到第6张图
            carousel_list.style.transition = "none"
            carousel_list.style.transform = "translateX(" + -5 * 16.666 + "%)"
            //更新index
            index = 4
            //缓慢变成第5张图(利用小技巧延时器定时0s实现过渡，这样做的目的就是可以使过渡保留，不会给瞬间移动的时候取消掉)
            //本质你也可以封装一个函数实现，但是就会比直接调用延时器麻烦
            setTimeout(function () {
                carousel_list.style.transition = "transform .5s ease 0s"
                carousel_list.style.transform = "translateX(" + -index * 16.666 + "%)"
            }, 0)
        }
        //更新小圆点
        setcircle()
        //设置延时器，直到完成一项轮播图打开锁
        setTimeout(function () {
            lock = true
        }, 500)
    })
    //设置添加小圆点更新current函数
    function setcircle() {
        //遍历li列表
        for (var i = 0; i < lis.length; i++) {
            //如果遍历到的li为index当前轮播图则设置类名current
            //i == index%5 可以非常巧妙的解决上面因为按钮终点的index变换问题
            //index在右按钮原本终点方案中是会变成5的时候等500毫秒后更新为0
            if (i == index) {
                lis[i].className = "current"
            }
            //否则清理类名
            else {
                lis[i].className = ""
            }
        }
    }
    //设置小圆点点击就会去到对应轮播图
    //利用事件监听e.target表示点击事件元素
    circle_list.addEventListener("click", function (e) {
        if (e.target.tagName.toLowerCase() == "li") {
            var n = e.target.getAttribute("data-n")
            //更新index
            index = n
            //拉动
            //过渡
            carousel_list.style.transition = "transform .5s ease 0s"
            carousel_list.style.transform = "translateX(" + -index * 16.666 + "%)"
            //小圆点变换
            setcircle()
        }
    })

    //设置定时器实现自动轮播，第一个参数不需要加（），因为定时器的机理是直接调用第一个参数函数
    var timer=setInterval(right_btn_handle,2000)
    //设置鼠标进入banner则定时器关闭，暂停自动轮播
    banner.addEventListener("mouseenter", function () { 
        clearInterval(timer)
    })
    //设置鼠标离开banner事件则定时器重新开始
    banner.addEventListener("mouseleave", function () { 
        //表先关再开,防止用户多次进行鼠标移动,定时器累加占用内存
        clearInterval(timer)
        //开始定时
        timer=setInterval(right_btn_handle,2000)
    })
})()