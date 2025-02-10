package com.wecp.medicalequipmentandtrackingsystem.controller;

import com.wecp.medicalequipmentandtrackingsystem.entitiy.Maintenance;
import com.wecp.medicalequipmentandtrackingsystem.service.MaintenanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TechnicianController {

    @Autowired
    private MaintenanceService maintenanceService;

    @GetMapping("/api/technician/maintenance")
    public ResponseEntity<List<Maintenance>> getAllMaintenance() {
        List<Maintenance> maintenanceList = maintenanceService.getAllMaintenance();
        return new ResponseEntity<>(maintenanceList, HttpStatus.OK);
    }

    @PutMapping("/api/technician/maintenance/update/{maintenanceId}")
    public ResponseEntity<Maintenance> updateMaintenance(
            @PathVariable Long maintenanceId, @RequestBody Maintenance updatedMaintenance) {
        Maintenance maintenance = maintenanceService.updateMaintenance(maintenanceId, updatedMaintenance);
        return new ResponseEntity<>(maintenance, HttpStatus.OK);
    }
}
