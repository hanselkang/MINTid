package com.threeAmigos.services.models;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "household")
public class Household {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "household_name")
    private String household_name;

    @OneToMany(mappedBy = "household")
    @JsonBackReference
    private List<Position> net_positions;

    @OneToMany(mappedBy = "household")
    @JsonBackReference
    private List<Target> targets;

    @OneToMany(mappedBy = "household")
    @JsonBackReference
    private List<Person> persons;

    public String getHousehold_name() {
        return household_name;
    }

    public void setHousehold_name(String household_name) {
        this.household_name = household_name;
    }

    public List<Position> getNet_positions() {
        return net_positions;
    }

    public void setNet_positions(List<Position> net_positions) {
        this.net_positions = net_positions;
    }

    public Household(String household_name) {
        this.household_name = household_name;
    }

    public Household() {
    }

    public List<Person> getPersons() {
        return persons;
    }

    public void setPersons(List<Person> persons) {
        this.persons = persons;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }


//    int getTotalExpense(){
//        int totalAmount = 0;
//        for (Person person: persons) {
//            totalAmount += person.getTotalExpenseAmount();
//        }
//        return totalAmount;
//    }

//    public int getTotalExpenseAmount(){
//        int totalAmount = 0;
//        for (Household object: persons){
//            totalAmount += object.getAmount();
//        }
//        return totalAmount;
//    }
}
