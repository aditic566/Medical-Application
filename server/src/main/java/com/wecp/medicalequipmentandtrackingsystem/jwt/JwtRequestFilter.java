package com.wecp.medicalequipmentandtrackingsystem.jwt;


import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
<<<<<<< HEAD
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
=======
>>>>>>> 42a015648b7a6b71865b830024cb300e6a77edf5
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collection;
<<<<<<< HEAD
 
@Component
public class JwtRequestFilter extends OncePerRequestFilter {
 
    @Autowired
    private JwtUtil jwtUtil;
 
    @Autowired
    private UserDetailsService userDetailsService;
 
    public JwtRequestFilter(JwtUtil jwtUtil, UserDetailsService userDetailsService) {
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }
 
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        System.out.println("here in doFilterInternal");
        final String authorizationHeader = request.getHeader("Authorization");
        System.out.println(authorizationHeader);
       
        String username = null;
        String jwt = null;
       
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            System.out.println("here in");
            jwt = authorizationHeader.substring(7);
            System.out.println(jwt);
            username = jwtUtil.extractUsername(jwt);
            System.out.println(username);
        }
 
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
 
            if (jwtUtil.validateToken(jwt, userDetails)) {
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                usernamePasswordAuthenticationToken
                        .setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            }
        }
 
        chain.doFilter(request, response);
    }
=======

public class JwtRequestFilter  {
    
>>>>>>> 42a015648b7a6b71865b830024cb300e6a77edf5
}
