package com.example.applicationlandscape.Entity;



import javax.persistence.*;

@Entity
@Table(name = "diagramVisual")
public class DiagramVisual {

    public DiagramVisual(){

    }

    public int getName() {
        return name;
    }

    public void setName(int name) {
        this.name = name;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="name")
    private int name;


    public DiagramVisual(int name, int key, String fill, String loc, String text, boolean isGroup, boolean horizontal, String category, String users, boolean frontend, boolean backend, String date) {
        this.key= key;
        this.fill = fill;
        this.loc = loc;
        this.text = text;
        this.isGroup = isGroup;
        this.horizontal = horizontal;
        this.category = category;
        this.name = name;
        this.users = users;
        this.frontend = frontend;
        this.backend = backend;
        this.date = date;
    }

        @Column(name="key_nr")
        private int key;
        private String fill;
        private String loc;
        private String text;
        private boolean isGroup;
        private boolean horizontal;
        private  String category;
        private String users;
        private boolean frontend;
        private boolean backend;
        private String date;

    public String getUsers() {
        return users;
    }

    public void setUsers(String users) {
        this.users = users;
    }

    public boolean isFrontend() {
        return frontend;
    }

    public void setFrontend(boolean frontend) {
        this.frontend = frontend;
    }

    public boolean isBackend() {
        return backend;
    }

    public void setBackend(boolean backend) {
        this.backend = backend;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

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
