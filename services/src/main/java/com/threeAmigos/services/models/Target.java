package com.threeAmigos.services.models;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "target")
public class Target {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "target_name")
    private String target_name;
    @Column(name = "target")
    private int target;

    @Column(name = "by_date")
    private LocalDate date;

    @ManyToOne(optional = false)
    @JoinColumn(name = "household_id", nullable = false)
    private Household household;

    public Target(String target_name, int target, LocalDate date) {
        this.target_name = target_name;
        this.target = target;
        this.date = date;
    }

    public Target () {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getTarget() {
        return target;
    }

    public void setTarget(int target) {
        this.target = target;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getTarget_name() {
        return target_name;
    }

    public void setTarget_name(String target_name) {
        this.target_name = target_name;
    }
}
