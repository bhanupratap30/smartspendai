package com.smartspend.service;

import com.smartspend.model.Expense;
import com.smartspend.model.Income;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;

@Service
public class AIInsightService {

    @Value("${groq.api.key}")
    private String apiKey;

    private final WebClient webClient = WebClient.create();

    public String generateInsights(List<Expense> expenses, List<Income> incomes) {

        try {

            String prompt = """
            You are a smart financial AI assistant.

            Analyze the user's financial data and provide:

            1. Spending insights
            2. Savings opportunities
            3. Budget warnings
            4. Financial health summary
            5. Smart recommendations
            6. Next month expense prediction

            Keep response short, clean and user friendly.

            Expenses:
            """ + expenses +

            "\n\nIncomes:\n" + incomes;

            Map<String, Object> body = Map.of(
                    "model", "llama3-8b-8192",
                    "messages", List.of(
                            Map.of(
                                    "role", "user",
                                    "content", prompt
                            )
                    )
            );

            Map response = webClient.post()
                    .uri("https://api.groq.com/openai/v1/chat/completions")
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey)
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(body)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            List choices = (List) response.get("choices");

            Map choice = (Map) choices.get(0);

            Map message = (Map) choice.get("message");

            return message.get("content").toString();

        } catch (Exception e) {

            e.printStackTrace();

            return "AI service temporarily unavailable.";
        }
    }
}