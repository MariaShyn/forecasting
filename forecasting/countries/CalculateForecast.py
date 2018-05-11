import pandas as pd
import statsmodels.api as sm

class CalculateForecast():
    def __init__(self, dateArr, dataArr, dataTimeType):
        self.dateArr = dateArr
        self.dataArr = dataArr
        self.dataTimeType = dataTimeType

    def setArmaValues(self, arma, sarma):
        self.arma = [int(n) for n in arma.split(',')]
        self.sarma = [int(n) for n in sarma.split(',')]
        self.sarma.append(12)

    def getForecast(self, steps):
        format = '%YM%m' if self.dataTimeType == 'month' else '%Y'
        y = pd.DataFrame({'data': self.dataArr, 'date': self.dateArr})
        y.date = pd.to_datetime(y.date, format=format)
        y = y.set_index('date')
        print (y.head())
        y = y.fillna(y.bfill())
        mod = sm.tsa.statespace.SARIMAX(y,
                                        order=self.arma,
                                        seasonal_order=self.sarma,
                                        enforce_stationarity=False,
                                        enforce_invertibility=False)
        results = mod.fit()
        pred_uc = results.get_forecast(steps=steps)
        returnedDateArr = [pd.to_datetime(str(date)).strftime('%YM%m') for date in pred_uc.predicted_mean.index.values]
        return { 'data': pred_uc.predicted_mean.values, 'dates': returnedDateArr }

