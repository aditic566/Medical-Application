package com.wecp.medicalequipmentandtrackingsystem.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class LoginResponse {
    private String token;

    private String username;

    private String email;

    private String role;

    @JsonCreator
    public LoginResponse(@JsonProperty("token") String token,
                         @JsonProperty("username") String username,
                            @JsonProperty("email") String email,
                            @JsonProperty("role") String role) {
        this.token = token;
        this.username = username;
        this.email = email;
        this.role = role;
    }

<<<<<<< HEAD
    public LoginResponse(String token2, String role2, Long userId) {
    }

=======
>>>>>>> 42a015648b7a6b71865b830024cb300e6a77edf5
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
