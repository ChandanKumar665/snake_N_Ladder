
var payer1 = 0;
var player2 = 0;
var player1_initiated = false;
var player2_initiated = false;

function init(){
    //getting canvas context
    var canvas = document.getElementById('mycan');
    var context = canvas.getContext('2d');
    if(canvas.getContext('2d')){
        // console.log('sucess');
        //draw board.
        var grd = context.createLinearGradient(0,0,200,0);
        grd.addColorStop(0,"red");
        var x = 0;
        var y = 0;
        var width = 30;
        var height = 15;
        var no = 100;
        // context.font = '7px arial';
        for(var row=0;row<10;row++){
            for(var col=0;col<10;col++){
                console.log(no);
                context.fillStyle = 'rgb(200, 0, 0)';
                context.fillRect(x,y,width,height);
                context.strokeRect(x,y,width,height);
                // context.fillText('100',40,55);
                x += 30; 
                no--;
            }
            y += 15
            // x  ;
        }
        var arr = [100,81,80,61,60,41,40,21,20,1]
        var postive = false;
        var step = 0;
        // step = -1
        for (x in arr) {
            if (postive){
                // step = 1
                last_index = arr[x] + 10
                for(var i=arr[x];i<last_index;i++){
                    // console.log(i+' ')
                    // print(i)
                    // $('#board').append(i+'  ')
                }
            }
            else{
                // step = -1
                last_index = arr[x] - 10
                for(var i=arr[x];i>last_index;i--){
                    // console.log(i+' ')
                    // $('#board').append(i+'  ')
                    // print(i)
                }
            }
            
            // console.log('\n')
            if (postive){
                postive = false
            }
            else{
                postive = true 
            }
        }
            
            
        // context.fillStyle = 'red';
        // context.fillRect(0,0,30,15);
        // context.strokeRect(0,0,30,15);
        // // context.linewidth=1
        // context.strokeText("60",10,12);
        // context.fillRect(30,0,30,15);
        // context.strokeRect(30,0,30,15);
        // context.strokeText(61,40,12);
        // context.fillRect(0,0,60,60);
        // context.fillRect(0,0,60,60);


    }else{
        console.log('game loading failed. Please try again.');
    }
}

function loadGame(){
    player1 = 0;
    player2 = 99;
    player1_initiated = false;
    player2_initiated = true;

    $('#score1, #score2').text(0);
    $('#roll1').removeAttr('disabled',true);
    $('#roll2').attr('disabled',true);
    $('#dice_result').empty();
    $('#restart_btn').hide();
    $('.restart').hide();
    $('#winning').show();
}


function rollDice(){
    var dice_no = Math.floor((Math.random() * 6) + 1);
    var img = dice_no+'.png';
    $('#dice_result').html("<img class='dice' src='/images/"+img+"'>");
    return dice_no;
}

function isWinner(score){
    return (score == 100)? true: false;
}

function isSnake(score){
    // snake's position
    snake = [
            {head:24,tail:18},
            {head:26,tail:16},
            {head:28,tail:14},
            {head:55,tail:34},
            {head:57,tail:36},
            {head:59,tail:38},
            {head:91,tail:50},
            {head:95,tail:74},
            {head:97,tail:76},
            {head:99,tail:78}
        ];

        if(score < snake[0].head){
            return score;
        }else{
            for(var i in snake){
                if(score == snake[i].head){
                    return snake[i].tail;
                }else if(score < snake[i].head){
                    return score;
                }
            }

        }
    }

    function isLadder(score){
        //ladder's position
        ladder = [
            {bottom:5,up:17},
            {bottom:7,up:15},
            {bottom:9,up:13},
            {bottom:33,up:47},
            {bottom:35,up:45},
            {bottom:37,up:43},
            {bottom:40,up:81},
            {bottom:64,up:83},
            {bottom:66,up:85},
            {bottom:68,up:87}
            ];

            if(score < ladder[0].bottom){
                return [score,false];
            }else if(score > ladder[9].bottom){
                return [score,false];
            }else{
                for(var i in ladder){
                    if(score == ladder[i].bottom){
                        return [ladder[i].up,true];
                    }else if(score < ladder[i].bottom){
                        return [score,false];
                    }
                }
            }
    }

$('.btn_roll').click(function(){
    var title = $(this).attr('title');
    var dice_no = rollDice();
    if(title === '1'){
        if(dice_no == 1 && !player1_initiated){
            //player 1 initiated
            player1_initiated = true
        }else if(player1_initiated){
            // player1 = ((player1 + dice_no) > 100) ? player1 : player1 + dice_no;
            if((player1 + dice_no) > 100){
                player1 = player1;
            }else{
                player1 = player1 + dice_no;
                if(player1 != 100){
                    var temp = isLadder(player1);
                    if(!temp[1]){
                        // if ladder is not found then check for snake.
                        player1 = isSnake(player1);
                    }else{
                        //ladder is found
                        player1 = temp[0];
                    }
                }
                
            }
            $('#score1').text(player1);
            if(isWinner(player1)){
                $('#myModal').modal({
                    show:true
                })
                $('.modal-title').text('Congratulation');
                $('#win_msg').text("Player 1 Won.");
                // return
            }
        }

        $('#roll1').attr('disabled',true);
        $('#roll2').removeAttr('disabled',true);
    }else{

        if(dice_no == 1 && !player2_initiated){
            //player 2 initiated
            player2_initiated = true
        }else if(player2_initiated){
            // player2 = ((player2 + dice_no) > 100) ? player2 : player2 + dice_no;
            if((player2 + dice_no) > 100){
                player2 = player2;
            }else{
                player2 = player2 + dice_no;
                if(player2 != 100){
                    var temp = isLadder(player2);
                    if(!temp[1]){
                        // if ladder is not found then check for snake.
                        player2 = isSnake(player2);
                    }else{
                        //ladder is found
                        player2 = temp[0];
                    }
                }
            }
            $('#score2').text(player2);
            if(isWinner(player2)){
                $('#myModal').modal({
                    show:true
                })
                $('.modal-title').text('Congratulation');
                $('#win_msg').text("Player 2 Won.");
                // return
            }

        }
        $('#roll2').attr('disabled',true);
        $('#roll1').removeAttr('disabled',true);
    }
    $('#restart_btn').show();
})

$('#close, #ok').click(function(){
    // console.log('inside close')
    loadGame();
})
$('#restart_btn').click(function(){
    $('#myModal').modal({
        show:true
    });
    $('#winning').hide();
    $('.restart').show();
    $('.modal-title').text('Confirmation');
    $('#win_msg').text('Are you sure you want exit the current game ?');
});

$('#cancel').click(function(){
    $('#winning').show();
    $('.restart').hide();
})
// init();
loadGame();

