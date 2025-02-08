package com.wecp.medicalequipmentandtrackingsystem.service;


import com.wecp.medicalequipmentandtrackingsystem.entitiy.Equipment;
import com.wecp.medicalequipmentandtrackingsystem.entitiy.Maintenance;
import com.wecp.medicalequipmentandtrackingsystem.repository.EquipmentRepository;
import com.wecp.medicalequipmentandtrackingsystem.repository.MaintenanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class MaintenanceService{
    @Autowired
    private MaintenanceRepository maintenanceRepository;

    public List<Maintenance> getAllMaintenances(){
        return maintenanceRepository.findAll();
    }
    public Maintenance addMaintenance(Maintenance maintenance){
        return maintenanceRepository.save(maintenance);
    }

    public Maintenance updateMaintenance(Long id,Maintenance maintenance){
        Maintenance existing = maintenanceRepository.findById(id).orElseThrow(() -> new RuntimeException("Maintenance not found"));
        // existing.setStatus(maintenance.getStatus());
        // existing.setCompletedDate(maintenance.getCompletedDate());
        return maintenanceRepository.save(existing);

    }
}
