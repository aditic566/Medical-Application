package com.wecp.medicalequipmentandtrackingsystem.service;
<<<<<<< HEAD


=======
 
 
>>>>>>> 42a015648b7a6b71865b830024cb300e6a77edf5
import com.wecp.medicalequipmentandtrackingsystem.entitiy.Equipment;
import com.wecp.medicalequipmentandtrackingsystem.entitiy.Order;
import com.wecp.medicalequipmentandtrackingsystem.repository.EquipmentRepository;
import com.wecp.medicalequipmentandtrackingsystem.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
<<<<<<< HEAD

import javax.persistence.EntityNotFoundException;
import java.util.Date;
import java.util.List;


@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private EquipmentRepository equipmentRepository;

    public Order placeOrder(Long equipmentId, Order order) {
        Equipment equipment = equipmentRepository.findById(equipmentId)
                .orElseThrow(() -> new EntityNotFoundException("Equipment not found"));
        order.setEquipment(equipment);
        return orderRepository.save(order);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order updateOrderStatus(Long orderId, String newStatus) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new EntityNotFoundException("Order not found"));
        order.setStatus(newStatus);
        return orderRepository.save(order);
    }
=======
 
import javax.persistence.EntityNotFoundException;
import java.util.Date;
import java.util.List;
 
@Service
public class OrderService {
   
    @Autowired
    private OrderRepository orderRepository;
   
    public Order createOrder(Order order) {
        return orderRepository.save(order);
    }
   
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
   
    public Order updateOrderStatus(Long id, String status) {
        Order order = orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(status);
        return orderRepository.save(order);
    }
  
>>>>>>> 42a015648b7a6b71865b830024cb300e6a77edf5
}