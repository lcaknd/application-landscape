package com.example.applicationlandscape.Entity;


import javax.persistence.*;

@Entity
@Table(name = "link")
public class Link {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;



    private int keyOfLink;
    private String fromNode;
    private String toNode;
    private Double [] points;

    public int getKey() {
        return keyOfLink;
    }

    public void setKey(int key) {
        this.keyOfLink = key;
    }

    public Double[] getPoints() {
        return points;
    }

    public void setPoints(Double[] points) {
        this.points = points;
    }

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

    public Link(){

    }

    public Link(long id, int key, String fromNode, String toNode, Double[] points) {
        this.id = id;
        this.keyOfLink = key;
        this.fromNode = fromNode;
        this.toNode = toNode;
        this.points = points;
    }
}
