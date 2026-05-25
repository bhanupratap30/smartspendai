package com.smartspend.controller;

import com.smartspend.service.AIInsightService;
import com.smartspend.service.ExpenseService;
import com.smartspend.service.IncomeService;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin("*")
public class AIController {

    private final AIInsightService aiService;
    private final ExpenseService expenseService;
    private final IncomeService incomeService;

    public AIController(
            AIInsightService aiService,
            ExpenseService expenseService,
            IncomeService incomeService
    ) {
        this.aiService = aiService;
        this.expenseService = expenseService;
        this.incomeService = incomeService;
    }

    @GetMapping("/insights")
    public String getInsights() {

        return aiService.generateInsights(
                expenseService.getExpenses(),
                incomeService.getAllIncome()
        );
    }
}