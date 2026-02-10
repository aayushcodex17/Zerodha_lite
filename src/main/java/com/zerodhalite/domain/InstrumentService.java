package com.zerodhalite.domain;

import java.math.BigDecimal;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class InstrumentService {

    public List<InstrumentResponse> listInstruments() {
        return List.of(
                new InstrumentResponse("INFY", "Infosys", BigDecimal.valueOf(1492.35), BigDecimal.valueOf(0.85)),
                new InstrumentResponse("TCS", "Tata Consultancy Services", BigDecimal.valueOf(3775.10),
                        BigDecimal.valueOf(-0.12)),
                new InstrumentResponse("RELIANCE", "Reliance Industries", BigDecimal.valueOf(2940.00),
                        BigDecimal.valueOf(1.05)));
    }
}
