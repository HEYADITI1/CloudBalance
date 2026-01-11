package com.cloudBalance.dto;

public class ServiceCostDTO {
    private String service;
    private Double cost;

    public ServiceCostDTO(String service, Double cost) {
        this.service = service;
        this.cost = cost;
    }

    public String getService() { return service; }
    public Double getCost() { return cost; }
}
