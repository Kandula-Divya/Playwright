package com.example.demo.playwright;

import com.microsoft.playwright.APIRequest;
import com.microsoft.playwright.APIRequestContext;
import com.microsoft.playwright.APIResponse;
import com.microsoft.playwright.Playwright;
import com.microsoft.playwright.options.RequestOptions;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class PlaywrightApiTest {

    private Playwright playwright;
    private APIRequestContext request;

    @BeforeEach
    void setUp() {
        playwright = Playwright.create();
        request = playwright.request().newContext(
                new APIRequest.NewContextOptions()
                        .setBaseURL("http://localhost:8081")
                        .setExtraHTTPHeaders(Map.of("Accept", "application/json"))
        );
    }

    @AfterEach
    void tearDown() {
        if (request != null) {
            request.dispose();
        }
        if (playwright != null) {
            playwright.close();
        }
    }

    @Test
    void shouldReturnWelcomeMessageFromRootEndpoint() {
        APIResponse response = request.get("/");
        assertTrue(response.ok(), "Root endpoint should return HTTP 2xx");
        String body = response.text();
        assertTrue(body.contains("Welcome to the Todo backend"), "Response should contain welcome text");
    }

    @Test
    void shouldAuthenticateWithValidCredentials() {
        APIResponse response = request.post("/api/auth/login",
                com.microsoft.playwright.options.RequestOptions.create()
                        .setData(Map.of("username", "admin", "password", "password"))
        );

        assertTrue(response.ok(), "Login with valid credentials should return HTTP 2xx");
        String body = response.text();
        assertTrue(body.contains("\"username\":\"admin\""));
        assertTrue(body.contains("Login successful"));
    }

    @Test
    void shouldRejectInvalidCredentials() {
        APIResponse response = request.post("/api/auth/login",
                com.microsoft.playwright.options.RequestOptions.create()
                        .setData(Map.of("username", "wrong", "password", "bad"))
        );

        assertEquals(401, response.status(), "Invalid login should return HTTP 401");
        String body = response.text();
        assertTrue(body.contains("Invalid username or password"));
    }
}
