def on_button_pressed_a():
    car.change(LedSpriteProperty.X, -1)
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_gesture_logo_up():
    game.resume()
input.on_gesture(Gesture.LOGO_UP, on_gesture_logo_up)

def on_gesture_screen_up():
    game.resume()
input.on_gesture(Gesture.SCREEN_UP, on_gesture_screen_up)

def on_gesture_screen_down():
    game.pause()
input.on_gesture(Gesture.SCREEN_DOWN, on_gesture_screen_down)

def on_button_pressed_ab():
    if game.is_game_over() == False:
        if game.is_paused():
            game.resume()
        else:
            game.pause()
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_button_pressed_b():
    car.change(LedSpriteProperty.X, 1)
input.on_button_pressed(Button.B, on_button_pressed_b)

emptyObstaclesX = 0
ticks = 0
score = 0
car: game.LedSprite = None
basic.show_number(3)
basic.pause(250)
basic.show_number(2)
basic.pause(250)
basic.show_number(1)
basic.pause(250)
basic.show_arrow(ArrowNames.NORTH_EAST)
basic.pause(250)
car = game.create_sprite(2, 4)
car.set(LedSpriteProperty.BLINK, 300)
obstacles: List[game.LedSprite] = []

def on_forever():
    global score, emptyObstaclesX, ticks
    while len(obstacles) > 0 and obstacles[0].get(LedSpriteProperty.Y) == 4:
        obstacles.remove_at(0).delete()
        score += 0.25
    if game.is_paused() == False:
        for value in obstacles:
            value.change(LedSpriteProperty.Y, 1)
        if ticks % 3 == 0:
            emptyObstaclesX = randint(1, 4)
            for index in range(5):
                if index != emptyObstaclesX:
                    obstacles.append(game.create_sprite(index, 0))
        ticks += 1
    for value2 in obstacles:
        if value2.get(LedSpriteProperty.Y) == car.get(LedSpriteProperty.Y) and value2.get(LedSpriteProperty.X) == car.get(LedSpriteProperty.X):
            game.set_score(Math.round(score))
            game.game_over()
    basic.pause(700)
basic.forever(on_forever)
