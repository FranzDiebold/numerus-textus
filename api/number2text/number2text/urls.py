"""number2text URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
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
from django.urls import re_path, path, include
from django.conf.urls.i18n import i18n_patterns
from django.conf import settings

from app.views.number_to_words_view import NumberToWordsView
from app.views.number_of_possibilites_view import NumberOfPossibilitiesView
from app.admin import admin_site


NUMBER = r'(?P<number>[\w\-/ %+*,._#=%&?$]+)'

urlpatterns = [
    re_path(r'^admin/', admin_site.urls),
    re_path(r'^num-pos/%s/$' % NUMBER, NumberOfPossibilitiesView.as_view(), name='number-of-possibilities')
]

urlpatterns += i18n_patterns(
    re_path(r'^%s/$' % NUMBER, NumberToWordsView.as_view(), name='number-to-words'),
)


if settings.DEBUG:
    import debug_toolbar
    urlpatterns = [
        path('__debug__/', include(debug_toolbar.urls)),
    ] + urlpatterns
