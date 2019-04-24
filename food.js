(function(){
    //用来保存小方块食物
    var elements = [];
    //构造函数创建食物对象
    function Food(x,y,width,height,color){
        this.x = x||0;//传x优先使用x，没传值默认为0
        this.y = y||0;
        this.width = width||20;
        this.height = height||20;
        this.color = color||"green";
    }
    window.Food = Food;
    //为食物这个对象添加方法，让其显示
    //对象的方法一定要添加到原型中
    Food.prototype.show = function(map){
        //先清除之前的食物
        remove();
    //创建div
        var div = document.createElement("div");
        //可以先追加到后面然后再设置div的样式
        map.appendChild(div);
        //让div先脱离文档流
        div.style.position = "absolute";
        //设置div的样式
        div.style.width = this.width+"px";
        div.style.height = this.height+"px";
        div.style.backgroundColor = this.color;
        //随机横纵坐标
        this.x = parseInt(Math.random()*(map.offsetWidth/this.width))*this.width;
        //产生一个0到40的随机数同时*方块自带的宽度
        this.y = parseInt(Math.random()*(map.offsetHeight/this.height))*this.height;
        div.style.left = this.x+"px";
        div.style.top = this.y+"px";
        //显示完记得把div先保存到一个数组中
        elements.push(div);
    }
    //食物的私有方法，让其被删除
    //先留个接口
    function remove() {
        for(var i = 0;i<elements.length;i++){
            var ele = elements[i];//拿出来
            //删除网页中的div
            ele.parentNode.removeChild(ele);
            //再把elements数组中的食物删了
            elements.splice(i,1);
        }
    }
    }());