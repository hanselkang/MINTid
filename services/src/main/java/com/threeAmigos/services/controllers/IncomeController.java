package com.threeAmigos.services.controllers;

import com.threeAmigos.services.models.Income;
import com.threeAmigos.services.repositories.IncomeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.time.LocalDate;

@RestController
public class IncomeController {

    @Autowired
    IncomeRepository incomeRepository;


    /**
     * Handles routes and filters:
     *  GET     /incomes
     *  GET     /incomes?date=2022-01-01
     *  GET     /incomes?start_date=2022-01-01?end_date=2022-01-02
     *  GET     /incomes?person=1
     *  GET     /incomes?issalary=true
     * @return `ResponseEntity<List<Income>>`
     *  POST    /incomes
     *  PUT     /incomes/{id}
     *  DELETE  /incomes?id={id}
     */
    @GetMapping(value = "/incomes")
    public ResponseEntity getAllIncomesAndFilters(
            @RequestParam(required = false, name = "date") LocalDate date,
            @RequestParam(required = false, name = "startdate") LocalDate startDate,
            @RequestParam(required = false, name = "enddate") LocalDate endDate,
            @RequestParam(required = false, name = "person") Long personId,
            @RequestParam(required = false, name = "issalary") Boolean isSalary

    ) {
        // GET  /incomes?date=2022-01-01
        if (date != null) {
            return new ResponseEntity(incomeRepository.findByLocalDate(date), HttpStatus.OK);
        }
        // GET  /incomes?start_date=2022-01-01?end_date=2022-01-02
        if (startDate != null && endDate != null) {
            return new ResponseEntity(incomeRepository.findByLocalDateBetween(startDate, endDate), HttpStatus.OK);
        }


        // GET  /incomes?person=1
        if (personId != null) {
            return new ResponseEntity(incomeRepository.findByPerson_Id(personId), HttpStatus.OK);
        }


        // GET  /incomes?issalary=true
        if (isSalary != null) {
            return new ResponseEntity(incomeRepository.findByIsSalary(isSalary), HttpStatus.OK);
        }

        // GET /incomes
        return new ResponseEntity(incomeRepository.findAll(), HttpStatus.OK);

    }

    @PostMapping(value = "/incomes")
    public ResponseEntity<Income> postIncome(@RequestBody Income newIncome) {
        incomeRepository.save(newIncome);
        return new ResponseEntity<>(newIncome, HttpStatus.CREATED);
    }

    @PutMapping("/incomes/{id}")
    public ResponseEntity<Income> putIncome(@RequestBody Income newIncome, @PathVariable Long id) {
        incomeRepository.findById(id)
                .map(name -> {
                    name.setIncomeName(newIncome.getIncomeName());
                    return incomeRepository.save(name);
                })
                .map(amount -> {
                    amount.setAmount(newIncome.getAmount());
                    return incomeRepository.save(amount);
                })
                .map(date -> {
                    date.setDate(newIncome.getDate());
                    return incomeRepository.save(date);
                })
                .map(salary -> {
                    salary.setSalary(newIncome.isSalary());
                    return incomeRepository.save(salary);
                })
                .map(person -> {
                    person.setPerson(newIncome.getPerson());
                    return incomeRepository.save(person);
                })
                .orElseGet(() -> {
                    newIncome.setId(id);
                    return incomeRepository.save(newIncome);
                });
        return new ResponseEntity<>(newIncome, HttpStatus.ACCEPTED);

    }

    @DeleteMapping("/incomes")
    public ResponseEntity<String> deleteIncome(
            @RequestParam(required = false, name = "id") Long id)
    {
        if (!incomeRepository.existsById(id)) {
            throw new EntityNotFoundException("Invalid Id");
        }
        incomeRepository.deleteById(id);
        return new ResponseEntity<>( "Deleted id "+ id, HttpStatus.ACCEPTED);
    }


}