import mongoose, {Schema, Document} from "mongoose";


export interface Message extends Document{
  content: string;
  createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
   content: {
    type: String,
    required: true
   },
   createdAt: {
       type: Date,
       required: true,
       default: Date.now
   }
})

export interface User extends Document{
  username: string;
  email: string;
  password:string
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean
  isAcceptingMessage: boolean;
  message: Message[]
}

const UserSchema: Schema<User> = new Schema({
  username: {
   type: String,
   required: [true, "Username is requried"],
   trim: true,
   unique: true
  },
  email: {
    type: String,
    required: [true, "Email is requried"],
    unique: true,
    match: [/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g, 'Please use valid email address']
  },
  password: {
    type: String,
    required: [true, "Password is requried"]
  },
  verifyCode: {
    type: String,
    required: [true, "Verify code Expixy is requried"]
  },
  verifyCodeExpiry:{
   type:Date,

  },
  isVerified:{
    type:Boolean,
    default:false
  },
  isAcceptingMessage: {
      type:Boolean,
      default:false
  },
  message:[MessageSchema]
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema)

export default UserModel;