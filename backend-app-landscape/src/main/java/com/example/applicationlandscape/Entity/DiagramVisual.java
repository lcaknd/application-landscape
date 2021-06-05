package com.example.applicationlandscape.Entity;



import javax.persistence.*;

@Entity
@Table(name = "diagramVisual")
public class DiagramVisual {

    public DiagramVisual(){

    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Id
    @Column(name="name")
    private String name;


    public DiagramVisual(String name,int key, String fill, String loc, String text, boolean isGroup, boolean horizontal, String category) {
        this.key= key;
        this.fill = fill;
        this.loc = loc;
        this.text = text;
        this.isGroup = isGroup;
        this.horizontal = horizontal;
        this.category = category;
        this.name = name;
    }

        @Column(name="key_nr")
        private int key;
        private String fill;
        private String loc;
        private String text;
        private boolean isGroup;
        private boolean horizontal;
        private  String category;


    public int getKey() {
        return key;
    }

    public void setKey(int keyLOL) {
        this.key = keyLOL;
    }

    public String getFill() {
        return fill;
    }

    public void setFill(String fill) {
        this.fill = fill;
    }

    public String getLoc() {
        return loc;
    }

    public void setLoc(String loc) {
        this.loc = loc;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public boolean isGroup() {
        return isGroup;
    }

    public void setGroup(boolean group) {
        isGroup = group;
    }

    public boolean isHorizontal() {
        return horizontal;
    }

    public void setHorizontal(boolean horizontal) {
        this.horizontal = horizontal;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

}
