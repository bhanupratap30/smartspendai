package com.smartspend.controller;

import com.smartspend.model.Income;
import com.smartspend.service.IncomeService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/income")
@CrossOrigin("*")
public class IncomeController {

    private final IncomeService incomeService;

    public IncomeController(IncomeService incomeService) {
        this.incomeService = incomeService;
    }

    @GetMapping
    public List<Income> getAllIncome() {
        return incomeService.getAllIncome();
    }

    @PostMapping
    public Income addIncome(@RequestBody Income income) {
        return incomeService.addIncome(income);
    }

    @DeleteMapping("/{id}")
    public void deleteIncome(@PathVariable String id) {
        incomeService.deleteIncome(id);
    }
}