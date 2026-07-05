import { model } from "mongoose";

import {
    saleSchema,
    TSaleDocument,
} from "../schemas/sale.schema";

export const Sale = model<TSaleDocument>(
    "Sale",
    saleSchema
);