package com.example.applicationlandscape.Entity;



import javax.persistence.*;

@Entity
@Table(name = "diagram_visual")
public class DiagramVisual {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private long id;

        private String color;
        private String location;
        

    public DiagramVisual(){

    };


    public DiagramVisual(String color, String location) {
        this.color = color;
        this.location = location;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}
