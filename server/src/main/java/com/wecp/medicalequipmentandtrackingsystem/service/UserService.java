
package com.wecp.medicalequipmentandtrackingsystem.service;
 
 
import com.wecp.medicalequipmentandtrackingsystem.entitiy.User;
import com.wecp.medicalequipmentandtrackingsystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
 
import org.springframework.stereotype.Service;
 
import java.util.ArrayList;
import java.util.Collections;
 
 
 
 
@Service
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;
 
    @Autowired
    private PasswordEncoder passwordEncoder;
 
    public User registerUser(User user) {

        User userExist = userRepository.findByUsernameAndEmail(user.getUsername(), user.getEmail());
        if(userExist != null) {
            throw new DuplicateKeyException("User with this email already Exist");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }
 
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }
 
    public boolean checkEmailExists(String email) {
        return userRepository.findByEmail(email) != null;
    }
 
    public boolean checkUsernameExists(String username) {
        return userRepository.findByUsername(username) != null;
    }
 
 
 
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
 
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority(user.getRole()))
        );
    }
}
 