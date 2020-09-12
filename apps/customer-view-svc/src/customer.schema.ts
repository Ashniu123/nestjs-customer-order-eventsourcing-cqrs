import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ id: false, versionKey: false })
export class Customer extends Document {
  @Prop({ type: String, required: [true, 'id is compulsory'] })
  id: string;

  @Prop({ type: String, required: [true, 'email is compulsory'], unique: true })
  email: string;

  @Prop({
    type: String,
    required: [true, 'password is compulsory'],
  })
  password: string;

  @Prop({
    type: String,
    required: [true, 'salt is compulsory'],
  })
  salt: string;

  @Prop({
    type: String,
    required: [true, 'firstName is compulsory'],
  })
  firstName: string;

  @Prop({
    type: String,
    required: [true, 'lastName is compulsory'],
  })
  lastName: string;

  @Prop({
    type: Number,
    required: [true, 'balance is compulsory'],
  })
  balance: number;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);

CustomerSchema.methods.validatePassword = async (
  password: string,
): Promise<boolean> => {
  const hash = await bcrypt.hash(password, this.salt);
  return hash === this.password;
};
