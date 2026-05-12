import { mySqlPool } from "../../db/db";

export class ShopGetCountFilters {
    readonly user_id: number;
    readonly shop_id: number;
    readonly branch_id: number;
    constructor(data: any) {
        this.user_id = data.user_id;
        this.shop_id = data.shop_id;
        this.branch_id = data.branch_id;
    }
    getCondition() {
        const filterCondition = [
            this.shop_id ? "s.shop_id = " + mySqlPool.escape(this.shop_id) : true,
            this.branch_id ? "b.branch_id = " + mySqlPool.escape(this.branch_id) : true,
            this.user_id ? "a.id = " + mySqlPool.escape(this.user_id) : true,
        ].join(" AND ");
        return filterCondition;
    }
}
