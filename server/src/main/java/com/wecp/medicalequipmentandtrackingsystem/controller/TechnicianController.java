package com.wecp.medicalequipmentandtrackingsystem.controller;

import com.wecp.medicalequipmentandtrackingsystem.entitiy.Maintenance;
import com.wecp.medicalequipmentandtrackingsystem.service.MaintenanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

<<<<<<< HEAD

// public class TechnicianController {

//     @GetMapping("/api/technician/maintenance")
//     public ResponseEntity<List<Maintenance>> getAllMaintenance() {
//         // Get all maintenance records and return them with status code 200 OK;
//     }

//     @PutMapping("/api/technician/maintenance/update/{maintenanceId}")
//     public ResponseEntity<Maintenance> updateMaintenance
//             (@PathVariable Long maintenanceId, @RequestBody Maintenance updatedMaintenance) {
//         // Update the maintenance record with the given id and return updated record with status code 200 OK;
//     }
// }




=======
>>>>>>> 42a015648b7a6b71865b830024cb300e6a77edf5
@RestController
public class TechnicianController {

    @Autowired
    private MaintenanceService maintenanceService;
<<<<<<< HEAD

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
=======
    @GetMapping("/api/technician/maintenance")
    public ResponseEntity<List<Maintenance>> getAllMaintenance() {
        // Get all maintenance records and return them with status code 200 OK;
        return ResponseEntity.ok(maintenanceService.getAllMaintenances());
    }

    @PutMapping("/api/technician/maintenance/update/{maintenanceId}")
    public ResponseEntity<Maintenance> updateMaintenance
            (@PathVariable Long maintenanceId, @RequestBody Maintenance updatedMaintenance) {
        // Update the maintenance record with the given id and return updated record with status code 200 OK;
        return ResponseEntity.ok(maintenanceService.updateMaintenance(maintenanceId,updatedMaintenance));
    }
}
>>>>>>> 42a015648b7a6b71865b830024cb300e6a77edf5
