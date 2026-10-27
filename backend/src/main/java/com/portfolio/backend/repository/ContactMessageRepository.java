package com.portfolio.backend.repository;

import com.portfolio.backend.entity.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data JPA Repository for ContactMessage entity.
 */
@Repository
public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {

    /**
     * Find messages by sender email ordered by newest first.
     */
    List<ContactMessage> findByEmailOrderByCreatedAtDesc(String email);
}
