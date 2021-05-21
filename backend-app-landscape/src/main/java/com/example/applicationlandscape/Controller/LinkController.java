package com.example.applicationlandscape.Controller;

import com.example.applicationlandscape.Entity.DiagramVisual;
import com.example.applicationlandscape.Entity.Link;
import com.example.applicationlandscape.Repository.DiagramVisualRepository;
import com.example.applicationlandscape.Repository.LinkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/")
@CrossOrigin(origins="http://localhost:3000")
public class LinkController {

    @Autowired
    private LinkRepository linkRepository;

    @GetMapping("link")
    public Iterable<Link> getDiagramVisualData(){
        return this.linkRepository.findAll();
    }

    @PostMapping("/link")
    public Link createDiagramVisual(@RequestBody Link link) {
        return linkRepository.save(link);
    }
}
