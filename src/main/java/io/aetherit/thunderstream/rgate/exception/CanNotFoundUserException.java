package io.aetherit.thunderstream.rgate.exception;

import org.springframework.http.HttpStatus;

public class CanNotFoundUserException extends RGateException {
    public CanNotFoundUserException() {
        super(ErrorCode.CanNotFoundUser, HttpStatus.BAD_REQUEST, "Can not found user");
    }

    public CanNotFoundUserException(String id) {
        super(ErrorCode.CanNotFoundUser, HttpStatus.BAD_REQUEST, "Can not found user : " + id);
    }
}
