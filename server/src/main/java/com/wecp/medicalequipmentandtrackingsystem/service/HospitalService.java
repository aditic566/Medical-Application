package com.wecp.medicalequipmentandtrackingsystem.service;
 
 
import java.util.List;
 
import com.wecp.medicalequipmentandtrackingsystem.entitiy.Hospital;
import com.wecp.medicalequipmentandtrackingsystem.repository.HospitalRepository;
import com.wecp.medicalequipmentandtrackingsystem.repository.EquipmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
 
@Service
public class HospitalService {
 
        @Autowired
        private HospitalRepository hospitalRepository;
 
        @Autowired
        private EquipmentRepository equipmentRepository;
 
        public Hospital createHospital(Hospital hospital){
            return hospitalRepository.save(hospital);
        }
 
        public Hospital getHospitalById(Long id){
            return hospitalRepository.findById(id).orElseThrow(() -> new RuntimeException("Hospital not found"));
        }
 
        public List<Hospital> getAllHospitals(){
            return hospitalRepository.findAll();
        }
 
        public Hospital updateHospital(Long id,Hospital updatedHospital){
            Hospital hospital = hospitalRepository.findById(id).orElseThrow(() -> new RuntimeException("Hospital not found"));
            updatedHospital.setId(id);
            return hospitalRepository.save(updatedHospital);
        }
 
        public Long deleteHospital(Long id){
            hospitalRepository.deleteById(id);
            return id;
        }
 
 
}
 
 