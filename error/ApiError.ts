class ApiError extends Error{

    public status: number;
    public message: string;

    constructor(status: number, message: string){
        super();
        this.status = status;
        this.message = message;
    }
    
    public static badRequest(message: string){
        return new ApiError(404, message);
    }
    public static internal(message: string){
        return new ApiError(500, message);
    }
    public static forbidden(message: string){
        return new ApiError(403, message);
    }
}

module.exports = ApiError;

export default ApiError;
