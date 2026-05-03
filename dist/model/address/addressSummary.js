"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AddressSummary {
    constructor(data) {
        this.address_id = data.address_id;
        this.uid = data.uid;
        this.unit_number = data.unit_number;
        this.condo_name = data.condo_name;
        this.address = data.address;
        this.pin_code = data.pin_code;
        this.latitude = data.latitude;
        this.logitude = data.logitude;
        this.active = data.active;
    }
    ;
}
exports.AddressSummary = AddressSummary;
