import memoize from 'lru-memoize';
import {createValidator, required, maxLength, email} from 'utils/validation';

const loginValidation = createValidator({
  email: [required, email],
  password: maxLength(20) // single rules don't have to be in an array
});
export default memoize(10)(loginValidation);
