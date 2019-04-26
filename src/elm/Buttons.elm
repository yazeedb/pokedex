port module Buttons exposing (main)

import Html exposing (Html, button, div, text)
import Html.Events exposing (onClick)


main =
    Html.beginnerProgram { model = model, view = view, update = update }


type alias Model =
    Int


model : Model
model =
    0


type Msg
    = Increment
    | Decrement


update msg model =
    case msg of
        Increment ->
            model + 1

        Decrement ->
            model - 1


view model =
    div []
        [ button [] [ text "-" ]
        , div [] [ text (toString model) ]
        , button [] [ text "+" ]
        ]
