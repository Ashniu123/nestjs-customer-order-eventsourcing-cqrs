import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { OrderState } from '@order/order-common/order-state.enum';

@Schema({ id: false, versionKey: false })
export class Order extends Document {
  @Prop({ type: String, required: [true, 'id is compulsory'], unique: true })
  id: string;

  @Prop({ type: String, required: [true, 'customerId is compulsory'] })
  customerId: string;

  @Prop({ type: Number, required: [true, 'amount is compulsory'] })
  amount: number;

  @Prop({ type: OrderState, default: OrderState.NEW })
  state: OrderState;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
