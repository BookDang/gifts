export const MAX_PASSWORD_LENGTH = 30
export const MIN_PASSWORD_LENGTH = 6
export const PASSWORD_REGEX = new RegExp(
  '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@!#%^&*])[\\w@!#%^&*]{' +
    MIN_PASSWORD_LENGTH +
    ',' +
    MAX_PASSWORD_LENGTH +
    '}$',
  'g',
)
