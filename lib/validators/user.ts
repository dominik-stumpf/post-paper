import * as z from 'zod';

export function validatePassword(password: string) {
  const upperCaseRegex = /[A-Z]/;
  const lowerCaseRegex = /[a-z]/;
  const numberRegex = /[0-9]/;
  const symbolRegex = /[-#!$@£%^&*()_+|~=`{}\[\]:";'<>?,.\/ ]/;

  return {
    isLongEnough: password.length >= 8,
    hasUpperCase: upperCaseRegex.test(password),
    hasLowerCase: lowerCaseRegex.test(password),
    hasNumber: numberRegex.test(password),
    hasSymbol: symbolRegex.test(password),
  };

  // if (value.length < 8) {
  //   ctx.addIssue({
  //     code: z.ZodIssueCode.custom,
  //     message: 'Password must be at least 8 charaters long',
  //   });
  // }
  //
  // if (!upperCaseRegex.test(value)) {
  //   ctx.addIssue({
  //     code: z.ZodIssueCode.custom,
  //     message: 'Password must contain at least 1 upper case letter',
  //   });
  // }
  //
  // if (!lowerCaseRegex.test(value)) {
  //   ctx.addIssue({
  //     code: z.ZodIssueCode.custom,
  //     message: 'Password must contain at least 1 lower case letter',
  //   });
  // }
  //
  // if (!numberRegex.test(value)) {
  //   ctx.addIssue({
  //     code: z.ZodIssueCode.custom,
  //     message: 'Password must contain at least 1 number',
  //   });
  // }
  //
  // if (!symbolRegex.test(value)) {
  //   ctx.addIssue({
  //     code: z.ZodIssueCode.custom,
  //     message: 'Password must contain at least 1 symbol',
  //   });
  // }
}

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
    .superRefine((value, ctx) => {
      const { hasNumber, hasSymbol, hasLowerCase, isLongEnough, hasUpperCase } =
        validatePassword(value);

      if (!isLongEnough) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Password must be at least 8 charaters long',
        });
      }

      if (!hasUpperCase) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Password must contain at least 1 upper case letter',
        });
      }

      if (!hasLowerCase) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Password must contain at least 1 lower case letter',
        });
      }

      if (!hasNumber) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Password must contain at least 1 number',
        });
      }

      if (!hasSymbol) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Password must contain at least 1 symbol',
        });
      }
    }),
});

export const signInSchema = z.object({
  email: z
    .string({
      invalid_type_error: 'Must be valid email',
    })
    .min(1, { message: 'Email is required' })
    .email(),
  password: z.string().min(1, { message: 'Password is required' }),
});
