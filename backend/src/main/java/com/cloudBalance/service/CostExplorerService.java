package com.cloudBalance.service;

import com.cloudBalance.dto.ServiceCostDTO;
import com.cloudBalance.repository.CostExplorerRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Service
public class CostExplorerService {

    private final CostExplorerRepository repository;

    public CostExplorerService(CostExplorerRepository repository) {
        this.repository = repository;
    }

    public List<ServiceCostDTO> getExplorerData(
            String groupBy,
            LocalDate from,
            LocalDate to,
            Map<String, String> filters) {

        return repository.getExplorerData(groupBy, from, to, filters);
    }


}
