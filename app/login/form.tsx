'use client';

import * as Form from '@radix-ui/react-form';

export function LoginForm() {
  return (
    <Form.Root className="">
      <Form.Field className="" name="email">
        <div className="flex items-baseline justify-between">
          <Form.Label className="">Email</Form.Label>
          <Form.Message className="" match="valueMissing">
            Please enter your email
          </Form.Message>
          <Form.Message className="" match="typeMismatch">
            Please provide a valid email
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input className="" type="email" required />
        </Form.Control>
      </Form.Field>
      <Form.Submit asChild>
        <button className="">Post question</button>
      </Form.Submit>
    </Form.Root>
  );
}
