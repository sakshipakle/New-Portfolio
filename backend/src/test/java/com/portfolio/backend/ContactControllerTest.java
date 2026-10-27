package com.portfolio.backend;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.portfolio.backend.dto.ContactRequestDTO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class ContactControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testHealthCheck() throws Exception {
        mockMvc.perform(get("/api/contact/health"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("UP"))
                .andExpect(jsonPath("$.service").value("Portfolio Contact API"));
    }

    @Test
    void testSubmitContactForm_Success() throws Exception {
        ContactRequestDTO request = new ContactRequestDTO(
                "Rahul Sharma",
                "rahul@example.com",
                "Java Backend & REST API Development",
                "Discussion regarding Java Developer Role",
                "Hello Sakshi, we would love to connect with you regarding our backend team opening."
        );

        mockMvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value(containsString("Thank you, Rahul Sharma!")));
    }

    @Test
    void testSubmitContactForm_InvalidEmail() throws Exception {
        ContactRequestDTO request = new ContactRequestDTO(
                "Rahul Sharma",
                "invalid-email-address",
                "General Technical Inquiry",
                "Job Opportunity",
                "Hello Sakshi, test message content."
        );

        mockMvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value(containsString("Validation failed")));
    }

    @Test
    void testSubmitContactForm_BlankFields() throws Exception {
        ContactRequestDTO request = new ContactRequestDTO(
                "",
                "",
                null,
                "",
                ""
        );

        mockMvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success").value(false));
    }
}
