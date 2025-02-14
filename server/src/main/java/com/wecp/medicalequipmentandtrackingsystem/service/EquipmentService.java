package com.wecp.medicalequipmentandtrackingsystem.service;

import com.wecp.medicalequipmentandtrackingsystem.entitiy.Equipment;
import com.wecp.medicalequipmentandtrackingsystem.entitiy.Hospital;
import com.wecp.medicalequipmentandtrackingsystem.entitiy.Maintenance;
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

    @Autowired
    private HospitalRepository hospitalRepository;

    public Equipment addEquipment(Long hospitalId, Equipment equipment) {
        Hospital hospital = hospitalRepository.findById(hospitalId)
                .orElseThrow(() -> new EntityNotFoundException("Hospital not found"));
        equipment.setHospital(hospital);
        return equipmentRepository.save(equipment);
    }

    public Equipment updateEquipment(Long equipmentId, Equipment updatedEquipment) {
        Equipment equipment = equipmentRepository.findById(equipmentId)
                .orElseThrow(() -> new EntityNotFoundException("Equipment not found"));
        equipment.setName(updatedEquipment.getName());
        equipment.setDescription(updatedEquipment.getDescription());
        return equipmentRepository.save(equipment);

    }

    public List<Equipment> getAllEquipmentsOfHospital(Long hospitalId) {
        return equipmentRepository.findByHospitalId(hospitalId);
    }

    public void deleteByEquipmentId(Long equipmentId) {
        equipmentRepository.deleteById(equipmentId);
    }
}
