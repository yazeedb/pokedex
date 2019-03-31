export const SET_TITLE = 'SET_TITLE';

export type SetTitleAction = {
  type: typeof SET_TITLE;
  payload: string;
};

export type TitleActionTypes = SetTitleAction;

export const setTitle = (title: string): SetTitleAction => ({
  type: SET_TITLE,
  payload: title
});

export type TitleState = {
  title: string;
};
const initialState: TitleState = {
  title: ''
};

export const reducer = (
  state = initialState,
  action: SetTitleAction
): TitleState => {
  switch (action.type) {
    case SET_TITLE:
      return { title: action.payload };

    default:
      return state;
  }
};
