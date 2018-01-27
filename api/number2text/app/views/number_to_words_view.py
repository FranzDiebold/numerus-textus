from django.conf import settings
from django.http import JsonResponse, HttpResponse
from django.views.generic import View

from app.core.number_to_words import NumberToWords


class NumberToWordsView(View):
    def get(self, request, number) -> JsonResponse:
        try:
            n2w = NumberToWords(request.LANGUAGE_CODE)
            possible_words = n2w.number_to_words(number)
        except ValueError as value_error:
            return self.__error(number, value_error)

        output = {
            'number': number,
            'possible_words': possible_words
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
