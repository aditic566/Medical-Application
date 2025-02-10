<<<<<<< HEAD
package com.wecp.medicalequipmentandtrackingsystem.entitiy;


import javax.persistence.*;


@Entity
@Table(name = "equipments")
public class Equipment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;

    @ManyToOne
    @JoinColumn(name = "hospital_id")
    private Hospital hospital;

    // Constructors, Getters, and Setters
    public Equipment() {}

    public Equipment(String name, String description) {
        this.name = name;
        this.description = description;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Hospital getHospital() {
        return hospital;
    }

    public void setHospital(Hospital hospital) {
        this.hospital = hospital;
    }
}
=======
 
package com.wecp.medicalequipmentandtrackingsystem.entitiy;
 
import javax.persistence.*;
 
@Entity
@Table(name = "equipments") // do not change table name
public class Equipment {
 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
   
    private String name;
    private String description;
   
    @ManyToOne
    private Hospital hospital;
 
    public Equipment() {}
 
    public Equipment(String name, String description, Hospital hospital) {
        this.name = name;
        this.description = description;
        this.hospital = hospital;
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
 
    public String getDescription() {
        return description;
    }
 
    public void setDescription(String description) {
        this.description = description;
    }
 
    public Hospital getHospital() {
        return hospital;
    }
 
    public void setHospital(Hospital hospital) {
        this.hospital = hospital;
    }
}
 
>>>>>>> 42a015648b7a6b71865b830024cb300e6a77edf5
