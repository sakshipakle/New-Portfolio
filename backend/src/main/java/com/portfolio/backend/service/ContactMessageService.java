package com.portfolio.backend.service;

import com.portfolio.backend.dto.ContactRequestDTO;
import com.portfolio.backend.dto.ContactResponseDTO;
import com.portfolio.backend.entity.ContactMessage;
import com.portfolio.backend.repository.ContactMessageRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service managing contact message processing and persistence.
 */
@Service
public class ContactMessageService {

    private static final Logger log = LoggerFactory.getLogger(ContactMessageService.class);

    private final ContactMessageRepository contactMessageRepository;

    public ContactMessageService(ContactMessageRepository contactMessageRepository) {
        this.contactMessageRepository = contactMessageRepository;
    }

    /**
     * Validate and persist a contact form submission into MySQL.
     *
     * @param request Validated contact form submission data
     * @return ContactResponseDTO with success indicator and reference ID
     */
    @Transactional
    public ContactResponseDTO saveContactMessage(ContactRequestDTO request) {
        log.info("Received new contact form submission from: {}", request.getEmail());

        ContactMessage entity = new ContactMessage(
                request.getName(),
                request.getEmail(),
                request.getServiceInterest(),
                request.getSubject(),
                request.getMessage()
        );

        ContactMessage saved = contactMessageRepository.save(entity);
        log.info("Successfully persisted contact message with ID: {}", saved.getId());

        return ContactResponseDTO.success(
                "Thank you, " + saved.getName() + "! Your message has been received and saved successfully. Sakshi will get back to you soon.",
                saved.getId()
        );
    }
}
