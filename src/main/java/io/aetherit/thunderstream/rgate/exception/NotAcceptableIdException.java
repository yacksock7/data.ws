package io.aetherit.thunderstream.rgate.exception;

import org.springframework.http.HttpStatus;

public class NotAcceptableIdException extends RGateException {
    public NotAcceptableIdException(String id) {
        super(ErrorCode.NotAcceptableId, HttpStatus.BAD_REQUEST, "Not acceptable id : " + id);
    }
}
