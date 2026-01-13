package com.cloudBalance.service;

import com.cloudBalance.dto.ServiceCostDTO;
import com.cloudBalance.repository.CostExplorerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CostExplorerService {

    private final CostExplorerRepository repository;

    public List<ServiceCostDTO> getExplorerData(
            String groupBy,
            String from,
            String to,
            Map<String,String> params
    ) {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        LocalDate fromDate = LocalDate.parse(from, formatter);
        LocalDate toDate = LocalDate.parse(to, formatter);

        params.remove("groupBy");
        params.remove("from");
        params.remove("to");

        return repository.getExplorerData(groupBy, fromDate, toDate, params);
    }
}

