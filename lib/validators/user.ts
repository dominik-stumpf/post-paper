import * as z from 'zod';
import * as validator from 'validator';

const passwordValidator = (value: string): boolean => {
  const minLength = 8;

  return (
    value.length >= minLength &&
    validator.isStrongPassword(value, {
      minLength,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  );
};

export const signUpSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First name is required' })
    .min(3, { message: 'First name must be at least 3 characters long' })
    .max(24, { message: 'Last name cannot exceed 24 characters' }),
  lastName: z
    .string()
    .min(1, { message: 'Last name is required' })
    .min(3, { message: 'Last name must be at least 3 characters long' })
    .max(24, { message: 'First name cannot exceed 24 characters' }),
  email: z
    .string({
      invalid_type_error: 'Must be valid email',
    })
    .min(1, { message: 'Email is required' })
    .email(),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .max(32, { message: 'Password cannot exceed 32 characters' })
    .refine(passwordValidator, {
      message:
        'Password length must be between 8-32 characters, include at least one lowercase letter, one uppercase letter, one digit, and one special character.',
    }),
});

export const signInSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Must be valid email',
    })
    .email(),
  password: z.string({ required_error: 'Password is required' }),
});
