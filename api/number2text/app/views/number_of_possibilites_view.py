from django.conf import settings
from django.http import JsonResponse, HttpResponse
from django.views.generic import View

from app.core.number_of_possibilities import NumberOfPossibilities


class NumberOfPossibilitiesView(View):
    def get(self, request, number) -> JsonResponse:
        try:
            number_of_possibilities = NumberOfPossibilities.get_number_of_possibilities(number)
        except ValueError as value_error:
            return self.__error(number, value_error)

        output = {
            'number': number,
            'number_of_possibilities': number_of_possibilities
        }
        if settings.DEBUG:
            return HttpResponse('<html><body><pre>%s</pre></body></html>' % str(output))
        else:
            return JsonResponse(output, safe=False)

    def __error(self, number: str, message: Exception) -> JsonResponse:
        output = {
            'number': number,
            'error': str(message)
        }
        return JsonResponse(output, status=400)
