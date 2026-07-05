import { model } from "mongoose";

import { productSchema, TProductDocument } from "../schemas/product.schema";

export const Product = model<TProductDocument>("Product", productSchema);
