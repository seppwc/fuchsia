import { JSX } from "@fuchsiajs/core";
import { String, Schema, Number } from "@fuchsiajs/orm";
import { createModel } from "@fuchsiajs/core";

const UserSchema = () => {
  return (
    <Schema name="user">
      <String name="name" />
      <Number name="age" />
      <String name="email" />
    </Schema>
  );
};

export const User = createModel(UserSchema);
