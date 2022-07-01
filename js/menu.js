// munu实现鼠标触摸打开menu函数
// 作者：霍韩淋
// 日期：2022年2月9日
(function () {
    //获取元素
    var menuSection = document.getElementById("menuSection")
    //获取menu-box中的div
    var menuDivs = document.querySelectorAll(".menu-box .menu")
    //获得menuSection中所有的li
    var lis = document.querySelectorAll(".menuSection .menu")
    //设置鼠标监听事件，运用到事件委托给ul
    //此时注意mouseenter不冒泡不能用于事件委托
    menuSection.addEventListener("mouseover", function (e) {
        //保证e.target为ul中的li元素
        if (e.target.tagName.toLowerCase() == "li") {
    
            //获取data-n属性
            var n = e.target.getAttribute("data-n")
            //排他操作（使没有碰到的li标签类名为menu data-n）
            for (var i = 0; i < lis.length; i++) { 
                lis[i].className="menu "+lis[i].getAttribute("data-n")
            }
            //给当前碰到的li元素添加current类名
            e.target.className="menu "+n+" current"
            
            //此时找到menu-box中对应的data-n元素，并且将它的类名添加current
            var themenu = document.querySelector(".menu-box .menu[data-n=" + n + "]")

            //排他操作（指但鼠标没有指到其他区域的类名设置为menu）注意逻辑顺序不能放在下面否则会出现bug
            //此时将每一个div都设置类名menu（利用循环）
            //遍历
            for (var i = 0; i < menuDivs.length; i++) {
                //设置类名为menu
                menuDivs[i].className = "menu"
            }

            //设置添加类名 menu current 注意：不能只添加current 因为只添加current则只会将menu替换成current而不是添加
            themenu.className = "menu current"

        }
    })

    //当鼠标离开bannerNav大盒子的时候菜单栏就会消失
    var bannerNav = document.getElementById("bannerNav")
    //给大盒子添加事件监听
    bannerNav.addEventListener("mouseleave", function () {
        //重写menuSection部分即左边盒子的类名都为menu和data-n
        //遍历lis重写
        for (var i = 0; i <= lis.length; i++) {
            lis[i].className = "menu " + lis[i].getAttribute("data-n")
            //设置类名为menu
            menuDivs[i].className = "menu"
        }


        
    })
})()