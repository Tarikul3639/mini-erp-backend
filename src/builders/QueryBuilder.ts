import { Query } from "mongoose";

export class QueryBuilder<T> {
    constructor(
        public modelQuery: Query<T[], T>,
        public query: Record<string, unknown>
    ) { }

    search(fields: string[]) {
        const search = this.query.search as string;

        if (search) {
            this.modelQuery = this.modelQuery.find({
                $or: fields.map((field) => ({
                    [field]: {
                        $regex: search,
                        $options: "i",
                    },
                })),
            });
        }

        return this;
    }

    filter(excludeFields: string[] = []) {
        const queryObj = { ...this.query };

        const defaultExclude = [
            "search",
            "sort",
            "page",
            "limit",
            ...excludeFields,
        ];

        defaultExclude.forEach((field) => {
            delete queryObj[field];
        });

        this.modelQuery = this.modelQuery.find(queryObj);

        return this;
    }

    sort() {
        const sort =
            (this.query.sort as string) || "-createdAt";

        this.modelQuery = this.modelQuery.sort(sort);

        return this;
    }

    paginate() {
        const page = Number(this.query.page) || 1;
        const limit = Number(this.query.limit) || 10;

        const skip = (page - 1) * limit;

        this.modelQuery = this.modelQuery
            .skip(skip)
            .limit(limit);

        return this;
    }

    async countTotal() {
        const filter = this.modelQuery.getFilter();

        const total = await this.modelQuery.model.countDocuments(
            filter
        );

        const page = Number(this.query.page) || 1;
        const limit = Number(this.query.limit) || 10;

        return {
            page,
            limit,
            total,
            totalPage: Math.ceil(total / limit),
        };
    }
}