import itertools
import string

from django.core.management.base import BaseCommand, CommandError

from app.core.language_manager import LanguageManager


class Command(BaseCommand):
    help = 'Check word prefix frequency'

    def add_arguments(self, parser):
        parser.add_argument('language', nargs='+', type=str)
        parser.add_argument('prefix_length', nargs='+', type=int)

    def handle(self, *args, **options):
        language_string = options['language'][0]
        prefix_length = options['prefix_length'][0]

        language_model = LanguageManager.LANGUAGE_STRING_TO_LANGUAGE.get(language_string)
        if language_model:
            if prefix_length > 0:
                count_0 = 0
                count_gte_1 = 0
                frequency_table = {}
                for prefix_characters in itertools.combinations_with_replacement(string.ascii_lowercase, prefix_length):
                    prefix_word = ''.join(prefix_characters)

                    count = len(language_model.objects.filter(word__startswith=prefix_word))
                    frequency_table[prefix_word] = count
                    if count == 0:
                        count_0 += 1
                    else:
                        count_gte_1 += 1

                self.stdout.write(self.style.SUCCESS('Done'))
                self.stdout.write('0: %i' % count_0)
                self.stdout.write('>=1: %i' % count_gte_1)
                self.stdout.write('')

                self.stdout.write('Frequencies:')
                for (prefix_word, count) in sorted(frequency_table.items(), key=lambda t: t[1], reverse=True):
                    self.stdout.write('%s: %i' % (prefix_word, count))
            else:
                raise CommandError('ERROR: Prefix length must be > 0!')
        else:
            raise CommandError('ERROR: Language "%s" not existing.' % language_string)
