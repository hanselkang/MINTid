package com.threeAmigos.services.models;

import org.junit.Before;
import org.junit.Test;

import java.time.LocalDate;

import static org.junit.Assert.*;

public class TargetTest {

    private Target target1;
    private LocalDate date1;

    @Before
    public void setUp() throws Exception {
        date1 = LocalDate.of(2022, 8, 31);
        target1 = new Target("Buy House", 2000000,date1);
    }


    @Test
    public void getTarget() {
        assertEquals(2000000,target1.getTarget());
    }

    @Test
    public void setTarget() {
        target1.setTarget(2200000);
        assertEquals(2200000,target1.getTarget());
    }

    @Test
    public void getDate() {
//        assertEquals(date1,target1);
    }

    @Test
    public void setDate() {
    }

    @Test
    public void getTarget_name() {
    }

    @Test
    public void setTarget_name() {
    }
}