export const SETTINGS = 'SETTINGS';

export const goToSettings = (payload) => ({
  type: SETTINGS,
  payload,
});

export const EMAIL_ACTION = 'EMAIL_ACTION';

export const emailAction = (payload) => ({
  type: EMAIL_ACTION,
  payload,
});

export const NAME_ACTION = 'NAME_ACTION';

export const nameAction = (payload) => ({
  type: NAME_ACTION,
  payload,
});
