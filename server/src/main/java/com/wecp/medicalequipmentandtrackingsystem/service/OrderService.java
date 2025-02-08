package com.wecp.medicalequipmentandtrackingsystem.service;
 
 
import com.wecp.medicalequipmentandtrackingsystem.entitiy.Equipment;
import com.wecp.medicalequipmentandtrackingsystem.entitiy.Order;
import com.wecp.medicalequipmentandtrackingsystem.repository.EquipmentRepository;
import com.wecp.medicalequipmentandtrackingsystem.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
 
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
  
}