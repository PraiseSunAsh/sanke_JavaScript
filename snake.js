//-----------------小蛇的自调用函数--------------------------
(function () {
    var elements = [];//存放小蛇的每个身体部分
//小蛇的构造函数
    function Snake(width,height,direction){
        //小蛇每个部分的长度和宽度
        this.width = width||20;
        this.height = height||20;
        this.body = [
            {x:3,y:2,color:"red"},
            {x:2,y:2,color:"orange"},
            {x:1,y:2,color:"orange"}
        ]; 
        this.direction = direction || "right";
        
    }
    //留个全局变量用来保存小蛇的身体长度
    count = 3;
    window.Snake = Snake; 
    
//为小蛇添加显示方法
    Snake.prototype.show = function(map){
        //画小蛇之前先把残留的东西给删掉
        remove();
        //根据小蛇身体的长度创建div
        for(var i = 0;i<this.body.length;i++){
           
            var div = document.createElement("div");
            map.appendChild(div);
            //设置div的style
            div.style.position = "absolute";
            div.style.width = this.width+"px";
            div.style.height = this.height+"px";
            //设置这个div的横纵坐标
            var obj = this.body[i];//先把这个对象拿出来*///////////////////////
            div.style.left = obj.x*this.width+"px";
            div.style.top = obj.y*this.height+"px";
            //设置这个div的bgc
            div.style.backgroundColor = obj.color;

            //创建完成后把div加到上面定义的数组中---方便接下来进行删除
            elements.push(div);
        }
    };
//为小蛇添加移动方法
    Snake.prototype.move = function (food,map) {
        //改变身体部分的坐标
        for(var i = this.body.length-1;i>0;i--){
            this.body[i].x = this.body[i-1].x;
            this.body[i].y = this.body[i-1].y;
        }
        //改变小蛇的方向（通过改变头的方向）
        switch (this.direction){
            case "right":
            this.body[0].x += 1;
            break;
        case "left":
            this.body[0].x -= 1;
            break;
        case "top":
            this.body[0].y -= 1;
            break;
        case "bottom":
            this.body[0].y += 1;
            break;
        }
        //判断有没有吃到食物 
        var headX = this.body[0].x*this.width;
        var headY = this.body[0].y*this.height;
        //食物的坐标
        //当吃到食物时
        if(headX == food.x&&headY==food.y){
            var last = this.body[this.body.length-1];
            this.body.push({
            x:last.x,
            y:last.y,
            color:last.color});
        //然后身体长度+1
        count++;

        //吃完后把食物删除
        food.show(map);
        }
    }
    function remove() {
       //删除刚才放到elements数组中的div（小蛇的每个身体块）
       var i = elements.length-1;
       for(;i>=0;i--){
        var ele = elements[i];
        //从map地图上删除这个子元素div
        ele.parentNode.removeChild(ele);
        elements.splice(i, 1);
       }
    }
    
}());