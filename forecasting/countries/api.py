from rest_framework import viewsets, permissions

from .models import Country, ArmaValues
from .serializers import CountrySerializer, ArmaValuesSerializer


class CountryViewSet(viewsets.ModelViewSet):
    queryset = Country.objects.all()
    permission_classes = [permissions.AllowAny, ]
    lookup_field = "name"
    serializer_class = CountrySerializer


class ArmaValuesViewSet(viewsets.ModelViewSet):
    queryset = ArmaValues.objects.all()
    permission_classes = [permissions.AllowAny, ]
    lookup_field = "countries"
    serializer_class = ArmaValuesSerializer