package com.wecp.medicalequipmentandtrackingsystem.controller;

import com.wecp.medicalequipmentandtrackingsystem.entitiy.Equipment;
import com.wecp.medicalequipmentandtrackingsystem.entitiy.Hospital;
import com.wecp.medicalequipmentandtrackingsystem.entitiy.Maintenance;
import com.wecp.medicalequipmentandtrackingsystem.entitiy.Order;
import com.wecp.medicalequipmentandtrackingsystem.service.EquipmentService;
import com.wecp.medicalequipmentandtrackingsystem.service.HospitalService;
import com.wecp.medicalequipmentandtrackingsystem.service.MaintenanceService;
import com.wecp.medicalequipmentandtrackingsystem.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class HospitalController {

    @Autowired
    private HospitalService hospitalService;

    @Autowired
    private EquipmentService equipmentService;

    @Autowired
    private MaintenanceService maintenanceService;

    @Autowired
    private OrderService orderService;

    @PostMapping("/api/hospital/create")
    public ResponseEntity<Hospital> createHospital(@RequestBody Hospital hospital) {
        Hospital createdHospital = hospitalService.createHospital(hospital);
        return new ResponseEntity<>(createdHospital, HttpStatus.CREATED);
    }

    @GetMapping("/api/hospitals")
    public ResponseEntity<List<Hospital>> getAllHospitals() {
        List<Hospital> hospitals = hospitalService.getAllHospitals();
        return new ResponseEntity<>(hospitals, HttpStatus.OK);
    }

    @DeleteMapping("/api/hospital/{hospitalId}")
    public ResponseEntity<Void> deleteHospitalById(@PathVariable("hospitalId") Long hospitalId) {
        hospitalService.deleteByHospitalId(hospitalId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/api/hospital/order")
    public ResponseEntity<Order> placeOrder(
            @RequestParam Long equipmentId,
            @RequestBody Order order) {
        Order placedOrder = orderService.placeOrder(equipmentId, order);
        return new ResponseEntity<>(placedOrder, HttpStatus.CREATED);
    }

    @PostMapping("/api/hospital/equipment")
    public ResponseEntity<Equipment> addEquipment(@RequestParam Long hospitalId, @RequestBody Equipment equipment) {
        Equipment addedEquipment = equipmentService.addEquipment(hospitalId, equipment);
        return new ResponseEntity<>(addedEquipment, HttpStatus.CREATED);
    }

    @GetMapping("/api/hospital/equipment/{hospitalId}")
    public ResponseEntity<List<Equipment>> getAllEquipmentsOfHospital(@PathVariable Long hospitalId) {
        List<Equipment> equipments = equipmentService.getAllEquipmentsOfHospital(hospitalId);
        return new ResponseEntity<>(equipments, HttpStatus.OK);
    }

    @PutMapping("/api/hospital/equipment/update/{equipmentId}")
    public ResponseEntity<Equipment> updateEquipment(
            @PathVariable Long equipmentId, @RequestBody Equipment updatedEquipment) {
        Equipment equipment = equipmentService.updateEquipment(equipmentId, updatedEquipment);
        return new ResponseEntity<>(equipment, HttpStatus.OK);
    }

    @DeleteMapping("/api/hospital/equipment/{equipmentId}")
    public ResponseEntity<Void> deleteEquipmentById(@PathVariable Long equipmentId) {
        equipmentService.deleteByEquipmentId(equipmentId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/api/hospital/maintenance/schedule")
    public ResponseEntity<Maintenance> scheduleMaintenance(@RequestParam Long equipmentId,
            @RequestBody Maintenance maintenance) {
        Maintenance scheduledMaintenance = maintenanceService.scheduleMaintenance(equipmentId, maintenance);
        return new ResponseEntity<>(scheduledMaintenance, HttpStatus.CREATED);
    }
}
