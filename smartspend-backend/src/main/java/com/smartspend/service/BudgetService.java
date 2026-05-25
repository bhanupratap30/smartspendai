package com.smartspend.service;

import com.smartspend.model.Budget;
import com.smartspend.repository.BudgetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BudgetService {

    @Autowired
    private BudgetRepository budgetRepository;

    public Budget saveBudget(Budget budget) {
        return budgetRepository.save(budget);
    }

    public List<Budget> getBudgets(String email) {
        return budgetRepository.findByUserEmail(email);
    }
}