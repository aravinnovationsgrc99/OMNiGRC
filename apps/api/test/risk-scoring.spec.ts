import { calculateRiskScore, getRiskSeverityLabel } from '@omnigrc/shared';

describe('Deterministic Risk Score Engine', () => {
  it('should correctly compute risk score as likelihood * impact', () => {
    expect(calculateRiskScore(1, 1)).toBe(1);
    expect(calculateRiskScore(3, 4)).toBe(12);
    expect(calculateRiskScore(5, 5)).toBe(25);
  });

  it('should clamp out-of-range likelihood and impact values to 1-5 boundary', () => {
    expect(calculateRiskScore(0, 10)).toBe(5);
    expect(calculateRiskScore(10, 0)).toBe(5);
  });

  it('should map score ranges to correct severity labels', () => {
    expect(getRiskSeverityLabel(3)).toBe('Low');
    expect(getRiskSeverityLabel(8)).toBe('Medium');
    expect(getRiskSeverityLabel(15)).toBe('High');
    expect(getRiskSeverityLabel(20)).toBe('Critical');
  });
});
