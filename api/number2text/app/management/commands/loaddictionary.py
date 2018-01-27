import csv
import re
from typing import io, List
import os

from django.core.management.base import BaseCommand, CommandError
from django.db import IntegrityError

from app.core.language_manager import LanguageManager


class Command(BaseCommand):
    help = 'Import language dictionaries'

    def add_arguments(self, parser):
        parser.add_argument('file_name', nargs='+', type=str)
        parser.add_argument('language', nargs='+', type=str)

    def handle(self, *args, **options):
        file_name = options['file_name'][0]
        language_string = options['language'][0]

        language_model = LanguageManager.LANGUAGE_STRING_TO_LANGUAGE.get(language_string)
        if language_model:
            file_path = 'app/fixtures/' + file_name
            if os.path.isfile(file_path):
                file = open(file_path, 'r')

                self.stdout.write('Trying to read file "%s" in %s...' % (file_name, language_model.name()))
                number_of_imported_words = self.__import_language_dictionary(file, language_model)
                self.stdout.write(self.style.SUCCESS('Successfully imported %i words' % number_of_imported_words))
            else:
                raise CommandError('ERROR: File "%s" does not exist ("%s")!' % (file_name, os.path.abspath(file_path)))
        else:
            raise CommandError('ERROR: Language "%s" not existing.' % language_string)

    def __import_language_dictionary(self, file: io, language_model) -> int:
        i = 0
        self.stdout.write(str(i))

        csv_reader = csv.reader(file)
        for row in csv_reader:
            words = self.__get_words_from_row(row)
            for word_string in words:
                try:
                    language_model.objects.create(word=word_string)

                    i += 1
                    if i % 10000 == 0:
                        self.stdout.write(str(i))
                except IntegrityError:
                    # ignore duplicate words
                    pass

        return i

    def __get_words_from_row(self, row: List[str]) -> List[str]:
        words = []
        for row_item in row:
            words_strings = re.split('\W+', row_item.lower())
            for word_string in words_strings:
                if re.match('^[a-z]*$', word_string) and len(word_string) > 1:
                    words.append(word_string)
        return words


