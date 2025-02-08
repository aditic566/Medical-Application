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
    private OrderService orderService;
 
    @Autowired
    private MaintenanceService maintenanceService;
 
    @PostMapping("/api/hospital/create")
    public ResponseEntity<Hospital> createHospital(@RequestBody Hospital hospital) {
        return new ResponseEntity<Hospital>(hospitalService.createHospital(hospital),HttpStatus.CREATED);
    }
 
    @GetMapping("/api/hospitals")
    public ResponseEntity<List<Hospital>> getAllHospitals() {
        return new ResponseEntity<List<Hospital>>(hospitalService.getAllHospitals(),HttpStatus.OK);
    }
 
    @PostMapping("/api/hospital/equipment")
    public ResponseEntity<Equipment> addEquipment(@RequestParam Long hospitalId, @RequestBody Equipment equipment) {
        Hospital hospital = hospitalService.getHospitalById(hospitalId);
        equipment.setHospital(hospital);
        return new ResponseEntity<Equipment>(equipmentService.addEquipment(equipment),HttpStatus.CREATED);
    }
 
    @GetMapping("/api/hospital/equipment/{hospitalId}")
    public ResponseEntity<List<Equipment>> getAllEquipmentsOfHospital(@PathVariable Long hospitalId) {
        return new ResponseEntity<List<Equipment>>(equipmentService.getEquipmentByHospital(hospitalId),HttpStatus.OK);
    }
 
    @PostMapping("/api/hospital/maintenance/schedule")
    public ResponseEntity<Maintenance> scheduleMaintenance
            (@RequestParam Long equipmentId, @RequestBody Maintenance maintenance) {
        Equipment equipment = equipmentService.getEquipmentById(equipmentId);
        maintenance.setEquipment(equipment);
        return new ResponseEntity<Maintenance>(maintenanceService.addMaintenance(maintenance),HttpStatus.CREATED);
 
    }
 
    @PostMapping("/api/hospital/order")
    public ResponseEntity<Order> placeOrder(@RequestParam Long equipmentId, @RequestBody Order order) {
        Equipment equipment = equipmentService.getEquipmentById(equipmentId);
        order.setEquipment(equipment);
        return new ResponseEntity<Order>(orderService.createOrder(order),HttpStatus.CREATED);
    }
}
 
 