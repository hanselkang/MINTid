package com.threeAmigos.services.models;
import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "net_position")
public class Position {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "net_position")
    private int net_position;

    @Column(name = "date")
    private LocalDate date;

    @ManyToOne(optional = false)
    @JoinColumn(name = "household_id", nullable = false)
    private Household household;



    public Position(int net_position, LocalDate date) {
        this.net_position = net_position;
        this.date = date;
    }

    public Position() {
    }


    public void setId(Long id) {
        this.id = id;
    }


    public Long getId() {
        return id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public int getNet_position() {
        return net_position;
    }

    public void setNet_position(int net_position) {
        this.net_position = net_position;
    }
}
