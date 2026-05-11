export class AdminUserSummary {
    admin_id: string;
    shop_id?: string;
    branch_id?: string;
    display_name: string;
    user_type: string;
    email: string;
    status: string;
    branch_name?: string;
    constructor(data: any) {
        this.admin_id = data.id;
        this.display_name = data.displayName;
        this.user_type = data.user_type;
        this.email = data.email;
        this.status = data.status;
        if (["manager", "employee", "api"].includes(data.user_type)) {
            this.shop_id = data.shop_id;
            this.branch_id = data.branch_id;
            this.branch_name = data.branch_name;
        }
    };
}
