import { PeriodsEnum } from '../api/enum/api-periods.enum';

export const periodKeys: { [key in PeriodsEnum]: string } = {
  [PeriodsEnum.SEC_1]: '1SEC',
  [PeriodsEnum.SEC_2]: '2SEC',
  [PeriodsEnum.SEC_3]: '3SEC',
  [PeriodsEnum.SEC_4]: '4SEC',
  [PeriodsEnum.SEC_5]: '5SEC',
  [PeriodsEnum.SEC_6]: '6SEC',
  [PeriodsEnum.SEC_10]: '10SEC',
  [PeriodsEnum.SEC_15]: '15SEC',
  [PeriodsEnum.SEC_20]: '20SEC',
  [PeriodsEnum.SEC_30]: '30SEC',
  [PeriodsEnum.MIN_1]: '1MIN',
  [PeriodsEnum.MIN_2]: '2MIN',
  [PeriodsEnum.MIN_3]: '3MIN',
  [PeriodsEnum.MIN_4]: '4MIN',
  [PeriodsEnum.MIN_5]: '5MIN',
  [PeriodsEnum.MIN_6]: '6MIN',
  [PeriodsEnum.MIN_10]: '10MIN',
  [PeriodsEnum.MIN_15]: '15MIN',
  [PeriodsEnum.MIN_20]: '20MIN',
};

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

export const selectedPeriod = PeriodsEnum.SEC_10;
