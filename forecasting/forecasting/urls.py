"""forecasting URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.views.generic import TemplateView

from countries.views import CountryView, MetricsView, ArmaValuesView, ForecastView

urlpatterns = [
    url(r'^api/countries/$', CountryView.as_view()),
    url(r'^api/countries/(?P<countryId>\w+)/$', CountryView.as_view()),
    url(r'^api/metrics/$', MetricsView.as_view()),
    url(r'^api/armavalues/(?P<countryId>\w+)/$', ArmaValuesView.as_view()),
    url(r'^api/getforecast/', ForecastView.as_view()),
    url(r'^', TemplateView.as_view(template_name="index.html")),
]