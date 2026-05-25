package com.smartspend.service;

import com.smartspend.model.Income;
import com.smartspend.repository.IncomeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IncomeService {

    private final IncomeRepository incomeRepository;

    public IncomeService(IncomeRepository incomeRepository) {
        this.incomeRepository = incomeRepository;
    }

    public List<Income> getAllIncome() {
        return incomeRepository.findAll();
    }

    public Income addIncome(Income income) {
        return incomeRepository.save(income);
    }

    public void deleteIncome(String id) {
        incomeRepository.deleteById(id);
    }
}