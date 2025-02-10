package com.wecp.medicalequipmentandtrackingsystem.entitiy;
<<<<<<< HEAD


import javax.persistence.*;


@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

=======
 
import javax.persistence.*;
 
@Entity
@Table(name = "users") // do not change table name
public class User {
 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
   
>>>>>>> 42a015648b7a6b71865b830024cb300e6a77edf5
    private String username;
    private String password;
    private String email;
    private String role; // HOSPITAL, TECHNICIAN, SUPPLIER
<<<<<<< HEAD

    // {
    //     "username":"aman",
    //     "password":"12345678",
    //     "email":"aman@gmail.com",
    //     "role":"Hospital"
    // }
    // Constructors, Getters, and Setters
    public User() {}

=======
 
    // Default constructor
    public User() {}
 
    // Argument constructor
>>>>>>> 42a015648b7a6b71865b830024cb300e6a77edf5
    public User(String username, String password, String email, String role) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = role;
    }
<<<<<<< HEAD

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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
=======
 
    // Getters and Setters
    public Long getId() {
        return id;
    }
 
    public void setId(Long id) {
        this.id = id;
    }
 
    public String getUsername() {
        return username;
    }
 
    public void setUsername(String username) {
        this.username = username;
    }
 
    public String getPassword() {
        return password;
    }
 
    public void setPassword(String password) {
        this.password = password;
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
 
 
>>>>>>> 42a015648b7a6b71865b830024cb300e6a77edf5
