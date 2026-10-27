package com.portfolio.backend.exception;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

/**
 * Standard error response model for validation failures and exception handling.
 */
public class ErrorResponse {

    private boolean success;
    private String message;
    private List<String> errors;
    private LocalDateTime timestamp;

    public ErrorResponse() {
        this.timestamp = LocalDateTime.now();
        this.success = false;
    }

    public ErrorResponse(String message) {
        this.success = false;
        this.message = message;
        this.errors = Collections.emptyList();
        this.timestamp = LocalDateTime.now();
    }

    public ErrorResponse(String message, List<String> errors) {
        this.success = false;
        this.message = message;
        this.errors = errors != null ? errors : Collections.emptyList();
        this.timestamp = LocalDateTime.now();
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public List<String> getErrors() {
        return errors;
    }

    public void setErrors(List<String> errors) {
        this.errors = errors;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
