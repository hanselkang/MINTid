package com.threeAmigos.services.models;

import org.junit.Before;
import org.junit.Test;

import java.time.LocalDate;

import static org.junit.Assert.*;

public class HouseholdTest {

    private Household household;


    @Before
    public void setUp() throws Exception {
        household = new Household("First home");
    }

    @Test
    public void getHousehold_name() {
        assertEquals("First home", household.getHousehold_name());
    }

    @Test
    public void setHousehold_name() {
        household.setHousehold_name("Second home");
        assertEquals("Second home", household.getHousehold_name());
    }

//    @Test
//    public void hasTarget() {
//        assertEquals(2000000,household.getNetPosition());
//    }
//
//    @Test
//    public void canChangeTarget() {
//        household.setNetPosition(2100000);
//        assertEquals(2100000,household.getNetPosition());
//    }


}