package com.smartspend.service;

import com.smartspend.model.Budget;
import com.smartspend.model.Expense;
import com.smartspend.repository.BudgetRepository;
import com.smartspend.repository.ExpenseRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final BudgetRepository budgetRepository;

    // CONSTRUCTOR
    public ExpenseService(
            ExpenseRepository expenseRepository,
            BudgetRepository budgetRepository
    ) {
        this.expenseRepository = expenseRepository;
        this.budgetRepository = budgetRepository;
    }

    // ADD EXPENSE
    public Expense addExpense(Expense expense) {

        // SAVE EXPENSE
        Expense savedExpense = expenseRepository.save(expense);

        // GET ALL BUDGETS
        List<Budget> budgets = budgetRepository.findAll();

        // LOOP THROUGH BUDGETS
        for (Budget budget : budgets) {

            System.out.println("Budget Category: " + budget.getCategory());
            System.out.println("Expense Category: " + expense.getCategory());

            // CATEGORY MATCH
            if (
                    budget.getCategory() != null &&
                    expense.getCategory() != null &&
                    (
                            budget.getCategory()
                                    .trim()
                                    .toLowerCase()
                                    .contains(
                                            expense.getCategory()
                                                    .trim()
                                                    .toLowerCase()
                                    )

                            ||

                            expense.getCategory()
                                    .trim()
                                    .toLowerCase()
                                    .contains(
                                            budget.getCategory()
                                                    .trim()
                                                    .toLowerCase()
                                    )
                    )
            ) {

                System.out.println("MATCH FOUND");

                // CURRENT SPENT
                Double currentSpent =
                        budget.getSpent() == null
                                ? 0
                                : budget.getSpent();

                // EXPENSE AMOUNT
                Double expenseAmount =
                        expense.getAmount() == null
                                ? 0
                                : expense.getAmount();

                // UPDATE SPENT
                budget.setSpent(currentSpent + expenseAmount);

                System.out.println("NEW SPENT: " + budget.getSpent());

                // SAVE UPDATED BUDGET
                budgetRepository.save(budget);
            }
        }

        return savedExpense;
    }

    // GET ALL EXPENSES
    public List<Expense> getExpenses() {
        return expenseRepository.findAll();
    }

    // DELETE EXPENSE
    public void deleteExpense(String id) {
        expenseRepository.deleteById(id);
    }

    // UPDATE EXPENSE
    public Expense updateExpense(String id, Expense expense) {

        Expense existing = expenseRepository.findById(id).orElseThrow();

        existing.setTitle(expense.getTitle());
        existing.setAmount(expense.getAmount());
        existing.setCategory(expense.getCategory());
        existing.setNote(expense.getNote());
        existing.setDate(expense.getDate());
        existing.setPaymentMethod(expense.getPaymentMethod());

        return expenseRepository.save(existing);
    }
}