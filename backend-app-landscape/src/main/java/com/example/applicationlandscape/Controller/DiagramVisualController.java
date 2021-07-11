package com.example.applicationlandscape.Controller;

import com.example.applicationlandscape.Entity.BusinessCapabilities;
import com.example.applicationlandscape.Entity.DiagramVisual;
import com.example.applicationlandscape.Repository.DiagramVisualRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/")
@CrossOrigin("*")
public class DiagramVisualController {
    @Autowired
    private DiagramVisualRepository diagramVisualRepository;

    @GetMapping("diagramVisual")
    public Iterable<DiagramVisual> getDiagramVisualData(){
        return this.diagramVisualRepository.findAll();
    }

    @PostMapping("diagramVisual")
    public DiagramVisual createDiagramVisual(@RequestBody DiagramVisual diagramVisual) {
        return diagramVisualRepository.save(diagramVisual);
    }

    @PutMapping("/diagramVisual/{id}")
    public ResponseEntity<DiagramVisual> updateTheNode(@PathVariable Integer id, @RequestBody DiagramVisual diagramVisual){
        DiagramVisual diagramVisualNode = diagramVisualRepository.findById(id).orElseThrow(null);
        diagramVisualNode.setBackend(diagramVisual.isBackend());
        diagramVisualNode.setCategory(diagramVisual.getCategory());
        diagramVisualNode.setCreator(diagramVisual.getCreator());
        diagramVisualNode.setDate(diagramVisual.getDate());
        diagramVisualNode.setDepartments(diagramVisual.getDepartments());
        diagramVisualNode.setGroupNumber(diagramVisual.getGroupNumber());
        diagramVisualNode.setHoriz(diagramVisual.isHoriz());
        diagramVisualNode.setIsGroup(diagramVisual.isIsGroup());
        diagramVisualNode.setFill(diagramVisual.getFill());
        diagramVisualNode.setLicense(diagramVisual.getLicense());
        diagramVisualNode.setLoc(diagramVisual.getLoc());
        diagramVisualNode.setFrontend(diagramVisual.isFrontend());
        diagramVisualNode.setServices(diagramVisual.getServices());
        diagramVisualNode.setText(diagramVisual.getText());
        diagramVisualNode.setUsers(diagramVisual.getUsers());
        diagramVisualNode.setVersion(diagramVisual.getVersion());
        diagramVisualNode.setTermination(diagramVisual.getTermination());
        diagramVisualNode.setModified(diagramVisual.isModified());


        DiagramVisual updatedDiagramVisual = diagramVisualRepository.save(diagramVisual);
        return ResponseEntity.ok(updatedDiagramVisual);
    }



}




