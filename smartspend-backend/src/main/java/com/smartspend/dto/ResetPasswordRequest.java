package com.smartspend.dto;

public class ResetPasswordRequest {

    private String token;

    private String password;

    // GET TOKEN
    public String getToken() {
        return token;
    }

    // SET TOKEN
    public void setToken(String token) {
        this.token = token;
    }

    // GET PASSWORD
    public String getPassword() {
        return password;
    }

    // SET PASSWORD
    public void setPassword(String password) {
        this.password = password;
    }
}