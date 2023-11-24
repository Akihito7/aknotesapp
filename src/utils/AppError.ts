class AppError {
    message;
    status;


    constructor(message : string , status : string){
        this.message = message;
        this.status = status;
    }
};