package com.threeAmigos.services.models;

import org.junit.Before;
import org.junit.Test;

import java.time.LocalDate;

import static org.junit.Assert.*;

public class PositionTest {

    private Position position1;
    private LocalDate date1;

    @Before
    public void setUp() throws Exception {
        date1 = LocalDate.of(2022, 01, 01);
        position1 = new Position(200000,date1);
    }

    @Test
    public void getDate() {
        assertEquals(date1,position1.getDate());
    }

    @Test
    public void setDate() {
    }

    @Test
    public void getNet_position() {
    }

    @Test
    public void setNet_position() {
    }
}