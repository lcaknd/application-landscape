package com.example.applicationlandscape.Entity;


import javax.persistence.*;

@Entity
@Table(name = "link")
public class Link {

    @Id
    @Column(name="name")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int name;

    private int keyOfLink;
    @Column(name="from_Node")
    private int from;
    @Column(name="to_Node")
    private int to;

    public double getStrokeWidth() {
        return strokeWidth;
    }

    public void setStrokeWidth(double strokeWidth) {
        this.strokeWidth = strokeWidth;
    }

    private double strokeWidth;

    public int getFrequency() {
        return frequency;
    }

    public void setFrequency(int frequency) {
        this.frequency = frequency;
    }

    public int getBandwidth() {
        return bandwidth;
    }

    public void setBandwidth(int bandwidth) {
        this.bandwidth = bandwidth;
    }

    private int frequency;
    private int bandwidth;


    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private Double [] points;

    public int getKeyOfLink() {
        return keyOfLink;
    }

    public void setKeyOfLink(int keyOfLink) {
        this.keyOfLink = keyOfLink;
    }

    public Double[] getPoints() {
        return points;
    }

    public void setPoints(Double[] points) {
        this.points = points;
    }

    public int getFrom() {
        return from;
    }

    public void setFrom(int from) {
        this.from = from;
    }

    public int getTo() {
        return to;
    }

    public void setTo(int to) {
        this.to = to;
    }

    public Link(){

    }

    public Link(int id, int keyOfLink, int from, int to, double strokeWidth, int frequency, int bandwidth, Double[] points) {
        this.name = id;
        this.keyOfLink = keyOfLink;
        this.from = from;
        this.to = to;
        this.strokeWidth = strokeWidth;
        this.frequency = frequency;
        this.bandwidth = bandwidth;
        this.points = points;
    }
}
