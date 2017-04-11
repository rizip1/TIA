export const errorTypes = {
  badRequest: 400,
  forbidden: 403,
  resourceExists: 409,
}

export const errorMessages = {
  invalidEmail: 'Invalid email',
  invalidLogin: 'Invalid login',
  invalidPassword: 'Password to short or to long, must be between 6-40 characters',
  invalidDifficulty: 'Difficulty levels are invalid',
  invalidLocations: 'Locations are invalid',
  invalidValidTo: 'Valid to is invalid',
  invalidId: 'Invalid user id',
  passwordMatch: 'Passwords do not match',
  existsEmail: 'Email exists',
  existsLogin: 'Login exists',
  badCreds: 'Bad credentials',
  interestAlreadyAssigned: 'Interest already assigned',
  interestDoesNotExist: 'Intests does not exist',
  permisions: 'Do not have enough permissions',
}

// fields that can no be validated client side
// without usage of online validation
export const conflictFields = {
  email: {
    key: 'email',
    translate: 'Email už existuje',
  },
  login: {
    key: 'login',
    translate: 'Login už existuje',
  },
}
