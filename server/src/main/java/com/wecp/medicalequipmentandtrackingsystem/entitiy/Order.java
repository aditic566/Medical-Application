package com.wecp.medicalequipmentandtrackingsystem.entitiy;


import javax.persistence.*;
import java.util.Date;


@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Date orderDate;
    private String status; // Pending, Shipped, Delivered
    private int quantity;

    @ManyToOne
    @JoinColumn(name = "equipment_id")
    private Equipment equipment;

    // Constructors, Getters, and Setters
    public Order() {}

    public Order(Date orderDate, String status, int quantity) {
        this.orderDate = orderDate;
        this.status = status;
        this.quantity = quantity;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Equipment getEquipment() {
        return equipment;
    }

    public void setEquipment(Equipment equipment) {
        this.equipment = equipment;
    }
}
