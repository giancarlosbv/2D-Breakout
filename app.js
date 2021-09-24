var canvas = document.getElementById('myCanvas');
        var ctx = canvas.getContext('2d');

        //circle properties
        var x = canvas.width / 2
        var y = canvas.height - 30
        var dx = 2
        var dy = -2
        var ballRadius = 10;

        //paddle properties
        var paddleHeight = 10
        var paddleWidth = 75
        var paddleX = (canvas.width - paddleWidth) / 2
        var rightPressed = false
        var leftPressed = false

        function drawBall() {
            ctx.beginPath()
            ctx.arc(x, y, ballRadius, 0, Math.PI * 2)
            //(1)x and (2)y coordinates of the arc(circle)'s center
            //(3)arc radius
            //(4)start angle and (5)end angle (what angle to start and finish drawing the circle, in radians)
            //(6)direction of drawing (false for clockwise, the default, or true for anti-clockwise.) This last parameter is optional.
            ctx.fillStyle = '#0095DD'
            ctx.fill()
            ctx.closePath()
        }

        function drawPaddle() {
            ctx.beginPath()
            ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight)
            ctx.fillStyle = '0095DD'
            ctx.fill()
            ctx.closePath()
        }

        function draw() {
            //drawing code
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            drawBall()

            x += dx
            y += dy

            if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
                dy = -dy
            }
            if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
                dx = -dx
            }
            // Subtracting the radius from one edge's width and adding it onto the other gives us the impression of the proper collision detection
            drawPaddle()
            if (rightPressed) {
                paddleX += 7
                if (paddleX + paddleWidth > canvas.width) {
                    paddleX = canvas.width - paddleWidth
                }
            } else if (leftPressed) {
                paddleX -= 7
                if (paddleX < 0) {
                    paddleX = 0
                }
            }


        }


        document.addEventListener('keydown', keyDownHandler, false)
        document.addEventListener('keyup', keyUpHandler, false)

        function keyDownHandler(e) {
            if (e.key == 'Right' || e.key == 'ArrowRight') {
                rightPressed = true
            } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
                leftPressed = true
            }
        }
        function keyUpHandler(e) {
            if (e.key == 'Right' || e.key == 'ArrowRight') {
                rightPressed = false
            } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
                leftPressed = false
            }
        }
        setInterval(draw, 10)