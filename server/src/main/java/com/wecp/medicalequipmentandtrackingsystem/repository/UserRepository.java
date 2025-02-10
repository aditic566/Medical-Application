package com.wecp.medicalequipmentandtrackingsystem.repository;


import com.wecp.medicalequipmentandtrackingsystem.entitiy.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
<<<<<<< HEAD



@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
=======
@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    // extend jpa repository and add custom methods if needed
    User findByUsername(String username);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
}

>>>>>>> 42a015648b7a6b71865b830024cb300e6a77edf5
