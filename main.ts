input.onButtonPressed(Button.A, function () {
    car.change(LedSpriteProperty.X, -1)
})
input.onGesture(Gesture.LogoUp, function () {
    game.resume()
})
input.onGesture(Gesture.ScreenUp, function () {
    game.resume()
})
input.onGesture(Gesture.ScreenDown, function () {
    game.pause()
})
input.onButtonPressed(Button.AB, function () {
    if (game.isGameOver() == false) {
        if (game.isPaused()) {
            game.resume()
        } else {
            game.pause()
        }
    }
})
input.onButtonPressed(Button.B, function () {
    car.change(LedSpriteProperty.X, 1)
})
let emptyObstaclesX = 0
let ticks = 0
let score = 0
let car: game.LedSprite = null
basic.showNumber(3)
basic.pause(250)
basic.showNumber(2)
basic.pause(250)
basic.showNumber(1)
basic.pause(250)
basic.showArrow(ArrowNames.NorthEast)
basic.pause(250)
car = game.createSprite(2, 4)
car.set(LedSpriteProperty.Blink, 300)
let obstacles: game.LedSprite[] = []
basic.forever(function () {
    while (obstacles.length > 0 && obstacles[0].get(LedSpriteProperty.Y) == 4) {
        obstacles.removeAt(0).delete()
        score += 0.25
    }
    if (game.isPaused() == false) {
        for (let value of obstacles) {
            value.change(LedSpriteProperty.Y, 1)
        }
        if (ticks % 3 == 0) {
            emptyObstaclesX = randint(1, 4)
            for (let index = 0; index <= 4; index++) {
                if (index != emptyObstaclesX) {
                    obstacles.push(game.createSprite(index, 0))
                }
            }
        }
        ticks += 1
    }
    for (let value of obstacles) {
        if (value.get(LedSpriteProperty.Y) == car.get(LedSpriteProperty.Y) && value.get(LedSpriteProperty.X) == car.get(LedSpriteProperty.X)) {
            game.setScore(Math.round(score))
            game.gameOver()
        }
    }
    basic.pause(700)
})
