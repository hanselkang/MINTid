package com.threeAmigos.services.controllers;

import com.threeAmigos.services.models.Household;
import com.threeAmigos.services.repositories.HouseholdRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
public class HouseholdController {

    @Autowired
    HouseholdRepository householdRepository;


    /**
     * Handles routes and filters:
     *  GET  /households
     *  GET  /households?householdid=1
     * @return `ResponseEntity<List<Household>>`
     */
    @GetMapping(value = "/households")
    public ResponseEntity getAllHouseholdsAndFilters(
            @RequestParam(required = false, name = "household") Long householdId

    ) {
        // GET  /households?householdId=1
        if (householdId != null) {
            return new ResponseEntity(householdRepository.findById(householdId), HttpStatus.OK);
        }

        // GET /households
        return new ResponseEntity(householdRepository.findAll(), HttpStatus.OK);

    }

    @PutMapping("/households/{id}")
    public ResponseEntity<Household> putHousehold(@RequestBody Household newHousehold, @PathVariable Long id) {
        householdRepository.findById(id)
//                .map(target -> {
//                    target.setNetPosition(newHousehold.getNetPosition());
//                    return householdRepository.save(target);
//                })
//                .map(date -> {
//                    date.setDate(newHousehold.getDate());
//                    return householdRepository.save(date);
//                })
                .orElseGet(() -> {
                    newHousehold.setId(id);
                    return householdRepository.save(newHousehold);
                });
        return new ResponseEntity<>(newHousehold, HttpStatus.ACCEPTED);

    }
}