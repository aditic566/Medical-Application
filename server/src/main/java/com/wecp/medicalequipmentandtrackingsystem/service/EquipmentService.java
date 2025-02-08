package com.wecp.medicalequipmentandtrackingsystem.service;
 
 
import com.wecp.medicalequipmentandtrackingsystem.entitiy.Equipment;
import com.wecp.medicalequipmentandtrackingsystem.entitiy.Hospital;
import com.wecp.medicalequipmentandtrackingsystem.repository.EquipmentRepository;
import com.wecp.medicalequipmentandtrackingsystem.repository.HospitalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

 
import javax.persistence.EntityNotFoundException;
import java.util.List;
 
@Service
public class EquipmentService {
 
    @Autowired
    private EquipmentRepository equipmentRepository;
 
    public Equipment addEquipment(Equipment equipment){
        return equipmentRepository.save(equipment);
    }
 
    public List<Equipment> getEquipmentByHospital(Long hospitalId) {
        return equipmentRepository.findEquipmentByHospitalId(hospitalId);
    }
   
    public Equipment getEquipmentById(Long id){
        return equipmentRepository.findById(id).orElseThrow(() -> new RuntimeException("Equipment not found"));
    }
}
 
 