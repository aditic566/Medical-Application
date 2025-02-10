package com.wecp.medicalequipmentandtrackingsystem.repository;
<<<<<<< HEAD
import com.wecp.medicalequipmentandtrackingsystem.entitiy.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;



@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByStatus(String status);
}
=======
 
 
import com.wecp.medicalequipmentandtrackingsystem.entitiy.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
 
import java.util.List;
 
@Repository
public interface OrderRepository extends JpaRepository<Order , Long>  {
    // List<Order> findByEquipmentHospitalId(Long hospitalId);
}
 
 
>>>>>>> 42a015648b7a6b71865b830024cb300e6a77edf5
