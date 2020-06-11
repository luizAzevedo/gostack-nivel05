import { ValidationError } from 'yup';

/**
 * tornar a tipagem dinamica devido a variedade de campos de uma aplicação
 * a palavra key é apenas uma referencia podendo ser qualquer coisa:
 * var, result, etc.
 */
interface Errors {
  [key: string]: string;
}

export default function getValidationErrors(err: ValidationError): Errors {
  const validationError: Errors = {};

  err.inner.forEach((error) => {
    validationError[error.path] = error.message;
  });

  return validationError;
}
