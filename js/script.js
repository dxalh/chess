var me;
var over;
var chessBoard = [];
var count;
var chess;
var context;
//赢法数组
var wins = [];
//赢法的统计数组
var myWin = [];
var computerWin = [];

//获取棋盘


var $ = function (id) {
    return document.getElementById(id);
}
//画棋盘
var drawChessBoard = function () {
    for (var i = 0; i < 15; i++) {
//横线
        context.moveTo(15 + i * 30, 15);
        context.lineTo(15 + i * 30, 435);
        context.stroke();

//纵线
        context.moveTo(15, 15 + i * 30);
        context.lineTo(435, 15 + i * 30);
        context.stroke();
    }

};

var oneStep = function (i, j, me) {
    //棋子
    context.beginPath();
    context.arc(15 + i * 30, 15 + j * 30, 13, 0, 2 * Math.PI);
    context.closePath();
    //阴影
    context.shadowOffsetX = 1.5;
    context.shadowOffsetY = 2;
    context.shadowBlur = 3;
    context.shadowColor = "#333";
    var gradient = context.createRadialGradient(15 + i * 30 + 2, 15 + j * 30 - 2, 13, 15 + i * 30 + 2, 15 + j * 30 - 2, 0);
    if (me) {
        gradient.addColorStop(0, "#0a0a0a");
        gradient.addColorStop(1, "#636766");
    } else {
        gradient.addColorStop(0, "#d1d1d1");
        gradient.addColorStop(1, "#f9f9f9");
    }


    context.fillStyle = gradient;
    context.fill();
}


//赢法数组
var newGame = function () {
    me = true;
    over = false;
    chessBoard = [];
    /*赢法数组*/
    wins = [];

    /*赢法统计数组*/
    myWin = [];
    computerWin = [];
    chess = null;
    context = null;
    // 画棋盘
    $("box").innerHTML = '<canvas id="chess" width="450" height="450"></canvas>';
    chess = document.getElementById('chess');
    context = chess.getContext('2d');
    context.strokeStyle = "#bfbfbf";

    //添加背景

    var logo = new Image();
    logo.src = "images/logo.png";
    logo.onload = function () {
        context.drawImage(logo, 15, 15, 420, 420);
        drawChessBoard();
    }

    //初始化棋盘数据
    for (var i = 0; i < 15; i++) {
        chessBoard[i] = [];
        for (var j = 0; j < 15; j++) {
            chessBoard[i][j] = 0;
        }
    }

    //初始化赢法数据
    for (var i = 0; i < 15; i++) {
        wins[i] = [];
        for (var j = 0; j < 15; j++) {
            wins[i][j] = [];
        }
    }
    //计算所有赢法
    count = 0;
//所有的横线

    for (var i = 0; i < 15; i++) {
        for (var j = 0; j < 11; j++) {
            // wins[0][0][0] = true
            for (var k = 0; k < 5; k++) {
                wins[i][j + k][count] = true;
            }
            count++;
        }
    }


//所有的竖线
    for (var i = 0; i < 11; i++) {
        for (var j = 0; j < 15; j++) {
            // wins[0][0][0] = true
            for (var k = 0; k < 5; k++) {
                wins[i + k][j][count] = true;
            }
            count++;
        }
    }

//所有的斜线
    for (var i = 0; i < 11; i++) {
        for (var j = 0; j < 11; j++) {
            // wins[0][0][0] = true
            for (var k = 0; k < 5; k++) {
                wins[i + k][j + k][count] = true;
            }
            count++;
        }
    }

//所有的反斜线
    for (var i = 0; i < 11; i++) {
        for (var j = 14; j > 3; j--) {
            // wins[0][0][0] = true
            for (var k = 0; k < 5; k++) {
                wins[i + k][j - k][count] = true;
            }
            count++;
        }
    }

// 初始化一中赢法
    for (var i = 0; i < count; i++) {
        myWin[i] = 0;
        computerWin[i] = 0;
    }
    console.log(count);

    chess.onclick = function (e) {
        myClick(e);
    }
};

var gameOver = function (me) {
    over = true;
    var a;
    if (me) {
        a = confirm("你赢了，是否重新开始！");
    } else {
        a = confirm("计算机赢了，是否重新开始！");
    }

    if (a) {
        setTimeout(function () {
            newGame();
            drawChessBoard();
        }, 200);
    }

};


var computerAI = function () {
    var myScore = [];
    var computerScore = [];

    //用来保存最高点的坐标
    //保存最大的分数和相应的坐标
    var max = 0;
    var u = 0, v = 0;

    //棋盘每个点得分归零
    for (var i = 0; i < 15; i++) {
        myScore[i] = [];
        computerScore[i] = [];
        for (var j = 0; j < 15; j++) {
            myScore[i][j] = 0;
            computerScore[i][j] = 0;
        }
    }
    for (var i = 0; i < 15; i++) {
        for (var j = 0; j < 15; j++) {
            if (chessBoard[i][j] == 0) {
                for (var k = 0; k < count; k++) {
                    if (wins[i][j][k]) {
                        switch (myWin[k]) {
                            case 1 :
                                myScore[i][j] += 200;
                                break;
                            case 2 :
                                myScore[i][j] += 500;
                                break;
                            case 3 :
                                myScore[i][j] += 2000;
                                break;
                            case 4 :
                                myScore[i][j] += 10000;
                                break;
                        }
                        switch (computerWin[k]) {
                            case 1 :
                                computerWin[i][j] += 220;
                                break;
                            case 2 :
                                computerWin[i][j] += 520;
                                break;
                            case 3 :
                                computerWin[i][j] += 2200;
                                break;
                            case 4 :
                                computerWin[i][j] += 20000;
                                break;
                        }

                    }
                }
                if (myScore[i][j] > max) {
                    max = myScore[i][j];
                    u = i;
                    v = j;
                } else if (myScore[i][j] == max) {
                    if (computerScore[i][j] > computerScore[u][v]) {
                        u = i;
                        v = j;
                    }
                }
                if (computerScore[i][j] > max) {
                    max = computerScore[i][j];
                    u = i;
                    v = j;
                } else if (computerScore[i][j] == max) {
                    if (myScore[i][j] > myScore[u][v]) {
                        u = i;
                        v = j;
                    }
                }
            }
        }
    }
    oneStep(u, v, false);
    chessBoard[u][v] = 2;


    for (var k = 0; k < count; k++) {
        if (wins[u][v][k]) {
            computerWin[k]++;
            myWin[k] = 6;
            if (computerWin[k] == 5) {
                gameOver(me);
                // break;
            }
        }
    }
    if (!over) {
        me = !me;

    }
};

window.onload = function () {
    newGame();
    drawChessBoard();
};

function myClick(e) {
    console.log("1" + "-" + over + "-" + me);
    if (over || !me)

        return;

    console.log("2");


    var x = e.offsetX;
    var y = e.offsetY;
    var i = Math.floor(x / 30);
    var j = Math.floor(y / 30);

    if (chessBoard[i][j] != 0)
        return;
    console.log("3");
    oneStep(i, j, me);
    chessBoard[i][j] = 1;


    for (var k = 0; k < count; k++) {
        if (wins[i][j][k]) {
            myWin[k]++;
            computerWin[k] = 6;
            if (myWin[k] == 5) {
                gameOver(me);
                // break;
            }
        }
    }
    if (!over) {
        me = !me;
        computerAI();
    }
};

// chess.onclick = function (e) {

// }
$("new-btn").onclick = function () {
    var a = confirm("是否重新开始");
    if (a) {
        me = true;
        newGame();
        drawChessBoard();
    }
}
