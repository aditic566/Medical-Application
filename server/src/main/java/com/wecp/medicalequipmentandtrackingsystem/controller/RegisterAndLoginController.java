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

<<<<<<< HEAD

// public class RegisterAndLoginController {


//     @PostMapping("/api/user/register")
//     public ResponseEntity<User> registerUser(@RequestBody User user) {
//         // register user and return the registered user with status code 201 created
//     }

//     @PostMapping("/api/user/login")
//     public ResponseEntity<LoginResponse> loginUser(@RequestBody LoginRequest loginRequest) {
//         // login user and return the login response with status code 200 ok
//         // if authentication fails, return status code 401 unauthorized
//     }
// }



@RestController
public class RegisterAndLoginController {
    @Autowired
    UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    JwtUtil jwtUtil;

    @PostMapping("/api/user/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        // System.out.println("in here");
        User registeredUser = userService.registerUser(user);
        return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
    }

    @PostMapping("/api/user/login")
    public ResponseEntity<User> loginUser(@RequestBody User user) {
        // User existingUser = userService.getUserByUsername(user.getUsername());

        // if (existingUser == null || !existingUser.getPassword().equals(user.getPassword())) {
        //     throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid username or password");
        // }

        // return ResponseEntity.ok(existingUser);

        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
        } catch(AuthenticationException e) {
             throw new ResponseStatusException(HttpStatus.UNAUTHORIZED , "Invalid username or password" ,e);
        }
        final UserDetails userDetails = userService.loadUserByUsername(user.getUsername());
        User foundUser = userService.getUserByUsername(user.getUsername());
        final String token = jwtUtil.generateToken(user.getUsername());
        String role = foundUser.getRole();
        Long userId = foundUser.getId();
        System.out.println("User Roles: " + role);
        return null;
    }
}

=======
@RestController
public class RegisterAndLoginController {
    @Autowired
    private UserService userService;
    @PostMapping("/api/user/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        // register user and return the registered user with status code 201 created
        return new ResponseEntity<>(userService.createUser(user),HttpStatus.CREATED);
    }

    @PostMapping("/api/user/login")
    public ResponseEntity<LoginResponse> loginUser(@RequestBody LoginRequest loginRequest) {
        // login user and return the login response with status code 200 ok
         // If authentication fails, return status code 401 unauthorized
         return new ResponseEntity<>(null);
        
    }
}
>>>>>>> 42a015648b7a6b71865b830024cb300e6a77edf5
