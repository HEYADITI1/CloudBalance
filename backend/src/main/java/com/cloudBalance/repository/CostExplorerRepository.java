package com.cloudBalance.repository;

import com.cloudBalance.dto.ServiceCostDTO;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@Repository
public class CostExplorerRepository {

    private final JdbcTemplate jdbcTemplate;

    public CostExplorerRepository(
            @Qualifier("snowflakeJdbcTemplate") JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<ServiceCostDTO> getExplorerData(
            String groupBy,
            LocalDate from,
            LocalDate to,
            Map<String, String> filters) {

        List<String> allowedGroupBy = List.of(
                "SERVICE","PLATFORM","INSTANCE_TYPE","USAGE_TYPE","ACCOUNT_ID","REGION",
                "USAGE_TYPE_GROUP","PURCHASE_OPTION","API_OPERATION","RESOURCE",
                "AVAILABILITY_ZONE","TENANCY","LEGAL_ENTITY","BILLING_ENTITY"
        );

        if (!allowedGroupBy.contains(groupBy.toUpperCase())) {
            throw new IllegalArgumentException("Invalid groupBy field");
        }

        StringBuilder sql = new StringBuilder("""
        SELECT %s AS GROUP_KEY, SUM(COST) AS TOTAL_COST
        FROM COSTREPORT
        WHERE BILL_DATE BETWEEN ? AND ?
    """.formatted(groupBy));

        List<Object> params = new ArrayList<>();
        params.add(java.sql.Date.valueOf(from));
        params.add(java.sql.Date.valueOf(to));

        for (Map.Entry<String, String> entry : filters.entrySet()) {

            String key = entry.getKey().toUpperCase();

            if (allowedGroupBy.contains(key)) {

                String[] values = entry.getValue().split(",");

                sql.append(" AND ").append(key).append(" IN (");

                for (int i = 0; i < values.length; i++) {
                    sql.append("?");
                    if (i < values.length - 1) sql.append(",");
                    params.add(values[i].trim());
                }

                sql.append(")");
            }
        }

        sql.append(" GROUP BY ").append(groupBy);
        sql.append(" ORDER BY TOTAL_COST DESC");

        return jdbcTemplate.query(
                sql.toString(),
                params.toArray(),
                (rs, i) -> new ServiceCostDTO(
                        rs.getString("GROUP_KEY"),
                        rs.getDouble("TOTAL_COST")
                )
        );
    }


}
