package com.wecp.medicalequipmentandtrackingsystem.controller;
<<<<<<< HEAD

=======
 
>>>>>>> 42a015648b7a6b71865b830024cb300e6a77edf5
import com.wecp.medicalequipmentandtrackingsystem.entitiy.Order;
import com.wecp.medicalequipmentandtrackingsystem.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
<<<<<<< HEAD

import java.util.List;


// public class SupplierController {

//     @GetMapping("/api/supplier/orders")
//     public ResponseEntity<List<Order>> getAllOrders() {
//         // get all order and return it status code 200 OK
//     }

//     @PutMapping("/api/supplier/order/update/{orderId}")
//     public ResponseEntity<Order> updateOrderStatus(@PathVariable Long orderId, @RequestParam String newStatus) {
//         // update order status and return updated order with status code 200 OK
//     }
// }


@RestController
public class SupplierController {

    @Autowired
    private OrderService orderService;

    @GetMapping("/api/supplier/orders")
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> orders = orderService.getAllOrders();
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @PutMapping("/api/supplier/order/update/{orderId}")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable Long orderId, @RequestParam String newStatus) {
        Order updatedOrder = orderService.updateOrderStatus(orderId, newStatus);
        return new ResponseEntity<>(updatedOrder, HttpStatus.OK);
    }
}
=======
 
import java.util.List;
 
@RestController
public class SupplierController {
 
  @Autowired
  private  OrderService orderService;
 
    @GetMapping("/api/supplier/orders")
    public ResponseEntity<List<Order>> getAllOrders() {
      return ResponseEntity.ok(orderService.getAllOrders());
    }
 
    @PutMapping("/api/supplier/order/update/{orderId}")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable Long orderId, @RequestParam String newStatus) {
        return ResponseEntity.ok(orderService.updateOrderStatus(orderId, newStatus));
    }
}
 
 
>>>>>>> 42a015648b7a6b71865b830024cb300e6a77edf5
