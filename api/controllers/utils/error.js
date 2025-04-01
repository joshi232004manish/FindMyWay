export const errorHandler = (statusCode,message,success)=>{
    const error = new Error();
    // console.log("xxxxxxxxxx");
    error.statusCode = statusCode;
    error.message = message;
    error.success = success;

    return error;
}