input.onButtonPressed(Button.A, function () {
    if (car.get(LedSpriteProperty.X) > 1) {
        car.change(LedSpriteProperty.X, -1)
    }
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
input.onGesture(Gesture.Shake, function () {
    if (nitrousBar.length == 5) {
        speeding = true
        refreshRate = 50
        imunity = 10
    }
})
function start_scene () {
    basic.showNumber(3)
    basic.pause(250)
    basic.showNumber(2)
    basic.pause(250)
    basic.showNumber(1)
    basic.pause(250)
    basic.showArrow(ArrowNames.NorthEast)
    basic.pause(250)
}
let nitrous = 0
let emptyObstaclesX = 0
let score = 0
let ticks = 0
let imunity = 0
let speeding = false
let refreshRate = 0
let nitrousBar: game.LedSprite[] = []
let car: game.LedSprite = null
start_scene()
car = game.createSprite(2, 4)
car.set(LedSpriteProperty.Blink, 300)
let obstacles: game.LedSprite[] = []
nitrousBar = []
let defaultRefreshRate = 300
refreshRate = defaultRefreshRate
speeding = false
imunity = 0
let defaultNitroMeterLevel = 25
let nitroMeter = defaultNitroMeterLevel
music.startMelody(music.builtInMelody(Melodies.Chase), MelodyOptions.ForeverInBackground)
basic.forever(function () {
    if (ticks % 3 == 0) {
        serial.writeValue("score", Math.round(score))
    }
})
basic.forever(function () {
    while (obstacles.length > 0 && obstacles[0].get(LedSpriteProperty.Y) == 4) {
        obstacles.removeAt(0).delete()
    }
    if (game.isPaused() == false) {
        for (let object of obstacles) {
            object.change(LedSpriteProperty.Y, 1)
        }
        if (ticks % 5 == 0) {
            emptyObstaclesX = randint(1, 4)
            for (let index = 0; index <= 4; index++) {
                if (index != emptyObstaclesX && index != 0) {
                    obstacles.push(game.createSprite(index, 0))
                }
            }
        }
        if (obstacles[0].get(LedSpriteProperty.Y) == 4) {
            score += 1
            nitrous += 1
        }
        ticks += 1
    }
    if (speeding == true) {
        while (nitrousBar.length > 0) {
            nitrousBar.removeAt(nitrousBar.length - 1).delete()
        }
        if (nitroMeter != 0) {
            nitroMeter += -1
        } else {
            refreshRate = defaultRefreshRate
            speeding = false
            nitroMeter = defaultNitroMeterLevel
        }
    } else if (speeding == false) {
        if (imunity != 0) {
            imunity += -1
        }
    }
    if (4 < nitrous && nitrousBar.length < 5 && (speeding == false && imunity == 0)) {
        nitrous = 0
        nitrousBar.push(game.createSprite(0, 4 - nitrousBar.length))
    }
    if (speeding == false && imunity == 0) {
        for (let wall of obstacles) {
            if (wall.get(LedSpriteProperty.Y) == car.get(LedSpriteProperty.Y) && wall.get(LedSpriteProperty.X) == car.get(LedSpriteProperty.X)) {
                game.setScore(Math.round(score) - 1)
                music.stopMelody(MelodyStopOptions.Background)
                game.gameOver()
            }
        }
    }
    basic.pause(refreshRate)
})
