package com.threeAmigos.services.models;

import org.junit.Before;
import org.junit.Test;

import java.time.LocalDate;

import static org.junit.Assert.*;

public class PositionTest {

    private Position position1;
    private Position position2;
    private LocalDate date1;
    private LocalDate date2;

    @Before
    public void setUp() throws Exception {
        position1 = new Position(200000,date1);
        position2 = new Position(220000,date2);
        date1 = LocalDate.of(2022, 01, 01);
        date2 = LocalDate.of(2022, 01, 04);
    }

    @Test
    public void getDate() {
        assertEquals(date1,position1.getDate());
    }

    @Test
    public void setDate() {
        position1.setDate(date2);
        assertEquals(date2,position1.getDate());
    }

    @Test
    public void getNet_position() {
        assertEquals(200000,position1.getNet_position());
    }

    @Test
    public void setNet_position() {
    }
}