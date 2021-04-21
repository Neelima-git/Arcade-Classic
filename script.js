
        var canvas;
        var canvasContext;
        var moveYRect = 30;

        window.onload = function() {
            console.log("Exicted to learn canvas!");
            canvas = document.getElementById('canvasGame');
            canvasContext = canvas.getContext('2d');

            var framesPerSecond = 30;
            setInterval(function(){
                drawRectangles();
                moveRectangle();
            } , 1000/framesPerSecond); 
        }

        function drawRectangles(){
            canvasContext.fillStyle = 'black';
            canvasContext.fillRect(0,0,canvas.width,canvas.height);
            canvasContext.fillStyle = 'blue';
            canvasContext.fillRect(10,210,10,100);
            canvasContext.fillStyle = 'yellow';
            canvasContext.fillRect(moveYRect,100,10,10);
          
        }

        function moveRectangle(){
            moveYRect+=10;
        }
