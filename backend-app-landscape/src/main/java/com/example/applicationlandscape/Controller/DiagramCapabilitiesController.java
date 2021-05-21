package com.example.applicationlandscape.Controller;


import com.example.applicationlandscape.Entity.BusinessCapabilities;
import com.example.applicationlandscape.Repository.DiagramCapabilitiesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
}
