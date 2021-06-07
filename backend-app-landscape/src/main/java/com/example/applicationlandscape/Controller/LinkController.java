package com.example.applicationlandscape.Controller;

import com.example.applicationlandscape.Entity.DiagramVisual;
import com.example.applicationlandscape.Entity.Link;
import com.example.applicationlandscape.Repository.DiagramVisualRepository;
import com.example.applicationlandscape.Repository.LinkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/")
@CrossOrigin(origins="*")
public class LinkController {

    @Autowired
    private LinkRepository linkRepository;

    @GetMapping("link")
    public Iterable<Link> getLink(){
        return this.linkRepository.findAll();
    }

    @PostMapping("link")
    public Link createLink(@RequestBody Link link) {
        return linkRepository.save(link);
    }

    @PutMapping("link/{id}")
    public ResponseEntity<Link> updateTheLink(@PathVariable Long id, @RequestBody Link link){
        Link linkNodes = linkRepository.findById(id).orElseThrow(null);
        linkNodes.setToNode(link.getToNode());
        Link updatedLink = linkRepository.save(link);
        return ResponseEntity.ok(updatedLink);
    }

    @DeleteMapping("link/delete/{id}")
    public void delete(@PathVariable long id) {
        Link link = linkRepository.findById(id).orElseThrow(null);;
        linkRepository.delete(link);
    }
}
