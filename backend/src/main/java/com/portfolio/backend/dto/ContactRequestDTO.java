package com.portfolio.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

/**
 * Data Transfer Object for validating incoming contact form requests.
 */
public class ContactRequestDTO {

    @NotBlank(message = "Your name is required.")
    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters.")
    private String name;

    @NotBlank(message = "Your email address is required.")
    @Email(message = "Please provide a valid email address.")
    @Pattern(regexp = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$", message = "Please provide a valid email format.")
    @Size(max = 150, message = "Email address cannot exceed 150 characters.")
    private String email;

    @Size(max = 150, message = "Inquiry type cannot exceed 150 characters.")
    private String serviceInterest;

    @NotBlank(message = "Subject is required.")
    @Size(min = 2, max = 200, message = "Subject must be between 2 and 200 characters.")
    private String subject;

    @NotBlank(message = "Message content is required.")
    @Size(min = 5, max = 5000, message = "Message must be between 5 and 5000 characters.")
    private String message;

    public ContactRequestDTO() {
    }

    public ContactRequestDTO(String name, String email, String serviceInterest, String subject, String message) {
        this.name = name;
        this.email = email;
        this.serviceInterest = serviceInterest;
        this.subject = subject;
        this.message = message;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name != null ? name.trim() : null;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email != null ? email.trim() : null;
    }

    public String getServiceInterest() {
        return serviceInterest;
    }

    public void setServiceInterest(String serviceInterest) {
        this.serviceInterest = serviceInterest != null ? serviceInterest.trim() : null;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject != null ? subject.trim() : null;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message != null ? message.trim() : null;
    }
}
