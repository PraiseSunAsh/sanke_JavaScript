(function () {
    var that = null;
    function Game(map){
        this.food = new Food();//初始化食物属性
        this.snake = new Snake(); //初始化小蛇属性
        this.map = map;
        that = this;
    }
    window.Game = Game;
    //启动游戏
    Game.prototype.launch = function(){
        
        this.food.show(this.map);
        this.snake.show(this.map);
        //调用小蛇跑的方法
        this.run(this.food,this.map);
        //监听按键
        this.bindKey();
        
    }
    //添加原型方法  小蛇跑起来
    Game.prototype.run = function(food,map){
        //为实现小蛇速度加快而将传入setInterv中的代码块封装到code对象中
       var code = function () {
        //注意这里面的this是window对象
        //如果要调的话需要改变this的指向

        this.snake.move(food,map);
        this.snake.show(map);
        //----判断小蛇是否撞墙----
        //横坐标的最大值
        var maxX = map.offsetWidth/this.snake.width;
        var maxY = map.offsetHeight/this.snake.height;
        //小蛇蛇头的坐标
        var headX = this.snake.body[0].x;
        var headY = this.snake.body[0].y;
        //撞墙条件判断
       if(headX<0||headX>=maxX){
        clearInterval(timeId);//停止计时器
        alert("你GG啦");
       }
       if(headY<0||headY>=maxY){
        clearInterval(timeId);//停止计时器
        alert("你GG啦");
       }
       for(var i = 1;i<this.snake.body.length;i++){
           //如果小蛇的头和身体部分重叠，就结束游戏
           if(headX==this.snake.body[i].x&&headY==this.snake.body[i].y){
            clearInterval(timeId);//停止计时器
            alert("你咬着自己了！");
           }
       }
       
       
       //--------------------------------------------------------------------------------
      
    }.bind(that);

    //根据小蛇身体长度增加游戏的速度
    var timeId = setInterval(code,50);
    
       
    };
    //添加方法  小蛇监听用户按键从而改变移动的方向
    Game.prototype.bindKey = function(){
        //获取用户按键
        document.addEventListener("keydown",function(e){
            //这里的this应该是document，
            //获取用户的按键
            //改进了游戏机制 by PraiseSunAsh.
            switch(e.keyCode){
                case 37: if(this.snake.direction!="right") this.snake.direction = "left";break;
                case 38: if(this.snake.direction!="bottom")this.snake.direction = "top";break;
                case 39: if(this.snake.direction!="left")this.snake.direction = "right";break;
                case 40: if(this.snake.direction!="top")this.snake.direction = "bottom";break;
            }
        }.bind(that));
    };
}());

    var gm = new Game(document.querySelector(".map"));
    gm.launch();