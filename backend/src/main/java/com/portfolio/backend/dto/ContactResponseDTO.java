package com.portfolio.backend.dto;

import java.time.LocalDateTime;

/**
 * Standard response payload returned after processing a contact submission.
 */
public class ContactResponseDTO {

    private boolean success;
    private String message;
    private Long referenceId;
    private LocalDateTime timestamp;

    public ContactResponseDTO() {
        this.timestamp = LocalDateTime.now();
    }

    public ContactResponseDTO(boolean success, String message, Long referenceId) {
        this.success = success;
        this.message = message;
        this.referenceId = referenceId;
        this.timestamp = LocalDateTime.now();
    }

    public static ContactResponseDTO success(String message, Long referenceId) {
        return new ContactResponseDTO(true, message, referenceId);
    }

    public static ContactResponseDTO error(String message) {
        return new ContactResponseDTO(false, message, null);
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

    public Long getReferenceId() {
        return referenceId;
    }

    public void setReferenceId(Long referenceId) {
        this.referenceId = referenceId;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
