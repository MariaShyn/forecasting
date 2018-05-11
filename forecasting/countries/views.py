from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Country, ArmaValues, Metrics
from .serializers import CountrySerializer, ArmaValuesSerializer, MetricsSerializer
from .CalculateForecast import CalculateForecast

class CountryView(APIView):
    def get(self, request, countryId=None):
        countries = Country.objects.filter(show=True)
        countrySerializer = CountrySerializer(countries, many=True)
        if countryId is not None:
            countries = Country.objects.get(id=countryId)
            countrySerializer = CountrySerializer(countries)

        return Response(countrySerializer.data)



class MetricsView(APIView):
    def get(self, request):
        metrics = Metrics.objects.all()
        metricsSerializer = MetricsSerializer(metrics, many=True)

        return Response(metricsSerializer.data)

class ArmaValuesView(APIView):
    def get(self, request, countryId):
        armaValues = ArmaValues.objects.filter(countries_id=countryId)
        armaValuesSerializer = ArmaValuesSerializer(armaValues, many=True)
        return Response(armaValuesSerializer.data)

class ForecastView(APIView):
    def post(self, request):
        data = request.data
        armaValue = ArmaValues.objects.get(countries_id=data['countryId'], metrics_id=data['metricId'])
        armaValueSerializer = ArmaValuesSerializer(armaValue)
        calculationForecast = CalculateForecast(data['dates'], data['values'], data['dataTimeType'])
        calculationForecast.setArmaValues(armaValueSerializer.data['arma'], armaValueSerializer.data['sarma'])
        return Response(calculationForecast.getForecast(data['timeGap']))
