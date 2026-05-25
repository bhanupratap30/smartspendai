package com.smartspend.repository;

import com.smartspend.model.Budget;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface BudgetRepository extends MongoRepository<Budget, String> {
    List<Budget> findByUserEmail(String userEmail);
}