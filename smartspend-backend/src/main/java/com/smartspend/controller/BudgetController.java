package com.smartspend.controller;

import com.smartspend.model.Budget;
import com.smartspend.repository.BudgetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/budget")
@CrossOrigin(origins = "*")
public class BudgetController {

    @Autowired
    private BudgetRepository budgetRepository;

    // SAVE BUDGET
    @PostMapping
    public Budget saveBudget(@RequestBody Budget budget) {

        return budgetRepository.save(budget);
    }

    // GET ALL BUDGETS
    @GetMapping
    public List<Budget> getBudgets() {

        return budgetRepository.findAll();
    }

    // DELETE BUDGET
    @DeleteMapping("/{id}")
    public void deleteBudget(@PathVariable String id) {

        budgetRepository.deleteById(id);
    }
}