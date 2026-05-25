package com.smartspend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class User {

    @Id
    private String id;

    private String name;

    private String email;

    @JsonIgnore
    private String password;

    private String role = "USER";

    private String status = "active";

    private String resetToken;

    // NEW FIELDS

    private String phone;

    private String location;

    private String bio;

    // GET ID
    public String getId() {
        return id;
    }

    // SET ID
    public void setId(String id) {
        this.id = id;
    }

    // GET NAME
    public String getName() {
        return name;
    }

    // SET NAME
    public void setName(String name) {
        this.name = name;
    }

    // GET EMAIL
    public String getEmail() {
        return email;
    }

    // SET EMAIL
    public void setEmail(String email) {
        this.email = email;
    }

    // GET PASSWORD
    public String getPassword() {
        return password;
    }

    // SET PASSWORD
    public void setPassword(String password) {
        this.password = password;
    }

    // GET ROLE
    public String getRole() {
        return role;
    }

    // SET ROLE
    public void setRole(String role) {
        this.role = role;
    }

    // GET STATUS
    public String getStatus() {
        return status;
    }

    // SET STATUS
    public void setStatus(String status) {
        this.status = status;
    }

    // GET RESET TOKEN
    public String getResetToken() {
        return resetToken;
    }

    // SET RESET TOKEN
    public void setResetToken(String resetToken) {
        this.resetToken = resetToken;
    }

    // PHONE

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    // LOCATION

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    // BIO

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }
}