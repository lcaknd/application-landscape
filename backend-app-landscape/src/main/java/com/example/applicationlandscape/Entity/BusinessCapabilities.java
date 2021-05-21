package com.example.applicationlandscape.Entity;

import javax.persistence.*;

@Entity
@Table(name = "diagram_business_capabilities")
public class BusinessCapabilities {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    public boolean isSelfDeveloped() {
        return selfDeveloped;
    }

    public void setSelfDeveloped(boolean selfDeveloped) {
        this.selfDeveloped = selfDeveloped;
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

    private boolean selfDeveloped;
    private boolean frontend;
    private boolean backend;

    public BusinessCapabilities(long id, boolean selfDeveloped, boolean frontend, boolean backend) {
        this.id = id;
        this.selfDeveloped = selfDeveloped;
        this.frontend = frontend;
        this.backend = backend;
    }
}
