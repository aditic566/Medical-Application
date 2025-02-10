package com.wecp.medicalequipmentandtrackingsystem.repository;
<<<<<<< HEAD


import com.wecp.medicalequipmentandtrackingsystem.entitiy.Equipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface EquipmentRepository extends JpaRepository<Equipment, Long> {
    List<Equipment> findByHospitalId(Long hospitalId);
}
=======
 
 
import com.wecp.medicalequipmentandtrackingsystem.entitiy.Equipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
 
import java.util.List;
 
@Repository
public interface EquipmentRepository extends JpaRepository<Equipment,Long>{
    List<Equipment> findEquipmentByHospitalId(Long hospitalId);
}
 
 
>>>>>>> 42a015648b7a6b71865b830024cb300e6a77edf5
