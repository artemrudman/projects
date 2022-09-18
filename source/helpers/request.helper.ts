import { ErrorHelper } from "./error.helper";
import { ErrorCodes, NON_EXISTENT_ID } from "../constants";
import { General } from "../constants"
import { systemError } from "../entities";


export class RequestHelper {
    
    public static ParseNumericInput(input: string): number | systemError {
        let result: number;

        if (isNaN(Number(input))) {
            return ErrorHelper.parseError(ErrorCodes.NonNumericInput, General.NonNumericInput);
        }

        if (input !== null && input !== undefined) {
            result = parseInt(input);
        }
        else {
            const noInputParameterError: systemError = ErrorHelper.parseError(ErrorCodes.InputParameterNotSupplied, General.InputParameterNotSupplied);
            return noInputParameterError; 
            }
        return (result);
    }
}