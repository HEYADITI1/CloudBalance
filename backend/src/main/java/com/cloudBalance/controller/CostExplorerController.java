package com.cloudBalance.controller;

import com.cloudBalance.dto.ServiceCostDTO;
import com.cloudBalance.service.CostExplorerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cost")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class CostExplorerController {

    private final CostExplorerService service;

    @GetMapping("/explorer")
    public ResponseEntity<List<ServiceCostDTO>> explorer(
            @RequestParam String groupBy,
            @RequestParam String from,
            @RequestParam String to,
            @RequestParam Map<String, String> params
    ) {
        return ResponseEntity.ok(service.getExplorerData(groupBy, from, to, params));
    }
}

