import { model } from "mongoose";

import { customerSchema, TCustomerDocument } from "../schemas/customer.schema";

export const Customer = model<TCustomerDocument>("Customer", customerSchema);
