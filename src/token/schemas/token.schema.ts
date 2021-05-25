import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

export type TokenDocument = Token & Document;

@Schema()
export class Token {
  @Prop()
  token: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop()
  cAt: string
}

export const TokenSchema = SchemaFactory.createForClass(Token);
