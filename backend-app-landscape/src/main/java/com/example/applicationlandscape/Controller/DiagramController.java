package com.example.applicationlandscape.Controller;


import com.example.applicationlandscape.Entity.Diagram;
import com.example.applicationlandscape.Entity.Link;
import com.example.applicationlandscape.Repository.DiagramRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/")
@CrossOrigin("*")
public class DiagramController {

    @Autowired
    DiagramRepository diagramRepository;

    @GetMapping("diagram")
    public Iterable<Diagram> getDiagram(){
        return this.diagramRepository.findAll();
    }

    @PostMapping("diagram")
    public Diagram createDiagram(@RequestBody Diagram diagram) {
        return diagramRepository.save(diagram);
    }

    @GetMapping("diagram/{name}")
    public ResponseEntity<Diagram> getDiagramByName(@PathVariable String name){
        Diagram diagram = (Diagram) diagramRepository.findByName(name).orElseThrow(null);
        return ResponseEntity.ok(diagram);
    }

}
