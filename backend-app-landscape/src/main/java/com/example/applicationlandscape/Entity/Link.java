package com.example.applicationlandscape.Entity;


import javax.persistence.*;

@Entity
@Table(name = "links")
public class Link {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    public Link(){

    };

    private String fromNode;

    public String getFromNode() {
        return fromNode;
    }

    public void setFromNode(String fromNode) {
        this.fromNode = fromNode;
    }

    public String getToNode() {
        return toNode;
    }

    public void setToNode(String toNode) {
        this.toNode = toNode;
    }

    private String toNode;

    public Link(long id, String fromNode, String toNode) {
        this.id = id;
        this.fromNode = fromNode;
        this.toNode = toNode;
    }
}
