interface ISchoolService {
    getBoardTypes(): string;
}

export class SchoolService implements ISchoolService {
    public getBoardTypes(): string {
        return "getBoardTypes";
    }
}