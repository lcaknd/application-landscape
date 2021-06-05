package com.example.applicationlandscape.Entity;


import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "diagrams")
public class Diagram {


    @Id
    @Column(name="name")
    private String name;

    @ElementCollection(targetClass=Link.class)
    private List<Link> links;
    @ElementCollection(targetClass=BusinessCapabilities.class)
    private List<BusinessCapabilities> businessCapabilities;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Link> getLinks() {
        return links;
    }

    public void setLinks(List<Link> links) {
        this.links = links;
    }

    public List<BusinessCapabilities> getBusinessCapabilities() {
        return businessCapabilities;
    }

    public void setBusinessCapabilities(List<BusinessCapabilities> businessCapabilities) {
        this.businessCapabilities = businessCapabilities;
    }

    public List<DiagramVisual> getDiagramVisuals() {
        return diagramVisuals;
    }

    public void setDiagramVisuals(List<DiagramVisual> diagramVisuals) {
        this.diagramVisuals = diagramVisuals;
    }

    @OneToMany(cascade = CascadeType.ALL , orphanRemoval = true)
    @JoinColumn(name="name")
    private List<DiagramVisual> diagramVisuals;


    public Diagram(String name, List<Link> links, List<BusinessCapabilities> businessCapabilities, List<DiagramVisual> diagramVisuals) {
        this.name = name;
        this.links = links;
        this.businessCapabilities = businessCapabilities;
        this.diagramVisuals = diagramVisuals;
    }
    public Diagram(){

    }
}
