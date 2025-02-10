package com.wecp.medicalequipmentandtrackingsystem.entitiy;
<<<<<<< HEAD


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;


@Entity
@Table(name = "hospital")
public class Hospital {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String location;

    @OneToMany(mappedBy = "hospital", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Equipment> equipmentList;

    // Constructors, Getters, and Setters
    public Hospital() {}

    public Hospital(String name, String location) {
        this.name = name;
        this.location = location;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public List<Equipment> getEquipmentList() {
        return equipmentList;
    }

    public void setEquipmentList(List<Equipment> equipmentList) {
        this.equipmentList = equipmentList;
    }
}
=======
 
import com.fasterxml.jackson.annotation.JsonIgnore;
 
import javax.persistence.*;
import java.util.List;
 
@Entity
@Table(name = "hospital") // do not change table name
public class Hospital {
 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
   
    private String name;
   
    private String location;
   
    @OneToMany(mappedBy = "hospital", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Equipment> equipmentList;
 
    // Default constructor
    public Hospital() {}
 
    // Parameterized constructor
    public Hospital(String name, String location, List<Equipment> equipmentList) {
        this.name = name;
        this.location = location;
        this.equipmentList = equipmentList;
    }
 
    // Getters and Setters
    public Long getId() {
        return id;
    }
 
    public void setId(Long id) {
        this.id = id;
    }
 
    public String getName() {
        return name;
    }
 
    public void setName(String name) {
        this.name = name;
    }
 
    public String getLocation() {
        return location;
    }
 
    public void setLocation(String location) {
        this.location = location;
    }
 
    public List<Equipment> getEquipmentList() {
        return equipmentList;
    }
 
    public void setEquipmentList(List<Equipment> equipmentList) {
        this.equipmentList = equipmentList;
    }
}
 
 
>>>>>>> 42a015648b7a6b71865b830024cb300e6a77edf5
