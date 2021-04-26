
        var canvas;
        var canvasContext;
        var ballX = 50;
        var ballY = 50;
        var ballSpeedX = 10;
        var ballSpeedY = 4;

        var player1Score = 0;
        var player2Score = 0;
        const  WIN_SCORE = 5;

        var showWinScreen = false;

        var paddle1Y = 250;
        var paddle2Y = 250;
        const PADDLE_HEIGHT = 100;
        const PADDLE_THICKNESS = 10;



        function calculateMousePos(evt){
            var rect = canvas.getBoundingClientRect();
            var root = document.documentElement;
            var mouseX = evt.clientX - rect.left - root.scrollLeft;
            var mouseY = evt.clientY - rect.top - root.scrollTop;
            return{
                x:mouseX,
                y:mouseY
            };
        }

        function playAgain(evt){
            if(showWinScreen){
                player1Score = 0;
                player2Score = 0;
                showWinScreen = false;
            }
        }

        window.onload = function() {
            console.log("A simple arcade classic tennis game!");
            canvas = document.getElementById('canvasGame');
            canvasContext = canvas.getContext('2d');

            var framesPerSecond = 30;
            setInterval(function(){
                moveEverything();
               drawEverything();

            } , 1000/framesPerSecond);
            
            canvas.addEventListener('mousedown', playAgain);

            canvas.addEventListener('mousemove', 
                    function(evt){
                        var mousePos = calculateMousePos(evt);
                        paddle1Y= mousePos.y - PADDLE_HEIGHT/2;
                    });
        }

        function ballReset(){
            if(player1Score >= WIN_SCORE || player2Score>=WIN_SCORE){
                showWinScreen = true;
            }
            ballSpeedX = -ballSpeedX;
            ballX = canvas.width/2;
            ballY = canvas.height/2;
        }

        function computerMovement(){
            var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
            if(paddle2YCenter < ballY-35){
                paddle2Y+=6;
            }else if( paddle2YCenter > ballY+35){
                paddle2Y-=6;
            }
        }

        function moveEverything(){
            if(showWinScreen){
                return;
            }

            computerMovement();

            ballX += ballSpeedX;
            ballY += ballSpeedY;

            if(ballX < 0){
                if(ballY > paddle1Y && ballY < paddle1Y+PADDLE_HEIGHT){
                    ballSpeedX = -ballSpeedX;

                    var deltaY = ballY- (paddle1Y+PADDLE_HEIGHT/2);
                    ballSpeedY = deltaY*0.35;
                }else{
                    player2Score++;  // must be before ball reset
                    ballReset();

                }
            }
            if(ballX > canvas.width){
                if(ballY > paddle2Y && ballY < paddle2Y+PADDLE_HEIGHT){
                    ballSpeedX = -ballSpeedX;
                    var deltaY = ballY- (paddle2Y+PADDLE_HEIGHT/2);
                    ballSpeedY = deltaY*0.35;
                }else{
                    player1Score++;
                    ballReset();

                }
            }
            if(ballY > canvas.height){
                ballSpeedY = -ballSpeedY;
            }
            if(ballY < 0){
                ballSpeedY = -ballSpeedY;
            }
        }

        function drawNet(){
            for(var i=0; i<canvas.height; i+=40){
                colorRect(canvas.width/2-1, i , 2, 20, 'white');
            }
        }

         

        function drawEverything(){
            colorRect(0,0,canvas.width,canvas.height, 'black');

            if(showWinScreen){

                canvasContext.fillStyle = 'white';

                if(player1Score>=WIN_SCORE){
                    canvasContext.fillText("Wohoo, You won!", 335, 300);

                }else if(player2Score>=WIN_SCORE){
                    canvasContext.fillText("Opps, Computer won :( ", 325, 300);

                }
              
                canvasContext.fillText("Play again ;)", 350, 400);
                return;
            }

            drawNet();

                
            canvasContext.fillText("You: " + player1Score, 180, 100);
            canvasContext.fillText("Computer: "+ player2Score, canvas.width-250, 100);

            //this  is left player paddle
            colorRect(0,paddle1Y,PADDLE_THICKNESS,PADDLE_HEIGHT, 'yellow');

            //this  is right player paddle
            colorRect(canvas.width-PADDLE_THICKNESS,paddle2Y,PADDLE_THICKNESS,PADDLE_HEIGHT, 'yellow');      

            //draws the ball
            colorCircle(ballX, ballY, 10, 'yellow');

        }

        function colorCircle(centerX, centerY, radius, drawColor){
            canvasContext.fillStyle = drawColor;
            canvasContext.beginPath();
            canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
            canvasContext.fill();
        }

        function colorRect(leftX, topY, width, height, drawColor){
            canvasContext.fillStyle = drawColor;
            canvasContext.fillRect(leftX, topY, width, height);
        }

       
