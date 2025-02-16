package com.wecp.medicalequipmentandtrackingsystem.config;

import com.wecp.medicalequipmentandtrackingsystem.jwt.JwtRequestFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

        private final UserDetailsService userDetailsService;
        private final JwtRequestFilter jwtRequestFilter;
        private final PasswordEncoder passwordEncoder;

        @Autowired
        public SecurityConfig(UserDetailsService userDetailsService, JwtRequestFilter jwtRequestFilter,
                        PasswordEncoder passwordEncoder) {
                this.userDetailsService = userDetailsService;
                this.jwtRequestFilter = jwtRequestFilter;
                this.passwordEncoder = passwordEncoder;
        }
        @Override
        protected void configure(AuthenticationManagerBuilder auth) throws Exception {
                auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder);
        }
        @Override
        protected void configure(HttpSecurity http) throws Exception {
                http.cors().and().csrf().disable()
                                .authorizeRequests()
                                .antMatchers("/api/user/register").permitAll()
                                .antMatchers("/api/user/login").permitAll()
                                .antMatchers("/api/hospital/create").hasAuthority("HOSPITAL")
                                .antMatchers("/api/hospitals").hasAuthority("HOSPITAL")
                                .antMatchers("/api/hospital/equipment").hasAuthority("HOSPITAL")
                                .antMatchers("/api/hospital/equipment/{hospitalId}").hasAuthority("HOSPITAL")

                                .antMatchers("/api/hospital/{hospitalId}").hasAuthority("HOSPITAL")
                                .antMatchers("/api/hospital/equipment/{equipmentId}").hasAuthority("HOSPITAL")

                                .antMatchers("/api/hospital/equipment/update/{equipmentId}").hasAuthority("HOSPITAL")
                                .antMatchers("/api/hospital/maintenance/schedule").hasAuthority("HOSPITAL")
                                .antMatchers("/api/hospital/order").hasAuthority("HOSPITAL")
                                .antMatchers("/api/technician/maintenance").hasAnyAuthority("TECHNICIAN","HOSPITAL")
                                .antMatchers("/api/technician/maintenance/update/{maintenanceId}").hasAuthority("TECHNICIAN")
                                .antMatchers("/api/supplier/orders").hasAnyAuthority("SUPPLIER","HOSPITAL")
                                .antMatchers("/api/supplier/order/update/{orderId}").hasAuthority("SUPPLIER")
                                .anyRequest().authenticated()
                                .and()
                                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

                http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
        }

        @Bean
        @Override
        public AuthenticationManager authenticationManagerBean() throws Exception {
                return super.authenticationManagerBean();
        }
}


// line 60 authority given to supplier and hospital
// line 58 authority given to technician and hospital
