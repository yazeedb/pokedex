module Buttons exposing (Model, Msg(..), init, main, subscriptions, update, view)

import Browser
import Html exposing (Html, button, div, text)
import Html.Events exposing (onClick)


main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }


type alias Model =
    Int


init : () -> ( Model, Cmd Msg )
init _ =
    ( 0, Cmd.none )


type Msg
    = Increment
    | Decrement


update msg model =
    case msg of
        Increment ->
            ( model + 1, Cmd.none )

        Decrement ->
            ( model - 1, Cmd.none )


view model =
    div []
        [ button [ onClick Increment ]
            [ text "+" ]
        , div
            []
            [ text (String.fromInt model) ]
        , button [ onClick Decrement ] [ text "-" ]
        ]


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none
