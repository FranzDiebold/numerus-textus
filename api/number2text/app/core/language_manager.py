import functools

from django.core.exceptions import ObjectDoesNotExist
from django.core.cache import cache
from django.utils.translation import ugettext as _

from app.models.test_language import TestLanguage
from app.models.german_language import GermanLanguage
from app.models.english_language import EnglishLanguage


class LanguageManager:
    LANGUAGE_STRING_TO_LANGUAGE = {
        'test': TestLanguage,
        'de': GermanLanguage,
        'en': EnglishLanguage
    }
    MIN_PREFIX_LEN = 2
    MAX_PREFIX_LEN = 4

    def __init__(self, language_string: str):
        self.__language = LanguageManager.LANGUAGE_STRING_TO_LANGUAGE.get(language_string)
        if not self.__language:
            raise ValueError(_('Language "%(language_string)s" not existing.') % {'language_string': language_string})

    def language_name(self) -> str:
        return self.__language.name()

    # using hierarchical prefix caching:
    #  - short (<= MIN_PREFIX_LEN): i.e. 'ab_test'
    #  - long (> MIN_PREFIX_LEN): i.e. 'cde*_test'
    def word_exists(self, possible_word: str) -> bool:
        if len(possible_word) <= LanguageManager.MIN_PREFIX_LEN:
            # short word
            return self.__word_exists_exact_lookup(possible_word)
        else:
            # long word
            for length in range(LanguageManager.MIN_PREFIX_LEN, (LanguageManager.MAX_PREFIX_LEN + 1)):
                if len(possible_word) > length:
                    word_prefix = possible_word[:length]
                    prefixed_word_exists = cache.get_or_set(self.__get_word_prefix_exists_cache_key(word_prefix), functools.partial(self.__prefix_lookup, word_prefix))
                    if not prefixed_word_exists:
                        return False
                else:
                    return self.__word_exists_exact_lookup(possible_word)

            return self.__word_exists_exact_lookup(possible_word)

    def __word_exists_exact_lookup(self, possible_word: str) -> bool:
        word_exists = cache.get_or_set(self.__get_prefix_word_exists_cache_key(possible_word), functools.partial(self.__exact_lookup, possible_word))
        return word_exists

    def __get_word_prefix_exists_cache_key(self, word_prefix: str) -> str:
        return word_prefix + '*_' + self.language_name()

    def __get_prefix_word_exists_cache_key(self, short_word: str) -> str:
        return short_word + '_' + self.language_name()

    def __exact_lookup(self, lookup_string: str) -> bool:
        try:
            self.__language.objects.get(word=lookup_string)
            return True
        except ObjectDoesNotExist:
            return False

    def __prefix_lookup(self, prefix_string: str) -> bool:
        return bool(self.__language.objects.filter(word__startswith=prefix_string))
