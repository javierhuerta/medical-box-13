import { BoxDto, PatientAdmissionDto } from "src/app/box/box.models";

export class GetAllBoxes {
    static readonly type = '[Boxes] get all boxes';
    constructor() { }
}

export class CreatePatientAdmission {
    static readonly type = '[Boxes] create patient admission';
    constructor(public payload: PatientAdmissionDto) { }
}

export class BoxRelease {
    static readonly type = '[Boxes] release box';
    constructor(public payload: BoxDto) { }
}
