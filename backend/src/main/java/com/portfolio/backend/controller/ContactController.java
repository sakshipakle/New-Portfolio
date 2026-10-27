package com.portfolio.backend.controller;

import com.portfolio.backend.dto.ContactRequestDTO;
import com.portfolio.backend.dto.ContactResponseDTO;
import com.portfolio.backend.service.ContactMessageService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**
 * REST Controller exposing the Contact Form endpoints.
 */
@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private final ContactMessageService contactMessageService;

    public ContactController(ContactMessageService contactMessageService) {
        this.contactMessageService = contactMessageService;
    }

    /**
     * Health check endpoint to verify that the Spring Boot backend is active and reachable.
     * GET /api/contact/health
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> healthCheck() {
        Map<String, Object> status = new HashMap<>();
        status.put("status", "UP");
        status.put("service", "Portfolio Contact API");
        status.put("timestamp", System.currentTimeMillis());
        return ResponseEntity.ok(status);
    }

    /**
     * Handles visitor contact form submissions.
     * POST /api/contact
     *
     * @param request Validated ContactRequestDTO payload
     * @return 201 CREATED with ContactResponseDTO on success
     */
    @PostMapping
    public ResponseEntity<ContactResponseDTO> submitContactForm(@Valid @RequestBody ContactRequestDTO request) {
        ContactResponseDTO response = contactMessageService.saveContactMessage(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
