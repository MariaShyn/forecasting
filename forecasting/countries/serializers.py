from rest_framework import serializers

from .models import Country, ArmaValues, Metrics

class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = (
            'id',
            'name',
            'capital',
            'population',
            'coords',
            'coords_marker',
            'currency',
            'languages',
            'area',
            'ext'
        )

class ArmaValuesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArmaValues
        fields = (
            'arma',
            'sarma',
            'metrics',
            'countries'
        )

class MetricsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Metrics
        fields = (
            'id',
            'name',
            'short_name',
            'measure_units'
        )

