package com.example.applicationlandscape.Controller;

import com.example.applicationlandscape.Entity.BusinessCapabilities;
import com.example.applicationlandscape.Entity.DiagramVisual;
import com.example.applicationlandscape.Repository.DiagramVisualRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/")
@CrossOrigin(origins="http://localhost:3000")
public class DiagramVisualController {
    @Autowired
    private DiagramVisualRepository diagramVisualRepository;

    @GetMapping("diagramVisual")
    public Iterable<DiagramVisual> getDiagramVisualData(){
        return this.diagramVisualRepository.findAll();
    }

    @PostMapping("/diagramVisual")
    public DiagramVisual createDiagramVisual(@RequestBody DiagramVisual diagramVisual) {
        return diagramVisualRepository.save(diagramVisual);
    }
    @PutMapping("/diagramVisual/{id}")
    public ResponseEntity<DiagramVisual> updateTheNode(@PathVariable Long id, @RequestBody DiagramVisual diagramVisual){
        DiagramVisual diagramVisualNode = diagramVisualRepository.findById(id).orElseThrow(null);
        diagramVisualNode.setColor(diagramVisual.getColor());
        DiagramVisual updatedDiagramVisual = diagramVisualRepository.save(diagramVisual);
        return ResponseEntity.ok(updatedDiagramVisual);
    }

    @DeleteMapping("/diagramVisual/delete/{id}")
    public void delete(@PathVariable long id) {
        DiagramVisual diagramVisualNode = diagramVisualRepository.findById(id).orElseThrow(null);;
        diagramVisualRepository.delete(diagramVisualNode);
    }

}




