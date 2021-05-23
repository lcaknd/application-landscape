package com.example.applicationlandscape.Controller;


import com.example.applicationlandscape.Entity.BusinessCapabilities;
import com.example.applicationlandscape.Repository.DiagramCapabilitiesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/")
@CrossOrigin(origins="http://localhost:3000")
public class DiagramCapabilitiesController {

    @Autowired
    private DiagramCapabilitiesRepository diagramCapabilitiesRepository;

    @GetMapping("businessCapabilities")
    public Iterable<BusinessCapabilities> getDiagramVisualData(){
        return this.diagramCapabilitiesRepository.findAll();
    }

    @PostMapping("/businessCapabilities")
    public BusinessCapabilities createDiagramVisual(@RequestBody BusinessCapabilities businessCapabilities) {
        return diagramCapabilitiesRepository.save(businessCapabilities);
    }
    @PutMapping("/businessCapabilities/{id}")
    public ResponseEntity<BusinessCapabilities> updateTheNode(@PathVariable Long id, @RequestBody BusinessCapabilities businessCapabilities){
        BusinessCapabilities businessCapabilitiesNode = diagramCapabilitiesRepository.findById(id).orElseThrow(null);
        businessCapabilitiesNode.setBackend(businessCapabilities.isBackend());
        BusinessCapabilities updatedBusinessCapabilities = diagramCapabilitiesRepository.save(businessCapabilitiesNode);
        return ResponseEntity.ok(updatedBusinessCapabilities);
    }

    @DeleteMapping("/businessCapabilities/delete/{id}")
    public void delete(@PathVariable long id) {
        BusinessCapabilities businessCapabilitiesNode = diagramCapabilitiesRepository.findById(id).orElseThrow(null);;
        diagramCapabilitiesRepository.delete(businessCapabilitiesNode);
    }



}
