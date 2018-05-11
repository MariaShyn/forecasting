from django.db import models


class ArmaValues(models.Model):
    arma = models.CharField(max_length=10)
    sarma = models.CharField(max_length=10)
    metrics = models.ForeignKey('Metrics', models.DO_NOTHING)
    countries = models.ForeignKey('Country', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'arma_values'
        unique_together = (('id', 'metrics', 'countries'),)

class Country(models.Model):
    name = models.CharField(max_length=45)
    population = models.IntegerField(blank=True, null=True)
    capital = models.CharField(max_length=45, blank=True, null=True)
    coords = models.CharField(max_length=45, blank=True, null=True)
    coords_marker = models.CharField(max_length=45, blank=True, null=True)
    currency = models.CharField(max_length=45, blank=True, null=True)
    languages = models.CharField(max_length=45, blank=True, null=True)
    area = models.FloatField(blank=True, null=True)
    ext = models.CharField(max_length=45, blank=True, null=True)
    show = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'country'

class Metrics(models.Model):
    name = models.CharField(max_length=100)
    short_name = models.CharField(max_length=45)
    measure_units = models.CharField(max_length=10)
    data_time_type = models.CharField(max_length=45)

    class Meta:
        managed = False
        db_table = 'metrics'
