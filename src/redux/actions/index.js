export const SETTINGS = 'SETTINGS';
export const EMAIL_ACTION = 'EMAIL_ACTION';
export const NAME_ACTION = 'NAME_ACTION';
export const SAVE_QUESTIONS = 'SAVE_QUESTIONS';

export const goToSettings = (payload) => ({
  type: SETTINGS,
  payload,
});

export const emailAction = (payload) => ({
  type: EMAIL_ACTION,
  payload,
});

export const nameAction = (payload) => ({
  type: NAME_ACTION,
  payload,
});

export const saveQuestions = (element) => (
  { type: SAVE_QUESTIONS, payload: { element } }
);
