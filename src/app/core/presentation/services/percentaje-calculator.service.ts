import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PercentageCalculatorService {

  constructor() { }

  calculatePercentages(data: any[]): { [service: string]: number } {
    const serviceTotals = this.calculateServiceTotals(data);
    const totalGeneral = this.calculateTotalGeneral(serviceTotals);

    const servicePercentages: { [service: string]: number } = {};

    for (const service in serviceTotals) {
      if (serviceTotals.hasOwnProperty(service)) {
        const money = serviceTotals[service];
        const percentage = (money / totalGeneral) * 100;
        servicePercentages[service] = percentage;
      }
    }

    return servicePercentages;
  }

  private calculateServiceTotals(data: any[]): { [service: string]: number } {
    return data.reduce((totals, item) => {
      const service = item.service;
      const money = parseFloat(item.money);

      if (!isNaN(money)) {
        if (!totals[service]) {
          totals[service] = 0;
        }

        totals[service] += money;
      }

      return totals;
    }, {});
  }

  private calculateTotalGeneral(serviceTotals: { [service: string]: number }): number {
    return Object.values(serviceTotals).reduce((total, money) => total + money, 0);
  }
}
