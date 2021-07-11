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


    public DiagramVisual(int name, int key, String fill, String loc, String text, boolean isGroup, boolean horiz, String category, String users, boolean frontend, boolean backend, String date, String[] services, String[] departments, String version, String license, String termination, String creator,int groupNumber,boolean modified) {
        this.key= key;
        this.groupNumber = groupNumber;
        this.fill = fill;
        this.loc = loc;
        this.text = text;
        this.isGroup = isGroup;
        this.horiz = horiz;
        this.category = category;
        this.name = name;
        this.users = users;
        this.frontend = frontend;
        this.backend = backend;
        this.date = date;
        this.services = services;
        this.departments = departments;
        this.version = version;
        this.license = license;
        this.termination = termination;
        this.creator = creator;
        this.modified = modified;
    }

        @Column(name="key_nr")
        private int key;
        private String fill;
        private String loc;
        private String text;
        private boolean isGroup;
        private boolean horiz;
        private  String category;
        private String users;
        private boolean frontend;
        private boolean backend;
        private String date;

        @Column(name="group_diagram")
        private int groupNumber;


    public int getGroupNumber() {
        return groupNumber;
    }

    public void setGroupNumber(int groupNumber) {
        this.groupNumber = groupNumber;
    }

    public String[] getServices() {
        return services;
    }

    public void setServices(String[] services) {
        this.services = services;
    }

    public String[] getDepartments() {
        return departments;
    }

    public void setDepartments(String[] departments) {
        this.departments = departments;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public String getLicense() {
        return license;
    }

    public void setLicense(String license) {
        this.license = license;
    }

    public String getTermination() {
        return termination;
    }

    public void setTermination(String termination) {
        this.termination = termination;
    }

    public String getCreator() {
        return creator;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }


    private String [] services;
    private String [] departments;

    private String version;
    private String license;
    private String termination;
    private String creator;

    public boolean isModified() {
        return modified;
    }

    public void setModified(boolean modified) {
        this.modified = modified;
    }

    private boolean modified;


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

    public boolean isIsGroup() {
        return isGroup;
    }

    public void setIsGroup(boolean group) {
        isGroup = group;
    }

    public boolean isHoriz() {
        return horiz;
    }

    public void setHoriz(boolean horiz) {
        this.horiz = horiz;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

}
