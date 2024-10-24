package choi.toi.data.ws.exception;

public class ServiceException extends RuntimeException {
    private ErrorCode code;
    
    public ServiceException(ErrorCode code, String message) {
        super(message);
        
        this.code = code;
    }
    
    public ErrorCode getErrorCode() {
        return this.code;
    }
}