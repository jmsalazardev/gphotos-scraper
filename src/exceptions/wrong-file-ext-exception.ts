export class WrongFileExtException extends Error {
    code =  "401";
    message = "Wrong file extension";

    constructor(message: string, code?: string){
        super();
        
        if (code) this.code = code;
        this.message = message;
    }
}
