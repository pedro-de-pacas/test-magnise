import { PeriodsEnum } from '../api/enum/api-periods.enum';

export const periodNumbers: { [key in PeriodsEnum]?: number } = {
  [PeriodsEnum.SEC_1]: 1000,
  [PeriodsEnum.SEC_2]: 2000,
  [PeriodsEnum.SEC_3]: 3000,
  [PeriodsEnum.SEC_4]: 4000,
  [PeriodsEnum.SEC_5]: 5000,
  [PeriodsEnum.SEC_6]: 6000,
  [PeriodsEnum.SEC_10]: 10000,
  [PeriodsEnum.SEC_15]: 15000,
  [PeriodsEnum.SEC_20]: 20000,
  [PeriodsEnum.SEC_30]: 30000,
  [PeriodsEnum.MIN_1]: 60000,
  [PeriodsEnum.MIN_2]: 120000,
  [PeriodsEnum.MIN_3]: 180000,
  [PeriodsEnum.MIN_4]: 240000,
  [PeriodsEnum.MIN_5]: 300000,
  [PeriodsEnum.MIN_6]: 360000,
  [PeriodsEnum.MIN_10]: 600000,
  [PeriodsEnum.MIN_15]: 900000,
  [PeriodsEnum.MIN_20]: 1200000,
}
