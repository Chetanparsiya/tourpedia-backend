import mongoose from "mongoose";

let userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: false },
  id: { type: String },
});
export default mongoose.model("User", userSchema);
