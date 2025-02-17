package com.wecp.medicalequipmentandtrackingsystem.repository;

import com.wecp.medicalequipmentandtrackingsystem.entitiy.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
    User findByEmail(String email);

    @Query("SELECT u FROM User u WHERE u.username = :username OR u.email = :email")
    User findByUsernameAndEmail(@Param("username") String username, @Param("email") String email);
}
