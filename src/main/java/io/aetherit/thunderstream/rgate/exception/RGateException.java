package io.aetherit.thunderstream.rgate.exception;

import org.springframework.http.HttpStatus;

public class RGateException extends RuntimeException {
    private ErrorCode code;
    private HttpStatus status;
    
    public RGateException(ErrorCode code, HttpStatus status, String message) {
        super(message);
        
        this.code = code;
        this.status = status;
    }
    
    public ErrorCode getErrorCode() {
        return this.code;
    }

    public HttpStatus getStatus() {
        return this.status;
    }
}