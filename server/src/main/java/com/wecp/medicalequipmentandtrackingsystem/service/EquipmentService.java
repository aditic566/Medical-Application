package com.wecp.medicalequipmentandtrackingsystem.service;
<<<<<<< HEAD


=======
 
 
>>>>>>> 42a015648b7a6b71865b830024cb300e6a77edf5
import com.wecp.medicalequipmentandtrackingsystem.entitiy.Equipment;
import com.wecp.medicalequipmentandtrackingsystem.entitiy.Hospital;
import com.wecp.medicalequipmentandtrackingsystem.repository.EquipmentRepository;
import com.wecp.medicalequipmentandtrackingsystem.repository.HospitalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

<<<<<<< HEAD
import javax.persistence.EntityNotFoundException;
import java.util.List;



@Service
public class EquipmentService {
    @Autowired
    private EquipmentRepository equipmentRepository;

    @Autowired
    private HospitalRepository hospitalRepository;

    public Equipment addEquipment(Long hospitalId, Equipment equipment) {
        Hospital hospital = hospitalRepository.findById(hospitalId)
                .orElseThrow(() -> new EntityNotFoundException("Hospital not found"));
        equipment.setHospital(hospital);
        return equipmentRepository.save(equipment);
    }

    public List<Equipment> getAllEquipmentsOfHospital(Long hospitalId) {
        return equipmentRepository.findByHospitalId(hospitalId);
    }
}
=======
 
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
 
 
>>>>>>> 42a015648b7a6b71865b830024cb300e6a77edf5
