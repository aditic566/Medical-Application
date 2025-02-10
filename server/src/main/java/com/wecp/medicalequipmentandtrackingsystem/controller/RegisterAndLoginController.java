package com.wecp.medicalequipmentandtrackingsystem.controller;


import com.wecp.medicalequipmentandtrackingsystem.dto.LoginRequest;
import com.wecp.medicalequipmentandtrackingsystem.dto.LoginResponse;
import com.wecp.medicalequipmentandtrackingsystem.entitiy.User;
import com.wecp.medicalequipmentandtrackingsystem.jwt.JwtUtil;
import com.wecp.medicalequipmentandtrackingsystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.security.crypto.password.PasswordEncoder;





@RestController
public class RegisterAndLoginController {
    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    JwtUtil jwtUtil;

    @PostMapping("/api/user/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
   
        User registeredUser = userService.registerUser(user);
        return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
    }

    @PostMapping("/api/user/login")
    public ResponseEntity<LoginResponse> loginUser(@RequestBody LoginRequest user) {
     
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
        } catch(AuthenticationException e) {
             throw new ResponseStatusException(HttpStatus.UNAUTHORIZED , "Invalid username or password" ,e);
        }
        final UserDetails userDetails = userService.loadUserByUsername(user.getUsername());
        User foundUser = userService.getUserByUsername(user.getUsername());

        final String token = jwtUtil.generateToken(user.getUsername());
        System.out.println(token);
       LoginResponse loginResponse =  new LoginResponse(token,foundUser.getUsername(),foundUser.getEmail(),foundUser.getRole());
       return ResponseEntity.ok(loginResponse);
     
    }
}

