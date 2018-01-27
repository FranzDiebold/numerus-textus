from typing import List

from django.core.management.base import BaseCommand, CommandError

from app.core.number_to_words import NumberToWords


class Command(BaseCommand):
    help = 'Fill the API caches'

    LANG_DE = 'de'
    LANG_EN = 'en'
    LANGUAGES = [LANG_DE, LANG_EN]
    DEFAULT_START_NUMBER = 0
    DEFAULT_END_NUMBER = 10000

    def add_arguments(self, parser):
        parser.add_argument('start_number', nargs='?', default=self.__class__.DEFAULT_START_NUMBER, type=int)
        parser.add_argument('end_number', nargs='?', default=self.__class__.DEFAULT_END_NUMBER, type=int)

    def handle(self, *args, **options):
        languages = self.__class__.LANGUAGES
        start_number = options['start_number']
        end_number = options['end_number']

        if start_number < 0:
            raise CommandError('ERROR: "start_number" must be positive (>= 0).')
        if end_number <= start_number:
            raise CommandError('ERROR: "end_number" must be larger than "start_number".')

        self.stdout.write('Filling caches for languages %s from %i to %i...' % (str(languages), start_number, end_number))
        number_of_requests = self.__fill_caches(languages, start_number, end_number)
        self.stdout.write(self.style.SUCCESS('Successfully filled caches using %i requests!' % number_of_requests))

    def __fill_caches(self, languages: List[str], start_number: int, end_number: int) -> int:
        language_n2w_s = []
        for language in languages:
            n2w = NumberToWords(language)
            language_n2w_s.append(n2w)

        number_of_requests = 0
        number_of_numbers = 0
        for i in range(start_number, end_number+1):
            number = str(i)
            number0 = '0%s' % number

            for n2w in language_n2w_s:
                n2w.number_to_words(number)
                n2w.number_to_words(number0)
                number_of_requests += 2

            number_of_numbers += 1

            if number_of_numbers % 100 == 0:
                self.stdout.write(str(number_of_numbers))

        return number_of_requests
