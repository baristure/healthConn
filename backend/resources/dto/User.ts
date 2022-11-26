import { UserInput } from "./RegisterEvent";
export interface User extends UserInput {
  id: string;
  created_at: Date;
  updated_at: Date;
}